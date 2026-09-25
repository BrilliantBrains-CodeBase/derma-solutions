/**
 * Derma Solutions — brand site configuration
 *
 * Single source of truth for every value that is constant across the site:
 * identity, NAP (name/address/phone), hours, socials, assets, tracking IDs,
 * SEO defaults, legal copy, the clinical team, navigation and service areas.
 *
 * Nothing here is page-specific. Header, footer, contact blocks, `tel:` links,
 * <head> meta and JSON-LD emitters should all read from this file so the brand
 * details cannot drift apart between them — NAP inconsistency is a direct
 * local-SEO penalty for a clinic.
 *
 * PROVENANCE — every value below was lifted from the pre-rebuild capture:
 *   seo-backup/04-seo-extracted/schema/_homepage.jsonld   site-wide JSON-LD graph
 *   seo-backup/04-seo-extracted/per-page/_homepage.json   parsed meta/OG fields
 *   seo-backup/00-site-level/tracking.md                  browser-verified tag IDs
 *   seo-backup/00-site-level/robots.txt                   crawl directives
 *   seo-backup/02-markdown/_homepage.md                   header + footer copy
 *   seo-backup/00-site-level/urls-master.txt              the frozen 92-URL list
 *
 * Values that disagree between sources are marked `CONFLICT:` inline and left
 * for a human to settle rather than silently reconciled. Search this file for
 * "CONFLICT" and "TODO" before launch.
 */

/* -------------------------------------------------------------------------- */
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

const SITE_URL = "https://dermasolutions.co.in";

/** E.164, the only form safe for `tel:` hrefs and schema. */
const PHONE_E164 = "+919741223217";

/** The clinic's pin, as the live schema's GeoCoordinates give it. */
const GEO = { latitude: 12.956707, longitude: 77.707275 } as const;
const LAT_LNG = `${GEO.latitude},${GEO.longitude}`;

/**
 * The clinic's Google place ID. TODO(brand): null because the share.google
 * shortlink only resolves to a Search results page without a real browser, so
 * the ID could not be read from it. Copy it from the Business Profile dashboard
 * or https://developers.google.com/maps/documentation/places/web-service/place-id
 * and paste it here. Until then, everything that needs it is null and skipped:
 * the footer's review link and the authored schema's `sameAs` / `hasMap`.
 */
const GOOGLE_PLACE_ID: string | null = null;

/* -------------------------------------------------------------------------- */
/* Brand identity                                                              */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "Derma Solutions Skin & Hair Clinic",
  shortName: "Derma Solutions",
  legalName: "Derma Solutions",
  /** Used for schema `alternateName` and as acceptable brand spellings in copy. */
  alternateNames: [
    "Derma Solutions",
    "Derma Solutions Clinic",
    "Derma Solutions Skin Clinic",
    "Derma Solutions Hair Clinic",
    "Derma Solutions Skin and Hair Clinic",
  ],
  url: SITE_URL,
  tagline: "Your One Point Destination for Skin, Hair & Aesthetic Transformation",
  /** Copy doc section 13 — shorter line used under the footer logo. */
  footerTagline: "Doctor-led skin, hair and aesthetic care in Bangalore.",
  headline: "Trusted Skin & Hair Clinic in Bangalore for Radiant Results.",
  description:
    "Derma Solutions Skin & Hair Clinic is a dermatologist-led skin, hair, laser, anti-aging and cosmetic treatment clinic in Marathahalli, Bangalore, founded by Dr. Sandeep Mahapatra, Senior Dermatologist, Cosmetic Expert and Hair Transplant Surgeon. The clinic provides medical dermatology, cosmetic dermatology, laser treatments, dermatosurgery, hair loss treatments, hair transplant and selected cosmetic surgery services.",
  /** schema.org medicalSpecialty */
  specialty: "Dermatology",
  foundedBy: "Dr. Sandeep Mahapatra",
  priceRange: "₹₹₹",
  /** schema.org knowsAbout — also the topical authority set the site ranks on. */
  knowsAbout: [
    "Dermatology",
    "Cosmetic Dermatology",
    "Aesthetic Dermatology",
    "Anti-aging Treatments",
    "Laser Hair Removal",
    "Laser Skin Treatments",
    "Acne Scar Treatment",
    "Chemical Peels",
    "Hydrafacial",
    "Botox Treatment",
    "Dermal Fillers",
    "Skin Tightening",
    "Mole Removal",
    "Wart Removal",
    "Xanthelasma Treatment",
    "Hair Loss Treatment",
    "Hair Transplant",
    "Dermatosurgery",
    "Selected Cosmetic Surgery Services",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contact = {
  /** E.164. Use this for anything machine-read. */
  phone: PHONE_E164,
  /** What the current site prints in visible copy. */
  phoneDisplay: "+91 97412 23217",
  /** The exact string in the live JSON-LD. Keep for schema byte-fidelity. */
  phoneSchema: "+91-9741223217",
  telHref: `tel:${PHONE_E164}`,
  whatsappHref: `https://wa.me/${PHONE_E164.replace("+", "")}`,
  // CONFLICT: this is a personal mailbox doing duty as the public appointments
  // address. It is what the live schema publishes, so it is preserved verbatim.
  // TODO(brand): replace with a role address (e.g. appointments@) before launch.
  email: "sandeep.mahapatra@dermasolutions.co.in",
  contactType: "appointments and patient enquiries",
  languages: ["English", "Hindi", "Kannada"],
  /** Footer CTA. The copy doc names the header and hero buttons separately. */
  ctaLabel: "Book An Appointment",
  /** Copy doc section 01 — the header button. */
  ctaLabelHeader: "Make An Appointment",
  /** src/pages/BookAppointment.tsx. */
  ctaHref: "/book-appointment/",
} as const;

/**
 * The mobile-only sticky action bar (src/layout/MobileActionBar.tsx).
 *
 * Labels are one word by design — they sit under 44px icon targets in a
 * three-up row that has to survive a 360px viewport. The longer, spoken names
 * are built from `contact` in the component's aria-labels, so the visible copy
 * staying terse costs nothing to a screen reader.
 *
 * Carries no hrefs: all three reuse `contact.telHref`, `contact.ctaHref` and
 * `contact.whatsappHref`, so the NAP cannot drift from the JSON-LD.
 */
export const actionBar = {
  callLabel: "Call",
  bookLabel: "Book",
  whatsappLabel: "WhatsApp",
} as const;

/* -------------------------------------------------------------------------- */
/* Location                                                                    */
/* -------------------------------------------------------------------------- */

export const location = {
  /** Canonical PostalAddress — emit this in JSON-LD, unchanged. */
  address: {
    street:
      "Marathahalli Landmark, Shop 3, 1st Floor, Scorpio House, Near Marathahalli Bridge, Munnekolala, Marathahalli Bridge Service Road, opposite Purva Apartments",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560037",
    country: "IN",
  },
  // The live footer printed a garbled version of the same address ("Munnekoala",
  // "Purvankara Apt", the landmark repeated twice). The client's copy doc
  // (content/home-page/, section 13) supplies a clean one, used here.
  // `address` above stays as-is: it is canonical for the JSON-LD, which ships
  // byte-verbatim. The two still differ in spelling — TODO(brand): reconcile
  // them in the source schema so display and structured data agree.
  addressDisplayLines: [
    "1st Floor, Scorpio House,",
    "near Marathahalli Bridge, Munnekollal,",
    "opposite Purva Apartments,",
    "Bengaluru, Karnataka 560037",
  ],
  geo: GEO,
  /**
   * The live schema's `hasMap`. Kept for that reason only: it resolves to a
   * Google Search results page, not to the Maps listing, so nothing new should
   * link to it — use `google` below.
   */
  mapUrl: "https://share.google/SO018gWSkHgepLkdC",
  /**
   * Google Maps / Business Profile links, in Google's documented Maps URL
   * formats (developers.google.com/maps/documentation/urls), which need no API
   * key. Directions and the embed work from `geo` alone; the other two wait on
   * GOOGLE_PLACE_ID.
   */
  google: {
    placeId: GOOGLE_PLACE_ID,
    /** Turn-by-turn directions to the pin. */
    directionsUrl:
      `https://www.google.com/maps/dir/?api=1&destination=${LAT_LNG}` +
      (GOOGLE_PLACE_ID ? `&destination_place_id=${GOOGLE_PLACE_ID}` : ""),
    /** The Maps listing itself — for schema `hasMap` / `sameAs`. */
    placeUrl: GOOGLE_PLACE_ID
      ? `https://www.google.com/maps/search/?api=1&query=${LAT_LNG}&query_place_id=${GOOGLE_PLACE_ID}`
      : null,
    /** Opens the "write a review" dialog on the Business Profile. */
    reviewUrl: GOOGLE_PLACE_ID
      ? `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`
      : null,
    /** Keyless iframe src, centred on the pin. */
    embedUrl: `https://maps.google.com/maps?q=${LAT_LNG}&z=17&output=embed`,
  },
  landmarks: ["Near Marathahalli Bridge", "Opposite Purva Apartments"],
  /** schema.org areaServed */
  areaServed: ["Bangalore", "Marathahalli", "Whitefield"],
} as const;

/* -------------------------------------------------------------------------- */
/* Opening hours                                                               */
/* -------------------------------------------------------------------------- */

// Settled 2026-09-25: the JSON-LD's hours are the clinic's real ones — Monday
// and Wednesday to Sunday, 10:00–20:00, closed Tuesday. The live footer and the
// client's copy doc ("Monday to Sunday: 9:30 AM to 6:00 PM / Open all 7 days")
// were the ones out of date, so every visible string below now follows
// `openingHours`, which ships byte-verbatim in the JSON-LD.
// Keep the Google Business Profile's hours set to the same.
/**
 * Split out so the About checklist can print the times under its own day
 * wording without a second copy of them drifting from the footer's.
 */
const hoursDays = "Monday, Wednesday to Sunday";
const hoursTimes = "10:00 AM to 8:00 PM";

export const hours = {
  openingHours: [
    {
      days: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  /** Matches `openingHours`. */
  display: `${hoursDays}: ${hoursTimes}`,
  /** The times alone, for callers that supply their own day range. */
  displayTimes: hoursTimes,
  displayHeading: "Closed on Tuesdays",
  /** One line, for checklists and chips. */
  displayShort: "Mon, Wed–Sun | 10 AM – 8 PM",
} as const;

/* -------------------------------------------------------------------------- */
/* Social profiles                                                             */
/* -------------------------------------------------------------------------- */

// Taken from the #clinic node's sameAs. The #medicalorganization node carries the
// same list but with a malformed YouTube URL ("https://https://www.youtube.com/...").
// The corrected form is used here.
export const social = {
  facebook: "https://www.facebook.com/dermasolutionsskinclinic/",
  instagram: "https://www.instagram.com/dermasolutionsskinclinic/",
  linkedin:
    "https://www.linkedin.com/company/derma-solutions-skin-hair-clinic-in-bangalore/",
  youtube: "https://www.youtube.com/@dermasolutionsclinic",
} as const;

/** Ordered list for schema `sameAs` and for rendering the social row. */
export const socialProfiles = [
  { name: "Facebook", url: social.facebook },
  { name: "Instagram", url: social.instagram },
  { name: "LinkedIn", url: social.linkedin },
  { name: "YouTube", url: social.youtube },
] as const;

/* -------------------------------------------------------------------------- */
/* Assets                                                                      */
/* -------------------------------------------------------------------------- */

// Paths are app-local. The source files are already captured under
// seo-backup/06-media/files/ — copying them into the public dir is a rebuild task.
export const assets = {
  /**
   * The mark, on a transparent background. Used everywhere.
   *
   * It must stay transparent: the header's own background fades in on scroll,
   * so anything with a baked-in ground shows as a white box the moment the bar
   * is not fully opaque.
   *
   * src: content/home-page/Logo.png (2026-09 brown rebrand). That upload is
   * opaque white, so this is a cropped, colour-to-alpha export at 3x the ~51px
   * render height. derma-solutions-logo-master.png is the full-res transparent
   * crop, used by scripts/generate-icons.ts for the og:image.
   */
  logo: "/images/brand/derma-solutions-logo.png",
  // The original SVG upload — the OLD purple/teal mark, superseded by the
  // rebrand above. NOT for UI: it also has an opaque white rectangle baked in.
  /** src: 2024/12/DermaSolutions-Logo.svg */
  logoSvgOpaque: "/images/brand/derma-solutions-logo.svg",
  logoAlt: "Derma Solutions Logo",
  // TODO(brand): vendor artwork. theme-reference/06-assets/manifest.json tags it
  // "licence": "reference-only" — it belongs to the Glowix theme author and must
  // be replaced with Derma Solutions' own decor before launch.
  /** Decorative line-art behind the footer panel. src: theme-reference 2025-04-footer-bg-shape.svg */
  footerShape: "/images/decor/footer-bg-shape.svg",
  // TODO(brand): vendor artwork on the same terms as footerShape above —
  // "licence": "reference-only" in theme-reference/06-assets/manifest.json.
  /** Line-art behind the Services band. src: theme-reference 2025-04-service-bg-shape.svg (1800x1511) */
  serviceShape: "/images/decor/service-bg-shape.svg",
  // TODO(brand): vendor artwork on the same terms as footerShape above —
  // "licence": "reference-only" in theme-reference/06-assets/manifest.json.
  /**
   * The leaf, sparkle, dot and flower scattered over the brown page-header band
   * on inner pages (the treatment pages today).
   * src: theme-reference 2025-04-page-header-bg.svg (1872x427)
   */
  pageHeaderShape: "/images/decor/page-header-bg.svg",
  /**
   * The homepage hero, and the page's LCP element.
   *
   * This slot held a 10s silent loop of Dr Sandeep examining a patient for one
   * round; it is a still again. The clip and both its encodes are still in
   * public/video/ — nothing here points at them, so they ship only if that
   * decision is reversed.
   *
   * src: Hero/Hero HydraFacial.png (1672x941), cropped to the band's 1.830 by
   * scripts/import-home-images.ts.
   */
  heroImage: "/images/decor/home-hero.jpg",
  heroImageAlt:
    "A patient receiving a HydraFacial treatment, a clinician guiding the handpiece across her cheek",
  /** About stack, upper-right. src: About us/Botox.png (1122x1402) */
  aboutImage1: "/images/decor/about-1.jpg",
  aboutImage1Alt:
    "Dr Sumedha Tirthani administering an injectable treatment to a reclining patient's forehead",
  /** About stack, lower-left. src: About us/Hair Transplant.png (1122x1402) */
  aboutImage2: "/images/decor/about-2.jpg",
  aboutImage2Alt:
    "Surgeon in scrubs working at a microscope during a hair transplant procedure",
  // NOTE: no band renders this any more. It sat beside the About checklist
  // until the 2026-09 revision round asked to "remove the second image and
  // increase the text content" — see the departures list in
  // src/sections/HomeAbout.tsx. Kept, with its file, in case the client wants
  // it back; it is 26 KB.
  /** Was: About checklist row. src: About us/Chemical Peels 1.png (1672x941) */
  aboutExperienceImage: "/images/decor/about-experience.jpg",
  aboutExperienceImageAlt:
    "Clinician brushing a chemical peel solution onto a reclining patient's face",
  /** Our Journey, upper-left. src: ChatGPT Image Sep 21, 2026, 02_17_16 PM.png (1402x1122) */
  aboutJourneyImage1: "/images/decor/about-journey-1.webp",
  aboutJourneyImage1Alt:
    "Clinician performing an advanced skin treatment on a reclining patient wearing protective eye shields",
  /** Our Journey, upper-right. src: ChatGPT Image Sep 21, 2026, 01_10_08 PM.png (1402x1122) */
  aboutJourneyImage2: "/images/decor/about-journey-2.webp",
  aboutJourneyImage2Alt:
    "Clinician in burgundy scrubs administering a facial injectable treatment to a reclining patient",
  /**
   * What We Do, left column. A real consultation-room portrait supplied with
   * the clinic's doctor photography.
   *
   * src: content/home-page/Doctor's images/WhatsApp Image 2026-09-07 at
   * 12.07.39 PM.jpeg (1024x1280)
   */
  whatWeDoImage1: "/images/decor/about-what-we-do-doctor.webp",
  whatWeDoImage1Alt:
    "Dr Sandeep Mahapatra seated in a consultation room at Derma Solutions",
  // TODO(compliance): copy doc note 3. The shelf behind the chair carries a
  // legible "Botox" carton and an "AESTHETIC CARE" label. It is a prescription
  // brand name on a clinic homepage — the same exposure the note raises about
  // the Services card. Retouch the shelf or reshoot if the client wants none.
  /** What We Do, right column. src: What we do/Botox Treatment.png (941x1672) */
  whatWeDoImage2: "/images/decor/what-we-do-2.jpg",
  whatWeDoImage2Alt:
    "Dermatologist administering an anti-wrinkle injection to a patient's forehead",
  /**
   * Meet the Dermatologist, left column. Chosen from the 13 frames in
   * content/home-page/Doctor's images/ as the only standing one with no
   * competing brand or poster text in shot.
   *
   * src: Meet the Dermatologist/DR Sandeep standing.jpeg (1024x1280)
   */
  meetDermatologistImage: "/images/decor/meet-dermatologist.jpg",
  meetDermatologistImageAlt:
    "Dr Sandeep Mahapatra standing in a white coat at the Derma Solutions clinic",
  /**
   * The two technology banners, each in two renditions — the only homepage
   * slots that ship a srcset. See the note in scripts/import-home-images.ts for
   * why these are not single 2x files like the rest of the decor.
   *
   * Both carry their heading text baked into the pixels, so the alt strings
   * quote those words: they exist nowhere else in the markup. The band shows
   * the whole artwork at every width, so on a phone the baked type is small.
   *
   * src: Technology Banner/3-3.png (5000x1562), re-supplied 2026-09
   */
  techBanner1: "/images/decor/tech-banner-1.jpg",
  techBanner1Small: "/images/decor/tech-banner-1-1400.jpg",
  techBanner1Alt:
    'Banner reading "Advanced Technology. Visible Skin Transformation. Precision-led ' +
    'treatments designed to tighten, lift and rejuvenate your skin.", between a skin ' +
    "tightening device and a skin analysis system",
  /** src: Technology Banner/4-2.png (5000x1562), re-supplied 2026-09 */
  techBanner2: "/images/decor/tech-banner-2.jpg",
  techBanner2Small: "/images/decor/tech-banner-2-1400.jpg",
  techBanner2Alt:
    'Banner reading "Next-Generation Technology. Expertly Delivered. Advanced laser and ' +
    'body-contouring solutions for smoother skin, refined contours and targeted concerns.", ' +
    "beside two laser treatment platforms",
  // Two treatment scenes rather than the two studio portraits the shoot supplies
  // for this band. Its second portrait is the same setup and pose as
  // appointmentImage below, and at two bands apart the pair read as one photo
  // printed twice; the peel shot is the portrait framing of aboutExperienceImage's
  // scene and sits beside the laser one as a matching pair. See the note in
  // scripts/import-home-images.ts.
  //
  // The band's third reference image, 2025-04-author-2.jpg, is deliberately not
  // here: the contact row uses founder.photo instead. See the departures list in
  // src/sections/HomeWhyChooseUs.tsx.
  /** Why Choose Us, front-left frame. src: WHY CHOOSE US/DR. Sandeep treatment.png (941x1672) */
  whyChooseImage1: "/images/decor/why-choose-1.jpg",
  whyChooseImage1Alt:
    "Dr Sandeep Mahapatra performing a laser treatment on a reclining patient wearing eye shields",
  /** Why Choose Us, inside the accent panel. src: About us/Chemical Peels 2.png (1122x1402) */
  whyChooseImage2: "/images/decor/why-choose-2.jpg",
  whyChooseImage2Alt:
    "Clinician brushing a chemical peel solution onto a reclining patient's face",
  /** Our Approach, primary frame. src: ChatGPT Image Sep 21, 2026, 12_19_23 PM.png (1122x1402) */
  aboutApproachImage: "/images/decor/about-approach.webp",
  aboutApproachImageAlt:
    "Advanced skin treatment equipment inside the Derma Solutions clinic",
  // TODO(brand): vendor artwork on the same terms as footerShape and serviceShape
  // above — "licence": "reference-only" in theme-reference/06-assets/manifest.json.
  /** Dot field behind the Testimonials band. src: theme-reference 2025-04-testimonials-bg-shape.png (1800x1041) */
  testimonialsShape: "/images/decor/testimonials-bg-shape.png",
  // TODO(assets): unlike the decor above this is the clinic's own footage — a
  // frame of the video in homeVideo — so it is the one image on the homepage
  // that needs no licence clearance. It is also the softest: YouTube's frame
  // stills top out at 480x360, so this is an upscale to 1400x800 and it shows,
  // particularly along the right and bottom edges. The uploader's own thumbnail
  // is sharper but unusable — it is an end-card carrying burned-in captions, a
  // "BOTOX" wordmark and two before/after patient faces, which would drag copy
  // doc compliance notes 2 and 3 onto the homepage. A still shot at the clinic,
  // or the real video the copy doc asks for, replaces this and fixes the
  // sharpness. Re-cut it if homeVideo.youtubeId changes.
  /** Poster for the homepage video band. src: frame of homeVideo.youtubeId */
  videoPoster: "/images/decor/home-video-poster.jpg",
  videoPosterAlt: "Dr Sandeep Mahapatra speaking to camera in the clinic",
  // TODO(compliance): still BLOCKING, but for a different reason than before.
  // Copy doc note 2 is "Use only the clinic's own images with signed patient
  // consent on file. Do not use stock or theme demo images as patient results."
  // The second half is now satisfied — these are the clinic's own patients, not
  // the Glowix demo's stock faces. The first half is not: confirm signed consent
  // is on file for each of the four before launch. Photographs of patients under
  // result claims are the one thing on this page that cannot ship on an
  // assumption.
  //
  // These four are the clinic's delivered set, the same files the image gallery
  // shows — see src/content/galleryMedia.ts, which carries the full compliance
  // note for all ten. Sharing one set is deliberate: the homepage teases
  // /image-gallery/, and two separately-sourced sets of the same treatments
  // would drift.
  //
  // They replace the earlier `Before & After/1-4.png` from the shoot folder,
  // which were unmasked and carried no labels of their own. Every file here is
  // eye-barred and carries "BEFORE" and "AFTER" burned into the frame, which is
  // why the band renders them whole and draws no captions — see
  // HomeSeeTheDifference.tsx.
  //
  // Which four, of the ten: the three with no third-party clinic signage in shot
  // plus the one whose signage is least prominent. Six of the ten carry the
  // "FOLLICLE TRANSPLANT" board or a second board behind the patient, and a
  // seventh shows an "IUI ROOM" door plate; none of those three are on this
  // page. Swapping one is a one-line change here and in
  // scripts/import-home-images.ts.
  //
  // TODO(compliance): transformation4 still carries a partial sign behind the
  // patient in its BEFORE half. Confirm that board is Derma Solutions' own room
  // before launch — another clinic's branding under these claims would be worse
  // than no photograph.
  //
  // As in homeCaseStudies, the alt text deliberately describes only what is in
  // frame. Naming an improvement in an alt would make the photograph itself
  // assert the result.
  /** src: content/gallery/1.png (2195x2195) */
  transformation1: "/images/decor/transformations/transformation-1.jpg",
  transformation1Alt:
    "A woman with freckled skin and a dark headband photographed front-on twice, the two shots side by side and labelled Before and After",
  /** src: content/gallery/5.png (2195x2195) */
  transformation2: "/images/decor/transformations/transformation-2.jpg",
  transformation2Alt:
    "A woman photographed front-on twice against a dark studio backdrop, the two shots side by side and labelled Before and After",
  /** src: content/gallery/6.png (2195x2195) */
  transformation3: "/images/decor/transformations/transformation-3.jpg",
  transformation3Alt:
    "A man in a surgical cap and gown photographed front-on twice, the two shots side by side and labelled Before and After",
  /** src: content/gallery/8.png (2195x2195) */
  transformation4: "/images/decor/transformations/transformation-4.jpg",
  transformation4Alt:
    "A woman in a yellow dupatta photographed front-on twice, the two shots side by side and labelled Before and After",
  // The photo copy doc section 11 asks for — "a real photo of Dr Sandeep
  // Mahapatra or Dr Sumedha Tirthani" — and a transparent cut-out, which is
  // what the band's composition needs: the figure stands on the pink arch the
  // section paints rather than sitting in a frame.
  //
  // It replaces the retouched studio composite that stood here before. That one
  // could not be keyed — a soft grey ground against a white coat gives a
  // luminance key nothing to separate — so the section clipped it to an arch
  // instead. This is an unretouched clinic shot on a flat teal backdrop, which
  // a chroma key handles cleanly; scripts/import-appointment-doctor.ts holds
  // the key and the placement, and re-running it regenerates this file.
  //
  // TODO(assets): 693px of subject against a 465px slot is 1.49x, short of the
  // 2x the rest of public/images/decor/ sits at, because 1024x1280 is all the
  // source holds. A re-shoot or a full-resolution original sharpens it; nothing
  // else has to change.
  /** Appointment band, media column. src: content/home-page/Doctor's images/WhatsApp Image 2026-09-07 at 12.07.39 PM (2).jpeg (1024x1280) */
  appointmentImage: "/images/decor/appointment-image.png",
  appointmentImageAlt:
    "Dr Sandeep Mahapatra in a white coat, one hand resting on his hip",
  // TODO(brand): vendor artwork on the same terms as footerShape, serviceShape
  // and testimonialsShape above — "licence": "reference-only" in
  // theme-reference/06-assets/manifest.json.
  /** Line-art across the top of the Appointment panel. src: theme-reference 2025-04-appointment-bg-shape.svg (1800x801) */
  appointmentShape: "/images/decor/appointment-bg-shape.svg",
  favicon: {
    ico: "/favicon.ico",
    /** src: 2024/12/cropped-DermaSolutions-Favicon-with-BG-32x32.png */
    png32: "/images/brand/favicon-32x32.png",
    /** src: ...-192x192.png */
    png192: "/images/brand/favicon-192x192.png",
    /** src: ...-180x180.png */
    appleTouchIcon: "/images/brand/apple-touch-icon.png",
  },
  /** Site-wide social share fallback. 55 live pages have no og:image today. */
  ogImage: "/images/brand/og-default.jpg",
  /**
   * Also the treatment sidebar's Opening Hours card, in place of the
   * reference's sidebar-cta-bg.jpg, which is vendor stock.
   * src: 2025/04/Derma-Solutions-Clinic-Reception.jpeg
   */
  clinicPhoto: "/images/brand/clinic-reception.jpeg",
  clinicPhotoAlt: "Derma Solutions clinic reception",
  /**
   * Doctor profile pages, B1.6 and B3.5 of content/doctor-page/. Written by
   * scripts/import-doctor-images.ts (npm run assets:doctors).
   * src: 2025/01/Dr-Sandeep-Mahapatra-4.jpg
   */
  doctorSandeepProcedure: "/images/team/dr-sandeep-mahapatra-procedure.jpg",
  doctorSandeepProcedureAlt: "Dr. Sandeep Mahapatra performing a dermatology procedure",
  /** src: 2025/01/Thyagaraj_photo1.jpg */
  doctorThyagarajConsult: "/images/team/dr-thyagaraj-consult.jpg",
  doctorThyagarajConsultAlt: "Dr. Thyagaraj, senior plastic surgeon at Derma Solutions",
} as const;

/* -------------------------------------------------------------------------- */
/* Analytics & tracking                                                        */
/* -------------------------------------------------------------------------- */

// Verified by driving a real browser — FlyingPress defers all JS until first
// interaction, so a static scrape does not reveal these. Do NOT mint new IDs:
// a new GA4 property resets all historical comparison.
export const tracking = {
  gtmId: "GTM-PWVJVRQ",
  /** Loaded via GTM, not hardcoded. Listed here for verification only. */
  ga4Id: "G-3KNBG0VTG0",
  facebookPixelId: "1327906075791898",
} as const;

/* -------------------------------------------------------------------------- */
/* SEO defaults                                                                */
/* -------------------------------------------------------------------------- */

export const seo = {
  /** Homepage title, verbatim. Titles carry over unchanged in this migration. */
  defaultTitle: "Skin and Hair Clinic in Marathahalli, Whitefield - Bangalore",
  titleTemplate: "%s | Derma Solutions",
  defaultDescription:
    "Derma Solutions-Your One Point Destination for Skin, Hair & Aesthetic Transformation at our premier skin and hair clinic in Marathahalli, Whitefield - Bangalore",
  canonicalBase: SITE_URL,
  locale: "en-IN",
  /** og:locale on the live site is the bare "en". Preserved. */
  ogLocale: "en",
  ogSiteName: "Derma Solutions Skin and Hair Clinic",
  ogType: "website",
  twitterCard: "summary_large_image",
  /** Site-wide directive. Losing it shrinks every SERP listing. */
  robots: "max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  sitemapUrl: `${SITE_URL}/sitemap.xml`,
  searchActionTarget: `${SITE_URL}/?s={search_term_string}`,
  // The live Service schema's serviceUrl. Not one of the 92 captured URLs — it
  // 404'd on the live site — so the page is authored: src/pages/ContactUs.tsx.
  contactPath: "/contact-us/",
} as const;

/* -------------------------------------------------------------------------- */
/* Legal                                                                       */
/* -------------------------------------------------------------------------- */

export const legal = {
  /** Verbatim medical disclaimer. Do not paraphrase. */
  disclaimer:
    "The information published on this website is generic in nature and the results vary from case to case basis. The contents of the website is not meant to replace an in-person consultation. Please follow the advise of your doctor via in-person consultation. This website will not assume any legal responsibility for the patient's medical condition.",
  disclaimerLabel: "Disclaimer Statement :",
  /**
   * The short notice that has to stay visible beside before/after imagery —
   * copy doc note 2. Distinct from `disclaimer` above, which is the long legal
   * statement PreFooter carries site-wide on every page.
   *
   * Shared by the homepage's transformations band and the image gallery, so the
   * two cannot drift into saying different things about the same photographs.
   */
  resultsVary: "Results vary from person to person.",
  /** Treatment-variability notice from the Service schema's termsOfService. */
  treatmentNotice:
    "Treatment suitability, number of sessions, procedure choice and expected results vary from patient to patient and should be confirmed after consultation with a qualified dermatologist.",
  copyrightHolder: "Derma Solutions",
  copyrightSince: 2024,
  privacyPolicyPath: "/privacy-policy/",
  termsPath: "/terms-of-use/",
  credit: { label: "Brilliant Brains", url: "https://brilliantbrains.ai/" },
  creditPrefix: "Website Designed & Maintained By",
} as const;

/** "©2026 Derma Solutions. All Rights Reserved." — year never goes stale. */
export const copyrightLine = (year: number = new Date().getFullYear()): string =>
  `Copyright © ${year} ${legal.copyrightHolder}. All rights reserved.`;

/* -------------------------------------------------------------------------- */
/* Clinical team                                                               */
/* -------------------------------------------------------------------------- */

export const team = [
  {
    id: "sandeep-mahapatra",
    name: "Dr. Sandeep Mahapatra",
    displayName: "Dr Sandeep Mahapatra",
    qualification: "MBBS, MD (Dermatology)",
    role: "Senior Consultant Dermatologist, Cosmetic Expert & Hair Transplant Surgeon",
    jobTitles: [
      "Senior Consultant Dermatologist",
      "Cosmetic Expert",
      "Hair Transplant Surgeon",
    ],
    isFounder: true,
    path: "/best-dermatologist-in-marathahalli-whitefield-bangalore/",
    /** src: 2025/01/Dr-Sandeep-Mahapatra-3.jpg */
    photo: "/images/team/dr-sandeep-mahapatra.jpg",
    bio: "Dr. Sandeep Mahapatra is a Senior Consultant Dermatologist, Cosmetic Expert and Hair Transplant Surgeon in Bangalore. He is the founder of Derma Solutions Skin & Hair Clinic in Marathahalli, Whitefield, Bangalore, and provides dermatology, cosmetic dermatology, laser, dermatosurgery, hair loss treatment, hair transplant and aesthetic procedures.",
    credentials: [
      "MBBS",
      "MD Dermatology",
      "Certified DHI Specialist from DHI Global, Greece",
      "Certified in basic and advanced Botox and Dermal Fillers from Allergan",
    ],
    alumniOf: [
      "MGM Medical College & Hospital, Jamshedpur",
      "Rajendra Institute of Medical Sciences, Ranchi",
    ],
    memberOf: [
      "Association of Cutaneous Surgeons of India",
      "Indian Association of Hair Restoration Surgeons",
      "International Society of Dermatology",
      "Indian Association of Dermatologists, Venereologists and Leprologists",
      "International Society of Hair Restoration Surgery",
    ],
    awards: [
      "Gold Medalist in MD Dermatology from Rajendra Institute of Medical Sciences, Ranchi",
      "Honors and gold medalist in two subjects during MBBS",
    ],
    /** schema.org sameAs — third-party profiles that corroborate the entity. */
    externalProfiles: [
      "https://share.google/iWuZ4OqtDOdynwJAw",
      "https://www.practo.com/bangalore/doctor/dr-sandeep-mahapatra-dermatologist-cosmetologist",
      "https://www.linkedin.com/in/dr-sandeep-mahapatra-315411112",
      "https://kivihealth.com/iam/sandeep.mahapatra.19945",
      "https://neofollicletransplant.com/dr-sandeep-mahapatra-hair-transplant-surgeon/",
      "https://www.apollo247.com/doctors/dr-sandeep-mahapatra-4115d6e4-68c2-4cca-8548-66cf7e0bbce1",
      "https://www.justdial.com/Bangalore/Dr-Sandeep-Mahapatra-Neo-Follicle-Transplant-Clinic-Marathahalli-Below-Bridge-Munekollal/080PXX80-XX80-160108114909-B9U9_BZDET",
      "https://www.docindia.org/doctors/bangalore/dr-sandeep-mahapatra-dermatology",
    ],
  },
  {
    id: "sumedha-tirthani",
    name: "Dr. Sumedha Tirthani",
    displayName: "Dr Sumedha Tirthani",
    qualification: "MBBS, MD - Dermatology (Gold Medalist)",
    role: "Consultant Dermatologist",
    jobTitles: ["Consultant Dermatologist"],
    isFounder: false,
    path: "/dr-sumedha-tirthani-dermatologist/",
    /** src: 2025/05/Dr-Sumedha-Tirthani-375-375.png */
    photo: "/images/team/dr-sumedha-tirthani.png",
    // "Board-certified" dropped: a US term with no Indian equivalent
    // (content/doctor-page/ note 8).
    bio: "Gold medalist dermatologist with advanced expertise in clinical, cosmetic, and laser dermatology.",
  },
  {
    id: "thyagaraj",
    name: "Dr. Thyagaraj",
    displayName: "Dr Thyagaraj",
    // Was "Senior Plastic Surgeon", a role standing in for a degree. The degrees
    // are content/doctor-page/ A4's Qualification row.
    qualification: "MBBS, MS (General Surgery), MCh (Plastic Surgery)",
    role: "Senior Plastic Surgeon",
    jobTitles: ["Senior Plastic Surgeon"],
    isFounder: false,
    path: "/dr-thyagaraj-best-plastic-surgeon-in-bangalore/",
    /** src: 2025/01/Dr-Thyagaraj-400-400.jpg */
    photo: "/images/team/dr-thyagaraj.jpg",
    bio: "Senior plastic surgeon with over 20 years of expertise in cosmetic and reconstructive procedures.",
  },
  {
    id: "chandhana-vishal-n",
    name: "Dr. Chandhana Vishal N",
    displayName: "Dr Chandhana Vishal N",
    qualification: "MBBS, MCh Plastic Surgeon",
    role: "Plastic, Reconstructive & Aesthetic Surgeon",
    jobTitles: ["Plastic Surgeon"],
    isFounder: false,
    path: "/dr-chandhana-vishal-n-plastic-surgeon/",
    /** src: 2025/09/Dr-Chandana-2-e1757936503221-375-375.jpeg */
    photo: "/images/team/dr-chandhana-vishal-n.jpeg",
    bio: "Plastic, Reconstructive & Aesthetic Surgeon at Derma Solutions.",
  },
] as const;

/** The founder, referenced by schema as founder/employee of the clinic. */
export const founder = team[0];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

// Every path below was checked against seo-backup/00-site-level/urls-master.txt.
// Paths are root-relative so preview deploys work; the slugs themselves are
// load-bearing for SEO and must not change.
export const serviceMenu = [
  {
    group: "Cosmetology",
    // The group heading links to the live site's cosmetic dermatology overview.
    path: "/cosmetic-dermatology-in-bangalore/",
    items: [
      { label: "Acne Scar Treatment", path: "/acne-scar-treatment-in-bangalore/" },
      {
        label: "MNRF Treatment",
        path: "/mnrf-treatment-in-bangalore-microneedling-with-radio-frequency/",
      },
      {
        label: "HydraFacial Treatment",
        path: "/best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore/",
      },
      { label: "Hollywood Facial", path: "/hollywood-facial-carbon-laser-peel-bangalore/" },
      { label: "Chemical Peels", path: "/chemical-peel-treatment-in-bangalore/" },
      { label: "Skin Boosters", path: "/skin-boosters-treatment-in-bangalore/" },
      { label: "Salmon Sperm PDRN Facial", path: "/salmon-sperm-pdrn-facial-in-bangalore/" },
      { label: "Microdermabrasion Treatment", path: "/microdermabrasion-treatment-in-bangalore/" },
      { label: "Skin Lightening", path: "/skin-lightening-treatment-in-bangalore/" },
      // Was Dr Sandeep's profile: the live site has no Dermato Surgery page.
      // This one is authored (scripts/added-pages.ts), per content/Treatment
      // doc note 4.
      { label: "Dermato Surgery", path: "/dermato-surgery-in-bangalore/" },
    ],
  },
  {
    group: "Laser Treatment",
    items: [
      { label: "Laser Hair Removal", path: "/laser-hair-removal-in-bangalore/" },
      { label: "Laser Skin Toning", path: "/laser-toning-treatment-in-bangalore/" },
      { label: "CO2 Fractional Laser", path: "/fractional-co2-laser-skin-resurfacing-in-bangalore/" },
      { label: "Mole Removal", path: "/mole-removal-treatment-in-bangalore/" },
      { label: "Wart Removal", path: "/warts-removal-treatment-in-bangalore/" },
      // Content-template page (src/templates/ContentPage.tsx): no treatment
      // media, so the homepage services carousel skips it.
      { label: "Laser Tattoo Removal", path: "/laser-tattoo-removal-in-bangalore/" },
    ],
  },
  {
    group: "Anti-Ageing Treatment",
    items: [
      { label: "Botox", path: "/botox-treatment-in-bangalore-whitefield-and-marathahalli/" },
      { label: "Dermal Fillers Treatment", path: "/dermal-fillers-treatment-bangalore/" },
      { label: "Skin Tightening", path: "/skin-tightening-treatment-in-marathahalli-whitefield/" },
      { label: "Radio Frequency Treatment", path: "/radio-frequency-skin-tightening-treatment/" },
      { label: "HIFU Treatment", path: "/hifu-treatment-in-bangalore/" },
      { label: "Thread Lifts", path: "/thread-lifts/" },
      // CONFLICT: the live nav links to
      // /iv-glutathione-treatment-in-bangalore-derma-solutions-clinic/ which is a
      // 404 — it is not among the 92 live URLs. Two real pages exist
      // (/iv-glutathione-treatment-in-bangalore/ and /iv-glutathione-treatment/)
      // and are true duplicates; fix-plan.md #1b keeps the first and redirects
      // the second. That keeper is used here.
      { label: "IV Glutathione Treatment", path: "/iv-glutathione-treatment-in-bangalore/" },
      { label: "NAD IV Drips", path: "/nad-iv-drips-treatment-in-bangalore/" },
      { label: "Weight / Fat Loss Injections", path: "/weight-loss-injections-in-bangalore/" },
      // Content-template pages, beside the injections as the other non-surgical
      // weight options. No treatment media: the homepage carousel skips them.
      { label: "Weight Loss Treatment", path: "/weight-loss-treatment-in-marathahalli/" },
      { label: "Inch Reduction", path: "/inch-reduction-treatment-in-bangalore/" },
    ],
  },
  {
    group: "Cosmetic Surgeries",
    // The group heading links to the live site's cosmetic plastic surgery overview.
    path: "/cosmetic-plastic-surgery-in-marathahalli/",
    items: [
      { label: "Xanthelasma Removal", path: "/xanthelasma-removal-treatment-in-bangalore/" },
      { label: "Cryolipolysis - CoolSculpting", path: "/cryolipolysis-coolsculpting-in-bangalore/" },
      { label: "Ear Lobe Repair Surgery", path: "/ear-lobe-repair-surgery-in-bangalore/" },
      {
        label: "Abdominoplasty (Tummy Tuck)",
        path: "/abdominoplasty-tummy-tuck-treatment-in-bangalore/",
      },
      { label: "Rhinoplasty Surgery", path: "/rhinoplasty-surgery-in-bangalore/" },
      { label: "Vitiligo Treatment", path: "/vitiligo-laser-treatment-in-bangalore/" },
      { label: "Breast Surgeries", path: "/breast-surgeries-in-bangalore/" },
      { label: "Phototherapy Treatment", path: "/phototherapy-treatment-in-bangalore/" },
      { label: "Liposuction", path: "/liposuction-treatment-in-bangalore/" },
      { label: "Gynecomastia Surgery", path: "/gynecomastia-surgery-in-bangalore/" },
    ],
  },
  {
    group: "Hair Services",
    items: [
      { label: "Hair Transplant", path: "/hair-transplant-in-bangalore-marathahalli-whitefield/" },
      { label: "GFC Hair Treatment", path: "/gfc-hair-treatment-in-bangalore/" },
      { label: "Hair Loss", path: "/best-hair-loss-treatment-in-bangalore/" },
      { label: "Hair Analysis", path: "/hair-analysis-in-bangalore/" },
    ],
  },
] as const;

export const navigation = {
  header: [
    { label: "Home", path: "/" },
    // Labels follow the copy doc's section 01; the routes behind them are
    // unchanged. Its "Contact Us" item is deliberately absent — /contact-us/ is
    // the one known-dangling path in scripts/verify-links.ts and 404s
    // today, so putting it in the primary nav would ship a broken link.
    // Was team[0].path — the founder's page stood in as "About Us" until the
    // real page existed. It is still reached from the Doctors dropdown and from
    // the About page's own team band, so nothing is orphaned by the change.
    { label: "About Us", path: "/about-us/" },
    { label: "Treatments", groups: serviceMenu },
    {
      label: "Doctors",
      // The label itself links to the index page; the chevron beside it opens
      // the dropdown. See the items branch in src/layout/Header.tsx.
      path: "/our-doctors/",
      items: team.map((d) => ({
        label: d.displayName,
        sublabel: d.qualification,
        path: d.path,
      })),
    },
    {
      label: "Gallery",
      items: [
        { label: "Image Gallery", path: "/image-gallery/" },
        { label: "Video Gallery", path: "/video-gallery/" },
      ],
    },
    {
      // As with Doctors: the label links to the articles, the chevron opens the
      // two halves of the section. See the items branch in src/layout/Header.tsx.
      label: "Blogs & Media",
      path: "/blogs/",
      items: [
        { label: "Blogs", path: "/blogs/" },
        { label: "Media Coverage", path: "/media/" },
      ],
    },
    // The header's accent pill. The phone number beside it is rendered straight
    // from `contact`, not from here, so this entry is the booking CTA alone.
    { label: contact.ctaLabelHeader, href: contact.ctaHref, isCta: true },
  ],
  // The footer's "Quick Link" column. Deliberately short — it is a shortcut list,
  // not a second copy of the header. /contact-us/ is omitted because it 404s (see
  // the KNOWN_DANGLING note in scripts/verify-links.ts); add it once the page exists.
  quickLinks: [
    { label: "Home", path: "/" },
    // Repointed from team[0].path with the header's entry — see the note there.
    { label: "About Us", path: "/about-us/" },
    { label: "Blogs", path: "/blogs/" },
    { label: "Media Coverage", path: "/media/" },
    { label: "Image Gallery", path: "/image-gallery/" },
    { label: "Video Gallery", path: "/video-gallery/" },
    { label: "Contact Us", path: seo.contactPath },
  ],
  footer: [
    { label: "Privacy Policy", path: legal.privacyPolicyPath },
    { label: "Terms Of Use", path: legal.termsPath },
  ],
} as const;

// Homepage See the Difference band. content/home-page/Derma-Solutions-Homepage-
// Copy-Glowix-Template-2.md, section 10 — the strings are the doc's, verbatim.
//
// TODO(compliance): copy doc note 2 sits on the four photographs this band
// renders — see the blocking consent TODO on assets.transformation1.
// `disclaimer` below is the doc's required "Results vary from person to person."
// line and must stay visible next to the images; do not move it into a tooltip,
// an accordion or the page footer.
//
// The doc asks for "Image Labels: Before / After (2 pairs)" and this is four
// singles instead, with no beforeLabel/afterLabel to render. Both changes follow
// from the photographs: the clinic supplied four composites that already carry
// their own burned-in Before and After labels, so a caption here would print the
// word twice and a "pair" has nothing left to pair. The doc's intent — every
// after shot shown against its own before, never alone — is stronger this way,
// since the two halves cannot be separated by a layout at any width.
export const homeSeeTheDifference = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "See the Difference",
  heading: "Our real patient transformations and visible results",
  transformations: [
    { id: "transformation-1", image: assets.transformation1, imageAlt: assets.transformation1Alt },
    { id: "transformation-2", image: assets.transformation2, imageAlt: assets.transformation2Alt },
    { id: "transformation-3", image: assets.transformation3, imageAlt: assets.transformation3Alt },
    { id: "transformation-4", image: assets.transformation4, imageAlt: assets.transformation4Alt },
  ],
  disclaimer: legal.resultsVary,
  // The band shows four of the clinic's transformations; /image-gallery/ is the
  // page that holds the rest, and is the same destination homeCaseStudies.cta
  // uses for the same reason.
  cta: { label: "View All", href: "/image-gallery/" },
} as const;

/**
 * content/home-page/Derma-Solutions-Homepage-Copy-Glowix-Template-2.md,
 * section 11. The one band on the homepage that takes input rather than
 * presenting copy.
 *
 * The doctor list is deliberately not written out here: `team` above already
 * carries exactly the four names the copy doc's dropdown asks for, in the same
 * order, and HomeAppointment reads their `displayName` straight off it. A
 * second copy would be free to drift from the doctor pages.
 */
export const homeAppointment = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Appointment",
  heading: "Schedule your consultation today!",
  // The Google Apps Script web app — apps-script/Code.gs, deployed as described
  // in apps-script/README.md. Updating the script means "Manage deployments →
  // New version", which keeps this URL; a new deployment would change it. If it
  // is ever emptied, a valid submission renders messages.unconfigured rather
  // than redirecting to /thank-you/ — see the submit handler in
  // AppointmentForm.tsx for why it must never claim a booking it did not take.
  //
  // The form POSTs the fields below as application/x-www-form-urlencoded,
  // keyed by `name`, so doPost(e) reads them off e.parameter. No env var: this
  // repo has no .env file and no import.meta.env convention, and
  // tracking.gtmId sits here the same way.
  endpoint:
    "https://script.google.com/macros/s/AKfycbzn1q08pN-WPYPls57-nhdKD-obu6imk_B862Vks2BlkpVhBGvRlbOKUbrvj8HoNQZa/exec",
  /**
   * The reference labels these with placeholders alone. `label` is the
   * accessible name the visually-hidden <label> carries — a placeholder stops
   * being readable the moment a field has content in it.
   *
   * `name` is what the Apps Script receives, and matches the reference form's
   * own field names so a script written against either works.
   */
  fields: [
    {
      id: "first-name",
      name: "first-name",
      label: "First name",
      placeholder: "First Name",
      type: "text",
      autoComplete: "given-name",
    },
    {
      id: "last-name",
      name: "last-name",
      label: "Last name",
      placeholder: "Last Name",
      type: "text",
      autoComplete: "family-name",
    },
    // Phone above email, and email optional, since the About round:
    // content/about-us/Derma_Solutions_Home_Technology_and_About_Us_Content.md,
    // B9 form note — "Phone moved above email and email made optional — fewer
    // drop-offs on mobile." Applied here rather than in an About-only copy of
    // the form, so the homepage takes the same fix. With md:grid-cols-2 the
    // reorder puts phone in the left cell of row two, which is the doc's order.
    {
      id: "phone",
      name: "phone",
      label: "Phone number",
      placeholder: "Phone Number",
      type: "tel",
      autoComplete: "tel",
    },
    // The one optional field. `required` is absent everywhere else and defaults
    // to true in the validator — only this field opts out. An address that IS
    // typed still has to be a valid one.
    {
      id: "email",
      name: "email",
      label: "Email address (optional)",
      placeholder: "Email Address (optional)",
      type: "email",
      autoComplete: "email",
      required: false,
    },
    // The copy doc asks for dd-mm-yyyy. A native date input renders the
    // visitor's own locale format and cannot be told otherwise; the alternative
    // is a datepicker dependency, which is not worth it for one field. The
    // placeholder is what a browser shows before the native format takes over.
    {
      id: "date",
      name: "date",
      label: "Preferred date",
      placeholder: "Preferred Date",
      type: "date",
      autoComplete: "off",
    },
  ],
  /** The <select>. Its first option is the label, exactly as the reference's is. */
  doctorField: {
    id: "choosedoctor",
    name: "choosedoctor",
    label: "Choose doctor",
    placeholder: "Choose Doctor",
    // The About doc's B9 dropdown ends with a fifth option the reference has
    // no equivalent for. It is a real drop-off fix — a visitor with no
    // preference otherwise has to pick a doctor at random or abandon the form —
    // and costs one <option> after the team.map().
    noPreferenceLabel: "No preference",
  },
  /**
   * New in the About round — not in the reference form at all.
   * content/about-us/…About_Us_Content.md, B9: "The consent line enables
   * WhatsApp follow-ups."
   *
   * Held in the same `values` record as every other control ('yes' or ''), so
   * the existing URLSearchParams POST carries it to the Apps Script with no
   * change to the submit handler. The consent that matters is the one the
   * clinic can produce later, which means it has to reach the sheet — not just
   * gate the button in the browser.
   */
  consent: {
    id: "whatsapp-consent",
    name: "consent",
    label:
      "I agree to be contacted by Derma Solutions on call and WhatsApp about my appointment.",
  },
  submitLabel: "Get Appointment",
  submittingLabel: "Sending...",
  messages: {
    required: "This field is required.",
    invalidEmail: "Enter a valid email address.",
    invalidPhone: "Enter a valid phone number.",
    /** The consent checkbox. Its own line, because "required" reads oddly beside a sentence. */
    consentRequired: "Please agree to be contacted so we can confirm your appointment.",
    error:
      "Something went wrong and your request was not sent. Please call the clinic on " +
      `${contact.phoneDisplay}.`,
    // Shown in place of the /thank-you/ redirect while `endpoint` is empty.
    // Deliberately not a thank-you: nothing has been received by anyone.
    unconfigured:
      "Online booking is not live yet. Please call the clinic on " +
      `${contact.phoneDisplay} to book your consultation.`,
  },
} as const;

/**
 * /book-appointment/ — src/sections/appointment/BookAppointment.tsx, built to
 * theme-reference/04-sections/34-make-an-appointment/.
 *
 * TODO(content): there is no copy doc for this page. The eyebrow, heading and
 * box titles are the reference's own wording; the form copy is
 * `homeAppointment`'s, reused unchanged, and the phone and hours are read from
 * `contact` and `hours` rather than restated.
 */
export const bookAppointment = {
  /** Uppercased in CSS, as homeAppointment's is. */
  eyebrow: "Appointment",
  heading: "Make an appointment",
  servicesTitle: "Customer Services",
  hoursTitle: "Opening Hours",
} as const;

/**
 * /thank-you/ — src/pages/ThankYou.tsx, where AppointmentForm lands after a
 * successful submit. noindex and not in the sitemap.
 *
 * TODO(content): authored, not the client's. The steps promise a call and a
 * WhatsApp confirmation — check both match what the front desk actually does.
 */
export const thankYou = {
  title: `Thank You | ${brand.shortName}`,
  h1: "Thank You",
  eyebrow: "Request received",
  heading: "We've received your appointment request",
  lead:
    "Our team will call you during clinic hours to confirm your date and doctor. " +
    "There's nothing more you need to do right now.",
  stepsTitle: "What happens next",
  steps: [
    {
      title: "We call you",
      text: `Our front desk calls from ${contact.phoneDisplay} to confirm your slot.`,
    },
    {
      title: "Confirmation on WhatsApp",
      text: "You get the date, time and doctor on WhatsApp, so it's there when you need it.",
    },
    {
      title: "Visit the clinic",
      text: "Come to our Marathahalli clinic on the day. Please arrive ten minutes early.",
    },
  ],
  helpTitle: "Need it sooner?",
  helpText: "Call or WhatsApp us and we'll book you in straight away.",
  callLabel: "Call the clinic",
  whatsappLabel: "WhatsApp us",
  homeLabel: "Back to home",
  addressTitle: "Clinic address",
  hoursTitle: "Opening Hours",
} as const;

/* -------------------------------------------------------------------------- */
/* Footer call-to-action                                                       */
/* -------------------------------------------------------------------------- */

// Homepage hero copy. The H1 is deliberately absent — it comes from the SEO
// registry via PageShell, so it cannot drift from the captured live H1.
export const homeHero = {
  eyebrow: `Welcome to ${brand.shortName}`,
  /** content/home-page/Derma-Solutions-Homepage-Copy-Glowix-Template-2.md, section 02. */
  body:
    "Expert dermatology, laser, anti-aging and hair transplant care in Marathahalli, " +
    "Whitefield. Doctor-led plans built around your skin, your goals and honest advice - " +
    "open six days a week.",
  // The copy doc asks for a Google rating strip, then rules out hardcoding a
  // figure (compliance note 5) — an uncurrent rating is the risk. This is the
  // doc's own fallback wording. Swap in a live rating when one is wired up.
  /** Copy doc section 02 — shorter than the header's button, deliberately. */
  primaryLabel: "Book Appointment",
  ratingNote: "Rated highly by patients across Bangalore",
  // The reference opens a YouTube lightbox here. There is no video ID, so the
  // same treatment links to the real gallery route instead.
  secondary: { label: "Watch Video", path: "/video-gallery/" },
} as const;

// Homepage trust strip, directly under the hero. New in the 2026-09 revision
// round — content/home-page/DERMA SOLUTIONS — HOMEPAGE COPY.md, the block the
// doc heads "Trust Badege". The strings are the doc's, verbatim.
//
// Still four tiles, but only the first is the doc's. The client replaced the
// two worded tiles — "Advanced Care / Skin, Hair & Aesthetic Treatments Under
// One Roof" and "Innovation / Advanced Technology & Modern Treatment Solutions"
// — with two volume figures, and gave the pairings explicitly:
// 15,000+ patients, 60,000+ PRP & GFC, 50,000+ laser.
//
// `value` stays a string and nothing here counts up, although every tile is now
// a number and the original reason not to — that a strip where half the tiles
// tween and half sit still reads as a bug — no longer applies. It stays static
// deliberately: homeSeeTheDifference.counters already tweens four figures lower
// down the same page, and two counting rows on one homepage is noise, not
// emphasis. Add useCountUp here only if that row goes.
//
// TODO(compliance): copy doc note 1, the same ASCI substantiation caveat that
// sits on homeAbout.badge and homeSeeTheDifference.counters. Every figure here
// must be backed by clinic records if challenged, and two of the four are new
// to the site in this round. Confirm all of them with Dr Sandeep before launch.
//
// This strip and homeSeeTheDifference.counters are now near-duplicates of each
// other, and that is the thing to settle before launch rather than any single
// number:
//
//                 this strip                 counter row, lower down
//     years       35+ (team, combined)       20+ (Dr Sandeep alone)
//     laser       50,000+ Laser Treatments   50,000+ Laser Procedures
//     also        15,000+ patients           10,000+ hair transplants
//                 60,000+ PRP & GFC          4 in-house specialists
//
//  - THE LASER FIGURE IS THE SAME CLAIM TWICE, same number, different noun.
//    One of the two rows should drop it.
//  - The two years figures disagree and nothing on the page says why. Either
//    qualify this tile's `body` ("across our specialists" is already implied by
//    "Combined") or align them.
//  - The live site carried 60,000+ against PRP, which is what this now says, so
//    that pairing is back to matching the old site. The original copy doc flags
//    both it and the 40,000+ peels figure as needing the same records check.
export const homeTrustBadges = {
  badges: [
    {
      id: "experience",
      value: "35+",
      label: "Years",
      body: "Combined Dermatology & Aesthetic Experience",
    },
    {
      id: "patients",
      value: "15,000+",
      label: "",
      body: "Patients Treated with Personalised Care",
    },
    {
      id: "prp-gfc",
      value: "60,000+",
      label: "",
      body: "PRP & GFC Treatments Performed",
    },
    {
      id: "laser",
      value: "50,000+",
      label: "",
      body: "Laser Treatments Performed",
    },
  ],
} as const;

// Homepage About band. content/home-page/Derma-Solutions-Homepage-Copy-Glowix-
// Template-2.md, section 03 — the strings are the doc's, verbatim.
export const homeAbout = {
  /** Uppercased in CSS, as homeHero's is. */
  eyebrow: "About Us",
  heading: "Your journey to radiant, confident skin",
  // Two paragraphs, not one string: the 2026-09 revision round replaced the
  // single sentence here and asked to "increase the text content" in the same
  // breath as removing the photo that used to sit beside the checklist.
  body: [
    "Derma Solutions is a skin, hair and aesthetic clinic in Marathahalli, " +
      "Whitefield, Bangalore. We combine expert dermatology with advanced cosmetic " +
      "and surgical treatments, giving you the right care for every concern.",
    "Led by Dr Sandeep Mahapatra (MBBS, MD Dermatology), our team focuses on " +
      "accurate diagnosis, personalised treatment plans and transparent guidance, " +
      "with no pressure or guesswork.",
  ],
  // Four points now, not three. The last one is the only string on the page
  // that is NOT the copy doc verbatim: the doc writes "Open 7 days | 9:30 AM –
  // 6:00 PM", which were not the clinic's hours (see `hours`). Composing it
  // means the page cannot quote a different set of hours from the footer.
  checklist: [
    "Doctor-led diagnosis & personalised plans",
    "FDA-approved lasers & advanced technology",
    "Skin, hair & cosmetic care under one roof",
    hours.displayShort,
  ],
  // TODO(compliance): copy doc note 1 — under ASCI substantiation rules a
  // numeric claim must be backed by clinic records. Confirm the figure with
  // Dr Sandeep before launch. The reference reads "15+ Years of Experience";
  // this is the doc's own wording for the same badge.
  badge: "20 Years of Expertise",
  contactLabel: "Speak to a specialist:",
  // Was team[0].path, chosen only because it was a real route at the time. Now
  // that /about-us/ exists, "Learn More About Us" points at the About page —
  // which is what the label always said it did.
  cta: { label: "Learn More About Us", path: "/about-us/" },
} as const;

// Homepage Meet the Dermatologist band. New in the 2026-09 revision round —
// content/home-page/DERMA SOLUTIONS — HOMEPAGE COPY.md, whose annotation on the
// old band reads "Change this section from what we do to Meet the
// Dermatologist." The strings are the doc's, verbatim.
//
// It replaces homeWhatWeDo outright. That band's three checklist items
// ("Restore Firmness and Shape", "Minimise Acne Scars and Pigmentation",
// "Tailored Treatments for Men") are gone from the homepage with it; nothing
// else referenced them.
//
// `credentials` overlaps team[0] — its `credentials`, `alumniOf` and `awards`
// carry the same facts. They are not shared deliberately: team[0] is the
// structured source that src/seo/ reads into the Person JSON-LD, one fact per
// array entry, while these are the doc's pipe-separated display strings. Edit
// both when a qualification changes.
export const homeMeetDermatologist = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Meet the Dermatologist",
  heading: "Meet Dr. Sandeep Mahapatra",
  subheading: "Dermatology, Aesthetics & Hair Restoration",
  body:
    "Dr. Sandeep Mahapatra is a Senior Consultant Dermatologist, Cosmetic Expert " +
    "and Hair Transplant Surgeon, and the Founder of Derma Solutions. With over two " +
    "decades of experience, he combines medical dermatology with advanced aesthetic " +
    "and hair treatments.",
  credentials: [
    {
      label: "Qualification",
      value: "MBBS – MGM MCH, Jamshedpur | MD Dermatology – RIMS, Ranchi",
    },
    {
      label: "Academic Excellence",
      value:
        "MBBS with Honours & Gold Medalist in two subjects | MD Dermatology Gold Medalist",
    },
    {
      label: "Advanced Certifications",
      value:
        "Certified DHI Hair Transplant Specialist | Allergan-certified in Botox & Dermal Fillers",
    },
    {
      label: "Expertise",
      value:
        "Clinical Dermatology | Cosmetic Dermatology | Hair Restoration | Aesthetic Treatments",
    },
    {
      label: "Experience",
      value: "20+ years of experience in skin, hair and aesthetic care",
    },
  ],
  // NOTE: the copy doc gives this band three volume figures — 50,000+ Laser
  // Hair Removal Treatments, 10,000+ Hair Transplants, 40,000+ Chemical Peels —
  // and they were built here as a counter row. They are not rendered any more;
  // the row was removed on the client's instruction after review.
  //
  // Two things that resolves, worth knowing before anyone restores them:
  //
  //  - The homepage no longer states 10,000 hair transplants twice. That figure
  //    still appears once, in homeSeeTheDifference.counters, which is now its
  //    only home. Restoring these three would reintroduce the contradiction
  //    risk — revise both together if so.
  //  - The page's sharpest ASCI substantiation exposure drops back to
  //    homeSeeTheDifference.counters alone. The caveat there is unchanged.
  /** The doc's own CTA text, pointed at the founder's page as homeAbout's is. */
  cta: { label: "Meet Dr. Sandeep Mahapatra", path: team[0].path },
} as const;

// The two technology banners. New in the 2026-09 revision round — the doc
// supplies each as a full-width image plus a "Short paragraph below the banner"
// and a "Section Subheading", and the strings are the doc's, verbatim.
//
// One array, rendered twice by one section, because the two are the same band
// with different artwork. `tone` is the ground the artwork sits on, which the
// section uses to pick the panel's fallback background while the image loads —
// banner 1 is dark maroon, banner 2 near-white.
//
// The doc orders them consecutively, after About and before Meet the
// Dermatologist. They are split here instead: two 3.2:1 strips stacked read as
// one broken image. Banner 1 keeps the doc's slot; banner 2 follows Meet the
// Dermatologist. See the order table in src/pages/Home.tsx.
//
// NOTE: the subheadings deliberately do not repeat the words baked into the
// artwork ("Advanced Technology. Visible Skin Transformation." and
// "Next-Generation Technology. Expertly Delivered."). Those are carried by
// assets.techBanner*Alt, and on a wide screen a reader sees both.
export const homeTechBanners = [
  {
    id: "technology",
    subheading: "Technology Designed Around Your Skin",
    body:
      "At Derma Solutions, advanced dermatological technology meets personalised " +
      "care. From RF skin tightening to HIFU, our treatments are selected based on " +
      "your skin concerns, goals and individual needs.",
    image: assets.techBanner1,
    imageSmall: assets.techBanner1Small,
    imageAlt: assets.techBanner1Alt,
    tone: "dark",
  },
  {
    id: "solutions",
    subheading: "Advanced Solutions. Personalised Results.",
    body:
      "Our clinic combines advanced laser platforms and body-contouring technology " +
      "with dermatologist-supervised treatment. Every procedure is planned with your " +
      "skin type, treatment area and desired outcome in mind.",
    image: assets.techBanner2,
    imageSmall: assets.techBanner2Small,
    imageAlt: assets.techBanner2Alt,
    tone: "light",
  },
] as const;

// The video band under What We Do. Copy doc section 04: "Use a clinic video
// from the existing Video Gallery. Do not use stock footage."
export const homeVideo = {
  // TODO(content): the clinic's own most-embedded video across the captured
  // site (seo-backup/01-raw-html/desktop/*.html), used here so the band is not
  // stock footage. Confirm with Dr Sandeep which video should carry the
  // homepage, then re-pull assets.videoPoster to match.
  youtubeId: "kaShO9fY0hM",
  /** The reference's label sits inside the play ring rather than beside it. */
  playLabel: "Play",
  /** Names the iframe for screen readers once the facade is replaced. */
  title: "Derma Solutions clinic video",
} as const;

// Homepage Services grid. content/home-page/Derma-Solutions-Homepage-Copy-
// Glowix-Template-2.md, section 05 — titles and body copy are the doc's,
// verbatim.
//
// The six `path`s are the point of this section: it is the homepage's main
// internal link hub into the treatment pages. Every one was checked against
// src/routes.generated.tsx and resolves to a real route.
//
// All six photographs are the clinic's own, one shot per card, and the shoot
// delivered them at 1536x1024 — exactly the 3:2 the cards render, so none of the
// six is cropped to fit. See scripts/import-home-images.ts.
export const homeServices = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Services",
  heading: "Explore our full range of skin & hair treatments",
  /** Names the tab row for a screen reader; the tabs themselves are serviceMenu's groups. */
  tablistLabel: "Treatment categories",
  // NOTE: nothing renders `cards` any more. The band now builds its cards from
  // `serviceMenu` above — all 38 treatments behind the same 5 category tabs the
  // header's mega-menu uses — so the homepage and the nav cannot disagree about
  // what sits in which category, and every treatment page is one click from the
  // homepage instead of six of them being.
  //
  // These six are kept because they are not the same thing and cannot be
  // rebuilt from serviceMenu: they are CATEGORY cards with hand-written doc
  // copy ("Laser Treatments", not "Laser Hair Removal") and their own
  // photographs in public/images/decor/services/, which are the only images on
  // the page shot at the card slot's full 654x436. If the tabs are ever
  // reverted, or an overview tab is added, this is the copy for it.
  //
  // The internal-link hub note below still describes these six paths; the tabs
  // now carry all 38, which is a superset of them.
  cards: [
    {
      title: "Laser Treatments",
      body: "FDA-approved lasers for hair removal, tattoo removal, toning and scar reduction.",
      path: "/laser-hair-removal-in-bangalore/",
      image: "/images/decor/services/service-1.jpg",
      imageAlt:
        "Patient in protective eyewear receiving a laser treatment to the cheek from a clinician",
    },
    {
      title: "Skin & Cosmetology",
      body: "Acne scar treatment, peels, HydraFacial and MNRF for even, glowing skin.",
      path: "/acne-scar-treatment-in-bangalore/",
      image: "/images/decor/services/service-2.jpg",
      imageAlt:
        "Clinician brushing a peel solution onto a reclining patient's cheek",
    },
    {
      // TODO(compliance): copy doc note 3 — "Botox" is a prescription brand
      // name, which sits close to the Drugs and Magic Remedies Act line. Kept
      // deliberately: the site already names it in serviceMenu and
      // /botox-treatment-in-bangalore-whitefield-and-marathahalli/ is a live
      // page, so removing it here alone would buy nothing. The doc's
      // zero-exposure alternative is "Anti-wrinkle injections, dermal fillers,
      // HIFU and thread lifts."
      title: "Anti-Aging & Injectables",
      body: "Botox, dermal fillers, HIFU and thread lifts to lift and smooth.",
      path: "/botox-treatment-in-bangalore-whitefield-and-marathahalli/",
      image: "/images/decor/services/service-3.jpg",
      imageAlt:
        "Gloved clinician injecting a fine needle above a reclining patient's lip",
    },
    {
      title: "Hair Restoration",
      body: "Hair transplant, GFC therapy and hair fall treatment with detailed hair analysis.",
      path: "/hair-transplant-in-bangalore-marathahalli-whitefield/",
      image: "/images/decor/services/service-4.jpg",
      imageAlt:
        "Surgeon in scrubs working along a patient's hairline during a transplant",
    },
    {
      title: "Cosmetic Surgery",
      body: "Liposuction, tummy tuck, rhinoplasty and gynecomastia by in-house plastic surgeons.",
      path: "/liposuction-treatment-in-bangalore/",
      image: "/images/decor/services/service-5.jpg",
      imageAlt:
        "Surgeon drawing contouring guide lines on a patient's abdomen before surgery",
    },
    {
      title: "Advanced Facials",
      body: "HydraFacial, carbon peel and PDRN facials for hydration and glow, no downtime.",
      path: "/best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore/",
      image: "/images/decor/services/service-6.jpg",
      imageAlt:
        "Gloved therapist running a hydrafacial handpiece across a reclining patient's forehead",
    },
  ],
  // TODO(compliance): copy doc note 4 — the reference's strip is a "Free" pill
  // reading "Get a Free Assessment", and the doc rules that out unless the
  // consultation genuinely is free. This is the doc's own fallback, so the
  // pill is deliberately absent. Restore both together, or neither.
  //
  // The reference links this at /contact-us/, which 404s here and is already
  // flagged in scripts/verify-links.ts. contact.ctaHref is the booking page
  // the hero and header CTAs use.
  cta: {
    text: "Not sure which treatment is right for you?",
    label: "Book a Consultation",
    href: contact.ctaHref,
  },
} as const;

// Homepage Case Studies band. content/home-page/Derma-Solutions-Homepage-Copy-
// Glowix-Template-2.md, section 06 — the strings are the doc's, verbatim.
//
// The doc gives four card titles and no per-card destination, because this
// rebuild has no case-study routes: the reference's four /casestudy/<slug>/
// posts have no equivalent here. /image-gallery/ is the one page that holds the
// clinic's transformation images, so every card and the button point at it.
//
// TODO(compliance): copy doc note 2, still blocking, and now for the half of it
// that is harder to satisfy. "Do not use stock or theme demo images as patient
// results" is settled — the four Glowix procedure shots are gone and these are
// four of the clinic's own patients. "Use only the clinic's own images with
// signed patient consent on file" is not: confirm consent for each of the four
// before launch. These are recognisable faces sitting directly under result
// claims, which is the strongest form of the exposure the note is about.
//
// TODO(content): confirm the four are four different people. `Card Titles/1.png`
// and `2.png` may be the same man photographed in two sessions, and one patient
// appearing under two different result claims would undo the point of the band.
// If they are the same, the clinic needs a fourth face.
//
// The pairing of face to claim is the rebuild's, not the clinic's — the shoot
// delivered the four portraits unlabelled. Have Dr Sandeep confirm each face is
// under the right treatment before launch.
//
// The doc's required "Results vary from person to person" line is the last
// sentence of `body` below and must stay visible next to the tiles.
//
// The alt text deliberately describes only what is in frame. Restating a card's
// title in its alt would make the photograph itself assert the result.
// NOTE: nothing renders this. The Case Studies band was hidden on the client's
// instruction after review — see the note in src/pages/Home.tsx. The export and
// src/sections/HomeCaseStudies.tsx are both kept intact so restoring the band
// is two uncommented lines there and nothing here.
export const homeCaseStudies = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Case Studies",
  heading: "Our remarkable transformations",
  body:
    "Real patients, real results. See how our doctor-led skin, hair and cosmetic " +
    "treatments have restored confidence. Results vary from person to person.",
  cta: {
    label: "View All Case Studies",
    href: "/image-gallery/",
  },
  cards: [
    {
      title: "Clearer Skin, Fewer Scars",
      image: "/images/decor/case-studies/case-study-1.jpg",
      imageAlt: "Patient photographed in profile, cheek and jawline in frame",
    },
    {
      title: "Fuller Hair After Transplant",
      image: "/images/decor/case-studies/case-study-2.jpg",
      imageAlt: "Patient photographed head-on, smiling, hairline in frame",
    },
    {
      title: "Even Tone, Less Pigmentation",
      image: "/images/decor/case-studies/case-study-3.jpg",
      imageAlt: "Patient photographed head-on in the treatment chair, looking down",
    },
    {
      title: "Lifted, Smoother Skin",
      image: "/images/decor/case-studies/case-study-4.jpg",
      imageAlt: "Patient photographed in three-quarter profile, wearing glasses",
    },
  ],
} as const;

// Homepage Why Choose Us band. content/home-page/Derma-Solutions-Homepage-Copy-
// Glowix-Template-2.md, section 07 — the strings are the doc's, verbatim.
//
// The doc labels the two paragraphs "Paragraph 1" and "Paragraph 2". The
// reference sets the second in Marcellus 22/31 and marks it up as an <h3>;
// here it stays a paragraph. See the departures list in HomeWhyChooseUs.tsx.
export const homeWhyChooseUs = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Why Choose Us",
  heading: "Why Patients Across Bangalore Choose Derma Solutions",
  // The 2026-09 revision round replaced this band's two paragraphs with four
  // titled points. `title` carries the doc's trailing full stop, because the
  // section sets it inline with `body` and the two run together without it.
  points: [
    {
      title: "Tailored Treatment Plans.",
      body:
        "Every skin is unique. We build personalized plans based on an in-depth " +
        "diagnosis, not a fixed menu.",
    },
    {
      title: "Comprehensive Care Under One Roof.",
      body:
        "From common skin conditions to advanced cosmetic and surgical procedures, " +
        "you are treated by the right specialist without being sent elsewhere.",
    },
    {
      title: "Patient-Centered Approach.",
      body:
        "Your comfort, safety and results come first, with clear communication at " +
        "every step.",
    },
    {
      title: "Modern Medical Technology.",
      body:
        "We use the latest FDA-approved lasers and cosmetic technology, including " +
        "Q-switched ND:YAG and advanced systems for safe, effective outcomes.",
    },
  ],
  // The doc writes this CTA as "Book Your Consultation > Book an Appointment" —
  // the label it wants, after the one it replaces. contact.ctaHref is the same
  // substitution homeServices.cta makes; see the TODO there.
  cta: { label: "Book an Appointment", href: contact.ctaHref },
  contactLabel: "Contact Us:",
  // TODO(compliance): copy doc note 1, the same ASCI substantiation caveat that
  // sits on homeAbout.badge and homeWhatWeDo.badgeValue. Confirm the figure with
  // Dr Sandeep before launch. The reference's badge reads "25YEARS EXPERIENCE";
  // this is the doc's own number, and it carries the space the demo drops.
  badge: "20+ Years of Expertise",
} as const;

// The How It Works band is gone. The 2026-09 revision round struck it — the
// doc's instruction reads "REMOVE HOW IT WORKS SECTION MERGE WITH WHY CHOOSE
// US" — and its four steps (Consultation & Analysis, Accurate Diagnosis,
// Personalised Treatment Plan, Expert Treatment & Follow-Up) did not survive
// into homeWhyChooseUs.points, which is the client's own four-point list. The
// copy is still in git history and in
// content/home-page/Derma-Solutions-Homepage-Copy-Glowix-Template-2.md
// section 08 if it is ever wanted back.

// Homepage Testimonials band. content/home-page/Derma-Solutions-Homepage-Copy-
// Glowix-Template-2.md, section 09 — the strings are the doc's, verbatim.
//
// The doc supplies one featured quote and three small ones. The band no longer
// distinguishes them: it is a heading over one carousel, so all four are peers
// in `cards` and Neha Sharma is simply the first slide. See HomeTestimonials.tsx.
//
// `initial` is stored rather than sliced off `name`: "Dr Manoj Waghmare" begins
// with the honorific, so the letter on his disc is a content decision and not a
// string trick. It follows whatever the name becomes.
//
// All four quotes were replaced in the 2026-09 revision round and are that
// doc's, verbatim. This resolves the previous TODO(content) here: the old
// testimonials 2 and 3 had been "lightly extended" to fill the card height and
// so were not verbatim reviews. These are.
//
// Two things the swap changed that are worth knowing:
//
//  - TODO(content): the doc supplies no `role` for any of the four, and the
//    layout needs one under each name. The three card roles below are INFERRED
//    from what each quote describes, not client-supplied. Confirm them, or drop
//    the field, before launch. Neha Sharma keeps the role the previous copy doc
//    gave her, and the initial on her disc follows it.
//  - The outgoing set included a hair transplant patient (Dr Manoj Waghmare);
//    the new one does not, so the homepage no longer carries social proof for
//    the hair transplant service — which homeSeeTheDifference.counters claims
//    10,000 of, one band below. Worth raising with the client.
export const homeTestimonials = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Testimonials",
  heading: "Life-changing results from our patients",
  cards: [
    {
      quote:
        "Dr. Sandeep is humble, calm and made me feel comfortable throughout my skin " +
        "treatment. I had a great experience and was very happy with the care and " +
        "treatment.",
      name: "Neha Sharma",
      role: "Patient, Bangalore",
      initial: "N",
    },
    {
      quote:
        "I consulted Dr. Sandeep for persistent acne. He examined my skin thoroughly, " +
        "explained the root cause and gave me an easy-to-follow treatment plan. I saw " +
        "visible improvement within two weeks.",
      name: "Girivasan Sankaran",
      role: "Acne Treatment Patient",
      initial: "G",
    },
    {
      quote:
        "I underwent skin rejuvenation treatment at Derma Solutions. Dr. Sandeep " +
        "carefully assessed my concerns and created a personalised treatment plan. My " +
        "skin texture and tone improved noticeably, and I'm very happy with the results.",
      name: "Raj Chaudry",
      role: "Skin Rejuvenation Patient",
      initial: "R",
    },
    {
      quote:
        "I came to Derma Solutions for injury marks and scars from an old accident. " +
        "Dr. Sandeep and his team created a treatment plan tailored to my needs. The " +
        "marks have significantly faded, giving me renewed confidence.",
      name: "Lalit Kumar Jha",
      role: "Scar Treatment Patient",
      initial: "L",
    },
  ],
} as const;

// Homepage Latest Blog band. content/home-page/Derma-Solutions-Homepage-Copy-
// Glowix-Template-2.md, section 12 — the strings are the doc's, verbatim.
//
// The card titles are the doc's shortened forms and are deliberately NOT the
// posts' own H1s, which run much longer ("Medical Facial vs Salon Facial:
// What's the Real Difference?", and a 15-word one for the peels article). Every
// other band takes the doc string verbatim; this one does the same.
//
// No TODO(assets) here, and that is the point: unlike every other band on this
// page, these three photographs are the clinic's own published featured images,
// lifted from seo-backup/06-media/files/2026/07/ by way of each post's og:image
// in src/seo/registry.generated.ts. Nothing here is vendor artwork tagged
// "licence": "reference-only", so nothing here has to be replaced before launch.
//
// They are wide 1.91:1 banners carrying their own title text, which is why the
// card frame is not the reference's near-square crop. See departure 2 in
// HomeLatestBlog.tsx.
//
// The alt text describes the artwork rather than restating the card title
// beside it — the two would otherwise be read out back to back.
// The eyebrow, heading and body below are the 2026-09 revision round's, which
// retitled the band from "Latest Blog" to "Insights & Resources". The export
// keeps its old name so the three card paths, the alt strings and everything
// above stay put under one diff.
//
// The band now has the video rail its body paragraph always promised: a
// "Latest Videos" rail under the blog cards, sourced from the channel's three
// newest videos (src/content/homeVideos.generated.ts, kept current with
// `npm run content:videos` — see scripts/fetch-latest-videos.ts).
export const homeLatestBlog = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Insights & Resources",
  heading: "Expert insights for healthier skin, hair & confidence",
  // New — the band had no body paragraph before this round.
  body:
    "Explore dermatologist-led guides and videos from Dr. Sandeep Mahapatra " +
    "covering common skin concerns, advanced treatments, hair care and aesthetic " +
    "dermatology.",
  cards: [
    {
      title: "Medical Facial vs Salon Facial: The Real Difference",
      path: "/medical-facial-vs-salon-facial/",
      image: "/images/decor/blog/medical-facial-vs-salon-facial.jpg",
      imageAlt:
        "Split artwork comparing a medical facial in a clinic with a salon facial",
    },
    {
      title: "RF vs HIFU Skin Tightening: Which Is Better?",
      path: "/rf-vs-hifu-skin-tightening/",
      image: "/images/decor/blog/rf-vs-hifu-skin-tightening.jpg",
      imageAlt:
        "Split artwork comparing radiofrequency and HIFU skin tightening treatments",
    },
    {
      title: "Peels, Microneedling, Lasers or Injectables: Which Is Right?",
      path: "/chemical-peels-vs-microneedling-vs-lasers-vs-injectables/",
      image:
        "/images/decor/blog/chemical-peels-vs-microneedling-vs-lasers-vs-injectables.jpg",
      imageAlt:
        "Artwork showing chemical peel, microneedling and laser treatments side by side",
    },
  ],
  // Not in the copy doc and not in the reference — see departure 5 in
  // HomeLatestBlog.tsx. /blogs/ is a real route (src/routes.generated.tsx).
  cta: {
    label: "View All Articles",
    href: "/blogs/",
  },
  // The video rail's own sub-heading and CTA, styled a size down from the
  // band's own h2 — see HomeLatestBlog.tsx.
  videosHeading: "Latest Videos",
  videosCta: {
    label: "Watch More Videos",
    href: "/video-gallery/",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* About Us page                                                               */
/* -------------------------------------------------------------------------- */

// content/about-us/Derma_Solutions_Home_Technology_and_About_Us_Content.md,
// Part B — bands B2 through B10. The strings are the doc's, verbatim, except
// where a comment below says otherwise and why. Rendered by src/sections/about/
// and composed in src/pages/AboutUs.tsx.
//
// The page's B7, B8 and B9 are the homepage's own sections, reused verbatim, so
// they have no copy here — see the header comment in src/pages/AboutUs.tsx.

// B2 — About Us (Intro). The same band as homeAbout above (theme-reference
// 04-sections/11-your-journey-to-radiant-confidence), with this page's copy.
export const aboutIntro = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "About Us",
  heading: "Where dermatology comes before beauty",
  /** An array of one, so this and homeAbout can feed the same component. */
  body: [
    "Derma Solutions is a doctor-led skin, hair and aesthetic clinic in Marathahalli, " +
      "Whitefield — your one point destination for safe, science-backed transformation.",
  ],
  checklist: [
    "MD Dermatologist-Led Care",
    "Advanced Laser Technology",
    "Personalised Treatment Plans",
  ],
  // TODO(compliance): Part C, "Numeric claims" — under ASCI substantiation rules
  // a numeric claim must be backed by clinic records. This one also DISAGREES
  // with homeAbout.badge, which the homepage copy doc sets to "20 Years of
  // Expertise", and with homeTrustBadges' "35+ Years". Three figures on one
  // site is the real exposure; settle it once, then make all three read it.
  badge: "15+ Years of Experience",
  contactLabel: "Need Help?",
  // An in-page anchor, not a route: AboutTeam renders id="our-team" further down
  // this same page. HomeAbout renders a bare <a href> rather than a react-router
  // <Link> when the target starts with "#", so this gets native scrolling and
  // works with no JS — which matters on a prerendered page.
  //
  // Invisible to scripts/verify-links.ts, which only records paths starting "/".
  cta: { label: "Meet Our Doctors", path: "#our-team" },
} as const;

// B3 — Our Approach (Mission & Vision).
// theme-reference/04-sections/31-transforming-beauty-with-precision-and-care/.
export const aboutApproach = {
  eyebrow: "Our Approach",
  heading: "Science-led care, personalised for your skin",
  body:
    "Every treatment at Derma Solutions begins with an in-depth diagnosis, so we treat " +
    "the root cause of your concern — not just the symptoms.",
  mission: {
    title: "Our Mission",
    body:
      "To deliver safe, ethical, dermatologist-led care that addresses skin, hair and " +
      "nail concerns with precision and honesty.",
  },
  vision: {
    title: "Our Vision",
    body:
      "To be Bangalore's trusted doctor-led clinic, where honest advice and advanced " +
      "technology build lasting confidence.",
  },
  // Part C, "'24/7 Support' badge": the template's default is replaced with the
  // clinic's hours, and 24/7 must NOT be published. `value` is composed from
  // `hours` rather than quoted from the doc, for the same reason
  // homeAbout.checklist[3] is: the doc's "9:30 AM – 6:00 PM, all days" was not
  // the clinic's schedule (see `hours`), and this page must not publish a
  // second variant of the times.
  chip: { title: "Open 6 Days a Week", value: hours.displayTimes },
} as const;

// B4 — What We Do. theme-reference/04-sections/12-transforming-beauty-confidence/ —
// the band retired from the homepage in the 2026-09 revision round, restored
// here with this page's copy. Section: src/sections/about/AboutWhatWeDo.tsx.
export const aboutWhatWeDo = {
  eyebrow: "What We Do",
  heading: "Complete skin, hair & body care",
  // TODO(compliance): Part C, "Numeric claims" — the 35+ figure is unverified.
  // It appears twice on this page; aboutFaqs[0].answer is the other. Confirm
  // once and fix both.
  body:
    "From medical dermatology to lasers, anti-ageing, hair restoration and cosmetic " +
    "surgery, we offer 35+ specialised treatments under one roof.",
  checklist: [
    "Medical & Clinical Dermatology",
    "Laser & Anti-Ageing Treatments",
    "Hair Transplant & Restoration",
  ],
  // The one numeric badge on this page with no compliance TODO: it is the length
  // of `team`, and the four doctors it counts are rendered a few hundred pixels
  // below it. Derived rather than typed so it cannot disagree with them.
  badgeValue: team.length,
  badgeSuffix: "",
  badgeLabel: "Specialist Doctors",
  // The doc gives no target for "Explore Treatments", and this site has no
  // treatments index — the header's Treatments item is a dropdown of five
  // groups. Pointed at the clinical-dermatology overview, as the retired
  // homeWhatWeDo.cta was, and for the same reason: the reference's /contact-us/
  // 404s here (KNOWN_DANGLING in scripts/verify-links.ts).
  cta: { label: "Explore Treatments", path: "/cosmetic-dermatology-in-bangalore/" },
} as const;

// B5 — Our Journey (dark band).
// theme-reference/04-sections/32-your-journey-to-radiant-confidence-2/.
export const aboutJourney = {
  eyebrow: "Our Journey",
  heading: "Built on trust, led by expertise",
  checklist: [
    "Gold Medallist MD Dermatologist",
    "DHI-Certified Hair Transplant",
    "Allergan-Certified Injectables",
    "Senior Plastic Surgery Team",
  ],
  features: ["Diagnosis Before Every Treatment", "Honest Advice, Natural Results"],
  // TODO(compliance): the same figure and the same three-way disagreement as
  // aboutIntro.badge above. One decision settles both.
  badge: "15+ Years of Experience",
  // #appointment, not contact.ctaHref: HomeAppointment renders id="appointment"
  // on this very page, so the same form is a scroll away rather than a page
  // load away at /book-appointment/.
  cta: { label: "Book Consultation", path: "#appointment" },
} as const;

// B6 — Our Team.
// theme-reference/04-sections/33-meet-the-experts-behind-your-transformation/.
//
// The four cards are deliberately not written out here: `team` already carries
// exactly these four doctors, in this order, with the displayName,
// qualification, role, photo and path the cards render. Same reasoning as the
// note on homeAppointment's doctor list — a second copy would be free to drift
// from the doctor pages.
export const aboutTeamSection = {
  eyebrow: "Our Team",
  heading: "Meet the doctors behind your transformation",
} as const;

// B10 — FAQs. theme-reference/04-sections/20-got-questions-we-ve-got-answers/.
export const aboutFaqSection = {
  eyebrow: "Frequently Asked Questions",
  heading: "Questions? Our doctors have answers",
} as const;

/**
 * B10's four questions.
 *
 * These are ALSO the source of this page's FAQPage JSON-LD:
 * scripts/schema-nodes.ts reads this array, so the visible accordion and the
 * structured data cannot say different things. Edit here, then re-run
 * `npm run seo:registry`.
 */
export const aboutFaqs = [
  {
    question: "What treatments does Derma Solutions offer?",
    // TODO(compliance): Part C, "Numeric claims" — the same unverified 35+
    // figure as aboutWhatWeDo.body.
    answer:
      "We offer 35+ treatments across clinical dermatology, lasers, anti-ageing, " +
      "cosmetic surgery and hair restoration, all under one roof in Marathahalli.",
  },
  {
    question: "Who will treat me at the clinic?",
    answer:
      "Every plan is led by our MD dermatologists, Dr Sandeep Mahapatra and " +
      "Dr Sumedha Tirthani, with senior plastic surgeons for surgical procedures.",
  },
  {
    question: "Is the technology at Derma Solutions safe?",
    // TODO(compliance): Part C, "USFDA claims" — BLOCKING before publication.
    // Clearance documents are required for the Q-switched and CO2 lasers, the
    // wording must stay "USFDA-cleared" and never "approved", and the claim must
    // not be extended to Viora, HIFU or Cooltech without certificates.
    //
    // This answer goes into the FAQPage graph as well as the visible accordion,
    // and a structured-data claim is harder to walk back than a paragraph.
    answer:
      "We use medical-grade platforms, including USFDA-cleared Q-switched and CO2 " +
      "lasers, with settings customised by our dermatologists for Indian skin.",
  },
  {
    question: "Where is the clinic and when is it open?",
    // The address is the doc's verbatim; the hours were rewritten on 2026-09-25
    // to the schema's (see `hours`). Both restate `location` and `hours` in
    // prose; check they still agree whenever either of those changes.
    answer:
      "We are on the 1st floor, Scorpio House, near Marathahalli Bridge, and open Monday " +
      "and Wednesday to Sunday from 10:00 AM to 8:00 PM. We are closed on Tuesdays.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Treatment pages                                                             */
/* -------------------------------------------------------------------------- */

// The fixed labels of the treatment page template (src/templates/TreatmentPage.tsx).
// Each page's own copy is generated from content/Treatment/ into
// src/content/treatments/; these are the strings the content doc lists once
// under "GLOBAL ELEMENTS" for all 38 pages.
//
// The sidebar's hours are `hours.display` / `hours.displayHeading`, not the
// doc's own wording ("Monday – Sunday : 09:30 AM – 06:00 PM / We Are Open On
// All Days"), which was out of date (see `hours`). One source, so the sidebar
// cannot drift from the footer.
export const treatmentPage = {
  /** The breadcrumb's middle crumb. Plain text: there is no /services/ page to link to. */
  breadcrumbSection: "Services",
  /** Uppercased in CSS, as in the reference. */
  servicesHeading: "Professional Services",
  hoursHeading: "Opening Hours:",
  /** Names the video block's play button and iframe, e.g. "MNRF Treatment at Derma Solutions". */
  videoTitle: (treatmentName: string) => `${treatmentName} at ${brand.shortName}`,
  // The before/after slider's corner labels, carried over from the old site's
  // Breakdance widget (data-before-label / data-after-label). Its
  // "Results vary from person to person." line is legal.resultsVary, shared
  // with the homepage band and the image gallery.
  compareBeforeLabel: "Before",
  compareAfterLabel: "After",
} as const;

/* -------------------------------------------------------------------------- */
/* Footer CTA                                                                  */
/* -------------------------------------------------------------------------- */

// The Glowix reference puts a newsletter signup here. There is no newsletter
// backend, so the same band carries the appointment CTA instead. Placeholder
// copy — edit it here, not in the component.
export const footerCta = {
  heading: "Ready to start your skin & hair transformation?",
  buttonLabel: contact.ctaLabel,
  buttonHref: contact.telHref,
} as const;

/* -------------------------------------------------------------------------- */
/* Service areas                                                               */
/* -------------------------------------------------------------------------- */

/** Footer: "Our Patients Come from Entire Bangalore". Display only. */
export const serviceAreas = [
  "Marathahalli",
  "Bellandur",
  "Hoodi",
  "C V Raman Nagar",
  "Krishnarajpuram",
  "Mahadevpura",
  "Varthur",
  "Whitefield",
  "Banaswadi",
  "HBR Layout", // live footer misspells this "HBR Layour"
  "Kalyan Nagar",
  "Horamavu",
  "Kammanahalli",
  "Lingarajpuram",
  "Ramamurthy Nagar",
  "HSR Layout",
  "Koramangala", // live footer misspells this "Koramangla"
  "BTM Layout",
  "Brookefield",
  "Kundalahalli",
] as const;

export const serviceAreasHeading = "Our Patients Come from Entire Bangalore";

/* -------------------------------------------------------------------------- */
/* Bundle                                                                      */
/* -------------------------------------------------------------------------- */

export const siteConfig = {
  brand,
  contact,
  location,
  hours,
  social,
  socialProfiles,
  assets,
  tracking,
  seo,
  legal,
  team,
  founder,
  navigation,
  footerCta,
  serviceMenu,
  serviceAreas,
} as const;

export type SiteConfig = typeof siteConfig;
export type TeamMember = (typeof team)[number];
export type ServiceGroup = (typeof serviceMenu)[number];

export default siteConfig;
