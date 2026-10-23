/**
 * The 37 WordPress posts as the backup captured them, plus the authored posts
 * in scripts/added-posts.ts, joined to their registry records and featured
 * images. Shared by extract-blog-content.ts (the copy) and
 * import-blog-images.ts (the photographs), so both walk the same list.
 *
 * A captured post's featured image is resolved the way the backup's README
 * describes: posts.json `featured_media` -> media-library.json `id` ->
 * `source_url` -> download-manifest.json `local`. Every link in that chain is
 * checked, and a post whose image does not resolve to a file on disk throws.
 * An authored post's body and banner are files in content/blog/.
 */
import fs from 'node:fs'
import path from 'node:path'
import { ADDED_POSTS_DIR, BACKUP } from './paths.ts'
import { ADDED_POSTS } from './added-posts.ts'
import { seoRecords, type SeoRecord } from '../src/seo/registry.generated.ts'

interface WpPost {
  id: number
  slug: string
  featured_media: number
  content: { rendered: string }
}

interface WpMedia {
  id: number
  source_url: string
  alt_text: string
  width: number
  height: number
}

export interface SourcePost {
  slug: string
  record: SeoRecord
  html: string
  image: { file: string; alt: string; width: number; height: number }
  /** Where the body came from, for the generated module's header comment. */
  source: string
  /**
   * An authored post's in-body images: each `figure.wp-block-image` src mapped
   * to its file in content/blog/, or to null where that file is not there yet.
   * Always empty for a captured post, whose in-body images follow the
   * extractor's drop rules instead.
   */
  inlineImages: Map<string, string | null>
}

const readJson = <T>(...parts: string[]): T =>
  JSON.parse(fs.readFileSync(path.join(BACKUP, ...parts), 'utf8')) as T

/**
 * The live featured images' own alt text, where it describes nothing: a
 * default ChatGPT filename, "1", "pic". fix-plan finding 9 — replaced here
 * rather than carried over. Written from the artwork itself.
 */
const ALT_OVERRIDES: Record<string, string> = {
  'mnrf-vs-co2-laser-for-acne-scars':
    'MNRF vs CO2 laser for acne scars: a microneedling radiofrequency device and a fractional CO2 laser beside two close-ups of scarred skin.',
  'hydrafacial-vs-chemical-peel':
    'HydraFacial vs chemical peel: a woman’s face split down the middle, deep cleansing and hydration on one side and exfoliation on the other.',
  'choose-right-skin-treatment-dull-skin-pigmentation-acne-scars':
    'Woman with clear, glowing skin under the title “How to Choose the Right Skin Treatment for Dull Skin, Pigmentation and Acne Scars”.',
  'coolsculpting-eliminate-stubborn-fat':
    'CoolSculpting fat freezing: a woman beside a CoolSculpting device, with the freeze, eliminate and sculpt stages and the body areas it treats.',
  'what-to-ask-before-cosmetic-surgery':
    'Surgeon in blue gloves marking a woman’s face with dotted lines before a cosmetic procedure.',
  'earlobe-repair-surgery-bengaluru':
    'Indian woman consulting a dermatologist for torn earlobe repair surgery in a modern dermatology clinic.',
}

export function loadSourcePosts(): SourcePost[] {
  const posts = readJson<WpPost[]>('03-wp-rest', 'posts.json')
  const media = new Map(readJson<WpMedia[]>('06-media', 'media-library.json').map(m => [m.id, m]))
  const downloads = readJson<Record<string, { local: string; status: string }>>('06-media', 'download-manifest.json')

  const added = new Map(ADDED_POSTS.map(p => [p.slug, p]))
  const records = seoRecords.filter(r => r.type === 'post')
  const bySlug = new Map(posts.map(p => [p.slug, p]))

  const problems: string[] = []
  for (const p of posts) if (!records.some(r => r.slug === p.slug)) problems.push(`${p.slug}: in posts.json, not in the registry`)
  for (const p of ADDED_POSTS) {
    if (!records.some(r => r.slug === p.slug)) problems.push(`${p.slug}: in added-posts.ts, not in the registry — run npm run seo:registry`)
    if (bySlug.has(p.slug)) problems.push(`${p.slug}: in both added-posts.ts and posts.json`)
  }

  const out: SourcePost[] = []
  for (const record of records) {
    const authored = added.get(record.slug)
    if (authored) {
      const bodyFile = path.join(ADDED_POSTS_DIR, authored.bodyFile)
      const bannerFile = path.join(ADDED_POSTS_DIR, authored.bannerFile)
      if (!fs.existsSync(bodyFile)) { problems.push(`${record.slug}: body ${bodyFile} not found`); continue }
      if (!fs.existsSync(bannerFile)) { problems.push(`${record.slug}: banner ${bannerFile} not found`); continue }

      const html = fs.readFileSync(bodyFile, 'utf8')
      const inlineImages = new Map<string, string | null>()
      for (const [, src] of html.matchAll(/<figure class="wp-block-image">\s*<img src="([^"]+)"/g)) {
        const file = path.join(ADDED_POSTS_DIR, src)
        inlineImages.set(src, fs.existsSync(file) ? file : null)
      }

      out.push({
        slug: record.slug,
        record,
        html,
        // The media library's width/height have no counterpart here; nothing
        // reads them — import-blog-images.ts measures the file itself.
        image: { file: bannerFile, alt: authored.bannerAlt, width: 0, height: 0 },
        source: `content/blog/${authored.bodyFile} (scripts/added-posts.ts)`,
        inlineImages,
      })
      continue
    }

    const post = bySlug.get(record.slug)
    if (!post) { problems.push(`${record.slug}: registry post missing from posts.json`); continue }

    const m = media.get(post.featured_media)
    const local = m && downloads[m.source_url]?.local
    const file = local && path.join(BACKUP, local)
    if (!m || !file || !fs.existsSync(file)) {
      problems.push(`${record.slug}: featured image ${post.featured_media} does not resolve to a file`)
      continue
    }

    out.push({
      slug: record.slug,
      record,
      html: post.content.rendered,
      image: { file, alt: ALT_OVERRIDES[record.slug] ?? m.alt_text.trim(), width: m.width, height: m.height },
      source: 'seo-backup/03-wp-rest/posts.json',
      inlineImages: new Map(),
    })
  }

  if (problems.length) throw new Error(`blog source: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`)
  return out
}

/** Public URLs of a post's two renditions, written by import-blog-images.ts. */
export const blogImagePath = (slug: string) => `/images/blog/${slug}.jpg`
export const blogImageSmallPath = (slug: string) => `/images/blog/${slug}-640.jpg`
/** Public URL of an authored post's in-body image, also written by import-blog-images.ts. */
export const blogInlineImagePath = (src: string) => `/images/blog/${src.replace(/\.[a-z]+$/i, '')}.jpg`
/** The width an in-body image is resized down to — the article column is 847px. */
export const BLOG_INLINE_IMAGE_MAX_WIDTH = 1200
