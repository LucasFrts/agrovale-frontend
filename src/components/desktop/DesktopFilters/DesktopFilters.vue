<template>
  <div class="desktop-filters">
    <FilterContent
      :main-categories="mainCategories"
      :all-categories="allCategories"
      :selected-category="selectedCategory"
      :filters="filters"
      @category-select="handleCategorySelect"
      @filters-change="handleFiltersChange"
    />
  </div>
</template>

<script setup>
import FilterContent from '../../common/FilterContent/FilterContent.vue'

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

// Métodos
function handleCategorySelect(categoryId) {
  emit('category-select', categoryId)
}

function handleFiltersChange(newFilters) {
  emit('filters-change', newFilters)
}
</script>

<style scoped>
@import './DesktopFilters.scss';
</style>

