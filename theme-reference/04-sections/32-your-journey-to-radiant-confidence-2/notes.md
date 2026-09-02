# 32-your-journey-to-radiant-confidence-2

**Zone:** content  ·  **Rendered height:** 837px @1440  ·  **Appears on 1 page(s)**

## Content

- `<h3>` OUR JOURNEY
- `<h2>` Your journey to radiant confidence
- `<h3>` Shaping The Future Of Aesthetics
- `<h3>` Where Passion Meets Perfection

## Layout

| property | value | Tailwind |
|---|---|---|
| display | flex | `flex` |
| direction | column | `flex-col` |
| padding | 0px 20px 0px 20px | `px-[20px]` |
| gap | 20px | `gap-[20px]` |
| background | rgba(0, 0, 0, 0) | `transparent (inherits page background)` |
| max-width | 100% | container is **1300px** (`max-w-[1300px] mx-auto px-[15px]`) |
| radius | 0px | — |

## Direct children (the column/grid structure)

| # | width | height | display | grid-template | padding | bg |
|---|---|---|---|---|---|---|
| 1 | 1400px | 837px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `image` | 3 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `heading` | 2 | `<h2>` — font-display, see typography.md for the size at this level |
| `elementskit-icon-box` | 2 | icon + heading + copy card — grid cell |
| `text-path` | 1 | SVG text-on-path — circular badge label |
| `icon-list` | 1 | `<ul>` with accent bullets |
| `button` | 1 | `<a>` — bg-accent text-white rounded-pill px-8 py-4 |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-style-1`** ×3 — Image wipe — clip-path inset(0 100% 0 0) → inset(0 0% 0 0), 1.5s power2.out, ScrollTrigger top 90%. Pure-CSS replaceable.
- **shiny-glass hover sweep** on 3 element(s) — pure CSS, see 05-animations/animations.md §5

## Appears on

- `about-us`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).