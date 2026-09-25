import { ContentPage } from '@/templates/ContentPage'
import content from '@/content/pages/privacy-policy'

/**
 * /privacy-policy/
 *
 * Live-site copy as captured: seo-backup/02-markdown/privacy-policy.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/privacy-policy.png
 *
 * Built on the shared content template. Copy: src/content/pages/privacy-policy.ts,
 * hand-ported from the capture above.
 */
export default function PrivacyPolicy() {
  return <ContentPage slug="privacy-policy" content={content} />
}
