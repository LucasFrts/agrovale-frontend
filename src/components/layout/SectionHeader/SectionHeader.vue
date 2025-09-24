<template>
  <div class="section-header" :class="headerClasses">
    <div class="section-header__container">
      <!-- Badge/Tag opcional -->
      <div v-if="badge" class="section-header__badge">
        <i v-if="badge.icon" :class="badge.icon"></i>
        {{ badge.text }}
      </div>

      <!-- Título principal -->
      <h2 v-if="title" class="section-header__title text-beige">
        {{ title }}
      </h2>

      <!-- Subtítulo -->
      <h3 v-if="subtitle" class="section-header__subtitle">
        {{ subtitle }}
      </h3>

      <!-- Descrição -->
      <p v-if="description" class="section-header__description">
        {{ description }}
      </p>

      <!-- Ações/Botões -->
      <div v-if="$slots.actions || actions" class="section-header__actions">
        <slot name="actions">
          <template v-for="action in actions" :key="action.text">
            <router-link 
              v-if="action.to"
              :to="action.to"
              :class="['section-header__btn', `section-header__btn--${action.variant || 'primary'}`]"
            >
              <i v-if="action.icon" :class="action.icon"></i>
              {{ action.text }}
            </router-link>
            <button 
              v-else
              :class="['section-header__btn', `section-header__btn--${action.variant || 'primary'}`]"
              @click="$emit('action-click', action)"
            >
              <i v-if="action.icon" :class="action.icon"></i>
              {{ action.text }}
            </button>
          </template>
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
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  badge: {
    type: Object,
    default: null
  },
  align: {
    type: String,
    default: 'center',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['compact', 'default', 'large'].includes(value)
  },
  showLine: {
    type: Boolean,
    default: true
  },
  colored: {
    type: Boolean,
    default: false
  },
  actions: {
    type: Array,
    default: () => []
  }
})

// Emits
defineEmits(['action-click'])

// Computed
const headerClasses = computed(() => ({
  [`section-header--${props.align}`]: props.align !== 'center',
  [`section-header--${props.size}`]: props.size !== 'default',
  'section-header--no-line': !props.showLine,
  'section-header--colored': props.colored
}))
</script>

<style scoped>
@import './SectionHeader.scss';
</style>