import { assets } from '@/config/site'
import { emailRow, phoneRow, type DoctorPageContent } from '@/content/doctor'

/**
 * /best-dermatologist-in-marathahalli-whitefield-bangalore/ — Part B1 of
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md, verbatim.
 *
 * Tones run W C W C W C W D W C W D, so no two panels touch.
 */
export const sandeepMahapatraPage: DoctorPageContent = {
  id: 'sandeep-mahapatra',
  name: 'Dr. Sandeep Mahapatra',
  bands: [
    /* B1.1 — About */
    {
      kind: 'profile',
      tone: 'white',
      block: {
        eyebrow: 'Dermatologist & Hair Transplant Surgeon',
        heading: 'About Dr. Sandeep Mahapatra',
        body: "Dr. Sandeep Mahapatra is a highly accomplished dermatologist and cosmetic surgeon with a strong track record in treating skin, hair and aesthetic concerns. As the founder of Derma Solutions, he is recognized among the leading dermatologists in Bangalore. For over two decades, he has offered advanced treatments that enhance patients' confidence and quality of life.",
        rows: [
          { label: 'Qualification:', value: 'MBBS, MD (Dermatology) – Gold Medalist' },
          { label: 'Experience:', value: '20+ years' },
          {
            label: 'Position:',
            value:
              'Founder, Derma Solutions · Senior Consultant Dermatologist, Cosmetic Expert & Hair Transplant Surgeon',
          },
          phoneRow,
          emailRow,
        ],
      },
    },

    /* B1.2 — Treatment Milestones.
     * TODO(content): doc note 4 — these conflict with the homepage (15,000 vs
     * 50,000+ laser hair reductions) and must be verified from clinic records. */
    {
      kind: 'counters',
      tone: 'cream',
      heading: 'Treatment Milestones',
      items: [
        { value: 50000, suffix: '+', label: 'Laser Hair Removals' },
        { value: 3000, suffix: '+', label: 'Vitiligo Treatments' },
        { value: 4000, suffix: '+', label: 'Botox' },
        { value: 2000, suffix: '+', label: 'Derma Fillers' },
        { value: 40000, suffix: '+', label: 'Chemical Peels' },
        { value: 10000, suffix: '+', label: 'Hair Transplants' },
      ],
    },

    /* B1.3 — Educational Excellence */
    {
      kind: 'timeline',
      tone: 'white',
      eyebrow: 'Education & Certifications',
      heading: 'Educational Excellence of Dr. Sandeep Mahapatra',
      intro:
        'Dr. Sandeep has a strong academic foundation in dermatology and trichology. His continuous education and certifications in advanced dermatological procedures underpin his position as a trusted skin specialist in Bangalore.',
      rows: [
        {
          when: '1999 – 2004',
          title: 'MBBS',
          detail:
            'MGM Medical College & Hospital, Jamshedpur, with honours; gold medalist in two subjects',
        },
        { when: '2007 – 2010', title: 'M.D. in Dermatology', detail: 'RIMS, Ranchi. Gold Medalist' },
        {
          when: 'Juvederm',
          title: 'Juvederm-XC Workshop',
          detail: 'Attended the Juvederm-XC workshop by Dr. Raspaldo',
        },
        {
          when: 'DHI Global (Greece)',
          title: 'Certified DHI Specialist',
          detail: 'Certification in hair transplant procedures',
        },
        {
          when: 'Allergan',
          title: 'Botox & Dermal Fillers',
          detail: 'Certified in basic and advanced Botox and dermal fillers',
        },
      ],
    },

    /* B1.4 — Clinical Dermatology */
    {
      kind: 'cards',
      tone: 'cream',
      columns: 3,
      heading: 'Clinical Dermatology: Expert Care for Your Skin, Hair, and Nails',
      intro:
        'Comprehensive treatment for dermatological conditions by an experienced dermatologist in Bangalore.',
      cards: [
        {
          title: 'Common Skin Conditions',
          subtitle: 'Expert solutions for healthier skin',
          items: [
            { label: 'Acne, blackheads and whiteheads' },
            { label: 'Eczema, psoriasis and rosacea' },
            { label: 'Fungal infections and warts' },
            { label: 'Vitiligo and pigmentation disorders' },
            { label: 'Dermatitis and allergic skin reactions' },
          ],
        },
        {
          title: 'Hair and Scalp Conditions',
          subtitle: 'Tailored treatments for stronger, healthier hair',
          items: [
            { label: 'Hair thinning and alopecia (male and female pattern baldness)' },
            { label: 'Dandruff and seborrheic dermatitis' },
            { label: 'Scalp psoriasis and infections' },
          ],
        },
        {
          title: 'Nail Disorders',
          subtitle: 'Comprehensive care for nail health',
          items: [
            { label: 'Fungal nail infections' },
            { label: 'Brittle and discolored nails' },
            { label: 'Nail psoriasis and other abnormalities' },
          ],
        },
      ],
      ctaLine:
        'Trust Dr. Sandeep Mahapatra for Expert Clinical Dermatology – Book Your Appointment Today!',
    },

    /* B1.5 — Cosmetic Dermatology. Links per the doc, which corrects the live
     * page's (note 8): pigmentation → Laser Toning, scars → CO2 Fractional. */
    {
      kind: 'cards',
      tone: 'white',
      columns: 3,
      heading: 'Cosmetic Dermatology: Enhancing Your Natural Beauty',
      intro:
        "Dr. Sandeep Mahapatra offers advanced cosmetic dermatology services to improve your skin's health and appearance while addressing your aesthetic goals.",
      cards: [
        {
          title: 'Anti-Aging Solutions',
          items: [
            { label: 'Botox Injections', path: '/botox-treatment-in-bangalore-whitefield-and-marathahalli/' },
            { label: 'Dermal Fillers', path: '/dermal-fillers-treatment-bangalore/' },
            {
              label: 'Microneedling (MNRF) for wrinkle reduction and rejuvenation',
              path: '/mnrf-treatment-in-bangalore-microneedling-with-radio-frequency/',
            },
          ],
        },
        {
          title: 'Laser Treatments',
          items: [
            {
              label: 'Pigmentation correction (melasma, freckles and dark spots)',
              path: '/laser-toning-treatment-in-bangalore/',
            },
            {
              label: 'Scar & stretch mark removal',
              path: '/fractional-co2-laser-skin-resurfacing-in-bangalore/',
            },
            { label: 'Tattoo removal', path: '/laser-tattoo-removal-in-bangalore/' },
          ],
        },
        {
          title: 'Skin Rejuvenation',
          items: [
            { label: 'Chemical Peels', path: '/chemical-peel-treatment-in-bangalore/' },
            { label: 'HydraFacials', path: '/best-hydrafacial-treatment-in-marathahalli-whitefield-bangalore/' },
            { label: 'Skin Tightening', path: '/radio-frequency-skin-tightening-treatment/' },
            { label: 'Laser Therapy', path: '/laser-toning-treatment-in-bangalore/' },
          ],
        },
      ],
      ctaLine: 'Enhance Your Skin with Expert Cosmetic Dermatology – Book Your Consultation Now!',
    },

    /* B1.6 — Surgical Dermatology */
    {
      kind: 'prose',
      tone: 'cream',
      heading: 'Surgical Dermatology: Advanced Solutions for Skin and Hair Concerns',
      paragraphs: [
        'These are precision procedures for medical and cosmetic dermatology needs. Dr. Mahapatra specializes in minimally invasive surgical dermatology procedures to correct and improve skin, hair and nail concerns.',
      ],
      image: {
        src: assets.doctorSandeepProcedure,
        alt: assets.doctorSandeepProcedureAlt,
        width: 650,
        height: 450,
      },
      steps: [
        { title: 'Skin Growth Removal', detail: 'Moles, cysts, warts and skin tags' },
        { title: 'Acne Scar Revision', detail: 'Subcision, derma rolling and laser treatments' },
        { title: 'Vitiligo Surgeries', detail: 'Punch grafting and melanocyte transplants' },
        {
          title: 'Hair Restoration',
          detail: 'Neo Follicle Transplant (NFT) for natural-looking hair regrowth',
        },
      ],
      after:
        'Aesthetic procedures such as Botox and dermal fillers are routinely performed to smooth facial wrinkles and restore tissue volume. All procedures are carried out under aseptic conditions. Pre-procedure and post-procedure care, contraindications, expected outcome and the number of sessions needed are discussed with every patient during consultation.',
      ctaLine: 'Explore Advanced Surgical Dermatology Options – Schedule Your Appointment Today!',
    },

    /* B1.7 — Advanced Dermatology Equipment.
     * TODO(content): doc note 5 — copied from the live page and likely outdated;
     * it omits the Reveal VEGA COMFORT, Viora, Q-Switched Nd:YAG, MNRF and HIFU
     * machines promoted elsewhere. Confirm with the clinic. */
    {
      kind: 'checklist',
      tone: 'white',
      heading: 'Advanced Dermatology Equipment at Derma Solutions',
      intro: 'The tools and lasers available at the clinic for dermato surgery include:',
      groups: [
        {
          items: [
            'Ellman radiofrequency',
            'Chemical peels',
            'Microdermabrasion',
            'Mesotherapy (for hair loss, pigmentation, skin rejuvenation and acne scars/open pores)',
            'Dermarollers',
            'Intense Pulsed Light (IPL)',
            'Velashape (fat reduction)',
            'i-Lipo machine for cellulite and fat reduction',
            'Lasers for hair removal: Alexandrite (Apogee/Cynosure) and Nd:YAG lasers (Cutera)',
            'Laser for acne scars (Affirm laser)',
            'Titan mid-infrared light (Xeo/Cutera) for skin tightening',
            'Nd:YAG laser (Cutera) for vascular lesions',
            'Medlite C6 laser for tattoo removal and pigmented birthmarks',
          ],
        },
      ],
    },

    /* B1.8 — What Patients Say. TODO(content): doc note 6 — patient consent. */
    {
      kind: 'testimonials',
      tone: 'dark',
      heading: 'What Patients Say About Dr. Sandeep Mahapatra',
      subheading: 'Real stories of transformation and trust.',
      items: [
        {
          name: 'Raj Chaudry',
          treatment: 'Skin Rejuvenation',
          quote:
            'I recently underwent skin rejuvenation treatment at Derma Solutions, led by Dr. Sandeep Mahapatra. After assessing my skin conditions and concerns, he prepared a personalized treatment plan for me. My skin feels revitalized, with a noticeable improvement in texture and tone.',
        },
        {
          name: 'Mridula Pardeshi',
          treatment: 'Botox Treatment',
          quote:
            "Dr. Sandeep's expertise and gentle approach instantly put me at ease. He took the time to explain the procedure and address my concerns. The fine lines and wrinkles on my face were visibly reduced, leaving me with a more refreshed appearance.",
        },
        {
          name: 'Sara Bansal',
          treatment: 'PDO Thread Lifts',
          quote:
            'The procedure was expertly administered by Dr. Sandeep Mahapatra. PDO thread lifts gave an instant lift to my cheeks and jawline, with minimal downtime. The team ensured I was comfortable throughout and provided thorough post-treatment care.',
        },
      ],
    },

    /* B1.9 — Procedure Videos. The doc names the channel only; these three are
     * the clinic's own uploads that show Dr. Sandeep performing a procedure,
     * picked from the video gallery (src/content/galleryMedia.ts), whose
     * posters are already in public/images/video-gallery/. */
    {
      kind: 'videos',
      tone: 'white',
      heading: 'Watch Dermatology Procedure Videos by Dr. Sandeep Mahapatra',
      subheading:
        'A curated selection of dermatology procedure videos by our skin & dermatology specialist, Dr. Sandeep Mahapatra.',
      youtubeIds: ['Rch8b7ks0Zc', 'SzLoL0dg06g', 'WeQX5aObgoI'],
    },

    /* B1.10 — FAQ. Visible only: this page's JSON-LD is a live capture that
     * ships byte-verbatim, so no FAQPage node can be added for it. */
    {
      kind: 'faq',
      tone: 'cream',
      heading: 'Frequently Asked Questions About Dermatology Care',
      subheading: 'Your skin and hair deserve the best care.',
      items: [
        {
          question: 'What conditions do dermatologists treat?',
          answer:
            'Dermatologists treat skin, hair and nail conditions including acne, eczema, psoriasis, rosacea, hair loss, pigmentation disorders and skin infections. They also provide cosmetic services like anti-aging treatments, skin rejuvenation and hair restoration.',
        },
        {
          question: 'When should I see a dermatologist?',
          answer:
            "See a dermatologist if you have persistent acne, unusual rashes, severe hair loss, or skin changes that don't resolve with over-the-counter treatments.",
        },
        {
          question: 'What should I expect during my first dermatologist visit?',
          answer:
            'The dermatologist will review your medical history, discuss your concerns and examine your skin. They may recommend treatments or further tests, and create a personalized care plan.',
        },
        {
          question: 'Are cosmetic treatments safe?',
          answer:
            'When performed by a qualified dermatologist, cosmetic treatments such as Botox, dermal fillers and laser therapy are considered safe. Dr. Sandeep Mahapatra follows strict medical standards for every procedure.',
        },
        {
          question: 'Do dermatologists treat hair and scalp problems?',
          answer:
            'Yes. Dermatologists diagnose and treat hair and scalp conditions including dandruff, hair thinning, alopecia and other scalp disorders.',
        },
        {
          question: 'What is the cost of a consultation with a dermatologist?',
          answer:
            'Consultation fees vary with the services required. Contact us directly for pricing details and package options.',
        },
        {
          question: 'How often should I visit a dermatologist?',
          answer:
            'A routine skin check once a year is recommended. If you have specific concerns or are undergoing treatment, you may need more frequent visits.',
        },
        {
          question: 'Can I get same-day appointments for urgent skin conditions?',
          answer:
            "We accommodate urgent cases as quickly as possible. Contact the clinic for availability, and we'll do our best to schedule a same-day appointment.",
        },
        {
          question: 'Is Derma Solutions accessible?',
          answer:
            'Yes. The clinic is conveniently located in Marathahalli and Whitefield and serves patients from across Bangalore.',
        },
      ],
    },

    /* B1.11 — Visit Our Clinic + CTA */
    { kind: 'visitClinic', tone: 'white' },
    {
      kind: 'cta',
      tone: 'dark',
      heading: 'Transform Your Skin and Hair with Dr. Sandeep Mahapatra',
      subheading:
        'Visit Derma Solutions for expert care and lasting results. Schedule your consultation with Dr. Sandeep Mahapatra, dermatologist in Marathahalli, Whitefield – Bangalore, today.',
    },
  ],
}
