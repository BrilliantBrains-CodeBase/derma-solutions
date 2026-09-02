# Gaps & Opportunities — dermasolutions.co.in

Generated 2026-09-02 05:31 UTC from **92 captured URLs**.

Everything below is a finding about the **current** site.
**PRESERVE** = carry over unchanged. **IMPROVE** = existing weakness; fixing is optional
and separate from the migration. Do not conflate the two.

---

## PRESERVE — must carry to the new site unchanged

- **All 92 URLs / slugs** — `redirect-map.csv`, pre-filled 1:1.
- **Every meta title and description** — `seo-map.csv` (`title`, `meta_description`).
- **JSON-LD structured data** — `04-seo-extracted/schema/*.jsonld`, byte-verbatim.
  All 92 pages carry a rich graph
  (`MedicalClinic`, `Physician`, `LocalBusiness`, `MedicalOrganization`, `BreadcrumbList`;
  the 37 blog posts add `Article` + `ImageObject`). **This is the single highest-value,
  easiest-to-lose asset on the site.**
- **Tracking** — `GTM-PWVJVRQ` and the Facebook Pixel, both present on all 92 pages.
- **robots.txt** — replicate verbatim (`00-site-level/robots.txt`).
- **Sitemap structure** — index + 3 children (post / page / taxonomy).
- **`max-image-preview:large, max-snippet:-1, max-video-preview:-1`** — set site-wide;
  it maximizes SERP snippet and image size. Losing it shrinks every listing.

---

## GOOD NEWS — two risks the plan flagged that turned out clean

### 1. Meta is authored, not auto-generated — migration risk is LOW

The concern was that Slim SEO generates meta at render time from page content, which a new
platform could not reproduce.

**91 of 92 pages have their title and description stored explicitly in the
database.** Only `category__uncategorized` lacks stored meta — and that is a category
archive, not a real page.

Stored-vs-rendered drift: **0 real title differences, 1 real description difference.**
(28 titles differ only by `-` vs `–`, which is WordPress's `wptexturize` filter at render time — cosmetic, not drift.)

**Action:** copy the `title` and `meta_description` columns from `seo-map.csv` verbatim. No archaeology needed.

### 2. No desktop/mobile divergence — mobile-first indexing is safe

The server sends `vary: User-Agent` (FlyingPress), so all 92 URLs were fetched twice —
desktop Chrome UA and Googlebot-Smartphone UA — and compared.

- Raw-byte differences: **6** of 92
- **SEO-surface differences (title, every meta tag, canonical, every heading, full body text, all JSON-LD): 0 of 92**

The byte deltas are FlyingPress artifacts only — a `Cached at <timestamp>` comment and
`content-visibility` render hints on the nav. **No cloaking, no content divergence.**

---

## CRITICAL — decide before the new site ships

### Keyword cannibalization — two URLs competing for the same query

Both URLs in each set are indexable with self-referencing canonicals, so Google must pick a
winner and link equity is split. **Record the decision in `redirect-map.csv`** — either
consolidate (301 the weaker into the stronger) or differentiate the targeting.

**Overlapping set (2 URLs)**

- `https://dermasolutions.co.in/gynecomastia-surgery-bengaluru/`
  - post · 2857 words · H1: _Gynecomastia Surgery: What Men Should Know Before Treatment._
- `https://dermasolutions.co.in/gynecomastia-surgery-in-bangalore/`
  - page · 1505 words · H1: _Regain Your Confidence with Gynecomastia Surgery in Bangalore_

**Overlapping set (2 URLs)**

- `https://dermasolutions.co.in/iv-glutathione-treatment-in-bangalore/`
  - page · 2394 words · H1: _Glutathione IV Drip Treatment in Bangalore for Brighter, Healthier Skin!_
- `https://dermasolutions.co.in/iv-glutathione-treatment/`
  - page · 1788 words · H1: _Glutathione IV Drip Treatment in Bangalore for Brighter, Healthier Skin!_

**Overlapping set (2 URLs)**

- `https://dermasolutions.co.in/skin-boosters-treatment-bengaluru/`
  - post · 2866 words · H1: _Skin Boosters for Under-Eye and Face Hydration – A Dermatologist’s Guide to Healthy, Naturally _
- `https://dermasolutions.co.in/skin-boosters-treatment-in-bangalore/`
  - page · 1515 words · H1: _Revitalize Your Skin Naturally with Skin Boosters Treatment in Bangalore_

**Overlapping set (2 URLs)**

- `https://dermasolutions.co.in/weight-loss-injections-bangalore/`
  - post · 2011 words · H1: _Weight Loss Injections: Can They Really Help You Lose Weight Safely and Effectively?_
- `https://dermasolutions.co.in/weight-loss-injections-in-bangalore/`
  - page · 1924 words · H1: _Lose Weight Safely with Doctor-Prescribed Injections in Bangalore_

**Overlapping set (2 URLs)**

- `https://dermasolutions.co.in/xanthelasma-removal-bengaluru/`
  - post · 2879 words · H1: _Xanthelasma Removal: Dermatology and Surgical Options in Bangalore_
- `https://dermasolutions.co.in/xanthelasma-removal-treatment-in-bangalore/`
  - page · 1473 words · H1: _Safe and Effective Xanthelasma Removal Treatment in Bangalore_

### Indexable pages that should not be indexed (1)

- `https://dermasolutions.co.in/maintenance-page/`
  - robots: `max-image-preview:large, max-snippet:-1, max-video-preview:-1` · 292 words · **submitted in sitemap.xml**
  - A page titled “Maintenance Page – Derma Solutions Skin and Hair Clinic” is fully crawlable and indexable. Add `noindex` or remove it.

### Dead asset references in CSS — verified NOT harmful (1)

- `https://dermasolutions.co.in/wp-content/uploads/breakdance/css/icons/eye.svg`
  - Returns **404**, and the string appears in the CSS of all 92 pages.
  - **Verified in a real browser: it is never requested.** It sits in an unused CSS custom
    property (`--bde-woo-quicklook-button-icon`) from Breakdance's WooCommerce defaults, and
    custom properties are only fetched when something actually references them. Nothing does.
  - A live browser load of the homepage recorded **0 failed same-origin requests**.
  - **No action required.** Listed only so a future audit does not re-flag it.

---

## IMPROVE — current weaknesses (optional, not migration blockers)

### Pages missing og:image (55)

**55 of 92 pages have no `og:image`.** Shared on WhatsApp, Facebook or LinkedIn these render as a bare text link with no thumbnail — a real click-through loss for a clinic that gets referrals through messaging apps. All 37 blog posts DO have one; it is the service pages and the homepage that do not.

<details><summary>Affected URLs</summary>

- `https://dermasolutions.co.in/`
- `https://dermasolutions.co.in/abdominoplasty-tummy-tuck-treatment-in-bangalore/`
- `https://dermasolutions.co.in/acne-scar-treatment-in-bangalore/`
- `https://dermasolutions.co.in/best-dermatologist-in-marathahalli-whitefield-bangalore/`
- `https://dermasolutions.co.in/best-hair-loss-treatment-in-bangalore/`
- `https://dermasolutions.co.in/best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore/`
- `https://dermasolutions.co.in/blogs/`
- `https://dermasolutions.co.in/botox-treatment-in-bangalore-whitefield-and-marathahalli/`
- `https://dermasolutions.co.in/breast-surgeries-in-bangalore/`
- `https://dermasolutions.co.in/category/uncategorized/`
- `https://dermasolutions.co.in/chemical-peel-treatment-in-bangalore/`
- `https://dermasolutions.co.in/cosmetic-dermatology-in-bangalore/`
- `https://dermasolutions.co.in/cosmetic-plastic-surgery-in-marathahalli/`
- `https://dermasolutions.co.in/cryolipolysis-coolsculpting-in-bangalore/`
- `https://dermasolutions.co.in/dermal-fillers-treatment-bangalore/`
- `https://dermasolutions.co.in/dr-chandhana-vishal-n-plastic-surgeon/`
- `https://dermasolutions.co.in/dr-sumedha-tirthani-dermatologist/`
- `https://dermasolutions.co.in/dr-thyagaraj-best-plastic-surgeon-in-bangalore/`
- `https://dermasolutions.co.in/ear-lobe-repair-surgery-in-bangalore/`
- `https://dermasolutions.co.in/fractional-co2-laser-skin-resurfacing-in-bangalore/`
- `https://dermasolutions.co.in/gfc-hair-treatment-in-bangalore/`
- `https://dermasolutions.co.in/gynecomastia-surgery-in-bangalore/`
- `https://dermasolutions.co.in/hair-analysis-in-bangalore/`
- `https://dermasolutions.co.in/hair-transplant-in-bangalore-marathahalli-whitefield/`
- `https://dermasolutions.co.in/hifu-treatment-in-bangalore/`
- `https://dermasolutions.co.in/hollywood-facial-carbon-laser-peel-bangalore/`
- `https://dermasolutions.co.in/image-gallery/`
- `https://dermasolutions.co.in/inch-reduction-treatment-in-bangalore/`
- `https://dermasolutions.co.in/iv-glutathione-treatment/`
- `https://dermasolutions.co.in/iv-glutathione-treatment-in-bangalore/`
- `https://dermasolutions.co.in/laser-hair-removal-in-bangalore/`
- `https://dermasolutions.co.in/laser-tattoo-removal-in-bangalore/`
- `https://dermasolutions.co.in/laser-toning-treatment-in-bangalore/`
- `https://dermasolutions.co.in/liposuction-treatment-in-bangalore/`
- `https://dermasolutions.co.in/maintenance-page/`
- `https://dermasolutions.co.in/microdermabrasion-treatment-in-bangalore/`
- `https://dermasolutions.co.in/mnrf-treatment-in-bangalore-microneedling-with-radio-frequency/`
- `https://dermasolutions.co.in/mole-removal-treatment-in-bangalore/`
- `https://dermasolutions.co.in/nad-iv-drips-treatment-in-bangalore/`
- `https://dermasolutions.co.in/phototherapy-treatment-in-bangalore/`
- `https://dermasolutions.co.in/privacy-policy/`
- `https://dermasolutions.co.in/radio-frequency-skin-tightening-treatment/`
- `https://dermasolutions.co.in/rhinoplasty-surgery-in-bangalore/`
- `https://dermasolutions.co.in/salmon-sperm-pdrn-facial-in-bangalore/`
- `https://dermasolutions.co.in/skin-boosters-treatment-in-bangalore/`
- `https://dermasolutions.co.in/skin-lightening-treatment-in-bangalore/`
- `https://dermasolutions.co.in/skin-tightening-treatment-in-marathahalli-whitefield/`
- `https://dermasolutions.co.in/terms-of-use/`
- `https://dermasolutions.co.in/thread-lifts/`
- `https://dermasolutions.co.in/video-gallery/`
- `https://dermasolutions.co.in/vitiligo-laser-treatment-in-bangalore/`
- `https://dermasolutions.co.in/warts-removal-treatment-in-bangalore/`
- `https://dermasolutions.co.in/weight-loss-injections-in-bangalore/`
- `https://dermasolutions.co.in/weight-loss-treatment-in-marathahalli/`
- `https://dermasolutions.co.in/xanthelasma-removal-treatment-in-bangalore/`

</details>

### Duplicate meta titles

_None._

### Duplicate meta descriptions (2)

- **2×** — Planning cosmetic surgery? Learn the essential questions to ask your surgeon about qualifications, risks, recovery, costs, and exp…
- **2×** — Glutathione IV Drip Treatment in Bangalore for Brighter, Healthier Skin! Safe, doctor-supervised IV Glutathione therapy for skin g…

### Duplicate H1s (1)

- **2×** — Glutathione IV Drip Treatment in Bangalore for Brighter, Healthier Skin!

### Titles over 60 chars (SERP truncation) (42)

- **120** — `RF vs HIFU Skin Tightening: What Is the Difference and Which Treatment Is Better? – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/rf-vs-hifu-skin-tightening/
- **98** — `Why Daily Sunscreen Is Your Best Skin Investment | Dermatologist Guide | Derma Solutions Bengaluru`
  https://dermasolutions.co.in/why-daily-sunscreen-is-your-best-skin-investment/
- **97** — `What Is PDRN (Salmon DNA) Facial? Benefits, Results & Who Can Consider It | Dr. Sandeep Mahapatra`
  https://dermasolutions.co.in/pdrn-salmon-dna-facial-benefits/
- **92** — `Botox vs Fillers: Key Differences, Benefits & Which One You Need | Derma Solutions Bengaluru`
  https://dermasolutions.co.in/blog-botox-vs-fillers-difference/
- **85** — `Reconstructive Surgery in Bangalore | Restore Form & Function | Dr. Sandeep Mahapatra`
  https://dermasolutions.co.in/reconstructive-surgery-restoring-form-function-confidence/
- **84** — `MNRF vs CO₂ Laser for Acne Scars: Which Treatment Is Better? | Dr. Sandeep Mahapatra`
  https://dermasolutions.co.in/mnrf-vs-co2-laser-for-acne-scars/
- **81** — `How Dermatologists Treat Acne Scars: A Step-by-Step Guide | Dr. Sandeep Mahapatra`
  https://dermasolutions.co.in/how-dermatologists-treat-acne-scars/
- **81** — `Xanthelasma Removal Treatment in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/xanthelasma-removal-treatment-in-bangalore/
- **79** — `How to Choose the Right Skin Treatment for Dull Skin, Pigmentation & Acne Scars`
  https://dermasolutions.co.in/choose-right-skin-treatment-dull-skin-pigmentation-acne-scars/
- **79** — `Cryolipolysis CoolSculpting in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/cryolipolysis-coolsculpting-in-bangalore/
- **79** — `Skin Boosters vs Dermal Fillers: What's the Difference? | Dr. Sandeep Mahapatra`
  https://dermasolutions.co.in/skin-boosters-vs-dermal-fillers/
- **78** — `Salmon Sperm – PDRN Facial in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/salmon-sperm-pdrn-facial-in-bangalore/
- **77** — `Dr Chandhana Vishal N- Plastic Surgeon – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/dr-chandhana-vishal-n-plastic-surgeon/
- **76** — `Best Hair Loss Treatment in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/best-hair-loss-treatment-in-bangalore/
- **76** — `How to Treat Stubborn Pigmentation: Causes, Melasma & Best Treatment Options`
  https://dermasolutions.co.in/how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin/
- **76** — `Inch Reduction Treatment In Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/inch-reduction-treatment-in-bangalore/
- **76** — `IV Glutathione Treatment in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/iv-glutathione-treatment-in-bangalore/
- **76** — `Weight Loss Treatment In Marathahalli – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/weight-loss-treatment-in-marathahalli/
- **75** — `Ear Lobe Repair Surgery in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/ear-lobe-repair-surgery-in-bangalore/
- **75** — `Skin Boosters Treatment in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/skin-boosters-treatment-in-bangalore/
- **75** — `When Should You Start Anti-Ageing Treatments? A Dermatologist's Perspective`
  https://dermasolutions.co.in/when-should-you-start-anti-ageing-treatments-in-bengaluru/
- **74** — `Dr Sumedha Tirthani – Dermatologist – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/dr-sumedha-tirthani-dermatologist/
- **74** — `How Long Do Dermal Fillers Last? | Complete Guide by Dr. Sandeep Mahapatra`
  https://dermasolutions.co.in/how-long-do-dermal-fillers-last/
- **74** — `NAD IV Drips Treatment in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/nad-iv-drips-treatment-in-bangalore/
- **74** — `Phototherapy for Skin Conditions: When Is It Used? | Dr. Sandeep Mahapatra`
  https://dermasolutions.co.in/phototherapy-for-skin-conditions/
- **74** — `Phototherapy Treatment in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/phototherapy-treatment-in-bangalore/
- **74** — `Weight Loss Injections in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/weight-loss-injections-in-bangalore/
- **73** — `Liposuction Treatment in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/liposuction-treatment-in-bangalore/
- **73** — `VASER Liposuction: Benefits, Procedure & Recovery Guide | Derma Solutions`
  https://dermasolutions.co.in/vaser-liposuction-complete-guide/
- **72** — `Best Treatments for Open Pores and Uneven Skin Texture | Derma Solutions`
  https://dermasolutions.co.in/best-treatments-for-open-pores-and-uneven-skin-texture/
- **72** — `Cosmetic Dermatology in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/cosmetic-dermatology-in-bangalore/
- **72** — `Laser Tattoo Removal in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/laser-tattoo-removal-in-bangalore/
- **72** — `Vitiligo Treatment: Modern Skin Repigmentation Options | Derma Solutions`
  https://dermasolutions.co.in/vitiligo-repigmentation-treatment/
- **71** — `Rhinoplasty Surgery in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/rhinoplasty-surgery-in-bangalore/
- **70** — `How to Choose the Right Skin & Hair Specialist | Dr. Sandeep Mahapatra`
  https://dermasolutions.co.in/choosing-the-right-skin-and-hair-doctor/
- **67** — `Is Laser Treatment Safe for Indian Skin? | Safety, Risks & Benefits`
  https://dermasolutions.co.in/blog-is-laser-treatment-safe-for-indian-skin/
- **66** — `HIFU Treatment in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/hifu-treatment-in-bangalore/
- **65** — `Hair Analysis in Bangalore – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/hair-analysis-in-bangalore/
- **64** — `Weight Loss Injections in Bangalore | Benefits, Results & Safety`
  https://dermasolutions.co.in/weight-loss-injections-bangalore/
- **63** — `IV Glutathione Treatment – Derma Solutions Skin and Hair Clinic`
  https://dermasolutions.co.in/iv-glutathione-treatment/
- **61** — `Wedding Glow Starts Months Before the Big Day | Skin Timeline`
  https://dermasolutions.co.in/how-to-prepare-skin-for-wedding/
- **61** — `HydraFacial vs Chemical Peel: Which Skin Treatment Is Better?`
  https://dermasolutions.co.in/hydrafacial-vs-chemical-peel/

### Titles under 30 chars

_None._

### Meta descriptions over 160 chars (22)

- **249** — https://dermasolutions.co.in/best-treatments-for-open-pores-and-uneven-skin-texture/
- **209** — https://dermasolutions.co.in/phototherapy-for-skin-conditions/
- **208** — https://dermasolutions.co.in/how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin/
- **208** — https://dermasolutions.co.in/skin-boosters-vs-dermal-fillers/
- **201** — https://dermasolutions.co.in/mnrf-vs-co2-laser-for-acne-scars/
- **194** — https://dermasolutions.co.in/choose-right-skin-treatment-dull-skin-pigmentation-acne-scars/
- **192** — https://dermasolutions.co.in/blog-is-laser-treatment-safe-for-indian-skin/
- **187** — https://dermasolutions.co.in/choosing-the-right-skin-and-hair-doctor/
- **187** — https://dermasolutions.co.in/pdrn-salmon-dna-facial-benefits/
- **186** — https://dermasolutions.co.in/how-dermatologists-treat-acne-scars/
- **182** — https://dermasolutions.co.in/weight-loss-injections-bangalore/
- **180** — https://dermasolutions.co.in/why-daily-sunscreen-is-your-best-skin-investment/
- **178** — https://dermasolutions.co.in/reconstructive-surgery-restoring-form-function-confidence/
- **167** — https://dermasolutions.co.in/vaser-liposuction-complete-guide/
- **166** — https://dermasolutions.co.in/blog-botox-vs-fillers-difference/
- **166** — https://dermasolutions.co.in/breast-surgery-specialist-evaluation-before-procedure/
- **166** — https://dermasolutions.co.in/vitiligo-repigmentation-treatment/
- **166** — https://dermasolutions.co.in/what-to-ask-before-cosmetic-surgery/
- **165** — https://dermasolutions.co.in/medical-facial-vs-salon-facial/
- **162** — https://dermasolutions.co.in/how-to-prepare-skin-for-wedding/
- **161** — https://dermasolutions.co.in/cryolipolysis-vs-liposuction-bengaluru/
- **161** — https://dermasolutions.co.in/laser-toning-for-pigmentation/

### Meta descriptions under 70 chars

_None._

### Pages with no H1 (1)

- `https://dermasolutions.co.in/maintenance-page/` — 292 words

### Pages with multiple H1s (5)

- **2×** — `https://dermasolutions.co.in/blog-botox-vs-fillers-difference/`
- **2×** — `https://dermasolutions.co.in/skin-boosters-treatment-bengaluru/`
- **2×** — `https://dermasolutions.co.in/skin-boosters-vs-dermal-fillers/`
- **3×** — `https://dermasolutions.co.in/when-should-you-start-anti-ageing-treatments-in-bengaluru/`
- **2×** — `https://dermasolutions.co.in/why-daily-sunscreen-is-your-best-skin-investment/`

### Thin content (<300 words) (1)

- **292w** — `https://dermasolutions.co.in/maintenance-page/`

### Pages with images missing alt text (12)

- **3/43** missing (93.0% covered) — `https://dermasolutions.co.in/`
- **1/42** missing (97.6% covered) — `https://dermasolutions.co.in/botox-treatment-in-bangalore-whitefield-and-marathahalli/`
- **1/35** missing (97.1% covered) — `https://dermasolutions.co.in/dermal-fillers-treatment-bangalore/`
- **1/29** missing (96.6% covered) — `https://dermasolutions.co.in/fractional-co2-laser-skin-resurfacing-in-bangalore/`
- **1/33** missing (97.0% covered) — `https://dermasolutions.co.in/hifu-treatment-in-bangalore/`
- **1/36** missing (97.2% covered) — `https://dermasolutions.co.in/hollywood-facial-carbon-laser-peel-bangalore/`
- **1/43** missing (97.7% covered) — `https://dermasolutions.co.in/iv-glutathione-treatment-in-bangalore/`
- **1/4** missing (75.0% covered) — `https://dermasolutions.co.in/privacy-policy/`
- **1/35** missing (97.1% covered) — `https://dermasolutions.co.in/salmon-sperm-pdrn-facial-in-bangalore/`
- **1/39** missing (97.4% covered) — `https://dermasolutions.co.in/skin-tightening-treatment-in-marathahalli-whitefield/`
- **1/4** missing (75.0% covered) — `https://dermasolutions.co.in/terms-of-use/`
- **1/32** missing (96.9% covered) — `https://dermasolutions.co.in/thread-lifts/`

### Media library alt text

**534 of 542** media items have alt text (99% coverage) — this is good.
The 8 without are mostly icons and untitled uploads. Full inventory with every alt string
is in `06-media/media-library.json`; carry it across so image SEO is not silently reset to zero.

### No `llms.txt`

`/llms.txt`, `/llm.txt`, `/ai.txt` and `/.well-known/llms.txt` all return 404. Nothing to preserve —
but worth adding on the new build, since AI search surfaces are a growing referral source for clinics.
