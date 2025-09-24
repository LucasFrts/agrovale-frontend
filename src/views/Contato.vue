<template>
  <div class="contato-page">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-dark py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="text-primary-custom fw-bold mb-3">
                <i class="bi bi-envelope me-3 text-accent"></i>
                Entre em Contato
              </h1>
              <p class="text-secondary-custom fs-5 mb-4">
                Estamos aqui para ajudar você! Nossa equipe especializada está pronta 
                para atender suas necessidades agropecuárias.
              </p>
              <div class="hero-stats">
                <div class="row g-3">
                  <div class="col-sm-6">
                    <div class="stat-item text-center p-3 bg-darker rounded-3">
                      <i class="bi bi-clock text-accent fs-3 mb-2"></i>
                      <h6 class="text-primary-custom fw-bold mb-1">Resposta Rápida</h6>
                      <small class="text-secondary-custom">Em até 2 horas</small>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="stat-item text-center p-3 bg-darker rounded-3">
                      <i class="bi bi-award text-accent fs-3 mb-2"></i>
                      <h6 class="text-primary-custom fw-bold mb-1">Especialistas</h6>
                      <small class="text-secondary-custom">Equipe qualificada</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image text-center">
              <div class="contact-illustration">
                <i class="bi bi-chat-dots text-accent" style="font-size: 8rem; opacity: 0.3;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Methods Section -->
    <section class="contact-methods py-5">
      <div class="container">
        <div class="row g-4">
          <!-- Telefone -->
          <div class="col-lg-3 col-md-6">
            <div class="contact-card card-dark h-100 text-center">
              <div class="contact-icon">
                <i class="bi bi-telephone text-accent"></i>
              </div>
              <div class="contact-content">
                <h5 class="text-primary-custom fw-bold mb-2">Telefone</h5>
                <p class="text-secondary-custom mb-3">Ligue para nós</p>
                <a 
                  href="tel:+5547999999999" 
                  class="contact-link text-accent fw-bold text-decoration-none"
                >
                  (47) 99999-9999
                </a>
                <div class="contact-action mt-3">
                  <a 
                    href="tel:+5547999999999" 
                    class="btn btn-outline-accent btn-sm"
                  >
                    <i class="bi bi-telephone me-2"></i>
                    Ligar Agora
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="col-lg-3 col-md-6">
            <div class="contact-card card-dark h-100 text-center">
              <div class="contact-icon">
                <i class="bi bi-whatsapp text-accent"></i>
              </div>
              <div class="contact-content">
                <h5 class="text-primary-custom fw-bold mb-2">WhatsApp</h5>
                <p class="text-secondary-custom mb-3">Fale conosco</p>
                <span class="contact-link text-accent fw-bold">
                  (47) 99999-9999
                </span>
                <div class="contact-action mt-3">
                  <a 
                    href="https://wa.me/5547999999999?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20produtos%20da%20Agrovale" 
                    target="_blank"
                    class="btn btn-outline-accent btn-sm"
                  >
                    <i class="bi bi-whatsapp me-2"></i>
                    Abrir Chat
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="col-lg-3 col-md-6">
            <div class="contact-card card-dark h-100 text-center">
              <div class="contact-icon">
                <i class="bi bi-envelope text-accent"></i>
              </div>
              <div class="contact-content">
                <h5 class="text-primary-custom fw-bold mb-2">E-mail</h5>
                <p class="text-secondary-custom mb-3">Envie sua mensagem</p>
                <a 
                  href="mailto:contato@agrovale.com.br" 
                  class="contact-link text-accent fw-bold text-decoration-none"
                >
                  contato@agrovale.com.br
                </a>
                <div class="contact-action mt-3">
                  <a 
                    href="mailto:contato@agrovale.com.br" 
                    class="btn btn-outline-accent btn-sm"
                  >
                    <i class="bi bi-envelope me-2"></i>
                    Enviar E-mail
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Localização -->
          <div class="col-lg-3 col-md-6">
            <div class="contact-card card-dark h-100 text-center">
              <div class="contact-icon">
                <i class="bi bi-geo-alt text-accent"></i>
              </div>
              <div class="contact-content">
                <h5 class="text-primary-custom fw-bold mb-2">Localização</h5>
                <p class="text-secondary-custom mb-3">Venha nos visitar</p>
                <span class="contact-link text-accent fw-bold">
                  Witmarsum, SC
                </span>
                <div class="contact-action mt-3">
                  <button 
                    class="btn btn-outline-accent btn-sm"
                    @click="showLocationModal = true"
                  >
                    <i class="bi bi-map me-2"></i>
                    Ver no Mapa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-form-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="contact-form-card card-dark">
              <div class="card-header text-center">
                <h3 class="text-primary-custom fw-bold mb-2">
                  <i class="bi bi-chat-square-text me-2 text-accent"></i>
                  Formulário de Contato
                </h3>
                <p class="text-secondary-custom mb-0">
                  Preencha o formulário abaixo e retornaremos em breve
                </p>
              </div>
              
              <div class="card-body">
                <form @submit.prevent="submitForm">
                  <div class="row g-3">
                    <!-- Nome -->
                    <div class="col-md-6">
                      <label class="form-label text-primary-custom fw-bold">
                        <i class="bi bi-person me-2"></i>
                        Nome Completo *
                      </label>
                      <InputText
                        v-model="form.name"
                        type="text"
                        placeholder="Seu nome completo"
                        :error="errors.name"
                        required
                      />
                    </div>

                    <!-- Email -->
                    <div class="col-md-6">
                      <label class="form-label text-primary-custom fw-bold">
                        <i class="bi bi-envelope me-2"></i>
                        E-mail *
                      </label>
                      <InputText
                        v-model="form.email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        :error="errors.email"
                        required
                      />
                    </div>

                    <!-- Telefone -->
                    <div class="col-md-6">
                      <label class="form-label text-primary-custom fw-bold">
                        <i class="bi bi-telephone me-2"></i>
                        Telefone
                      </label>
                      <InputText
                        v-model="form.phone"
                        type="tel"
                        placeholder="(47) 99999-9999"
                      />
                    </div>

                    <!-- Assunto -->
                    <div class="col-md-6">
                      <label class="form-label text-primary-custom fw-bold">
                        <i class="bi bi-tag me-2"></i>
                        Assunto *
                      </label>
                      <select 
                        class="form-select bg-darker border-secondary text-primary-custom"
                        v-model="form.subject"
                        required
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="produtos">Informações sobre produtos</option>
                        <option value="precos">Consulta de preços</option>
                        <option value="entrega">Prazos de entrega</option>
                        <option value="suporte">Suporte técnico</option>
                        <option value="parceria">Parceria/Fornecimento</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>

                    <!-- Mensagem -->
                    <div class="col-12">
                      <label class="form-label text-primary-custom fw-bold">
                        <i class="bi bi-chat-left-text me-2"></i>
                        Mensagem *
                      </label>
                      <textarea 
                        class="form-control bg-darker border-secondary text-primary-custom"
                        v-model="form.message"
                        rows="5"
                        placeholder="Descreva sua necessidade ou dúvida..."
                        required
                      ></textarea>
                      <div v-if="errors.message" class="text-danger small mt-1">
                        {{ errors.message }}
                      </div>
                    </div>

                    <!-- Checkbox de consentimento -->
                    <div class="col-12">
                      <div class="form-check">
                        <input 
                          class="form-check-input bg-darker border-secondary" 
                          type="checkbox" 
                          id="consent"
                          v-model="form.consent"
                          required
                        >
                        <label class="form-check-label text-secondary-custom" for="consent">
                          Autorizo o contato da Agrovale para resposta a esta solicitação
                        </label>
                      </div>
                    </div>

                    <!-- Botão de envio -->
                    <div class="col-12 text-center">
                      <button 
                        type="submit" 
                        class="btn btn-accent btn-lg px-5"
                        :disabled="isSubmitting"
                      >
                        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                        <i v-else class="bi bi-send me-2"></i>
                        {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
                      </button>
                    </div>
                  </div>
                </form>

                <!-- Success/Error Messages -->
                <div v-if="submitMessage" class="mt-4">
                  <div 
                    class="alert" 
                    :class="submitMessage.type === 'success' ? 'alert-success' : 'alert-danger'"
                  >
                    <i 
                      class="bi me-2"
                      :class="submitMessage.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'"
                    ></i>
                    {{ submitMessage.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Business Hours & Additional Info -->
    <section class="additional-info py-5 bg-darker">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="info-card text-center">
              <div class="info-icon mb-3">
                <i class="bi bi-clock text-accent fs-2"></i>
              </div>
              <h5 class="text-primary-custom fw-bold mb-3">Horário de Funcionamento</h5>
              <div class="hours-list">
                <div class="hour-item d-flex justify-content-between align-items-center mb-2">
                  <span class="text-secondary-custom">Segunda a Sexta:</span>
                  <span class="text-accent fw-bold">8h às 18h</span>
                </div>
                <div class="hour-item d-flex justify-content-between align-items-center mb-2">
                  <span class="text-secondary-custom">Sábado:</span>
                  <span class="text-accent fw-bold">8h às 12h</span>
                </div>
                <div class="hour-item d-flex justify-content-between align-items-center">
                  <span class="text-secondary-custom">Domingo:</span>
                  <span class="text-secondary-custom">Fechado</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="info-card text-center">
              <div class="info-icon mb-3">
                <i class="bi bi-truck text-accent fs-2"></i>
              </div>
              <h5 class="text-primary-custom fw-bold mb-3">Entrega e Atendimento</h5>
              <ul class="list-unstyled text-secondary-custom">
                <li class="mb-2">
                  <i class="bi bi-check-circle text-accent me-2"></i>
                  Entrega em toda região de Witmarsum
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle text-accent me-2"></i>
                  Atendimento personalizado
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle text-accent me-2"></i>
                  Consulta técnica especializada
                </li>
                <li>
                  <i class="bi bi-check-circle text-accent me-2"></i>
                  Preços competitivos
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="info-card text-center">
              <div class="info-icon mb-3">
                <i class="bi bi-question-circle text-accent fs-2"></i>
              </div>
              <h5 class="text-primary-custom fw-bold mb-3">FAQ - Perguntas Frequentes</h5>
              <div class="faq-quick-links">
                <button 
                  v-for="faq in quickFaqs" 
                  :key="faq.id"
                  class="btn btn-outline-secondary btn-sm w-100 mb-2 text-start"
                  @click="expandFaq(faq.id)"
                >
                  <i class="bi bi-plus-circle me-2"></i>
                  {{ faq.question }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Location Modal -->
    <div 
      v-if="showLocationModal" 
      class="modal fade show d-block" 
      style="background: rgba(0,0,0,0.5);"
      @click.self="showLocationModal = false"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content bg-dark-custom border-secondary">
          <div class="modal-header border-secondary">
            <h5 class="modal-title text-primary-custom fw-bold">
              <i class="bi bi-geo-alt me-2 text-accent"></i>
              Nossa Localização
            </h5>
            <button 
              type="button" 
              class="btn-close btn-close-white"
              @click="showLocationModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="location-info text-center">
              <div class="mb-4">
                <i class="bi bi-geo-alt text-accent" style="font-size: 3rem;"></i>
              </div>
              <h6 class="text-primary-custom fw-bold mb-3">AGROVALE</h6>
              <p class="text-secondary-custom mb-3">
                Witmarsum, Santa Catarina<br>
                Brasil
              </p>
              <p class="text-secondary-custom small">
                <i class="bi bi-info-circle me-2"></i>
                Para endereço exato e indicações detalhadas, 
                entre em contato conosco via WhatsApp ou telefone.
              </p>
            </div>
          </div>
          <div class="modal-footer border-secondary">
            <button 
              type="button" 
              class="btn btn-secondary" 
              @click="showLocationModal = false"
            >
              Fechar
            </button>
            <a 
              href="https://wa.me/5547999999999?text=Olá,%20gostaria%20de%20saber%20o%20endereço%20da%20Agrovale"
              target="_blank"
              class="btn btn-accent"
            >
              <i class="bi bi-whatsapp me-2"></i>
              Pedir Indicações
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import InputText from '../components/common/InputText/InputText.vue'

// Estado reativo
const isSubmitting = ref(false)
const submitMessage = ref(null)
const showLocationModal = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
})

const errors = reactive({
  name: null,
  email: null,
  message: null
})

const quickFaqs = ref([
  {
    id: 1,
    question: "Quais produtos vocês comercializam?",
    answer: "Trabalhamos com produtos veterinários, rações, medicamentos, suplementos e produtos para lavoura."
  },
  {
    id: 2,
    question: "Fazem entrega na região?",
    answer: "Sim, atendemos toda a região de Witmarsum e cidades próximas."
  },
  {
    id: 3,
    question: "Como posso consultar preços?",
    answer: "Entre em contato via WhatsApp, telefone ou envie uma mensagem pelo formulário."
  }
])

// Métodos
function validateForm() {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = null
  })
  
  // Validate name
  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório'
    isValid = false
  }
  
  // Validate email
  if (!form.email.trim()) {
    errors.email = 'E-mail é obrigatório'
    isValid = false
  } else if (!isValidEmail(form.email)) {
    errors.email = 'E-mail inválido'
    isValid = false
  }
  
  // Validate message
  if (!form.message.trim()) {
    errors.message = 'Mensagem é obrigatória'
    isValid = false
  }
  
  return isValid
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function submitForm() {
  if (!validateForm()) return
  
  isSubmitting.value = true
  submitMessage.value = null
  
  try {
    // Simular envio de formulário
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simular sucesso/erro
    const isSuccess = Math.random() > 0.2 // 80% de chance de sucesso
    
    if (isSuccess) {
      submitMessage.value = {
        type: 'success',
        text: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      }
      
      // Reset form
      Object.keys(form).forEach(key => {
        form[key] = key === 'consent' ? false : ''
      })
    } else {
      submitMessage.value = {
        type: 'error',
        text: 'Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.'
      }
    }
  } catch (error) {
    submitMessage.value = {
      type: 'error',
      text: 'Erro ao enviar mensagem. Verifique sua conexão e tente novamente.'
    }
  } finally {
    isSubmitting.value = false
  }
}

function expandFaq(faqId) {
  const faq = quickFaqs.value.find(f => f.id === faqId)
  if (faq) {
    alert(faq.answer) // Substituir por modal mais elaborado se necessário
  }
}
</script>

<style scoped>
.contato-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
}

.hero-section {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
}

.contact-card {
  background: linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary));
  border: 1px solid var(--bg-tertiary);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  transition: all 0.3s ease;
  text-align: center;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.contact-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
}

.contact-form-card {
  background: linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary));
  border: 1px solid var(--bg-tertiary);
  border-radius: 1rem;
  overflow: hidden;
}

.card-header {
  background: rgba(255, 107, 53, 0.1);
  border-bottom: 1px solid var(--bg-tertiary);
  padding: 2rem;
}

.card-body {
  padding: 2rem;
}

.form-control,
.form-select {
  background-color: var(--bg-primary) !important;
  border-color: var(--bg-tertiary) !important;
  color: var(--text-primary) !important;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
}

.form-control:focus,
.form-select:focus {
  background-color: var(--bg-primary) !important;
  border-color: var(--accent-primary) !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25) !important;
  color: var(--text-primary) !important;
}

.form-control::placeholder {
  color: var(--text-secondary) !important;
  opacity: 0.8;
}

.form-check-input:focus {
  border-color: var(--accent-primary) !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25) !important;
}

.form-check-input:checked {
  background-color: var(--accent-primary) !important;
  border-color: var(--accent-primary) !important;
}

.additional-info {
  background: var(--bg-tertiary) !important;
}

.info-card {
  background: linear-gradient(145deg, var(--bg-secondary), var(--bg-primary));
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  border: 1px solid var(--bg-tertiary);
  height: 100%;
}

.contact-link:hover {
  color: var(--accent-secondary) !important;
}

.hours-list {
  background: var(--bg-primary);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--bg-tertiary);
}

.btn-outline-secondary:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--bg-tertiary);
}

.modal-content {
  border-radius: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-card {
    padding: 1.5rem 1rem;
  }
  
  .contact-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .card-header,
  .card-body {
    padding: 1.5rem;
  }
  
  .info-card {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 2rem 0 !important;
  }
  
  .contact-methods {
    padding: 2rem 0 !important;
  }
}

/* Animations */
.contact-card,
.contact-form-card,
.info-card {
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