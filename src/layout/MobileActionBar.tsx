import { Link } from 'react-router-dom'
import { actionBar, brand, contact } from '@/config/site'
import { CalendarCheckIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons'

/**
 * The mobile-only sticky action bar: Call | Book | WhatsApp.
 *
 * Below lg the header hides both of its CTAs — the phone number is xl-only and
 * the appointment pill is lg-only — so on a phone every conversion path sits
 * two taps deep inside the offcanvas drawer. This surfaces all three at the
 * thumb, on all 92 routes (it mounts in RootLayout). WhatsApp appears here for
 * the first time; `contact.whatsappHref` had existed in site.ts with no call
 * site.
 *
 * Three things about it are load-bearing and should not be changed casually:
 *
 *  - **z-30, not z-50.** The header's drawer is z-50 and its dim overlay z-40,
 *    and `menuOpen` is Header's own state — not lifted, not in context — so
 *    this bar cannot know the drawer is open. Sitting below the overlay is what
 *    hides it while the menu is up, for free. Raising this above z-40 means
 *    lifting that state first.
 *
 *  - **No transform on the <nav>.** Header.tsx documents the trap twice: a
 *    transformed element becomes the containing block for its `position: fixed`
 *    descendants. The Book circle's overhang is a negative margin for the same
 *    reason — nothing here needs a transform, so nothing here has one.
 *
 *  - **--action-bar-h** (styles/index.css) is shared with the footer's bottom
 *    padding. Changing the height here without the footer clips the copyright
 *    and legal rows behind the bar.
 *
 * TODO(rebuild): Book points at contact.ctaHref (/book-appointment/), which
 * 404s today — the same dangling target the header pill and the hero already
 * use, whitelisted in scripts/verify-links.ts. Pointing all three at one place
 * means the page landing fixes them together.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/**
 * The two flanking actions. Full-height so the tap target is the whole cell
 * rather than the glyph, which is the reference's behaviour and comfortably
 * clears the 44px minimum on a 64px bar.
 */
const sideAction =
  'flex h-full flex-col items-center justify-center gap-[6px] rounded-[10px] ' +
  `text-primary transition-colors hover:text-accent ${focusRing}`

const label = 'font-sans text-[12px] leading-[14px] font-medium'

export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className={
        'fixed inset-x-0 bottom-0 z-30 border-t border-divider bg-white ' +
        'shadow-[0_-2px_20px_rgba(72,30,11,0.10)] ' +
        // The inset keeps the row clear of the iOS home indicator; it resolves
        // to 0px everywhere else, so there is no desktop-shaped fallback to add.
        'pb-[env(safe-area-inset-bottom)] lg:hidden'
      }
    >
      <div className="mx-auto grid h-[var(--action-bar-h)] max-w-[520px] grid-cols-3 items-center px-[10px]">
        <a
          href={contact.telHref}
          aria-label={`Call ${brand.shortName} on ${contact.phoneDisplay}`}
          className={sideAction}
        >
          <PhoneIcon className="h-[19px] w-[19px]" />
          <span className={label}>{actionBar.callLabel}</span>
        </a>

        {/*
          The raised centre action. The circle overhangs the bar's top edge, so
          it needs the white collar to punch through the hairline cleanly —
          `ring` rather than a border, because a border would shift the circle
          inside the grid cell and pull the label off-centre.

          The cell is full-height and bottom-aligned so the circle's overhang
          comes out of the negative top margin rather than out of the anchor's
          own box — laying it out from the top instead collapsed the box to 32px
          and hid the label behind the circle.
        */}
        <Link
          to={contact.ctaHref}
          aria-label={contact.ctaLabel}
          className={`flex h-full flex-col items-center justify-end pb-[10px] ${focusRing} rounded-[10px]`}
        >
          <span className="-mt-[26px] flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_6px_18px_rgba(205,95,55,0.40)] ring-[6px] ring-white transition-opacity hover:opacity-90">
            <CalendarCheckIcon className="h-[24px] w-[24px]" />
          </span>
          <span className={`mt-[4px] text-accent ${label}`}>{actionBar.bookLabel}</span>
        </Link>

        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${brand.shortName} on WhatsApp`}
          className={sideAction}
        >
          <WhatsAppIcon className="h-[20px] w-[20px]" />
          <span className={label}>{actionBar.whatsappLabel}</span>
        </a>
      </div>
    </nav>
  )
}
