<template>
  <div class="empty-state" :class="emptyStateClasses">
    <div class="empty-state__content">
      <!-- Icon -->
      <div class="empty-state__icon">
        <i :class="icon" class="empty-state__icon-element"></i>
      </div>

      <!-- Text content -->
      <div class="empty-state__text">
        <h3 class="empty-state__title">{{ title }}</h3>
        <p class="empty-state__description">{{ description }}</p>
      </div>

      <!-- Actions -->
      <div v-if="$slots.actions || primaryAction || secondaryAction" class="empty-state__actions">
        <slot name="actions">
          <button 
            v-if="secondaryAction"
            class="btn btn-outline-accent"
            @click="$emit('secondary-action')"
          >
            <i v-if="secondaryAction.icon" :class="secondaryAction.icon" class="me-2"></i>
            {{ secondaryAction.text }}
          </button>
          <button 
            v-if="primaryAction"
            class="btn btn-accent"
            @click="$emit('primary-action')"
          >
            <i v-if="primaryAction.icon" :class="primaryAction.icon" class="me-2"></i>
            {{ primaryAction.text }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'bi bi-inbox'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'compact', 'large'].includes(value)
  },
  primaryAction: {
    type: Object,
    default: null
  },
  secondaryAction: {
    type: Object,
    default: null
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

// Emits
defineEmits(['primary-action', 'secondary-action'])

// Computed
const emptyStateClasses = computed(() => ({
  'empty-state--compact': props.variant === 'compact',
  'empty-state--large': props.variant === 'large'
}))
</script>

<style scoped>
@import './EmptyState.scss';
</style>