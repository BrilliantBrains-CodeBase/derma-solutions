#!/usr/bin/env python3
"""Step 9b - integrity checks. Exit 0 only if the reference is trustworthy."""
import json, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import B, slug_of, urls

CANON = {"primary": "#481E0B", "secondary": "#FCF4F1", "text": "#69615D",
         "accent": "#CD5F37", "divider": "#CD5F371A", "darkdivider": "#FFFFFF1A"}
DEMO_CHROME = {"#D2E761", "#F8FBEF", "#F5F1FF", "#128293"}
MIN_PNG = 20000

fails, warns = [], []
def bad(m): fails.append(m); print(f"  FAIL  {m}")
def warn(m): warns.append(m); print(f"  warn  {m}")
def ok(m):  print(f"  ok    {m}")


def main() -> int:
    us = urls()
    slugs = [slug_of(u) for u in us]
    print(f"verifying {len(us)} URLs\n")

    print("[1] raw HTML")
    miss = [s for s in slugs if not (B / "01-raw-html" / f"{s}.html").exists()]
    bad(f"missing HTML: {miss[:5]}") if miss else ok(f"all {len(slugs)} present")

    print("[2] markdown content")
    miss = [s for s in slugs if not (B / "02-content" / f"{s}.md").exists()]
    empty = [s for s in slugs if (p := B / "02-content" / f"{s}.md").exists() and p.stat().st_size < 200]
    bad(f"missing markdown: {miss[:5]}") if miss else ok(f"all {len(slugs)} present")
    if empty: warn(f"suspiciously small markdown: {empty[:5]}")

    print("[3] screenshots x3 viewports")
    for kind in ("desktop", "tablet", "mobile"):
        d = B / "07-screenshots" / kind
        if not d.exists():
            bad(f"{kind}/ missing entirely"); continue
        miss = [s for s in slugs if not (d / f"{s}.png").exists()]
        # Header templates collapse to a ~90px logo+hamburger bar on tablet/mobile.
        # They are legitimately 8-10KB; only flag them if truly empty.
        def floor(name):
            return 3000 if (name.startswith("tpl__header") and kind != "desktop") else MIN_PNG
        blank = [p.name for p in d.glob("*.png") if p.stat().st_size < floor(p.name)]
        if miss: bad(f"{kind}: missing {len(miss)} -> {miss[:4]}")
        elif blank: bad(f"{kind}: {len(blank)} likely-blank captures -> {blank[:4]}")
        else: ok(f"{kind}: {len(list(d.glob('*.png')))} captures, none blank")

    print("[4] design tokens match the theme's own css-variable.css")
    tf = B / "03-design-system" / "tokens.json"
    if not tf.exists():
        bad("tokens.json missing")
    else:
        t = json.loads(tf.read_text())
        v = t.get("authoritative_vars", {})
        for name, hexv in CANON.items():
            got = (v.get(f"--e-global-color-{name}") or "").upper()
            if got != hexv:
                bad(f"token {name}: expected {hexv}, captured {got or 'nothing'}")
        else_ok = all((v.get(f"--e-global-color-{n}") or "").upper() == h for n, h in CANON.items())
        if else_ok: ok(f"all {len(CANON)} canonical tokens match")
        stray = t.get("colors", {}).get("demo_chrome_excluded") or {}
        if stray: bad(f"demo-chrome colours leaked into tokens: {stray}")
        else: ok("no awaikenthemes demo-chrome colour present")
        measured = set(t["colors"]["text_colors"]) | set(t["colors"]["background_colors"])
        leak = {c for c in measured if c[:7] in DEMO_CHROME}
        if leak: bad(f"demo chrome in measured colours: {leak}")

    print("[5] sections")
    sd = B / "04-sections"
    if not sd.exists() or not (sd / "index.json").exists():
        bad("04-sections/index.json missing")
    else:
        idx = json.loads((sd / "index.json").read_text())
        dirs = [d for d in sd.iterdir() if d.is_dir()]
        incomplete = [d.name for d in dirs
                      if not all((d / f).exists() for f in
                                 ("structure.html", "computed.json", "notes.md", "screenshot.png"))]
        ok(f"{len(idx)} unique section patterns across {len(dirs)} dirs")
        if incomplete: warn(f"{len(incomplete)} sections missing a file: {incomplete[:5]}")

    print("[6] assets")
    mf = B / "06-assets" / "manifest.json"
    if not mf.exists():
        bad("asset manifest missing")
    else:
        m = json.loads(mf.read_text())
        missing = [a["local"] for a in m["assets"] if not (B / a["local"]).exists()]
        unlicensed = [a["local"] for a in m["assets"] if a.get("licence") != "reference-only"]
        if missing: bad(f"{len(missing)} assets in manifest but not on disk")
        else: ok(f"all {m['count']} assets present on disk")
        if unlicensed: bad(f"{len(unlicensed)} assets not tagged reference-only")
        else: ok("every asset tagged licence:reference-only")

    print("[7] self-hosted fonts")
    fonts = list((B / "03-design-system" / "fonts").glob("*.woff2"))
    ok(f"{len(fonts)} woff2 files") if fonts else warn("no woff2 self-hosted")

    print(f"\n{'='*58}")
    print(f"FAILURES: {len(fails)}   warnings: {len(warns)}")
    if fails:
        print("\nThe reference is NOT trustworthy until these are fixed:")
        for f in fails: print(f"  - {f}")
    else:
        print("Reference verified.")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
