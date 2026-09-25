import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { BookAppointment as BookAppointmentBand } from '@/sections/appointment/BookAppointment'
import { HomeWhyChooseUs } from '@/sections/HomeWhyChooseUs'
import { AboutFaq } from '@/sections/about/AboutFaq'

/**
 * /book-appointment/
 *
 * The target of every "Make An Appointment" / "Book" CTA (contact.ctaHref).
 * NOT in the live capture; its SEO is authored in scripts/added-pages.ts.
 *
 * Layout: theme-reference/08-pages/page-section-map.json "book-appointment",
 * whose section list is the band order below. Whole-page reference:
 * theme-reference/07-screenshots/desktop/book-appointment.png.
 *
 * TODO(content): there is no copy doc for this page. Everything below is either
 * the reference's own wording (the appointment band's eyebrow, heading and box
 * titles) or a band reused from another page with its copy unchanged.
 *
 * Ground alternation, as on About: white band, cream panel, white band. The
 * appointment band is white with its own cream form card, so it does not touch
 * the Why Choose Us panel.
 *
 * Departures from the reference:
 *
 *  - The FAQ band is About's (AboutFaq), with its questions and without the
 *    reference's media column — see that file for why the column is dropped.
 *    Its FAQPage JSON-LD stays with /about-us/; this page does not re-declare it.
 *  - The Opening Hours box prints the clinic's hours, not the demo's.
 */
export default function BookAppointment() {
  return (
    <PageShell
      slug="book-appointment"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Book Appointment' }]} />
        </PageHeader>
      )}
    >
      {/* white · ref 34 */}
      <BookAppointmentBand />
      {/* cream · ref 06 */}
      <HomeWhyChooseUs />
      {/* white · ref 20 */}
      <AboutFaq />
    </PageShell>
  )
}
