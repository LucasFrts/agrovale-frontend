<template>
  <section class="hero-carousel position-relative overflow-hidden">
    <!-- Carousel Container -->
    <div class="carousel-container position-relative">
      <!-- Slides -->
      <div 
        class="carousel-slides d-flex"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="carousel-slide position-relative"
          :class="{ active: index === currentSlide }"
        >
          <!-- Background Image -->
          <div 
            class="slide-background position-absolute w-100 h-100"
            :style="{ backgroundImage: `url(${slide.image})` }"
          ></div>
          
          <!-- Overlay -->
          <div class="slide-overlay position-absolute w-100 h-100"></div>
          
          <!-- Content Desktop -->
          <div class="slide-content slide-content-desktop position-relative d-flex align-items-center h-100">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-8 col-xl-7 text-center">
                  <!-- Badge -->
                  <div v-if="slide.badge" class="slide-badge mb-3">
                    <span class="badge bg-accent bg-opacity-25 text-beige px-3 py-2 rounded-pill">
                      <i :class="slide.badgeIcon" class="me-2"></i>
                      {{ slide.badge }}
                    </span>
                  </div>
                  
                  <!-- Title -->
                  <h1 class="slide-title text-beige fw-bold mb-4">
                    {{ slide.title }}
                  </h1>
                  
                  <!-- Subtitle -->
                  <p class="slide-subtitle text-beige mb-4 fs-5">
                    {{ slide.subtitle }}
                  </p>
                  
                  <!-- CTA Buttons -->
                  <div class="slide-actions d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <button 
                      class="btn btn-accent btn-lg px-4 py-3 fw-bold"
                      @click="handlePrimaryAction(slide.primaryAction)"
                    >
                      <i :class="slide.primaryAction.icon" class="me-2"></i>
                      {{ slide.primaryAction.text }}
                    </button>
                    
                    <button 
                      v-if="slide.secondaryAction"
                      class="btn btn-outline-light btn-lg px-4 py-3 fw-bold"
                      @click="handleSecondaryAction(slide.secondaryAction)"
                    >
                      <i :class="slide.secondaryAction.icon" class="me-2"></i>
                      {{ slide.secondaryAction.text }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Mobile -->
          <div class="slide-content slide-content-mobile position-relative d-flex flex-column justify-content-end h-100">
            <div class="slide-mobile-overlay position-absolute w-100 h-100"></div>
            <div class="slide-mobile-content position-relative p-4">
              <!-- Badge Mobile -->
              <div v-if="slide.badge" class="slide-badge-mobile mb-2">
                <span class="badge bg-accent bg-opacity-90 text-beige px-2 py-1 rounded-pill small">
                  <i :class="slide.badgeIcon" class="me-1"></i>
                  {{ slide.badge }}
                </span>
              </div>
              
              <!-- Title Mobile -->
              <h2 class="slide-title-mobile text-beige fw-bold mb-2">
                {{ slide.title }}
              </h2>
              
              <!-- Subtitle Mobile -->
              <p class="slide-subtitle-mobile text-beige mb-3">
                {{ slide.subtitle }}
              </p>
              
              <!-- CTA Buttons Mobile -->
              <div class="slide-actions-mobile d-flex flex-column gap-2">
                <button 
                  class="btn btn-accent btn-sm fw-bold"
                  @click="handlePrimaryAction(slide.primaryAction)"
                >
                  <i :class="slide.primaryAction.icon" class="me-2"></i>
                  {{ slide.primaryAction.text }}
                </button>
                
                <button 
                  v-if="slide.secondaryAction"
                  class="btn btn-outline-light btn-sm fw-bold"
                  @click="handleSecondaryAction(slide.secondaryAction)"
                >
                  <i :class="slide.secondaryAction.icon" class="me-2"></i>
                  {{ slide.secondaryAction.text }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation Arrows -->
      <button 
        class="carousel-nav carousel-nav-prev position-absolute"
        @click="previousSlide"
        :disabled="!autoPlay && currentSlide === 0"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      
      <button 
        class="carousel-nav carousel-nav-next position-absolute"
        @click="nextSlide"
        :disabled="!autoPlay && currentSlide === slides.length - 1"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
      
      <!-- Indicators -->
      <div class="carousel-indicators position-absolute">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          class="carousel-indicator"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="carousel-progress position-absolute w-100">
      <div 
        class="progress-bar"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Estado reativo
const currentSlide = ref(0)
const autoPlay = ref(true)
const autoPlayInterval = ref(null)
const progressInterval = ref(null)
const progress = ref(0)

// Dados dos slides
const slides = ref([
  {
    id: 1,
    title: 'Bem-vindo à Agrovale',
    subtitle: 'Tudo que você precisa para sua agropecuária em um só lugar. Produtos de qualidade para animais, agricultura e pecuária.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    badge: 'Novo',
    badgeIcon: 'bi bi-star-fill',
    primaryAction: {
      text: 'Ver Produtos',
      icon: 'bi bi-grid',
      action: 'products'
    },
    secondaryAction: {
      text: 'Saiba Mais',
      icon: 'bi bi-info-circle',
      action: 'about'
    }
  },
  {
    id: 2,
    title: 'Alimentação Animal Premium',
    subtitle: 'Rações e suplementos de alta qualidade para manter seus animais saudáveis e produtivos. Marcas reconhecidas mundialmente.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    badge: 'Oferta',
    badgeIcon: 'bi bi-percent',
    primaryAction: {
      text: 'Comprar Agora',
      icon: 'bi bi-bag',
      action: 'food'
    },
    secondaryAction: {
      text: 'Ver Ofertas',
      icon: 'bi bi-tag',
      action: 'offers'
    }
  },
  {
    id: 3,
    title: 'Equipamentos e Acessórios',
    subtitle: 'Mantenha sua propriedade organizada e seus animais confortáveis com nossa seleção de equipamentos e acessórios profissionais.',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    badge: 'Popular',
    badgeIcon: 'bi bi-heart-fill',
    primaryAction: {
      text: 'Explorar Equipamentos',
      icon: 'bi bi-tools',
      action: 'equipment'
    },
    secondaryAction: {
      text: 'Ver Categorias',
      icon: 'bi bi-list',
      action: 'categories'
    }
  }
])

// Computadas
const progressPercentage = computed(() => {
  return (progress.value / 100) * 100
})

// Métodos
function nextSlide() {
  if (currentSlide.value < slides.value.length - 1) {
    currentSlide.value++
  } else if (autoPlay.value) {
    currentSlide.value = 0
  }
  resetProgress()
}

function previousSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else if (autoPlay.value) {
    currentSlide.value = slides.value.length - 1
  }
  resetProgress()
}

function goToSlide(index) {
  currentSlide.value = index
  resetProgress()
}

function resetProgress() {
  progress.value = 0
}

function startAutoPlay() {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
  
  autoPlayInterval.value = setInterval(() => {
    nextSlide()
  }, 5000) // 5 segundos por slide
}

function startProgress() {
  if (progressInterval.value) {
    clearInterval(progressInterval.value)
  }
  
  progressInterval.value = setInterval(() => {
    progress.value += 1
    if (progress.value >= 100) {
      progress.value = 0
    }
  }, 50) // Atualiza a cada 50ms
}

function stopAutoPlay() {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
  if (progressInterval.value) {
    clearInterval(progressInterval.value)
    progressInterval.value = null
  }
}

function handlePrimaryAction(action) {
  console.log('Primary action:', action.action)
  // Implementar navegação baseada na ação
  switch (action.action) {
    case 'products':
      scrollToProducts()
      break
    case 'food':
      // Filtrar por categoria de alimentação
      break
    case 'toys':
      // Filtrar por categoria de brinquedos
      break
  }
}

function handleSecondaryAction(action) {
  console.log('Secondary action:', action.action)
  // Implementar ações secundárias
}

function scrollToProducts() {
  const productsSection = document.getElementById('products-section')
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Lifecycle hooks
onMounted(() => {
  startAutoPlay()
  startProgress()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.hero-carousel {
  height: 70vh;
  min-height: 500px;
  max-height: 800px;
  overflow: hidden;
  position: relative;
}

.carousel-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-slides {
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  width: 100%;
}

.carousel-slide {
  min-width: 100%;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.slide-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.slide-overlay {
  background: linear-gradient(
    135deg,
    rgba(26, 26, 26, 0.8) 0%,
    rgba(45, 45, 45, 0.6) 50%,
    rgba(26, 26, 26, 0.8) 100%
  );
}

.slide-content {
  z-index: 2;
}

/* Desktop Content */
.slide-content-desktop {
  display: flex;
}

/* Mobile Content */
.slide-content-mobile {
  display: none;
}

.slide-mobile-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  z-index: 1;
}

.slide-mobile-content {
  z-index: 2;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 2.5rem;
}

.slide-badge-mobile .badge {
  font-size: 0.75rem;
  backdrop-filter: blur(10px);
}

.slide-title-mobile {
  font-size: 1.3rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
}

.slide-subtitle-mobile {
  font-size: 0.9rem;
  line-height: 1.3;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.slide-actions-mobile {
  width: 100%;
  max-width: 100%;
}

.slide-actions-mobile .btn {
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slide-badge .badge {
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

.slide-title {
  font-size: 3.5rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.slide-subtitle {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  margin: 0 auto;
}

.slide-actions .btn {
  min-width: 200px;
  transition: all 0.3s ease;
}

.slide-actions .btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.carousel-nav:hover:not(:disabled) {
  background: var(--accent-primary);
  transform: translateY(-50%) scale(1.1);
}

.carousel-nav:focus:not(:disabled) {
  background: var(--accent-primary);
  transform: translateY(-50%) scale(1.05);
  outline: none;
  box-shadow: 0 0 0 3px rgba(22, 83, 41, 0.3);
}

.carousel-nav:active:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-50%) scale(1.0);
}

.carousel-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-nav-prev {
  left: 20px;
}

.carousel-nav-next {
  right: 20px;
}

.carousel-indicators {
  position: absolute !important;
  bottom: 30px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 100 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 8px !important;
  width: auto !important;
  margin: 0 !important;
  padding: 0 !important;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}

.carousel-indicator.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  transform: scale(1.2);
}

.carousel-indicator:hover {
  border-color: var(--accent-primary);
  transform: scale(1.1);
}

/* Força o espaçamento dos indicadores */
.hero-carousel .carousel-indicators {
  bottom: 30px !important;
}

/* Força o espaçamento dos indicadores em mobile */
@media (max-width: 768px) {
  .hero-carousel .carousel-indicators {
    bottom: 30px !important;
  }
}

@media (max-width: 576px) {
  .hero-carousel .carousel-indicators {
    bottom: 20px !important;
  }
}

/* Garantir alinhamento perfeito no desktop */
@media (min-width: 769px) {
  /* Mostrar conteúdo desktop e ocultar mobile */
  .slide-content-desktop {
    display: flex !important;
  }
  
  .slide-content-mobile {
    display: none !important;
  }
  
  .carousel-indicators {
    position: absolute !important;
    bottom: 30px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    z-index: 100 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 8px !important;
    width: auto !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .carousel-indicator {
    width: 12px !important;
    height: 12px !important;
    margin: 0 !important;
    padding: 0 !important;
    flex-shrink: 0 !important;
  }
}

.carousel-progress {
  bottom: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 10;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  transition: width 0.1s linear;
}

/* Responsividade */
@media (max-width: 768px) {
  .hero-carousel {
    height: 70vh;
    min-height: 500px;
  }
  
  /* Ocultar conteúdo desktop e mostrar mobile */
  .slide-content-desktop {
    display: none !important;
  }
  
  .slide-content-mobile {
    display: flex !important;
  }
  
  /* Otimizar overlay para mobile */
  .slide-overlay {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.1) 80%,
      transparent 100%
    );
  }
  
  /* Navegação mobile */
  .carousel-nav {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .carousel-nav-prev {
    left: 8px;
  }
  
  .carousel-nav-next {
    right: 8px;
  }
  
  .carousel-indicators {
    bottom: 30px !important;
  }
  
  .carousel-indicator {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 576px) {
  .hero-carousel {
    height: 70vh;
    min-height: 500px;
  }
  
  /* Ajustar conteúdo mobile para telas pequenas */
  .slide-mobile-content {
    padding: 1rem 0.75rem !important;
    padding-bottom: 3rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .slide-title-mobile {
    font-size: 1.2rem !important;
    line-height: 1.2;
    margin-bottom: 0.5rem !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    max-width: 100% !important;
  }
  
  .slide-subtitle-mobile {
    font-size: 0.8rem !important;
    line-height: 1.3;
    margin-bottom: 0.75rem !important;
    opacity: 0.95;
    max-width: 100% !important;
  }
  
  .slide-actions-mobile {
    gap: 0.5rem !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .slide-actions-mobile .btn {
    font-size: 0.8rem !important;
    padding: 0.4rem 0.8rem !important;
    border-radius: 0.4rem !important;
    width: 100% !important;
    max-width: 100% !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  
  .slide-badge-mobile {
    margin-bottom: 0.75rem !important;
  }
  
  .slide-badge-mobile .badge {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
  
  /* Navegação para telas pequenas */
  .carousel-nav {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
  
  .carousel-nav-prev {
    left: 8px;
  }
  
  .carousel-nav-next {
    right: 8px;
  }
  
  .carousel-indicators {
    bottom: 20px !important;
  }
  
  .carousel-indicator {
    width: 8px;
    height: 8px;
  }
}

/* Animações de entrada */
.carousel-slide {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pausar autoplay no hover */
.hero-carousel:hover .carousel-nav {
  opacity: 1;
}

.hero-carousel:not(:hover) .carousel-nav {
  opacity: 0.7;
}
</style>
