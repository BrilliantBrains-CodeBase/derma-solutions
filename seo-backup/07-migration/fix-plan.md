# Remediation Plan — dermasolutions.co.in

**Context.** The SEO backup captured 92 URLs and surfaced 13 findings. The site is being rebuilt
from scratch, so this plan fixes what it can **in the new build only** — the live WordPress site is
not touched. Zero risk to current rankings, and every fix ships on launch day.

**Decisions taken:**
- Fixes land in the **new build only**.
- Google Search Console access is available.
- **Meta titles and descriptions carry over VERBATIM.** No rewrites in this phase.

**Ground rule that governs everything below:** the migration's job is to preserve rankings. Fixes
ride along with the rebuild; they never justify changing a URL, a title, a description, or a schema
block that is currently working. Where a fix and preservation conflict, **preservation wins**.

Because titles and descriptions are frozen, this plan splits into two tracks:

- **SHIP NOW** — fixes that add something missing or remove something broken, without touching
  a single ranking signal that already exists.
- **DEFERRED** — improvements that require editing live copy. Revisit once the new site has held
  stable rankings for 4–6 weeks, so any change can be measured against a clean baseline.

---

## Fix inventory

| # | Finding | Scale | Severity | Track |
|---|---|---|---|---|
| 12 | GTM / GA4 / Pixel re-installation | site-wide | **Critical** | **Ship now** |
| 2 | `maintenance-page` indexable & in sitemap | 1 page | **Critical** | **Ship now** |
| 1b | IV Glutathione true duplicate | 1 pair | **Critical** | **Ship now** |
| 3 | Missing `og:image` | 55 pages | High | **Ship now** |
| 7 | Duplicate / multiple H1s | 6 pages | Medium | **Ship now** |
| 8 | Images missing alt text | 12 pages / 3 assets | Low | **Ship now** |
| 9 | Media library items without alt | 8 items | Low | **Ship now** |
| 10 | Cross-domain hotlinked logo (legal pages) | 2 pages | Low | **Ship now** |
| 11 | No `llms.txt` | site-wide | Low (opportunity) | **Ship now** |
| 1a | Hub/spoke overlap | 4 pairs | Medium | Partly deferred |
| 4 | Titles over 60 chars | 42 pages | High | **Deferred** |
| 5 | Descriptions over 160 chars | 22 pages | Medium | **Deferred** |
| 6 | Duplicate meta descriptions | 2 pages | Medium | **Deferred** |
| 13 | `eye.svg` 404 in CSS | 92 pages | **None — verified** | No action |

---

# TRACK A — Ship with the new build

## A0. Pull the GSC data first

Export **Performance → Pages**, last **16 months**, with Impressions, Clicks, CTR and Average
Position. Also export **Queries** filtered to the 10 URLs in A2. Save to `07-migration/gsc-export.csv`.

With titles frozen, this now serves three narrower purposes:

- confirm the redirect direction in **A2** (the only URL being retired),
- rank the ~15 pages that get a bespoke `og:image` in **A4**,
- establish the **pre-launch baseline** every post-migration comparison is measured against.

> Capture this baseline before launch. Once the new site is live you cannot go back and get a
> clean "before" reading.

## A1. Re-install tracking — do this before launch, not after

| Tag | ID |
|---|---|
| Google Tag Manager | `GTM-PWVJVRQ` |
| Google Analytics 4 | `G-3KNBG0VTG0` |
| Facebook Pixel | `1327906075791898` |

GA4 is loaded **via GTM**, not hardcoded in the page — it is invisible to static scraping. A
rebuild that copies only what appears in the HTML will silently drop analytics. Details in
`00-site-level/tracking.md`.

- **Export the GTM container config from the GTM console first.** It is not in this backup and
  cannot be recovered from the site.
- **Re-verify conversion triggers.** Form-submit and "Call" button triggers depend on CSS selectors
  that the rebuild will change. This is the most commonly broken thing in a site migration.
- Do not create a new GA4 property — a new ID resets all historical comparison.

## A2. IV Glutathione — the one true duplicate

Internal-link authority was measured across all 92 pages. This pair is the only genuine duplication:

| URL | Type | Inbound internal links | Words | H1 |
|---|---|---|---|---|
| `/iv-glutathione-treatment-in-bangalore/` | page | 1 | 2,394 | *identical* |
| `/iv-glutathione-treatment/` | page | 1 | 1,788 | *identical* |

Both are pages, both carry the **same H1**, both have one inbound link. Unintentional duplication.

- Keep `/iv-glutathione-treatment-in-bangalore/` (longer, matches local-intent query).
- Merge any unique content from the retired page into the keeper **before** redirecting.
- **301** `/iv-glutathione-treatment/` → the keeper. Record in `redirect-map.csv`.
- **Confirm against GSC first** — if the shorter URL holds the impressions, invert the direction.

This also resolves one of the two duplicate-description pairs without editing any copy.

## A3. `maintenance-page`

A page titled "Maintenance Page" is live, indexable, 292 words, and submitted in `sitemap.xml`.

**Action: do not rebuild it.** Serve **`410 Gone`** — it should never have been indexed, so a 301
to the homepage just passes noise. Ensure it is absent from the new sitemap.

Resolves three findings at once — they were all the same page: indexable junk, the only page with
no H1, and the only thin-content page.

## A4. `og:image` on 55 pages

All 37 blog posts have one; the homepage and every service page do not. Shared on WhatsApp — a
primary referral channel for a Bangalore clinic — these currently render as bare text links with
no thumbnail.

- Add a **site-wide `og:image` fallback** (clinic exterior or logo lockup, 1200×630) so no page can
  ever ship without one.
- Override per-page for the ~15 highest-traffic service pages, ranked by the A0 export.
- Add `og:image:width`, `og:image:height` and `og:image:alt`.
- Set `twitter:image` too. `twitter:card` is already `summary_large_image` site-wide — keep it.

**This adds a tag where none exists. It changes no existing title or description.**

## A5. Heading hierarchy — 6 pages

Five pages carry multiple H1s; the extras are section headings mis-tagged as H1.

| Page | Fix |
|---|---|
| `why-daily-sunscreen-is-your-best-skin-investment` | Literally the **same H1 twice** — delete the second |
| `when-should-you-start-anti-ageing-treatments-in-bengaluru` | 3 H1s → keep 1, demote 2 to H2 |
| `blog-botox-vs-fillers-difference` | "Safety Considerations Before Treatment" → H2 |
| `skin-boosters-treatment-bengaluru` | "Skin Boosters vs PRP" → H2 |
| `skin-boosters-vs-dermal-fillers` | "Understanding Facial Aging" → H2 |

This changes the **heading level only — never the heading text**. The words stay exactly as they are.

Enforce structurally in the new build: **one H1 per page, bound to the page-title field**, so an
editor cannot reintroduce this by picking the wrong style.

## A6. Alt text

Only **3 unique assets** cause 10 of the 12 flagged pages — decorative Noun Project SVG icons
(`noun-facial-treatment-*`, `noun-breast-augmentation-*`).

**Give them `alt=""` — explicit and empty — not descriptive text.** They are decorative; a screen
reader announcing "noun facial treatment 6601445" is worse than silence. This is the correct
accessibility answer and clears the finding legitimately rather than by keyword-stuffing.

The 8 media-library items without alt are the same icons plus untitled uploads — same treatment.

Coverage is already **534 / 542 (99%)**, which is genuinely good. **Carry `media-library.json`
across so those 534 alt strings are not silently reset to zero on the new platform.** That is the
real risk here — not the 8 that are missing.

## A7. Cross-domain logo on the legal pages

`/privacy-policy/` and `/terms-of-use/` embed a logo hotlinked from `neofollicletransplant.com`.

For the record: **not a copy-paste error.** The parent entity is **NEOFOLLICLE AND NEOFERTILITY
CLINIC LLP** and the policies legitimately cover all three group sites. No legal issue, no content
change needed.

**Action:** host the logo on `dermasolutions.co.in`. Hotlinking a sibling domain means an unrelated
change there silently breaks these pages. Keep the shared legal text exactly as-is.

## A8. `llms.txt`

`/llms.txt`, `/llm.txt`, `/ai.txt` and `/.well-known/llms.txt` all return 404. Nothing to preserve —
this is net-new, so it carries no migration risk at all.

Publish `/llms.txt` listing the clinic, its specialties, the doctors, the location, and canonical
URLs of the main service pages. AI search is a growing referral path for clinics; cheap, uncontested win.

## A9. `eye.svg` — no action

Listed only so a future audit doesn't re-flag it. It 404s and the string appears in the CSS of all
92 pages, but it sits in an unused CSS custom property from Breakdance's WooCommerce defaults.
**Verified in a real browser: it is never requested, and the homepage records zero failed
same-origin requests.**

---

# TRACK B — Deferred until rankings stabilise

These are real findings. They are deferred because every one of them requires editing copy that is
currently ranking, and the rebuild is already a large enough variable on its own. Changing the site
*and* its metadata simultaneously makes it impossible to attribute any traffic movement.

**Revisit 4–6 weeks after launch, once GSC shows the new site holding its baseline.**

| Deferred | Scale | Why it's worth doing later |
|---|---|---|
| Titles over 60 chars | 42 pages | Truncated in SERPs; worst is **120 chars** |
| Descriptions over 160 chars | 22 pages | Truncated; worst is **249 chars** |
| Duplicate descriptions | 1 remaining pair | A2 resolves the other |
| Hub/spoke title differentiation | 4 pairs | Sharpens intent separation |

### The finding to keep on file

**22 of the 42 long titles are long only because of boilerplate** — the default site suffix
`" – Derma Solutions Skin and Hair Clinic"` costs 39 characters on every page.

A validated rule exists for when this is picked up: service pages take `" | Derma Solutions"`
(18 chars); blog posts take **no suffix** — informational intent, brand adds no click value.
Tested against all 42 offenders, **every one lands under 60 characters** with its head keyword and
location modifier intact. Examples:

```
120 → 44   RF vs HIFU Skin Tightening: Which Is Better?
 98 → 48   Why Daily Sunscreen Is Your Best Skin Investment
 81 → 60   Xanthelasma Removal Treatment in Bangalore | Derma Solutions
```

> Caveat for later: Google truncates on **pixel width** (~580px), not character count. 60 chars is
> a proxy, not a rule. And a title already earning a high CTR should be left alone regardless of
> length — check GSC before touching anything.

### One deferred item with a shippable half

**A2b — hub/spoke internal linking (ship this part now).** Four pairs are a service page in the nav
versus a long-form post:

| Pair | Service page | Competing post |
|---|---|---|
| Gynecomastia | 96 inbound, 1,505 w | 3 inbound, 2,857 w |
| Weight-loss injections | 93 inbound, 1,924 w | 3 inbound, 2,011 w |
| Xanthelasma | 96 inbound, 1,473 w | 3 inbound, 2,879 w |
| Earlobe repair | 95 inbound, 1,640 w | 7 inbound, 2,839 w |

This is a **legitimate, valuable structure**, not a defect — the page targets commercial intent, the
post targets informational. **Do not 301 these.** That would destroy long-tail rankings for no gain.

Ship now: add a prominent link from each post → its service page ("Book a consultation"), and keep
the service pages' ~95 internal links intact in the new nav.
Defer: the title/H1 rewrites that sharpen the intent split.

---

## Verification

Re-run the backup tooling against the **new** site and diff against this one. The backup was built
to be the migration's test suite, not just an archive.

```bash
python3 _logs/fetch_html.py        # point at the new domain / staging host
python3 _logs/extract_seo.py
python3 _logs/build_migration.py
python3 _logs/verify.py
```

Then diff old vs new `seo-map.csv`. Because titles and descriptions are frozen, the expected diff
is now very small — which makes any regression obvious.

**Expected differences, and nothing else:**

- `og_image` newly populated on 55 pages
- `h1_count` → 1 on the 5 multi-H1 pages
- two fewer URLs: `maintenance-page` (410) and `/iv-glutathione-treatment/` (301)

**Everything else must match byte-for-byte** — in particular:

| Column | Expected |
|---|---|
| `title` | **identical on all 90 surviving URLs** |
| `meta_description` | **identical on all 90** |
| `canonical` | identical |
| `schema_types` | identical |
| `robots` | identical |
| `word_count` | identical (±small, from the A2 content merge only) |
| `internal_links` | identical or higher (A2b adds links) |

Any other delta is a regression, not an improvement.

Post-launch, watch GSC weekly for 4 weeks: coverage errors, average position on the top 15 pages,
and that all redirects resolve without chains.

---

## What must NOT change

- **Every meta title and description — verbatim.** This is now the hardest constraint in the plan.
- Any of the 92 slugs, except the single IV Glutathione consolidation and the retired maintenance page.
- Any canonical URL.
- Any JSON-LD block — port `04-seo-extracted/schema/*.jsonld` **byte-verbatim**. All 92 pages carry
  a rich graph (`MedicalClinic`, `Physician`, `LocalBusiness`, `MedicalOrganization`,
  `BreadcrumbList`; posts add `Article`). Highest-value, easiest-to-lose asset on the site.
- `robots.txt` — replicate verbatim.
- The site-wide directive `max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
  Losing it shrinks every SERP listing.
- The service pages' internal-link structure (~95 inbound links each) — load-bearing.
- The 534 existing image alt strings.
