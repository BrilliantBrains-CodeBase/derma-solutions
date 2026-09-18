import { Link } from 'react-router-dom'
import { ArrowDiagonalIcon } from '@/components/icons'

/**
 * The theme's blog card (`.post-item`), shared by the homepage's Latest Blog
 * band, the blog index, the category archive and a post's related articles.
 *
 * Anatomy, measured off theme-reference/04-sections/19-our-latest-insights-on-
 * plastic-surgery-skinc/screenshot.png and 07-screenshots/desktop/blog.png: a
 * `rounded-card` thumbnail, 32px, then the title in Marcellus 22/31 in
 * --color-primary with a 48px accent disc holding the 15px solid arrow,
 * right-aligned and centred on the title block.
 *
 * Departures from the reference, which HomeLatestBlog.tsx explains in full:
 *
 *  - The whole card is one link. The reference makes the thumbnail, the title
 *    and the arrow three separate <a>s to the same URL.
 *  - The thumbnail is 1200x627, not the reference's near-square crop — these are
 *    the clinic's 1.91:1 banners with titles set into the artwork.
 *  - The title row is flush with the thumbnail's edges.
 *  - `date` adds a line the reference's card does not have. The blog index
 *    passes it, since a date is how a reader scans 37 posts; the homepage band
 *    keeps the reference's dateless card.
 *
 * The title's heading level is the caller's: an <h2> directly under a page's
 * H1 (the index), an <h3> under a band's own <h2>.
 */

/* Cards sit on white, so the hero's white focus ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })

/** "15 July 2026", fixed to the clinic's timezone so the prerender and the hydrated page agree. */
export const formatPostDate = (iso: string) => dateFormat.format(new Date(iso))

export function BlogCard({
  path,
  title,
  image,
  imageSmall,
  imageAlt,
  date,
  headingLevel: Heading = 'h3',
  eager = false,
}: {
  path: string
  title: string
  image: string
  /** A 640-wide rendition, offered through srcset where the page has one. */
  imageSmall?: string
  imageAlt: string
  /** ISO 8601. Omit for the reference's dateless card. */
  date?: string
  headingLevel?: 'h2' | 'h3'
  /** The first row of a page's grid is in the first viewport; everything else waits. */
  eager?: boolean
}) {
  return (
    <Link to={path} className={`group block ${focusRing}`}>
      {/*
        The radius lives on the wrapper, as it does everywhere else in this
        rebuild — the reference's <img> computes to radius 0 and is clipped by
        the frame around it.
      */}
      <div className="overflow-hidden rounded-card">
        <img
          src={image}
          srcSet={imageSmall ? `${imageSmall} 640w, ${image} 1200w` : undefined}
          // One column below sm, two to lg, three from lg inside the 1280 box.
          sizes={imageSmall ? '(min-width: 1024px) 407px, (min-width: 640px) 50vw, 100vw' : undefined}
          alt={imageAlt}
          width={1200}
          height={627}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="aspect-[1200/627] w-full object-cover"
        />
      </div>

      {date && (
        <p className="mt-[24px] font-sans text-[14px] leading-[20px] text-body">
          <time dateTime={date}>{formatPostDate(date)}</time>
        </p>
      )}

      {/*
        `items-center` is what keeps the disc on the title's optical centre
        whether it wraps to one line or two.
      */}
      <div className={`${date ? 'mt-[10px]' : 'mt-[32px]'} flex items-center justify-between gap-[20px]`}>
        <Heading className="font-display text-[22px] leading-[31px] text-primary transition-colors group-hover:text-accent">
          {title}
        </Heading>

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
