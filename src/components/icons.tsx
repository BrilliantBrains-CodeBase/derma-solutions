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

/**
 * The solid diagonal arrow in the hero's CTA circle. Path lifted verbatim from
 * the reference's own markup (04-sections/07-.../structure.html) — the stroked
 * ArrowUpRightIcon above reads visibly lighter than this at the same size.
 */
export function ArrowDiagonalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 15 15" fill="currentColor">
      <path d="M12.157 4.14171L1.7154 14.5833L0 12.8679L10.4404 2.42631H1.23863V0H14.5833V13.3447H12.157V4.14171Z" />
    </svg>
  )
}

/** The hero rating strip's star. */
export function StarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.2l2.06 4.18 4.61.67-3.34 3.25.79 4.6L8 11.72l-4.12 2.17.79-4.6L1.33 6.05l4.61-.67z" />
    </svg>
  )
}

/**
 * The theme's four-petal mark. Path lifted verbatim from the reference's own
 * about-us-image-bg-shape.svg (06-assets/icons/2025-04-...), with its hard-coded
 * #CD5F37 dropped so the fill follows the parent's text colour.
 *
 * It does triple duty in the About band: the eyebrow's mark, the decorative
 * shape behind the photographs, and the disc at the centre of the year badge.
 */
export function CloverIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 76 77" fill="currentColor">
      <path d="M39.4455 33.442C38.6116 34.149 37.3886 34.149 36.5547 33.442C28.6519 26.7427 24.5884 20.2412 24.5884 13.8546C24.5882 6.44746 30.593 0.442871 38 0.442871C45.407 0.442871 51.4118 6.44746 51.4118 13.8546C51.4118 20.2412 47.3483 26.7427 39.4455 33.442ZM39.4455 43.4437C47.3483 50.143 51.4118 56.6446 51.4118 63.0311C51.4118 70.4383 45.4072 76.4429 38 76.4429C30.5928 76.4429 24.5882 70.4383 24.5882 63.0311C24.5882 56.6446 28.6517 50.143 36.5545 43.4437C37.3886 42.7367 38.6114 42.7367 39.4455 43.4437ZM43.0009 39.8884C42.2939 39.0544 42.2939 37.8315 43.0009 36.9975C49.7003 29.0947 56.2019 25.0312 62.5882 25.0312C69.9954 25.0311 76 31.0357 76 38.4429C76 45.8501 69.9954 51.8546 62.5882 51.8546C56.2017 51.8546 49.7001 47.7912 43.0009 39.8884ZM32.9991 39.8884C26.2997 47.7912 19.7981 51.8546 13.4118 51.8546C6.00459 51.8546 0 45.8501 0 38.4429C0 31.0357 6.00459 25.0311 13.4118 25.0311C19.7983 25.0311 26.2999 29.0946 32.9991 36.9974C33.7061 37.8315 33.7061 39.0543 32.9991 39.8884Z" />
    </svg>
  )
}

/**
 * The About checklist's bullet — the reference's `fas fa-check-square`. Redrawn
 * on a square 16 grid rather than Font Awesome's 448x512 one, so `h-[17px]
 * w-[17px]` cannot squash it. The tick is knocked out of the filled square by
 * the even-odd rule, which is how the original reads at this size.
 */
export function CheckSquareIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M2.5 0h11A2.5 2.5 0 0 1 16 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 13.5v-11A2.5 2.5 0 0 1 2.5 0ZM11.6 4.6 6.75 9.45 4.4 7.1 3.3 8.2l3.45 3.45L12.7 5.7Z"
      />
    </svg>
  )
}

/** The hero's "Watch Video" play circle. */
export function PlayIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M5.5 3.4a.6.6 0 0 1 .92-.5l6.1 4.1a.6.6 0 0 1 0 1l-6.1 4.1a.6.6 0 0 1-.92-.5z" />
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

/**
 * The four pictograms in the How It Works band, in the reference's own order.
 * Paths lifted verbatim from 04-sections/13-simple-steps-to-stunning-
 * transformations/structure.html (steps 02 and 04 are also saved standalone as
 * 06-assets/icons/2025-04-icon-how-work-step-{2,4}.svg), with their hard-coded
 * strokes dropped so they follow the badge's text colour.
 *
 * These are the only stroked icons in the file drawn on the reference's own
 * 34x35 grid rather than a square 16 one. They carry enough detail that
 * redrawing them would change the artwork, and they are always rendered at
 * 28 or 34px, where the off-square aspect is not visible.
 */
const strokeBase = {
  viewBox: '0 0 34 35',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Step 01 — stacked layers. */
export function LayersIcon({ className }: IconProps) {
  return (
    <svg {...base} {...strokeBase} className={className}>
      <path d="M18.1416 17.5134C17.7814 17.6699 17.3928 17.7506 17.0001 17.7506C16.6074 17.7506 16.2189 17.6699 15.8587 17.5134L2.01585 11.102C1.79106 10.9886 1.60216 10.8151 1.47018 10.6007C1.33819 10.3863 1.26831 10.1395 1.26831 9.88773C1.26831 9.63597 1.33819 9.38915 1.47018 9.17476C1.60216 8.96037 1.79106 8.78682 2.01585 8.67345L15.8587 2.21345C16.2189 2.05703 16.6074 1.97632 17.0001 1.97632C17.3928 1.97632 17.7814 2.05703 18.1416 2.21345L31.9844 8.62488C32.2092 8.73825 32.3981 8.9118 32.5301 9.12619C32.6621 9.34058 32.732 9.5874 32.732 9.83916C32.732 10.0909 32.6621 10.3377 32.5301 10.5521C32.3981 10.7665 32.2092 10.9401 31.9844 11.0534L18.1416 17.5134Z" />
      <path d="M32.7858 18.6062L17.9715 25.4305C17.6551 25.5748 17.3114 25.6495 16.9636 25.6495C16.6159 25.6495 16.2722 25.5748 15.9558 25.4305L1.21436 18.6062" />
      <path d="M32.7858 26.4993L17.9715 33.3236C17.6551 33.4679 17.3114 33.5426 16.9636 33.5426C16.6159 33.5426 16.2722 33.4679 15.9558 33.3236L1.21436 26.4993" />
    </svg>
  )
}

/** Step 02 — four circles in a 2x2 grid. */
export function FourCirclesIcon({ className }: IconProps) {
  return (
    <svg {...base} {...strokeBase} className={className}>
      <path d="M7.89244 15.0402C11.5809 15.0402 14.571 12.0501 14.571 8.36168C14.571 4.6732 11.5809 1.68311 7.89244 1.68311C4.20397 1.68311 1.21387 4.6732 1.21387 8.36168C1.21387 12.0501 4.20397 15.0402 7.89244 15.0402Z" />
      <path d="M26.1063 15.0402C29.7948 15.0402 32.7849 12.0501 32.7849 8.36168C32.7849 4.6732 29.7948 1.68311 26.1063 1.68311C22.4178 1.68311 19.4277 4.6732 19.4277 8.36168C19.4277 12.0501 22.4178 15.0402 26.1063 15.0402Z" />
      <path d="M7.89244 33.2545C11.5809 33.2545 14.571 30.2644 14.571 26.5759C14.571 22.8874 11.5809 19.8973 7.89244 19.8973C4.20397 19.8973 1.21387 22.8874 1.21387 26.5759C1.21387 30.2644 4.20397 33.2545 7.89244 33.2545Z" />
      <path d="M26.1063 33.2546C29.7948 33.2546 32.7849 30.2645 32.7849 26.576C32.7849 22.8876 29.7948 19.8975 26.1063 19.8975C22.4178 19.8975 19.4277 22.8876 19.4277 26.576C19.4277 30.2645 22.4178 33.2546 26.1063 33.2546Z" />
    </svg>
  )
}

/** Step 03 — three overlapping circles. */
export function VennIcon({ className }: IconProps) {
  return (
    <svg {...base} {...strokeBase} className={className}>
      <path d="M10.9286 32.1549C16.2937 32.1549 20.6429 27.8057 20.6429 22.4406C20.6429 17.0756 16.2937 12.7263 10.9286 12.7263C5.56359 12.7263 1.21436 17.0756 1.21436 22.4406C1.21436 27.8057 5.56359 32.1549 10.9286 32.1549Z" />
      <path d="M23.0715 32.1549C28.4365 32.1549 32.7857 27.8057 32.7857 22.4406C32.7857 17.0756 28.4365 12.7263 23.0715 12.7263C17.7064 12.7263 13.3572 17.0756 13.3572 22.4406C13.3572 27.8057 17.7064 32.1549 23.0715 32.1549Z" />
      <path d="M17.0002 22.4405C22.3652 22.4405 26.7145 18.0913 26.7145 12.7262C26.7145 7.3612 22.3652 3.01196 17.0002 3.01196C11.6351 3.01196 7.28589 7.3612 7.28589 12.7262C7.28589 18.0913 11.6351 22.4405 17.0002 22.4405Z" />
    </svg>
  )
}

/** Step 04 — a support headset. */
export function HeadsetIcon({ className }: IconProps) {
  return (
    <svg {...base} {...strokeBase} className={className}>
      <path d="M3.64244 14.8644H6.07101C6.39306 14.8644 6.70192 14.9923 6.92964 15.22C7.15736 15.4478 7.2853 15.7566 7.2853 16.0787V22.1501C7.2853 22.4721 7.15736 22.781 6.92964 23.0087C6.70192 23.2364 6.39306 23.3644 6.07101 23.3644H3.64244C2.99834 23.3644 2.38062 23.1085 1.92518 22.6531C1.46973 22.1976 1.21387 21.5799 1.21387 20.9358V17.293C1.21387 16.6489 1.46973 16.0311 1.92518 15.5757C2.38062 15.1202 2.99834 14.8644 3.64244 14.8644V14.8644Z" />
      <path d="M30.3567 23.3644H27.9281C27.6061 23.3644 27.2972 23.2364 27.0695 23.0087C26.8418 22.781 26.7138 22.4721 26.7138 22.1501V16.0787C26.7138 15.7566 26.8418 15.4478 27.0695 15.22C27.2972 14.9923 27.6061 14.8644 27.9281 14.8644H30.3567C31.0008 14.8644 31.6185 15.1202 32.074 15.5757C32.5294 16.0311 32.7853 16.6489 32.7853 17.293V20.9358C32.7853 21.5799 32.5294 22.1976 32.074 22.6531C31.6185 23.1085 31.0008 23.3644 30.3567 23.3644V23.3644Z" />
      <path d="M23.0713 30.043C24.3595 30.043 25.5949 29.5312 26.5058 28.6203C27.4167 27.7094 27.9284 26.474 27.9284 25.1858V23.3644" />
      <path d="M20.035 27.0073C20.8401 27.0073 21.6123 27.3272 22.1816 27.8965C22.7509 28.4658 23.0707 29.2379 23.0707 30.043C23.0707 30.8482 22.7509 31.6203 22.1816 32.1896C21.6123 32.7589 20.8401 33.0788 20.035 33.0788H16.3922C15.587 33.0788 14.8149 32.7589 14.2456 32.1896C13.6763 31.6203 13.3564 30.8482 13.3564 30.043C13.3564 29.2379 13.6763 28.4658 14.2456 27.8965C14.8149 27.3272 15.587 27.0073 16.3922 27.0073H20.035Z" />
      <path d="M6.07129 14.8643V12.4358C6.07129 9.53734 7.22269 6.75761 9.27219 4.70811C11.3217 2.6586 14.1014 1.5072 16.9999 1.5072C19.8983 1.5072 22.678 2.6586 24.7275 4.70811C26.777 6.75761 27.9284 9.53734 27.9284 12.4358V14.8643" />
      <path d="M13.3564 10.0072V13.6501" />
      <path d="M20.6425 10.0072V13.6501" />
      <path d="M13.3564 18.5072C13.3564 21.7372 20.6422 21.7372 20.6422 18.5072" />
    </svg>
  )
}

/**
 * Two more stroked pictograms, for the See the Difference band's counter row.
 * That row's other two tiles reuse VennIcon and FourCirclesIcon above — the
 * reference draws its own counters with the same paths as the How It Works
 * steps, so they are already here.
 *
 * PersonCircleIcon is lifted verbatim from 04-sections/14-our-real-patient-
 * transformation-stunning-res/structure.html and keeps the reference's 51x51
 * grid at stroke 2 rather than being refitted to strokeBase's 34x35 at 1.5.
 * The demo mixes the two grids across its own four tiles for exactly this
 * reason: at the 48px both render to, 2/51 and 1.5/34 come out 1.88px and
 * 2.12px, which is not a visible difference.
 *
 * LaserIcon is new artwork. The reference's fourth counter is a thumbs-up for
 * "Classes Conducted", which describes nothing this clinic counts. It is drawn
 * on strokeBase's grid so it sits beside the two ported icons unaltered: an
 * angled handpiece, the beam, and the treated spot as a ringed point — which keeps it in the set's vocabulary, since every other mark in
 * this row is built from circles.
 */
export function PersonCircleIcon({ className }: IconProps) {
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 51 51"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M25.6799 28.5959C30.611 28.5959 34.6085 24.5985 34.6085 19.6673C34.6085 14.7362 30.611 10.7388 25.6799 10.7388C20.7488 10.7388 16.7513 14.7362 16.7513 19.6673C16.7513 24.5985 20.7488 28.5959 25.6799 28.5959Z" />
      <path d="M10.4298 42.5246C12.0235 39.9086 14.2634 37.7465 16.9341 36.2463C19.6048 34.746 22.6166 33.958 25.6798 33.958C28.743 33.958 31.7548 34.746 34.4255 36.2463C37.0962 37.7465 39.3361 39.9086 40.9298 42.5246" />
      <path d="M25.6799 48.2386C38.5008 48.2386 48.8941 37.8452 48.8941 25.0243C48.8941 12.2034 38.5008 1.81006 25.6799 1.81006C12.859 1.81006 2.46558 12.2034 2.46558 25.0243C2.46558 37.8452 12.859 48.2386 25.6799 48.2386Z" />
    </svg>
  )
}

export function LaserIcon({ className }: IconProps) {
  return (
    <svg {...base} {...strokeBase} className={className}>
      <path d="M9.2 1.8 17.7 10.3 11.3 16.7 2.8 8.2Z" />
      <path d="m16.4 15.4 4 4" />
      <path d="M24.5 20a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z" />
      <path d="M24.5 24.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
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
