<script setup lang="ts">
import { i18n } from '#imports'
import { onMounted } from 'vue'
import { saveKeyValue, saveOptions } from '@/utils/options.ts'
import { useOptions } from '@/composables/useOptions.ts'
import { Tooltip } from 'bootstrap'
import FormSwitch from '@/components/FormSwitch.vue'

withDefaults(
  defineProps<{
    compact?: boolean
    show?: string[]
  }>(),
  {
    compact: false,
    show: () => ['inputs', 'switches'],
  },
)

const options = useOptions()

const switches = ['siteIcon', 'contextMenu', 'showUpdate'].map((key) => ({
  key,
  label: i18n.t(`option.toggle.${key}.label` as any),
  tooltip: i18n.t(`option.toggle.${key}.tip` as any),
}))
console.log('switches:', switches)

onMounted(() => {
  // NOTE: Find a better way to enable tooltips...
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new Tooltip(el))
})
</script>

<template>
  <form>
    <div v-if="show.includes('inputs')" class="row m-0 mb-2 g-1">
      <div :class="compact ? 'col-12 col-sm-6' : 'col-12 col-sm-8'">
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
        <div class="form-text" :class="{ 'visually-hidden': compact }" id="testInputHelp">Just a test text input.</div>
      </div>
      <div :class="compact ? 'col-12 col-sm-6' : 'col-12 col-sm-4'">
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
        <div class="form-text" :class="{ 'visually-hidden': compact }" id="testNumberHelp">A number 5-360.</div>
      </div>
    </div>

    <!-- switches -->
    <div v-if="show.includes('switches')" class="row m-0">
      <template v-for="option in switches" :key="option.key">
        <FormSwitch
          :class="{ 'col-12': true, 'col-sm-6': !compact }"
          :value="(options[option.key] as boolean) || false"
          :name="option.key"
          :label="option.label"
          :tooltip="option.tooltip"
          @change="saveKeyValue"
        />
      </template>
    </div>
  </form>
</template>

<!--<style scoped></style>-->
