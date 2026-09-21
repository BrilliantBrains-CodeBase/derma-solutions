import { DoctorPage } from '@/templates/DoctorPage'
import { sandeepMahapatraPage } from '@/content/doctors/sandeep-mahapatra'

/**
 * /best-dermatologist-in-marathahalli-whitefield-bangalore/
 *
 * Live-site copy as captured: seo-backup/02-markdown/best-dermatologist-in-marathahalli-whitefield-bangalore.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/best-dermatologist-in-marathahalli-whitefield-bangalore.png
 *
 * Built on the shared doctor template. Copy: src/content/doctors/sandeep-mahapatra.ts, from
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md, Part B1.
 * The SEO head, H1 and JSON-LD stay the live capture's.
 */
export default function BestDermatologistInMarathahalliWhitefieldBangalore() {
  return <DoctorPage slug="best-dermatologist-in-marathahalli-whitefield-bangalore" content={sandeepMahapatraPage} />
}
