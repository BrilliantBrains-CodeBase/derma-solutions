"""Shared helpers for the Glowix design-reference pipeline."""
from pathlib import Path

BASE = "https://demo.awaikenthemes.com/glowix/"
B = Path(__file__).resolve().parent.parent
UA_DESKTOP = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")


def slug_of(url: str) -> str:
    """URL -> stable filesystem slug. Must match shoot.js's slugOf exactly."""
    p = url.replace(BASE, "")
    if p.startswith("?elementskit_template="):
        return "tpl__" + p.split("=", 1)[1]
    p = p.rstrip("/")
    return "_homepage" if p == "" else p.replace("/", "__")


def urls() -> list[str]:
    f = B / "00-inventory" / "urls-master.txt"
    return [l.strip() for l in f.read_text().splitlines() if l.strip()]
