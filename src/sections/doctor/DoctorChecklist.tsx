import { CheckSquareIcon } from '@/components/icons'
import type { BandFooter, BandHeading, Tone } from '@/content/doctor'
import { Band, BandFooterBlock, BandHeadingBlock, cardSurface } from './DoctorBand'

/**
 * The doc's list bands — B1.7 (equipment, one long list) and B2.6
 * (achievements and publications, two lists side by side). Built to the
 * checklist in theme-reference/04-sections/21-about-me/, the "Personals info"
 * rows under the About block: `elementor-icon-list` with `fa-check-square`
 * bullets, and its `column-2` variant for two columns.
 *
 * Departures from the reference:
 *
 *  1. A single list runs in two columns from md (the reference's `column-2`),
 *     since B1.7's thirteen items in one column would run a full screen long.
 *  2. Two or more titled lists each get a card, so B2.6's two headings read as
 *     two groups rather than one list with interruptions.
 */
export function DoctorChecklist({
  tone,
  groups,
  headingId,
  ...copy
}: BandHeading &
  BandFooter & {
    tone: Tone
    groups: readonly { title?: string; items: readonly string[] }[]
    headingId: string
  }) {
  const single = groups.length === 1

  return (
    <Band tone={tone} headingId={headingId}>
      <BandHeadingBlock {...copy} headingId={headingId} tone={tone} />

      <div className={`mt-[40px] grid gap-[30px] lg:mt-[60px] ${single ? '' : 'lg:grid-cols-2'}`}>
        {groups.map(group => (
          <div
            key={group.title ?? 'items'}
            className={single ? 'mx-auto w-full max-w-[1100px]' : `rounded-30 p-[30px] lg:p-[40px] ${cardSurface(tone)}`}
          >
            {group.title && (
              <h3 className="font-display text-[24px] leading-[32px] text-primary">{group.title}</h3>
            )}
            <ul
              className={`${group.title ? 'mt-[20px]' : ''} grid gap-x-[40px] gap-y-[14px] font-sans text-[16px] leading-[26px] text-body ${
                single ? 'md:grid-cols-2' : ''
              }`}
            >
              {group.items.map(item => (
                <li key={item} className="flex items-start gap-[12px]">
                  <CheckSquareIcon className="mt-[5px] h-[16px] w-[16px] shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <BandFooterBlock after={copy.after} ctaLine={copy.ctaLine} tone={tone} />
    </Band>
  )
}
