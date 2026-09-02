/**
 * Step 5 - decompose every page into its distinct section patterns.
 *
 * A page is built as one or more `.elementor` wrappers (header template, page
 * content, footer template). Each TOP-LEVEL child of a wrapper is one section.
 *
 * The demo reuses patterns heavily, so sections are fingerprinted by structure
 * (widget-type sequence + layout mode + depth) and deduplicated across all 58
 * pages. Each unique pattern is written once, with the pages it appears on.
 *
 * Per section:
 *   screenshot.png   the section in isolation, desktop 1440
 *   structure.html   cleaned semantic HTML (scripts/inline styles stripped)
 *   computed.json    computed styles for the section and its notable children
 *   notes.md         layout, spacing, colour, type, animation + Tailwind mapping
 */
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { chromium, slugOf, newContext, preparePage } = require('./pwsetup.js');
const B = '/Users/d1/dermasolution/theme-reference';
const OUT = `${B}/04-sections`;

const PAGE_EVAL = () => {
  const px = v => Math.round(parseFloat(v) || 0);
  const wraps = [...document.querySelectorAll('.elementor')];
  const out = [];

  const zone = w => w.closest('header,.ekit-template-content-header') ? 'header'
              : w.closest('footer,.ekit-template-content-footer') ? 'footer' : 'content';

  for (const w of wraps) {
    const z = zone(w);
    for (const el of [...w.children]) {
      const r = el.getBoundingClientRect();
      if (r.height < 40) continue;                      // spacers / empty rails
      const widgets = [...el.querySelectorAll('[data-widget_type]')]
        .map(x => (x.dataset.widget_type || '').split('.')[0]);
      const s = getComputedStyle(el);

      // headings, in document order, give the section its human name
      const heads = [...el.querySelectorAll('h1,h2,h3,h4,h5,h6')]
        .map(h => ({ tag: h.tagName.toLowerCase(),
                     text: (h.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120) }))
        .filter(h => h.text);

      // structural fingerprint: what it is made of, not what it says
      const fp = JSON.stringify({
        z, widgets,
        boxed: /e-con-boxed/.test(el.className),
        cols: [...el.children].length,
        grid: s.display,
      });

      out.push({
        zone: z,
        dataId: el.dataset.id || null,
        cls: (el.className || '').toString(),
        fingerprint: fp,
        rect: { top: Math.round(r.top + window.scrollY), h: Math.round(r.height), w: Math.round(r.width) },
        widgets, heads,
        anim: [...el.querySelectorAll('[class*="at-animation"]')]
          .map(a => (a.className.match(/at-animation-[\w-]+/) || [])[0]).filter(Boolean),
        shiny: el.querySelectorAll('[class*="shiny-glass"]').length,
        style: {
          display: s.display, flexDirection: s.flexDirection, gap: s.gap,
          padding: `${px(s.paddingTop)}px ${px(s.paddingRight)}px ${px(s.paddingBottom)}px ${px(s.paddingLeft)}px`,
          background: s.backgroundColor,
          backgroundImage: s.backgroundImage === 'none' ? null : s.backgroundImage.slice(0, 200),
          radius: px(s.borderTopLeftRadius),
          maxWidth: s.maxWidth, width: px(s.width),
          alignItems: s.alignItems, justifyContent: s.justifyContent,
        },
        // direct children = the section's column/grid structure
        children: [...el.children].slice(0, 12).map(c => {
          const cs = getComputedStyle(c), cr = c.getBoundingClientRect();
          return { cls: (c.className || '').toString().slice(0, 100),
                   w: Math.round(cr.width), h: Math.round(cr.height),
                   display: cs.display, flex: cs.flex, gap: cs.gap,
                   grid: cs.gridTemplateColumns === 'none' ? null : cs.gridTemplateColumns,
                   pad: `${px(cs.paddingTop)}px ${px(cs.paddingRight)}px ${px(cs.paddingBottom)}px ${px(cs.paddingLeft)}px`,
                   bg: cs.backgroundColor, radius: px(cs.borderTopLeftRadius) };
        }),
        html: el.outerHTML,
      });
    }
  }
  return out;
};

const nameOf = (sec) => {
  const h = sec.heads.find(x => x.tag !== 'h6') || sec.heads[0];
  let base = h ? h.text : (sec.zone === 'header' ? 'site header'
                        : sec.zone === 'footer' ? 'site footer' : 'section');
  return base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 44) || 'section';
};

const cleanHtml = (h) => h
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
  .replace(/ style="[^"]*"/gi, '')          // GSAP/Elementor inline junk
  .replace(/ data-(settings|id|element_type|e-bg-lazyload|core-v316plus)="[^"]*"/gi, '')
  .replace(/\n{3,}/g, '\n\n');

(async () => {
  const urls = fs.readFileSync(`${B}/00-inventory/urls-master.txt`, 'utf8')
    .split('\n').map(s => s.trim()).filter(Boolean);
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(`${B}/08-pages`, { recursive: true });

  const browser = await chromium.launch({ args: ['--hide-scrollbars'] });
  const ctx = await newContext(browser, 'desktop');
  const page = await ctx.newPage();

  const seen = new Map();     // fingerprint -> { id, dir, pages[] }
  const pageMaps = {};
  let n = 0;

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i], pslug = slugOf(u);
    const r = await preparePage(page, u);
    if (!r.ok) { console.log(`[${i + 1}/${urls.length}] FAIL ${pslug} :: ${r.error}`); continue; }

    let secs;
    try { secs = await page.evaluate(PAGE_EVAL); }
    catch (e) { console.log(`[${i + 1}/${urls.length}] EVAL-FAIL ${pslug}`); continue; }

    const order = [];
    for (const sec of secs) {
      let rec = seen.get(sec.fingerprint);
      if (!rec) {
        n += 1;
        const id = String(n).padStart(2, '0') + '-' + nameOf(sec);
        const dir = `${OUT}/${id}`;
        fs.mkdirSync(dir, { recursive: true });
        rec = { id, dir, pages: [], sec };
        seen.set(sec.fingerprint, rec);

        fs.writeFileSync(`${dir}/structure.html`, cleanHtml(sec.html));
        fs.writeFileSync(`${dir}/computed.json`, JSON.stringify({
          zone: sec.zone, dataId: sec.dataId, classes: sec.cls,
          rect: sec.rect, style: sec.style, children: sec.children,
          widgets: sec.widgets, headings: sec.heads,
          animations: sec.anim, shinyGlassElements: sec.shiny,
          firstSeenOn: pslug,
        }, null, 1));

        // isolated element screenshot
        try {
          const h = await page.$(`[data-id="${sec.dataId}"]`);
          if (h) await h.screenshot({ path: `${dir}/screenshot.png`, animations: 'disabled', scale: 'css' });
        } catch {}
        console.log(`  + ${id}  (${sec.zone}, ${sec.widgets.length} widgets, ${sec.rect.h}px)`);
      }
      rec.pages.push(pslug);
      order.push(rec.id);
    }
    pageMaps[pslug] = { url: u, sections: order };
    console.log(`[${i + 1}/${urls.length}] ${pslug.slice(0, 44).padEnd(44)} ${secs.length} sections, ${n} unique so far`);
  }
  await browser.close();

  // page -> section order maps
  fs.writeFileSync(`${B}/08-pages/page-section-map.json`, JSON.stringify(pageMaps, null, 1));

  const index = [...seen.values()].map(r => ({
    id: r.id, zone: r.sec.zone, height: r.sec.rect.h,
    widgets: r.sec.widgets, headings: r.sec.heads.map(h => h.text),
    animations: r.sec.anim,
    usedOnCount: new Set(r.pages).size, usedOn: [...new Set(r.pages)],
  })).sort((a, b) => b.usedOnCount - a.usedOnCount);
  fs.writeFileSync(`${OUT}/index.json`, JSON.stringify(index, null, 1));

  console.log(`\nSECTIONS DONE  unique=${n}  pages=${Object.keys(pageMaps).length}`);
})();
