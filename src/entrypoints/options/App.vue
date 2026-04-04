<script setup lang="ts">
import { i18n } from '#imports'
import { clickOpen } from '@/utils/extension.ts'
import { useTitle } from '@/composables/useTitle.ts'
import { isFirefox } from '@/utils/system.ts'
import BackToTop from '@/components/BackToTop.vue'
import PermsCheck from '@/components/PermsCheck.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import OptionsForm from '@/components/OptionsForm.vue'
import KeyboardShortcuts from '@/components/KeyboardShortcuts.vue'
import PageFooter from '@/components/PageFooter.vue'
import HorizontalRule from '@/components/HorizontalRule.vue'
import CopySupport from '@/components/CopySupport.vue'

console.debug('%c options/App.vue', 'color: Lime')

const manifest = chrome.runtime.getManifest()

useTitle(i18n.t('options.title'))
</script>

<template>
  <div class="d-flex align-items-center justify-content-center p-1 p-sm-3 h-100 w-100">
    <div class="m-auto pb-4 w-100">
      <div id="options-wrapper" class="glass-outline blur rounded rounded-3 p-2 p-sm-3 m-auto w-100">
        <div class="d-flex flex-row justify-content-center align-items-center">
          <img
            src="@/assets/icon.svg"
            class="me-1"
            height="48"
            width="48"
            :alt="manifest.name"
            :title="manifest.name"
          />
          <div>
            <a
              class="link-body-emphasis text-decoration-none fs-1"
              :title="i18n.t('ui.text.homePage')"
              :href="manifest.homepage_url"
              target="_blank"
              rel="nofollow"
              @click.prevent="clickOpen"
            >
              {{ manifest.name }}</a
            >
            <a
              class="link-body-emphasis text-decoration-none small"
              :title="i18n.t('ui.text.releaseNotes')"
              :href="`${manifest.homepage_url}/releases/tag/${manifest.version}`"
              target="_blank"
              rel="nofollow"
              @click.prevent="clickOpen"
            >
              v<span class="version">{{ manifest.version }}</span></a
            >
          </div>
        </div>

        <HorizontalRule>{{ i18n.t('options.keyboard') }}</HorizontalRule>
        <KeyboardShortcuts />

        <HorizontalRule>{{ i18n.t('options.extension') }}</HorizontalRule>
        <OptionsForm />

        <PermsCheck :show-info="true" :show-remove="isFirefox" class="my-3" />

        <CopySupport
          class="fst-italic small mx-3"
          :message="i18n.t('options.copySupportMsg')"
          :tip="i18n.t('options.copySupportTip')"
          >{{ i18n.t('options.copySupport') }}</CopySupport
        >

        <hr />

        <PageFooter />
      </div>
    </div>
  </div>

  <ToastAlerts />
  <BackToTop />
</template>

<!--<style scoped></style>-->
