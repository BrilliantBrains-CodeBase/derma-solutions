import { PageShell } from '@/components/PageShell'
import { HomeHero } from '@/sections/HomeHero'
import { HomeAbout } from '@/sections/HomeAbout'
import { HomeWhatWeDo } from '@/sections/HomeWhatWeDo'
import { HomeVideo } from '@/sections/HomeVideo'
import { HomeServices } from '@/sections/HomeServices'
import { HomeCaseStudies } from '@/sections/HomeCaseStudies'
import { HomeWhyChooseUs } from '@/sections/HomeWhyChooseUs'
import { HomeHowItWorks } from '@/sections/HomeHowItWorks'
import { HomeTestimonials } from '@/sections/HomeTestimonials'
import { HomeSeeTheDifference } from '@/sections/HomeSeeTheDifference'

/**
 * /
 *
 * Captured copy for this page: seo-backup/02-markdown/_homepage.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/_homepage.png
 *
 * The hero renders the registry's H1 through PageShell's `hero` slot, so this
 * page still has exactly one H1 and does not author its text.
 */
export default function Home() {
  return (
    <PageShell slug="derma-solutions-home" hero={h1 => <HomeHero heading={h1} />}>
      <HomeAbout />
      <HomeWhatWeDo />
      <HomeVideo />
      <HomeServices />
      <HomeCaseStudies />
      <HomeWhyChooseUs />
      <HomeHowItWorks />
      <HomeTestimonials />
      <HomeSeeTheDifference />
      {/* remaining sections go here */}
    </PageShell>
  )
}
