# 13-simple-steps-to-stunning-transformations

**Zone:** content  ·  **Rendered height:** 810px @1440  ·  **Appears on 5 page(s)**

## Content

- `<h3>` HOW IT WORK
- `<h2>` Simple steps to stunning transformations
- `<h3>` 01. Comprehensive Consultation
- `<h3>` 02. Personalized Treatment Plan
- `<h3>` 03. Expert Procedures
- `<h3>` 04. Ongoing Support & Follow-Up

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
| 1 | 1300px | 810px | flex | — | 100px 0px 100px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `elementskit-icon-box` | 4 | icon + heading + copy card — grid cell |
| `heading` | 2 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 1 | `<p>` — font-sans text-body |
| `button` | 1 | `<a>` — bg-accent text-white rounded-pill px-8 py-4 |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.

## Appears on

- `_homepage`
- `home-image`
- `home-slider`
- `home-video`
- `services`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).