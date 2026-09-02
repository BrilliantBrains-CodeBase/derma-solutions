import re, json, os, glob, html as ihtml, hashlib
from urllib.parse import urljoin, urlparse
B="/Users/d1/dermasolution/seo-backup"
SITE="dermasolutions.co.in"

def attrs(tag):
    return {m.group(1).lower(): ihtml.unescape(m.group(2) or m.group(3) or m.group(4) or "")
            for m in re.finditer(r'([\w:.-]+)\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^\s>]+))', tag)}

def strip(s):
    s=re.sub(r'<(script|style|noscript)\b.*?</\1>','',s,flags=re.S|re.I)
    return ihtml.unescape(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',s))).strip()

def parse(path, url):
    h=open(path,encoding="utf-8",errors="replace").read()
    head=h.split("</head>")[0]
    d={"url":url,"slug":os.path.basename(path)[:-5]}
    t=re.search(r'<title[^>]*>(.*?)</title>',head,re.S|re.I)
    d["title"]=strip(t.group(1)) if t else ""
    d["title_length"]=len(d["title"])
    og,tw,meta={},{},{}
    for m in re.finditer(r'<meta\b[^>]*>',head,re.I):
        a=attrs(m.group(0)); k=(a.get("name") or a.get("property") or "").lower(); v=a.get("content","")
        if not k: continue
        if k.startswith("og:") or k.startswith("article:"): og[k]=v
        elif k.startswith("twitter:"): tw[k]=v
        else: meta[k]=v
    d["meta_description"]=meta.get("description","")
    d["meta_description_length"]=len(d["meta_description"])
    d["meta_robots"]=meta.get("robots","")
    d["meta_keywords"]=meta.get("keywords","")
    d["generator"]=meta.get("generator","")
    d["og"]=og; d["twitter"]=tw; d["other_meta"]=meta
    can=re.search(r'<link\b[^>]*rel=["\']?canonical["\']?[^>]*>',head,re.I)
    d["canonical"]=attrs(can.group(0)).get("href","") if can else ""
    d["hreflang"]=[{"hreflang":attrs(m.group(0)).get("hreflang"),"href":attrs(m.group(0)).get("href")}
                   for m in re.finditer(r'<link\b[^>]*rel=["\']?alternate["\']?[^>]*>',head,re.I)
                   if attrs(m.group(0)).get("hreflang")]
    body=h.split("</head>",1)[-1]
    heads=[]
    for m in re.finditer(r'<h([1-6])\b[^>]*>(.*?)</h\1>',body,re.S|re.I):
        txt=strip(m.group(2))
        if txt: heads.append({"level":int(m.group(1)),"text":txt})
    d["headings"]=heads
    d["h1"]=[x["text"] for x in heads if x["level"]==1]
    for lv in range(1,7): d[f"h{lv}_count"]=sum(1 for x in heads if x["level"]==lv)
    main=re.sub(r'<(script|style|noscript|svg)\b.*?</\1>','',body,flags=re.S|re.I)
    d["word_count"]=len(strip(main).split())
    imgs=[attrs(m.group(0)) for m in re.finditer(r'<img\b[^>]*>',body,re.I)]
    d["image_count"]=len(imgs)
    d["images_missing_alt"]=sum(1 for a in imgs if not a.get("alt","").strip())
    d["alt_coverage_pct"]=round(100*(len(imgs)-d["images_missing_alt"])/len(imgs),1) if imgs else None
    d["images"]=[{"src":urljoin(url,a.get("src") or a.get("data-src") or ""),"alt":a.get("alt","")} for a in imgs]
    ints=exts=0; links=[]
    for m in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>',body,re.I):
        href=m.group(1)
        if href.startswith(("#","mailto:","tel:","javascript:")): continue
        full=urljoin(url,href); host=urlparse(full).netloc
        if SITE in host: ints+=1
        else: exts+=1; links.append(full)
    d["internal_links"]=ints; d["external_links"]=exts
    d["external_link_targets"]=sorted(set(links))
    lds=re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>',h,re.S|re.I)
    types=[]
    for raw in lds:
        try:
            j=json.loads(raw.strip())
            nodes=j.get("@graph",[j]) if isinstance(j,dict) else (j if isinstance(j,list) else [j])
            for n in nodes:
                if isinstance(n,dict) and n.get("@type"):
                    tt=n["@type"]; types.extend(tt if isinstance(tt,list) else [tt])
        except Exception: types.append("__UNPARSEABLE__")
    d["schema_types"]=sorted(set(types)); d["schema_block_count"]=len(lds)
    d["_raw_jsonld"]=lds
    d["tracking"]=sorted(set(re.findall(r'(GTM-[A-Z0-9]+|G-[A-Z0-9]{6,}|UA-\d+-\d+)',h)))
    d["has_fb_pixel"]="fbq(" in h
    return d

urls={}
for l in open(f"{B}/00-site-level/urls-master.txt"):
    u=l.strip()
    if not u: continue
    p=u.replace("https://dermasolutions.co.in/","").strip("/")
    urls["_homepage" if not p else p.replace("/","__")]=u

allp={}
for slug,url in sorted(urls.items()):
    fp=f"{B}/01-raw-html/desktop/{slug}.html"
    if not os.path.exists(fp): print("MISSING HTML:",slug); continue
    d=parse(fp,url)
    lds=d.pop("_raw_jsonld")
    if lds:
        open(f"{B}/04-seo-extracted/schema/{slug}.jsonld","w",encoding="utf-8").write(
            "\n".join(x.strip() for x in lds))   # verbatim, no re-serialization
    json.dump(d,open(f"{B}/04-seo-extracted/per-page/{slug}.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
    allp[slug]=d
json.dump(allp,open(f"{B}/_logs/seo_all.json","w",encoding="utf-8"),ensure_ascii=False)
print(f"Extracted {len(allp)} pages")
print("no title:", [s for s,d in allp.items() if not d['title']])
print("no canonical:", [s for s,d in allp.items() if not d['canonical']])
print("no meta desc:", [s for s,d in allp.items() if not d['meta_description']])
print("no h1:", [s for s,d in allp.items() if not d['h1']])
print("no schema:", [s for s,d in allp.items() if not d['schema_types']])
