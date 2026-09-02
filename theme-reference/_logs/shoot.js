/**
 * Step 8 - full-page screenshots at 1440 / 768 / 390.
 * All animation/lazy/demo-chrome handling lives in pwsetup.js.
 * Idempotent: skips any capture already on disk above the size floor.
 *
 *   node _logs/shoot.js            # all three viewports
 *   node _logs/shoot.js desktop    # one viewport
 */
const fs = require('fs'), path = require('path');
const { chromium, VIEWPORTS, slugOf, newContext, preparePage } = require('./pwsetup.js');

const B = '/Users/d1/dermasolution/theme-reference';
const MIN_BYTES = 20000;   // below this a full-page capture is almost certainly blank

(async () => {
  const urls = fs.readFileSync(`${B}/00-inventory/urls-master.txt`, 'utf8')
    .split('\n').map(s => s.trim()).filter(Boolean);
  const kinds = process.argv[2] ? [process.argv[2]] : Object.keys(VIEWPORTS);
  const browser = await chromium.launch({ args: ['--hide-scrollbars', '--disable-web-security'] });
  const report = {};

  for (const kind of kinds) {
    const dir = `${B}/07-screenshots/${kind}`;
    fs.mkdirSync(dir, { recursive: true });
    const ctx = await newContext(browser, kind);
    const page = await ctx.newPage();

    for (let i = 0; i < urls.length; i++) {
      const u = urls[i], s = slugOf(u), out = `${dir}/${s}.png`;
      if (fs.existsSync(out) && fs.statSync(out).size > MIN_BYTES) {
        console.log(`[${kind} ${i + 1}/${urls.length}] SKIP ${s}`);
        continue;
      }
      const r = await preparePage(page, u);
      // The 5 elementskit-content fragments are footer blocks: white text with no
      // background of their own. Standalone they render white-on-white and capture
      // blank. They are not broken - they are out of context. Composite them on the
      // theme's dark surface (--e-global-color-primary) so the content is legible.
      if (u.includes('/elementskit-content/')) {
        await page.addStyleTag({ content:
          'body{background:#481E0B!important;padding:48px 0!important}' }).catch(() => {});
      }
      if (!r.ok) {
        report[`${kind}/${s}`] = { ok: false, error: r.error };
        console.log(`[${kind} ${i + 1}/${urls.length}] FAIL ${s} :: ${r.error}`);
        continue;
      }
      try {
        await page.screenshot({ path: out, fullPage: true, animations: 'disabled', scale: 'css' });
        const bytes = fs.statSync(out).size, kb = Math.round(bytes / 1024);
        const h = await page.evaluate(() => document.body.scrollHeight);
        report[`${kind}/${s}`] = { ok: true, kb, height: h, suspect: bytes < MIN_BYTES };
        console.log(`[${kind} ${i + 1}/${urls.length}] ${s.slice(0, 50).padEnd(50)} ${String(kb).padStart(5)}KB  h=${h}`);
      } catch (e) {
        report[`${kind}/${s}`] = { ok: false, error: String(e).slice(0, 160) };
        console.log(`[${kind} ${i + 1}/${urls.length}] SHOT-FAIL ${s} :: ${String(e).slice(0, 110)}`);
      }
    }
    await ctx.close();
  }
  await browser.close();

  fs.writeFileSync(`${B}/_logs/shoot_report.${kinds.join('-')}.json`, JSON.stringify(report, null, 1));
  const bad = Object.entries(report).filter(([, v]) => !v.ok || v.suspect);
  console.log(`\nSHOOT DONE captured=${Object.keys(report).length} suspect=${bad.length}`);
  bad.forEach(([k, v]) => console.log('  SUSPECT', k, JSON.stringify(v)));
})();
