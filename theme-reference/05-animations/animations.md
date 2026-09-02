# Animations — exact specs

Every effect below was read out of the theme's own
`assets/js/function.js` (copied here verbatim) and `style.css`, not inferred
from watching the page. Library stack:

| Library | Version | Purpose |
|---|---|---|
| GSAP | bundled with theme | all scroll/text animation |
| ScrollTrigger | bundled | scroll-linked triggers |
| SplitText | bundled | per-char / per-word heading splits |
| SmoothScroll.js | bundled | inertia scrolling — **recommend dropping** |
| magiccursor.js | bundled | custom cursor ball — **recommend dropping** |
| Swiper | 8.4.5 | sliders / testimonials |
| Isotope | pkgd | portfolio filtering |

> **GSAP licensing:** SplitText and ScrollTrigger were GSAP "Club" plugins.
> Confirm current licence terms before shipping, or use the CSS/JS alternatives
> noted per effect below.

---

## 1. Image reveal — left-to-right wipe

Trigger class: `.at-animation-image-style-1 img`

```css
/* initial state, from style.css:329 */
.at-animation-image-style-1 img { clip-path: inset(0 100% 0 0); }
```
```js
gsap.to(img, {
  clipPath: "inset(0 0% 0 0)",
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: { trigger: img, start: "top 90%", toggleActions: "play none none none" }
});
```

**Rebuild without GSAP** — this one is pure CSS:

```css
.reveal-wipe { clip-path: inset(0 100% 0 0); transition: clip-path 1.5s cubic-bezier(.22,.61,.36,1); }
.reveal-wipe.is-visible { clip-path: inset(0 0% 0 0); }
```
Toggle `.is-visible` with a single `IntersectionObserver` at `rootMargin: "0px 0px -10% 0px"`
(equivalent to ScrollTrigger's `top 90%`). Fires once — matches `toggleActions: play none none none`.

---

## 2. Heading style 1 — word-by-word fade + slide

Trigger class: `.at-animation-heading-style-1` (on the heading's wrapper)

```js
new SplitText(element, { type: "chars, words" });
gsap.from(split.words, {
  duration: 1, delay: 0.5, x: 20, autoAlpha: 0, stagger: 0.05,
  scrollTrigger: { trigger: element, start: "top 85%" }
});
```

| property | value |
|---|---|
| unit | **words** |
| duration | 1s |
| delay | 0.5s |
| from x | 20px |
| from opacity | 0 (`autoAlpha` also sets `visibility`) |
| stagger | 0.05s |
| ease | default (`power1.out`) |
| start | `top 85%` |

---

## 3. Heading style 2 — character-by-character, faster

Trigger class: `.at-animation-heading-style-2`

```js
new SplitText(element, { type: "chars, words" });
gsap.from(split.chars, {
  duration: 1, delay: 0.1, x: 20, autoAlpha: 0,
  stagger: 0.03, ease: "power2.out",
  scrollTrigger: { trigger: element, start: "top 85%" }
});
```

Same as style 1 but per **character**, `delay: 0.1`, `stagger: 0.03`, `ease: power2.out`.

---

## 4. Heading style 3 — 3D character rotate-in

Trigger class: `.at-animation-heading-style-3`

```js
element.split = new SplitText(element, { type: "lines,words,chars", linesClass: "split-line" });
gsap.set(element, { perspective: 400 });
gsap.set(element.split.chars, { opacity: 0, x: 50 });

gsap.to(element.split.chars, {
  x: 0, y: 0, rotateX: 0, opacity: 1,
  duration: 1, ease: Back.easeOut, stagger: 0.02,
  scrollTrigger: { trigger: element, start: "top 90%" }
});
```

| property | value |
|---|---|
| unit | **characters** (lines wrapped in `.split-line`) |
| perspective | 400px on the parent |
| from | `opacity: 0, x: 50` |
| to | `x/y/rotateX: 0, opacity: 1` |
| duration | 1s · stagger 0.02s · ease `Back.easeOut` |
| start | `top 90%` |

---

## 5. Shiny glass hover sweep — pure CSS

Applied to `.at-shiny-glass-effect` and `.at-blog-shiny-glass-effect` (cards, image tiles).

```css
.at-shiny-glass-effect { position: relative; overflow: hidden; }
.at-shiny-glass-effect::after {
  content: ''; position: absolute;
  width: 200%; height: 0%;
  left: 50%; top: 50%;
  background-color: rgba(255,255,255,.3);
  transform: translate(-50%,-50%) rotate(-45deg);
  z-index: 1;
}
.at-shiny-glass-effect:hover::after {
  height: 250%;
  background-color: transparent;
  transition: all 600ms linear !important;
}
```

A 45°-rotated white bar grows from 0 → 250% height while fading out — reads as a
diagonal gloss sweep. **Port as-is**, no JS needed.

---

## 6. Elementor entrance animations

Elementor adds `.elementor-invisible` (`opacity: 0`) plus `animated fadeInUp`
from `lib/animations/styles/fadeInUp.min.css`. Standard, replaceable with the
same IntersectionObserver used for effect 1.

---

## 7. Isotope portfolio filter

`#awaiken-portfolio .awaiken-portfolio-grid` — masonry layout with
category filter buttons. Modern replacement: CSS grid + a filter that toggles
`hidden`, or `<dialog>`-free View Transitions. Isotope is jQuery-dependent.

---

## Recommended drops

### `SmoothScroll.js` — drop
Inertia/momentum hijacking of native scroll. It breaks scroll-anchoring, harms
Core Web Vitals (INP), fights screen readers and browser find-in-page, and is a
common accessibility complaint. Native scrolling plus
`scroll-behavior: smooth` on anchor jumps covers the intent.

### `magiccursor.js` — drop
Replaces the system cursor with a 34×34 trailing ball (`opacity 0.5`,
`border 2px`, follow `ratio 0.15`), desktop-only above 1024px, gated on
`body.tt-magic-cursor:not(.is-mobile)`.

For a **medical clinic** this is the wrong trade: it hides the real cursor,
adds a rAF loop on every mouse move, and degrades precision for older or
motor-impaired visitors — a core part of this audience.

### Honour `prefers-reduced-motion`
None of the effects above check it. The rebuild must:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal-wipe { clip-path: none; }
}
```

---

## Capture note

`_demo-panel-EXCLUDED.js` is awaikenthemes' **demo-site chrome** — a floating
"Buy Now" panel and licence notice injected at runtime from the parent domain.
It is *not* part of the Glowix theme. It is network-blocked during capture
(see `_logs/pwsetup.js`) and is stored here only so it stays recognisable as
something to exclude. Its green `#D2E761` is not a Glowix brand colour.
