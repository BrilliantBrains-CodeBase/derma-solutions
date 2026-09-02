# 18-our-remarkable-transformation

**Zone:** content  ·  **Rendered height:** 1030px @1440  ·  **Appears on 4 page(s)**

## Content

- `<h3>` CASE STUDY'S
- `<h2>` Our remarkable transformatioN
- `<h4>` Restoring Youthful Radiance
- `<h4>` Natural & Beautiful Results
- `<h4>` Restoring Post-Pregnancy Beauty
- `<h4>` A Smoother, Glowing Complexion

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
| 1 | 1300px | 1030px | flex | — | 100px 0px 70px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 2 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 1 | `<p>` — font-sans text-body |
| `button` | 1 | `<a>` — bg-accent text-white rounded-pill px-8 py-4 |
| `glowix-casestudy-grid` | 1 | — |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.

## Appears on

- `_homepage`
- `home-image`
- `home-slider`
- `home-video`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).