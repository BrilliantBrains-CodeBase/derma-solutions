/**
 * Fetches the channel's newest videos and writes
 * src/content/homeVideos.generated.ts plus their posters, for the "Latest
 * Videos" rail in the homepage's Insights & Resources band
 * (src/sections/HomeLatestBlog.tsx).
 *
 * The channel id is resolved from the handle in src/config/site.ts
 * (social.youtube, @dermasolutionsclinic) by hand, once: youtube.com/@handle
 * serves a page whose <link rel="canonical"> is /channel/UC..., which is what
 * homeVideosChannelId in src/content/homeVideos.ts holds. There is no
 * supported API for that resolution without a key, and the id does not change
 * once a channel exists, so this is not re-derived on every run.
 *
 * From there this is scripts/fetch-video-gallery.ts's approach, reused for a
 * second source:
 *
 *  - The list itself is public and keyless: YouTube's RSS feed at
 *    /feeds/videos.xml?channel_id=... returns the channel's most recent videos
 *    newest-first, entry titles already clean (no oEmbed round-trip needed).
 *  - Posters are self-hosted exactly as the gallery's are — maxresdefault
 *    falling back through sddefault to hqdefault, centre-cropped to 16:9 with
 *    sharp — because every other image on this site is.
 *  - Titles and posters are committed. `npm run build` must never depend on
 *    YouTube being up, so a feed that cannot be reached leaves the previous
 *    generated file untouched rather than emptying the rail.
 *
 * Two differences from the gallery script follow from "latest" meaning the
 * ids themselves change run to run, not just their titles:
 *
 *  - There is no editorial id list to check titles or posters against — the
 *    feed's own order is the order. A video that has gone private or been
 *    deleted simply falls out of the feed's newest N on its own; there is no
 *    "dead id" to report.
 *  - Poster cleanup deletes whatever is in public/images/home-videos/ that
 *    is not one of the ids just fetched, the same stale-file sweep the
 *    gallery script does with its own directory.
 *
 * Run: npm run content:videos
 */
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'node-html-parser'
import { PUBLIC, SRC } from './paths.ts'
import { homeVideosChannelId, homeVideosCount, homeVideosPosterPath, homeVideosPosterSlot } from '../src/content/homeVideos.ts'
import { fetchPoster, writePoster } from './youtube-poster.ts'

const OUT_FILE = path.join(SRC, 'content', 'homeVideos.generated.ts')
const posterDir = path.join(PUBLIC, 'images', 'home-videos')

fs.mkdirSync(posterDir, { recursive: true })

interface FeedEntry {
  id: string
  title: string
}

async function fetchFeed(): Promise<FeedEntry[] | null> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${homeVideosChannelId}`
  let response: Response
  try {
    response = await fetch(url, { headers: { Accept: 'application/xml' } })
  } catch {
    return null
  }
  if (!response.ok) return null

  const xml = await response.text()
  const root = parse(xml, { lowerCaseTagName: false })
  const entries: FeedEntry[] = []
  for (const entry of root.querySelectorAll('entry')) {
    const id = entry.querySelector('yt\\:videoid')?.text.trim()
    const title = entry.querySelector('title')?.text.trim()
    if (id && title) entries.push({ id, title })
  }
  return entries
}

const feed = await fetchFeed()
if (!feed) {
  if (fs.existsSync(OUT_FILE)) {
    console.warn('latest videos: feed unreachable, keeping the committed src/content/homeVideos.generated.ts')
    process.exit(0)
  }
  console.error('latest videos: feed unreachable and no generated file exists yet. Try again once online.')
  process.exit(1)
}

const picked: FeedEntry[] = []
const skipped: string[] = []
for (const entry of feed) {
  if (picked.length >= homeVideosCount) break
  const poster = await fetchPoster(entry.id)
  if (!poster) {
    skipped.push(entry.id)
    continue
  }
  await writePoster(poster.buffer, homeVideosPosterSlot.width, path.join(PUBLIC, homeVideosPosterPath(entry.id)))
  picked.push(entry)
}

// Anything left over from a previous run whose id is no longer picked is stale.
const expected = new Set(picked.map(v => path.basename(homeVideosPosterPath(v.id))))
for (const file of fs.readdirSync(posterDir)) {
  if (!expected.has(file)) fs.rmSync(path.join(posterDir, file))
}

fs.writeFileSync(
  OUT_FILE,
  `/**
 * GENERATED FILE — DO NOT EDIT. Run \`npm run content:videos\`.
 *
 * The channel's ${picked.length} newest videos, from YouTube's public RSS
 * feed (see scripts/fetch-latest-videos.ts). Posters live alongside in
 * public/images/home-videos/.
 */
export const homeVideos: { id: string; title: string }[] = ${JSON.stringify(picked, null, 2)}
`,
)

console.log(`latest videos: ${picked.length}/${homeVideosCount} fetched, ${fs.readdirSync(posterDir).length} posters in public/images/home-videos/`)
if (skipped.length) console.log(`  no usable poster, skipped: ${skipped.join(', ')}`)
