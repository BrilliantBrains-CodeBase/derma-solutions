import { useCountUp } from '@/hooks/useCountUp'
import type { Tone } from '@/content/doctor'
import { Band } from './DoctorBand'

/**
 * B1.2 — Treatment Milestones, the doc's "counter strip". Built to the counter
 * treatment in theme-reference/04-sections/12-transforming-beauty-confidence/
 * (Elementor `counter`, data-duration 2000 from 0, "+" suffix) and
 * 14-our-real-patient-transformation-…/ (ElementsKit funfact row), tweened by
 * the site's own useCountUp, which prerenders the target and only animates
 * client-side.
 *
 * Departures from the reference:
 *
 *  1. Six tiles in one row from xl, three from md, two below — the reference
 *     row holds four. The doc has six figures and none is to be dropped. At
 *     six-up a tile is ~183px wide, and "50,000+" at the reference's 48px
 *     is wider than that, so the figures step down to 40px there — and to 30px
 *     in the two-up phone grid, for the same reason.
 *  2. The doc gives the strip no heading. The band still needs a name for its
 *     landmark, so the H2 is visually hidden rather than invented on screen.
 *  3. No icon per tile: the reference's funfact icons are vendor artwork.
 *
 * TODO(content): doc note 4 — see the note on the band's data.
 */

const format = new Intl.NumberFormat('en-IN')

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: shown, ref } = useCountUp(value, 2000)
  return (
    <li className="text-center">
      <p className="font-display text-[30px] leading-[38px] text-primary md:text-[48px] md:leading-[58px] xl:text-[40px] xl:leading-[48px]">
        {/* The tween is decoration: the accessible text is the real figure. */}
        <span ref={ref} aria-hidden>
          {format.format(shown)}
          {suffix}
        </span>
        <span className="sr-only">
          {format.format(value)}
          {suffix}
        </span>
      </p>
      <p className="mt-[6px] font-sans text-[16px] leading-[24px] text-body">{label}</p>
    </li>
  )
}

export function DoctorCounters({
  tone,
  heading,
  items,
  headingId,
}: {
  tone: Tone
  heading: string
  items: readonly { value: number; suffix: string; label: string }[]
  headingId: string
}) {
  return (
    <Band tone={tone} headingId={headingId}>
      <h2 id={headingId} className="sr-only">
        {heading}
      </h2>
      <ul className="grid grid-cols-2 gap-x-[20px] gap-y-[40px] md:grid-cols-3 xl:grid-cols-6 xl:gap-x-[30px]">
        {items.map(item => (
          <Counter key={item.label} {...item} />
        ))}
      </ul>
    </Band>
  )
}
