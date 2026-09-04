import { useEffect, useRef, useState } from 'react'

/**
 * The reference's counter widget, `data-duration="2000"` from 0.
 *
 * The resting value is the target, not 0: these pages are prerendered by
 * vite-react-ssg, so the static HTML has to carry the real number for crawlers
 * and for anyone whose JS never runs. The tween only ever happens as a
 * client-side departure from that resting state.
 *
 * Lifted out of HomeWhatWeDo when HomeSeeTheDifference's counter row needed the
 * same behaviour — four more tiles, identical in every respect.
 */
export function useCountUp(target: number, durationMs: number) {
  const [value, setValue] = useState(target)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // The global duration-collapse rule in index.css cannot reach a JS tween,
    // so reduced motion is honoured by never starting one.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1)
        // Back-loaded ease-out, as Elementor's counter reads.
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        setValue(0)
        run()
      },
      { threshold: 0.4 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, durationMs])

  return { value, ref }
}
