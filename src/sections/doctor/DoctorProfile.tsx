import { Link } from 'react-router-dom'
import { brand, socialProfiles, type TeamMember } from '@/config/site'
import {
  ArrowDiagonalIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'
import { RevealWords } from '@/components/RevealWords'
import { stickySidebar, useSidebarHeight } from '@/components/stickySidebar'
import type { ProfileBlock, Tone } from '@/content/doctor'
import { Band, focusRing } from './DoctorBand'

/**
 * The Glowix doctor block. Built to theme-reference/04-sections/21-about-me/ —
 * the top band of its four our-team__dr-* pages — and the template every
 * [TEMPLATE] heading in content/doctor-page/ fills: A2–A5 on /our-doctors/ and
 * B1.1–B4.1 on each profile.
 *
 * Measured off its screenshot.png (1440x1864): photo 80–690 x 110–715, so a
 * 610-wide frame, 605 tall, radius ~30; text column from x 750, a 60px gutter;
 * eyebrow at 140, H2 "About me" 48/58 at 165; bio from 245; four label:value
 * rows 46px apart from 410, the value column starting at x 902 — 152px in; a
 * hairline at 618 and the social circles, 36px, at 660–695. The photo column is
 * 610/1300 = 46.9%.
 *
 * The reference's info rows are a <ul> of spans. These are a <dl>, the call
 * HomeMeetDermatologist makes and argues for: each row is a label and the thing
 * it labels. Label Marcellus 20/24 primary, value Sora 16/26 body, as measured.
 *
 * Departures from the reference:
 *
 *  1. THE PHOTO IS SQUARE, not the demo's 400x462 portrait (the band's 610x605
 *     frame is square anyway). The clinic's four portraits are 650x450,
 *     375x375, 400x400 and 366x375 — the same reason AboutTeam gives.
 *     TODO(assets): doc note 9 asks for matching professional portraits.
 *  2. The photo is sticky from lg, via the treatment sidebar's own helper, as
 *     in HomeMeetDermatologist: with five or six rows plus a CTA the text
 *     column runs taller than the photo.
 *  3. `imageSide` mirrors the band. The doc's A3 and A5 ask for image-right so
 *     the four stacked blocks on /our-doctors/ alternate.
 *  4. The social icons are the clinic's four (doc "Global elements"), not the
 *     demo's Pinterest/X, and are named "Derma Solutions on …" — they are the
 *     clinic's channels, not the doctor's, and a screen reader would otherwise
 *     attribute them to the person above.
 *  5. The index page's blocks close with a "View Full Profile" pill + chip,
 *     which the reference's block has no slot for.
 *  6. The reference's "Personals info", skills meters and message form below
 *     this block are not ported: the doc replaces them with its own bands.
 */

const socialIcons = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
} as const

export function DoctorProfile({
  member,
  block,
  tone,
  headingId,
  imageSide = 'left',
  cta,
  priority = false,
}: {
  member: TeamMember
  block: ProfileBlock
  tone: Tone
  headingId: string
  imageSide?: 'left' | 'right'
  cta?: { label: string; path: string }
  /** The first block on a page is the LCP candidate. */
  priority?: boolean
}) {
  const photoRef = useSidebarHeight<HTMLDivElement>()
  const ring = focusRing(tone)

  return (
    <Band tone={tone} headingId={headingId}>
      <div
        className={`flex flex-col gap-[40px] lg:items-start lg:gap-[60px] ${
          imageSide === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        <div
          ref={photoRef}
          className={`mx-auto w-full max-w-[520px] shrink-0 lg:mx-0 lg:w-[46.9%] lg:max-w-none ${stickySidebar}`}
        >
          <Photo
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            width={610}
            height={610}
            priority={priority}
            className="aspect-square w-full"
          />
        </div>

        <div className="w-full min-w-0 lg:flex-1 lg:pt-[30px]">
          <Eyebrow className="text-accent">{block.eyebrow}</Eyebrow>

          <h2
            id={headingId}
            className="mt-[10px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] xl:text-[48px] xl:leading-[58px]"
          >
            <RevealWords text={block.heading} />
          </h2>

          <p className="mt-[20px] font-sans text-[16px] leading-[26px] text-body">{block.body}</p>

          <dl className="mt-[30px] flex flex-col gap-[14px] sm:gap-[20px]">
            {block.rows.map(row => (
              // <dt>/<dd> cannot take a wrapper of their own inside <dl>
              // except a <div>, which is what keeps each pair on one grid row.
              <div key={row.label} className="sm:grid sm:grid-cols-[152px_minmax(0,1fr)] sm:gap-x-[20px]">
                <dt className="font-display text-[20px] leading-[26px] text-primary">{row.label}</dt>
                <dd className="mt-[2px] font-sans text-[16px] leading-[26px] text-body sm:mt-0">
                  {row.href ? (
                    <a
                      href={row.href}
                      className={`break-words transition-colors hover:text-accent ${ring}`}
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-[30px] border-t border-divider pt-[30px] lg:mt-[40px] lg:pt-[40px]">
            <ul className="flex flex-wrap gap-[14px]">
              {socialProfiles.map(({ name, url }) => {
                const Icon = socialIcons[name]
                return (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${brand.shortName} on ${name}`}
                      className={`flex h-[36px] w-[36px] items-center justify-center rounded-full border border-primary text-primary transition-colors hover:border-accent hover:bg-accent hover:text-white ${ring}`}
                    >
                      <Icon className="h-[14px] w-[14px]" />
                    </a>
                  </li>
                )
              })}
            </ul>

            {cta && (
              <Link
                to={cta.path}
                className={`group/cta mt-[30px] inline-flex items-center gap-[3px] rounded-pill ${ring}`}
              >
                <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
                  {cta.label}
                  {/* Four identical "View Full Profile" links need telling apart. */}
                  <span className="sr-only">: {member.name}</span>
                </span>
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
                  <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Band>
  )
}
