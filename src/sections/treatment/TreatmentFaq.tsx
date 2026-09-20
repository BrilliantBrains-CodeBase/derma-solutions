import type { TreatmentFaq as Faq } from '@/content/treatment'
import { FaqAccordion } from '@/components/FaqAccordion'
import { RevealWords } from '@/components/RevealWords'
import { treatmentBody, treatmentH2 } from './TreatmentBlocks'

/**
 * The service detail page's FAQ (content doc slot 08), built to the accordion
 * at the foot of theme-reference/04-sections/09-enhance-your-beauty-safely/.
 *
 * Measured off 07-screenshots/desktop/services__botox-and-dermal-fillers.png:
 * numbered 22px Marcellus questions on hairline dividers, the open one in
 * accent with its chevron turned up, and the first item open on load.
 *
 * The accordion itself moved to src/components/FaqAccordion.tsx when the About
 * page's B10 became a second caller. Everything that made this band the
 * treatment pages' — its heading, and the two class strings below — stays here;
 * the rendered markup is unchanged.
 */
export function TreatmentFaq({ heading, faqs, id }: { heading: string; faqs: readonly Faq[]; id: string }) {
  return (
    <section aria-labelledby={id} className="mt-[50px]">
      <h2 id={id} className={treatmentH2}>
        <RevealWords text={heading} />
      </h2>

      <div className="mt-[30px]">
        <FaqAccordion
          items={faqs}
          questionClassName="flex w-full cursor-pointer items-center justify-between gap-[20px] py-[22px] text-left font-display text-[19px] leading-[28px] transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-[22px] md:leading-[31px]"
          answerClassName={`pb-[24px] ${treatmentBody}`}
        />
      </div>
    </section>
  )
}
