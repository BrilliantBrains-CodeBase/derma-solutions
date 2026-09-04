import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { homeHowItWorks } from '@/config/site'
import {
  ArrowDiagonalIcon,
  FourCirclesIcon,
  HeadsetIcon,
  LayersIcon,
  VennIcon,
} from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'

/**
 * Built to theme-reference/04-sections/13-simple-steps-to-stunning-
 * transformations/ — the band the copy doc numbers 08.
 *
 * Its computed.json records only the outer container (transparent, radius 0,
 * 1300px, 100px of padding top and bottom), so everything inside is measured
 * off screenshot.png (1440x810) the way the About and Why Choose Us bands were
 * built. The band samples white, not cream: the neighbouring 16-explore-our-
 * wide-range and 06-experience-the-art come back #FCF4F1 at x=30, this one and
 * 18-our-remarkable-transformation come back #FFFFFF.
 *
 * The container is therefore the white-band form HomeAbout and HomeWhatWeDo
 * already use — 1300 wide, 10px of side padding, 100px vertical — and not the
 * cream bands' 1400/60. Inside, two 50% columns with no gap between them: the
 * left column's 40px right padding is the entire gutter, which is why it is
 * padding here and not a flex gap.
 *
 * Two pieces of the geometry are worth writing down.
 *
 *  - The step rhythm is 80px of row gap against a 60px badge, halving to 40px
 *    below 1024px, and the badge itself drops to 50px below 768px. Those three
 *    numbers are what every offset in the connector below is derived from.
 *  - The badge is 60px holding a 34px pictogram, i.e. 13px of ring on each
 *    side. The reference achieves that with a font-size on an icon font; here
 *    it is the icon's own width, so the ring is the same at both sizes.
 *
 * Six departures from the reference:
 *
 *  - The copy is the client's, not the demo's: "Simple steps to visible
 *    results" and four clinical steps, rather than "...stunning
 *    transformations" and four repeats of the same placeholder paragraph.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, as in HomeAbout and HomeWhyChooseUs. The four steps do not
 *    carry the reference's staggered fadeInUp: the repo has no ScrollTrigger,
 *    and on this page only headings animate.
 *  - The connector is anchored in fixed offsets from the badge, not the
 *    reference's `height: 85%`. That percentage only reads correctly because
 *    all four demo paragraphs are the same length; these four are not, so a
 *    percentage would leave four visibly different gaps. See ConnectorLine.
 *  - The CTA points at contact.ctaHref, not the reference's /contact-us/,
 *    which 404s here. Same substitution homeServices.cta makes — see the TODO
 *    in site.ts.
 *  - The left column pins at 140px rather than the reference's 30px. This
 *    site's header is sticky at 110px on lg (Header.tsx); Glowix's scrolls
 *    away, so its 30px is measured against nothing. 110 + 30 = 140.
 *  - The steps are an <ol>, not four sibling <div> widgets. It is an ordered
 *    process and the "01"-"04" belong to the document, not to the paint.
 */

/* The band is white, so the hero's white focus ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/**
 * Positional, 1:1 with homeHowItWorks.steps — site.ts carries no JSX, so the
 * artwork is paired with the copy here rather than in the config. The array is
 * indexed, not keyed, because the pairing is the reference's own order and
 * there is no name in the copy to key it by.
 */
const stepIcons = [LayersIcon, FourCirclesIcon, VennIcon, HeadsetIcon]

/**
 * The reference's `.how-work-step-item::before` — a hairline dropped from under
 * one badge to just above the next.
 *
 * The reference draws it from the item's bottom edge: `bottom: 0` translated
 * down 60px with `height: 85%`, so its length is a function of how tall the
 * step happens to be. Every demo step is the same height, so it reads as a
 * constant. These four steps are not: their paragraphs run one, two and three
 * lines, and the same rule would leave four different gaps under the badges.
 *
 * So it is anchored to the badge instead — 12px below it, down to 12px above
 * the next one — which is a constant at every step height. The three offsets
 * are just the badge and gap sizes: 50+12 then 40-12 below 768px, 60+12 from
 * 768, and 80-12 from 1024 where the gap doubles.
 *
 * `left` is the badge's centre and the line is drawn to its right, which is
 * what the reference's `border-left` at `translate(30px, ...)` does too.
 */
function ConnectorLine() {
  return (
    <span
      aria-hidden
      className="absolute top-[62px] bottom-[-28px] left-[25px] w-px bg-divider md:top-[72px] md:left-[30px] lg:bottom-[-68px]"
    />
  )
}

export function HomeHowItWorks() {
  return (
    <section
      aria-labelledby="home-how-it-works-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
    >
      {/* No gap: the left column's 40px right padding is the gutter. */}
      <div className="flex flex-col gap-[50px] lg:flex-row lg:gap-0">
        {/* Copy column. */}
        <div className="w-full min-w-0 lg:w-1/2 lg:pr-[40px]">
          {/*
            The reference's `.sticky-column`, and the reason it is a wrapper
            rather than the column itself: a sticky box travels inside its
            parent, so the parent has to be the one stretching to the height of
            the steps beside it.
          */}
          <div className="lg:sticky lg:top-[140px]">
            <Eyebrow className="text-accent">{homeHowItWorks.eyebrow}</Eyebrow>

            <h2
              id="home-how-it-works-heading"
              className="mt-[20px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            >
              {homeHowItWorks.heading.split(' ').map((word, index, words) => (
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

            <p className="mt-[26px] font-sans text-[16px] leading-[26px] text-body">
              {homeHowItWorks.body}
            </p>

            {/* The reference's button: a pill with a detached dark arrow chip. */}
            <Link
              to={homeHowItWorks.cta.href}
              className={`group/cta mt-[30px] inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}
            >
              <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
                {homeHowItWorks.cta.label}
              </span>
              <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
                <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
              </span>
            </Link>
          </div>
        </div>

        {/* Steps column. */}
        <ol className="flex w-full min-w-0 flex-col gap-[40px] lg:w-1/2 lg:gap-[80px]">
          {homeHowItWorks.steps.map((step, index) => {
            const Icon = stepIcons[index]

            return (
              <li key={step.number} className="group/step relative flex items-start">
                {/*
                  The badge is decorative — the number it sits beside is in the
                  heading text, and the pictogram says nothing the heading does
                  not. The hover target is the whole row, as in the reference.
                */}
                <span
                  aria-hidden
                  className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/step:bg-accent md:h-[60px] md:w-[60px]"
                >
                  <Icon className="h-[28px] w-[28px] md:h-[34px] md:w-[34px]" />
                </span>

                {/* The line is drawn behind the badges, so never under the last one. */}
                {index < homeHowItWorks.steps.length - 1 && <ConnectorLine />}

                <div className="ml-[10px] min-w-0 md:ml-[20px]">
                  <h3 className="font-display text-[18px] leading-[1.2] text-primary md:text-[20px] lg:text-[22px]">
                    {`${step.number}. ${step.title}`}
                  </h3>
                  <p className="mt-[10px] font-sans text-[14px] leading-[1.6] text-body md:text-[16px]">
                    {step.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
