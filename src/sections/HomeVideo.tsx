import { assets, homeVideo } from '@/config/site'
import { VideoFacade } from '@/components/VideoFacade'

/**
 * Built to theme-reference/04-sections/17-elementskit-video/ — the band the copy
 * doc hangs under section 04, "Video Block (below this section)".
 *
 * Measured off its screenshot.png: the surface is 1400x800 inside a 20px
 * gutter, radius 30, with a 100px play ring dead centre (x 670-769, y 350-449).
 *
 * Two departures from the reference, both forced:
 *
 *  - The reference autoplays a self-hosted, muted, looping glowix-video.mp4
 *    behind the ring. That file is the theme vendor's, is not in
 *    theme-reference/ (there is no .mp4 anywhere in the repo), and the copy doc
 *    forbids stock footage — so the band rests on a still instead. See the
 *    TODO on assets.videoPoster: it is a frame of the clinic's own video, and
 *    it is the weakest asset on the page.
 *  - The reference opens the video in a magnific-popup lightbox. This is a
 *    click-to-load facade instead (src/components/VideoFacade.tsx, shared with
 *    the treatment pages). At 1400x800 the band is large enough that a modal
 *    would buy nothing.
 */
export function HomeVideo() {
  return (
    <section aria-labelledby="home-video-heading" className="px-[20px]">
      {/* The band is the whole section, so its name is visually hidden. */}
      <h2 id="home-video-heading" className="sr-only">
        {homeVideo.title}
      </h2>

      <VideoFacade
        youtubeId={homeVideo.youtubeId}
        title={homeVideo.title}
        poster={assets.videoPoster}
        posterAlt={assets.videoPosterAlt}
        posterWidth={1400}
        posterHeight={800}
        playLabel={homeVideo.playLabel}
        className="mx-auto aspect-[1400/800] w-full max-w-[1400px] rounded-30"
      />
    </section>
  )
}
