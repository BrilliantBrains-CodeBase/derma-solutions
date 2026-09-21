import { callButton } from '@/content/doctor'
import { PillLink } from './DoctorBand'
import { assets } from '@/config/site'

/**
 * A8 and B*.7/B1.11 — the Call to Action band that closes every doctor page.
 * The dark panel of theme-reference/04-sections/15-schedule-your-consultation-
 * today/'s ground and the page-header's line art, with the doc's heading, its
 * optional subheading and one button: "Call # +91-97412 23217".
 *
 * Departures from the reference:
 *
 *  1. No booking form. The reference band is the appointment form; the doc
 *     asks for a heading and a call button only, and /book-appointment/ is not
 *     built yet (see the KNOWN_DANGLING note in scripts/verify-links.ts).
 *  2. The phone number prints in the site's display format (contact.phoneDisplay)
 *     rather than the doc's "+91-97412 23217", so it matches the header.
 *  3. It keeps the white page's bottom padding under it: PreFooter's cream
 *     band follows directly, and two panels must not touch.
 */
export function DoctorCta({
  heading,
  subheading,
  headingId,
}: {
  heading: string
  subheading?: string
  headingId: string
}) {
  return (
    <section aria-labelledby={headingId} className="px-[20px] pb-[60px] lg:pb-[100px]">
      <div
        className="mx-auto max-w-[1400px] rounded-30 bg-primary bg-[length:100%_100%] bg-center bg-no-repeat px-[24px] py-[60px] text-center lg:px-[60px] lg:py-[90px]"
        style={{ backgroundImage: `url(${assets.pageHeaderShape})` }}
      >
        <h2
          id={headingId}
          className="mx-auto max-w-[1000px] text-balance font-display text-[28px] leading-[36px] text-white md:text-[36px] md:leading-[46px] lg:text-[44px] lg:leading-[56px]"
        >
          {heading}
        </h2>
        {subheading && (
          <p className="mx-auto mt-[20px] max-w-[760px] font-sans text-[16px] leading-[26px] text-white/85">
            {subheading}
          </p>
        )}
        <PillLink label={callButton.label} href={callButton.href} tone="dark" className="mt-[34px]" />
      </div>
    </section>
  )
}
