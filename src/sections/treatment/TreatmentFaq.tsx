import { useId, useState } from 'react'
import type { TreatmentFaq as Faq } from '@/content/treatment'
import { ChevronDownIcon } from '@/components/icons'
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
 * Every answer is in the prerendered HTML — the doc's copy is the page's
 * long-tail content, and it must not depend on a click to exist. A closed
 * panel collapses through grid-template-rows (0fr <-> 1fr, so the height
 * animates without measuring) and is `inert`, which takes it out of the tab
 * order and the accessibility tree while it is visually gone.
 *
 * One item open at a time, as in the reference. Clicking the open question
 * closes it.
 */
export function TreatmentFaq({ heading, faqs, id }: { heading: string; faqs: readonly Faq[]; id: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()

  return (
    <section aria-labelledby={id} className="mt-[50px]">
      <h2 id={id} className={treatmentH2}>
        <RevealWords text={heading} />
      </h2>

      <div className="mt-[30px]">
        {faqs.map((faq, index) => {
          const isOpen = open === index
          const buttonId = `${base}-q${index}`
          const panelId = `${base}-a${index}`

          return (
            <div key={faq.question} className="border-b border-divider last:border-b-0">
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-[20px] py-[22px] text-left font-display text-[19px] leading-[28px] transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-[22px] md:leading-[31px] ${isOpen ? 'text-accent' : 'text-primary'}`}
                >
                  <span>
                    {index + 1}. {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-[14px] w-[14px] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className={`pb-[24px] ${treatmentBody}`}>{faq.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
