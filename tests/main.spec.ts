import { test, expect } from './fixtures.ts'

// test('example test', async ({ page }) => {
//   await page.goto('https://example.com')
//   await expect(page.locator('body')).toHaveText('Changed by my-extension')
// })

test('popup page', async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`)

  await expect(page.locator('.version')).toHaveText('0.0.0')

  await page.locator('#bs-theme-dropdown').click()
  await page.locator('button[data-bs-theme-value="dark"]').click()

  await page.screenshot({ path: 'tests/screenshots/screenshot.png' })

  // const locator = page.locator('#siteIcon')
  // await expect(locator).toBeChecked()
  // await locator.click()
  // await expect(locator).not.toBeChecked()
})
