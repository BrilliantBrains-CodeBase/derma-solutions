import urllib.request, gzip, hashlib, json, os, time, sys
B="/Users/d1/dermasolution/seo-backup"
UAS={
 "desktop":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
 "mobile":"Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
}
urls=[l.strip() for l in open(f"{B}/00-site-level/urls-master.txt") if l.strip()]

def slug(u):
    p=u.replace("https://dermasolutions.co.in/","").strip("/")
    return "_homepage" if not p else p.replace("/","__")

def fetch(u, ua):
    req=urllib.request.Request(u, headers={"User-Agent":ua,"Accept-Encoding":"gzip, deflate",
        "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language":"en-US,en;q=0.9"})
    with urllib.request.urlopen(req, timeout=60) as r:
        raw=r.read()
        if raw[:2]==b"\x1f\x8b": raw=gzip.decompress(raw)
        return raw, r.status, dict(r.headers), r.url

results={}
for i,u in enumerate(urls,1):
    s=slug(u); entry={"url":u,"slug":s}
    for kind,ua in UAS.items():
        ok=False
        for attempt in range(3):
            try:
                body,status,hdrs,final=fetch(u,ua)
                path=f"{B}/01-raw-html/{kind}/{s}.html"
                open(path,"wb").write(body)
                open(f"{B}/00-site-level/headers/{s}.{kind}.txt","w").write(
                    f"HTTP {status}\nFINAL_URL {final}\n"+"\n".join(f"{k}: {v}" for k,v in hdrs.items()))
                entry[kind]={"status":status,"bytes":len(body),
                             "sha256":hashlib.sha256(body).hexdigest(),
                             "final_url":final,
                             "flying_press":hdrs.get("x-flying-press-cache"),
                             "gzip_ok": body.lstrip()[:15].lower().startswith(b"<!doctype")}
                ok=True; break
            except Exception as e:
                if attempt==2: entry[kind]={"error":str(e)}
                else: time.sleep(2)
        time.sleep(0.35)
    d=entry.get("desktop",{}); m=entry.get("mobile",{})
    entry["ua_differs"]= bool(d.get("sha256") and m.get("sha256") and d["sha256"]!=m["sha256"])
    results[u]=entry
    print(f"[{i:>2}/92] {s[:58]:<58} D:{d.get('bytes','ERR')} M:{m.get('bytes','ERR')} diff={entry['ua_differs']}", flush=True)

json.dump(results, open(f"{B}/_logs/fetch_html_results.json","w"), indent=1)
okc=sum(1 for v in results.values() if v.get("desktop",{}).get("gzip_ok") and v.get("mobile",{}).get("gzip_ok"))
print(f"\nDONE. clean_both={okc}/92  ua_differs={sum(1 for v in results.values() if v['ua_differs'])}")
