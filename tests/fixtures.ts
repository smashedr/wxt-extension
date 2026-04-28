import path from 'path'
import { test as base, chromium, type BrowserContext } from '@playwright/test'

export const test = base.extend<{
  context: BrowserContext
  extensionId: string
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => /* NOSONAR */ {
    const pathToExtension = path.join(process.cwd(), '.output/chrome-mv3')
    console.log('pathToExtension:', pathToExtension)
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    })
    await use(context)
    await context.close()
  },
  extensionId: async ({ context }, use) => {
    // for manifest v3:
    let [serviceWorker] = context.serviceWorkers()
    console.log('serviceWorker:', serviceWorker?.url())
    if (!serviceWorker) serviceWorker = await context.waitForEvent('serviceworker')
    console.log('serviceWorker:', serviceWorker?.url())

    const extensionId = serviceWorker.url().split('/')[2]
    console.log('extensionId:', extensionId)
    await use(extensionId)
  },
})

export const expect = test.expect
