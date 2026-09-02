/**
 * Generates the app's SEO layer from seo-backup/.
 *
 * fix-plan.md: "Every meta title and description — verbatim. This is now the
 * hardest constraint in the plan." So nothing here is hand-transcribed — the
 * backup stays the source of truth and this script is re-run whenever it changes.
 *
 * Emits:
 *   src/seo/registry.generated.ts   92 typed SeoRecords
 *   src/seo/schema/<key>.json       92 byte-verbatim JSON-LD graphs
 *
 * Run: npm run seo:registry
 */
import fs from 'node:fs'
import path from 'node:path'
import { parseCsv } from './csv.ts'
import { SEO_MAP_CSV, PER_PAGE_DIR, SCHEMA_DIR, SEO_OUT, SCHEMA_OUT, backupKey } from './paths.ts'

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
const SITE_URL = 'https://dermasolutions.co.in'
const OG_IMAGE_FALLBACK = `${SITE_URL}/images/brand/og-default.jpg`
const OG_IMAGE_W = '1200'
const OG_IMAGE_H = '630'

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

  const og: Record<string, string> = { ...(perPage.og ?? {}) }
  const twitter: Record<string, string> = { ...(perPage.twitter ?? {}) }

  // A4 — ADD og:image where absent. Never overwrite one the live site already sets.
  if (!og['og:image']) {
    og['og:image'] = OG_IMAGE_FALLBACK
    og['og:image:width'] = OG_IMAGE_W
    og['og:image:height'] = OG_IMAGE_H
    og['og:image:alt'] = r.title
  }
  if (!twitter['twitter:image']) twitter['twitter:image'] = og['og:image']

  // A5 — exactly one H1. The 5 multi-H1 pages keep only the first; the extras
  // become H2s when content lands. The heading TEXT is never changed.
  const h1 = perPage.h1?.[0] ?? r.h1 ?? r.title

  return {
    slug: r.slug,
    key,
    path: urlPath,
    type: (r.type || 'page') as 'page' | 'post' | 'other',
    wpId: r.wp_id ? Number(r.wp_id) : null,
    title: r.title,
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
 * Source: seo-backup/07-migration/seo-map.csv (92 URLs, captured 2026-09-02)
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
console.log(`og:image added to ${records.filter(r => r.og['og:image'] === OG_IMAGE_FALLBACK).length} pages (fix-plan A4)`)
