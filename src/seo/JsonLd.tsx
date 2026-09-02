import { Head } from 'vite-react-ssg'

/**
 * The page's JSON-LD graph.
 *
 * In production the graph is NOT part of the JS bundle. It is injected into the
 * built HTML byte-verbatim by the `onPageRendered` hook in vite.config.ts, which
 * copies src/seo/schema/<key>.json straight through. That is the only way to
 * guarantee what fix-plan.md demands — "port 04-seo-extracted/schema/*.jsonld
 * byte-verbatim" — and it keeps ~1.9MB of structured data out of the client.
 *
 * This component exists so `vite dev` shows the same <head> as the build. It is
 * dead code in production: `import.meta.env.DEV` is replaced with `false` and
 * the glob is tree-shaken away. scripts/verify-seo.ts asserts that.
 */
const devSchemas: Record<string, string> = import.meta.env.DEV
  ? (import.meta.glob('./schema/*.json', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>)
  : {}

export function JsonLd({ schemaKey }: { schemaKey: string }) {
  if (!import.meta.env.DEV) return null
  const raw = devSchemas[`./schema/${schemaKey}.json`]
  if (!raw) return null
  return (
    <Head>
      <script type="application/ld+json">{raw}</script>
    </Head>
  )
}
