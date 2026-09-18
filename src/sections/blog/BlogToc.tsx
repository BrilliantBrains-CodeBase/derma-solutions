import { useEffect, useRef, useState } from 'react'
import type { BlogTocEntry } from '@/content/blog'
import { ChevronDownIcon } from '@/components/icons'

/**
 * The live posts' "Table Of Contents" — tocbot, rendered by the WordPress theme
 * from the post's H2s. Not in the Glowix reference, which has no TOC.
 *
 * The anchors are the live site's own (`what-is-a-salon-facial-1`), so links
 * to a section of a post keep landing on it. See extract-blog-content.ts.
 *
 * Two presentations of one list:
 *
 *  - BlogToc, a native <details> above the article on a phone, where there is
 *    no room for a sidebar. It works before hydration and with JavaScript off,
 *    and ships closed: a 30-entry list would otherwise push the article a
 *    screen down.
 *  - BlogTocPanel, the sidebar card from lg, which follows the reading position.
 *
 * Only one of the two is ever displayed, so a screen reader meets one list.
 */

const rowLink =
  'transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function Rows({ entries, activeId }: { entries: readonly BlogTocEntry[]; activeId?: string | null }) {
  return (
    <ol className="grid gap-[10px] font-sans text-[15px] leading-[22px] md:text-[16px] md:leading-[24px]">
      {entries.map((entry, index) => {
        const active = entry.id === activeId
        return (
          <li key={entry.id} className="flex gap-[12px]">
            <span
              aria-hidden
              className={`w-[24px] shrink-0 font-semibold tabular-nums ${active ? 'text-accent' : 'text-accent/70'}`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <a
              href={`#${entry.id}`}
              // The panel's own scroll box reads this to keep the row in view.
              data-toc-id={entry.id}
              aria-current={active ? 'true' : undefined}
              className={`${rowLink} ${active ? 'font-medium text-accent' : 'text-body'}`}
            >
              {entry.text}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

/** The phone's collapsible list, above the article. Hidden from lg. */
export function BlogToc({ entries }: { entries: readonly BlogTocEntry[] }) {
  return (
    <details className="group/toc rounded-24 bg-secondary px-[24px] py-[20px] md:px-[30px] lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-[20px] font-display text-[22px] leading-[31px] text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
        Table of Contents
        <span
          aria-hidden
          className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform group-open/toc:rotate-180"
        >
          <ChevronDownIcon className="h-[12px] w-[12px]" />
        </span>
      </summary>

      <nav aria-label="Table of contents" className="mt-[16px] border-t border-divider pt-[20px]">
        <Rows entries={entries} />
      </nav>
    </details>
  )
}

/**
 * The sidebar card: a brown title bar over the cream list, the same anatomy as
 * the treatment sidebar's services card.
 *
 * The list scrolls inside its own box. Some posts have 33 headings, which would
 * otherwise make the sidebar taller than any viewport and push the cards below
 * it out of reach.
 *
 * The section being read is marked in accent with aria-current. An
 * IntersectionObserver watches every heading and the last one to cross the line
 * below the sticky header wins; the observer only reports what has changed, so
 * the set of headings currently above the line is tracked as they cross. State
 * starts null, which is what the prerender emits, so hydration agrees with it.
 */
export function BlogTocPanel({ entries }: { entries: readonly BlogTocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headings = entries
      .map(entry => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null)
    if (!headings.length) return

    let frame = 0
    const read = () => {
      frame = 0
      // The last heading whose top has passed the line just below the sticky
      // header is the section being read.
      let current: HTMLElement | null = null
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 160) current = heading
        else break
      }
      setActiveId(current?.id ?? null)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    // Measured rather than observed: an IntersectionObserver reports only what
    // changed state, so a heading a fast scroll or an anchor jump carries clean
    // over the band never reports at all, and the highlight sticks or vanishes.
    read()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [entries])

  // Scrolls the box, never the page — scrollIntoView would move both.
  useEffect(() => {
    const box = listRef.current
    if (!box || !activeId) return
    const row = box.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(activeId)}"]`)
    if (!row) return
    const top = row.offsetTop - box.offsetTop
    if (top < box.scrollTop) box.scrollTop = top - 12
    else if (top + row.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTop = top + row.offsetHeight - box.clientHeight + 12
    }
  }, [activeId])

  return (
    // Sticky 140px under the header — see BlogSidebar for why this card alone.
    <nav
      aria-labelledby="blog-toc-heading"
      className="hidden overflow-hidden rounded-card lg:sticky lg:top-[140px] lg:block"
    >
      <h2
        id="blog-toc-heading"
        className="bg-primary px-[30px] py-[20px] font-display text-[20px] leading-[26px] text-white uppercase"
      >
        Contents
      </h2>
      <div
        ref={listRef}
        // Caps a 33-entry list at the screen: 140px of header above, the card's
        // own title bar, and 30px of air below.
        className="max-h-[calc(100vh-240px)] overflow-y-auto overscroll-contain bg-secondary px-[30px] py-[24px]"
      >
        <Rows entries={entries} activeId={activeId} />
      </div>
    </nav>
  )
}
