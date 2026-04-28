// noinspection JSUnusedGlobalSymbols

declare namespace chrome.scripting {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface InjectionResult<T> {
    error?: unknown
  }
}

declare namespace chrome.sidebarAction {
  function open(): void
}

declare namespace chrome.topSites {
  interface MostVisitedURL {
    favicon?: string
  }
}
declare namespace browser.topSites {
  type MostVisitedURL = chrome.topSites.MostVisitedURL
}
