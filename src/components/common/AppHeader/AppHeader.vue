<template>
  <header class="app-header bg-secondary shadow-lg position-sticky top-0" style="z-index: 1000;">
    <nav class="navbar navbar-expand-lg navbar-dark px-3 px-lg-4">
      <div class="container-fluid">
        <!-- Menu Hambúrguer (Mobile) -->
        <button 
          class="navbar-toggler border-0 desktop-hidden me-3" 
          type="button"
          @click="toggleNavigationSidebar"
        >
          <i class="bi bi-list fs-4 text-primary-custom"></i>
        </button>

        <!-- Logo -->
        <router-link :to="{ name: 'Home' }" class="navbar-brand d-flex align-items-center text-decoration-none">
          <div class="logo-container d-flex align-items-center">
            <div class="logo-icon me-2">
              <img 
                :src="logoImage" 
                alt="Agrovale Agropequária" 
                class="logo-image"
              />
            </div>
            <div class="logo-text">
              <h4 class="mb-0 text-primary-custom fw-bold">AGROVALE</h4>
              <small class="text-secondary-custom d-none d-md-block">AGROPECUÁRIA</small>
            </div>
          </div>
        </router-link>

        <!-- Barra de Busca (Desktop) -->
        <div class="search-container flex-grow-1 mx-4 mobile-hidden">
          <InputText
            v-model="searchQuery"
            placeholder="Buscar produtos agropecuários..."
            icon="bi bi-search"
            button-text="Buscar"
            variant="search"
            @input="updateSearch"
            @button-click="handleSearch"
            @enter="handleSearch"
          />
        </div>

        <!-- Menu de Navegação (Desktop) -->
        <div class="navigation-menu mobile-hidden me-4">
          <nav class="d-flex gap-3">
            <router-link 
              :to="{ name: 'Home' }" 
              class="nav-link text-primary-custom text-decoration-none fw-medium"
            >
              <i class="bi bi-house me-1"></i>
              Início
            </router-link>
            <router-link 
              :to="{ name: 'Produtos' }" 
              class="nav-link text-primary-custom text-decoration-none fw-medium"
            >
              <i class="bi bi-grid me-1"></i>
              Produtos
            </router-link>
            <router-link 
              :to="{ name: 'SobreNos' }" 
              class="nav-link text-primary-custom text-decoration-none fw-medium"
            >
              <i class="bi bi-info-circle me-1"></i>
              Sobre
            </router-link>
            <router-link 
              :to="{ name: 'Contato' }" 
              class="nav-link text-primary-custom text-decoration-none fw-medium"
            >
              <i class="bi bi-envelope me-1"></i>
              Contato
            </router-link>
          </nav>
        </div>

        <!-- Ações do usuário -->
        <div class="user-actions d-flex align-items-center">
          <!-- Busca Mobile -->
          <button 
            class="btn btn-link text-primary-custom p-2 desktop-hidden me-2"
            @click="toggleMobileSearch"
          >
            <i class="bi bi-search fs-5"></i>
          </button>

          <!-- Carrinho -->
          <div class="position-relative me-3">
            <button 
              class="btn btn-link text-primary-custom p-2 position-relative"
              @click="toggleCart"
            >
              <i class="bi bi-bag fs-5"></i>
              <span 
                v-if="cartItemCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ cartItemCount }}
              </span>
            </button>
          </div>

          <!-- Perfil -->
          <button class="btn btn-link text-primary-custom p-2">
            <i class="bi bi-person-circle fs-5"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Barra de busca mobile (expandível) -->
    <div v-if="showMobileSearch" class="mobile-search-bar desktop-hidden p-3 bg-darker">
      <InputText
        v-model="searchQuery"
        placeholder="Buscar produtos agropecuários..."
        icon="bi bi-search"
        button-text=""
        variant="search"
        size="sm"
        @input="updateSearch"
        @button-click="handleSearch"
        @enter="handleSearch"
      />
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../../../stores/products'
import InputText from '../InputText/InputText.vue'
import logoImage from '../../../assets/imagem/agrovale.jpeg'

const productStore = useProductStore()

// Estado local do componente
const searchQuery = ref('')
const showMobileSearch = ref(false)

// Computadas
const cartItemCount = computed(() => productStore.cartItemCount)

// Emits para comunicação com componente pai
const emit = defineEmits(['toggle-navigation-sidebar', 'toggle-cart'])

// Métodos
function toggleNavigationSidebar() {
  emit('toggle-navigation-sidebar')
}

function toggleCart() {
  emit('toggle-cart')
}

function toggleMobileSearch() {
  showMobileSearch.value = !showMobileSearch.value
}

function updateSearch() {
  productStore.setSearchTerm(searchQuery.value)
}

function handleSearch() {
  productStore.setSearchTerm(searchQuery.value)
  showMobileSearch.value = false
}
</script>

<style scoped>
@import './AppHeader.scss';
</style>