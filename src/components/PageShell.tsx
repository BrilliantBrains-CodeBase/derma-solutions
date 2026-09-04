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
 *
 * A page whose H1 belongs inside a hero band passes `hero` instead. It is a
 * render prop rather than a boolean opt-out on purpose: the page receives the
 * registry's H1 to place, and still has no way to supply heading text of its
 * own, so A5 keeps holding.
 */
export function PageShell({
  slug,
  hero,
  children,
}: {
  slug: string
  /** Renders the registry's H1 inside a hero band in place of PageShell's own <h1>. */
  hero?: (h1: string) => ReactNode
  children?: ReactNode
}) {
  const record = getSeo(slug)

  return (
    <>
      <Seo record={record} />
      <JsonLd schemaKey={record.key} />
      <main id="content">
        {hero ? hero(record.h1) : <h1>{record.h1}</h1>}
        {children}
      </main>
    </>
  )
}
