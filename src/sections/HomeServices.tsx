import { useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { assets, homeServices, serviceMenu } from '@/config/site'
import { treatmentImagePath, treatmentMedia } from '@/content/treatmentMedia'
import { ArrowDiagonalIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { CardCarousel } from '@/components/CardCarousel'

/**
 * Built to theme-reference/04-sections/16-explore-our-wide-range-of-aesthetic-
 * treatmen/ — the six-card Services grid the demo runs under the About band.
 * Geometry is measured off its screenshot.png (1440x1490) rather than
 * estimated: the cream band is 1400 wide inside 20px page padding, its content
 * box is 1280 (so 60px of inner padding), and the three columns land at x
 * 80-486 / 517-922 / 953-1359 — 407 wide with 30px gutters.
 *
 * Card internals are measured the same way. Padding is 40 on all four sides
 * (photo at x 120-446 in a card at 80-487). The photo is 327x218, exactly 3:2.
 * Both corner radii were fitted rather than read off, because the capture has
 * no stylesheet: the card matches r=24 and the photo r=30. Both are in the
 * homepage's captured radius set, so neither is a coincidence.
 *
 * WHAT CHANGED, and why the reference stops describing this band
 * --------------------------------------------------------------
 * The band used to render six hand-written CATEGORY cards ("Laser Treatments",
 * "Skin & Cosmetology" …) — six representative doors into thirty-eight
 * treatment pages. It now renders the thirty-eight themselves, behind the five
 * tabs the header's mega-menu already groups them under.
 *
 * That costs the reference's static 3x2 grid, and it is worth it: the
 * homepage's single biggest job is routing to the treatment pages, and it was
 * reaching six of them. Every one is now one click from the homepage, and the
 * prerendered HTML carries all thirty-eight links (see "All five panels" below).
 *
 * Nothing new is authored for it. Every field on a card already exists:
 *
 *  - the tab name and the card title come from `serviceMenu` in site.ts — the
 *    same 5 groups / 38 items the header's mega-menu renders, so the homepage
 *    and the nav can never disagree about what is in which category;
 *  - the photograph is `treatmentImagePath(slug)` and its alt is
 *    `treatmentMedia[slug].image.alt`, both already owned by the treatment
 *    pages;
 *  - the slug is the path with its slashes stripped, which is the one key the
 *    registry, the content modules, the media table and the image filenames
 *    all share.
 *
 * THE CARDS CARRY NO BLURB, and that is a decision rather than an omission.
 * Nothing in the repo holds a one-line description of a treatment: the SEO
 * registry's `description` is meta copy that ends "Book Your Appointment
 * Today!", `TreatmentContent.intro` is two 60-word paragraphs, and inventing 38
 * new sentences about medical procedures is not a layout change. Title, photo
 * and arrow is also simply the right card at this count — six cards could
 * afford a paragraph each, thirty-eight cannot.
 *
 * ALL FIVE PANELS ARE IN THE DOM, inactive ones behind `hidden`, rather than
 * rendering only the active tab. Two reasons, both of which matter more than
 * the markup saved:
 *
 *  - These pages are prerendered by vite-react-ssg. Rendering one panel would
 *    put 10 of the 38 links in the static HTML and leave the other 28 reachable
 *    only by running JS.
 *  - Every photograph is `loading="lazy"` inside a `display:none` subtree, so
 *    the 28 hidden ones cost no requests until their tab is opened.
 *
 * Five departures from the reference:
 *
 *  - The tabs, the 38 cards and the desktop carousel, above.
 *  - The whole card is one link. The reference makes only the 48px arrow
 *    clickable and leaves the title and photo inert, which is a real
 *    target-size problem for the page's main route into the treatment pages.
 *    The arrow is decorative here and not a second tab stop.
 *  - The photographs are the treatment pages' own. 25 of the 38 are 650px wide
 *    or narrower against a 654px slot — see the TODO below.
 *  - The bottom strip drops the reference's accent "Free" pill and reads "Book
 *    a Consultation". Copy doc compliance note 4 — see the TODO in site.ts.
 *  - The reference fades all six cards up under GSAP ScrollTrigger. Only the
 *    heading animates here, per word, reusing .reveal-word from the About band.
 *
 * TODO(assets): the card slot is 327x218 CSS, so it wants 654x436. 25 of the 38
 * treatment photographs are 650x388 or smaller and 6 are 512x305, which is
 * under 1x for the slot and visibly soft on a retina screen. They are cropped
 * from the sources in src/content/treatmentMedia.ts by
 * scripts/import-treatment-images.ts; re-running it against higher-resolution
 * sources is the fix, not anything in this file.
 */

/* The band is cream, so the hero's white ring would be invisible here. */
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

/** `/acne-scar-treatment-in-bangalore/` -> `acne-scar-treatment-in-bangalore`. */
const slugOf = (path: string) => path.replace(/^\/|\/$/g, '')

/** "Anti-Ageing Treatment" -> "anti-ageing-treatment", for the tab's id. */
const idOf = (group: string) => group.toLowerCase().replace(/[^a-z0-9]+/g, '-')

function ServiceCard({ label, path }: { label: string; path: string }) {
  const slug = slugOf(path)

  return (
    <Link
      to={path}
      className={`group flex w-full flex-col rounded-24 bg-white p-[30px] lg:p-[40px] ${focusRing}`}
    >
      <div className="flex items-start justify-between gap-[20px]">
        <h4 className="font-display text-[22px] leading-[31px] text-primary">{label}</h4>

        {/*
          The reference's `.elementskit-btn` — a 48px accent disc holding the
          same 15px solid arrow the hero's CTA uses. It is inside the link, so
          it is not focusable and carries no label of its own.
        */}
        <span
          aria-hidden
          className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors group-hover:bg-primary"
        >
          <ArrowDiagonalIcon className="h-[15px] w-[15px]" />
        </span>
      </div>

      {/*
        `mt-auto` is what the reference gets from ElementsKit's
        `ekit-equal-height-enable`. It matters more here than it did with six
        cards: treatment names run from one line ("Botox") to three ("Cryolipolysis
        - CoolSculpting"), and without it the photographs would sit at three
        different heights across a row.
      */}
      <div className="mt-auto pt-[30px]">
        <div className="overflow-hidden rounded-30">
          <img
            src={treatmentImagePath(slug)}
            alt={treatmentMedia[slug]?.image.alt ?? ''}
            width={327}
            height={218}
            loading="lazy"
            decoding="async"
            className="aspect-[327/218] w-full object-cover"
          />
        </div>
      </div>
    </Link>
  )
}

export function HomeServices() {
  const [activeTab, setActiveTab] = useState(0)
  /*
   * Roving tabindex: only the selected tab is in the tab order, and the arrow
   * keys move between them. Without this a keyboard user pays five tab stops
   * to reach the cards, which is the whole reason the pattern exists.
   */
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = serviceMenu.length - 1
    const next =
      event.key === 'ArrowRight'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowLeft'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null

    if (next === null) return
    event.preventDefault()
    setActiveTab(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section aria-labelledby="home-services-heading" className="px-[20px]">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-30 bg-secondary px-[24px] py-[60px] lg:px-[60px] lg:py-[100px]">
        {/*
          service-bg-shape.svg — the band's line-art, stretched rather than
          cropped. The artwork is 1800x1511 against a 1400x1489 band, so `cover`
          would scale to the height and lose 195px off each side. The reference
          keeps its motifs against both edges at once, which only holds if the
          full 1800 is squeezed into the 1400. It is decorative line-art, so the
          22% horizontal compression is invisible.
        */}
        <img
          src={assets.serviceShape}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
        />

        <div className="relative">
          <div className="mx-auto max-w-[640px] text-center">
            <Eyebrow className="justify-center text-accent">{homeServices.eyebrow}</Eyebrow>

            <h2
              id="home-services-heading"
              // text-balance evens the two lines. Without it the 640px cap
              // breaks this heading after "skin", leaving a stub second line.
              className="mt-[20px] text-balance font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            >
              {homeServices.heading.split(' ').map((word, index, words) => (
                <span
                  // Words can repeat within the heading, so the index is the identity.
                  key={`${word}-${index}`}
                  className="reveal-word"
                  // Not animation-delay: a view() timeline has no clock to delay.
                  // Each word is bound to a slightly later slice of the scroll.
                  style={{ '--i': index, display: 'inline-block', whiteSpace: 'pre' } as CSSProperties}
                >
                  {/* The trailing space belongs to the word's own string — see HomeAbout. */}
                  {index === words.length - 1 ? word : `${word} `}
                </span>
              ))}
            </h2>
          </div>

          {/*
            The tab row. It scrolls rather than wraps below lg: five labels at
            15px come to roughly 900px, so on a phone they would stack into four
            rows and push the cards below the fold. The -mx/px pair lets the row
            bleed to the band's edge while the first and last pill keep their
            inset, which is what stops a mid-scroll pill looking clipped.
          */}
          <div
            role="tablist"
            aria-label={homeServices.tablistLabel}
            className="mt-[40px] -mx-[24px] flex gap-[10px] overflow-x-auto px-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-[50px] lg:justify-center lg:overflow-visible lg:px-0"
          >
            {serviceMenu.map((group, index) => {
              const selected = index === activeTab
              return (
                <button
                  key={group.group}
                  ref={node => {
                    tabRefs.current[index] = node
                  }}
                  type="button"
                  role="tab"
                  id={`home-services-tab-${idOf(group.group)}`}
                  aria-controls={`home-services-panel-${idOf(group.group)}`}
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={event => onTabKeyDown(event, index)}
                  className={`shrink-0 rounded-pill px-[22px] py-[12px] font-sans text-[15px] leading-[22px] font-semibold transition-colors ${focusRing} ${
                    selected
                      ? 'bg-accent text-white'
                      : 'bg-white text-primary hover:bg-white/70'
                  }`}
                >
                  {group.group}
                </button>
              )
            })}
          </div>

          {serviceMenu.map((group, index) => (
            <div
              key={group.group}
              role="tabpanel"
              id={`home-services-panel-${idOf(group.group)}`}
              aria-labelledby={`home-services-tab-${idOf(group.group)}`}
              hidden={index !== activeTab}
            >
              {/*
                Carousel at every width, not just below lg: the two largest tabs
                hold ten cards, which is four desktop rows of the reference's
                3-up grid. `ulClassName` keeps gap-[30px] — the slide-width calc
                assumes it — and carries no grid-cols, which `flex` would make
                inert anyway. See `alwaysCarousel` in CardCarousel.
              */}
              <CardCarousel
                label={group.group}
                alwaysCarousel
                ulClassName="mt-[40px] flex gap-[30px] lg:mt-[50px]"
                slidesClassName="[--slides:1] sm:[--slides:2] lg:[--slides:3]"
              >
                {/*
                  Only items with treatment media: serviceMenu also lists the
                  content-template pages (e.g. Laser Tattoo Removal), which have
                  no photograph to put on a card.
                */}
                {group.items.filter(item => treatmentMedia[slugOf(item.path)]).map(item => (
                  // The <li> stretches to the track's height and the card fills
                  // it, which is what gives `mt-auto` on the photo a box to push
                  // against — so the photos stay aligned across a row.
                  <li key={item.path} className="flex">
                    <ServiceCard label={item.label} path={item.path} />
                  </li>
                ))}
              </CardCarousel>
            </div>
          ))}

          <p className="mt-[50px] text-center font-sans text-[16px] leading-[26px] text-body lg:mt-[60px]">
            {homeServices.cta.text}{' '}
            <Link
              to={homeServices.cta.href}
              className={`rounded-[4px] font-bold text-primary underline underline-offset-4 transition-colors hover:text-accent ${focusRing}`}
            >
              {homeServices.cta.label}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
