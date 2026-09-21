import { CardCarousel } from '@/components/CardCarousel'
import type { BandHeading } from '@/content/doctor'
import { Band, BandHeadingBlock } from './DoctorBand'

/**
 * B1.8 and B3.6 — What Patients Say. Built to
 * theme-reference/04-sections/08-life-changing-results-from-our-clients/ the
 * way HomeTestimonials builds it: the dark panel, a centred heading, quotes
 * on 30px gutters with a divider-dark hairline above each attribution, and a 50px accent initial disc in place of the vendor's stock
 * avatars (see HomeTestimonials for why no faces are invented).
 *
 * Departures from HomeTestimonials:
 *
 *  1. Three quotes fit the reference Swiper's 3-up exactly, so the track is a
 *     plain grid from lg and only swipes below it.
 *  2. A single quote (B3.6) is set alone at a reading measure, centred, rather
 *     than as one card in a three-column track.
 *  3. No dot-field artwork: the shared Band panel does not clip, and the
 *     shape would spill past its rounded corners.
 *  4. The role line under each name is the treatment the patient had, which is
 *     what the doc attributes each quote to.
 *
 * TODO(content): doc note 6 — confirm patient consent for publishing names.
 */

type Testimonial = { name: string; treatment: string; quote: string }

function Quote({ item }: { item: Testimonial }) {
  return (
    <figure className="flex w-full flex-col">
      <blockquote className="font-sans text-[16px] leading-[26px] text-white/85">{item.quote}</blockquote>
      <div className="mt-auto pt-[30px]">
        <div aria-hidden className="h-px bg-divider-dark" />
        <figcaption className="mt-[30px] flex items-center gap-[10px]">
          <span
            aria-hidden
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[20px] leading-[20px] text-white"
          >
            {item.name.charAt(0)}
          </span>
          <div className="min-w-0 text-left">
            <p className="font-display text-[20px] leading-[24px] text-white">{item.name}</p>
            <p className="font-sans text-[16px] leading-[26px] text-white/85">{item.treatment}</p>
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

export function DoctorTestimonials({
  items,
  headingId,
  ...copy
}: BandHeading & { items: readonly Testimonial[]; headingId: string }) {
  return (
    <Band tone="dark" headingId={headingId}>
      <BandHeadingBlock {...copy} headingId={headingId} tone="dark" />

      {items.length === 1 ? (
        <div className="mx-auto mt-[50px] max-w-[760px] lg:mt-[60px]">
          <Quote item={items[0]} />
        </div>
      ) : (
        <CardCarousel
          label={copy.heading}
          ulClassName="mt-[50px] grid gap-[30px] lg:mt-[60px] lg:grid-cols-3"
          slidesClassName="[--slides:1] md:[--slides:2]"
          tone="dark"
        >
          {items.map(item => (
            <li key={item.name} className="flex">
              <Quote item={item} />
            </li>
          ))}
        </CardCarousel>
      )}
    </Band>
  )
}
