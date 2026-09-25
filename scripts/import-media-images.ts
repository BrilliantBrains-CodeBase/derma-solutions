/**
 * Resizes the press scans into public/images/media/.
 *
 * Same shape as import-blog-images.ts. The sources are the pages the PR agency
 * sent for the coverage that has no live link — a magazine page and a newspaper
 * clipping — kept in content/media/ beside the other client material, because
 * unlike every other image on this site they exist nowhere else.
 *
 * Two renditions per scan, both keeping the source's own proportions: a page a
 * reader can actually read, and a card thumbnail. Nothing is upscaled.
 *
 * Every snapshot in src/content/media.ts must resolve to a source file here, or
 * this exits non-zero.
 *
 * Run: npm run assets:media
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { ROOT, PUBLIC } from './paths.ts'
import { mediaItems } from '../src/content/media.ts'

const SOURCE_DIR = path.join(ROOT, 'content', 'media')
const FULL_WIDTH = 1400
const THUMB_WIDTH = 640

const outDir = path.join(PUBLIC, 'images', 'media')
fs.mkdirSync(outDir, { recursive: true })

const problems: string[] = []
let written = 0

for (const item of mediaItems) {
  if (!item.snapshot) continue

  // The public paths are the data's; the source is the same basename in content/media/.
  const base = path.basename(item.snapshot.src, '.jpg')
  const source = path.join(SOURCE_DIR, `${base}.jpg`)
  if (!fs.existsSync(source)) {
    problems.push(`${item.id}: no source at content/media/${base}.jpg`)
    continue
  }

  const expectedThumb = `/images/media/${base}-thumb.jpg`
  if (item.snapshot.thumb !== expectedThumb) {
    problems.push(`${item.id}: thumb should be ${expectedThumb}, data says ${item.snapshot.thumb}`)
    continue
  }

  const meta = await sharp(source).metadata()
  for (const [width, suffix] of [
    [Math.min(FULL_WIDTH, meta.width!), ''],
    [Math.min(THUMB_WIDTH, meta.width!), '-thumb'],
  ] as const) {
    await sharp(source)
      .resize(width)
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(outDir, `${base}${suffix}.jpg`))
    written++
  }
}

if (problems.length) {
  console.error(`media images: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`)
  process.exit(1)
}

console.log(`media images: ${written} files in public/images/media/`)
