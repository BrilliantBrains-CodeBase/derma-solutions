import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { legal } from '@/config/site'
import { galleryCopy, galleryVideos } from '@/content/galleryMedia'
import { GalleryIntro } from '@/sections/gallery/GalleryIntro'
import { VideoGallery as VideoGalleryGrid } from '@/sections/gallery/VideoGallery'

/**
 * /video-gallery/
 *
 * Captured copy: seo-backup/02-markdown/video-gallery.md
 * Screenshots: seo-backup/05-screenshots/{desktop,mobile}/video-gallery.png
 *
 * Same shape as ImageGallery: the header band, the live page's copy, the grid.
 * The breadcrumb's crumbs are Home → Video Gallery, matching the BreadcrumbList
 * already in src/seo/schema/video-gallery.json.
 *
 * These are procedure videos rather than before/after stills, but several show
 * patients and outcomes, so the same "Results vary" line closes the page.
 */
export default function VideoGallery() {
  return (
    <PageShell
      slug="video-gallery"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Video Gallery' }]} />
        </PageHeader>
      )}
    >
      <section
        aria-labelledby="video-gallery-intro-heading"
        className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
      >
        <GalleryIntro id="video-gallery-intro-heading" {...galleryCopy.videoGallery} />

        <VideoGalleryGrid videos={galleryVideos} />

        <p className="mt-[36px] text-center font-sans text-[14px] leading-[24px] text-body">
          {legal.resultsVary}
        </p>
      </section>
    </PageShell>
  )
}
