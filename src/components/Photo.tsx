/**
 * A photograph in the reference's wipe-in frame with its hover gloss sweep.
 *
 * The radius lives on the wrapper, as it does in the reference: the <img>
 * computes to radius 0 there and is clipped by the frame around it. The wrapper
 * is also what .shiny-glass needs — ::after does not render on a replaced
 * element like <img>.
 *
 * Shared by the About band and the What We Do band. They frame their photos to
 * different radii but are otherwise identical, so the radius is its own prop
 * rather than part of `className`: the default is the reference's ordinary
 * frame, and What We Do overrides it with the percentage cap its photo needs.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  radiusClass = 'rounded-30',
  className,
}: {
  src: string
  alt: string
  width: number
  height: number
  radiusClass?: string
  className?: string
}) {
  return (
    <div className={`shiny-glass ${radiusClass} ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="reveal-wipe h-full w-full object-cover"
      />
    </div>
  )
}
