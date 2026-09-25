/**
 * Posters for the videos embedded in page copy — the treatment pages' video
 * block and the blog posts' video blocks.
 *
 * Keyed by YouTube id rather than by page, because the same video appears on
 * more than one page: the wart-and-mole video runs on three treatment pages,
 * and the clinic's general introduction stands in on eleven. One id, one file.
 *
 * The file is the video's own thumbnail, fetched and committed by
 * scripts/fetch-video-posters.ts. Same arrangement as galleryMedia.ts's
 * `galleryPosterPath` for the gallery and doctor pages, and homeVideos.ts's for
 * the homepage rail.
 */

/** 16:9, as YouTube's own frames are. The widest 2x poster any of these slots needs. */
export const videoPosterSlot = { width: 960, height: 540 } as const

export const videoPosterPath = (id: string) => `/images/video-posters/${id}.jpg`
