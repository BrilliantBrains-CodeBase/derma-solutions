import { Head } from 'vite-react-ssg'
import { tracking } from '@/config/site'

/**
 * Google Tag Manager, site-wide — the one tag the old site hardcoded
 * (seo-backup/00-site-level/tracking.md). GA4 (tracking.ga4Id) and the Meta
 * pixel ran inside this container there, and still do: neither is added here,
 * or they would double-count.
 *
 * Emitted as an inline script so it is in every prerendered page's <head>.
 * Conversions: src/pages/ThankYou.tsx pushes `lead_submit`; the GTM-side setup
 * is in apps-script/README.md.
 */
const snippet =
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});` +
  `var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;` +
  `j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);` +
  `})(window,document,'script','dataLayer','${tracking.gtmId}');`

export function TrackingHead() {
  return (
    <Head>
      <script>{snippet}</script>
    </Head>
  )
}

/** GTM's no-JS fallback. Belongs at the top of <body>. */
export function TrackingNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${tracking.gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
