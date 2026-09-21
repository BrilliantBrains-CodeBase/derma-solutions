import { DoctorPage } from '@/templates/DoctorPage'
import { thyagarajPage } from '@/content/doctors/thyagaraj'

/**
 * /dr-thyagaraj-best-plastic-surgeon-in-bangalore/
 *
 * Live-site copy as captured: seo-backup/02-markdown/dr-thyagaraj-best-plastic-surgeon-in-bangalore.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/dr-thyagaraj-best-plastic-surgeon-in-bangalore.png
 *
 * Built on the shared doctor template. Copy: src/content/doctors/thyagaraj.ts, from
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md, Part B3.
 * The SEO head, H1 and JSON-LD stay the live capture's.
 */
export default function DrThyagarajBestPlasticSurgeonInBangalore() {
  return <DoctorPage slug="dr-thyagaraj-best-plastic-surgeon-in-bangalore" content={thyagarajPage} />
}
