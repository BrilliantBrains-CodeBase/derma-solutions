# 16-explore-our-wide-range-of-aesthetic-treatmen

**Zone:** content  ·  **Rendered height:** 1489px @1440  ·  **Appears on 4 page(s)**

## Content

- `<h3>` SERVICES
- `<h2>` Explore our wide range of aesthetic treatments
- `<h3>` Botox And Dermal Fillers
- `<h3>` Laser Skin Or Treatments
- `<h3>` Male Aesthetic Procedures
- `<h3>` Post-Weight Loss Surgery
- `<h3>` Medical Spa & Treatments
- `<h3>` Tighten & Define Neck Contours

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
| 1 | 1400px | 1489px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `elementskit-icon-box` | 6 | icon + heading + copy card — grid cell |
| `heading` | 3 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 1 | `<p>` — font-sans text-body |

## Animation

- **`at-animation-heading-none`** ×2 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.

## Appears on

- `_homepage`
- `home-image`
- `home-slider`
- `home-video`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).