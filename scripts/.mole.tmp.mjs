import { chromium } from '/private/tmp/claude-501/-Users-d1-dermasolution/acf5e9d1-e5ab-4002-9edd-eb229b5d8c50/scratchpad/node_modules/playwright/index.mjs'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:4173/mole-removal-treatment-in-bangalore/', { waitUntil: 'networkidle' })
const frame = page.locator('.group\\/compare')
await frame.screenshot({ path: '/private/tmp/claude-501/-Users-d1-dermasolution/acf5e9d1-e5ab-4002-9edd-eb229b5d8c50/scratchpad/mole-50.png' })
await browser.close()
