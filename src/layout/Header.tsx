import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { assets, brand, contact, navigation } from '@/config/site'
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from '@/components/icons'

/**
 * Built to theme-reference/04-sections/01-site-header/ — its structure.html,
 * computed.json and screenshot.png are the spec: 110px tall, transparent, a
 * 1400px inner width, logo left, Sora 16/400 nav centre, and a phone icon-box
 * plus an accent pill right. Below the reference's own 1024px breakpoint
 * (`data-responsive-breakpoint="1024"`) the right cluster is hidden and the nav
 * becomes a left slide-in panel behind an accent hamburger.
 *
 * Three agreed departures from the reference:
 *
 *  - `Our Services` opens a full-width mega panel. Glowix's largest dropdown is
 *    13 links in one column; ours is 5 groups / 38 links, which would run off
 *    the bottom of the screen stacked.
 *  - The header is sticky and returns on scroll-up. Glowix's scrolls away — but
 *    the service pages here are long, and the CTA is the point of the header.
 *  - The phone number is a <span>, not the reference's <h3>. PageShell owns the
 *    one H1 per page (fix-plan A5); a heading in the site chrome would land in
 *    every page's outline.
 *
 * The original structural Header rendered the whole nav on every route because
 * fix-plan.md calls the service pages' ~95 inbound internal links
 * "load-bearing". That still holds and drives the markup below: every panel is
 * always in the DOM and hidden with CSS, never conditionally mounted, and the
 * mobile menu is *this same* <nav> restyled by breakpoint rather than a second
 * copy — a separate offcanvas would duplicate all 95 links on all 92 pages.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/** Top-level nav item: a row on mobile, an inline item at lg. */
const topLevel =
  'flex w-full items-center justify-between gap-[10px] rounded-[6px] py-[14px] font-sans ' +
  'text-[16px] leading-[16px] transition-colors hover:text-accent ' +
  `lg:w-auto lg:justify-start lg:py-0 ${focusRing}`

const panelLink =
  'block rounded-[10px] px-[16px] py-[9px] font-sans text-[15px] leading-[24px] text-body ' +
  `transition-colors hover:bg-secondary hover:text-accent ${focusRing}`

/**
 * Dropdown panels run on two different mechanisms. Below lg they are accordion
 * rows that collapse with the 0fr/1fr grid trick — which keeps the links in the
 * DOM, where `hidden` or an unmounted panel would not. At lg they become
 * absolutely positioned cards that fade in on hover or on click.
 */
const dropdownShell =
  'max-lg:grid max-lg:grid-rows-[0fr] max-lg:overflow-hidden ' +
  'max-lg:transition-[grid-template-rows] max-lg:duration-300 ' +
  'max-lg:data-[open=true]:grid-rows-[1fr] ' +
  'lg:invisible lg:absolute lg:top-full lg:z-20 lg:pt-[14px] lg:opacity-0 ' +
  'lg:transition-[opacity,visibility] lg:duration-200 ' +
  'lg:group-hover:visible lg:group-hover:opacity-100 ' +
  'lg:data-[open=true]:visible lg:data-[open=true]:opacity-100'

const dropdownCard =
  'max-lg:pb-[6px] lg:rounded-[20px] lg:bg-white lg:p-[10px] ' +
  'lg:shadow-[0_20px_60px_rgba(72,30,11,0.12)]'

/** Same pill as the footer's CTA, one size down to fit a 110px bar. */
const ctaPill =
  'inline-flex shrink-0 items-center justify-center rounded-pill bg-accent px-[30px] ' +
  'py-[16px] font-sans text-[16px] leading-[16px] font-semibold text-white ' +
  'transition-opacity hover:opacity-90 focus-visible:outline-2 ' +
  'focus-visible:outline-offset-4 focus-visible:outline-white'

type HeaderItem = (typeof navigation.header)[number]
type CtaItem = Extract<HeaderItem, { isCta: true }>

const isCta = (item: HeaderItem): item is CtaItem => 'isCta' in item

/** Trailing slashes differ between site.ts ('/blogs/') and router paths ('/blogs'). */
const samePath = (a: string, b: string) => a.replace(/\/+$/, '') === b.replace(/\/+$/, '')

const panelId = (label: string) => `nav-panel-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

/** The reference's group label: Marcellus over an accent@10% hairline. */
function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[8px] border-b border-divider px-[16px] pb-[10px] font-display text-[18px] leading-[24px] text-primary lg:px-[10px]">
      {children}
    </p>
  )
}

export function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)

  const closeAll = () => {
    setMenuOpen(false)
    setOpenKey(null)
  }

  // A route change means the user took the link they opened the menu for.
  useEffect(closeAll, [pathname])

  // Escape closes whatever is open, innermost first.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpenKey(current => {
        if (current === null) setMenuOpen(false)
        return null
      })
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // A click anywhere outside the header dismisses an open desktop dropdown.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (!target?.closest('header')) setOpenKey(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  // The panel scrolls itself; the page behind it must not.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [menuOpen])

  // Sticky-on-scroll-up. prefers-reduced-motion is handled globally in
  // src/styles/index.css, which flattens the transition to 0.01ms.
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const read = () => {
      frame = 0
      const y = window.scrollY
      setAtTop(y < 10)
      if (Math.abs(y - last) < 6) return
      setHidden(y > last && y > 160)
      last = y
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }
    window.addEventListener('scroll', onScroll, { passive: true })
    read()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const cta = navigation.header.find(isCta)
  const navItems = navigation.header.filter(item => !isCta(item))

  /*
   * The hide-transform is suppressed while the mobile panel is open: a
   * transformed element becomes the containing block for its `position: fixed`
   * descendants, which would anchor the offcanvas panel and its overlay to the
   * header instead of the viewport.
   */
  const shell =
    'sticky top-0 z-50 px-[20px] transition-[transform,background-color,box-shadow] duration-300 ' +
    (atTop && !menuOpen
      ? 'bg-transparent'
      : 'bg-white shadow-[0_2px_20px_rgba(72,30,11,0.08)]') +
    (hidden && !menuOpen ? ' -translate-y-full' : '')

  return (
    <header className={shell}>
      <div className="relative mx-auto flex h-[86px] max-w-[1400px] items-center justify-between gap-[20px] lg:h-[110px]">
        <Link to="/" onClick={closeAll} className={`shrink-0 rounded-[6px] ${focusRing}`}>
          <img
            src={assets.logo}
            alt={assets.logoAlt}
            width={136}
            height={51}
            className="h-[42px] w-auto lg:h-[51px]"
          />
          <span className="sr-only">{brand.name}</span>
        </Link>

        {menuOpen && (
          <div
            aria-hidden
            onClick={closeAll}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}

        <nav
          id="primary-nav"
          aria-label="Primary"
          data-open={menuOpen}
          className={
            'flex flex-col bg-white ' +
            'max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:w-[320px] ' +
            'max-lg:max-w-[85vw] max-lg:-translate-x-full max-lg:overflow-y-auto ' +
            'max-lg:shadow-[0_0_60px_rgba(72,30,11,0.18)] max-lg:transition-transform ' +
            'max-lg:duration-300 max-lg:data-[open=true]:translate-x-0 ' +
            'lg:w-auto lg:flex-1 lg:flex-row lg:bg-transparent lg:pl-[40px]'
          }
        >
          {/* Panel chrome — the reference's `elementskit-nav-identity-panel`. */}
          <div className="flex items-center justify-between border-b border-divider px-[20px] py-[16px] lg:hidden">
            <img
              src={assets.logo}
              alt=""
              width={136}
              height={51}
              className="h-[38px] w-auto"
            />
            <button
              type="button"
              onClick={closeAll}
              aria-label="Close menu"
              className={`flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-secondary text-primary transition-colors hover:bg-accent hover:text-white ${focusRing}`}
            >
              <CloseIcon className="h-[16px] w-[16px]" />
            </button>
          </div>

          <ul className="flex flex-col px-[20px] lg:flex-row lg:items-center lg:gap-[30px] lg:px-0">
            {navItems.map(item => {
              /* --- Our Services: the full-width mega panel ---------------- */
              if ('groups' in item) {
                const id = panelId(item.label)
                const open = openKey === item.label
                const active = item.groups.some(group =>
                  group.items.some(entry => samePath(entry.path, pathname)),
                )
                return (
                  <li
                    key={item.label}
                    className="group border-b border-divider last:border-b-0 lg:static lg:flex lg:h-[110px] lg:items-center lg:border-b-0"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={id}
                      onClick={() => setOpenKey(open ? null : item.label)}
                      className={`${topLevel} ${active ? 'text-accent' : 'text-primary'}`}
                    >
                      {item.label}
                      <ChevronDownIcon
                        className={`h-[10px] w-[10px] shrink-0 transition-transform duration-200 lg:group-hover:rotate-180 ${open ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <div id={id} data-open={open} className={`${dropdownShell} lg:left-0 lg:right-0`}>
                      <div className="max-lg:min-h-0 max-lg:overflow-hidden">
                        <div
                          className={`grid gap-x-[20px] ${dropdownCard} lg:grid-cols-5 lg:p-[30px]`}
                        >
                          {item.groups.map(group => (
                            <div key={group.group}>
                              <GroupHeading>{group.group}</GroupHeading>
                              <ul className="max-lg:pb-[10px]">
                                {group.items.map(entry => (
                                  <li key={entry.path}>
                                    <NavLink
                                      to={entry.path}
                                      onClick={closeAll}
                                      className={({ isActive }) =>
                                        `${panelLink} ${isActive ? 'text-accent' : ''}`
                                      }
                                    >
                                      {entry.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }

              /* --- About / Gallery: the reference's plain dropdown -------- */
              if ('items' in item) {
                const id = panelId(item.label)
                const open = openKey === item.label
                const active = item.items.some(entry => samePath(entry.path, pathname))
                return (
                  <li
                    key={item.label}
                    className="group border-b border-divider last:border-b-0 lg:relative lg:flex lg:h-[110px] lg:items-center lg:border-b-0"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={id}
                      onClick={() => setOpenKey(open ? null : item.label)}
                      className={`${topLevel} ${active ? 'text-accent' : 'text-primary'}`}
                    >
                      {item.label}
                      <ChevronDownIcon
                        className={`h-[10px] w-[10px] shrink-0 transition-transform duration-200 lg:group-hover:rotate-180 ${open ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <div id={id} data-open={open} className={`${dropdownShell} lg:left-0`}>
                      <div className="max-lg:min-h-0 max-lg:overflow-hidden">
                        <ul className={`${dropdownCard} lg:min-w-[290px]`}>
                          {item.items.map(entry => (
                            <li key={entry.path}>
                              <NavLink
                                to={entry.path}
                                onClick={closeAll}
                                className={({ isActive }) =>
                                  `${panelLink} ${isActive ? 'text-accent' : ''}`
                                }
                              >
                                {entry.label}
                                {'sublabel' in entry && entry.sublabel ? (
                                  <span className="block text-[13px] leading-[20px] text-body/70">
                                    {entry.sublabel}
                                  </span>
                                ) : null}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                )
              }

              /* --- Home / Blogs ------------------------------------------- */
              return (
                <li
                  key={item.label}
                  className="border-b border-divider last:border-b-0 lg:flex lg:h-[110px] lg:items-center lg:border-b-0"
                >
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={closeAll}
                    className={({ isActive }) =>
                      `${topLevel} ${isActive ? 'text-accent' : 'text-primary'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/*
            The right-hand cluster, repositioned rather than repeated: the
            reference hides it on tablet and mobile and adds a `mobile-menu`
            "Book Appointment" item to the panel instead.
          */}
          <div className="mt-auto flex flex-col gap-[16px] border-t border-divider px-[20px] py-[24px] lg:hidden">
            <a
              href={contact.telHref}
              className={`flex items-center gap-[12px] rounded-[10px] font-display text-[20px] leading-[24px] text-primary ${focusRing}`}
            >
              <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-secondary">
                <PhoneIcon className="h-[15px] w-[15px] text-accent" />
              </span>
              {contact.phoneDisplay}
            </a>
            {cta && (
              <Link to={cta.href} onClick={closeAll} className={`${ctaPill} w-full`}>
                {cta.label}
              </Link>
            )}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-[20px]">
          <a
            href={contact.telHref}
            className={`group/phone hidden items-center gap-[14px] rounded-[10px] xl:flex ${focusRing}`}
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-secondary">
              <PhoneIcon className="h-[16px] w-[16px] text-accent" />
            </span>
            <span className="whitespace-nowrap font-display text-[20px] leading-[24px] text-primary transition-colors group-hover/phone:text-accent">
              {contact.phoneDisplay}
            </span>
          </a>

          {cta && (
            <Link to={cta.href} className={`${ctaPill} hidden lg:inline-flex`}>
              {cta.label}
            </Link>
          )}

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(open => !open)}
            className={`flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-accent text-white transition-opacity hover:opacity-90 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
          >
            <MenuIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </header>
  )
}
