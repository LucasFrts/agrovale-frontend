<template>
  <!-- Overlay para mobile -->
  <div 
    v-if="isOpen" 
    class="filter-sidebar-overlay"
    @click="closeSidebar"
  ></div>

  <!-- Filter Sidebar Mobile -->
  <aside class="filter-sidebar" :class="sidebarClasses">
    <!-- Header do Sidebar (Mobile) -->
    <div class="filter-sidebar__header">
      <h5 class="filter-sidebar__header-title">
        <i class="bi bi-funnel me-2"></i>
        Filtros
      </h5>
      <button 
        class="filter-sidebar__close-btn"
        @click="closeSidebar"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- Conteúdo dos Filtros -->
    <div class="filter-sidebar__content">
      <FilterContent
        :main-categories="mainCategories"
        :all-categories="allCategories"
        :selected-category="selectedCategory"
        :filters="filters"
        @category-select="handleCategorySelect"
        @filters-change="handleFiltersChange"
      />
    </div>
  </aside>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'
import FilterContent from '../../common/FilterContent/FilterContent.vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
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
const emit = defineEmits(['close', 'category-select', 'filters-change'])

// Computed
const sidebarClasses = computed(() => ({
  'filter-sidebar--open': props.isOpen
}))

// Métodos
function closeSidebar() {
  emit('close')
}

function handleCategorySelect(categoryId) {
  emit('category-select', categoryId)
  // Fechar sidebar após selecionar categoria (UX mobile)
  closeSidebar()
}

function handleFiltersChange(newFilters) {
  emit('filters-change', newFilters)
}

// Lifecycle - Prevenir scroll do body quando sidebar estiver aberta
onMounted(() => {
  if (props.isOpen) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

// Watch para controlar o scroll do body
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
@import './FilterSidebar.scss';
</style>
