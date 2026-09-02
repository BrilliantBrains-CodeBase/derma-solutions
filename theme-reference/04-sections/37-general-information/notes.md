# 37-general-information

**Zone:** content  ·  **Rendered height:** 2627px @1440  ·  **Appears on 1 page(s)**

## Content

- `<h3>` Opening Hours:
- `<h2>` General information
- `<h2>` Treatment process
- `<h2>` Safety & results
- `<h2>` Aftercare & recovery

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
| 1 | 1300px | 2627px | flex | — | 100px 0px 100px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 4 | `<h2>` — font-display, see typography.md for the size at this level |
| `elementskit-accordion` | 4 | — |
| `icon-list` | 1 | `<ul>` with accent bullets |
| `glowix-elementor-template` | 1 | — |
| `image` | 1 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `elementskit-icon-box` | 1 | icon + heading + copy card — grid cell |

## Animation

- **`at-animation-heading-style-3`** ×4 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md

## Appears on

- `faqs`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).