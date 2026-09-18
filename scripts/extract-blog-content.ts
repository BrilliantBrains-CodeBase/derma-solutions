/**
 * Turns the 37 captured WordPress posts into typed content modules.
 *
 * Source: seo-backup/03-wp-rest/posts.json — each post's Gutenberg HTML, which
 * is regular enough to read block by block: p, h1–h4, ul/ol, hr, and figures
 * for tables, YouTube embeds and images. Anything else throws, so a block the
 * template cannot render never reaches it silently.
 *
 * Emits (GENERATED):
 *  - src/content/blog/posts/<slug>.ts — the post body, its table of contents,
 *    reviewed date, related posts and service link. One module per post, loaded
 *    by that post's route alone.
 *  - src/content/blog/index.generated.ts — one summary per post, newest first.
 *
 * What changes on the way through, and why:
 *
 *  - Heading ids are the live site's. Its table of contents (tocbot, rendered by
 *    the theme rather than stored in the post) numbered every H2 in order —
 *    `what-is-a-salon-facial-1` — and those anchors are in the wild. Where the
 *    markdown capture has the TOC, its anchors are used as-is and checked
 *    against the headings; where it has none, the same rule generates them.
 *  - The six stray in-body H1s become H2s, text untouched (fix-plan A5). They
 *    were never in the live TOC's numbering, so they take an unnumbered id and
 *    leave everyone else's anchor where it was.
 *  - The "Author & Medical Reviewer" section is lifted out of the body. Its date
 *    is kept; the page renders the author box from src/config/site.ts `team`
 *    instead of 36 hand-pasted, slightly different copies.
 *  - `hr` separators are dropped; the template's heading rhythm replaces them.
 *  - Inline markup is reduced to strong/em/br/a. Links to the live domain become
 *    root-relative; links to external sites open in a new tab; `<a>` with the
 *    URL as its text but no href (the references lists) gets that href.
 *  - Two kinds of in-body image are dropped, and reported: before/after photos
 *    (the content doc's note 8 — signed consent and a "results vary" line first,
 *    the same call src/content/treatmentMedia.ts makes) and images hotlinked
 *    from images.openai.com, which are not the clinic's to serve.
 *
 * Run: npm run content:blog
 */
import fs from 'node:fs'
import path from 'node:path'
import { parse, type HTMLElement, type Node } from 'node-html-parser'
import { BACKUP, SRC } from './paths.ts'
import { blogImagePath, blogImageSmallPath, loadSourcePosts } from './blog-source.ts'
import { seoRecords } from '../src/seo/registry.generated.ts'
import { serviceMenu } from '../src/config/site.ts'
import type { BlogBlock, BlogPostContent, BlogSummary, BlogTocEntry } from '../src/content/blog.ts'

const OUT_DIR = path.join(SRC, 'content', 'blog')
const POSTS_DIR = path.join(OUT_DIR, 'posts')
const EXPECTED_POSTS = 37

/** fix-plan A2b's hub/spoke pairs (plus the skin-boosters pair the same map implies): post -> service page. */
const SERVICE_LINKS: Record<string, string> = {
  'gynecomastia-surgery-bengaluru': '/gynecomastia-surgery-in-bangalore/',
  'weight-loss-injections-bangalore': '/weight-loss-injections-in-bangalore/',
  'xanthelasma-removal-bengaluru': '/xanthelasma-removal-treatment-in-bangalore/',
  'earlobe-repair-surgery-bengaluru': '/ear-lobe-repair-surgery-in-bangalore/',
  'skin-boosters-treatment-bengaluru': '/skin-boosters-treatment-in-bangalore/',
}

/**
 * Pins a post's related list where word overlap picks badly — mostly posts
 * whose topic shares no words with its neighbours' titles (CoolSculpting and
 * cryolipolysis are the same treatment; vitiligo is treated with phototherapy).
 */
const RELATED_OVERRIDES: Record<string, [string, string, string]> = {
  'medical-facial-vs-salon-facial': ['hydrafacial-vs-chemical-peel', 'pdrn-salmon-dna-facial-benefits', 'how-to-prepare-skin-for-wedding'],
  'rf-vs-hifu-skin-tightening': ['hifu-a-non-surgical-facelift', 'thread-lift-vs-fillers-how-to-choose-the-right-treatment', 'when-should-you-start-anti-ageing-treatments-in-bengaluru'],
  'how-to-prepare-skin-for-wedding': ['medical-facial-vs-salon-facial', 'hydrafacial-vs-chemical-peel', 'skin-boosters-treatment-bengaluru'],
  'hifu-a-non-surgical-facelift': ['rf-vs-hifu-skin-tightening', 'thread-lift-vs-fillers-how-to-choose-the-right-treatment', 'when-should-you-start-anti-ageing-treatments-in-bengaluru'],
  'coolsculpting-eliminate-stubborn-fat': ['cryolipolysis-vs-liposuction-bengaluru', 'vaser-liposuction-complete-guide', 'weight-loss-injections-bangalore'],
  'cryolipolysis-vs-liposuction-bengaluru': ['coolsculpting-eliminate-stubborn-fat', 'vaser-liposuction-complete-guide', 'weight-loss-injections-bangalore'],
  'vaser-liposuction-complete-guide': ['cryolipolysis-vs-liposuction-bengaluru', 'coolsculpting-eliminate-stubborn-fat', 'gynecomastia-surgery-bengaluru'],
  'weight-loss-injections-bangalore': ['coolsculpting-eliminate-stubborn-fat', 'cryolipolysis-vs-liposuction-bengaluru', 'vaser-liposuction-complete-guide'],
  'gynecomastia-surgery-bengaluru': ['vaser-liposuction-complete-guide', 'anti-ageing-treatments-for-men-bengaluru', 'what-to-ask-before-cosmetic-surgery'],
  'vitiligo-repigmentation-treatment': ['phototherapy-for-skin-conditions', 'how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin', 'laser-toning-for-pigmentation'],
  'phototherapy-for-skin-conditions': ['vitiligo-repigmentation-treatment', 'how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin', 'blog-is-laser-treatment-safe-for-indian-skin'],
  'how-can-you-treat-stubborn-pigmentation-and-achieve-clearer-skin': ['laser-toning-for-pigmentation', 'choose-right-skin-treatment-dull-skin-pigmentation-acne-scars', 'chemical-peels-vs-microneedling-vs-lasers-vs-injectables'],
  'xanthelasma-removal-bengaluru': ['choosing-the-right-skin-and-hair-doctor', 'earlobe-repair-surgery-bengaluru', 'what-to-ask-before-cosmetic-surgery'],
  'choosing-the-right-skin-and-hair-doctor': ['what-to-ask-before-cosmetic-surgery', 'blog-is-laser-treatment-safe-for-indian-skin', 'choose-right-skin-treatment-dull-skin-pigmentation-acne-scars'],
}

const knownPaths = new Set(seoRecords.map(r => r.path))
const problems: string[] = []
const report: string[] = []

/* ---- inline HTML ----------------------------------------------------------- */

const escapeText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeAttr = (s: string) => escapeText(s).replace(/"/g, '&quot;')

/** A live-domain URL as a root-relative path, or null for anything external. */
function internalPath(href: string): string | null {
  if (href.startsWith('/')) return href
  const m = href.match(/^https?:\/\/(?:www\.)?dermasolutions\.co\.in(\/[^\s]*)?$/)
  return m ? (m[1] || '/') : null
}

function link(slug: string, rawHref: string, inner: string): string {
  const href = rawHref.trim()
  const local = internalPath(href)
  if (local !== null) {
    let [pathname, rest = ''] = local.split(/(?=[?#])/)
    // WordPress redirected slash-less paths; a static host will not.
    if (!pathname.endsWith('/') && knownPaths.has(`${pathname}/`)) pathname += '/'
    if (pathname && !knownPaths.has(pathname)) report.push(`${slug}: internal link to ${local} is not one of the built routes`)
    return `<a href="${escapeAttr(pathname + rest)}">${inner}</a>`
  }
  if (!/^(https?:|mailto:|tel:)/.test(href)) {
    report.push(`${slug}: unlinked unusual href "${href}"`)
    return inner
  }
  return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
}

function inline(slug: string, node: Node): string {
  if (node.nodeType === 3) return escapeText(node.text)
  if (node.nodeType !== 1) return ''
  const el = node as HTMLElement
  const tag = el.rawTagName?.toLowerCase()
  const inner = () => el.childNodes.map(c => inline(slug, c)).join('')

  switch (tag) {
    case 'br':
      return '<br>'
    case 'strong':
    case 'b': {
      const s = inner()
      return s.trim() ? `<strong>${s}</strong>` : s
    }
    case 'em':
    case 'i': {
      const s = inner()
      return s.trim() ? `<em>${s}</em>` : s
    }
    case 'a': {
      const href = el.getAttribute('href') ?? (/^https?:\/\/\S+$/.test(el.text.trim()) ? el.text.trim() : null)
      return href ? link(slug, href, inner()) : inner()
    }
    default:
      // mark, span, sup, code… — keep the words, drop the wrapper.
      return inner()
  }
}

const inlineChildren = (slug: string, el: HTMLElement) =>
  el.childNodes.map(c => inline(slug, c)).join('').replace(/\u00a0/g, ' ').replace(/(<br>\s*)+$/, '').trim()

/* ---- heading ids ----------------------------------------------------------- */

/** tocbot's rule, reproduced: lower-case, strip everything but letters, digits, spaces and hyphens, spaces to hyphens. */
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')

/** Normalised heading text, for checking a TOC anchor belongs to the heading it is paired with. */
const loose = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '')

function liveToc(slug: string): { text: string; id: string }[] {
  const md = fs.readFileSync(path.join(BACKUP, '02-markdown', `${slug}.md`), 'utf8')
  return [...md.matchAll(/^\d+\. \[(.+?)\]\([^)#]*#([^)]+)\)$/gm)].map(m => ({ text: m[1], id: m[2] }))
}

/* ---- blocks ---------------------------------------------------------------- */

interface Extracted {
  blocks: BlogBlock[]
  toc: BlogTocEntry[]
  reviewedDate: string | null
  words: number
}

function extract(slug: string, html: string, pageH1: string): Extracted {
  const root = parse(html)
  const live = liveToc(slug)
  const blocks: BlogBlock[] = []
  const toc: BlogTocEntry[] = []
  const usedIds = new Set<string>()
  let h2Index = 0
  let reviewedDate: string | null = null
  let inReviewer = false
  let words = 0

  const uniqueId = (base: string) => {
    let id = base || 'section'
    for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`
    usedIds.add(id)
    return id
  }
  const count = (s: string) => { words += s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length }

  for (const node of root.childNodes) {
    if (node.nodeType === 3) {
      if (node.text.trim()) problems.push(`${slug}: stray top-level text "${node.text.trim().slice(0, 60)}"`)
      continue
    }
    if (node.nodeType !== 1) continue
    const el = node as HTMLElement
    const tag = el.rawTagName.toLowerCase()
    const text = el.text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()

    // The live TOC numbered H2s only, and counted the reviewer's H2 among them.
    if (tag === 'h2') h2Index++

    if (tag === 'h1' || tag === 'h2') {
      inReviewer = /medical reviewer/i.test(text)
      if (inReviewer) continue
    }
    if (inReviewer) {
      const date = el.text.match(/Date Reviewed:\s*(\d{4}-\d{2}-\d{2})/)
      if (date) reviewedDate = date[1]
      continue
    }

    switch (tag) {
      case 'hr':
        break

      case 'p': {
        const html = inlineChildren(slug, el)
        if (html.replace(/<br>/g, '').trim()) { blocks.push({ type: 'p', html }); count(html) }
        break
      }

      case 'h1':
      case 'h2': {
        let id: string
        if (tag === 'h1' && loose(text) === loose(pageH1)) {
          report.push(`${slug}: in-body H1 repeats the page's own H1 — dropped (fix-plan A5)`)
          break
        }
        if (tag === 'h1') {
          id = uniqueId(slugify(text))
          report.push(`${slug}: in-body H1 "${text}" demoted to H2 (fix-plan A5)`)
        } else {
          const expected = live[h2Index - 1]
          if (live.length && !expected) problems.push(`${slug}: H2 #${h2Index} "${text}" has no live TOC entry`)
          if (expected && loose(expected.text) !== loose(text)) {
            problems.push(`${slug}: H2 #${h2Index} "${text}" does not match live TOC entry "${expected.text}"`)
          }
          id = uniqueId(expected?.id ?? `${slugify(text)}-${h2Index}`)
        }
        blocks.push({ type: 'h2', id, text })
        toc.push({ id, text })
        count(text)
        break
      }

      case 'h3':
      case 'h4':
        blocks.push({ type: tag, id: uniqueId(slugify(text)), text })
        count(text)
        break

      case 'ul':
      case 'ol': {
        const items = el.querySelectorAll('li').map(li => inlineChildren(slug, li)).filter(Boolean)
        if (items.length) { blocks.push({ type: 'list', ordered: tag === 'ol', items }); items.forEach(count) }
        break
      }

      case 'blockquote': {
        const html = el.querySelectorAll('p').map(p => inlineChildren(slug, p)).filter(Boolean).join('<br><br>')
        blocks.push({ type: 'quote', html })
        count(html)
        break
      }

      case 'figure':
      case 'div': {
        if (el.classList.contains('wp-block-table')) {
          const rows = el.querySelectorAll('tr').map(tr => ({
            header: tr.parentNode?.rawTagName?.toLowerCase() === 'thead' || tr.querySelectorAll('td').length === 0,
            cells: tr.querySelectorAll('th, td').map(c => inlineChildren(slug, c)),
          }))
          const head = rows[0]?.header ? rows.shift()!.cells : null
          const body = rows.map(r => r.cells)
          blocks.push({ type: 'table', head, rows: body })
          ;[...(head ?? []), ...body.flat()].forEach(count)
          break
        }

        if (el.classList.contains('wp-block-embed-youtube')) {
          const iframe = el.querySelector('iframe')
          const id = iframe?.getAttribute('src')?.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/)?.[1]
          if (!iframe || !id) { problems.push(`${slug}: YouTube embed without a recognisable video id`); break }
          blocks.push({ type: 'video', youtubeId: id, title: iframe.getAttribute('title')?.trim() || 'Video' })
          break
        }

        if (el.classList.contains('wp-block-image')) {
          const src = el.querySelector('img')?.getAttribute('src') ?? ''
          if (/BEFORE-AFTER/i.test(src)) report.push(`${slug}: dropped before/after image ${path.basename(src)} (content doc note 8)`)
          else if (/images\.openai\.com/.test(src)) report.push(`${slug}: dropped hotlinked image from images.openai.com`)
          else problems.push(`${slug}: in-body image with no rule for it: ${src}`)
          break
        }

        problems.push(`${slug}: unhandled <${tag} class="${el.getAttribute('class')}">`)
        break
      }

      default:
        problems.push(`${slug}: unhandled top-level <${tag}>`)
    }
  }

  if (live.length && live.length !== h2Index) {
    problems.push(`${slug}: live TOC has ${live.length} entries, post has ${h2Index} H2s`)
  }

  return { blocks, toc, reviewedDate, words }
}

/* ---- related posts --------------------------------------------------------- */

const STOP = new Set(
  ('a an and are be before can choose complete do does everything for from guide how in is it know need of on or ' +
    'right should the their them they to treatment treat use vs what when which who why with you your ' +
    'bangalore bengaluru blog skin better difference really results should start').split(' '),
)

const terms = (s: string) =>
  new Set(
    s.toLowerCase()
      .replace(/aging/g, 'ageing')
      .split(/[^a-z0-9]+/)
      .map(w => w.replace(/s$/, ''))
      .filter(w => w.length > 2 && !STOP.has(w)),
  )

/* ---- run ------------------------------------------------------------------- */

const sources = loadSourcePosts()
if (sources.length !== EXPECTED_POSTS) problems.push(`expected ${EXPECTED_POSTS} posts, found ${sources.length}`)

const serviceLabels = new Map<string, string>(serviceMenu.flatMap(g => g.items.map(i => [i.path, i.label] as const)))

const posts = sources
  .map(src => {
    const published = src.record.publishedTime
    const modified = src.record.modifiedTime
    if (!published || !modified) problems.push(`${src.slug}: registry record has no published/modified time`)
    return { src, published: published ?? '', modified: modified ?? '', ...extract(src.slug, src.html, src.record.h1) }
  })
  .sort((a, b) => b.published.localeCompare(a.published))

const vocab = new Map(posts.map(p => [p.src.slug, terms(`${p.src.slug} ${p.src.record.h1}`)]))

function related(slug: string, published: string): [string, string, string] {
  if (RELATED_OVERRIDES[slug]) return RELATED_OVERRIDES[slug]
  const mine = vocab.get(slug)!
  const time = Date.parse(published)
  const ranked = posts
    .filter(p => p.src.slug !== slug)
    .map(p => ({
      slug: p.src.slug,
      score: [...vocab.get(p.src.slug)!].filter(t => mine.has(t)).length,
      distance: Math.abs(Date.parse(p.published) - time),
    }))
    .sort((a, b) => b.score - a.score || a.distance - b.distance)
  return [ranked[0].slug, ranked[1].slug, ranked[2].slug]
}

for (const [post, picks] of Object.entries(RELATED_OVERRIDES)) {
  for (const slug of [post, ...picks]) {
    if (!posts.some(p => p.src.slug === slug)) problems.push(`RELATED_OVERRIDES: ${slug} is not a post`)
  }
  if (picks.includes(post)) problems.push(`RELATED_OVERRIDES: ${post} lists itself`)
}
for (const [post, service] of Object.entries(SERVICE_LINKS)) {
  if (!posts.some(p => p.src.slug === post)) problems.push(`SERVICE_LINKS: ${post} is not a post`)
  if (!serviceLabels.has(service)) problems.push(`SERVICE_LINKS: ${service} is not in the service menu`)
}
for (const p of posts) {
  if (!p.toc.length) problems.push(`${p.src.slug}: no H2s, so no table of contents`)
  if (!p.src.image.alt) problems.push(`${p.src.slug}: featured image has no alt text`)
}

if (problems.length) {
  console.error(`blog content: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`)
  process.exit(1)
}

/* ---- write ----------------------------------------------------------------- */

fs.rmSync(OUT_DIR, { recursive: true, force: true })
fs.mkdirSync(POSTS_DIR, { recursive: true })

for (const p of posts) {
  const service = SERVICE_LINKS[p.src.slug]
  const content: BlogPostContent = {
    slug: p.src.slug,
    blocks: p.blocks,
    toc: p.toc,
    reviewedDate: p.reviewedDate,
    relatedSlugs: related(p.src.slug, p.published),
    serviceLink: service ? { label: serviceLabels.get(service)!, path: service } : null,
  }
  fs.writeFileSync(
    path.join(POSTS_DIR, `${p.src.slug}.ts`),
    `/**
 * GENERATED FILE — DO NOT EDIT. Run \`npm run content:blog\`.
 *
 * ${p.src.record.path}
 * Source: seo-backup/03-wp-rest/posts.json
 */
import type { BlogPostContent } from '@/content/blog'

const post: BlogPostContent = ${JSON.stringify(content, null, 2)}

export default post
`,
  )
}

const index: BlogSummary[] = posts.map(p => ({
  slug: p.src.slug,
  path: p.src.record.path,
  title: p.src.record.h1,
  published: p.published,
  modified: p.modified,
  image: blogImagePath(p.src.slug),
  imageSmall: blogImageSmallPath(p.src.slug),
  imageAlt: p.src.image.alt,
  readingMinutes: Math.max(1, Math.round(p.words / 200)),
}))

fs.writeFileSync(
  path.join(OUT_DIR, 'index.generated.ts'),
  `/**
 * GENERATED FILE — DO NOT EDIT. Run \`npm run content:blog\`.
 *
 * All ${index.length} posts, newest first. Source: seo-backup/03-wp-rest/posts.json
 * joined to src/seo/registry.generated.ts.
 */
import type { BlogSummary } from '@/content/blog'

export const blogIndex: BlogSummary[] = ${JSON.stringify(index, null, 2)}

export const blogBySlug = new Map(blogIndex.map(post => [post.slug, post]))
`,
)

console.log(`blog content: ${posts.length} posts written to src/content/blog/`)
if (report.length) console.log(`\nnotes (${report.length}):\n  ${report.join('\n  ')}`)
