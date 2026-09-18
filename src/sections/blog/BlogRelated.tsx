import { Link } from 'react-router-dom'
import { blogBySlug } from '@/content/blog/index.generated'
import { ArrowDiagonalIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { CardCarousel } from '@/components/CardCarousel'
import { BlogCard } from '@/components/BlogCard'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/**
 * Three related posts under an article. The Glowix single post has none; this
 * reuses the homepage's Latest Blog band — the same heading block, card,
 * carousel and "View All Articles" button — so it reads as a band the site
 * already has rather than a new one.
 *
 * Which three is decided at build time by extract-blog-content.ts.
 */
export function BlogRelated({ slugs }: { slugs: readonly string[] }) {
  const posts = slugs.map(slug => blogBySlug.get(slug)!)

  return (
    <section
      aria-labelledby="blog-related-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[640px] text-center">
        <Eyebrow className="justify-center text-accent">Keep Reading</Eyebrow>
        <h2
          id="blog-related-heading"
          className="mt-[20px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
        >
          Related Articles
        </h2>
      </div>

      <CardCarousel
        label="Related Articles"
        ulClassName="mt-[50px] grid gap-[30px] sm:grid-cols-2 lg:mt-[60px] lg:grid-cols-3"
        slidesClassName="[--slides:1] sm:[--slides:2]"
      >
        {posts.map(post => (
          <li key={post.slug}>
            <BlogCard
              path={post.path}
              title={post.title}
              image={post.image}
              imageSmall={post.imageSmall}
              imageAlt={post.imageAlt}
              date={post.published}
            />
          </li>
        ))}
      </CardCarousel>

      <div className="mt-[50px] flex justify-center lg:mt-[60px]">
        <Link to="/blogs/" className={`group/cta inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}>
          <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
            View All Articles
          </span>
          <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
            <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
          </span>
        </Link>
      </div>
    </section>
  )
}
