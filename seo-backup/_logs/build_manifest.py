import json,os,hashlib,datetime,subprocess,glob
B="/Users/d1/dermasolution/seo-backup"
def sh(c):
    try: return subprocess.run(c,shell=True,capture_output=True,text=True).stdout.strip()
    except Exception: return ""
fetch=json.load(open(f"{B}/_logs/fetch_html_results.json"))
seo=json.load(open(f"{B}/_logs/seo_all.json",encoding="utf-8"))
def count(p): return len([f for f in glob.glob(f"{B}/{p}",recursive=True) if os.path.isfile(f)])
def size(p):
    return sum(os.path.getsize(f) for f in glob.glob(f"{B}/{p}",recursive=True) if os.path.isfile(f))
man={
 "backup_name":"dermasolutions.co.in — full SEO + content backup",
 "site":"https://dermasolutions.co.in",
 "captured_utc":datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
 "purpose":"Pre-rebuild SEO source of truth and disaster-recovery snapshot.",
 "platform":{"cms":"WordPress 7.0.2","page_builder":"Breakdance","seo_plugin":"Slim SEO",
             "cache":"FlyingPress","server":"Apache","bot_protection":"none detected"},
 "tools":{"curl":sh("curl --version | head -1"),
          "firecrawl_cli":sh("firecrawl --version"),
          "playwright":"1.62.1 (chromium-1234, local)",
          "python":sh("python3 --version"),"node":sh("node --version")},
 "counts":{
   "urls_in_sitemap":len(fetch),
   "raw_html_desktop":count("01-raw-html/desktop/*.html"),
   "raw_html_mobile":count("01-raw-html/mobile/*.html"),
   "markdown":count("02-markdown/*.md"),
   "seo_json":count("04-seo-extracted/per-page/*.json"),
   "schema_jsonld":count("04-seo-extracted/schema/*.jsonld"),
   "screenshots_desktop":count("05-screenshots/desktop/*.png"),
   "screenshots_mobile":count("05-screenshots/mobile/*.png"),
   "media_files":count("06-media/files/**/*"),
   "wp_pages":len(json.load(open(f"{B}/03-wp-rest/pages.json"))),
   "wp_posts":len(json.load(open(f"{B}/03-wp-rest/posts.json"))),
   "wp_media_records":len(json.load(open(f"{B}/03-wp-rest/media.json"))),
 },
 "sizes_mb":{k:round(size(v)/1048576,1) for k,v in {
   "raw_html":"01-raw-html/**/*.html","markdown":"02-markdown/*.md","wp_rest":"03-wp-rest/*.json",
   "screenshots":"05-screenshots/**/*.png","media":"06-media/files/**/*"}.items()},
 "pages":{},
}
for u,v in fetch.items():
    slug=v["slug"]; s=seo.get(slug,{})
    man["pages"][u]={
      "slug":slug,
      "desktop_sha256":v.get("desktop",{}).get("sha256"),
      "mobile_sha256":v.get("mobile",{}).get("sha256"),
      "desktop_bytes":v.get("desktop",{}).get("bytes"),
      "http_status":v.get("desktop",{}).get("status"),
      "flying_press_cache":v.get("desktop",{}).get("flying_press"),
      "title":s.get("title"),"canonical":s.get("canonical"),
      "schema_blocks":s.get("schema_block_count"),
      "has_markdown":os.path.exists(f"{B}/02-markdown/{slug}.md"),
      "has_screenshot_desktop":os.path.exists(f"{B}/05-screenshots/desktop/{slug}.png"),
      "has_screenshot_mobile":os.path.exists(f"{B}/05-screenshots/mobile/{slug}.png"),
    }
json.dump(man,open(f"{B}/MANIFEST.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(json.dumps({"counts":man["counts"],"sizes_mb":man["sizes_mb"]},indent=1))
