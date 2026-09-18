import type { BlogSummary } from '@/content/blog'
import { BlogCard } from '@/components/BlogCard'

/**
 * The blog index's grid (`.page-blog-archive`), shared by /blogs/ and the
 * category archive — the reference renders both from one template.
 *
 * theme-reference/07-screenshots/desktop/blog.png: three columns in the 1300
 * container, two at tablet, one on a phone; the same 30px gutters as the
 * homepage band. Unlike that band this is a plain grid at every width — it is
 * the full index, not a teaser, and 37 cards do not belong in a swipe track.
 *
 * All 37 posts on one page. The live /blogs/ paginated eight at a time, but
 * none of its /page/N/ URLs were in the sitemap; they 301 here instead.
 *
 * The card titles are <h2>s: they sit directly under the page's H1.
 */
export function BlogGrid({ posts, label }: { posts: readonly BlogSummary[]; label: string }) {
  return (
    <section aria-label={label} className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]">
      <ul className="grid gap-x-[30px] gap-y-[50px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-[60px]">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <BlogCard
              path={post.path}
              title={post.title}
              image={post.image}
              imageSmall={post.imageSmall}
              imageAlt={post.imageAlt}
              date={post.published}
              headingLevel="h2"
              eager={index < 3}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
