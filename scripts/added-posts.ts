/**
 * Blog posts that are NOT in the live-site capture — the posts-side twin of
 * scripts/added-pages.ts.
 *
 * The 37 captured posts come from seo-backup/03-wp-rest/posts.json. A post
 * written after the migration has no WordPress record, so its SEO fields live
 * here and its body lives in content/blog/<slug>.html (plain p/h2/h3/ul/ol and
 * `figure.wp-block-image`, the subset scripts/extract-blog-content.ts reads).
 * Everything downstream — the registry, the content module, the blog index,
 * the listing, sidebar, related posts, sitemap and link check — then treats it
 * exactly like a captured post.
 *
 * Images sit beside the HTML in content/blog/, not in public/: the banner is
 * cropped into the 1200x627 frame by scripts/import-blog-images.ts, and an
 * in-body image's `src` names a file there. An in-body image whose file is not
 * there yet is left out of the page (and reported) rather than shipped broken.
 *
 * After editing a post or adding one:
 *   npm run seo:registry && npm run content:blog && npm run assets:blog && npm run seo:routes
 *
 * Consumed by scripts/build-seo-registry.ts and scripts/blog-source.ts.
 */

/**
 * The captured post whose site-wide entity nodes a new post's graph reuses —
 * see SCHEMA_TEMPLATE_KEY in scripts/added-pages.ts for why each graph needs
 * its own copy. A post rather than a page, so the shape around the Article
 * matches the other 37.
 */
export const POST_SCHEMA_TEMPLATE_KEY = 'blog-is-laser-treatment-safe-for-indian-skin'

export interface AddedPost {
  slug: string
  /** <title>, og:title — the brief's meta title, verbatim. */
  title: string
  /** The brief's meta description, verbatim. */
  description: string
  /** The post's headline: the H1, its card title and its last breadcrumb. */
  h1: string
  publishedTime: string
  /** Defaults to publishedTime. Bump it when the copy changes. */
  modifiedTime?: string
  /** content/blog/<file> — the body. */
  bodyFile: string
  /** content/blog/<file> — the banner, any size; cropped to 1200x627. */
  bannerFile: string
  bannerAlt: string
  /** The treatment page the "Considering …?" card links to (fix-plan A2b). */
  servicePath?: string
  /** The brief's FAQ, verbatim, for the FAQPage node. Must match the body's H3s and answers. */
  faq?: { question: string; answer: string }[]
  note: string
}

export const ADDED_POSTS: AddedPost[] = [
  {
    // Blog 01 brief, "SEO setup". Focus keyword "tattoo removal"; secondary
    // keywords are in the copy as written and are not repeated anywhere else.
    slug: 'laser-tattoo-removal-sessions-pain-cost',
    title: 'Laser Tattoo Removal in Bangalore: Sessions, Pain & Cost',
    description:
      'How many sessions does laser tattoo removal take, does it hurt, and what decides the cost? A dermatologist’s guide from Derma Solutions, Marathahalli.',
    h1: 'Laser Tattoo Removal in Bangalore: How Many Sessions, Does It Hurt and What Does It Cost?',
    publishedTime: '2026-10-23T10:00:00+05:30',
    bodyFile: 'laser-tattoo-removal-sessions-pain-cost.html',
    bannerFile: 'blog-01-laser-tattoo-removal-banner.png',
    bannerAlt: 'Laser tattoo removal in Bangalore banner with the Derma Solutions logo',
    servicePath: '/laser-tattoo-removal-in-bangalore/',
    faq: [
      {
        question: 'Can a tattoo be removed completely?',
        answer:
          'Many black tattoos fade until they are very hard to see. Some colours may leave a faint shadow, and your doctor will tell you what is realistic.',
      },
      {
        question: 'Can it be done in one sitting?',
        answer: 'No. The body clears ink gradually, so several sessions are always needed.',
      },
      {
        question: 'Will it leave a scar?',
        answer: 'The risk is low with the right laser and good aftercare. Picking at scabs raises it.',
      },
    ],
    note:
      'New post, not in the live capture. Blog 01 brief; copy verbatim. In-body image tattoo-removal-sessions-fading.jpg is still owed.',
  },
]
