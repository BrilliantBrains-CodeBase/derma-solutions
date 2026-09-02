import { Head } from 'vite-react-ssg'
import { brand } from '@/config/site'

/** Not prerendered and not in the sitemap. noindex so it can never be indexed. */
export default function NotFound() {
  return (
    <>
      <Head>
        <title>{`Page not found | ${brand.shortName}`}</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main id="content">
        <h1>Page not found</h1>
      </main>
    </>
  )
}
