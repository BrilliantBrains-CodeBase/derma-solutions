import type { ReactNode } from 'react'
import { CloverIcon } from '@/components/icons'

/**
 * The reference's `section-title` eyebrow: the theme's four-petal mark, then
 * Sora 14/24 at 2.8px tracking, uppercase. The same treatment appears on 73
 * text nodes across the theme, which is why it lives here rather than in a
 * section.
 *
 * Colour is not decided here. Every call site sets it — `text-white` on the
 * hero's photograph, `text-accent` on the About band's white ground — and the
 * mark follows through `currentColor`.
 */
export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`flex items-center gap-[10px] font-sans text-[14px] leading-[24px] font-medium tracking-[2.8px] uppercase ${className}`}
    >
      <CloverIcon className="h-[22px] w-[22px] shrink-0" />
      {children}
    </p>
  )
}
