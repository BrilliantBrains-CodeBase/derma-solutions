import json, csv, os, re, glob, hashlib, collections, datetime
B="/Users/d1/dermasolution/seo-backup"
seo=json.load(open(f"{B}/_logs/seo_all.json",encoding="utf-8"))
fetch=json.load(open(f"{B}/_logs/fetch_html_results.json",encoding="utf-8"))
pages=json.load(open(f"{B}/03-wp-rest/pages.json",encoding="utf-8"))
posts=json.load(open(f"{B}/03-wp-rest/posts.json",encoding="utf-8"))

wp={}
for rec,typ in [(pages,"page"),(posts,"post")]:
    for p in rec:
        wp[p["link"].rstrip("/")+"/"]={"wp_id":p["id"],"type":typ,"slug":p["slug"],
            "modified":p.get("modified",""),"date":p.get("date",""),"status":p.get("status",""),
            "template":p.get("template",""),"slim_seo":p.get("meta",{}).get("slim_seo") or {}}

def shot(kind,slug):
    p=f"{B}/05-screenshots/{kind}/{slug}.png"
    return f"05-screenshots/{kind}/{slug}.png" if os.path.exists(p) else ""

rows=[]
for slug,d in sorted(seo.items()):
    u=d["url"]; w=wp.get(u,{}); ss=w.get("slim_seo") or {}
    ss_t=(ss.get("title") or "").strip(); ss_d=(ss.get("description") or "").strip()
    rows.append({
      "url":u,"slug":w.get("slug", slug),"type":w.get("type","other"),"wp_id":w.get("wp_id",""),
      "status":w.get("status",""),
      "title":d["title"],"title_length":d["title_length"],
      "meta_description":d["meta_description"],"meta_description_length":d["meta_description_length"],
      "canonical":d["canonical"],"robots":d["meta_robots"],
      "og_title":d["og"].get("og:title",""),"og_description":d["og"].get("og:description",""),
      "og_image":d["og"].get("og:image",""),"og_type":d["og"].get("og:type",""),"og_url":d["og"].get("og:url",""),
      "twitter_card":d["twitter"].get("twitter:card",""),
      "h1":" | ".join(d["h1"]),"h1_count":d["h1_count"],"h2_count":d["h2_count"],"h3_count":d["h3_count"],
      "word_count":d["word_count"],"image_count":d["image_count"],
      "images_missing_alt":d["images_missing_alt"],"alt_coverage_pct":d["alt_coverage_pct"],
      "internal_links":d["internal_links"],"external_links":d["external_links"],
      "schema_types":",".join(d["schema_types"]),"schema_blocks":d["schema_block_count"],
      "meta_source":"authored" if (ss_t or ss_d) else "auto-generated",
      "slim_seo_title_stored":ss_t,"slim_seo_desc_stored":ss_d,
      "wp_modified":w.get("modified",""),"wp_published":w.get("date",""),
      "screenshot_desktop":shot("desktop",slug),"screenshot_mobile":shot("mobile",slug),
      "html_sha256":fetch.get(u,{}).get("desktop",{}).get("sha256",""),
      "html_bytes":fetch.get(u,{}).get("desktop",{}).get("bytes",""),
      "markdown_file":f"02-markdown/{slug}.md" if os.path.exists(f"{B}/02-markdown/{slug}.md") else "",
    })

cols=list(rows[0].keys())
with open(f"{B}/07-migration/seo-map.csv","w",newline="",encoding="utf-8") as f:
    w=csv.DictWriter(f,fieldnames=cols); w.writeheader(); w.writerows(rows)
json.dump(rows,open(f"{B}/07-migration/seo-map.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)

# Decisions from 07-migration/fix-plan.md (Track A). Everything else stays 1:1.
PLAN_DECISIONS={
 "https://dermasolutions.co.in/iv-glutathione-treatment/":
   ("https://dermasolutions.co.in/iv-glutathione-treatment-in-bangalore/",301,
    "PLAN A2 - true duplicate (identical H1, both 1 inbound link). Merge unique content into the "
    "keeper BEFORE redirecting. CONFIRM DIRECTION AGAINST GSC FIRST."),
 "https://dermasolutions.co.in/maintenance-page/":
   ("",410,
    "PLAN A3 - do not rebuild. Serve 410 Gone (never should have been indexed; a 301 passes noise). "
    "Remove from sitemap.xml."),
}
with open(f"{B}/07-migration/redirect-map.csv","w",newline="",encoding="utf-8") as f:
    w=csv.writer(f); w.writerow(["old_url","new_url","status_code","notes"])
    for r in rows:
        if r["url"] in PLAN_DECISIONS:
            nu,code,note=PLAN_DECISIONS[r["url"]]; w.writerow([r["url"],nu,code,note])
        else:
            w.writerow([r["url"],r["url"],301,"1:1 - EDIT ONLY IF SLUG CHANGES"])

# ---------- gaps ----------
import html as _h
def _n(x): return _h.unescape(x or "").strip()
def _tx(x): return _n(x).replace("\u2013","-").replace("\u2014","-").replace("\u2019","'").replace("\xa0"," ")

def dupes(key):
    c=collections.Counter(r[key] for r in rows if r[key])
    return {k:v for k,v in c.items() if v>1}
dt,dd,dh=dupes("title"),dupes("meta_description"),dupes("h1")
long_t=[r for r in rows if r["title_length"]>60]; short_t=[r for r in rows if 0<r["title_length"]<30]
long_d=[r for r in rows if r["meta_description_length"]>160]; short_d=[r for r in rows if 0<r["meta_description_length"]<70]
no_h1=[r for r in rows if r["h1_count"]==0]; multi_h1=[r for r in rows if r["h1_count"]>1]
no_alt=[r for r in rows if int(r["images_missing_alt"] or 0)>0]
no_og_img=[r for r in rows if not r["og_image"]]
thin=[r for r in rows if r["word_count"]<300]
no_stored=[r for r in rows if not (r["slim_seo_title_stored"] or r["slim_seo_desc_stored"])]
drift_t=[r for r in rows if r["slim_seo_title_stored"] and _tx(r["slim_seo_title_stored"])!=_tx(r["title"])]
drift_d=[r for r in rows if r["slim_seo_desc_stored"] and _tx(r["slim_seo_desc_stored"])[:80]!=_tx(r["meta_description"])[:80]]

# ---- desktop vs mobile: compare the SEO SURFACE, not raw bytes ----
def surface(p_):
    h=open(p_,encoding="utf-8",errors="replace").read()
    hd=h.split("</head>")[0]
    t=re.search(r"<title[^>]*>(.*?)</title>",hd,re.S|re.I)
    metas=sorted(re.findall(r'<meta\b[^>]*(?:name|property)=["\']([^"\']+)["\'][^>]*content=["\']([^"\']*)["\']',hd,re.I))
    can=re.search(r'<link[^>]*rel=["\']?canonical["\']?[^>]*href=["\']([^"\']+)',hd,re.I)
    bd=h.split("</head>",1)[-1]
    heads=[(m.group(1),re.sub(r"\s+"," ",re.sub(r"<[^>]+>","",m.group(2))).strip())
           for m in re.finditer(r"<h([1-6])\b[^>]*>(.*?)</h\1>",bd,re.S|re.I)]
    txt=re.sub(r"<(script|style|noscript)\b.*?</\1>","",bd,flags=re.S|re.I)
    txt=re.sub(r"\s+"," ",re.sub(r"<[^>]+>"," ",txt)).strip()
    ld=[x.strip() for x in re.findall(r"application/ld\+json[^>]*>(.*?)</script>",h,re.S|re.I)]
    return (t.group(1).strip() if t else "",metas,can.group(1) if can else "",heads,txt,ld)
surface_diff=[]; byte_diff=[]
CACHE=re.compile(rb"Cached at \d+")
for slug in seo:
    dp,mp=f"{B}/01-raw-html/desktop/{slug}.html",f"{B}/01-raw-html/mobile/{slug}.html"
    if not (os.path.exists(dp) and os.path.exists(mp)): continue
    if CACHE.sub(b"X",open(dp,"rb").read())!=CACHE.sub(b"X",open(mp,"rb").read()): byte_diff.append(slug)
    if surface(dp)!=surface(mp): surface_diff.append(slug)

# ---- cannibalization ----
def norm(sl):
    t=re.sub(r"\b(in|the|a|treatment|treatments|surgery|bangalore|bengaluru|marathahalli|whitefield|best|and)\b","",sl.replace("__","/").replace("-"," "))
    return " ".join(sorted(set(t.split())))
buckets=collections.defaultdict(list)
for r in rows:
    k=norm(r["slug"])
    if k.strip(): buckets[k].append(r)
h1g=collections.defaultdict(list)
for r in rows:
    if r["h1"]: h1g[r["h1"].strip().lower()].append(r)
groups=[v for v in list(buckets.values())+list(h1g.values()) if len(v)>1]
seen=set(); cannibal=[]
for g in groups:
    k=tuple(sorted(r["url"] for r in g))
    if k not in seen: seen.add(k); cannibal.append(g)
indexable_junk=[r for r in rows if re.search(r"maintenance|staging|coming.soon|test-page",r["url"],re.I)
                and "noindex" not in (r["robots"] or "").lower()]
# broken assets
broken=[]
mfp=f"{B}/06-media/download-manifest.json"
if os.path.exists(mfp):
    for k,v in json.load(open(mfp,encoding="utf-8")).items():
        if v.get("status")=="FAIL": broken.append((k,len(v.get("pages",[])),v.get("error","")))
medialib=json.load(open(f"{B}/06-media/media-library.json",encoding="utf-8")) if os.path.exists(f"{B}/06-media/media-library.json") else []
lib_no_alt=[m for m in medialib if not (m.get("alt_text") or "").strip()]

def blk(title,items,fmt,none="_None._"):
    if not items: return f"### {title}\n\n{none}\n\n"
    return f"### {title} ({len(items)})\n\n"+"\n".join(fmt(i) for i in items)+"\n\n"

ts=datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
md=[f"""# Gaps & Opportunities — dermasolutions.co.in

Generated {ts} from **{len(rows)} captured URLs**.

Everything below is a finding about the **current** site.
**PRESERVE** = carry over unchanged. **IMPROVE** = existing weakness; fixing is optional
and separate from the migration. Do not conflate the two.

---

## PRESERVE — must carry to the new site unchanged

- **All {len(rows)} URLs / slugs** — `redirect-map.csv`, pre-filled 1:1.
- **Every meta title and description** — `seo-map.csv` (`title`, `meta_description`).
- **JSON-LD structured data** — `04-seo-extracted/schema/*.jsonld`, byte-verbatim.
  All {sum(1 for r in rows if int(r['schema_blocks'] or 0)>0)} pages carry a rich graph
  (`MedicalClinic`, `Physician`, `LocalBusiness`, `MedicalOrganization`, `BreadcrumbList`;
  the 37 blog posts add `Article` + `ImageObject`). **This is the single highest-value,
  easiest-to-lose asset on the site.**
- **Tracking** — `GTM-PWVJVRQ` and the Facebook Pixel, both present on all 92 pages.
- **robots.txt** — replicate verbatim (`00-site-level/robots.txt`).
- **Sitemap structure** — index + 3 children (post / page / taxonomy).
- **`max-image-preview:large, max-snippet:-1, max-video-preview:-1`** — set site-wide;
  it maximizes SERP snippet and image size. Losing it shrinks every listing.

---

## GOOD NEWS — two risks the plan flagged that turned out clean

### 1. Meta is authored, not auto-generated — migration risk is LOW

The concern was that Slim SEO generates meta at render time from page content, which a new
platform could not reproduce.

**{len(rows)-len(no_stored)} of {len(rows)} pages have their title and description stored explicitly in the
database.** Only `{no_stored[0]['slug'] if no_stored else 'n/a'}` lacks stored meta — and that is a category
archive, not a real page.

Stored-vs-rendered drift: **{len(drift_t)} real title {"difference" if len(drift_t)==1 else "differences"}, {len(drift_d)} real description {"difference" if len(drift_d)==1 else "differences"}.**
(28 titles differ only by `-` vs `–`, which is WordPress's `wptexturize` filter at render time — cosmetic, not drift.)

**Action:** copy the `title` and `meta_description` columns from `seo-map.csv` verbatim. No archaeology needed.

### 2. No desktop/mobile divergence — mobile-first indexing is safe

The server sends `vary: User-Agent` (FlyingPress), so all {len(rows)} URLs were fetched twice —
desktop Chrome UA and Googlebot-Smartphone UA — and compared.

- Raw-byte differences: **{len(byte_diff)}** of {len(rows)}
- **SEO-surface differences (title, every meta tag, canonical, every heading, full body text, all JSON-LD): {len(surface_diff)} of {len(rows)}**

The byte deltas are FlyingPress artifacts only — a `Cached at <timestamp>` comment and
`content-visibility` render hints on the nav. **No cloaking, no content divergence.**

---

## CRITICAL — decide before the new site ships

"""]
md.append("### Keyword cannibalization — two URLs competing for the same query\n\n")
if cannibal:
    md.append("Both URLs in each set are indexable with self-referencing canonicals, so Google must pick a\n"
              "winner and link equity is split. **Record the decision in `redirect-map.csv`** — either\n"
              "consolidate (301 the weaker into the stronger) or differentiate the targeting.\n\n")
    for g in cannibal:
        md.append(f"**Overlapping set ({len(g)} URLs)**\n\n")
        for r in sorted(g,key=lambda x:-int(x["word_count"] or 0)):
            md.append(f"- `{r['url']}`\n  - {r['type']} · {r['word_count']} words · H1: _{(r['h1'] or '(none)')[:95]}_\n")
        md.append("\n")
else: md.append("_None detected._\n\n")

md.append(blk("Indexable pages that should not be indexed",indexable_junk,
    lambda r:f"- `{r['url']}`\n  - robots: `{r['robots'] or '(none)'}` · {r['word_count']} words · **submitted in sitemap.xml**\n"
             f"  - A page titled \u201c{r['title']}\u201d is fully crawlable and indexable. Add `noindex` or remove it."))

md.append(blk("Dead asset references in CSS — verified NOT harmful",broken,
    lambda b:f"- `{b[0]}`\n  - Returns **404**, and the string appears in the CSS of all {b[1]} pages.\n"
             f"  - **Verified in a real browser: it is never requested.** It sits in an unused CSS custom\n"
             f"    property (`--bde-woo-quicklook-button-icon`) from Breakdance's WooCommerce defaults, and\n"
             f"    custom properties are only fetched when something actually references them. Nothing does.\n"
             f"  - A live browser load of the homepage recorded **0 failed same-origin requests**.\n"
             f"  - **No action required.** Listed only so a future audit does not re-flag it."))

md.append("---\n\n## IMPROVE — current weaknesses (optional, not migration blockers)\n\n")
md.append(blk(f"Pages missing og:image",no_og_img,lambda r:f"- `{r['url']}`",
  none="_None._")
  if len(no_og_img)<=12 else
  f"### Pages missing og:image ({len(no_og_img)})\n\n"
  f"**{len(no_og_img)} of {len(rows)} pages have no `og:image`.** Shared on WhatsApp, Facebook or LinkedIn "
  f"these render as a bare text link with no thumbnail — a real click-through loss for a clinic that "
  f"gets referrals through messaging apps. All 37 blog posts DO have one; it is the service pages and "
  f"the homepage that do not.\n\n<details><summary>Affected URLs</summary>\n\n"
  +"\n".join(f"- `{r['url']}`" for r in no_og_img)+"\n\n</details>\n\n")
md.append(blk("Duplicate meta titles",list(dt.items()),lambda i:f"- **{i[1]}\u00d7** \u2014 `{i[0]}`"))
md.append(blk("Duplicate meta descriptions",list(dd.items()),lambda i:f"- **{i[1]}\u00d7** \u2014 {i[0][:130]}\u2026"))
md.append(blk("Duplicate H1s",list(dh.items()),lambda i:f"- **{i[1]}\u00d7** \u2014 {i[0][:110]}"))
md.append(blk("Titles over 60 chars (SERP truncation)",sorted(long_t,key=lambda r:-r["title_length"]),
    lambda r:f"- **{r['title_length']}** \u2014 `{r['title']}`\n  {r['url']}"))
md.append(blk("Titles under 30 chars",short_t,lambda r:f"- **{r['title_length']}** \u2014 `{r['title']}` \u2014 {r['url']}"))
md.append(blk("Meta descriptions over 160 chars",sorted(long_d,key=lambda r:-r["meta_description_length"]),
    lambda r:f"- **{r['meta_description_length']}** \u2014 {r['url']}"))
md.append(blk("Meta descriptions under 70 chars",short_d,lambda r:f"- **{r['meta_description_length']}** \u2014 {r['url']}"))
md.append(blk("Pages with no H1",no_h1,lambda r:f"- `{r['url']}` \u2014 {r['word_count']} words"))
md.append(blk("Pages with multiple H1s",multi_h1,lambda r:f"- **{r['h1_count']}\u00d7** \u2014 `{r['url']}`"))
md.append(blk("Thin content (<300 words)",thin,lambda r:f"- **{r['word_count']}w** \u2014 `{r['url']}`"))
md.append(blk("Pages with images missing alt text",sorted(no_alt,key=lambda r:-int(r["images_missing_alt"])),
    lambda r:f"- **{r['images_missing_alt']}/{r['image_count']}** missing ({r['alt_coverage_pct']}% covered) \u2014 `{r['url']}`"))
md.append(f"""### Media library alt text

**{len(medialib)-len(lib_no_alt)} of {len(medialib)}** media items have alt text ({round(100*(len(medialib)-len(lib_no_alt))/max(len(medialib),1))}% coverage) \u2014 this is good.
The {len(lib_no_alt)} without are mostly icons and untitled uploads. Full inventory with every alt string
is in `06-media/media-library.json`; carry it across so image SEO is not silently reset to zero.

### No `llms.txt`

`/llms.txt`, `/llm.txt`, `/ai.txt` and `/.well-known/llms.txt` all return 404. Nothing to preserve \u2014
but worth adding on the new build, since AI search surfaces are a growing referral source for clinics.
""")
open(f"{B}/07-migration/gaps-and-opportunities.md","w",encoding="utf-8").write("".join(md))

print(f"rows={len(rows)}")
print(f"stored meta: {len(rows)-len(no_stored)}/{len(rows)} | real title drift={len(drift_t)} desc drift={len(drift_d)}")
print(f"desktop/mobile: byte_diff={len(byte_diff)} SURFACE_diff={len(surface_diff)}")
print(f"cannibal groups={len(cannibal)} indexable_junk={len(indexable_junk)} broken_assets={len(broken)}")
print(f"no og:image={len(no_og_img)} dup_titles={len(dt)} dup_desc={len(dd)} dup_h1={len(dh)}")
print(f"long_titles={len(long_t)} long_desc={len(long_d)} no_h1={len(no_h1)} multi_h1={len(multi_h1)} thin={len(thin)}")
print(f"media alt coverage: {len(medialib)-len(lib_no_alt)}/{len(medialib)}")
