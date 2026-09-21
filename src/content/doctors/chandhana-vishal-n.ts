import { emailRow, phoneRow, TO_CONFIRM, type DoctorPageContent } from '@/content/doctor'

/**
 * /dr-chandhana-vishal-n-plastic-surgeon/ — Part B4 of
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md, verbatim.
 *
 * Tones run W C W C W C W D.
 *
 * TODO(content): doc note 7 — confirm the full names behind IAAPS, KAPRAS and
 * BRASA, and her consultation days at Derma Solutions (a "Consultation Days"
 * row can be added to B4.1 once known).
 */
export const chandhanaVishalNPage: DoctorPageContent = {
  id: 'chandhana-vishal-n',
  name: 'Dr. Chandhana Vishal N',
  bands: [
    /* B4.1 — About */
    {
      kind: 'profile',
      tone: 'white',
      block: {
        eyebrow: 'Plastic, Reconstructive & Aesthetic Surgeon',
        heading: 'About Dr. Chandhana Vishal N',
        body: 'Dr. Chandhana Vishal N is a highly qualified plastic, reconstructive and aesthetic surgeon with an MCh in Plastic Surgery and international fellowship training in aesthetic surgery from Madrid, Spain. From life-changing reconstructive surgeries to confidence-boosting cosmetic enhancements, she brings a unique blend of skill, compassion and innovation to every treatment.',
        rows: [
          {
            label: 'Qualification:',
            value:
              'MBBS, MCh (Plastic Surgery), International Fellowship in Aesthetic Surgery – Madrid, Spain',
          },
          // TODO(content): doc note 2 — the live page gives no figure.
          { label: 'Experience:', value: TO_CONFIRM },
          {
            label: 'Position:',
            value: 'Plastic, Reconstructive & Aesthetic Surgeon, Derma Solutions',
          },
          { label: 'Memberships:', value: 'IAAPS, KAPRAS, BRASA' },
          phoneRow,
          emailRow,
        ],
      },
    },

    /* B4.2 — Meet the Face Behind the Expertise */
    {
      kind: 'prose',
      tone: 'cream',
      eyebrow: 'Get to Know Dr. Chandhana',
      heading: 'Meet the Face Behind the Expertise',
      paragraphs: [
        'With advanced training in aesthetic surgery from Spain and years of experience across reconstructive and cosmetic procedures, Dr. Chandhana Vishal N is committed to helping you look and feel your best. Her career includes serving as an Assistant Professor in Bangalore, where she performed complex reconstructive surgeries and aesthetic procedures and taught the next generation of surgeons. She is passionate about safe, high-quality outcomes and is a member of IAAPS, KAPRAS and BRASA.',
      ],
    },

    /* B4.3 — Qualifications & Experience. The doc gives no dates, so the rows
     * are numbered instead. */
    {
      kind: 'timeline',
      tone: 'white',
      eyebrow: 'Expertise You Can Trust',
      heading: "Dr. Chandhana's Qualifications & Experience",
      subheading: 'From delicate reconstructions to aesthetic enhancements, she does it all.',
      rows: [
        { title: 'International Fellowship in Aesthetic Surgery', detail: 'Madrid, Spain' },
        { title: 'MCh Plastic Surgery', detail: 'Jawaharlal Nehru Medical College, Belagavi' },
        {
          title: 'Assistant Professor, Plastic Surgery',
          detail: 'MVJ Medical College & Hospital, Bangalore',
        },
      ],
      after:
        'Her academic and surgical background means every patient benefits from both global techniques and personalized care.',
    },

    /* B4.4 — Clinical Practice */
    {
      kind: 'iconBoxes',
      tone: 'cream',
      heading: 'Experience & Clinical Practice',
      items: [
        {
          title: 'Aesthetic Surgeries',
          text: 'Liposuction, body contouring, facelifts, rhinoplasty, breast augmentation, gynecomastia correction and more.',
        },
        {
          title: 'Injectables & Minimally Invasive',
          text: 'Botox, fillers, PRP and microneedling for youthful, radiant skin.',
        },
        {
          title: 'Reconstructive Surgeries',
          text: 'Burns, trauma, diabetic foot and onco-reconstruction.',
        },
        {
          title: 'Hand Surgeries',
          text: 'Tendon and nerve repair, and congenital deformity correction.',
        },
      ],
      after:
        'Each procedure is performed with precision and a focus on natural-looking, safe and lasting results.',
    },

    /* B4.5 — Research & Contributions */
    {
      kind: 'prose',
      tone: 'white',
      eyebrow: 'Sharing Knowledge. Advancing Medicine.',
      heading: 'Beyond Surgery: A Mind that Teaches and Innovates',
      paragraphs: [
        'Dr. Chandhana has presented research at national conferences such as INDOCLEFTCON and APSICON and contributed to surgical publications. She has also conducted workshops on cleft surgery, orthognathic surgery, microsurgery and aesthetic medicine. Her dedication goes beyond the operation theatre, helping shape the future of plastic and reconstructive surgery.',
      ],
    },

    /* B4.6 — Professional Memberships */
    {
      kind: 'cards',
      tone: 'cream',
      columns: 3,
      heading: 'Professional Memberships',
      cards: [
        { title: 'IAAPS', body: 'Member' },
        { title: 'KAPRAS', body: 'Member' },
        { title: 'BRASA', body: 'Member' },
      ],
    },

    /* B4.7 — Visit Our Clinic + CTA */
    { kind: 'visitClinic', tone: 'white' },
    {
      kind: 'cta',
      tone: 'dark',
      heading: 'Ready to Begin Your Transformation?',
      subheading:
        "Let's talk about your goals, concerns and the best way forward. Whether it's reconstructive surgery or aesthetic enhancement, Dr. Chandhana is here to guide you with care, clarity and expertise.",
    },
  ],
}
