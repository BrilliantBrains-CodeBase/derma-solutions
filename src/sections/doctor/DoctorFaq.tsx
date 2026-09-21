import { FaqAccordion } from '@/components/FaqAccordion'
import type { BandHeading, Tone } from '@/content/doctor'
import { Band, BandHeadingBlock } from './DoctorBand'

/**
 * B1.10 — FAQ. Built to
 * theme-reference/04-sections/20-got-questions-we-ve-got-answers/ exactly as
 * AboutFaq is — the shared FaqAccordion at that section's roomier 24/32 pitch,
 * centred, without the reference's media column (see AboutFaq for why).
 *
 * Every answer is in the prerendered HTML.
 *
 * There is no FAQPage JSON-LD for these, unlike /about-us/'s: this band sits on
 * a live-captured URL whose graph ships byte-verbatim from seo-backup/, and
 * scripts/build-seo-registry.ts only appends nodes to pages it authors. Adding
 * one means regenerating that page's source .jsonld.
 */
export function DoctorFaq({
  tone,
  items,
  headingId,
  ...copy
}: BandHeading & {
  tone: Tone
  items: readonly { question: string; answer: string }[]
  headingId: string
}) {
  return (
    <Band tone={tone} headingId={headingId}>
      <BandHeadingBlock {...copy} headingId={headingId} tone={tone} />

      <div className="mx-auto mt-[40px] max-w-[860px] lg:mt-[50px]">
        <FaqAccordion
          items={items}
          questionClassName="flex w-full cursor-pointer items-center justify-between gap-[20px] py-[28px] text-left font-display text-[20px] leading-[30px] transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-[24px] md:leading-[32px]"
          answerClassName="pb-[28px] font-sans text-[16px] leading-[26px] text-body"
        />
      </div>
    </Band>
  )
}
