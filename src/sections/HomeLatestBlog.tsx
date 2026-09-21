import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { homeLatestBlog, homeVideo } from '@/config/site'
import { ArrowDiagonalIcon } from '@/components/icons'
import { BlogCard } from '@/components/BlogCard'
import { Eyebrow } from '@/components/Eyebrow'
import { CardCarousel } from '@/components/CardCarousel'
import { VideoFacade } from '@/components/VideoFacade'
import { homeVideosPosterPath, homeVideosPosterSlot } from '@/content/homeVideos'
import { homeVideos } from '@/content/homeVideos.generated'

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
 *  - A second rail, "Latest Videos", sits under the blog cards' own CTA — the
 *    fix for the body paragraph's long-standing "guides and videos" promising
 *    more than three written posts. Its three videos are the channel's newest
 *    (src/content/homeVideos.generated.ts), refreshed by
 *    `npm run content:videos`; see scripts/fetch-latest-videos.ts for why that
 *    is a build-time fetch rather than one running in the browser.
 *
 * The card title is the reference's <h2> demoted to <h3>. Three more h2s under
 * this band's own h2 is a broken outline for no gain — the same call
 * HomeCaseStudies made for its <h4>. The video rail's own "Latest Videos"
 * heading is a fourth h3 for the same reason, and each video's title is
 * therefore an h4 beneath it, as VideoGallery.tsx's grid titles are beneath
 * that page's own h2.
 */

/*
 * The card itself is src/components/BlogCard.tsx, shared with the blog.
 *
 * The band is on white, so the hero's white focus ring would be invisible here.
 */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

export function HomeLatestBlog() {
  /*
    One video plays at a time, the same reason VideoGallery.tsx's grid gives:
    the facade autoplays with sound, so a second click with no visible stop on
    the first would leave two soundtracks running. null keeps every tile a
    static poster in the prerendered HTML.
  */
  const [openVideoId, setOpenVideoId] = useState<string | null>(null)

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

        {/*
          New in the 2026-09 round, which retitled the band to "Insights &
          Resources". The reference has no paragraph here and neither did this
          band; 700 rather than the heading's own width keeps it to the two
          lines the centred block wants.
        */}
        <p className="mx-auto mt-[20px] max-w-[700px] font-sans text-[16px] leading-[26px] text-body">
          {homeLatestBlog.body}
        </p>
      </div>

      {/* Swipeable below lg, the measured 3-up grid from lg. See CardCarousel. */}
      <CardCarousel
        label={homeLatestBlog.heading}
        ulClassName="mt-[50px] grid gap-[30px] sm:grid-cols-2 lg:mt-[60px] lg:grid-cols-3"
        slidesClassName="[--slides:1] sm:[--slides:2]"
      >
        {homeLatestBlog.cards.map(card => (
          <li key={card.path}>
            <BlogCard path={card.path} title={card.title} image={card.image} imageAlt={card.imageAlt} />
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

      {/*
        The video rail. Guarded on length rather than assumed non-empty: a
        first run with no network yet (see scripts/fetch-latest-videos.ts)
        writes no generated file, and the band should still render its blog
        half rather than crash.
      */}
      {homeVideos.length > 0 && (
        <div className="mt-[80px] lg:mt-[100px]">
          <h3 className="text-center font-display text-[28px] leading-[36px] text-primary md:text-[32px] md:leading-[40px]">
            {homeLatestBlog.videosHeading}
          </h3>

          {/* Same swipeable-below-lg, 3-up-from-lg track as the blog cards above. */}
          <CardCarousel
            label={homeLatestBlog.videosHeading}
            ulClassName="mt-[40px] grid gap-[30px] sm:grid-cols-2 lg:mt-[50px] lg:grid-cols-3"
            slidesClassName="[--slides:1] sm:[--slides:2]"
          >
            {homeVideos.map(video => (
              <li key={video.id}>
                <VideoFacade
                  youtubeId={video.id}
                  title={video.title}
                  poster={homeVideosPosterPath(video.id)}
                  // The title renders as a heading right below the tile, so
                  // describing the poster again here would just repeat it to a
                  // screen reader — the same call VideoGallery.tsx's grid makes.
                  posterAlt=""
                  posterWidth={homeVideosPosterSlot.width}
                  posterHeight={homeVideosPosterSlot.height}
                  playLabel={homeVideo.playLabel}
                  // 64px is the same proportion VideoGallery.tsx's grid strikes
                  // on a same-sized tile.
                  ringClass="h-[64px] w-[64px] text-[13px] leading-[13px]"
                  playing={openVideoId === video.id}
                  onPlayingChange={playing => setOpenVideoId(playing ? video.id : null)}
                  className="aspect-video w-full rounded-card"
                />

                <h4 className="mt-[18px] font-display text-[18px] leading-[26px] text-primary md:text-[20px] md:leading-[28px]">
                  {video.title}
                </h4>
              </li>
            ))}
          </CardCarousel>

          <div className="mt-[40px] flex justify-center lg:mt-[50px]">
            <Link
              to={homeLatestBlog.videosCta.href}
              className={`group/cta inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}
            >
              <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
                {homeLatestBlog.videosCta.label}
              </span>
              <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
                <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
              </span>
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
