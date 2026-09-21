import { assets } from '@/config/site'
import { emailRow, phoneRow, type DoctorPageContent } from '@/content/doctor'

/**
 * /dr-thyagaraj-best-plastic-surgeon-in-bangalore/ — Part B3 of
 * content/doctor-page/Derma-Solutions-Doctors-About-Page-Content.md, verbatim.
 *
 * Tones run W C W C W D W D — B3.6's dark testimonial band and the dark CTA
 * are kept apart by the white Visit Our Clinic band between them.
 */
export const thyagarajPage: DoctorPageContent = {
  id: 'thyagaraj',
  name: 'Dr. Thyagaraj',
  bands: [
    /* B3.1 — About */
    {
      kind: 'profile',
      tone: 'white',
      block: {
        eyebrow: 'Senior Plastic Surgeon – MS, MCh',
        heading: 'About Dr. Thyagaraj',
        body: 'Dr. Thyagaraj is a senior plastic surgeon at Derma Solutions, recognized for his skill in plastic and reconstructive surgery. With over 20 years of expertise, an extensive educational background and global clinical training, he is dedicated to delivering natural-looking results that enhance both confidence and quality of life.',
        rows: [
          {
            label: 'Qualification:',
            value:
              'MBBS, MS (General Surgery), MCh (Plastic Surgery), Masters in Reconstructive Breast Surgery',
          },
          { label: 'Experience:', value: '20+ years' },
          { label: 'Position:', value: 'Senior Plastic Surgeon, Derma Solutions' },
          phoneRow,
          emailRow,
        ],
      },
    },

    /* B3.2 — Educational Journey. "Universitat Autònoma de Barcelona" is the
     * doc's correction of the live page's spelling (note 8). */
    {
      kind: 'timeline',
      tone: 'cream',
      eyebrow: 'Education',
      heading: 'Educational Journey That Defines Excellence',
      subheading: 'World-class training and credentials in plastic surgery.',
      rows: [
        {
          when: '2001',
          title: 'MBBS',
          detail: 'Rajiv Gandhi University of Health Sciences (RGUHS), Bengaluru',
        },
        {
          when: '2006',
          title: 'M.S. in General Surgery',
          detail: 'Rajiv Gandhi University of Health Sciences (RGUHS), Bengaluru',
        },
        {
          when: '2014',
          title: 'MCh in Plastic Surgery',
          detail: 'Rajiv Gandhi University of Health Sciences (RGUHS), Bengaluru',
        },
        {
          when: '2019',
          title: 'Masters in Reconstructive Breast Surgery',
          detail:
            'Reconstructive Microsurgery European School, Universitat Autònoma de Barcelona',
        },
      ],
    },

    /* B3.3 — World-Class Clinical Training */
    {
      kind: 'cards',
      tone: 'white',
      columns: 4,
      heading: 'World-Class Clinical Training for Unmatched Expertise',
      subheading: 'Specialized skills built at leading global institutions.',
      cards: [
        { title: 'Oncoplastic Breast Reconstruction', body: 'Brussels University Hospital, Belgium' },
        { title: 'Aesthetic Breast Surgery', body: 'Clinique Pyramids Zurich, Switzerland' },
        { title: 'Implant-Based Breast Reconstruction', body: 'Brussels University Hospital, Belgium' },
        { title: 'Autologous Breast Reconstruction', body: 'Sant Pau Hospital, Barcelona, Spain' },
        {
          title: 'Hair Transplantation',
          body: 'Medispa Laser and Cosmetic Surgery Centre, Jaipur, India',
        },
        {
          title: 'Microvascular Surgery',
          body: 'Ganga Microsurgery Training Institute, Coimbatore, India',
        },
        { title: 'Lymphatic Surgery', body: 'Sant Pau Hospital, Barcelona, Spain' },
        {
          title: 'Diploma in Laparoscopy',
          body: 'Indian Institute of Laparoscopic Surgery, Coimbatore, India',
        },
      ],
    },

    /* B3.4 — Areas of Expertise */
    {
      kind: 'iconBoxes',
      tone: 'cream',
      eyebrow: 'What He Specializes In',
      heading: 'Comprehensive Expertise Across a Spectrum of Procedures',
      subheading: 'Advanced solutions tailored to your cosmetic and reconstructive needs.',
      items: [
        {
          title: 'Breast Procedures',
          text: 'Augmentation, lift, reduction and reconstruction',
          links: [{ label: 'Breast Surgeries', path: '/breast-surgeries-in-bangalore/' }],
        },
        {
          title: 'Body Sculpting',
          text: 'Liposuction, abdominoplasty and body contouring',
          links: [
            { label: 'Liposuction', path: '/liposuction-treatment-in-bangalore/' },
            {
              label: 'Abdominoplasty',
              path: '/abdominoplasty-tummy-tuck-treatment-in-bangalore/',
            },
          ],
        },
        {
          title: 'Facial Enhancements',
          text: 'Rhinoplasty, scar revision and facial contouring',
          links: [{ label: 'Rhinoplasty', path: '/rhinoplasty-surgery-in-bangalore/' }],
        },
        { title: 'Genital Rejuvenation', text: 'Expert procedures to enhance confidence' },
        {
          title: 'Complex Reconstructions',
          text: 'Microvascular surgery, nerve and muscle transfers, and congenital anomaly corrections',
        },
        { title: 'Hair Restoration', text: 'Advanced FUT and FUE hair transplantation techniques' },
        { title: 'Burn Deformity Correction', text: 'Restoring appearance and function after burns' },
      ],
    },

    /* B3.5 — Patient-Centric Care */
    {
      kind: 'prose',
      tone: 'white',
      heading: 'Patient-Centric Care That Inspires Confidence',
      subheading: "Your satisfaction and comfort are Dr. Thyagaraj's top priorities.",
      paragraphs: [
        'Dr. Thyagaraj believes in empowering his patients through clear communication, personalized care plans and a compassionate approach. His goal is to deliver results that not only enhance appearance but also improve overall well-being.',
      ],
      image: {
        src: assets.doctorThyagarajConsult,
        alt: assets.doctorThyagarajConsultAlt,
        width: 480,
        height: 551,
      },
    },

    /* B3.6 — What Patients Say. TODO(content): doc note 6 — patient consent.
     * The name is spelled "Dr. Thyagaraj" here; the live quote had "Thyagraj". */
    {
      kind: 'testimonials',
      tone: 'dark',
      heading: 'What Patients Say About Dr. Thyagaraj',
      subheading: 'Real stories of transformation and gratitude.',
      items: [
        {
          name: 'Radha Tiwari',
          treatment: 'Breast Lift Surgery',
          quote:
            'I noticed sagging due to age and decided to undergo a breast lifting surgery. Dr. Thyagaraj and his team provided comprehensive care, from the initial consultation to the post-operative follow-up. The results have given me a more youthful and rejuvenated appearance.',
        },
      ],
    },

    /* B3.7 — Visit Our Clinic + CTA */
    { kind: 'visitClinic', tone: 'white' },
    {
      kind: 'cta',
      tone: 'dark',
      heading: 'Your Journey to Transformation Starts Here',
      subheading:
        'Connect with Dr. Thyagaraj for expert guidance and care. Book your consultation with Dr. Thyagaraj at Derma Solutions today.',
    },
  ],
}
