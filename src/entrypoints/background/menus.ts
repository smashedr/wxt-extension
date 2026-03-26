const contexts: chrome.contextMenus.CreateProperties[] = [
  { contexts: ['all'], id: 'openPopup', title: 'Open Popup' },
  { contexts: ['all'], id: 'openSidePanel', title: 'Open Side Panel' },
  { contexts: ['all'], id: 'openExtPanel', title: 'Open Extension Panel' },
  { contexts: ['all'], id: 'separator1', type: 'separator' },
  { contexts: ['all'], id: 'openOptions', title: 'Open Options' },
]

export function createContextMenus() {
  console.debug('createContextMenus')
  if (!chrome.contextMenus) {
    return console.debug('Skipping: chrome.contextMenus')
  }
  chrome.contextMenus.removeAll().then(() => {
    contexts.forEach((item) => chrome.contextMenus.create(item))
  })
}
