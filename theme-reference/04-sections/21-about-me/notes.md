# 21-about-me

**Zone:** content  ·  **Rendered height:** 1864px @1440  ·  **Appears on 4 page(s)**

## Content

- `<h3>` EXPERT PLASTIC SURGEON
- `<h2>` About me
- `<h2>` Personals info
- `<h2>` Professional skills
- `<h2>` Send a message

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
| 1 | 1300px | 1864px | flex | — | 100px 0px 100px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 5 | `<h2>` — font-display, see typography.md for the size at this level |
| `text-editor` | 4 | `<p>` — font-sans text-body |
| `icon-list` | 3 | `<ul>` with accent bullets |
| `elementskit-progressbar` | 3 | — |
| `image` | 1 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `elementskit-social-media` | 1 | — |
| `elementskit-contact-form7` | 1 | — |

## Animation

- **`at-animation-heading-none`** ×1 — No animation (explicitly opted out).
- **`at-animation-heading-style-2`** ×1 — Heading, per CHAR — gsap.from x:20 autoAlpha:0, dur 1s, delay 0.1s, stagger 0.03, power2.out, start top 85%.
- **`at-animation-heading-style-3`** ×3 — Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.
- **`at-animation-image-style-1`** ×1 — Image wipe — clip-path inset(0 100% 0 0) → inset(0 0% 0 0), 1.5s power2.out, ScrollTrigger top 90%. Pure-CSS replaceable.
- **shiny-glass hover sweep** on 1 element(s) — pure CSS, see 05-animations/animations.md §5

## Appears on

- `our-team__dr-ayesha-kapoor`
- `our-team__dr-cameron-williamson`
- `our-team__dr-neha-verma`
- `our-team__dr-rahul-mehta`

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).