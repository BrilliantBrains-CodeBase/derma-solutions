# 24-quick-link

**Zone:** content  ·  **Rendered height:** 475px @1440  ·  **Appears on 1 page(s)**

## Content

- `<h2>` Quick Link
- `<h2>` Services
- `<h2>` Contact Us
- `<h3>` (+22) 123 456 789
- `<h3>` domainname@Gmail.Com
- `<h3>` 123 High Street LN1 1AB Street UK

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
| 1 | 1400px | 475px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 3 | `<h2>` — font-display, see typography.md for the size at this level |
| `ekit-vertical-menu` | 3 | — |
| `elementskit-icon-box` | 3 | icon + heading + copy card — grid cell |
| `image` | 1 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `text-editor` | 1 | `<p>` — font-sans text-body |
| `elementskit-social-media` | 1 | — |
| `elementskit-copyright` | 1 | — |

## Animation

- **`at-animation-heading-none`** ×3 — No animation (explicitly opted out).
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md

## Appears on

- `tpl__footer-layout-2`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).