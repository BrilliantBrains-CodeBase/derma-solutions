import type { ReactNode } from 'react'
import { ArrowDiagonalIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { RevealWords } from '@/components/RevealWords'
import { callButton, type BandFooter, type BandHeading, type Tone } from '@/content/doctor'

/**
 * The frame every doctor-page band is drawn in, plus the heading block and the
 * closing row most of them share.
 *
 * Nothing here is new geometry. It is the two grounds the About page already
 * alternates between, lifted so eleven band components do not each restate
 * them:
 *
 *  - white: the 1300 container, 60/100 vertical rhythm — AboutTeam, AboutFaq.
 *  - cream / dark: a 1400-wide rounded-30 panel inside the 20px page gutter,
 *    24/60 inner padding, 60/110 vertical — AboutApproach (cream) and
 *    AboutJourney (dark), measured there off theme-reference/04-sections/31-
 *    and 32-.
 *
 * Which ground a band takes is the page's decision, recorded in its content
 * module (see `Tone` in src/content/doctor.ts for why it is not automatic).
 */

export const focusRing = (tone: Tone) =>
  `focus-visible:outline-2 focus-visible:outline-offset-4 ${
    tone === 'dark' ? 'focus-visible:outline-white' : 'focus-visible:outline-accent'
  }`

/** A card's fill: it has to differ from the ground it sits on. */
export const cardSurface = (tone: Tone) =>
  tone === 'white' ? 'bg-secondary' : tone === 'cream' ? 'bg-white' : 'bg-white/5'

export function Band({
  tone,
  headingId,
  id,
  children,
}: {
  tone: Tone
  headingId: string
  id?: string
  children: ReactNode
}) {
  if (tone === 'white') {
    return (
      <section
        id={id}
        aria-labelledby={headingId}
        className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
      >
        {children}
      </section>
    )
  }

  return (
    <section id={id} aria-labelledby={headingId} className="px-[20px]">
      <div
        className={`mx-auto max-w-[1400px] rounded-30 px-[24px] py-[60px] lg:px-[60px] lg:py-[110px] ${
          tone === 'cream' ? 'bg-secondary' : 'bg-primary'
        }`}
      >
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </div>
    </section>
  )
}

/**
 * Eyebrow, H2, the doc's accent "Subheading" line and a lead paragraph.
 *
 * The subheading is a <p>, not an <h3>: it introduces nothing beneath it, and
 * as a heading it would put a stray entry in the outline — the same call
 * HomeMeetDermatologist makes for its specialisms line.
 */
export function BandHeadingBlock({
  heading,
  eyebrow,
  subheading,
  intro,
  headingId,
  tone,
  align = 'center',
}: BandHeading & { headingId: string; tone: Tone; align?: 'center' | 'left' }) {
  const dark = tone === 'dark'
  const centred = align === 'center'

  return (
    <div className={centred ? 'mx-auto max-w-[860px] text-center' : 'max-w-[760px]'}>
      {eyebrow && (
        <Eyebrow className={`${centred ? 'justify-center' : ''} ${dark ? 'text-white' : 'text-accent'}`}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        id={headingId}
        // The colour is not optional on dark: @layer base paints every heading
        // --color-primary, which is the dark panel's own fill.
        className={`${eyebrow ? 'mt-[20px]' : ''} text-balance font-display text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px] ${
          dark ? 'text-white' : 'text-primary'
        }`}
      >
        <RevealWords text={heading} />
      </h2>
      {subheading && (
        <p
          className={`mt-[12px] font-display text-[20px] leading-[29px] lg:text-[22px] lg:leading-[31px] ${
            dark ? 'text-white/85' : 'text-accent'
          }`}
        >
          {subheading}
        </p>
      )}
      {intro && (
        <p className={`mt-[20px] font-sans text-[16px] leading-[26px] ${dark ? 'text-white/85' : 'text-body'}`}>
          {intro}
        </p>
      )}
    </div>
  )
}

/**
 * The pill and detached arrow chip every CTA on the site uses (AboutWhatWeDo,
 * HomeAbout, HomeMeetDermatologist), here as a call button. `href` is a tel:
 * link unless a caller passes a route, in which case it is still a plain <a>:
 * the doctor pages link out to each other only through DoctorProfile, which
 * renders its own router Link.
 */
export function PillLink({
  label,
  href,
  tone,
  className = '',
}: {
  label: string
  href: string
  tone: Tone
  className?: string
}) {
  return (
    <a
      href={href}
      className={`group/cta inline-flex items-center gap-[3px] rounded-pill ${focusRing(tone)} ${className}`}
    >
      <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
        {label}
      </span>
      <span
        className={`flex h-[50px] w-[50px] items-center justify-center rounded-full transition-colors group-hover/cta:bg-accent group-hover/cta:text-white ${
          tone === 'dark' ? 'bg-white text-primary' : 'bg-primary text-white'
        }`}
      >
        <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
      </span>
    </a>
  )
}

/** The doc's closing paragraph and "CTA line", in that order. */
export function BandFooterBlock({ after, ctaLine, tone }: BandFooter & { tone: Tone }) {
  if (!after && !ctaLine) return null
  const dark = tone === 'dark'

  return (
    <div className="mx-auto mt-[40px] max-w-[860px] text-center lg:mt-[50px]">
      {after && (
        <p className={`font-sans text-[16px] leading-[26px] ${dark ? 'text-white/85' : 'text-body'}`}>{after}</p>
      )}
      {ctaLine && (
        <div className={`${after ? 'mt-[30px]' : ''} flex flex-col items-center gap-[20px]`}>
          <p
            className={`text-balance font-display text-[20px] leading-[29px] lg:text-[24px] lg:leading-[32px] ${
              dark ? 'text-white' : 'text-primary'
            }`}
          >
            {ctaLine}
          </p>
          <PillLink label={callButton.label} href={callButton.href} tone={tone} />
        </div>
      )}
    </div>
  )
}
