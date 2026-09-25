/**
 * Fetches a title and a poster for each of the video gallery's thirty-one
 * videos, and writes src/content/gallery/videoTitles.generated.ts.
 *
 * This is the only script in the repo that touches the network, so it is worth
 * saying why. The capture carried `title=""` on all thirty-one
 * <lite-youtube> elements (seo-backup/01-raw-html/desktop/video-gallery.html),
 * and VideoFacade needs a title for its play button's accessible name and for
 * the iframe. The posters were remote too — i.ytimg.com — and every other image
 * on this site is self-hosted and passed through sharp. Both gaps close here.
 *
 * Titles and posters are committed, exactly as src/content/blog/index.generated.ts
 * and the tracked files under public/images/treatments/ are. `npm run build`
 * must never depend on YouTube being up.
 *
 * Two failure modes are handled rather than swallowed:
 *
 *  - A video that is private, deleted or has embedding disabled makes oEmbed
 *    return 401/403/404. Embedding one renders "Video unavailable" inside the
 *    tile, so the script keeps any title it already had, lists the dead ids and
 *    exits non-zero telling you to set `retired: true` in galleryMedia.ts.
 *  - maxresdefault.jpg does not exist for every video, and YouTube serves a
 *    120x90 grey placeholder with a 200 about as often as it 404s. So the check
 *    is both the status and the decoded width, falling back through
 *    sddefault.jpg to hqdefault.jpg.
 *
 * Run: npm run content:gallery
 */
import fs from 'node:fs'
import path from 'node:path'
import { PUBLIC, SRC } from './paths.ts'
import { galleryPosterPath, galleryPosterSlot, galleryVideos } from '../src/content/galleryMedia.ts'
import { fetchPoster, POSTER_SOURCES, writePoster } from './youtube-poster.ts'

const OUT_DIR = path.join(SRC, 'content', 'gallery')
const OUT_FILE = path.join(OUT_DIR, 'videoTitles.generated.ts')
const posterDir = path.join(PUBLIC, 'images', 'video-gallery')

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(posterDir, { recursive: true })

/** Whatever the last run wrote, so one dead video does not wipe thirty good titles. */
const previous: Record<string, string> = fs.existsSync(OUT_FILE)
  ? ((await import(/* @vite-ignore */ OUT_FILE)).videoTitles ?? {})
  : {}

const titles: Record<string, string> = {}
const dead: string[] = []
const fellBack: string[] = []

async function fetchTitle(id: string): Promise<string | null> {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`
  const response = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!response.ok) return null
  const body = (await response.json()) as { title?: string }
  return typeof body.title === 'string' && body.title.trim() ? body.title.trim() : null
}

for (const video of galleryVideos) {
  const title = await fetchTitle(video.id)
  if (title) {
    titles[video.id] = title
  } else {
    dead.push(video.id)
    if (previous[video.id]) titles[video.id] = previous[video.id]
  }

  const poster = await fetchPoster(video.id)
  if (poster) {
    if (poster.source !== POSTER_SOURCES[0]) fellBack.push(`${video.id} (${poster.source})`)
    await writePoster(poster.buffer, galleryPosterSlot.width, path.join(PUBLIC, galleryPosterPath(video.id)))
  }
}

// Anything left that the table no longer references is stale output.
const expected = new Set(galleryVideos.map(v => path.basename(galleryPosterPath(v.id))))
for (const file of fs.readdirSync(posterDir)) {
  if (!expected.has(file)) fs.rmSync(path.join(posterDir, file))
}

fs.writeFileSync(
  OUT_FILE,
  `/**
 * GENERATED FILE — DO NOT EDIT. Run \`npm run content:gallery\`.
 *
 * ${Object.keys(titles).length} video titles from YouTube's public oEmbed endpoint.
 * The ids and their order are editorial and live in src/content/galleryMedia.ts.
 *
 * To correct a title, add it to \`videoTitleOverrides\` there rather than editing
 * this file — the next run would discard the edit.
 */
export const videoTitles: Record<string, string> = ${JSON.stringify(titles, null, 2)}
`,
)

console.log(`video gallery: ${Object.keys(titles).length}/${galleryVideos.length} titles, ${fs.readdirSync(posterDir).length} posters in public/images/video-gallery/`)
if (fellBack.length) console.log(`  no maxres frame, fell back: ${fellBack.join(', ')}`)

if (dead.length) {
  console.error(`\n${dead.length} video(s) are private, deleted or have embedding disabled:\n  ${dead.join('\n  ')}`)
  console.error(`\n  Embedding one of these renders "Video unavailable" in its tile.`)
  console.error(`  Set \`retired: true\` on each in src/content/galleryMedia.ts, then re-run.`)
  process.exit(1)
}
