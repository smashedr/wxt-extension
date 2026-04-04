<script setup lang="ts">
import { useOptions } from '@/composables/useOptions.ts'
import FormSwitch from '@/components/FormSwitch.vue'
import FormInput from '@/components/FormInput.vue'

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
    <template v-if="show.includes('inputs')">
      <div class="row m-0">
        <FormInput
          v-model="options.testInput"
          id="testInput"
          :class="compact ? 'col-12 col-sm-6' : 'col-12 col-sm-8'"
          fa="fa-regular fa-keyboard"
        />
        <FormInput
          v-model="options.testNumber"
          id="testNumber"
          :class="compact ? 'col-12 col-sm-6' : 'col-12 col-sm-4'"
          fa="fa-solid fa-hashtag"
          type="number"
          step="5"
          min="5"
          max="360"
        />
      </div>
    </template>

    <template v-if="show.includes('switches')">
      <div class="row m-0">
        <template v-for="id in switches" :key="id">
          <FormSwitch :id="id" v-model="options[id]" :class="{ 'col-12': true, 'col-sm-6': !compact }" />
        </template>
      </div>
    </template>
  </form>
</template>

<!--<style scoped></style>-->
