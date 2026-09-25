/**
 * Self-hosting a YouTube video's own still.
 *
 * Every video on this site plays through src/components/VideoFacade.tsx, which
 * shows a poster until someone clicks it. That poster is the video's own
 * thumbnail, downloaded and committed rather than hotlinked from i.ytimg.com,
 * because every other image on this site is self-hosted — and because a build
 * must never depend on YouTube being up.
 *
 * Three callers fetch posters this way and used to carry their own copy of this
 * code: scripts/fetch-video-gallery.ts (the gallery and the doctor pages),
 * scripts/fetch-latest-videos.ts (the homepage rail) and
 * scripts/fetch-video-posters.ts (the treatment pages and the blog).
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

/** Largest first. A maxres frame is 1280x720; the others are 4:3 with letterbox bars. */
export const POSTER_SOURCES = ['maxresdefault', 'sddefault', 'hqdefault'] as const

/** Below this, what came back is YouTube's grey placeholder rather than a frame. */
export const MIN_POSTER_WIDTH = 240

export interface FetchedPoster {
  buffer: Buffer
  /** Which rendition answered. Anything but POSTER_SOURCES[0] is worth reporting. */
  source: (typeof POSTER_SOURCES)[number]
}

/** Returns the decoded frame, or null when every rendition is missing or a placeholder. */
export async function fetchPoster(id: string): Promise<FetchedPoster | null> {
  for (const source of POSTER_SOURCES) {
    let response: Response
    try {
      response = await fetch(`https://i.ytimg.com/vi/${id}/${source}.jpg`)
    } catch {
      continue
    }
    if (!response.ok) continue
    const buffer = Buffer.from(await response.arrayBuffer())
    const meta = await sharp(buffer).metadata()
    if ((meta.width ?? 0) < MIN_POSTER_WIDTH) continue
    return { buffer, source }
  }
  return null
}

/**
 * Crops to 16:9 and writes the poster.
 *
 * The crop is centred and comes first: on a 4:3 rendition it removes the
 * letterbox bars exactly, and on maxres there is nothing to remove. The width
 * is capped at the source's, so a poster is never upscaled past the frame
 * YouTube holds.
 */
export async function writePoster(buffer: Buffer, slotWidth: number, file: string): Promise<void> {
  const meta = await sharp(buffer).metadata()
  const srcW = meta.width!
  const srcH = meta.height!
  const cropW = Math.min(srcW, Math.round((srcH * 16) / 9))
  const cropH = Math.round((cropW * 9) / 16)
  const width = Math.min(slotWidth, cropW)

  fs.mkdirSync(path.dirname(file), { recursive: true })
  await sharp(buffer)
    .extract({
      left: Math.floor((srcW - cropW) / 2),
      top: Math.floor((srcH - cropH) / 2),
      width: cropW,
      height: cropH,
    })
    .resize(width, Math.round((width * 9) / 16))
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(file)
}
