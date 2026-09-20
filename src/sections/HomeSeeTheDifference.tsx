import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { homeSeeTheDifference } from '@/config/site'
import { ArrowDiagonalIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { CardCarousel } from '@/components/CardCarousel'

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
 *
 * The reference's hairline at y 981 and the four-tile counter row beneath it
 * are not built — see the departures below — so the measurements for them are
 * not reproduced here. They are in this file's history if the row comes back.
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
 *  - No counter row, and no hairline above it. The reference closes the band
 *    with four tweened figures (25+ / 150K+ / 30+ / 2K+); the client asked for
 *    them gone. This also retires the sharpest ASCI exposure on the page — the
 *    doc's 50,000+ laser procedures and 10,000+ hair transplants were volume
 *    claims needing clinic records to substantiate if challenged, and the
 *    remaining "20+ years" claims elsewhere on the page are far easier to back.
 *    HomeTrustBadges' docblock cites this row as its reason for staying static
 *    and for skipping icons; that reasoning is now stale, not wrong, and the
 *    band is unchanged.
 *  - A "View All" button in the row's place, pointing at /image-gallery/. The
 *    band shows four transformations and the reference offers no way to the
 *    rest; this is the pill-and-detached-chip button HomeCaseStudies uses, to
 *    the same destination.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, as in HomeAbout and for the same reason. See .reveal-word in
 *    src/styles/index.css. The reference also fades the images up under
 *    ScrollTrigger; only the heading animates here.
 */

/* The band sits on white, so the hero's white ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

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
        Where the reference's hairline and counter row were. The reference
        leaves 81px from the photographs to that rule; the disclaimer is fitted
        inside it (20 + 24 + 36 = 80), so the button picks up the same 36 and the
        band keeps the rhythm it was measured to.
      */}
      <div className="mt-[36px] flex justify-center">
        {/* The same pill and detached dark chip the Case Studies band's CTA uses. */}
        <Link
          to={homeSeeTheDifference.cta.href}
          className={`group/cta inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}
        >
          <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
            {homeSeeTheDifference.cta.label}
          </span>
          <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
            <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
          </span>
        </Link>
      </div>
    </section>
  )
}
