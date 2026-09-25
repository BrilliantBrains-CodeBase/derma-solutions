import { Link } from 'react-router-dom'
import { contact } from '@/config/site'
import type { ContentPageContent } from '@/content/page'
import { Breadcrumb, PageHeader } from '@/components/PageHeader'
import { FaqAccordion } from '@/components/FaqAccordion'
import { PageShell } from '@/components/PageShell'
import { SidebarHoursCard } from '@/components/SidebarHoursCard'
import { ArrowUpRightIcon } from '@/components/icons'
import { getSeo } from '@/seo/registry.generated'
import { BlogBlocks } from '@/sections/blog/BlogBlocks'

/**
 * The content page: a live page whose copy is prose rather than the treatment
 * doc's eight slots — see src/content/page.ts for which pages and why.
 *
 * Built from parts the site already has, so it reads as one of its inner
 * pages: the page-header band with a breadcrumb, the theme's 383/847 inner-page
 * grid (as TreatmentPage and BlogPost lay it out), the body in the blog's
 * BlogBlocks type, and the treatment FAQ accordion.
 *
 * The sidebar is the treatment sidebar's link card over the blog's hours card
 * with its call button. It is sticky only as a whole column's foot, like the
 * blog's: the card list is short, and these pages are long.
 *
 * A page with no `related` links (the legal pages) drops the sidebar and sets
 * the body as one 847px column, centred.
 */

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function ContentPage({ slug, content }: { slug: string; content: ContentPageContent }) {
  const record = getSeo(slug)
  if (content.path !== record.path) {
    throw new Error(`ContentPage "${slug}" was given the content for ${content.path}`)
  }

  const crumbs = [
    { label: 'Home', href: '/' },
    ...(content.section ? [{ label: content.section }] : []),
    { label: content.name },
  ]

  const body = (
    <>
      <BlogBlocks blocks={content.blocks} />

      {content.faqs && content.faqs.length > 0 && (
        <section aria-labelledby="content-faq-heading" className="mt-[50px]">
          <h2
            id="content-faq-heading"
            className="font-display text-[28px] leading-[36px] text-primary md:text-[36px] md:leading-[43px]"
          >
            {content.faqHeading ?? 'Frequently Asked Questions'}
          </h2>
          <div className="mt-[20px]">
            <FaqAccordion
              items={content.faqs}
              questionClassName="flex w-full cursor-pointer items-center justify-between gap-[20px] py-[22px] text-left font-display text-[19px] leading-[28px] transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-[22px] md:leading-[31px]"
              answerClassName="pb-[24px] font-sans text-[16px] leading-[26px] text-body"
            />
          </div>
        </section>
      )}
    </>
  )

  return (
    <PageShell
      slug={slug}
      hero={h1 => (
        <PageHeader h1={h1}>
          <Breadcrumb items={crumbs} />
        </PageHeader>
      )}
    >
      {content.related ? (
        <div className="mx-auto grid max-w-[1300px] gap-[50px] px-[20px] py-[60px] lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-[40px] lg:py-[100px] xl:grid-cols-[383px_minmax(0,1fr)] xl:gap-[50px] xl:px-[10px]">
          <article className="min-w-0">{body}</article>

          <div className="lg:order-first">
            <aside className="grid gap-[30px] md:grid-cols-2 md:items-start lg:sticky lg:top-[140px] lg:grid-cols-1">
              <nav aria-labelledby="content-related-heading" className="overflow-hidden rounded-card">
                <h2
                  id="content-related-heading"
                  className="bg-primary px-[30px] py-[20px] font-display text-[20px] leading-[26px] text-white uppercase"
                >
                  {content.related.heading}
                </h2>
                <ul className="bg-secondary px-[30px] py-[10px]">
                  {content.related.items.map(item => {
                    // A group list (serviceMenu) can hold this page itself: mark
                    // it, as the treatment sidebar does.
                    const current = item.path === record.path
                    return (
                      <li key={item.path} className="border-b border-divider last:border-b-0">
                        <Link
                          to={item.path}
                          aria-current={current ? 'page' : undefined}
                          className={`group/link flex items-center justify-between gap-[15px] py-[19px] font-sans text-[16px] leading-[24px] transition-colors hover:text-accent ${current ? 'text-accent' : 'text-body'} ${focusRing}`}
                        >
                          {item.label}
                          <ArrowUpRightIcon
                            className={`h-[16px] w-[16px] shrink-0 transition-colors group-hover/link:text-accent ${current ? 'text-accent' : 'text-primary'}`}
                          />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* A tel: link, so an <a> as in the blog sidebar — not a router Link. */}
              <SidebarHoursCard
                action={
                  <a
                    href={contact.telHref}
                    className="inline-flex items-center gap-[12px] rounded-pill bg-accent px-[30px] py-[16px] font-sans text-[16px] leading-[16px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {contact.ctaLabel}
                    <ArrowUpRightIcon className="h-[16px] w-[16px]" />
                  </a>
                }
              />
            </aside>
          </div>
        </div>
      ) : (
        <article className="mx-auto max-w-[887px] px-[20px] py-[60px] lg:py-[100px]">{body}</article>
      )}
    </PageShell>
  )
}
