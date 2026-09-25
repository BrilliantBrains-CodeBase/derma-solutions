/**
 * The image gallery's fourteen photographs and the video gallery's thirty-one
 * videos, with the copy both pages open with.
 *
 * Built to seo-backup/05-screenshots/{desktop,mobile}/{image,video}-gallery.png
 * for the copy and the running order, and to
 * theme-reference/07-screenshots/desktop/casestudy.png — the Glowix portfolio
 * archive — for the grids. That template is a page-header band, then a plain
 * grid of rounded tiles on 30px gutters in the 1300 container, then the footer.
 *
 * This table is the single source for both halves of the job, as
 * treatmentMedia.ts is for the treatment pages:
 * scripts/import-gallery-images.ts reads `from` to resize each file into
 * public/images/image-gallery/, and PhotoGallery reads `alt`, `pair` and the
 * path helpers below. So the file on disk and the words describing it cannot
 * drift apart.
 *
 * This module must not import videoTitles.generated.ts.
 * scripts/fetch-video-gallery.ts imports `galleryVideos` from here to know what
 * to fetch, and on a first run that generated module does not exist yet. The
 * title lookup therefore lives in the section, not here — the same split
 * scripts/blog-source.ts and src/content/blog/index.generated.ts already keep.
 *
 * ---------------------------------------------------------------------------
 * TODO(compliance): BLOCKING. Every photograph below is a patient under a
 * result claim, which is the category treatmentMedia.ts excluded from all 38
 * treatment pages pending signed consent, and which carries the same unresolved
 * note as assets.transformation1 on the homepage. Under DISHA and ASCI norms
 * these need written patient consent on file before launch. Nothing here blocks
 * the build; all of it blocks publishing.
 *
 * This set replaced the fourteen files pulled from the live site's WordPress
 * uploads, and closes most of what was wrong with them. It is a produced set:
 * uniform 2195x2195, one house BEFORE/AFTER label in the brand brown, and —
 * unlike the old set, where only two of fourteen were masked — an eye bar on
 * every face. Gone with it: the "Dr. Akhila" watermark that credited another
 * practitioner, a "Shot on OnePlus" watermark, an "immediately after" label
 * showing injectable swelling rather than a settled result, and a "permanent
 * makeup" case advertising a service absent from the clinic's own menu.
 *
 * Two things did NOT come out in the reprocessing, both visible in the frames:
 *
 *  1. Third-party clinic branding, in six of the ten. case-07 and case-09 carry
 *     the "FOLLICLE TRANSPLANT" board legibly; case-02, case-03, case-08 and
 *     case-10 carry partial versions of that or of a second board. site.ts
 *     already flags exactly this signage on homepage transformations 3 and 4.
 *     The schema's Physician `sameAs` does list neofollicletransplant.com, so
 *     this is plausibly Dr Sandeep's other brand rather than a competitor's
 *     room — but plausibly is not sign-off.
 *  2. case-04 still shows the "IUI ROOM" door plate — a fertility-clinic room,
 *     i.e. a third-party facility and an unrelated medical context appearing
 *     underneath dermatology result claims. It is the same patient the old set
 *     carried as case-21, recropped but not reframed.
 *
 * One lesser flag: case-03 and case-10 look like the same patient in the same
 * gown against the same wall. If they are one case shown twice, that is the
 * clinic's call to make, not this file's.
 * ---------------------------------------------------------------------------
 */

export interface GalleryPhoto {
  /**
   * Output filename stem. Derived from the legacy file rather than from display
   * order, so reordering the array never renames a file on disk.
   */
  id: string
  /**
   * `gallery:<file>` — the clinic's delivered set under content/gallery/.
   * `backup:<path under seo-backup/06-media/files>` still resolves, for a
   * photograph that has to come back from the live site's own uploads.
   */
  from: string
  /**
   * Describes what is in frame and nothing else. Never asserts an improvement:
   * naming one would make the photograph itself carry the claim. Same rule as
   * assets.transformation1Alt in src/config/site.ts.
   */
  alt: string
  /** How the pair is arranged inside the file. Drives the orienting figcaption. */
  pair: 'side-by-side' | 'stacked'
  /**
   * The file already carries the words Before and After in its pixels, so the
   * figcaption is suppressed — printing "Before" twice is what
   * HomeSeeTheDifference avoids by drawing no caption at all.
   */
  labelled?: true
  /**
   * Keeps the photograph out of the page while leaving it in the import. The
   * string is the reason, and clearing it is a one-line editorial change.
   * treatmentMedia.ts's `stock` flag, applied to a blocking concern.
   */
  hold?: string
}

export interface GalleryVideo {
  /** YouTube id, from seo-backup/01-raw-html/desktop/video-gallery.html, in DOM order. */
  id: string
  /** Set when oEmbed reports the video private, deleted or embedding-disabled. */
  retired?: true
}

/**
 * The photo renditions. Three columns inside the 1300 container is
 * (1300 − 20 − 2 × 30) / 3 ≈ 407 CSS px, so 820 is that at 2x.
 *
 * There is no frame and no fixed ratio: every photograph is written at its own
 * aspect and the tile takes whatever shape the file has. Nothing is cropped and
 * nothing is padded. Twelve of the fourteen sources are square within 2% anyway
 * — the only two that are not are case-screenshot-2023 (480x366) and case-04
 * (1103x1280) — so the grid still reads as even, with one shorter tile in it.
 *
 * The per-photograph output dimensions are not written here. They are generated
 * from the files the import script actually produces, into
 * src/content/gallery/photoSizes.generated.ts, because correct width/height on
 * the <img> is what reserves the right box before the pixels arrive, and a
 * hand-kept copy of fourteen pairs of numbers would drift the first time a
 * source was replaced.
 */
export const galleryPhotoWidth = 820
export const galleryPhotoSmall = 640

/** 16:9. The widest 2x poster any breakpoint needs is the sm tile's ~476px. */
export const galleryPosterSlot = { width: 960, height: 540 } as const

export const galleryPhotoPath = (id: string) => `/images/image-gallery/${id}.jpg`
export const galleryPhotoSmallPath = (id: string) => `/images/image-gallery/${id}-640.jpg`
export const galleryPosterPath = (id: string) => `/images/video-gallery/${id}.jpg`

/**
 * The clinic's own set, in the order it was delivered.
 *
 * Every one is side by side with BEFORE and AFTER burned into the frame, so
 * `labelled` is true throughout and PhotoGallery draws no orienting caption on
 * any of them — printing "Before" twice is what that caption exists to avoid.
 * `pair` is still recorded per row so that a future unlabelled addition gets
 * the right caption without anyone having to rediscover which way it reads.
 */
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'case-01',
    from: 'gallery:1.png',
    alt: "A woman with freckled skin and a dark headband photographed front-on twice, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-02',
    from: 'gallery:2.png',
    alt: "A woman photographed front-on twice showing her face and neck, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-03',
    from: 'gallery:3.png',
    alt: "A woman with auburn hair in a blue clinic gown photographed front-on twice, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-04',
    from: 'gallery:4.png',
    alt: "A woman photographed front-on twice in a clinic corridor, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-05',
    from: 'gallery:5.png',
    alt: "A woman photographed front-on twice against a dark studio backdrop, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-06',
    from: 'gallery:6.png',
    alt: "A man in a surgical cap and gown photographed front-on twice, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-07',
    from: 'gallery:7.png',
    alt: "A woman photographed front-on twice showing her forehead and hairline, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-08',
    from: 'gallery:8.png',
    alt: "A woman in a yellow dupatta photographed front-on twice, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-09',
    from: 'gallery:9.png',
    alt: "A man photographed front-on twice showing his forehead and hairline, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
  {
    id: 'case-10',
    from: 'gallery:10.png',
    alt: "A woman in a blue clinic gown photographed front-on twice against a clinic wall, the two shots side by side and labelled Before and After",
    pair: 'side-by-side',
    labelled: true,
  },
]

/**
 * The live page's thirty-one videos, in its own DOM order. Every one carried
 * `title=""` in the capture, which is why scripts/fetch-video-gallery.ts exists.
 */
export const galleryVideos: GalleryVideo[] = [
  { id: 'W7Fr__Kl9h8' },
  { id: 'MR-3Qr3tp5Q' },
  { id: 'ydpUy17jW4g' },
  { id: 'LK1wYIcTz1M' },
  { id: 'rHx7DxGfbyw' },
  { id: 'hKWTZ2DrzW4' },
  { id: 'Rch8b7ks0Zc' },
  { id: 'nATDXTx3tHQ' },
  { id: '9dEZEwr8ilo' },
  { id: 'XgQew-xeljQ' },
  { id: 'SzLoL0dg06g' },
  { id: 'J2XKGSEzVus' },
  { id: '0-oeVYW83SU' },
  { id: 'WeQX5aObgoI' },
  { id: '4iR9vPO5eZs' },
  { id: 'j9Ho9ZwBLf8' },
  { id: 'Y3pCtJgiKkY' },
  { id: 'WZ48GdTXiC4' },
  { id: 'DDrS93QmNls' },
  { id: 'QNnPTqgcS0o' },
  { id: 'DncpVBmxe4o' },
  { id: 'yU7n9-_fmuU' },
  { id: 'kWTfcLZn9P4' },
  { id: 'xW3z8MGFP3k' },
  { id: 'Y6xGP08PbYY' },
  { id: 'TgTSXNawpTk' },
  { id: 'O0uabxKnca4' },
  { id: 'ozYrnBvtUc0' },
  { id: 'ts6MmJRL_LU' },
  { id: 'iiKLDPslOm8' },
  { id: 'BFrppIV2mXE' },
]

/**
 * Replaces YouTube's own title where it arrives with channel boilerplate,
 * hashtags or emoji in it. The same escape hatch blog-source.ts keeps for alts,
 * and the reason the titles module can stay a DO-NOT-EDIT generated file.
 */
export const videoTitleOverrides: Record<string, string> = {
  // All thirty-one are overridden, which is unusual for an escape hatch and is
  // the point of having one. YouTube's own titles are keyword-stuffed for search
  // — pipe-separated repetitions of the same phrase, trailing hashtags, one
  // dangling "|" — e.g. "Get Rid of Facial Hair with this Hair Removal | Laser
  // Hair Removal | Laser Hair Reduction Bangalore". As <h3>s under one <h2> that
  // reads as spam to a visitor and as thirty-one near-duplicate headings to a
  // crawler. These say the same thing once.
  //
  // The generated file keeps YouTube's originals, so re-running the fetch never
  // silently changes what the page says.
  W7Fr__Kl9h8: "Laser Hair Removal for Facial Hair",
  'MR-3Qr3tp5Q': "HIFU Skin and Body Tightening",
  ydpUy17jW4g: "ND:YAG Q-Switch Laser Toning",
  LK1wYIcTz1M: "Upper Lip Laser Hair Reduction",
  rHx7DxGfbyw: "Laser Hair Reduction on the Face",
  hKWTZ2DrzW4: "Botox and Dermal Fillers",
  Rch8b7ks0Zc: "A Botox and Filler Treatment, Step by Step",
  nATDXTx3tHQ: "Laser Hair Removal at Derma Solutions",
  '9dEZEwr8ilo': "Body Contouring: Cavitation, Fat Freezing and RF Tightening",
  'XgQew-xeljQ': "Inside the Clinic with Our Skin and Hair Specialists",
  SzLoL0dg06g: "A Chemical Peel, Start to Finish",
  J2XKGSEzVus: "Full Body Laser Hair Removal",
  '0-oeVYW83SU': "Chemical Peel for Pigmentation and Rejuvenation",
  WeQX5aObgoI: "Vitiligo Surgery: Melanocyte Transplantation",
  '4iR9vPO5eZs': "Thread Lifts and Dermal Fillers",
  j9Ho9ZwBLf8: "How a HydraFacial Works",
  Y3pCtJgiKkY: "Radiofrequency Skin Tightening",
  WZ48GdTXiC4: "HIFU for Skin Tightening",
  DDrS93QmNls: "Laser Wart and Mole Removal",
  QNnPTqgcS0o: "Our Laser Treatments Explained",
  DncpVBmxe4o: "Under-Eye Dermal Fillers",
  'yU7n9-_fmuU': "Laser Hair Reduction",
  kWTfcLZn9P4: "CO2 Laser for Acne Scars",
  xW3z8MGFP3k: "Lip Filler Treatment",
  Y6xGP08PbYY: "Cheek Fillers for Smile Lines",
  TgTSXNawpTk: "Hair Transplant: The Procedure and the Result",
  O0uabxKnca4: "Laser Birthmark Removal",
  ozYrnBvtUc0: "Laser Treatment for Pigmentation and Dark Spots",
  'ts6MmJRL_LU': "Thread Lift for Nose Correction",
  iiKLDPslOm8: "Fractional CO2 Laser",
  BFrppIV2mXE: "Vitiligo Treatment: Melanocyte Transplant",
}

/**
 * Both pages' copy, verbatim from seo-backup/02-markdown/. The live pages set
 * these headings as <h3>; here they are <h2>, because PageShell owns the only
 * H1 on the page and a page may not author heading text of its own.
 */
export const galleryCopy = {
  imageGallery: {
    heading:
      "See the remarkable results achieved at Derma Solutions with expert care by Dr. Sandeep Mahapatra.",
    paragraphs: [
      "Explore our gallery showcasing real before-and-after transformations of patients who have trusted us for their skin, hair, and cosmetic concerns. From clear, radiant skin to natural hair restoration, these images highlight the exceptional results delivered by Dr. Mahapatra and the team at Derma Solutions.",
      "Each transformation is a testament to our commitment to personalized care, advanced technology, and patient satisfaction. Let these images inspire you to take the next step toward achieving your aesthetic and dermatological goals.",
    ],
  },
  videoGallery: {
    heading: "Transformations and Procedures by Dr. Sandeep Mahapatra",
    lead: "See the expert care and precision in action with videos of our advanced dermatology and cosmetic procedures.",
    paragraphs: [
      "Witness the expertise of Dr. Sandeep Mahapatra, the best dermatologist in Bangalore, as he performs a range of clinical, cosmetic, and surgical procedures at Derma Solutions. Our video gallery showcases real treatments and patient transformations, giving you an inside look at the care and precision that go into every procedure.",
    ],
    /** Used only if a title is missing, which means the fetch has not been run. */
    fallbackTitle: "Derma Solutions procedure video",
  },
} as const
