import type { CSSProperties } from 'react'

/**
 * A heading's text split into `.reveal-word` spans, so it rises in word by word
 * as it scrolls into view — the CSS read of the reference's per-character GSAP
 * SplitText (`at-animation-heading-style-3`). See .reveal-word in
 * src/styles/index.css.
 *
 * The same markup HomeAbout and HomeWhatWeDo write inline, for the treatment
 * page's three H2s, which would otherwise repeat it three times per page.
 */
export function RevealWords({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, index) => (
        <span
          // Words can repeat within a heading, so the index is the identity.
          key={`${word}-${index}`}
          className="reveal-word"
          // Not animation-delay: a view() timeline has no clock to delay. Each
          // word is bound to a slightly later slice of the scroll.
          style={{ '--i': index } as CSSProperties}
        >
          {/*
            The trailing space belongs to the word's own string: React serialises
            a space-only JSX sibling as &nbsp;, which would leave the heading's
            text subtly different from the content doc's.
          */}
          {index === words.length - 1 ? word : `${word} `}
        </span>
      ))}
    </>
  )
}
