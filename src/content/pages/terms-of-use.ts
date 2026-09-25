/**
 * /terms-of-use/
 * Ported from seo-backup/02-markdown/terms-of-use.md — see src/content/page.ts.
 *
 * Legal text: verbatim, wording and punctuation included. Only the markup is
 * the site's. One link differs: section 4's "Privacy Policy" pointed at
 * neofollicletransplant.com's copy; it now opens this site's, which carries the
 * same text.
 */
import type { ContentPageContent } from '@/content/page'
import { legal } from '@/config/site'

const ext = (href: string, label = href) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`

const content: ContentPageContent = {
  path: '/terms-of-use/',
  name: 'Terms Of Use',
  blocks: [
    { type: 'p', html: '<strong>Effective Date: 01-01-2025</strong>' },
    {
      type: 'p',
      html: 'These Terms of Use ("Terms") govern your access to and use of the websites and services operated by <strong>NEOFOLLICLE AND NEOFERTILITY CLINIC LLP</strong> ("Company", "we", "us", or "our") including:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        ext('https://neofollicletransplant.com/', 'https://neofollicletransplant.com'),
        '<a href="/">https://dermasolutions.co.in</a>',
        ext('https://neofertility.co.in/', 'https://neofertility.co.in'),
      ],
    },
    {
      type: 'p',
      html: 'By using our websites, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our websites or services.',
    },

    { type: 'h2', id: 'use-of-website', text: '1. Use of Website' },
    {
      type: 'p',
      html: 'You agree to use our websites only for lawful purposes and in a manner that does not infringe the rights or restrict the use and enjoyment of others. You may not:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Modify, copy, or distribute content from our websites without permission',
        'Use the websites to transmit any harmful, threatening, or unlawful material',
        'Attempt to gain unauthorized access to any portion of the websites or systems',
      ],
    },

    { type: 'h2', id: 'medical-disclaimer', text: '2. Medical Disclaimer' },
    {
      type: 'p',
      html: 'The content on our websites is for informational purposes only and should not be considered a substitute for medical advice, diagnosis, or treatment. Always consult a qualified medical professional before making any health-related decisions.',
    },

    { type: 'h2', id: 'intellectual-property', text: '3. Intellectual Property' },
    {
      type: 'p',
      html: 'All content, logos, graphics, and images on the websites are the property of <strong>NEOFOLLICLE AND NEOFERTILITY CLINIC LLP</strong> or its licensors and are protected by applicable intellectual property laws. Unauthorized use of any materials is strictly prohibited.',
    },

    { type: 'h2', id: 'privacy', text: '4. Privacy' },
    {
      type: 'p',
      html: `Your use of the websites is also governed by our <a href="${legal.privacyPolicyPath}"><strong>Privacy Policy</strong></a>, which describes how we collect, use, and protect your personal information. Please review our <a href="${legal.privacyPolicyPath}">Privacy Policy</a> for more information.`,
    },

    { type: 'h2', id: 'third-party-websites', text: '5. Links to Third-Party Websites' },
    {
      type: 'p',
      html: 'Our websites may contain links to third-party websites. These links are provided for your convenience, and we are not responsible for the content or practices of those websites. Accessing such sites is at your own risk.',
    },

    { type: 'h2', id: 'billing-cancellation-refunds', text: '6. Billing, Cancellation & Refunds' },
    {
      type: 'list',
      ordered: false,
      items: [
        'The Website and App provide you the ability to pay online through a third-party payment gateway for some of the Services available on the Website or App. If you choose to pay online, you may be directed to a third-party payment gateway to enable the processing of the payment. This transaction will be governed by the terms and conditions and privacy policy of the third-party payment gateway. NEOFOLLICLE AND NEOFERTILITY CLINIC LLP shall not be liable for any loss or damage arising directly or indirectly arising out of the usage, decline, or acceptance of authorization for any transaction, for any reason whatsoever.',
        'The cancellation and refund policy is only applicable to all online payments made through mobile apps and websites for booking appointments.',
        'In case a cancellation is initiated by the user, at the time of cancellation, the amount will be refunded via the same source of payment and will be subject to the payment terms of the source only. The amount will be refunded within 30 working days.',
      ],
    },

    { type: 'h2', id: 'limitation-of-liability', text: '7. Limitation of Liability' },
    {
      type: 'p',
      html: 'We do not guarantee that the websites will be error-free, uninterrupted, or free of viruses. Under no circumstances shall <strong>NEOFOLLICLE AND NEOFERTILITY CLINIC LLP</strong> be liable for any direct, indirect, incidental, or consequential damages resulting from:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'The use or inability to use the websites',
        'Reliance on any information provided',
        'Unauthorized access or alterations of your data',
      ],
    },

    { type: 'h2', id: 'indemnification', text: '8. Indemnification' },
    {
      type: 'p',
      html: 'You agree to indemnify and hold harmless <strong>NEOFOLLICLE AND NEOFERTILITY CLINIC LLP</strong>, its affiliates, officers, employees, and partners from any claim, loss, or damage arising from your violation of these Terms or your use of the websites.',
    },

    { type: 'h2', id: 'termination', text: '9. Termination' },
    {
      type: 'p',
      html: 'We reserve the right to suspend or terminate your access to the websites at our sole discretion, without notice, for conduct that we believe violates these Terms or is otherwise harmful.',
    },

    { type: 'h2', id: 'governing-law', text: '10. Governing Law' },
    {
      type: 'p',
      html: 'These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.',
    },

    { type: 'h2', id: 'changes', text: '11. Changes to These Terms' },
    {
      type: 'p',
      html: 'We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting. Your continued use of the websites constitutes acceptance of the revised Terms.',
    },

    { type: 'h2', id: 'contact-information', text: '12. Contact Information' },
    { type: 'p', html: 'If you have any questions or concerns about these Terms, please contact us at:' },
    {
      type: 'list',
      ordered: false,
      items: [
        '<strong>Email:</strong> <a href="mailto:info@neofollicletransplant.com">info@neofollicletransplant.com</a>',
        '<strong>Phone:</strong> <a href="tel:+919731207940">+91 - 97312 07940</a>',
        '<strong>Address:</strong> NEOFOLLICLE AND NEOFERTILITY CLINIC LLP, 1st floor, Scorpio House, Near Marathahalli Bridge Munnekoala, Near Marathahalli Bridge Service Rd, Opp. Purvankara Apt, Opposite to Purva Apartments, Bengaluru, Karnataka 560037',
      ],
    },
    {
      type: 'p',
      html: 'By accessing our websites, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use.',
    },
  ],
}

export default content
