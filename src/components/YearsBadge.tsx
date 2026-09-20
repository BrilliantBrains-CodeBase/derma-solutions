import { useId } from 'react'
import { CloverIcon } from '@/components/icons'

/**
 * The reference's `text-path` widget — a ring of type around a circular badge,
 * with the theme's four-petal mark on an accent disc at its centre.
 *
 * Three bands render it: the homepage's About collage, and the About page's
 * intro and Our Journey collages. Extracted here on the second and third
 * callers, the way RevealWords and Photo were.
 *
 * Its captured markup carries Elementor's generic circle.svg path at r=125 in a
 * 250.5 viewBox, but Elementor then rescales that path inside the widget, so
 * reproducing the numbers verbatim throws the type outside the badge. These are
 * measured off the reference screenshot instead: the glyphs occupy a ring from
 * r=54 to r=67 inside an 80px-radius badge, which puts the baseline at r=54 and
 * makes the cap height 13px — Marcellus at ~18.5px. The path is therefore
 * authored directly in badge pixels, clockwise from the leftmost point, which is
 * where the reference's first character starts.
 *
 * textLength + lengthAdjust="spacing" makes the two repeats close the circle
 * exactly. The reference tunes the same fit with a fixed 1.74px letter-spacing,
 * which only works for the one label it was measured on — and every caller here
 * passes a different one.
 *
 * Two things the callers own, because the badge appears on both grounds:
 *
 *  - `className` carries the placement AND the colours. On a light band that is
 *    `bg-primary text-white`; on the dark Our Journey panel it inverts to
 *    `bg-white text-primary`. The ring type is `fill-current`, so it follows.
 *  - The path's id comes from useId(), not a literal. Two badges appear on the
 *    About page, and a shared DOM id would bind the second <textPath> to the
 *    first one's path.
 */
export function YearsBadge({ label, className }: { label: string; className?: string }) {
  const RADIUS = 54
  const pathId = useId()

  return (
    <div aria-hidden className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 160 160"
        focusable="false"
      >
        <path
          id={pathId}
          fill="none"
          d={`M${80 - RADIUS},80a${RADIUS},${RADIUS} 0 1 1 ${RADIUS},${RADIUS}a${RADIUS},${RADIUS} 0 0 1 -${RADIUS},-${RADIUS}`}
        />
        <text className="fill-current font-display" fontSize="18.5">
          <textPath
            href={`#${pathId}`}
            startOffset="0"
            textLength={2 * Math.PI * RADIUS}
            lengthAdjust="spacing"
          >
            {`${label} * ${label} * `}
          </textPath>
        </text>
      </svg>

      {/* The reference's about-text-path-icon.svg: a 70px accent disc, 40px mark. */}
      <span className="relative flex aspect-square w-[43.75%] items-center justify-center rounded-full bg-accent">
        <CloverIcon className="w-[57.14%] text-white" />
      </span>
    </div>
  )
}
