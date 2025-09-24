<template>
  <div id="app" class="d-flex flex-column">
    <!-- Header -->
    <AppHeader 
      @toggle-navigation-sidebar="toggleNavigationSidebar"
      @toggle-cart="toggleCart"
    />

    <!-- Main Content -->
    <main class="flex-grow-1">
      <!-- Router View para navegação entre páginas -->
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Navigation Sidebar Mobile -->
    <NavigationSidebar 
      :is-open="isNavigationSidebarOpen"
      @close="closeNavigationSidebar"
    />

    <!-- Cart Sidebar (Placeholder) -->
    <div 
      v-if="isCartOpen" 
      class="cart-overlay position-fixed w-100 h-100"
      @click="closeCart"
      style="z-index: 1050; top: 0; left: 0; background: rgba(0,0,0,0.5);"
    >
      <div 
        class="cart-sidebar position-fixed bg-dark-custom h-100 p-4"
        style="right: 0; top: 0; width: 400px; z-index: 1051;"
        @click.stop
      >
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="text-primary-custom fw-bold mb-0">
            <i class="bi bi-bag me-2"></i>
            Meu Carrinho
          </h5>
          <button 
            class="btn btn-link text-primary-custom p-1"
            @click="closeCart"
          >
            <i class="bi bi-x-lg fs-5"></i>
          </button>
        </div>
        
        <div v-if="cartItems.length === 0" class="text-center py-5">
          <i class="bi bi-bag text-muted" style="font-size: 3rem;"></i>
          <p class="text-secondary-custom mt-3">Seu carrinho está vazio</p>
        </div>
        
        <div v-else>
          <!-- Cart items list would go here -->
          <div class="cart-summary border-top pt-3 mt-4">
            <div class="d-flex justify-content-between mb-3">
              <strong class="text-primary-custom">Total:</strong>
              <strong class="text-accent fs-5">R$ {{ formatPrice(cartTotal) }}</strong>
            </div>
            <button class="btn btn-accent w-100 fw-bold">
              <i class="bi bi-credit-card me-2"></i>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/common/AppHeader/AppHeader.vue'
import AppFooter from './components/common/AppFooter/AppFooter.vue'
import NavigationSidebar from './components/mobile/NavigationSidebar/NavigationSidebar.vue'

// Estado reativo para controles globais
const isCartOpen = ref(false)
const isNavigationSidebarOpen = ref(false)

// Métodos para controles globais
function toggleCart() {
  isCartOpen.value = !isCartOpen.value
}

function closeCart() {
  isCartOpen.value = false
}

function toggleNavigationSidebar() {
  isNavigationSidebarOpen.value = !isNavigationSidebarOpen.value
}

function closeNavigationSidebar() {
  isNavigationSidebarOpen.value = false
}

// Função removida - controle de mobile agora é feito em cada página

// Debounced resize handler para melhor performance
let resizeTimeout = null
function handleResize() {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    checkScreenSize()
  }, 100) // Debounce de 100ms
}

// Lifecycle hooks
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  // Verificar tamanho inicial da tela
  checkScreenSize()
  
  // Adicionar listener para mudanças de tamanho da tela
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // Remover listener e limpar timeout
  window.removeEventListener('resize', handleResize)
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
})
</script>

<style scoped>
.cart-sidebar {
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}

/* Responsividade */
@media (max-width: 768px) {
  .cart-sidebar {
    width: 100% !important;
    max-width: 400px;
  }
}

/* Scrollbar para cart sidebar */
.cart-sidebar::-webkit-scrollbar {
  width: 6px;
}

.cart-sidebar::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

.cart-sidebar::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border-radius: 3px;
}
</style>

