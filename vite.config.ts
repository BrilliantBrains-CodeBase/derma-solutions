import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const SCHEMA_DIR = fileURLToPath(new URL('./src/seo/schema', import.meta.url))

/**
 * Route pathname -> schema filename stem, built from the generated registry so
 * the two can never drift. Read lazily: the registry is itself generated.
 */
let injected = 0
let schemaKeys: Map<string, string> | undefined
function schemaKeyByRoute(): Map<string, string> {
  if (schemaKeys) return schemaKeys
  const registry = fileURLToPath(new URL('./src/seo/registry.generated.ts', import.meta.url))
  const source = fs.readFileSync(registry, 'utf8')
  const map = new Map<string, string>()
  for (const m of source.matchAll(/"key":\s*"([^"]+)",\s*\n\s*"path":\s*"([^"]+)"/g)) {
    map.set(m[2], m[1])
  }
  if (map.size === 0) throw new Error('could not read routes out of src/seo/registry.generated.ts')
  schemaKeys = map
  return map
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    // Every one of the 92 live URLs ends in a trailing slash. 'nested' emits
    // dist/<path>/index.html, which serves at /<path>/. The default ('flat')
    // would emit /<path>.html and change every URL on the site.
    dirStyle: 'nested',
    concurrency: 8,
    // Beasties inlines critical CSS by rewriting <head>. Off: this build's
    // acceptance test asserts on exact <head> contents.
    beastiesOptions: false,
    /**
     * Inject each page's JSON-LD graph into its built HTML, byte-verbatim.
     *
     * fix-plan.md calls the schema the "highest-value, easiest-to-lose asset on
     * the site" and requires it ported verbatim. Doing it here rather than in
     * React means the bytes are copied, not re-serialised by JSON.stringify —
     * key order, spacing and duplicate @context keys all survive intact — and
     * ~1.9MB of structured data never reaches the client bundle.
     */
    onPageRendered(route, renderedHTML) {
      const keys = schemaKeyByRoute()
      // vite-react-ssg passes routes bare ('acne-scar-...', and '/' for the
      // homepage); the registry stores the live pathname ('/acne-scar-.../').
      const pathname = `/${route.replace(/^\/+|\/+$/g, '')}/`.replace('//', '/')
      const key = keys.get(pathname)

      // No schema is correct for /404 and, in dev, for any unmatched URL —
      // those render NotFound. A real miss is caught by the onFinished tally
      // below, so this stays quiet rather than breaking the 404 path.
      if (!key) return renderedHTML

      injected++
      const raw = fs.readFileSync(path.join(SCHEMA_DIR, `${key}.json`), 'utf8').trim()
      const tag = `<script type="application/ld+json">${raw}</script>`
      return renderedHTML.replace('</head>', `${tag}</head>`)
    },

    /** A page built without its schema is the failure this whole setup exists to prevent. */
    onFinished() {
      const expected = schemaKeyByRoute().size
      if (injected !== expected) {
        throw new Error(`JSON-LD injected into ${injected} pages, expected ${expected}. A route is missing its schema.`)
      }
      console.log(`\n[json-ld] injected ${injected} graphs byte-verbatim from src/seo/schema/`)
    },
  },
})
