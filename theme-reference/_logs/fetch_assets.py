#!/usr/bin/env python3
"""Step 7 - download every asset the design reference needs.

Two sources, unioned:
  1. WP media library (95 records) - gives alt text and dimensions
  2. images actually referenced by the 58 captured pages - catches theme assets
     that never entered the media library (backgrounds, shapes, icons)

Also self-hosts Marcellus + Sora so the rebuild makes no Google Fonts request.
Every record is tagged licence: reference-only - these belong to the theme
vendor and must be replaced with the clinic's own photography before launch.
"""
import json, re, subprocess, sys, hashlib
from pathlib import Path
from urllib.parse import urlparse, unquote

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import B, UA_DESKTOP

IMG = B / "06-assets" / "images"
ICON = B / "06-assets" / "icons"
FONT = B / "03-design-system" / "fonts"
HTML = B / "01-raw-html"


def curl(url: str, dest: Path) -> int:
    dest.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(
        ["curl", "-sL", "--compressed", "-A", UA_DESKTOP, "-w", "%{http_code}",
         "-o", str(dest), url],
        capture_output=True, text=True, timeout=120,
    )
    return int(r.stdout.strip() or 0)


def name_for(url: str) -> str:
    p = unquote(urlparse(url).path)
    base = p.rsplit("/", 1)[-1] or "asset"
    # uploads/2025/03/foo.jpg -> 2025-03-foo.jpg keeps originals distinguishable
    m = re.search(r"/uploads/(\d{4})/(\d{2})/(.+)$", p)
    if m:
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}"
    if "/themes/glowix/" in p:
        return "theme-" + base
    return base


def main() -> int:
    manifest, seen = [], {}

    # ---- 1. media library ------------------------------------------------
    media = json.loads((B / "00-inventory" / "wp-rest" / "media.json").read_text())
    lib = {}
    for m in media:
        u = m.get("source_url")
        if not u:
            continue
        lib[u] = {
            "id": m.get("id"),
            "alt": (m.get("alt_text") or "").strip(),
            "title": (m.get("title") or {}).get("rendered", ""),
            "mime": m.get("mime_type"),
            "w": (m.get("media_details") or {}).get("width"),
            "h": (m.get("media_details") or {}).get("height"),
        }

    # ---- 2. images actually referenced by captured pages -----------------
    used = {}
    for f in sorted(HTML.glob("*.html")):
        h = f.read_text(encoding="utf-8", errors="replace")
        for u in re.findall(r'https://demo\.awaikenthemes\.com/glowix/wp-content/[^\s"\'<>()\\]+?\.(?:jpg|jpeg|png|svg|webp|gif)', h, re.I):
            used.setdefault(u, set()).add(f.stem)

    allurls = set(lib) | set(used)
    print(f"media library: {len(lib)}   referenced on pages: {len(used)}   union: {len(allurls)}")

    ok = fail = skip = 0
    for i, u in enumerate(sorted(allurls), 1):
        is_icon = u.lower().endswith(".svg")
        dest_dir = ICON if is_icon else IMG
        fn = name_for(u)
        dest = dest_dir / fn
        if dest.exists() and dest.stat().st_size > 0:
            skip += 1
        else:
            code = curl(u, dest)
            if code != 200 or not dest.exists() or dest.stat().st_size == 0:
                print(f"  [{i}] FAIL {code} {u[-70:]}")
                dest.unlink(missing_ok=True)
                fail += 1
                continue
            ok += 1
        meta = lib.get(u, {})
        manifest.append({
            "url": u,
            "local": str(dest.relative_to(B)),
            "bytes": dest.stat().st_size,
            "sha256": hashlib.sha256(dest.read_bytes()).hexdigest()[:16],
            "in_media_library": u in lib,
            "alt": meta.get("alt", ""),
            "width": meta.get("w"), "height": meta.get("h"),
            "mime": meta.get("mime"),
            "used_on": sorted(used.get(u, [])),
            "licence": "reference-only",
        })
        if i % 40 == 0:
            print(f"  ...{i}/{len(allurls)}")

    # ---- 3. self-host the two Google fonts -------------------------------
    FONT.mkdir(parents=True, exist_ok=True)
    css_url = ("https://fonts.googleapis.com/css2?family=Sora:wght@100..800"
               "&family=Marcellus&display=swap")
    css_path = FONT / "fonts.css"
    # woff2 needs a modern UA or Google serves ttf
    subprocess.run(["curl", "-sL", "-A", UA_DESKTOP, "-o", str(css_path), css_url],
                   capture_output=True, timeout=60)
    css = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
    faces = re.findall(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", css)
    fok = 0
    for fu in sorted(set(faces)):
        fn = fu.rsplit("/", 1)[-1].split("?")[0]
        fd = FONT / fn
        if fd.exists() and fd.stat().st_size:
            fok += 1
            continue
        if curl(fu, fd) == 200:
            css = css.replace(fu, f"./{fn}")
            fok += 1
    css_path.write_text(css, encoding="utf-8")
    print(f"fonts: {fok} files self-hosted -> 03-design-system/fonts/")

    (B / "06-assets" / "manifest.json").write_text(
        json.dumps({
            "note": ("Glowix demo assets. Licensed to the theme vendor, captured as a "
                     "DESIGN REFERENCE ONLY. Every entry is licence:reference-only and "
                     "must be replaced with Derma Solutions' own photography before launch."),
            "count": len(manifest),
            "assets": manifest,
        }, indent=1), encoding="utf-8")

    print(f"\nASSETS DONE ok={ok} skip={skip} fail={fail}  manifest={len(manifest)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
