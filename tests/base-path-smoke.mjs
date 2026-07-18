import { chromium } from 'playwright'

const baseUrl = process.env.PAGES_BASE_URL
if (!baseUrl) throw new Error('PAGES_BASE_URL is required')
const expectedBasePath = new URL(baseUrl).pathname.replace(/\/$/, '')

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text())
})
page.on('pageerror', (error) => errors.push(error.message))

try {
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.getByText('Paper Timeline').waitFor()

  await page.getByRole('link', { name: 'Relations', exact: true }).click()
  await page.getByRole('heading', { name: 'Research relations' }).waitFor()
  if (!page.url().includes(`${expectedBasePath}/relations`)) throw new Error(`Unexpected Relations URL: ${page.url()}`)

  await page.getByRole('link', { name: 'Papers', exact: true }).click()
  await page.getByRole('heading', { name: 'Paper index' }).waitFor()
  const aelRow = page.locator('tr').filter({ hasText: 'Algorithm Evolution Using Large Language Model' })
  await aelRow.locator('a').first().click()
  await page.getByRole('heading', { name: 'Algorithm Evolution Using Large Language Model' }).waitFor()
  await page.locator('.paper-note img').first().waitFor({ state: 'visible' })
  await page.waitForFunction(() => {
    const image = document.querySelector('.paper-note img')
    return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0
  })
  if (errors.length > 0) throw new Error(`Console errors: ${errors.join(' | ')}`)
  console.log('GitHub Pages base-path smoke passed: Timeline → Relations → Papers → AEL detail + image.')
} finally {
  await browser.close()
}
