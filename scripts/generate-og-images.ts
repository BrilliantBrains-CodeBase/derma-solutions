/**
 * Per-page og:image — fix-plan A4's second half: "override per-page" for the
 * service pages, so a treatment shared on WhatsApp previews as that treatment
 * rather than as the site-wide logo card.
 *
 * Writes public/images/og/<slug>.jpg at 1200x630 for:
 *   - every page with a hero at public/images/treatments/<slug>.jpg — a
 *     full-bleed cover crop
 *   - every doctor in `team` — the headshot beside the logo on the brand's
 *     cream ground; the headshots are ~400px squares, too small to go full-bleed
 *
 * scripts/build-seo-registry.ts picks a file up by slug when it exists and
 * falls back to og-default.jpg otherwise. It never replaces an og:image the
 * live site already set.
 *
 * Run: npm run seo:og   (part of seo:generate, before seo:registry)
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { PUBLIC } from './paths.ts'
import { team } from '../src/config/site.ts'

const W = 1200
const H = 630
const OUT = path.join(PUBLIC, 'images', 'og')
const TREATMENTS = path.join(PUBLIC, 'images', 'treatments')
const CREAM = '#FCF4F1' // --color-secondary, as og-default.jpg uses
const JPEG = { quality: 82, mozjpeg: true } as const

fs.mkdirSync(OUT, { recursive: true })

/** A hero is `<slug>.jpg`; its siblings carry a suffix (-after, -before, -banner…). */
const heroes = fs
  .readdirSync(TREATMENTS)
  .filter(f => f.endsWith('.jpg') && !/-(after|before|banner|sidebar)(-[\w]+)?\.jpg$/.test(f))

for (const file of heroes) {
  await sharp(path.join(TREATMENTS, file))
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .jpeg(JPEG)
    .toFile(path.join(OUT, file))
}

const { data: logo, info: logoSize } = await sharp(path.join(PUBLIC, 'images/brand/derma-solutions-logo-master.png'))
  .resize(460, 260, { fit: 'inside' })
  .toBuffer({ resolveWithObject: true })

for (const member of team) {
  const slug = member.path.replace(/^\/|\/$/g, '')
  const portrait = await sharp(path.join(PUBLIC, member.photo.replace(/^\//, '')))
    .resize(H, H, { fit: 'cover', position: 'attention' })
    .toBuffer()
  await sharp({ create: { width: W, height: H, channels: 3, background: CREAM } })
    .composite([
      { input: portrait, left: 0, top: 0 },
      {
        input: logo,
        left: H + Math.round((W - H - logoSize.width) / 2),
        top: Math.round((H - logoSize.height) / 2),
      },
    ])
    .jpeg(JPEG)
    .toFile(path.join(OUT, `${slug}.jpg`))
}

console.log(`og: ${heroes.length} treatment + ${team.length} doctor images -> public/images/og/ (${W}x${H})`)
