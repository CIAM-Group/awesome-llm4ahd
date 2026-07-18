import fs from 'node:fs/promises'
import { chromium } from 'playwright'

const baseUrl = process.env.VISUAL_BASE_URL ?? 'http://127.0.0.1:4173'
const outputDirectory = 'artifacts/screenshots'
await fs.mkdir(outputDirectory, { recursive: true })

const browser = await chromium.launch({ headless: true })
const failures = []

async function auditPage(page, route, expectedText, screenshotName, fullPage = false) {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
  await page.locator('body').waitFor({ state: 'visible' })
  await page.evaluate(() => document.fonts.ready)
  const bodyText = await page.locator('body').innerText()
  if (!bodyText.includes(expectedText)) failures.push(`${route}: missing expected text “${expectedText}”`)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  if (overflow > 2) failures.push(`${route}: horizontal overflow of ${overflow}px`)
  if (errors.length > 0) failures.push(`${route}: console errors: ${errors.join(' | ')}`)
  await page.screenshot({ path: `${outputDirectory}/${screenshotName}.png`, fullPage })
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
  await auditPage(desktop, '/', 'Paper Timeline', 'timeline-desktop')
  await desktop.locator('#year-2025').scrollIntoViewIfNeeded()
  await desktop.screenshot({ path: `${outputDirectory}/timeline-2025-desktop.png` })

  await auditPage(desktop, '/relations', 'Research relations', 'relations-desktop')
  await desktop.locator('.relation-graph').scrollIntoViewIfNeeded()
  await desktop.waitForTimeout(1800)
  const graphPixels = await desktop.locator('.relation-graph canvas').evaluate((canvas) => {
    const context = canvas.getContext('2d')
    if (!context) return 0
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data
    let changed = 0
    for (let offset = 0; offset < data.length; offset += 400) {
      if (Math.abs(data[offset] - 237) > 5 || Math.abs(data[offset + 1] - 241) > 5 || Math.abs(data[offset + 2] - 238) > 5) changed += 1
    }
    return changed
  })
  if (graphPixels < 20) failures.push(`/relations: graph canvas appears blank (${graphPixels} sampled pixels changed)`)

  const graphCanvas = desktop.locator('.relation-graph canvas')
  const hoverPoint = await graphCanvas.evaluate((canvas) => {
    const context = canvas.getContext('2d')
    if (!context) return null
    const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height)
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const offset = (y * width + x) * 4
        if (Math.abs(data[offset] - 49) < 8 && Math.abs(data[offset + 1] - 95) < 8 && Math.abs(data[offset + 2] - 88) < 8) return { x, y }
      }
    }
    return null
  })
  if (!hoverPoint) {
    failures.push('/relations: could not locate a graph node for hover stability check')
  } else {
    const canvasBox = await graphCanvas.boundingBox()
    const canvasHash = () => graphCanvas.evaluate((canvas) => {
      const context = canvas.getContext('2d')
      if (!context) return 0
      const data = context.getImageData(0, 0, canvas.width, canvas.height).data
      let hash = 2166136261
      for (let offset = 0; offset < data.length; offset += 4) {
        hash = Math.imul(hash ^ data[offset], 16777619)
        hash = Math.imul(hash ^ data[offset + 1], 16777619)
        hash = Math.imul(hash ^ data[offset + 2], 16777619)
      }
      return hash >>> 0
    })
    const beforeHover = await canvasHash()
    if (canvasBox) await desktop.mouse.move(canvasBox.x + hoverPoint.x, canvasBox.y + hoverPoint.y)
    await desktop.waitForTimeout(250)
    const afterHover = await canvasHash()
    if (beforeHover !== afterHover) failures.push('/relations: graph layout changed when hovering a node')
  }
  await desktop.screenshot({ path: `${outputDirectory}/relations-settled-desktop.png` })

  await auditPage(desktop, '/papers', 'Paper index', 'papers-desktop')
  await auditPage(desktop, '/papers/ael', 'Algorithm Evolution Using Large Language Model', 'ael-detail-desktop')
  const paperImageLoaded = await desktop.locator('.paper-note img').first().evaluate((image) => image.complete && image.naturalWidth > 0)
  if (!paperImageLoaded) failures.push('/papers/ael: paper image failed to load')

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
  await auditPage(mobile, '/', 'Paper Timeline', 'timeline-mobile')
  await mobile.locator('#year-2024').scrollIntoViewIfNeeded()
  await mobile.screenshot({ path: `${outputDirectory}/timeline-2024-mobile.png` })
  await auditPage(mobile, '/relations', 'Research relations', 'relations-mobile')
  await mobile.locator('.relation-graph').scrollIntoViewIfNeeded()
  await mobile.waitForTimeout(1200)
  await mobile.screenshot({ path: `${outputDirectory}/relations-graph-mobile.png` })
  await auditPage(mobile, '/papers', 'Paper index', 'papers-mobile')
  await auditPage(mobile, '/papers/ael', 'Why it matters', 'ael-detail-mobile')

  if (failures.length > 0) {
    throw new Error(failures.join('\n'))
  }
  console.log('Visual smoke passed: 4 routes, desktop/mobile overflow, paper image, and relation canvas.')
} finally {
  await browser.close()
}
