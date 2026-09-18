/**
 * Resizes the image gallery's fourteen photographs into
 * public/images/image-gallery/, and writes their output dimensions to
 * src/content/gallery/photoSizes.generated.ts.
 *
 * Same shape as import-treatment-images.ts and import-blog-images.ts: the
 * source, the alt and the output path all come from one table
 * (src/content/galleryMedia.ts), so the file on disk and the words describing it
 * cannot drift. Offline and deterministic — nothing here touches the network.
 *
 * Two renditions per photograph, as the blog script does:
 *  - <id>.jpg      up to 820 wide, the tile at 2x
 *  - <id>-640.jpg  up to 640 wide, what a phone and the sm grid actually pull
 *
 * The one real departure from the two scripts this is modelled on: they both
 * crop to a fixed frame, and this one never crops at all. It resizes by width
 * and lets the height fall where the source puts it.
 *
 * That is the whole point of the page. Every file here is two photographs
 * composed into one frame, several with labels burned into an edge — case-04's
 * "before" sits in the top 8%, case-screenshot-2023's BEFORE/AFTER across the
 * bottom 15% — so any crop that squares the frame is a crop that can take a
 * label or half a pair with it. An earlier revision squared them anyway and
 * padded the two odd sources onto white to compensate; keeping the native
 * aspect removes the crop and the padding together, and the grid absorbs it
 * because twelve of the fourteen sources are square within 2% regardless.
 *
 * Nothing is upscaled. Photographs held back by `hold` are still written: a hold
 * is an editorial decision about the page, not about the import.
 *
 * Run: npm run assets:gallery
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { MEDIA_FILES, PUBLIC, SRC } from './paths.ts'
import {
  galleryPhotoPath,
  galleryPhotoSmall,
  galleryPhotoSmallPath,
  galleryPhotoWidth,
  galleryPhotos,
} from '../src/content/galleryMedia.ts'

/** The gallery draws entirely on the live site's own uploads. */
function resolveSource(from: string): string {
  const [root, ...rest] = from.split(':')
  const rel = rest.join(':')
  if (root !== 'backup') throw new Error(`Unsupported source root "${root}" in "${from}" — the gallery uses backup: only`)
  return path.join(MEDIA_FILES, rel)
}

const outDir = path.join(PUBLIC, 'images', 'image-gallery')
const contentDir = path.join(SRC, 'content', 'gallery')
fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(contentDir, { recursive: true })

const missing: string[] = []
const seen = new Set<string>()
const sizes: Record<string, { width: number; height: number; smallWidth: number }> = {}
let written = 0
let soft = 0

for (const photo of galleryPhotos) {
  // macOS is case-insensitive, so two ids differing only in case would collide
  // on disk while looking distinct here.
  const key = photo.id.toLowerCase()
  if (seen.has(key)) throw new Error(`Duplicate gallery photo id "${photo.id}"`)
  seen.add(key)

  const file = resolveSource(photo.from)
  if (!fs.existsSync(file)) {
    missing.push(`${photo.id}: ${photo.from}`)
    continue
  }

  const render = (width: number) =>
    sharp(file)
      // withoutEnlargement is what keeps a small source at its own resolution
      // rather than blowing it up to the slot.
      .resize({ width, withoutEnlargement: true })
      // A PNG source may carry alpha; JPEG has none.
      .flatten({ background: '#FFFFFF' })

  const large = await render(galleryPhotoWidth)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(PUBLIC, galleryPhotoPath(photo.id)))

  const small = await render(galleryPhotoSmall)
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(PUBLIC, galleryPhotoSmallPath(photo.id)))

  // sharp reports what it actually wrote, which is the only trustworthy source
  // for the <img>'s width/height once nothing is being cropped to a known frame.
  //
  // smallWidth is recorded for the same reason: a source narrower than 640 is
  // not enlarged, so both renditions come out at its own width, and a srcset
  // claiming 640w and 820w for two identical 480px files would have the browser
  // pick against numbers that are not true.
  sizes[photo.id] = { width: large.width, height: large.height, smallWidth: small.width }
  if (large.width < galleryPhotoWidth) soft++
  written += 2
}

// Anything left in the folder that the table no longer references is stale.
const expected = new Set(
  galleryPhotos.flatMap(p => [galleryPhotoPath(p.id), galleryPhotoSmallPath(p.id)].map(u => path.basename(u))),
)
for (const file of fs.readdirSync(outDir)) {
  if (!expected.has(file)) fs.rmSync(path.join(outDir, file))
}

fs.writeFileSync(
  path.join(contentDir, 'photoSizes.generated.ts'),
  `/**
 * GENERATED FILE — DO NOT EDIT. Run \`npm run assets:gallery\`.
 *
 * The pixel dimensions of each photograph in public/images/image-gallery/, as
 * sharp reported them on the way out. PhotoGallery puts these on the <img> so
 * the browser reserves the right box from the intrinsic ratio before the file
 * arrives — the gallery crops nothing, so there is no fixed frame to assume.
 *
 * \`smallWidth\` is the -640 rendition's real width, which is not always 640:
 * nothing is enlarged, so a source narrower than that comes out at its own size
 * and the two renditions are identical. PhotoGallery drops the srcset in that
 * case rather than describing both files with widths they do not have.
 *
 * The ids, their order and their alt text are editorial and live in
 * src/content/galleryMedia.ts.
 */
export const photoSizes: Record<string, { width: number; height: number; smallWidth: number }> = ${JSON.stringify(sizes, null, 2)}
`,
)

const held = galleryPhotos.filter(p => p.hold)
console.log(`gallery images: ${written} written to public/images/image-gallery/ (${soft} below the tile's 2x width)`)
console.log(`  sizes -> src/content/gallery/photoSizes.generated.ts (${Object.keys(sizes).length} entries)`)
if (held.length) {
  console.log(`  ${held.length} imported but held back from the page (TODO(compliance)): ${held.map(p => p.id).join(', ')}`)
}

if (missing.length) {
  console.error(`\n${missing.length} source(s) not found:\n  ${missing.join('\n  ')}`)
  console.error(`\n  backup: sources resolve against ${MEDIA_FILES}`)
  process.exit(1)
}
