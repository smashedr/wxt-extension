<script setup lang="ts">
import { i18n } from '#imports'
import { onMounted, ref } from 'vue'
import { getOptions } from '@/utils/options.ts'

chrome.storage.sync.onChanged.addListener(onChanged)

window.addEventListener('keydown', handleKeyboard)

const showIcon = ref(false)
const showPopup = ref(false)

const togglePopup = () => (showPopup.value = !showPopup.value)
const toggleIcon = () => {
  showIcon.value = !showIcon.value
  if (!showIcon.value) showPopup.value = false
}

async function onChanged(changes: Record<string, any>) {
  console.debug('content/index.ts - onChanged:', changes)
  const items = changes.options // NOTE: Lazy Typing... in changes
  console.debug('items:', items)
  if (items?.oldValue.siteIcon !== items?.newValue.siteIcon) {
    showIcon.value = items.newValue.siteIcon
  }
}

function handleKeyboard(e: KeyboardEvent) {
  // console.debug('handleKeyboard:', e)
  const target = e.target as HTMLInputElement
  if (['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(target?.tagName)) return
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.repeat) return
  if (e.key.length !== 1 || e.key === ' ') return
  if (['KeyT'].includes(e.code)) {
    console.log('Pressed T')
    toggleIcon()
  } else if (['KeyE'].includes(e.code)) {
    console.log('Pressed E')
    chrome.runtime.sendMessage('openPopup')
  } else if (['KeyH'].includes(e.code)) {
    console.log('Pressed H')
    const manifest = chrome.runtime.getManifest()
    console.debug('homepage_url:', manifest.homepage_url)
    if (manifest.homepage_url) navigateTo(manifest.homepage_url)
  }
}

function navigateTo(url: string): void {
  if (window.location.href === url) return
  const a = document.createElement('a')
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

onMounted(() => {
  // console.debug('onMounted')
  getOptions().then((options) => {
    // console.debug('options:', options)
    if (options.siteIcon) toggleIcon()
  })
})
</script>

<template>
  <div class="popup-container">
    <div v-show="showPopup" class="popup-content">
      <p>
        {{ i18n.t('content.press') }} <b>{{ i18n.t('content.key.toggle') }}</b> {{ i18n.t('content.toggle') }}
      </p>
    </div>
    <button v-show="showIcon" class="toggle-button" @click="togglePopup()">
      <img src="@/assets/icon.svg" alt="T" class="button-icon" />
    </button>
  </div>
</template>

<style scoped>
.popup-container {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 1.25rem;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  font-family: ui-sans-serif, system-ui, sans-serif;
  user-select: none;
  line-height: 1em;
}

.popup-content {
  background-color: white;
  color: #1f2937;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: max-content;
  height: min-content;
  padding: 0.5rem 1rem;
  margin: auto 0.5rem 0 0;
  transition: opacity 300ms;
}

.toggle-button {
  display: flex;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  /*box-shadow:*/
  /*  0 1px 3px 0 rgb(0 0 0 / 0.1),*/
  /*  0 1px 2px -1px rgb(0 0 0 / 0.1);*/
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.toggle-button:hover {
  background-color: #34495e;
}

.button-icon {
  padding: 4px;
}
</style>
