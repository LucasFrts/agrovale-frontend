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
    </div>

    <!-- Empty state -->
    <div v-else class="product-grid__empty">
      <EmptyState 
        :title="emptyTitle || 'Nenhum produto encontrado'"
        :description="emptyDescription || 'Ajuste os filtros ou tente uma busca diferente'"
        :icon="emptyIcon || 'bi bi-search'"
        :show-actions="showEmptyActions"
      >
        <template v-if="showEmptyActions" #actions>
          <button 
            class="btn btn-primary me-2"
            @click="$emit('clear-filters')"
          >
            <i class="bi bi-funnel me-1"></i>
            Limpar Filtros
          </button>
          <router-link 
            :to="{ name: 'Produtos' }" 
            class="btn btn-outline-primary"
          >
            <i class="bi bi-grid me-1"></i>
            Ver Todos
          </router-link>
        </template>
      </EmptyState>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from '../ProductCard/ProductCard.vue'
import EmptyState from '../../layout/EmptyState/EmptyState.vue'

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
  skeletonCount: {
    type: Number,
    default: 8
  },
  gridColumns: {
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
    default: null
  },
  emptyDescription: {
    type: String,
    default: null
  },
  emptyIcon: {
    type: String,
    default: null
  },
  showEmptyActions: {
    type: Boolean,
    default: true
  }
})

// Emits
defineEmits(['product-click', 'add-to-cart', 'add-to-wishlist', 'clear-filters'])

// Computed
const gridColumnClasses = computed(() => {
  const { xl, lg, md, sm, xs } = props.gridColumns
  return [
    xl ? `col-xl-${xl}` : '',
    lg ? `col-lg-${lg}` : '',
    md ? `col-md-${md}` : '',
    sm ? `col-sm-${sm}` : '',
    xs ? `col-${xs}` : ''
  ].filter(Boolean).join(' ')
})
</script>

<style scoped>
@import './ProductGrid.scss';
</style>