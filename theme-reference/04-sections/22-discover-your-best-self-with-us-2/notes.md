# 22-discover-your-best-self-with-us-2

**Zone:** content  ·  **Rendered height:** 694px @1440  ·  **Appears on 1 page(s)**

## Content

- `<h3>` WELCOME TO GLOWIX
- `<h2>` DISCOVER YOUR BEST SELF WITH US!
- `<h3>` 4.5

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
| 1 | 1400px | 694px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 3 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 1 | `<p>` — font-sans text-body |
| `button` | 1 | `<a>` — bg-accent text-white rounded-pill px-8 py-4 |
| `elementskit-video` | 1 | video/lightbox trigger (magnific-popup) |
| `elementskit-icon-box` | 1 | icon + heading + copy card — grid cell |
| `rating` | 1 | star rating row |
| `image` | 1 | `<img>` — often inside the wipe reveal; keep rounded-card |

## Animation

- **`at-animation-heading-none`** ×2 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md

## Appears on

- `_homepage`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).