#!/usr/bin/env python3
"""Step 4b - aggregate raw computed-style samples into a design token set.

Emits:
  03-design-system/tokens.json        machine-readable, full frequency data
  03-design-system/tokens.css         Tailwind v4 @theme block  <- for the Vite app
  03-design-system/tailwind.config.ts v3-compatible fallback
  03-design-system/typography.md      the real type scale, with live examples
  03-design-system/colors.md          palette + where each colour is actually used
"""
import json, re, collections, sys
from pathlib import Path

B = Path(__file__).resolve().parent.parent
RAW = B / "03-design-system" / "raw"
OUT = B / "03-design-system"

# Authoritative token set, verbatim from the theme's own css-variable.css.
CANON = {
    "#481E0B": "primary",    "#FCF4F1": "secondary",
    "#69615D": "text",       "#CD5F37": "accent",
    "#FFFFFF": "white",      "#000000": "black",
}
# Injected by the awaikenthemes demo panel, never by the theme. Must not ship.
DEMO_CHROME = {"#D2E761", "#F8FBEF", "#F5F1FF", "#128293", "#1D2327"}


def to_hex(c: str):
    """rgb()/rgba() -> #RRGGBB (+alpha suffix). Returns None if fully transparent."""
    m = re.match(r"rgba?\(([^)]+)\)", c or "")
    if not m:
        return c.upper() if (c or "").startswith("#") else None
    parts = [p.strip() for p in m.group(1).replace("/", " ").split(",")]
    if len(parts) == 1:
        parts = m.group(1).split()
    try:
        r, g, b = (int(float(x)) for x in parts[:3])
    except ValueError:
        return None
    a = float(parts[3]) if len(parts) > 3 else 1.0
    if a == 0:
        return None
    hx = f"#{r:02X}{g:02X}{b:02X}"
    return hx if a >= 0.999 else f"{hx}{int(round(a*255)):02X}"


def cluster(vals, tol=1):
    """Collapse near-identical numeric values, keeping the most frequent."""
    cnt = collections.Counter(vals)
    out = {}
    for v, n in cnt.most_common():
        for k in out:
            if abs(k - v) <= tol:
                out[k] += n
                break
        else:
            out[v] = n
    return dict(sorted(out.items()))


def main() -> int:
    files = sorted(RAW.glob("*.json"))
    if not files:
        print("no raw samples - run extract_design.js first", file=sys.stderr)
        return 1

    colors, bgs, radii, shadows, spaces, containers = (collections.Counter() for _ in range(6))
    types, borders, theme_vars = [], collections.Counter(), {}

    for f in files:
        d = json.loads(f.read_text())
        page = f.stem
        for c in d.get("color", []):
            if h := to_hex(c): colors[h] += 1
        for c in d.get("bg", []):
            if h := to_hex(c): bgs[h] += 1
        radii.update(d.get("radius", []))
        shadows.update(d.get("shadow", []))
        spaces.update(d.get("space", []))
        containers.update(d.get("container", []))
        borders.update(d.get("border", []))
        theme_vars.update(d.get("vars", {}))
        for t in d.get("type", []):
            t["page"] = page
            types.append(t)

    # ---- flag anything that is demo chrome rather than theme --------------
    stray = {h: n for h, n in colors.items() if h[:7] in DEMO_CHROME}
    stray.update({h: n for h, n in bgs.items() if h[:7] in DEMO_CHROME})

    # ---- typography scale -------------------------------------------------
    by_role = collections.defaultdict(collections.Counter)
    for t in types:
        role = t["tag"]
        by_role[role][(t["family"], t["size"], t["weight"], t["lh"], t["ls"], t["transform"])] += 1

    typescale = {}
    for role, c in sorted(by_role.items()):
        variants = []
        for (fam, size, weight, lh, ls, tr), n in c.most_common(6):
            ex = next((t["sample"] for t in types
                       if t["tag"] == role and t["size"] == size and t["family"] == fam), "")
            variants.append({"family": fam, "size_px": size, "weight": weight,
                             "line_height": lh, "letter_spacing": ls,
                             "text_transform": tr, "count": n, "example": ex})
        typescale[role] = variants

    families = collections.Counter(t["family"] for t in types)

    tokens = {
        "source": "https://demo.awaikenthemes.com/glowix/",
        "pages_sampled": len(files),
        "authoritative_vars": theme_vars,
        "colors": {
            "canonical": CANON,
            "text_colors": dict(colors.most_common(24)),
            "background_colors": dict(bgs.most_common(24)),
            "demo_chrome_excluded": stray,
        },
        "fonts": {"families": dict(families), "heading": "Marcellus", "body": "Sora"},
        "typography": typescale,
        "radius": cluster(list(radii.elements())),
        "spacing": cluster(list(spaces.elements())),
        # Elements matching /container|wrapper/ include small icon boxes; only
        # widths >=600px are real layout containers. 1300px is the theme's
        # .container max-width (style.css), 1400px Elementor's boxed e-con width.
        "containers": {k: v for k, v in
                       cluster(list(containers.elements()), tol=4).items() if k >= 600},
        "containers_all": cluster(list(containers.elements()), tol=4),
        "shadows": dict(shadows.most_common(12)),
        "borders": dict(borders.most_common(12)),
    }
    (OUT / "tokens.json").write_text(json.dumps(tokens, indent=1), encoding="utf-8")

    # ---- Tailwind v4 @theme ----------------------------------------------
    top_radii = [r for r, _ in collections.Counter(radii).most_common(8) if r]
    css = f"""/* Glowix design tokens - Tailwind v4.
 * Derived from computed styles across {len(files)} pages, reconciled against the
 * theme's own css-variable.css. Import once in your Vite entry CSS:
 *
 *   @import "tailwindcss";
 *   @import "./tokens.css";
 */
@theme {{
  /* -- colour ------------------------------------------------------------ */
  --color-primary:      #481E0B;   /* deep brown  - headings, dark sections  */
  --color-secondary:    #FCF4F1;   /* cream       - alternating section bg   */
  --color-accent:       #CD5F37;   /* terracotta  - CTAs, eyebrows, icons    */
  --color-body:         #69615D;   /* warm grey   - paragraph text           */
  --color-white:        #FFFFFF;
  --color-black:        #000000;
  --color-divider:      #CD5F371A; /* accent @10% - hairlines on light       */
  --color-divider-dark: #FFFFFF1A; /* white  @10% - hairlines on dark        */

  /* -- type -------------------------------------------------------------- */
  --font-display: "Marcellus", ui-serif, Georgia, serif;
  --font-sans:    "Sora", ui-sans-serif, system-ui, sans-serif;

  /* -- radius ------------------------------------------------------------ */
  --radius-pill: 100px;  /* primary buttons     */
  --radius-field: 40px;  /* inputs              */
  --radius-card: 20px;   /* cards, media frames */
"""
    for r in sorted(top_radii):
        if r not in (100, 40, 20):
            css += f"  --radius-{r}: {r}px;\n"
    css += "}\n"
    (OUT / "tokens.css").write_text(css, encoding="utf-8")

    # ---- v3 fallback ------------------------------------------------------
    ts = """import type { Config } from 'tailwindcss'

/** Tailwind v3 fallback. Prefer tokens.css (@theme) on Tailwind v4 + Vite. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        primary:   '#481E0B',
        secondary: '#FCF4F1',
        accent:    '#CD5F37',
        body:      '#69615D',
        divider:   '#CD5F371A',
        'divider-dark': '#FFFFFF1A',
      },
      fontFamily: {
        display: ['Marcellus', 'ui-serif', 'Georgia', 'serif'],
        sans:    ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: { pill: '100px', field: '40px', card: '20px' },
    },
  },
  plugins: [],
} satisfies Config
"""
    (OUT / "tailwind.config.ts").write_text(ts, encoding="utf-8")

    # ---- human-readable reports ------------------------------------------
    lines = ["# Typography — measured, not guessed", "",
             f"Sampled across **{len(files)} pages**. Counts are how many rendered "
             "text nodes use each combination, so the top row of each table is the "
             "dominant real-world usage.", "",
             "Font families by usage: " +
             ", ".join(f"`{k}` ({v})" for k, v in families.most_common()), ""]
    for role, variants in typescale.items():
        if not variants:
            continue
        lines += [f"## `<{role}>`", "",
                  "| font | px | weight | line-height | tracking | transform | n | example |",
                  "|---|---|---|---|---|---|---|---|"]
        for v in variants:
            ex = (v["example"] or "").replace("|", "\\|")[:44]
            lines.append(f"| {v['family']} | {v['size_px']} | {v['weight']} | "
                         f"{v['line_height']} | {v['letter_spacing']} | "
                         f"{v['text_transform']} | {v['count']} | {ex} |")
        lines.append("")
    (OUT / "typography.md").write_text("\n".join(lines), encoding="utf-8")

    clines = ["# Colour — what is actually painted", "",
              "The theme declares its tokens in `assets/css/css-variable.css`; these "
              "counts confirm how each one is really used across the site.", "",
              "## Canonical tokens", "",
              "| hex | token | role |", "|---|---|---|",
              "| `#481E0B` | primary | headings, dark section backgrounds |",
              "| `#FCF4F1` | secondary | alternating light section background |",
              "| `#CD5F37` | accent | CTAs, eyebrow labels, icons, underlines |",
              "| `#69615D` | text | paragraph body copy |",
              "| `#CD5F371A` | divider | hairline rules on light backgrounds |",
              "| `#FFFFFF1A` | divider-dark | hairline rules on dark backgrounds |", "",
              "## Measured text colours", "", "| hex | nodes | token |", "|---|---|---|"]
    for h, n in colors.most_common(15):
        clines.append(f"| `{h}` | {n} | {CANON.get(h[:7], '—')} |")
    clines += ["", "## Measured background colours", "", "| hex | nodes | token |", "|---|---|---|"]
    for h, n in bgs.most_common(15):
        clines.append(f"| `{h}` | {n} | {CANON.get(h[:7], '—')} |")
    if stray:
        clines += ["", "## Excluded — awaikenthemes demo chrome", "",
                   "These come from the demo's floating *Buy Now* panel "
                   "(`theme-panel-dynamic.js`), **not** from the Glowix theme. They are "
                   "network-blocked during capture and must never reach production.", "",
                   "| hex | nodes |", "|---|---|"]
        clines += [f"| `{h}` | {n} |" for h, n in stray.items()]
    (OUT / "colors.md").write_text("\n".join(clines), encoding="utf-8")

    print(f"pages sampled     : {len(files)}")
    print(f"text nodes        : {len(types)}")
    print(f"distinct text cols: {len(colors)}   bg cols: {len(bgs)}")
    print(f"radii             : {sorted(set(radii))[:12]}")
    print(f"containers        : {sorted(set(containers))[:10]}")
    print(f"demo chrome found : {stray or 'none (correctly blocked)'}")
    print(f"theme vars        : {len(theme_vars)} captured")
    return 0


if __name__ == "__main__":
    sys.exit(main())
