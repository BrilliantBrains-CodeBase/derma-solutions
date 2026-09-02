/**
 * Asserts every internal path referenced by src/config/site.ts resolves to one
 * of the 92 built routes.
 *
 * fix-plan.md calls the service pages' ~95 inbound internal links "load-bearing"
 * and lists a nav entry that already 404s on the live site. A typo in the nav is
 * silent in a React app — this makes it loud.
 *
 * Run: npm run seo:links
 */
import { seoRecords } from '../src/seo/registry.generated.ts'
import { navigation, serviceMenu, team, legal, seo } from '../src/config/site.ts'

const known = new Set(seoRecords.map(r => r.path))

/**
 * Paths that are knowingly dangling, with the decision still owed to a human.
 * Listed here so the check reports them without going permanently red — an
 * always-failing check is one nobody reads.
 */
const KNOWN_DANGLING: Record<string, string> = {
  '/contact-us/':
    'Pre-existing on the live site. The Service schema sets serviceUrl to /contact-us/, which is not one of the 92 URLs — it 404s today. Already flagged as TODO(rebuild) in src/config/site.ts. Fix by building the page, NOT by editing the schema (it ships byte-verbatim).',
  '/book-appointment/':
    'The header CTA target (contact.ctaHref). Not one of the 92 captured URLs — the page is planned, not built. Remove this entry once it exists.',
}
const seen = new Map<string, string>() // path -> where it came from
const record = (p: string, where: string) => { if (!seen.has(p)) seen.set(p, where) }

for (const group of serviceMenu) for (const item of group.items) record(item.path, `serviceMenu:${group.group}`)
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

const dangling = [...seen].filter(([p]) => !known.has(p))
const broken = dangling.filter(([p]) => !(p in KNOWN_DANGLING))
const expected = dangling.filter(([p]) => p in KNOWN_DANGLING)
const orphans = seoRecords.filter(r => !seen.has(r.path) && r.type === 'page' && r.path !== '/')

console.log(`internal paths referenced by site.ts: ${seen.size}`)
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

process.exit(broken.length ? 1 : 0)
