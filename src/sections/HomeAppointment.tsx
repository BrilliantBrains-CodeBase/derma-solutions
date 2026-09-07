import { useRef, useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode } from 'react'
import { assets, homeAppointment, team } from '@/config/site'
import { ChevronDownIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'

/**
 * Built to theme-reference/04-sections/15-schedule-your-consultation-today/ —
 * the band the copy doc numbers 11. (Not 04-sections/34-make-an-appointment/,
 * which is the book-appointment page's variant: no photograph, two icon boxes
 * in its place.)
 *
 * The only band on this page that takes input rather than presenting copy, and
 * the first form in the repo — there is no Input, Field or Button primitive to
 * reach for, so the field styling is authored here. Tailwind's preflight strips
 * every control back to nothing, which is why each one carries its own
 * background, radius and type.
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
 *  - Fields are 58px tall at 40px radius, dropping to 52px below 1024 and to a
 *    24px radius below 768. The 40 is --radius-field in tokens.css, which was
 *    minted for exactly this and had no other call site until now.
 *
 * Seven departures from the reference:
 *
 *  - The copy is the client's, and the doctor list is the clinic's four, read
 *    off `team` rather than retyped. The demo offers eight invented names.
 *  - The photograph is Dr Sandeep Mahapatra, which is what copy doc section 11
 *    asks for, but it is not a cut-out and the reference's is. It is clipped to
 *    an arch inside the backdrop arch instead of standing on it as a figure with
 *    transparency. The wrapper in the media column below says why, and what to
 *    delete if a cut-out ever arrives.
 *  - Every field gets a visually-hidden <label>. The reference is
 *    placeholder-only, and a placeholder stops being the accessible name the
 *    moment someone types into the field.
 *  - Validation is written here rather than delegated to Contact Form 7. It
 *    runs on submit, not on blur, which is what CF7 does too; the messages are
 *    per-field, and focus moves to the first field that failed.
 *  - The heading animates per word in CSS rather than per character in GSAP
 *    SplitText, as in HomeAbout and every band since. The reference's fadeInUp
 *    on the eyebrow and on the form widget is dropped: on this page only
 *    headings animate.
 *  - The response message is a sentence in a roomier box than the reference's
 *    5px/10px pill. CF7's own output is "One or more fields have an error",
 *    which fits on one short line; these messages carry a phone number.
 *  - Submission is not wired yet — see the note on homeAppointment.endpoint and
 *    the handler below.
 *
 * The date field is the native <input type="date">, as the reference's is. The
 * copy doc asks for dd-mm-yyyy; a native date input renders the visitor's own
 * locale format and cannot be told otherwise, and one field does not justify a
 * datepicker dependency. It carries no `min` either: computing today's date at
 * render would bake a build-day value into the prerendered HTML and then
 * disagree with it on hydration.
 */

/* The band is cream, so the hero's white focus ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

/**
 * Shared by the five inputs and the select. Preflight has already removed the
 * border, the background and the inherited type, so all three are restated.
 */
const controlClass =
  `h-[52px] w-full rounded-24 border-0 bg-white px-[20px] font-sans text-[16px] ` +
  `leading-[1.5] text-body placeholder:text-body md:rounded-field lg:h-[58px] ${focusRing}`

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Tolerant of the shapes a patient actually types: +91, a leading 0, spaces,
 * hyphens and brackets. What has to survive is ten digits of subscriber number.
 */
function isPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.replace(/^(?:0|91)/, '').length === 10
}

/** Every control's name, in the order they are read and rendered. */
const controlNames = [
  ...homeAppointment.fields.map(field => field.name),
  homeAppointment.doctorField.name,
]

const emptyValues: Record<string, string> = Object.fromEntries(
  controlNames.map(name => [name, '']),
)

function validate(values: Record<string, string>) {
  const { messages } = homeAppointment
  /* Insertion order is field order, which is what makes Object.keys()[0] below
   * the first failure on the page rather than an arbitrary one. */
  const errors: Record<string, string> = {}

  for (const field of homeAppointment.fields) {
    const value = values[field.name].trim()

    if (!value) {
      errors[field.name] = messages.required
    } else if (field.type === 'email' && !EMAIL_PATTERN.test(value)) {
      errors[field.name] = messages.invalidEmail
    } else if (field.type === 'tel' && !isPhone(value)) {
      errors[field.name] = messages.invalidPhone
    }
  }

  if (!values[homeAppointment.doctorField.name]) {
    errors[homeAppointment.doctorField.name] = messages.required
  }

  return errors
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

/**
 * One field: the hidden label that names it, the control, and the message that
 * appears under it when it fails.
 *
 * `children` is the control rather than a set of props, because the select
 * needs a wrapper and a chevron beside it and the inputs do not.
 */
function Field({
  id,
  label,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-[6px] px-[20px] font-sans text-[14px] leading-[20px] text-error"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export function HomeAppointment() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  function update(name: string, value: string) {
    setValues(current => ({ ...current, [name]: value }))
    /* Clear this field's message as soon as it is touched — leaving it under a
     * field someone is already correcting reads as a second failure. */
    setErrors(current => {
      if (!current[name]) return current
      const { [name]: _removed, ...rest } = current
      return rest
    })
  }

  /**
   * Four outcomes, and the third is the one that matters.
   *
   * With no endpoint configured this reports that booking is not live and gives
   * the clinic's number. It must never render the success message in that
   * state: a patient who is told "thank you, we will call you back" and then
   * hears nothing is worse off than one who was never offered the form.
   *
   * With an endpoint, the request goes to a Google Apps Script web app.
   * URLSearchParams sends application/x-www-form-urlencoded, which is
   * CORS-safelisted, so there is no preflight for Apps Script to fail; `no-cors`
   * because it answers without CORS headers, which also makes the response
   * opaque — a fetch that resolves is the only success signal available. On the
   * script side, doPost(e) reads the six values off e.parameter under the
   * `name` keys in homeAppointment.fields.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      setStatus('idle')
      const control = formRef.current?.elements.namedItem(firstInvalid)
      if (control instanceof HTMLElement) control.focus()
      return
    }

    if (!homeAppointment.endpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')
    try {
      await fetch(homeAppointment.endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(values),
      })
      setStatus('success')
      setValues(emptyValues)
    } catch {
      setStatus('error')
    }
  }

  const message =
    status === 'success'
      ? homeAppointment.messages.success
      : status === 'error'
        ? homeAppointment.messages.error
        : status === 'unconfigured'
          ? homeAppointment.messages.unconfigured
          : ''

  return (
    <section
      // Linkable, so the band has an address of its own. contact.ctaHref still
      // points at /book-appointment/, which 404s and stays whitelisted in
      // scripts/verify-links.ts; repointing the header and footer CTAs here is
      // a separate decision.
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
                      'linear-gradient(180deg, #FEDFD4 0%, rgba(255, 233, 224, 0) 97.53%)',
                  } as CSSProperties
                }
              />

              {/*
                The reference's figure is a transparent cut-out standing on the
                arch. The clinic's photograph is a studio portrait on a soft grey
                ground, and nothing in the toolchain segments a subject out of a
                backdrop — a luminance key would take the white coat with it. So
                the photograph is clipped to an arch of its own instead, and the
                pink one behind stays visible as the 57px halo it always was.

                rounded-t-full on a 465x715 box puts the dome's radius at 232.5,
                which is the same curve the backdrop draws at its own width. The
                two arches are concentric rather than merely similar, which is
                what stops this reading as a photo pasted over a shape.

                Revert to a bare <img> if the clinic ever supplies the cut-out:
                delete this wrapper and nothing else moves. See the note on
                assets.appointmentImage.
              */}
              <div className="relative overflow-hidden rounded-t-full">
                <img
                  src={assets.appointmentImage}
                  alt={assets.appointmentImageAlt}
                  width={465}
                  height={715}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[465/715] w-full object-cover"
                />
              </div>
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
              noValidate so the messages below are the ones a visitor sees. The
              browser's own bubbles would fire first, one at a time, and say
              something different from what this form says.
            */}
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              /*
               * The cap and the gutters are read off the reference's render,
               * not derived: its Bootstrap row sits inside ElementsKit and
               * Contact Form 7 wrappers that the capture does not include, so
               * the declared .col-md-6 gutter does not predict what it draws.
               * Measured at 1440, across the fields' mid-height rather than
               * their rounded shoulders, it draws two 300px fields at 730..1030
               * and 1060..1360: a 630px block flush with the heading, 30px
               * between the columns and 24px between the rows. Uncapped, the
               * block runs to the panel's edge, 50px wider than the reference's.
               */
              className="grid grid-cols-1 gap-x-[30px] gap-y-[24px] md:grid-cols-2 lg:max-w-[630px]"
            >
              {homeAppointment.fields.map(field => (
                <Field
                  key={field.name}
                  id={field.id}
                  label={field.label}
                  error={errors[field.name]}
                >
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={event => update(field.name, event.target.value)}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={errors[field.name] ? `${field.id}-error` : undefined}
                    className={controlClass}
                  />
                </Field>
              ))}

              <Field
                id={homeAppointment.doctorField.id}
                label={homeAppointment.doctorField.label}
                error={errors[homeAppointment.doctorField.name]}
              >
                {/*
                  The reference paints its caret with a background-image on the
                  select and `appearance: none`. Same result, but with the icon
                  the rest of the site already uses — icons.tsx's ChevronDownIcon
                  draws the same stroked chevron as the theme's drope-down.svg.
                */}
                <div className="relative">
                  <select
                    id={homeAppointment.doctorField.id}
                    name={homeAppointment.doctorField.name}
                    value={values[homeAppointment.doctorField.name]}
                    onChange={event =>
                      update(homeAppointment.doctorField.name, event.target.value)
                    }
                    aria-invalid={Boolean(errors[homeAppointment.doctorField.name])}
                    aria-describedby={
                      errors[homeAppointment.doctorField.name]
                        ? `${homeAppointment.doctorField.id}-error`
                        : undefined
                    }
                    className={`${controlClass} appearance-none pr-[40px]`}
                  >
                    <option value="">{homeAppointment.doctorField.placeholder}</option>
                    {team.map(member => (
                      <option key={member.id} value={member.displayName}>
                        {member.displayName}
                      </option>
                    ))}
                  </select>

                  <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-[15px] h-[12px] w-[12px] -translate-y-1/2 text-body" />
                </div>
              </Field>

              {/*
                The reference's .btn-default wipe: a primary fill that grows out
                of the centre on hover. `isolate` keeps the -z-10 overlay inside
                the button, where it paints over the accent background but under
                the label.
              */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`group/submit relative isolate w-full overflow-hidden rounded-pill bg-accent px-[25px] py-[15px] font-sans text-[16px] leading-[16px] font-semibold text-white disabled:opacity-70 md:col-span-2 lg:py-[17px] ${focusRing}`}
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 right-1/2 left-1/2 -z-10 rounded-pill bg-primary opacity-0 transition-all duration-[400ms] ease-in-out group-hover/submit:right-0 group-hover/submit:left-0 group-hover/submit:opacity-100"
                />
                {status === 'submitting'
                  ? homeAppointment.submittingLabel
                  : homeAppointment.submitLabel}
              </button>
            </form>

            {/*
              Always mounted so a screen reader has something to announce into.
              role="status" is polite: it waits for a pause rather than cutting
              across whatever is being read.
            */}
            <p
              role="status"
              className={
                message
                  ? `mt-[10px] rounded-30 border px-[16px] py-[10px] font-sans text-[14px] leading-[22px] lg:max-w-[630px] ${
                      status === 'success'
                        ? 'border-success text-success'
                        : 'border-error text-error'
                    }`
                  : 'sr-only'
              }
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
