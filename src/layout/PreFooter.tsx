import { legal, serviceAreas, serviceAreasHeading } from '@/config/site'

/**
 * The service-areas list and the medical disclaimer, as their own section
 * directly above the footer.
 *
 * Neither belongs to the Glowix reference's footer — they are carried over from
 * the live site and are load-bearing: the area list is the local-SEO surface
 * that names every neighbourhood the clinic draws patients from, and the
 * disclaimer is legal copy reproduced verbatim (see `legal.disclaimer`, which
 * says not to paraphrase it).
 *
 * On the cream `secondary` ground rather than the footer's brown, which is the
 * theme's alternating light section background.
 */
export function PreFooter() {
  return (
    <section aria-label={serviceAreasHeading} className="bg-secondary">
      <div className="mx-auto max-w-[1300px] px-[15px] py-[40px] md:py-[60px]">
        <h2 className="font-display text-[22px] leading-[26px] text-primary">
          {serviceAreasHeading}
        </h2>

        <ul className="mt-[18px] flex flex-wrap font-sans text-[15px] leading-[24px] text-body">
          {serviceAreas.map(area => (
            <li
              key={area}
              className="after:mx-[10px] after:text-accent/40 after:content-['/'] last:after:content-none"
            >
              {area}
            </li>
          ))}
        </ul>

        <div aria-hidden className="my-[30px] h-px bg-divider" />

        <p className="font-sans text-[13px] leading-[22px] text-body">
          <strong className="font-semibold text-primary">{legal.disclaimerLabel}</strong>{' '}
          {legal.disclaimer}
        </p>
      </div>
    </section>
  )
}
