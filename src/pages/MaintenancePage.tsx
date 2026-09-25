import { contact } from '@/config/site'
import { PageShell } from '@/components/PageShell'
import { ArrowUpRightIcon } from '@/components/icons'

/**
 * /maintenance-page/
 *
 * Live-site copy as captured: seo-backup/02-markdown/maintenance-page.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/maintenance-page.png
 *
 * NOTE: retire-410 (fix-plan A3) — indexable 292-word junk page. Not acted on: needs GSC confirmation.
 *
 * The live page's H1 is empty, so the registry's is too, and PageShell renders
 * it as such rather than this page inventing heading text (A5). That is also
 * why it has no page-header band: an empty title would leave a blank brown box.
 *
 * The live notice said the site was "under-going a design & technology
 * refresh"; that is no longer true once this site is live, so only its
 * visit-the-clinic message is kept, with the appointment call.
 */
export default function MaintenancePage() {
  return (
    <PageShell slug="maintenance-page">
      <div className="px-[20px] py-[60px] lg:py-[100px]">
        <div className="mx-auto flex max-w-[847px] flex-col items-center gap-[24px] rounded-30 bg-secondary px-[24px] py-[50px] text-center md:px-[60px]">
          <h2 className="font-display text-[28px] leading-[36px] text-primary md:text-[36px] md:leading-[43px]">
            You can visit our clinic for any dermatological &amp; skin treatments.
          </h2>
          <p className="font-sans text-[16px] leading-[26px] text-body">
            To book an appointment, call {contact.phoneDisplay}.
          </p>
          <a
            href={contact.telHref}
            className="inline-flex items-center gap-[12px] rounded-pill bg-accent px-[30px] py-[16px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {contact.ctaLabel}
            <ArrowUpRightIcon className="h-[16px] w-[16px]" />
          </a>
        </div>
      </div>
    </PageShell>
  )
}
