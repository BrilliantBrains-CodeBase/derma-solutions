/**
 * Writes one blank page component per WordPress *page* (plus the category
 * archive). The 37 *posts* share src/pages/BlogPost.tsx and get no file.
 *
 * Existing files are never overwritten — once someone starts filling a page in,
 * re-running this script must not wipe their work.
 *
 * Run: npm run seo:stubs
 */
import fs from 'node:fs'
import path from 'node:path'
import { PAGES_OUT } from './paths.ts'
import { seoRecords } from '../src/seo/registry.generated.ts'

/** 'acne-scar-treatment-in-bangalore' -> 'AcneScarTreatmentInBangalore' */
function componentName(slug: string): string {
  const pascal = slug
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join('')
  return /^[0-9]/.test(pascal) ? `Page${pascal}` : pascal
}

fs.mkdirSync(PAGES_OUT, { recursive: true })

const stubs = seoRecords.filter(r => r.type !== 'post')
let written = 0
let skipped = 0

for (const record of stubs) {
  const name = record.slug === 'derma-solutions-home' ? 'Home' : componentName(record.slug)
  const file = path.join(PAGES_OUT, `${name}.tsx`)

  if (fs.existsSync(file)) { skipped++; continue }

  const note = record.note ? `\n *\n * NOTE: ${record.note}` : ''
  const copy = record.markdown ? `seo-backup/${record.markdown}` : '(no captured markdown)'

  fs.writeFileSync(file, `import { PageShell } from '@/components/PageShell'

/**
 * ${record.path}
 *
 * Blank by design. Captured copy for this page: ${copy}
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/${record.key}.png${note}
 */
export default function ${name}() {
  return (
    <PageShell slug="${record.slug}">
      {/* content goes here */}
    </PageShell>
  )
}
`)
  written++
}

console.log(`stubs: ${written} written, ${skipped} left alone (${stubs.length} non-post URLs)`)
console.log(`posts: ${seoRecords.filter(r => r.type === 'post').length} routed through src/pages/BlogPost.tsx`)
