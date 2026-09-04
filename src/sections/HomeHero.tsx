import { Link } from 'react-router-dom'
import { assets, contact, homeHero } from '@/config/site'
import { ArrowDiagonalIcon, PlayIcon, StarIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'

/**
 * Built to theme-reference/04-sections/07-discover-your-best-self-with-us/ —
 * the hero the demo calls "Home – Image". Geometry is measured off its
 * screenshot.png (1440x765) rather than estimated: the panel is 1400 wide and
 * 765 tall inside 20px page padding, content is inset 60px and centred on the
 * panel's midline, the headline is Marcellus 60/72 and the paragraph wraps at
 * ~612px.
 *
 * Three departures from the reference, all agreed:
 *
 *  - The photograph is a placeholder. See the TODO on assets.heroImage: it is
 *    the theme vendor's, reference-only, and stands in only for crop and art
 *    direction. assets.clinicPhoto cannot be used — it shows another clinic's
 *    signage on the back wall.
 *  - "Watch Video" navigates to /video-gallery/ instead of opening the
 *    reference's YouTube lightbox. There is no video ID, and this is a real route.
 *  - The headline animates per word in CSS rather than per character in GSAP
 *    SplitText — see the .hero-word rule in src/styles/index.css.
 *
 * The heading is passed in rather than read here: PageShell hands over the SEO
 * registry's H1 so this page's one H1 still cannot drift from the capture.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export function HomeHero({ heading }: { heading: string }) {
  return (
    <section className="px-[20px]">
      <div className="relative mx-auto flex min-h-[560px] max-w-[1400px] items-center overflow-hidden rounded-[20px] md:rounded-[30px] lg:h-[765px]">
        <img
          src={assets.heroImage}
          alt={assets.heroImageAlt}
          width={1920}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/*
          Two layers, fitted by sampling the reference screenshot rather than
          guessed. The tint reproduces its warm cast: a blue-grey source pixel
          (70,100,102) renders (68,55,45) there, green and blue crushed while red
          survives, which is a multiply rather than a flat wash. The gradient
          then carries the text — the reference's left 20% is flat opaque
          #2B1207 and the photograph only emerges past x≈400.

          Sampled along the panel's midline these stops land close to the
          reference. The residual is photo crop, not overlay: object-cover here
          and Elementor's background-size there frame the 1920x1280 source
          differently, so the same x is not the same part of the image.

          The mid stops sit slightly darker than the pure fit. The headline runs
          to x=750 here — further right than the reference's, because its two
          lines are longer — and at the fitted values it measured 4.42:1 against
          white. These carry it back over 5:1.

          Below lg the gradient has a much higher floor. The reference's ramp
          assumes a 1400px panel; at 390px the headline reaches into the bright
          part of the photograph and measured only 2.03:1 against white, under
          WCAG's 3:1 for large text. The mobile stops bottom out at 0.70, which
          measures ~6:1 while still showing the image.
        */}
        <div aria-hidden className="absolute inset-0 bg-primary/15 mix-blend-multiply" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,#2B1207_0%,rgba(43,18,7,0.90)_35%,rgba(43,18,7,0.70)_100%)] lg:bg-[linear-gradient(90deg,#2B1207_0%,#2B1207_20%,rgba(43,18,7,0.66)_33%,rgba(43,18,7,0.44)_52%,rgba(43,18,7,0.16)_100%)]"
        />

        {/*
          Wider than the paragraph column on purpose. At 60px the headline's
          two natural lines measure 612px and 627px, so a 672px wrapper (552px
          of text width after the 60px insets) forced it onto three lines. The
          paragraph keeps the reference's 612px measure below.
        */}
        <div className="relative w-full max-w-[790px] px-[30px] py-[60px] lg:px-[60px] lg:py-0">
          <Eyebrow className="text-white">{homeHero.eyebrow}</Eyebrow>

          <h1 className="mt-[20px] font-display text-[36px] leading-[44px] text-white uppercase [perspective:400px] md:text-[48px] md:leading-[58px] lg:text-[60px] lg:leading-[72px]">
            {heading.split(' ').map((word, index, words) => (
              <span
                // Words repeat within the headline, so the index is the identity.
                key={`${word}-${index}`}
                className="hero-word"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/*
                  The separator is part of the word's own string rather than a
                  space-only JSX sibling: React serialises such a child as
                  &nbsp;, which leaves the rendered H1 subtly different from the
                  registry string it exists to reproduce.
                */}
                {index === words.length - 1 ? word : `${word} `}
              </span>
            ))}
          </h1>

          <p className="mt-[28px] max-w-[612px] font-sans text-[16px] leading-[26px] text-white">
            {homeHero.body}
          </p>

          <div className="mt-[40px] flex flex-wrap items-center gap-x-[40px] gap-y-[20px]">
            {/*
              The reference's `btn-highlighted`: the pill and its arrow circle
              touch, measured x 80->224->274. One link, so the whole unit is a
              single target.
            */}
            <Link
              to={contact.ctaHref}
              className={`group/cta inline-flex shrink-0 items-center rounded-pill ${focusRing}`}
            >
              <span className="flex h-[50px] items-center rounded-pill bg-accent px-[28px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
                {homeHero.primaryLabel}
              </span>
              <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-primary transition-colors group-hover/cta:bg-accent group-hover/cta:text-white">
                <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
              </span>
            </Link>

            <Link
              to={homeHero.secondary.path}
              className={`group/video inline-flex items-center gap-[14px] rounded-pill font-sans text-[16px] leading-[16px] font-semibold text-white ${focusRing}`}
            >
              {homeHero.secondary.label}
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-primary transition-colors group-hover/video:bg-accent group-hover/video:text-white">
                <PlayIcon className="h-[14px] w-[14px]" />
              </span>
            </Link>
          </div>

          {/*
            The copy doc's rating strip. It asks for a Google rating and then
            forbids hardcoding one (compliance note 5), so this renders the
            doc's own fallback wording and no number.
          */}
          <p className="mt-[28px] flex items-center gap-[10px] font-sans text-[14px] leading-[24px] text-white/85">
            <span aria-hidden className="flex gap-[2px] text-accent">
              {[0, 1, 2, 3, 4].map(star => (
                <StarIcon key={star} className="h-[14px] w-[14px]" />
              ))}
            </span>
            {homeHero.ratingNote}
          </p>
        </div>
      </div>
    </section>
  )
}
