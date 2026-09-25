/**
 * /iv-glutathione-treatment/
 * Ported from seo-backup/02-markdown/iv-glutathione-treatment.md — see
 * src/content/page.ts.
 *
 * NOTE: this URL duplicates /iv-glutathione-treatment-in-bangalore/ (fix-plan
 * A2, a 301 candidate once GSC confirms the direction). Until then it keeps its
 * own live copy rather than rendering the other page's, so the two are not
 * byte-identical. The header menu links the keeper.
 *
 * Left out: the AI-generated images the doc asked to replace, the doctor's stat
 * counters and the repeated call buttons.
 */
import type { ContentPageContent } from '@/content/page'
import { serviceMenu } from '@/config/site'

const content: ContentPageContent = {
  path: '/iv-glutathione-treatment/',
  name: 'IV Glutathione Treatment',
  section: 'Services',
  blocks: [
    {
      type: 'p',
      html: 'Safe, doctor-supervised IV glutathione therapy for skin glow, detox and anti-ageing at <strong>Derma Solutions, Marathahalli – Whitefield</strong>.',
    },
    {
      type: 'p',
      html: 'Our treatments are performed by experienced dermatologists using clinically approved formulations in a safe, hygienic environment, for visible, consistent and natural-looking results.',
    },
    { type: 'h2', id: 'what-is-it', text: 'What is IV glutathione therapy?' },
    {
      type: 'p',
      html: 'Glutathione is an antioxidant that occurs naturally in your body. It is often called the <strong>“master antioxidant”</strong> for its role in protecting cells from damage, detoxifying harmful substances and supporting immune health.',
    },
    {
      type: 'p',
      html: 'In glutathione IV drip treatment, this antioxidant is given directly into your bloodstream through an intravenous infusion. Unlike oral supplements or topical creams, this ensures <strong>maximum absorption and faster results</strong>.',
    },
    {
      type: 'p',
      html: 'Many people choose glutathione IV therapy not only for <strong>skin brightening and pigmentation reduction</strong>, but also for its <strong>detoxifying and anti-ageing benefits</strong>.',
    },
    { type: 'h2', id: 'why-choose', text: 'Why choose IV glutathione treatment?' },
    {
      type: 'list',
      ordered: false,
      items: [
        '<strong>Enhanced skin glow and radiance:</strong> improves overall skin brightness for a healthy, natural glow from within.',
        '<strong>Reduces pigmentation and tanning:</strong> helps even out uneven skin tone, sun damage and stubborn tanning.',
        '<strong>Fades dark spots and acne marks:</strong> works at a cellular level to reduce melasma, dark spots and post-acne pigmentation.',
        '<strong>Slows early signs of ageing:</strong> minimises dullness, fine lines and oxidative damage for a fresher look.',
        '<strong>Supports detox and liver health:</strong> helps the body detoxify and supports liver function.',
        '<strong>Boosts immunity and repairs damage:</strong> strengthens immunity while repairing skin damage caused by pollution, stress and lifestyle.',
      ],
    },
    { type: 'h2', id: 'how-it-works', text: 'How does glutathione IV therapy work?' },
    { type: 'p', html: 'Given through an IV drip, glutathione works by:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Neutralising free radicals that damage skin cells',
        'Reducing melanin production, for a brighter skin tone',
        'Supporting cell repair and regeneration',
        'Enhancing the effects of Vitamin C and other antioxidants',
        'Promoting liver detoxification and toxin removal',
      ],
    },
    {
      type: 'p',
      html: 'This is why glutathione IV drip treatment is considered both a <strong>cosmetic and a wellness therapy</strong>. Results appear gradually, with improved skin clarity, hydration and glow over multiple sessions.',
    },
    { type: 'h2', id: 'right-for-you', text: 'Is glutathione IV drip treatment right for you?' },
    { type: 'p', html: 'You may be a good candidate if you:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Have dull, tired or uneven skin tone',
        'Experience pigmentation, tanning or melasma',
        'Want to improve skin clarity and brightness',
        'Are exposed to pollution, stress or unhealthy lifestyle factors',
        'Are looking for anti-ageing and skin rejuvenation',
        'Want internal detox and wellness support',
      ],
    },
    {
      type: 'p',
      html: 'Eligibility depends on your medical history and current health, which are evaluated during your consultation.',
    },
    { type: 'h2', id: 'what-to-expect', text: 'What to expect during the treatment' },
    {
      type: 'list',
      ordered: true,
      items: [
        '<strong>Consultation:</strong> our dermatologists evaluate your skin, health history and goals to create a safe, customised treatment plan.',
        '<strong>Pre-treatment preparation:</strong> basic checks are done before the session; blood tests may be advised for better personalisation.',
        '<strong>IV glutathione infusion:</strong> glutathione with Vitamin C is infused slowly through an IV over 30–45 minutes, under expert supervision.',
        '<strong>Relax:</strong> sit back in a comfortable, hygienic setting while the infusion works.',
        '<strong>Recovery:</strong> there is no downtime; resume your daily activities immediately, with little or no discomfort.',
        '<strong>Results and maintenance:</strong> skin glow and clarity improve gradually over sessions, and maintenance treatments help sustain the results.',
      ],
    },
    {
      type: 'p',
      html: 'Sessions are weekly or fortnightly. 6–10 sessions are recommended, with visible results in 4–6.',
    },
    { type: 'h2', id: 'results', text: 'What results can you expect?' },
    { type: 'p', html: 'With regular sessions, most people notice:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'A brighter, more even skin tone',
        'Reduced pigmentation and dark spots',
        'Improved skin clarity and hydration',
        'A healthier, radiant appearance',
      ],
    },
    {
      type: 'p',
      html: 'Results vary from person to person, but typically become visible after 4–6 sessions. We focus on enhancing your natural skin tone and glow, not on unrealistic or artificial outcomes.',
    },
    { type: 'h2', id: 'cost', text: 'Cost of glutathione IV drip in Bangalore' },
    {
      type: 'p',
      html: 'The cost of a glutathione IV drip varies with the dosage, combinations and number of sessions. At Derma Solutions:',
    },
    {
      type: 'table',
      head: ['Option', 'Cost'],
      rows: [
        ['Per session', '₹3,000 – ₹5,500'],
        ['Packages', '6–10 sessions at discounted pricing'],
        ['Add-ons', 'Vitamin C boosters, detox drips'],
      ],
    },
    {
      type: 'p',
      html: 'During your consultation, our doctors recommend a customised plan suited to your goals and budget.',
    },
    { type: 'h2', id: 'is-it-safe', text: 'Is glutathione IV drip treatment safe?' },
    {
      type: 'p',
      html: 'Under expert supervision, glutathione IV drip treatment is considered safe. Possible mild side effects include:',
    },
    {
      type: 'list',
      ordered: false,
      items: ['Temporary nausea', 'Mild headache', 'Slight discomfort at the injection site'],
    },
    { type: 'p', html: 'Avoid the treatment if you:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Are pregnant or breastfeeding',
        'Have a severe liver or kidney condition',
        'Have a known allergy to any of its components',
      ],
    },
    { type: 'p', html: 'A proper consultation ensures the treatment is safe and suitable for you.' },
    { type: 'h2', id: 'why-derma-solutions', text: 'Why trust Derma Solutions for IV glutathione treatment?' },
    {
      type: 'list',
      ordered: false,
      items: [
        '<strong>Experienced dermatologists:</strong> led by <a href="/best-dermatologist-in-marathahalli-whitefield-bangalore/">Dr. Sandeep Mahapatra</a>.',
        '<strong>Medical-grade formulations:</strong> high-purity glutathione.',
        '<strong>Customised care:</strong> hygienic infusion rooms and trained IV staff.',
        '<strong>Convenient location:</strong> in Marathahalli, close to Whitefield.',
        '<strong>Affordable pricing:</strong> transparent, with no hidden costs.',
        '<strong>Safe and comfortable:</strong> we prioritise your safety and comfort.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Are the results of glutathione IV drip permanent?',
      answer:
        'No. With maintenance sessions and a healthy lifestyle you can sustain the glow for longer, but the effects may gradually fade once treatment stops.',
    },
    {
      question: 'Can anyone take glutathione IV injections?',
      answer:
        'Not everyone is an ideal candidate. A doctor’s consultation is necessary, especially if you have a medical condition, are pregnant or take medication.',
    },
    {
      question: 'Is glutathione a fairness treatment?',
      answer:
        'No. Glutathione works by improving skin health, reducing pigmentation and enhancing natural radiance — not by changing your natural skin tone.',
    },
    {
      question: 'How long do glutathione IV results last?',
      answer:
        'Results can last a few months, depending on your skin, lifestyle and maintenance sessions. Regular follow-ups help keep results consistent.',
    },
    {
      question: 'Can glutathione IV therapy help with detox?',
      answer:
        'Yes. Glutathione plays a key role in detoxification, helping the liver remove toxins and reducing oxidative stress in the body.',
    },
    {
      question: 'Is glutathione IV drip suitable for men?',
      answer:
        'Yes. It suits both men and women looking to improve skin clarity, reduce pigmentation and support overall wellness.',
    },
    {
      question: 'Can I combine glutathione IV with other skin treatments?',
      answer:
        'Yes. It can be combined with facials, peels or laser procedures for enhanced results, as your doctor recommends.',
    },
  ],
  related: {
    heading: 'Anti-Ageing Treatment',
    items: serviceMenu.find(g => g.group === 'Anti-Ageing Treatment')!.items,
  },
}

export default content
