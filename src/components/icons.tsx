/**
 * Inline SVG icons.
 *
 * The Glowix reference draws these with Font Awesome, loaded as a webfont by
 * ElementsKit. Inlining the same shapes keeps the artwork without adding a
 * ~75KB font request to every page, and lets them inherit `currentColor` so a
 * parent's text colour is the only thing that has to set them.
 *
 * Every icon is decorative: it always sits next to a real text label, so all of
 * them are aria-hidden and non-focusable.
 */

type IconProps = { className?: string }

const base = {
  'aria-hidden': true,
  focusable: 'false',
  xmlns: 'http://www.w3.org/2000/svg',
} as const

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.6.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.322a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
    </svg>
  )
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
    </svg>
  )
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  )
}

/** The header's dropdown indicator — the reference's `icon-down-arrow1`. */
export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 5.5 5 5 5-5" />
    </svg>
  )
}

/** The mobile menu trigger — the reference's `icon-menu-11`. */
export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M2.5 4h11M2.5 8h11M2.5 12h11" />
    </svg>
  )
}

/** Closes the mobile panel. The reference renders a literal "X" here. */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  )
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M10.5 8.5h-2V15H6V8.5H4.5v-2H6V5.2C6 3.5 6.9 2.3 9 2.3c.6 0 1.2.06 1.7.13V4.3H9.8c-.8 0-1.3.4-1.3 1.1v1.1h2.2z" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.4c2.14 0 2.39.01 3.23.05.78.03 1.2.16 1.49.27.37.15.64.32.92.6s.45.55.6.92c.11.29.24.71.27 1.49.04.84.05 1.09.05 3.23s-.01 2.39-.05 3.23c-.03.78-.16 1.2-.27 1.49-.15.37-.32.64-.6.92s-.55.45-.92.6c-.29.11-.71.24-1.49.27-.84.04-1.09.05-3.23.05s-2.39-.01-3.23-.05c-.78-.03-1.2-.16-1.49-.27a2.5 2.5 0 0 1-.92-.6 2.5 2.5 0 0 1-.6-.92c-.11-.29-.24-.71-.27-1.49C1.41 10.39 1.4 10.14 1.4 8s.01-2.39.05-3.23c.03-.78.16-1.2.27-1.49.15-.37.32-.64.6-.92s.55-.45.92-.6c.29-.11.71-.24 1.49-.27C5.61 1.41 5.86 1.4 8 1.4m0 3.21a3.39 3.39 0 1 0 0 6.78 3.39 3.39 0 0 0 0-6.78m0 5.59a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4m4.32-5.72a.79.79 0 1 1-1.58 0 .79.79 0 0 1 1.58 0" />
    </svg>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.1 13.4H1.8V6.1h2.3zM2.94 5.1a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7m11.16 8.3h-2.3V9.85c0-.85-.02-1.94-1.18-1.94-1.19 0-1.37.92-1.37 1.88v3.61H6.96V6.1h2.2v1h.03c.31-.58 1.06-1.2 2.18-1.2 2.33 0 2.76 1.54 2.76 3.53z" />
    </svg>
  )
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M15.2 4.83a1.89 1.89 0 0 0-1.33-1.34C12.7 3.17 8 3.17 8 3.17s-4.7 0-5.87.32A1.89 1.89 0 0 0 .8 4.83C.48 6 .48 8 .48 8s0 2 .32 3.17a1.89 1.89 0 0 0 1.33 1.34c1.17.32 5.87.32 5.87.32s4.7 0 5.87-.32a1.89 1.89 0 0 0 1.33-1.34C15.52 10 15.52 8 15.52 8s0-2-.32-3.17M6.53 10.28V5.72L10.4 8z" />
    </svg>
  )
}

/** Social profile name (as spelled in site.ts `socialProfiles`) -> its icon. */
export const socialIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
}
