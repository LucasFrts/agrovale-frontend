<template>
  <section class="promotions-carousel">
    <div class="container">
      <!-- Cabeçalho da Seção -->
      <div class="promotions-carousel__header">
        <h2 class="promotions-carousel__header-title text-beige">
          <i class="bi bi-tags promotions-carousel__icon"></i>
          Produtos em Destaque
        </h2>
        <p class="promotions-carousel__header-subtitle">
          Confira nossos produtos mais populares com preços especiais
        </p>
      </div>

      <!-- Carousel -->
      <div 
        id="promotionsCarousel" 
        class="promotions-carousel__carousel carousel slide" 
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <!-- Indicadores -->
        <div class="promotions-carousel__indicators carousel-indicators">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            type="button" 
            data-bs-target="#promotionsCarousel" 
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-label="`Slide ${index + 1}`"
          ></button>
        </div>

        <!-- Slides -->
        <div class="carousel-inner">
          <div 
            v-for="(slide, slideIndex) in slides" 
            :key="slideIndex"
            class="promotions-carousel__slide carousel-item"
            :class="{ active: slideIndex === 0 }"
          >
            <div class="row g-4">
              <div 
                v-for="product in slide" 
                :key="product.id"
                class="col-lg-4 col-md-6"
              >
                <div class="promotions-carousel__card">
                  <!-- Badge de Promoção -->
                  <div class="position-relative">
                    <div class="promotions-carousel__badge">
                      <span class="promotions-carousel__badge-content">
                        <i class="bi bi-lightning-fill promotions-carousel__badge-icon"></i>
                        Destaque
                      </span>
                    </div>

                    <!-- Imagem do Produto -->
                    <div class="promotions-carousel__card-image-container">
                      <img 
                        :src="product.image" 
                        :alt="product.name"
                        class="promotions-carousel__card-image-main"
                        @error="handleImageError"
                      >
                      
                      <!-- Overlay com ação -->
                      <div class="promotions-carousel__card-image-overlay">
                        <button 
                          class="btn btn-accent btn-lg fw-bold"
                          @click="selectProductCategory(product)"
                        >
                          <i class="bi bi-eye me-2"></i>
                          Ver Produtos
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Conteúdo do Card -->
                  <div class="promotions-carousel__card-content">
                    <!-- Categoria -->
                    <div class="promotions-carousel__card-category">
                      <span class="promotions-carousel__card-category-badge badge rounded-pill">
                        {{ product.originalCategory }}
                      </span>
                    </div>

                    <!-- Nome do Produto -->
                    <h5 class="promotions-carousel__card-title">
                      {{ product.name }}
                    </h5>

                    <!-- Preço -->
                    <div class="promotions-carousel__card-price" v-if="product.price > 0">
                      <div class="promotions-carousel__card-price-container">
                        <div>
                          <span class="promotions-carousel__card-price-current">
                            R$ {{ formatPrice(product.price) }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Status -->
                    <div class="promotions-carousel__card-status">
                      <span 
                        v-if="product.inStock"
                        class="promotions-carousel__card-status-badge promotions-carousel__card-status-badge--available badge"
                      >
                        <i class="bi bi-check-circle me-1"></i>
                        Disponível
                      </span>
                      <span 
                        v-else
                        class="promotions-carousel__card-status-badge promotions-carousel__card-status-badge--unavailable badge"
                      >
                        <i class="bi bi-clock me-1"></i>
                        Consulte disponibilidade
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles de Navegação -->
        <button 
          class="promotions-carousel__control-btn carousel-control-prev" 
          type="button" 
          data-bs-target="#promotionsCarousel" 
          data-bs-slide="prev"
        >
          <div class="promotions-carousel__control-icon">
            <i class="bi bi-chevron-left"></i>
          </div>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button 
          class="promotions-carousel__control-btn carousel-control-next" 
          type="button" 
          data-bs-target="#promotionsCarousel" 
          data-bs-slide="next"
        >
          <div class="promotions-carousel__control-icon">
            <i class="bi bi-chevron-right"></i>
          </div>
          <span class="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '../../stores/products'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const router = useRouter()

// Computadas
const promotionalProducts = computed(() => productStore.promotionalProducts)

// Agrupar produtos em slides de 3
const slides = computed(() => {
  const products = promotionalProducts.value
  const slidesArray = []
  
  for (let i = 0; i < products.length; i += 3) {
    slidesArray.push(products.slice(i, i + 3))
  }
  
  return slidesArray
})

// Métodos
function selectProductCategory(product) {
  // Definir a categoria e navegar para produtos
  productStore.setCategory(product.category)
  router.push({ 
    name: 'Produtos', 
    query: { categoria: product.category } 
  })
}

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',')
}

function handleImageError(event) {
  event.target.src = 'https://via.placeholder.com/300x300/2d2d2d/ffffff?text=Produto'
}
</script>

<style lang="scss">
@import './PromotionsCarousel.scss';
</style>
