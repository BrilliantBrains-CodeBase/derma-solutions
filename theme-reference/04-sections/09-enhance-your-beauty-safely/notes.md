# 09-enhance-your-beauty-safely

**Zone:** content  ·  **Rendered height:** 3140px @1440  ·  **Appears on 6 page(s)**

## Content

- `<h3>` PROFESSIONAL SERVICES
- `<h3>` Opening Hours:
- `<h2>` Enhance your beauty safely
- `<h3>` Beauty Enhance
- `<h3>` Glow Sculpt
- `<h3>` Age Refine
- `<h2>` Achieve a youthful glow with expert
- `<h3>` Non-Surgical rejuvenation
- `<h3>` Personalized beauty solutions
- `<h3>` Long-lasting radiance
- `<h2>` Got questions? We've got answers!

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
| 1 | 1300px | 3140px | flex | — | 100px 0px 100px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `elementskit-icon-box` | 7 | icon + heading + copy card — grid cell |
| `heading` | 4 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 4 | `<p>` — font-sans text-body |
| `glowix-elementor-template` | 2 | — |
| `image` | 2 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `icon-list` | 1 | `<ul>` with accent bullets |
| `elementskit-video` | 1 | video/lightbox trigger (magnific-popup) |
| `elementskit-accordion` | 1 | — |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).
- **`at-animation-heading-style-3`** ×3 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md
- **`at-animation-image-style-1`** ×1 — Image wipe — clip-path inset(0 100% 0 0) → inset(0 0% 0 0), 1.5s power2.out, ScrollTrigger top 90%. Pure-CSS replaceable.
- **shiny-glass hover sweep** on 1 element(s) — pure CSS, see 05-animations/animations.md §5

## Appears on

- `services__botox-and-dermal-fillers`
- `services__laser-skin-or-treatments`
- `services__male-aesthetic-procedures`
- `services__medical-spa-and-treatments`
- `services__post-weight-loss-surgery`
- `services__tighten-define-neck-contours`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).