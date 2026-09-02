# 30-stay-connected

**Zone:** content  ·  **Rendered height:** 107px @1440  ·  **Appears on 1 page(s)**

## Content

- `<h3>` Phone
- `<h3>` Email
- `<h3>` Address
- `<h2>` Stay Connected

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
| 1 | 1400px | 107px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `elementskit-icon-box` | 3 | icon + heading + copy card — grid cell |
| `divider` | 3 | — |
| `glowix-site-logo` | 1 | site logo |
| `ekit-nav-menu` | 1 | primary navigation |
| `elementskit-header-search` | 1 | — |
| `elementskit-header-offcanvas` | 1 | — |
| `heading` | 1 | `<h2>` — font-display, see typography.md for the size at this level |
| `elementskit-social-media` | 1 | — |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).

## Appears on

- `tpl__header-layout-4`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).