/**
 * Crops and resizes each treatment page's featured photograph and video poster
 * into public/images/treatments/.
 *
 * Same shape as import-home-images.ts, but the source -> destination table is
 * not in this file: it is src/content/treatmentMedia.ts, which the page also
 * reads for its alt text, so the image and its description are chosen in one
 * place. See that file's header for where each source root points and what was
 * deliberately left out.
 *
 * Unlike the homepage slots, most sources here are smaller than the slot at 2x
 * (the live site's photos are mostly 650x450). They are cropped to the slot's
 * aspect ratio at their own resolution and never upscaled — enlarging adds bytes,
 * not detail, and the browser scales them the rest of the way.
 *
 * Every generated treatment page must have both files, or this exits non-zero.
 *
 * Run: npm run assets:treatments
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { MEDIA_FILES, PUBLIC, SRC } from './paths.ts'
import {
  treatmentMedia,
  treatmentImagePath,
  treatmentImageSlot,
  treatmentVideoPosterPath,
  treatmentVideoSlot,
  type MediaSource,
} from '../src/content/treatmentMedia.ts'

/** The clinic's own shoot, outside the repo — the same default as import-home-images.ts. */
const CLINIC_ROOT = process.env.HOME_IMAGES ?? '/Users/d1/Downloads/Website/Home Page'

const ROOTS: Record<string, string> = {
  clinic: CLINIC_ROOT,
  backup: MEDIA_FILES,
  public: PUBLIC,
}

function resolveSource(from: string): string {
  const [root, ...rest] = from.split(':')
  const base = ROOTS[root]
  if (!base || !rest.length) throw new Error(`bad media source "${from}" — expected clinic:, backup: or public:`)
  return path.join(base, rest.join(':'))
}

/** The largest box of the slot's aspect ratio that fits the source, capped at 2x the slot. */
function outputSize(srcW: number, srcH: number, slot: { width: number; height: number }) {
  const ratio = slot.width / slot.height
  let width = Math.min(slot.width * 2, srcW, Math.floor(srcH * ratio))
  if (width < 1) width = 1
  return { width, height: Math.round(width / ratio) }
}

const slugs = fs
  .readdirSync(path.join(SRC, 'content', 'treatments'))
  .filter(f => f.endsWith('.ts'))
  .map(f => f.replace(/\.ts$/, ''))

const missing: string[] = []
const unmapped = slugs.filter(slug => !treatmentMedia[slug])
const orphaned = Object.keys(treatmentMedia).filter(slug => !slugs.includes(slug))

const outDir = path.join(PUBLIC, 'images', 'treatments')
fs.mkdirSync(outDir, { recursive: true })

let written = 0
let small = 0

async function writeOne(slug: string, source: MediaSource, slot: { width: number; height: number }, url: string) {
  const file = resolveSource(source.from)
  if (!fs.existsSync(file)) { missing.push(`${slug}: ${source.from}`); return }

  const meta = await sharp(file).metadata()
  const size = outputSize(meta.width!, meta.height!, slot)
  if (size.width < slot.width) small++

  await sharp(file)
    .resize(size.width, size.height, { fit: 'cover', position: source.position ?? 'attention' })
    .flatten({ background: '#FFFFFF' }) // PNG sources may carry alpha; JPEG has none.
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(PUBLIC, url))
  written++
}

for (const slug of slugs) {
  const media = treatmentMedia[slug]
  if (!media) continue
  await writeOne(slug, media.image, treatmentImageSlot, treatmentImagePath(slug))
  await writeOne(slug, media.video, treatmentVideoSlot, treatmentVideoPosterPath(slug))
}

// Anything left in the folder that no page references is stale output.
const expected = new Set(slugs.flatMap(s => [treatmentImagePath(s), treatmentVideoPosterPath(s)].map(p => path.basename(p))))
for (const file of fs.readdirSync(outDir)) {
  if (!expected.has(file)) fs.rmSync(path.join(outDir, file))
}

console.log(`treatment images: ${written} written to public/images/treatments/ (${small} below the slot's 1x width — see the stock flags)`)
const stock = Object.entries(treatmentMedia).flatMap(([slug, m]) => [m.image, m.video].filter(s => s.stock).map(() => slug))
console.log(`  ${stock.length} of ${written} are stock/AI stand-ins pending clinic photography (TODO(assets))`)

const problems = [
  ...unmapped.map(s => `no media entry for ${s}`),
  ...orphaned.map(s => `media entry for ${s}, which has no treatment page`),
  ...missing.map(s => `source not found — ${s}`),
]
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n  ${problems.join('\n  ')}`)
  if (missing.some(m => m.includes('clinic:'))) console.error(`\n  clinic: sources resolve against ${CLINIC_ROOT} — set HOME_IMAGES if they moved.`)
  process.exit(1)
}
