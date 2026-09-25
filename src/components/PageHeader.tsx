import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '@/config/site'

/**
 * Built to theme-reference/04-sections/03-about-us/ — the brown page-header band
 * every Glowix inner page opens with. Shared by the treatment pages and the
 * blog; each passes its own row under the title (a breadcrumb, or a post's
 * date line) as `children`.
 *
 * Measured off 07-screenshots/desktop/services__botox-and-dermal-fillers.png:
 * the band is 1400x358 inside a 20px gutter, radius 30, with the H1 and the
 * row beneath it stacked on its centre line. The blog templates
 * (blog.png, top-tips-for-preparing-for-plastic-surgery.png) use the same band.
 *
 * The H1 is the registry's, placed here through PageShell's `hero` slot — this
 * component never authors heading text. That is what keeps the one-H1 rule and
 * the live page's ranking H1 intact.
 *
 * Two departures from the reference:
 *
 *  - The H1s are the live site's, which run two to three times the length of
 *    the demo's "BOTOX AND DERMAL FILLERS". The type steps down to 52px from
 *    the reference's 60 and balances its lines, and the band grows past 358px
 *    rather than clipping.
 *  - The heading rises in per word on load (.hero-word, as on the homepage)
 *    rather than per character in GSAP SplitText.
 */
export function PageHeader({ h1, children }: { h1: string; children?: ReactNode }) {
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

        {children && <div className="mt-[16px]">{children}</div>}
      </div>
    </div>
  )
}

const crumbLink =
  'transition-colors hover:text-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * The reference's breadcrumb under the page title: Sora 16, white, "/"
 * separators. The last crumb is the current page and is not a link; a crumb
 * with no `href` is plain text.
 */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap justify-center font-sans text-[15px] leading-[24px] font-medium text-white md:text-[16px]">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li
              key={item.label}
              className={last ? undefined : "after:mx-[8px] after:content-['/']"}
              aria-current={last ? 'page' : undefined}
            >
              {item.href && !last ? (
                <Link to={item.href} className={crumbLink}>
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
