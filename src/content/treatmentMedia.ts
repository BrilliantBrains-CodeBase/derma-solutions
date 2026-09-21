/**
 * The featured photograph and video poster for each treatment page, keyed by
 * the page's registry slug.
 *
 * This table is the single source for both halves of the job:
 * scripts/import-treatment-images.ts reads `from` to crop and resize each file
 * into public/images/treatments/, and the page reads `alt` and the output paths
 * below. So the file on disk and the words describing it cannot drift apart.
 *
 * Sources, in order of preference:
 *
 *  - `clinic:` — the clinic's own shoot, the same 1536x1024 photography the
 *    homepage uses (HOME_IMAGES in scripts/import-home-images.ts). Used wherever
 *    one of its frames fits the treatment, because it is the only photography at
 *    anything like the slot's resolution.
 *  - `backup:` — the photograph the live page itself used, from
 *    seo-backup/06-media/files. Most are 650x450 or 512x512 stock.
 *  - `public:` — an asset already in public/, for the few pages with nothing
 *    usable of their own.
 *
 * What was deliberately NOT used, per the content doc
 * (content/Treatment/Derma-Solutions-All-Treatment-Pages-Content.md):
 *
 *  - Before/after composites, as the page's single featured image. Eight pages
 *    do carry the live site's own before/after PAIRS in a comparison slider —
 *    see `compare` below and BeforeAfterSlider — but note 8's requirements
 *    (signed consent, a "Results vary" line on the image) apply there, and the
 *    line is burned into that frame.
 *  - Darker-vs-lighter imagery on Skin Lightening (Cosmetology note 5).
 *  - The IV Glutathione page's Gemini-generated images (Anti-Ageing note 3), and
 *    the Weight Loss page's ChatGPT-generated images and "Rx Only" vial shot
 *    (the doc's video brief: "no product shots").
 *
 * TODO(assets): content doc note 8 — "use only real clinic photos". Every
 * `backup:` entry below is live-site stock or AI imagery standing in until the
 * clinic shoots these treatments; the `stock` flag marks them. Replace them and
 * re-run `npm run assets:treatments`.
 *
 * Videos: `youtubeId` is the clinic's own YouTube video for the treatment.
 * Where the old page embedded one (seo-backup/01-raw-html, a lazy-loaded
 * i.ytimg.com thumbnail rather than an iframe), that video is used; where it
 * embedded several, the one most on-topic. Otherwise the pick is by title from
 * the videos the old blog posts and video gallery embedded — every ID in the
 * capture was resolved to its title through YouTube's oEmbed endpoint. Each
 * entry names its source and the video's title.
 *
 * TODO(content): eleven pages have no on-topic video anywhere in the capture
 * and fall back to treatmentFallbackYoutubeId below — the plastic surgery
 * pages (abdominoplasty, breast, liposuction, rhinoplasty), the IV and weight
 * loss pages, and microdermabrasion, phototherapy, PDRN and hair analysis. Ask
 * the clinic for a video for each. Each page's generated content module
 * (src/content/treatments/<slug>.ts) records the video the doc asks for.
 *
 * TODO(compliance): YouTube shows a video's own title once it plays, and many
 * of these say "Best …" — the word the content doc removed from the copy for
 * ASCI. The skin boosters video's title also names a booster brand (doc note
 * 6). Retitling is the clinic's to do on YouTube.
 *
 * Review flags carried from the doc's "CHECK BEFORE THIS GOES LIVE" notes —
 * none of these block the build, all of them block publishing:
 *
 *  - TODO(compliance): doctor/legal review before publishing — Dermato Surgery
 *    (Cosmetology note 4), IV Glutathione (Anti-Ageing note 3), Weight / Fat
 *    Loss Injections (Anti-Ageing note 5, Drugs and Magic Remedies Act),
 *    Vitiligo (Cosmetic Surgeries note 4) and Phototherapy (note 3).
 *  - TODO(compliance): client sign-off on the "Botox" brand name (Anti-Ageing
 *    note 1) and the "CoolSculpting" trademark (Cosmetic Surgeries note 2).
 *  - TODO(content): Skin Lightening — the doc recommends renaming the H1 to
 *    "Pigmentation & Skin Lightening Treatment". H1s are held to the live
 *    capture (scripts/build-seo-registry.ts, H1_OVERRIDES), so this is a
 *    ranking trade the client has to make, not a copy edit.
 *  - TODO(content): confirm which surgeon performs each cosmetic surgery
 *    (Cosmetic Surgeries note 1) and the thread-lift duration (Anti-Ageing
 *    note 6).
 *  - Not built, by decision: price tables (Cosmetology note 3) and FAQPage
 *    schema (note 10) — the JSON-LD ships byte-verbatim from the capture.
 */

export interface MediaSource {
  /** `clinic:<path>`, `backup:<path>` or `public:<path>` — see above. */
  from: string
  alt: string
  /** sharp's crop anchor. Defaults to 'attention', which finds the subject in most frames. */
  position?: string
  /** Live-site stock or AI imagery, pending clinic photography. */
  stock?: true
}

export interface TreatmentMedia {
  image: MediaSource
  video: MediaSource
  youtubeId?: string
  /**
   * A before/after pair for the first image slot, which the old Derma
   * Solutions site opened these pages with — see BeforeAfterSlider. Only the
   * eight pages that carried the widget have one; the rest render `image`.
   *
   * Both frames are cropped with the same anchor (the import script forces
   * 'centre' unless told otherwise) so the two line up under the divider.
   *
   * `mirror` flips both frames horizontally. The slider reads left-to-right —
   * before on the left, after on the right — so a pair whose subject sits on
   * the right of the photo puts the untreated skin under the "After" label and
   * reads backwards. Flipping both keeps them registered with each other.
   */
  compare?: { before: MediaSource; after: MediaSource; mirror?: true }
}

/** The two slots' shapes, measured off theme-reference's service page at 1440: 847x505 and 847x380. */
export const treatmentImageSlot = { width: 847, height: 505 } as const
export const treatmentVideoSlot = { width: 847, height: 380 } as const
/** The supplied WorkDrive artwork is 5294x1763 (almost exactly 3:1). */
export const treatmentBannerSlot = { width: 847, height: 282 } as const
/** Centre panel only, so the banner's baked-in message stays readable on phones. */
export const treatmentBannerMobileSlot = { width: 1440, height: 1440 } as const

export const treatmentImagePath = (slug: string) => `/images/treatments/${slug}.jpg`
export const treatmentVideoPosterPath = (slug: string) => `/images/treatments/${slug}-video.jpg`
export const treatmentComparePath = (slug: string, side: 'before' | 'after') =>
  `/images/treatments/${slug}-${side}.jpg`
export const treatmentBannerPath = (slug: string) => `/images/treatments/${slug}-banner.webp`
export const treatmentBannerSmallPath = (slug: string) => `/images/treatments/${slug}-banner-847.webp`
export const treatmentBannerMobilePath = (slug: string) => `/images/treatments/${slug}-banner-mobile.webp`

/**
 * For a page with no on-topic video: the clinic's general introduction, "Best
 * Dermatologist | skin treatment clinic | Skin Specialist Doctor | Hair
 * Dermatologist". Not homeVideo — that is a Botox explainer, which is what every
 * treatment page used to play.
 */
export const treatmentFallbackYoutubeId = 'XgQew-xeljQ'

export const treatmentYoutubeId = (slug: string) => treatmentMedia[slug]?.youtubeId ?? treatmentFallbackYoutubeId

/**
 * One client-supplied banner per treatment page. The explicit slug-to-file map
 * keeps similarly named routes (Skin Tightening / RF / HIFU, for example) from
 * relying on fuzzy filename matching. scripts/import-treatment-images.ts
 * verifies this table against every generated treatment content module.
 */
export const treatmentBannerSources: Record<string, string> = {
  'acne-scar-treatment-in-bangalore': 'Acne Scar Treatment.png',
  'mnrf-treatment-in-bangalore-microneedling-with-radio-frequency': 'MNRF Treatment.png',
  'best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore': 'HydraFacial Treatment.png',
  'hollywood-facial-carbon-laser-peel-bangalore': 'Hollywood Facial.png',
  'chemical-peel-treatment-in-bangalore': 'Chemical Peels.png',
  'skin-boosters-treatment-in-bangalore': 'Skin Boosters.png',
  'salmon-sperm-pdrn-facial-in-bangalore': 'Salmon Sperm PDRN Facial.png',
  'microdermabrasion-treatment-in-bangalore': 'Microdermabrasion Treatment.png',
  'skin-lightening-treatment-in-bangalore': 'Skin Lightening.png',
  'dermato-surgery-in-bangalore': 'Dermato Surgery.png',
  'laser-hair-removal-in-bangalore': 'Laser Hair Removal.png',
  'laser-toning-treatment-in-bangalore': 'Laser Skin Toning.png',
  'fractional-co2-laser-skin-resurfacing-in-bangalore': 'CO2 Fractional Laser.png',
  'mole-removal-treatment-in-bangalore': 'Mole Removal.png',
  'warts-removal-treatment-in-bangalore': 'Wart Removal.png',
  'botox-treatment-in-bangalore-whitefield-and-marathahalli': 'Botox.png',
  'dermal-fillers-treatment-bangalore': 'Dermal Fillers Treatment.png',
  'skin-tightening-treatment-in-marathahalli-whitefield': 'Skin Tightening.png',
  'radio-frequency-skin-tightening-treatment': 'Radio Frequency Treatment.png',
  'hifu-treatment-in-bangalore': 'HIFU Treatment.png',
  'thread-lifts': 'Thread Lifts.png',
  'iv-glutathione-treatment-in-bangalore': 'IV Glutathione Treatment.png',
  'nad-iv-drips-treatment-in-bangalore': 'NAD IV Drips.png',
  'weight-loss-injections-in-bangalore': 'Weight _ Fat Loss Injections.png',
  'xanthelasma-removal-treatment-in-bangalore': 'Xanthelasma Removal.png',
  'cryolipolysis-coolsculpting-in-bangalore': 'Cryolipolysis - CoolSculpting.png',
  'ear-lobe-repair-surgery-in-bangalore': 'Ear Lobe Repair Surgery.png',
  'abdominoplasty-tummy-tuck-treatment-in-bangalore': 'Abdominoplasty (Tummy Tuck).png',
  'rhinoplasty-surgery-in-bangalore': 'Rhinoplasty Surgery.png',
  'vitiligo-laser-treatment-in-bangalore': 'Vitiligo Treatment.png',
  'breast-surgeries-in-bangalore': 'Breast Surgeries.png',
  'phototherapy-treatment-in-bangalore': 'Phototherapy Treatment.png',
  'liposuction-treatment-in-bangalore': 'Liposuction.png',
  'gynecomastia-surgery-in-bangalore': 'Gynecomastia Surgery.png',
  'hair-transplant-in-bangalore-marathahalli-whitefield': 'Hair Transplant.png',
  'gfc-hair-treatment-in-bangalore': 'GFC Hair Treatment.png',
  'best-hair-loss-treatment-in-bangalore': 'Hair loss.png',
  'hair-analysis-in-bangalore': 'Hair Analysis.png',
}

/**
 * Portrait artwork supplied for the opening-hours card in the treatment
 * sidebar. WorkDrive-6 does not contain an exact image for every one of the 38
 * pages, so the unmatched pages deliberately reuse the closest relevant
 * supplied treatment rather than falling back to the old reception photo.
 */
export interface TreatmentSidebarMedia {
  from: string
  alt: string
}

export const treatmentSidebarImageSlot = { width: 766, height: 936 } as const
export const treatmentSidebarImagePath = (slug: string) =>
  `/images/treatments/${slug}-sidebar.webp`

const sidebarAssets = {
  acne: { from: 'Acne Scar Treatment.png', alt: 'Microneedling treatment on a patient’s cheek' },
  botox: { from: 'Botox.png', alt: 'Injectable facial treatment on a patient’s cheek' },
  co2: { from: 'CO2 Fractional Laser.png', alt: 'Fractional laser treatment on a patient’s cheek' },
  chemicalPeel: { from: 'Chemical Peels.png', alt: 'Chemical peel being applied to a patient’s face' },
  cryolipolysis: { from: 'Cryolipolysis - CoolSculpting.png', alt: 'Body-contouring applicator on a patient’s abdomen' },
  dermatoSurgery: { from: 'Dermato Surgery.png', alt: 'Clinician assessing a patient’s cheek before a procedure' },
  dermatoSurgeryAlt: { from: 'Dermato Surgery (2).png', alt: 'Clinician preparing a patient for a minor skin procedure' },
  gfc: { from: 'GFC Hair Treatment.png', alt: 'Growth-factor treatment being administered to the scalp' },
  hairTransplant: { from: 'Hair Transplant.png', alt: 'Hair restoration procedure performed under magnification' },
  hollywoodFacial: { from: 'Hollywood Facial.png', alt: 'Carbon mask being applied during a Hollywood facial' },
  hydrafacial: { from: 'HydraFacial Treatment.png', alt: 'HydraFacial handpiece being used on a patient’s face' },
  laserHairRemoval: { from: 'Laser Hair Removal.png', alt: 'Laser hair removal treatment on a patient’s underarm' },
  laserToning: { from: 'Laser Skin Toning.png', alt: 'Laser toning treatment on a patient’s cheek' },
  laser: { from: 'Laser Treatment.png', alt: 'Laser treatment being performed on a patient’s face' },
  mnrf: { from: 'MNRF Treatment.png', alt: 'Microneedling radiofrequency treatment on a patient’s cheek' },
  microdermabrasion: { from: 'Microdermabrasion Treatment.png', alt: 'Microdermabrasion treatment on a patient’s face' },
  mole: { from: 'Mole Removal.png', alt: 'Clinician treating small facial moles' },
  radioFrequency: { from: 'Radio Frequency Treatment.png', alt: 'Radiofrequency skin treatment on a patient’s cheek' },
  rhinoplasty: { from: 'Rhinoplasty Surgery.png', alt: 'Clinician assessing a patient’s nose' },
  salmonPdrn: { from: 'Salmon Sperm PDRN Facial.png', alt: 'PDRN facial treatment on a patient’s cheek' },
  skinBoosters: { from: 'Skin Boosters.png', alt: 'Skin booster treatment being applied to a patient’s face' },
  skinLightening: { from: 'Skin Lightening.png', alt: 'Skin-brightening treatment on a patient’s face' },
  skinTightening: { from: 'Skin Tightening.png', alt: 'Skin-tightening treatment along a patient’s jawline' },
  wart: { from: 'Wart Removal.png', alt: 'Clinician treating a small facial skin growth' },
  weightLoss: { from: 'Weight  Fat Loss Injections.png', alt: 'Patient measuring her waist during a medically supervised weight-loss program' },
  xanthelasma: { from: 'Xanthelasma Removal.png', alt: 'Clinician treating the area below a patient’s eye' },
} satisfies Record<string, TreatmentSidebarMedia>

export const treatmentSidebarMedia: Record<string, TreatmentSidebarMedia> = {
  'acne-scar-treatment-in-bangalore': sidebarAssets.acne,
  'mnrf-treatment-in-bangalore-microneedling-with-radio-frequency': sidebarAssets.mnrf,
  'best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore': sidebarAssets.hydrafacial,
  'hollywood-facial-carbon-laser-peel-bangalore': sidebarAssets.hollywoodFacial,
  'chemical-peel-treatment-in-bangalore': sidebarAssets.chemicalPeel,
  'skin-boosters-treatment-in-bangalore': sidebarAssets.skinBoosters,
  'salmon-sperm-pdrn-facial-in-bangalore': sidebarAssets.salmonPdrn,
  'microdermabrasion-treatment-in-bangalore': sidebarAssets.microdermabrasion,
  'skin-lightening-treatment-in-bangalore': sidebarAssets.skinLightening,
  'dermato-surgery-in-bangalore': sidebarAssets.dermatoSurgery,
  'laser-hair-removal-in-bangalore': sidebarAssets.laserHairRemoval,
  'laser-toning-treatment-in-bangalore': sidebarAssets.laserToning,
  'fractional-co2-laser-skin-resurfacing-in-bangalore': sidebarAssets.co2,
  'mole-removal-treatment-in-bangalore': sidebarAssets.mole,
  'warts-removal-treatment-in-bangalore': sidebarAssets.wart,
  'botox-treatment-in-bangalore-whitefield-and-marathahalli': sidebarAssets.botox,
  'dermal-fillers-treatment-bangalore': sidebarAssets.botox,
  'skin-tightening-treatment-in-marathahalli-whitefield': sidebarAssets.skinTightening,
  'radio-frequency-skin-tightening-treatment': sidebarAssets.radioFrequency,
  'hifu-treatment-in-bangalore': sidebarAssets.skinTightening,
  'thread-lifts': sidebarAssets.dermatoSurgeryAlt,
  'iv-glutathione-treatment-in-bangalore': sidebarAssets.weightLoss,
  'nad-iv-drips-treatment-in-bangalore': sidebarAssets.weightLoss,
  'weight-loss-injections-in-bangalore': sidebarAssets.weightLoss,
  'xanthelasma-removal-treatment-in-bangalore': sidebarAssets.xanthelasma,
  'cryolipolysis-coolsculpting-in-bangalore': sidebarAssets.cryolipolysis,
  'ear-lobe-repair-surgery-in-bangalore': sidebarAssets.dermatoSurgeryAlt,
  'abdominoplasty-tummy-tuck-treatment-in-bangalore': sidebarAssets.cryolipolysis,
  'rhinoplasty-surgery-in-bangalore': sidebarAssets.rhinoplasty,
  'vitiligo-laser-treatment-in-bangalore': sidebarAssets.laser,
  'breast-surgeries-in-bangalore': sidebarAssets.dermatoSurgeryAlt,
  'phototherapy-treatment-in-bangalore': sidebarAssets.laser,
  'liposuction-treatment-in-bangalore': sidebarAssets.cryolipolysis,
  'gynecomastia-surgery-in-bangalore': sidebarAssets.dermatoSurgeryAlt,
  'hair-transplant-in-bangalore-marathahalli-whitefield': sidebarAssets.hairTransplant,
  'gfc-hair-treatment-in-bangalore': sidebarAssets.gfc,
  'best-hair-loss-treatment-in-bangalore': sidebarAssets.gfc,
  'hair-analysis-in-bangalore': sidebarAssets.hairTransplant,
}

export const treatmentMedia: Record<string, TreatmentMedia> = {
  /* ---- Cosmetology ------------------------------------------------------ */
  'acne-scar-treatment-in-bangalore': {
    image: { from: 'clinic:SERVICES/Cosmetology 2.png', alt: 'Dermatologist applying a skin treatment to a patient at Derma Solutions' },
    video: { from: 'clinic:SERVICES/Advanced Facials.png', alt: 'Skin treatment session at Derma Solutions' },
    // old page: “Laser Scar Removal Treatment | CO2 laser Treatment | Acne Scar Removal in Bangalore | Derma Solution”
    youtubeId: 'kWTfcLZn9P4',
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2025/01/Acne-Before-Pic-depo.jpg', alt: 'Cheek with active acne and acne scarring, before treatment', stock: true },
      after: { from: 'backup:2025/01/acne-after-pic-depo.jpg', alt: 'The same cheek with clearer, smoother skin after treatment', stock: true },
    },
  },
  'mnrf-treatment-in-bangalore-microneedling-with-radio-frequency': {
    image: { from: 'backup:2025/01/MNRF-Machine-Image.jpg', alt: 'MNRF microneedling radiofrequency machine', position: 'centre' },
    video: { from: 'clinic:SERVICES/Anti aging 1.png', alt: 'Skin rejuvenation treatment at Derma Solutions' },
    // old page, first of two: “MNRF skin treatment in Bangalore | mnrf treatment before and after | laser dark spot removal | #mnrf”
    youtubeId: 'eSZSi7NtSW8',
  },
  'best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore': {
    image: { from: 'clinic:SERVICES/Advanced Facials.png', alt: 'HydraFacial-style facial treatment at Derma Solutions' },
    video: { from: 'backup:2024/12/HydraFacial-Treatment-Depo_91808732.jpg', alt: 'HydraFacial handpiece on a patient’s face', stock: true },
    // old page: “How does HydraFacial treatment work? | HydraFacial Treatment #hydrafacial #hydrafacialtreatment”
    youtubeId: 'j9Ho9ZwBLf8',
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2025/01/Hydrafacial-before-cnv.jpg', alt: 'Dull, congested facial skin before a HydraFacial', stock: true },
      after: { from: 'backup:2025/01/Hydrafacial-after-cnv.jpg', alt: 'Brighter, hydrated facial skin after a HydraFacial', stock: true },
    },
  },
  'hollywood-facial-carbon-laser-peel-bangalore': {
    image: { from: 'backup:2025/01/Hollywood-facial-cnv.jpg', alt: 'Carbon laser peel with a carbon mask on the face', stock: true },
    video: { from: 'clinic:SERVICES/Laser treatment.png', alt: 'Laser skin treatment at Derma Solutions' },
    // old dermatologist profile page: “Different Laser Treatment Solutions | Laser Treatment for skin issues | Derma Solutions”
    youtubeId: 'QNnPTqgcS0o',
  },
  'chemical-peel-treatment-in-bangalore': {
    image: { from: 'clinic:About us/Chemical Peels 1.png', alt: 'Dermatologist applying a chemical peel at Derma Solutions' },
    video: { from: 'backup:2025/01/Woman-Chemical-Peel.jpg', alt: 'Chemical peel being brushed onto the face', stock: true },
    // old page: “Chemical Peel for Skin Rejuvenation | Chemical Peel For Pigmentation | Derma Solutions #chemicalpeel”
    youtubeId: '0-oeVYW83SU',
  },
  'skin-boosters-treatment-in-bangalore': {
    image: { from: 'backup:2025/12/Skin-Boosters-Treatment.png', alt: 'Skin booster micro-injection treatment', stock: true },
    video: { from: 'backup:2025/12/Derma-SKin-Booster-Injection.png', alt: 'Skin booster injection on the cheek', stock: true },
    // skin boosters blog post: “Skin Boosters: Behind the scenes of a Profhilo Treatment! Derma Solutions clinic, Bengaluru #bts”
    youtubeId: 'wKYTN2d3SFk',
  },
  'salmon-sperm-pdrn-facial-in-bangalore': {
    image: { from: 'clinic:SERVICES/Anti aging 1.png', alt: 'Regenerative facial treatment at Derma Solutions' },
    video: { from: 'backup:2025/01/Indian-Woman-Face-close-up.jpg', alt: 'Close-up of a woman with smooth, even-toned skin', stock: true },
  },
  'microdermabrasion-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Woman-Microdermabrasion.jpg', alt: 'Microdermabrasion session on the face', stock: true },
    video: { from: 'clinic:SERVICES/Advanced Facials.png', alt: 'Facial exfoliation treatment at Derma Solutions' },
  },
  'skin-lightening-treatment-in-bangalore': {
    // The doc's brief: "Dermatologist assessing pigmentation."
    image: { from: 'backup:2025/12/Indian-Woman-with-Dermatologist.png', alt: 'Dermatologist consulting a patient about pigmentation', stock: true },
    video: { from: 'clinic:SERVICES/Laser treatment.png', alt: 'Laser toning treatment at Derma Solutions' },
    // old laser toning page; the old skin lightening page reused the chemical peel video: “Laser Pigmentation treatment Bangalore | laser treatment for dark spots | laser dark spot removal”
    youtubeId: 'ozYrnBvtUc0',
  },
  'dermato-surgery-in-bangalore': {
    // The doc's brief names this photograph.
    image: { from: 'backup:2025/01/Dr-Sandeep-Mahapatra-4.jpg', alt: 'Dr Sandeep Mahapatra at Derma Solutions' },
    video: { from: 'clinic:WHY CHOOSE US/DR. Sandeep treatment.png', alt: 'Dr Sandeep Mahapatra performing a laser treatment on a patient' },
    // old mole removal page; the doc points at Dr Sandeep's procedure videos: “Wart & Mole Removal | Laser Mole Removal | Mole Removal Treatment | Mole Removal Result #moleremove”
    youtubeId: 'DDrS93QmNls',
  },

  /* ---- Laser ------------------------------------------------------------ */
  'laser-hair-removal-in-bangalore': {
    image: { from: 'backup:2024/12/Untitled-design-3.png', alt: 'Laser hair removal on the underarm', stock: true },
    video: { from: 'clinic:SERVICES/Laser treatment.png', alt: 'Laser treatment at Derma Solutions' },
    // video gallery: “Laser Hair Removal in Bangalore India | Full body laser hair removal | Laser hair removal clinic”
    youtubeId: 'J2XKGSEzVus',
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2024/12/Woman-with-hairs-on-armpits-cnv.jpg', alt: 'Underarm with unwanted hair before laser hair removal', stock: true },
      after: { from: 'backup:2024/12/Women-with-cleam-armpits-after-Laser-Hair-removal.jpg', alt: 'Smooth underarm after laser hair removal', stock: true },
    },
  },
  'laser-toning-treatment-in-bangalore': {
    image: { from: 'clinic:SERVICES/Laser treatment.png', alt: 'Laser skin toning treatment at Derma Solutions' },
    video: { from: 'backup:2024/12/Woman-Laser-Skin-Toning.jpg', alt: 'Laser toning handpiece on the face', stock: true },
    // old page, first of two: “Secret To Flawless Skin? | ND YAG Q-Switch Laser Toning | Laser Treatment | Facial Laser Toning”
    youtubeId: 'ydpUy17jW4g',
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2024/12/Woman-Face-Pigmentation-Before.jpg', alt: 'Facial pigmentation and dark spots before laser toning', stock: true },
      after: { from: 'backup:2024/12/Woman-Face-Pigmentation-After.jpg', alt: 'More even skin tone after laser toning', stock: true },
    },
  },
  'fractional-co2-laser-skin-resurfacing-in-bangalore': {
    image: { from: 'clinic:WHY CHOOSE US/DR. Sandeep treatment.png', alt: 'Dr Sandeep Mahapatra performing a laser skin treatment' },
    video: { from: 'backup:2025/01/Skin-Tightening-1.jpg', alt: 'Woman examining her skin in a mirror', stock: true },
    // video gallery: “Fractional CO2 Laser”
    youtubeId: 'iiKLDPslOm8',
  },
  'mole-removal-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Doctor-removing-a-mole.jpg', alt: 'Doctor removing a mole', stock: true },
    video: { from: 'backup:2025/01/Mole-Removal-cnv.jpg', alt: 'Mole on the shoulder being examined', stock: true },
    // old page: “Wart & Mole Removal | Laser Mole Removal | Mole Removal Treatment | Mole Removal Result #moleremove”
    youtubeId: 'DDrS93QmNls',
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2025/01/Mole-Removal-Before-cnv.jpg', alt: 'Mole on the back being examined before removal', stock: true },
      after: { from: 'backup:2025/01/Mole-Removal-After-cnv.jpg', alt: 'The same area of the back after mole removal', stock: true },
      // The mole and the examining hand sit on the right of the source photo,
      // under the "After" label; mirrored, they land on the "Before" side.
      mirror: true,
    },
  },
  'warts-removal-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Mole-Removal-cnv.jpg', alt: 'Skin growth being examined before removal', stock: true },
    video: { from: 'backup:2025/01/Doctor-removing-a-mole.jpg', alt: 'Doctor removing a skin growth', stock: true },
    // old page; same video as mole removal: “Wart & Mole Removal | Laser Mole Removal | Mole Removal Treatment | Mole Removal Result #moleremove”
    youtubeId: 'DDrS93QmNls',
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2025/01/Warts-on-face-Before-depo.jpg', alt: 'Raised growth on the jawline before removal', stock: true },
      after: { from: 'backup:2025/01/Warts-on-face-After-depo.jpg', alt: 'Clear jawline after removal', stock: true },
    },
  },

  /* ---- Anti-Ageing ------------------------------------------------------ */
  'botox-treatment-in-bangalore-whitefield-and-marathahalli': {
    image: { from: 'clinic:SERVICES/Anti aging 1.png', alt: 'Anti-wrinkle injection treatment at Derma Solutions' },
    video: { from: 'backup:2025/01/Woman-Botox-Injection.jpg', alt: 'Anti-wrinkle injection on the forehead', stock: true },
    // old page: “Fillers and Botox Treatment I Botox treatment procedure by Dr. Sandeep Mahapatra I #botox  #fillers”
    youtubeId: 'Rch8b7ks0Zc',
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2025/01/Botox-Before.jpg', alt: 'Fine lines around the mouth and cheek before treatment', stock: true },
      after: { from: 'backup:2025/01/Botox-After.jpg', alt: 'Smoother skin around the mouth and cheek after treatment', stock: true },
    },
  },
  'dermal-fillers-treatment-bangalore': {
    // Centre, not 'attention': attention frames the doctor and crops the patient out.
    // TODO(compliance): the same shelf the homepage flags on whatWeDoImage2 in
    // src/config/site.ts — a legible "Botox" carton sits behind the chair.
    image: { from: 'clinic:What we do/Botox Treatment.png', alt: "Dermatologist giving an injectable treatment to a seated patient", position: 'centre' },
    video: { from: 'clinic:SERVICES/Anti aging 1.png', alt: 'Injectable treatment at Derma Solutions' },
    // old page, first of three: “Dermal Fillers For Smile Lines Correction in Bangalore | Cheek Fillers Treatment in Bangalore”
    youtubeId: 'Y6xGP08PbYY',
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2025/01/Lip-Filler-Comparison-Before.jpg', alt: 'Lips before a dermal filler treatment', stock: true },
      after: { from: 'backup:2025/01/Lip-Filler-Comparison-After.jpg', alt: 'Fuller, more defined lips after a dermal filler treatment', stock: true },
    },
  },
  'skin-tightening-treatment-in-marathahalli-whitefield': {
    image: { from: 'backup:2025/01/Woman-Skin-Tightening.jpg', alt: 'Skin tightening device on the face', stock: true },
    video: { from: 'backup:2025/01/Skin-Tightening-1.jpg', alt: 'Woman examining her skin in a mirror', stock: true },
    // RF vs HIFU blog post: “Non-Surgical Skin Tightening Treatment in Bangalore | RF Skin Tightening at Derma Solutions clinic.”
    youtubeId: 'WOEm3BAVFzY',
  },
  'radio-frequency-skin-tightening-treatment': {
    image: { from: 'backup:2025/01/Woman-Face-RF-Skin-Firming.jpg', alt: 'Radiofrequency skin tightening handpiece on the face', stock: true },
    video: { from: 'backup:2025/01/Woman-After-RF-Sking-Tightening.jpg', alt: 'Woman with firm, radiant skin', stock: true },
    // old page: “Radio Frequency (RF) Skin Tightening | Skin Tightening Treatment #skintransformation #skintightening”
    youtubeId: 'Y3pCtJgiKkY',
  },
  'hifu-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Woman-HIFU-Treatment.jpg', alt: 'HIFU treatment along the jawline', stock: true },
    video: { from: 'backup:2025/01/Indian-Woman-Face-close-up.jpg', alt: 'Close-up of a woman with smooth skin', stock: true },
    // old page: “HIFU for Skin tightening Treatment | Skin Tightening Treatment | High-Intensity Focused Ultrasound”
    youtubeId: 'WZ48GdTXiC4',
  },
  'thread-lifts': {
    image: { from: 'backup:2025/01/Woman-Thread-Lift-Marking.jpg', alt: 'Face marked for a thread lift', stock: true },
    video: { from: 'backup:2025/01/Woman-Thread-Lift-Candidate.jpg', alt: 'Smiling woman touching her jawline', stock: true },
    // old page; its thread-lift-only video of the two: “Thread Lifts | Thread Lift Procedure Before After  #skincare #dermatology #beautytransformation”
    youtubeId: 'n2aDtT8Remw',
  },
  'iv-glutathione-treatment-in-bangalore': {
    // Not the page's Gemini images — see the header. These two are still
    // generated-looking; the doc asks for real clinic photos here specifically.
    image: { from: 'backup:2026/04/IV-DRIP21-012-scaled.jpg', alt: 'Patient receiving an IV drip in a clinic lounge', stock: true },
    video: { from: 'backup:2026/04/650-x-450-px-image-022-scaled.jpg', alt: 'Smiling woman with radiant skin', stock: true },
  },
  'nad-iv-drips-treatment-in-bangalore': {
    image: { from: 'backup:2026/04/iv2.png', alt: 'Patient receiving an NAD IV drip', stock: true },
    video: { from: 'backup:2026/04/iv-3.jpg', alt: 'Patient relaxing during an IV drip session', stock: true },
  },
  'weight-loss-injections-in-bangalore': {
    // A consultation, not a product: the doc frames this as a doctor-assessed
    // program and bars product shots.
    image: { from: 'backup:2025/12/Indian-Woman-with-Dermatologist.png', alt: 'Doctor consulting a patient', stock: true },
    video: { from: 'public:images/decor/home-video-poster.jpg', alt: 'Derma Solutions clinic' },
  },

  /* ---- Cosmetic Surgeries ----------------------------------------------- */
  'xanthelasma-removal-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Xanthelasma-depo.jpg', alt: 'Xanthelasma deposits on the eyelids', stock: true },
    video: { from: 'public:images/decor/home-video-poster.jpg', alt: 'Derma Solutions clinic' },
    // xanthelasma blog post: “Xanthelasma Removal Treatment | Cholesterol Deposits Around Eyes | Derma Solutions Bangalore”
    youtubeId: 'vq6DInm8Y0U',
  },
  'cryolipolysis-coolsculpting-in-bangalore': {
    image: { from: 'backup:2025/01/Cryolipolysis-depo.jpg', alt: 'Cryolipolysis applicator on the abdomen', stock: true },
    video: { from: 'backup:2025/01/Cool-Sculpting.jpg', alt: 'Fat-freezing treatment on the waist', stock: true },
    // old page: “Complete Body Contouring Process | Cavitation, Fat Freezing, Cryolipo & RF Skin Tightening.”
    youtubeId: '9dEZEwr8ilo',
  },
  'ear-lobe-repair-surgery-in-bangalore': {
    image: { from: 'backup:2026/04/Torn-earlobe-close-up-with-gentle-touch.png', alt: 'Close-up of a torn earlobe', stock: true },
    video: { from: 'backup:2026/04/Elegant-smile-and-sparkling-earring.png', alt: 'Smiling woman wearing an earring', stock: true },
    // old page: “Ear Lobe Repair Surgery at Derma Solutions Clinic Bangalore | Expert Lobuloplasty by Dr. Sandeep”
    youtubeId: 'v4ktwfZh0Mw',
  },
  'abdominoplasty-tummy-tuck-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Woman-tummy-measuring-tape.jpg', alt: 'Woman measuring her waist', stock: true },
    video: { from: 'clinic:SERVICES/Cosmetic Surgery.png', alt: 'Surgeon marking the abdomen before body contouring surgery' },
  },
  'rhinoplasty-surgery-in-bangalore': {
    image: { from: 'backup:2025/01/Woman-with-angular-nose.jpg', alt: 'Woman touching the bridge of her nose', stock: true },
    video: { from: 'backup:2025/01/Rhinoplasty-surgery-in-OT.jpg', alt: 'Rhinoplasty surgery in the operating theatre', stock: true },
  },
  'vitiligo-laser-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Indian-Woma-with-Vitiligo.jpg', alt: 'Woman with vitiligo patches on her arms', stock: true },
    video: { from: 'backup:2025/01/Indian-Woman-Vitiligo-patches-on-Hand.jpg', alt: 'Vitiligo patches on the hands', stock: true },
    // old page, first of two: “Vitiligo Surgery | Melanocyte Transplantation Surgery | #vitiligotreatment #vitiligo”
    youtubeId: 'WeQX5aObgoI',
  },
  'breast-surgeries-in-bangalore': {
    image: { from: 'backup:2025/01/Indian-Woman-Checking-her-breast.jpg', alt: 'Woman considering breast surgery', stock: true },
    video: { from: 'backup:2025/01/Surgeons-in-OT.jpg', alt: 'Surgeons in the operating theatre', stock: true },
  },
  'phototherapy-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Woman-taking-Phototherapy-depo.jpg', alt: 'Patient receiving phototherapy', stock: true },
    video: { from: 'backup:2025/01/Phototherapy-depo.jpg', alt: 'Phototherapy lamp over the hand', stock: true },
  },
  'liposuction-treatment-in-bangalore': {
    image: { from: 'clinic:SERVICES/Cosmetic Surgery.png', alt: 'Surgeon marking the abdomen before liposuction' },
    video: { from: 'backup:2025/01/Liposuction-marking-on-a-woman.jpg', alt: 'Doctor marking the abdomen for liposuction', stock: true },
  },
  'gynecomastia-surgery-in-bangalore': {
    image: { from: 'backup:2025/01/Gynecomastia-marking-depo.jpg', alt: 'Chest marked before gynecomastia surgery', stock: true },
    video: { from: 'backup:2025/01/Surgeons-in-OT.jpg', alt: 'Surgeons in the operating theatre', stock: true },
    // gynecomastia blog post: “Treatment of Gynecomastia | Causes, Treatment Options & Surgery Explained |Derma Solutions Bangalore”
    youtubeId: 'mkPlOw7_zCY',
  },

  /* ---- Hair ------------------------------------------------------------- */
  'hair-transplant-in-bangalore-marathahalli-whitefield': {
    image: { from: 'clinic:SERVICES/Hair Restoration.png', alt: 'Hair transplant surgeon marking the hairline at Derma Solutions' },
    video: { from: 'clinic:About us/Hair Transplant.png', alt: 'Hair transplant procedure under magnification at Derma Solutions' },
    // old page; Neo Follicle channel: “Hair Transplant Result | Beard Transplant Result | Best Hair Transplant | MMAfighter Shebin Ibrahim”
    youtubeId: 'c5SZ2NPYFCQ',
  },
  'gfc-hair-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/GFC-Hair-Treatment-injection.jpg', alt: 'GFC injection into the scalp', stock: true },
    video: { from: 'backup:2025/01/Hair-Loss-in-a-Man.jpg', alt: 'Thinning hair on the crown', stock: true },
    // old page; Neo Follicle channel: “GFC for Hair Loss Treatment | Growth Factor Concentrate Therapy | GFC Procedures and Benefits | #gfc”
    youtubeId: 'sOVfxaZKPsM',
  },
  'best-hair-loss-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Man-Looking-for-Hair-Loss-Treatment.jpg', alt: 'Man concerned about hair loss', stock: true },
    video: { from: 'backup:2025/01/Laser-Therapy-for-Scalp.jpg', alt: 'Low-level laser therapy device on the scalp', stock: true },
    // old GFC page; Neo Follicle channel: “GFC for Hair Loss Treatment | Growth Factor Concentrate Therapy | GFC Procedures and Benefits | #gfc”
    youtubeId: 'sOVfxaZKPsM',
  },
  'hair-analysis-in-bangalore': {
    image: { from: 'backup:2025/01/Hair-Analysis-depo-1.jpg', alt: 'Trichoscope examining the scalp', stock: true },
    video: { from: 'backup:2025/01/Woman-Hair-loss.jpg', alt: 'Woman with a widening hair parting', stock: true },
  },
}
