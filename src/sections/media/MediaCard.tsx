import { formatPostDate } from '@/components/BlogCard'
import { ArrowUpRightIcon } from '@/components/icons'
import type { MediaItem } from '@/content/media'

/**
 * One press placement, in the theme's card vocabulary — the blog card's
 * proportions with the treatment sidebar's row type, since what identifies a
 * placement is the masthead and the date rather than a photograph.
 *
 * Typographic on purpose: no publication logos. Twenty mastheads would be
 * twenty trademarks to license and chase, and the theme has no slot for them.
 *
 * The headline is the link, not the whole card. A syndicated story carries
 * links to its other outlets inside the same card, and an <a> cannot contain
 * another one — so one rule for every card rather than two kinds of card.
 * `after:absolute after:inset-0` then stretches that link over the card, which
 * gives back the whole-card click target without nesting anything.
 *
 * Print coverage has no live URL. It leads with a scan of the page instead, and
 * the link opens the full-size image.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

export function MediaCard({ item }: { item: MediaItem }) {
  const href = item.url ?? item.snapshot?.src
  const external = Boolean(item.url)

  return (
    <article className="group relative flex flex-col rounded-card border border-divider bg-white p-[24px] transition-colors hover:border-accent md:p-[30px]">
      {item.snapshot && (
        <a
          href={item.snapshot.src}
          target="_blank"
          rel="noopener noreferrer"
          // Decorative here: the card's own heading link names the coverage,
          // and this repeats it. tabIndex -1 keeps it out of the tab order.
          tabIndex={-1}
          aria-hidden
          className="mb-[24px] block overflow-hidden rounded-16 bg-secondary"
        >
          <img
            src={item.snapshot.thumb}
            alt=""
            width={640}
            height={480}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </a>
      )}

      <div className="flex items-start justify-between gap-[16px]">
        <div className="min-w-0">
          <p className="font-display text-[20px] leading-[28px] text-primary md:text-[22px] md:leading-[31px]">
            {item.publication}
          </p>
          <p className="mt-[6px] font-sans text-[14px] leading-[20px] text-body">
            <time dateTime={item.date}>{formatPostDate(`${item.date}T12:00:00+05:30`)}</time>
            {item.language && <span> · In {item.language}</span>}
          </p>
        </div>

        <span
          aria-hidden
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-white"
        >
          <ArrowUpRightIcon className="h-[15px] w-[15px]" />
        </span>
      </div>

      <p className="mt-[16px] inline-flex w-fit rounded-pill bg-secondary px-[14px] py-[6px] font-sans text-[12px] leading-[16px] font-semibold tracking-[1.2px] text-accent uppercase">
        {item.type}
      </p>

      <h2 className="mt-[16px] font-sans text-[16px] leading-[26px] font-medium text-primary">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors after:absolute after:inset-0 hover:text-accent ${focusRing}`}
        >
          {item.title}
          <span className="sr-only">
            {external ? ` (opens on ${item.publication})` : ' (opens the scanned page)'}
          </span>
        </a>
      </h2>

      {item.snapshot && (
        <p className="mt-[12px] font-sans text-[14px] leading-[22px] text-body italic">
          {item.snapshot.caption}
        </p>
      )}

      {item.alsoIn && (
        // Sits above the stretched heading link so these stay clickable.
        <div className="relative z-10 pt-[20px]">
          <p className="font-sans text-[13px] leading-[18px] font-semibold tracking-[1.2px] text-body uppercase">
            Also covered by
          </p>
          <ul className="mt-[10px] flex flex-wrap gap-x-[8px] gap-y-[8px]">
            {item.alsoIn.map(outlet => (
              <li key={outlet.url}>
                <a
                  href={outlet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex rounded-10 bg-secondary px-[12px] py-[6px] font-sans text-[13px] leading-[18px] text-body transition-colors hover:bg-accent hover:text-white ${focusRing}`}
                >
                  {outlet.publication}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
