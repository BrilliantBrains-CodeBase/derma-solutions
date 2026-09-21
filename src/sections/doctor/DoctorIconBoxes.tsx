import { Link } from 'react-router-dom'
import {
  ArrowUpRightIcon,
  FourCirclesIcon,
  HeadsetIcon,
  LaserIcon,
  LayersIcon,
  PersonCircleIcon,
  VennIcon,
} from '@/components/icons'
import type { BandFooter, BandHeading, LinkedItem, Tone } from '@/content/doctor'
import { Band, BandFooterBlock, BandHeadingBlock, cardSurface, focusRing } from './DoctorBand'

/**
 * The doc's "icon boxes" — A6 on /our-doctors/, and B2.4, B3.4 and B4.4. Built
 * to the ElementsKit infobox the reference uses in
 * theme-reference/04-sections/06-experience-the-art-of-beauty-with-expert-han/
 * and 13-simple-steps-…/: `.elementskit-infobox` → a 60px icon disc, then
 * `h3.elementskit-info-box-title` over a paragraph.
 *
 * Departures from the reference:
 *
 *  1. The icons are the site's own set from icons.tsx, cycled in order. The
 *     doc names no icon per box, and the reference's are vendor SVGs tagged
 *     reference-only in 06-assets/manifest.json. They are decorative; the
 *     title carries the meaning.
 *  2. Boxes sit on a card fill, as in AboutApproach, so four-to-seven boxes
 *     read as a set on either ground.
 *  3. B3.4's boxes link to the matching treatment pages where one exists, per
 *     the doc — a row of arrow links under the text.
 */

const icons = [LayersIcon, VennIcon, FourCirclesIcon, PersonCircleIcon, LaserIcon, HeadsetIcon]

export function DoctorIconBoxes({
  tone,
  items,
  headingId,
  ...copy
}: BandHeading &
  BandFooter & {
    tone: Tone
    items: readonly { title: string; text: string; links?: readonly LinkedItem[] }[]
    headingId: string
  }) {
  // Four boxes read best as one row of four; five or more as rows of three,
  // with a lone last box (B3.4 has seven) centred under the row above.
  const cols =
    items.length === 4
      ? 'md:grid-cols-2 xl:grid-cols-4'
      : 'md:grid-cols-2 lg:grid-cols-3 lg:[&>li:last-child:nth-child(3n+1)]:col-start-2'

  return (
    <Band tone={tone} headingId={headingId}>
      <BandHeadingBlock {...copy} headingId={headingId} tone={tone} />

      <ul className={`mt-[40px] grid gap-[30px] lg:mt-[60px] ${cols}`}>
        {items.map((item, index) => {
          const Icon = icons[index % icons.length]
          return (
            <li key={item.title} className={`rounded-30 p-[30px] lg:p-[36px] ${cardSurface(tone)}`}>
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary text-white">
                <Icon className="h-[30px] w-[30px]" />
              </span>
              <h3 className="mt-[24px] font-display text-[22px] leading-[30px] text-primary">{item.title}</h3>
              <p className="mt-[10px] font-sans text-[16px] leading-[26px] text-body">{item.text}</p>
              {item.links && (
                <ul className="mt-[16px] flex flex-wrap gap-x-[20px] gap-y-[8px]">
                  {item.links.map(link => (
                    <li key={link.label}>
                      <Link
                        to={link.path ?? '/'}
                        className={`inline-flex items-center gap-[6px] rounded-[4px] font-sans text-[15px] leading-[24px] font-semibold text-accent transition-colors hover:text-primary ${focusRing(tone)}`}
                      >
                        {link.label}
                        <ArrowUpRightIcon className="h-[13px] w-[13px]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>

      <BandFooterBlock after={copy.after} ctaLine={copy.ctaLine} tone={tone} />
    </Band>
  )
}
