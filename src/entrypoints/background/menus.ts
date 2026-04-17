import { i18n } from '#imports'

const config: chrome.contextMenus.CreateProperties[] = [
  { contexts: ['all'], id: 'openPopup' },
  { contexts: ['all'], id: 'openSidePanel' },
  { contexts: ['all'], id: 'openExtPanel' },
  { contexts: ['all'], id: 'separator' },
  { contexts: ['all'], id: 'openOptions' },
]

const contexts: chrome.contextMenus.CreateProperties[] = config.map((entry) => ({
  ...entry,
  ...(entry.id === 'separator'
    ? { type: 'separator', id: crypto.randomUUID() }
    : { title: i18n.t(`ctx.${entry.id}` as any) }),
}))

export function updateContextMenus(enabled?: boolean) {
  console.debug('%cupdateContextMenus:', `color: ${enabled ? 'Lime' : 'Yellow'}`, enabled)
  if (!chrome.contextMenus) return console.debug('Skipping: chrome.contextMenus')
  chrome.contextMenus.removeAll().then(() => {
    contexts.forEach((item) => {
      if (!enabled) item.contexts = ['action']
      // console.log('item:', item)
      chrome.contextMenus.create(item)
    })
  })
}
