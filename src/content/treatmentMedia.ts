import { homeVideo } from '@/config/site'

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
 * TODO(content): no live treatment page embeds a video, and the video gallery
 * capture carries no titles to match against, so every page plays the
 * homepage's clinic video for now. Each page's generated content module
 * (src/content/treatments/<slug>.ts) records the video the doc asks for; set
 * `youtubeId` here once the clinic confirms it.
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
   */
  compare?: { before: MediaSource; after: MediaSource }
}

/** The two slots' shapes, measured off theme-reference's service page at 1440: 847x505 and 847x380. */
export const treatmentImageSlot = { width: 847, height: 505 } as const
export const treatmentVideoSlot = { width: 847, height: 380 } as const

export const treatmentImagePath = (slug: string) => `/images/treatments/${slug}.jpg`
export const treatmentVideoPosterPath = (slug: string) => `/images/treatments/${slug}-video.jpg`
export const treatmentComparePath = (slug: string, side: 'before' | 'after') =>
  `/images/treatments/${slug}-${side}.jpg`

export const treatmentYoutubeId = (slug: string) => treatmentMedia[slug]?.youtubeId ?? homeVideo.youtubeId

export const treatmentMedia: Record<string, TreatmentMedia> = {
  /* ---- Cosmetology ------------------------------------------------------ */
  'acne-scar-treatment-in-bangalore': {
    image: { from: 'clinic:SERVICES/Cosmetology 2.png', alt: 'Dermatologist applying a skin treatment to a patient at Derma Solutions' },
    video: { from: 'clinic:SERVICES/Advanced Facials.png', alt: 'Skin treatment session at Derma Solutions' },
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
  },
  'best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore': {
    image: { from: 'clinic:SERVICES/Advanced Facials.png', alt: 'HydraFacial-style facial treatment at Derma Solutions' },
    video: { from: 'backup:2024/12/HydraFacial-Treatment-Depo_91808732.jpg', alt: 'HydraFacial handpiece on a patient’s face', stock: true },
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
  },
  'chemical-peel-treatment-in-bangalore': {
    image: { from: 'clinic:About us/Chemical Peels 1.png', alt: 'Dermatologist applying a chemical peel at Derma Solutions' },
    video: { from: 'backup:2025/01/Woman-Chemical-Peel.jpg', alt: 'Chemical peel being brushed onto the face', stock: true },
  },
  'skin-boosters-treatment-in-bangalore': {
    image: { from: 'backup:2025/12/Skin-Boosters-Treatment.png', alt: 'Skin booster micro-injection treatment', stock: true },
    video: { from: 'backup:2025/12/Derma-SKin-Booster-Injection.png', alt: 'Skin booster injection on the cheek', stock: true },
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
  },
  'dermato-surgery-in-bangalore': {
    // The doc's brief names this photograph.
    image: { from: 'backup:2025/01/Dr-Sandeep-Mahapatra-4.jpg', alt: 'Dr Sandeep Mahapatra at Derma Solutions' },
    video: { from: 'clinic:WHY CHOOSE US/DR. Sandeep treatment.png', alt: 'Dr Sandeep Mahapatra performing a laser treatment on a patient' },
  },

  /* ---- Laser ------------------------------------------------------------ */
  'laser-hair-removal-in-bangalore': {
    image: { from: 'backup:2024/12/Untitled-design-3.png', alt: 'Laser hair removal on the underarm', stock: true },
    video: { from: 'clinic:SERVICES/Laser treatment.png', alt: 'Laser treatment at Derma Solutions' },
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
  },
  'mole-removal-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Doctor-removing-a-mole.jpg', alt: 'Doctor removing a mole', stock: true },
    video: { from: 'backup:2025/01/Mole-Removal-cnv.jpg', alt: 'Mole on the shoulder being examined', stock: true },
    // The live page opened with this pair in a comparison slider.
    // TODO(assets): stock/retouched, not consented patient photography — see the header.
    compare: {
      before: { from: 'backup:2025/01/Mole-Removal-Before-cnv.jpg', alt: 'Mole on the back being examined before removal', stock: true },
      after: { from: 'backup:2025/01/Mole-Removal-After-cnv.jpg', alt: 'The same area of the back after mole removal', stock: true },
    },
  },
  'warts-removal-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Mole-Removal-cnv.jpg', alt: 'Skin growth being examined before removal', stock: true },
    video: { from: 'backup:2025/01/Doctor-removing-a-mole.jpg', alt: 'Doctor removing a skin growth', stock: true },
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
  },
  'radio-frequency-skin-tightening-treatment': {
    image: { from: 'backup:2025/01/Woman-Face-RF-Skin-Firming.jpg', alt: 'Radiofrequency skin tightening handpiece on the face', stock: true },
    video: { from: 'backup:2025/01/Woman-After-RF-Sking-Tightening.jpg', alt: 'Woman with firm, radiant skin', stock: true },
  },
  'hifu-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Woman-HIFU-Treatment.jpg', alt: 'HIFU treatment along the jawline', stock: true },
    video: { from: 'backup:2025/01/Indian-Woman-Face-close-up.jpg', alt: 'Close-up of a woman with smooth skin', stock: true },
  },
  'thread-lifts': {
    image: { from: 'backup:2025/01/Woman-Thread-Lift-Marking.jpg', alt: 'Face marked for a thread lift', stock: true },
    video: { from: 'backup:2025/01/Woman-Thread-Lift-Candidate.jpg', alt: 'Smiling woman touching her jawline', stock: true },
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
  },
  'cryolipolysis-coolsculpting-in-bangalore': {
    image: { from: 'backup:2025/01/Cryolipolysis-depo.jpg', alt: 'Cryolipolysis applicator on the abdomen', stock: true },
    video: { from: 'backup:2025/01/Cool-Sculpting.jpg', alt: 'Fat-freezing treatment on the waist', stock: true },
  },
  'ear-lobe-repair-surgery-in-bangalore': {
    image: { from: 'backup:2026/04/Torn-earlobe-close-up-with-gentle-touch.png', alt: 'Close-up of a torn earlobe', stock: true },
    video: { from: 'backup:2026/04/Elegant-smile-and-sparkling-earring.png', alt: 'Smiling woman wearing an earring', stock: true },
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
  },

  /* ---- Hair ------------------------------------------------------------- */
  'hair-transplant-in-bangalore-marathahalli-whitefield': {
    image: { from: 'clinic:SERVICES/Hair Restoration.png', alt: 'Hair transplant surgeon marking the hairline at Derma Solutions' },
    video: { from: 'clinic:About us/Hair Transplant.png', alt: 'Hair transplant procedure under magnification at Derma Solutions' },
  },
  'gfc-hair-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/GFC-Hair-Treatment-injection.jpg', alt: 'GFC injection into the scalp', stock: true },
    video: { from: 'backup:2025/01/Hair-Loss-in-a-Man.jpg', alt: 'Thinning hair on the crown', stock: true },
  },
  'best-hair-loss-treatment-in-bangalore': {
    image: { from: 'backup:2025/01/Man-Looking-for-Hair-Loss-Treatment.jpg', alt: 'Man concerned about hair loss', stock: true },
    video: { from: 'backup:2025/01/Laser-Therapy-for-Scalp.jpg', alt: 'Low-level laser therapy device on the scalp', stock: true },
  },
  'hair-analysis-in-bangalore': {
    image: { from: 'backup:2025/01/Hair-Analysis-depo-1.jpg', alt: 'Trichoscope examining the scalp', stock: true },
    video: { from: 'backup:2025/01/Woman-Hair-loss.jpg', alt: 'Woman with a widening hair parting', stock: true },
  },
}
