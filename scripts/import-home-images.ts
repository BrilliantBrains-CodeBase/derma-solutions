/**
 * Fits the clinic's own homepage photography into the slots src/config/site.ts
 * references, replacing the Glowix theme's reference-only placeholders.
 *
 * Same shape as copy-brand-assets.ts — a literal source -> destination map and a
 * missing-file report — with a resize spec per entry, because unlike the brand
 * assets these arrive at shoot resolution (1.4-2.5 MB PNGs) and every slot has a
 * crop the layout depends on.
 *
 * The sources live outside the repo and stay there: 21 files at that size is not
 * something to commit. Point HOME_IMAGES at them if they move.
 *
 * Run: npm run assets:home
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import type { Sharp } from 'sharp'
import { PUBLIC } from './paths.ts'

const SOURCE_ROOT = process.env.HOME_IMAGES ?? '/Users/d1/Downloads/Website/Home Page'

/**
 * `width`/`height` are the output pixels, not the CSS box: every entry is 2x the
 * size the layout renders it at, which is what the existing files in
 * public/images/decor/ already sit at and what keeps them ~150 KB at q82.
 *
 * `position` is sharp's crop anchor. The default 'attention' picks the busiest
 * region, which finds the face in most of these; the entries that name a
 * position instead are the ones where it chose wrong and the note says why.
 */
type Entry = {
  from: string
  to: string
  width: number
  height: number
  position?: string
}

const IMAGES: Entry[] = [
  /* Services. 1536x1024 is exactly the 3:2 the cards render, so these are a
   * straight downscale with no crop decision to get wrong. */
  { from: 'SERVICES/Laser treatment.png', to: 'images/decor/services/service-1.jpg', width: 654, height: 436 },
  { from: 'SERVICES/Cosmetology 2.png', to: 'images/decor/services/service-2.jpg', width: 654, height: 436 },
  { from: 'SERVICES/Anti aging 1.png', to: 'images/decor/services/service-3.jpg', width: 654, height: 436 },
  { from: 'SERVICES/Hair Restoration.png', to: 'images/decor/services/service-4.jpg', width: 654, height: 436 },
  { from: 'SERVICES/Cosmetic Surgery.png', to: 'images/decor/services/service-5.jpg', width: 654, height: 436 },
  { from: 'SERVICES/Advanced Facials.png', to: 'images/decor/services/service-6.jpg', width: 654, height: 436 },

  /* Case studies. Square sources into the band's 403:390, so ~3% comes off the
   * height — centred, because these are portraits shot to centre. */
  { from: 'Card Titles/2.png', to: 'images/decor/case-studies/case-study-1.jpg', width: 806, height: 780, position: 'centre' },
  { from: 'Card Titles/4.png', to: 'images/decor/case-studies/case-study-2.jpg', width: 806, height: 780, position: 'centre' },
  { from: 'Card Titles/3.png', to: 'images/decor/case-studies/case-study-3.jpg', width: 806, height: 780, position: 'centre' },
  { from: 'Card Titles/1.png', to: 'images/decor/case-studies/case-study-4.jpg', width: 806, height: 780, position: 'centre' },

  /* About. The two portraits are 1122x1402, which is the 4:5 both frames want
   * exactly. about-experience crops 16:9 down to 5:3. */
  { from: 'About us/Botox.png', to: 'images/decor/about-1.jpg', width: 716, height: 900 },
  { from: 'About us/Hair Transplant.png', to: 'images/decor/about-2.jpg', width: 720, height: 900 },
  { from: 'About us/Chemical Peels 1.png', to: 'images/decor/about-experience.jpg', width: 604, height: 360 },

  /* Why Choose Us. Two treatment scenes rather than the two studio portraits
   * the WHY CHOOSE US folder offers: `DR Sandeep 2.png` is the same setup and
   * pose as `DR Sandeep.png`, which the Appointment band two sections below
   * uses, and the pair read as one photo printed twice. The peel shot is the
   * portrait framing of about-experience's scene and sits beside the laser one
   * as a matching pair.
   *
   * 941x1672 (0.563) into 264x408 (0.647) crops vertically; 'attention' keeps
   * the faces and drops floor and ceiling. */
  { from: 'WHY CHOOSE US/DR. Sandeep treatment.png', to: 'images/decor/why-choose-1.jpg', width: 528, height: 816 },
  { from: 'About us/Chemical Peels 2.png', to: 'images/decor/why-choose-2.jpg', width: 528, height: 816 },

  /* See the Difference. These arrive pre-composed — both halves and their
   * Before/After labels are already in the file — so the band renders them
   * whole and the only job here is the downscale. 'centre' because a composite
   * has two faces and 'attention' would favour one of them. */
  { from: 'Before & After/1.png', to: 'images/decor/transformations/transformation-1.jpg', width: 1240, height: 992, position: 'centre' },
  { from: 'Before & After/2.png', to: 'images/decor/transformations/transformation-2.jpg', width: 1240, height: 992, position: 'centre' },
  { from: 'Before & After/3.png', to: 'images/decor/transformations/transformation-3.jpg', width: 1240, height: 992, position: 'centre' },
  { from: 'Before & After/4.png', to: 'images/decor/transformations/transformation-4.jpg', width: 1240, height: 992, position: 'centre' },

  /* Appointment, and the one slot that changed extension. The reference's
   * appointment-image.png is a transparent cut-out standing on an arch the
   * section paints; this is a studio shot on a soft grey ground, and nothing
   * available here does subject segmentation — a luminance key would take the
   * white coat along with the backdrop. HomeAppointment clips it to the arch
   * instead, so there is no alpha to preserve and PNG only bought 1.7 MB
   * against JPEG's 56.
   *
   * 941x1672 into the 465x715 frame, anchored 'top': 'attention' centres on the
   * face and cuts off the folded arms the composition is built around. */
  { from: 'WHY CHOOSE US/DR Sandeep.png', to: 'images/decor/appointment-image.jpg', width: 930, height: 1430, position: 'top' },
]

function write(entry: Entry, encode: (pipeline: Sharp) => Sharp) {
  const src = path.join(SOURCE_ROOT, entry.from)
  if (!fs.existsSync(src)) return { ok: false as const, from: entry.from }

  const dest = path.join(PUBLIC, entry.to)
  fs.mkdirSync(path.dirname(dest), { recursive: true })

  return {
    ok: true as const,
    done: encode(
      sharp(src).resize(entry.width, entry.height, {
        fit: 'cover',
        position: entry.position ?? 'attention',
      }),
    )
      .toFile(dest)
      .then(info => `${entry.to}  ${(info.size / 1024).toFixed(0)} KB`),
  }
}

const missing: string[] = []
const pending: Promise<string>[] = []

for (const entry of IMAGES) {
  const result = write(entry, p => p.jpeg({ quality: 82, mozjpeg: true }))
  if (result.ok) pending.push(result.done)
  else missing.push(result.from)
}

const written = await Promise.all(pending)
for (const line of written) console.log(`  ${line}`)
console.log(`home images: ${written.length} written into public/`)

if (missing.length) {
  console.warn(`\nMISSING from ${SOURCE_ROOT}:\n  ${missing.join('\n  ')}`)
  process.exitCode = 1
}
