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
  // TODO(rebuild): the page is not built yet, so this 404s today. Whitelisted in
  // scripts/verify-links.ts — remove that entry when the page lands. Same
  // situation as /contact-us/, which the Service schema already points at.
  ctaHref: "/book-appointment/",
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
  geo: { latitude: 12.956707, longitude: 77.707275 },
  mapUrl: "https://share.google/SO018gWSkHgepLkdC",
  landmarks: ["Near Marathahalli Bridge", "Opposite Purva Apartments"],
  /** schema.org areaServed */
  areaServed: ["Bangalore", "Marathahalli", "Whitefield"],
} as const;

/* -------------------------------------------------------------------------- */
/* Opening hours                                                               */
/* -------------------------------------------------------------------------- */

// CONFLICT — narrowed, but still needs a fix before launch.
//   The live JSON-LD says Mon + Wed–Sun, 10:00–20:00 — Tuesday is absent entirely.
//   The homepage's visible footer says Monday to Sunday, 09:30–18:00.
//   The client's copy doc (content/home-page/, section 13) independently states
//   "Monday to Sunday: 9:30 AM to 6:00 PM / Open all 7 days", which corroborates
//   the visible hours and makes the SCHEMA the wrong one.
// `openingHours` below still encodes the schema because it ships byte-verbatim
// in the JSON-LD and scripts/verify-seo.ts asserts that byte-for-byte.
// TODO(brand): correct the hours in the source schema, then update `openingHours`
// here to match `display`. Do not edit one without the other.
export const hours = {
  openingHours: [
    {
      days: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  /** What the footer currently prints — does NOT match `openingHours`. */
  display: "Monday to Sunday: 9:30 AM to 6:00 PM",
  displayHeading: "Open all 7 days",
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
  /** Header logo. src: 2024/12/DermaSolutions-Logo.svg */
  logo: "/images/brand/derma-solutions-logo.svg",
  // TODO(brand): there is no white/mono mark for use on the dark footer panel.
  // Until one exists the footer renders this white-background PNG on a small
  // white chip, which reads as deliberate rather than as a broken transparency.
  /** Solid-background logo used in footer + schema. src: 2024/12/Derma-Solutions-LOGO-with-bg-12.png */
  logoWithBackground: "/images/brand/derma-solutions-logo-bg.png",
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
  // TODO(assets): vendor photography, also tagged "licence": "reference-only".
  // It is here for crop and art direction only and must be replaced with Derma
  // Solutions' own photography before launch. clinicPhoto below is NOT a
  // substitute: it shows another clinic's signage on the back wall.
  /** Homepage hero photo. src: theme-reference 2025-04-hero-bg.jpg (1920x1280) */
  heroImage: "/images/decor/home-hero.jpg",
  heroImageAlt: "Dermatologist assessing a patient's skin during a consultation",
  // TODO(assets): the three About photographs are vendor artwork on the same
  // terms as heroImage above — theme-reference/06-assets/manifest.json tags all
  // three "licence": "reference-only". They hold the crop and art direction of
  // the reference composition and must be replaced with Derma Solutions' own
  // photography before launch.
  /** About stack, upper-right. src: theme-reference 2025-04-about-img-1.jpg (358x450) */
  aboutImage1: "/images/decor/about-1.jpg",
  aboutImage1Alt: "Clinician applying a treatment mask during a facial",
  /** About stack, lower-left. src: theme-reference 2025-04-about-img-2.jpg (360x450) */
  aboutImage2: "/images/decor/about-2.jpg",
  aboutImage2Alt: "Patient receiving a laser treatment from a dermatologist",
  /** About checklist row. src: theme-reference 2025-04-about-experience-image.jpg (302x180) */
  aboutExperienceImage: "/images/decor/about-experience.jpg",
  aboutExperienceImageAlt: "Dermatologist treating a patient's face in the clinic",
  /**
   * What We Do, left column. A cut-out PNG: the pale arch behind the figure is
   * baked into the file, which is why this one carries no frame, radius or
   * reveal in the section. src: theme-reference 2025-04-what-we-image-1.png
   * (392x626)
   */
  whatWeDoImage1: "/images/decor/what-we-do-1.png",
  whatWeDoImage1Alt: "Patient marked for a body-contouring procedure",
  /** What We Do, right column. src: theme-reference 2025-04-what-we-image-2.jpg (391x621) */
  whatWeDoImage2: "/images/decor/what-we-do-2.jpg",
  whatWeDoImage2Alt: "Clinician smoothing a treatment mask onto a reclining patient's face",
  // TODO(assets): both Why Choose Us photographs are vendor artwork on the same
  // terms as heroImage above — theme-reference/06-assets/manifest.json tags the
  // pair "licence": "reference-only". They hold the reference's 264x408 portrait
  // crop and the overlap that composition depends on, and must be replaced with
  // Derma Solutions' own photography before launch. The alt text below describes
  // the placeholder, so it has to be rewritten with them.
  //
  // The band's third reference image, 2025-04-author-2.jpg, is deliberately not
  // here: the contact row uses founder.photo instead. See the departures list in
  // src/sections/HomeWhyChooseUs.tsx.
  /** Why Choose Us, front-left frame. src: theme-reference 2025-04-why-choose-image-1.jpg (264x408) */
  whyChooseImage1: "/images/decor/why-choose-1.jpg",
  whyChooseImage1Alt: "Clinician applying a treatment to a patient's face during a facial",
  /** Why Choose Us, inside the accent panel. src: theme-reference 2025-04-why-choose-image-2.jpg (264x408) */
  whyChooseImage2: "/images/decor/why-choose-2.jpg",
  whyChooseImage2Alt: "Dermatologist treating a reclining patient's face in the clinic",
  // TODO(brand): vendor artwork on the same terms as footerShape and serviceShape
  // above — "licence": "reference-only" in theme-reference/06-assets/manifest.json.
  /** Dot field behind the Testimonials band. src: theme-reference 2025-04-testimonials-bg-shape.png (1800x1041) */
  testimonialsShape: "/images/decor/testimonials-bg-shape.png",
  // TODO(assets): vendor photography on the same terms as heroImage above, and it
  // must be replaced with Derma Solutions' own photography before launch.
  //
  // Note this is deliberately NOT the reference's 2025-04-testimonial-image.jpg.
  // That file is a woman posed to camera, and the band sets it directly beside a
  // named patient's quote, where it reads as that patient's face. This is a
  // treatment scene instead — nobody in it is being presented as the reviewer.
  // Same reasoning as 2025-04-author-2.jpg in the Why Choose Us block above. See
  // the departures list in src/sections/HomeTestimonials.tsx.
  /** Testimonials band, featured column. src: theme-reference 2025-04-gallery-7.jpg (1200x800) */
  testimonialImage: "/images/decor/testimonial.jpg",
  testimonialImageAlt:
    "Clinician performing a facial treatment on a reclining patient under a clinic lamp",
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
  // TODO(compliance): BLOCKING, not advisory. Copy doc note 2: "Use only the
  // clinic's own images with signed patient consent on file. Do not use stock
  // or theme demo images as patient results." These four are the Glowix demo's
  // own `transformation-img-{1..4}.jpg`, tagged "licence": "reference-only" in
  // theme-reference/06-assets/manifest.json, and the band labels them Before
  // and After — which is exactly the case the note rules out. They are here to
  // hold the 308x501 crop and the pair composition only. Replace with the
  // clinic's own consented images before launch, and rewrite the alt text with
  // them: it describes the placeholder.
  //
  // As in homeCaseStudies, the alt text deliberately describes only what is in
  // frame. Naming an improvement in an alt would make the photograph itself
  // assert the result.
  /** See the Difference, pair 1. src: theme-reference 2025-04-transformation-img-1.jpg (308x501) */
  transformBefore1: "/images/decor/transformations/before-1.jpg",
  transformBefore1Alt: "Close-up of a patient's face before treatment",
  /** src: theme-reference 2025-04-transformation-img-2.jpg (309x501) */
  transformAfter1: "/images/decor/transformations/after-1.jpg",
  transformAfter1Alt: "The same patient's face after treatment, hair wrapped in a towel",
  /** See the Difference, pair 2. src: theme-reference 2025-04-transformation-img-3.jpg (308x501) */
  transformBefore2: "/images/decor/transformations/before-2.jpg",
  transformBefore2Alt: "Close-up of a second patient's cheek and nose before treatment",
  /** src: theme-reference 2025-04-transformation-img-4.jpg (303x501) */
  transformAfter2: "/images/decor/transformations/after-2.jpg",
  transformAfter2Alt: "The same patient's cheek and nose after treatment",
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
  /** src: 2025/04/Derma-Solutions-Clinic-Reception.jpeg */
  clinicPhoto: "/images/brand/clinic-reception.jpeg",
  clinicPhotoAlt: "Derma Solutions clinic reception",
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
  // TODO(rebuild): the live Service schema points its serviceUrl at /contact-us/,
  // which is not one of the 92 live URLs — it 404s. Either build the page or
  // repoint the schema.
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
  /** Treatment-variability notice from the Service schema's termsOfService. */
  treatmentNotice:
    "Treatment suitability, number of sessions, procedure choice and expected results vary from patient to patient and should be confirmed after consultation with a qualified dermatologist.",
  copyrightHolder: "Derma Solutions",
  copyrightSince: 2024,
  privacyPolicyPath: "/privacy-policy/",
  termsPath: "/terms-of-use/",
  credit: { label: "HappiMed", url: "https://happimed.com/" },
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
    bio: "Board-certified, gold medalist dermatologist with advanced expertise in clinical, cosmetic, and laser dermatology.",
  },
  {
    id: "thyagaraj",
    name: "Dr. Thyagaraj",
    displayName: "Dr Thyagaraj",
    qualification: "Senior Plastic Surgeon",
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
      {
        label: "Dermato Surgery",
        path: "/best-dermatologist-in-marathahalli-whitefield-bangalore/",
      },
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
    ],
  },
  {
    group: "Cosmetic Surgeries",
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
    // one of the two known-dangling paths in scripts/verify-links.ts and 404s
    // today, so putting it in the primary nav would ship a broken link.
    { label: "About Us", path: team[0].path },
    { label: "Treatments", groups: serviceMenu },
    {
      label: "Doctors",
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
    { label: "Blog", path: "/blogs/" },
    // The header's accent pill. The phone number beside it is rendered straight
    // from `contact`, not from here, so this entry is the booking CTA alone.
    { label: contact.ctaLabelHeader, href: contact.ctaHref, isCta: true },
  ],
  // The footer's "Quick Link" column. Deliberately short — it is a shortcut list,
  // not a second copy of the header. /contact-us/ is omitted because it 404s (see
  // the KNOWN_DANGLING note in scripts/verify-links.ts); add it once the page exists.
  quickLinks: [
    { label: "Home", path: "/" },
    { label: "About Us", path: team[0].path },
    { label: "Blogs", path: "/blogs/" },
    { label: "Image Gallery", path: "/image-gallery/" },
    { label: "Video Gallery", path: "/video-gallery/" },
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
// renders — see the blocking TODO on assets.transformBefore1. `disclaimer`
// below is the doc's required "Results vary from person to person." line and
// must stay visible next to the images; do not move it into a tooltip, an
// accordion or the page footer.
export const homeSeeTheDifference = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "See the Difference",
  heading: "Our real patient transformations and visible results",
  /** The doc's "Image Labels: Before / After (2 pairs)". */
  beforeLabel: "Before",
  afterLabel: "After",
  pairs: [
    {
      id: "pair-1",
      before: { image: assets.transformBefore1, imageAlt: assets.transformBefore1Alt },
      after: { image: assets.transformAfter1, imageAlt: assets.transformAfter1Alt },
    },
    {
      id: "pair-2",
      before: { image: assets.transformBefore2, imageAlt: assets.transformBefore2Alt },
      after: { image: assets.transformAfter2, imageAlt: assets.transformAfter2Alt },
    },
  ],
  disclaimer: "Results vary from person to person.",
  // TODO(compliance): copy doc note 1, the same ASCI substantiation caveat that
  // sits on homeAbout.badge, homeWhatWeDo.badgeValue and homeWhyChooseUs.badge —
  // and the sharpest instance of it on the page, because these are volume
  // claims rather than a round number of years. Under ASCI rules all four must
  // be backed by clinic records if challenged. Confirm every figure with
  // Dr Sandeep before publishing. The reference's own counters read 25+ / 150K+
  // / 30+ / 2K+; these are the doc's numbers.
  //
  // `value` is what the counter tweens to and `suffix` is printed after it, so
  // 50000 renders "50,000+". The specialist tile has no suffix: "4+ In-House
  // Specialists" would be a different, vaguer claim than the doc's "4".
  counters: [
    { id: "years", value: 20, suffix: "+", label: "Years of Expertise" },
    { id: "laser", value: 50000, suffix: "+", label: "Laser Procedures" },
    { id: "transplants", value: 10000, suffix: "+", label: "Hair Transplants" },
    { id: "specialists", value: 4, suffix: "", label: "In-House Specialists" },
  ],
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
    "open all 7 days.",
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

// Homepage About band. content/home-page/Derma-Solutions-Homepage-Copy-Glowix-
// Template-2.md, section 03 — the strings are the doc's, verbatim.
export const homeAbout = {
  /** Uppercased in CSS, as homeHero's is. */
  eyebrow: "About Us",
  heading: "Your journey to radiant, confident skin",
  body:
    "Derma Solutions is a skin and hair clinic in Marathahalli, Whitefield, where " +
    "dermatologists and plastic surgeons treat every concern under one roof.",
  checklist: [
    "Doctor-Led Diagnosis & Plans",
    "FDA-Approved Laser Technology",
    "One Clinic, Every Concern",
  ],
  // TODO(compliance): copy doc note 1 — under ASCI substantiation rules a
  // numeric claim must be backed by clinic records. Confirm the figure with
  // Dr Sandeep before launch. The reference reads "15+ Years of Experience";
  // this is the doc's own wording for the same badge.
  badge: "20 Years of Expertise",
  contactLabel: "Need Help!",
  /** The doc's target for "More About" — the founder's page, a real route. */
  cta: { label: "More About", path: team[0].path },
} as const;

// Homepage What We Do band. content/home-page/Derma-Solutions-Homepage-Copy-
// Glowix-Template-2.md, section 04 — the strings are the doc's, verbatim.
export const homeWhatWeDo = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "What We Do",
  heading: "Dermatology, not just beauty",
  body:
    "We treat skin, hair and body concerns medically - with diagnosis first, then " +
    "a plan matched to you.",
  checklist: [
    "Restore Firmness and Shape",
    "Minimise Acne Scars and Pigmentation",
    "Tailored Treatments for Men",
  ],
  // TODO(compliance): copy doc note 1, the same ASCI substantiation caveat that
  // sits on homeAbout.badge. Confirm the figure with Dr Sandeep before launch.
  // The reference counter reads 25+; this is the doc's own number.
  badgeValue: 20,
  badgeSuffix: "+",
  badgeLabel: "Years of Experience",
  // The doc gives no target for "Learn More" and the reference points at the
  // demo's /contact-us/, which 404s here (see KNOWN_DANGLING in
  // scripts/verify-links.ts). Retargeted to the live medical-dermatology
  // overview, the closest match to this band's copy.
  cta: { label: "Learn More", path: "/cosmetic-dermatology-in-bangalore/" },
} as const;

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
// TODO(assets): all six photographs are vendor artwork on the same terms as
// assets.heroImage — theme-reference/06-assets/manifest.json tags each
// "licence": "reference-only". They hold the reference's 3:2 crop and must be
// replaced with Derma Solutions' own photography before launch. The alt text
// below describes the placeholder, so it has to be rewritten with them.
export const homeServices = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Services",
  heading: "Explore our full range of skin & hair treatments",
  cards: [
    {
      title: "Laser Treatments",
      body: "FDA-approved lasers for hair removal, tattoo removal, toning and scar reduction.",
      path: "/laser-hair-removal-in-bangalore/",
      image: "/images/decor/services/service-1.jpg",
      imageAlt: "Clinician performing a laser treatment on a patient's face",
    },
    {
      title: "Skin & Cosmetology",
      body: "Acne scar treatment, peels, HydraFacial and MNRF for even, glowing skin.",
      path: "/acne-scar-treatment-in-bangalore/",
      image: "/images/decor/services/service-2.jpg",
      imageAlt: "Patient's face marked up before a cosmetic skin procedure",
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
      imageAlt: "Dermatologist marking treatment points on a patient's face",
    },
    {
      title: "Hair Restoration",
      body: "Hair transplant, GFC therapy and hair fall treatment with detailed hair analysis.",
      path: "/hair-transplant-in-bangalore-marathahalli-whitefield/",
      image: "/images/decor/services/service-4.jpg",
      imageAlt: "Surgeon assessing a patient's hairline before a transplant",
    },
    {
      title: "Cosmetic Surgery",
      body: "Liposuction, tummy tuck, rhinoplasty and gynecomastia by in-house plastic surgeons.",
      path: "/liposuction-treatment-in-bangalore/",
      image: "/images/decor/services/service-5.jpg",
      imageAlt: "Surgeon in theatre preparing a patient for a procedure",
    },
    {
      title: "Advanced Facials",
      body: "HydraFacial, carbon peel and PDRN facials for hydration and glow, no downtime.",
      path: "/best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore/",
      image: "/images/decor/services/service-6.jpg",
      imageAlt: "Therapist performing a hydrating facial on a patient",
    },
  ],
  // TODO(compliance): copy doc note 4 — the reference's strip is a "Free" pill
  // reading "Get a Free Assessment", and the doc rules that out unless the
  // consultation genuinely is free. This is the doc's own fallback, so the
  // pill is deliberately absent. Restore both together, or neither.
  //
  // The reference links this at /contact-us/, which 404s here and is already
  // flagged in scripts/verify-links.ts. contact.ctaHref is the whitelisted
  // equivalent the hero and header CTAs use.
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
// TODO(assets): the four photographs are vendor artwork on the same terms as
// assets.heroImage — theme-reference/06-assets/manifest.json tags them
// "licence": "reference-only". They belong to the Glowix theme author, hold the
// crop and art direction of the reference tiles only, and must be replaced with
// Derma Solutions' own photography before launch.
//
// TODO(compliance): copy doc note 2, and this one is blocking rather than
// advisory. These are Glowix procedure shots sitting under result-claim titles
// ("Clearer Skin, Fewer Scars"), which is exactly the "do not use stock or theme
// demo images as patient results" case the note rules out. Replace with the
// clinic's own images with signed patient consent on file. The doc's required
// "Results vary from person to person" line is already the last sentence of
// `body` below and must stay visible next to the tiles.
//
// The alt text deliberately describes only what is in frame. Restating a card's
// title in its alt would make the photograph itself assert the result.
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
      imageAlt: "Clinician in scrubs treating a reclining patient's face at the clinic",
    },
    {
      title: "Fuller Hair After Transplant",
      image: "/images/decor/case-studies/case-study-2.jpg",
      imageAlt: "Gloved clinician marking guide lines on a patient's face before a procedure",
    },
    {
      title: "Even Tone, Less Pigmentation",
      image: "/images/decor/case-studies/case-study-3.jpg",
      imageAlt: "Dermatologist performing a facial treatment on a reclining patient",
    },
    {
      title: "Lifted, Smoother Skin",
      image: "/images/decor/case-studies/case-study-4.jpg",
      imageAlt: "Clinician administering an injectable treatment to a patient's face",
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
  heading: "Experience skin and hair care in expert hands",
  body:
    "Every plan is built on an in-depth diagnosis, not a fixed menu - matched to " +
    "your skin, concern and budget.",
  statement:
    "Skin, hair, anti-aging and cosmetic surgery are handled in-house by qualified " +
    "specialists, using FDA-approved lasers and modern technology, with clear " +
    "communication throughout.",
  contactLabel: "Contact Us:",
  // TODO(compliance): copy doc note 1, the same ASCI substantiation caveat that
  // sits on homeAbout.badge and homeWhatWeDo.badgeValue. Confirm the figure with
  // Dr Sandeep before launch. The reference's badge reads "25YEARS EXPERIENCE";
  // this is the doc's own number, and it carries the space the demo drops.
  badge: "20 Years Experience",
} as const;

// Homepage How It Works band. content/home-page/Derma-Solutions-Homepage-Copy-
// Glowix-Template-2.md, section 08 — the strings are the doc's, verbatim.
//
// `number` and `title` are separate fields even though the reference bakes the
// numbering into one string ("01. Comprehensive Consultation"). The doc writes
// them apart, and keeping them apart is what lets the section render an <ol>
// whose numbering is structural rather than only painted on.
export const homeHowItWorks = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "How It Works",
  heading: "Simple steps to visible results",
  body:
    "A clear, unhurried process from first consultation to lasting results. We " +
    "diagnose the root cause, explain your options, treat you personally and follow " +
    "up until your skin settles.",
  // TODO(rebuild): the reference links this button at /contact-us/, which 404s
  // here and is whitelisted in scripts/verify-links.ts. contact.ctaHref is the
  // same substitution homeServices.cta makes. Repoint it when the page lands.
  cta: { label: "Contact Us", href: contact.ctaHref },
  steps: [
    {
      number: "01",
      title: "Consultation & Analysis",
      body: "We listen to your concern and assess your skin, hair or scalp in detail.",
    },
    {
      number: "02",
      title: "Accurate Diagnosis",
      body:
        "Our specialists identify the root cause behind the symptom, so treatment is " +
        "targeted.",
    },
    {
      number: "03",
      title: "Personalised Treatment Plan",
      body:
        "You get a plan matched to your skin type, goals and budget, explained clearly.",
    },
    {
      number: "04",
      title: "Expert Treatment & Follow-Up",
      body:
        "A qualified doctor performs your treatment, then guides aftercare so your " +
        "results last.",
    },
  ],
} as const;

// Homepage Testimonials band. content/home-page/Derma-Solutions-Homepage-Copy-
// Glowix-Template-2.md, section 09 — the strings are the doc's, verbatim.
//
// The doc supplies one featured quote and three small ones. The reference carries
// four, in a Swiper with arrows, dots, autoplay and loop all disabled — i.e. a
// static 3-up grid with a fourth slide parked off-screen. Three quotes fill the
// grid exactly, which is why there is no carousel here. See HomeTestimonials.tsx.
//
// `initial` is stored rather than sliced off `name`: "Dr Manoj Waghmare" begins
// with the honorific, so the letter on his disc is a content decision and not a
// string trick. It follows whatever the name becomes.
//
// TODO(content): the copy doc's own note under section 09 — testimonials 2 and 3
// were lightly extended to fill the template's card height, so as written they are
// not verbatim reviews. Either confirm the patients are happy with the wording or
// replace both with longer reviews pulled from the Google Business Profile. Every
// quote here should be traceable to a real, attributable review before launch.
export const homeTestimonials = {
  /** Uppercased in CSS, as homeHero's and homeAbout's are. */
  eyebrow: "Testimonials",
  heading: "Life-changing results from our patients",
  featured: {
    quote:
      "Derma Solutions is one of the best skin and hair clinics in Bangalore. The " +
      "doctor is very humble and calm, and always made me feel comfortable during " +
      "my skin procedures.",
    name: "Neha Sharma",
    role: "Patient, Bangalore",
  },
  cards: [
    {
      quote:
        "The only dermatologist I trust with my skin is Dr Sandeep Mahapatra. I have " +
        "been seeing him for more than ten years and I wouldn't use anyone else.",
      name: "Priyanka Radhakrishna",
      role: "Patient",
      initial: "P",
    },
    {
      quote:
        "He is a blessed, experienced and skilled hair transplant surgeon. The care " +
        "and precision throughout the procedure were exactly what I hoped for.",
      name: "Dr Manoj Waghmare",
      role: "Hair Transplant Patient",
      initial: "M",
    },
    {
      quote:
        "Dr Sandeep is very experienced and professional. My injections were " +
        "absolutely painless and I had no reaction at all afterwards.",
      name: "Alisha",
      role: "Patient",
      initial: "A",
    },
  ],
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
