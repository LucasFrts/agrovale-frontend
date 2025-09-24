<template>
  <div :class="wrapperClasses">
    <div class="input-group">
      <span v-if="icon" class="input-group-text input-text__icon">
        <i :class="icon"></i>
      </span>
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleEnter"
      />
      <button
        v-if="buttonText || $slots.button"
        type="button"
        class="btn btn-accent input-text__button"
        :disabled="disabled"
        @click="handleButtonClick"
      >
        <slot name="button">
          {{ buttonText }}
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'dark', 'search', 'newsletter'].includes(value)
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'enter', 'button-click'])

// Computed
const wrapperClasses = computed(() => {
  const classes = ['input-text', 'input-text__wrapper']
  
  // Variantes temáticas
  classes.push(`input-text--${props.variant}`)
  
  // Tamanhos
  classes.push(`input-text--${props.size}`)
  
  // Estados
  if (props.disabled) classes.push('input-text--disabled')
  
  return classes
})

const inputClasses = computed(() => {
  return ['form-control', 'input-text__field']
})

// Methods
function handleInput(event) {
  emit('update:modelValue', event.target.value)
}

function handleFocus(event) {
  emit('focus', event)
}

function handleBlur(event) {
  emit('blur', event)
}

function handleEnter(event) {
  emit('enter', event)
}

function handleButtonClick() {
  emit('button-click')
}
</script>

<style lang="scss">
@import './InputText.scss';
</style>
