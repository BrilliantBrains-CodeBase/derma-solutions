import { Link } from 'react-router-dom'
import {
  assets, brand, contact, footerCta, hours, legal, location, navigation,
  socialProfiles, copyrightLine,
} from '@/config/site'
import {
  ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon, socialIcons,
} from '@/components/icons'

/**
 * Built to theme-reference/04-sections/02-site-footer/ — its structure.html,
 * computed.json and screenshot.png are the spec. Every value still comes from
 * src/config/site.ts, so the NAP cannot drift from the JSON-LD.
 *
 * Two deliberate departures from the reference, both agreed:
 *
 *  - The reference's top band is a Contact Form 7 newsletter. There is no
 *    newsletter backend, so the same geometry carries the appointment CTA.
 *  - The reference has no slot for the service-areas list or the medical
 *    disclaimer. Both are load-bearing here (local SEO, and legal), so they sit
 *    in <PreFooter> — their own light section directly above this one.
 */

/**
 * The four corner motifs behind the panel.
 *
 * The source artwork is one 1864x816 composition with a botanical motif tucked
 * into each corner and nothing in the middle. The theme paints it across the
 * whole panel with `background-size: cover`, so the motifs scale with the panel
 * width — measured off the reference's 1400px panel, the art renders 1640px
 * wide, a ratio of 1.171.
 *
 * Opacity is 0.8, deliberately well above the reference's measured 0.30 — the
 * motifs are meant to be seen here, not merely implied.
 *
 * That ratio is reproduced here per corner rather than as one background,
 * because `cover` only behaves while the panel keeps the reference's aspect
 * ratio: this footer runs ~300px taller, and covering it would scale the art up
 * ~1.3x and crop every motif out of frame. Each corner box is 17% of the panel
 * width with the art at 689% of the box (0.17 x 6.89 = 1.171), which keeps both
 * the reference's scale and its growth with viewport width.
 */
function FooterDecor() {
  const corners = [
    { key: 'lt', box: 'top-0 left-0 h-[260px]', pos: 'left top' },
    { key: 'rt', box: 'top-0 right-0 h-[260px]', pos: 'right top' },
    { key: 'lb', box: 'bottom-0 left-0 h-[300px]', pos: 'left bottom' },
    { key: 'rb', box: 'bottom-0 right-0 h-[300px]', pos: 'right bottom' },
  ]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      {corners.map(corner => (
        <div
          key={corner.key}
          className={`absolute w-[17%] min-w-[190px] max-w-[340px] opacity-[0.8] ${corner.box}`}
          style={{
            backgroundImage: `url(${assets.footerShape})`,
            backgroundSize: '689% auto',
            backgroundPosition: corner.pos,
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
    </div>
  )
}

/** The 1px white@10% hairline the reference uses between every band. */
function Rule({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`h-px bg-divider-dark ${className}`} />
}

/** Marcellus 22/26 — the reference's column heading, measured in typography.md. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[22px] leading-[26px] text-white">{children}</h2>
  )
}

const linkStyle =
  'rounded-[4px] transition-colors hover:text-accent focus-visible:outline-2 ' +
  'focus-visible:outline-offset-4 focus-visible:outline-accent'

export function Footer() {
  // The gutter is cream, not the body's white: <PreFooter> above is cream, so a
  // white gutter would put three colours together at the panel's rounded top
  // corners. Carrying the cream through makes it one transition, cream -> card.
  return (
    <footer className="bg-secondary px-[20px] pb-[20px]">
      <div className="relative overflow-hidden rounded-[20px] bg-primary text-white md:rounded-[30px]">
        {/* Vendor line-art, reference-only licence — see the TODO on assets.footerShape. */}
        <FooterDecor />

        <div className="relative mx-auto max-w-[1300px] px-[15px] py-[40px] md:py-[60px]">
          {/* ---- CTA band ------------------------------------------------- */}
          <div className="flex flex-col items-start gap-[30px] lg:flex-row lg:items-center lg:justify-between lg:gap-[40px]">
            <h2 className="max-w-[640px] font-display text-[32px] leading-[40px] text-white md:text-[48px] md:leading-[58px]">
              {footerCta.heading}
            </h2>
            <a
              href={footerCta.buttonHref}
              className={`inline-flex shrink-0 items-center gap-[12px] rounded-pill bg-accent px-[34px] py-[18px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
            >
              {footerCta.buttonLabel}
              <ArrowUpRightIcon className="h-[16px] w-[16px]" />
            </a>
          </div>

          <Rule className="my-[40px] md:my-[50px]" />

          {/* ---- Brand column + link columns ------------------------------ */}
          <div className="grid gap-[40px] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[60px]">
            {/* Brand */}
            <div>
              {/* White chip: the only Derma Solutions mark is a white-background
                  PNG. See the TODO on assets.logoWithBackground. */}
              <Link
                to="/"
                className="inline-flex rounded-[10px] bg-white p-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <img
                  src={assets.logoWithBackground}
                  alt={assets.logoAlt}
                  width={159}
                  height={51}
                  className="h-[51px] w-auto"
                />
              </Link>

              <p className="mt-[24px] max-w-[320px] font-sans text-[16px] leading-[26px] text-white/80">
                {brand.footerTagline}
              </p>

              <ul className="mt-[30px] flex flex-wrap gap-[14px]">
                {socialProfiles.map(profile => {
                  const Icon = socialIcons[profile.name]
                  return (
                    <li key={profile.name}>
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${brand.shortName} on ${profile.name}`}
                        className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-divider-dark text-white transition-colors hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {Icon ? <Icon className="h-[15px] w-[15px]" /> : profile.name}
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-[40px]">
                <ColumnHeading>Open Hours:</ColumnHeading>
                <p className="mt-[20px] font-sans text-[16px] leading-[26px] text-white/85">
                  {hours.displayHeading}
                </p>
                <p className="font-sans text-[16px] leading-[26px] text-white/85">
                  {hours.display}
                </p>
              </div>
            </div>

            {/* Quick links, then the contact cells */}
            <div>
              <nav aria-label="Footer">
                <ColumnHeading>Quick Link</ColumnHeading>
                <ul className="mt-[20px] flex flex-wrap gap-x-[26px] gap-y-[10px]">
                  {navigation.quickLinks.map(item => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`font-sans text-[16px] leading-[26px] text-white/85 ${linkStyle}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <Rule className="my-[30px] md:my-[40px]" />

              <div className="grid gap-[30px] md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] md:gap-0">
                <div className="md:pr-[30px]">
                  <ColumnHeading>Contact:</ColumnHeading>
                  <a
                    href={contact.telHref}
                    className={`mt-[18px] flex items-start gap-[12px] font-sans text-[16px] leading-[26px] text-white/85 ${linkStyle}`}
                  >
                    <PhoneIcon className="mt-[5px] h-[16px] w-[16px] shrink-0 text-accent" />
                    <span className="whitespace-nowrap">{contact.phoneDisplay}</span>
                  </a>

                  <div className="mt-[30px]">
                    <ColumnHeading>E-mail:</ColumnHeading>
                    <a
                      href={`mailto:${contact.email}`}
                      className={`mt-[18px] flex items-start gap-[12px] font-sans text-[16px] leading-[26px] text-white/85 [overflow-wrap:anywhere] ${linkStyle}`}
                    >
                      <MailIcon className="mt-[5px] h-[16px] w-[16px] shrink-0 text-accent" />
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="md:border-l md:border-divider-dark md:pl-[30px]">
                  <ColumnHeading>Address:</ColumnHeading>
                  <address className="mt-[18px] flex items-start gap-[12px] font-sans text-[16px] leading-[26px] text-white/85 not-italic">
                    <MapPinIcon className="mt-[5px] h-[16px] w-[16px] shrink-0 text-accent" />
                    <span>
                      {location.addressDisplayLines.map(line => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </span>
                  </address>
                </div>
              </div>
            </div>
          </div>

          <Rule className="my-[40px]" />

          {/* ---- Copyright bar -------------------------------------------- */}
          <div className="flex flex-col gap-[16px] md:flex-row md:items-center md:justify-between">
            <div className="font-sans text-[16px] leading-[26px] text-white/85">
              <p>{copyrightLine()}</p>
              <p className="text-[14px] leading-[24px] text-white/60">
                {legal.creditPrefix}{' '}
                <a
                  href={legal.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkStyle}
                >
                  {legal.credit.label}
                </a>
              </p>
            </div>

            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center font-sans text-[16px] leading-[26px] text-white/85">
                {navigation.footer.map(item => (
                  <li
                    key={item.path}
                    className="after:mx-[14px] after:text-white/30 after:content-['/'] last:after:content-none"
                  >
                    <Link to={item.path} className={linkStyle}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
