<template>
  <!-- Overlay para mobile -->
  <div 
    v-if="isOpen && isMobile" 
    class="sidebar-overlay"
    @click="closeSidebar"
  ></div>

  <!-- Sidebar -->
  <aside class="product-sidebar" :class="sidebarClasses">
    <!-- Header do Sidebar (Mobile) -->
    <div class="product-sidebar__header desktop-hidden">
      <h5 class="product-sidebar__header-title">
        <i class="bi bi-funnel me-2"></i>
        Categorias
      </h5>
      <button 
        class="product-sidebar__close-btn"
        @click="closeSidebar"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- Conteúdo do Sidebar -->
    <div class="product-sidebar__content">
      <!-- Título (Desktop) -->
      <div class="product-sidebar__title mobile-hidden">
        <h5 class="product-sidebar__title-text">
          <i class="bi bi-funnel me-2"></i>
          Filtrar Produtos
        </h5>
        <p class="product-sidebar__title-description">
          Encontre os melhores produtos agropecuários
        </p>
      </div>

      <!-- Lista de Categorias Principais -->
      <nav class="product-sidebar__categories">
        <h6 class="product-sidebar__section-title">
          <i class="bi bi-grid-3x3-gap-fill"></i>
          Categorias Principais
        </h6>
        
        <ul class="product-sidebar__category-list">
          <li 
            v-for="category in mainCategories" 
            :key="category.id"
            class="product-sidebar__category-item"
          >
            <button
              class="product-sidebar__category-link"
              :class="{ 'active': selectedCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              <span class="product-sidebar__category-name">{{ category.name }}</span>
              <span class="product-sidebar__category-count">{{ category.count }}</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Todas as Categorias (Colapsável) -->
      <nav class="product-sidebar__all-categories">
        <button 
          class="product-sidebar__section-title product-sidebar__section-title--collapsible"
          @click="toggleAllCategories"
        >
          <div class="product-sidebar__section-title-content">
            <i class="bi bi-list-ul"></i>
            <span>Todas as Categorias</span>
          </div>
          <i 
            class="bi bi-chevron-down product-sidebar__section-toggle"
            :class="{ 'product-sidebar__section-toggle--open': isAllCategoriesOpen }"
          ></i>
        </button>
        
        <div 
          class="product-sidebar__category-grid"
          :class="{ 'product-sidebar__category-grid--collapsed': !isAllCategoriesOpen }"
        >
          <label 
            v-for="category in allCategories" 
            :key="category.id"
            class="product-sidebar__category-checkbox"
          >
            <input 
              type="checkbox" 
              :value="category.id"
              @change="toggleCategoryFilter($event, category.id)"
            >
            <span class="product-sidebar__category-checkbox-text">{{ category.name }}</span>
            <span class="product-sidebar__category-checkbox-count">{{ category.count }}</span>
          </label>
        </div>
      </nav>

      <!-- Filtros Adicionais -->
      <div class="product-sidebar__filters">
        <!-- Filtro de Preço -->
        <div class="product-sidebar__filter-section">
          <h6 class="product-sidebar__section-title">
            <i class="bi bi-currency-dollar"></i>
            Faixa de Preço
          </h6>
          
          <div class="product-sidebar__price-range">
            <div class="product-sidebar__price-input-group">
              <span class="product-sidebar__price-label">R$</span>
              <input 
                v-model="localFilters.minPrice"
                type="number" 
                class="product-sidebar__price-input product-sidebar__price-input--min"
                placeholder="0"
                min="0"
                @input="updatePriceFilter"
              >
            </div>
            <span class="product-sidebar__price-separator">até</span>
            <div class="product-sidebar__price-input-group">
              <span class="product-sidebar__price-label">R$</span>
              <input 
                v-model="localFilters.maxPrice"
                type="number" 
                class="product-sidebar__price-input product-sidebar__price-input--max"
                placeholder="1000"
                min="0"
                @input="updatePriceFilter"
              >
            </div>
          </div>
        </div>

        <!-- Filtro de Disponibilidade -->
        <div class="product-sidebar__filter-section">
          <h6 class="product-sidebar__section-title">
            <i class="bi bi-check-circle me-1"></i>
            Disponibilidade
          </h6>
          
          <label class="product-sidebar__checkbox">
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
      <div class="product-sidebar__actions">
        <button 
          class="product-sidebar__btn product-sidebar__btn--clear"
          @click="clearAllFilters"
        >
          <i class="bi bi-arrow-clockwise"></i>
          Limpar Filtros
        </button>
        <button 
          class="product-sidebar__btn product-sidebar__btn--filter"
          @click="applyFilters"
        >
          <i class="bi bi-funnel-fill"></i>
          Filtrar
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

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
    type: [String, Number],
    default: null
  },
  filters: {
    type: Object,
    default: () => ({
      minPrice: null,
      maxPrice: null,
      inStock: false
    })
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['category-select', 'filters-change', 'close'])

// Estado local
const isMobile = ref(false)
const isAllCategoriesOpen = ref(false) // Padrão fechado
const localFilters = ref({
  minPrice: props.filters.minPrice,
  maxPrice: props.filters.maxPrice,
  inStock: props.filters.inStock,
  categories: props.filters.categories || []
})

// Computed
const sidebarClasses = computed(() => ({
  'product-sidebar--mobile': isMobile.value,
  'product-sidebar--open': props.isOpen,
  'show': props.isOpen
}))

// Watchers
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

// Métodos
function selectCategory(categoryId) {
  emit('category-select', categoryId === props.selectedCategory ? null : categoryId)
  
  if (isMobile.value) {
    closeSidebar()
  }
}

function updatePriceFilter() {
  emit('filters-change', {
    ...localFilters.value,
    minPrice: localFilters.value.minPrice || null,
    maxPrice: localFilters.value.maxPrice || null
  })
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
  
  if (isMobile.value) {
    closeSidebar()
  }
}

function closeSidebar() {
  emit('close')
}

function checkScreenSize() {
  isMobile.value = window.innerWidth < 992
}

// Lifecycle
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
@import './ProductSidebar.scss';
</style>