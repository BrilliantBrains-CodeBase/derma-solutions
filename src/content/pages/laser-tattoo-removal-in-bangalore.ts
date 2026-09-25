/**
 * /laser-tattoo-removal-in-bangalore/
 * Ported from seo-backup/02-markdown/laser-tattoo-removal-in-bangalore.md — see
 * src/content/page.ts.
 *
 * Left out of the live page: its photographs (not in seo-backup/06-media), the
 * before/after widget (no images captured), the testimonials (no consent record
 * on file), the doctor's stat counters and the repeated call buttons.
 *
 * FOR REVIEW: the live copy gives two session counts — "3–10 treatments … every
 * 6 weeks" (cost section) and "6–12 sessions" (FAQ) — and both are kept as
 * written. A doctor should settle on one.
 */
import type { ContentPageContent } from '@/content/page'
import { serviceMenu } from '@/config/site'

const content: ContentPageContent = {
  path: '/laser-tattoo-removal-in-bangalore/',
  name: 'Laser Tattoo Removal',
  section: 'Services',
  blocks: [
    {
      type: 'p',
      html: 'Say goodbye to unwanted tattoos with advanced laser technology, trusted by clients in Marathahalli, Whitefield and across Bangalore.',
    },
    { type: 'h2', id: 'what-is-it', text: 'What is laser tattoo removal?' },
    {
      type: 'p',
      html: 'Laser tattoo removal is a non-invasive procedure that uses laser light to break tattoo ink down into smaller particles, which your immune system then eliminates naturally over time.',
    },
    {
      type: 'p',
      html: 'The treatment is safe, effective and suitable for all tattoo colours and skin types. Whether you want to fade a tattoo for a cover-up or remove it completely, laser tattoo removal is the go-to solution.',
    },
    { type: 'h2', id: 'why-choose', text: 'Why choose laser tattoo removal?' },
    {
      type: 'list',
      ordered: false,
      items: [
        '<strong>Safe and non-invasive:</strong> no incisions or surgery, so the risk of complications is minimal.',
        '<strong>Effective on all tattoo colours:</strong> advanced lasers target many pigment types, including black, red, blue and green inks.',
        '<strong>Minimal downtime:</strong> resume your daily activities immediately after the session.',
        '<strong>Personalised treatment:</strong> plans tailored to your tattoo’s size, location and colour.',
      ],
    },
    { type: 'h2', id: 'how-it-works', text: 'The science behind laser tattoo removal' },
    {
      type: 'list',
      ordered: true,
      items: [
        '<strong>The laser targets the ink:</strong> it emits pulses of light energy that pass through the skin to the tattoo ink.',
        '<strong>The pigment breaks down:</strong> the energy breaks the ink particles into smaller fragments.',
        '<strong>The body clears it:</strong> your immune system processes and removes the fragments naturally over time.',
        '<strong>The tattoo fades:</strong> with each session, more ink is broken down and eliminated.',
      ],
    },
    { type: 'h2', id: 'right-for-you', text: 'Is laser tattoo removal right for you?' },
    { type: 'p', html: 'Most people can benefit from this treatment. It is suitable for:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Anyone with an unwanted tattoo they wish to fade or remove completely',
        'Tattoos of any colour or size',
        'People planning a cover-up tattoo who need the current one faded first',
        'Those with realistic expectations about the time and number of sessions required',
      ],
    },
    { type: 'h2', id: 'is-it-safe', text: 'Is laser tattoo removal safe for your skin?' },
    {
      type: 'p',
      html: 'Laser tattoo removal is FDA-approved and performed by trained professionals. The procedure is designed to minimise discomfort and protect the surrounding skin. Temporary redness or mild swelling may occur, but these usually settle quickly.',
    },
    { type: 'h2', id: 'preparation-and-aftercare', text: 'How to prepare, and how to care for your skin afterwards' },
    { type: 'h3', id: 'before-treatment', text: 'Before treatment' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Avoid sun exposure or tanning on the tattoo area for 2 weeks.',
        'Do not use creams or lotions on the tattoo before your session.',
        'Make sure the area is clean and free of make-up or other products.',
      ],
    },
    { type: 'h3', id: 'after-treatment', text: 'After treatment' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Apply a soothing ointment or cream as recommended.',
        'Keep the treated area out of direct sunlight for at least 2 weeks.',
        'Do not pick or scratch the area as it heals.',
        'Keep the area clean and dry.',
      ],
    },
    { type: 'h2', id: 'cost', text: 'Cost of laser tattoo removal in Bangalore' },
    {
      type: 'table',
      head: ['Sessions', 'Cost'],
      rows: [
        ['1 session', '₹3,000 – ₹5,000'],
        ['4 sessions', '₹10,000 – ₹16,000'],
        ['6 sessions', '₹16,000 – ₹36,000'],
      ],
    },
    { type: 'p', html: '18% GST is applicable on the above rates.' },
    {
      type: 'p',
      html: 'Depending on the size of the tattoo, a session may be very quick (under five minutes) or quite long. For a large tattoo, the area is numbed with a topical anaesthetic first.',
    },
    {
      type: 'p',
      html: 'Most people need on average 3–10 treatments, performed about every 6 weeks, though occasionally more are needed. There is no fixed number of treatments, only a recommendation, and not every tattoo can be removed completely, even with 10 or more sessions.',
    },
    {
      type: 'p',
      html: 'At Derma Solutions, tattoo removal uses a Q-switched laser with 1064nm and 532nm wavelengths. Each wavelength corresponds to a colour in the visible range, so our specialists select the wavelength that targets your tattoo’s colours, customising the treatment for each patient and each tattoo.',
    },
    { type: 'h2', id: 'why-derma-solutions', text: 'Why choose Derma Solutions for laser tattoo removal?' },
    {
      type: 'list',
      ordered: false,
      items: [
        '<strong>Experienced team:</strong> led by <a href="/best-dermatologist-in-marathahalli-whitefield-bangalore/">Dr. Sandeep Mahapatra</a>, Senior Consultant Dermatologist.',
        '<strong>Modern equipment:</strong> Q-switched lasers for precise ink targeting.',
        '<strong>Customised plans:</strong> tailored to your tattoo and skin type.',
        '<strong>Convenient location:</strong> an accessible clinic in Marathahalli, close to Whitefield.',
        '<strong>Affordable pricing:</strong> transparent, with no hidden costs.',
        '<strong>Safe and comfortable:</strong> we prioritise your safety and comfort.',
      ],
    },
  ],
  faqHeading: 'Frequently asked questions about laser tattoo removal',
  faqs: [
    {
      question: 'How does laser tattoo removal work?',
      answer:
        'Laser tattoo removal uses concentrated light energy to break down tattoo ink particles in the skin. Over time, the body’s immune system flushes these particles out.',
    },
    {
      question: 'Is laser tattoo removal painful?',
      answer:
        'The sensation varies and is often compared to a rubber band snapping against the skin. Numbing creams or cooling devices are used to minimise discomfort.',
    },
    {
      question: 'How many sessions are needed for complete tattoo removal?',
      answer:
        'It depends on the tattoo’s size, ink colours and age, and on your skin type. On average, 6–12 sessions may be required.',
    },
    {
      question: 'Can all tattoo colours be removed?',
      answer:
        'Darker colours such as black and blue are easier to remove, while lighter colours such as yellow, green and white can be more challenging.',
    },
    {
      question: 'Are there any side effects of laser tattoo removal?',
      answer:
        'Common side effects include redness, swelling and mild blistering, which usually subside within a few days. Scarring is rare when the treatment is performed by a qualified professional.',
    },
    {
      question: 'Can laser tattoo removal be used on all skin types?',
      answer:
        'Yes. Modern lasers can treat a range of skin tones, but darker skin may need specialised settings to avoid pigmentation changes.',
    },
    {
      question: 'How long does each session take?',
      answer: 'A session typically lasts 10 to 30 minutes, depending on the size and complexity of the tattoo.',
    },
    {
      question: 'Can I resume normal activities after the treatment?',
      answer:
        'Yes, but avoid direct sun exposure and strenuous exercise for a day or two after the treatment.',
    },
  ],
  related: {
    heading: 'Laser Treatment',
    items: serviceMenu.find(g => g.group === 'Laser Treatment')!.items,
  },
}

export default content
