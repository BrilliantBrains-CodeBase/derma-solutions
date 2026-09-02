# Tracking & Analytics Inventory

Captured 2026-09-02. **Verified in a real browser**, not just parsed from HTML — FlyingPress
delays all JS until first user interaction, so a static scrape does NOT reveal what actually fires.
These IDs were confirmed by driving Chromium and recording network traffic after scroll/keypress.

## IDs to re-install on the new site

| Tag | ID | Notes |
|---|---|---|
| Google Tag Manager | **GTM-PWVJVRQ** | Present in static HTML on all 92 pages. The container is the parent of everything below. |
| Google Analytics 4 | **G-3KNBG0VTG0** | **Loaded via GTM, NOT hardcoded in the page.** Invisible to static scraping. |
| Facebook Pixel | **1327906075791898** | `fbq('init', …)`; `fbevents.js` confirmed loading. |
| Google Ads / remarketing | via `stats.g.doubleclick.net` | Fires under the same GA4 ID; confirms an Ads link is live. |

## Endpoints observed after interaction

```
https://www.googletagmanager.com/gtm.js?id=GTM-PWVJVRQ
https://www.googletagmanager.com/gtag/js?id=G-3KNBG0VTG0
https://analytics.google.com/g/collect?tid=G-3KNBG0VTG0
https://stats.g.doubleclick.net/g/collect?tid=G-3KNBG0VTG0
https://connect.facebook.net/en_US/fbevents.js
```

## Migration checklist

- [ ] Re-install **GTM-PWVJVRQ** site-wide before launch — everything else is configured inside it.
- [ ] Confirm GA4 **G-3KNBG0VTG0** still receives `page_view` on the new site (do not create a new property; a new ID resets all historical comparison).
- [ ] Re-install Facebook Pixel **1327906075791898**.
- [ ] Re-verify the Google Ads link so remarketing audiences keep populating.
- [ ] Export GTM container config from the GTM UI **before** the rebuild — tags, triggers and
      variables live in Google's console, not in this backup, and cannot be recovered from the site.
- [ ] Verify conversion triggers (form submits, "Call" button clicks) still fire — the button
      selectors they depend on will change when the markup is rebuilt. **This is the most
      commonly broken thing in a site migration.**

> **Not recoverable from this backup:** the GTM container's internal configuration, GA4 property
> settings, audiences and conversion definitions. Export those from their own consoles separately.
