/**
 * Generates the app's SEO layer from seo-backup/.
 *
 * fix-plan.md: "Every meta title and description — verbatim. This is now the
 * hardest constraint in the plan." So nothing here is hand-transcribed — the
 * backup stays the source of truth and this script is re-run whenever it changes.
 *
 * Emits:
 *   src/seo/registry.generated.ts   92 typed SeoRecords, plus scripts/added-pages.ts
 *   src/seo/schema/<key>.json       92 byte-verbatim JSON-LD graphs, plus one
 *                                   authored graph per added page
 *
 * Run: npm run seo:registry
 */
import fs from 'node:fs'
import path from 'node:path'
import { parseCsv } from './csv.ts'
import { SEO_MAP_CSV, PER_PAGE_DIR, SCHEMA_DIR, SEO_OUT, SCHEMA_OUT, PUBLIC, backupKey } from './paths.ts'
import { ADDED_PAGES, SCHEMA_TEMPLATE_KEY, SITE_URL } from './added-pages.ts'
import { H1_OVERRIDES, TITLE_OVERRIDES } from './seo-overrides.ts'

/* fix-plan A2/A3 — recorded so the decision is not lost, deliberately not acted on. */
const NOTES: Record<string, string> = {
  'maintenance-page':
    'retire-410 (fix-plan A3) — indexable 292-word junk page. Not acted on: needs GSC confirmation.',
  'iv-glutathione-treatment':
    'duplicate-of:iv-glutathione-treatment-in-bangalore (fix-plan A2) — 301 candidate. Not acted on: confirm direction against GSC first.',
}

/**
 * fix-plan A4: a site-wide og:image so no page can ship without one.
 * Absolute, not root-relative — Facebook/WhatsApp/LinkedIn scrapers fetch
 * og:image out of context and do not reliably resolve a relative path.
 */
const OG_IMAGE_FALLBACK = `${SITE_URL}/images/brand/og-default.jpg`
const OG_IMAGE_W = '1200'
const OG_IMAGE_H = '630'

/** The page's own card from scripts/generate-og-images.ts, else the site-wide one. */
function ogImageFor(slug: string): string {
  return fs.existsSync(path.join(PUBLIC, 'images', 'og', `${slug}.jpg`))
    ? `${SITE_URL}/images/og/${slug}.jpg`
    : OG_IMAGE_FALLBACK
}

/**
 * twitter:title / twitter:description, where the capture has none. X and
 * Slack fall back to og:* anyway; stating them costs two tags and removes the
 * dependence on that fallback. Added, never overwritten.
 */
function completeTwitter(twitter: Record<string, string>, og: Record<string, string>) {
  twitter['twitter:title'] ??= og['og:title']
  twitter['twitter:description'] ??= og['og:description']
  twitter['twitter:image'] ??= og['og:image']
  if (og['og:image:alt']) twitter['twitter:image:alt'] ??= og['og:image:alt']
}

type PerPage = {
  og?: Record<string, string>
  twitter?: Record<string, string>
  h1?: string[]
  headings?: { level: number; text: string }[]
}

const rows = parseCsv(fs.readFileSync(SEO_MAP_CSV, 'utf8'))
if (rows.length !== 92) throw new Error(`expected 92 rows in seo-map.csv, got ${rows.length}`)

fs.mkdirSync(SCHEMA_OUT, { recursive: true })

const records = rows.map(r => {
  const key = backupKey(r.slug, r.url)
  const urlPath = new URL(r.url).pathname // keeps the trailing slash

  const perPageFile = path.join(PER_PAGE_DIR, `${key}.json`)
  const perPage: PerPage = JSON.parse(fs.readFileSync(perPageFile, 'utf8'))

  // JSON-LD: copied byte-verbatim, never reformatted. Parsed only to prove it is valid.
  const jsonldRaw = fs.readFileSync(path.join(SCHEMA_DIR, `${key}.jsonld`), 'utf8')
  JSON.parse(jsonldRaw)
  fs.writeFileSync(path.join(SCHEMA_OUT, `${key}.json`), jsonldRaw)

  // A deliberate rewrite, or the capture's own title. See seo-overrides.ts.
  const title = TITLE_OVERRIDES[r.slug] ?? r.title

  const og: Record<string, string> = { ...(perPage.og ?? {}) }
  const twitter: Record<string, string> = { ...(perPage.twitter ?? {}) }

  // og:title and twitter:title are the same string to a share card as <title>
  // is to a SERP, so an overridden title carries to both rather than leaving a
  // page whose tab and its WhatsApp preview disagree.
  if (TITLE_OVERRIDES[r.slug]) {
    if (og['og:title']) og['og:title'] = title
    if (twitter['twitter:title']) twitter['twitter:title'] = title
  }

  // A4 — ADD og:image where absent. Never overwrite one the live site already sets.
  if (!og['og:image']) {
    og['og:image'] = ogImageFor(r.slug)
    og['og:image:width'] = OG_IMAGE_W
    og['og:image:height'] = OG_IMAGE_H
    og['og:image:alt'] = title
  }
  completeTwitter(twitter, og)

  // A5 — exactly one H1. The 5 multi-H1 pages keep only the first; the extras
  // become H2s when content lands. The captured heading TEXT is never edited
  // here; the only way it changes is an explicit entry in H1_OVERRIDES
  // (scripts/seo-overrides.ts).
  const h1 = H1_OVERRIDES[r.slug] ?? perPage.h1?.[0] ?? r.h1 ?? r.title

  return {
    slug: r.slug,
    key,
    path: urlPath,
    type: (r.type || 'page') as 'page' | 'post' | 'other',
    wpId: r.wp_id ? Number(r.wp_id) : null,
    title,
    description: r.meta_description,
    canonical: r.canonical,
    robots: r.robots,
    h1,
    og,
    twitter,
    publishedTime: og['article:published_time'] ?? r.wp_published ?? null,
    modifiedTime: og['article:modified_time'] ?? r.wp_modified ?? null,
    markdown: r.markdown_file || null,
    note: NOTES[r.slug] ?? null,
  }
})

/**
 * Pages that are not in the capture — see scripts/added-pages.ts. Appended after
 * the 92 so the captured records keep their order and their bytes.
 *
 * Their JSON-LD is authored, not copied: the template page's site-wide entity
 * nodes are kept as they are, and its three page-specific nodes (the
 * breadcrumb, the WebPage and its ReadAction) are replaced with this page's.
 */
const templateGraph: { '@graph': { '@id'?: string }[] } = JSON.parse(
  fs.readFileSync(path.join(SCHEMA_DIR, `${SCHEMA_TEMPLATE_KEY}.jsonld`), 'utf8'),
)
const templateUrl = `${SITE_URL}/${SCHEMA_TEMPLATE_KEY}/`

for (const page of ADDED_PAGES) {
  if (records.some(r => r.slug === page.slug)) {
    throw new Error(`added page "${page.slug}" is already in the capture — remove it from scripts/added-pages.ts`)
  }
  const url = `${SITE_URL}/${page.slug}/`

  const graph = {
    ...templateGraph,
    '@graph': [
      ...templateGraph['@graph'].filter(node => !node['@id']?.startsWith(templateUrl)),
      {
        '@type': 'BreadcrumbList',
        name: 'Breadcrumbs',
        '@id': `${url}#breadcrumblist`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: page.breadcrumbName },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        inLanguage: 'en',
        name: page.title,
        description: page.description,
        datePublished: page.publishedTime,
        dateModified: page.publishedTime,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumblist` },
        potentialAction: { '@id': `${url}#readaction` },
      },
      { '@type': 'ReadAction', '@id': `${url}#readaction`, target: url },
      // Nodes this page publishes itself — an FAQPage, a Physician the site has
      // no node for. See the field's doc comment in scripts/added-pages.ts.
      ...(page.extraNodes?.(url) ?? []),
    ],
  }
  fs.writeFileSync(path.join(SCHEMA_OUT, `${page.slug}.json`), JSON.stringify(graph))

  const og: Record<string, string> = {
    'og:title': page.title,
    'og:type': 'article',
    'og:description': page.description,
    'og:url': url,
    'og:locale': 'en',
    'og:site_name': 'Derma Solutions Skin and Hair Clinic',
    'article:published_time': page.publishedTime,
    'og:image': ogImageFor(page.slug),
    'og:image:width': OG_IMAGE_W,
    'og:image:height': OG_IMAGE_H,
    'og:image:alt': page.title,
  }
  const twitter: Record<string, string> = { 'twitter:card': 'summary_large_image' }
  completeTwitter(twitter, og)

  records.push({
    slug: page.slug,
    key: page.slug,
    path: `/${page.slug}/`,
    type: 'page',
    wpId: null,
    title: page.title,
    description: page.description,
    canonical: url,
    robots: 'max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    h1: page.h1,
    og,
    twitter,
    publishedTime: page.publishedTime,
    modifiedTime: page.publishedTime,
    markdown: null,
    note: page.note,
  })
}

const banner = `/**
 * GENERATED FILE — DO NOT EDIT.
 *
 * Written by scripts/build-seo-registry.ts from seo-backup/. Every title,
 * description, canonical and robots value below is VERBATIM from the live-site
 * capture; editing them here breaks the migration's only guarantee.
 *
 * To change something, change the backup (or the script) and re-run:
 *   npm run seo:registry
 *
 * Source: seo-backup/07-migration/seo-map.csv (92 URLs, captured 2026-09-02),
 * plus the authored pages in scripts/added-pages.ts (${ADDED_PAGES.length}) — those alone are
 * NOT from the capture.
 */
`

const out = `${banner}
export type PageType = 'page' | 'post' | 'other'

export interface SeoRecord {
  /** WordPress slug. 'derma-solutions-home' for the homepage. */
  slug: string
  /** Filename stem inside seo-backup (\`_homepage\`, \`category__uncategorized\`, else the slug). */
  key: string
  /** Live URL pathname, trailing slash included. */
  path: string
  type: PageType
  wpId: number | null
  /** VERBATIM */
  title: string
  /** VERBATIM */
  description: string
  canonical: string
  robots: string
  /** The one and only H1 this page may render. */
  h1: string
  og: Record<string, string>
  twitter: Record<string, string>
  publishedTime: string | null
  modifiedTime: string | null
  /** Captured copy for this page, relative to seo-backup/. */
  markdown: string | null
  /** A fix-plan decision recorded against this URL but NOT yet acted on. */
  note: string | null
}

export const seoRecords: SeoRecord[] = ${JSON.stringify(records, null, 2)}

const bySlug = new Map(seoRecords.map(r => [r.slug, r]))
const byPath = new Map(seoRecords.map(r => [r.path, r]))

/** Throws rather than rendering a page with no SEO — a silent miss is the failure mode that matters. */
export function getSeo(slug: string): SeoRecord {
  const record = bySlug.get(slug)
  if (!record) throw new Error(\`No SEO record for slug "\${slug}". Known slugs are in src/seo/registry.generated.ts.\`)
  return record
}

export function getSeoByPath(path: string): SeoRecord | undefined {
  return byPath.get(path)
}
`

fs.writeFileSync(path.join(SEO_OUT, 'registry.generated.ts'), out)

const counts = records.reduce<Record<string, number>>((a, r) => ((a[r.type] = (a[r.type] ?? 0) + 1), a), {})
console.log(`registry: ${records.length} records`, counts)
console.log(`schema:   ${fs.readdirSync(SCHEMA_OUT).length} .json graphs`)
console.log(`og:image: ${records.filter(r => r.og['og:image'].includes('/images/og/')).length} page-specific, ${records.filter(r => r.og['og:image'] === OG_IMAGE_FALLBACK).length} site-wide fallback (fix-plan A4)`)
