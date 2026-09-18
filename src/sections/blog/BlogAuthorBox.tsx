import { Link } from 'react-router-dom'
import { team } from '@/config/site'
import { formatPostDate } from '@/components/BlogCard'

const author = team.find(member => member.id === 'sandeep-mahapatra')!

/**
 * The live posts' "Author & Medical Reviewer" section, as a card. Not in the
 * Glowix reference, which has neither an author box nor medical content.
 *
 * On the live site this was hand-pasted into 36 of the 37 post bodies, each
 * copy slightly different (one ends mid-sentence). The extractor lifts it out
 * and keeps only the reviewed date; the words here come from `team` in
 * src/config/site.ts, the same source as the doctor's profile page and schema.
 *
 * The reviewed date is shown only where it is on or after the post's own
 * publish date. Most live posts carry "2026-06-17" — a date pasted along with
 * the block, which precedes 22 of the posts it appears on. A review cannot
 * predate the article, so those show "Medically reviewed" without a date
 * rather than a date that is visibly wrong.
 */
export function BlogAuthorBox({ reviewedDate, published }: { reviewedDate: string | null; published: string }) {
  const reviewed = reviewedDate !== null
  const datedReview = reviewed && reviewedDate >= published.slice(0, 10)

  return (
    <aside
      aria-label="About the author"
      className="flex flex-col gap-[20px] rounded-card bg-secondary p-[24px] sm:flex-row sm:items-start sm:gap-[30px] md:p-[40px]"
    >
      <img
        src={author.photo}
        alt={author.name}
        width={96}
        height={96}
        loading="lazy"
        decoding="async"
        className="h-[96px] w-[96px] shrink-0 rounded-full object-cover object-[43%_50%]"
      />

      <div>
        <p className="font-sans text-[14px] leading-[24px] font-medium tracking-[2.8px] text-accent uppercase">
          {reviewed ? 'Written & medically reviewed by' : 'Written by'}
        </p>
        <p className="mt-[6px] font-display text-[26px] leading-[34px] text-primary">
          <Link
            to={author.path}
            className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {author.name}
          </Link>
        </p>
        <p className="mt-[4px] font-sans text-[15px] leading-[24px] font-medium text-primary">
          {author.qualification} · {author.role}
        </p>
        <p className="mt-[14px] font-sans text-[16px] leading-[26px] text-body">{author.bio}</p>
        {datedReview && (
          <p className="mt-[14px] font-sans text-[14px] leading-[22px] text-body">
            Medically reviewed on <time dateTime={reviewedDate}>{formatPostDate(`${reviewedDate}T12:00:00+05:30`)}</time>
          </p>
        )}
      </div>
    </aside>
  )
}
