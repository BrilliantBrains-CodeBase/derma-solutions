import type { ReactNode } from 'react'
import { assets, hours, treatmentPage } from '@/config/site'
import { OpenHoursIcon } from '@/components/icons'

/**
 * Built to theme-reference/04-sections/04-opening-hours/ — the sidebar card a
 * Glowix inner page closes with: a 383x468 photograph with its text on a brown
 * fade at the foot, radius 20. Measured off
 * 07-screenshots/desktop/services__botox-and-dermal-fillers.png.
 *
 * Shared by the treatment sidebar and the blog's. The treatment pages render it
 * as the reference has it; the blog passes `action`, a button under the hours,
 * because a 4,000-word article otherwise offers no way to act on what it says.
 *
 * Departures from the reference:
 *
 *  - The blog uses the clinic's own reception (assets.clinicPhoto), not the
 *    theme's stock sidebar-cta-bg.jpg. Treatment pages pass their own relevant
 *    portrait artwork from WorkDrive-6.
 *  - Below lg the card gives up its portrait ratio: at full mobile width a
 *    383:468 photo is most of a screen of nothing but a reception desk.
 */
interface SidebarCardImage {
  src: string
  alt: string
  width: number
  height: number
}

const defaultImage: SidebarCardImage = {
  src: assets.clinicPhoto,
  alt: assets.clinicPhotoAlt,
  width: 1600,
  height: 1200,
}

export function SidebarHoursCard({
  action,
  image = defaultImage,
}: {
  action?: ReactNode
  image?: SidebarCardImage
}) {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-card lg:min-h-0 lg:aspect-[383/468]">
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-primary via-primary/55 to-primary/5" />

      <div className="absolute inset-x-[30px] bottom-[30px] text-white">
        <div className="flex items-start gap-[16px]">
          <OpenHoursIcon className="h-[40px] w-[40px] shrink-0" />
          <div>
            <h2 className="font-display text-[20px] leading-[26px] text-white">{treatmentPage.hoursHeading}</h2>
            <p className="mt-[10px] font-sans text-[16px] leading-[26px] font-semibold">
              {hours.display}
              <br />
              {hours.displayHeading}
            </p>
          </div>
        </div>

        {action && <div className="mt-[24px]">{action}</div>}
      </div>
    </div>
  )
}
