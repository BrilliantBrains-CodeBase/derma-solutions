import { useState } from 'react'

/**
 * A YouTube video behind a click-to-load poster, in the reference's rounded
 * frame with its 100px "Play" ring dead centre.
 *
 * The reference opens its videos in a magnific-popup lightbox. There is no
 * lightbox here and a modal would need its own focus trap, so this is a facade
 * instead: nothing is requested from YouTube until someone asks for the video,
 * and it then plays in place.
 *
 * Shared by the homepage video band and the treatment pages' video block. The
 * frame's size and shape are the caller's (`className`), because the two differ
 * — a 1400x800 band on the homepage, an 847x380 block in the treatment column.
 */
export function VideoFacade({
  youtubeId,
  title,
  poster,
  posterAlt,
  posterWidth,
  posterHeight,
  playLabel = 'Play',
  className = '',
}: {
  youtubeId: string
  /** Names the play button and, once loaded, the iframe. */
  title: string
  poster: string
  posterAlt: string
  posterWidth: number
  posterHeight: number
  playLabel?: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-primary ${className}`}>
      {playing ? (
        <iframe
          // autoplay is honoured because the click that mounted this frame is
          // the user gesture the browser wants.
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group/play absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        >
          <img
            src={poster}
            alt={posterAlt}
            width={posterWidth}
            height={posterHeight}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/*
            Keeps the ring legible over whatever the poster happens to be. The
            reference tints its footage about this far down; with a bright,
            light-walled still, anything less and the white ring disappears.
          */}
          <span aria-hidden className="absolute inset-0 bg-primary/45" />

          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/20 font-sans text-[16px] leading-[16px] font-semibold text-white backdrop-blur-[2px] transition-colors group-hover/play:bg-white group-hover/play:text-primary"
          >
            {playLabel}
          </span>
        </button>
      )}
    </div>
  )
}
