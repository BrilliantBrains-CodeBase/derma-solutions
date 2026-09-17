import { TreatmentPage } from '@/templates/TreatmentPage'
import content from '@/content/treatments/dermato-surgery-in-bangalore'

/**
 * /dermato-surgery-in-bangalore/
 *
 * NOT in the live capture: there is no captured copy or screenshot. Its SEO is
 * authored in scripts/added-pages.ts.
 *
 * NOTE: New page, not in the live capture (content/Treatment doc note 4). Needs a doctor review before publishing.
 *
 * Built on the shared treatment template. Copy: src/content/treatments/dermato-surgery-in-bangalore.ts,
 * generated from content/Treatment/Derma-Solutions-All-Treatment-Pages-Content.md.
 * Images: src/content/treatmentMedia.ts.
 */
export default function DermatoSurgeryInBangalore() {
  return <TreatmentPage slug="dermato-surgery-in-bangalore" content={content} />
}
