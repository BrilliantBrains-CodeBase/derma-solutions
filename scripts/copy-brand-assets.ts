/**
 * Copies the brand and team images src/config/site.ts already references out of
 * the media backup into public/.
 *
 * Only these — the other ~440 captured images are page content and land with
 * the content. Sources verified against seo-backup/06-media/files/.
 *
 * Run: npm run seo:assets
 */
import fs from 'node:fs'
import path from 'node:path'
import { MEDIA_FILES, PUBLIC } from './paths.ts'

/** source (relative to 06-media/files/) -> destination (relative to public/) */
const ASSETS: Record<string, string> = {
  '2024/12/DermaSolutions-Logo.svg': 'images/brand/derma-solutions-logo.svg',
  '2024/12/Derma-Solutions-LOGO-with-bg-12.png': 'images/brand/derma-solutions-logo-bg.png',
  '2025/04/Derma-Solutions-Clinic-Reception.jpeg': 'images/brand/clinic-reception.jpeg',
  '2024/12/cropped-DermaSolutions-Favicon-with-BG.png': 'images/brand/favicon-master.png',
  '2025/01/Dr-Sandeep-Mahapatra-3.jpg': 'images/team/dr-sandeep-mahapatra.jpg',
  '2025/05/Dr-Sumedha-Tirthani-375-375.png': 'images/team/dr-sumedha-tirthani.png',
  '2025/01/Dr-Thyagaraj-400-400.jpg': 'images/team/dr-thyagaraj.jpg',
  '2025/09/Dr-Chandana-2-e1757936503221-375-375.jpeg': 'images/team/dr-chandhana-vishal-n.jpeg',
}

let copied = 0
const missing: string[] = []

for (const [from, to] of Object.entries(ASSETS)) {
  const src = path.join(MEDIA_FILES, from)
  if (!fs.existsSync(src)) { missing.push(from); continue }
  const dest = path.join(PUBLIC, to)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  copied++
}

console.log(`assets: ${copied} copied into public/`)
if (missing.length) console.warn(`MISSING from the backup:\n  ${missing.join('\n  ')}`)
