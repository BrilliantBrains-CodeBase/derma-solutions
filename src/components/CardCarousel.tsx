import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * The mobile and tablet carousel the homepage's card bands share.
 *
 * Every card band on this page is a grid that collapses to one column below its
 * breakpoint, which put eighteen full-height blocks between the hero and the
 * footer on a phone. This turns each of those rows into a horizontally
 * swipeable track below lg, and hands the row straight back to the section's
 * own grid at lg — the desktop layouts are pixel-fitted against
 * theme-reference/ screenshots and nothing here may move them.
 *
 * It is CSS scroll-snap rather than a library. HomeTestimonials and
 * HomeCaseStudies both carry comments explaining that their reference Swipers
 * were skipped so that no dependency was added; installing one now to solve a
 * layout-length problem would reverse that for no gain. Snap does the
 * swiping, the momentum and the snapping natively. JS is here only for the
 * dots and the autoplay.
 *
 * The resting state is SSG-correct for free, which is the constraint
 * useCountUp documents: these pages are prerendered and then hydrated, so the
 * static HTML has to be right with no JS at all. It is — every card is in the
 * markup, and scrollLeft 0 is the first slide. The dots are the only thing JS
 * adds, and they are withheld until measured rather than guessed at, so there
 * is no hydration mismatch and nothing flashes.
 *
 * The contract with a calling section is two class strings and no markup
 * change:
 *
 *  - `ulClassName` is the section's existing <ul> className, verbatim. It stays
 *    the source of truth for the desktop grid; everything this component adds
 *    is behind `max-lg:` and disappears at 1024, which is Header's own
 *    mobile-only idiom.
 *  - `slidesClassName` sets `--slides`, the number of cards in view, per
 *    breakpoint — e.g. `[--slides:1] sm:[--slides:2]`. It has to arrive as a
 *    literal class string because Tailwind extracts classes statically and
 *    cannot see a value assembled from a prop.
 *
 * `--slides` is what lets one component serve five sections with different
 * per-view counts off a single width calc, and the <li> elements each section
 * already renders are sized from the track by `[&>li]:` rather than being
 * touched at all.
 */

const AUTOPLAY_MS = 5000

/* The band under lg. 1023.98 rather than 1023 so it meets Tailwind's own
 * `max-lg` boundary exactly at fractional device widths. */
const MOBILE_QUERY = '(max-width: 1023.98px)'

const trackClasses = [
  /*
   * `max-lg:flex` has to beat the `grid` inside ulClassName. Tailwind v4 emits
   * variant utilities after bare ones in the same layer, so it does.
   */
  'max-lg:flex',
  'max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:scroll-smooth',
  /* The scrollbar is replaced by the dots; a visible one on a touch band reads
   * as an accident. */
  'max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden',
  /*
   * The cards' focus rings sit 6px outside their box
   * (outline-offset-4 + a 2px outline) and a scroll container clips them.
   * Vertical only, so the width calc below is untouched, and pulled back with
   * a matching negative margin so no band's rhythm shifts.
   */
  'max-lg:py-[8px] max-lg:-my-[8px]',
  'max-lg:[&>li]:flex-none max-lg:[&>li]:snap-start',
  /*
   * The slide width, and the one line here that has to be written out rather
   * than assembled. Tailwind extracts classes by scanning source text, so a
   * template literal would put `${PEEK}` in the stylesheet and nothing at all
   * in the browser — which is exactly what happened the first time. The
   * underscores are Tailwind's escape for the spaces calc() requires around
   * its operators.
   *
   * 40px is the peek: how much of the next card shows past the right edge. It
   * is the whole affordance on a phone, because without it a 1-up track looks
   * identical to the stacked column it replaced. 30px is the gap every one of
   * these bands already sets between its cards.
   */
  'max-lg:[&>li]:w-[calc((100%_-_40px_-_(var(--slides)_-_1)_*_30px)_/_var(--slides))]',
].join(' ')

export function CardCarousel({
  label,
  ulClassName,
  slidesClassName,
  className = '',
  tone = 'light',
  children,
}: {
  /** Names the track for a screen reader, e.g. "Our services". */
  label: string
  /** The section's existing <ul> className, verbatim. */
  ulClassName: string
  /** Literal Tailwind classes setting `--slides` per breakpoint. */
  slidesClassName: string
  /**
   * Classes for the wrapper this component puts around the <ul>. The wrapper is
   * a plain block and transparent in normal flow, but where the <ul> was itself
   * a flex or grid child its sizing has to move out here — HomeCaseStudies'
   * `lg:w-[65.391%]` column being the case that forced this prop.
   */
  className?: string
  /** `dark` for the bg-primary Testimonials band, where accent dots vanish. */
  tone?: 'light' | 'dark'
  children: ReactNode
}) {
  const trackRef = useRef<HTMLUListElement>(null)
  /* 0 until measured. The dots render only once this is above 1, so the
   * prerendered HTML carries the cards and no dot row. */
  const [pages, setPages] = useState(0)
  const [active, setActive] = useState(0)
  /*
   * The autoplay effect publishes its own stop here so a dot click can reach
   * it. A dot click is an interaction like any swipe, but it lands on the
   * button and never reaches the track's own pointerdown listener, so without
   * this the carousel carried on moving under someone who had just told it
   * where to go.
   */
  const haltAutoplayRef = useRef<() => void>(() => {})

  /*
   * Everything is measured off the DOM rather than derived from `--slides`,
   * because one implementation then stays correct at every per-view count and
   * at any width. `step` is a slide plus its gap; `pages` is the number of
   * snap stops the track can actually rest at, which is items - perView + 1.
   * One dot per card would leave trailing dots that all clamp to the same
   * scroll position and look broken.
   */
  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return null

    const slides = Array.from(track.children) as HTMLElement[]
    if (slides.length < 2) return null

    const step = slides[1].offsetLeft - slides[0].offsetLeft
    if (step <= 0) return null

    const perView = Math.max(1, Math.round(track.clientWidth / step))
    return { slides, step, pages: Math.max(1, slides.length - perView + 1) }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0

    const sync = () => {
      const measured = measure()
      if (!measured) {
        setPages(0)
        return
      }
      setPages(measured.pages)
      setActive(
        Math.min(Math.max(Math.round(track.scrollLeft / measured.step), 0), measured.pages - 1),
      )
    }

    /* The scroll event fires per frame on a touch drag; coalesce it. */
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        sync()
      })
    }

    sync()
    track.addEventListener('scroll', onScroll, { passive: true })

    /* Catches orientation changes and the lg boundary, where the track becomes
     * a grid and `measure` stops returning a usable step. */
    const observer = new ResizeObserver(sync)
    observer.observe(track)

    return () => {
      track.removeEventListener('scroll', onScroll)
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [measure])

  const scrollToPage = useCallback(
    (index: number) => {
      const track = trackRef.current
      const measured = measure()
      if (!track || !measured) return
      haltAutoplayRef.current()
      track.scrollTo({ left: measured.step * index, behavior: 'smooth' })
    },
    [measure],
  )

  /*
   * Autoplay. Reduced motion is honoured by never starting it: the global
   * duration-collapse rule in index.css cannot reach a JS timer, which is the
   * same call useCountUp makes about its tween.
   */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mobile = window.matchMedia(MOBILE_QUERY)
    let timer: ReturnType<typeof setInterval> | undefined
    /* Set by a real interaction and never cleared — once someone has taken hold
     * of the track, moving it under them again is hostile. */
    let stopped = false
    let visible = false

    const advance = () => {
      const measured = measure()
      if (!measured) return
      const next = Math.round(track.scrollLeft / measured.step) + 1
      track.scrollTo({
        left: next >= measured.pages ? 0 : measured.step * next,
        behavior: 'smooth',
      })
    }

    const stop = () => {
      clearInterval(timer)
      timer = undefined
    }

    /* Runs only while the band is on screen, the tab is focused, the viewport
     * is still under lg, and nobody has touched it. */
    const update = () => {
      const shouldRun = !stopped && visible && mobile.matches && !document.hidden
      if (shouldRun && !timer) timer = setInterval(advance, AUTOPLAY_MS)
      else if (!shouldRun && timer) stop()
    }

    const halt = () => {
      stopped = true
      update()
    }
    haltAutoplayRef.current = halt

    /*
     * The scroll event is deliberately not one of these: autoplay's own
     * scrolling fires it, so listening for it would stop the autoplay on its
     * first tick.
     */
    track.addEventListener('pointerdown', halt)
    track.addEventListener('touchstart', halt, { passive: true })
    track.addEventListener('wheel', halt, { passive: true })
    track.addEventListener('keydown', halt)
    document.addEventListener('visibilitychange', update)
    mobile.addEventListener('change', update)

    const observer = new IntersectionObserver(
      entries => {
        visible = entries[0].isIntersecting
        update()
      },
      { threshold: 0.3 },
    )
    observer.observe(track)

    return () => {
      stop()
      haltAutoplayRef.current = () => {}
      track.removeEventListener('pointerdown', halt)
      track.removeEventListener('touchstart', halt)
      track.removeEventListener('wheel', halt)
      track.removeEventListener('keydown', halt)
      document.removeEventListener('visibilitychange', update)
      mobile.removeEventListener('change', update)
      observer.disconnect()
    }
  }, [measure])

  const focusRing =
    tone === 'dark'
      ? 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
      : 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

  return (
    <div className={className}>
      <ul
        ref={trackRef}
        aria-label={label}
        className={`${ulClassName} ${trackClasses} ${slidesClassName}`}
      >
        {children}
      </ul>

      {pages > 1 && (
        <div
          className="mt-[24px] flex items-center justify-center gap-[10px] lg:hidden"
          role="group"
          aria-label={`${label} pagination`}
        >
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              /*
                The dot is the control, but a 10px target is not. The padding
                gives it 34px of touch area without moving the ink, which is
                why the dot itself is a nested span.
              */
              className={`-m-[12px] flex items-center justify-center rounded-full p-[12px] ${focusRing}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active}
              onClick={() => scrollToPage(index)}
            >
              <span
                aria-hidden
                className={`h-[10px] rounded-full transition-all duration-300 ${
                  index === active ? 'w-[26px]' : 'w-[10px]'
                } ${
                  tone === 'dark'
                    ? index === active
                      ? 'bg-white'
                      : 'bg-white/30'
                    : index === active
                      ? 'bg-accent'
                      : 'bg-accent/25'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
