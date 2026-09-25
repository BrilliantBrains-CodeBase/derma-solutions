import type { ReactNode } from 'react'
import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { Eyebrow } from '@/components/Eyebrow'
import { RevealWords } from '@/components/RevealWords'
import { HeadsetIcon, MailIcon, MapPinIcon, OpenHoursIcon, WhatsAppIcon } from '@/components/icons'
import { brand, contact, hours, location, serviceAreas, serviceAreasHeading } from '@/config/site'

/**
 * /contact-us/
 *
 * NOT in the live capture; its SEO is authored in scripts/added-pages.ts. The
 * live Service schema's serviceUrl has always pointed here and 404'd — this
 * page is that fix, since the schema ships byte-verbatim and cannot be
 * repointed.
 *
 * Every value on the page is read from src/config/site.ts — the NAP, hours and
 * map pin the JSON-LD also carries — so the page and the structured data a
 * local search result is built from cannot disagree.
 *
 * Built from the book-appointment band's parts (InfoBox, the 1300 container,
 * the 47.656 / 49.219 column split) rather than a reference section: there is
 * no contact page in theme-reference/.
 *
 * TODO(content): no copy doc. The eyebrow and heading are authored.
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

const linkClass =
  'transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
const Divider = () => <div aria-hidden className="my-[24px] h-px bg-divider lg:my-[30px]" />

export default function ContactUs() {
  return (
    <PageShell
      slug="contact-us"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
        </PageHeader>
      )}
    >
      {/* white */}
      <section
        aria-labelledby="contact-heading"
        className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
      >
        <div className="flex flex-col gap-[40px] lg:flex-row lg:items-stretch lg:gap-[3.125%]">
          <div className="w-full lg:w-[47.656%]">
            <Eyebrow className="text-accent">Visit the Clinic</Eyebrow>
            <h2
              id="contact-heading"
              className="mt-[10px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            >
              <RevealWords text={`Get in touch with ${brand.shortName}`} />
            </h2>

            <div className="mt-[30px] lg:mt-[40px]">
              <InfoBox icon={<HeadsetIcon className="h-[40px] w-[40px]" />} title="Call Us">
                <a href={contact.telHref} className={linkClass}>{contact.phoneDisplay}</a>
                <p className="text-[14px] leading-[24px]">Languages: {contact.languages.join(', ')}</p>
              </InfoBox>
              <Divider />
              <InfoBox icon={<WhatsAppIcon className="h-[40px] w-[40px]" />} title="WhatsApp">
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Message us on WhatsApp
                </a>
              </InfoBox>
              <Divider />
              <InfoBox icon={<MailIcon className="h-[40px] w-[40px]" />} title="E-mail">
                <a href={`mailto:${contact.email}`} className={`${linkClass} [overflow-wrap:anywhere]`}>
                  {contact.email}
                </a>
              </InfoBox>
              <Divider />
              <InfoBox icon={<MapPinIcon className="h-[40px] w-[40px]" />} title="Clinic Address">
                <address className="not-italic">
                  <span className="block font-semibold text-primary">{brand.name}</span>
                  {location.addressDisplayLines.map(line => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
                <p className="mt-[10px] flex flex-wrap gap-x-[18px] gap-y-[6px] font-semibold text-accent">
                  <a href={location.google.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} hover:text-primary`}>
                    Get Directions
                  </a>
                  {location.google.reviewUrl && (
                    <a href={location.google.reviewUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} hover:text-primary`}>
                      Review Us on Google
                    </a>
                  )}
                </p>
              </InfoBox>
              <Divider />
              <InfoBox icon={<OpenHoursIcon className="h-[40px] w-[40px]" />} title="Opening Hours">
                <p>{hours.display}</p>
                <p>{hours.displayHeading}</p>
              </InfoBox>
            </div>
          </div>

          <div className="min-h-[360px] w-full overflow-hidden rounded-30 bg-secondary lg:w-[49.219%]">
            <iframe
              title={`Map showing ${brand.name}, ${location.landmarks[0].toLowerCase()}`}
              src={location.google.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full border-0"
            />
          </div>
        </div>
      </section>

      {/* cream */}
      <section aria-labelledby="service-areas-heading" className="bg-secondary">
        <div className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[80px]">
          <h2
            id="service-areas-heading"
            className="font-display text-[28px] leading-[36px] text-primary md:text-[36px] md:leading-[44px]"
          >
            {serviceAreasHeading}
          </h2>
          <ul className="mt-[24px] flex flex-wrap gap-[10px]">
            {serviceAreas.map(area => (
              <li
                key={area}
                className="rounded-pill bg-white px-[18px] py-[8px] font-sans text-[15px] leading-[22px] text-body"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}
