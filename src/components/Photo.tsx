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
  srcSet,
  sizes,
  alt,
  width,
  height,
  radiusClass = 'rounded-30',
  fit = 'cover',
  className,
  priority = false,
}: {
  src: string
  /**
   * The gallery is the first caller to ship two renditions of the same
   * photograph, so these are optional and every existing call site leaves them
   * undefined. Same two-entry idiom as BlogCard.
   */
  srcSet?: string
  sizes?: string
  alt: string
  width: number
  height: number
  radiusClass?: string
  /**
   * 'cover' fills a frame the caller has already given a shape, which is what
   * every band on this site does. 'natural' lets the photograph keep its own
   * aspect and the wrapper take its height — the image gallery, where the tiles
   * are deliberately not cropped to a common frame.
   */
  fit?: 'cover' | 'natural'
  className?: string
  /**
   * For a photograph that is above the fold on load, where lazy loading would
   * delay the page's largest paint. Every homepage photo is below the hero, so
   * only the treatment pages' featured image sets it.
   */
  priority?: boolean
}) {
  return (
    <div className={`shiny-glass ${radiusClass} ${className ?? ''}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={`reveal-wipe w-full ${fit === 'natural' ? 'h-auto' : 'h-full object-cover'}`}
      />
    </div>
  )
}
