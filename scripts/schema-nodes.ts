/**
 * Authored JSON-LD nodes for pages that need more than the template graph.
 *
 * scripts/build-seo-registry.ts clones SCHEMA_TEMPLATE_KEY's site-wide entities
 * — the WebSite, the organisations, the clinic, one Physician, the places and
 * the core Service — and mints a BreadcrumbList, a WebPage and a ReadAction per
 * added page. Those describe the clinic. They do not describe what a particular
 * page PUBLISHES, so a page carrying an FAQ, or profiling doctors who have no
 * node anywhere on the site, has to say so itself.
 *
 * src/seo/JsonLd.tsx is dev-only and production injects src/seo/schema/<key>.json
 * byte-verbatim from vite.config.ts's onPageRendered, so this file is the only
 * place those nodes can come from.
 *
 * The builders read src/config/site.ts — the same objects the sections render —
 * so the structured data cannot drift from the visible page. site.ts has no
 * imports of its own, and scripts/verify-links.ts already imports it under tsx,
 * so this is safe from a script.
 */
import { SITE_URL } from './paths.ts'
import { aboutFaqs, team } from '../src/config/site.ts'

type Node = Record<string, unknown>

/** The four doctor IDs. team[0] already has a node in the template graph. */
const CLINIC = { '@id': `${SITE_URL}/#clinic` }
const MEDICAL_ORG = { '@id': `${SITE_URL}/#medicalorganization` }
const AREA_SERVED = [
  { '@id': `${SITE_URL}/#bangalore` },
  { '@id': `${SITE_URL}/#marathahalli` },
  { '@id': `${SITE_URL}/#whitefield` },
]

/**
 * A Physician node for one member of `team`.
 *
 * Modelled on the shape of the Dr Sandeep node the template graph already
 * carries, so the four read alike to a consumer.
 *
 * `mainEntityOfPage` points at a #webpage that is not in this graph. That is
 * what the cloned Sandeep node already does — it references
 * best-dermatologist-…#webpage from whatever page it appears on — so it is the
 * graph's established pattern rather than a new defect.
 *
 * TODO(seo): `image.url` here is the app-local /images/team/ path, while the
 * cloned Sandeep node still carries a WordPress upload URL. They will only
 * agree once the source .jsonld in seo-backup/ is regenerated, and that file
 * ships byte-verbatim, so it is not editable from this side.
 */
function physician(member: (typeof team)[number], pageUrl: string): Node {
  const url = `${SITE_URL}${member.path}`

  const node: Node = {
    '@type': ['Physician', 'Person'],
    '@id': `${url}#physician`,
    url,
    name: member.name,
    honorificPrefix: 'Dr.',
    image: {
      '@type': 'ImageObject',
      '@id': `${url}#physician-image`,
      url: `${SITE_URL}${member.photo}`,
    },
    jobTitle: [...member.jobTitles],
    description: member.bio,
    affiliation: [MEDICAL_ORG, CLINIC],
    worksFor: MEDICAL_ORG,
    workLocation: CLINIC,
    areaServed: AREA_SERVED,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    /** The page that profiles them — this one. */
    subjectOf: { '@id': `${pageUrl}#webpage` },
  }

  // Dermatology has a MedicalSpecialty node in the graph to point at; plastic
  // surgery does not, so the surgeons take schema.org's own enum string.
  node.medicalSpecialty = member.jobTitles.some(t => /Dermatolog/i.test(t))
    ? { '@id': `${SITE_URL}/#dermatology` }
    : 'PlasticSurgery'

  // `qualification` is a degree list for three of the four. team[2]'s is
  // "Senior Plastic Surgeon" — a ROLE, not a credential — so he gets none.
  // See the note in site.ts: the same string is rendered as his card's
  // qualification line and feeds the header's Doctors dropdown.
  if (/MBBS|MD|MCh/i.test(member.qualification)) {
    node.hasCredential = member.qualification
      .split(',')
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: part,
      }))
  }

  return node
}

/**
 * /about-us/ — an FAQPage for B10 and a Physician for each doctor who does not
 * already have one. Required by the developer note at the foot of Part B in
 * content/about-us/Derma_Solutions_Home_Technology_and_About_Us_Content.md.
 *
 * Dr Sandeep (team[0]) is deliberately absent: his node is cloned in from the
 * template graph, and re-declaring an @id would emit it twice in one graph.
 */
export function aboutUsExtraNodes(url: string): Node[] {
  return [
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      inLanguage: 'en',
      name: 'Derma Solutions — frequently asked questions',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      about: CLINIC,
      mainEntity: aboutFaqs.map((faq, index) => ({
        '@type': 'Question',
        '@id': `${url}#faq-${index + 1}`,
        position: index + 1,
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    ...team.slice(1).map(member => physician(member, url)),
  ]
}
