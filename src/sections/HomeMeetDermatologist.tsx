import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { assets, homeMeetDermatologist } from '@/config/site'
import { ArrowDiagonalIcon, CheckSquareIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'
import { stickySidebar, useSidebarHeight } from '@/components/stickySidebar'

/**
 * Replaces HomeWhatWeDo, on the 2026-09 revision round's instruction: "Change
 * this section from what we do to Meet the Dermatologist."
 *
 * The band it replaces was built to theme-reference/04-sections/12-transforming-
 * beauty-confidence/ and ran three columns — cut-out figure, text, second photo
 * with a counting badge overhanging it. None of that survives the new copy. The
 * doc puts five credential rows and a lead paragraph in here, which is roughly
 * three times the old band's word count, and a 396px text column between two
 * photographs cannot hold it. So this is two columns — portrait left, text
 * right.
 *
 * What is carried over unchanged, so the band still belongs to the page: the
 * Eyebrow, the per-word heading reveal, the CheckSquareIcon bullet, the pill +
 * detached arrow chip CTA, and the 1300 container with its 60/100 vertical
 * rhythm.
 *
 * Three things worth recording:
 *
 *  - THE CREDENTIALS ARE A <dl>. Each row is a label ("Qualification") and the
 *    thing it labels, which is a description list and nothing else. Writing
 *    them as a <ul> of "✓ Qualification / MBBS – ..." — the shape the copy doc
 *    draws — would render identically and throw the relationship away. The ✓ is
 *    decoration on the <dt> and is aria-hidden.
 *
 *  - The portrait is a framed Photo, not the arch cut-out the old band used.
 *    public/images/decor/what-we-do-1.png is still in the repo and is still the
 *    only background-removed cut-out of Dr Sandeep the project has; the arch
 *    composition it stood on was the stronger of the two. It is not used here
 *    because the client supplied 13 new photographs for this band specifically,
 *    and using none of them would be a decision taken on their behalf. Swapping
 *    back is this component's left column and nothing else — see the note on
 *    assets.whatWeDoImage1.
 *
 *  - THE PORTRAIT IS STICKY FROM lg, reusing the treatment and blog sidebars'
 *    own `stickySidebar` + `useSidebarHeight` rather than a plain `top`. The
 *    credentials column is the taller of the two by roughly 200px, so without
 *    it the portrait scrolls away a third of the way down a list that is about
 *    the man in it. The helper's min() is what keeps it correct on a short
 *    window: the portrait renders ~575px tall at this column width, so on a
 *    600px viewport a fixed 140px top would push its own foot off-screen.
 *
 *    It needs `lg:items-start` on the row above. Under the default
 *    `items-stretch` the column would stretch to the row's full height and
 *    sticky would have nothing left to travel through.
 *
 * The band used to close with a row of three counters — 50,000+ laser
 * treatments, 10,000+ transplants, 40,000+ peels, the copy doc's own figures,
 * tweened through useCountUp. Removed on the client's instruction after review.
 * See the note where they sat in site.ts for what that resolves; the page's
 * remaining volume claims are all in homeSeeTheDifference.
 */

/* The band sits on white, so the hero's white ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

export function HomeMeetDermatologist() {
  /* Keeps --sidebar-h on the portrait column in step with its rendered height,
   * which is what stickySidebar's min() reads. */
  const portraitRef = useSidebarHeight<HTMLDivElement>()

  return (
    <section
      aria-labelledby="home-meet-dermatologist-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] xl:px-[10px] xl:py-[100px]"
    >
      <div className="flex flex-col gap-[50px] lg:flex-row lg:items-start lg:gap-[60px]">
        {/*
          Portrait. 1024x1280 is 4:5 and the slot is 4:5, so nothing is cropped
          — see the entry in scripts/import-home-images.ts.

          Sticky from lg so it holds beside the credentials rather than
          scrolling away from them. See the header comment.
        */}
        <div
          ref={portraitRef}
          className={`mx-auto w-full max-w-[420px] shrink-0 lg:mx-0 lg:w-[36%] lg:max-w-none ${stickySidebar}`}
        >
          <Photo
            src={assets.meetDermatologistImage}
            alt={assets.meetDermatologistImageAlt}
            width={376}
            height={470}
            className="aspect-[4/5] w-full rounded-30"
          />
        </div>

        {/* Text column. */}
        <div className="w-full min-w-0 lg:flex-1">
          <Eyebrow className="text-accent">{homeMeetDermatologist.eyebrow}</Eyebrow>

          <h2
            id="home-meet-dermatologist-heading"
            className="mt-[20px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] xl:text-[48px] xl:leading-[58px]"
          >
            {homeMeetDermatologist.heading.split(' ').map((word, index, words) => (
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
            His specialisms, not a section of the page — a <p> on the heading
            colour, the same call HomeWhyChooseUs makes for its statement line
            and for the same reason: as an <h3> it would put a heading in the
            outline that owns none of the content under it.
          */}
          <p className="mt-[10px] font-display text-[20px] leading-[29px] text-accent lg:text-[22px] lg:leading-[31px]">
            {homeMeetDermatologist.subheading}
          </p>

          <p className="mt-[22px] font-sans text-[16px] leading-[26px] text-body">
            {homeMeetDermatologist.body}
          </p>

          <dl className="mt-[38px] flex flex-col gap-[20px]">
            {homeMeetDermatologist.credentials.map(credential => (
              // The pair has to stay together, and <dt>/<dd> cannot take a
              // wrapper of their own inside <dl>, so the flex runs on each in
              // turn and the gap between pairs is the list's.
              <div key={credential.label}>
                <dt className="flex items-center gap-[12px] font-sans text-[16px] leading-[24px] font-semibold text-primary">
                  {/* Every icon in icons.tsx is aria-hidden at the source. */}
                  <CheckSquareIcon className="h-[17px] w-[17px] shrink-0 text-accent" />
                  {credential.label}
                </dt>
                <dd className="mt-[4px] pl-[29px] font-sans text-[15px] leading-[24px] text-body">
                  {credential.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* The same pill and detached chip the About band's CTA uses. */}
          <Link
            to={homeMeetDermatologist.cta.path}
            className={`group/cta mt-[38px] inline-flex items-center gap-[3px] rounded-pill ${focusRing}`}
          >
            <span className="flex h-[50px] items-center rounded-pill bg-accent px-[30px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity group-hover/cta:opacity-90">
              {homeMeetDermatologist.cta.label}
            </span>
            <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-accent">
              <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
