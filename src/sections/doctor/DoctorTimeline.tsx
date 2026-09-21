import type { BandFooter, BandHeading, Tone } from '@/content/doctor'
import { Band, BandFooterBlock, BandHeadingBlock } from './DoctorBand'

/**
 * The doc's "timeline" bands — B1.3, B2.2, B2.5, B3.2 and B4.3. Built to
 * theme-reference/04-sections/13-simple-steps-to-stunning-transformations/:
 * a `sticky-column` intro on the left, and on the right a stack of
 * `how-work-step-item` rows, each a marker then a title over a paragraph.
 *
 * Its computed.json holds only the outer container, so the split is read off
 * screenshot.png: intro column ~41% of the 1280 box, a ~9% gutter, steps ~50%,
 * rows separated by the accent@10% hairline.
 *
 * Departures from the reference:
 *
 *  1. The marker is the row's date (or institution) in accent, rather than the
 *     reference's icon disc: every row the doc supplies is dated, and the date
 *     is the thing a timeline is read by. Rows with no date (B4.3) fall back to
 *     the reference's own "01." numbering.
 *  2. A vertical accent rule joins the markers, so the list reads as a
 *     sequence rather than a stack of cards.
 *  3. It is an <ol>: the rows are in order, and the order means something.
 */
export function DoctorTimeline({
  tone,
  rows,
  headingId,
  ...copy
}: BandHeading &
  BandFooter & {
    tone: Tone
    rows: readonly { when?: string; title: string; detail?: string }[]
    headingId: string
  }) {
  return (
    <Band tone={tone} headingId={headingId}>
      <div className="flex flex-col gap-[40px] lg:flex-row lg:items-start lg:gap-[9%]">
        <div className="lg:sticky lg:top-[140px] lg:w-[41%] lg:shrink-0">
          <BandHeadingBlock {...copy} headingId={headingId} tone={tone} align="left" />
        </div>

        <ol className="relative min-w-0 flex-1 border-l border-accent/25 pl-[26px] lg:pl-[36px]">
          {rows.map((row, index) => (
            <li
              // Two B2.5 rows share a date, so the title is part of the key.
              key={`${row.when ?? index}-${row.title}`}
              className="relative border-b border-divider py-[22px] first:pt-0 last:border-b-0 last:pb-0"
            >
              {/* The node on the rule, level with the marker line. Decorative. */}
              <span
                aria-hidden
                className={`absolute left-[-32px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-white lg:left-[-42px] ${
                  index === 0 ? 'top-[7px]' : 'top-[29px]'
                }`}
              />
              <p className="font-sans text-[14px] leading-[24px] font-semibold tracking-[1.4px] text-accent uppercase">
                {row.when ?? `${String(index + 1).padStart(2, '0')}.`}
              </p>
              <h3 className="mt-[4px] font-display text-[20px] leading-[28px] text-primary lg:text-[22px] lg:leading-[31px]">
                {row.title}
              </h3>
              {row.detail && (
                <p className="mt-[6px] font-sans text-[16px] leading-[26px] text-body">{row.detail}</p>
              )}
            </li>
          ))}
        </ol>
      </div>

      <BandFooterBlock after={copy.after} ctaLine={copy.ctaLine} tone={tone} />
    </Band>
  )
}
