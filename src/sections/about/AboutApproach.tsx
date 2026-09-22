import { aboutApproach, assets } from '@/config/site'
import { LayersIcon, OpenHoursIcon, VennIcon } from '@/components/icons'
import { Eyebrow } from '@/components/Eyebrow'
import { Photo } from '@/components/Photo'
import { RevealWords } from '@/components/RevealWords'

/**
 * B3 — Our Approach. Built to
 * theme-reference/04-sections/31-transforming-beauty-with-precision-and-care/,
 * which appears on the demo's about-us page and nowhere else.
 *
 * That directory's computed.json holds only the outer container, so as with
 * HomeAbout every measurement here is read off its screenshot.png (1440x960).
 * The cream panel runs x 20-1419 (1400 wide, radius 30 top and bottom) and the
 * content box inside it is 1280, split 630 / 120 / 524.
 *
 * The columns are percentages of that content box rather than its raw pixels,
 * for the reason HomeAbout's comment gives: three fixed widths summing to the
 * container overflow on every viewport between lg and 1320.
 *
 * `lg:items-center` is measured, not assumed — the text column's centre falls
 * at 482.5 and the media column's at 489.5, against a panel centre of ~480.
 *
 * Two departures from the reference:
 *
 *  - THE CHIP IS THE CLINIC'S HOURS, NOT "24/7 SUPPORT". Part C of the content
 *    doc is explicit — "Template default replaced with clinic hours (9:30 AM –
 *    6:00 PM). Do not publish 24/7." The reference's chip is a tel: link with a
 *    phone-and-arrow mark; this one carries no phone number, so it is a plain
 *    <div> with the site's opening-hours mark and needs no focus ring.
 *  - The supporting photograph repeats the homepage's Why Choose Us band. The
 *    primary frame uses photography supplied specifically for this section.
 */
export function AboutApproach() {
  return (
    <section aria-labelledby="about-approach-heading" className="px-[20px]">
      <div className="mx-auto max-w-[1400px] rounded-30 bg-secondary px-[24px] py-[60px] lg:px-[60px] lg:py-[110px]">
        <div className="flex flex-col gap-[50px] lg:flex-row lg:items-center lg:gap-[9.375%]">
          {/* Text column — 630 of the 1280 content box. */}
          <div className="w-full min-w-0 lg:w-[49.219%] lg:shrink-0">
            <Eyebrow className="text-accent">{aboutApproach.eyebrow}</Eyebrow>

            {/*
              The gaps down this column (8 / 22 / 40) put the rendered glyph
              bands on the reference's: eyebrow 181-204, heading 224-272 and
              281-328, paragraph 355-397, card top 441. The 48/58 ramp is
              confirmed by the heading's measured 57px line pitch.
            */}
            <h2
              id="about-approach-heading"
              className="mt-[8px] max-w-[560px] font-display text-[32px] leading-[40px] text-primary md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            >
              <RevealWords text={aboutApproach.heading} />
            </h2>

            <p className="mt-[22px] font-sans text-[16px] leading-[26px] text-body">
              {aboutApproach.body}
            </p>

            {/*
              The white card: 630x338 at radius 30, 40px of padding, with a
              hairline between its two rows. The 44/40 either side of that rule
              is measured rather than rounded — row one's copy ends at 565, the
              rule sits at 610 and row two's disc starts at 651.

              These are <h3>s, unlike the contact label HomeAbout deliberately
              demotes to a <p>: each title has body copy under it, so it opens a
              subsection and belongs in the page's outline.
            */}
            <ul className="mt-[40px] rounded-30 bg-white p-[30px] lg:p-[40px]">
              {[aboutApproach.mission, aboutApproach.vision].map((item, index) => (
                <li
                  key={item.title}
                  className={
                    index === 0
                      ? 'flex gap-[20px]'
                      : 'mt-[44px] flex gap-[20px] border-t border-divider pt-[40px]'
                  }
                >
                  <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    {index === 0 ? (
                      <LayersIcon className="h-[34px] w-[34px]" />
                    ) : (
                      <VennIcon className="h-[34px] w-[34px]" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] leading-[31px] text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-[8px] font-sans text-[16px] leading-[26px] text-body">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/*
            Media column — 524 of the content box. The box IS the large frame
            (524x650 at (830,165)); the other two pieces are placed in
            percentages of it, so the composition scales as one thing.
          */}
          <div className="relative mx-auto w-full max-w-[524px] shrink-0 lg:mx-0 lg:w-[40.938%]">
            {/*
              The frame box. The chip is its sibling rather than its child: an
              aspect-ratio box gives an in-flow child no room, so on mobile — where
              the chip stacks instead of overhanging — it would paint on top of the
              photograph.
            */}
            <div className="relative aspect-[524/650] w-full">
              <Photo
                src={assets.aboutApproachImage}
                alt={assets.aboutApproachImageAlt}
                width={1122}
                height={1402}
                className="absolute inset-0 h-full w-full rounded-30"
              />

              {/*
                The pill frame, 222x375 at (770,465) — overhanging the large
                frame's left edge by 60px. It is a STADIUM, not an ellipse: 5px
                below its top edge the shape is 71px wide and at 35px it is 163,
                which fits a 111px corner radius (rounded-full clamps to exactly
                that) and not a 50% ellipse.

                The overhang is the reference's -11.45% only from lg. Below that
                the frame has the full column, and -11.45% of it carries the pill
                off the cream panel's left edge and onto the white page — so it
                eases to -4% and stays on the panel. Same easing, and the same
                reason, as AboutWhatWeDo's badge.

                TODO(content): repeats the homepage's Why Choose Us band.
              */}
              <Photo
                src={assets.whyChooseImage2}
                alt={assets.whyChooseImage2Alt}
                width={528}
                height={816}
                radiusClass="rounded-full"
                className="absolute left-[-4%] top-[46.154%] z-10 h-[57.692%] w-[42.366%] lg:left-[-11.45%]"
              />
            </div>

            {/*
              The hours chip: right-flush with the large frame and riding 49px
              above its top edge (x 1105-1353, y 116-212). Its inner disc samples
              (90,52,35) — white at 10% over the brown — so it is bg-white/10
              rather than a fourth colour.

              Below lg it rejoins the flow and stacks under the photographs: at
              that width the frame already reaches the 20px gutter, so the
              overhang would put the chip past the viewport edge.
            */}
            <div className="mt-[20px] flex items-center gap-[16px] rounded-16 bg-primary px-[22px] py-[18px] lg:absolute lg:right-0 lg:top-[-7.538%] lg:z-20 lg:mt-0 lg:min-w-[236px]">
              <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <OpenHoursIcon className="h-[22px] w-[22px]" />
              </span>
              <span className="block">
                <span className="block font-display text-[20px] leading-[26px] text-white">
                  {aboutApproach.chip.title}
                </span>
                <span className="block font-sans text-[16px] leading-[24px] font-semibold text-white">
                  {aboutApproach.chip.value}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
