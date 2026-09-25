/**
 * Copies every /wp-content/uploads/ file the built site still points at into
 * dist/, at the same path, so those URLs keep resolving after WordPress is gone.
 *
 * Two things reference them and neither can be edited from this side: the
 * JSON-LD graphs, which ship byte-verbatim (the clinic logo and image, doctor
 * photos), and the captured og:image of every blog post. Serving the original
 * files at the original URLs keeps both valid and keeps the Google Images
 * entries that point at them.
 *
 * Written to dist/ rather than public/: the files are ~45MB and already tracked
 * under seo-backup/, so a second copy in the repo buys nothing.
 *
 * Run: npm run seo:wp-mirror (chained onto `npm run build`)
 */
import fs from 'node:fs'
import path from 'node:path'
import { DIST, MEDIA_FILES, SCHEMA_OUT, SEO_OUT, SITE_URL } from './paths.ts'

if (!fs.existsSync(DIST)) throw new Error('dist/ not found — run the build first')

const PREFIX = `${SITE_URL}/wp-content/uploads/`
const pattern = new RegExp(`${PREFIX.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}[^"\\\\\\s]+`, 'g')

const sources = [
  path.join(SEO_OUT, 'registry.generated.ts'),
  ...fs.readdirSync(SCHEMA_OUT).filter(f => f.endsWith('.json')).map(f => path.join(SCHEMA_OUT, f)),
]

const referenced = new Set<string>()
for (const file of sources) {
  for (const m of fs.readFileSync(file, 'utf8').matchAll(pattern)) referenced.add(m[0].slice(PREFIX.length))
}

const missing: string[] = []
for (const rel of referenced) {
  const src = path.join(MEDIA_FILES, rel)
  if (!fs.existsSync(src)) { missing.push(rel); continue }
  const dest = path.join(DIST, 'wp-content', 'uploads', rel)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
}

if (missing.length) {
  throw new Error(`referenced but not in seo-backup/06-media/files/:\n  ${missing.join('\n  ')}`)
}
console.log(`wp-mirror: ${referenced.size} legacy uploads -> dist/wp-content/uploads/`)
