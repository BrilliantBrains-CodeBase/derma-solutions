import { homeTrustBadges } from '@/config/site'

/**
 * The credibility strip directly under the hero. New in the 2026-09 revision
 * round — content/home-page/DERMA SOLUTIONS — HOMEPAGE COPY.md, the block it
 * heads "Trust Badege" — so there is no theme-reference directory behind it and
 * nothing here is measured off a screenshot.
 *
 * It is built from the page's existing vocabulary instead: the cream panel is
 * the Services and Why Choose Us construction (1400 wide inside a 20px gutter,
 * radius 30), the numbers take the same Marcellus that the See the Difference
 * counters use, and the hairlines between tiles are --color-divider, the token
 * Why Choose Us already rules its contact row with.
 *
 * Three decisions worth recording, because none of them is obvious from the
 * markup:
 *
 *  - Nothing counts up, although all four tiles are now numbers. The original
 *    reason was that two of the doc's tiles were words — "Advanced Care",
 *    "Innovation" — and a row where half the tiles tween and half sit still
 *    reads as a bug. The client replaced both of those, so that reason is gone
 *    and the row is static on a different one: homeSeeTheDifference.counters
 *    already tweens four figures lower down the same page, and two counting
 *    rows on one homepage is noise rather than emphasis. The values stay
 *    strings in site.ts, which is what keeps this a one-line decision to
 *    reverse.
 *
 *  - No icons, deliberately, although the client's reference screenshot has
 *    them. The marks that would fit — VennIcon, LaserIcon, FourCirclesIcon,
 *    PersonCircleIcon — are exactly the four the See the Difference counter row
 *    already uses, and repeating them would make the two bands look like the
 *    same component rendered twice. CalendarCheckIcon is the only other
 *    candidate and it is drawn on a 16x16 grid against those icons' 34x35, so
 *    at a shared size its stroke lands more than twice as heavy. The page ends
 *    up with a coherent split instead: this strip is typographic, the counter
 *    row at the foot of the page is icon-led.
 *
 *  - The tiles are a <ul>. Parallel claims with no order between them are a
 *    list, and it gives a screen reader the count up front.
 *
 * `value` and `label` are separate fields because only the first tile has both
 * ("35+" over "Years"); the other three carry the whole figure in `value` and
 * an empty `label`, which renders nothing rather than an empty line box.
 */
export function HomeTrustBadges() {
  return (
    <section aria-labelledby="home-trust-heading" className="px-[20px] pt-[60px] lg:pt-[80px]">
      {/* The strip is the whole section, so its name is visually hidden. */}
      <h2 id="home-trust-heading" className="sr-only">
        Why patients trust Derma Solutions
      </h2>

      {/*
        Four tiles divide evenly at every step — 1-up, 2x2, then 4-up — so no
        arrangement strands a tile alone on a row, which the hairline grid would
        make read as a mistake rather than a wrap.
      */}
      <ul className="mx-auto grid max-w-[1400px] grid-cols-1 gap-px overflow-hidden rounded-30 bg-divider sm:grid-cols-2 lg:grid-cols-4">
        {homeTrustBadges.badges.map(badge => (
          <li
            key={badge.id}
            // Each tile paints its own cream; the 1px grid gap lets the panel's
            // divider ground show through as the hairline between them, which
            // is what keeps the rules from doubling where tiles meet.
            className="flex flex-col items-center bg-secondary px-[24px] py-[36px] text-center lg:py-[44px]"
          >
            {/* Marcellus ships only 400, so this bold is browser-synthesised. */}
            <p className="font-display text-[28px] leading-[34px] font-bold text-primary lg:text-[36px] lg:leading-[44px]">
              {badge.value}
              {badge.label && (
                <>
                  {' '}
                  <span className="text-[22px] leading-[30px] lg:text-[28px] lg:leading-[36px]">
                    {badge.label}
                  </span>
                </>
              )}
            </p>

            <p className="mt-[12px] max-w-[260px] font-sans text-[15px] leading-[24px] text-body">
              {badge.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
