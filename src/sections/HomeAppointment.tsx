import type { CSSProperties } from 'react'
import { assets, homeAppointment } from '@/config/site'
import { AppointmentForm } from '@/components/AppointmentForm'
import { Eyebrow } from '@/components/Eyebrow'

/**
 * Built to theme-reference/04-sections/15-schedule-your-consultation-today/ —
 * the band the copy doc numbers 11. (Not 04-sections/34-make-an-appointment/,
 * which is the book-appointment page's variant — src/sections/appointment/
 * BookAppointment.tsx: no photograph, two icon boxes in its place.)
 *
 * The form itself is src/components/AppointmentForm.tsx, shared with the
 * /book-appointment/ page; its validation, submission and the departures that
 * belong to the form are documented there. This file is the band around it.
 *
 * Unusually for this page the reference's own stylesheets could be read rather
 * than measured off the screenshot: the Elementor rules in post-13.css carry
 * this section's geometry as declared values.
 *
 *  - The panel is the cream 1400 form HomeServices and HomeWhyChooseUs use, but
 *    with the radius and the side gutter dropped below 1024 — it goes
 *    full-bleed there, which no other band on the page does.
 *  - Its bottom padding is 0 and the media column has none either. That is
 *    deliberate, not an oversight: the cut-out photograph is meant to stand on
 *    the panel's bottom edge, and any padding under it breaks the illusion.
 *  - The columns swap below 1024 — `--order: 2` on the image, `1` on the form —
 *    so the heading leads on a phone rather than a 715px-tall photograph.
 *
 * Shared with the About page, which renders this band verbatim as its B9. The
 * three changes that doc asks for — phone above email, email optional, and a
 * WhatsApp consent checkbox the reference has no equivalent for — were applied
 * to the shared form rather than an About-only copy, so the homepage takes
 * them too. Its rationale ("fewer drop-offs on mobile") is not page-specific.
 * The heading and button label were deliberately NOT changed to the About doc's
 * wording; see the open question in that doc's handover notes.
 *
 * Departures from the reference band (the form's own are in AppointmentForm):
 *
 *  - The copy is the client's, and the doctor list is the clinic's four, read
 *    off `team` rather than retyped. The demo offers eight invented names.
 *  - The photograph is Dr Sandeep Mahapatra, which is what copy doc section 11
 *    asks for. It is the clinic's own shot rather than the reference's stock
 *    figure, keyed to transparency by scripts/import-appointment-doctor.ts so
 *    it stands on the arch the way the reference's cut-out does.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, as in HomeAbout and every band since. The reference's fadeInUp
 *    on the eyebrow and on the form widget is dropped: on this page only
 *    headings animate.
 */

export function HomeAppointment() {
  return (
    <section
      // Linkable, so a CTA on the same page can scroll here rather than leave
      // for /book-appointment/.
      id="appointment"
      aria-labelledby="home-appointment-heading"
      className="lg:px-[20px]"
    >
      {/* Full-bleed and square below 1024, a rounded 1400 panel above it. */}
      <div className="relative mx-auto max-w-[1400px] overflow-hidden bg-secondary px-[10px] pt-[50px] pb-0 lg:rounded-30 lg:pt-[100px]">
        {/*
          appointment-bg-shape.svg. The reference sets `background-size: 100%
          auto` at `top center`, i.e. stretched to the panel's width and left at
          its own height — 801/1800 of it, so 623px against a 1400 panel — and
          not repeated. That is `w-full h-auto` pinned to the top, which is why
          this is not HomeServices' object-fill treatment: that band's artwork
          has to reach all four edges, this one only the top two.
        */}
        <img
          src={assets.appointmentShape}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full select-none"
        />

        <div className="relative flex flex-col gap-[10px] lg:flex-row lg:items-center lg:gap-0">
          {/*
            Media column. Below 1024 it follows the form, so a phone opens on
            the heading rather than on 715px of photograph. No bottom padding,
            here or on the panel: the figure is meant to stand on the panel's
            bottom edge.
          */}
          <div className="order-2 w-full px-[10px] pt-[10px] md:mx-auto md:w-[81%] lg:order-1 lg:mx-0 lg:w-1/2 lg:pr-[60px]">
            {/*
              The arch spans the padding box while the photograph sits inside
              the content box, which is what makes it read as a backdrop 57px
              wider than the figure on each side rather than as a frame.

              The cap is 465 + 57 + 57, and it is what stops the photograph
              being upscaled past its natural 465x715. The reference's own
              declared rules would stretch it to the full 620px column, but its
              render does not: measured off screenshot.png the arch is 570 wide
              against a 620 content box, the figure is 401, and the band is 827
              tall — which only resolves if the image is sitting at its natural
              width. Uncapped, this column is 8% wider than the reference's and
              the whole band 62px taller. It is flush right in the column for
              the same reason: the measured arch ends at 655 against a content
              box ending at 660, and starts 45px inside it.
            */}
            <div className="relative mx-auto max-w-[579px] px-[30px] md:px-[57px] lg:mr-0">
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[85%] rounded-t-full"
                // Authored here rather than as an arbitrary Tailwind value: the
                // reference's stop is at 97.53%, and a gradient this long reads
                // better as CSS than as an underscore-escaped class.
                style={
                  {
                    backgroundImage:
                      'linear-gradient(180deg, #E8DFDA 0%, rgba(232, 223, 218, 0) 97.53%)',
                  } as CSSProperties
                }
              />

              {/*
                A transparent cut-out standing on the arch, as the reference's
                figure does. It was clipped to an arch of its own for as long as
                the only photograph available was a studio portrait on a grey
                ground; scripts/import-appointment-doctor.ts keys the backdrop
                out of the clinic's own shot, so the wrapper that did the
                clipping is gone and the figure stands free again.
              */}
              <img
                src={assets.appointmentImage}
                alt={assets.appointmentImageAlt}
                width={465}
                height={715}
                loading="lazy"
                decoding="async"
                className="relative block aspect-[465/715] w-full object-cover"
              />
            </div>
          </div>

          {/*
            Copy and form column. It keeps the 10px left padding the media
            column has — measured, and the reason the reference's heading starts
            at 730 rather than on the 720 column boundary.
          */}
          <div className="order-1 flex w-full flex-col gap-[10px] px-[10px] lg:order-2 lg:w-1/2 lg:pr-0">
            <Eyebrow className="text-accent">{homeAppointment.eyebrow}</Eyebrow>

            <h2
              id="home-appointment-heading"
              className="mb-[20px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:mb-[30px] lg:text-[48px] lg:leading-[58px]"
            >
              {homeAppointment.heading.split(' ').map((word, index, words) => (
                <span
                  // Words can repeat within the heading, so the index is the identity.
                  key={`${word}-${index}`}
                  className="reveal-word"
                  // Not animation-delay: a view() timeline has no clock to delay.
                  // Each word is bound to a slightly later slice of the scroll.
                  style={{ '--i': index } as CSSProperties}
                >
                  {/* The trailing space belongs to the word's own string — see HomeAbout. */}
                  {index === words.length - 1 ? word : `${word} `}
                </span>
              ))}
            </h2>

            {/*
              The 630 cap is read off the reference's render, not derived: its
              Bootstrap row sits inside ElementsKit and Contact Form 7 wrappers
              that the capture does not include, so the declared .col-md-6
              gutter does not predict what it draws. Measured at 1440, across
              the fields' mid-height rather than their rounded shoulders, it
              draws two 300px fields at 730..1030 and 1060..1360: a 630px block
              flush with the heading, 30px between the columns and 24px between
              the rows. Uncapped, the block runs to the panel's edge, 50px wider
              than the reference's.
            */}
            <AppointmentForm className="lg:max-w-[630px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
