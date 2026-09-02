# Glowix — Design Reference

**Source:** `https://demo.awaikenthemes.com/glowix/` · **Captured:** 2026-09-02

This folder is the **visual and structural specification** for the new Derma Solutions
website. It is the counterpart to [`../seo-backup/`](../seo-backup/):

| Folder | Answers |
|---|---|
| `../seo-backup/` | *What must we preserve?* — the live site's 92 URLs, copy, SEO, rankings |
| **`theme-reference/`** (this one) | *What will the new site look like?* — the Glowix theme, decomposed |

It is complete enough that the rebuild never needs to visit the demo site again.

---

## Read this first: there is no Tailwind to copy

The Glowix demo is **WordPress + Elementor 4.2.3 + ElementsKit 4.0.1 + Bootstrap 5**
with a custom theme. It contains **zero Tailwind**.

So this reference does not copy a Tailwind config — it **derives** one. Design values
were read from the *resolved cascade* (`getComputedStyle` on real rendered nodes across
all 58 pages), because the values are split across theme CSS, Bootstrap, Elementor
global CSS and per-post CSS. Only a browser resolves that correctly.

The result validated cleanly: across **3,011 rendered text nodes** the site uses
exactly **5 text colours and 5 background colours**, and every one matches the theme's
own declared tokens. Nothing was guessed.

---

## Start here

| I want to… | Open |
|---|---|
| Drop tokens into the Vite app | `03-design-system/tokens.css` (Tailwind v4 `@theme`) |
| …on Tailwind v3 instead | `03-design-system/tailwind.config.ts` |
| See the real type scale | `03-design-system/typography.md` |
| See the palette and where each colour is used | `03-design-system/colors.md` |
| **Rebuild a section** | `04-sections/<NN>-<name>/notes.md` |
| Know which sections a page is made of | `08-pages/page-section-map.json` |
| Reproduce an animation exactly | `05-animations/animations.md` |
| See a whole page | `07-screenshots/desktop/<slug>.png` |
| Re-author copy | `02-content/<slug>.md` |
| Find an image + its alt text | `06-assets/manifest.json` |
| Check nothing is corrupt | `python3 _logs/verify.py` |

---

## The design system

Straight from the theme's own `assets/css/css-variable.css`, confirmed by measurement:

| Token | Hex | Used for |
|---|---|---|
| `primary` | `#481E0B` | headings, dark section backgrounds |
| `secondary` | `#FCF4F1` | alternating light section background |
| `accent` | `#CD5F37` | CTAs, eyebrow labels, icons |
| `text` | `#69615D` | paragraph body copy |
| `divider` | `#CD5F371A` | hairlines on light |
| `divider-dark` | `#FFFFFF1A` | hairlines on dark |

**Fonts** — `Marcellus` (headings, 400 only) + `Sora` (body, 100–800). Both self-hosted
as woff2 in `03-design-system/fonts/`, so the rebuild makes no Google Fonts request.

**Layout** — container `max-width: 1300px`, `padding: 0 15px`. Spacing follows a **5px
base grid** (10/15/20/25/30/40/50/60/80/100/120). Radii cluster at **50, 30, 100, 40, 20, 10**;
buttons are `100px` (pill), inputs `40px`, cards `20px`.

---

## Two things deliberately excluded

**1. awaikenthemes demo chrome.** The demo injects a floating "Buy Now" panel and
licence notice at runtime from `theme-panel-dynamic.js` on the *parent* domain. It is
not part of the theme. It is network-blocked during capture (`_logs/pwsetup.js`), which
is why its green `#D2E761` appears nowhere in the tokens. Firecrawl's automatic
`branding` extractor **was** fooled by it — one reason this reference trusts measurement
over inference.

**2. `SmoothScroll.js` and `magiccursor.js`.** Captured and documented, but recommended
for removal — see `05-animations/animations.md`. Both are accessibility and
performance liabilities on a medical site.

---

## Known issues in the source theme — do not clone these

- **No `<h1>` on the homepage.** 24 `<h2>`s and no `<h1>`. The 404 page has the only
  real `<h1>`. Fix in the rebuild; the SEO backup work makes this worth getting right.
- **No `prefers-reduced-motion` handling anywhere.** Every GSAP effect runs regardless.
- **GSAP SplitText / ScrollTrigger licensing** — confirm terms before shipping, or use
  the CSS/IntersectionObserver equivalents given in `05-animations/animations.md`.

---

## Asset licensing

Every file in `06-assets/` is tagged `"licence": "reference-only"` in
`06-assets/manifest.json`. These images belong to the theme vendor. They are here so
layout, crop, aspect ratio and art direction can be matched — **they must be replaced
with Derma Solutions' own photography before launch.**

---

## How it was captured

| Tool | Used for | Why |
|---|---|---|
| `curl --compressed` | raw HTML | pre-render source of truth. `--compressed` is mandatory — without it the CDN returns raw gzip and every parse silently matches nothing |
| WP REST API | page/post/media records | open on this install; gives alt text, dimensions, IDs |
| Firecrawl CLI | clean markdown | best-in-class content extraction. 60 credits |
| Playwright + Chromium | screenshots, computed styles, section decomposition | the only tool that can drive GSAP to completion before capturing |

**Why Playwright and not a screenshot service:** the theme animates sections in from
`opacity: 0` via GSAP ScrollTrigger/SplitText. A naive full-page capture returns blank
heroes, and CSS `!important` cannot beat GSAP's inline styles. The fix runs
`gsap.globalTimeline.progress(1)` through the page's own GSAP instance — which requires
JS execution in the page. Measured effect on the homepage: **354 hidden elements → 4**
(the 4 being nav dropdowns, correctly hidden).

---

## Re-running

Every script in `_logs/` is idempotent and skips completed work.

```bash
cd /Users/d1/dermasolution/theme-reference

python3 _logs/build_inventory.py       # 1. freeze the URL list
python3 _logs/fetch_html.py            # 2. raw HTML
./_logs/fc_scrape.sh                   # 3. markdown (paced 7s: limit is 10 req/min)
node    _logs/extract_design.js        # 4a. computed styles, all pages
python3 _logs/build_tokens.py          # 4b. -> tokens.css / tailwind.config.ts
node    _logs/extract_sections.js      # 5a. decompose into unique sections
python3 _logs/build_section_notes.py   # 5b. name them + write notes.md
python3 _logs/fetch_assets.py          # 7. images, icons, self-hosted fonts
node    _logs/shoot.js                 # 8. screenshots (or: shoot.js desktop)
python3 _logs/build_manifest.py        # 9a. MANIFEST.json
python3 _logs/verify.py                # 9b. must exit 0
```

`_logs/pwsetup.js` is shared by all three Playwright steps, so screenshots, computed
styles and section extraction all see an identical, fully-settled page.
