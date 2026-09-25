import { useState } from 'react'
import { mediaFilters, mediaGroup, mediaItems, type MediaGroup } from '@/content/media'
import { MediaCard } from '@/sections/media/MediaCard'

/**
 * The press coverage index: filter chips over the blog index's grid rhythm
 * (see src/sections/blog/BlogGrid.tsx — same 1300 container, same 30px gutters,
 * three columns from lg).
 *
 * Filtering hides rather than fetches: every placement is in the prerendered
 * HTML, so a crawler and a reader with no JavaScript both get the whole list,
 * and the chips are an affordance on top of it.
 *
 * Cards are ordered newest first by date, not by the order of the data file —
 * see src/content/media.ts.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

/**
 * Coverage that carries a scan leads the grid, then everything else, each half
 * newest first.
 *
 * The scans are the only pictures on this page, and a card holding one is worth
 * more at the top of a list of 18 than its date is: it shows at a glance that
 * this is real print coverage. Filtering keeps the same order, so the print
 * cards stay first within whichever chip is on.
 */
const sorted = [...mediaItems].sort(
  (a, b) => Number(Boolean(b.snapshot)) - Number(Boolean(a.snapshot)) || b.date.localeCompare(a.date),
)

export function MediaGrid() {
  const [active, setActive] = useState<MediaGroup | 'all'>('all')
  const shown = active === 'all' ? sorted : sorted.filter(item => mediaGroup(item) === active)

  const count = (id: MediaGroup | 'all') =>
    id === 'all' ? sorted.length : sorted.filter(item => mediaGroup(item) === id).length

  return (
    <section
      aria-label="Press coverage"
      className="mx-auto max-w-[1300px] px-[20px] py-[50px] lg:px-[10px] lg:py-[80px]"
    >
      {/*
        Buttons rather than links: this filters a list in place and mints no URL
        of its own. aria-pressed is what tells a screen reader which is on.
      */}
      <div className="flex flex-wrap gap-[10px]">
        {mediaFilters.map(filter => {
          const on = filter.id === active
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(filter.id)}
              className={`inline-flex items-center gap-[8px] rounded-pill px-[20px] py-[12px] font-sans text-[15px] leading-[18px] font-medium transition-colors ${focusRing} ${
                on ? 'bg-accent text-white' : 'bg-secondary text-primary hover:bg-accent/15'
              }`}
            >
              {filter.label}
              <span className={on ? 'text-white/80' : 'text-body'}>{count(filter.id)}</span>
            </button>
          )
        })}
      </div>

      {/*
        items-start, not the grid's default stretch: a row holding a print card
        is as tall as its scan, and stretching the text-only cards beside it to
        match leaves them mostly empty. Each card is its own height.
      */}
      <ul className="mt-[40px] grid items-start gap-[30px] sm:grid-cols-2 lg:mt-[50px] lg:grid-cols-3">
        {shown.map(item => (
          <li key={item.id}>
            <MediaCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
