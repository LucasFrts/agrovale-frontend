<template>
  <header class="page-header" :class="pageHeaderClasses">
    <div class="page-header__container" :class="containerClass">
      <div class="page-header__content">
        <!-- Icon & Title -->
        <div class="page-header__main">
          <div class="page-header__icon" v-if="icon">
            <i :class="icon" class="page-header__icon-element"></i>
          </div>
          <div class="page-header__text">
            <h1 class="page-header__title">{{ title }}</h1>
            <p v-if="description" class="page-header__description">{{ description }}</p>
          </div>
        </div>

        <!-- Actions slot -->
        <div v-if="$slots.actions" class="page-header__actions">
          <slot name="actions"></slot>
        </div>
      </div>

      <!-- Statistics slot -->
      <div v-if="$slots.stats" class="page-header__stats">
        <slot name="stats"></slot>
      </div>

      <!-- Secondary content slot -->
      <div v-if="$slots.secondary" class="page-header__secondary">
        <slot name="secondary"></slot>
      </div>
    </div>
  </header>
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
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'hero', 'compact'].includes(value)
  },
  containerClass: {
    type: String,
    default: 'container'
  }
})

// Computed
const pageHeaderClasses = computed(() => ({
  'page-header--hero': props.variant === 'hero',
  'page-header--compact': props.variant === 'compact'
}))
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.page-header {
  @include section-spacing;
  background: $gradient-dark;

  &--hero {
    padding-top: $spacing-3xl * 1.5;
    padding-bottom: $spacing-3xl * 1.5;
    background: $gradient-primary;

    @include mobile-only {
      padding-top: $spacing-3xl;
      padding-bottom: $spacing-3xl;
    }
  }

  &--compact {
    padding-top: $spacing-xl;
    padding-bottom: $spacing-xl;

    @include mobile-only {
      padding-top: $spacing-lg;
      padding-bottom: $spacing-lg;
    }
  }

  &__container {
    @include container-padding;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: $spacing-lg;

    @include mobile-only {
      flex-direction: column;
      text-align: center;
    }
  }

  &__main {
    display: flex;
    align-items: center;
    gap: $spacing-lg;

    @include mobile-only {
      flex-direction: column;
      gap: $spacing-md;
    }
  }

  &__icon {
    flex-shrink: 0;
  }

  &__icon-element {
    font-size: 3rem;
    @include text-accent;

    .page-header--compact & {
      font-size: 2rem;
    }

    @include mobile-only {
      font-size: 2.5rem;
    }
  }

  &__text {
    flex-grow: 1;
  }

  &__title {
    @include heading-base;
    font-size: $font-size-4xl;
    margin-bottom: $spacing-sm;

    .page-header--compact & {
      font-size: $font-size-3xl;
    }

    @include mobile-only {
      font-size: $font-size-2xl;
    }
  }

  &__description {
    @include text-secondary;
    font-size: $font-size-lg;
    margin-bottom: 0;
    line-height: $line-height-relaxed;

    .page-header--compact & {
      font-size: $font-size-base;
    }

    @include mobile-only {
      font-size: $font-size-base;
    }
  }

  &__actions {
    flex-shrink: 0;

    @include mobile-only {
      width: 100%;
    }
  }

  &__stats {
    margin-top: $spacing-xl;

    @include mobile-only {
      margin-top: $spacing-lg;
    }
  }

  &__secondary {
    margin-top: $spacing-lg;
  }
}
</style>
