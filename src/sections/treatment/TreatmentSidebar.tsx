import { Link } from 'react-router-dom'
import { serviceMenu, treatmentPage } from '@/config/site'
import { ArrowUpRightIcon } from '@/components/icons'
import { SidebarHoursCard } from '@/components/SidebarHoursCard'
import { stickySidebar, useSidebarHeight } from '@/components/stickySidebar'

/**
 * Built to theme-reference/04-sections/10-professional-services/ and
 * 04-opening-hours/ — the service detail page's two sidebar cards.
 *
 * Measured off 07-screenshots/desktop/services__botox-and-dermal-fillers.png:
 * both cards are 383 wide, radius 20, 30px apart. The services card is a 66px
 * brown title bar over a cream list of 62px rows; the hours card is
 * SidebarHoursCard, shared with the blog's sidebar.
 *
 * The list is the `serviceMenu` group that holds the current page, which is
 * exactly the per-category sidebar the content doc specifies for each of its
 * five parts — so the sidebar and the header's Treatments menu cannot drift.
 *
 * Departures from the reference:
 *
 *  - The current page is marked, in accent and with aria-current. The
 *    reference's list does not distinguish it.
 *  - Below lg the two cards sit side by side and then stack.
 *  - From lg the sidebar is sticky — see stickySidebar for how and why.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function TreatmentSidebar({ path }: { path: string }) {
  const group = serviceMenu.find(g => g.items.some(item => item.path === path))
  if (!group) throw new Error(`${path} is not in any serviceMenu group — src/config/site.ts`)

  const ref = useSidebarHeight<HTMLElement>()

  return (
    <aside
      ref={ref}
      className={`grid gap-[30px] md:grid-cols-2 md:items-start lg:grid-cols-1 ${stickySidebar}`}
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

      <SidebarHoursCard />
    </aside>
  )
}
