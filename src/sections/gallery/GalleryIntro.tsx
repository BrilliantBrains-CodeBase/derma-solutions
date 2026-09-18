/**
 * The copy band both gallery pages open with, between the page-header and the
 * grid.
 *
 * Built to seo-backup/05-screenshots/desktop/{image,video}-gallery.png: a
 * centred column of a subheading and one or two paragraphs. The theme's
 * portfolio archive (theme-reference/07-screenshots/desktop/casestudy.png) has
 * no such band — it goes straight from the header to the tiles — so this is a
 * departure from the theme in order to keep the live pages' copy, which is what
 * their <title> and description are drawn from.
 *
 * One component for two pages because they are siblings with the same shape and
 * no per-page geometry; only the video page passes `lead`.
 *
 * The heading is an <h2>, not the live pages' <h3>. PageShell owns the only H1
 * and a page cannot author heading text, so the section beneath it starts at 2.
 * The type steps down from HomeSeeTheDifference's 48px <h2> to 32px because
 * this one sits directly under PageHeader's 52px H1 rather than opening a band
 * of its own.
 */
export function GalleryIntro({
  id,
  heading,
  lead,
  paragraphs,
}: {
  id: string
  heading: string
  /** The video page's one-line summary above its body copy. */
  lead?: string
  paragraphs: readonly string[]
}) {
  return (
    <div className="mx-auto max-w-[860px] text-center">
      <h2
        id={id}
        className="text-balance font-display text-[24px] leading-[34px] text-primary md:text-[28px] md:leading-[38px] lg:text-[32px] lg:leading-[44px]"
      >
        {heading}
      </h2>

      {lead && (
        <p className="mt-[20px] font-sans text-[17px] leading-[29px] text-primary md:text-[18px] md:leading-[30px]">
          {lead}
        </p>
      )}

      <div className="mt-[20px] flex flex-col gap-[18px]">
        {paragraphs.map(paragraph => (
          <p key={paragraph.slice(0, 32)} className="font-sans text-[16px] leading-[26px] text-body">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
