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

import { aboutUsExtraNodes } from './schema-nodes.ts'

/** Re-exported so this file stays the one place a new page is described. */
export { SITE_URL } from './paths.ts'

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
  /**
   * Nodes appended to this page's @graph, after the breadcrumb, the WebPage and
   * the ReadAction.
   *
   * SCHEMA_TEMPLATE_KEY's site-wide entities describe the clinic, not what a
   * page publishes — so a page carrying an FAQ, or profiling doctors with no
   * node anywhere on the site, declares them here. src/seo/JsonLd.tsx is
   * dev-only, so this is the only route into the shipped graph.
   *
   * Called with the page's absolute URL, so a builder can mint @ids under it.
   * The result is appended verbatim: no @id rewriting and no de-duplication, so
   * never re-declare an @id the template graph already carries. Dr Sandeep's
   * #physician is one of those — see scripts/schema-nodes.ts.
   */
  extraNodes?: (url: string) => Record<string, unknown>[]
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
  {
    // content/about-us/Derma_Solutions_Home_Technology_and_About_Us_Content.md,
    // Part B, "B1 — Page Banner" — the title, description, H1 and breadcrumb are
    // the doc's, verbatim. The page itself is built from B1 to B10; B11 is the
    // shared footer and is not this page's to build.
    //
    // TODO(compliance): Part C. Four of this page's claims are flagged there and
    // are NOT cleared — the 15+ years badge (B2/B5), 35+ treatments (B4/B10),
    // the "USFDA-cleared" wording (B10 A3) and Dr Sumedha's designation (B6).
    // The hours badge (B3) is already resolved: Part C says publish the clinic's
    // hours and never "24/7 Support", and aboutApproach.chip does.
    slug: 'about-us',
    title: 'About Derma Solutions | Skin & Hair Clinic, Marathahalli',
    description:
      'Meet the MD dermatologists and plastic surgeons behind Derma Solutions, a doctor-led skin, hair and aesthetic clinic in Marathahalli, Whitefield, Bangalore.',
    h1: 'About Us',
    breadcrumbName: 'About Us',
    publishedTime: '2026-09-20T00:00:00+05:30',
    note:
      'New page, not in the live capture. Built from content/about-us/…About_Us_Content.md Part B; Part C checks outstanding.',
    extraNodes: aboutUsExtraNodes,
  },
]
