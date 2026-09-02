#!/usr/bin/env python3
"""Step 9a - MANIFEST.json: capture provenance + SHA-256 for every artifact."""
import json, hashlib, subprocess, sys, datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import B, BASE

SKIP_DIRS = {"_logs", ".git"}


def tool_version(cmd, *args):
    try:
        r = subprocess.run([cmd, *args], capture_output=True, text=True, timeout=30)
        return (r.stdout or r.stderr).strip().splitlines()[0][:80]
    except Exception:
        return "unavailable"


def main() -> int:
    files, total = {}, 0
    for p in sorted(B.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(B)
        if rel.parts and rel.parts[0] in SKIP_DIRS:
            continue
        if rel.name == "MANIFEST.json":
            continue
        b = p.read_bytes()
        total += len(b)
        files[str(rel)] = {"bytes": len(b), "sha256": hashlib.sha256(b).hexdigest()}

    node_pw = subprocess.run(
        ["node", "-e", "console.log(require('/Users/d1/.npm/_npx/db89d7302a373f10/node_modules/playwright/package.json').version)"],
        capture_output=True, text=True).stdout.strip() or "unknown"

    manifest = {
        "source": BASE,
        "captured_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
        "purpose": ("Design reference for the Derma Solutions rebuild (Vite + Tailwind). "
                    "Not a deployable copy. All imagery is licence:reference-only."),
        "source_stack": {
            "cms": "WordPress",
            "builder": "Elementor 4.2.3 + ElementsKit 4.0.1",
            "theme": "glowix 1.0.5",
            "css": "Bootstrap 5 + theme CSS + Elementor per-post CSS",
            "js": "GSAP + ScrollTrigger + SplitText + SmoothScroll + magiccursor + Swiper 8.4.5 + Isotope",
            "tailwind_present": False,
        },
        "tools": {
            "firecrawl_cli": tool_version("firecrawl", "--version"),
            "playwright": node_pw,
            "node": tool_version("node", "-v"),
            "python": sys.version.split()[0],
            "curl": tool_version("curl", "--version"),
        },
        "counts": {
            "urls": len((B / "00-inventory" / "urls-master.txt").read_text().split()),
            "raw_html": len(list((B / "01-raw-html").glob("*.html"))),
            "markdown": len(list((B / "02-content").glob("*.md"))),
            "sections": len([d for d in (B / "04-sections").iterdir() if d.is_dir()])
                        if (B / "04-sections").exists() else 0,
            "assets": len(list((B / "06-assets" / "images").glob("*")))
                      + len(list((B / "06-assets" / "icons").glob("*"))),
            "screenshots": {k: len(list((B / "07-screenshots" / k).glob("*.png")))
                            for k in ("desktop", "tablet", "mobile")
                            if (B / "07-screenshots" / k).exists()},
            "files_total": len(files),
            "bytes_total": total,
        },
        "files": files,
    }
    (B / "MANIFEST.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    print(f"MANIFEST: {len(files)} files, {total/1e6:.1f} MB")
    for k, v in manifest["counts"].items():
        print(f"  {k:14} {v}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
