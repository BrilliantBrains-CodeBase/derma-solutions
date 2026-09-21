import { emailRow, phoneRow, TO_CONFIRM, type DoctorPageContent } from '@/content/doctor'

/**
 * /dr-sumedha-tirthani-dermatologist/ — Part B2 of
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md, verbatim.
 *
 * Tones run W C W C W C W D.
 */
export const sumedhaTirthaniPage: DoctorPageContent = {
  id: 'sumedha-tirthani',
  name: 'Dr. Sumedha Tirthani',
  bands: [
    /* B2.1 — About */
    {
      kind: 'profile',
      tone: 'white',
      block: {
        eyebrow: 'Expert Dermatologist in Bangalore',
        heading: 'About Dr. Sumedha Tirthani',
        body: 'Dr. Sumedha Tirthani is a gold medalist in MD Dermatology who balances medical excellence with compassionate patient care. She has robust experience in clinical dermatology, laser procedures and aesthetic dermatology, built through hands-on practice, research and national conference presentations. At Derma Solutions, she offers advanced treatments for acne, pigmentation, hair loss, vitiligo and more.',
        rows: [
          { label: 'Qualification:', value: 'MBBS, MD – Dermatology (Gold Medalist)' },
          // TODO(content): doc note 2 — the live page gives no figure.
          { label: 'Experience:', value: TO_CONFIRM },
          { label: 'Position:', value: 'Dermatologist, Derma Solutions' },
          phoneRow,
          emailRow,
        ],
      },
    },

    /* B2.2 — Educational Background */
    {
      kind: 'timeline',
      tone: 'cream',
      eyebrow: 'Qualifications & Experience',
      heading: 'Gold Medalist & Nationally Recognized Academic Achiever',
      subheading: 'Delivering excellence with a strong academic foundation.',
      rows: [
        {
          when: 'Feb 2022 – Feb 2025',
          title: 'MD Dermatology (Gold Medalist)',
          detail: 'Sri Devaraj Urs Medical College, Bengaluru',
        },
        {
          when: 'Apr 2020 – Mar 2021',
          title: 'Internship',
          detail: 'Netaji Subhash Chandra Bose Medical College, Jabalpur',
        },
        {
          when: 'Apr 2015 – Mar 2020',
          title: 'MBBS (Gold Medalist)',
          detail: 'Chirayu Medical College, Bhopal',
        },
      ],
      after:
        'Dr. Sumedha has been recognized for academic excellence and clinical insight, including as a finalist in the Karnataka State Dermatology Quiz and through research contributions in leading journals.',
    },

    /* B2.3 — Experience & Clinical Practice */
    {
      kind: 'cards',
      tone: 'white',
      columns: 2,
      heading: 'Experience & Clinical Practice',
      cards: [
        {
          title: 'Senior Resident',
          subtitle: 'Sri Devaraj Urs Medical College, Bengaluru',
          body: 'Treated complex inpatient and outpatient skin conditions and led chemical peel and laser sessions.',
        },
        {
          title: 'Resident Doctor',
          subtitle: "Dr. Luthra's Skin Clinic, Jabalpur",
          body: 'Assisted in dermatosurgical procedures such as electrocautery, radiofrequency ablation, chemical peels and nevi excision.',
        },
      ],
      after:
        'She actively engages in clinical research and continuing medical education to stay ahead of advances in dermatology.',
    },

    /* B2.4 — Areas of Expertise */
    {
      kind: 'iconBoxes',
      tone: 'cream',
      eyebrow: 'Expertise You Can Trust',
      heading: 'Areas of Expertise',
      subheading: 'Comprehensive care across clinical, cosmetic and laser dermatology.',
      items: [
        {
          title: 'Clinical Dermatology',
          text: 'Acne, eczema, psoriasis, vitiligo, fungal infections, STDs, leprosy and pediatric dermatology.',
        },
        {
          title: 'Cosmetic Dermatology',
          text: 'Chemical peels, skin rejuvenation, pigmentation treatment and scar reduction.',
        },
        {
          title: 'Laser Therapy',
          text: 'Laser toning, laser hair removal, and treatment for PIH, melasma and more.',
        },
        {
          title: 'Dermoscopy & Diagnosis',
          text: 'High-accuracy diagnostics for early detection of complex conditions.',
        },
        {
          title: 'Vitiligo Surgery & Dermatosurgery',
          text: 'Advanced treatment methods, including radiofrequency and punch grafting.',
        },
      ],
    },

    /* B2.5 — Certifications & Trainings */
    {
      kind: 'timeline',
      tone: 'white',
      heading: 'Certifications & Trainings',
      rows: [
        {
          when: 'Sep 2024',
          title:
            'Delivered a talk on Dermatological Therapeutics – Recalcitrant Alopecia, Resicuticon 2024',
        },
        {
          when: 'Jun 2024',
          title:
            'Training in Tertiary Care Management of Leprosy, CLTRI, Chengalpattu, Tamil Nadu',
        },
        { when: 'Jan 2024', title: 'ACLS & BLS, American Heart Association' },
        {
          when: 'Oct 2023',
          title:
            "Presented paper \"Is oral acitretin indispensable for the treatment of Darier's Disease? A case series of Darier's Disease treated with oral isotretinoin\", Cuticon KN 2023, KMC Manipal",
        },
        {
          when: 'Oct 2023',
          title:
            'Presented poster "Generalised Dowling-Degos Disease: A Classic Clinical & Histopathological Presentation of a Very Rare Genodermatosis", Cuticon KN 2023, KMC Manipal',
        },
        { when: 'Mar 2023', title: 'Basic Course in Biomedical Research' },
        {
          when: 'Feb 2023',
          title:
            'Presented poster "A sporadic case of a rare hereditary disease: Netherton Syndrome", Dermacon International 2023, Jio World Convention Centre, Mumbai',
        },
        { when: 'Jun 2021', title: 'Psychological First Aid, Johns Hopkins University' },
        { when: 'Apr 2020', title: 'Covid-19 Pandemic Surveillance, NSCB, Jabalpur' },
      ],
    },

    /* B2.6 — Achievements & Publications */
    {
      kind: 'checklist',
      tone: 'cream',
      heading: 'Achievements & Publications',
      groups: [
        {
          title: 'Achievements',
          items: [
            'Gold Medalist in MD Dermatology',
            'Finalist, Karnataka State Level Dermatology Quiz, Mysore Medical College, Mysore (June 2024)',
          ],
        },
        {
          title: 'Publications',
          items: [
            'Comparison of Q-Switched Nd:YAG LASER with 10% Azelaic Acid versus Fractional CO2 LASER with 10% Azelaic Acid in the treatment of Post Inflammatory Hyperpigmentation secondary to Acne – South Eastern European Journal of Public Health',
            'A sporadic case of a rare hereditary disease: Netherton Syndrome – Journal of Clinical and Biomedical Sciences',
            'Dermatology Photo Quiz 1 – Journal of Clinical and Biomedical Sciences',
          ],
        },
      ],
    },

    /* B2.7 — Visit Our Clinic + CTA */
    { kind: 'visitClinic', tone: 'white' },
    {
      kind: 'cta',
      tone: 'dark',
      heading: 'Take the First Step Toward Healthier Skin',
      subheading:
        'Visit Derma Solutions for expert care and lasting results. Consult Dr. Sumedha Tirthani at Derma Solutions, Bangalore today.',
    },
  ],
}
