import { defineConfig } from 'wxt'

// NOTE: Icons are also defined in <mata> tags for:
//    popup/index.html
//    sidepanel/index.html

// // NOTE: These are set by auto-icons
// const icons = {
//   16: 'icons/16.png',
//   24: 'icons/24.png',
//   32: 'icons/32.png',
//   48: 'icons/48.png',
//   96: 'icons/96.png',
//   128: 'icons/128.png',
// }

// See https://wxt.dev/api/config.html
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue', '@wxt-dev/i18n/module', '@wxt-dev/auto-icons'],

  autoIcons: {
    enabled: true,
    baseIconPath: 'assets/icon.svg',
    developmentIndicator: false,
    // developmentIndicator: 'overlay',
    sizes: [96, 24], // Dfault: 128, 48, 32, 16
  },

  // https://wxt.dev/guide/essentials/config/auto-imports.html#disabling-auto-imports
  // imports: false,

  // https://wxt.dev/guide/essentials/config/manifest.html
  manifest: ({ browser, mode }) => {
    const isFirefox = browser === 'firefox'
    const isDev = mode === 'development'
    console.log(`isDev: ${isDev} - isFirefox: ${isFirefox}`)

    return {
      // icons, // @wxt-dev/auto-icons
      default_locale: 'en',
      name: '__MSG_name__',
      short_name: '__MSG_short_name__',
      description: '__MSG_description__',
      homepage_url: 'https://github.com/smashedr/wxt-extension',

      permissions: ['contextMenus', 'storage'],
      host_permissions: ['*://*/*'],

      // // NOTE: This is set in options/index.html <meta>
      // options_ui: {
      //   page: 'options.html',
      //   open_in_tab: true,
      // },

      // // NOTE: This is set in popup/index.html <meta>
      // action: {
      //   default_icon: {
      //     16: 'icons/16.png',
      //     24: 'icons/24.png',
      //     32: 'icons/32.png',
      //     48: 'icons/48.png',
      //     96: 'icons/96.png',
      //     128: 'icons/128.png',
      //   },
      // },

      // // NOTE: This will not be stripped in future WXT versions...
      // // NOTE: Moved to hook build:manifestGenerated to use auto-icons
      // page_action: {
      //   default_popup: 'popup.html',
      //   default_icon: icons,
      //   show_matches: ['*://*/*'],
      // },

      commands: {
        _execute_action: {
          description: '__MSG_cmd_executeAction__',
          suggested_key: { default: 'Alt+Shift+A' },
        },
        openSidePanel: {
          description: '__MSG_cmd_openSidePanel__',
          suggested_key: { default: 'Alt+Shift+P' },
        },
        openExtPanel: {
          description: '__MSG_cmd_openExtPanel__',
          ...(!isDev && { suggested_key: { default: 'Alt+Shift+W' } }),
        },
        openOptions: {
          description: '__MSG_cmd_openOptions__',
          suggested_key: { default: 'Alt+Shift+O' },
        },
      },

      ...(isFirefox
        ? {
            browser_specific_settings: {
              gecko: {
                id: 'wxt-extension@cssnr.com',
                strict_min_version: '112.0', // manifest - background.type
                data_collection_permissions: { required: ['none'] },
                update_url:
                  'https://raw.githubusercontent.com/smashedr/wxt-extension/master/update.json',
              },
              gecko_android: { strict_min_version: '120.0' }, // permissions.request
            },
          }
        : { minimum_chrome_version: '127' }), // chrome.action.openPopup
    }
  },

  // https://wxt.dev/guide/essentials/config/browser-startup.html
  // NOTE: Override with web-ext.config.ts
  webExt: {
    disabled: true,
  },

  // https://wxt.dev/guide/essentials/config/hooks
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      console.log('wxt.config.browser', wxt.config.browser)
      if (wxt.config.browser === 'firefox') {
        // NOTE: This will not be stripped in future WXT versions...
        manifest.page_action = {
          default_popup: 'popup.html',
          default_icon: manifest.icons,
          show_matches: ['*://*/*'],
        }
      }
    },
  },

  // https://wxt.dev/guide/essentials/config/vite.html
  vite: () => ({
    // NOTE: This silences bootstrap deprecation warnings
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: [
            'import',
            'color-functions',
            'global-builtin',
            'if-function',
          ],
        },
      },
    },
  }),
})
