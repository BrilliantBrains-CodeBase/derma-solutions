/**
 * Crops and resizes each treatment page's featured photograph, video poster,
 * client-supplied WorkDrive banner, and treatment-specific sidebar portrait
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
 * Every generated treatment page must have both primary files and a mapped
 * banner, or this exits non-zero. The eight pages with a `compare` pair get two
 * more, cropped on the same anchor as each other so the two halves line up
 * under the slider's divider. Each banner gets desktop 1x/2x renditions and a
 * square centre crop that keeps its baked-in message legible on phones. Each
 * sidebar portrait gets a 2x WebP rendition for the 383x468 opening-hours card.
 *
 * Run: npm run assets:treatments
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { MEDIA_FILES, PUBLIC, SRC } from './paths.ts'
import {
  treatmentMedia,
  treatmentBannerPath,
  treatmentBannerMobilePath,
  treatmentBannerMobileSlot,
  treatmentBannerSmallPath,
  treatmentBannerSlot,
  treatmentBannerSources,
  treatmentComparePath,
  treatmentImagePath,
  treatmentImageSlot,
  treatmentSidebarImagePath,
  treatmentSidebarImageSlot,
  treatmentSidebarMedia,
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

const BANNER_ROOT = path.join(
  path.dirname(SRC),
  'content',
  'Treatment',
  'Zoho WorkDrive-5',
)

const SIDEBAR_ROOT = path.join(
  path.dirname(SRC),
  'content',
  'Treatment',
  'Zoho WorkDrive-6',
)

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
const bannersUnmapped = slugs.filter(slug => !treatmentBannerSources[slug])
const bannersOrphaned = Object.keys(treatmentBannerSources).filter(slug => !slugs.includes(slug))
const sidebarsUnmapped = slugs.filter(slug => !treatmentSidebarMedia[slug])
const sidebarsOrphaned = Object.keys(treatmentSidebarMedia).filter(slug => !slugs.includes(slug))

const outDir = path.join(PUBLIC, 'images', 'treatments')
fs.mkdirSync(outDir, { recursive: true })

let written = 0
let bannersWritten = 0
let sidebarsWritten = 0
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

async function writeBanner(
  slug: string,
  filename: string,
  slot: { width: number; height: number },
  url: string,
) {
  const file = path.join(BANNER_ROOT, filename)
  if (!fs.existsSync(file)) { missing.push(`${slug}: banner:${filename}`); return }

  await sharp(file)
    .resize(slot.width, slot.height, { fit: 'cover', position: 'centre' })
    .webp({ quality: 90, smartSubsample: true })
    .toFile(path.join(PUBLIC, url))
  bannersWritten++
}

async function writeSidebarImage(slug: string) {
  const source = treatmentSidebarMedia[slug]
  if (!source) return

  const file = path.join(SIDEBAR_ROOT, source.from)
  if (!fs.existsSync(file)) { missing.push(`${slug}: sidebar:${source.from}`); return }

  await sharp(file)
    .resize(treatmentSidebarImageSlot.width, treatmentSidebarImageSlot.height, {
      fit: 'cover',
      position: 'centre',
    })
    .webp({ quality: 86, smartSubsample: true })
    .toFile(path.join(PUBLIC, treatmentSidebarImagePath(slug)))
  sidebarsWritten++
}

for (const slug of slugs) {
  const media = treatmentMedia[slug]
  if (!media) continue
  await writeOne(slug, media.image, treatmentImageSlot, treatmentImagePath(slug))
  await writeOne(slug, media.video, treatmentVideoSlot, treatmentVideoPosterPath(slug))

  // A comparison pair is cropped to the same slot as the featured image, and
  // both halves take the same anchor: 'attention' would find a different
  // subject in each and the two would not register under the divider.
  if (media.compare) {
    const anchor = media.compare.before.position ?? 'centre'
    for (const side of ['before', 'after'] as const) {
      const source = { ...media.compare[side], position: anchor }
      await writeOne(slug, source, treatmentImageSlot, treatmentComparePath(slug, side))
    }
  }

  const banner = treatmentBannerSources[slug]
  if (banner) {
    await writeBanner(slug, banner, treatmentBannerSlot, treatmentBannerSmallPath(slug))
    await writeBanner(
      slug,
      banner,
      { width: treatmentBannerSlot.width * 2, height: treatmentBannerSlot.height * 2 },
      treatmentBannerPath(slug),
    )
    await writeBanner(slug, banner, treatmentBannerMobileSlot, treatmentBannerMobilePath(slug))
  }

  await writeSidebarImage(slug)
}

// Anything left in the folder that no page references is stale output.
const expected = new Set(
  slugs
    .flatMap(s => [
      treatmentImagePath(s),
      treatmentVideoPosterPath(s),
      ...(treatmentMedia[s]?.compare
        ? [treatmentComparePath(s, 'before'), treatmentComparePath(s, 'after')]
        : []),
      treatmentBannerSmallPath(s),
      treatmentBannerPath(s),
      treatmentBannerMobilePath(s),
      treatmentSidebarImagePath(s),
    ])
    .map(p => path.basename(p)),
)
for (const file of fs.readdirSync(outDir)) {
  if (!expected.has(file)) fs.rmSync(path.join(outDir, file))
}

console.log(`treatment images: ${written} written to public/images/treatments/ (${small} below the slot's 1x width — see the stock flags)`)
console.log(`treatment banners: ${bannersWritten} responsive files written (${bannersWritten / 3} pages)`)
console.log(`treatment sidebars: ${sidebarsWritten} files written`)
const stock = Object.values(treatmentMedia).flatMap(m =>
  [m.image, m.video, m.compare?.before, m.compare?.after].filter(source => source?.stock),
)
console.log(`  ${stock.length} of ${written} are stock/AI stand-ins pending clinic photography (TODO(assets))`)

const problems = [
  ...unmapped.map(s => `no media entry for ${s}`),
  ...orphaned.map(s => `media entry for ${s}, which has no treatment page`),
  ...bannersUnmapped.map(s => `no banner entry for ${s}`),
  ...bannersOrphaned.map(s => `banner entry for ${s}, which has no treatment page`),
  ...sidebarsUnmapped.map(s => `no sidebar entry for ${s}`),
  ...sidebarsOrphaned.map(s => `sidebar entry for ${s}, which has no treatment page`),
  ...missing.map(s => `source not found — ${s}`),
]
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n  ${problems.join('\n  ')}`)
  if (missing.some(m => m.includes('clinic:'))) console.error(`\n  clinic: sources resolve against ${CLINIC_ROOT} — set HOME_IMAGES if they moved.`)
  process.exit(1)
}
