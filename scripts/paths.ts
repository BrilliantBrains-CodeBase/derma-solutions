import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

export const ROOT = fileURLToPath(new URL('..', import.meta.url))

export const BACKUP = path.join(ROOT, 'seo-backup')
export const THEME = path.join(ROOT, 'theme-reference')

export const SEO_MAP_CSV = path.join(BACKUP, '07-migration', 'seo-map.csv')
export const PER_PAGE_DIR = path.join(BACKUP, '04-seo-extracted', 'per-page')
export const SCHEMA_DIR = path.join(BACKUP, '04-seo-extracted', 'schema')
export const MEDIA_FILES = path.join(BACKUP, '06-media', 'files')

export const SRC = path.join(ROOT, 'src')
export const SEO_OUT = path.join(SRC, 'seo')
export const SCHEMA_OUT = path.join(SEO_OUT, 'schema')
export const PAGES_OUT = path.join(SRC, 'pages')
export const PUBLIC = path.join(ROOT, 'public')
export const DIST = path.join(ROOT, 'dist')

/**
 * The backup names two files specially: the homepage is captured as `_homepage`
 * and the category archive as `category__uncategorized`. Everything else is its
 * own slug. Both the per-page JSON and the .jsonld follow this convention.
 */
export function backupKey(slug: string, url: string): string {
  if (url === 'https://dermasolutions.co.in/' || slug === 'derma-solutions-home') return '_homepage'
  return slug
}
