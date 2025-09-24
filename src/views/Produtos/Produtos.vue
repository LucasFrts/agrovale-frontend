<template>
  <div class="produtos-page">
    <!-- Carrossel de Promoções -->
    <div class="produtos-page__promotions" v-if="false">
      <PromotionsCarousel />
    </div>

    <!-- Seção Principal de Produtos -->
    <section class="produtos-page__main-section">
      <div class="container-fluid">
        <div class="row">
          <!-- Filtros Desktop -->
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

                    <!-- Busca -->
                    <div class="search-container">
                      <InputText
                        v-model="searchTerm"
                        placeholder="Buscar produtos..."
                        icon="bi bi-search"
                        variant="dark"
                        @input="handleSearch"
                      />
                    </div>
                  </div>
                </template>
              </SectionHeader>

              <!-- Active Filters -->
              <div v-if="hasActiveFilters" class="active-filters">
                <div class="active-filters__content">
                  <span class="active-filters__label">Filtros Ativos:</span>
                  
                  <span v-if="selectedCategory !== 'todos'" class="active-filters__badge">
                    Categoria: {{ getCategoryName(selectedCategory) }}
                    <button class="btn-close btn-close-white ms-2" @click="clearCategory"></button>
                  </span>
                  
                  <span v-if="searchTerm" class="active-filters__badge">
                    Busca: "{{ searchTerm }}"
                    <button class="btn-close btn-close-white ms-2" @click="clearSearch"></button>
                  </span>

                  <span v-if="filters.inStock" class="active-filters__badge">
                    Em estoque
                    <button class="btn-close btn-close-white ms-2" @click="clearInStockFilter"></button>
                  </span>

                  <span v-if="filters.minPrice || filters.maxPrice" class="active-filters__badge">
                    Preço: R$ {{ filters.minPrice || 0 }} - R$ {{ filters.maxPrice || '∞' }}
                    <button class="btn-close btn-close-white ms-2" @click="clearPriceFilter"></button>
                  </span>

                  <button class="active-filters__clear-btn" @click="clearAllFilters">
                    Limpar Todos
                  </button>
                </div>
              </div>

              <!-- Products Grid -->
              <ProductGrid
                :products="displayedProducts"
                :loading="isLoading"
                :loading-more="isLoadingMore"
                :can-load-more="canLoadMore"
                :has-loaded-more="hasLoadedMore"
                :columns="{ xl: 3, lg: 4, md: 6, sm: 6, xs: 12 }"
                :empty-title="getEmptyTitle()"
                :empty-description="getEmptyDescription()"
                @product-click="handleProductClick"
                @add-to-cart="handleAddToCart"
                @add-to-wishlist="handleAddToWishlist"
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
import { ref, computed, onMounted, watch } from 'vue'
import { useProductStore } from '../../stores/products'
import { useRoute, useRouter } from 'vue-router'

// Componentes
import PromotionsCarousel from './PromotionsCarousel.vue'
import DesktopFilters from '../../components/desktop/DesktopFilters/DesktopFilters.vue'
import FilterSidebar from '../../components/mobile/FilterSidebar/FilterSidebar.vue'
import ProductGrid from '../../components/common/ProductGrid/ProductGrid.vue'
import SectionHeader from '../../components/layout/SectionHeader/SectionHeader.vue'
import InputText from '../../components/common/InputText/InputText.vue'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()

// Estado reativo
const searchTerm = ref('')
const sortBy = ref('default')
const isFilterSidebarOpen = ref(false)
const isLoading = ref(false)
const isLoadingMore = ref(false)
const itemsPerPage = ref(16)
const currentPage = ref(1)

// Computadas
const selectedCategory = computed(() => productStore.selectedCategory)
const mainCategories = computed(() => productStore.mainCategories)
const allCategories = computed(() => productStore.allCategories)
const filters = computed(() => productStore.filters)

const filteredProducts = computed(() => {
  let products = productStore.filteredProducts

  // Filtro de busca
  if (searchTerm.value) {
    const searchTerm_lower = searchTerm.value.toLowerCase()
    products = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm_lower) ||
      product.description.toLowerCase().includes(searchTerm_lower) ||
      product.category.toLowerCase().includes(searchTerm_lower)
    )
  }

  // Filtros adicionais
  if (filters.value.inStock) {
    products = products.filter(product => product.inStock)
  }

  if (filters.value.minPrice) {
    products = products.filter(product => 
      product.price >= filters.value.minPrice || product.price === 0
    )
  }

  if (filters.value.maxPrice) {
    products = products.filter(product => 
      product.price <= filters.value.maxPrice || product.price === 0
    )
  }

  if (filters.value.minRating) {
    products = products.filter(product => product.rating >= filters.value.minRating)
  }

  return products
})

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

const hasActiveFilters = computed(() => {
  return selectedCategory.value !== 'todos' || 
         searchTerm.value ||
         filters.value.inStock ||
         filters.value.minPrice ||
         filters.value.maxPrice ||
         filters.value.minRating
})

// Métodos
function getSectionTitle() {
  if (selectedCategory.value === 'todos') {
    return 'Todos os Produtos'
  }
  
  const category = allCategories.value.find(cat => cat.id === selectedCategory.value)
  return category ? category.name : 'Produtos'
}

function getCategoryName(categoryId) {
  const category = allCategories.value.find(cat => cat.id === categoryId)
  return category ? category.name : categoryId
}

function getEmptyTitle() {
  if (searchTerm.value) {
    return 'Nenhum produto encontrado'
  }
  if (selectedCategory.value !== 'todos') {
    return 'Categoria sem produtos'
  }
  return 'Nenhum produto disponível'
}

function getEmptyDescription() {
  if (searchTerm.value) {
    return `Não encontramos produtos para "${searchTerm.value}". Tente buscar por outros termos.`
  }
  if (selectedCategory.value !== 'todos') {
    return 'Esta categoria ainda não possui produtos cadastrados.'
  }
  return 'Não há produtos disponíveis no momento.'
}

function handleSearch() {
  currentPage.value = 1
}

function applySorting() {
  currentPage.value = 1
}

function handleCategorySelect(categoryId) {
  productStore.setCategory(categoryId)
  currentPage.value = 1
  
  // Atualizar URL
  router.push({ 
    name: 'Produtos', 
    query: { ...route.query, categoria: categoryId }
  })
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
  // Mostrar notificação de sucesso
}

function handleAddToWishlist(product) {
  console.log('Adicionado à lista de desejos:', product)
  // Implementar lista de desejos
}

function loadMore() {
  isLoadingMore.value = true
  
  setTimeout(() => {
    currentPage.value++
    isLoadingMore.value = false
  }, 800)
}

function toggleFilterSidebar() {
  isFilterSidebarOpen.value = !isFilterSidebarOpen.value
}

function closeFilterSidebar() {
  isFilterSidebarOpen.value = false
}

function viewAllProducts() {
  clearAllFilters()
}

function clearAllFilters() {
  productStore.setCategory('todos')
  productStore.clearFilters()
  searchTerm.value = ''
  sortBy.value = 'default'
  currentPage.value = 1
  
  // Limpar query params
  router.push({ name: 'Produtos' })
}

function clearCategory() {
  productStore.setCategory('todos')
  router.push({ name: 'Produtos', query: { ...route.query, categoria: undefined }})
}

function clearSearch() {
  searchTerm.value = ''
}

function clearInStockFilter() {
  filters.value.inStock = false
}

function clearPriceFilter() {
  filters.value.minPrice = null
  filters.value.maxPrice = null
}

// Watchers
watch(() => route.query.categoria, (newCategory) => {
  if (newCategory && newCategory !== selectedCategory.value) {
    productStore.setCategory(newCategory)
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  isLoading.value = true
  
  // Simular carregamento
  setTimeout(() => {
    isLoading.value = false
  }, 500)

  // Verificar se há categoria na URL
  if (route.query.categoria) {
    productStore.setCategory(route.query.categoria)
  }
})
</script>

<style lang="scss" scoped>
@import './Produtos.scss';
</style>