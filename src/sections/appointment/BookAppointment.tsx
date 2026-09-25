import type { ReactNode } from 'react'
import { bookAppointment, contact, hours } from '@/config/site'
import { AppointmentForm } from '@/components/AppointmentForm'
import { Eyebrow } from '@/components/Eyebrow'
import { HeadsetIcon, OpenHoursIcon } from '@/components/icons'
import { RevealWords } from '@/components/RevealWords'

/**
 * Built to theme-reference/04-sections/34-make-an-appointment/ — the
 * book-appointment page's own variant of the homepage's appointment band
 * (HomeAppointment, ref 15). Same form, but on white rather than a cream panel,
 * with no photograph: the form sits on a cream card of its own and the left
 * column carries two icon boxes, Customer Services and Opening Hours.
 *
 * Measured off that section's screenshot.png (1440x620): a 1300 container with
 * 100px above and below, the copy column at x 80-690 and the form card at
 * x 730-1360, radius 30, 40px padding. The column split is written as
 * percentages of the 1280 content box, as HomeWhyChooseUs does it, so the two
 * never sum past the container between breakpoints.
 *
 * The form is src/components/AppointmentForm.tsx, shared with HomeAppointment;
 * `idPrefix` keeps its ids distinct from that band's.
 *
 * Departures from the reference:
 *
 *  - The hours are the clinic's (`hours.display`), not the demo's "Mon - Sat /
 *    Sunday closed". One source, so this box and the footer cannot disagree.
 *  - The heading animates per word in CSS rather than per character in GSAP,
 *    as every band does. The reference's fadeInUp on the boxes and form is
 *    dropped.
 *  - Only the phone box is a link, as in the reference — but it wraps the box's
 *    text rather than the whole flex row, so the focus ring fits what it names.
 */
function InfoBox({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-[20px]">
      <span aria-hidden className="shrink-0 text-accent">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-[22px] leading-[30px] text-primary">{title}</h3>
        <div className="mt-[10px] font-sans text-[16px] leading-[26px] text-body">{children}</div>
      </div>
    </div>
  )
}

export function BookAppointment() {
  return (
    <section
      id="book-appointment"
      aria-labelledby="book-appointment-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
    >
      <div className="flex flex-col gap-[40px] lg:flex-row lg:items-center lg:gap-[3.125%]">
        <div className="w-full lg:w-[47.656%]">
          <Eyebrow className="text-accent">{bookAppointment.eyebrow}</Eyebrow>

          <h2
            id="book-appointment-heading"
            className="mt-[10px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
          >
            <RevealWords text={bookAppointment.heading} />
          </h2>

          <div className="mt-[30px] lg:mt-[40px]">
            <InfoBox
              icon={<HeadsetIcon className="h-[40px] w-[40px]" />}
              title={bookAppointment.servicesTitle}
            >
              <a
                href={contact.telHref}
                className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {contact.phoneDisplay}
              </a>
            </InfoBox>

            <div aria-hidden className="my-[30px] h-px bg-divider lg:my-[40px]" />

            <InfoBox
              icon={<OpenHoursIcon className="h-[40px] w-[40px]" />}
              title={bookAppointment.hoursTitle}
            >
              <p>{hours.display}</p>
            </InfoBox>
          </div>
        </div>

        <div className="w-full rounded-30 bg-secondary p-[20px] md:p-[30px] lg:w-[49.219%] lg:p-[40px]">
          <AppointmentForm idPrefix="book-" />
        </div>
      </div>
    </section>
  )
}
