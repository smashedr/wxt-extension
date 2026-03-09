<script setup lang="ts">
import { onMounted } from 'vue'
import { saveOptions, updateOptions } from '@/utils/options.ts'
import { isMobile } from '@/utils/system.ts'

const props = withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

chrome.storage.onChanged.addListener(onChanged)

function onChanged(changes: object, namespace: string) {
  for (const [key, _] of Object.entries(changes)) {
    console.debug('onChanged:', namespace, key)
    if (namespace === 'sync' && key === 'options') {
      updateOptions()
    }
  }
}

onMounted(() => {
  updateOptions()
})
</script>

<template>
  <form>
    <div v-if="!props.compact" class="row mb-2">
      <div class="col-12 col-sm-8 mb-2">
        <label for="testInput" class="form-label"><i class="fa-regular fa-keyboard me-1"></i> Test Input</label>
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="Example Text Input."></i>
        <input
          id="testInput"
          aria-describedby="testInputHelp"
          type="text"
          class="form-control"
          autocomplete="off"
          @change="saveOptions"
        />
        <div class="form-text" id="testInputHelp">Just a test text input.</div>
      </div>
      <div class="col-12 col-sm-4 mb-2">
        <label for="testNumber" class="form-label"><i class="fa-solid fa-hashtag me-1"></i> Number</label>
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="Example Number Input."></i>
        <input
          id="testNumber"
          aria-describedby="testNumberHelp"
          type="number"
          step="5"
          min="5"
          max="360"
          class="form-control"
          autocomplete="off"
          placeholder="Minutes"
          @change="saveOptions"
        />
        <div class="form-text" id="testNumberHelp">A number 5-360.</div>
      </div>
    </div>

    <div class="form-check form-switch">
      <input class="form-check-input" id="siteIcon" type="checkbox" role="switch" @change="saveOptions" />
      <label class="form-check-label" for="siteIcon">Show Site Icon</label>
      <i
        class="fa-solid fa-circle-info p-1"
        data-bs-toggle="tooltip"
        data-bs-title="Show Context Menu on Right Click."
      ></i>
    </div>
    <div v-if="!isMobile" class="form-check form-switch">
      <input class="form-check-input" id="contextMenu" type="checkbox" role="switch" @change="saveOptions" />
      <label class="form-check-label" for="contextMenu">Enable Right Click Menu</label>
      <i
        class="fa-solid fa-circle-info p-1"
        data-bs-toggle="tooltip"
        data-bs-title="Show Context Menu on Right Click."
      ></i>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" id="showUpdate" type="checkbox" role="switch" @change="saveOptions" />
      <label class="form-check-label" for="showUpdate">Show Release Notes on Update</label>
      <i
        class="fa-solid fa-circle-info p-1"
        data-bs-toggle="tooltip"
        data-bs-title="Show Release Notes on Version Update."
      ></i>
    </div>
  </form>
</template>

<!--<style scoped></style>-->
