/**
 * Derives the favicon sizes and the site-wide og:image from the brand assets.
 *
 * Neither exists in the backup: seo-backup/06-media/files/ holds only the 512px
 * master favicon (the sized crops were never captured), and the live site has no
 * og:image at all on 55 pages — which is precisely fix-plan A4's finding.
 *
 * Run: npm run seo:icons   (after npm run seo:assets)
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { PUBLIC } from './paths.ts'

const master = path.join(PUBLIC, 'images/brand/favicon-master.png')
const logo = path.join(PUBLIC, 'images/brand/derma-solutions-logo-bg.png')

/** Wrap a PNG in an ICO container. Every current browser reads PNG-in-ICO. */
function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)   // reserved
  header.writeUInt16LE(1, 2)   // type: icon
  header.writeUInt16LE(1, 4)   // one image

  const entry = Buffer.alloc(16)
  entry.writeUInt8(size >= 256 ? 0 : size, 0) // width  (0 means 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
  entry.writeUInt8(0, 2)                      // palette
  entry.writeUInt8(0, 3)                      // reserved
  entry.writeUInt16LE(1, 4)                   // colour planes
  entry.writeUInt16LE(32, 6)                  // bits per pixel
  entry.writeUInt32LE(png.length, 8)
  entry.writeUInt32LE(header.length + entry.length, 12)

  return Buffer.concat([header, entry, png])
}

const FAVICONS: [number, string][] = [
  [32, 'images/brand/favicon-32x32.png'],
  [192, 'images/brand/favicon-192x192.png'],
  [180, 'images/brand/apple-touch-icon.png'],
]

for (const [size, dest] of FAVICONS) {
  await sharp(master).resize(size, size, { fit: 'cover' }).png().toFile(path.join(PUBLIC, dest))
}

const ico32 = await sharp(master).resize(32, 32, { fit: 'cover' }).png().toBuffer()
fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), pngToIco(ico32, 32))

/**
 * og:image — 1200x630, the size every scraper crops to. A logo lockup on the
 * theme's cream ground; replace with clinic photography when it is available.
 */
const OG_W = 1200
const OG_H = 630
const logoOnOg = await sharp(logo).resize(560, 560, { fit: 'inside', withoutEnlargement: false }).toBuffer()

await sharp({
  create: { width: OG_W, height: OG_H, channels: 3, background: '#FCF4F1' }, // --color-secondary
})
  .composite([{ input: logoOnOg, gravity: 'centre' }])
  .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
  .toFile(path.join(PUBLIC, 'images/brand/og-default.jpg'))

console.log(`icons: ${FAVICONS.length} favicons + favicon.ico`)
console.log(`og:    images/brand/og-default.jpg (${OG_W}x${OG_H}) — placeholder, replace with clinic photography`)
