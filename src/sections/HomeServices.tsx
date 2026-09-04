import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { assets, homeServices } from '@/config/site'
import { ArrowDiagonalIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'

/**
 * Built to theme-reference/04-sections/16-explore-our-wide-range-of-aesthetic-
 * treatmen/ — the six-card Services grid the demo runs under the About band.
 * Geometry is measured off its screenshot.png (1440x1490) rather than
 * estimated: the cream band is 1400 wide inside 20px page padding, its content
 * box is 1280 (so 60px of inner padding), and the three columns land at x
 * 80-486 / 517-922 / 953-1359 — 407 wide with 30px gutters, rows at y 341-798
 * and 832-1288 for the same 30px again.
 *
 * Card internals are measured the same way. Padding is 40 on all four sides
 * (photo at x 120-446 in a card at 80-487; arrow top at y 380 under a card top
 * of 341; photo bottom 759 above a card bottom of 798). The photo is 327x218,
 * exactly 3:2. Both corner radii were fitted rather than read off, because the
 * capture has no stylesheet: the card matches r=24 (predicted inset 8.1px at
 * 6px down the corner against 9 measured, 3.2 against 4 at 12px) and the photo
 * r=30 (7.6 against 7 at 10px, 1.7 against 1 at 20px). 24 and 30 are both in
 * the homepage's captured radius set, so neither is a coincidence.
 *
 * Four departures from the reference:
 *
 *  - The whole card is one link. The reference makes only the 48px arrow
 *    clickable and leaves the title, body and photo inert, which is a real
 *    target-size and discoverability problem for the page's main route into
 *    the treatment pages. The arrow is decorative here and not a second stop.
 *  - The photographs are placeholders, on the same terms as the hero's and the
 *    About band's. See the TODO on homeServices.cards in site.ts.
 *  - The bottom strip drops the reference's accent "Free" pill and reads "Book
 *    a Consultation". Copy doc compliance note 4 — see the TODO in site.ts.
 *  - The reference fades all six cards up under GSAP ScrollTrigger. Only the
 *    heading animates here, per word, reusing .reveal-word from the About band
 *    rather than introducing a second scroll-driven rule for the grid.
 *
 * Note the reference's DOM order is photo -> title -> body -> arrow and its CSS
 * reorders that to the render above. This is authored in visual order; there is
 * nothing to gain from reproducing Elementor's shuffle.
 */

/* The band is cream, so the hero's white ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

function ServiceCard({ card }: { card: (typeof homeServices.cards)[number] }) {
  return (
    <Link
      to={card.path}
      className={`group flex w-full flex-col rounded-24 bg-white p-[30px] lg:p-[40px] ${focusRing}`}
    >
      <div className="flex items-start justify-between gap-[20px]">
        <h3 className="font-display text-[22px] leading-[31px] text-primary">{card.title}</h3>

        {/*
          The reference's `.elementskit-btn` — a 48px accent disc holding the
          same 15px solid arrow the hero's CTA uses. It is inside the link, so
          it is not focusable and carries no label of its own.
        */}
        <span
          aria-hidden
          className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors group-hover:bg-primary"
        >
          <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
        </span>
      </div>

      <p className="mt-[20px] font-sans text-[16px] leading-[26px] text-body">{card.body}</p>

      {/*
        `mt-auto` is what the reference gets from ElementsKit's
        `ekit-equal-height-enable`: every title in the demo happens to wrap to
        two lines, these do not, and without it the photographs would sit at
        six different heights across the row.

        The radius lives on the wrapper, as it does in the About band's Photo —
        the <img> computes to radius 0 in the capture and is clipped by the
        frame around it.
      */}
      <div className="mt-auto pt-[30px]">
        <div className="overflow-hidden rounded-30">
          <img
            src={card.image}
            alt={card.imageAlt}
            width={327}
            height={218}
            loading="lazy"
            decoding="async"
            className="aspect-[327/218] w-full object-cover"
          />
        </div>
      </div>
    </Link>
  )
}

export function HomeServices() {
  return (
    <section aria-labelledby="home-services-heading" className="px-[20px]">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-30 bg-secondary px-[24px] py-[60px] lg:px-[60px] lg:py-[100px]">
        {/*
          service-bg-shape.svg — the band's line-art, stretched rather than
          cropped. The artwork is 1800x1511 against a 1400x1489 band, so `cover`
          would scale to the height and lose 195px off each side. The reference
          keeps its motifs against both edges at once — leaves in the top-left
          corner, the dot grid in the top-right, the squiggle down the right —
          which only holds if the full 1800 is squeezed into the 1400. It is
          decorative line-art, so the 22% horizontal compression is invisible.
        */}
        <img
          src={assets.serviceShape}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
        />

        <div className="relative">
          <div className="mx-auto max-w-[640px] text-center">
            <Eyebrow className="justify-center text-accent">{homeServices.eyebrow}</Eyebrow>

            <h2
              id="home-services-heading"
              // text-balance evens the two lines. Without it the 640px cap
              // breaks this heading after "skin", leaving a stub second line;
              // the reference's own heading splits near its midpoint.
              className="mt-[20px] text-balance font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            >
              {homeServices.heading.split(' ').map((word, index, words) => (
                <span
                  // Words can repeat within the heading, so the index is the identity.
                  key={`${word}-${index}`}
                  className="reveal-word"
                  // Not animation-delay: a view() timeline has no clock to delay.
                  // Each word is bound to a slightly later slice of the scroll.
                  style={{ '--i': index, display: 'inline-block', whiteSpace: 'pre' } as CSSProperties}
                >
                  {/*
                    The trailing space belongs to the word's own string, as it
                    does in the hero and the About band: React serialises a
                    space-only JSX sibling as &nbsp;, which would leave the
                    rendered heading subtly different from the copy doc's string.
                  */}
                  {index === words.length - 1 ? word : `${word} `}
                </span>
              ))}
            </h2>
          </div>

          <ul className="mt-[50px] grid gap-[30px] sm:grid-cols-2 lg:mt-[80px] lg:grid-cols-3">
            {homeServices.cards.map(card => (
              // The <li> is the grid cell and stretches to the row's height;
              // the card fills it, which is what gives `mt-auto` on the photo a
              // box to push against.
              <li key={card.path} className="flex">
                <ServiceCard card={card} />
              </li>
            ))}
          </ul>

          <p className="mt-[50px] text-center font-sans text-[16px] leading-[26px] text-body lg:mt-[60px]">
            {homeServices.cta.text}{' '}
            <Link
              to={homeServices.cta.href}
              className={`rounded-[4px] font-bold text-primary underline underline-offset-4 transition-colors hover:text-accent ${focusRing}`}
            >
              {homeServices.cta.label}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
