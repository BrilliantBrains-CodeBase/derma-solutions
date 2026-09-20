import { Link } from 'react-router-dom'
import { aboutTeamSection, brand, social, team } from '@/config/site'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/components/icons'
import { CardCarousel } from '@/components/CardCarousel'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'
import { RevealWords } from '@/components/RevealWords'

/**
 * B6 — Our Team. Built to
 * theme-reference/04-sections/33-meet-the-experts-behind-your-transformation/.
 *
 * Measured off its screenshot.png (1440x909): a centred heading block (eyebrow
 * 110-133, heading 153-200 and 211-247) over four cards at x 80-377 / 408-704 /
 * 735-1032 / 1063-1359 — 4 x 297.5 on 30px gutters across the 1280 content box.
 * The heading's line box ends at ~269 and the cards start at 339, which is the
 * 70px gap below.
 *
 * `id="our-team"` is load-bearing: B2's "Meet Our Doctors" button anchors to it.
 *
 * The four cards read straight off `team` — nothing about a doctor is retyped in
 * site.ts. Same reasoning as HomeAppointment's doctor list.
 *
 * Three departures from the reference:
 *
 *  - THE PORTRAITS ARE SQUARE, not the reference's 298x354. The clinic's four
 *    files are 650x450 (landscape), 375x375, 400x400 and 366x375: a 0.84
 *    portrait crop would cut the founder's photograph badly and upscale the
 *    other three. Square is the shape the photography actually has. One-line
 *    revert to aspect-[298/354] if portrait crops are ever commissioned.
 *  - The card carries a qualification and role line the reference's image-box
 *    does not — the demo prints a name only. That is the content doc's B6, and
 *    it is why these cards run taller than the reference's 909px band.
 *  - The social row points at the CLINIC's channels, not each doctor's, per the
 *    doc's icons note. Every card therefore repeats the same three links. Their
 *    accessible names say "Derma Solutions on …" so a screen reader is not read
 *    four identical rows that appear to belong to the person above them.
 *
 * TODO(content): twelve links to three destinations is a lot of repetition for
 * what it adds. Dropping the row — leaving the card's only target as the
 * doctor's own profile page — is the obvious simplification if the client
 * agrees; the doc asks for it, so it ships.
 */

/* The band sits on white. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/** The doc's three: LinkedIn is the clinic's corporate profile and is not in the set. */
const socialLinks = [
  { name: 'Instagram', url: social.instagram, Icon: InstagramIcon },
  { name: 'Facebook', url: social.facebook, Icon: FacebookIcon },
  { name: 'YouTube', url: social.youtube, Icon: YouTubeIcon },
]

/**
 * The card's second line, composed to land on the content doc's B6 card text.
 *
 * It takes jobTitles[0] rather than `role`, because `role` is the long-form
 * string the doctor pages use — Dr Sandeep's runs to three lines in a 297px
 * card — and the doc's cards carry the short title. The founder's prefix is the
 * doc's card 1.
 *
 * The equality check is not defensive tidying: team[2].qualification is
 * "Senior Plastic Surgeon", which is a ROLE and not a degree, so without it his
 * card prints "Senior Plastic Surgeon · Senior Plastic Surgeon". Collapsing to
 * the single string is also exactly what the doc's card 3 shows.
 *
 * TODO(content): Part C asks the clinic to confirm Dr Sumedha's designation
 * (team[1].jobTitles[0] says "Consultant Dermatologist", the doc's card says
 * "Dermatologist"), and team[2].qualification should hold his actual
 * qualification once someone has it — the same string also feeds the header's
 * Doctors dropdown and his Physician schema, which currently emits no
 * hasCredential for him.
 */
function cardTitle(member: (typeof team)[number]) {
  const title = member.isFounder ? `Founder & ${member.jobTitles[0]}` : member.jobTitles[0]
  return title === member.qualification ? title : `${member.qualification} · ${title}`
}

export function AboutTeam() {
  return (
    <section
      id="our-team"
      aria-labelledby="about-team-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[820px] text-center">
        <Eyebrow className="justify-center text-accent">{aboutTeamSection.eyebrow}</Eyebrow>
        <h2
          id="about-team-heading"
          className="mt-[20px] text-balance font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
        >
          <RevealWords text={aboutTeamSection.heading} />
        </h2>
      </div>

      {/* Swipeable below lg, the measured 4-up grid from lg. See CardCarousel. */}
      <CardCarousel
        label={aboutTeamSection.heading}
        ulClassName="mt-[50px] grid gap-[30px] sm:grid-cols-2 lg:mt-[70px] lg:grid-cols-4"
        slidesClassName="[--slides:1] sm:[--slides:2] md:[--slides:3]"
      >
        {team.map(member => (
          <li key={member.id}>
            <Link to={member.path} className={`group/card block rounded-30 text-center ${focusRing}`}>
              {/*
                alt="" on purpose: the link's own text names the doctor on the
                very next line, and a description here would be announced
                immediately before it.
              */}
              <Photo src={member.photo} alt="" width={298} height={298} className="aspect-square w-full" />
              <h3 className="mt-[20px] font-display text-[22px] leading-[30px] text-primary transition-colors group-hover/card:text-accent">
                {member.displayName}
              </h3>
              <p className="mt-[6px] font-sans text-[14px] leading-[22px] text-body">
                {cardTitle(member)}
              </p>
            </Link>

            {/* Outside the Link above: an <a> inside an <a> is invalid HTML. */}
            <ul className="mt-[20px] flex justify-center gap-[15px]">
              {socialLinks.map(({ name, url, Icon }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${brand.shortName} on ${name}`}
                    className={`flex h-[39px] w-[39px] items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-90 ${focusRing}`}
                  >
                    <Icon className="h-[15px] w-[15px]" />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </CardCarousel>
    </section>
  )
}
