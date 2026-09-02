# SEO & Content Backup — dermasolutions.co.in

**Captured:** 2026-09-02 · **Scope:** all 92 indexable URLs · **Source:** live production site

This is a frozen, verifiable snapshot of the Derma Solutions website taken **before** the rebuild.
It exists to do two jobs:

1. **Source of truth for the migration.** Every slug, meta title, meta description, canonical, OG tag,
   heading, schema block and word of body copy the current site ranks on is recorded here. The new
   site gets diffed against `07-migration/seo-map.csv` page by page.
2. **Disaster recovery.** If the live site is lost or overwritten mid-migration, its entire public
   SEO surface can be rebuilt from this folder alone.

---

## Start here

| I want to… | Open |
|---|---|
| See every page's SEO fields in one table | `07-migration/seo-map.csv` |
| Know what must not change | `07-migration/gaps-and-opportunities.md` → **PRESERVE** |
| Know what's currently broken or weak | `07-migration/gaps-and-opportunities.md` → **CRITICAL** / **IMPROVE** |
| Know what to actually *do* about it | `07-migration/fix-plan.md` |
| Re-install analytics on the new site | `00-site-level/tracking.md` |
| Plan URL redirects | `07-migration/redirect-map.csv` |
| Re-author a page's copy | `02-markdown/<slug>.md` |
| See exactly what a page looked like | `05-screenshots/desktop/<slug>.png` |
| Recover a page's structured data | `04-seo-extracted/schema/<slug>.jsonld` |
| Verify nothing was corrupted | `python3 _logs/verify.py` |

---

## What's in here

```
00-site-level/    robots.txt, all 4 sitemaps, the frozen 92-URL list, per-URL response
                  headers, llms.txt status, tracking.md (GTM/GA4/Pixel IDs, browser-verified)
01-raw-html/      byte-exact HTML per URL, captured twice:
                    desktop/  Chrome desktop UA
                    mobile/   Googlebot-Smartphone UA
02-markdown/      clean LLM-ready content per URL (Firecrawl) — use this to re-author copy
03-wp-rest/       unfiltered WordPress REST dumps: pages, posts, categories, media, types
04-seo-extracted/ per-page/  parsed SEO fields as JSON
                  schema/    every JSON-LD block, byte-verbatim, unreformatted
05-screenshots/   desktop/ 1440px full-page · mobile/ 390px full-page
06-media/         media-library.json (all 542 records incl. alt text)
                  files/ (451 images actually used on the live pages)
07-migration/     seo-map.csv/.json · redirect-map.csv
                  gaps-and-opportunities.md  (what's wrong)
                  fix-plan.md                (what to do about it)
MANIFEST.json     capture timestamps, tool versions, SHA-256 per HTML file
_logs/            every script used, re-runnable, plus raw run logs
```

## How it was captured

Three sources, each used where it is strictly best — no single tool gives a trustworthy backup:

- **`curl --compressed`** → raw pre-render HTML, exactly as Googlebot's first pass sees it.
  *(`--compressed` is mandatory: without it the server returns raw gzip and every parse silently
  matches nothing. The verification suite checks for this.)*
- **WordPress REST API** → canonical slugs, IDs, `modified` dates, stored Slim SEO meta, media alt text.
- **Firecrawl** (92 credits) → clean markdown + normalized metadata, cross-checked against the HTML parse.
- **Playwright + Chromium, local** → full-page screenshots at two viewports, with lazy-loading forced,
  sticky headers unpinned, popups suppressed and animations frozen.

## Re-running

Everything in `_logs/` is idempotent and re-runnable; scripts skip work already done.

```bash
cd /Users/d1/dermasolution/seo-backup
python3 _logs/fetch_html.py        # dual-UA raw HTML
./_logs/fc_scrape.sh               # Firecrawl markdown  (./_logs/fc_retry.sh for rate-limit misses)
node    _logs/shoot.js desktop     # screenshots (or: mobile)
python3 _logs/fetch_media.py       # media library + referenced images
python3 _logs/extract_seo.py       # parse HTML -> SEO JSON + schema
python3 _logs/build_migration.py   # seo-map.csv, redirect-map.csv, gaps report
python3 _logs/build_manifest.py    # MANIFEST.json
python3 _logs/verify.py            # integrity checks
```

> **Note on Firecrawl:** the account is capped at ~10 requests/min. `fc_scrape.sh` runs flat-out and
> some pages will hit that limit; `fc_retry.sh` re-fetches only the misses with backoff. This is a
> plan limit, not a site problem.
