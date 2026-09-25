/**
 * First-touch ad attribution for the lead form.
 *
 * utm_* / gclid / fbclid arrive on the landing URL, but the visitor usually
 * books from another page — the query string is gone by then. RootLayout calls
 * captureAttribution() on mount, which keeps the first set seen this session;
 * AppointmentForm reads it back into the POST body, and the Apps Script writes
 * it to the sheet (apps-script/Code.gs, COLUMNS).
 *
 * sessionStorage can be missing or throw (private mode, blocked site data), so
 * every access is guarded and a failure only means a row without attribution.
 */

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']
const STORAGE_KEY = 'ds_attribution'

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const found = Object.fromEntries(
      KEYS.flatMap(key => {
        const value = params.get(key)
        return value ? [[key, value]] : []
      }),
    )
    if (Object.keys(found).length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found))
  } catch {
    /* no storage: nothing to keep */
  }
}

export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}
