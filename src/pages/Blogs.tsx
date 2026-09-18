import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { blogIndex } from '@/content/blog/index.generated'
import { BlogGrid } from '@/sections/blog/BlogGrid'

/**
 * /blogs/ — every post, newest first.
 *
 * Built to theme-reference/01-raw-html/blog.html: the page-header band with
 * its breadcrumb, then the post grid. See BlogGrid.
 */
export default function Blogs() {
  return (
    <PageShell
      slug="blogs"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blogs' }]} />
        </PageHeader>
      )}
    >
      <BlogGrid posts={blogIndex} label="All articles" />
    </PageShell>
  )
}
