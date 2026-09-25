import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { contact, hours, location, seo, thankYou } from '@/config/site'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { Eyebrow } from '@/components/Eyebrow'
import { MapPinIcon, OpenHoursIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons'
import { LEAD_FLAG, pushEvent } from '@/lib/dataLayer'

/**
 * /thank-you/ — where AppointmentForm lands after a successful submit.
 *
 * Not in the SEO registry, on NotFound's pattern: the registry has no noindex
 * option and would put the page in the sitemap and mint JSON-LD for it, all
 * wrong for a confirmation page. So its <head> is written here, noindex, and
 * the route is added by hand in scripts/generate-routes.ts.
 *
 * The conversion: `lead_submit` is pushed only when AppointmentForm left
 * LEAD_FLAG in sessionStorage, and the flag is cleared as it is read — a
 * reload, a bookmark or a direct visit shows the page but counts nothing.
 * GTM-side setup: apps-script/README.md.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function CtaLink({
  href,
  icon,
  children,
  variant = 'solid',
}: {
  href: string
  icon: ReactNode
  children: ReactNode
  variant?: 'solid' | 'outline'
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`flex h-[50px] items-center justify-center gap-[10px] rounded-pill px-[28px] font-sans text-[16px] leading-[16px] font-semibold transition-opacity hover:opacity-90 ${focusRing} ${
        variant === 'solid' ? 'bg-accent text-white' : 'border border-primary text-primary'
      }`}
    >
      <span aria-hidden>{icon}</span>
      {children}
    </a>
  )
}

export default function ThankYou() {
  useEffect(() => {
    try {
      const form = sessionStorage.getItem(LEAD_FLAG)
      if (form) {
        sessionStorage.removeItem(LEAD_FLAG)
        pushEvent({ event: 'lead_submit', form })
      }
    } catch {
      /* no storage: no conversion to report */
    }
  }, [])

  return (
    <>
      <Head>
        <title>{thankYou.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${seo.canonicalBase}/thank-you/`} />
      </Head>

      <main id="content">
        <PageHeader h1={thankYou.h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: thankYou.h1 }]} />
        </PageHeader>

        <section
          aria-labelledby="thank-you-heading"
          className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
        >
          <div className="flex flex-col gap-[40px] lg:flex-row lg:gap-[3.125%]">
            <div className="w-full lg:w-[57%]">
              <Eyebrow className="text-accent">{thankYou.eyebrow}</Eyebrow>

              <h2
                id="thank-you-heading"
                className="mt-[10px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px]"
              >
                {thankYou.heading}
              </h2>

              <p className="mt-[20px] font-sans text-[18px] leading-[30px] text-body">
                {thankYou.lead}
              </p>

              <h3 className="mt-[40px] font-display text-[24px] leading-[32px] text-primary">
                {thankYou.stepsTitle}
              </h3>

              <ol className="mt-[20px] flex flex-col gap-[20px]">
                {thankYou.steps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-[16px]">
                    <span
                      aria-hidden
                      className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-accent font-sans text-[16px] font-semibold text-white"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-sans text-[18px] leading-[28px] font-semibold text-primary">
                        {step.title}
                      </p>
                      <p className="mt-[4px] font-sans text-[16px] leading-[26px] text-body">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                to="/"
                className={`mt-[40px] inline-block font-sans text-[16px] font-semibold text-accent underline underline-offset-4 hover:text-primary ${focusRing}`}
              >
                {thankYou.homeLabel}
              </Link>
            </div>

            <aside className="w-full rounded-30 bg-secondary p-[20px] md:p-[30px] lg:w-[39.875%] lg:p-[40px]">
              <h3 className="font-display text-[24px] leading-[32px] text-primary">
                {thankYou.helpTitle}
              </h3>
              <p className="mt-[10px] font-sans text-[16px] leading-[26px] text-body">
                {thankYou.helpText}
              </p>

              <div className="mt-[24px] flex flex-col gap-[12px]">
                <CtaLink href={contact.telHref} icon={<PhoneIcon className="h-[18px] w-[18px]" />}>
                  {thankYou.callLabel}
                </CtaLink>
                <CtaLink
                  href={contact.whatsappHref}
                  icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
                  variant="outline"
                >
                  {thankYou.whatsappLabel}
                </CtaLink>
              </div>

              <div aria-hidden className="my-[30px] h-px bg-divider" />

              <div className="flex items-start gap-[16px]">
                <MapPinIcon className="mt-[4px] h-[24px] w-[24px] shrink-0 text-accent" />
                <div>
                  <p className="font-sans text-[16px] leading-[26px] font-semibold text-primary">
                    {thankYou.addressTitle}
                  </p>
                  <address className="mt-[4px] font-sans text-[15px] leading-[24px] text-body not-italic">
                    {location.addressDisplayLines.map(line => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="mt-[24px] flex items-start gap-[16px]">
                <OpenHoursIcon className="mt-[4px] h-[24px] w-[24px] shrink-0 text-accent" />
                <div>
                  <p className="font-sans text-[16px] leading-[26px] font-semibold text-primary">
                    {thankYou.hoursTitle}
                  </p>
                  <p className="mt-[4px] font-sans text-[15px] leading-[24px] text-body">
                    {hours.display}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  )
}
