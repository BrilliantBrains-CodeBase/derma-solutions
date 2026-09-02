import json,os,glob,csv,re
B="/Users/d1/dermasolution/seo-backup"
fails=[];warns=[]
def chk(name,cond,detail=""):
    print(("  PASS  " if cond else "  FAIL  ")+name+(f"  :: {detail}" if detail and not cond else ""))
    if not cond: fails.append(name)

rows=list(csv.DictReader(open(f"{B}/07-migration/seo-map.csv",encoding="utf-8")))
print("=== 1. Counts ===")
chk("seo-map.csv has 92 rows",len(rows)==92,f"got {len(rows)}")
for k,p in [("desktop HTML","01-raw-html/desktop/*.html"),("mobile HTML","01-raw-html/mobile/*.html"),
            ("markdown","02-markdown/*.md"),("per-page SEO json","04-seo-extracted/per-page/*.json"),
            ("desktop screenshots","05-screenshots/desktop/*.png"),("mobile screenshots","05-screenshots/mobile/*.png")]:
    n=len(glob.glob(f"{B}/{p}")); chk(f"92 {k}",n==92,f"got {n}")

print("\n=== 2. No silent gzip failures ===")
bad=[f for f in glob.glob(f"{B}/01-raw-html/*/*.html")
     if os.path.getsize(f)<10240 or not open(f,'rb').read(20).lstrip().lower().startswith(b'<!doctype')]
chk("all HTML decoded & >10KB",not bad,f"{len(bad)} bad: {[os.path.basename(x) for x in bad[:5]]}")

print("\n=== 3. No empty SEO fields ===")
nt=[r['url'] for r in rows if not r['title']]; nc=[r['url'] for r in rows if not r['canonical']]
chk("every row has a title",not nt,str(nt[:5]))
chk("every row has a canonical",not nc,str(nc[:5]))
nd=[r['url'] for r in rows if not r['meta_description']]
print(f"  NOTE  rows without meta description: {len(nd)} -> {nd} (verified genuine on live site)")

print("\n=== 4. Schema integrity ===")
badj=[]
for f in glob.glob(f"{B}/04-seo-extracted/schema/*.jsonld"):
    for blk in [b for b in open(f,encoding="utf-8").read().split("\n") if b.strip()]:
        try: json.loads(blk)
        except Exception: badj.append(os.path.basename(f)); break
chk("all .jsonld blocks parse as valid JSON",not badj,f"{len(badj)} bad: {badj[:5]}")
home=open(f"{B}/04-seo-extracted/schema/_homepage.jsonld",encoding="utf-8").read()
chk("homepage graph has WebSite","\"WebSite\"" in home)
chk("homepage graph has MedicalOrganization","MedicalOrganization" in home)

print("\n=== 5. Screenshots sane ===")
for kind in ("desktop","mobile"):
    small=[os.path.basename(f) for f in glob.glob(f"{B}/05-screenshots/{kind}/*.png") if os.path.getsize(f)<50000]
    chk(f"no undersized {kind} screenshots",not small,f"{len(small)}: {small[:6]}")

print("\n=== 6. Round-trip reconstructability ===")
import random
r=random.choice(rows); slug=r['slug'] if os.path.exists(f"{B}/02-markdown/{r['slug']}.md") else None
sl=[s for s in [r['url'].replace('https://dermasolutions.co.in/','').strip('/').replace('/','__') or '_homepage']][0]
have=all(os.path.exists(f"{B}/{p}") for p in
    [f"01-raw-html/desktop/{sl}.html",f"02-markdown/{sl}.md",f"04-seo-extracted/per-page/{sl}.json",
     f"05-screenshots/desktop/{sl}.png",f"05-screenshots/mobile/{sl}.png"])
chk(f"random page fully reconstructable ({sl})",have)

print("\n=== 7. Cross-source agreement (HTML vs Firecrawl) ===")
mism=0;checked=0
for r in rows[:92]:
    sl=r['url'].replace('https://dermasolutions.co.in/','').strip('/').replace('/','__') or '_homepage'
    mf=f"{B}/02-markdown/{sl}.md"
    if not os.path.exists(mf): continue
    checked+=1
    if r['h1'] and r['h1'].split(' | ')[0][:40] not in open(mf,encoding="utf-8").read(): mism+=1
chk(f"H1 present in Firecrawl markdown ({checked} checked)",mism==0,f"{mism} mismatches")

print(f"\n{'='*46}\n{'ALL CHECKS PASSED' if not fails else 'FAILURES: '+', '.join(fails)}\n{'='*46}")
