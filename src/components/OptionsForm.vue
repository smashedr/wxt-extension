<script setup lang="ts">
import { i18n } from '#imports'
import { saveKeyValue } from '@/utils/options.ts'
import { useOptions } from '@/composables/useOptions.ts'
import FormSwitch from '@/components/FormSwitch.vue'

withDefaults(
  defineProps<{
    compact?: boolean
    show?: string[]
    switches?: string[]
  }>(),
  {
    compact: false,
    show: () => ['inputs', 'switches'],
    switches: () => ['siteIcon', 'contextMenu', 'showUpdate'],
  },
)

const options = useOptions()
</script>

<template>
  <form>
    <div v-if="show.includes('inputs')" class="row m-0">
      <div :class="compact ? 'col-12 col-sm-6' : 'col-12 col-sm-8'">
        <label for="testInput" class="form-label"><i class="fa-regular fa-keyboard me-1"></i> Test Input</label>
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="Example Text Input." v-bs></i>
        <input
          v-model="options.testInput"
          @change="saveKeyValue('testInput', options.testInput)"
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
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="Example Number Input." v-bs></i>
        <input
          v-model="options.testNumber"
          @change="saveKeyValue('testNumber', options.testNumber)"
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
      <template v-for="id in switches" :key="id">
        <FormSwitch
          :id="id"
          :value="!!options[id]"
          :tooltip="i18n.t(`option.toggle.${id}.tip` as any)"
          :class="{ 'col-12': true, 'col-sm-6': !compact }"
          @change="saveKeyValue"
        />
      </template>
    </div>
  </form>
</template>

<!--<style scoped></style>-->
