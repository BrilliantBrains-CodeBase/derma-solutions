import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { homeLatestBlog } from '@/config/site'
import { ArrowDiagonalIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { CardCarousel } from '@/components/CardCarousel'

/**
 * Built to theme-reference/04-sections/19-our-latest-insights-on-plastic-
 * surgery-skinc/ — the band the copy doc numbers 12, and the last content band
 * the demo runs before its footer.
 *
 * computed.json gives the outer container only — transparent ground (the
 * neighbouring bands sample #FFFFFF), a 1300 container with 10px of padding,
 * 100px top and bottom, and a 60px row gap between the heading block and the
 * cards. Everything else is measured off screenshot.png (1440x925, 1:1 with the
 * recorded 924px height):
 *
 *  - Content box x 80-1360, i.e. 1280 inside the 1300 container. The same box
 *    the rest of the homepage sits in.
 *  - Three columns at x 80-486 / 517-922 / 953-1359 — 407 wide with 30px
 *    gutters, which is `ekit-col-4` plus the widget's own spacing.
 *  - The heading block is centred and its h2 wraps near its midpoint, so it is
 *    capped at 640 as HomeServices' is.
 *  - Thumbnail 407x393, radius fitting the theme's 20px card token. 32px from
 *    its bottom edge to the title's top.
 *  - The title is Marcellus 22/31/400 in --color-primary, with the 48x48 accent
 *    disc right-aligned and centred on the title block. Its arrow is the exact
 *    15x15 path already exported as ArrowDiagonalIcon.
 *
 * There is no date, no category and no excerpt in the reference's card, and
 * none are invented here. computed.json also records "shinyGlassElements": 0,
 * so the shared Photo component and .shiny-glass are deliberately not used —
 * the same call HomeCaseStudies made.
 *
 * Six departures from the reference:
 *
 *  - The whole card is one link. The reference makes the thumbnail, the title
 *    and the arrow three separate <a>s to the same URL, which is three tab
 *    stops and three screen-reader announcements for one destination. The disc
 *    is decorative here and not a second stop, as in HomeServices.
 *  - The thumbnail is 1200x627, not the reference's near-square 407x393. Unlike
 *    every other band, these photographs are the clinic's own — see the note on
 *    homeLatestBlog in site.ts — and they are 1.91:1 banners with their titles
 *    set into the artwork. The reference's crop would show about half the width
 *    and cut that text mid-word, so the frame follows the artwork instead. The
 *    band therefore renders shorter than the reference's 924px.
 *  - The title row is flush with the thumbnail's edges. The reference insets it
 *    ~12px with `.elementskit-post-body` padding while leaving the image flush,
 *    which puts the title out of line with every other column on the page.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText (`at-animation-heading-style-3`), as in every other band. See
 *    .reveal-word in src/styles/index.css. The card row drops Elementor's stock
 *    fadeInUp; nothing here adds a second scroll-driven rule.
 *  - A "View All Articles" button is added under the grid. Neither the doc's
 *    section 12 nor the reference has one, and without it this band — the
 *    homepage's only route into the blog — dead-ends at three posts.
 *  - The card titles are the copy doc's shortened forms, not the posts' own
 *    H1s. See the note on homeLatestBlog in site.ts.
 *
 * The card title is the reference's <h2> demoted to <h3>. Three more h2s under
 * this band's own h2 is a broken outline for no gain — the same call
 * HomeCaseStudies made for its <h4>.
 */

/* The band is on white, so the hero's white focus ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

function BlogCard({ card }: { card: (typeof homeLatestBlog.cards)[number] }) {
  return (
    <Link to={card.path} className={`group block ${focusRing}`}>
      {/*
        The radius lives on the wrapper, as it does everywhere else in this
        rebuild — the reference's <img> computes to radius 0 and is clipped by
        the frame around it.
      */}
      <div className="overflow-hidden rounded-card">
        <img
          src={card.image}
          alt={card.imageAlt}
          width={1200}
          height={627}
          loading="lazy"
          decoding="async"
          className="aspect-[1200/627] w-full object-cover"
        />
      </div>

      {/*
        `items-center` is what keeps the disc on the title's optical centre
        whether it wraps to one line or two — the reference's three titles all
        wrap to two, these do not agree with each other.
      */}
      <div className="mt-[32px] flex items-center justify-between gap-[20px]">
        <h3 className="font-display text-[22px] leading-[31px] text-primary transition-colors group-hover:text-accent">
          {card.title}
        </h3>

        {/*
          The reference's `elementskit-btn` — a 48px accent disc holding the same
          15px solid arrow the Services and Case Studies cards use. It is inside
          the link, so it is not focusable and carries no label of its own.
        */}
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

export function HomeLatestBlog() {
  return (
    <section
      aria-labelledby="home-latest-blog-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[640px] text-center">
        <Eyebrow className="justify-center text-accent">{homeLatestBlog.eyebrow}</Eyebrow>

        <h2
          id="home-latest-blog-heading"
          // text-balance evens the two lines. Without it the 640px cap leaves
          // "aesthetics" alone on the second line; the reference's own heading
          // splits near its midpoint.
          className="mt-[20px] text-balance font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
        >
          {homeLatestBlog.heading.split(' ').map((word, index, words) => (
            <span
              // Words can repeat within the heading, so the index is the identity.
              key={`${word}-${index}`}
              className="reveal-word"
              // Not animation-delay: a view() timeline has no clock to delay.
              // Each word is bound to a slightly later slice of the scroll.
              style={{ '--i': index, display: 'inline-block', whiteSpace: 'pre' } as CSSProperties}
            >
              {/*
                The trailing space belongs to the word's own string, as it does
                in every other band: React serialises a space-only JSX sibling as
                &nbsp;, which would leave the rendered heading subtly different
                from the copy doc's string.
              */}
              {index === words.length - 1 ? word : `${word} `}
            </span>
          ))}
        </h2>
      </div>

      {/* Swipeable below lg, the measured 3-up grid from lg. See CardCarousel. */}
      <CardCarousel
        label={homeLatestBlog.heading}
        ulClassName="mt-[50px] grid gap-[30px] sm:grid-cols-2 lg:mt-[60px] lg:grid-cols-3"
        slidesClassName="[--slides:1] sm:[--slides:2]"
      >
        {homeLatestBlog.cards.map(card => (
          <li key={card.path}>
            <BlogCard card={card} />
          </li>
        ))}
      </CardCarousel>

      {/* The reference's button: a pill with a detached dark arrow chip. */}
      <div className="mt-[50px] flex justify-center lg:mt-[60px]">
        <Link
          to={homeLatestBlog.cta.href}
          className={`group/cta inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}
        >
          <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
            {homeLatestBlog.cta.label}
          </span>
          <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
            <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
          </span>
        </Link>
      </div>
    </section>
  )
}
