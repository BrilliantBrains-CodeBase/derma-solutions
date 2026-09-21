/**
 * The doctor profile pages' two extra photographs, out of the live-site media
 * capture and into public/images/team/.
 *
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md names them
 * by their WordPress filenames — B1.6 "Dr-Sandeep-Mahapatra-4.jpg" and B3.5
 * "Thyagaraj_photo1.jpg" — and both are in seo-backup/06-media/files/, inside
 * the repo, so unlike import-home-images.ts this needs no SOURCE_ROOT override
 * and anyone can re-run it.
 *
 * Both sources are smaller than 2x their slots (650x450 and 480x551), so the
 * house rule of writing 2x the CSS box would only upscale. They are re-encoded
 * at native size, `inside`, never enlarged — the frames crop them in CSS.
 *
 * TODO(assets): doc note 9 — the clinic should supply matching, higher
 * resolution portraits for all four doctors. Each is one entry below.
 *
 * Idempotent: re-running overwrites the outputs.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { MEDIA_FILES, PUBLIC } from './paths.ts'

const SOURCE_ROOT = MEDIA_FILES

type Entry = { from: string; to: string; width: number; height: number }

const IMAGES: Entry[] = [
  { from: '2025/01/Dr-Sandeep-Mahapatra-4.jpg', to: 'images/team/dr-sandeep-mahapatra-procedure.jpg', width: 650, height: 450 },
  { from: '2025/01/Thyagaraj_photo1.jpg', to: 'images/team/dr-thyagaraj-consult.jpg', width: 480, height: 551 },
]

for (const entry of IMAGES) {
  const source = path.join(SOURCE_ROOT, entry.from)
  const target = path.join(PUBLIC, entry.to)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  await sharp(source)
    .rotate()
    .resize(entry.width, entry.height, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target)
  const { width, height } = await sharp(target).metadata()
  console.log(`${entry.to}  ${width}x${height}`)
}
