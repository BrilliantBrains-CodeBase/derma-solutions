import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { assets, hours, serviceMenu, treatmentPage } from '@/config/site'
import { ArrowUpRightIcon, OpenHoursIcon } from '@/components/icons'

/**
 * Built to theme-reference/04-sections/10-professional-services/ and
 * 04-opening-hours/ — the service detail page's two sidebar cards.
 *
 * Measured off 07-screenshots/desktop/services__botox-and-dermal-fillers.png:
 * both cards are 383 wide, radius 20, 30px apart. The services card is a 66px
 * brown title bar over a cream list of 62px rows; the hours card is a 468px
 * photograph with its text on a brown fade at the foot.
 *
 * The list is the `serviceMenu` group that holds the current page, which is
 * exactly the per-category sidebar the content doc specifies for each of its
 * five parts — so the sidebar and the header's Treatments menu cannot drift.
 *
 * Departures from the reference:
 *
 *  - The hours photograph is the clinic's own reception (assets.clinicPhoto),
 *    not the theme's stock sidebar-cta-bg.jpg.
 *  - The current page is marked, in accent and with aria-current. The
 *    reference's list does not distinguish it.
 *  - Below lg the two cards sit side by side and then stack, and the hours
 *    card gives up its portrait ratio: at full mobile width a 383:468 photo is
 *    most of a screen of nothing but a reception desk.
 *  - From lg the sidebar is sticky, which the reference's is not. A plain
 *    `top` would not do: the ten-item Cosmetology and Cosmetic Surgery lists
 *    make it ~1,200px tall, and pinned at the top on a 900px screen the hours
 *    card would never come into view. So `top` is
 *    min(140px, 100vh - height - 30px): a sidebar that fits pins 30px under the
 *    110px header, and one that does not scrolls with the page until its foot
 *    is 30px above the viewport's, then pins there. The height is measured
 *    into --sidebar-h; before hydration it is unset, which is the plain
 *    140px case.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function TreatmentSidebar({ path }: { path: string }) {
  const group = serviceMenu.find(g => g.items.some(item => item.path === path))
  if (!group) throw new Error(`${path} is not in any serviceMenu group — src/config/site.ts`)

  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const aside = ref.current
    if (!aside) return
    const observer = new ResizeObserver(() => {
      aside.style.setProperty('--sidebar-h', `${aside.offsetHeight}px`)
    })
    observer.observe(aside)
    return () => observer.disconnect()
  }, [])

  return (
    <aside
      ref={ref}
      className="grid gap-[30px] md:grid-cols-2 md:items-start lg:sticky lg:top-[min(140px,calc(100vh-var(--sidebar-h,0px)-30px))] lg:grid-cols-1"
    >
      <nav aria-labelledby="treatment-services-heading" className="overflow-hidden rounded-card">
        <h2
          id="treatment-services-heading"
          className="bg-primary px-[30px] py-[20px] font-display text-[20px] leading-[26px] text-white uppercase"
        >
          {treatmentPage.servicesHeading}
        </h2>
        <ul className="bg-secondary px-[30px] py-[10px]">
          {group.items.map(item => {
            const current = item.path === path
            return (
              <li key={item.path} className="border-b border-divider last:border-b-0">
                <Link
                  to={item.path}
                  aria-current={current ? 'page' : undefined}
                  className={`group/link flex items-center justify-between gap-[15px] py-[19px] font-sans text-[16px] leading-[24px] transition-colors hover:text-accent ${current ? 'text-accent' : 'text-body'} ${focusRing}`}
                >
                  {item.label}
                  <ArrowUpRightIcon
                    className={`h-[16px] w-[16px] shrink-0 transition-colors group-hover/link:text-accent ${current ? 'text-accent' : 'text-primary'}`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="relative min-h-[300px] overflow-hidden rounded-card lg:min-h-0 lg:aspect-[383/468]">
        <img
          src={assets.clinicPhoto}
          alt={assets.clinicPhotoAlt}
          width={1600}
          height={1200}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-primary via-primary/55 to-primary/5" />

        <div className="absolute inset-x-[30px] bottom-[30px] flex items-start gap-[16px] text-white">
          <OpenHoursIcon className="h-[40px] w-[40px] shrink-0" />
          <div>
            <h2 className="font-display text-[20px] leading-[26px] text-white">{treatmentPage.hoursHeading}</h2>
            <p className="mt-[10px] font-sans text-[16px] leading-[26px] font-semibold">
              {hours.display}
              <br />
              {hours.displayHeading}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
