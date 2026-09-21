import { DoctorPage } from '@/templates/DoctorPage'
import { sumedhaTirthaniPage } from '@/content/doctors/sumedha-tirthani'

/**
 * /dr-sumedha-tirthani-dermatologist/
 *
 * Live-site copy as captured: seo-backup/02-markdown/dr-sumedha-tirthani-dermatologist.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/dr-sumedha-tirthani-dermatologist.png
 *
 * Built on the shared doctor template. Copy: src/content/doctors/sumedha-tirthani.ts, from
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md, Part B2.
 * The SEO head, H1 and JSON-LD stay the live capture's.
 */
export default function DrSumedhaTirthaniDermatologist() {
  return <DoctorPage slug="dr-sumedha-tirthani-dermatologist" content={sumedhaTirthaniPage} />
}
