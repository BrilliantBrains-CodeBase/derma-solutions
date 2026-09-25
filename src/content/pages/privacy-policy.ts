/**
 * /privacy-policy/
 * Ported from seo-backup/02-markdown/privacy-policy.md — see src/content/page.ts.
 *
 * Legal text: verbatim, wording and punctuation included. Only the markup is
 * the site's. Any change to the text is the client's (NEOFOLLICLE AND
 * NEOFERTILITY CLINIC LLP) to make, not a copy edit.
 */
import type { ContentPageContent } from '@/content/page'

const ext = (href: string, label = href) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
const mail = (address: string) => `<a href="mailto:${address}">${address}</a>`

const ADDRESS =
  '1st floor, Scorpio House, Near Marathahalli Bridge Munnekoala, Near Marathahalli Bridge Service Rd, Opp. Purvankara Apt, Opposite to Purva Apartments, Bengaluru, Karnataka 560037'

const content: ContentPageContent = {
  path: '/privacy-policy/',
  name: 'Privacy Policy',
  blocks: [
    { type: 'p', html: '<strong>Effective Date: 01-01-2025</strong>' },
    {
      type: 'p',
      html: '<strong>NEOFOLLICLE AND NEOFERTILITY CLINIC LLP</strong> (“Company”, “we”, “us”, or “our”) respects the privacy of its users and is committed to protecting it through this Privacy Policy. This policy applies to all users of our websites:',
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
    { type: 'p', html: 'This Privacy Policy is published in compliance with:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Section 43A of the Information Technology Act, 2000;',
        'Regulation 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “SPI Rules”);',
        'Regulation 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011.',
      ],
    },
    {
      type: 'p',
      html: 'By using our websites, submitting your information, or availing any service offered by us, you consent to the collection, use, disclosure, and transfer of your personal information in accordance with this Privacy Policy.',
    },
    {
      type: 'p',
      html: 'Any User who does not agree with any provisions of this privacy policy has the option to discontinue the usage of services provided by NEOFOLLICLE AND NEOFERTILITY CLINIC LLP immediately.',
    },

    { type: 'h2', id: 'information-we-collect', text: '1. Information We Collect' },
    {
      type: 'p',
      html: 'The nature of services provided by NEOFOLLICLE AND NEOFERTILITY CLINIC LLP during its business requires us to know who you are so that we can best meet your needs. When you access the services, you may be asked to voluntarily provide us with certain information that personally identifies you or could be used to personally identify you. Without prejudice to the generality of the above, information collected by NEOFOLLICLE AND NEOFERTILITY CLINIC LLP from you may include (but is not limited to) the following:',
    },
    { type: 'p', html: 'We may collect the following types of personal and sensitive personal information:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Contact Data : Full name, contact number, email address, postal address',
        'Demographic Data : (such as your gender, nationality, date of birth, postal address and pin code)',
        'Health or medical data (such as your LMP, past medical history and conditions, diagnostic reports, prescriptions and medication history)',
        'Insurance data (such as your insurance carrier and insurance plan)',
        'IP address, browser type, operating system',
        'Usage details, location data, and other related information',
        'Other information that you voluntarily choose to provide to us (such as information shared by you with us through emails or letters, your work details, your family details)',
        'Data regarding your usage of the services and history of the appointments and other transactions made by or with you through the use of Services',
      ],
    },

    { type: 'h2', id: 'purpose-of-data-collection', text: '2. Purpose of Data Collection' },
    { type: 'p', html: 'We collect and use your data for the following purposes:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'To provide you with medical consultations and treatments',
        'To schedule appointments and send reminders',
        'To respond to inquiries and patient service requests',
        'To enhance user experience and website functionality',
        'For marketing, promotional communication, and educational content',
        'To comply with applicable legal and regulatory obligations',
      ],
    },

    { type: 'h2', id: 'use-and-disclosure', text: '3. Use and Disclosure of Information' },
    { type: 'p', html: 'We may disclose your personal data under the following circumstances:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'To medical professionals within our organization for treatment purposes',
        'To third-party service providers (IT, analytics, email, or marketing platforms) under confidentiality obligations',
        'When required by law, regulation, legal process, or government authority',
        'To protect the safety, rights, or property of our clinic, patients, or public',
        'For commercial purposes and in an aggregated or non- personally identifiable form for research, statistical analysis and business intelligence purposes',
        'For sale or transfer of such research, statistical or intelligence data in an aggregated or non-personally Identifiable form to our Partners.',
        'Analysing anonymized information for commercial use.',
      ],
    },
    {
      type: 'p',
      html: 'You hereby consent to such use of such information by NEOFOLLICLE AND NEOFERTILITY CLINIC LLP and its Partner/s.',
    },

    { type: 'h2', id: 'data-security', text: '4. Data Security' },
    {
      type: 'p',
      html: 'We have implemented reasonable security practices as mandated under Section 43A of the IT Act and SPI Rules, including:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Secure servers and firewall protection',
        'SSL encryption for data transmission',
        'Role-based access to sensitive information',
        'Regular monitoring for vulnerabilities',
      ],
    },
    {
      type: 'p',
      html: 'However, no method of electronic transmission or storage is 100% secure. By using our services, you acknowledge this limitation.',
    },

    { type: 'h2', id: 'retention-of-data', text: '5. Retention of Data' },
    { type: 'p', html: 'We retain your data for as long as necessary:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'To fulfill the purpose it was collected for',
        'To comply with legal, regulatory, and audit requirements',
        'For legitimate internal operations and security reasons',
      ],
    },

    { type: 'h2', id: 'your-rights', text: '6. Your Rights' },
    { type: 'p', html: 'You may:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Request access to your personal data',
        'Request corrections or updates',
        'Withdraw consent for data processing (where applicable)',
        'Request deletion of your data, subject to legal requirements',
      ],
    },
    { type: 'p', html: 'Requests must be submitted in writing to:' },
    { type: 'p', html: `<strong>Email:</strong> ${mail('info@neofollicletransplant.com')}` },
    {
      type: 'p',
      html: `<strong>Postal Address:</strong> NEOFOLLICLE AND NEOFERTILITY CLINIC LLP, ${ADDRESS}`,
    },

    { type: 'h2', id: 'cookie-policy', text: '7. Cookie Policy' },
    { type: 'h3', id: 'what-are-cookies', text: 'a) What are Cookies?' },
    {
      type: 'p',
      html: 'Cookies are small files that are stored on your device when you visit our website. They help us recognize you, improve your user experience, and personalize content.',
    },
    { type: 'h3', id: 'type-of-cookies', text: 'b) Type of Cookies We Use' },
    {
      type: 'list',
      ordered: false,
      items: [
        '<strong>Essential Cookies</strong>: Enable basic functions like page navigation and secure access.',
        '<strong>Analytics Cookies</strong>: Collect anonymized data about site usage for performance improvement.',
        '<strong>Marketing Cookies</strong>: Track user activity across websites to deliver targeted advertisements.',
      ],
    },
    { type: 'h3', id: 'third-party-cookies', text: 'c) Third-Party Cookies' },
    {
      type: 'p',
      html: 'We may allow third-party tools such as Google Analytics, Facebook Pixel, or WhatsApp integrations to place cookies on our site to help deliver relevant ads and measure campaign effectiveness.',
    },
    { type: 'h3', id: 'managing-cookies', text: 'd) Managing Cookies' },
    {
      type: 'p',
      html: 'You can accept or decline cookies through your browser settings. Please note that disabling cookies may affect site functionality.',
    },

    { type: 'h2', id: 'third-party-links', text: '8. Third-Party Links' },
    {
      type: 'p',
      html: 'Our website may contain links to third-party websites or applications. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies separately.',
    },

    { type: 'h2', id: 'social-media-sites', text: '9. Social Media Sites' },
    {
      type: 'p',
      html: 'Our digital properties may include social media features such as Facebook®, Twitter®, You-Tube® and LinkedIn® buttons. These features may collect your IP address, which page you are visiting on our site, and may set a cookie to enable the Feature to function properly. Your interactions with these Features are governed by the privacy statement of the company providing them.',
    },

    { type: 'h2', id: 'billing-information', text: '10. Billing Information' },
    {
      type: 'p',
      html: 'We may require the User to pay with a credit card, debit card, net banking, wallets or other online payment mechanisms for Services for which an amount(s) is/are payable. We will collect such User’s credit card number and/or other financial institution information such as bank account numbers and will use that information for the billing and payment processes, including but not limited to the use and disclosure of such credit card number and information to third parties as necessary to complete such billing operation.',
    },
    {
      type: 'p',
      html: 'Verification of credit information, however, is accomplished solely by the User through the authentication process offered by a third-party payment gateway. User’s credit card/ debit card details are transacted upon secure sites of approved payment gateways which are digitally encrypted, thereby providing the highest possible degree of care as per latest technology currently available. User is cautioned, however, that internet technology is not fool proof or safe.',
    },

    { type: 'h2', id: 'children-policy', text: '11. Children Policy' },
    {
      type: 'p',
      html: 'Our website and services are not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from minors without parental consent.',
    },

    { type: 'h2', id: 'changes', text: '12. Changes to this Privacy Policy' },
    {
      type: 'p',
      html: 'We reserve the right to update this policy at any time. Any changes will be posted on this page with an updated effective date. Continued use of our services implies your agreement to the updated terms.',
    },

    { type: 'h2', id: 'grievance-officer', text: '13. Grievance Officer' },
    {
      type: 'p',
      html: 'In accordance with the Information Technology Act and rules made thereunder, the name and contact details of the Grievance Officer are as follows:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        '<strong>Name:</strong> Dr Sandeep Mahapatra',
        `<strong>Email:</strong> ${mail('info@neofollicletransplant.com')}`,
        '<strong>Phone:</strong> <a href="tel:+919731207940">+91-97312 07940</a>',
        `<strong>Address:</strong> Neo Follicle &amp; Neo Fertility Clinic LLP,${ADDRESS}`,
      ],
    },
    {
      type: 'p',
      html: '<strong>By accessing our websites or using our services, you acknowledge that you have read and understood this Privacy Policy.</strong>',
    },
  ],
}

export default content
