import { useEffect, useRef } from 'react'

/**
 * The sticky behaviour shared by the treatment pages' sidebar and the blog's.
 *
 * From lg the sidebar is sticky, which the reference's is not. A plain `top`
 * would not do: these sidebars run past the viewport's height — the ten-item
 * Cosmetology and Cosmetic Surgery service lists make one ~1,200px tall, and a
 * post with 33 headings does the same to the blog's — and pinned at the top on
 * a 900px screen their last card would never come into view.
 *
 * So `top` is min(140px, 100vh - height - 30px): a sidebar that fits pins 30px
 * under the 110px header, and one that does not scrolls with the page until its
 * foot is 30px above the viewport's, then pins there. The height is measured
 * into --sidebar-h by the hook below; before hydration it is unset, which is
 * the plain 140px case.
 */
export const stickySidebar =
  'lg:sticky lg:top-[min(140px,calc(100vh-var(--sidebar-h,0px)-30px))]'

/** Keeps --sidebar-h on the element in step with its rendered height. */
export function useSidebarHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const aside = ref.current
    if (!aside) return
    const observer = new ResizeObserver(() => {
      aside.style.setProperty('--sidebar-h', `${aside.offsetHeight}px`)
    })
    observer.observe(aside)
    return () => observer.disconnect()
  }, [])

  return ref
}
