/**
 * The shape of one treatment page's copy.
 *
 * The data itself is generated — one module per page in
 * src/content/treatments/<slug>.ts, written by
 * scripts/extract-treatment-content.ts from
 * content/Treatment/Derma-Solutions-All-Treatment-Pages-Content.md. One module
 * per page rather than one for all 38 so each lazily loaded route carries only
 * its own copy.
 *
 * Field names follow the doc's template slots (01–08); the SEO lines in the doc
 * are deliberately not here — titles, descriptions and H1s come from the SEO
 * registry, which holds them to the live-site capture.
 */
export interface TreatmentContent {
  /** Live URL pathname, trailing slash included. Matches the registry record. */
  path: string
  /** The page's short name — the last segment of the doc's breadcrumb (slot 01). */
  name: string
  /** Slot 04 — two paragraphs. */
  intro: readonly [string, string]
  /** Slot 05 — H2, paragraph and three icon boxes. */
  feature: TreatmentBlock
  /** Slot 06 — the paragraph under the video. */
  videoBody: string
  /** Slot 07 — H2, paragraph and three feature items. */
  why: TreatmentBlock
  /** Slot 08. */
  faqHeading: string
  faqs: readonly TreatmentFaq[]
}

export interface TreatmentBlock {
  heading: string
  body: string
  items: readonly [TreatmentItem, TreatmentItem, TreatmentItem]
}

export interface TreatmentItem {
  title: string
  text: string
}

export interface TreatmentFaq {
  question: string
  answer: string
}
