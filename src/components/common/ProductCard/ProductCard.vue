<template>
  <div :class="cardClasses">
    <!-- Badge de Status -->
    <div class="position-relative">
      <div 
        v-if="!product.inStock" 
        class="position-absolute top-0 start-0 m-2"
        style="z-index: 10;"
      >
        <span class="badge bg-danger rounded-pill px-3 py-2">
          <i class="bi bi-exclamation-triangle me-1"></i>
          Esgotado
        </span>
      </div>
      
      <!-- Badge de Avaliação -->
      <div 
        class="position-absolute top-0 end-0 m-2"
        style="z-index: 10;"
      >
        <div class="rating-badge bg-dark bg-opacity-75 rounded-pill px-2 py-1">
          <i class="bi bi-star-fill text-warning me-1"></i>
          <span class="text-white small fw-bold">{{ product.rating }}</span>
        </div>
      </div>

      <!-- Imagem do Produto -->
      <div class="product-image-container position-relative overflow-hidden">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="product-image w-100"
          @error="handleImageError"
        >
        
        <!-- Overlay com ações rápidas -->
        <div class="product-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
          <div class="quick-actions d-flex gap-2">
            <button 
              class="btn btn-accent btn-sm rounded-circle"
              @click="showProductDetails"
              title="Ver detalhes"
            >
              <i class="bi bi-eye"></i>
            </button>
            <button 
              class="btn btn-light btn-sm rounded-circle"
              @click="toggleWishlist"
              :title="isInWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
            >
              <i class="bi" :class="isInWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo do Card -->
    <div class="card-body p-3 d-flex flex-column">
      <!-- Categoria -->
      <div class="product-category mb-2">
        <span class="badge rounded-pill px-2 py-1 small category-badge">
          {{ getCategoryName() }}
        </span>
      </div>

      <!-- Nome do Produto -->
      <h6 class="product-name mb-2 fw-bold lh-sm">
        {{ product.name }}
      </h6>

      <!-- Descrição -->
      <p class="product-description small mb-3 flex-grow-1">
        {{ product.description }}
      </p>

      <!-- Preço e Ações -->
      <div class="product-footer">
        <!-- Preço -->
        <div class="price-container mb-3">
          <div class="d-flex align-items-center justify-content-between">
            <div class="price">
              <span class="current-price text-accent fw-bold fs-5">
                R$ {{ formatPrice(product.price) }}
              </span>
            </div>
            <div class="stock-indicator">
              <span 
                v-if="product.inStock"
                class="badge bg-success bg-opacity-25 text-success small"
              >
                <i class="bi bi-check-circle me-1"></i>
                Em estoque
              </span>
            </div>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="action-buttons d-flex gap-2">
          <button 
            class="btn btn-accent flex-grow-1 fw-bold"
            :disabled="!product.inStock || isAddingToCart"
            @click="addToCart"
          >
            <span v-if="isAddingToCart" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="bi bi-bag-plus me-2"></i>
            {{ isAddingToCart ? 'Adicionando...' : 'Adicionar' }}
          </button>
          
          <button 
            class="btn btn-outline-accent"
            @click="showProductDetails"
            title="Ver detalhes"
          >
            <i class="bi bi-info-circle"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../../../stores/products'

const productStore = useProductStore()

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'featured', 'promoted'].includes(value)
  }
})

// Estado local
const isAddingToCart = ref(false)
const isInWishlist = ref(false)

// Computed
const cardClasses = computed(() => {
  const classes = ['product-card', 'product-card__wrapper', 'fade-in-up']
  
  // Tema
  classes.push(`product-card--${props.theme}-theme`)
  
  // Variante
  if (props.variant !== 'default') {
    classes.push(`product-card--${props.variant}`)
  }
  
  return classes
})

// Métodos
async function addToCart() {
  if (!props.product.inStock) return
  
  isAddingToCart.value = true
  
  try {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    productStore.addToCart(props.product)
    
    // Feedback visual (pode ser substituído por toast/notification)
    console.log(`${props.product.name} adicionado ao carrinho!`)
    
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error)
  } finally {
    isAddingToCart.value = false
  }
}

function toggleWishlist() {
  isInWishlist.value = !isInWishlist.value
  // Implementar lógica de wishlist
  console.log(`Produto ${isInWishlist.value ? 'adicionado aos' : 'removido dos'} favoritos`)
}

function showProductDetails() {
  // Implementar modal/página de detalhes do produto
  console.log('Mostrar detalhes do produto:', props.product.id)
}

function getCategoryName() {
  const category = productStore.categories.find(cat => cat.id === props.product.category)
  return category ? category.name : 'Produto'
}

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',')
}

function handleImageError(event) {
  // Fallback para imagem quebrada
  event.target.src = 'https://via.placeholder.com/300x300/2d2d2d/ffffff?text=Produto'
}
</script>

<style lang="scss">
@import './ProductCard.scss';
</style>