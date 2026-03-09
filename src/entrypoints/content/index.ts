import { createApp } from 'vue'
import App from './views/App.vue'

console.log('%c github-extension: content/index.ts', 'color: Khaki')

/**
 * Mount the Vue app to the DOM.
 */
function mountApp() {
  const container = document.createElement('div')
  container.id = 'content-app'
  document.body.appendChild(container)
  const app = createApp(App)
  app.mount(container)
}

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    console.log('Hello content.')
    mountApp()
  },
})
