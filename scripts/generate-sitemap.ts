/**
 * Writes dist/sitemap.xml and dist/llms.txt after the SSG build.
 *
 * The sitemap is generated from the SEO registry, so it lists exactly the URLs
 * that were actually built — a sitemap and a route table cannot disagree.
 *
 * Run: npm run seo:sitemap (chained onto `npm run build`)
 */
import fs from 'node:fs'
import path from 'node:path'
import { DIST } from './paths.ts'
import { seoRecords } from '../src/seo/registry.generated.ts'
import { brand, contact, location, seo, team, serviceMenu } from '../src/config/site.ts'

if (!fs.existsSync(DIST)) throw new Error('dist/ not found — run the build first')

const urls = seoRecords
  .slice()
  .sort((a, b) => a.path.localeCompare(b.path))
  .map(r => {
    const lastmod = r.modifiedTime ? new Date(r.modifiedTime).toISOString().slice(0, 10) : null
    return [
      '  <url>',
      `    <loc>${r.canonical}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      '  </url>',
    ].filter(Boolean).join('\n')
  })

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/1999/sitemaps/0.9">
${urls.join('\n')}
</urlset>
`.replace('http://www.w3.org/1999/sitemaps/0.9', 'http://www.sitemaps.org/schemas/sitemap/0.9'),
)

/**
 * llms.txt — net-new (fix-plan A8). /llms.txt, /llm.txt, /ai.txt and
 * /.well-known/llms.txt all 404 on the live site, so there is nothing to
 * preserve and no migration risk.
 */
const services = serviceMenu.flatMap(group =>
  group.items.map(item => `- [${item.label}](${seo.canonicalBase}${item.path}): ${group.group}`),
)

fs.writeFileSync(
  path.join(DIST, 'llms.txt'),
  `# ${brand.name}

> ${brand.description}

- Location: ${location.address.street}, ${location.address.locality}, ${location.address.region} ${location.address.postalCode}, India
- Phone: ${contact.phoneDisplay}
- Areas served: ${location.areaServed.join(', ')}

## Clinical team

${team.map(d => `- [${d.name}](${seo.canonicalBase}${d.path}) — ${d.qualification}. ${d.role}.`).join('\n')}

## Treatments

${services.join('\n')}

## Other

- [Blog](${seo.canonicalBase}/blogs/)
- [Image gallery](${seo.canonicalBase}/image-gallery/)
- [Video gallery](${seo.canonicalBase}/video-gallery/)
- [Privacy policy](${seo.canonicalBase}/privacy-policy/)
- [Terms of use](${seo.canonicalBase}/terms-of-use/)

## Notes

${team[0].bio}
`,
)

/**
 * Static hosts (Netlify, Vercel, Cloudflare Pages, S3) serve dist/404.html for
 * an unmatched path. vite-react-ssg prerendered it to dist/404/index.html —
 * move it, so /404/ is not also a real, crawlable URL.
 */
const built404 = path.join(DIST, '404', 'index.html')
if (fs.existsSync(built404)) {
  fs.renameSync(built404, path.join(DIST, '404.html'))
  fs.rmSync(path.join(DIST, '404'), { recursive: true, force: true })
  console.log('404:     dist/404.html')
}

console.log(`sitemap: ${urls.length} URLs -> dist/sitemap.xml`)
console.log(`llms:    dist/llms.txt (${services.length} treatment URLs)`)
