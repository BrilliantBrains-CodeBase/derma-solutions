# 15-schedule-your-consultation-today

**Zone:** content  ·  **Rendered height:** 827px @1440  ·  **Appears on 5 page(s)**

## Content

- `<h3>` APPOINTMENT
- `<h2>` Schedule your consultation today!

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
| 1 | 1400px | 827px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 2 | `<h2>` — font-display, see typography.md for the size at this level |
| `image` | 1 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `elementskit-contact-form7` | 1 | — |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md

## Appears on

- `_homepage`
- `about-us`
- `home-image`
- `home-slider`
- `home-video`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).