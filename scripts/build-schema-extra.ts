/**
 * The second JSON-LD block — authored structured data that sits beside the
 * byte-verbatim capture instead of inside it.
 *
 * src/seo/schema/<key>.json is the live site's graph and must not change (see
 * vite.config.ts). What it lacks is what a local clinic's rich results rest on:
 * a procedure node and an FAQPage per treatment page, and — on the pages Google
 * reads the business from — the clinic's contact point, bookable action, full
 * service area and service catalogue. Those are written here, one graph per
 * page, to src/seo/schema-extra/<key>.json, and injected as a separate
 * <script type="application/ld+json"> after the captured one.
 *
 * Nodes reuse the capture's @ids (…/#clinic, …/#webpage), so a consumer merges
 * them into the entities it already has rather than reading a second clinic.
 * Every value comes from src/config/site.ts or the page's own content module —
 * the same objects the page renders — so the markup cannot say what the page
 * does not.
 *
 * Run: npm run seo:schema-extra   (part of seo:generate, after seo:registry)
 */
import fs from 'node:fs'
import path from 'node:path'
import { SEO_OUT, SITE_URL, SRC } from './paths.ts'
import { seoRecords, type SeoRecord } from '../src/seo/registry.generated.ts'
import { brand, contact, location, serviceAreas, serviceMenu, socialProfiles } from '../src/config/site.ts'
import type { TreatmentContent, TreatmentFaq } from '../src/content/treatment.ts'
import type { ContentPageContent } from '../src/content/page.ts'

type Node = Record<string, unknown>

const OUT = path.join(SEO_OUT, 'schema-extra')
const CLINIC_ID = `${SITE_URL}/#clinic`

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

/** The service menu's group for a path, e.g. "Cosmetic Surgeries". */
function groupOf(pathname: string): string | undefined {
  return serviceMenu.find(g => g.items.some(i => i.path === pathname))?.group
}

/** schema.org's MedicalSpecialty enum member for a treatment. */
function specialtyOf(pathname: string): string {
  return groupOf(pathname) === 'Cosmetic Surgeries' ? 'https://schema.org/PlasticSurgery' : 'https://schema.org/Dermatologic'
}

function faqPage(url: string, name: string, faqs: readonly TreatmentFaq[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    name,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `${url}#faq-${index + 1}`,
      position: index + 1,
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

/**
 * A treatment page: the procedure it describes, the page's link to it, and
 * the FAQ it prints (TreatmentFaq renders the same `faqs`).
 */
function treatmentNodes(record: SeoRecord, content: TreatmentContent): Node[] {
  const url = record.canonical
  const procedureId = `${url}#procedure`
  const how = typeof content.videoBody === 'string' ? content.videoBody : content.videoBody.join(' ')
  return [
    {
      '@type': 'MedicalProcedure',
      '@id': procedureId,
      name: content.name,
      url,
      description: record.description,
      howPerformed: how,
      relevantSpecialty: specialtyOf(record.path),
      mainEntityOfPage: { '@id': `${url}#webpage` },
      image: record.og['og:image'],
    },
    { '@id': `${url}#webpage`, about: { '@id': procedureId }, mainEntity: { '@id': procedureId } },
    faqPage(url, content.faqHeading, content.faqs),
  ]
}

/**
 * The clinic, as the homepage and the contact page state it. Only on those two:
 * every page already carries the core clinic node, and these additions are the
 * business listing rather than something each treatment page is about.
 *
 * Deliberately absent: `logo`, `image` and `openingHoursSpecification`. The
 * capture already sets all three (the hours correctly — see `hours` in
 * site.ts), and a second value under the same @id would be read as two logos,
 * two photos, two schedules.
 */
function clinicNode(): Node {
  const sameAs = [...socialProfiles.map(p => p.url), ...(location.google.placeUrl ? [location.google.placeUrl] : [])]
  return {
    '@type': ['MedicalClinic', 'Dermatology', 'LocalBusiness'],
    '@id': CLINIC_ID,
    ...(location.google.placeUrl ? { hasMap: location.google.placeUrl } : {}),
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      '@id': `${SITE_URL}/#contactpoint`,
      telephone: contact.phone,
      email: contact.email,
      contactType: contact.contactType,
      availableLanguage: [...contact.languages],
      areaServed: 'IN',
      url: `${SITE_URL}/contact-us/`,
    },
    currenciesAccepted: 'INR',
    areaServed: serviceAreas.map(area => ({
      '@type': 'Place',
      name: `${area}, Bengaluru`,
      containedInPlace: { '@id': `${SITE_URL}/#bangalore` },
    })),
    potentialAction: {
      '@type': 'ReserveAction',
      '@id': `${SITE_URL}/#reserveaction`,
      name: 'Book an appointment',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}${contact.ctaHref}`,
        actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      '@id': `${SITE_URL}/#treatments`,
      name: `${brand.shortName} treatments`,
      itemListElement: serviceMenu.map(group => ({
        '@type': 'OfferCatalog',
        name: group.group,
        itemListElement: group.items.map(item => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: item.label,
            url: `${SITE_URL}${item.path}`,
          },
        })),
      })),
    },
  }
}

const write = (key: string, graph: Node[]) =>
  fs.writeFileSync(
    path.join(OUT, `${key}.json`),
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
  )

const counts = { treatment: 0, contentFaq: 0, clinic: 0 }

for (const record of seoRecords) {
  const nodes: Node[] = []

  if (record.path === '/' || record.slug === 'contact-us') {
    nodes.push(clinicNode())
    counts.clinic++
  }

  const treatmentFile = path.join(SRC, 'content', 'treatments', `${record.slug}.ts`)
  if (fs.existsSync(treatmentFile)) {
    const content: TreatmentContent = (await import(treatmentFile)).default
    nodes.push(...treatmentNodes(record, content))
    counts.treatment++
  }

  // The hand-ported content pages that print an FAQ (ContentPage renders `faqs`).
  const pageFile = path.join(SRC, 'content', 'pages', `${record.slug}.ts`)
  if (fs.existsSync(pageFile)) {
    const content: ContentPageContent = (await import(pageFile)).default
    if (content.faqs?.length) {
      nodes.push(faqPage(record.canonical, content.faqHeading ?? `${content.name} FAQs`, content.faqs))
      counts.contentFaq++
    }
  }

  if (nodes.length) write(record.key, nodes)
}

console.log(
  `schema-extra: ${counts.treatment} treatment pages (MedicalProcedure + FAQPage), ` +
    `${counts.contentFaq} content-page FAQs, clinic listing on ${counts.clinic} pages -> src/seo/schema-extra/`,
)
if (!location.google.placeId) console.log('  (no Google place ID in site.ts yet — sameAs/hasMap omit the Maps listing)')
