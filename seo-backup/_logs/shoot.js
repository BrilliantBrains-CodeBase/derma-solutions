const PW = '/Users/d1/.npm/_npx/db89d7302a373f10/node_modules/playwright';
const { chromium } = require(PW);
const fs = require('fs'), path = require('path');
const B = '/Users/d1/dermasolution/seo-backup';

const VIEWPORTS = {
  desktop: { viewport:{width:1440,height:900}, deviceScaleFactor:1,
    userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' },
  mobile:  { viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true,
    userAgent:'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36' },
};

// Kill the four known hazards: animations, sticky/fixed tiling, popups, lazy placeholders.
const FIX_CSS = `
  *,*::before,*::after{animation:none!important;transition:none!important;
    animation-duration:0s!important;transition-duration:0s!important;
    scroll-behavior:auto!important}
  [class*="breakdance"] [style*="opacity"],[data-animation],.bde-animate,
  [class*="animate"],[class*="fade"],[class*="reveal"]{opacity:1!important;transform:none!important;visibility:visible!important}
  header,nav,.bde-header,[class*="sticky"],[class*="Sticky"]{position:static!important;top:auto!important}
  *{position:var(--pw-pos,revert)}
  .breakdance-popup,.breakdance-popup-wrapper,[class*="popup"],[class*="Popup"],
  [class*="cookie"],[class*="Cookie"],[role="dialog"],.modal,[class*="overlay"]{display:none!important}
  html,body{overflow:visible!important;height:auto!important}
  img{opacity:1!important}
`;

const slugOf = u => { const p=u.replace('https://dermasolutions.co.in/','').replace(/\/$/,''); return p===''?'_homepage':p.replace(/\//g,'__'); };

(async () => {
  const urls = fs.readFileSync(`${B}/00-site-level/urls-master.txt`,'utf8').split('\n').map(s=>s.trim()).filter(Boolean);
  const only = process.argv[2] ? [process.argv[2]] : Object.keys(VIEWPORTS);
  const browser = await chromium.launch({ args:['--hide-scrollbars','--disable-web-security'] });
  const report = {};

  for (const kind of only) {
    const ctx = await browser.newContext({ ...VIEWPORTS[kind], ignoreHTTPSErrors:true, javaScriptEnabled:true });
    ctx.setDefaultTimeout(60000);
    const page = await ctx.newPage();
    for (let i=0;i<urls.length;i++) {
      const u = urls[i], s = slugOf(u), out = `${B}/05-screenshots/${kind}/${s}.png`;
      if (fs.existsSync(out) && fs.statSync(out).size > 50000) { console.log(`[${kind} ${i+1}/${urls.length}] SKIP ${s}`); continue; }
      try {
        await page.goto(u, { waitUntil:'load', timeout:60000 });
        await page.addStyleTag({ content: FIX_CSS });
        // force every lazy asset to load: step-scroll the full height, then return to top
        await page.evaluate(async () => {
          document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager');
          document.querySelectorAll('img[data-src]').forEach(i=>{ if(!i.src||i.src.startsWith('data:')) i.src=i.dataset.src; });
          document.querySelectorAll('.flying-press-lazy-bg').forEach(e=>e.classList.remove('flying-press-lazy-bg'));
          await new Promise(res => { let y=0; const t=setInterval(()=>{
            window.scrollTo(0,y); y+=400;
            if (y > document.body.scrollHeight+1000) { clearInterval(t); window.scrollTo(0,0); res(); }
          }, 60); });
        });
        await page.waitForLoadState('networkidle',{timeout:25000}).catch(()=>{});
        await page.waitForTimeout(900);
        await page.evaluate(()=>window.scrollTo(0,0));
        await page.screenshot({ path: out, fullPage: true, animations:'disabled', scale:'css' });
        const kb = Math.round(fs.statSync(out).size/1024);
        report[`${kind}/${s}`] = { ok:true, kb };
        console.log(`[${kind} ${i+1}/${urls.length}] ${s.slice(0,52).padEnd(52)} ${kb}KB`);
      } catch (e) {
        report[`${kind}/${s}`] = { ok:false, error:String(e).slice(0,160) };
        console.log(`[${kind} ${i+1}/${urls.length}] FAIL ${s} :: ${String(e).slice(0,110)}`);
      }
    }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(`${B}/_logs/shoot_report.${only.join('-')}.json`, JSON.stringify(report,null,1));
  const bad = Object.entries(report).filter(([,v])=>!v.ok || v.kb<50);
  console.log(`\nDONE. captured=${Object.keys(report).length} suspect=${bad.length}`);
  bad.forEach(([k,v])=>console.log('  SUSPECT',k,JSON.stringify(v)));
})();
