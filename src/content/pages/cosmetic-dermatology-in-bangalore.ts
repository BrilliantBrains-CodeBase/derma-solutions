/**
 * /cosmetic-dermatology-in-bangalore/
 * Ported from seo-backup/02-markdown/cosmetic-dermatology-in-bangalore.md — see
 * src/content/page.ts.
 *
 * Left out of the live page: the testimonial (no consent record on file), the
 * service-areas list (the footer carries it) and the call buttons (the sidebar
 * and footer carry them). "With over 13 years of experience" is dropped: it was
 * written in 2024 and would now be stale.
 */
import type { ContentPageContent } from '@/content/page'
import { serviceMenu } from '@/config/site'

const content: ContentPageContent = {
  path: '/cosmetic-dermatology-in-bangalore/',
  name: 'Cosmetic Dermatology',
  section: 'Services',
  blocks: [
    {
      type: 'p',
      html: 'Cosmetic dermatology is one of the most sought-after branches of medical care, as it focuses on beauty and appearance. Today’s generation is conscious of its natural beauty, because a first impression is so often created by appearance.',
    },
    {
      type: 'p',
      html: 'To improve or enhance the texture of your skin, reach out to an experienced cosmetologist who can recommend the right solution for you.',
    },
    { type: 'h2', id: 'what-damages-skin', text: 'What damages the skin' },
    { type: 'p', html: 'The skin gets damaged by many everyday factors, including:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Injury marks',
        'Burns',
        'Sunlight',
        'Pollution',
        'Weight loss and gain, which cause stretch marks',
        'Skin care products used without a doctor’s prescription',
      ],
    },
    { type: 'h2', id: 'cosmetic-dermatology-at-derma-solutions', text: 'Cosmetic dermatology at Derma Solutions' },
    {
      type: 'p',
      html: 'Derma Solutions is one of the leading dermatology clinics in Bangalore, providing cosmetic treatments and care for skin and hair problems. There are specific procedures and treatments for every skin type to enhance its appearance.',
    },
    {
      type: 'p',
      html: 'The therapies in cosmetic dermatology include <a href="/botox-treatment-in-bangalore-whitefield-and-marathahalli/">Botox</a> and Dysport injections to reduce wrinkles and facial lines, <a href="/chemical-peel-treatment-in-bangalore/">chemical peels</a> to improve the appearance of the skin, <a href="/laser-hair-removal-in-bangalore/">laser hair removal</a>, laser therapy and <a href="/mnrf-treatment-in-bangalore-microneedling-with-radio-frequency/">microneedling</a>. These treatments address a wide range of skin concerns and help you regain your confidence.',
    },
    {
      type: 'p',
      html: 'Cosmetic dermatology also helps reduce <a href="/acne-scar-treatment-in-bangalore/">acne scars</a>, stretch marks, age spots, lines and wrinkles. Natural, healthy, youthful-looking skin can be maintained with medical skin care products prescribed by a qualified cosmetologist.',
    },
    { type: 'h2', id: 'your-cosmetologist', text: 'Your cosmetologist' },
    {
      type: 'p',
      html: 'Cosmetologists are trained to perform cosmetic treatments and procedures. <a href="/best-dermatologist-in-marathahalli-whitefield-bangalore/">Dr. Sandeep Mahapatra</a>, the founder of Derma Solutions, is an expert in cosmetology, hair transplantation, trichology and aesthetic dermatology.',
    },
  ],
  related: {
    heading: 'Cosmetology',
    items: serviceMenu.find(g => g.group === 'Cosmetology')!.items,
  },
}

export default content
