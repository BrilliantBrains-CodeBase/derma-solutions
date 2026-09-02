# 12-transforming-beauty-confidence

**Zone:** content  ·  **Rendered height:** 871px @1440  ·  **Appears on 5 page(s)**

## Content

- `<h3>` WHAT WE DO
- `<h2>` Transforming beauty confidence

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
| 1 | 1300px | 871px | flex | — | 100px 0px 100px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `image` | 2 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `heading` | 2 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 1 | `<p>` — font-sans text-body |
| `icon-list` | 1 | `<ul>` with accent bullets |
| `button` | 1 | `<a>` — bg-accent text-white rounded-pill px-8 py-4 |
| `counter` | 1 | animated number counter |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md
- **`at-animation-image-style-1`** ×1 — Image wipe — clip-path inset(0 100% 0 0) → inset(0 0% 0 0), 1.5s power2.out, ScrollTrigger top 90%. Pure-CSS replaceable.
- **shiny-glass hover sweep** on 1 element(s) — pure CSS, see 05-animations/animations.md §5

## Appears on

- `_homepage`
- `about-us`
- `home-image`
- `home-slider`
- `home-video`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).