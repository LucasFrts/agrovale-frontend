<template>
  <footer class="app-footer bg-dark-custom border-top border-secondary">
    <!-- Main Footer Content -->
    <div class="footer-main py-5">
      <div class="container">
        <div class="row g-4">
          <!-- Company Info -->
          <div class="col-lg-4 col-md-6">
            <div class="footer-section">
              <div class="footer-logo mb-4">
                <div class="d-flex align-items-center">
                  <div class="logo-icon bg-gradient rounded-circle p-2 me-3">
                    <i class="bi bi-heart-fill text-primary-custom fs-4"></i>
                  </div>
                  <div>
                    <h5 class="text-primary-custom fw-bold mb-1">Agrovale</h5>
                    <p class="text-secondary-custom small mb-0">Agropecuária</p>
                  </div>
                </div>
              </div>
              
              <p class="text-secondary-custom mb-4">
                A AGROVALE iniciou suas atividades em agosto de 2025 em Witmarsum, SC, com o objetivo de atender 
                de forma completa as necessidades do negócio rural e urbano. Oferecemos produtos de qualidade 
                para saúde e bem-estar animal, além de produtos agrícolas a preços acessíveis.
              </p>
              
              <!-- Social Media -->
              <div class="social-links">
                <h6 class="text-primary-custom fw-bold mb-3">Siga-nos</h6>
                <div class="d-flex gap-3">
                  <a 
                    v-for="social in socialLinks" 
                    :key="social.name"
                    :href="social.url" 
                    :title="social.name"
                    class="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i :class="social.icon" class="fs-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div class="col-lg-2 col-md-6">
            <div class="footer-section">
              <h6 class="text-primary-custom fw-bold mb-3">Links Rápidos</h6>
              <ul class="list-unstyled">
                <li v-for="link in quickLinks" :key="link.name" class="mb-2">
                  <router-link 
                    :to="link.route" 
                    class="text-secondary-custom text-decoration-none"
                    @click="trackLinkClick(link.name)"
                  >
                    <i :class="link.icon" class="me-2"></i>{{ link.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Categories -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-section">
              <h6 class="text-primary-custom fw-bold mb-3">Categorias</h6>
              <ul class="list-unstyled">
                <li v-for="category in categories" :key="category.name" class="mb-2">
                  <router-link 
                    :to="{ name: 'Produtos', query: { categoria: category.id } }"
                    class="text-secondary-custom text-decoration-none"
                  >
                    <i class="bi bi-chevron-right me-2"></i>{{ category.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Newsletter -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-section">
              <h6 class="text-primary-custom fw-bold mb-3">Newsletter</h6>
              <p class="text-secondary-custom mb-3">
                Receba ofertas exclusivas e novidades sobre produtos agropecuários.
              </p>
              
              <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
                <div class="input-group mb-3">
                  <input 
                    v-model="newsletterEmail"
                    type="email" 
                    class="form-control"
                    placeholder="Seu e-mail"
                    required
                    :disabled="isSubscribing"
                  >
                  <button 
                    class="btn btn-primary-custom" 
                    type="submit"
                    :disabled="isSubscribing"
                  >
                    <span v-if="isSubscribing" class="spinner-border spinner-border-sm me-1"></span>
                    <i v-else class="bi bi-send me-1"></i>
                    {{ isSubscribing ? 'Enviando...' : 'Inscrever' }}
                  </button>
                </div>
                
                <!-- Newsletter Message -->
                <div 
                  v-if="newsletterMessage" 
                  :class="['alert', newsletterMessage.type === 'success' ? 'alert-success' : 'alert-danger']"
                  role="alert"
                >
                  {{ newsletterMessage.text }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="footer-bottom border-top border-secondary">
      <div class="container">
        <div class="row align-items-center py-3">
          <div class="col-md-6">
            <div class="d-flex align-items-center">
              <p class="text-secondary-custom mb-0 small">
                &copy; {{ currentYear }} AGROVALE. Todos os direitos reservados.
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-md-end justify-content-start gap-4 mt-2 mt-md-0">
              <a href="/privacy" class="text-secondary-custom text-decoration-none small">
                Política de Privacidade
              </a>
              <a href="/terms" class="text-secondary-custom text-decoration-none small">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Back to Top Button -->
    <Transition name="fade">
      <button 
        v-if="showBackToTop"
        @click="scrollToTop"
        class="back-to-top-btn"
        title="Voltar ao topo"
      >
        <i class="bi bi-arrow-up"></i>
      </button>
    </Transition>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useProductStore } from '../../../stores/products'

const productStore = useProductStore()

// Reactive state
const newsletterEmail = ref('')
const isSubscribing = ref(false)
const newsletterMessage = ref(null)
const showBackToTop = ref(false)

// Computed
const currentYear = computed(() => new Date().getFullYear())
const categories = computed(() => productStore.categories.slice(0, 6))

// Static data
const socialLinks = [
  { name: 'Facebook', icon: 'bi bi-facebook', url: 'https://facebook.com' },
  { name: 'Instagram', icon: 'bi bi-instagram', url: 'https://instagram.com' },
  { name: 'WhatsApp', icon: 'bi bi-whatsapp', url: 'https://wa.me/5547999999999' },
  { name: 'LinkedIn', icon: 'bi bi-linkedin', url: 'https://linkedin.com' }
]

const quickLinks = [
  { name: 'Início', route: { name: 'Home' }, icon: 'bi bi-house' },
  { name: 'Produtos', route: { name: 'Produtos' }, icon: 'bi bi-grid' },
  { name: 'Sobre Nós', route: { name: 'SobreNos' }, icon: 'bi bi-info-circle' },
  { name: 'Contato', route: { name: 'Contato' }, icon: 'bi bi-envelope' },
  { name: 'Blog', route: { name: 'Blog' }, icon: 'bi bi-journal-text' }
]

// Methods
function trackLinkClick(linkName) {
  console.log(`Footer link clicked: ${linkName}`)
}

async function subscribeNewsletter() {
  if (!newsletterEmail.value.trim()) return
  
  isSubscribing.value = true
  newsletterMessage.value = null
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    newsletterMessage.value = {
      type: 'success',
      text: 'Inscrição realizada com sucesso! Verifique seu e-mail.'
    }
    
    newsletterEmail.value = ''
    
    setTimeout(() => {
      newsletterMessage.value = null
    }, 3000)
    
  } catch (error) {
    newsletterMessage.value = {
      type: 'error',
      text: 'Erro ao realizar inscrição. Tente novamente.'
    }
  } finally {
    isSubscribing.value = false
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleScroll() {
  showBackToTop.value = window.scrollY > 300
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import './AppFooter.scss';
</style>