# 07-discover-your-best-self-with-us

**Zone:** content  ·  **Rendered height:** 765px @1440  ·  **Appears on 7 page(s)**

## Content

- `<h3>` WELCOME TO GLOWIX
- `<h1>` DISCOVER YOUR BEST SELF WITH US!

## Layout

| property | value | Tailwind |
|---|---|---|
| display | flex | `flex` |
| direction | column | `flex-col` |
| padding | 0px 20px 0px 20px | `px-[20px]` |
| gap | normal | — |
| background | rgba(0, 0, 0, 0) | `transparent (inherits page background)` |
| max-width | 100% | container is **1300px** (`max-w-[1300px] mx-auto px-[15px]`) |
| radius | 0px | — |

## Direct children (the column/grid structure)

| # | width | height | display | grid-template | padding | bg |
|---|---|---|---|---|---|---|
| 1 | 1400px | 765px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 2 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 1 | `<p>` — font-sans text-body |
| `button` | 1 | `<a>` — bg-accent text-white rounded-pill px-8 py-4 |
| `elementskit-video` | 1 | video/lightbox trigger (magnific-popup) |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.

## Appears on

- `home-image`
- `home-slider`
- `home-video`
- `elementskit-content__dynamic-content-widget-1690dac-7f784d8`
- `elementskit-content__dynamic-content-widget-1690dac-aa1dc66`
- `elementskit-content__dynamic-content-widget-47f261e-7f784d8`
- `elementskit-content__dynamic-content-widget-47f261e-aa1dc66`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).