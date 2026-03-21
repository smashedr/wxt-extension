import { showToast } from '@/composables/useToast.ts'
import { isFirefox, isMobile } from '@/utils/system.ts'

export const defaultOptions = {
  testInput: 'Default Value',
  testNumber: 60,
  siteIcon: true,
  contextMenu: true,
  showUpdate: false,
}

export type Options = typeof defaultOptions & { [key: string]: unknown }

export async function getOptions(): Promise<Options> {
  let { options } = await chrome.storage.sync.get(['options'])
  options = options || {}
  return options as Options
}

// NOTE: Below is ported from VanillaJS

export async function saveOptions(event: Event) /* NOSONAR */ {
  console.debug('saveOptions:', event)
  const options = await getOptions()
  const target = event.target as HTMLInputElement
  let key = target.id
  let value
  if (target.type === 'radio') {
    key = target.name
    const radios = document.getElementsByName(key) as unknown as HTMLInputElement[]
    for (const input of radios) {
      if (input.checked) {
        value = input.id
        break
      }
    }
  } else if (target.type === 'checkbox') {
    value = target.checked
  } else if (target.type === 'number') {
    const number = Number.parseFloat(target.value)
    const toBound = (val: string, fallback: number): number =>
      val != null && val !== '' ? Number.parseFloat(val) : fallback
    if (
      !Number.isNaN(number) &&
      number >= toBound(target.min, -Infinity) &&
      number <= toBound(target.max, Infinity)
    ) {
      // Valid number
      target.value = number.toString()
      value = number
    } else {
      // Invalid number - revert to last saved value
      target.value = String(options[key])
      return
    }
  } else {
    value = target.value
  }
  if (options[key] === value) {
    return console.log(`Value not changed for key: %c${key}`, 'color: Yellow')
  } else if (value !== undefined) {
    options[key] = value
    console.log(`Set %c${key}:`, 'color: Lime', value)
    await chrome.storage.sync.set({ options })
  } else {
    console.warn(`No Value for key: ${key}`)
  }
}

// NOTE: showToast and copySupport should NOT be in this file...
export async function copySupport(event: Event) {
  console.debug('copySupport:', event)
  event.preventDefault()
  const manifest = chrome.runtime.getManifest()
  const permissions = await chrome.permissions.getAll()
  const options = await getOptions()
  const local = await chrome.storage.local.get()

  // options.authToken = options.authToken ? 'Set' : 'NOT SET'

  const result = [
    `${manifest.name} - ${manifest.version}`,
    navigator.userAgent,
    `permissions.origins: ${JSON.stringify(permissions.origins)}`,
    `options: ${JSON.stringify(options)}`,
    `local: ${JSON.stringify(local)}`,
    `isFirefox: ${isFirefox}`,
    `isMobile: ${isMobile}`,
  ]
  const commands = await chrome.commands?.getAll()
  if (commands) {
    result.push(`commands: ${JSON.stringify(commands)}`)
  }
  await navigator.clipboard.writeText(result.join('\n'))
  showToast('Support Information Copied.')
}
