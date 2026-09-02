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

for (const row of rows) {
  const urlPath = new URL(row.url).pathname
  const file = path.join(DIST, urlPath, 'index.html')

  if (!fs.existsSync(file)) { fail(row.url, `NOT BUILT — expected ${path.relative(DIST, file)}`); continue }
  const html = fs.readFileSync(file, 'utf8')

  /* ---- frozen signals: must match the capture exactly -------------------- */
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? '')
  if (title !== row.title) fail(row.url, `title\n      want: ${row.title}\n      got:  ${title}`)

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

console.log(`PASS — ${rows.length}/${rows.length} URLs reproduce the capture exactly.`)
console.log('  title, meta description, canonical, robots, twitter:card  identical')
console.log('  JSON-LD                                                   byte-identical')
console.log('  <h1>                                                      exactly one per page (fix-plan A5)')
console.log(`  og:image                                                  added to ${ogImageAdded} pages that had none (fix-plan A4)`)
