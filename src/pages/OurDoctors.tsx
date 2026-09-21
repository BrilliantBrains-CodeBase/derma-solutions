import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { team } from '@/config/site'
import { ourDoctorsPage } from '@/content/doctor'
import { DoctorBandView } from '@/templates/DoctorPage'
import { DoctorProfile } from '@/sections/doctor/DoctorProfile'

/**
 * /our-doctors/
 *
 * NOT in the live capture. Its SEO is authored in scripts/added-pages.ts, and
 * its JSON-LD — the cloned site entities plus a Physician node for each doctor
 * the template graph has none for — comes from that entry's `extraNodes`
 * (scripts/schema-nodes.ts ourDoctorsExtraNodes). Production injects
 * src/seo/schema/our-doctors.json byte-verbatim.
 *
 * Copy: content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md,
 * Part A (A1–A8), via src/content/doctor.ts. Layout:
 * theme-reference/08-pages/page-section-map.json "our-team", whose doctor grid
 * (40-dr-neha-verma) the doc replaces with one 21-about-me block per doctor,
 * alternating image left and right, each linking to the full profile.
 *
 * GROUND ALTERNATION, as on the About page: A1 white · A2 white · A3 cream ·
 * A4 white · A5 cream · A6 white · A7 white · A8 dark. No two panels touch.
 */
export default function OurDoctors() {
  return (
    <PageShell
      slug="our-doctors"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              ourDoctorsPage.breadcrumbSection,
              { label: ourDoctorsPage.breadcrumbName },
            ]}
          />
        </PageHeader>
      )}
    >
      {/* A1 · white · ref 11 */}
      <DoctorBandView band={ourDoctorsPage.intro} headingId="our-doctors-intro-heading" />

      {/* A2–A5 · ref 21 — the template block, image side alternating */}
      {ourDoctorsPage.doctors.map((entry, index) => {
        const member = team.find(m => m.id === entry.id)!
        return (
          <DoctorProfile
            key={entry.id}
            member={member}
            block={entry.block}
            tone={entry.tone}
            headingId={`our-doctors-${entry.id}-heading`}
            imageSide={index % 2 === 0 ? 'left' : 'right'}
            cta={{ label: ourDoctorsPage.profileCtaLabel, path: member.path }}
            priority={index === 0}
          />
        )
      })}

      {/* A6 · white · ref 06 */}
      <DoctorBandView band={ourDoctorsPage.why} headingId="our-doctors-why-heading" />
      {/* A7 · white · ref 04 */}
      <DoctorBandView band={{ kind: 'visitClinic', tone: 'white' }} headingId="our-doctors-visit-heading" />
      {/* A8 · dark · ref 15 */}
      <DoctorBandView band={ourDoctorsPage.cta} headingId="our-doctors-cta-heading" />
    </PageShell>
  )
}
