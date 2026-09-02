// Validate the animation freeze BEFORE committing to a full screenshot run.
const { chromium, newContext, preparePage } = require('./pwsetup.js');
const URL = process.argv[2] || 'https://demo.awaikenthemes.com/glowix/';

(async () => {
  const browser = await chromium.launch();
  const ctx = await newContext(browser, 'desktop');
  const page = await ctx.newPage();

  // --- BEFORE: measure the raw page, no fixes at all ---
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1500);
  const before = await page.evaluate(() => {
    const els = [...document.querySelectorAll('body *')];
    const hidden = els.filter(e => {
      const s = getComputedStyle(e);
      return parseFloat(s.opacity) < 0.05 && e.getBoundingClientRect().height > 20;
    });
    return { total: els.length, hidden: hidden.length,
             invisible: document.querySelectorAll('.elementor-invisible').length,
             gsap: !!window.gsap, st: !!window.ScrollTrigger };
  });

  // --- AFTER: full preparation ---
  const r = await preparePage(page, URL);
  const after = await page.evaluate(() => {
    const els = [...document.querySelectorAll('body *')];
    const hidden = els.filter(e => {
      const s = getComputedStyle(e);
      return parseFloat(s.opacity) < 0.05 && e.getBoundingClientRect().height > 20;
    });
    return { total: els.length, hidden: hidden.length,
             invisible: document.querySelectorAll('.elementor-invisible').length,
             chrome: document.querySelectorAll('.explore_theme_panel,.ath-license-notice,.btn-buynow').length,
             height: document.body.scrollHeight,
             sample: hidden.slice(0, 6).map(e => e.tagName + '.' + (e.className || '').toString().slice(0, 60)) };
  });

  console.log('prepare:', JSON.stringify(r));
  console.log('BEFORE :', JSON.stringify(before));
  console.log('AFTER  :', JSON.stringify(after, null, 1));
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-d1-dermasolution/38df1112-72f0-4c73-8c8f-06ab3bf72db0/scratchpad/freeze-probe.png', fullPage: true, animations: 'disabled', scale: 'css' });
  await browser.close();
})();
