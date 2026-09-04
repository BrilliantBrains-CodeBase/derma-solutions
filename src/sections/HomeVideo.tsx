import { useState } from 'react'
import { assets, homeVideo } from '@/config/site'

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
 *  - The reference opens the video in a magnific-popup lightbox. There is no
 *    lightbox here and a modal would need its own focus trap, so this is a
 *    click-to-load facade: nothing is requested from YouTube until someone asks
 *    for the video, and it then plays in place. At 1400x800 the band is large
 *    enough that a modal would buy nothing.
 */
export function HomeVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <section aria-labelledby="home-video-heading" className="px-[20px]">
      {/* The band is the whole section, so its name is visually hidden. */}
      <h2 id="home-video-heading" className="sr-only">
        {homeVideo.title}
      </h2>

      <div className="relative mx-auto aspect-[1400/800] w-full max-w-[1400px] overflow-hidden rounded-30 bg-primary">
        {playing ? (
          <iframe
            // autoplay is honoured because the click that mounted this frame is
            // the user gesture the browser wants.
            src={`https://www.youtube-nocookie.com/embed/${homeVideo.youtubeId}?autoplay=1&rel=0`}
            title={homeVideo.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${homeVideo.title}`}
            className="group/play absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          >
            <img
              src={assets.videoPoster}
              alt={assets.videoPosterAlt}
              width={1400}
              height={800}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/*
              Keeps the ring legible over whatever the poster happens to be.
              The reference tints its footage about this far down; with the
              current still, which is bright and light-walled, anything less and
              the white ring disappears into it.
            */}
            <span aria-hidden className="absolute inset-0 bg-primary/45" />

            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/20 font-sans text-[16px] leading-[16px] font-semibold text-white backdrop-blur-[2px] transition-colors group-hover/play:bg-white group-hover/play:text-primary"
            >
              {homeVideo.playLabel}
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
