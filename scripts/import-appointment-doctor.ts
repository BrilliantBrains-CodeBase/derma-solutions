/**
 * Cuts Dr Sandeep Mahapatra out of the clinic's studio shot and writes the
 * transparent PNG the Appointment band stands on its arch.
 *
 * Why this is not an entry in import-home-images.ts: every slot in that file is
 * a resize and a crop, which its Entry map expresses in four fields. This one is
 * a chroma key, a connected-component pass and a placement, and none of that
 * fits the map. It also reads from a different root — the source is committed
 * under content/, not sitting in a Downloads folder outside the repo — so it can
 * be re-run by anyone who has the repo.
 *
 * The band is built around a figure with transparency: HomeAppointment.tsx
 * paints a pale arch and the cut-out stands on it. The retouched composite that
 * held this slot before could not be keyed (soft grey ground, white coat, no
 * separation for a luminance key) and had to be clipped to an arch instead. This
 * source is an unretouched shot on a flat teal backdrop, which keys cleanly.
 *
 * Run: npm run assets:appointment
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { ROOT, PUBLIC } from './paths.ts'

const SOURCE = path.join(
  ROOT,
  "content/home-page/Doctor's images",
  'WhatsApp Image 2026-09-07 at 12.07.39 PM (2).jpeg',
)
const DEST = path.join(PUBLIC, 'images/decor/appointment-image.png')

/**
 * The frame the band renders, and where the figure sits in it — both read off
 * the reference's own appointment-image.png, whose figure occupies y 16..714 of
 * 715: full width, flush to the bottom edge, a sliver of air above the head.
 */
const ASPECT = 465 / 715
const TOP_RATIO = 16 / 715

/**
 * The backdrop: blue and green both run well ahead of red. Skin, the white coat
 * and dark hair all fail it. The navy shirt is the only thing that comes close —
 * it measures blue 18-20 ahead of red against the backdrop's 79-93 — which is
 * what sets the 25 and also why the enclosed-region pass below needs a margin
 * nearly twice as wide.
 */
const isBackdrop = (r: number, g: number, b: number) => b > r + 25 && g > r + 18
const isBackdropStrict = (r: number, g: number, b: number) => b > r + 40 && g > r + 30

if (!fs.existsSync(SOURCE)) {
  console.error(`MISSING source:\n  ${SOURCE}`)
  process.exit(1)
}

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const px = (i: number) => [data[i], data[i + 1], data[i + 2]] as const

/**
 * Backdrop is what the frame edge can reach. Flooding rather than testing every
 * pixel is what protects anything backdrop-coloured that is part of the subject.
 */
const bg = new Uint8Array(W * H)
let stack: number[] = []
for (let x = 0; x < W; x++) stack.push(x, 0, x, H - 1)
for (let y = 0; y < H; y++) stack.push(0, y, W - 1, y)
while (stack.length) {
  const y = stack.pop()!
  const x = stack.pop()!
  if (x < 0 || y < 0 || x >= W || y >= H) continue
  const p = y * W + x
  if (bg[p] || !isBackdrop(...px(p * C))) continue
  bg[p] = 1
  stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1)
}

/* The gap between his arm and his torso is enclosed, so the flood never gets
 * there. The strict predicate clears it and still leaves the shirt alone. */
for (let p = 0; p < W * H; p++) if (!bg[p] && isBackdropStrict(...px(p * C))) bg[p] = 1

/**
 * Keep the largest foreground component only. The source carries another
 * clinic's wordmark in its top-left corner — white, so it survives the key, and
 * it must not appear on this site. It is not attached to the figure, so this
 * drops it without a mask.
 */
const label = new Int32Array(W * H).fill(-1)
const sizes: number[] = []
for (let seed = 0; seed < W * H; seed++) {
  if (bg[seed] || label[seed] !== -1) continue
  const id = sizes.length
  let n = 0
  stack = [seed]
  while (stack.length) {
    const p = stack.pop()!
    if (p < 0 || p >= W * H || bg[p] || label[p] !== -1) continue
    label[p] = id
    n++
    const x = p % W
    if (x > 0) stack.push(p - 1)
    if (x < W - 1) stack.push(p + 1)
    stack.push(p - W, p + W)
  }
  sizes.push(n)
}
const keep = sizes.indexOf(Math.max(...sizes))
for (let p = 0; p < W * H; p++) if (label[p] !== keep) bg[p] = 1

/**
 * Alpha, then spill suppression within 2px of the boundary: the backdrop leaves
 * a teal fringe on hair and shoulders that reads as a green halo once the figure
 * is standing on a cream panel.
 */
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x
    const i = p * C
    if (bg[p]) {
      data[i + 3] = 0
      continue
    }
    let edge = false
    for (let dy = -2; dy <= 2 && !edge; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const yy = y + dy
        const xx = x + dx
        if (yy >= 0 && yy < H && xx >= 0 && xx < W && bg[yy * W + xx]) {
          edge = true
          break
        }
      }
    }
    if (edge) {
      const cap = data[i] + 12
      if (data[i + 1] > cap) data[i + 1] = cap
      if (data[i + 2] > cap) data[i + 2] = cap
    }
  }
}

let x0 = W
let y0 = H
let x1 = 0
let y1 = 0
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (bg[y * W + x]) continue
    if (x < x0) x0 = x
    if (x > x1) x1 = x
    if (y < y0) y0 = y
    if (y > y1) y1 = y
  }
}
const bw = x1 - x0 + 1
const bh = y1 - y0 + 1

/**
 * The frame is sized from the figure's own pixels rather than up to the 2x the
 * rest of public/images/decor/ sits at. 693px of subject is what the source
 * holds; scaling to 930 would invent the rest. See the TODO on
 * assets.appointmentImage.
 */
const frameH = Math.round(bh / (1 - TOP_RATIO))
const frameW = Math.round(frameH * ASPECT)
const scale = Math.min(frameW / bw, (frameH - Math.round(frameH * TOP_RATIO)) / bh)
const sw = Math.round(bw * scale)
const sh = Math.round(bh * scale)

const figure = await sharp(data, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left: x0, top: y0, width: bw, height: bh })
  .resize(sw, sh, { fit: 'fill', kernel: 'lanczos3' })
  .png()
  .toBuffer()

fs.mkdirSync(path.dirname(DEST), { recursive: true })
const out = await sharp({
  create: { width: frameW, height: frameH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: figure, left: Math.round((frameW - sw) / 2), top: frameH - sh }])
  /* Palette at q90 holds the edge and the skin without banding, and halves the
   * file against truecolour — 233 KB, in line with what-we-do-1.png beside it. */
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(DEST)

console.log(`  figure ${bw}x${bh} keyed from ${W}x${H}`)
console.log(`  images/decor/appointment-image.png  ${frameW}x${frameH}  ${(out.size / 1024).toFixed(0)} KB`)
