import { useState } from 'react'
import type { CSSProperties } from 'react'
import { legal } from '@/config/site'

/**
 * A before/after photograph behind a draggable divider: the before image on the
 * left of the handle, the after image on the right.
 *
 * This is the one widget carried over from the OLD Derma Solutions site rather
 * than from the Glowix reference. The live treatment pages open with
 * Breakdance's `bde-image-comparison`
 * (seo-backup/01-raw-html/desktop/acne-scar-treatment-in-bangalore.html), and
 * this reproduces it: a 50px white ring on a full-height hairline, two arrows
 * inside it, and "Before" / "After" labels in the top corners. The frame is the
 * Glowix featured-image frame, so it sits in the template's image slot
 * unchanged.
 *
 * Built on a range input rather than pointer handlers. The input is the whole
 * frame, transparent, so a drag anywhere moves the divider on mouse and touch —
 * and it arrives with what hand-rolled drag handling usually loses: arrow-key
 * and Home/End support, a focus ring, a real role and value for screen readers,
 * and no global listeners to clean up. The visible ring and hairline are drawn
 * behind it and are decorative.
 *
 * Both images are in the prerendered HTML and the divider starts at 50%, so the
 * comparison is fully visible before hydration and with JavaScript off.
 *
 * `legal.resultsVary` is burned into the frame, not printed under it: content
 * doc note 8 requires the line on the image itself.
 *
 * TODO(compliance): note 8 also requires signed patient consent for any
 * before/after photograph. The pairs wired up today are the live site's own
 * stock and retouched images (see src/content/treatmentMedia.ts), which is what
 * this disclaimer is covering until the clinic supplies consented pairs.
 */
export function BeforeAfterSlider({
  before,
  beforeAlt,
  after,
  afterAlt,
  width,
  height,
  beforeLabel,
  afterLabel,
  className = '',
}: {
  before: string
  beforeAlt: string
  after: string
  afterAlt: string
  width: number
  height: number
  beforeLabel: string
  afterLabel: string
  className?: string
}) {
  const [position, setPosition] = useState(50)

  return (
    <div
      className={`group/compare relative overflow-hidden bg-primary ${className}`}
      style={{ '--pos': `${position}%` } as CSSProperties}
    >
      {/* The after photograph fills the frame; the before one is clipped over it. */}
      <img
        src={after}
        alt={afterAlt}
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={before}
        alt={beforeAlt}
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover [clip-path:inset(0_calc(100%-var(--pos))_0_0)]"
      />

      {/* Corner labels, as on the live site. */}
      <span className="absolute left-[20px] top-[20px] rounded-pill bg-primary/70 px-[14px] py-[6px] font-sans text-[13px] leading-[18px] font-semibold text-white backdrop-blur-[2px]">
        {beforeLabel}
      </span>
      <span className="absolute right-[20px] top-[20px] rounded-pill bg-primary/70 px-[14px] py-[6px] font-sans text-[13px] leading-[18px] font-semibold text-white backdrop-blur-[2px]">
        {afterLabel}
      </span>

      {/* Note 8's line, inside the frame. */}
      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-primary/70 to-transparent px-[20px] pb-[14px] pt-[30px] text-center font-sans text-[12px] leading-[18px] font-medium text-white">
        {legal.resultsVary}
      </span>

      {/* The divider: hairline, then the ring the live site draws at 50px. */}
      <span aria-hidden className="absolute inset-y-0 left-[var(--pos)] w-px -translate-x-1/2 bg-white" />
      <span
        aria-hidden
        className="absolute left-[var(--pos)] top-1/2 flex h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[6px] rounded-full border border-white bg-black/20 backdrop-blur-[2px] transition-colors group-hover/compare:bg-white/25"
      >
        {/* Two chevrons, as in the reference's .dragger-arrow pair. */}
        <span className="h-[10px] w-[10px] rotate-45 border-b-2 border-l-2 border-white transition-[margin] group-hover/compare:mr-[3px]" />
        <span className="h-[10px] w-[10px] rotate-45 border-r-2 border-t-2 border-white transition-[margin] group-hover/compare:ml-[3px]" />
      </span>

      {/*
        The control itself. Transparent and the size of the frame, so dragging
        anywhere works; the thumb is the full height, which is what makes the
        pointer track the divider rather than a 50px target.
      */}
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={position}
        onChange={event => setPosition(event.target.valueAsNumber)}
        onKeyDown={event => {
          // step=0.1 keeps the drag smooth, but it also makes one arrow press
          // move the divider a tenth of a percent — 0.8px here. Arrows and
          // Page Up/Down take a useful stride instead.
          const stride = { ArrowLeft: -2, ArrowRight: 2, PageDown: -10, PageUp: 10 }[event.key]
          if (stride === undefined) return
          event.preventDefault()
          setPosition(current => Math.min(100, Math.max(0, current + stride)))
        }}
        aria-label={`Drag to compare: ${beforeLabel} on the left, ${afterLabel} on the right`}
        aria-valuetext={`${Math.round(position)}% ${beforeLabel}, ${100 - Math.round(position)}% ${afterLabel}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white [&::-moz-range-thumb]:h-[var(--thumb-h)] [&::-moz-range-thumb]:w-[50px] [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:h-[var(--thumb-h)] [&::-webkit-slider-thumb]:w-[50px] [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
        // The thumb is as tall as the frame so the whole height is draggable.
        // A Tailwind arbitrary value cannot reach a variant's pseudo-element
        // here, so the height travels in as a custom property.
        style={{ '--thumb-h': `${height}px` } as CSSProperties}
      />
    </div>
  )
}
