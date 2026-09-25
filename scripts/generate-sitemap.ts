/**
 * Writes dist/sitemap.xml (with the image extension), dist/llms.txt,
 * dist/.well-known/llms.txt and dist/llms-full.txt after the SSG build.
 *
 * The sitemap is generated from the SEO registry, so it lists exactly the URLs
 * that were actually built — a sitemap and a route table cannot disagree.
 *
 * Run: npm run seo:sitemap (chained onto `npm run build`)
 */
import fs from 'node:fs'
import path from 'node:path'
import { DIST, PUBLIC, SRC } from './paths.ts'
import { seoRecords } from '../src/seo/registry.generated.ts'
import { blogIndex } from '../src/content/blog/index.generated.ts'
import { brand, contact, hours, location, seo, team, serviceMenu, socialProfiles } from '../src/config/site.ts'
import type { TreatmentContent } from '../src/content/treatment.ts'

if (!fs.existsSync(DIST)) throw new Error('dist/ not found — run the build first')

const base = seo.canonicalBase
const xml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
const buildDate = new Date().toISOString().slice(0, 10)

/**
 * The images a page is about, for the image-sitemap extension: its share card
 * and, where it has one, its hero. Google Images is a real entry point for a
 * clinic's treatment photography.
 */
function imagesFor(record: (typeof seoRecords)[number]): string[] {
  const images = new Set<string>()
  const og = record.og['og:image']
  if (og && og !== `${base}/images/brand/og-default.jpg`) images.add(og)
  for (const rel of [`images/treatments/${record.slug}.jpg`, `images/blog/${record.slug}.jpg`]) {
    if (fs.existsSync(path.join(PUBLIC, rel))) images.add(`${base}/${rel}`)
  }
  return [...images]
}

/** A noindex page in a sitemap is a contradiction Search Console reports. */
const indexable = seoRecords.filter(r => !/\bnoindex\b/i.test(r.robots))

const urls = indexable
  .slice()
  .sort((a, b) => a.path.localeCompare(b.path))
  .map(r => {
    const lastmod = r.modifiedTime ? new Date(r.modifiedTime).toISOString().slice(0, 10) : buildDate
    return [
      '  <url>',
      `    <loc>${xml(r.canonical)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      ...imagesFor(r).map(src => `    <image:image><image:loc>${xml(src)}</image:loc></image:image>`),
      '  </url>',
    ].join('\n')
  })

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`,
)

/**
 * llms.txt — net-new (fix-plan A8). /llms.txt, /llm.txt, /ai.txt and
 * /.well-known/llms.txt all 404 on the live site, so there is nothing to
 * preserve and no migration risk.
 *
 * Follows llmstxt.org: an H1, a blockquote summary, free-form notes, then H2
 * sections of links. llms-full.txt carries the treatment pages' own copy —
 * what each is, how it is done and its FAQs — so an assistant can answer from
 * the clinic's words rather than a paraphrase of them.
 */
const link = (label: string, pathname: string, note?: string) =>
  `- [${label}](${base}${pathname})${note ? `: ${note}` : ''}`

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const openDays = new Set<string>(hours.openingHours.flatMap(h => [...h.days]))
const closed = WEEK.filter(d => !openDays.has(d))
const openingHours =
  hours.openingHours.map(h => `${h.days.join(', ')}: ${h.opens}–${h.closes}`).join('; ') +
  (closed.length ? ` (closed ${closed.join(', ')})` : '')

const llms = `# ${brand.name}

> ${brand.description}

- Address: ${location.addressDisplayLines.join(' ')}, India
- Phone / WhatsApp: ${contact.phoneDisplay}
- Email: ${contact.email}
- Opening hours: ${openingHours}
- Directions: ${location.google.directionsUrl}${location.google.placeUrl ? `\n- Google Maps: ${location.google.placeUrl}` : ''}
- Languages: ${contact.languages.join(', ')}
- Areas served: ${location.areaServed.join(', ')}
- Book an appointment: ${base}${contact.ctaHref}
- Social: ${socialProfiles.map(p => `[${p.name}](${p.url})`).join(', ')}

## Clinical team

${team.map(d => link(d.name, d.path, `${d.qualification}. ${d.role}.`)).join('\n')}

${serviceMenu.map(group => `## ${group.group}\n\n${group.items.map(i => link(i.label, i.path)).join('\n')}`).join('\n\n')}

## Clinic

${link('About us', '/about-us/')}
${link('Our doctors', '/our-doctors/')}
${link('Contact us', seo.contactPath, 'address, hours, map and directions')}
${link('Media coverage', '/media/')}
${link('Image gallery', '/image-gallery/')}
${link('Video gallery', '/video-gallery/')}

## Articles

${blogIndex.map(post => link(post.title, post.path)).join('\n')}

## Optional

${link('Full treatment details for LLMs', '/llms-full.txt', 'each treatment page\'s description, procedure notes and FAQs')}
${link('Privacy policy', '/privacy-policy/')}
${link('Terms of use', '/terms-of-use/')}
`

const treatmentSections: string[] = []
for (const group of serviceMenu) {
  for (const item of group.items) {
    const file = path.join(SRC, 'content', 'treatments', `${item.path.replace(/^\/|\/$/g, '')}.ts`)
    if (!fs.existsSync(file)) continue
    const t: TreatmentContent = (await import(file)).default
    const flat = (p: string | readonly string[]) => (typeof p === 'string' ? p : p.join('\n\n'))
    treatmentSections.push(`## ${t.name}

URL: ${base}${t.path}
Category: ${group.group}

${t.intro.join('\n\n')}

### ${t.feature.heading}

${flat(t.feature.body)}

${t.feature.items.map(i => `- **${i.title}**: ${i.text}`).join('\n')}

### Procedure and aftercare

${flat(t.videoBody)}

### ${t.why.heading}

${flat(t.why.body)}

### ${t.faqHeading}

${t.faqs.map(f => `**${f.question}**\n\n${f.answer}`).join('\n\n')}
`)
  }
}

const llmsFull = `# ${brand.name} — treatment details

> ${brand.description}

Clinic: ${location.addressDisplayLines.join(' ')}. Phone ${contact.phoneDisplay}. Opening hours: ${openingHours}. Book: ${base}${contact.ctaHref}

Results vary from person to person. Treatment suitability, sessions and outcomes are confirmed at an in-person consultation with a qualified dermatologist.

${treatmentSections.join('\n')}`

fs.writeFileSync(path.join(DIST, 'llms.txt'), llms)
fs.writeFileSync(path.join(DIST, 'llms-full.txt'), llmsFull)
// Some agents look under /.well-known/ first. Same bytes, both places.
fs.mkdirSync(path.join(DIST, '.well-known'), { recursive: true })
fs.copyFileSync(path.join(DIST, 'llms.txt'), path.join(DIST, '.well-known', 'llms.txt'))

/**
 * Static hosts (Netlify, Vercel, Cloudflare Pages, S3) serve dist/404.html for
 * an unmatched path. vite-react-ssg prerendered it to dist/404/index.html —
 * move it, so /404/ is not also a real, crawlable URL.
 */
const built404 = path.join(DIST, '404', 'index.html')
if (fs.existsSync(built404)) {
  fs.renameSync(built404, path.join(DIST, '404.html'))
  fs.rmSync(path.join(DIST, '404'), { recursive: true, force: true })
  console.log('404:     dist/404.html')
}

console.log(`sitemap: ${urls.length} URLs (${seoRecords.length - indexable.length} noindex left out) -> dist/sitemap.xml`)
console.log(`llms:    dist/llms.txt, dist/.well-known/llms.txt, dist/llms-full.txt (${treatmentSections.length} treatments)`)
