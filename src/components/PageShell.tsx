import type { ReactNode } from 'react'
import { getSeo } from '@/seo/registry.generated'
import { Seo } from '@/seo/Seo'
import { JsonLd } from '@/seo/JsonLd'

/**
 * The contract between a (currently blank) page and its SEO.
 *
 * Every one of the 92 routes renders through here, which is what makes
 * fix-plan A5 structurally true: the H1 comes from the registry, so a page
 * cannot ship with zero H1s or with two.
 */
export function PageShell({ slug, children }: { slug: string; children?: ReactNode }) {
  const record = getSeo(slug)

  return (
    <>
      <Seo record={record} />
      <JsonLd schemaKey={record.key} />
      <main id="content">
        <h1>{record.h1}</h1>
        {children}
      </main>
    </>
  )
}
