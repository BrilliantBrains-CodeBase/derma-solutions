import { Link } from 'react-router-dom'
import { ArrowUpRightIcon, CheckSquareIcon } from '@/components/icons'
import { CardCarousel } from '@/components/CardCarousel'
import type { BandFooter, BandHeading, LinkedItem, Tone } from '@/content/doctor'
import { Band, BandFooterBlock, BandHeadingBlock, cardSurface, focusRing } from './DoctorBand'

/**
 * The doc's card bands — B1.4 and B1.5 ("3 cards", the second "with links"),
 * B2.3 (2 cards), B3.3 (8 cards) and B4.6 (3 membership badges). Built to the
 * card rows of theme-reference/04-sections/16-explore-our-wide-range-of-
 * aesthetic-treatmen/ and 41-botox-and-dermal-fillers/: a centred heading
 * block, then rounded-30 cards on 30px gutters in the 1280 box, title in
 * Marcellus over body copy.
 *
 * Swipeable below lg, the grid from lg — CardCarousel, as HomeServices and
 * AboutTeam use it.
 *
 * Departures from the reference:
 *
 *  1. No photograph on the cards. The reference's service cards lead with a
 *     treatment image; the doc's cards are condition and credential lists, and
 *     there are no photographs to put on them.
 *  2. A list card's items take the CheckSquareIcon bullet the reference uses in
 *     21-about-me's checklist. Linked items (B1.5) take an arrow instead and go
 *     to the treatment page, as the doc asks.
 *  3. The card fill flips with the ground — cream on white, white on cream — so
 *     a card never vanishes into the panel behind it.
 */

const gridCols = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
} as const

/* Literal strings: Tailwind cannot see a class assembled from a prop. */
const slidesFor = {
  2: '[--slides:1] md:[--slides:2]',
  3: '[--slides:1] sm:[--slides:2]',
  4: '[--slides:1] sm:[--slides:2] md:[--slides:3]',
} as const

function Item({ item, tone }: { item: LinkedItem; tone: Tone }) {
  if (item.path) {
    return (
      <Link
        to={item.path}
        className={`group/item flex items-start gap-[10px] rounded-[4px] text-primary transition-colors hover:text-accent ${focusRing(tone)}`}
      >
        <ArrowUpRightIcon className="mt-[5px] h-[14px] w-[14px] shrink-0 text-accent" />
        <span className="underline decoration-accent/30 underline-offset-4 group-hover/item:decoration-accent">
          {item.label}
        </span>
      </Link>
    )
  }
  return (
    <span className="flex items-start gap-[10px]">
      <CheckSquareIcon className="mt-[4px] h-[16px] w-[16px] shrink-0 text-accent" />
      {item.label}
    </span>
  )
}

export function DoctorCards({
  tone,
  columns,
  cards,
  headingId,
  ...copy
}: BandHeading &
  BandFooter & {
    tone: Tone
    columns: 2 | 3 | 4
    cards: readonly { title: string; subtitle?: string; body?: string; items?: readonly LinkedItem[] }[]
    headingId: string
  }) {
  return (
    <Band tone={tone} headingId={headingId}>
      <BandHeadingBlock {...copy} headingId={headingId} tone={tone} />

      <CardCarousel
        label={copy.heading}
        ulClassName={`mt-[40px] grid gap-[30px] lg:mt-[60px] ${gridCols[columns]}`}
        slidesClassName={slidesFor[columns]}
      >
        {cards.map(card => (
          <li key={card.title} className="flex">
            <div className={`flex w-full flex-col rounded-30 p-[30px] lg:p-[36px] ${cardSurface(tone)}`}>
              <h3 className="font-display text-[22px] leading-[30px] text-primary lg:text-[24px] lg:leading-[32px]">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="mt-[6px] font-sans text-[15px] leading-[24px] font-medium text-accent">
                  {card.subtitle}
                </p>
              )}
              {card.body && (
                <p className="mt-[12px] font-sans text-[16px] leading-[26px] text-body">{card.body}</p>
              )}
              {card.items && (
                <ul className="mt-[20px] flex flex-col gap-[12px] border-t border-divider pt-[20px] font-sans text-[16px] leading-[26px] text-body">
                  {card.items.map(item => (
                    <li key={item.label}>
                      <Item item={item} tone={tone} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </CardCarousel>

      <BandFooterBlock after={copy.after} ctaLine={copy.ctaLine} tone={tone} />
    </Band>
  )
}
