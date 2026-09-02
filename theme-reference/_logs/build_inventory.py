#!/usr/bin/env python3
"""Step 1 - build the frozen URL inventory for the Glowix demo.

Sources, unioned:
  * all wp-sitemap-*.xml sections
  * WP REST (pages, posts, awaiken-casestudy, media, types)
  * the 8 ?elementskit_template= header/footer layout URLs (not in any sitemap)
  * /404 (not in any sitemap)

Idempotent: re-running overwrites the inventory from live data.
"""
import json, re, subprocess, sys
from pathlib import Path

BASE = "https://demo.awaikenthemes.com/glowix/"
B = Path(__file__).resolve().parent.parent
INV = B / "00-inventory"
REST = INV / "wp-rest"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

# Template URLs are reachable only via query string; sitemaps never list them.
TEMPLATES = [
    f"{BASE}?elementskit_template={t}" for t in (
        "header", "header-layout-2", "header-layout-3", "header-layout-4",
        "footer", "footer-layout-2", "footer-layout-3", "footer-layout-4",
    )
]
EXTRA = [f"{BASE}404", f"{BASE}casestudy/"]  # archive: 200 OK but in no sitemap


def get(url: str) -> str:
    """curl --compressed is mandatory: without it the CDN returns raw gzip
    and every downstream regex silently matches nothing."""
    r = subprocess.run(
        ["curl", "-sL", "--compressed", "-A", UA, url],
        capture_output=True, text=True, timeout=60,
    )
    return r.stdout


def main() -> int:
    INV.mkdir(parents=True, exist_ok=True)
    REST.mkdir(parents=True, exist_ok=True)

    # --- sitemaps -----------------------------------------------------
    index = get(BASE + "wp-sitemap.xml")
    (INV / "wp-sitemap.xml").write_text(index, encoding="utf-8")
    subs = re.findall(r"<loc>([^<]*wp-sitemap-[^<]+\.xml)</loc>", index)
    print(f"sitemap index -> {len(subs)} sections")

    urls: set[str] = set()
    for s in subs:
        name = s.rsplit("/", 1)[-1]
        body = get(s)
        (INV / name).write_text(body, encoding="utf-8")
        locs = re.findall(r"<loc>([^<]+)</loc>", body)
        # users-1 lists author archives; not design surface
        if "users" in name:
            print(f"  {name:44} {len(locs):3} (skipped - author archives)")
            continue
        urls.update(locs)
        print(f"  {name:44} {len(locs):3}")

    # --- WP REST ------------------------------------------------------
    for slug, path in (
        ("pages", "wp/v2/pages?per_page=100&_embed=1"),
        ("posts", "wp/v2/posts?per_page=100&_embed=1"),
        ("casestudy", "wp/v2/awaiken-casestudy?per_page=100&_embed=1"),
        ("types", "wp/v2/types"),
    ):
        body = get(BASE + "wp-json/" + path)
        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            print(f"  REST {slug:12} FAILED (not JSON)")
            continue
        (REST / f"{slug}.json").write_text(
            json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8")
        n = len(data) if isinstance(data, list) else 1
        print(f"  REST {slug:12} {n:3}")
        if isinstance(data, list) and slug in ("pages", "posts", "casestudy"):
            for item in data:
                if link := item.get("link"):
                    urls.add(link)

    # --- media (paginated: 103 items, per_page caps at 100) -----------
    media, page = [], 1
    while True:
        body = get(f"{BASE}wp-json/wp/v2/media?per_page=100&page={page}")
        try:
            chunk = json.loads(body)
        except json.JSONDecodeError:
            break
        if not isinstance(chunk, list) or not chunk:
            break
        media.extend(chunk)
        # WP filters some attachments post-query, so a short page is NOT the
        # last page (page 1 returns 92 of a claimed 103). Page until empty.
        page += 1
        if page > 20:
            break
    (REST / "media.json").write_text(
        json.dumps(media, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"  REST {'media':12} {len(media):3} (across {page} page(s))")

    # --- union + freeze ----------------------------------------------
    urls.update(TEMPLATES)
    urls.update(EXTRA)
    # drop anything outside the demo install
    urls = {u for u in urls if u.startswith(BASE)}

    ordered = sorted(urls, key=lambda u: (u.count("/"), u))
    (INV / "urls-master.txt").write_text("\n".join(ordered) + "\n", encoding="utf-8")

    def kind(u: str) -> str:
        if "elementskit_template=" in u:            return "layout-template"
        if "/elementskit-content/" in u:            return "content-fragment"
        if "/casestudy/" in u:                      return "casestudy"
        if "/services/" in u:                       return "service"
        if "/our-team/" in u:                       return "team"
        if "/category/" in u or "/tag/" in u:       return "archive"
        if u.rstrip("/").endswith("404"):           return "404"
        return "page"

    classified: dict[str, list[str]] = {}
    for u in ordered:
        classified.setdefault(kind(u), []).append(u)
    (INV / "urls-classified.json").write_text(
        json.dumps(classified, indent=1), encoding="utf-8")

    print(f"\nFROZEN: {len(ordered)} URLs -> 00-inventory/urls-master.txt")
    for k, v in sorted(classified.items(), key=lambda x: -len(x[1])):
        print(f"  {k:18} {len(v):3}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
