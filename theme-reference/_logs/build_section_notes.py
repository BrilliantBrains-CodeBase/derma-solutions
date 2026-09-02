#!/usr/bin/env python3
"""Step 5b - give each section a meaningful name and write its notes.md.

extract_sections.js names a section from its first non-h6 heading, which picks
badly for chrome (the header's first heading is a phone number). This pass
renames using zone + the most semantically important heading, then writes the
Tailwind-facing notes.md and rewrites index.json / page-section-map.json so all
references stay consistent.
"""
import json, re, sys, shutil, collections
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import B

SEC = B / "04-sections"
PAGES = B / "08-pages"

# Documented in 05-animations/animations.md
ANIM_DOC = {
    "at-animation-image-style-1": "Image wipe — clip-path inset(0 100% 0 0) → inset(0 0% 0 0), 1.5s power2.out, ScrollTrigger top 90%. Pure-CSS replaceable.",
    "at-animation-heading-style-1": "Heading, per WORD — gsap.from x:20 autoAlpha:0, dur 1s, delay 0.5s, stagger 0.05, start top 85%.",
    "at-animation-heading-style-2": "Heading, per CHAR — gsap.from x:20 autoAlpha:0, dur 1s, delay 0.1s, stagger 0.03, power2.out, start top 85%.",
    "at-animation-heading-style-3": "Heading, per CHAR 3D — perspective 400, from opacity:0 x:50 → rotateX 0, dur 1s, stagger 0.02, Back.easeOut, start top 90%.",
    "at-animation-heading-none": "No animation (explicitly opted out).",
}

TW_COLOR = {
    "rgb(72, 30, 11)": "bg-primary  (#481E0B)",
    "rgb(252, 244, 241)": "bg-secondary (#FCF4F1)",
    "rgb(205, 95, 55)": "bg-accent   (#CD5F37)",
    "rgb(255, 255, 255)": "bg-white",
    "rgba(0, 0, 0, 0)": "transparent (inherits page background)",
}

WIDGET_TW = {
    "heading": "`<h2>` — font-display, see typography.md for the size at this level",
    "text-editor": "`<p>` — font-sans text-body",
    "button": "`<a>` — bg-accent text-white rounded-pill px-8 py-4",
    "image": "`<img>` — often inside the wipe reveal; keep rounded-card",
    "elementskit-icon-box": "icon + heading + copy card — grid cell",
    "icon-list": "`<ul>` with accent bullets",
    "elementskit-video": "video/lightbox trigger (magnific-popup)",
    "text-path": "SVG text-on-path — circular badge label",
    "rating": "star rating row",
    "ekit-nav-menu": "primary navigation",
    "glowix-site-logo": "site logo",
    "counter": "animated number counter",
}


def px(v):
    m = re.match(r"(-?\d+)px", str(v) or "")
    return int(m.group(1)) if m else None


def tw_pad(pad: str) -> str:
    """'120px 0px 120px 0px' -> a Tailwind-ish hint (theme uses a 5px base grid)."""
    vals = [px(x) for x in (pad or "").split()]
    if not vals or not any(vals):
        return "no padding"
    t, r, b, l = (vals + [0, 0, 0, 0])[:4]
    parts = []
    if t or b:
        parts.append(f"py-[{t}px]" if t == b else f"pt-[{t}px] pb-[{b}px]")
    if l or r:
        parts.append(f"px-[{l}px]" if l == r else f"pl-[{l}px] pr-[{r}px]")
    return " ".join(parts)


def better_name(c: dict, existing: set) -> str:
    zone = c.get("zone")
    heads = c.get("headings") or []
    if zone == "header":
        base = "site-header"
    elif zone == "footer":
        base = "site-footer"
    else:
        pick = (next((h for h in heads if h["tag"] == "h2"), None)
                or next((h for h in heads if h["tag"] == "h1"), None)
                or next((h for h in heads if h["tag"] == "h3"), None)
                or (heads[0] if heads else None))
        if pick:
            base = pick["text"]
        else:
            w = c.get("widgets") or []
            base = (collections.Counter(w).most_common(1)[0][0] if w else "block")
    base = re.sub(r"[^a-z0-9]+", "-", base.lower()).strip("-")[:44] or "section"
    name, i = base, 2
    while name in existing:
        name, i = f"{base}-{i}", i + 1
    existing.add(name)
    return name


def main() -> int:
    idx_path = SEC / "index.json"
    if not idx_path.exists():
        print("run extract_sections.js first", file=sys.stderr)
        return 1
    index = json.loads(idx_path.read_text())
    pmap = json.loads((PAGES / "page-section-map.json").read_text())

    rename, taken = {}, set()
    for i, rec in enumerate(index, 1):
        d = SEC / rec["id"]
        if not d.exists():
            continue
        c = json.loads((d / "computed.json").read_text())
        new_id = f"{i:02d}-{better_name(c, taken)}"
        rename[rec["id"]] = new_id

    # rename dirs (two-phase to avoid collisions)
    for old, new in rename.items():
        if old != new and (SEC / old).exists():
            shutil.move(str(SEC / old), str(SEC / f"__tmp__{new}"))
    for old, new in rename.items():
        tmp = SEC / f"__tmp__{new}"
        if tmp.exists():
            shutil.move(str(tmp), str(SEC / new))

    # --- notes.md per section -------------------------------------------
    for rec in index:
        new_id = rename.get(rec["id"], rec["id"])
        d = SEC / new_id
        if not d.exists():
            continue
        c = json.loads((d / "computed.json").read_text())
        st = c.get("style", {})
        kids = c.get("children", [])
        anims = c.get("animations") or []
        wcount = collections.Counter(c.get("widgets") or [])

        L = [f"# {new_id}", ""]
        L += [f"**Zone:** {c.get('zone')}  ·  **Rendered height:** {c['rect']['h']}px @1440  ·  "
              f"**Appears on {rec['usedOnCount']} page(s)**", ""]
        if c.get("headings"):
            L += ["## Content", ""]
            for h in c["headings"]:
                L.append(f"- `<{h['tag']}>` {h['text']}")
            L.append("")

        L += ["## Layout", "",
              "| property | value | Tailwind |", "|---|---|---|",
              f"| display | {st.get('display')} | `{'flex' if st.get('display')=='flex' else st.get('display')}` |",
              f"| direction | {st.get('flexDirection')} | `{'flex-col' if st.get('flexDirection')=='column' else 'flex-row'}` |",
              f"| padding | {st.get('padding')} | `{tw_pad(st.get('padding'))}` |",
              f"| gap | {st.get('gap')} | {'`gap-[' + st['gap'] + ']`' if st.get('gap') not in (None,'normal') else '—'} |",
              f"| background | {st.get('background')} | `{TW_COLOR.get(st.get('background'), st.get('background'))}` |",
              f"| max-width | {st.get('maxWidth')} | container is **1300px** (`max-w-[1300px] mx-auto px-[15px]`) |",
              f"| radius | {st.get('radius')}px | {'`rounded-card`' if st.get('radius')==20 else ('`rounded-[' + str(st.get('radius')) + 'px]`' if st.get('radius') else '—')} |",
              ""]
        if st.get("backgroundImage"):
            L += [f"Background image: `{st['backgroundImage'][:150]}`", ""]

        if kids:
            L += ["## Direct children (the column/grid structure)", "",
                  "| # | width | height | display | grid-template | padding | bg |",
                  "|---|---|---|---|---|---|---|"]
            for i, k in enumerate(kids, 1):
                L.append(f"| {i} | {k['w']}px | {k['h']}px | {k['display']} | "
                         f"{k.get('grid') or '—'} | {k['pad']} | {k['bg']} |")
            L.append("")

        if wcount:
            L += ["## Widgets", "", "| widget | n | rebuild note |", "|---|---|---|"]
            for w, n in wcount.most_common():
                L.append(f"| `{w}` | {n} | {WIDGET_TW.get(w, '—')} |")
            L.append("")

        L += ["## Animation", ""]
        if anims:
            for a in sorted(set(anims)):
                L.append(f"- **`{a}`** ×{anims.count(a)} — {ANIM_DOC.get(a, 'see 05-animations/animations.md')}")
        else:
            L.append("- none")
        if c.get("shinyGlassElements"):
            L.append(f"- **shiny-glass hover sweep** on {c['shinyGlassElements']} element(s) — pure CSS, see 05-animations/animations.md §5")
        L += ["", "## Appears on", ""]
        L += [f"- `{p}`" for p in rec["usedOn"][:25]]
        if len(rec["usedOn"]) > 25:
            L.append(f"- …and {len(rec['usedOn']) - 25} more")
        L += ["", "---", "",
              "Files: `structure.html` (cleaned markup) · `computed.json` (raw computed styles) · "
              "`screenshot.png` (isolated, desktop 1440)."]
        (d / "notes.md").write_text("\n".join(L), encoding="utf-8")
        rec["id"] = new_id

    idx_path.write_text(json.dumps(index, indent=1), encoding="utf-8")
    for slug, v in pmap.items():
        v["sections"] = [rename.get(s, s) for s in v["sections"]]
    (PAGES / "page-section-map.json").write_text(json.dumps(pmap, indent=1), encoding="utf-8")

    print(f"renamed + documented {len(index)} sections")
    for rec in index[:15]:
        print(f"  {rec['id']:48} used on {rec['usedOnCount']:2} page(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
