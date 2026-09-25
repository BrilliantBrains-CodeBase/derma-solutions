/**
 * Deliberate rewrites of the captured SEO copy, keyed by slug.
 *
 * Everything else in the registry reproduces seo-backup/ exactly, and
 * scripts/verify-seo.ts holds the build to it. These do not, so each one is
 * listed here rather than applied silently: an override is a copy decision
 * signed off by the client, and it trades a live, ranking signal for a new one.
 * Only add to these maps when that trade has actually been made.
 *
 * verify-seo.ts reads the same maps, so an override is checked as strictly as
 * the capture it replaces — the built page must match the new value exactly —
 * and is reported as an intentional delta rather than passing unnoticed.
 */

/** Sourced from content/home-page/Derma-Solutions-Homepage-Copy-Glowix-Template-2.md. */
export const H1_OVERRIDES: Record<string, string> = {
  // Was: "Trusted Skin & Hair Clinic in Bangalore for Radiant Results."
  'derma-solutions-home': 'Trusted Skin & Hair Clinic in Bangalore',

  // Was: "Blogs". Renamed with the nav: the section covers the clinic's press
  // and video coverage as well as its articles.
  blogs: 'Blogs & Media',
}

/**
 * <title> rewrites. These are the migration plan's hardest constraint —
 * fix-plan.md freezes every title verbatim — so this map should stay close to
 * empty, and each entry needs a reason and a date.
 *
 * The brand suffix is kept exactly as the capture spells it, en dash included:
 * the suffix is what the other 91 titles carry, and it is not what is changing.
 */
export const TITLE_OVERRIDES: Record<string, string> = {
  // Was: "Blogs – Derma Solutions Skin and Hair Clinic".
  // 2026-09-25, with the "Blogs & Media" rename. The page holds 37 posts and
  // ranks for their topics rather than for "blogs", so the head term is not
  // what is at stake here.
  //
  // NOT changed, and still the capture's: this page's meta description, and its
  // JSON-LD, which verify-seo.ts compares byte-for-byte with the backup — so
  // the WebPage node's `name` still reads "Blogs – …". Revisit both together if
  // the rename is ever carried into the schema.
  blogs: 'Blogs & Media – Derma Solutions Skin and Hair Clinic',
}
