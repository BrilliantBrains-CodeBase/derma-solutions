import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { homeCaseStudies } from '@/config/site'
import { ArrowDiagonalIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { CardCarousel } from '@/components/CardCarousel'

/**
 * Built to theme-reference/04-sections/18-our-remarkable-transformation/ — the
 * band the copy doc numbers 06.
 *
 * At lg it is a static two-column band, not a carousel. The only JS the
 * reference binds to `glowix-casestudy-grid` is an Isotope initialiser
 * (theme-reference/05-animations/function.js:727) and it short-circuits on the
 * homepage, because the widget's data-config carries `show_filter_bar: ""`
 * rather than "yes". Nothing runs; this is a plain CSS grid there too. Below lg
 * the four cards swipe instead of stacking — see CardCarousel — which is a
 * departure from the reference and from this file's original build, taken
 * because four stacked cards under a sticky rail made the phone page endless.
 *
 * computed.json gives the outer container only — 1300 wide, padding 100/0/70 —
 * so the split is measured off screenshot.png (1440x1030). The 1300 container
 * has 10px of padding, making the content box 1280 (x 80-1360). The left rail's
 * paragraph wraps at 480, so it is 400 wide; the grid runs 523-1360, so it is
 * 837; the 43 left over is the column gap. As percentages of 1280 that is
 * 31.25 / 3.359 / 65.391, which sum to 100 — a pixel gap would not survive the
 * rail narrowing between lg and the 1300 ceiling.
 *
 * Cards are 403x390 with 30px gutters (`awaiken-portfolio-gutter-30`,
 * `item_spacing: "30"`), and the radius sits on the wrapper — the <img>
 * computes to 0 and is clipped by the frame, as it is in the About band's
 * Photo. 20px is the theme's card radius token.
 *
 * Six departures from the reference:
 *
 *  - The whole card is one link, and all four go to /image-gallery/. The
 *    reference links each card to its own /casestudy/<slug>/ post; this rebuild
 *    has no case-study routes, and the gallery is the one page holding the
 *    clinic's transformation images. The arrow disc is decorative and not a
 *    second tab stop, as in HomeServices.
 *  - The photographs are placeholders, on the same terms as every other band's.
 *    See the TODO(assets) and blocking TODO(compliance) on homeCaseStudies in
 *    site.ts — copy doc note 2 lands squarely on this section.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText (`at-animation-heading-style-3`), as in HomeAbout, HomeWhatWeDo
 *    and HomeServices, and for the same reason. See .reveal-word in
 *    src/styles/index.css.
 *  - The paragraph, button and grid drop Elementor's stock fadeInUp (delays
 *    0/100/200ms). Nothing here introduces a second scroll-driven rule.
 *  - The cards carry no gloss sweep. computed.json records
 *    "shinyGlassElements": 0 for this section, so the hover is a scale, a
 *    deepening scrim and the disc's colour swap — .shiny-glass and the shared
 *    Photo component are deliberately not used.
 *  - `.awaiken-portfolio-grid-item__excerpt` and its "Read More" link are in the
 *    reference's DOM but clipped out of the rest state and never revealed on the
 *    homepage. They are dropped rather than reproduced hidden.
 *
 * The card title is the reference's <h4> — Marcellus 22/31/400, capitalize,
 * white — demoted to <h3>. There is no heading between it and this band's <h2>,
 * so an <h4> would skip a level in the page outline.
 */

/* The band sits on white, so the hero's white ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

function CaseStudyCard({ card }: { card: (typeof homeCaseStudies.cards)[number] }) {
  return (
    <Link
      to={homeCaseStudies.cta.href}
      className={`group relative block overflow-hidden rounded-card ${focusRing}`}
    >
      <img
        src={card.image}
        alt={card.imageAlt}
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        className="aspect-[403/390] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
      />

      {/*
        The scrim is what makes the white title legible over photographs the
        clinic has not supplied yet, so it is not decoration that can be tuned
        away later. #481E0B is --color-primary; the gradient is written out
        because Tailwind's `to-primary/78` would resolve the stop at 50%, not the
        45% the reference's falloff sits at.
      */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(72,30,11,0.78)_100%)] opacity-100 transition-opacity duration-300 group-hover:opacity-0"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(72,30,11,0.15)_30%,rgba(72,30,11,0.92)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/*
        `items-end` is what aligns the disc to the last line of a title that may
        wrap to one line or two — the reference's four titles all wrap to two,
        these do not.
      */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-[20px] p-[30px]">
        <h3 className="font-display text-[22px] leading-[31px] text-white">{card.title}</h3>

        <span
          aria-hidden
          className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors group-hover:bg-primary"
        >
          <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
        </span>
      </div>
    </Link>
  )
}

export function HomeCaseStudies() {
  return (
    <section
      aria-labelledby="home-case-studies-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:pt-[100px] lg:pb-[70px]"
    >
      <div className="flex flex-col gap-[50px] lg:flex-row lg:gap-[3.359%]">
        {/*
          The reference's `sticky-column`. `self-start` is what gives sticky a
          box shorter than the row to travel in — without it the rail stretches
          to the grid's height and never moves. 130 clears the 110px header,
          which is itself sticky.
        */}
        <div className="lg:sticky lg:top-[130px] lg:w-[31.25%] lg:self-start">
          <Eyebrow className="text-accent">{homeCaseStudies.eyebrow}</Eyebrow>

          <h2
            id="home-case-studies-heading"
            className="mt-[8px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
          >
            {homeCaseStudies.heading.split(' ').map((word, index, words) => (
              <span
                // Words can repeat within the heading, so the index is the identity.
                key={`${word}-${index}`}
                className="reveal-word"
                // Not animation-delay: a view() timeline has no clock to delay.
                // Each word is bound to a slightly later slice of the scroll.
                style={{ '--i': index } as CSSProperties}
              >
                {/*
                  The trailing space belongs to the word's own string, as it does
                  in every other band: React serialises a space-only JSX sibling
                  as &nbsp;, which would leave the rendered heading subtly
                  different from the copy doc's string.
                */}
                {index === words.length - 1 ? word : `${word} `}
              </span>
            ))}
          </h2>

          <p className="mt-[22px] font-sans text-[16px] leading-[26px] text-body">
            {homeCaseStudies.body}
          </p>

          {/* The reference's button: a pill with a detached dark arrow chip. */}
          <Link
            to={homeCaseStudies.cta.href}
            className={`group/cta mt-[40px] inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}
          >
            <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
              {homeCaseStudies.cta.label}
            </span>
            <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
              <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
            </span>
          </Link>
        </div>

        {/*
          The 65.391% moves to CardCarousel's wrapper, because the wrapper is
          now the flex child of the row above and the <ul> inside it can only be
          100% of whatever that resolves to. The rail is a sibling and is
          untouched; below lg its `sticky` is inactive anyway.
        */}
        <CardCarousel
          label={homeCaseStudies.heading}
          className="lg:w-[65.391%]"
          ulClassName="grid gap-[30px] sm:grid-cols-2"
          slidesClassName="[--slides:1] sm:[--slides:2]"
        >
          {homeCaseStudies.cards.map(card => (
            // All four cards share a destination, so the title is the identity.
            <li key={card.title}>
              <CaseStudyCard card={card} />
            </li>
          ))}
        </CardCarousel>
      </div>
    </section>
  )
}
