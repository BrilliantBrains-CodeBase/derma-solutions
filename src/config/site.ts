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
  ctaLabel: "Book An Appointment",
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
  // CONFLICT: the visible footer prints a differently-worded, differently-broken
  // version of the same address ("Munnekoala", "Purvankara Apt"). Both are kept:
  // `address` above is canonical for schema, these lines are what renders.
  // TODO(brand): agree one wording and make both match.
  addressDisplayLines: [
    "1st floor, Scorpio House,",
    "Near Marathahalli Bridge Munnekoala, Near Marathahalli Bridge Service Rd,",
    "Opp. Purvankara Apt,",
    "Opposite to Purva Apartments, Bengaluru, Karnataka 560037",
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

// CONFLICT — UNRESOLVED, needs a human answer before launch.
//   The live JSON-LD says Mon + Wed–Sun, 10:00–20:00 — Tuesday is absent entirely.
//   The homepage's own visible footer says "We Are Open On All Days /
//   Monday to Sunday / 09:30 - 18:00".
//   Google reads the schema; patients read the footer. They cannot both be right.
// The schema version is encoded below because it is what currently ranks.
// TODO(brand): confirm the real hours, then make `openingHours` and `display` agree.
export const hours = {
  openingHours: [
    {
      days: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  /** What the footer currently prints — does NOT match `openingHours`. */
  display: "Monday to Sunday, 09:30 - 18:00",
  displayHeading: "We Are Open On All Days",
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
  `©${year} ${legal.copyrightHolder}. All Rights Reserved.`;

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
    { label: "Our Services", groups: serviceMenu },
    {
      label: "About",
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
    { label: "Blogs", path: "/blogs/" },
    // The header's accent pill. The phone number beside it is rendered straight
    // from `contact`, not from here, so this entry is the booking CTA alone.
    { label: contact.ctaLabel, href: contact.ctaHref, isCta: true },
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

/* -------------------------------------------------------------------------- */
/* Footer call-to-action                                                       */
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
