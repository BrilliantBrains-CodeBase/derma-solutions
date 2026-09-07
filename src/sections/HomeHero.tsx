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
 *  - The reference's still photograph is a silent looping video of the clinic's
 *    own: Dr Sandeep examining a patient, 10s at 1440x800, webm then mp4. It
 *    sits under the same two overlay layers as the photograph did, and the
 *    <img> beside it is not a fallback for a browser that cannot play video —
 *    every browser can — but the still served to anyone who has asked for
 *    reduced motion. Both are in the markup and CSS picks; see the
 *    prefers-reduced-motion rule in src/styles/index.css. A JS swap would have
 *    to run after hydration and would flash, because this page is prerendered.
 *
 *    assets.heroImage is the video's own first frame, so it is the poster, the
 *    reduced-motion still and the LCP candidate at once, and the handover from
 *    poster to first painted frame is invisible.
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
        {/*
          aria-hidden and empty alt on both: the hero is a backdrop behind the
          H1 and says nothing the copy does not. A <video> cannot carry alt text
          in any case, so describing only the still would have left visitors on
          reduced motion hearing something nobody else does. Hence no
          assets.heroImageAlt — see the note on assets.heroImage.

          preload="none" keeps the clip off the critical path — the poster is
          already the LCP paint, and the hero must not compete with it for
          bandwidth. Autoplay starts the fetch itself once the page is up.
        */}
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={assets.heroImage}
          className="hero-motion absolute inset-0 h-full w-full object-cover"
        >
          <source src={assets.heroVideoWebm} type="video/webm" />
          <source src={assets.heroVideoMp4} type="video/mp4" />
        </video>

        <img
          src={assets.heroImage}
          alt=""
          aria-hidden
          width={1920}
          height={1068}
          fetchPriority="high"
          className="hero-still absolute inset-0 h-full w-full object-cover"
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
          and Elementor's background-size there frame the source differently, so
          the same x is not the same part of the image.

          The mid stops sit slightly darker than the pure fit, because the
          headline runs to x=750 here — further right than the reference's, its
          two lines being longer — and at the fitted values it measured 4.42:1.

          Re-measured against the footage that replaced the photograph, by
          hiding the text and sampling the brightest background pixel in each
          text box at t = 0, 2.5, 5, 7.5 and 9.8s. Worst frame of the five:
          headline 4.63:1 against the 3:1 large text needs, paragraph 4.82:1
          against 4.5:1, eyebrow and rating strip both near 10:1. The clip is a
          slow push-in on one lit scene, so the spread across it is under 0.1.

          The paragraph is the one with little room — 4.82 against 4.5. Re-run
          that measurement if the footage is ever recut; a brighter grade would
          take it under before anything else on the panel.

          Below lg the gradient has a much higher floor. The reference's ramp
          assumes a 1400px panel; at 390px the headline reaches into the bright
          part of the image and measured only 2.03:1 against white, under WCAG's
          3:1 for large text. The mobile stops bottom out at 0.70, which measures
          ~6:1 while still showing what is behind them.
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
