import { defineContentScript } from 'wxt/utils/define-content-script'
import { createIntegratedUi } from 'wxt/utils/content-script-ui/integrated'
import { createApp } from 'vue'
import App from './App.vue'

export default defineContentScript({
  matches: ['*://*/*'],

  main(ctx) {
    console.log(`%c ${chrome.runtime.id} - Loaded: content/index.ts`, 'color: Lime', ctx)
    // noinspection JSUnusedGlobalSymbols
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        const app = createApp(App)
        app.mount(container)
        return app
      },
      onRemove: (app) => {
        app?.unmount()
      },
    })
    ui.mount()
  },
})
