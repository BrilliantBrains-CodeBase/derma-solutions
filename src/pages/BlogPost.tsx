import { PageShell } from '@/components/PageShell'

/**
 * Shared template for all 37 WordPress posts. Each blog route passes its own
 * slug; the SEO, H1 and JSON-LD all come from the registry as usual.
 *
 * Captured copy for any post: seo-backup/02-markdown/<slug>.md
 */
export default function BlogPost({ slug }: { slug: string }) {
  return (
    <PageShell slug={slug}>
      {/* article content goes here */}
    </PageShell>
  )
}
