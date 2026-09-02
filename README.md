# Derma Solutions — site rebuild

Vite + React + TypeScript + Tailwind v4, prerendered to static HTML.

**Current state: scaffold.** All 92 live URLs exist as routes with their full SEO surface
reproduced from the pre-rebuild capture. **The pages themselves are blank** — content and
section work lands page by page from here.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/, 92 prerendered pages
npm run seo:verify # the acceptance test (run after a build)
```

## Why it's built this way

The site is being rebuilt off WordPress without losing its rankings.
`seo-backup/07-migration/fix-plan.md` sets the constraint:

> Every meta title and description — verbatim. This is now the hardest constraint in the plan.

So none of the SEO data is hand-written. `scripts/build-seo-registry.ts` reads
`seo-backup/` and generates it, and `scripts/verify-seo.ts` diffs the built HTML back
against the same capture. The backup is the source of truth and the test suite both.

Two consequences worth knowing:

- **Rendering is SSG, not SPA.** Each route becomes a real `dist/<path>/index.html` with its
  title, description, canonical and JSON-LD in the raw HTML — the way WordPress served them.
  A client-rendered SPA would ship one generic `<head>` for all 92 URLs.
- **JSON-LD is injected at build time**, by the `onPageRendered` hook in `vite.config.ts`,
  not rendered by React. That copies the bytes rather than re-serialising them, so key order
  and spacing survive exactly — and keeps ~1.9MB of structured data out of the client bundle.

## Layout

```
src/
  config/site.ts              brand, NAP, hours, team, nav — hand-written, the other source of truth
  seo/
    registry.generated.ts     92 SeoRecords          GENERATED
    schema/<key>.json         92 JSON-LD graphs      GENERATED (byte-verbatim copies)
    Seo.tsx  JsonLd.tsx       <head> emitters
  routes.generated.tsx        the route table        GENERATED
  pages/                      55 blank stubs + BlogPost.tsx (37 posts) + NotFound.tsx
  components/PageShell.tsx    the page <-> SEO contract
  layout/                     RootLayout, Header, Footer — structural, undesigned
  styles/                     Tailwind v4 + Glowix tokens + self-hosted Marcellus/Sora
scripts/                      the generators and the two verifiers
```

`registry.generated.ts`, `routes.generated.tsx` and `seo/schema/` are generated — edit the
scripts or the backup, then `npm run seo:generate`. The page stubs are generated **once** and
never overwritten, so filling one in is safe.

## Adding content to a page

1. Open the stub, e.g. `src/pages/AcneScarTreatmentInBangalore.tsx`. Its header comment points
   at the captured copy (`seo-backup/02-markdown/<slug>.md`) and screenshots.
2. Write the content inside `<PageShell>`. **Do not add an `<h1>`** — `PageShell` renders the
   one the registry holds. That is what keeps fix-plan A5 (one H1 per page) true by construction.
3. `npm run build && npm run seo:verify` — the metadata must still match.

Section specs for the visual rebuild are in `theme-reference/04-sections/<NN>-<name>/notes.md`,
and which sections make up a page is in `theme-reference/08-pages/page-section-map.json`.

## Scripts

| Command | Does |
|---|---|
| `npm run seo:generate` | registry + stubs + routes + assets + icons, all from the backups |
| `npm run seo:verify` | asserts `dist/` reproduces the capture; asserts nav links resolve |
| `npm run seo:registry` | just the SEO registry and the schema copies |
| `npm run seo:routes` | just the route table |
| `npm run seo:stubs` | new page stubs (never overwrites an existing file) |
| `npm run seo:assets` / `seo:icons` | brand images out of the backup; derived favicons + og:image |
| `npm run typecheck` | `tsc --noEmit` |

## Deploy notes

`dist/` is static. The host needs:

- **Trailing slashes preserved.** Every URL ends in `/` and `dist/<path>/index.html` matches
  that. A host configured to strip trailing slashes will 301 all 92 URLs.
- `dist/404.html` served for unmatched paths.
- No SPA catch-all rewrite to `/index.html` — that would serve the homepage's `<head>`
  everywhere and undo the entire point.

## Still owed before launch

- **Tracking** (fix-plan A1): GTM `GTM-PWVJVRQ`, GA4 `G-3KNBG0VTG0`, Pixel `1327906075791898`
  are recorded in `src/config/site.ts` but **not installed**. Export the GTM container config
  from the console first — it is not in the backup and cannot be recovered from the site.
- **`/contact-us/`** — the Service schema points `serviceUrl` at it and it 404s today. Build
  the page; do not edit the schema. `npm run seo:verify` reports this every run.
- **Retirement decisions** (fix-plan A2/A3): `/maintenance-page/` and the IV Glutathione
  duplicate are built as normal routes for now. Both carry a `note` in the registry and in
  their stub's header comment. Both need GSC data before acting.
- **`og:default.jpg` and the favicons are derived placeholders** — the sized crops were never
  captured and the live site has no og:image at all. Replace with real clinic photography.
- **Unresolved conflicts in `src/config/site.ts`**: opening hours (schema says Mon+Wed–Sun
  10:00–20:00, the footer says all days 09:30–18:00) and the two address wordings. Search that
  file for `CONFLICT`.
