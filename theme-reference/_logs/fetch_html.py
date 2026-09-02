#!/usr/bin/env python3
"""Step 2 - byte-exact HTML per URL, desktop UA.

--compressed is mandatory: without it the SiteGround CDN returns raw gzip and
every downstream regex silently matches nothing (see seo-backup/README.md).
Idempotent: skips any file already on disk with plausible size.
"""
import subprocess, sys, time
from common import B, UA_DESKTOP, slug_of, urls

OUT = B / "01-raw-html"


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    us = urls()
    ok = skip = fail = 0
    for i, u in enumerate(us, 1):
        s = slug_of(u)
        dest = OUT / f"{s}.html"
        if dest.exists() and dest.stat().st_size > 5000:
            skip += 1
            print(f"[{i:2}/{len(us)}] SKIP {s}")
            continue
        r = subprocess.run(
            ["curl", "-sL", "--compressed", "-A", UA_DESKTOP,
             "-w", "%{http_code}", "-o", str(dest), u],
            capture_output=True, text=True, timeout=90,
        )
        code = r.stdout.strip()
        kb = dest.stat().st_size // 1024 if dest.exists() else 0
        # /404 correctly answers 404; the error-page HTML is still the design surface
        expected_404 = u.rstrip("/").endswith("404")
        if (code == "200" or (expected_404 and code == "404")) and kb > 4:
            ok += 1
            print(f"[{i:2}/{len(us)}] {s[:56]:56} {code} {kb}KB")
        else:
            fail += 1
            print(f"[{i:2}/{len(us)}] FAIL {s} http={code} {kb}KB")
        time.sleep(0.4)  # polite: demo sits behind a CDN that throttles
    print(f"\nHTML DONE  ok={ok} skip={skip} fail={fail}")
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())
