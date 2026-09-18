/**
 * Crops and resizes each post's featured image into public/images/blog/.
 *
 * Same shape as import-treatment-images.ts. The source is the image the live
 * post itself used, resolved through the backup by scripts/blog-source.ts —
 * mostly 1734x907 artwork with the post's title set into it.
 *
 * Two renditions per post, both in the 1200x627 frame HomeLatestBlog already
 * uses for these banners:
 *  - <slug>.jpg      up to 1200 wide, the post page's featured image
 *  - <slug>-640.jpg  640 wide, the listing and related-post cards
 *
 * A dozen sources are taller than the frame (1536x1024, 1507x1044). Their
 * titles sit in the top half, so those are cropped from the top rather than the
 * centre, which would cut the lettering. Nothing is upscaled; the two small
 * sources (650x450, 737x416) are cropped at their own resolution.
 *
 * Run: npm run assets:blog
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { PUBLIC } from './paths.ts'
import { loadSourcePosts } from './blog-source.ts'

const FRAME = { width: 1200, height: 627 }
const RATIO = FRAME.width / FRAME.height

const outDir = path.join(PUBLIC, 'images', 'blog')
fs.mkdirSync(outDir, { recursive: true })

let small = 0

for (const post of loadSourcePosts()) {
  const meta = await sharp(post.image.file).metadata()
  const srcW = meta.width!
  const srcH = meta.height!

  // The largest box of the frame's ratio that fits the source.
  const cropW = Math.min(srcW, Math.floor(srcH * RATIO))
  const cropH = Math.round(cropW / RATIO)
  const left = Math.floor((srcW - cropW) / 2)
  const top = srcW / srcH < RATIO - 0.05 ? 0 : Math.floor((srcH - cropH) / 2)

  const width = Math.min(FRAME.width, cropW)
  if (width < FRAME.width) small++

  const cropped = () => sharp(post.image.file).extract({ left, top, width: cropW, height: cropH })

  await cropped()
    .resize(width, Math.round(width / RATIO))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(outDir, `${post.slug}.jpg`))

  await cropped()
    .resize(640, Math.round(640 / RATIO))
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(outDir, `${post.slug}-640.jpg`))
}

console.log(`blog images: ${fs.readdirSync(outDir).length} files in public/images/blog/ (${small} below 1200 wide at source)`)
