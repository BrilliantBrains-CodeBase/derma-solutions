import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { team } from '@/config/site'
import { ourDoctorsPage, type DoctorBand, type DoctorPageContent } from '@/content/doctor'
import { getSeo } from '@/seo/registry.generated'
import { DoctorProfile } from '@/sections/doctor/DoctorProfile'
import { DoctorCounters } from '@/sections/doctor/DoctorCounters'
import { DoctorTimeline } from '@/sections/doctor/DoctorTimeline'
import { DoctorCards } from '@/sections/doctor/DoctorCards'
import { DoctorIconBoxes } from '@/sections/doctor/DoctorIconBoxes'
import { DoctorProse } from '@/sections/doctor/DoctorProse'
import { DoctorChecklist } from '@/sections/doctor/DoctorChecklist'
import { DoctorTestimonials } from '@/sections/doctor/DoctorTestimonials'
import { DoctorVideos } from '@/sections/doctor/DoctorVideos'
import { DoctorFaq } from '@/sections/doctor/DoctorFaq'
import { DoctorVisitClinic } from '@/sections/doctor/DoctorVisitClinic'
import { DoctorCta } from '@/sections/doctor/DoctorCta'

/**
 * The shared template behind the four doctor profiles (Parts B1–B4 of
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md), as
 * TreatmentPage is behind the 38 treatments.
 *
 * Page composition follows theme-reference/08-pages/page-section-map.json's
 * "our-team__dr-neha-verma": 03-about-us (the page header) → 21-about-me →
 * footer, with the doc's [NEW SECTION] bands appended after the About block in
 * the doc's order. Each page's band list, and the ground each band takes, is
 * its module in src/content/doctors/.
 *
 * The H1 is the registry's, which reproduces the live capture — e.g. "Meet Dr.
 * Sumedha Tirthani – Expert Dermatologist in Bangalore" rather than the doc's
 * "DR. SUMEDHA TIRTHANI". These are ranking URLs and the doc's own note 1 asks
 * that they be protected; changing an H1 is a registry decision, not a page's.
 */
export function DoctorPage({ slug, content }: { slug: string; content: DoctorPageContent }) {
  const member = team.find(m => m.id === content.id)
  if (!member) throw new Error(`DoctorPage "${slug}": no team member "${content.id}"`)
  if (member.path !== getSeo(slug).path) {
    throw new Error(`DoctorPage "${slug}" was given the content for ${member.path}`)
  }

  return (
    <PageShell
      slug={slug}
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              ourDoctorsPage.breadcrumbSection,
              { label: content.name },
            ]}
          />
        </PageHeader>
      )}
    >
      {content.bands.map((band, index) => (
        <DoctorBandView
          key={index}
          band={band}
          member={member}
          headingId={`${content.id}-band-${index + 1}-heading`}
          first={index === 0}
        />
      ))}
    </PageShell>
  )
}

/** One band of a doctor page. Shared with /our-doctors/, which renders its own list. */
export function DoctorBandView({
  band,
  member,
  headingId,
  first = false,
}: {
  band: DoctorBand
  /** Only a 'profile' band needs one. */
  member?: (typeof team)[number]
  headingId: string
  first?: boolean
}) {
  switch (band.kind) {
    case 'profile':
      if (!member) throw new Error(`A profile band needs a member (${headingId})`)
      return (
        <DoctorProfile
          member={member}
          block={band.block}
          tone={band.tone}
          headingId={headingId}
          priority={first}
        />
      )
    case 'counters':
      return <DoctorCounters {...band} headingId={headingId} />
    case 'timeline':
      return <DoctorTimeline {...band} headingId={headingId} />
    case 'cards':
      return <DoctorCards {...band} headingId={headingId} />
    case 'iconBoxes':
      return <DoctorIconBoxes {...band} headingId={headingId} />
    case 'prose':
      return <DoctorProse {...band} headingId={headingId} />
    case 'checklist':
      return <DoctorChecklist {...band} headingId={headingId} />
    case 'testimonials':
      return <DoctorTestimonials {...band} headingId={headingId} />
    case 'videos':
      return <DoctorVideos {...band} headingId={headingId} />
    case 'faq':
      return <DoctorFaq {...band} headingId={headingId} />
    case 'visitClinic':
      return <DoctorVisitClinic tone={band.tone} headingId={headingId} />
    case 'cta':
      return <DoctorCta heading={band.heading} subheading={band.subheading} headingId={headingId} />
  }
}
