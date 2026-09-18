import { Link } from 'react-router-dom'
import { contact } from '@/config/site'
import type { BlogTocEntry } from '@/content/blog'
import { blogIndex } from '@/content/blog/index.generated'
import { formatPostDate } from '@/components/BlogCard'
import { ArrowUpRightIcon } from '@/components/icons'
import { SidebarHoursCard } from '@/components/SidebarHoursCard'
import { BlogTocPanel } from '@/sections/blog/BlogToc'

/**
 * The post page's sidebar — the 383px column the theme gives every inner page
 * (theme-reference/01-raw-html/casestudy__radiant-skin-tips-for-a-glow.html,
 * and the service pages this site already builds it for). The theme's own blog
 * has no sidebar, because its posts are 300 words; these run to 4,000.
 *
 * Three cards, 30px apart, in the reference's card vocabulary:
 *
 *  1. Contents, pinned 140px under the sticky header and following the reading
 *     position. From lg only: the phone keeps the collapsible list above the
 *     article.
 *  2. The opening-hours card, shared with the treatment sidebar, with a call
 *     button added. It dials (contact.telHref) as the footer's CTA does, rather
 *     than pointing at /book-appointment/, which is not a built route yet.
 *  3. Recent Articles — the five newest posts, on the services card's rows.
 *
 * How the column is arranged, and why it is not the treatment sidebar's sticky:
 *
 * That one pins its whole column with a measured `top` (see stickySidebar).
 * Two cards fit a screen; these three run about 1,400px, and the formula then
 * pins the column with its *foot* in view — leaving the contents list, the one
 * card that has to stay visible, 900px above the top of the window.
 *
 * So the contents card alone is sticky, and it is first, where the theme's
 * sidebar starts and where it is useful from the first screen. The column
 * stretches to the article's height — exactly as the comment in TreatmentPage
 * describes — which is the track it travels along.
 *
 * The other two sit at the foot of that column, so they come into view as the
 * article ends: a call to action at the point someone has finished reading,
 * rather than 4,000 words before it.
 *
 * What keeps the two apart is the spacer the contents card sticks inside, which
 * stops where the cards begin. Sticky positioning cannot leave its containing
 * block, so the list rides down to that line and then scrolls away as the cards
 * arrive. Layering the cards over it instead (`z-10`) looked right until the
 * 30px gap between them scrolled past the pinned list and showed it through.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const RECENT = 5

export function BlogSidebar({ slug, toc }: { slug: string; toc: readonly BlogTocEntry[] }) {
  const recent = blogIndex.filter(post => post.slug !== slug).slice(0, RECENT)

  return (
    <aside className="flex flex-col gap-[30px] lg:h-full">
      {/* The contents card's sticky track: everything above the cards below. */}
      <div className="hidden lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <BlogTocPanel entries={toc} />
      </div>

      <div className="flex flex-col gap-[30px]">
        {/* A tel: link, so an <a> as in the footer's CTA — not a router Link. */}
        <SidebarHoursCard
          action={
            <a
              href={contact.telHref}
              className="inline-flex items-center gap-[12px] rounded-pill bg-accent px-[30px] py-[16px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {contact.ctaLabel}
              <ArrowUpRightIcon className="h-[16px] w-[16px]" />
            </a>
          }
        />

        <nav aria-labelledby="blog-recent-heading" className="overflow-hidden rounded-card">
          <h2
            id="blog-recent-heading"
            className="bg-primary px-[30px] py-[20px] font-display text-[20px] leading-[26px] text-white uppercase"
          >
            Recent Articles
          </h2>
          <ul className="bg-secondary px-[30px] py-[10px]">
            {recent.map(post => (
              <li key={post.slug} className="border-b border-divider last:border-b-0">
                <Link to={post.path} className={`group/row flex items-start gap-[16px] py-[20px] ${focusRing}`}>
                  <img
                    src={post.imageSmall}
                    // Decorative: the title beside it is the link's own text.
                    alt=""
                    width={120}
                    height={63}
                    sizes="120px"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[1200/627] w-[100px] shrink-0 rounded-10 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-sans text-[13px] leading-[18px] text-body">
                      <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                    </p>
                    {/*
                      These titles are the posts' own H1s, which run long — three
                      lines is the most a 383px row can carry before the list
                      stops being scannable.
                    */}
                    <p className="mt-[6px] line-clamp-3 font-display text-[16px] leading-[24px] text-primary transition-colors group-hover/row:text-accent">
                      {post.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
