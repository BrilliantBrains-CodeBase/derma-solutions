/**
 * Step 4 - derive the real design system from the RESOLVED CASCADE.
 *
 * Why computed styles and not the CSS files: Glowix's values are split across
 * theme CSS, Bootstrap, Elementor global CSS and per-post CSS (post-13.css,
 * post-9.css, ...). Only the browser resolves that cascade correctly, so we
 * read getComputedStyle on real rendered nodes and count what is ACTUALLY
 * painted, then cluster the counts into scales.
 *
 * Demo chrome is network-blocked in pwsetup.js, so the awaikenthemes "Buy Now"
 * green (#D2E761) never enters these samples.
 */
const fs = require('fs');
const { chromium, slugOf, newContext, preparePage } = require('./pwsetup.js');
const B = '/Users/d1/dermasolution/theme-reference';

const COLLECT = () => {
  const out = { type: [], color: [], bg: [], radius: [], shadow: [], space: [],
                container: [], border: [], img: [] };
  const px = v => Math.round(parseFloat(v) || 0);
  const vis = el => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    return s.display !== 'none' && s.visibility !== 'hidden' &&
           parseFloat(s.opacity) > 0.05 && r.width > 0 && r.height > 0;
  };
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el)) continue;
    const s = getComputedStyle(el), tag = el.tagName.toLowerCase();
    const txt = (el.textContent || '').trim();
    const ownText = [...el.childNodes]
      .filter(n => n.nodeType === 3 && n.textContent.trim()).length > 0;

    // typography: only nodes that actually render their own text
    if (ownText && txt.length > 1) {
      out.type.push({
        tag,
        cls: (el.className || '').toString().slice(0, 80),
        family: s.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
        size: px(s.fontSize),
        weight: s.fontWeight,
        lh: s.lineHeight === 'normal' ? 'normal' : px(s.lineHeight),
        ls: s.letterSpacing === 'normal' ? '0' : s.letterSpacing,
        transform: s.textTransform,
        color: s.color,
        sample: txt.slice(0, 60),
      });
      out.color.push(s.color);
    }
    if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') out.bg.push(s.backgroundColor);
    const br = px(s.borderTopLeftRadius);
    if (br > 0) out.radius.push(br);
    if (s.boxShadow && s.boxShadow !== 'none') out.shadow.push(s.boxShadow);
    if (s.borderTopWidth !== '0px' && s.borderTopStyle !== 'none')
      out.border.push(`${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`);
    for (const p of ['paddingTop','paddingBottom','paddingLeft','paddingRight',
                     'marginTop','marginBottom','rowGap','columnGap']) {
      const v = px(s[p]); if (v > 0) out.space.push(v);
    }
    if (/(container|e-con-inner|elementor-container|wrapper)/i.test(el.className || ''))
      out.container.push(px(s.width));
    if (tag === 'img') {
      const r = el.getBoundingClientRect();
      out.img.push({ w: Math.round(r.width), h: Math.round(r.height),
                     radius: px(s.borderTopLeftRadius), fit: s.objectFit,
                     src: (el.currentSrc || el.src || '').slice(-70) });
    }
  }
  out.body = (() => { const s = getComputedStyle(document.body);
    return { family: s.fontFamily, size: s.fontSize, color: s.color, bg: s.backgroundColor,
             lh: s.lineHeight }; })();
  // theme CSS custom properties, straight off :root/body
  out.vars = (() => {
    const r = {}, s = getComputedStyle(document.body);
    for (const n of ['--e-global-color-primary','--e-global-color-secondary',
      '--e-global-color-text','--e-global-color-accent','--e-global-color-white',
      '--e-global-color-black','--e-global-color-divider','--e-global-color-darkdivider',
      '--e-global-color-background','--e-global-typography-primary-font-family',
      '--e-global-typography-text-font-family']) {
      const v = s.getPropertyValue(n).trim(); if (v) r[n] = v;
    }
    return r;
  })();
  return out;
};

(async () => {
  const urls = fs.readFileSync(`${B}/00-inventory/urls-master.txt`, 'utf8')
    .split('\n').map(s => s.trim()).filter(Boolean);
  fs.mkdirSync(`${B}/03-design-system/raw`, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await newContext(browser, 'desktop');
  const page = await ctx.newPage();
  let ok = 0, fail = 0;

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i], s = slugOf(u);
    const dest = `${B}/03-design-system/raw/${s}.json`;
    if (fs.existsSync(dest)) { console.log(`[${i+1}/${urls.length}] SKIP ${s}`); ok++; continue; }
    // scroll:false - computed styles do not need lazy images, and it is ~4x faster
    const r = await preparePage(page, u, { scroll: false });
    if (!r.ok) { console.log(`[${i+1}/${urls.length}] FAIL ${s} :: ${r.error}`); fail++; continue; }
    try {
      const data = await page.evaluate(COLLECT);
      fs.writeFileSync(dest, JSON.stringify(data));
      console.log(`[${i+1}/${urls.length}] ${s.slice(0,48).padEnd(48)} type=${data.type.length} col=${new Set(data.color).size} rad=${new Set(data.radius).size}`);
      ok++;
    } catch (e) {
      console.log(`[${i+1}/${urls.length}] EVAL-FAIL ${s} :: ${String(e).slice(0,110)}`); fail++;
    }
  }
  await browser.close();
  console.log(`\nDESIGN-COLLECT DONE ok=${ok} fail=${fail}`);
})();
