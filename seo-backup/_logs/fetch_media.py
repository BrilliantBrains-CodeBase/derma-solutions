import json,os,re,urllib.request,urllib.parse,gzip,time,collections
B="/Users/d1/dermasolution/seo-backup"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

# 1) media-library.json : the SEO-relevant slice of all 542 records (alt text is the asset)
media=json.load(open(f"{B}/03-wp-rest/media.json",encoding="utf-8"))
lib=[]
for m in media:
    lib.append({"id":m.get("id"),"slug":m.get("slug"),"date":m.get("date"),
        "source_url":m.get("source_url"),"mime_type":m.get("mime_type"),
        "alt_text":m.get("alt_text",""),
        "title":(m.get("title") or {}).get("rendered",""),
        "caption":re.sub(r"<[^>]+>","",(m.get("caption") or {}).get("rendered","")).strip(),
        "description":re.sub(r"<[^>]+>","",(m.get("description") or {}).get("rendered","")).strip(),
        "width":(m.get("media_details") or {}).get("width"),
        "height":(m.get("media_details") or {}).get("height"),
        "filesize":(m.get("media_details") or {}).get("filesize"),
        "sizes":sorted((((m.get("media_details") or {}).get("sizes")) or {}).keys()),
        "post":m.get("post")})
json.dump(lib,open(f"{B}/06-media/media-library.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
no_alt=[x for x in lib if not (x["alt_text"] or "").strip()]
print(f"media-library.json: {len(lib)} records | missing alt_text: {len(no_alt)}")

# 2) collect images actually REFERENCED on the 92 live pages (src + srcset), originals only
THUMB=re.compile(r"-\d{2,4}x\d{2,4}(?=\.(jpe?g|png|webp|gif|avif)$)",re.I)
refs=collections.Counter(); pages_using=collections.defaultdict(set)
for fp in sorted(os.listdir(f"{B}/01-raw-html/desktop")):
    if not fp.endswith(".html"): continue
    h=open(f"{B}/01-raw-html/desktop/{fp}",encoding="utf-8",errors="replace").read()
    cands=set()
    for m in re.finditer(r'<img\b[^>]*>',h,re.I):
        tag=m.group(0)
        for a in ("src","data-src"):
            v=re.search(rf'{a}\s*=\s*["\']([^"\']+)["\']',tag,re.I)
            if v: cands.add(v.group(1))
        ss=re.search(r'srcset\s*=\s*["\']([^"\']+)["\']',tag,re.I)
        if ss:
            for part in ss.group(1).split(","):
                u=part.strip().split()[0] if part.strip() else ""
                if u: cands.add(u)
    # og:image + preloaded heroes + inline CSS backgrounds
    for m in re.finditer(r'(?:og:image["\']\s+content|href|url)\s*=?\s*\(?["\']?(https://dermasolutions\.co\.in/wp-content/uploads/[^"\')\s>]+)',h,re.I):
        cands.add(m.group(1))
    for c in cands:
        c=urllib.parse.urljoin("https://dermasolutions.co.in/",c.strip())
        if "/wp-content/uploads/" not in c: continue
        if c.startswith("data:"): continue
        orig=THUMB.sub("",c.split("?")[0])          # collapse generated thumbnails -> original
        refs[orig]+=1; pages_using[orig].add(fp[:-5])
print(f"unique referenced originals: {len(refs)}")

# 3) download them
os.makedirs(f"{B}/06-media/files",exist_ok=True)
manifest={}; ok=fail=skip=0
for i,(u,count) in enumerate(sorted(refs.items()),1):
    rel=u.split("/wp-content/uploads/")[1]
    dest=f"{B}/06-media/files/{rel}"
    os.makedirs(os.path.dirname(dest),exist_ok=True)
    entry={"url":u,"ref_count":count,"pages":sorted(pages_using[u]),"local":f"06-media/files/{rel}"}
    if os.path.exists(dest) and os.path.getsize(dest)>0:
        entry["bytes"]=os.path.getsize(dest); entry["status"]="cached"; skip+=1
    else:
        try:
            r=urllib.request.Request(u,headers={"User-Agent":UA,"Accept":"image/*,*/*"})
            with urllib.request.urlopen(r,timeout=60) as resp:
                data=resp.read()
            open(dest,"wb").write(data)
            entry["bytes"]=len(data); entry["status"]="ok"; ok+=1
        except Exception as e:
            entry["status"]="FAIL"; entry["error"]=str(e)[:140]; fail+=1
        time.sleep(0.15)
    manifest[u]=entry
    if i%40==0: print(f"  {i}/{len(refs)} ok={ok} cached={skip} fail={fail}",flush=True)
json.dump(manifest,open(f"{B}/06-media/download-manifest.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
tot=sum(v.get("bytes",0) for v in manifest.values())
print(f"MEDIA-DONE ok={ok} cached={skip} fail={fail} total={tot/1048576:.1f} MB")
for v in manifest.values():
    if v["status"]=="FAIL": print("  FAIL",v["url"],v.get("error","")[:80])
