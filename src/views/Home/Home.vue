<template>
  <div class="home-page">
    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- Products Section -->
    <section id="products-section" class="home-page__products-section">
      <div class="container-fluid">
        <div class="row">
          <!-- Sidebar Desktop -->
          <div class="col-lg-3">
            <DesktopFilters 
              :main-categories="mainCategories"
              :all-categories="allCategories"
              :selected-category="selectedCategory"
              :filters="filters"
              @category-select="handleCategorySelect"
              @filters-change="handleFiltersChange"
            />
          </div>

          <!-- Main Products Area -->
          <div class="col-lg-9">
            <div class="products-container">
              <!-- Section Header -->
              <SectionHeader
                :title="getSectionTitle()"
                :count="filteredProducts.length"
                count-label="produto"
                count-suffix="encontrado"
              >
                <template #actions>
                  <div class="section-header__actions">
                    <!-- Botão Filtros Mobile -->
                    <button 
                      class="btn btn-outline-accent desktop-hidden"
                      @click="toggleFilterSidebar"
                    >
                      <i class="bi bi-funnel me-2"></i>
                      Filtros
                    </button>
                  </div>
                </template>
              </SectionHeader>

              <!-- Products Grid -->
              <ProductGrid
                :products="displayedProducts"
                :loading="isLoading"
                :loading-more="isLoadingMore"
                :can-load-more="canLoadMore"
                :has-loaded-more="hasLoadedMore"
                @product-click="handleProductClick"
                @add-to-cart="handleAddToCart"
                @load-more="loadMore"
                @empty-primary-action="viewAllProducts"
                @empty-secondary-action="clearAllFilters"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Sidebar Mobile -->
    <FilterSidebar 
      :is-open="isFilterSidebarOpen"
      :main-categories="mainCategories"
      :all-categories="allCategories"
      :selected-category="selectedCategory"
      :filters="filters"
      @close="closeFilterSidebar"
      @category-select="handleCategorySelect"
      @filters-change="handleFiltersChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../../stores/products'

// Componentes
import HeroCarousel from './HeroCarousel.vue'
import DesktopFilters from '../../components/desktop/DesktopFilters/DesktopFilters.vue'
import FilterSidebar from '../../components/mobile/FilterSidebar/FilterSidebar.vue'
import ProductGrid from '../../components/common/ProductGrid/ProductGrid.vue'
import SectionHeader from '../../components/layout/SectionHeader/SectionHeader.vue'

const productStore = useProductStore()

// Estado reativo
const sortBy = ref('default')
const isFilterSidebarOpen = ref(false)
const isLoading = ref(false)
const isLoadingMore = ref(false)
const itemsPerPage = ref(12)
const currentPage = ref(1)

// Computadas
const filteredProducts = computed(() => productStore.filteredProducts)
const selectedCategory = computed(() => productStore.selectedCategory)
const mainCategories = computed(() => productStore.mainCategories)
const allCategories = computed(() => productStore.allCategories)
const filters = computed(() => productStore.filters)

const sortedProducts = computed(() => {
  let products = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name))
    case 'price-low':
      return products.sort((a, b) => {
        if (a.price === 0 && b.price === 0) return 0
        if (a.price === 0) return 1
        if (b.price === 0) return -1
        return a.price - b.price
      })
    case 'price-high':
      return products.sort((a, b) => {
        if (a.price === 0 && b.price === 0) return 0
        if (a.price === 0) return 1
        if (b.price === 0) return -1
        return b.price - a.price
      })
    case 'rating':
      return products.sort((a, b) => b.rating - a.rating)
    default:
      return products
  }
})

const displayedProducts = computed(() => {
  const endIndex = currentPage.value * itemsPerPage.value
  return sortedProducts.value.slice(0, endIndex)
})

const canLoadMore = computed(() => {
  return displayedProducts.value.length < sortedProducts.value.length
})

const hasLoadedMore = computed(() => {
  return currentPage.value > 1 && !canLoadMore.value
})

// Métodos
function getSectionTitle() {
  if (selectedCategory.value === 'todos') {
    return 'Produtos em Destaque'
  }
  
  const category = allCategories.value.find(cat => cat.id === selectedCategory.value)
  return category ? category.name : 'Produtos'
}

function applySorting() {
  currentPage.value = 1
}

function handleCategorySelect(categoryId) {
  productStore.setCategory(categoryId)
  currentPage.value = 1
}

function handleFiltersChange(newFilters) {
  productStore.setFilters(newFilters)
  currentPage.value = 1
}

function handleProductClick(product) {
  console.log('Produto clicado:', product)
  // Implementar navegação para detalhes do produto
}

function handleAddToCart(product) {
  productStore.addToCart(product)
}

function loadMore() {
  isLoadingMore.value = true
  
  setTimeout(() => {
    currentPage.value++
    isLoadingMore.value = false
  }, 800)
}

function viewAllProducts() {
  productStore.setCategory('todos')
  currentPage.value = 1
}

function clearAllFilters() {
  productStore.setCategory('todos')
  productStore.clearFilters()
  sortBy.value = 'default'
  currentPage.value = 1
}

function toggleFilterSidebar() {
  isFilterSidebarOpen.value = !isFilterSidebarOpen.value
}

function closeFilterSidebar() {
  isFilterSidebarOpen.value = false
}

// Lifecycle
onMounted(() => {
  // Carregar produtos em destaque
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<style lang="scss" scoped>
@import './Home.scss';
</style>
