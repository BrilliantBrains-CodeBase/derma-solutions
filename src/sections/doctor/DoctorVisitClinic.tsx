import { assets } from '@/config/site'
import { OpenHoursIcon } from '@/components/icons'
import { visitClinic, type Tone } from '@/content/doctor'
import { Band, BandHeadingBlock, PillLink, cardSurface, focusRing } from './DoctorBand'

/**
 * A7 — Visit Our Clinic, on /our-doctors/ and at the foot of all four
 * profiles. Built to theme-reference/04-sections/04-opening-hours/ — the
 * opening-hours card a Glowix inner page closes with, which the site already
 * renders as SidebarHoursCard — widened from a sidebar card into a band: the
 * clinic's reception photograph beside the doc's three label:value rows.
 *
 * The rows use the About-me block's label:value treatment (DoctorProfile) so
 * the page's two sets of rows read alike.
 *
 * Every value comes from site.ts through `visitClinic` — the hours, address
 * and phone the footer prints — not from the doc's own copy of them, which is
 * the live footer's garbled address. See the note there.
 *
 * Departures from the reference:
 *
 *  1. A band, not a sidebar card: these pages have no sidebar.
 *  2. A "Get Directions" button to the clinic's map, which a visit block needs
 *     and the reference's hours card has no slot for.
 */
export function DoctorVisitClinic({ tone, headingId }: { tone: Tone; headingId: string }) {
  return (
    <Band tone={tone} headingId={headingId}>
      <div className={`overflow-hidden rounded-30 ${cardSurface(tone)} lg:flex`}>
        <div className="relative min-h-[260px] lg:min-h-0 lg:w-[46.9%] lg:shrink-0">
          <img
            src={assets.clinicPhoto}
            alt={assets.clinicPhotoAlt}
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="p-[30px] md:p-[40px] lg:flex-1 lg:p-[60px]">
          <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary text-white">
            <OpenHoursIcon className="h-[30px] w-[30px]" />
          </span>
          <div className="mt-[24px]">
            <BandHeadingBlock
              heading={visitClinic.heading}
              intro={visitClinic.intro}
              headingId={headingId}
              tone={tone}
              align="left"
            />
          </div>

          <dl className="mt-[30px] flex flex-col gap-[18px]">
            {visitClinic.rows.map(row => (
              <div key={row.label}>
                <dt className="font-display text-[20px] leading-[26px] text-primary">{row.label}</dt>
                <dd className="mt-[4px] font-sans text-[16px] leading-[26px] text-body">
                  {'href' in row && row.href ? (
                    <a href={row.href} className={`transition-colors hover:text-accent ${focusRing(tone)}`}>
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <PillLink
            label={visitClinic.directionsLabel}
            href={visitClinic.directionsHref}
            tone={tone}
            className="mt-[30px]"
          />
        </div>
      </div>
    </Band>
  )
}
