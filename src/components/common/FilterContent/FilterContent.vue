<template>
  <!-- Conteúdo do Sidebar -->
  <div class="filter-content">
    <!-- Título (Desktop) -->
    <div class="filter-content__title mobile-hidden">
      <h5 class="filter-content__title-text">
        <i class="bi bi-funnel me-2"></i>
        Filtrar Produtos
      </h5>
      <p class="filter-content__title-description">
        Encontre os melhores produtos agropecuários
      </p>
    </div>

    <!-- Lista de Categorias Principais -->
    <nav class="filter-content__categories">
      <h6 class="filter-content__section-title">
        <i class="bi bi-grid-3x3-gap-fill"></i>
        Categorias Principais
      </h6>
      
      <ul class="filter-content__category-list">
        <li 
          v-for="category in mainCategories" 
          :key="category.id"
          class="filter-content__category-item"
        >
          <button
            class="filter-content__category-link"
            :class="{ 'active': selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <span class="filter-content__category-name">{{ category.name }}</span>
            <span class="filter-content__category-count">{{ category.count }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Todas as Categorias (Colapsável) -->
    <nav class="filter-content__all-categories">
      <button 
        class="filter-content__section-title filter-content__section-title--collapsible"
        @click="toggleAllCategories"
      >
        <div class="filter-content__section-title-content">
          <i class="bi bi-list-ul"></i>
          <span>Todas as Categorias</span>
        </div>
        <i 
          class="bi bi-chevron-down filter-content__section-toggle"
          :class="{ 'filter-content__section-toggle--open': isAllCategoriesOpen }"
        ></i>
      </button>
      
      <div 
        class="filter-content__category-grid"
        :class="{ 'filter-content__category-grid--collapsed': !isAllCategoriesOpen }"
      >
        <label 
          v-for="category in allCategories" 
          :key="category.id"
          class="filter-content__category-checkbox"
        >
          <input 
            type="checkbox" 
            :value="category.id"
            @change="toggleCategoryFilter($event, category.id)"
          >
          <span class="filter-content__category-checkbox-text">{{ category.name }}</span>
          <span class="filter-content__category-checkbox-count">{{ category.count }}</span>
        </label>
      </div>
    </nav>

    <!-- Filtros Adicionais -->
    <div class="filter-content__filters">
      <!-- Filtro de Preço -->
      <div class="filter-content__filter-section">
        <h6 class="filter-content__section-title">
          <i class="bi bi-currency-dollar"></i>
          Faixa de Preço
        </h6>
        
        <div class="filter-content__price-range">
          <div class="filter-content__price-input-group">
            <span class="filter-content__price-label">R$</span>
            <input 
              v-model="localFilters.minPrice"
              type="number" 
              class="filter-content__price-input filter-content__price-input--min"
              placeholder="0"
              min="0"
              @input="updatePriceFilter"
            >
          </div>
          <span class="filter-content__price-separator">até</span>
          <div class="filter-content__price-input-group">
            <span class="filter-content__price-label">R$</span>
            <input 
              v-model="localFilters.maxPrice"
              type="number" 
              class="filter-content__price-input filter-content__price-input--max"
              placeholder="1000"
              min="0"
              @input="updatePriceFilter"
            >
          </div>
        </div>
      </div>

      <!-- Filtro de Disponibilidade -->
      <div class="filter-content__filter-section">
        <h6 class="filter-content__section-title">
          <i class="bi bi-check-circle"></i>
          Disponibilidade
        </h6>
        
        <label class="filter-content__checkbox">
          <input 
            v-model="localFilters.inStock"
            type="checkbox"
            @change="updateStockFilter"
          >
          <span>Apenas em estoque</span>
        </label>
      </div>
    </div>

    <!-- Ações do Sidebar -->
    <div class="filter-content__actions">
      <button 
        class="filter-content__btn filter-content__btn--clear"
        @click="clearAllFilters"
      >
        <i class="bi bi-arrow-clockwise"></i>
        Limpar Filtros
      </button>
      <button 
        class="filter-content__btn filter-content__btn--filter"
        @click="applyFilters"
      >
        <i class="bi bi-funnel-fill"></i>
        Filtrar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  mainCategories: {
    type: Array,
    default: () => []
  },
  allCategories: {
    type: Array,
    default: () => []
  },
  selectedCategory: {
    type: String,
    default: 'todos'
  },
  filters: {
    type: Object,
    default: () => ({
      minPrice: null,
      maxPrice: null,
      inStock: false,
      categories: []
    })
  }
})

// Emits
const emit = defineEmits(['category-select', 'filters-change'])

// Estado local
const isAllCategoriesOpen = ref(false) // Padrão fechado
const localFilters = ref({
  minPrice: props.filters.minPrice,
  maxPrice: props.filters.maxPrice,
  inStock: props.filters.inStock,
  categories: props.filters.categories || []
})

// Watch para sincronizar com props
watch(() => props.filters, (newFilters) => {
  localFilters.value = {
    minPrice: newFilters.minPrice,
    maxPrice: newFilters.maxPrice,
    inStock: newFilters.inStock,
    categories: newFilters.categories || []
  }
}, { deep: true })

// Métodos
function selectCategory(categoryId) {
  emit('category-select', categoryId)
}

function updatePriceFilter() {
  emit('filters-change', localFilters.value)
}

function updateStockFilter() {
  emit('filters-change', localFilters.value)
}

function clearAllFilters() {
  localFilters.value = {
    minPrice: null,
    maxPrice: null,
    inStock: false,
    categories: []
  }
  
  emit('category-select', null)
  emit('filters-change', localFilters.value)
}

function toggleAllCategories() {
  isAllCategoriesOpen.value = !isAllCategoriesOpen.value
}

function toggleCategoryFilter(event, categoryId) {
  const isChecked = event.target.checked
  
  if (isChecked) {
    if (!localFilters.value.categories.includes(categoryId)) {
      localFilters.value.categories.push(categoryId)
    }
  } else {
    localFilters.value.categories = localFilters.value.categories.filter(id => id !== categoryId)
  }
  
  emit('filters-change', localFilters.value)
}

function applyFilters() {
  emit('filters-change', localFilters.value)
}
</script>

<style scoped>
@import './FilterContent.scss';
</style>

