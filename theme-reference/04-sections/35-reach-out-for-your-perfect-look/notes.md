# 35-reach-out-for-your-perfect-look

**Zone:** content  ·  **Rendered height:** 440px @1440  ·  **Appears on 1 page(s)**

## Content

- `<h2>` Reach out for your perfect look!
- `<h3>` Location
- `<h3>` Contact Us
- `<h3>` Email

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
| 1 | 1300px | 440px | flex | — | 100px 0px 50px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `elementskit-icon-box` | 3 | icon + heading + copy card — grid cell |
| `heading` | 1 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 1 | `<p>` — font-sans text-body |

## Animation

- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.

## Appears on

- `contact-us`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).