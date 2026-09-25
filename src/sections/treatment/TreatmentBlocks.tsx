import type { ComponentType } from 'react'
import { paragraphs, type TreatmentBlock } from '@/content/treatment'
import { FourCirclesIcon, LayersIcon, VennIcon } from '@/components/icons'
import { RevealWords } from '@/components/RevealWords'

/**
 * The service detail page's two content blocks, built to
 * theme-reference/04-sections/09-enhance-your-beauty-safely/.
 *
 * Measured off 07-screenshots/desktop/services__botox-and-dermal-fillers.png, in
 * the 847px content column:
 *
 *  - Feature block (content doc slot 05): an H2, a paragraph, then three
 *    262-wide icon boxes 30px apart — hairline border, radius 30, a 60px brown
 *    disc holding the icon, a 22px Marcellus title and 16/26 body copy.
 *  - Why-choose block (slot 07): an H2, a paragraph, then three rows of the
 *    same disc beside a title and copy, 128px apart.
 *
 * Both reuse the reference's own three pictograms, in its order. They are
 * decorative: the icons are the theme's, not illustrations of the treatment.
 */

const ICONS: ComponentType<{ className?: string }>[] = [LayersIcon, FourCirclesIcon, VennIcon]

export const treatmentH2 =
  'font-display text-[30px] leading-[38px] text-primary md:text-[40px] md:leading-[48px] xl:text-[48px] xl:leading-[58px]'
export const treatmentBody = 'font-sans text-[16px] leading-[26px] text-body'

function IconDisc({ index }: { index: number }) {
  const Icon = ICONS[index % ICONS.length]
  return (
    <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-primary text-white">
      <Icon className="h-[30px] w-[30px]" />
    </span>
  )
}

export function TreatmentFeature({ block, id }: { block: TreatmentBlock; id: string }) {
  return (
    <section aria-labelledby={id} className="mt-[50px]">
      <h2 id={id} className={treatmentH2}>
        <RevealWords text={block.heading} />
      </h2>
      {paragraphs(block.body).map(paragraph => (
        <p key={paragraph.slice(0, 32)} className={`mt-[20px] ${treatmentBody}`}>
          {paragraph}
        </p>
      ))}

      <ul className="mt-[40px] grid gap-[20px] sm:grid-cols-3 xl:gap-[30px]">
        {block.items.map((item, index) => (
          <li key={item.title} className="rounded-30 border border-divider bg-white p-[20px]">
            <IconDisc index={index} />
            <h3 className="mt-[30px] font-display text-[20px] leading-[28px] text-primary xl:text-[22px] xl:leading-[31px]">
              {item.title}
            </h3>
            <p className={`mt-[10px] ${treatmentBody}`}>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function TreatmentWhy({ block, id }: { block: TreatmentBlock; id: string }) {
  return (
    <section aria-labelledby={id} className="mt-[50px]">
      <h2 id={id} className={treatmentH2}>
        <RevealWords text={block.heading} />
      </h2>
      {paragraphs(block.body).map(paragraph => (
        <p key={paragraph.slice(0, 32)} className={`mt-[20px] ${treatmentBody}`}>
          {paragraph}
        </p>
      ))}

      <ul className="mt-[40px] flex flex-col gap-[30px]">
        {block.items.map((item, index) => (
          <li key={item.title} className="flex items-start gap-[20px]">
            <IconDisc index={index} />
            <div>
              <h3 className="font-display text-[20px] leading-[28px] text-primary xl:text-[22px] xl:leading-[31px]">
                {item.title}
              </h3>
              <p className={`mt-[6px] ${treatmentBody}`}>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
