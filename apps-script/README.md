# Lead capture: Google Apps Script

`Code.gs` receives every appointment form on the site (the homepage, `/about-us/` and `/book-appointment/`). For each lead it:
- appends a row to a Google Sheet
- emails the clinic

## Deploy (first time)

1. **Create the sheet** in the Google account that should own the leads. Copy its ID from the URL: `docs.google.com/spreadsheets/d/<SHEET_ID>/edit`.
2. **Create the script project.** Go to <https://script.google.com> → **New project**. Replace `Code.gs` with this folder's `Code.gs`.
3. **Set `CONFIG`** at the top of the file:
   - `SHEET_ID`: the sheet's ID from step 1.
   - `NOTIFY_EMAILS`: the clinic's addresses, separated by commas.
4. **Authorise.** Select `testDoPost` in the function dropdown and click **Run**. Approve the Sheets and Gmail permissions. You should see:
   - a `Leads` tab with a bold header row and one test row, which you can delete
   - an email in the inbox
5. **Deploy.** Go to **Deploy → New deployment → Web app** and set:
   - **Execute as:** Me
   - **Who has access:** Anyone

   Copy the **Web app URL**, which ends in `/exec`.
6. **Connect the site.** Paste the URL into `homeAppointment.endpoint` in `src/config/site.ts`, then rebuild and deploy the site. Until the endpoint is set, the form shows "Online booking is not live yet" and doesn't redirect.

Check the deployment by opening the `/exec` URL in a browser. It should print `ok`.

## Updating the script

Edit `Code.gs` here first, then paste it into the editor. Next go to **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The URL stays the same.

"New deployment" creates a new URL, and the site would keep posting to the old one.

## Adding a field

1. Add the field to `homeAppointment.fields` in `src/config/site.ts`.
2. Append a `[header, name]` pair to `COLUMNS` in `Code.gs`.

Append new columns at the end, never in the middle, so existing rows stay aligned with their headers.

## What each row holds

| Column | Source |
|---|---|
| Timestamp | When the script received the lead, in IST |
| First name … Consent | The form fields |
| Form | `home` (homepage / About band) or `book` (`/book-appointment/`) |
| Page URL, Referrer | The page the form was on, and `document.referrer` |
| utm_*, gclid, fbclid | First-touch values from the visitor's landing URL, kept for the session (`src/lib/attribution.ts`) |

## Spam and safety

- **Honeypot.** A hidden `website` field that people never see. A bot that fills it gets `ok` back and no row is written.
- **Phone check.** A phone number that isn't 10 digits (after removing +91 or a leading 0) is rejected, which filters out direct POSTs that skip the site.
- **Formula injection.** A value starting with `= + - @` is stored as text, so it can't run as a formula.
- **Failures.** If saving a lead fails, the script emails `NOTIFY_EMAILS` with the submitted values, so no lead is lost silently.

## Conversion tracking (GTM)

After a successful submit, the site redirects to `/thank-you/` and pushes this once to the dataLayer:

```js
{ event: 'lead_submit', form: 'home' | 'book' }
```

In the GTM container `GTM-PWVJVRQ`:
1. Create a **Custom Event** trigger on `lead_submit`.
2. Attach tags to it:
   - a **GA4 event** named `generate_lead`, with the parameter `form_id = {{DLV - form}}`
   - **Meta Pixel**: `fbq('track', 'Lead')`
   - the Google Ads conversion, if one is used
3. The site is a single-page app after the first load. Fire the GA4 page view on **History Change** as well as page load.

Firing on the event, not on the page URL, means that reloading `/thank-you/` or opening it directly doesn't count as a conversion.
