<template>
  <!-- Overlay para mobile -->
  <div 
    v-if="isOpen" 
    class="navigation-sidebar-overlay"
    @click="closeSidebar"
  ></div>

  <!-- Navigation Sidebar Mobile -->
  <aside class="navigation-sidebar" :class="sidebarClasses">
    <!-- Header do Sidebar -->
    <div class="navigation-sidebar__header">
      <div class="navigation-sidebar__logo">
        <div class="navigation-sidebar__logo-icon">
          <i class="bi bi-tree-fill"></i>
        </div>
        <span class="navigation-sidebar__logo-text">Agrovale</span>
      </div>
      <button 
        class="navigation-sidebar__close-btn"
        @click="closeSidebar"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- Menu de Navegação -->
    <nav class="navigation-sidebar__nav">
      <ul class="navigation-sidebar__menu">
        <li class="navigation-sidebar__menu-item">
          <router-link 
            to="/" 
            class="navigation-sidebar__menu-link"
            @click="closeSidebar"
          >
            <i class="bi bi-house-door"></i>
            <span>Home</span>
          </router-link>
        </li>
        <li class="navigation-sidebar__menu-item">
          <router-link 
            to="/produtos" 
            class="navigation-sidebar__menu-link"
            @click="closeSidebar"
          >
            <i class="bi bi-grid"></i>
            <span>Produtos</span>
          </router-link>
        </li>
        <li class="navigation-sidebar__menu-item">
          <router-link 
            to="/blog" 
            class="navigation-sidebar__menu-link"
            @click="closeSidebar"
          >
            <i class="bi bi-journal-text"></i>
            <span>Blog</span>
          </router-link>
        </li>
        <li class="navigation-sidebar__menu-item">
          <router-link 
            to="/contato" 
            class="navigation-sidebar__menu-link"
            @click="closeSidebar"
          >
            <i class="bi bi-envelope"></i>
            <span>Contato</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Seção de Contato/Info -->
    <div class="navigation-sidebar__footer">
      <div class="navigation-sidebar__contact">
        <h6 class="navigation-sidebar__contact-title">
          <i class="bi bi-telephone"></i>
          Fale Conosco
        </h6>
        <p class="navigation-sidebar__contact-item">
          <i class="bi bi-whatsapp"></i>
          (11) 99999-9999
        </p>
        <p class="navigation-sidebar__contact-item">
          <i class="bi bi-envelope"></i>
          contato@agrovale.com.br
        </p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, watch } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// Computed
const sidebarClasses = computed(() => ({
  'navigation-sidebar--open': props.isOpen
}))

// Métodos
function closeSidebar() {
  emit('close')
}

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
@import './NavigationSidebar.scss';
</style>
