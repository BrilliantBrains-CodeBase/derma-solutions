import { useState } from 'react'
import { homeVideo, social } from '@/config/site'
import { VideoFacade } from '@/components/VideoFacade'
import {
  galleryCopy,
  galleryPosterPath,
  galleryPosterSlot,
  videoTitleOverrides,
} from '@/content/galleryMedia'
import { videoTitles } from '@/content/gallery/videoTitles.generated'
import type { BandHeading, Tone } from '@/content/doctor'
import { Band, BandHeadingBlock, PillLink } from './DoctorBand'

/**
 * B1.9 — Dermatology Procedure Videos. The video gallery's tile, three up:
 * the same click-to-load VideoFacade on the same self-hosted posters and the
 * same title lookup as src/sections/gallery/VideoGallery.tsx, which was built
 * to theme-reference/07-screenshots/desktop/casestudy.png's three-column grid.
 *
 * One plays at a time, for the reason VideoGallery gives: the facade autoplays
 * with sound, and a second click would otherwise leave two soundtracks running.
 *
 * The doc names only the channel ("Video source: YouTube @dermasolutionsclinic"),
 * so the band closes with a link to it.
 */
export function DoctorVideos({
  tone,
  youtubeIds,
  headingId,
  ...copy
}: BandHeading & { tone: Tone; youtubeIds: readonly string[]; headingId: string }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <Band tone={tone} headingId={headingId}>
      <BandHeadingBlock {...copy} headingId={headingId} tone={tone} />

      <ul className="mt-[40px] grid gap-x-[30px] gap-y-[40px] sm:grid-cols-2 lg:mt-[60px] lg:grid-cols-3">
        {youtubeIds.map(id => {
          const title = videoTitleOverrides[id] ?? videoTitles[id] ?? galleryCopy.videoGallery.fallbackTitle
          return (
            <li key={id}>
              <VideoFacade
                youtubeId={id}
                title={title}
                poster={galleryPosterPath(id)}
                // The title is printed beneath as text; see VideoGallery.
                posterAlt=""
                posterWidth={galleryPosterSlot.width}
                posterHeight={galleryPosterSlot.height}
                playLabel={homeVideo.playLabel}
                ringClass="h-[64px] w-[64px] text-[13px] leading-[13px]"
                playing={openId === id}
                onPlayingChange={playing => setOpenId(playing ? id : null)}
                className="aspect-video w-full rounded-card"
              />
              <h3 className="mt-[16px] font-display text-[18px] leading-[26px] text-primary">{title}</h3>
            </li>
          )
        })}
      </ul>

      <div className="mt-[40px] text-center lg:mt-[50px]">
        <PillLink label="More Videos on YouTube" href={social.youtube} tone={tone} />
      </div>
    </Band>
  )
}
