# 06-experience-the-art-of-beauty-with-expert-han

**Zone:** content  ·  **Rendered height:** 750px @1440  ·  **Appears on 7 page(s)**

## Content

- `<h3>` 25YEARS EXPERIENCE
- `<h3>` WHY CHOOSE US
- `<h2>` Experience the art of beauty with expert hands
- `<h3>` Delivering Exceptional Care Expert Treatments, Solutions Your Beauty, Boost Confidence, and Ensure Outstanding Results w
- `<h3>` Contact Us:

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
| 1 | 1400px | 750px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 4 | `<h2>` — font-display, see typography.md for the size at this level |
| `image` | 3 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `text-editor` | 1 | `<p>` — font-sans text-body |
| `icon` | 1 | — |
| `elementskit-icon-box` | 1 | icon + heading + copy card — grid cell |

## Animation

- **`at-animation-heading-none`** ×3 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×1 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md
- **`at-animation-image-style-1`** ×2 — Image wipe — clip-path inset(0 100% 0 0) → inset(0 0% 0 0), 1.5s power2.out, ScrollTrigger top 90%. Pure-CSS replaceable.
- **shiny-glass hover sweep** on 3 element(s) — pure CSS, see 05-animations/animations.md §5

## Appears on

- `_homepage`
- `book-appointment`
- `home-image`
- `home-slider`
- `home-video`
- `services`
- `testimonials`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).