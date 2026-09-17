/**
 * Pages that are NOT in the live-site capture.
 *
 * Everything in src/seo/registry.generated.ts is otherwise reproduced from
 * seo-backup/, and scripts/verify-seo.ts holds the build to it. The pages here
 * have no captured title, description or JSON-LD to reproduce, so their SEO is
 * authored — and listed in one place so that is never mistaken for a copy.
 *
 * verify-seo.ts iterates seo-map.csv, not the registry, so it neither checks nor
 * trips over these. They still get the same structural guarantees: a route, a
 * page stub, a sitemap entry and a JSON-LD graph (vite.config.ts's onFinished
 * tally counts the registry, so a missing graph still fails the build).
 *
 * Consumed by scripts/build-seo-registry.ts.
 */

export const SITE_URL = 'https://dermasolutions.co.in'

/**
 * The capture whose site-wide entity nodes (WebSite, the organisations, the
 * clinic, the physician, places, the core Service) a new page's graph reuses.
 * Every captured page repeats those nodes, and an @id reference only resolves
 * inside the graph it appears in, so a new page needs its own copy of them.
 */
export const SCHEMA_TEMPLATE_KEY = 'acne-scar-treatment-in-bangalore'

export interface AddedPage {
  slug: string
  title: string
  description: string
  h1: string
  /** The last breadcrumb item's name — the page's short name. */
  breadcrumbName: string
  publishedTime: string
  note: string
}

export const ADDED_PAGES: AddedPage[] = [
  {
    // content/Treatment/Derma-Solutions-All-Treatment-Pages-Content.md, Part 1,
    // "10. DERMATO SURGERY" — title, description and H1 are the doc's.
    //
    // TODO(content): the doc's note 4 — the copy is built from the "Surgical
    // Dermatology" section of Dr Sandeep's profile and needs a doctor review
    // before this page is published.
    slug: 'dermato-surgery-in-bangalore',
    title: 'Dermato Surgery in Bangalore | Mole, Cyst & Wart Removal – Derma Solutions',
    description:
      'Dermato surgery in Marathahalli, Whitefield, Bangalore. Minimally invasive removal of moles, cysts, warts and skin tags, plus acne scar revision and vitiligo surgery. Book a consultation.',
    h1: 'Dermato Surgery',
    breadcrumbName: 'Dermato Surgery',
    publishedTime: '2026-09-17T00:00:00+05:30',
    note:
      'New page, not in the live capture (content/Treatment doc note 4). Needs a doctor review before publishing.',
  },
]
