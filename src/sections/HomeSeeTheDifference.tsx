import type { CSSProperties } from 'react'
import { homeSeeTheDifference } from '@/config/site'
import { FourCirclesIcon, LaserIcon, PersonCircleIcon, VennIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { CardCarousel } from '@/components/CardCarousel'
import { useCountUp } from '@/hooks/useCountUp'

/**
 * Built to theme-reference/04-sections/14-our-real-patient-transformation-
 * stunning-res/ — the band the copy doc numbers 10.
 *
 * That directory's computed.json holds only the outer container, so as in
 * HomeAbout, HomeServices and HomeWhyChooseUs every measurement is read off its
 * screenshot.png (1440x1239). The section is on white — the capture's outer
 * container reports rgba(0,0,0,0) and the neighbouring bands sample #FFFFFF —
 * so it takes HomeWhatWeDo's white-band shell rather than a painted band. It
 * follows the dark Testimonials band on the page, which is the alternation the
 * demo runs too.
 *
 * The geometry, measured rather than estimated:
 *
 *  - Content box x 80-1360, i.e. 1280 inside a 1300 container, and 100px of
 *    padding top and bottom. Same box the rest of the homepage uses.
 *  - The pair row is y 397-900. Pair 1 is x 80-387 + 393-703, pair 2 is
 *    735-1042 + 1048-1358: a 5px seam inside each pair and 31px between them.
 *    The photographs are 308x501 intrinsic and render at 308x504.
 *  - The outer corners fit r=30 and nothing else — at 10px down the corner the
 *    measured inset is 7 against 7.6 predicted for r=30 and 4.5 for r=24, and
 *    at 20px it is 1 against 1.7 and 0.2. The *inner* corners are square: img
 *    1's right edge and img 2's left edge are flush at every depth sampled. So
 *    the radius is per-half and outward-facing, not a clip on the pair.
 *  - "Before" is centred in its half to within half a pixel (glyph box centre
 *    234.0 against an image centre of 233.5), cap height ~21 -> Marcellus 30,
 *    and its baseline is 35px above the image's bottom edge.
 *  - The hairline is at y 981 and runs x 70-1369 — the full 1300 container,
 *    wider than the 1280 the photographs and the tiles sit in. It samples
 *    (250,239,235), which is exactly --color-divider (#CD5F371A) over white, so
 *    it is the token and not a one-off tint. Same for the tile separators.
 *  - The counter row is four 320px tiles at boundaries 80/399/719/1039/1359.
 *    Their separators are 1px at x 399, 719 and 1039 but only y 1062-1127 tall
 *    — they are the tiles' own left borders, not full-height rules, which is
 *    why they are on the <li> and not on the row.
 *  - Icons sample (105,97,93) = --color-body and the numbers (72,30,11) =
 *    --color-primary. Icon ink is 48px wide with 22px to the text beside it.
 *
 * The 1px line at the screenshot's last row (y 1238, x 60-1396) is wider than
 * any box in this section and falls outside its own bottom padding. It is bleed
 * from the next band in the isolated capture, not a bottom border, and is not
 * reproduced.
 *
 * Six departures from the reference:
 *
 *  - The four photographs are placeholders, and here that is blocking rather
 *    than advisory: they are the demo's own stock faces under Before/After
 *    labels, which copy doc note 2 rules out outright. See the TODO on
 *    assets.transformBefore1.
 *  - The disclaimer under the pairs has no counterpart in the reference. Copy
 *    doc note 2 requires it to stay visible beside the images.
 *  - "Before" and "After" are figcaptions, not the reference's <h2>s. Four more
 *    h2s reading "Before" under this band's own h2 is a broken outline for no
 *    gain — the same call already made for homeWhyChooseUs.statement and for
 *    "Need Help!" in HomeAbout.
 *  - The counter icons are remapped. The reference's fourth is a thumbs-up for
 *    "Classes Conducted", which describes nothing the clinic counts, so
 *    LaserIcon (new artwork) takes the laser tile, FourCirclesIcon reads as the
 *    graft grid on the transplant tile, and PersonCircleIcon — the demo's
 *    "Satisfied Clients" mark — goes to the specialists. VennIcon stays on
 *    years of expertise, where the reference puts it.
 *
 *    Two of those are the How It Works band's step marks over again, which is
 *    deliberate: the demo draws its counter tiles 1 and 3 with byte-identical
 *    paths to its steps 03 and 02, so the repetition on one page is the
 *    reference's and not an oversight here.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, as in HomeAbout and for the same reason. See .reveal-word in
 *    src/styles/index.css. The reference also fades both pairs up under
 *    ScrollTrigger; only the heading animates here.
 *  - The counters tween on a shared hook rather than ElementsKit's widget. Its
 *    3500ms duration is dropped for the 2000ms HomeWhatWeDo's badge already
 *    uses, so the page has one counter speed and not two.
 */

/**
 * The reference's counters, in the reference's own left-icon layout.
 *
 * Named once and read once: role="img" with the settled claim as its label, and
 * everything inside aria-hidden, so a screen reader is not handed a ticking
 * digit. This is ExperienceBadge's pattern in HomeWhatWeDo, unchanged.
 *
 * toLocaleString is what stops 50,000 from changing digit width mid-tween, and
 * the locale is pinned rather than left to the visitor's: vite-react-ssg
 * prerenders this on the build machine, and an unpinned locale could group the
 * digits differently there than in the browser that hydrates it.
 */
const counterIcons = {
  years: VennIcon,
  laser: LaserIcon,
  transplants: FourCirclesIcon,
  specialists: PersonCircleIcon,
} as const

function Counter({ counter }: { counter: (typeof homeSeeTheDifference.counters)[number] }) {
  const { value, ref } = useCountUp(counter.value, 2000)
  const Icon = counterIcons[counter.id]

  return (
    <li
      role="img"
      aria-label={`${counter.value.toLocaleString('en-IN')}${counter.suffix} ${counter.label}`}
      className="flex items-start gap-[22px] lg:border-l lg:border-divider lg:pl-[26px] lg:first:border-l-0 lg:first:pl-0"
    >
      <Icon className="h-[48px] w-[48px] shrink-0 text-body" />

      <div aria-hidden className="min-w-0">
        <p className="font-display text-[26px] leading-[34px] text-primary lg:text-[30px] lg:leading-[40px]">
          <span ref={ref}>{value.toLocaleString('en-IN')}</span>
          {counter.suffix}
        </p>
        <p className="mt-[4px] font-sans text-[15px] leading-[24px] text-body lg:text-[16px] lg:leading-[26px]">
          {counter.label}
        </p>
      </div>
    </li>
  )
}

/**
 * One half of a pair. `side` decides which two corners round: the reference
 * rounds only the outward-facing pair of each half and leaves the seam square.
 *
 * The gradient under the caption is the one thing in this band that is fitted
 * rather than read. The reference's photographs are already dark along their
 * bottom edge, so the overlay cannot be separated from the image in a capture
 * with no stylesheet; this is the shallowest ramp that keeps the white caption
 * legible over all four.
 */
function TransformationImage({
  image,
  imageAlt,
  label,
  side,
}: {
  image: string
  imageAlt: string
  label: string
  side: 'before' | 'after'
}) {
  return (
    <figure
      className={`relative overflow-hidden ${
        side === 'before' ? 'rounded-l-30' : 'rounded-r-30'
      }`}
    >
      <img
        src={image}
        alt={imageAlt}
        width={308}
        height={501}
        loading="lazy"
        decoding="async"
        className="aspect-[308/501] w-full object-cover"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      />

      <figcaption className="absolute inset-x-0 bottom-[24px] text-center font-display text-[22px] leading-[30px] text-white sm:text-[26px] lg:text-[30px] lg:leading-[40px]">
        {label}
      </figcaption>
    </figure>
  )
}

export function HomeSeeTheDifference() {
  return (
    <section
      aria-labelledby="home-see-the-difference-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] xl:px-[10px] xl:py-[100px]"
    >
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow className="justify-center text-accent">{homeSeeTheDifference.eyebrow}</Eyebrow>

        <h2
          id="home-see-the-difference-heading"
          // text-balance keeps the three lines the reference wraps to from
          // ending on a one-word stub at the 760px cap.
          className="mt-[20px] text-balance font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
        >
          {homeSeeTheDifference.heading.split(' ').map((word, index, words) => (
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
      </div>

      {/*
        Two pairs side by side above lg, one per row below it. Each pair keeps
        its own two-up split at every width: a Before with no After beside it
        would be the one arrangement this band must never render.
      */}
      <CardCarousel
        label={homeSeeTheDifference.heading}
        ulClassName="mt-[50px] grid gap-[30px] lg:mt-[80px] lg:grid-cols-2"
        // One pair per view at every width below lg, where the other bands go
        // to two. The <li> is itself a locked two-up split, so two pairs in a
        // tablet view would put four faces across 768px; and a pair can never
        // be halved by a snap stop, which is the rule stated above.
        slidesClassName="[--slides:1]"
      >
        {homeSeeTheDifference.pairs.map(pair => (
          <li key={pair.id} className="grid grid-cols-2 gap-[5px]">
            <TransformationImage
              image={pair.before.image}
              imageAlt={pair.before.imageAlt}
              label={homeSeeTheDifference.beforeLabel}
              side="before"
            />
            <TransformationImage
              image={pair.after.image}
              imageAlt={pair.after.imageAlt}
              label={homeSeeTheDifference.afterLabel}
              side="after"
            />
          </li>
        ))}
      </CardCarousel>

      <p className="mt-[20px] text-center font-sans text-[14px] leading-[24px] text-body">
        {homeSeeTheDifference.disclaimer}
      </p>

      {/*
        The reference leaves 81px between the photographs and the hairline and
        81px again between the hairline and the tiles. The disclaimer is fitted
        inside the first of those rather than added on top of it (20 + 24 + 36 =
        80), which keeps the reference's rhythm and puts the line where the copy
        doc wants it — reading as attached to the images, not floating between
        two blocks. The padding below the rule is fitted from the tiles' ink,
        since the capture records no box for them.
      */}
      <ul className="mt-[36px] grid grid-cols-1 gap-[36px] border-t border-divider pt-[50px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[0px] lg:pt-[80px]">
        {homeSeeTheDifference.counters.map(counter => (
          <Counter key={counter.id} counter={counter} />
        ))}
      </ul>
    </section>
  )
}
