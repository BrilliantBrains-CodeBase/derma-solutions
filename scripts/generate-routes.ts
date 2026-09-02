/**
 * Writes src/routes.generated.tsx — the single route table for all 92 URLs.
 *
 * Generated rather than hand-maintained so a URL can never exist in the SEO
 * registry without a route, or vice versa.
 *
 * Run: npm run seo:routes
 */
import fs from 'node:fs'
import path from 'node:path'
import { SRC } from './paths.ts'
import { seoRecords } from '../src/seo/registry.generated.ts'

function componentName(slug: string): string {
  const pascal = slug.split(/[^a-zA-Z0-9]+/).filter(Boolean)
    .map(p => p[0].toUpperCase() + p.slice(1)).join('')
  return /^[0-9]/.test(pascal) ? `Page${pascal}` : pascal
}

const home = seoRecords.find(r => r.path === '/')!
const stubs = seoRecords.filter(r => r.type !== 'post' && r.path !== '/')
const posts = seoRecords.filter(r => r.type === 'post')

/** '/acne-scar-treatment-in-bangalore/' -> 'acne-scar-treatment-in-bangalore' (react-router child path) */
const childPath = (p: string) => p.replace(/^\/|\/$/g, '')

const lazyRoute = (record: typeof seoRecords[number]) => {
  const name = record.path === '/' ? 'Home' : componentName(record.slug)
  return `  { path: '${childPath(record.path)}', lazy: async () => ({ Component: (await import('./pages/${name}')).default }) },`
}

const out = `/**
 * GENERATED FILE — DO NOT EDIT. Run \`npm run seo:routes\`.
 *
 * All 92 live URLs, derived from src/seo/registry.generated.ts:
 *   ${seoRecords.filter(r => r.type === 'page').length} WordPress pages · ${posts.length} posts · ${seoRecords.filter(r => r.type === 'other').length} category archive
 *
 * Paths are written WITHOUT a trailing slash because that is react-router's
 * form; \`dirStyle: 'nested'\` in vite.config.ts turns each one back into
 * dist/<path>/index.html, which serves at the original trailing-slash URL.
 */
import type { RouteRecord } from 'vite-react-ssg'
import { RootLayout } from './layout/RootLayout'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/Home')).default }) },

      /* ---- WordPress pages (${stubs.length}) ---------------------------------------------- */
${stubs.map(lazyRoute).join('\n')}

      /* ---- Blog posts (${posts.length}) — one shared template ------------------------- */
${posts.map(r => `  { path: '${childPath(r.path)}', element: <BlogPost slug="${r.slug}" /> },`).join('\n')}

      /* ---- Not found -------------------------------------------------------
       * '404' is prerendered so static hosts have a 404.html to serve; the
       * post-build step moves it to dist/404.html. The catch-all handles
       * client-side navigation. Neither is in the sitemap, both are noindex.
       */
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

/** Sanity: the homepage record the registry expects to back \`index: true\`. */
export const homeSlug = '${home.slug}'
`

fs.writeFileSync(path.join(SRC, 'routes.generated.tsx'), out)
console.log(`routes: 1 index + ${stubs.length} lazy pages + ${posts.length} blog posts + 1 catch-all`)
