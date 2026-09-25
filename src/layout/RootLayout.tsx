import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Header } from './Header'
import { PreFooter } from './PreFooter'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { TrackingHead, TrackingNoScript } from './Tracking'
import { assets, location, seo } from '@/config/site'
import { captureAttribution } from '@/lib/attribution'
import '@/styles/index.css'

/**
 * Client-side routing keeps the current document and therefore its scroll
 * position. Reset it whenever the page path changes so a link opened near the
 * footer does not place the visitor near the footer of the destination page.
 * Hash-only navigation is unaffected because the pathname does not change.
 */
function RouteScrollReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

/** Wraps all 92 routes. Only site-wide <head> defaults live here — per-page tags come from <Seo>. */
export function RootLayout() {
  /* Once per page load: keep the landing URL's utm_* / click ids for the lead form. */
  useEffect(captureAttribution, [])

  return (
    <>
      <TrackingNoScript />
      <TrackingHead />
      <RouteScrollReset />
      <Head>
        {/* viewport and charset live in index.html — not repeated here */}
        <meta property="og:site_name" content={seo.ogSiteName} />
        <link rel="icon" href={assets.favicon.ico} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={assets.favicon.png32} />
        <link rel="icon" type="image/png" sizes="192x192" href={assets.favicon.png192} />
        <link rel="apple-touch-icon" href={assets.favicon.appleTouchIcon} />
        {/* --color-primary: the browser chrome on Android matches the header. */}
        <meta name="theme-color" content="#481E0B" />
        {/* Local-search hints: the clinic's region and pin, from location.geo. */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content={location.address.locality} />
        <meta name="geo.position" content={`${location.geo.latitude};${location.geo.longitude}`} />
        <meta name="ICBM" content={`${location.geo.latitude}, ${location.geo.longitude}`} />
        {/* Points LLM crawlers at the plain-text summary scripts/generate-sitemap.ts writes. */}
        <link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt" />
      </Head>
      {/* Visually hidden until focused, so it does not sit above the header. */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-[20px] focus:top-[20px] focus:z-[60] focus:rounded-pill focus:bg-accent focus:px-[22px] focus:py-[12px] focus:font-sans focus:text-[14px] focus:leading-[16px] focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <Outlet />
      <PreFooter />
      <Footer />
      {/* Last in the DOM so the footer's links keep their place in the tab
          order; it is fixed, so document order does not affect where it paints. */}
      <MobileActionBar />
    </>
  )
}
