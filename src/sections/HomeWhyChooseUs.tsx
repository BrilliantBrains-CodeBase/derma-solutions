import type { CSSProperties } from 'react'
import { assets, contact, founder, homeWhyChooseUs } from '@/config/site'
import { PhoneIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'

/**
 * Built to theme-reference/04-sections/06-experience-the-art-of-beauty-with-
 * expert-han/ — the band the copy doc numbers 07.
 *
 * That directory's computed.json holds only the outer container, which reports
 * itself transparent at radius 0, so every measurement here is read off its
 * screenshot.png (1440x751) the way HomeAbout and HomeWhatWeDo were built. The
 * capture disagrees with the computed styles: the band is painted cream out to
 * x 20-1420 at radius 30, on a node the capture never recorded. Sampling the
 * neighbouring sections settles it — 16-explore-our-wide-range and this one
 * come back #FCF4F1 at x=30, while 18-our-remarkable-transformation and
 * 13-simple-steps come back white.
 *
 * So the band is the Services band's construction exactly: 1400 wide inside
 * 20px of page padding, 60px of inner padding, a 1280 content box at x 80-1360.
 * Vertical padding is 110 rather than Services' 100. The content box splits
 * 617 / 40 / 623, which is why the columns are percentages and not pixels —
 * three fixed widths summing to the container is the overflow HomeAbout's
 * comment records.
 *
 * The media composition is four pieces placed in percentages of a 616x530 box,
 * again as HomeAbout does it. At 616px they land exactly where the reference
 * puts them — photo 1 at (0,0), the accent panel at (201,185) 415x345, photo 2
 * at (298,90), both photographs 268x414 — and below that the composition scales
 * as one piece instead of needing a second layout for narrow screens. The gap
 * between the photographs is exactly 30px and all three radii fit r=30, fitted
 * from the corner insets rather than read off, because the capture carries no
 * stylesheet.
 *
 * Two things worth knowing about the numbers:
 *
 *  - The hairline under the paragraphs measures rgb(247,229,222), which is
 *    exactly --color-divider (#CD5F371A) composited over the cream band. It is
 *    the token, not a one-off tint.
 *  - The accent disc in the contact row is centred on the avatar's right edge,
 *    not tucked inside it: the avatar is x 737-787 and the 36px disc x 769-804.
 *    Hence the -18px pull rather than a negative inset.
 *
 * Seven departures from the reference:
 *
 *  - Both photographs are placeholders, on the same terms as the hero's and the
 *    About band's. See the TODO on assets.whyChooseImage1.
 *  - The vertical badge reads "20 Years Experience", not the demo's
 *    "25YEARS EXPERIENCE" — the copy doc's number, and it carries the space the
 *    demo drops. See the compliance TODO in site.ts.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, and the photographs wipe in on a scroll-driven timeline rather
 *    than under ScrollTrigger — as in HomeAbout, and for the same reason. See
 *    .reveal-word and .reveal-wipe in src/styles/index.css.
 *  - The second paragraph is a <p>, not the reference's <h3>. It is a statement
 *    about the clinic, not a section, and as a heading it would put a stray h3
 *    in the page's outline under an h2 that does not own it — the same call
 *    already made for "Need Help!" in HomeAbout.
 *  - The contact row's portrait is founder.photo, not the reference's
 *    2025-04-author-2.jpg. That file is the theme vendor's stock headshot, and
 *    an anonymous stock face beside the clinic's own phone number reads as a
 *    claim about who answers it. The founder's photograph is already in the
 *    repo and makes the row true.
 *  - why-choose-bg-shape.svg is not ported. It is a third reference-only asset
 *    for two barely-visible strokes at the band's outer edges; the Services
 *    band's shape is doing that job on this page already.
 *  - The whole contact row is one tel: link. The reference wraps only the
 *    ElementsKit box, leaving the portrait and the phone disc beside it inert.
 *
 * The white Case Studies band (copy doc section 06, HomeCaseStudies) now sits
 * between this band and the cream Services band above it, which is the demo's
 * own alternation. The two cream bands no longer touch.
 */

/* The band is cream, so the hero's white ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/**
 * The reference's `.years-experience-text` — Marcellus 16/26 at 3.2px tracking,
 * white, running bottom-to-top up the 50px strip the accent panel leaves to the
 * right of the second photograph. Measured: the glyph run is y 398-604 inside a
 * panel of y 295-640, so it is bottom-anchored 36px up (10.435% of 345), and
 * the strip is the panel's rightmost 50 of 415 (12.048%).
 *
 * vertical-rl turns the line clockwise, which would read top-to-bottom; the
 * 180deg rotation is what puts it the way the reference reads it. The pair is
 * cheaper than `writing-mode: sideways-lr`, which Safari still does not ship.
 *
 * Type size is in cqw against the media box, not pixels. This is the one piece
 * of the composition whose length is set by the string rather than by the
 * layout, and the reference's 16px only fits at the reference's 616px box: at
 * the lg breakpoint the column narrows to ~416, and 16/3.2 would run the label
 * off the bottom of a panel that has shrunk to 233px. 2.597cqw is exactly 16px
 * at 616 and stays inside the panel at every width. The 10px floor keeps it
 * legible on a phone, where the proportional size would fall to ~8.7px and the
 * panel still has 30px of slack to absorb it.
 *
 * It is aria-hidden and the claim is carried by the panel's own aria-label, on
 * the same reasoning as HomeWhatWeDo's ExperienceBadge: a rotated box is still
 * ordinary text to a screen reader, but the panel is the thing being labelled
 * and one announcement is the right number.
 */
function YearsLabel({ label }: { label: string }) {
  return (
    <p
      aria-hidden
      className="absolute right-0 bottom-[10.435%] flex w-[12.048%] justify-center font-display text-[max(10px,2.597cqw)] leading-[1.625] tracking-[0.519cqw] whitespace-nowrap text-white uppercase [writing-mode:vertical-rl]"
      style={{ transform: 'rotate(180deg)' }}
    >
      {label}
    </p>
  )
}

export function HomeWhyChooseUs() {
  return (
    <section aria-labelledby="home-why-choose-us-heading" className="px-[20px]">
      <div className="mx-auto max-w-[1400px] rounded-30 bg-secondary px-[24px] py-[60px] lg:px-[60px] lg:py-[110px]">
        <div className="flex flex-col gap-[50px] lg:flex-row lg:items-center lg:gap-[3.125%]">
          {/*
            Media column — 616x530 at full width, scaled as one composition
            below. Painted back to front: the front-left frame, then the accent
            panel over it, then the frame that sits inside the panel.
          */}
          <div className="@container relative mx-auto aspect-[616/530] w-full max-w-[616px] shrink-0 lg:mx-0 lg:w-[48.203%]">
            <Photo
              src={assets.whyChooseImage1}
              alt={assets.whyChooseImage1Alt}
              width={264}
              height={408}
              className="absolute top-0 left-0 h-[78.113%] w-[43.506%]"
            />

            {/*
              The reference's accent panel. It is named rather than hidden: it
              is the only thing carrying the years claim, since the label drawn
              on it is turned on its side and marked aria-hidden.
            */}
            <div
              role="img"
              aria-label={homeWhyChooseUs.badge}
              className="absolute top-[34.906%] left-[32.630%] z-10 h-[65.094%] w-[67.370%] rounded-30 bg-accent"
            >
              {/*
                Nested in the panel so the label is placed in the panel's own
                percentages, and so role="img" keeps it out of the accessibility
                tree twice over. Nothing overlaps the strip it sits in, so it
                needs no z-index of its own.
              */}
              <YearsLabel label={homeWhyChooseUs.badge} />
            </div>

            <Photo
              src={assets.whyChooseImage2}
              alt={assets.whyChooseImage2Alt}
              width={264}
              height={408}
              className="absolute top-[16.981%] left-[48.377%] z-20 h-[78.113%] w-[43.506%]"
            />
          </div>

          {/* Text column. */}
          <div className="w-full min-w-0 lg:w-[48.672%] lg:shrink-0">
            <Eyebrow className="text-accent">{homeWhyChooseUs.eyebrow}</Eyebrow>

            <h2
              id="home-why-choose-us-heading"
              className="mt-[20px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            >
              {homeWhyChooseUs.heading.split(' ').map((word, index, words) => (
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
              {homeWhyChooseUs.body}
            </p>

            {/* The reference's second statement: Marcellus 22/31 on the heading colour. */}
            <p className="mt-[48px] font-display text-[20px] leading-[29px] text-primary lg:text-[22px] lg:leading-[31px]">
              {homeWhyChooseUs.statement}
            </p>

            {/* Decoration inside a section, so a div and not an <hr>. */}
            <div className="mt-[43px] h-px bg-divider" />

            <a
              href={contact.telHref}
              className={`group/tel mt-[40px] flex w-fit items-center rounded-16 ${focusRing}`}
            >
              {/*
                The portrait and the disc are one decorative unit inside the
                link — the accessible name comes from the label and number
                beside them, which is what the link is for.
              */}
              <span aria-hidden className="relative flex shrink-0 items-center">
                <img
                  src={founder.photo}
                  alt=""
                  width={50}
                  height={50}
                  loading="lazy"
                  decoding="async"
                  className="h-[50px] w-[50px] rounded-full object-cover"
                />
                {/* Centred on the portrait's right edge, so it overhangs by half. */}
                <span className="-ml-[18px] flex h-[36px] w-[36px] items-center justify-center rounded-full bg-accent text-white transition-colors group-hover/tel:bg-primary">
                  <PhoneIcon className="h-[15px] w-[15px]" />
                </span>
              </span>

              <span className="ml-[20px] flex flex-wrap items-baseline gap-x-[10px]">
                <span className="font-sans text-[16px] leading-[26px] text-body">
                  {homeWhyChooseUs.contactLabel}
                </span>
                <span className="font-display text-[20px] leading-[26px] text-primary lg:text-[22px]">
                  {contact.phoneDisplay}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
