import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { assets, homeWhatWeDo } from '@/config/site'
import { ArrowDiagonalIcon, CheckSquareIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'
import { useCountUp } from '@/hooks/useCountUp'

/**
 * Built to theme-reference/04-sections/12-transforming-beauty-confidence/ — the
 * band the copy doc numbers 04.
 *
 * That directory's computed.json holds only the outer container, so unlike the
 * hero every measurement here is read off its screenshot.png (1440x872), the
 * same way HomeAbout was built. The content box is 1280 wide inside a 1300
 * container, split 396 / 424 / 376 across gaps of 41 and 44, and the band is
 * 100px of padding top and bottom.
 *
 * Two measurements the eye gets wrong:
 *
 *  - The right photograph is not a stadium. Its straight vertical edge runs
 *    y 293-578, so the cap is 169px against a 376-wide box. As a share of that
 *    box that is 45% / 27%, which is why the radius is a percentage — a pixel
 *    radius would turn the cap into a corner as the column narrows.
 *  - The badge is a true stadium: it reaches full width only between y 542 and
 *    587, a 65px cap on a 130px box. rounded-pill's 100px clamps to exactly
 *    that.
 *
 * Vertical alignment is not uniform. The text column (centre 436) and the right
 * photograph (435.5) sit on the band's centre, but the left figure hangs lower
 * and lands on the content floor, so it takes self-end rather than the row's
 * items-center.
 *
 * The badge's 30px overhang is the reference's -7.98%, but only from sm up.
 * Under ~460px the photograph reaches the 20px gutter and that overhang would
 * put the badge past the viewport edge, so it eases to -4% and stays on screen.
 *
 * The row is a row from 1280 up, not from 1024: its fixed columns come to
 * 396 + 42 + 376 + 42, which at lg would leave the text column 148px and the
 * heading — whose words are inline-blocks and cannot break — would push the
 * page into a horizontal scroll. Below that the three pieces stack.
 *
 * Five departures from the reference:
 *
 *  - The photographs are the clinic's own, not the theme's. The left one also
 *    repeats the Appointment band's portrait — see the TODO on
 *    assets.whatWeDoImage1.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, and the right photograph wipes in on a scroll-driven timeline
 *    rather than under ScrollTrigger — as in HomeAbout, and for the same
 *    reason. See .reveal-word and .reveal-wipe in src/styles/index.css.
 *  - The badge counts to 20, not the demo's 25. See the compliance TODO in
 *    site.ts.
 *  - "Learn More" points at a live route rather than the demo's /contact-us/,
 *    which 404s here. See the TODO on homeWhatWeDo.cta.
 *  - The left arch is painted here rather than baked into the file. The
 *    reference's PNG carries its own pale arch; the clinic's cut-out is keyed
 *    to transparency, so the band draws the arch and the figure stands on it —
 *    same composition, one layer further out. Sampled off screenshot.png the
 *    arch is #FCF4F1 (--color-secondary), full column width, 80.8% of the
 *    block's height and bottom-anchored, with rounded-t-full clamping to the
 *    reference's own 198px semicircular cap on a 396-wide box. The figure
 *    itself takes no frame, gloss or wipe: the reference tags it
 *    `at-animation-image-none at-none`, and only one of this band's two
 *    photographs is meant to move.
 */

/* The band sits on white, so the hero's white ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/** The reference's `experirnce-box`: an accent stadium overhanging the photo. */
function ExperienceBadge() {
  const { value, ref } = useCountUp(homeWhatWeDo.badgeValue, 2000)
  const label = `${homeWhatWeDo.badgeValue}${homeWhatWeDo.badgeSuffix} ${homeWhatWeDo.badgeLabel}`

  return (
    // Named once, so a screen reader reads the settled claim rather than a
    // ticking number.
    <div
      role="img"
      aria-label={label}
      className="absolute left-[-4%] top-[56.57%] sm:left-[-7.98%] flex h-[27.4%] w-[34.57%] flex-col items-center justify-center rounded-pill bg-accent text-center text-white"
    >
      <span
        ref={ref}
        aria-hidden
        className="font-display text-[28px] leading-[34px] xl:text-[40px] xl:leading-[48px]"
      >
        {value}
        {homeWhatWeDo.badgeSuffix}
      </span>
      <span
        aria-hidden
        className="mt-[6px] px-[10px] font-sans text-[13px] leading-[19px] font-semibold xl:mt-[8px] xl:text-[16px] xl:leading-[24px]"
      >
        {homeWhatWeDo.badgeLabel}
      </span>
    </div>
  )
}

export function HomeWhatWeDo() {
  return (
    <section
      aria-labelledby="home-what-we-do-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] xl:px-[10px] xl:py-[100px]"
    >
      <div className="flex flex-col gap-[50px] xl:flex-row xl:items-center xl:gap-[42px]">
        {/*
          The cut-out. Its pale arch is part of the PNG, so it takes no wrapper:
          no radius to clip, no .shiny-glass surface and no .reveal-wipe.
        */}
        <div className="relative mx-auto w-full max-w-[396px] xl:mx-0 xl:w-[396px] xl:shrink-0 xl:self-end">
          {/*
            The arch the reference bakes into its own PNG. It stops at 80.8% of
            the block so the figure's head clears it, exactly as the reference's
            does — measured there at 530 of 656.
          */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[80.8%] rounded-t-full bg-secondary"
          />
          <img
            src={assets.whatWeDoImage1}
            alt={assets.whatWeDoImage1Alt}
            width={375}
            height={666}
            loading="lazy"
            decoding="async"
            className="relative block w-full"
          />
        </div>

        {/* Text column. */}
        <div className="w-full xl:flex-1">
          <Eyebrow className="text-accent">{homeWhatWeDo.eyebrow}</Eyebrow>

          <h2
            id="home-what-we-do-heading"
            className="mt-[20px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] xl:text-[48px] xl:leading-[58px]"
          >
            {homeWhatWeDo.heading.split(' ').map((word, index, words) => (
              <span
                // Words can repeat within the heading, so the index is the identity.
                key={`${word}-${index}`}
                className="reveal-word"
                // Not animation-delay: a view() timeline has no clock to delay.
                // Each word is bound to a slightly later slice of the scroll.
                style={{ '--i': index } as CSSProperties}
              >
                {/* The trailing space belongs to the word's own string — see HomeAbout. */}
                {index === words.length - 1 ? word : `${word} `}
              </span>
            ))}
          </h2>

          <p className="mt-[26px] max-w-[400px] font-sans text-[16px] leading-[26px] text-body">
            {homeWhatWeDo.body}
          </p>

          {/* 16/24 on a 15px gap gives the reference's measured 39px pitch. */}
          <ul className="mt-[46px] flex flex-col gap-[15px]">
            {homeWhatWeDo.checklist.map(item => (
              <li key={item} className="flex items-center gap-[15px]">
                <CheckSquareIcon className="h-[17px] w-[17px] shrink-0 text-accent" />
                <span className="font-sans text-[16px] leading-[24px] text-body">{item}</span>
              </li>
            ))}
          </ul>

          {/* The same pill and detached chip the About band's CTA uses. */}
          <Link
            to={homeWhatWeDo.cta.path}
            className={`group/cta mt-[30px] inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}
          >
            <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
              {homeWhatWeDo.cta.label}
            </span>
            <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
              <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
            </span>
          </Link>
        </div>

        {/* Right photograph, with the badge overhanging its left edge by 30px. */}
        <div className="relative mx-auto w-full max-w-[376px] xl:mx-0 xl:w-[376px] xl:shrink-0">
          <Photo
            src={assets.whatWeDoImage2}
            alt={assets.whatWeDoImage2Alt}
            width={391}
            height={621}
            radiusClass="rounded-[45%_/_27%]"
            className="aspect-[376/624] w-full"
          />
          <ExperienceBadge />
        </div>
      </div>
    </section>
  )
}
