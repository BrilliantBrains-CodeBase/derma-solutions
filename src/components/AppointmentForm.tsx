import { useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { homeAppointment, team } from '@/config/site'
import { ChevronDownIcon } from '@/components/icons'

/**
 * The appointment form, shared by HomeAppointment (the homepage's and About
 * page's band, ref 04-sections/15-…) and BookAppointment (the /book-appointment/
 * page's band, ref 04-sections/34-make-an-appointment/). Both reference
 * sections carry the same Contact Form 7 form, so there is one implementation
 * and one `homeAppointment` config behind both.
 *
 * `idPrefix` exists because every control's id comes from config: two forms on
 * one page would otherwise collide on id="first-name". Empty by default, so the
 * homepage's ids are unchanged. `name` is never prefixed — it is what the Apps
 * Script reads.
 *
 * Departures from the reference form (see HomeAppointment for the band's own):
 *
 *  - The consent checkbox is not in the reference at all. It is required, its
 *    value rides in the same values record as every other control, and it is
 *    POSTed with them — the consent that counts is the one the clinic can
 *    produce later, which means it has to reach the sheet.
 *  - Every field gets a visually-hidden <label>. The reference is
 *    placeholder-only, and a placeholder stops being the accessible name the
 *    moment someone types into the field.
 *  - Validation is written here rather than delegated to Contact Form 7. It
 *    runs on submit, not on blur, which is what CF7 does too; the messages are
 *    per-field, and focus moves to the first field that failed.
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
 *
 * Fields are 58px tall at 40px radius, dropping to 52px below 1024 and to a
 * 24px radius below 768. The 40 is --radius-field in tokens.css.
 */

/* Both bands are cream, so the hero's white focus ring would be invisible here. */
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
  homeAppointment.consent.name,
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
      /* `required` is absent on every field but email, and absent means true.
       * An optional field that IS filled in still has to be valid, which is why
       * this only skips the empty case. */
      if (!('required' in field) || field.required !== false) {
        errors[field.name] = messages.required
      }
    } else if (field.type === 'email' && !EMAIL_PATTERN.test(value)) {
      errors[field.name] = messages.invalidEmail
    } else if (field.type === 'tel' && !isPhone(value)) {
      errors[field.name] = messages.invalidPhone
    }
  }

  if (!values[homeAppointment.doctorField.name]) {
    errors[homeAppointment.doctorField.name] = messages.required
  }

  /* Last, so it is the last thing focus falls back to — and its own message,
   * because "This field is required." reads oddly against a sentence. */
  if (!values[homeAppointment.consent.name]) {
    errors[homeAppointment.consent.name] = messages.consentRequired
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

export function AppointmentForm({
  idPrefix = '',
  className = '',
}: {
  idPrefix?: string
  /** Width cap on the form and its status message, e.g. `lg:max-w-[630px]`. */
  className?: string
}) {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const idFor = (id: string) => `${idPrefix}${id}`
  const doctorId = idFor(homeAppointment.doctorField.id)
  const consentId = idFor(homeAppointment.consent.id)

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
    <>
      {/*
        noValidate so the messages below are the ones a visitor sees. The
        browser's own bubbles would fire first, one at a time, and say
        something different from what this form says.
      */}
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 gap-x-[30px] gap-y-[24px] md:grid-cols-2 ${className}`}
      >
        {homeAppointment.fields.map(field => {
          const id = idFor(field.id)
          return (
            <Field key={field.name} id={id} label={field.label} error={errors[field.name]}>
              <input
                id={id}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={event => update(field.name, event.target.value)}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${id}-error` : undefined}
                className={controlClass}
              />
            </Field>
          )
        })}

        <Field
          id={doctorId}
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
              id={doctorId}
              name={homeAppointment.doctorField.name}
              value={values[homeAppointment.doctorField.name]}
              onChange={event => update(homeAppointment.doctorField.name, event.target.value)}
              aria-invalid={Boolean(errors[homeAppointment.doctorField.name])}
              aria-describedby={
                errors[homeAppointment.doctorField.name] ? `${doctorId}-error` : undefined
              }
              className={`${controlClass} appearance-none pr-[40px]`}
            >
              <option value="">{homeAppointment.doctorField.placeholder}</option>
              {team.map(member => (
                <option key={member.id} value={member.displayName}>
                  {member.displayName}
                </option>
              ))}
              {/*
                The About doc's B9 dropdown ends with this. A visitor with
                no preference otherwise has to pick a doctor at random or
                abandon the form, and the field is required.
              */}
              <option value={homeAppointment.doctorField.noPreferenceLabel}>
                {homeAppointment.doctorField.noPreferenceLabel}
              </option>
            </select>

            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-[15px] h-[12px] w-[12px] -translate-y-1/2 text-body" />
          </div>
        </Field>

        {/*
          The consent checkbox — new in the About round, and not in the
          reference form at all. It deliberately does NOT use `Field`:
          Field renders an sr-only label above its control, and this
          control's label is the visible sentence beside it.

          The value is carried in the same `values` record as everything
          else ('yes' or ''), so the existing URLSearchParams POST sends
          it to the Apps Script untouched. That matters: the consent the
          clinic may later have to produce is the one in the sheet, not
          the tick in the browser.
        */}
        <div className="md:col-span-2">
          <label htmlFor={consentId} className="flex cursor-pointer items-start gap-[12px]">
            <input
              id={consentId}
              name={homeAppointment.consent.name}
              type="checkbox"
              checked={values[homeAppointment.consent.name] === 'yes'}
              onChange={event =>
                update(homeAppointment.consent.name, event.target.checked ? 'yes' : '')
              }
              aria-invalid={Boolean(errors[homeAppointment.consent.name])}
              aria-describedby={
                errors[homeAppointment.consent.name] ? `${consentId}-error` : undefined
              }
              className={`mt-[3px] h-[18px] w-[18px] shrink-0 accent-accent ${focusRing}`}
            />
            <span className="font-sans text-[14px] leading-[22px] text-body">
              {homeAppointment.consent.label}
            </span>
          </label>

          {errors[homeAppointment.consent.name] && (
            <p
              id={`${consentId}-error`}
              className="mt-[6px] font-sans text-[14px] leading-[20px] text-error"
            >
              {errors[homeAppointment.consent.name]}
            </p>
          )}
        </div>

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
          {status === 'submitting' ? homeAppointment.submittingLabel : homeAppointment.submitLabel}
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
            ? `mt-[10px] rounded-30 border px-[16px] py-[10px] font-sans text-[14px] leading-[22px] ${className} ${
                status === 'success' ? 'border-success text-success' : 'border-error text-error'
              }`
            : 'sr-only'
        }
      >
        {message}
      </p>
    </>
  )
}
