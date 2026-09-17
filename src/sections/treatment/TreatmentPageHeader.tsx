import { Link } from 'react-router-dom'
import { assets, treatmentPage } from '@/config/site'

/**
 * Built to theme-reference/04-sections/03-about-us/ — the brown page-header band
 * every Glowix inner page opens with.
 *
 * Measured off 07-screenshots/desktop/services__botox-and-dermal-fillers.png:
 * the band is 1400x358 inside a 20px gutter, radius 30, with the H1 and the
 * breadcrumb stacked on its centre line.
 *
 * The H1 is the registry's, placed here through PageShell's `hero` slot — this
 * component never authors heading text. That is what keeps the one-H1 rule and
 * the live page's ranking H1 intact.
 *
 * Three departures from the reference:
 *
 *  - The H1s are the live site's, which run two to three times the length of
 *    the demo's "BOTOX AND DERMAL FILLERS". The type steps down to 52px from
 *    the reference's 60 and balances its lines, and the band grows past 358px
 *    rather than clipping.
 *  - The heading rises in per word on load (.hero-word, as on the homepage)
 *    rather than per character in GSAP SplitText.
 *  - "Services" is plain text. The reference links it to a services index, and
 *    this site has none — a link would 404.
 */
export function TreatmentPageHeader({ h1, name }: { h1: string; name: string }) {
  const words = h1.split(' ')

  return (
    <div className="px-[20px]">
      <div
        className="mx-auto flex min-h-[260px] max-w-[1400px] flex-col items-center justify-center rounded-30 bg-primary bg-[length:100%_100%] bg-center bg-no-repeat px-[20px] py-[60px] text-center md:px-[60px] lg:min-h-[358px] lg:py-[80px]"
        style={{ backgroundImage: `url(${assets.pageHeaderShape})` }}
      >
        <h1 className="max-w-[1100px] text-balance font-display text-[28px] leading-[36px] text-white uppercase [perspective:400px] md:text-[40px] md:leading-[50px] lg:text-[52px] lg:leading-[64px]">
          {words.map((word, index) => (
            <span
              // Words repeat within an H1, so the index is the identity.
              key={`${word}-${index}`}
              className="hero-word"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {/* See HomeHero: the separator stays inside the word's string. */}
              {index === words.length - 1 ? word : `${word} `}
            </span>
          ))}
        </h1>

        <nav aria-label="Breadcrumb" className="mt-[16px]">
          <ol className="flex flex-wrap justify-center font-sans text-[15px] leading-[24px] font-medium text-white md:text-[16px]">
            <li className="after:mx-[8px] after:content-['/']">
              <Link
                to="/"
                className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Home
              </Link>
            </li>
            <li className="after:mx-[8px] after:content-['/']">{treatmentPage.breadcrumbSection}</li>
            <li aria-current="page">{name}</li>
          </ol>
        </nav>
      </div>
    </div>
  )
}
