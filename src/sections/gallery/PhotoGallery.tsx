import { Photo } from '@/components/Photo'
import {
  galleryPhotoPath,
  galleryPhotoSmall,
  galleryPhotoSmallPath,
  galleryPhotoWidth,
  type GalleryPhoto,
} from '@/content/galleryMedia'
import { photoSizes } from '@/content/gallery/photoSizes.generated'

/**
 * The image gallery's grid.
 *
 * Built to theme-reference/07-screenshots/desktop/casestudy.png — the Glowix
 * portfolio archive — for the three-up grid and its 30px gutters, and to
 * seo-backup/05-screenshots/desktop/image-gallery.png for the running order.
 *
 * Three columns, and the tiles are not cropped to a common frame: each keeps its
 * source's own aspect. The clinic's set is ten uniform 2195x2195 squares, so
 * today every tile is square and the rows are even. Not cropping still matters:
 * each file carries its BEFORE/AFTER label along its bottom edge, which is
 * exactly what a crop to a fixed frame would take off, and it means a
 * differently-shaped photograph can be added later without anyone having to
 * reason about a frame.
 *
 * The cost, stated plainly because the alternative was argued here before and
 * this replaces it: a tile is ~407px at lg, so each half of a pair is ~200px
 * rather than the ~310px HomeSeeTheDifference.tsx measures off the reference as
 * the point where a pair reads as evidence. That is a deliberate trade for the
 * theme's own archive layout and for showing more of the set per screen, not an
 * oversight. If the halves turn out to be too small in front of a real visitor,
 * the fix is lg:grid-cols-2 here and 1250 in galleryPhotoWidth.
 *
 * Two further departures from the theme's archive:
 *
 *  - No titles and no arrow discs. The archive's tiles are links to project
 *    pages; these are photographs with nowhere to go. BlogGrid.tsx sets the
 *    precedent for the rest — a full index is a plain grid at every width, not a
 *    swipe track, so CardCarousel is deliberately not used here.
 *  - A figcaption saying which half is which, for any file that does not
 *    already say so in its own pixels.
 *
 * That caption renders on nothing at the moment: every photograph in the
 * clinic's set carries BEFORE and AFTER burned in, so all ten are `labelled`
 * and all ten suppress it. It is kept rather than deleted because the set it
 * replaced was the other way round — ten of those fourteen said nothing about
 * which shot came first — and because drawing it unconditionally would print
 * "Before" twice, which is the same call HomeSeeTheDifference.tsx makes about
 * its own composites.
 *
 * The <img> dimensions come from photoSizes.generated.ts — what sharp actually
 * wrote — so the browser reserves each tile's real box before the pixels land.
 * With no fixed frame there is nothing else to derive them from.
 */

/*
 * The tile is ~407px at lg (a 1280 content box less two 30px gutters, over
 * three), ~285px at sm and the full gutter-less width below that. Written out
 * per breakpoint rather than as one vw figure because the 1300 container stops
 * growing while the viewport does not.
 */
const SIZES = [
  '(min-width: 1300px) 407px',
  '(min-width: 1024px) 31vw',
  '(min-width: 640px) 45vw',
  'calc(100vw - 40px)',
].join(', ')

export function PhotoGallery({ photos }: { photos: readonly GalleryPhoto[] }) {
  return (
    <ul className="mt-[50px] grid items-start gap-x-[30px] gap-y-[50px] sm:grid-cols-2 lg:mt-[70px] lg:grid-cols-3 lg:gap-y-[60px]">
      {photos.map((photo, index) => {
        const size = photoSizes[photo.id]
        // A source narrower than the 640 rendition is not enlarged, so both
        // files come out identical and there is nothing for the browser to
        // choose between. Describing them as 640w and 820w would be a lie it
        // would then act on.
        const hasTwoRenditions = size ? size.smallWidth < size.width : true

        return (
          <li key={photo.id}>
            <figure>
              <Photo
                src={galleryPhotoPath(photo.id)}
                srcSet={
                  hasTwoRenditions
                    ? `${galleryPhotoSmallPath(photo.id)} ${size?.smallWidth ?? galleryPhotoSmall}w, ${galleryPhotoPath(photo.id)} ${size?.width ?? galleryPhotoWidth}w`
                    : undefined
                }
                sizes={hasTwoRenditions ? SIZES : undefined}
                alt={photo.alt}
                // Falls back to a square only if the import has not been run;
                // every id in the table is in the generated map.
                width={size?.width ?? galleryPhotoWidth}
                height={size?.height ?? galleryPhotoWidth}
                radiusClass="rounded-30"
                fit="natural"
                className="w-full"
                // The first row is above the fold at desktop widths, where lazy
                // loading would delay the page's largest paint. Three tiles now,
                // not two.
                priority={index < 3}
              />

              {!photo.labelled && (
                <figcaption className="mt-[14px] font-sans text-[14px] leading-[24px] text-body">
                  {photo.pair === 'stacked'
                    ? 'Before (top) and after (bottom).'
                    : 'Before (left) and after (right).'}
                </figcaption>
              )}
            </figure>
          </li>
        )
      })}
    </ul>
  )
}
