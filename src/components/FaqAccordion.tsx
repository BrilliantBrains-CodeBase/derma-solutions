import { useId, useState } from 'react'
import { ChevronDownIcon } from '@/components/icons'

/**
 * The theme's accordion, shared by the treatment pages' FAQ (built to the one at
 * the foot of theme-reference/04-sections/09-enhance-your-beauty-safely/) and
 * the About page's B10 (04-sections/20-got-questions-we-ve-got-answers/) — the
 * same widget at a roomier padding.
 *
 * Every answer is in the prerendered HTML. The copy is the page's long-tail
 * content, and it must not depend on a click to exist. A closed panel collapses
 * through grid-template-rows (0fr <-> 1fr, so the height animates without
 * measuring) and is `inert`, which takes it out of the tab order and the
 * accessibility tree while it is visually gone.
 *
 * One item open at a time, as in the reference, the first on load. Clicking the
 * open question closes it.
 *
 * Both class strings are required rather than defaulted: the treatment pages'
 * live in src/sections/treatment/TreatmentBlocks.tsx, and a component here must
 * not import from sections/. The open/closed accent toggle stays inside, since
 * it is behaviour rather than fit.
 */
export function FaqAccordion({
  items,
  questionClassName,
  answerClassName,
}: {
  items: readonly { question: string; answer: string }[]
  questionClassName: string
  answerClassName: string
}) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()

  return (
    <div>
      {items.map((faq, index) => {
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
                className={`${questionClassName} ${isOpen ? 'text-accent' : 'text-primary'}`}
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
                <p className={answerClassName}>{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
