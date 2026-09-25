import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { MediaGrid } from '@/sections/media/MediaGrid'

/**
 * /media/ — the "Media" half of the Blogs & Media section.
 *
 * A link index, not a content page: every card leads to coverage published
 * somewhere else. The list is src/content/media.ts.
 *
 * Laid out as the blog index is — the brown page-header band with a breadcrumb
 * over the same card grid — because it is the same kind of page to a reader:
 * a list of things to go and read.
 *
 * TODO(content): the intro line is authored, not the client's. Sign off with
 * the SEO title and description in scripts/added-pages.ts.
 */
export default function Media() {
  return (
    <PageShell
      slug="media"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Media Coverage' }]} />
        </PageHeader>
      )}
    >
      <div className="mx-auto max-w-[1300px] px-[20px] pt-[50px] lg:px-[10px] lg:pt-[80px]">
        <p className="mx-auto max-w-[760px] text-center font-sans text-[16px] leading-[26px] text-body md:text-[17px] md:leading-[28px]">
          Dr. Sandeep Mahapatra writes and comments on skin and hair health for the national press.
          Here is where his work has appeared.
        </p>
      </div>

      <MediaGrid />
    </PageShell>
  )
}
