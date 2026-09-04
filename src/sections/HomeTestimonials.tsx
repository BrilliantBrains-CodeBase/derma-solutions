import type { CSSProperties } from 'react'
import { assets, homeTestimonials } from '@/config/site'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'

/**
 * Built to theme-reference/04-sections/08-life-changing-results-from-our-clients/
 * — the band the copy doc numbers 09.
 *
 * That directory's computed.json holds only the outer container, which reports
 * itself transparent at radius 0, so every measurement here is read off its
 * screenshot.png (1440x1015) the way HomeAbout, HomeWhatWeDo and HomeWhyChooseUs
 * were built. The band itself is painted on a node the capture never recorded:
 * sampling it returns rgb(72,30,11), which is --color-primary exactly, out to
 * x 20-1420, and the left inset runs 33 at y=5, 22 at y=20 and 20 at y=60 —
 * r=30 predicts 32.7, 21.5 and 20.0, so the radius is the same 30 the Services
 * and Video bands use.
 *
 * So the shell is the Services band's construction: 1400 wide inside 20px of
 * page padding, 60px of inner padding, a 1280 content box at x 80-1360. Vertical
 * padding is 110 rather than Services' 100.
 *
 * The upper row splits 605 / 45 / 630 across that content box, centred on
 * y 368 — which is why the columns are percentages and not pixels, the overflow
 * HomeAbout's comment records. The photograph is at its natural 605x516. The
 * card grid below is the Services grid to the pixel: the three hairlines measure
 * x 80-486 / 517-922 / 953-1359, so 407 wide on 30px gutters.
 *
 * Two things worth knowing about the numbers:
 *
 *  - Both hairlines measure rgb(92,55,38), which is exactly --color-divider-dark
 *    (#FFFFFF1A) composited over the band. It is the token, not a one-off tint.
 *  - The featured hairline spans the text column's full 630, not the paragraph
 *    above it, so it is a sibling of the paragraph rather than a border on it.
 *
 * Seven departures from the reference:
 *
 *  - The featured photograph is a treatment scene, not the reference's
 *    2025-04-testimonial-image.jpg. That file is a woman posed to camera and the
 *    band sets it directly beside a named patient's quote, where it reads as
 *    that patient's face. See the TODO on assets.testimonialImage.
 *  - The four avatars are not ported. They are the theme vendor's stock
 *    headshots, and four anonymous stock faces attached to four named real
 *    patients invents four likenesses — the same objection HomeWhyChooseUs makes
 *    to 2025-04-author-2.jpg, one step larger. Each card carries an accent disc
 *    with the patient's initial instead, which keeps the 50px rhythm the row is
 *    built on without asserting what anyone looks like.
 *  - No carousel. The reference's Swiper runs arrows, dots, autoplay and loop all
 *    false at slidesPerView 3, so it renders as a static 3-up grid with a fourth
 *    slide parked off-screen. The copy doc supplies three quotes, which fill that
 *    grid exactly. Nothing is lost and no dependency is added.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, and the photograph wipes in on a scroll-driven timeline rather
 *    than under ScrollTrigger — as in every other band, and for the same reason.
 *    See .reveal-word and .reveal-wipe in src/styles/index.css.
 *  - The eyebrow is a <p> and both patient names are <p>, not the reference's
 *    three <h3>s. Same call as HomeWhyChooseUs' second paragraph and HomeAbout's
 *    "Need Help!": none of the three opens a section, and as headings they would
 *    put stray h3s in the page outline under an h2 that does not own them.
 *  - Typographic quote marks are rendered on the featured quote only, as the
 *    reference renders them, although the copy doc quotes all four.
 *  - The card gap stays 30px below md. The reference's spaceBetween drops to 10
 *    at 320, but that is horizontal slide spacing in a 1-up carousel, where it is
 *    never seen; as a vertical gap between stacked cards 10px is too tight.
 *
 * Note this is the one band on the page with no links or buttons in it — the
 * reference has none either — so unlike every other section here there is no
 * focusRing const to declare.
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
          {/* Upper row: the photograph, then the heading and featured quote. */}
          <div className="flex flex-col gap-[50px] lg:flex-row lg:items-center lg:gap-[3.516%]">
            <Photo
              src={assets.testimonialImage}
              alt={assets.testimonialImageAlt}
              width={605}
              height={516}
              className="aspect-[605/516] w-full max-w-[605px] shrink-0 lg:w-[47.266%]"
            />

            <div className="w-full min-w-0 lg:w-[49.219%] lg:shrink-0">
              <Eyebrow className="text-white">{homeTestimonials.eyebrow}</Eyebrow>

              <h2
                id="home-testimonials-heading"
                // text-white is not optional: @layer base in index.css colours
                // every heading --color-primary, which is this band's own fill.
                className="mt-[20px] font-display text-[32px] leading-[40px] text-white md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
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

              <blockquote className="mt-[26px] font-sans text-[16px] leading-[26px] text-white/85">
                {/* Curly marks are the reference's, and are part of the run of text. */}
                {`“${homeTestimonials.featured.quote}”`}
              </blockquote>

              {/* Decoration inside a section, so a div and not an <hr>. */}
              <div aria-hidden className="mt-[40px] h-px bg-divider-dark" />

              <p className="mt-[40px] font-display text-[20px] leading-[29px] text-white lg:text-[22px] lg:leading-[31px]">
                {homeTestimonials.featured.name}
              </p>
              <p className="font-sans text-[16px] leading-[26px] text-white/85">
                {homeTestimonials.featured.role}
              </p>
            </div>
          </div>

          {/* md/lg are the reference Swiper's own 768 and 1024 breakpoints. */}
          <ul className="mt-[60px] grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {homeTestimonials.cards.map(card => (
              // The <li> is the grid cell and stretches to the row's height; the
              // card fills it, which is what gives `mt-auto` below a box to push
              // against.
              <li key={card.name} className="flex">
                <figure className="flex w-full flex-col">
                  <blockquote className="font-sans text-[16px] leading-[26px] text-white/85">
                    {card.quote}
                  </blockquote>

                  {/*
                    `mt-auto` is what the reference gets for free from four
                    identical quote strings: these three are different lengths,
                    and without it the hairlines would sit at three different
                    heights across the row.
                  */}
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
          </ul>
        </div>
      </div>
    </section>
  )
}
