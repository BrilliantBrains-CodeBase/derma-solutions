import type { CSSProperties } from 'react'
import { homeTechBanners } from '@/config/site'

/**
 * The technology banners. New in the 2026-09 revision round, which supplies two
 * artworks through Zoho WorkDrive (re-supplied taller later that month, at
 * 5000x1562 = 3.2:1) and, under each, a "Short paragraph below the banner"
 * and a "Section Subheading".
 *
 * One component rendered twice from homeTechBanners — the two are the same band
 * with different artwork — so it is the only Home* section that takes a prop.
 * Home.tsx splits them: banner 1 keeps the doc's slot after About, banner 2
 * follows Meet the Dermatologist, because two wide strips stacked read as one
 * broken image.
 *
 * There is no theme-reference behind this band either. It borrows the
 * rounded panel construction every other band on the page uses — radius 30
 * — but runs to 1880 wide rather than 1400, and sets the subheading and
 * paragraph centred beneath it, which is how Services and Latest Blog head
 * their own centred bands.
 *
 * Two problems the artwork creates, and what is done about each:
 *
 *  - BOTH BANNERS CARRY THEIR HEADING BAKED INTO THE PIXELS, and it is not the
 *    subheading the doc puts underneath. On a wide screen the band says two
 *    things: the artwork's "Advanced Technology. Visible Skin Transformation."
 *    and the doc's "Technology Designed Around Your Skin". That is the client's
 *    own layout and it is left as supplied.
 *
 *    On a phone the baked type is ~4px tall and unreadable. The obvious fix is
 *    to crop past it on small screens and let the HTML subheading carry the
 *    message, and that was tried — it does not work on THIS artwork. Banner 1
 *    has devices at both edges with the type centred between them, so any
 *    frame that clears the type is a portrait slice of one machine; banner 2
 *    has its devices on the left and its type on the right. There is no one
 *    crop that serves both, and a slice of one machine throws away the
 *    composition the client is paying for.
 *
 *    So the band renders at the artwork's own ratio at every width, and the
 *    baked type is simply small on a phone — decoration under a real heading
 *    rather than a cropped half-sentence. TODO(assets): the actual fix is a
 *    second artwork. Ask whoever produced these for a mobile rendition, either
 *    text-free or squarer, and add it as a <picture> source here.
 *
 *  - Because the words exist only as pixels, assets.techBanner*Alt quotes them
 *    in full. It is long for alt text, and correct: shortening it would delete
 *    sentences that a sighted visitor can read.
 *
 * The artwork is also the one slot on the homepage that ships a srcset. Every
 * other decor file is a single 2x rendition, which works because none is wider
 * than ~620 CSS px; this one runs up to 1880, and a lone 2800 file would be
 * a ~120 KB download for a phone rendering it at 335. See the note in
 * scripts/import-home-images.ts.
 *
 * `tone` paints the panel underneath the image with the artwork's own ground,
 * so the band does not flash white inside its radius before the JPEG decodes.
 *
 * The image is a bare <img>, not Photo: Photo's .reveal-wipe sweeps a clip-path
 * across the frame left to right, which on a strip this wide runs for most of a
 * scroll and draws the eye to the animation rather than the devices. Same call
 * HomeCaseStudies makes, and for the same reason.
 */

/** The artwork's own ground, so the panel does not flash white while it loads. */
const toneClass = {
  dark: 'bg-primary',
  light: 'bg-secondary',
} as const

export function HomeTechBanner({
  banner,
}: {
  banner: (typeof homeTechBanners)[number]
}) {
  const headingId = `home-tech-banner-${banner.id}-heading`

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto max-w-[1920px] px-[12px] py-[60px] md:px-[20px] lg:py-[80px]"
    >
      {/* Wider than the page's 1400 bands, and a tighter gutter on phones: the
          devices are pixels in the artwork, so the only way to show them
          larger is a larger strip. */}
      <div className={`overflow-hidden rounded-30 ${toneClass[banner.tone]}`}>
        <img
          src={banner.image}
          srcSet={`${banner.imageSmall} 1400w, ${banner.image} 2800w`}
          sizes="(min-width: 1920px) 1880px, 100vw"
          alt={banner.imageAlt}
          width={2800}
          height={875}
          loading="lazy"
          decoding="async"
          // The artwork's own ratio at every width — see the header comment for
          // why there is no small-screen crop.
          className="aspect-[2800/875] w-full object-cover"
        />
      </div>

      <div className="mx-auto mt-[40px] max-w-[760px] text-center lg:mt-[50px]">
        <h2
          id={headingId}
          className="font-display text-[26px] leading-[34px] text-primary md:text-[32px] md:leading-[40px] lg:text-[38px] lg:leading-[48px]"
        >
          {banner.subheading.split(' ').map((word, index, words) => (
            <span
              // Words can repeat within the heading, so the index is the identity.
              key={`${word}-${index}`}
              className="reveal-word"
              // Not animation-delay: a view() timeline has no clock to delay.
              // Each word is bound to a slightly later slice of the scroll.
              style={{ '--i': index } as CSSProperties}
            >
              {/* The trailing space belongs to the word's own string — see HomeAbout. */}
              {index === words.length - 1 ? word : `${word} `}
            </span>
          ))}
        </h2>

        <p className="mt-[20px] font-sans text-[16px] leading-[26px] text-body">{banner.body}</p>
      </div>
    </section>
  )
}
