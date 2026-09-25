import { contact, hours, location, team } from '@/config/site'

/**
 * The doctor pages' copy: /our-doctors/ (Part A) and the four profiles (B1–B4)
 * of content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md.
 *
 * This module holds the shapes, the rows every page shares and Part A. Each
 * profile's bands live in src/content/doctors/<team id>.ts — one module per page
 * so a lazily loaded route carries only its own copy, the same split
 * src/content/treatments/ makes.
 *
 * Facts about a doctor that other pages also print (name, photo, path,
 * qualification line) stay on `team` in site.ts and are read from there. What
 * is here is the per-page copy, which the doc writes differently for the index
 * card and for the profile's own About block — the eyebrow, the bio and the
 * Qualification and Position rows all differ between A2 and B1.1, for example.
 *
 * SEO titles, descriptions and the profile pages' H1s are deliberately NOT
 * here. The four profile URLs are live-site captures, and their registry
 * records reproduce the live head verbatim to protect rankings (doc note 1);
 * /our-doctors/ is authored in scripts/added-pages.ts.
 *
 * ---------------------------------------------------------------------------
 * TODO(content): shipped as the doc writes it, on the client's instruction,
 * pending the doc's "CHECK BEFORE THIS GOES LIVE" list:
 *  - note 2: the Email row prints contact.email, which is a personal mailbox
 *    (see the CONFLICT on it in site.ts), and two Experience rows print the
 *    doc's own placeholder — grep TO_CONFIRM.
 *  - note 4: the B1.2 counters conflict with homepage figures.
 *  - note 5: the B1.7 equipment list looks out of date.
 *  - note 6: testimonial consent (B1.8, B3.6).
 *  - note 7: Dr. Chandhana's membership names and consultation days.
 */

export type TeamId = (typeof team)[number]['id']

/** The doc's placeholder, printed verbatim until the clinic supplies a figure. */
export const TO_CONFIRM = '[to confirm with clinic]'

/* -------------------------------------------------------------------------- */
/* Shapes                                                                      */
/* -------------------------------------------------------------------------- */

export interface InfoRow {
  label: string
  value: string
  /** tel:, mailto: or an external URL. */
  href?: string
}

/** The Glowix "About me" block — theme-reference/04-sections/21-about-me/. */
export interface ProfileBlock {
  eyebrow: string
  heading: string
  body: string
  rows: readonly InfoRow[]
}

/**
 * The ground a band sits on. White is the page itself; cream and dark paint a
 * 1400-wide rounded-30 panel inside the 20px gutter. Two panels must never
 * touch — see the ground-alternation note on src/pages/AboutUs.tsx — which is
 * why every band's tone is set by hand in its page's module, not alternated
 * automatically: the testimonial and CTA bands are always dark, so a fixed
 * rhythm would put two panels together.
 */
export type Tone = 'white' | 'cream' | 'dark'

/** The heading block most bands open with. */
export interface BandHeading {
  eyebrow?: string
  heading: string
  /** The doc's "Subheading" line — an accent display line, not a heading. */
  subheading?: string
  /** A lead paragraph under the heading. */
  intro?: string
}

/** What a band may close with. */
export interface BandFooter {
  /** A closing paragraph in body type. */
  after?: string
  /** The doc's "CTA line" — rendered beside a call button. */
  ctaLine?: string
}

export interface LinkedItem {
  label: string
  path?: string
}

export type DoctorBand =
  | { kind: 'profile'; tone: Tone; block: ProfileBlock }
  | {
      kind: 'counters'
      tone: Tone
      /** Visually hidden: the doc gives the strip no heading. */
      heading: string
      items: readonly { value: number; suffix: string; label: string }[]
    }
  | (BandHeading &
      BandFooter & {
        kind: 'timeline'
        tone: Tone
        rows: readonly { when?: string; title: string; detail?: string }[]
      })
  | (BandHeading &
      BandFooter & {
        kind: 'cards'
        tone: Tone
        columns: 2 | 3 | 4
        cards: readonly {
          title: string
          subtitle?: string
          body?: string
          items?: readonly LinkedItem[]
        }[]
      })
  | (BandHeading &
      BandFooter & {
        kind: 'iconBoxes'
        tone: Tone
        items: readonly { title: string; text: string; links?: readonly LinkedItem[] }[]
      })
  | (BandHeading &
      BandFooter & {
        kind: 'prose'
        tone: Tone
        paragraphs?: readonly string[]
        image?: { src: string; alt: string; width: number; height: number }
        steps?: readonly { title: string; detail: string }[]
      })
  | (BandHeading &
      BandFooter & {
        kind: 'checklist'
        tone: Tone
        groups: readonly { title?: string; items: readonly string[] }[]
      })
  | (BandHeading & {
      kind: 'testimonials'
      tone: 'dark'
      items: readonly { name: string; treatment: string; quote: string }[]
    })
  | (BandHeading & { kind: 'videos'; tone: Tone; youtubeIds: readonly string[] })
  | (BandHeading & {
      kind: 'faq'
      tone: Tone
      items: readonly { question: string; answer: string }[]
    })
  | { kind: 'visitClinic'; tone: Tone }
  | { kind: 'cta'; tone: 'dark'; heading: string; subheading?: string }

export interface DoctorPageContent {
  id: TeamId
  /** The breadcrumb's last crumb. */
  name: string
  bands: readonly DoctorBand[]
}

/* -------------------------------------------------------------------------- */
/* Shared rows and bands                                                       */
/* -------------------------------------------------------------------------- */

export const phoneRow: InfoRow = {
  label: 'Phone:',
  value: contact.phoneDisplay,
  href: contact.telHref,
}

// TODO(content): doc note 2 — no clinic email is published anywhere on the
// live site. This is the mailbox the live JSON-LD carries; see its CONFLICT note.
export const emailRow: InfoRow = {
  label: 'Email:',
  value: contact.email,
  href: `mailto:${contact.email}`,
}

/** A7, reused by every profile page (B1.11, B2.7, B3.7, B4.7). */
export const visitClinic = {
  heading: 'Visit Our Clinic',
  intro:
    'Derma Solutions – Skin and Hair Clinic is conveniently located in Marathahalli, Whitefield – Bangalore.',
  // The doc's address is the live footer's garbled one ("Munnekoala",
  // "Purvankara Apt"); location.addressDisplayLines is the clean version the
  // rest of the site prints. Hours and phone likewise come from site.ts.
  rows: [
    { label: 'Opening Hours:', value: hours.display },
    { label: 'Clinic Address:', value: location.addressDisplayLines.join(' ') },
    phoneRow,
  ] satisfies readonly InfoRow[],
  directionsLabel: 'Get Directions',
  directionsHref: location.google.directionsUrl,
} as const

/** The CTA band's button, and the button beside every "CTA line". */
export const callButton = {
  label: `Call ${contact.phoneDisplay}`,
  href: contact.telHref,
} as const

/* -------------------------------------------------------------------------- */
/* Part A — /our-doctors/                                                      */
/* -------------------------------------------------------------------------- */

export const ourDoctorsPage = {
  breadcrumbSection: { label: 'About', href: '/about-us/' },
  breadcrumbName: 'Our Doctors',

  /** A1 — Team Introduction. */
  intro: {
    kind: 'prose',
    tone: 'white',
    eyebrow: 'Our Expert Team',
    heading: 'Meet the doctors behind Derma Solutions',
    paragraphs: [
      'Derma Solutions – Skin & Hair Clinic in Marathahalli, Whitefield – Bangalore is led by experienced MD dermatologists and senior plastic surgeons. Across clinical and cosmetic dermatology, laser treatment, hair transplant and plastic surgery, our doctors bring a strong academic foundation, global training and a patient-centered approach to every treatment.',
    ],
  } satisfies DoctorBand,

  profileCtaLabel: 'View Full Profile',

  /** A2–A5, in the doc's order. Tone alternates so no two panels touch. */
  doctors: [
    {
      id: 'sandeep-mahapatra',
      tone: 'white',
      block: {
        eyebrow: 'Senior Consultant Dermatologist',
        heading: 'Dr. Sandeep Mahapatra',
        body: 'Dr. Sandeep Mahapatra, MBBS, MD (Dermatology), is the founder of Derma Solutions and a highly accomplished dermatologist, cosmetic expert and hair transplant surgeon. A gold medalist with over two decades of experience, he offers advanced treatments for skin, hair and aesthetic concerns in Marathahalli and Whitefield, Bangalore.',
        rows: [
          { label: 'Qualification:', value: 'MBBS, MD (Dermatology) – Gold Medalist' },
          { label: 'Experience:', value: '20+ years' },
          {
            label: 'Position:',
            value:
              'Founder & Senior Consultant Dermatologist, Cosmetic Expert & Hair Transplant Surgeon',
          },
          phoneRow,
          emailRow,
        ],
      },
    },
    {
      id: 'sumedha-tirthani',
      tone: 'cream',
      block: {
        eyebrow: 'Expert Dermatologist',
        heading: 'Dr. Sumedha Tirthani',
        body: 'Dr. Sumedha Tirthani is a gold medalist in MD Dermatology who combines medical excellence with compassionate patient care. With experience in clinical dermatology, laser procedures and aesthetic dermatology, she offers advanced treatments for acne, pigmentation, hair loss, vitiligo and more at Derma Solutions in Marathahalli and Whitefield, Bangalore.',
        rows: [
          {
            label: 'Qualification:',
            value: 'MBBS (Gold Medalist), MD – Dermatology (Gold Medalist)',
          },
          { label: 'Experience:', value: TO_CONFIRM },
          { label: 'Position:', value: 'Dermatologist' },
          phoneRow,
          emailRow,
        ],
      },
    },
    {
      id: 'thyagaraj',
      tone: 'white',
      block: {
        eyebrow: 'Senior Plastic Surgeon',
        heading: 'Dr. Thyagaraj',
        body: 'Dr. Thyagaraj is a senior plastic surgeon at Derma Solutions, recognized for his skill in cosmetic and reconstructive procedures. With over 20 years of expertise and global clinical training in Belgium, Spain and Switzerland, he is dedicated to delivering natural-looking results that enhance both confidence and quality of life.',
        rows: [
          {
            label: 'Qualification:',
            value: 'MBBS, MS (General Surgery), MCh (Plastic Surgery)',
          },
          { label: 'Experience:', value: '20+ years' },
          { label: 'Position:', value: 'Senior Plastic Surgeon' },
          phoneRow,
          emailRow,
        ],
      },
    },
    // A5, Dr. Chandhana Vishal N, is deliberately absent: removed from this page
    // on the client's instruction, 2026-09-25. Everything else about her stays —
    // her profile page at /dr-chandhana-vishal-n-plastic-surgeon/, the header's
    // Doctors dropdown and the About page's team band. To put the block back,
    // copy A5 out of content/doctor-page/…Doctors-About-Page-Content.md and add
    // it here with tone 'cream'; also restore her id in OUR_DOCTORS_PROFILED in
    // scripts/schema-nodes.ts so the page's JSON-LD matches what it shows.
  ] satisfies readonly { id: TeamId; tone: Tone; block: ProfileBlock }[],

  /** A6 — Why Choose Our Doctors. */
  why: {
    kind: 'iconBoxes',
    tone: 'white',
    eyebrow: 'Why Derma Solutions',
    heading: 'Why patients trust our doctors',
    items: [
      {
        title: 'Tailored Treatment Plans',
        text: "Every individual's skin is unique, so treatment plans are personalized after an in-depth diagnosis.",
      },
      {
        title: 'Comprehensive Dermatological Care',
        text: 'A full spectrum of services, from common skin conditions to advanced cosmetic and aesthetic procedures, for skin, hair and nail concerns under one roof.',
      },
      {
        title: 'Patient Centered Approach',
        text: 'Your comfort, satisfaction and well-being come first. We listen to your concerns and craft solutions suited to your needs.',
      },
      {
        title: 'State of Art Technology',
        text: 'Equipped with the latest medical and cosmetic technologies for precision and safety in every treatment.',
      },
    ],
  } satisfies DoctorBand,

  /** A8 — Call to Action Band. */
  cta: {
    kind: 'cta',
    tone: 'dark',
    heading:
      'Book an Appointment with Our Doctors at Derma Solutions – Skin & Hair Clinic in Marathahalli, Whitefield – Bangalore',
  } satisfies DoctorBand,
} as const
