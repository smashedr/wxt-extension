<script setup lang="ts">
import { onMounted } from 'vue'
import { saveOptions } from '@/utils/options.ts'
import { useOptions } from '@/composables/useOptions.ts'
import { Tooltip } from 'bootstrap'
import { isMobile } from '@/utils/system.ts'

const props = withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

const options = useOptions()

onMounted(() => {
  // NOTE: Find a better way to enable tooltips...
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new Tooltip(el))
})
</script>

<template>
  <form>
    <div v-if="!props.compact" class="row mb-2">
      <div class="col-12 col-sm-8 mb-2">
        <label for="testInput" class="form-label"><i class="fa-regular fa-keyboard me-1"></i> Test Input</label>
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="Example Text Input."></i>
        <input
          v-model="options.testInput"
          @change="saveOptions"
          id="testInput"
          aria-describedby="testInputHelp"
          type="text"
          class="form-control"
          autocomplete="off"
        />
        <div class="form-text" id="testInputHelp">Just a test text input.</div>
      </div>
      <div class="col-12 col-sm-4 mb-2">
        <label for="testNumber" class="form-label"><i class="fa-solid fa-hashtag me-1"></i> Number</label>
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="Example Number Input."></i>
        <input
          v-model="options.testNumber"
          @change="saveOptions"
          id="testNumber"
          aria-describedby="testNumberHelp"
          type="number"
          step="5"
          min="5"
          max="360"
          class="form-control"
          autocomplete="off"
          placeholder="Minutes"
        />
        <div class="form-text" id="testNumberHelp">A number 5-360.</div>
      </div>
    </div>

    <div class="form-check form-switch">
      <input
        v-model="options.siteIcon"
        @change="saveOptions"
        id="siteIcon"
        class="form-check-input"
        type="checkbox"
        role="switch"
      />
      <label class="form-check-label" for="siteIcon">Show Site Icon</label>
      <i
        class="fa-solid fa-circle-info p-1"
        data-bs-toggle="tooltip"
        data-bs-title="Show Context Menu on Right Click."
      ></i>
    </div>
    <div v-if="!isMobile" class="form-check form-switch">
      <input
        v-model="options.contextMenu"
        @change="saveOptions"
        id="contextMenu"
        class="form-check-input"
        type="checkbox"
        role="switch"
      />
      <label class="form-check-label" for="contextMenu">Enable Right Click Menu</label>
      <i
        class="fa-solid fa-circle-info p-1"
        data-bs-toggle="tooltip"
        data-bs-title="Show Context Menu on Right Click."
      ></i>
    </div>
    <div class="form-check form-switch">
      <input
        v-model="options.showUpdate"
        @change="saveOptions"
        id="showUpdate"
        class="form-check-input"
        type="checkbox"
        role="switch"
      />
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
