<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-dark py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <div class="hero-content">
              <h1 class="text-primary-custom fw-bold mb-3">
                <i class="bi bi-journal-text me-3 text-accent"></i>
                Blog AGROVALE
              </h1>
              <p class="text-secondary-custom fs-5 mb-4">
                Dicas, novidades e informações essenciais sobre o mundo agropecuário. 
                Mantenha-se atualizado com as melhores práticas e tendências do setor.
              </p>
              <div class="hero-stats">
                <div class="row g-3">
                  <div class="col-sm-4">
                    <div class="stat-item text-center p-3 bg-darker rounded-3">
                      <h4 class="text-accent fw-bold mb-1">50+</h4>
                      <small class="text-secondary-custom">Artigos Publicados</small>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="stat-item text-center p-3 bg-darker rounded-3">
                      <h4 class="text-accent fw-bold mb-1">5</h4>
                      <small class="text-secondary-custom">Categorias</small>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="stat-item text-center p-3 bg-darker rounded-3">
                      <h4 class="text-accent fw-bold mb-1">2025</h4>
                      <small class="text-secondary-custom">Desde</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="hero-image text-center">
              <div class="blog-illustration">
                <i class="bi bi-newspaper text-accent" style="font-size: 8rem; opacity: 0.3;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Categories -->
    <section class="categories-section py-4 bg-darker">
      <div class="container">
      <div class="row">
        <div class="col-12">
            <div class="d-flex flex-wrap gap-2 justify-content-center">
              <button 
                v-for="category in blogCategories" 
                :key="category.id"
                class="btn category-btn"
                :class="selectedCategory === category.id ? 'btn-accent' : 'btn-outline-accent'"
                @click="selectCategory(category.id)"
              >
                <i :class="category.icon" class="me-2"></i>
                {{ category.name }}
                <span class="badge bg-light text-dark ms-2">{{ category.count }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="articles-section py-5">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12 text-center">
            <h2 class="text-primary-custom fw-bold mb-3">
              <i class="bi bi-grid-3x3-gap me-2 text-accent"></i>
              Artigos em Destaque
            </h2>
            <p class="text-secondary-custom mb-0">
              Conteúdo especializado para o seu sucesso no agronegócio
            </p>
          </div>
        </div>

        <!-- Articles Grid -->
        <div class="articles-grid">
          <div class="row g-4">
            <div 
              v-for="article in mockArticles" 
              :key="article.id"
              class="col-lg-4 col-md-6"
            >
              <article class="article-card card-dark h-100">
                <div class="article-image">
                  <img 
                    :src="article.image" 
                    :alt="article.title"
                    class="img-fluid w-100"
                  >
                  <div class="article-overlay">
                    <span class="badge bg-accent text-white px-2 py-1">
                      {{ article.category }}
                    </span>
                  </div>
                </div>
                
                <div class="article-body p-4 d-flex flex-column flex-grow-1">
                  <div class="article-meta mb-3">
                    <small class="text-secondary-custom">
                      <i class="bi bi-calendar me-1"></i>
                      {{ article.date }}
                      <span class="mx-2">•</span>
                      <i class="bi bi-clock me-1"></i>
                      {{ article.readTime }} min
                    </small>
                  </div>
                  
                  <h5 class="article-title text-primary-custom fw-bold mb-3">
                    {{ article.title }}
                  </h5>
                  
                  <p class="article-excerpt text-secondary-custom mb-4 flex-grow-1">
                    {{ article.excerpt }}
                  </p>
                  
                  <div class="article-footer">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="author-info">
                        <small class="text-secondary-custom">
                          <i class="bi bi-person me-1"></i>
                          {{ article.author }}
                        </small>
                      </div>
                      <button 
                        class="btn btn-outline-accent btn-sm"
                        @click="readArticle(article)"
                      >
                        <i class="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Subscription -->
    <section class="newsletter-section py-5 bg-gradient-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="text-primary-custom fw-bold mb-3">
              <i class="bi bi-envelope-heart me-2 text-accent"></i>
              Assine Nossa Newsletter
            </h2>
            <p class="text-secondary-custom mb-4 fs-5">
              Receba semanalmente as últimas novidades, dicas e artigos sobre agropecuária diretamente no seu e-mail.
            </p>
            <div class="newsletter-form">
              <div class="row g-3 justify-content-center">
                <div class="col-md-8">
                  <input 
                    type="email" 
                    class="form-control form-control-lg bg-darker border-secondary text-primary-custom"
                    placeholder="Seu melhor e-mail"
                    v-model="newsletterEmail"
                  >
                </div>
                <div class="col-md-4">
                  <button 
                    class="btn btn-accent btn-lg w-100"
                    @click="subscribeNewsletter"
                    :disabled="isSubscribing"
                  >
                    <span v-if="isSubscribing" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="bi bi-send me-2"></i>
                    {{ isSubscribing ? 'Enviando...' : 'Assinar' }}
                  </button>
                </div>
              </div>
              <div v-if="newsletterMessage" class="mt-3">
                <div 
                  class="alert" 
                  :class="newsletterMessage.type === 'success' ? 'alert-success' : 'alert-danger'"
                >
                  {{ newsletterMessage.text }}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Estado reativo
const selectedCategory = ref('todos')
const newsletterEmail = ref('')
const isSubscribing = ref(false)
const newsletterMessage = ref(null)

// Dados mockados
const blogCategories = ref([
  { id: 'todos', name: 'Todos', icon: 'bi-grid', count: 6 },
  { id: 'saude-animal', name: 'Saúde Animal', icon: 'bi-heart-pulse', count: 2 },
  { id: 'nutricao', name: 'Nutrição', icon: 'bi-apple', count: 2 },
  { id: 'agricultura', name: 'Agricultura', icon: 'bi-tree', count: 2 }
])

const mockArticles = ref([
  {
    id: 1,
    title: 'Nutrição Adequada para Bovinos: Guia Completo',
    excerpt: 'Descubra como uma alimentação balanceada pode aumentar a produtividade do seu rebanho e reduzir custos.',
    category: 'Nutrição',
    author: 'Dr. João Silva',
    date: '15 de Janeiro, 2025',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Prevenção de Doenças em Suínos',
    excerpt: 'Estratégias eficazes para manter seu plantel saudável e produtivo através de medidas preventivas.',
    category: 'Saúde Animal',
    author: 'Dra. Maria Santos',
    date: '12 de Janeiro, 2025',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Manejo Sustentável de Pastagens',
    excerpt: 'Práticas sustentáveis para otimizar o uso de pastagens e preservar o meio ambiente.',
    category: 'Agricultura',
    author: 'Prof. Ana Costa',
    date: '10 de Janeiro, 2025',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    title: 'Vacinação em Aves: Cronograma Essencial',
    excerpt: 'Cronograma completo de vacinação para aves de corte e postura, garantindo a saúde do plantel.',
    category: 'Saúde Animal',
    author: 'Dra. Patricia Lima',
    date: '8 de Janeiro, 2025',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'Alimentação de Precisão para Pets',
    excerpt: 'Entenda como fornecer a nutrição ideal para pets domésticos com base em suas necessidades específicas.',
    category: 'Nutrição',
    author: 'Dr. Roberto Alves',
    date: '5 de Janeiro, 2025',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    title: 'Cultivo Orgânico: Tendências e Benefícios',
    excerpt: 'Explore as vantagens do cultivo orgânico e como implementar práticas sustentáveis em sua propriedade.',
    category: 'Agricultura',
    author: 'Eng. Carlos Oliveira',
    date: '3 de Janeiro, 2025',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=250&fit=crop'
  }
])

// Métodos
function selectCategory(categoryId) {
  selectedCategory.value = categoryId
}

function readArticle(article) {
  alert(`Lendo artigo: ${article.title}`)
}

async function subscribeNewsletter() {
  if (!newsletterEmail.value.trim()) return
  
  isSubscribing.value = true
  newsletterMessage.value = null
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    newsletterMessage.value = {
      type: 'success',
      text: 'Inscrição realizada com sucesso! Você receberá nossos artigos semanalmente.'
    }
    
    newsletterEmail.value = ''
  } catch (error) {
    newsletterMessage.value = {
      type: 'error',
      text: 'Erro ao realizar inscrição. Tente novamente.'
    }
  } finally {
    isSubscribing.value = false
  }
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
}

.hero-section {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
}

.categories-section {
  background: var(--bg-tertiary) !important;
}

.category-btn {
  border-radius: 2rem;
  transition: all 0.3s ease;
}

.category-btn:not(.btn-accent):hover {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.article-card {
  background: linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary));
  border: 1px solid var(--bg-tertiary);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.article-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.article-image img {
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.article-title {
  min-height: 3rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.newsletter-section {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
}

.form-control {
  background-color: var(--bg-primary) !important;
  border-color: var(--bg-tertiary) !important;
  color: var(--text-primary) !important;
}

.form-control:focus {
  background-color: var(--bg-primary) !important;
  border-color: var(--accent-primary) !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25) !important;
  color: var(--text-primary) !important;
}

.form-control::placeholder {
  color: var(--text-secondary) !important;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .article-image {
    height: 180px;
  }
  
  .hero-section {
    padding: 2rem 0 !important;
  }
  
  .categories-section {
    padding: 2rem 0 !important;
  }
  
  .category-btn {
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 576px) {
  .stat-item {
    padding: 1rem !important;
  }
}

/* Animations */
.article-card {
  animation: fadeInUp 0.6s ease-out;
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
</style>
