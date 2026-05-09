import { getAppConfig } from '#imports'
import { isFirefox } from '@/utils/system.ts'
import { debug } from '@/utils/logger.ts'
import { defineBackground } from 'wxt/utils/define-background'
import { openExtPanel, openPopup, openSidePanel } from '@/utils/extension.ts'
import { type Options, defaultOptions, getOptions } from '@/utils/options.ts'
import { updateContextMenus } from './menus.ts'

const config = getAppConfig()
const banner = `%c    __     __
   /  |   |  \\   %c${config.name}%c
 __|   '-'   |__   %cv${config.version}%c
/               \\
\\__           __/
   |   .-.   |
   \\__|   |__/
%c${config.homepageUrl}`

export default defineBackground(() => {
  // console.log(`Loaded: %c${chrome.runtime.id}`, 'Color: Cyan')
  console.log(
    banner,
    'color: MediumSeaGreen',
    'color: LightGreen',
    'color: MediumSeaGreen',
    'color: SteelBlue',
    'color: MediumSeaGreen',
    'color: MediumSlateBlue',
  )

  if (import.meta.env.DEV) {
    console.log('%c --- DEV MODE ENABLED ---', 'color: Tomato')
  }

  chrome.runtime.onInstalled.addListener(onInstalled)
  chrome.runtime.onStartup.addListener(onStartup)
  chrome.storage.sync.onChanged.addListener(onChanged)
  chrome.runtime.onMessage.addListener(onMessage)
  chrome.commands?.onCommand.addListener(onCommand)
  chrome.contextMenus?.onClicked.addListener(onClicked)
})

async function onInstalled(details: chrome.runtime.InstalledDetails) {
  console.log('onInstalled:', details)

  const options = await setDefaultOptions(defaultOptions)
  debug('options:', options)
  updateContextMenus(options.contextMenu).catch(console.warn)
  setUninstall().catch(console.warn)

  const manifest = chrome.runtime.getManifest()
  debug('manifest:', manifest)

  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // NOTE: origins are also defined in components/PermsCheck.vue
    const hasPerms = await chrome.permissions.contains({
      origins: manifest.host_permissions,
    })
    debug('hasPerms:', hasPerms)
    if (hasPerms) {
      await chrome.runtime.openOptionsPage()
    } else {
      const url = chrome.runtime.getURL('permissions.html')
      await chrome.tabs.create({ active: true, url })
    }
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    if (options.showUpdate && manifest.version !== details.previousVersion) {
      const url = `${manifest.homepage_url}/releases/tag/${manifest.version}`
      await chrome.tabs.create({ active: false, url })
    }
  }
}

async function onStartup() {
  debug('onStartup')
  if (isFirefox) {
    debug('Firefox Startup Workarounds')
    // NOTE: Confirm these checks are still necessary...
    const options = await getOptions()
    debug('options:', options)
    updateContextMenus(options.contextMenu).catch(console.warn)
    setUninstall().catch(console.warn)
  }
}

function onChanged(changes: Record<string, chrome.storage.StorageChange>) {
  // debug('background/index.ts - onChanged:', changes)
  if (changes?.options) {
    const oldValue = changes.options?.oldValue as Options | undefined
    const newValue = changes.options?.newValue as Options | undefined
    // if (!oldValue || !newValue) return debug('missing oldValue or newValue')
    if (!oldValue) return debug('onChanged: missing options oldValue')
    if (!newValue) return console.warn('onChanged: missing options newValue')

    if (oldValue?.contextMenu !== newValue.contextMenu) {
      updateContextMenus(newValue.contextMenu).catch(console.warn)
    }
  }
}

function onMessage(
  message: any,
  _sender: chrome.runtime.MessageSender, // eslint-disable-line
  _sendResponse: Function, // eslint-disable-line
) {
  debug('onMessage:', message)
  if (message === 'openPopup') {
    openPopup().catch((e) => console.log(e))
  }
}

async function onCommand(command: string, tab?: chrome.tabs.Tab) {
  debug('onCommand:', command, tab)
  if (command === 'openOptions') {
    await chrome.runtime.openOptionsPage()
  } else if (command === 'openExtPanel') {
    await openExtPanel()
  } else if (command === 'openSidePanel') {
    openSidePanel()
  } else {
    console.warn(`Unknown Command: ${command}`)
  }
}

async function onClicked(ctx: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) {
  debug('onClicked:', ctx, tab)
  if (ctx.menuItemId === 'openOptions') {
    await chrome.runtime.openOptionsPage()
  } else if (ctx.menuItemId === 'openPopup') {
    await openPopup()
  } else if (ctx.menuItemId === 'openExtPanel') {
    await openExtPanel()
  } else if (ctx.menuItemId === 'openSidePanel') {
    openSidePanel()
  } else {
    console.error(`Unknown ctx.menuItemId: ${ctx.menuItemId}`)
  }
}

async function setDefaultOptions(defaultOptions: object) {
  debug('setDefaultOptions', defaultOptions)
  const options = await getOptions()
  let changed = false
  for (const [key, value] of Object.entries(defaultOptions)) {
    // debug(`${key}: default: ${value} current: ${options[key]}`)
    if (options[key] === undefined) {
      changed = true
      options[key] = value
      debug(`Set ${key}:`, value)
    }
  }
  if (changed) {
    await chrome.storage.sync.set({ options })
    debug('changed options:', options)
  }
  return options
}

async function setUninstall() {
  // NOTE: Calling this setUninstallURL and using getAppConfig breaks WXT
  const url = new URL(config.uninstallUrl)
  url.searchParams.append('version', config.version)
  url.searchParams.append('id', chrome.runtime.id)
  debug('setUninstallURL:', url.href)
  await chrome.runtime.setUninstallURL(url.href)
}
