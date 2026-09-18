import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons'

/**
 * The reference's `.post-social-sharing`: three square accent buttons, radius
 * 10, right-aligned under the article. Measured off
 * theme-reference/07-screenshots/desktop/top-tips-for-preparing-for-plastic-surgery.png.
 *
 * Plain share-intent links — no SDKs, no scripts, nothing loaded until someone
 * clicks. The URL shared is the registry's canonical, not window.location, so a
 * share from a staging host still points at the live post.
 */
export function BlogShare({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url)
  const links = [
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, Icon: WhatsAppIcon },
    { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
  ]

  return (
    <div className="flex items-center gap-[12px]">
      <p className="font-display text-[22px] leading-[31px] text-primary">Share:</p>
      <ul className="flex gap-[10px]">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-10 bg-accent text-white transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon className="h-[16px] w-[16px]" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
