import { TreatmentPage } from '@/templates/TreatmentPage'
import content from '@/content/treatments/thread-lifts'

/**
 * /thread-lifts/
 *
 * Live-site copy as captured: seo-backup/02-markdown/thread-lifts.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/thread-lifts.png
 *
 * Built on the shared treatment template. Copy: src/content/treatments/thread-lifts.ts,
 * generated from content/Treatment/Derma-Solutions-All-Treatment-Pages-Content.md.
 * Images: src/content/treatmentMedia.ts.
 */
export default function ThreadLifts() {
  return <TreatmentPage slug="thread-lifts" content={content} />
}
