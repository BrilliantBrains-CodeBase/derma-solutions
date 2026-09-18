import { useState } from 'react'
import { VideoFacade } from '@/components/VideoFacade'
import { homeVideo } from '@/config/site'
import {
  galleryCopy,
  galleryPosterPath,
  galleryPosterSlot,
  videoTitleOverrides,
  type GalleryVideo,
} from '@/content/galleryMedia'
import { videoTitles } from '@/content/gallery/videoTitles.generated'

/**
 * The video gallery's grid of thirty-one facades.
 *
 * Built to theme-reference/07-screenshots/desktop/casestudy.png for the three-up
 * grid and its 30px gutters, and to
 * seo-backup/05-screenshots/desktop/video-gallery.png for the running order.
 *
 * Three columns here where the photo grid takes two: a 16:9 YouTube frame is one
 * picture rather than two, and reads perfectly well at the ~406x229 a third of
 * the 1300 container gives it.
 *
 * Three departures from what the live page did:
 *
 *  - The titles are visible, under each tile. The live page shipped
 *    `title=""` on all thirty-one <lite-youtube> elements, so it carried no
 *    indexable text about its own videos and no accessible name on any play
 *    control. These come from YouTube's oEmbed endpoint at build time — see
 *    scripts/fetch-video-gallery.ts — and are <h3>s beneath the intro's <h2>.
 *  - The posters are self-hosted. The live page pulled thirty-one images from
 *    i.ytimg.com on load, which is most of what a click-to-load facade exists to
 *    prevent.
 *  - One video plays at a time. See below.
 *
 * `openId` is what makes the last of those true. The facade autoplays with
 * sound, so without it a second click leaves two soundtracks running with no
 * visible control to stop the first once it has scrolled out of view — WCAG
 * 1.4.2, and the same objection that rules CardCarousel out of these pages.
 * Setting it also unmounts the previous iframe, which stops playback cleanly and
 * restores that tile's poster; thirty-one live YouTube players accumulating on
 * one page is the heaviest thing this site could do to a phone.
 *
 * It starts null, so all thirty-one prerender as posters and the static HTML is
 * correct with no JS at all — the constraint CardCarousel's header documents for
 * every interactive thing on this site.
 */
export function VideoGallery({ videos }: { videos: readonly GalleryVideo[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <ul className="mt-[50px] grid gap-x-[30px] gap-y-[40px] sm:grid-cols-2 lg:mt-[70px] lg:grid-cols-3 lg:gap-y-[50px]">
      {videos
        .filter(video => !video.retired)
        .map(video => {
          const title =
            videoTitleOverrides[video.id] ?? videoTitles[video.id] ?? galleryCopy.videoGallery.fallbackTitle

          return (
            <li key={video.id}>
              <VideoFacade
                youtubeId={video.id}
                title={title}
                poster={galleryPosterPath(video.id)}
                // The poster is the video's own opening frame and the title sits
                // directly beneath it as text, so describing it again here would
                // only repeat that heading to a screen reader. The play button
                // is already named "Play <title>".
                posterAlt=""
                posterWidth={galleryPosterSlot.width}
                posterHeight={galleryPosterSlot.height}
                playLabel={homeVideo.playLabel}
                // 64px is 28% of the lg tile's 229px height, which is the
                // proportion the 100px default strikes on the treatment page.
                ringClass="h-[64px] w-[64px] text-[13px] leading-[13px]"
                playing={openId === video.id}
                onPlayingChange={playing => setOpenId(playing ? video.id : null)}
                className="aspect-video w-full rounded-card"
              />

              <h3 className="mt-[18px] font-display text-[18px] leading-[26px] text-primary md:text-[20px] md:leading-[28px]">
                {title}
              </h3>
            </li>
          )
        })}
    </ul>
  )
}
