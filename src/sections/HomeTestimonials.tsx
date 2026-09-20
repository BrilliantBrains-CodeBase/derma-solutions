import type { CSSProperties } from 'react'
import { assets, homeTestimonials } from '@/config/site'
import { Eyebrow } from '@/components/Eyebrow'
import { CardCarousel } from '@/components/CardCarousel'

/**
 * Built from theme-reference/04-sections/08-life-changing-results-from-our-
 * clients/ — the band the copy doc numbers 09 — and then deliberately reduced.
 *
 * The reference splits this band in two: a 605x516 photograph and one featured
 * quote across the top, then a 3-up row of smaller quotes underneath. This is a
 * heading over a single carousel instead, on the client's instruction, and all
 * four quotes are now peers — Neha Sharma's is simply the first slide rather
 * than a quote with a picture beside it.
 *
 * What survives from the measurement pass is the shell, which is the Services
 * band's construction and is still pixel-fitted: the band is 1400 wide inside
 * 20px of page padding at radius 30, filled rgb(72,30,11) — --color-primary
 * exactly — with 60px of inner padding around a 1280 content box, and 110 of
 * vertical padding rather than Services' 100. The cards keep the reference's
 * own geometry too: 407 wide on 30px gutters at lg (measured off the three
 * hairlines at x 80-486 / 517-922 / 953-1359), a 50px avatar, and a hairline
 * that samples rgb(92,55,38) — which is --color-divider-dark (#FFFFFF1A) over
 * the band, so it is the token and not a one-off tint.
 *
 * Departures from the reference:
 *
 *  - No photograph, and no featured/secondary split. The client asked for the
 *    simpler band. This also retires the placeholder the previous revision
 *    carried: the reference's own 2025-04-testimonial-image.jpg is a woman posed
 *    to camera, which beside a named patient's quote reads as that patient's
 *    face, and the treatment scene standing in for it was vendor artwork due for
 *    replacement anyway. Neither is needed now.
 *  - The heading centres over the track rather than sitting in a right-hand
 *    column, which is the Services band's arrangement and the one the page
 *    already uses whenever a heading introduces a row of cards.
 *  - A carousel at every width, via CardCarousel's `alwaysCarousel`. The
 *    reference's Swiper has arrows, dots, autoplay and loop all false, so it
 *    renders as a static 3-up grid; with four quotes and three in view, a track
 *    is what actually shows the fourth. Still scroll-snap and still no
 *    dependency — see the header on CardCarousel.
 *  - The avatars are not ported. They are the theme vendor's stock headshots,
 *    and anonymous stock faces attached to named real patients invents their
 *    likenesses — the same objection HomeWhyChooseUs makes to
 *    2025-04-author-2.jpg. Each card carries an accent disc with the patient's
 *    initial instead, which keeps the 50px rhythm without asserting what anyone
 *    looks like.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, as in every other band. See .reveal-word in src/styles/index.css.
 *  - The eyebrow is a <p> and the patient names are <p>, not the reference's
 *    <h3>s. Same call as HomeWhyChooseUs' second paragraph and HomeAbout's
 *    "Need Help!": none of them opens a section, and as headings they would put
 *    stray h3s in the page outline under an h2 that does not own them.
 *  - No typographic quote marks. The reference sets them on the featured quote
 *    only, and there is no featured quote here; adding them to all four instead
 *    would be a change the reference does not make.
 *
 * Note the band's own markup has no links or buttons in it — the reference has
 * none either — so unlike every other section here there is no focusRing const
 * to declare. The carousel's dots and arrows are the one focusable thing, and
 * they carry their own white ring via CardCarousel's `tone`.
 */

/**
 * The reference's `elementskit-commentor-bio`: a 50px disc, then name over role.
 *
 * A <figcaption>, so the attribution sits beside the quotation rather than inside
 * it — the spec is explicit that attribution does not belong within <blockquote>.
 */
function Attribution({
  initial,
  name,
  role,
}: {
  initial: string
  name: string
  role: string
}) {
  return (
    <figcaption className="mt-[30px] flex items-center gap-[10px]">
      {/*
        The reference's avatar, standing in for a photograph that would have to
        be invented. It is aria-hidden because the name it abbreviates is the
        text immediately beside it — announcing "P" first would only be noise.
      */}
      <span
        aria-hidden
        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[20px] leading-[20px] text-white"
      >
        {initial}
      </span>

      {/* Name 20/24 over role 16/26 comes to 50, so the row centres on the disc. */}
      <div className="min-w-0">
        <p className="font-display text-[20px] leading-[24px] text-white">{name}</p>
        <p className="font-sans text-[16px] leading-[26px] text-white/85">{role}</p>
      </div>
    </figcaption>
  )
}

export function HomeTestimonials() {
  return (
    <section aria-labelledby="home-testimonials-heading" className="px-[20px]">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-30 bg-primary px-[24px] py-[60px] lg:px-[60px] lg:py-[110px]">
        {/*
          testimonials-bg-shape.png — the band's dot field, stretched rather than
          cropped, on the same reasoning as the Services band's line-art. The
          artwork is 1800x1041 against a band of roughly 1400x1015, so `cover`
          would scale to the height and lose the dots off both edges. It is white
          at 3.5% opacity and scattered, so the horizontal compression is
          invisible.
        */}
        <img
          src={assets.testimonialsShape}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
        />

        <div className="relative">
          {/* The Services band's heading block, on the dark ground. */}
          <div className="mx-auto max-w-[640px] text-center">
            <Eyebrow className="justify-center text-white">
              {homeTestimonials.eyebrow}
            </Eyebrow>

            <h2
              id="home-testimonials-heading"
              // text-white is not optional: @layer base in index.css colours
              // every heading --color-primary, which is this band's own fill.
              className="mt-[20px] text-balance font-display text-[32px] leading-[40px] text-white md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            >
              {homeTestimonials.heading.split(' ').map((word, index, words) => (
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
            md/lg are the reference Swiper's own 768 and 1024 breakpoints, so the
            per-view counts follow them rather than the sm HomeServices uses. No
            grid-cols here: `alwaysCarousel` lays the track out with flex at every
            width, which would leave a column count inert — but the 30px gap stays,
            because CardCarousel's slide-width calc assumes it.
          */}
          <CardCarousel
            label={homeTestimonials.heading}
            alwaysCarousel
            ulClassName="mt-[50px] flex gap-[30px] lg:mt-[60px]"
            slidesClassName="[--slides:1] md:[--slides:2] lg:[--slides:3]"
            tone="dark"
          >
            {homeTestimonials.cards.map(card => (
              // The <li> stretches to the track's height and the card fills it,
              // which is what gives `mt-auto` below a box to push against — so
              // the hairlines stay aligned across quotes of different lengths.
              <li key={card.name} className="flex">
                <figure className="flex w-full flex-col">
                  <blockquote className="font-sans text-[16px] leading-[26px] text-white/85">
                    {card.quote}
                  </blockquote>

                  <div className="mt-auto pt-[30px]">
                    <div aria-hidden className="h-px bg-divider-dark" />
                    <Attribution
                      initial={card.initial}
                      name={card.name}
                      role={card.role}
                    />
                  </div>
                </figure>
              </li>
            ))}
          </CardCarousel>
        </div>
      </div>
    </section>
  )
}
