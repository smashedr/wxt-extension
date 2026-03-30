<script setup lang="ts">
import { i18n } from '#imports'
import { computed } from 'vue'
import { isMobile } from '@/utils/system.ts'

const emit = defineEmits(['change'])

const props = defineProps<{
  id: string
  value: boolean
  label?: string
  tooltip?: string | false
}>()

// console.log(`FormSwitch.vue: ${props.name}: props.value:`, props.value)

const labelText = computed(() => props.label || i18n.t(`option.toggle.${props.id}.label` as any))
// const tooltipText = computed(() => props.tooltip || i18n.t(`option.toggle.${props.id}.tip` as any))
const tooltipText = computed(() =>
  props.tooltip === false ? undefined : props.tooltip || i18n.t(`option.toggle.${props.id}.tip` as any),
)

function onChange(event: Event) {
  console.log('onChange:', event)
  const target = event.target as HTMLInputElement
  // console.log('target:', target)
  // console.log('props.id:', props.id)
  // console.log('target.checked:', target.checked)
  emit('change', props.id, target.checked)
}
</script>

<template>
  <div class="form-check form-switch">
    <input :checked="value" :id="id" @change="onChange" class="form-check-input" type="checkbox" role="switch" />
    <label class="form-check-label" :for="id">{{ labelText }}</label>
    <i
      v-if="!isMobile && tooltipText"
      class="fa-solid fa-circle-info ms-2"
      data-bs-toggle="tooltip"
      :data-bs-title="tooltipText"
      v-bs
    ></i>
  </div>
</template>
