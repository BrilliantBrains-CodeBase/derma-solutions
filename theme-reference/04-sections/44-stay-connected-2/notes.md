# 44-stay-connected-2

**Zone:** content  ·  **Rendered height:** 621px @1440  ·  **Appears on 1 page(s)**

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
| padding | 0px 0px 0px 0px | `no padding` |
| gap | normal | — |
| background | rgba(255, 255, 255, 0) | `rgba(255, 255, 255, 0)` |
| max-width | 100% | container is **1300px** (`max-w-[1300px] mx-auto px-[15px]`) |
| radius | 0px | — |

## Direct children (the column/grid structure)

| # | width | height | display | grid-template | padding | bg |
|---|---|---|---|---|---|---|
| 1 | 1300px | 621px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `elementskit-icon-box` | 3 | icon + heading + copy card — grid cell |
| `divider` | 3 | — |
| `heading` | 1 | `<h2>` — font-display, see typography.md for the size at this level |
| `elementskit-social-media` | 1 | — |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).

## Appears on

- `elementskit-content__dynamic-content-widget-2548a92-99`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).