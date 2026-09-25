import { PageShell } from '@/components/PageShell'
import { homeTechBanners } from '@/config/site'
import { HomeHero } from '@/sections/HomeHero'
import { HomeTrustBadges } from '@/sections/HomeTrustBadges'
import { HomeAbout } from '@/sections/HomeAbout'
import { HomeTechBanner } from '@/sections/HomeTechBanner'
import { HomeServices } from '@/sections/HomeServices'
import { HomeMeetDermatologist } from '@/sections/HomeMeetDermatologist'
import { HomeVideo } from '@/sections/HomeVideo'
// HomeCaseStudies is hidden — see the note in the section order below. The
// import stays commented rather than deleted so restoring it is one line, and
// because noUnusedLocals would fail the build if it were left in.
// import { HomeCaseStudies } from '@/sections/HomeCaseStudies'
import { HomeWhyChooseUs } from '@/sections/HomeWhyChooseUs'
import { HomeTestimonials } from '@/sections/HomeTestimonials'
import { HomeSeeTheDifference } from '@/sections/HomeSeeTheDifference'
import { HomeAppointment } from '@/sections/HomeAppointment'
import { HomeLatestBlog } from '@/sections/HomeLatestBlog'

/**
 * /
 *
 * Captured copy for this page: seo-backup/02-markdown/_homepage.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/_homepage.png
 *
 * The hero renders the registry's H1 through PageShell's `hero` slot, so this
 * page still has exactly one H1 and does not author its text.
 *
 * The order below is the 2026-09 revision round's — content/home-page/DERMA
 * SOLUTIONS — HOMEPAGE COPY.md. Four things changed in it:
 *
 *  - HomeTrustBadges is new, and the doc puts it directly under the hero.
 *  - HomeMeetDermatologist replaces HomeWhatWeDo in the same slot.
 *  - HomeHowItWorks is gone. Its steps were not merged into HomeWhyChooseUs;
 *    see the note where homeHowItWorks used to sit in src/config/site.ts.
 *  - HomeTechBanner is new and renders twice. The doc stacks both banners
 *    between About and Meet the Dermatologist; they are split here because the
 *    two artworks are both 3.2:1 strips and consecutively they read as one
 *    broken image. Banner 1 keeps the doc's slot, banner 2 follows the doctor.
 *
 * Bands the doc does not mention — Services, Video, Appointment — keep their
 * positions.
 *
 * CASE STUDIES IS HIDDEN, on the client's instruction after review. It is
 * commented out rather than deleted: src/sections/HomeCaseStudies.tsx and
 * homeCaseStudies in site.ts are both untouched, so putting it back is
 * uncommenting the import and the element below. Two things it took with it,
 * in case either is the reason to restore it:
 *
 *  - its four tiles and "View All Case Studies" were the only links to
 *    /image-gallery/ in the homepage's own content. The header's Gallery
 *    dropdown and the footer still carry it, so nothing is orphaned and
 *    verify-links is unchanged, but no band on the page points there now.
 *  - it carried a TODO(compliance) about patient-consent for the four tile
 *    photographs. That question is deferred, not settled — it returns with the
 *    band.
 *
 * The alternation of grounds survives both the reshuffle and the hiding: white
 * About, dark banner, cream Services, white doctor, light banner, white video,
 * cream Why Choose Us.
 */
export default function Home() {
  return (
    <PageShell slug="derma-solutions-home" hero={h1 => <HomeHero heading={h1} />}>
      <HomeTrustBadges />
      <HomeAbout />
      <HomeTechBanner banner={homeTechBanners[0]} />
      <HomeServices />
      <HomeMeetDermatologist />
      <HomeTechBanner banner={homeTechBanners[1]} />
      <HomeVideo />
      {/* <HomeCaseStudies /> — hidden, see the note above. */}
      <HomeWhyChooseUs />
      <HomeTestimonials />
      <HomeSeeTheDifference />
      <HomeAppointment />
      <HomeLatestBlog />
    </PageShell>
  )
}
