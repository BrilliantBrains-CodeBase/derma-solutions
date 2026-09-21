/**
 * Config for the homepage's "Latest Videos" rail, in the Insights & Resources
 * band (src/sections/HomeLatestBlog.tsx).
 *
 * Unlike galleryMedia.ts's `galleryVideos`, there is no hand-kept list of ids
 * here: the whole point of "latest" is that the three ids themselves change as
 * the channel publishes, so scripts/fetch-latest-videos.ts owns picking them
 * and writes both the ids/titles (homeVideos.generated.ts) and their posters.
 * This file only holds the numbers the script and the section both need to
 * agree on.
 */

/** youtube.com/@dermasolutionsclinic, resolved once by hand — see the script's header. */
export const homeVideosChannelId = 'UCtk8XGfqJJvH9WGm6-Gd9mA'

/** Matches the three blog cards above it in the same band. */
export const homeVideosCount = 3

/** 16:9. Same reasoning as galleryPosterSlot: the widest 2x poster any breakpoint here needs. */
export const homeVideosPosterSlot = { width: 960, height: 540 } as const

export const homeVideosPosterPath = (id: string) => `/images/home-videos/${id}.jpg`
