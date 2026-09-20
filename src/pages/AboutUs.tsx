import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { aboutIntro } from '@/config/site'
import { HomeAbout } from '@/sections/HomeAbout'
import { AboutApproach } from '@/sections/about/AboutApproach'
import { AboutWhatWeDo } from '@/sections/about/AboutWhatWeDo'
import { AboutJourney } from '@/sections/about/AboutJourney'
import { AboutTeam } from '@/sections/about/AboutTeam'
import { HomeTestimonials } from '@/sections/HomeTestimonials'
import { HomeSeeTheDifference } from '@/sections/HomeSeeTheDifference'
import { HomeAppointment } from '@/sections/HomeAppointment'
import { AboutFaq } from '@/sections/about/AboutFaq'

/**
 * /about-us/
 *
 * NOT in the live capture — there is no captured copy or screenshot for this
 * URL. Its SEO is authored in scripts/added-pages.ts, and its JSON-LD graph,
 * including the FAQPage for the band at the foot and a Physician node for each
 * doctor the site had none for, is emitted by that entry's `extraNodes` through
 * scripts/build-seo-registry.ts. src/seo/JsonLd.tsx is dev-only; production
 * injects src/seo/schema/about-us.json byte-verbatim.
 *
 * Copy: content/about-us/Derma_Solutions_Home_Technology_and_About_Us_Content.md,
 * Part B (B1–B11). Layout: theme-reference/08-pages/page-section-map.json
 * "about-us", whose section list is the band order below. The whole-page
 * reference is theme-reference/07-screenshots/desktop/about-us.png (1440x9582).
 *
 * Three bands are the homepage's own, rendered with no copy overrides and no
 * new props — B7 Testimonials, B8 See the Difference and B9 Appointment. The
 * doc's B9 form changes (phone above email, email optional, a WhatsApp consent
 * line) were therefore applied once, inside HomeAppointment and
 * `homeAppointment`, so the homepage takes them too.
 *
 * B2 is HomeAbout with this page's copy. It is the same reference section
 * (04-sections/11-…) in both places, so it takes a `copy` prop rather than
 * being duplicated; the only structural difference is that this page's CTA is
 * an in-page anchor, which HomeAbout renders as a bare <a>.
 *
 * GROUND ALTERNATION is the constraint any reordering has to preserve. Profiled
 * down the reference screenshot, the demo's page runs: dark banner, white
 * intro, cream panel, white, dark panel, white, dark panel, white, cream panel,
 * white. Every non-white band paints its own 1400-wide rounded-30 panel inside
 * the 20px page gutter; the page ground itself is white end to end. No two
 * panels ever touch — there is always a white band between them.
 *
 * B11, the reference's newsletter strip, is deliberately absent: there is no
 * newsletter backend, and src/layout/PreFooter.tsx already gives that band's
 * geometry to the appointment CTA, site-wide. The content doc marks it optional
 * for exactly this reason.
 */
export default function AboutUs() {
  return (
    <PageShell
      slug="about-us"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
        </PageHeader>
      )}
    >
      {/* B2  · white  · ref 11 */}
      <HomeAbout copy={aboutIntro} headingId="about-intro-heading" />
      {/* B3  · cream  · ref 31 */}
      <AboutApproach />
      {/* B4  · white  · ref 12 */}
      <AboutWhatWeDo />
      {/* B5  · dark   · ref 32 */}
      <AboutJourney />
      {/* B6  · white  · ref 33 — id="our-team", the target of B2's CTA */}
      <AboutTeam />
      {/* B7  · dark   · ref 08 */}
      <HomeTestimonials />
      {/* B8  · white  · ref 14 */}
      <HomeSeeTheDifference />
      {/* B9  · cream  · ref 15 — id="appointment", the target of B5's CTA */}
      <HomeAppointment />
      {/* B10 · white  · ref 20 */}
      <AboutFaq />
    </PageShell>
  )
}
