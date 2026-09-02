# 05-transformative-beauty-journeys

**Zone:** content  ·  **Rendered height:** 2936px @1440  ·  **Appears on 9 page(s)**

## Content

- `<h3>` Case Study
- `<h3>` Start Date
- `<h3>` Location
- `<h3>` Client Name
- `<h3>` Duration
- `<h3>` Opening Hours:
- `<h2>` Transformative beauty journeys
- `<h3>` Personal Aesthetic Solutions
- `<h3>` Real Results, Real Confidence
- `<h3>` Expert Procedures
- `<h3>` Ongoing Support & Follow-Up
- `<h2>` Glow up
- `<h3>` Beauty enhance
- `<h2>` Real Transformations, Real Confidence
- `<h3>` Achieve a youthful, natural-looking glow.
- `<h3>` Unlock radiant skin with a natural glow.
- `<h3>` Unlock the secret to timeless beauty.
- `<h3>` Glow from within beauty starts with care.
- `<h2>` Got questions? We've got answers!

## Layout

| property | value | Tailwind |
|---|---|---|
| display | flex | `flex` |
| direction | column | `flex-col` |
| padding | 0px 10px 0px 10px | `px-[10px]` |
| gap | normal | — |
| background | rgba(0, 0, 0, 0) | `transparent (inherits page background)` |
| max-width | 100% | container is **1300px** (`max-w-[1300px] mx-auto px-[15px]`) |
| radius | 0px | — |

## Direct children (the column/grid structure)

| # | width | height | display | grid-template | padding | bg |
|---|---|---|---|---|---|---|
| 1 | 1300px | 2936px | flex | — | 100px 0px 100px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `elementskit-icon-box` | 15 | icon + heading + copy card — grid cell |
| `text-editor` | 4 | `<p>` — font-sans text-body |
| `heading` | 4 | `<h2>` — font-display, see typography.md for the size at this level |
| `image` | 3 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `elementskit-social-media` | 1 | — |
| `glowix-elementor-template` | 1 | — |
| `icon-list` | 1 | `<ul>` with accent bullets |
| `elementskit-accordion` | 1 | — |

## Animation

- **`at-animation-heading-style-3`** ×4 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md
- **`at-animation-image-style-1`** ×2 — Image wipe — clip-path inset(0 100% 0 0) → inset(0 0% 0 0), 1.5s power2.out, ScrollTrigger top 90%. Pure-CSS replaceable.
- **shiny-glass hover sweep** on 2 element(s) — pure CSS, see 05-animations/animations.md §5

## Appears on

- `casestudy__a-smoother-glowing-complexion`
- `casestudy__clear-radiant-skin-guide`
- `casestudy__glow-up-perfect-skin-routine`
- `casestudy__natural-beautiful-results`
- `casestudy__radiant-skin-tips-for-a-glow`
- `casestudy__restoring-post-pregnancy-beauty`
- `casestudy__restoring-youthful-radiance`
- `casestudy__secrets-to-soft-radiant-skin`
- `casestudy__smooth-skin-radiant-glow-tips`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).