import { Link } from 'react-router-dom'
import { assets, contact, homeAbout } from '@/config/site'
import { ArrowDiagonalIcon, CheckSquareIcon, CloverIcon, PhoneIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'
import { RevealWords } from '@/components/RevealWords'
import { YearsBadge } from '@/components/YearsBadge'

/**
 * Built to theme-reference/04-sections/11-your-journey-to-radiant-confidence/ —
 * the About band the demo runs directly under the hero. (Not 04-sections/
 * 03-about-us/, which is the inner pages' breadcrumb banner.) Geometry is
 * measured off its screenshot.png (1440x816) rather than estimated: the content
 * box is 1280 wide inside a 1300 container, split 600 / 50 / 630, and the whole
 * band is 100px of padding top and bottom.
 *
 * The media stack's four pieces are placed in percentages of a 600x595 box
 * rather than in pixels. At 600px they land exactly where the reference puts
 * them — the upper-right frame at (240,0) and the lower-left one at (0,142),
 * both 360x453; the clover at (70,31), 76x75; the badge at (300,373), 160x160 —
 * and below that the composition scales as one piece instead of needing a
 * second layout for narrow screens.
 *
 * Five departures from the reference:
 *
 *  - THE CHECKLIST ROW HAS NO PHOTOGRAPH. The reference sets a 300x179 frame
 *    beside the checks, and this band did too until the 2026-09 revision round:
 *    "Remove the second image and increase the text content." Read as that one
 *    rather than the collage's lower-left frame, because it is the only image
 *    here competing with text for the column, and the instruction's second half
 *    only makes sense of it. The copy that replaced it is two paragraphs and a
 *    fourth check. assets.aboutExperienceImage and its file are kept — see the
 *    note there.
 *  - The photographs are placeholders, on the same terms as the hero's. See the
 *    TODO on assets.aboutImage1: both remaining ones are the theme vendor's,
 *    tagged "reference-only" in 06-assets/manifest.json, and stand in only for
 *    crop.
 *  - The badge reads "20 Years of Expertise" (the copy doc) rather than the
 *    demo's "15+ Years of Experience". See the compliance TODO in site.ts.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, and the three photographs wipe in on a scroll-driven timeline
 *    rather than under ScrollTrigger — see .reveal-word and .reveal-wipe in
 *    src/styles/index.css.
 *  - The contact card's label — "Speak to a specialist:" since the 2026-09
 *    round, "Need Help!" before it — is a <p>, not the reference's <h3>. It
 *    labels a phone number, not a section, and as a heading it would put a
 *    stray h3 in the page's outline under an h2 that does not own it.
 */

/* The band sits on white, so the hero's white ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/**
 * The band takes its copy rather than reading homeAbout directly, because the
 * About page's B2 is this same reference section with different strings — one
 * paragraph, three checks, a "Need Help?" label and an in-page CTA. Both
 * defaults are the homepage's, so `<HomeAbout />` is unchanged.
 */
export function HomeAbout({
  copy = homeAbout,
  headingId = 'home-about-heading',
}: {
  copy?: typeof homeAbout | typeof import('@/config/site').aboutIntro
  headingId?: string
} = {}) {
  /**
   * The About page anchors this CTA at its own team band (#our-team) rather than
   * pointing at a route. A react-router <Link> to a hash pushes a history entry
   * and re-renders without scrolling; a bare <a> gets native scroll and focus
   * behaviour and works with no JS, which matters on a prerendered page.
   */
  const ctaIsAnchor = copy.cta.path.startsWith('#')

  const ctaClassName = `group/cta inline-flex shrink-0 items-center gap-[3px] rounded-pill ${focusRing}`
  const ctaChildren = (
    <>
      <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
        {copy.cta.label}
      </span>
      <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
        <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
      </span>
    </>
  )

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
    >
      {/*
        The columns are proportions of the 1280 content box, not the reference's
        raw 600 / 50 / 630 pixels. Those three fixed widths sum to exactly the
        container, so the row overflowed on any viewport between the lg
        breakpoint and 1320 — at 1024 the text column ran off the page. As
        percentages they resolve to the reference's pixels once the container
        reaches its 1300 cap and shrink together below it.
      */}
      <div className="flex flex-col gap-[50px] lg:flex-row lg:items-start lg:gap-[3.906%]">
        {/* Media column — 600x595 at full width, scaled as one composition below. */}
        <div className="relative aspect-[600/595] w-full max-w-[600px] shrink-0 lg:w-[46.875%]">
          {/* about-us-image-bg-shape.svg, 76x75 at (70,31). */}
          <CloverIcon
            className="absolute left-[11.667%] top-[5.21%] w-[12.667%] text-accent"
          />

          {/*
            The reference's about-img-1 is the upper-right frame and about-img-2
            the lower-left one, which is the opposite of what the widget order in
            structure.html suggests. Checked against the demo's own screenshot.
          */}
          <Photo
            src={assets.aboutImage1}
            alt={assets.aboutImage1Alt}
            width={358}
            height={450}
            className="absolute left-[40%] top-0 h-[76.134%] w-[60%] rounded-30"
          />

          {/* The lower-left frame overlaps the one above and sits on top of it. */}
          <Photo
            src={assets.aboutImage2}
            alt={assets.aboutImage2Alt}
            width={360}
            height={450}
            className="absolute left-0 top-[23.866%] z-10 h-[76.134%] w-[60%] rounded-30"
          />

          {/*
            Above the lower-left frame, overhanging its right edge by 101px.
            The className carries the colours as well as the placement — see the
            note in YearsBadge, whose ring type is fill-current.
          */}
          <YearsBadge
            label={copy.badge}
            className="absolute left-[50%] top-[62.689%] z-20 flex aspect-square w-[26.667%] items-center justify-center rounded-full bg-primary text-white"
          />
        </div>

        {/* Text column. */}
        <div className="w-full min-w-0 lg:w-[49.219%] lg:shrink-0">
          <Eyebrow className="text-accent">{copy.eyebrow}</Eyebrow>

          {/*
            The gaps down this column (8 / 22 / 38 / 40) are the ones that put
            the rendered glyph bands on the reference's, not the theme's nominal
            5px grid. Elementor's heading margin and where Marcellus' cap-height
            falls inside a 58px line box account for the difference; matching the
            render is the point, so these are measured, not rounded.
          */}
          <h2
            id={headingId}
            className="mt-[8px] max-w-[520px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
          >
            <RevealWords text={copy.heading} />
          </h2>

          {/*
            Two paragraphs since the 2026-09 round, and no max-width on them:
            the photograph that used to hold this column to 610 is gone, so the
            copy takes the column. (The About page's B2 passes one.)
          */}
          <div className="mt-[22px] flex flex-col gap-[16px]">
            {copy.body.map(paragraph => (
              <p
                key={paragraph}
                className="font-sans text-[16px] leading-[26px] text-body"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-[38px] flex flex-col gap-[15px]">
            {copy.checklist.map(item => (
              <li key={item} className="flex items-center gap-[15px]">
                <CheckSquareIcon className="h-[17px] w-[17px] shrink-0 text-accent" />
                <span className="font-sans text-[16px] leading-[24px] text-body">{item}</span>
              </li>
            ))}
          </ul>

          {/*
            The reference paints this surface on the container, not on the card
            widget inside it, and holds two separate targets: the phone block is
            a tel: link and the button is a page link.
          */}
          <div className="mt-[40px] flex flex-col items-start gap-[20px] rounded-30 bg-secondary p-[30px] sm:flex-row sm:items-center sm:justify-between lg:h-[115px]">
            <a
              href={contact.telHref}
              className={`group/tel flex items-center gap-[13px] rounded-16 ${focusRing}`}
            >
              <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-white text-accent transition-colors group-hover/tel:bg-accent group-hover/tel:text-white">
                <PhoneIcon className="h-[20px] w-[20px]" />
              </span>
              <span className="block">
                <span className="block font-sans text-[16px] leading-[26px] text-body">
                  {copy.contactLabel}
                </span>
                <span className="block font-display text-[20px] leading-[24px] text-primary">
                  {contact.phoneDisplay}
                </span>
              </span>
            </a>

            {/* The reference's button: a pill with a detached dark arrow chip. */}
            {ctaIsAnchor ? (
              <a href={copy.cta.path} className={ctaClassName}>
                {ctaChildren}
              </a>
            ) : (
              <Link to={copy.cta.path} className={ctaClassName}>
                {ctaChildren}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
