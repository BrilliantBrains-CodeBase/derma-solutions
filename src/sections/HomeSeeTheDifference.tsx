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
 *  - The image row is y 397-900. The reference splits it into two pairs of
 *    308x501 halves with a 5px seam inside each pair and 31px between them, and
 *    rounds only the two outward-facing corners of each half so the seam stays
 *    square. None of that survives here — see the first departure below — so the
 *    four images sit two-by-two on the 30px gap the rest of the page uses, at
 *    r=30 on all four corners, which is the radius the reference's outer corners
 *    fit anyway. The band is a row taller than the capture as a result; the
 *    reasoning is on the grid itself below.
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
 * Five departures from the reference:
 *
 *  - The reference's two pairs are four singles, and its Before/After captions
 *    are gone. The clinic's photographs arrive pre-composed: each file is the
 *    before shot and the after shot side by side with both words already burned
 *    into the pixels. So the pair is inside the image rather than built by the
 *    layout, a caption would print "Before" twice, and the seam, the split
 *    radius and the caption gradient all have nothing left to act on.
 *
 *    This is stronger than what it replaces, not a compromise. The rule the old
 *    layout existed to enforce — an after shot is never shown without its before
 *    beside it — was a property of the grid, and one bad breakpoint could have
 *    broken it. Now it is a property of the file and cannot break.
 *  - The disclaimer under the images has no counterpart in the reference. Copy
 *    doc note 2 requires it to stay visible beside them.
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
 *    src/styles/index.css. The reference also fades the images up under
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
 * One patient's before-and-after, which is one whole file: both halves and both
 * labels are in the pixels. So this is a bare framed <img> — no caption, no
 * gradient to carry one, and no per-side radius, because there is no seam in the
 * layout for a square corner to meet.
 *
 * 5:4 rather than the composites' own ratios, which run from 1.24:1 to 1.27:1
 * across the four. Pinning the frame is what keeps the row's baselines level;
 * object-cover takes the 1-2% off the top and bottom, well outside the faces.
 */
function TransformationImage({ image, imageAlt }: { image: string; imageAlt: string }) {
  return (
    <figure className="overflow-hidden rounded-30">
      <img
        src={image}
        alt={imageAlt}
        width={1240}
        height={992}
        loading="lazy"
        decoding="async"
        className="aspect-[5/4] w-full object-cover"
      />
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
        Two up and two down at lg, on the 30px gap the row already used between
        its pairs. Each tile is one patient's complete before-and-after, so
        unlike the layout this replaces there is no arrangement of them that can
        show an after shot without its before.

        Two columns and not four. Four tiles across the 1280 content box is 288px
        each, and since every tile already holds two faces that leaves each face
        about 140px wide — smaller than the reference's 308px halves and too
        small to read as evidence of anything, which is the band's whole job. At
        two columns the halves land at ~310px, which is the reference's size
        almost exactly. The band grows a row taller and that is the trade.
      */}
      <CardCarousel
        label={homeSeeTheDifference.heading}
        ulClassName="mt-[50px] grid gap-[30px] lg:mt-[80px] lg:grid-cols-2"
        // Still one per view on a phone: each tile is itself two faces side by
        // side, so the two-up the other bands take at sm would put four across
        // 640px and undo the sizing the desktop grid is arranged to protect.
        slidesClassName="[--slides:1]"
      >
        {homeSeeTheDifference.transformations.map(transformation => (
          <li key={transformation.id}>
            <TransformationImage
              image={transformation.image}
              imageAlt={transformation.imageAlt}
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
