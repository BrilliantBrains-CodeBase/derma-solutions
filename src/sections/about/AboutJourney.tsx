import { aboutJourney, assets } from '@/config/site'
import { ArrowDiagonalIcon, CheckSquareIcon, LayersIcon, VennIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'
import { RevealWords } from '@/components/RevealWords'
import { YearsBadge } from '@/components/YearsBadge'

/**
 * B5 — Our Journey. Built to
 * theme-reference/04-sections/32-your-journey-to-radiant-confidence-2/, which
 * appears on the demo's about-us page and nowhere else.
 *
 * computed.json holds only the outer container, so the geometry is measured off
 * screenshot.png (1440x837). The brown panel runs x 20-1419 (1400 wide, radius
 * 30) and the content box inside it is 1280, split 630 / 60 / 590.
 *
 * `lg:items-center` is measured: both columns' centres land on 418.5, which is
 * the panel's own centre.
 *
 * The collage's four pieces are placed in percentages of a 630x615 box rather
 * than in pixels, as HomeAbout's are — at 630 they land exactly where the
 * reference puts them (top frames 300x261 at (0,0) and (330,0); the wide frame
 * 550x325 at (80,291); the badge 160x160 centred on (80.5, 453.5)) and below
 * that the composition scales as one piece instead of needing a second layout.
 *
 * Three departures from the reference:
 *
 *  - The badge inverts. On this brown panel the ring is white with brown type,
 *    the opposite of HomeAbout's — which is why YearsBadge takes its colours
 *    from the caller's className and draws its ring in fill-current.
 *  - The two icon features are <p>, not the reference's <h3>. They are
 *    four-word claims with nothing under them; as headings they would put two
 *    stray h3s in the page's outline under an h2 that does not own them. Same
 *    call HomeAbout documents for its contact-card label — and the opposite of
 *    AboutApproach's Mission/Vision, which do have body copy and stay <h3>.
 *  - The CTA points at #appointment, an in-page target that exists, rather than
 *    the reference's /contact-us/ — the one KNOWN_DANGLING 404 in
 *    scripts/verify-links.ts. See the note on aboutJourney.cta.
 */

/* The panel is dark, so the accent ring the light bands use would disappear. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export function AboutJourney() {
  return (
    <section aria-labelledby="about-journey-heading" className="px-[20px]">
      <div className="mx-auto max-w-[1400px] rounded-30 bg-primary px-[24px] py-[60px] lg:px-[60px] lg:py-[110px]">
        <div className="flex flex-col gap-[50px] lg:flex-row lg:items-center lg:gap-[4.688%]">
          {/* Media column — 630 of the 1280 content box. */}
          <div className="relative mx-auto aspect-[630/615] w-full max-w-[630px] shrink-0 lg:mx-0 lg:w-[49.219%]">
            {/* Upper-left frame, 300x261. */}
            <Photo
              src={assets.aboutJourneyImage1}
              alt={assets.aboutJourneyImage1Alt}
              width={1402}
              height={1122}
              className="absolute left-0 top-0 h-[42.439%] w-[47.619%] rounded-30"
            />

            {/* Upper-right frame, 300x261, 30px to its right. */}
            <Photo
              src={assets.aboutJourneyImage2}
              alt={assets.aboutJourneyImage2Alt}
              width={1402}
              height={1122}
              className="absolute left-[52.381%] top-0 h-[42.439%] w-[47.619%] rounded-30"
            />

            {/*
              The wide lower frame, 550x325, inset 80 from the column's left
              edge. about-experience.jpg is the one photograph in
              public/images/decor/ that nothing else on this page renders, and
              its 604x360 is a near-exact fit for this frame.
            */}
            <Photo
              src={assets.aboutExperienceImage}
              alt={assets.aboutExperienceImageAlt}
              width={604}
              height={360}
              className="absolute left-[12.698%] top-[47.317%] h-[52.846%] w-[87.302%] rounded-30"
            />

            {/*
              The badge's centre sits exactly on the wide frame's left edge and
              exactly on its mid-height, which is why left-0 and top-[60.732%]
              land it there. White ring, brown type — see the departure above.
            */}
            <YearsBadge
              label={aboutJourney.badge}
              className="absolute left-0 top-[60.732%] z-20 flex aspect-square w-[25.397%] items-center justify-center rounded-full bg-white text-primary"
            />
          </div>

          {/* Text column — 590 of the content box. */}
          <div className="w-full min-w-0 lg:w-[46.094%] lg:shrink-0">
            <Eyebrow className="text-accent">{aboutJourney.eyebrow}</Eyebrow>

            {/* Measured glyph bands: eyebrow 175-198, heading 218-265 and 276-312. */}
            <h2
              id="about-journey-heading"
              className="mt-[8px] font-display text-[32px] leading-[40px] text-white md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            >
              <RevealWords text={aboutJourney.heading} />
            </h2>

            {/* 2x2. The reference's column pitch is 305 on a 590 column: 285 + 20. */}
            <ul className="mt-[42px] grid gap-x-[20px] gap-y-[26px] sm:grid-cols-2">
              {aboutJourney.checklist.map(item => (
                <li key={item} className="flex items-start gap-[14px]">
                  <CheckSquareIcon className="mt-[3px] h-[17px] w-[17px] shrink-0 text-accent" />
                  <span className="font-sans text-[16px] leading-[24px] text-white">{item}</span>
                </li>
              ))}
            </ul>

            {/* Measured at y=472, running the full width of the column. */}
            <div aria-hidden className="mt-[40px] h-px bg-divider-dark" />

            <ul className="mt-[41px] grid gap-[20px] sm:grid-cols-2">
              {aboutJourney.features.map((feature, index) => (
                <li key={feature} className="flex items-center gap-[18px]">
                  <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    {index === 0 ? (
                      <LayersIcon className="h-[30px] w-[30px]" />
                    ) : (
                      <VennIcon className="h-[30px] w-[30px]" />
                    )}
                  </span>
                  <p className="font-display text-[20px] leading-[26px] text-white">{feature}</p>
                </li>
              ))}
            </ul>

            {/*
              The same pill and detached chip every other band uses, with the
              chip inverted for the dark ground — measured white with a brown
              arrow, against the light bands' brown chip with a white one.
            */}
            <a
              href={aboutJourney.cta.path}
              className={`group/cta mt-[43px] inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}
            >
              <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
                {aboutJourney.cta.label}
              </span>
              <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-primary transition-colors group-hover/cta:bg-accent group-hover/cta:text-white">
                <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
