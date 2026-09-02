/**
 * Shared Playwright page preparation for the Glowix capture.
 * Used by shoot.js, extract_design.js and extract_sections.js so all three
 * see an identical, fully-settled page.
 *
 * Five hazards this neutralises, in order of how badly they break capture:
 *  1. awaikenthemes demo chrome  - a floating "Buy Now" panel + license notice
 *     injected at runtime by theme-panel-dynamic.js (served from the PARENT
 *     domain, not /glowix/). It is not part of the theme and must never appear
 *     in a screenshot or pollute a colour sample. Blocked at the network layer.
 *  2. GSAP ScrollTrigger / SplitText - sections start at opacity:0 with inline
 *     transforms. CSS !important cannot beat GSAP's inline styles, so we drive
 *     the tweens to completion through the GSAP API instead.
 *  3. Elementor's own entrance animations - `.elementor-invisible` pins
 *     opacity:0 until a widget scrolls into view.
 *  4. SmoothScroll.js + magiccursor.js - both corrupt full-page stitching.
 *  5. Lazy images / lazy backgrounds - blank boxes unless forced to load.
 */

const PW = '/Users/d1/.npm/_npx/db89d7302a373f10/node_modules/playwright';
const { chromium } = require(PW);

const BASE = 'https://demo.awaikenthemes.com/glowix/';

const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' },
  tablet:  { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
  mobile:  { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
};

// Demo chrome selectors, harvested from theme-panel-dynamic.js itself.
const CHROME_SEL = [
  '.explore_theme_panel', '.ath-license-notice', '.ath-license-notice-inner',
  '.btn-buynow', '.btn-doc', '.cta-badge', '.cta-btn', '.cta-headline',
  '.cta-sub', '.offer-animated-arrow', '.html-popup-close',
].join(',');

const FIX_CSS = `
  *,*::before,*::after{animation:none!important;transition:none!important;
    animation-duration:0s!important;transition-duration:0s!important;
    animation-delay:0s!important;transition-delay:0s!important;
    scroll-behavior:auto!important}
  .elementor-invisible{opacity:1!important;visibility:visible!important}
  [class*="cookie"],[class*="Cookie"],[role="dialog"],.modal,.mfp-bg,.mfp-wrap{display:none!important}
  ${CHROME_SEL}{display:none!important}
  html,body{overflow:visible!important;height:auto!important;scroll-behavior:auto!important}
  body{cursor:auto!important}
  .magic-cursor,.ball,#magic-cursor,#ball{display:none!important}
  img{opacity:1!important}
`;

const slugOf = (u) => {
  let p = u.replace(BASE, '');
  if (p.startsWith('?elementskit_template=')) return 'tpl__' + p.split('=')[1];
  p = p.replace(/\/$/, '');
  return p === '' ? '_homepage' : p.replace(/\//g, '__');
};

async function newContext(browser, kind) {
  const ctx = await browser.newContext({
    ...VIEWPORTS[kind], ignoreHTTPSErrors: true, javaScriptEnabled: true,
    reducedMotion: 'reduce', colorScheme: 'light',
  });
  ctx.setDefaultTimeout(60000);
  // Hazard 1: kill the demo panel before it can execute.
  await ctx.route('**/theme-panel-dynamic.js', r => r.abort());
  await ctx.route('**/assets/js/theme-panel*', r => r.abort());
  return ctx;
}

/** Navigate and fully settle a page. Returns {ok, error}. */
async function preparePage(page, url, { scroll = true } = {}) {
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 160) };
  }
  await page.addStyleTag({ content: FIX_CSS }).catch(() => {});

  // Hazards 2-4: drive animations to their END state via the GSAP API.
  await page.evaluate(() => {
    const g = window.gsap;
    if (g) {
      try { g.globalTimeline.progress(1); } catch {}
      try {
        (window.ScrollTrigger || g.core?.globals?.().ScrollTrigger)
          ?.getAll?.().forEach(t => {
            try { t.animation && t.animation.progress(1); } catch {}
            try { t.disable(false); } catch {}
          });
      } catch {}
      // Anything GSAP parked at opacity 0 that the above missed.
      try {
        document.querySelectorAll('[style*="opacity"]').forEach(el => {
          if (parseFloat(el.style.opacity) === 0) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
          }
        });
      } catch {}
    }
    document.querySelectorAll('.elementor-invisible')
      .forEach(e => e.classList.remove('elementor-invisible'));
    // Elementor entrance classes leave elements mid-animation.
    document.querySelectorAll('.animated').forEach(e => {
      e.style.opacity = '1'; e.style.transform = 'none';
    });
    // Smooth scroll + magic cursor corrupt full-page stitching.
    try { window.SmoothScroll = null; } catch {}
    document.querySelectorAll('.magic-cursor,#magic-cursor,.ball,#ball')
      .forEach(e => e.remove());
  }).catch(() => {});

  if (scroll) {
    // Hazard 5: force every lazy asset by step-scrolling the full height.
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach(i => i.loading = 'eager');
      document.querySelectorAll('img[data-src]').forEach(i => {
        if (!i.src || i.src.startsWith('data:')) i.src = i.dataset.src;
      });
      document.querySelectorAll('[data-bg],[data-background]').forEach(e => {
        const v = e.dataset.bg || e.dataset.background;
        if (v) e.style.backgroundImage = `url(${v})`;
      });
      await new Promise(res => {
        let y = 0;
        const t = setInterval(() => {
          window.scrollTo(0, y); y += 400;
          if (y > document.body.scrollHeight + 1200) {
            clearInterval(t); window.scrollTo(0, 0); res();
          }
        }, 55);
      });
    }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 25000 }).catch(() => {});
  }

  // Re-assert after lazy pass: scrolling can retrigger ScrollTrigger.
  await page.evaluate(() => {
    try { window.gsap && window.gsap.globalTimeline.progress(1); } catch {}
    document.querySelectorAll('.elementor-invisible')
      .forEach(e => e.classList.remove('elementor-invisible'));
    document.querySelectorAll('[style*="opacity"]').forEach(el => {
      if (parseFloat(el.style.opacity) === 0) el.style.opacity = '1';
    });
    window.scrollTo(0, 0);
  }).catch(() => {});
  await page.waitForTimeout(700);
  return { ok: true };
}

module.exports = { chromium, BASE, VIEWPORTS, FIX_CSS, CHROME_SEL, slugOf, newContext, preparePage };
