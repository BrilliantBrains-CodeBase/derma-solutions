/**
 * Fetches the poster for every video embedded in page copy — the 38 treatment
 * pages and the blog posts that carry a video block — into
 * public/images/video-posters/.
 *
 * The treatment pages used to show a hand-picked stock photograph here, chosen
 * per page in treatmentMedia.ts, so the still had nothing to do with the video
 * behind it. The blog hotlinked YouTube's 480x360 hqdefault. Both now show the
 * video's own frame, self-hosted, the way the gallery, the doctor pages and the
 * homepage rail already did.
 *
 * Ids are deduplicated: the same video serves several treatment pages, so this
 * writes roughly 27 files for 38 pages. The fetching itself is
 * scripts/youtube-poster.ts, shared with the other two fetchers.
 *
 * Posters are committed, and a failed fetch leaves the committed file alone —
 * `npm run build` must never depend on YouTube being up. An id that returns
 * nothing is reported: that is what a video going private or being deleted
 * looks like from here.
 *
 * Run: npm run content:video-posters
 */
import fs from 'node:fs'
import path from 'node:path'
import { PUBLIC, SRC } from './paths.ts'
import { videoPosterPath, videoPosterSlot } from '../src/content/videoPosters.ts'
import { treatmentFallbackYoutubeId, treatmentMedia } from '../src/content/treatmentMedia.ts'
import type { BlogPostContent } from '../src/content/blog.ts'
import { fetchPoster, POSTER_SOURCES, writePoster } from './youtube-poster.ts'

const posterDir = path.join(PUBLIC, 'images', 'video-posters')
const postsDir = path.join(SRC, 'content', 'blog', 'posts')

/* ---- collect every id a page will ask for -------------------------------- */

/** id -> where it is used, for the report and so a stale file is recognisable. */
const wanted = new Map<string, string[]>()
const want = (id: string, source: string) => wanted.set(id, [...(wanted.get(id) ?? []), source])

for (const [slug, media] of Object.entries(treatmentMedia)) {
  want(media.youtubeId ?? treatmentFallbackYoutubeId, slug)
}
// The fallback is asked for by any page without its own video, including the
// pages added later, so it is fetched whether or not one is using it today.
want(treatmentFallbackYoutubeId, 'the treatment pages\' fallback')

for (const file of fs.readdirSync(postsDir).filter(f => f.endsWith('.ts'))) {
  const post: BlogPostContent = (await import(path.join(postsDir, file))).default
  for (const block of post.blocks) {
    if (block.type === 'video') want(block.youtubeId, `blog/${post.slug}`)
  }
}

/* ---- fetch ---------------------------------------------------------------- */

fs.mkdirSync(posterDir, { recursive: true })

let written = 0
const fellBack: string[] = []
const dead: string[] = []

for (const [id, sources] of wanted) {
  const poster = await fetchPoster(id)
  if (!poster) {
    dead.push(`${id} (${sources.join(', ')})`)
    continue
  }
  if (poster.source !== POSTER_SOURCES[0]) fellBack.push(`${id} (${poster.source})`)
  await writePoster(poster.buffer, videoPosterSlot.width, path.join(PUBLIC, videoPosterPath(id)))
  written++
}

// Anything left that no page references is stale output.
const expected = new Set([...wanted.keys()].map(id => path.basename(videoPosterPath(id))))
for (const file of fs.readdirSync(posterDir)) {
  if (!expected.has(file)) fs.rmSync(path.join(posterDir, file))
}

console.log(`video posters: ${written}/${wanted.size} fetched into public/images/video-posters/`)
if (fellBack.length) console.log(`  no maxres frame, used a smaller rendition: ${fellBack.join(', ')}`)
if (dead.length) {
  console.error(`\n  no poster at all — private, deleted or a bad id:\n    ${dead.join('\n    ')}`)
  console.error('  The committed poster, if any, is left in place.')
  process.exitCode = 1
}
