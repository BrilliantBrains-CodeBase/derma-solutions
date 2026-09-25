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
 * Pages the client has rewritten since the master doc, as their own documents.
 *
 * A revision doc is the page as it should read, not the master doc's
 * slot-by-slot table: an H1, a breadcrumb list, then the body in order —
 * intro paragraphs, the feature H2 with its paragraph and three bullets, the
 * video paragraphs, the why-choose H2 with its paragraphs and three bullets,
 * and the FAQ. parseRevision below reads that shape and replaces the master
 * doc's copy for the page; everything else about the page is unchanged, and
 * the master doc stays the source for the other 37.
 */
const REVISIONS: Record<string, string> = {
  'iv-glutathione-treatment-in-bangalore': 'content/Treatment/DERMA SOLUTIONS — HOMEPAGE COPY-2.md',
}

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

/* ---- revised pages ------------------------------------------------------- */

type Revision = Pick<TreatmentContent, 'name' | 'intro' | 'feature' | 'videoBody' | 'why' | 'faqHeading' | 'faqs'>

/**
 * A revision doc (see REVISIONS). Its sections are H2s and its icon boxes are
 * bullets — `* **Title**` followed by an indented line of copy — so the shape
 * is read from the order of things rather than from slot numbers.
 */
function parseRevision(file: string, slug: string): Revision | null {
  const lines = fs.readFileSync(path.join(ROOT, file), 'utf8').split('\n').map(l => l.trimEnd())

  const breadcrumb = lines.filter(l => /^\d+\.\s/.test(l)).map(l => clean(l.replace(/^\d+\.\s*/, '')))
  const name = breadcrumb[breadcrumb.length - 1] ?? ''
  if (breadcrumb.length !== 3 || !name) problems.push(`${slug} revision: breadcrumb is not "Home / Services / <name>"`)

  /** The body, split on H2s: everything before the first one is the intro. */
  const sections: { heading: string; lines: string[] }[] = [{ heading: '', lines: [] }]
  for (const line of lines) {
    if (/^#{1,3} /.test(line) && !/^## /.test(line)) continue // the H1 and the FAQ questions' H3s
    if (/^## /.test(line)) { sections.push({ heading: clean(line.replace(/^##\s*/, '')), lines: [] }); continue }
    if (line.trim()) sections[sections.length - 1].lines.push(line)
  }

  /** `* **Title**` then an indented line of copy. */
  function items(sectionLines: string[]) {
    const found: { title: string; text: string }[] = []
    for (let i = 0; i < sectionLines.length; i++) {
      const bullet = sectionLines[i].match(/^\*\s+\*\*(.+?)\*\*\s*$/)
      if (!bullet) continue
      found.push({ title: clean(bullet[1]), text: clean(sectionLines[i + 1] ?? '') })
    }
    return found
  }

  /** Paragraphs are the lines that are neither a bullet nor a bullet's copy. */
  function prose(sectionLines: string[]) {
    const out: { text: string; afterBullet: boolean }[] = []
    let seenBullet = false
    for (let i = 0; i < sectionLines.length; i++) {
      const line = sectionLines[i]
      if (/^\*\s+\*\*/.test(line)) { seenBullet = true; i++; continue } // the bullet and its copy
      if (/^\s/.test(line)) continue
      out.push({ text: clean(line), afterBullet: seenBullet })
    }
    return out
  }

  const [introSection, featureSection, whySection, faqSection] = sections
  if (sections.length !== 4) { problems.push(`${slug} revision: ${sections.length} sections, expected intro + 2 blocks + FAQ`); return null }

  const intro = introSection.lines.filter(l => !/^\d+\.\s/.test(l)).map(clean)
  if (intro.length !== 2) problems.push(`${slug} revision: intro has ${intro.length} paragraphs, expected 2`)

  const featureProse = prose(featureSection.lines)
  const featureItems = items(featureSection.lines)
  const whyProse = prose(whySection.lines)
  const whyItems = items(whySection.lines)
  for (const [label, found] of [['feature', featureItems], ['why', whyItems]] as const) {
    if (found.length !== 3) problems.push(`${slug} revision: ${label} has ${found.length} items, expected 3`)
    if (found.some(i => !i.title || !i.text)) problems.push(`${slug} revision: ${label} has an empty item`)
  }

  // The paragraphs after the feature block's bullets are the video block's —
  // slot 06 in the master doc, which a revision doc does not label.
  const featureBody = featureProse.filter(p => !p.afterBullet).map(p => p.text)
  const videoBody = featureProse.filter(p => p.afterBullet).map(p => p.text)
  const whyBody = whyProse.filter(p => !p.afterBullet).map(p => p.text)
  for (const [label, body] of [['feature', featureBody], ['video', videoBody], ['why', whyBody]] as const) {
    if (!body.length) problems.push(`${slug} revision: ${label} block has no paragraph`)
  }
  if (whyProse.some(p => p.afterBullet)) problems.push(`${slug} revision: copy after the why block's bullets has nowhere to go`)

  const faqs: TreatmentFaq[] = []
  const questions = lines.filter(l => /^### /.test(l) && /\?\*\*\s*$/.test(l))
  for (const q of questions) {
    const i = lines.indexOf(q)
    const answer = lines.slice(i + 1).find(l => l.trim())
    faqs.push({ question: clean(q.replace(/^###\s*/, '').replace(/^\*\*\d+\\?\.\s*/, '**')), answer: clean(answer ?? '') })
  }
  if (faqs.length !== 4) problems.push(`${slug} revision: ${faqs.length} FAQs, expected 4`)
  if (faqs.some(f => !f.question || !f.answer)) problems.push(`${slug} revision: an FAQ is missing its question or answer`)
  // Every line under the FAQ heading is an answer — the questions are H3s, which
  // the section split drops. Anything else there would be copy with nowhere to go.
  if (faqSection.lines.length !== faqs.length) {
    problems.push(`${slug} revision: ${faqSection.lines.length} lines under the FAQ heading for ${faqs.length} answers`)
  }

  const one = (body: string[]) => (body.length === 1 ? body[0] : body)
  return {
    name,
    intro: [intro[0] ?? '', intro[1] ?? ''] as const,
    feature: { heading: featureSection.heading, body: one(featureBody), items: featureItems as unknown as TreatmentBlock['items'] },
    videoBody: one(videoBody),
    why: { heading: whySection.heading, body: one(whyBody), items: whyItems as unknown as TreatmentBlock['items'] },
    faqHeading: faqSection.heading,
    faqs,
  }
}

const revised = new Map<string, string>()
for (const [slug, file] of Object.entries(REVISIONS)) {
  const page = parsed.find(p => p.slug === slug)
  if (!page) { problems.push(`revision for ${slug}, which is not a page in the master doc`); continue }
  const revision = parseRevision(file, slug)
  if (!revision) continue
  if (revision.name !== page.name) problems.push(`${slug} revision: breadcrumb name "${revision.name}" differs from the master doc's "${page.name}"`)
  Object.assign(page, revision)
  revised.set(slug, file)
}

if (parsed.length !== EXPECTED_PAGES) problems.push(`found ${parsed.length} pages, expected ${EXPECTED_PAGES}`)

const seen = new Set<string>()
for (const page of parsed) {
  if (seen.has(page.path)) problems.push(`${page.path} appears twice`)
  seen.add(page.path)
}

// An authored page's SEO lives in scripts/added-pages.ts; where this doc is
// where that page's copy comes from, the two must still agree. The other added
// pages (About Us, Our Doctors, Book Appointment) are not treatments and have
// their own docs, so they are not this script's to check.
for (const added of ADDED_PAGES) {
  const page = parsed.find(p => p.slug === added.slug)
  if (!page) continue
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
 * Source: ${comment(revised.get(page.slug) ?? 'content/Treatment/Derma-Solutions-All-Treatment-Pages-Content.md')}
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

console.log(`treatment content: ${parsed.length} pages -> src/content/treatments/ (${revised.size} from a revision doc)`)
