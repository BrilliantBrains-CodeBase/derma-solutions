/**
 * GTM's dataLayer (loaded site-wide by src/layout/Tracking.tsx). Tags, triggers
 * and conversions are configured in the GTM container, not here — this only
 * hands it events. SSR-safe: a no-op during prerender.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function pushEvent(event: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  ;(window.dataLayer ||= []).push(event)
}

/**
 * Set by AppointmentForm just before it navigates to /thank-you/, read and
 * cleared there — so the conversion fires once per real submission, never on a
 * reload or a direct visit.
 */
export const LEAD_FLAG = 'lead_submitted'
