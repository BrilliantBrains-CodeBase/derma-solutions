import { Outlet } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Header } from './Header'
import { PreFooter } from './PreFooter'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { assets, seo } from '@/config/site'
import '@/styles/index.css'

/** Wraps all 92 routes. Only site-wide <head> defaults live here — per-page tags come from <Seo>. */
export function RootLayout() {
  return (
    <>
      <Head>
        {/* viewport and charset live in index.html — not repeated here */}
        <meta property="og:site_name" content={seo.ogSiteName} />
        <link rel="icon" href={assets.favicon.ico} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={assets.favicon.png32} />
        <link rel="icon" type="image/png" sizes="192x192" href={assets.favicon.png192} />
        <link rel="apple-touch-icon" href={assets.favicon.appleTouchIcon} />
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
