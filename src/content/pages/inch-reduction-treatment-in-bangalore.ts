/**
 * /inch-reduction-treatment-in-bangalore/
 * Ported from seo-backup/02-markdown/inch-reduction-treatment-in-bangalore.md —
 * see src/content/page.ts.
 *
 * The live cost section opened mid-sentence ("such as Cryolipolysis, generally
 * falls between…"); its subject is restored. Left out: the testimonial (no
 * consent record on file), the service-areas list and the call buttons.
 */
import type { ContentPageContent } from '@/content/page'

const content: ContentPageContent = {
  path: '/inch-reduction-treatment-in-bangalore/',
  name: 'Inch Reduction Treatment',
  section: 'Services',
  blocks: [
    {
      type: 'p',
      html: 'Inch reduction is a form of weight loss focused on losing inches from the specific parts of the body where fat has accumulated. It helps you keep your body shape in good condition.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'The treatment is non-surgical.',
        'It needs no heavy exercise.',
        'Excess fat in the target area is treated with advanced technology that targets it and helps the body expel it.',
      ],
    },
    {
      type: 'p',
      html: 'The techniques used for inch reduction are <strong>ultrasonic lipolysis</strong> and <strong>radio frequency skin tightening</strong>.',
    },
    { type: 'h2', id: 'ultrasonic-lipolysis', text: 'Ultrasonic lipolysis' },
    {
      type: 'p',
      html: 'Ultrasonic lipolysis is a non-surgical way to get rid of fat, using ultrasound waves to break down excess accumulated fat. A transducer placed on the treatment area emits the energy. The treated fat cells are then metabolised and drained by the body, which helps with weight loss.',
    },
    { type: 'h2', id: 'radio-frequency-skin-tightening', text: 'Radio frequency skin tightening' },
    {
      type: 'p',
      html: 'This technique stimulates tissue remodelling and the production of new collagen and elastin, and is a non-surgical alternative to a facelift and other cosmetic surgeries.',
    },
    {
      type: 'p',
      html: 'Radio frequency energy heats and reduces fat. Most current radio frequency devices are used non-invasively to tighten skin, reduce wrinkles and reduce fat. <a href="/radio-frequency-skin-tightening-treatment/">Learn more about radio frequency skin tightening</a>.',
    },
    { type: 'h2', id: 'cost', text: 'Cost of inch reduction treatment' },
    {
      type: 'p',
      html: 'The cost of non-surgical inch reduction, such as <a href="/cryolipolysis-coolsculpting-in-bangalore/">cryolipolysis</a>, generally falls between ₹15,000 and ₹30,000 per session.',
    },
    {
      type: 'p',
      html: 'Cryolipolysis is a popular non-surgical inch-loss procedure that works by freezing and eliminating stubborn fat cells in target areas such as the abdomen, thighs and arms.',
    },
    {
      type: 'p',
      html: 'The price varies with the size of the area treated and the experience of the professionals performing the procedure. 18% GST is applicable on the total procedure cost, so confirm your final pricing during consultation.',
    },
  ],
  related: {
    heading: 'Body Contouring',
    items: [
      { label: 'Cryolipolysis - CoolSculpting', path: '/cryolipolysis-coolsculpting-in-bangalore/' },
      { label: 'Radio Frequency Treatment', path: '/radio-frequency-skin-tightening-treatment/' },
      { label: 'Weight / Fat Loss Injections', path: '/weight-loss-injections-in-bangalore/' },
      { label: 'Weight Loss Treatment', path: '/weight-loss-treatment-in-marathahalli/' },
      { label: 'Liposuction', path: '/liposuction-treatment-in-bangalore/' },
      { label: 'Abdominoplasty (Tummy Tuck)', path: '/abdominoplasty-tummy-tuck-treatment-in-bangalore/' },
    ],
  },
}

export default content
