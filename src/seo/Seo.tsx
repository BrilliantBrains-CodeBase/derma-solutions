import { Head } from 'vite-react-ssg'
import type { SeoRecord } from './registry.generated'
import { seo as seoDefaults } from '@/config/site'

/**
 * Emits one page's <head>.
 *
 * Every value comes from the generated registry, which took it verbatim from
 * the live-site capture. Nothing here invents, truncates or "improves" a title
 * or description — see seo-backup/07-migration/fix-plan.md, "What must NOT change".
 */
export function Seo({ record }: { record: SeoRecord }) {
  return (
    <Head>
      <html lang={seoDefaults.locale} />
      <title>{record.title}</title>
      <meta name="description" content={record.description} />
      <meta name="robots" content={record.robots} />
      <link rel="canonical" href={record.canonical} />

      {Object.entries(record.og).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      {Object.entries(record.twitter).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Head>
  )
}
