import { aboutFaqSection, aboutFaqs } from '@/config/site'
import { Eyebrow } from '@/components/Eyebrow'
import { FaqAccordion } from '@/components/FaqAccordion'
import { RevealWords } from '@/components/RevealWords'

/**
 * B10 — FAQs. Built to
 * theme-reference/04-sections/20-got-questions-we-ve-got-answers/.
 *
 * The accordion itself is src/components/FaqAccordion.tsx, shared with the
 * treatment pages. Only the fit differs: on §20 the closed-question pitch is
 * 91px (Q2 at y=503, Q3 at y=594) against the treatment sidebar column's ~75,
 * so the questions here take 24/32 on py-[28px] rather than 22/31 on py-[22px].
 *
 * These four questions are also the source of this page's FAQPage JSON-LD —
 * scripts/schema-nodes.ts reads the same `aboutFaqs` array — so the visible
 * answers and the structured ones cannot disagree.
 *
 * ONE DEPARTURE, and it is a layout one rather than a detail: the reference's
 * left media column is dropped, and the accordion is centred on the band
 * instead. That column is two more treatment photographs, a decorative
 * text-path ring reading "Frequently asked question", and a vendor dot-grid.
 * By this point the page has spent every photograph in public/images/decor/,
 * so a media column here would be the fourth or fifth appearance of the same
 * frames on one page; the ring repeats the eyebrow sitting beside it; and the
 * dot grid is theme-vendor artwork, tagged "licence": "reference-only" in
 * 06-assets/manifest.json and not shippable.
 *
 * TODO(content): if the clinic supplies two new photographs, the reference's
 * two-column form is a straight swap — media box 610x646 at (80,110), frame A
 * 58.689% x 83.746% at (0,0), frame B 57.705% x 62.848% at (42.131%, 37.152%)
 * on z-10, columns split 47.656% / 3.906% / 48.438%.
 */
export function AboutFaq() {
  return (
    <section
      id="about-faqs"
      aria-labelledby="about-faq-heading"
      className="mx-auto max-w-[1300px] px-[20px] py-[60px] lg:px-[10px] lg:py-[100px]"
    >
      <div className="mx-auto max-w-[820px] text-center">
        <Eyebrow className="justify-center text-accent">{aboutFaqSection.eyebrow}</Eyebrow>
        <h2
          id="about-faq-heading"
          className="mt-[20px] text-balance font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
        >
          <RevealWords text={aboutFaqSection.heading} />
        </h2>
      </div>

      <div className="mx-auto mt-[40px] max-w-[860px] lg:mt-[50px]">
        <FaqAccordion
          items={aboutFaqs}
          questionClassName="flex w-full cursor-pointer items-center justify-between gap-[20px] py-[28px] text-left font-display text-[20px] leading-[30px] transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-[24px] md:leading-[32px]"
          answerClassName="pb-[28px] font-sans text-[16px] leading-[26px] text-body"
        />
      </div>
    </section>
  )
}
