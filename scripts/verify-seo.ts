/**
 * The acceptance test for the migration.
 *
 * Reads the 92 rows of seo-backup/07-migration/seo-map.csv — the frozen capture
 * of the live site — and asserts the built HTML in dist/ reproduces each one.
 *
 * fix-plan.md: "Any other delta is a regression, not an improvement."
 *
 * Run: npm run seo:verify   (after npm run build)
 */
import fs from 'node:fs'
import path from 'node:path'
import { parseCsv } from './csv.ts'
import { SEO_MAP_CSV, SCHEMA_DIR, DIST, backupKey } from './paths.ts'
import { TITLE_OVERRIDES } from './seo-overrides.ts'
import { seoRecords } from '../src/seo/registry.generated.ts'

if (!fs.existsSync(DIST)) throw new Error('dist/ not found — run `npm run build` first')

const failures: string[] = []
const fail = (url: string, msg: string) => failures.push(`${url}\n    ${msg}`)

const decode = (s: string) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<')
   .replace(/&gt;/g, '>').replace(/&amp;/g, '&')

/** Reads one <meta> content by attribute, tolerating helmet's data-rh and attribute order. */
function meta(html: string, attr: 'name' | 'property', key: string): string | null {
  const re = new RegExp(`<meta[^>]*\\b${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'i')
  const tag = html.match(re)?.[0]
  if (!tag) return null
  return decode(tag.match(/\bcontent="([^"]*)"/)?.[1] ?? '')
}

const rows = parseCsv(fs.readFileSync(SEO_MAP_CSV, 'utf8'))
console.log(`Verifying ${rows.length} URLs against the live-site capture…\n`)

let ogImageAdded = 0
const titlesOverridden: string[] = []

for (const row of rows) {
  const urlPath = new URL(row.url).pathname
  const file = path.join(DIST, urlPath, 'index.html')

  if (!fs.existsSync(file)) { fail(row.url, `NOT BUILT — expected ${path.relative(DIST, file)}`); continue }
  const html = fs.readFileSync(file, 'utf8')

  /* ---- frozen signals: must match the capture exactly -------------------- */
  // A slug in TITLE_OVERRIDES is checked just as strictly, against the new
  // string instead of the captured one. See scripts/seo-overrides.ts.
  const wantTitle = TITLE_OVERRIDES[row.slug] ?? row.title
  if (TITLE_OVERRIDES[row.slug]) titlesOverridden.push(`${row.url}\n      was: ${row.title}\n      now: ${wantTitle}`)

  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? '')
  if (title !== wantTitle) fail(row.url, `title\n      want: ${wantTitle}\n      got:  ${title}`)

  const description = meta(html, 'name', 'description')
  if (description !== row.meta_description)
    fail(row.url, `meta description\n      want: ${row.meta_description}\n      got:  ${description}`)

  const canonical = decode(html.match(/<link[^>]*rel="canonical"[^>]*>/i)?.[0].match(/href="([^"]*)"/)?.[1] ?? '')
  if (canonical !== row.canonical) fail(row.url, `canonical\n      want: ${row.canonical}\n      got:  ${canonical}`)

  const robots = meta(html, 'name', 'robots')
  if (robots !== row.robots) fail(row.url, `robots\n      want: ${row.robots}\n      got:  ${robots}`)

  const twitterCard = meta(html, 'name', 'twitter:card')
  if (row.twitter_card && twitterCard !== row.twitter_card)
    fail(row.url, `twitter:card want "${row.twitter_card}", got "${twitterCard}"`)

  /* ---- JSON-LD: byte-verbatim (fix-plan: "highest-value asset on the site") */
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  if (!ld) fail(row.url, 'no JSON-LD block')
  else {
    const expected = fs.readFileSync(path.join(SCHEMA_DIR, `${backupKey(row.slug, row.url)}.jsonld`), 'utf8').trim()
    if (ld !== expected) fail(row.url, 'JSON-LD is not byte-identical to the capture')
  }

  /* ---- fix-plan A5: exactly one H1 --------------------------------------- */
  const h1s = html.match(/<h1[\s>]/gi)?.length ?? 0
  if (h1s !== 1) fail(row.url, `expected exactly 1 <h1>, found ${h1s}`)

  /* ---- fix-plan A4: og:image on every page (the one intended addition) ---- */
  const ogImage = meta(html, 'property', 'og:image')
  if (!ogImage) fail(row.url, 'no og:image')
  else if (!row.og_image) ogImageAdded++
}

/* ---- every built page, captured or authored: the share + local surface --- */
// The checks above hold the 92 captured URLs to the capture. These hold all of
// seoRecords — the authored pages too — to what a page needs whatever its
// origin: a self-referencing canonical, a complete share card, parseable
// structured data, and no same-origin URL in <head> that 404s.
const SITE = 'https://dermasolutions.co.in'
const SHARE_TAGS: [attr: 'name' | 'property', key: string][] = [
  ['property', 'og:title'], ['property', 'og:description'], ['property', 'og:url'],
  ['property', 'og:image'], ['property', 'og:image:width'], ['property', 'og:image:height'],
  ['property', 'og:image:alt'], ['name', 'twitter:card'], ['name', 'twitter:title'],
  ['name', 'twitter:description'], ['name', 'twitter:image'],
]
let extraBlocks = 0
const deadUrls = new Map<string, string>() // url -> first page it was seen on

/** A same-origin URL resolves if dist/ holds that file, or that directory's index.html. */
function resolvesInDist(url: string): boolean {
  const pathname = decodeURIComponent(new URL(url).pathname)
  const file = path.join(DIST, pathname)
  return pathname.endsWith('/') ? fs.existsSync(path.join(file, 'index.html')) : fs.existsSync(file)
}

for (const record of seoRecords) {
  const file = path.join(DIST, record.path, 'index.html')
  if (!fs.existsSync(file)) { fail(record.canonical, `NOT BUILT — expected ${path.relative(DIST, file)}`); continue }
  const html = fs.readFileSync(file, 'utf8')
  const head = html.slice(0, html.indexOf('</head>'))

  const canonical = decode(head.match(/<link[^>]*rel="canonical"[^>]*>/i)?.[0].match(/href="([^"]*)"/)?.[1] ?? '')
  if (canonical !== `${SITE}${record.path}`) fail(record.canonical, `canonical is not self-referencing: ${canonical}`)

  for (const [attr, key] of SHARE_TAGS) {
    // A page the capture gives no description (the category archive) has none
    // to mirror, and inventing one is not this check's call.
    if (key.endsWith(':description') && !record.description) continue
    if (!meta(head, attr, key)) fail(record.canonical, `missing ${key}`)
  }
  const ogUrl = meta(head, 'property', 'og:url')
  if (ogUrl && ogUrl !== canonical) fail(record.canonical, `og:url ${ogUrl} differs from canonical`)

  const blocks = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1])
  if (blocks.length > 1) extraBlocks++
  for (const [i, block] of blocks.entries()) {
    try { JSON.parse(block) } catch { fail(record.canonical, `JSON-LD block ${i + 1} does not parse`) }
  }

  const urls = [
    ...[...head.matchAll(/\b(?:content|href)="(https:\/\/dermasolutions\.co\.in\/[^"]*)"/g)].map(m => decode(m[1])),
    ...blocks.flatMap(b => [...b.matchAll(/"(https:\/\/dermasolutions\.co\.in\/[^"#?]*)/g)].map(m => m[1])),
  ]
  for (const url of urls) {
    if (!deadUrls.has(url) && !resolvesInDist(url)) deadUrls.set(url, record.canonical)
  }
}
for (const [url, page] of deadUrls) fail(page, `same-origin URL in <head> or JSON-LD does not resolve in dist/: ${url}`)

/* ---- the JSON-LD must not also be sitting in the JS bundle --------------- */
const assets = path.join(DIST, 'assets')
const leaked = fs.existsSync(assets)
  ? fs.readdirSync(assets).filter(f => f.endsWith('.js'))
      .filter(f => fs.readFileSync(path.join(assets, f), 'utf8').includes('#medicalorganization'))
  : []
if (leaked.length) failures.push(`JS bundle leak\n    JSON-LD reached the client bundle: ${leaked.join(', ')}`)

/* ---- report -------------------------------------------------------------- */
if (failures.length) {
  console.error(`FAILED — ${failures.length} problem(s):\n`)
  for (const f of failures) console.error(`  ${f}\n`)
  process.exit(1)
}

if (titlesOverridden.length) {
  console.log(`Deliberate title rewrites (${titlesOverridden.length}) — seo-overrides.ts:`)
  for (const t of titlesOverridden) console.log(`  ${t}\n`)
}

const exact = rows.length - titlesOverridden.length
console.log(`PASS — ${exact}/${rows.length} URLs reproduce the capture exactly.`)
console.log('  title, meta description, canonical, robots, twitter:card  identical (titles: see above)')
console.log('  JSON-LD                                                   byte-identical')
console.log('  <h1>                                                      exactly one per page (fix-plan A5)')
console.log(`  og:image                                                  added to ${ogImageAdded} pages that had none (fix-plan A4)`)
console.log(`\nAll ${seoRecords.length} built pages (captured + authored):`)
console.log('  canonical self-referencing; og:* and twitter:* share card complete')
console.log('  every JSON-LD block parses; every same-origin URL in <head> and JSON-LD resolves in dist/')
console.log(`  authored second JSON-LD block on ${extraBlocks} pages (src/seo/schema-extra/)`)
