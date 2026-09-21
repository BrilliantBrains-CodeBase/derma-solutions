import { BeforeAfterSlider } from '@/components/BeforeAfterSlider'
import { PageShell } from '@/components/PageShell'
import { Photo } from '@/components/Photo'
import { VideoFacade } from '@/components/VideoFacade'
import { treatmentPage } from '@/config/site'
import type { TreatmentContent } from '@/content/treatment'
import {
  treatmentComparePath,
  treatmentBannerPath,
  treatmentBannerMobilePath,
  treatmentBannerSmallPath,
  treatmentBannerSlot,
  treatmentImagePath,
  treatmentImageSlot,
  treatmentMedia,
  treatmentVideoPosterPath,
  treatmentVideoSlot,
  treatmentYoutubeId,
} from '@/content/treatmentMedia'
import { getSeo } from '@/seo/registry.generated'
import { TreatmentPageHeader } from '@/sections/treatment/TreatmentPageHeader'
import { TreatmentSidebar } from '@/sections/treatment/TreatmentSidebar'
import { TreatmentFeature, TreatmentWhy, treatmentBody } from '@/sections/treatment/TreatmentBlocks'
import { TreatmentFaq } from '@/sections/treatment/TreatmentFaq'

/**
 * The treatment page: the Glowix service detail page
 * (theme-reference/08-pages/page-section-map.json, services__botox-and-dermal-
 * fillers), shared by all 38 pages under the header's Treatments menu.
 *
 * Section order is the content doc's template table, slot for slot:
 * 01 header · 02 sidebar · 03 featured image (a before/after slider on the
 * eight pages that had one) · 04 intro · client treatment banner · 05 feature block ·
 * 06 video · 07 why-choose block · 08 FAQ. Its 09 (newsletter band) and 10
 * (footer) are the site-wide <Footer> and <PreFooter>, which already carry the
 * appointment CTA in the newsletter's place and the disclaimer the doc asks
 * for (its notes 8 and 10).
 *
 * The copy is `content`, generated per page from the doc
 * (src/content/treatments/<slug>.ts). The title, description and H1 are not —
 * they come from the SEO registry through PageShell, held to the live capture.
 *
 * Layout, measured off the reference at 1440: a 1300 container, 100px top and
 * bottom, a 383px sidebar and an 847px content column 50px apart. The sidebar
 * is visually first but comes after the content in the DOM, so a screen reader
 * or a crawler reaches the treatment before the list of other treatments. Its
 * grid cell stretches to the content column's height, which is the track the
 * sticky sidebar inside it travels along.
 */
export function TreatmentPage({ slug, content }: { slug: string; content: TreatmentContent }) {
  const record = getSeo(slug)
  if (content.path !== record.path) {
    throw new Error(`TreatmentPage "${slug}" was given the content for ${content.path}`)
  }
  const media = treatmentMedia[slug]
  if (!media) throw new Error(`No treatment media for "${slug}" — src/content/treatmentMedia.ts`)

  return (
    <PageShell slug={slug} hero={h1 => <TreatmentPageHeader h1={h1} name={content.name} />}>
      <div className="mx-auto grid max-w-[1300px] gap-[60px] px-[20px] py-[60px] lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-[40px] lg:py-[100px] xl:grid-cols-[383px_minmax(0,1fr)] xl:gap-[50px] xl:px-[10px]">
        <div className="min-w-0">
          {/*
            Slot 03. The eight pages the old site opened with a before/after
            comparison keep that widget here; every other page shows its single
            featured photograph, as the Glowix reference does.
          */}
          {media.compare ? (
            <BeforeAfterSlider
              before={treatmentComparePath(slug, 'before')}
              beforeAlt={media.compare.before.alt}
              after={treatmentComparePath(slug, 'after')}
              afterAlt={media.compare.after.alt}
              width={treatmentImageSlot.width}
              height={treatmentImageSlot.height}
              beforeLabel={treatmentPage.compareBeforeLabel}
              afterLabel={treatmentPage.compareAfterLabel}
              className="aspect-[847/505] w-full rounded-30"
            />
          ) : (
            <Photo
              src={treatmentImagePath(slug)}
              alt={media.image.alt}
              width={treatmentImageSlot.width}
              height={treatmentImageSlot.height}
              className="aspect-[847/505] w-full"
              priority
            />
          )}

          <div className="mt-[30px] flex flex-col gap-[20px]">
            {content.intro.map(paragraph => (
              <p key={paragraph.slice(0, 32)} className={treatmentBody}>
                {paragraph}
              </p>
            ))}
          </div>

          {/*
            The client supplied one treatment-specific 3:1 banner for every
            page. It sits at the editorial break between the introduction and
            the detailed benefits, where its technology message supports the
            copy without interrupting a heading-and-body section.
          */}
          <div className="mt-[40px] overflow-hidden rounded-30 bg-secondary">
            <picture>
              <source media="(max-width: 767px)" srcSet={treatmentBannerMobilePath(slug)} />
              <img
                src={treatmentBannerPath(slug)}
                srcSet={`${treatmentBannerSmallPath(slug)} 847w, ${treatmentBannerPath(slug)} 1694w`}
                sizes="(min-width: 1280px) 847px, (min-width: 1024px) calc(100vw - 420px), calc(100vw - 40px)"
                alt={`${content.name} treatment technology and care information`}
                width={treatmentBannerSlot.width}
                height={treatmentBannerSlot.height}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover object-center md:aspect-[847/282]"
              />
            </picture>
          </div>

          <TreatmentFeature block={content.feature} id="treatment-feature-heading" />

          <VideoFacade
            youtubeId={treatmentYoutubeId(slug)}
            title={treatmentPage.videoTitle(content.name)}
            poster={treatmentVideoPosterPath(slug)}
            posterAlt={media.video.alt}
            posterWidth={treatmentVideoSlot.width}
            posterHeight={treatmentVideoSlot.height}
            className="mt-[40px] aspect-[847/380] w-full rounded-30"
          />
          <p className={`mt-[30px] ${treatmentBody}`}>{content.videoBody}</p>

          <TreatmentWhy block={content.why} id="treatment-why-heading" />

          <TreatmentFaq heading={content.faqHeading} faqs={content.faqs} id="treatment-faq-heading" />
        </div>

        <div className="lg:order-first">
          <TreatmentSidebar path={record.path} slug={slug} />
        </div>
      </div>
    </PageShell>
  )
}
