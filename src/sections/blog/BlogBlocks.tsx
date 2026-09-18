import type { BlogBlock } from '@/content/blog'
import { VideoFacade } from '@/components/VideoFacade'

/**
 * A post's body, block by block, in the Glowix single-post type
 * (`.post-entry.glowix-block-style`), measured off
 * theme-reference/07-screenshots/desktop/top-tips-for-preparing-for-plastic-surgery.png
 * and 03-design-system/raw/top-tips-for-preparing-for-plastic-surgery.json:
 *
 *  - Paragraphs Sora 16/26 in --color-body.
 *  - H2 Marcellus 36/43 in --color-primary; H3 steps down to 26/34, H4 to 22/31.
 *  - Lists with small accent dots.
 *  - The quote as a brown box, radius 20, with a large accent quote mark and
 *    Marcellus 22/33 in white.
 *
 * Three departures, all because these are long clinical articles rather than
 * the demo's 300-word posts:
 *
 *  - List items stay at the paragraph's 16/26 rather than the reference's
 *    18/27 medium — some posts run 20-item lists back to back.
 *  - Tables, which the reference never shows, take the card ground for their
 *    header and stripe, and scroll sideways inside their own frame on a phone
 *    rather than squeezing a three-column comparison into 350px.
 *  - YouTube embeds play through the site's VideoFacade, so nothing loads from
 *    YouTube until someone asks for the video.
 *
 * Inline HTML is already reduced to strong/em/br/a by the extractor, which is
 * what makes dangerouslySetInnerHTML safe here: the strings are generated from
 * the capture at build time, never from anything a visitor sends.
 *
 * Headings carry `scroll-mt` so a TOC jump lands below the sticky header
 * (86px, 110px from lg).
 */

// overflow-wrap:anywhere lets the references lists' bare URLs wrap on a phone;
// `break-word` would not, since it leaves a grid item's min-content width alone.
const prose =
  '[overflow-wrap:anywhere] [&_table]:[overflow-wrap:normal] [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-[3px] [&_a:hover]:decoration-accent [&_strong]:font-semibold [&_strong]:text-primary'

const headingBase = 'font-display text-primary scroll-mt-[110px] lg:scroll-mt-[140px]'

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p
          className="mt-[20px] font-sans text-[16px] leading-[26px] text-body"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      )

    case 'h2':
      return (
        <h2 id={block.id} className={`${headingBase} mt-[50px] text-[28px] leading-[36px] md:text-[36px] md:leading-[43px]`}>
          {block.text}
        </h2>
      )

    case 'h3':
      return (
        <h3 id={block.id} className={`${headingBase} mt-[36px] text-[22px] leading-[30px] md:text-[26px] md:leading-[34px]`}>
          {block.text}
        </h3>
      )

    case 'h4':
      return (
        <h4 id={block.id} className={`${headingBase} mt-[30px] text-[20px] leading-[28px] md:text-[22px] md:leading-[31px]`}>
          {block.text}
        </h4>
      )

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag className="mt-[20px] grid gap-[10px] font-sans text-[16px] leading-[26px] text-body">
          {block.items.map((item, index) => (
            <li
              // Items can repeat within a list; the index is the identity.
              key={index}
              className={
                block.ordered
                  ? 'relative pl-[32px]'
                  : 'relative pl-[22px] before:absolute before:top-[10px] before:left-[2px] before:h-[7px] before:w-[7px] before:rounded-full before:bg-accent'
              }
            >
              {block.ordered && (
                <span aria-hidden className="absolute left-0 font-semibold text-accent tabular-nums">
                  {index + 1}.
                </span>
              )}
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </Tag>
      )
    }

    case 'table':
      return (
        <div className="mt-[30px] overflow-x-auto rounded-16 border border-divider">
          <table className="w-full min-w-[560px] border-collapse text-left font-sans text-[15px] leading-[24px] text-body">
            {block.head && (
              <thead className="bg-primary text-white">
                <tr>
                  {block.head.map((cell, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-[18px] py-[14px] align-top font-semibold [&_strong]:!text-white"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-secondary">
                  {row.map((cell, index) => (
                    <td
                      key={index}
                      className={`border-t border-divider px-[18px] py-[14px] align-top ${index === 0 ? 'font-medium text-primary' : ''}`}
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'quote':
      return (
        <blockquote className="mt-[40px] flex gap-[20px] rounded-card bg-primary px-[24px] py-[30px] md:gap-[30px] md:px-[40px] md:py-[40px]">
          <span aria-hidden className="font-display text-[64px] leading-[48px] text-accent md:text-[80px] md:leading-[60px]">
            “
          </span>
          <p
            className="font-display text-[20px] leading-[30px] text-white md:text-[22px] md:leading-[33px] [&_strong]:!font-normal [&_strong]:!text-white"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </blockquote>
      )

    case 'video':
      return (
        <VideoFacade
          youtubeId={block.youtubeId}
          title={block.title}
          // YouTube's own still. The 4:3 hqdefault letterboxes a 16:9 video, and
          // object-cover in the 16:9 frame trims the bars back off.
          poster={`https://i.ytimg.com/vi/${block.youtubeId}/hqdefault.jpg`}
          posterAlt=""
          posterWidth={480}
          posterHeight={360}
          className="mt-[40px] aspect-video w-full rounded-card"
        />
      )
  }
}

export function BlogBlocks({ blocks }: { blocks: readonly BlogBlock[] }) {
  return (
    <div className={`${prose} [&>:first-child]:mt-0`}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  )
}
