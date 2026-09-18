import { PageShell } from '@/components/PageShell'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { blogIndex } from '@/content/blog/index.generated'
import { BlogGrid } from '@/sections/blog/BlogGrid'

/**
 * /category/uncategorized/ — the only category, holding all 37 posts.
 *
 * Built to theme-reference/01-raw-html/category__uncategorized.html, which is
 * the blog index's template with the term in the breadcrumb.
 */
export default function CategoryUncategorized() {
  return (
    <PageShell
      slug="category__uncategorized"
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs/' }, { label: 'Uncategorized' }]} />
        </PageHeader>
      )}
    >
      <BlogGrid posts={blogIndex} label="Articles in Uncategorized" />
    </PageShell>
  )
}
