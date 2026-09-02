# 02-site-footer

**Zone:** footer  ·  **Rendered height:** 718px @1440  ·  **Appears on 45 page(s)**

## Content

- `<h2>` Our latest insights on plastic surgery & skincare
- `<h2>` Quick Link
- `<h2>` Open Hours:
- `<h3>` Mon-Sat: 10:00 To 07:00
- `<h3>` Saturday-Closed
- `<h2>` Contact:
- `<h3>` (+22) 123 456 789
- `<h2>` E-mail:
- `<h3>` domainname@Gmail.Com
- `<h2>` Address:
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
| 1 | 1400px | 718px | flex | — | 0px 0px 0px 0px | rgba(0, 0, 0, 0) |

## Widgets

| widget | n | rebuild note |
|---|---|---|
| `heading` | 6 | `<h2>` — font-display, see typography.md for the size at this level |
| `elementskit-icon-box` | 5 | icon + heading + copy card — grid cell |
| `ekit-vertical-menu` | 2 | — |
| `elementskit-contact-form7` | 1 | — |
| `image` | 1 | `<img>` — often inside the wipe reveal; keep rounded-card |
| `text-editor` | 1 | `<p>` — font-sans text-body |
| `elementskit-social-media` | 1 | — |
| `elementskit-copyright` | 1 | — |

## Animation

- **`at-animation-heading-none`** ×6 — No animation (explicitly opted out).
- **`at-animation-image-none`** ×1 — see 05-animations/animations.md

## Appears on

- `_homepage`
- `404`
- `about-us`
- `blog`
- `book-appointment`
- `casestudy`
- `choose-a-qualified-surgeon-for-safe`
- `contact-us`
- `faqs`
- `follow-pre-surgery-guidelines-to-ensure-a-smooth`
- `home-image`
- `home-slider`
- `home-video`
- `image-gallery`
- `maintain-a-healthy-lifestyle-for-better-healing`
- `myths-and-facts-about-plastic-surgery`
- `our-team`
- `services`
- `testimonials`
- `top-tips-for-preparing-for-plastic-surgery`
- `video-gallery`
- `what-to-expect-during-your-first-consultation`
- `casestudy__a-smoother-glowing-complexion`
- `casestudy__clear-radiant-skin-guide`
- `casestudy__glow-up-perfect-skin-routine`
- …and 20 more

---

Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · `screenshot.png` (isolated, desktop 1440).