import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { legal } from '@/config/site'
import { galleryCopy, galleryPhotos } from '@/content/galleryMedia'
import { GalleryIntro } from '@/sections/gallery/GalleryIntro'
import { PhotoGallery } from '@/sections/gallery/PhotoGallery'

/**
 * /image-gallery/
 *
 * Captured copy: seo-backup/02-markdown/image-gallery.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/image-gallery.png
 *
 * The page-header band with its breadcrumb, the live page's copy, then the grid
 * — Blogs.tsx's shape, which is the reference's own inner-page template.
 *
 * The "Results vary" line sits directly under the photographs rather than in the
 * footer, because copy doc note 2 requires it to read as attached to them.
 * PreFooter already carries the long legal disclaimer the live page ended with,
 * site-wide, so it is deliberately not repeated here.
 *
 * `hold` filters the grid. See the blocking TODO(compliance) at the top of
 * src/content/galleryMedia.ts — every photograph on this page is an identifiable
 * patient under a result claim, and one of them carries another practitioner's
 * watermark.
 */
export default function ImageGallery() {
  return (
    <PageShell
      slug="image-gallery"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Image Gallery' }]} />
        </PageHeader>
      )}
    >
      <section
        aria-labelledby="image-gallery-intro-heading"
        className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
      >
        <GalleryIntro id="image-gallery-intro-heading" {...galleryCopy.imageGallery} />

        <PhotoGallery photos={galleryPhotos.filter(photo => !photo.hold)} />

        <p className="mt-[36px] text-center font-sans text-[14px] leading-[24px] text-body">
          {legal.resultsVary}
        </p>
      </section>
    </PageShell>
  )
}
