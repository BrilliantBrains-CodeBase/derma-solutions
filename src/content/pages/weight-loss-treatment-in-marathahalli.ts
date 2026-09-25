/**
 * /weight-loss-treatment-in-marathahalli/
 * Ported from seo-backup/02-markdown/weight-loss-treatment-in-marathahalli.md —
 * see src/content/page.ts.
 *
 * One medical correction: the live list of "FDA-approved" medications included
 * Lorcaserin (Belviq), which was withdrawn from the US market in 2020. It is
 * left out. The rest of the list, and the whole page, want a doctor's review
 * before publishing — it was written in 2024 and predates semaglutide and
 * tirzepatide (see /weight-loss-injections-in-bangalore/).
 *
 * Left out: the testimonial (no consent record on file), the service-areas list
 * and the call buttons.
 */
import type { ContentPageContent } from '@/content/page'

const content: ContentPageContent = {
  path: '/weight-loss-treatment-in-marathahalli/',
  name: 'Weight Loss Treatment',
  section: 'Services',
  blocks: [
    {
      type: 'p',
      html: 'In medicine, weight loss means a reduction in total body mass: accumulated fat, fluid, bone mineral, muscle and other connective tissue.',
    },
    {
      type: 'p',
      html: 'Weight loss can result from malnutrition or an existing disease, or from a conscious effort to improve an overweight or obese state. Weight loss not caused by reduced calorie intake or exercise is called <strong>cachexia</strong>, while intentional weight loss is commonly called <strong>slimming</strong>.',
    },
    { type: 'p', html: 'Before any weight loss treatment begins, a diagnosis is made to understand your body’s condition.' },
    { type: 'h2', id: 'diagnosis', text: 'General diagnosis includes' },
    {
      type: 'list',
      ordered: false,
      items: [
        'A review of your health history',
        'A physical examination',
        'BMI calculation',
        'Waist circumference measurement',
        'Checks for any other health problems',
        'Blood tests',
      ],
    },
    {
      type: 'p',
      html: 'Weight loss treatment aims to reach a healthy weight, which reduces the complications of obesity. It is delivered by a team of health professionals, including a dietitian and a behavioural counsellor, often called an obesity specialist.',
    },
    {
      type: 'p',
      html: 'In the initial stage, the goal is to reduce body mass by 5% to 10%. For example, if you weigh 100 kg, the first target is to lose about 5 to 10 kg. The treatment approach changes if you wish to lose more.',
    },
    {
      type: 'p',
      html: 'Weight loss works best with strict control over your diet, so a dietitian prescribes what you should eat after treatment. The benefits of weight reduction treatment are only seen when the prescribed diet is followed.',
    },
    { type: 'h2', id: 'diet-changes', text: 'Diet changes include' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Reducing calorie intake',
        'Choosing healthier foods',
        'Restricting certain foods, such as those high in gluten',
        'Changing your meal pattern',
      ],
    },
    { type: 'h2', id: 'medication', text: 'Weight loss medication' },
    {
      type: 'p',
      html: 'Your doctor may recommend weight loss medication only when diet and exercise have not worked, and when one of the following applies:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Your BMI is greater than 30.',
        'Your BMI is greater than 27 and you have a related medical condition, such as diabetes or high blood pressure.',
      ],
    },
    {
      type: 'p',
      html: 'Before prescribing any medication, your doctor reviews your medical history to make sure it will not cause side effects. If medication is stopped abruptly, the lost weight can be regained.',
    },
    { type: 'h2', id: 'fda-approved-medication', text: 'FDA-approved medication' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Orlistat (Alli, Xenical)',
        'Phentermine and topiramate (Qsymia)',
        'Bupropion and naltrexone (Contrave)',
        'Liraglutide (Saxenda, Victoza)',
      ],
    },
    {
      type: 'p',
      html: 'For newer injectable options, see <a href="/weight-loss-injections-in-bangalore/">weight and fat loss injections</a>.',
    },
    { type: 'h2', id: 'exercise-and-lifestyle', text: 'Exercise and lifestyle' },
    {
      type: 'p',
      html: 'Weight loss is also possible through exercise and physical activity. People who want to maintain their weight exercise regularly, and even simple walking or jogging helps.',
    },
    {
      type: 'p',
      html: 'Behaviour change also contributes: a change in lifestyle helps you identify the habits that contribute to obesity. Other approaches include endoscopic procedures and weight loss surgery, such as gastric bypass, adjustable gastric banding, biliopancreatic diversion with duodenal switch and gastric sleeve.',
    },
    { type: 'h2', id: 'cost', text: 'Cost of weight loss treatment: cryolipolysis' },
    {
      type: 'p',
      html: 'Weight loss treatment with <a href="/cryolipolysis-coolsculpting-in-bangalore/">cryolipolysis</a>, commonly known as fat freezing, typically costs ₹15,000 to ₹30,000 per session. The price varies with the size of the area treated and the expertise of the professionals performing the procedure.',
    },
    {
      type: 'p',
      html: 'Cryolipolysis is a non-invasive method that targets fat cells in areas such as the abdomen, thighs and arms by cooling them to a temperature at which they naturally break down. It offers noticeable results with minimal recovery time.',
    },
    { type: 'p', html: '18% GST is applicable on the total cost of the procedure.' },
  ],
  related: {
    heading: 'Body Contouring',
    items: [
      { label: 'Weight / Fat Loss Injections', path: '/weight-loss-injections-in-bangalore/' },
      { label: 'Cryolipolysis - CoolSculpting', path: '/cryolipolysis-coolsculpting-in-bangalore/' },
      { label: 'Inch Reduction Treatment', path: '/inch-reduction-treatment-in-bangalore/' },
      { label: 'Liposuction', path: '/liposuction-treatment-in-bangalore/' },
      { label: 'Abdominoplasty (Tummy Tuck)', path: '/abdominoplasty-tummy-tuck-treatment-in-bangalore/' },
    ],
  },
}

export default content
