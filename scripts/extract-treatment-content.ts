/**
 * Turns the treatment copy doc into one typed content module per page.
 *
 * Source: content/Treatment/Derma-Solutions-All-Treatment-Pages-Content.md —
 * 38 pages across five categories, each written slot-by-slot for the Glowix
 * service-detail template (01 header, 03 image, 04 intro, 05 feature block,
 * 06 video, 07 why-choose block, 08 FAQ).
 *
 * Emits src/content/treatments/<slug>.ts (GENERATED). The copy is transcribed
 * mechanically rather than by hand for the same reason the SEO registry is:
 * 38 pages of hand-copied text is where drift and typos come from. Re-run it
 * whenever the doc changes.
 *
 * Every page is validated hard — slot counts, a registry record, a place in the
 * site's service menu — and the script throws rather than writing a page that
 * would render with a hole in it. Each category's "CHECK BEFORE THIS GOES LIVE"
 * notes are outside every page block, so none of that text can reach the site.
 *
 * Run: npm run content:treatments
 */
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, SRC } from './paths.ts'
import { seoRecords } from '../src/seo/registry.generated.ts'
import { serviceMenu } from '../src/config/site.ts'
import { ADDED_PAGES } from './added-pages.ts'
import type { TreatmentBlock, TreatmentContent, TreatmentFaq } from '../src/content/treatment.ts'

const SOURCE = path.join(ROOT, 'content', 'Treatment', 'Derma-Solutions-All-Treatment-Pages-Content.md')
const OUT_DIR = path.join(SRC, 'content', 'treatments')
const EXPECTED_PAGES = 38

/**
 * Markdown to plain text. The doc is a Google Docs export: punctuation is
 * backslash-escaped (`\!`, `\+`, `\.`), emphasis is `**`, and editorial
 * asides such as ` *(see note 5\)*` trail some lines.
 */
function clean(text: string): string {
  return text
    .replace(/\s*\*\((?:[^()]|\\\))*\)\*\s*$/, '')
    .replace(/\\([^\w\s])/g, '$1')
    .replace(/\*\*/g, '')
    .trim()
}

type Page = {
  title: string
  lines: string[]
  /** 'NN' slot id -> the non-empty lines under it. */
  slots: Map<string, string[]>
}

const source = fs.readFileSync(SOURCE, 'utf8').split('\n')

/* ---- split into page blocks ---------------------------------------------- */

const pages: Page[] = []
let current: Page | null = null
let slot: string | null = null

for (const raw of source) {
  const line = raw.trim()

  // A page starts at "## **N\. NAME**". Any other H1/H2 — a Part heading, a
  // category's "CHECK BEFORE THIS GOES LIVE", the contents — ends it.
  const pageStart = line.match(/^## \*\*\d+\\?\.\s*(.+?)\*\*$/)
  if (pageStart) {
    current = { title: clean(pageStart[1]), lines: [], slots: new Map() }
    pages.push(current)
    slot = null
    continue
  }
  if (/^#{1,2} /.test(line)) { current = null; slot = null; continue }
  if (!current || !line) continue

  const slotStart = line.match(/^### \*\*(\d\d) — /)
  if (slotStart) {
    slot = slotStart[1]
    current.slots.set(slot, [])
    continue
  }
  if (slot) current.slots.get(slot)!.push(line)
  else current.lines.push(line)
}

/* ---- parse and validate each page ---------------------------------------- */

const problems: string[] = []

function field(lines: string[], label: string, page: string): string {
  const hit = lines.find(l => l.startsWith(`**${label}:**`))
  if (!hit) { problems.push(`${page}: no "${label}:" line`); return '' }
  return clean(hit.slice(label.length + 5))
}

function slotLines(page: Page, id: string): string[] {
  const lines = page.slots.get(id)
  if (!lines) { problems.push(`${page.title}: missing slot ${id}`); return [] }
  return lines
}

/** Slots 05 and 07: an H2 line, one paragraph, and a three-row table. */
function block(page: Page, id: string): TreatmentBlock {
  const lines = slotLines(page, id)
  const heading = field(lines, 'H2', page.title)
  const body = lines.filter(l => !l.startsWith('**H2:**') && !l.startsWith('|'))
  const items = lines
    .filter(l => /^\|\s*\*\*/.test(l)) // data rows only: the header row has no bold, the rule row is ":----"
    .map(l => {
      const [title, text] = l.split('|').slice(1, 3).map(clean)
      return { title, text }
    })

  if (body.length !== 1) problems.push(`${page.title}: slot ${id} has ${body.length} paragraphs, expected 1`)
  if (items.length !== 3) problems.push(`${page.title}: slot ${id} has ${items.length} items, expected 3`)
  for (const item of items) if (!item.title || !item.text) problems.push(`${page.title}: slot ${id} has an empty item`)

  return { heading, body: clean(body[0] ?? ''), items: items as unknown as TreatmentBlock['items'] }
}

const menuPaths = new Set(serviceMenu.flatMap(group => group.items.map(item => item.path as string)))
const recordsByPath = new Map(seoRecords.map(r => [r.path, r]))

type Parsed = TreatmentContent & { slug: string; imageBrief: string; videoBrief: string; seoTitle: string; seoDescription: string }

const parsed: Parsed[] = pages.map(page => {
  const urlLine = page.lines.find(l => l.startsWith('**URL:**')) ?? ''
  const pagePath = urlLine.match(/\/[a-z0-9/-]+\//)?.[0] ?? ''
  if (!pagePath) problems.push(`${page.title}: no URL`)

  const record = recordsByPath.get(pagePath)
  if (pagePath && !record) problems.push(`${page.title}: ${pagePath} has no SEO registry record`)
  if (pagePath && !menuPaths.has(pagePath)) problems.push(`${page.title}: ${pagePath} is not in serviceMenu`)

  const header = slotLines(page, '01')
  const breadcrumb = field(header, 'Breadcrumb', page.title).split('/').map(s => s.trim())
  const name = breadcrumb[breadcrumb.length - 1] ?? ''
  if (breadcrumb.length !== 3 || !name) problems.push(`${page.title}: breadcrumb is not "Home / Services / <name>"`)

  const intro = slotLines(page, '04').map(clean)
  if (intro.length !== 2) problems.push(`${page.title}: intro has ${intro.length} paragraphs, expected 2`)

  const video = slotLines(page, '06')
  const videoBody = video.filter(l => !l.startsWith('**Video:**'))
  if (videoBody.length !== 1) problems.push(`${page.title}: video block has ${videoBody.length} paragraphs, expected 1`)

  const faqLines = slotLines(page, '08')
  const faqs: TreatmentFaq[] = []
  for (let i = 0; i < faqLines.length; i++) {
    const question = faqLines[i].match(/^\*\*\d+\\?\.\s*(.+)\*\*$/)
    if (!question) continue
    const answer = faqLines[i + 1]
    if (!answer || answer.startsWith('**')) { problems.push(`${page.title}: FAQ "${question[1]}" has no answer`); continue }
    faqs.push({ question: clean(question[1]), answer: clean(answer) })
    i++
  }
  // Question + answer lines, plus the H2: anything else is text the parser would drop.
  if (faqLines.length !== faqs.length * 2 + 1) problems.push(`${page.title}: FAQ slot has unparsed lines`)
  if (faqs.length !== 4) problems.push(`${page.title}: ${faqs.length} FAQs, expected 4`)

  return {
    slug: record?.slug ?? pagePath.replace(/\//g, ''),
    path: pagePath,
    name,
    intro: [intro[0] ?? '', intro[1] ?? ''] as const,
    feature: block(page, '05'),
    videoBody: clean(videoBody[0] ?? ''),
    why: block(page, '07'),
    faqHeading: field(faqLines, 'H2', page.title),
    faqs,
    imageBrief: clean(slotLines(page, '03').join(' ')),
    videoBrief: field(video, 'Video', page.title),
    seoTitle: field(page.lines, 'SEO Title', page.title),
    seoDescription: field(page.lines, 'Meta Description', page.title),
  }
})

if (parsed.length !== EXPECTED_PAGES) problems.push(`found ${parsed.length} pages, expected ${EXPECTED_PAGES}`)

const seen = new Set<string>()
for (const page of parsed) {
  if (seen.has(page.path)) problems.push(`${page.path} appears twice`)
  seen.add(page.path)
}

// An authored page's SEO lives in scripts/added-pages.ts; it must still say
// what the doc says.
for (const added of ADDED_PAGES) {
  const page = parsed.find(p => p.slug === added.slug)
  if (!page) { problems.push(`added page ${added.slug} is not in the doc`); continue }
  if (page.seoTitle !== added.title) problems.push(`${added.slug}: added-pages.ts title differs from the doc`)
  if (page.seoDescription !== added.description) problems.push(`${added.slug}: added-pages.ts description differs from the doc`)
}

if (problems.length) {
  console.error(`treatment content: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`)
  process.exit(1)
}

/* ---- write --------------------------------------------------------------- */

fs.rmSync(OUT_DIR, { recursive: true, force: true })
fs.mkdirSync(OUT_DIR, { recursive: true })

/** Keeps a free-text brief from closing the comment it is written into. */
const comment = (s: string) => s.replace(/\*\//g, '* /')

for (const page of parsed) {
  const content: TreatmentContent = {
    path: page.path,
    name: page.name,
    intro: page.intro,
    feature: page.feature,
    videoBody: page.videoBody,
    why: page.why,
    faqHeading: page.faqHeading,
    faqs: page.faqs,
  }
  fs.writeFileSync(
    path.join(OUT_DIR, `${page.slug}.ts`),
    `/**
 * GENERATED FILE — DO NOT EDIT. Run \`npm run content:treatments\`.
 *
 * ${page.path}
 * Source: content/Treatment/Derma-Solutions-All-Treatment-Pages-Content.md
 *
 * The doc's image brief:  ${comment(page.imageBrief)}
 * The doc's video brief:  ${comment(page.videoBrief)}
 * Both are tracked against the files actually used in src/content/treatmentMedia.ts.
 */
import type { TreatmentContent } from '@/content/treatment'

const content: TreatmentContent = ${JSON.stringify(content, null, 2)}

export default content
`,
  )
}

console.log(`treatment content: ${parsed.length} pages -> src/content/treatments/`)
