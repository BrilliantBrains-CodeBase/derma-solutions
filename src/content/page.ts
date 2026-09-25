import type { BlogBlock } from '@/content/blog'
import type { TreatmentFaq } from '@/content/treatment'

/**
 * The shape of one content page's copy — the live pages that fit neither the
 * treatment template nor the doctor one: the two older category hubs, the four
 * long-form 2024 service pages the treatment doc never rewrote, the legal pages
 * and the maintenance notice.
 *
 * Unlike src/content/treatments/, these modules are hand-ported, one per page in
 * src/content/pages/<slug>.ts, from the live capture in seo-backup/02-markdown/.
 * The copy is the live page's, cleaned of its WordPress chrome, calls-to-call
 * and typos. Titles, descriptions and H1s are not here — they come from the SEO
 * registry, as everywhere else.
 *
 * The body reuses the blog's block vocabulary, so it renders through BlogBlocks
 * with the same type scale as the articles.
 */
export interface ContentPageContent {
  /** Live URL pathname, trailing slash included. Matches the registry record. */
  path: string
  /** The breadcrumb's last crumb. */
  name: string
  /** The breadcrumb's middle crumb, plain text. Omitted on the legal pages. */
  section?: string
  blocks: BlogBlock[]
  faqHeading?: string
  faqs?: readonly TreatmentFaq[]
  /**
   * The sidebar's link card. A page without one is laid out as a single
   * reading column, as the legal pages are.
   */
  related?: {
    heading: string
    items: readonly { label: string; path: string }[]
  }
}
