import { ContentPage } from '@/templates/ContentPage'
import content from '@/content/pages/terms-of-use'

/**
 * /terms-of-use/
 *
 * Live-site copy as captured: seo-backup/02-markdown/terms-of-use.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/terms-of-use.png
 *
 * Built on the shared content template. Copy: src/content/pages/terms-of-use.ts,
 * hand-ported from the capture above.
 */
export default function TermsOfUse() {
  return <ContentPage slug="terms-of-use" content={content} />
}
