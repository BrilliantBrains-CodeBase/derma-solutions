import { Link } from 'react-router-dom'
import { PageShell } from '@/components/PageShell'
import { PageHeader } from '@/components/PageHeader'
import { formatPostDate } from '@/components/BlogCard'
import { ArrowDiagonalIcon, CalendarCheckIcon } from '@/components/icons'
import { getSeo } from '@/seo/registry.generated'
import type { BlogPostContent } from '@/content/blog'
import { blogBySlug } from '@/content/blog/index.generated'
import { BlogToc } from '@/sections/blog/BlogToc'
import { BlogBlocks } from '@/sections/blog/BlogBlocks'
import { BlogAuthorBox } from '@/sections/blog/BlogAuthorBox'
import { BlogShare } from '@/sections/blog/BlogShare'
import { BlogRelated } from '@/sections/blog/BlogRelated'
import { BlogSidebar } from '@/sections/blog/BlogSidebar'

/**
 * Shared template for all 37 WordPress posts. Each post's route loads this and
 * its own content module (src/content/blog/posts/<slug>.ts); the SEO, H1 and
 * JSON-LD come from the registry as usual.
 *
 * Built to the Glowix single post —
 * theme-reference/01-raw-html/top-tips-for-preparing-for-plastic-surgery.html
 * and its screenshot: the page-header band with the post's date under the
 * title, a 1270x635 featured image, the article, then a divider and a row with
 * the share buttons on the right. The reference's own post is one column.
 *
 * Departures from the reference:
 *
 *  - The header's meta row drops the reference's category link — every post is
 *    "Uncategorized" — for a reading time.
 *  - The featured image is the 1200x627 frame the clinic's banners were drawn
 *    for, not the reference's 2:1, which would crop their lettering.
 *  - The page is two columns from lg — the theme's own inner-page grid, which
 *    its single post does not use. See BlogSidebar.
 *  - A table of contents, an author and medical reviewer card, a link to the
 *    matching treatment page (fix-plan A2b) and a related-posts band are added.
 *    The first two are what the live posts had.
 *  - No tags row (the posts have none) and no comment form (a static site has
 *    nowhere to send one, and the live posts had no comments).
 */
export default function BlogPost({ post }: { post: BlogPostContent }) {
  const record = getSeo(post.slug)
  const summary = blogBySlug.get(post.slug)!

  return (
    <PageShell
      slug={post.slug}
      hero={h1 => (
        <PageHeader h1={h1}>
          <p className="flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[6px] font-sans text-[15px] leading-[24px] font-medium text-white md:text-[16px]">
            <span className="inline-flex items-center gap-[8px]">
              <CalendarCheckIcon className="h-[16px] w-[16px] text-accent" />
              <time dateTime={summary.published}>{formatPostDate(summary.published)}</time>
            </span>
            <span>{summary.readingMinutes} min read</span>
          </p>
        </PageHeader>
      )}
    >
      {/*
        The theme's inner-page grid, the same one TreatmentPage lays out: a 383
        sidebar and an 847 content column, 50 apart inside the 1300 container.
        The article comes first in the DOM and the sidebar takes `lg:order-first`
        to sit on its left, so a crawler or a screen reader reaches the post
        before the list of other posts.
      */}
      <div className="mx-auto grid max-w-[1300px] gap-[50px] px-[20px] py-[40px] lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-[40px] lg:py-[80px] xl:grid-cols-[383px_minmax(0,1fr)] xl:gap-[50px] xl:px-[10px]">
        <article className="min-w-0">
          <div className="overflow-hidden rounded-30">
            <img
              src={summary.image}
              srcSet={`${summary.imageSmall} 640w, ${summary.image} 1200w`}
              sizes="(min-width: 1024px) 847px, 100vw"
              alt={summary.imageAlt}
              width={1200}
              height={627}
              fetchPriority="high"
              decoding="async"
              className="aspect-[1200/627] w-full object-cover"
            />
          </div>

          {/* The phone's contents list. From lg it is the sidebar's job. */}
          <div className="mt-[40px]">
            <BlogToc entries={post.toc} />
          </div>

          <div className="mt-[40px] lg:mt-[50px]">
            <BlogBlocks blocks={post.blocks} />
          </div>

          {post.serviceLink && (
            <div className="mt-[50px] flex flex-col gap-[20px] rounded-card border border-divider p-[24px] sm:flex-row sm:items-center sm:justify-between md:p-[30px]">
              <p className="font-display text-[22px] leading-[31px] text-primary">
                Considering {post.serviceLink.label}?
              </p>
              <Link
                to={post.serviceLink.path}
                className="group/cta inline-flex shrink-0 items-center gap-[3px] self-start rounded-pill focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:self-auto"
              >
                <span className="flex h-[50px] items-center rounded-pill bg-accent px-[26px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
                  View Treatment
                </span>
                <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
                  <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
                </span>
              </Link>
            </div>
          )}

          <div className="mt-[50px]">
            <BlogAuthorBox reviewedDate={post.reviewedDate} published={summary.published} />
          </div>

          <div className="mt-[40px] flex justify-end border-t border-divider pt-[30px]">
            <BlogShare url={record.canonical} title={record.h1} />
          </div>
        </article>

        <div className="lg:order-first">
          <BlogSidebar slug={post.slug} toc={post.toc} />
        </div>
      </div>

      <BlogRelated slugs={post.relatedSlugs} />
    </PageShell>
  )
}
