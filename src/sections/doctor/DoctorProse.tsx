import { Photo } from '@/components/Photo'
import type { BandFooter, BandHeading, Tone } from '@/content/doctor'
import { Band, BandFooterBlock, BandHeadingBlock } from './DoctorBand'

/**
 * The doc's text bands, with or without a photograph — A1 (team
 * introduction), B1.6 (image + numbered procedure list), B3.5 (image + text),
 * B4.2 and B4.5 (text).
 *
 * With an image it is the two-column image-and-copy band of
 * theme-reference/04-sections/11-your-journey-to-radiant-confidence/ as
 * HomeAbout builds it: photograph left at ~47% of the 1280 box, a 60px gutter,
 * copy right. Without one it is that band's copy column alone, centred at the
 * 860 measure the About page's heading blocks use.
 *
 * B1.6's numbered list is the reference's `how-work-step-item` markers from
 * 13-simple-steps-…/ — a numbered disc, title, one line — as an <ol>.
 *
 * Departures from the reference:
 *
 *  1. One photograph, not HomeAbout's overlapping pair: the doc supplies one
 *     per band (Dr-Sandeep-Mahapatra-4.jpg, Thyagaraj_photo1.jpg), and both
 *     are small enough that the frame is capped at their native widths.
 *  2. No CTA of the reference's own; the doc's "CTA line", where given, is the
 *     shared call row under the band.
 */
export function DoctorProse({
  tone,
  paragraphs,
  image,
  steps,
  headingId,
  ...copy
}: BandHeading &
  BandFooter & {
    tone: Tone
    paragraphs?: readonly string[]
    image?: { src: string; alt: string; width: number; height: number }
    steps?: readonly { title: string; detail: string }[]
    headingId: string
  }) {
  const body = (
    <>
      {paragraphs?.map(paragraph => (
        <p key={paragraph} className="mt-[20px] font-sans text-[16px] leading-[26px] text-body">
          {paragraph}
        </p>
      ))}

      {steps && (
        <ol className="mt-[30px] flex flex-col gap-[20px] text-left">
          {steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-[16px]">
              <span
                aria-hidden
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[18px] leading-[18px] text-white"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-[20px] leading-[28px] text-primary">{step.title}</h3>
                <p className="mt-[2px] font-sans text-[16px] leading-[26px] text-body">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  )

  if (!image) {
    return (
      <Band tone={tone} headingId={headingId}>
        <BandHeadingBlock {...copy} headingId={headingId} tone={tone} />
        <div className="mx-auto max-w-[860px] text-center">{body}</div>
        <BandFooterBlock after={copy.after} ctaLine={copy.ctaLine} tone={tone} />
      </Band>
    )
  }

  return (
    <Band tone={tone} headingId={headingId}>
      <div className="flex flex-col gap-[40px] lg:flex-row lg:items-center lg:gap-[60px]">
        <div className="mx-auto w-full shrink-0 lg:mx-0 lg:w-[46.9%]" style={{ maxWidth: image.width }}>
          <Photo
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full"
            fit="natural"
          />
        </div>

        <div className="w-full min-w-0 lg:flex-1">
          <BandHeadingBlock {...copy} headingId={headingId} tone={tone} align="left" />
          {body}
        </div>
      </div>

      <BandFooterBlock after={copy.after} ctaLine={copy.ctaLine} tone={tone} />
    </Band>
  )
}
