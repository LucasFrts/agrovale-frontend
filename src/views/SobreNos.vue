<template>
  <div class="sobre-nos-page">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <div class="hero-content">
              <h1 class="display-4 fw-bold mb-4 text-primary-custom">
                <i class="bi bi-heart-fill me-3 text-accent"></i>
                Sobre a AGROVALE
              </h1>
              <p class="lead mb-4 text-secondary-custom">
                Conheça nossa história, missão e a equipe que trabalha com dedicação 
                para oferecer os melhores produtos e serviços agropecuários.
              </p>
              <div class="hero-stats d-flex flex-wrap gap-4">
                <div class="stat-item text-primary-custom">
                  <h3 class="fw-bold text-accent mb-1">{{ companyInfo.foundedYear }}</h3>
                  <small class="text-secondary-custom">Fundação</small>
                </div>
                <div class="stat-item text-primary-custom">
                  <h3 class="fw-bold text-accent mb-1">{{ companyInfo.teamSize }}</h3>
                  <small class="text-secondary-custom">Profissionais especializados</small>
                </div>
                <div class="stat-item text-primary-custom">
                  <h3 class="fw-bold text-accent mb-1">{{ companyInfo.customersCount }}</h3>
                  <small class="text-secondary-custom">Clientes satisfeitos</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="hero-image text-center">
              <div class="company-logo bg-white rounded-circle p-4 shadow-lg">
                <i class="bi bi-tree-fill text-primary-custom" style="font-size: 4rem;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company History Section -->
    <section class="company-history-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="section-header text-center mb-5">
              <h2 class="text-beige fw-bold mb-3">
                <i class="bi bi-book me-2 text-beige"></i>
                Nossa História
              </h2>
              <p class="text-beige">
                Conheça a trajetória e os valores que nos guiam desde o início
              </p>
            </div>

            <div class="history-content">
              <div class="row g-4">
                <div class="col-lg-6">
                  <div class="history-card bg-darker rounded-4 p-4 h-100 shadow-lg">
                    <div class="mb-3">
                      <i class="bi bi-calendar-event text-accent" style="font-size: 2.5rem;"></i>
                    </div>
                    <h4 class="text-primary-custom fw-bold mb-3">Nossa Origem</h4>
                    <p class="text-secondary-custom mb-3">
                      A AGROVALE iniciou suas atividades em <strong>agosto de 2025</strong> na cidade de 
                      <strong>Witmarsum, Santa Catarina</strong>, com a intenção de atender de forma mais 
                      completa as necessidades do negócio rural e urbano.
                    </p>
                    <p class="text-secondary-custom mb-0">
                      O empreendimento nasceu do desejo dos sócios de construir uma empresa que fosse 
                      além da simples venda de produtos, oferecendo um atendimento próximo e customizado.
                    </p>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="history-card bg-darker rounded-4 p-4 h-100 shadow-lg">
                    <div class="mb-3">
                      <i class="bi bi-geo-alt text-accent" style="font-size: 2.5rem;"></i>
                    </div>
                    <h4 class="text-primary-custom fw-bold mb-3">Localização e Atuação</h4>
                    <p class="text-secondary-custom mb-3">
                      Localizada em <strong>Witmarsum, SC</strong>, atendemos todo o 
                      <strong>Estado de Santa Catarina</strong> através de nosso site para compras online 
                      e entregas diretas.
                    </p>
                    <p class="text-secondary-custom mb-0">
                      Nosso foco é contribuir para o fortalecimento da economia regional e o 
                      bem-estar animal em toda Santa Catarina.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Information Section -->
    <section class="company-info-section py-5 bg-dark-custom">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="section-header text-center mb-5">
              <h2 class="text-beige fw-bold mb-3">
                <i class="bi bi-building me-2 text-beige"></i>
                Informações da Empresa
              </h2>
              <p class="text-beige">
                Dados oficiais e informações institucionais da AGROVALE
              </p>
            </div>

            <!-- Company Details Card -->
            <div class="company-details-card bg-darker rounded-4 p-4 mb-5 shadow-lg">
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="detail-item">
                    <h6 class="text-accent fw-bold mb-2">
                      <i class="bi bi-building me-2"></i>
                      Razão Social
                    </h6>
                    <p class="text-primary-custom mb-0">{{ companyInfo.legalName }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="detail-item">
                    <h6 class="text-accent fw-bold mb-2">
                      <i class="bi bi-tag me-2"></i>
                      Nome Fantasia
                    </h6>
                    <p class="text-primary-custom mb-0">{{ companyInfo.tradeName }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="detail-item">
                    <h6 class="text-accent fw-bold mb-2">
                      <i class="bi bi-file-text me-2"></i>
                      CNPJ
                    </h6>
                    <p class="text-primary-custom mb-0">{{ companyInfo.cnpj }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="detail-item">
                    <h6 class="text-accent fw-bold mb-2">
                      <i class="bi bi-file-earmark-text me-2"></i>
                      Inscrição Estadual
                    </h6>
                    <p class="text-primary-custom mb-0">{{ companyInfo.stateRegistration }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="detail-item">
                    <h6 class="text-accent fw-bold mb-2">
                      <i class="bi bi-geo-alt me-2"></i>
                      Endereço
                    </h6>
                    <p class="text-primary-custom mb-0">{{ companyInfo.address }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="detail-item">
                    <h6 class="text-accent fw-bold mb-2">
                      <i class="bi bi-calendar-event me-2"></i>
                      Data de Fundação
                    </h6>
                    <p class="text-primary-custom mb-0">{{ companyInfo.foundedDate }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products and Target Audience Section -->
    <section class="products-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="section-header text-center mb-5">
              <h2 class="text-beige fw-bold mb-3">
                <i class="bi bi-basket me-2 text-beige"></i>
                Nossos Produtos e Público-Alvo
              </h2>
              <p class="text-beige">
                Conheça nossa linha de produtos e quem atendemos
              </p>
            </div>

            <div class="row g-4">
              <div class="col-lg-6">
                <div class="products-card bg-darker rounded-4 p-4 h-100 shadow-lg">
                  <div class="mb-3">
                    <i class="bi bi-box-seam text-accent" style="font-size: 2.5rem;"></i>
                  </div>
                  <h4 class="text-primary-custom fw-bold mb-3">Nossa Linha de Produtos</h4>
                  <p class="text-secondary-custom mb-3">
                    Oferecemos uma ampla variedade de produtos voltados para a saúde e bem-estar animal, 
                    além de produtos agrícolas de qualidade:
                  </p>
                  <ul class="products-list text-secondary-custom mb-0">
                    <li class="mb-2">• Rações para animais de pequeno e grande porte</li>
                    <li class="mb-2">• Medicamentos veterinários</li>
                    <li class="mb-2">• Sementes e adubos</li>
                    <li class="mb-2">• Defensivos agrícolas autorizados</li>
                    <li class="mb-2">• Acessórios para cuidado animal</li>
                    <li class="mb-0">• Insumos essenciais para produtividade agrícola</li>
                  </ul>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="products-card bg-darker rounded-4 p-4 h-100 shadow-lg">
                  <div class="mb-3">
                    <i class="bi bi-people text-accent" style="font-size: 2.5rem;"></i>
                  </div>
                  <h4 class="text-primary-custom fw-bold mb-3">Nosso Público-Alvo</h4>
                  <p class="text-secondary-custom mb-3">
                    Atendemos diferentes segmentos com produtos e serviços especializados:
                  </p>
                  <ul class="audience-list text-secondary-custom mb-0">
                    <li class="mb-2">• <strong>Produtores rurais</strong> - Insumos para agricultura e pecuária</li>
                    <li class="mb-2">• <strong>Consumidores urbanos</strong> - Cuidado com animais de estimação</li>
                    <li class="mb-2">• <strong>Fazendeiros</strong> - Produtos para animais de grande porte</li>
                    <li class="mb-2">• <strong>Agricultores</strong> - Sementes, adubos e defensivos</li>
                    <li class="mb-0">• <strong>Veterinários</strong> - Medicamentos e acessórios profissionais</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values Section -->
    <section class="mission-vision-section py-5 bg-dark-custom">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="section-header text-center mb-5">
              <h2 class="text-beige fw-bold mb-3">
                <i class="bi bi-compass me-2 text-beige"></i>
                Nossa Identidade
              </h2>
              <p class="text-beige">
                Os princípios que guiam nossa empresa e definem nossa cultura organizacional
              </p>
            </div>

            <div class="row g-4">
              <!-- Mission -->
              <div class="col-lg-4">
                <div class="identity-card bg-darker rounded-4 p-4 h-100 shadow-lg">
                  <div class="mb-3">
                    <i class="bi bi-bullseye text-accent" style="font-size: 2.5rem;"></i>
                  </div>
                  <h4 class="text-primary-custom fw-bold mb-3">Missão</h4>
                  <p class="text-secondary-custom mb-0">{{ companyInfo.mission }}</p>
                </div>
              </div>

              <!-- Vision -->
              <div class="col-lg-4">
                <div class="identity-card bg-darker rounded-4 p-4 h-100 shadow-lg">
                  <div class="mb-3">
                    <i class="bi bi-eye text-accent" style="font-size: 2.5rem;"></i>
                  </div>
                  <h4 class="text-primary-custom fw-bold mb-3">Visão</h4>
                  <p class="text-secondary-custom mb-0">{{ companyInfo.vision }}</p>
                </div>
              </div>

              <!-- Values -->
              <div class="col-lg-4">
                <div class="identity-card bg-darker rounded-4 p-4 h-100 shadow-lg">
                  <div class="mb-3">
                    <i class="bi bi-heart text-accent" style="font-size: 2.5rem;"></i>
                  </div>
                  <h4 class="text-primary-custom fw-bold mb-3">Valores</h4>
                  <ul class="values-list text-secondary-custom mb-0">
                    <li v-for="value in companyInfo.values" :key="value.title" class="mb-2">
                      <strong class="text-accent">{{ value.title }}:</strong> {{ value.description }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Investment Section -->
    <section class="investment-section py-5 bg-dark-custom">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="section-header text-center mb-5">
              <h2 class="text-beige fw-bold mb-3">
                <i class="bi bi-currency-dollar me-2 text-beige"></i>
                Investimento e Estrutura
              </h2>
              <p class="text-beige">
                Conheça os recursos investidos e nossa estrutura empresarial
              </p>
            </div>

            <div class="investment-card bg-darker rounded-4 p-4 mb-5 shadow-lg">
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="investment-item text-center">
                    <div class="investment-icon mb-3">
                      <i class="bi bi-bank text-accent" style="font-size: 3rem;"></i>
                    </div>
                    <h4 class="text-primary-custom fw-bold mb-2">Capital Inicial</h4>
                    <p class="text-accent fs-3 fw-bold mb-2">{{ companyInfo.initialCapital }}</p>
                    <p class="text-secondary-custom small mb-0">
                      Investimento integralizado pelos quatro sócios para aquisição de imobilizado e mercadorias
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="investment-item text-center">
                    <div class="investment-icon mb-3">
                      <i class="bi bi-building text-accent" style="font-size: 3rem;"></i>
                    </div>
                    <h4 class="text-primary-custom fw-bold mb-2">Estrutura Empresarial</h4>
                    <p class="text-secondary-custom mb-2">
                      Empresa constituída com <strong>4 sócios</strong> especializados em diferentes áreas:
                    </p>
                    <ul class="structure-list text-secondary-custom small mb-0">
                      <li>• Diretoria Administrativa</li>
                      <li>• Diretoria Financeira</li>
                      <li>• Diretoria Operacional</li>
                      <li>• Diretoria de Vendas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Management Team Section -->
    <section class="team-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 mx-auto">
            <div class="section-header text-center mb-5">
              <h2 class="text-beige fw-bold mb-3">
                <i class="bi bi-people-fill me-2 text-beige"></i>
                Equipe de Gestão
              </h2>
              <p class="text-beige">
                Conheça os sócios que administram a AGROVALE com dedicação e expertise
              </p>
            </div>

            <div class="row g-4">
              <div 
                v-for="partner in managementTeam" 
                :key="partner.id"
                class="col-lg-6 col-xl-3"
              >
                <div class="team-card bg-darker rounded-4 p-4 h-100 shadow-lg">
                  <div class="team-member text-center">
                    <div class="member-avatar mb-3">
                      <div class="avatar-circle bg-gradient rounded-circle mx-auto d-flex align-items-center justify-content-center">
                        <i :class="partner.icon" class="text-primary-custom fs-2"></i>
                      </div>
                    </div>
                    <h5 class="text-primary-custom fw-bold mb-2">{{ partner.name }}</h5>
                    <h6 class="text-accent fw-bold mb-3">{{ partner.position }}</h6>
                    
                    <div class="member-details">
                      <div class="detail-item mb-3">
                        <h6 class="text-secondary-custom small fw-bold mb-1">
                          <i class="bi bi-mortarboard me-1"></i>
                          Formação
                        </h6>
                        <p class="text-primary-custom small mb-0">{{ partner.education }}</p>
                      </div>
                      
                      <div class="detail-item">
                        <h6 class="text-secondary-custom small fw-bold mb-2">
                          <i class="bi bi-briefcase me-1"></i>
                          Atribuições
                        </h6>
                        <ul class="responsibilities-list text-primary-custom small mb-0">
                          <li v-for="responsibility in partner.responsibilities" :key="responsibility" class="mb-1">
                            {{ responsibility }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h3 class="fw-bold mb-4 text-primary-custom">
              <i class="bi bi-handshake me-2 text-accent"></i>
              Pronto para trabalhar conosco?
            </h3>
            <p class="lead mb-4 text-secondary-custom">
              Entre em contato conosco e descubra como podemos ajudar você 
              com produtos e serviços de qualidade para sua propriedade.
            </p>
            <div class="cta-buttons d-flex flex-wrap justify-content-center gap-3">
              <button class="btn btn-accent btn-lg px-4" @click="scrollToContact">
                <i class="bi bi-telephone me-2"></i>
                Fale Conosco
              </button>
              <button class="btn btn-outline-primary btn-lg px-4" @click="navigateToProducts">
                <i class="bi bi-grid me-2"></i>
                Ver Produtos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// Router para navegação
const router = useRouter()

// Informações da empresa - dados reativos para facilitar manutenção
const companyInfo = reactive({
  legalName: 'AGROVALE LTDA',
  tradeName: 'AGROVALE',
  cnpj: '12.345.678/0001-10',
  stateRegistration: '123.456.789',
  address: 'Witmarsum, Santa Catarina',
  foundedDate: 'Agosto de 2025',
  foundedYear: '2025', // Ano de fundação
  teamSize: '4', // Número de sócios
  customersCount: '500+', // Número estimado de clientes
  initialCapital: 'R$ 100.000,00', // Capital inicial investido
  
  mission: 'Fornecer produtos e serviços de qualidade, que promovam a saúde e bem-estar dos animais, atendendo os clientes com dedicação, respeito e conhecimento técnico, e contribuindo para o desenvolvimento do campo, da cidade e do meio ambiente.',
  
  vision: 'Ser reconhecida como uma empresa de referência e confiança em nosso segmento, consolidada como sinônimo de credibilidade e respeito junto a clientes e fornecedores. Buscamos ir além da simples comercialização de produtos, e oferecendo uma experiência diferenciada por meio de um atendimento humanizado, atento às necessidades de cada cliente e voltado a soluções práticas, que farão diferença no seu dia a dia.',
  
  values: [
    {
      title: 'Atendimento de qualidade',
      description: 'Ter um atendimento diferenciado para cada cliente, com respeito, cordialidade e com atenção às suas necessidades.'
    },
    {
      title: 'Produtos de qualidade',
      description: 'Sempre trazer para nossos clientes os melhores produtos e com o melhor preço.'
    },
    {
      title: 'Ética',
      description: 'Ser transparente para com nossos clientes, sempre mantendo a honestidade nas negociações.'
    },
    {
      title: 'Valorização dos clientes',
      description: 'Apoiar, desde o produtor rural ao consumidor urbano, buscando sempre atender as necessidades de cada um da melhor maneira.'
    },
    {
      title: 'Inovações',
      description: 'Buscar sempre novas tecnologias e práticas inovadoras, para melhor atender e ser mais eficiente.'
    }
  ]
})

// Equipe de gestão - dados reativos para facilitar manutenção
const managementTeam = ref([
  {
    id: 1,
    name: 'Amanda Ribeiro de Sá',
    position: 'Diretora Administrativa',
    icon: 'bi bi-person-badge',
    education: 'Ensino médio completo. Cursando bacharelado em Ciências Contábeis na UDESC e Gestão de Recursos Humanos na UNOPAR.',
    responsibilities: [
      'Gestão administrativa geral',
      'Organização de documentos, contratos e rotinas internas',
      'Gestão trabalhista e previdenciária',
      'Coordenação de recursos humanos'
    ]
  },
  {
    id: 2,
    name: 'Danúbia S. Russini',
    position: 'Diretora Financeira',
    icon: 'bi bi-calculator',
    education: 'Ensino médio completo. Cursando bacharelado em Ciências Contábeis na UDESC.',
    responsibilities: [
      'Controle financeiro e tributário',
      'Gestão de fluxo de caixa',
      'Contas a pagar e a receber',
      'Planejamento orçamentário',
      'Análise de resultados',
      'Supervisão das rotinas contábeis e fiscais'
    ]
  },
  {
    id: 3,
    name: 'Emili Cristina Marquesi',
    position: 'Diretora Operacional',
    icon: 'bi bi-gear',
    education: 'Ensino médio completo. Cursando bacharelado em Ciências Contábeis na UDESC.',
    responsibilities: [
      'Gestão de estoque e logística de mercadorias',
      'Organização do fluxo de entrada e saída de produtos',
      'Supervisão da qualidade dos produtos',
      'Controle de prazos de entrega e abastecimento da loja'
    ]
  },
  {
    id: 4,
    name: 'Marcos Walber Ferreira Venancio',
    position: 'Diretor de Vendas',
    icon: 'bi bi-graph-up',
    education: 'Ensino médio completo. Cursando bacharelado em Ciências Contábeis na UDESC.',
    responsibilities: [
      'Planejamento e execução de estratégias de vendas',
      'Relacionamento com clientes e prospecção de novos mercados',
      'Elaboração de relatórios comerciais',
      'Definição de metas de crescimento',
      'Monitoramento de tendências de mercado'
    ]
  }
])

// Métodos para interação
function navigateToProducts() {
  // Navegar para a home e depois scroll para produtos
  router.push('/').then(() => {
    // Aguardar um pouco para a página carregar e depois fazer scroll
    setTimeout(() => {
      const productsSection = document.getElementById('products-section')
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  })
}

function scrollToContact() {
  // Implementar scroll para seção de contato quando disponível
  console.log('Navegar para contato')
}
</script>

<style scoped>
.sobre-nos-page {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

/* Sistema de cores hierárquico - 3 tons claros alternados */
.company-history-section {
  background-color: var(--light-1) !important;  /* Tom mais claro */
}

.company-info-section {
  background-color: var(--light-2) !important;  /* Tom médio */
}

.products-section {
  background-color: var(--light-1) !important;  /* Tom mais claro */
}

.mission-vision-section {
  background-color: var(--light-2) !important;  /* Tom médio */
}

.investment-section {
  background-color: var(--light-3) !important;  /* Tom mais escuro */
}

.team-section {
  background-color: var(--light-1) !important;  /* Tom mais claro */
}

.cta-section {
  background-color: var(--light-2) !important;  /* Tom médio */
}

.text-accent {
  color: var(--accent-primary) !important;  /* Acentos e destaques */
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--primary-green), var(--accent-primary)) !important;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-stats .stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.company-logo {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Company History Section */
.history-card {
  background-color: var(--light-2);
  border: 1px solid var(--light-3);
  color: var(--dark-1);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(15, 61, 31, 0.1);
}

.history-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(15, 61, 31, 0.15);
  border-color: var(--accent-primary);
}

/* Products Section */
.products-card {
  background-color: var(--light-2);
  border: 1px solid var(--light-3);
  color: var(--dark-1);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(15, 61, 31, 0.1);
}

.products-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(15, 61, 31, 0.15);
  border-color: var(--accent-primary);
}

.products-list, .audience-list {
  list-style: none;
  padding-left: 0;
}

.products-list li, .audience-list li {
  position: relative;
  padding-left: 0;
}

/* Investment Section */
.investment-card {
  background-color: var(--light-3);
  border: 1px solid var(--dark-3);
  color: var(--dark-1);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(15, 61, 31, 0.1);
}

.investment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(15, 61, 31, 0.15);
  border-color: var(--accent-primary);
}

.investment-icon {
  transition: all 0.3s ease;
}

.investment-item:hover .investment-icon {
  transform: scale(1.1);
}

.structure-list {
  list-style: none;
  padding-left: 0;
}

.structure-list li {
  position: relative;
  padding-left: 0;
}

/* Company Info Section */
.company-details-card {
  background-color: var(--light-2);
  border: 1px solid var(--light-3);
  color: var(--dark-1);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(15, 61, 31, 0.1);
}

.company-details-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(15, 61, 31, 0.15);
  border-color: var(--accent-primary);
}

.detail-item {
  padding: 1rem;
  background: var(--light-1);
  border-radius: 0.75rem;
  border: 1px solid var(--light-3);
  color: var(--dark-1);
  transition: all 0.3s ease;
}

.detail-item:hover {
  border-color: var(--accent-primary);
  transform: translateX(5px);
  background: var(--light-2);
}

/* Mission, Vision, Values Section */
.identity-card {
  background-color: var(--light-2);
  border: 1px solid var(--light-3);
  color: var(--dark-1);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(15, 61, 31, 0.1);
}

.identity-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(15, 61, 31, 0.15);
  border-color: var(--accent-primary);
}

.values-list {
  list-style: none;
  padding-left: 0;
}

.values-list li {
  position: relative;
  padding-left: 1rem;
}

.values-list li::before {
  content: '•';
  color: var(--accent-primary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Team Section */
.team-card {
  background-color: var(--light-2);
  border: 1px solid var(--light-3);
  color: var(--dark-1);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(15, 61, 31, 0.1);
}

.team-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(15, 61, 31, 0.15);
  border-color: var(--accent-primary);
}

.avatar-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
}

.responsibilities-list {
  list-style: none;
  padding-left: 0;
}

.responsibilities-list li {
  position: relative;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
}

.responsibilities-list li::before {
  content: '→';
  color: var(--accent-primary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--primary-custom), var(--accent-primary));
  position: relative;
}

.cta-buttons .btn {
  transition: all 0.3s ease;
}

.cta-buttons .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Responsividade */
@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 0;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 1rem;
  }
  
  .hero-stats .stat-item {
    flex: 1;
    min-width: 120px;
  }
  
  .company-logo {
    width: 100px;
    height: 100px;
    margin-top: 2rem;
  }
  
  .identity-card {
    margin-bottom: 2rem;
  }
  
  .team-card {
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-buttons .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .hero-stats .stat-item {
    width: 100%;
  }
  
  .company-details-card {
    padding: 1.5rem;
  }
  
  .detail-item {
    padding: 0.75rem;
  }
  
  .identity-card {
    padding: 1.5rem;
  }
  
  .team-card {
    padding: 1.5rem;
  }
  
  .avatar-circle {
    width: 60px;
    height: 60px;
  }
  
  .avatar-circle i {
    font-size: 1.5rem;
  }
}

/* Animações */
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

.hero-content,
.company-details-card,
.identity-card,
.team-card {
  animation: fadeInUp 0.6s ease-out;
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}
</style>
