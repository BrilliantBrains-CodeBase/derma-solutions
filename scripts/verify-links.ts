/**
 * Asserts every internal path referenced by src/config/site.ts and the blog
 * content (src/content/blog/) resolves to one of the 92 built routes.
 *
 * fix-plan.md calls the service pages' ~95 inbound internal links "load-bearing"
 * and lists a nav entry that already 404s on the live site. A typo in the nav is
 * silent in a React app — this makes it loud.
 *
 * Run: npm run seo:links
 */
import fs from 'node:fs'
import path from 'node:path'
import { seoRecords } from '../src/seo/registry.generated.ts'
import { PUBLIC, SRC } from './paths.ts'
import { blogIndex } from '../src/content/blog/index.generated.ts'
import { mediaItems } from '../src/content/media.ts'
import { navigation, serviceMenu, team, legal, seo } from '../src/config/site.ts'

const known = new Set(seoRecords.map(r => r.path))

/**
 * Paths that are knowingly dangling, with the decision still owed to a human.
 * Listed here so the check reports them without going permanently red — an
 * always-failing check is one nobody reads.
 */
const KNOWN_DANGLING: Record<string, string> = {}
const seen = new Map<string, string>() // path -> where it came from
const record = (p: string, where: string) => { if (!seen.has(p)) seen.set(p, where) }

for (const group of serviceMenu) {
  if ('path' in group) record(group.path, `serviceMenu:${group.group}`)
  for (const item of group.items) record(item.path, `serviceMenu:${group.group}`)
}
for (const item of navigation.header) {
  if ('path' in item) record(item.path, 'navigation.header')
  // The CTA carries `href`, not `path`, because it may be a tel:/mailto: link.
  // Only the internal form is checkable — without this a typo in the CTA target
  // is exactly the silent 404 this script exists to prevent.
  if ('href' in item && item.href.startsWith('/')) record(item.href, 'navigation.header:cta')
  if ('items' in item) for (const sub of item.items) record(sub.path, 'navigation.header')
}
for (const item of navigation.quickLinks) record(item.path, 'navigation.quickLinks')
for (const item of navigation.footer) record(item.path, 'navigation.footer')
for (const doctor of team) record(doctor.path, `team:${doctor.id}`)
record(legal.privacyPolicyPath, 'legal.privacyPolicyPath')
record(legal.termsPath, 'legal.termsPath')
record(seo.contactPath, 'seo.contactPath')

// The blog: every card's destination, each post's related posts and service
// link, and every root-relative href inside a post body.
for (const post of blogIndex) {
  record(post.path, 'blog index')
  const file = path.join(SRC, 'content', 'blog', 'posts', `${post.slug}.ts`)
  const source = fs.readFileSync(file, 'utf8')
  const { default: content } = await import(file)
  for (const slug of content.relatedSlugs) {
    const target = blogIndex.find(p => p.slug === slug)
    record(target?.path ?? `/${slug}/ (unknown post)`, `blog:${post.slug}:related`)
  }
  if (content.serviceLink) record(content.serviceLink.path, `blog:${post.slug}:serviceLink`)
  for (const m of source.matchAll(/href=\\"(\/[^"\\#?]*)/g)) record(m[1], `blog:${post.slug}:body`)
}

/**
 * The press coverage (src/content/media.ts) is hand-authored and points off-site,
 * so none of the checks above reach it. What can be checked without the network
 * is checked here: the shape of every entry, and that the scans it names exist.
 */
const mediaProblems: string[] = []
const mediaIds = new Set<string>()

for (const item of mediaItems) {
  const where = `media:${item.id}`
  if (mediaIds.has(item.id)) mediaProblems.push(`${where}: duplicate id`)
  mediaIds.add(item.id)

  if (Number.isNaN(Date.parse(item.date))) mediaProblems.push(`${where}: unparseable date "${item.date}"`)

  const links = [...(item.url ? [item.url] : []), ...(item.alsoIn ?? []).map(o => o.url)]
  if (!links.length && !item.snapshot) mediaProblems.push(`${where}: neither a url nor a snapshot`)

  for (const url of links) {
    if (!url.startsWith('https://')) mediaProblems.push(`${where}: ${url} is not an absolute https URL`)
    // A press mention that points back here is a mis-paste, not coverage.
    if (/dermasolutions\.co\.in/.test(url)) mediaProblems.push(`${where}: ${url} points at this site`)
  }

  for (const file of item.snapshot ? [item.snapshot.src, item.snapshot.thumb] : []) {
    if (!fs.existsSync(path.join(PUBLIC, file.replace(/^\//, '')))) {
      mediaProblems.push(`${where}: ${file} is not in public/ — run npm run assets:media`)
    }
  }
}

console.log(`\npress coverage entries: ${mediaItems.length}`)
console.log(`  outbound links:                      ${mediaItems.reduce((n, i) => n + (i.url ? 1 : 0) + (i.alsoIn?.length ?? 0), 0)}`)
if (mediaProblems.length) {
  console.error(`\nBROKEN — src/content/media.ts:`)
  for (const m of mediaProblems) console.error(`  ${m}`)
}

const dangling = [...seen].filter(([p]) => !known.has(p))
const broken = dangling.filter(([p]) => !(p in KNOWN_DANGLING))
const expected = dangling.filter(([p]) => p in KNOWN_DANGLING)
const orphans = seoRecords.filter(r => !seen.has(r.path) && r.type === 'page' && r.path !== '/')

console.log(`internal paths referenced by site.ts and the blog: ${seen.size}`)
console.log(`  resolve to a built route:            ${seen.size - dangling.length}`)

if (expected.length) {
  console.log(`\nKnown dangling (${expected.length}) — carried over from the live site, decision owed:`)
  for (const [p, where] of expected) console.log(`  ${p}  (from ${where})\n    ${KNOWN_DANGLING[p]}`)
}

if (broken.length) {
  console.error(`\nBROKEN — these link to URLs that do not exist:`)
  for (const [p, where] of broken) console.error(`  ${p}\n    from ${where}`)
}

if (orphans.length) {
  console.log(`\nNot linked from the nav (${orphans.length}) — reachable only by URL:`)
  for (const o of orphans) console.log(`  ${o.path}`)
}

process.exit(broken.length || mediaProblems.length ? 1 : 0)
