<template>
  <div class="product-grid">
    <!-- Loading state -->
    <div v-if="loading" class="product-grid__loading">
      <div class="row g-4">
        <div 
          v-for="i in skeletonCount" 
          :key="`skeleton-${i}`"
          class="col-xl-3 col-lg-4 col-md-6 col-sm-6"
        >
          <div class="product-skeleton">
            <div class="product-skeleton__image"></div>
            <div class="product-skeleton__content">
              <div class="product-skeleton__category"></div>
              <div class="product-skeleton__title"></div>
              <div class="product-skeleton__description"></div>
              <div class="product-skeleton__price"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products grid -->
    <div v-else-if="products.length > 0" class="product-grid__content">
      <div class="row g-4">
        <div 
          v-for="product in products" 
          :key="product.id"
          :class="gridColumnClasses"
        >
          <ProductCard 
            :product="product" 
            @click="$emit('product-click', product)"
            @add-to-cart="$emit('add-to-cart', product)"
            @add-to-wishlist="$emit('add-to-wishlist', product)"
          />
        </div>
      </div>

      <!-- Load more section -->
      <div v-if="showLoadMore" class="product-grid__load-more">
        <div v-if="loadingMore" class="text-center py-4">
          <div class="spinner-border text-accent" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <p class="text-secondary-custom mt-2 mb-0">Carregando mais produtos...</p>
        </div>

        <div v-else-if="canLoadMore" class="text-center mt-5">
          <button 
            class="btn btn-outline-accent btn-lg"
            @click="$emit('load-more')"
          >
            <i class="bi bi-plus-circle me-2"></i>
            Carregar Mais Produtos
          </button>
        </div>

        <div v-else-if="hasLoadedMore" class="text-center mt-5">
          <div class="alert alert-info bg-darker border-secondary">
            <i class="bi bi-info-circle me-2"></i>
            Você visualizou todos os produtos disponíveis
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <EmptyState
      v-else
      :title="emptyTitle"
      :description="emptyDescription"
      :icon="emptyIcon"
      :primary-action="emptyPrimaryAction"
      :secondary-action="emptySecondaryAction"
      @primary-action="$emit('empty-primary-action')"
      @secondary-action="$emit('empty-secondary-action')"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from '../../../components/common/ProductCard/ProductCard.vue'
import EmptyState from '../../../components/layout/EmptyState/EmptyState.vue'

// Props
const props = defineProps({
  products: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingMore: {
    type: Boolean,
    default: false
  },
  canLoadMore: {
    type: Boolean,
    default: false
  },
  hasLoadedMore: {
    type: Boolean,
    default: false
  },
  showLoadMore: {
    type: Boolean,
    default: true
  },
  skeletonCount: {
    type: Number,
    default: 8
  },
  columns: {
    type: Object,
    default: () => ({
      xl: 3,
      lg: 4,
      md: 6,
      sm: 6,
      xs: 12
    })
  },
  emptyTitle: {
    type: String,
    default: 'Nenhum produto encontrado'
  },
  emptyDescription: {
    type: String,
    default: 'Não encontramos produtos que correspondam aos seus critérios de busca. Tente ajustar os filtros ou buscar por outros termos.'
  },
  emptyIcon: {
    type: String,
    default: 'bi-search'
  },
  emptyPrimaryAction: {
    type: Object,
    default: () => ({
      text: 'Ver Todos os Produtos',
      icon: 'bi-grid'
    })
  },
  emptySecondaryAction: {
    type: Object,
    default: () => ({
      text: 'Limpar Filtros',
      icon: 'bi-arrow-clockwise'
    })
  }
})

// Emits
const emit = defineEmits([
  'product-click',
  'add-to-cart',
  'add-to-wishlist',
  'load-more',
  'empty-primary-action',
  'empty-secondary-action'
])

// Computed
const gridColumnClasses = computed(() => {
  const { xl, lg, md, sm, xs } = props.columns
  return [
    `col-xl-${xl}`,
    `col-lg-${lg}`,
    `col-md-${md}`,
    `col-sm-${sm}`,
    xs ? `col-${xs}` : ''
  ].filter(Boolean).join(' ')
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.product-grid {
  &__content {
    @include fade-in-up;
  }

  &__loading {
    animation: fadeIn 0.3s ease-out;
  }

  &__load-more {
    margin-top: $spacing-xl;
  }
}

// Product skeleton loading
.product-skeleton {
  @include card-base;
  height: 100%;
  overflow: hidden;

  &__image {
    height: 220px;
    background: linear-gradient(90deg, $bg-tertiary 25%, $bg-secondary 50%, $bg-tertiary 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;

    @include mobile-only {
      height: 180px;
    }
  }

  &__content {
    padding: $spacing-lg;

    @include mobile-only {
      padding: $spacing-md;
    }
  }

  &__category {
    height: 1rem;
    width: 30%;
    background: linear-gradient(90deg, $bg-tertiary 25%, $bg-secondary 50%, $bg-tertiary 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: $border-radius;
    margin-bottom: $spacing-sm;
  }

  &__title {
    height: 1.25rem;
    width: 80%;
    background: linear-gradient(90deg, $bg-tertiary 25%, $bg-secondary 50%, $bg-tertiary 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: $border-radius;
    margin-bottom: $spacing-sm;
  }

  &__description {
    height: 0.875rem;
    width: 100%;
    background: linear-gradient(90deg, $bg-tertiary 25%, $bg-secondary 50%, $bg-tertiary 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: $border-radius;
    margin-bottom: $spacing-xs;

    &:last-of-type {
      width: 60%;
      margin-bottom: $spacing-lg;
    }
  }

  &__price {
    height: 1.5rem;
    width: 40%;
    background: linear-gradient(90deg, $bg-tertiary 25%, $bg-secondary 50%, $bg-tertiary 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: $border-radius;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Responsive adjustments
@media (max-width: 576px) {
  .product-grid {
    :deep(.col-sm-6) {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
}
</style>
