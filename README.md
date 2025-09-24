# 🌾 Agrovale - Landing Page para Agropecuária

Uma landing page moderna e responsiva desenvolvida com Vue 3, focada em uma experiência de usuário excepcional para uma agropecuária.

## ✨ Características

### 🎨 Design & UX
- **Tema escuro moderno** com paleta de cores harmoniosa
- **Design responsivo** otimizado para desktop e mobile
- **Interface limpa e amigável** seguindo princípios do Material Design
- **Animações suaves** e transições elegantes
- **Acessibilidade** com foco na usabilidade

### 🛠️ Funcionalidades

#### 📱 Header Responsivo
- Logo da agropecuária com identidade visual marcante
- Campo de busca inteligente para produtos agropecuários
- Ícones de carrinho com contador de itens
- Menu hambúrguer para mobile

#### 🎠 Carrossel de Destaques
- Slides com promoções e produtos em destaque
- Controles de navegação e indicadores
- Seção de features com vantagens da agropecuária
- Call-to-actions estratégicos

#### 🗂️ Sistema de Filtros
- **Desktop**: Sidebar fixa com categorias
- **Mobile**: Menu lateral deslizante
- Filtros por categoria, preço, avaliação e disponibilidade
- Busca em tempo real

#### 🛍️ Grade de Produtos
- Cards de produtos com design atraente
- Imagens, preços, avaliações e botões de ação
- Sistema de paginação
- Ordenação por diferentes critérios
- Estados de loading e empty state

#### 📞 Footer Completo
- Informações de contato detalhadas
- Links para redes sociais
- Newsletter com validação
- Links úteis e categorias

### 🔧 Tecnologias Utilizadas

- **Vue 3** com Composition API
- **Pinia** para gerenciamento de estado
- **Bootstrap 5** para componentes responsivos
- **Bootstrap Icons** para iconografia
- **Sass/SCSS** para estilização avançada
- **Vite** como bundler moderno

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositório>
   cd vue-product-landing
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

### Build para Produção

```bash
npm run build
# ou
yarn build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes Vue reutilizáveis
│   ├── AppHeader.vue   # Cabeçalho com navegação
│   ├── AppCarousel.vue # Carrossel de destaques
│   ├── AppSidebar.vue  # Sidebar com filtros
│   ├── ProductCard.vue # Card de produto
│   └── AppFooter.vue   # Rodapé completo
├── stores/             # Gerenciamento de estado (Pinia)
│   └── products.js     # Store de produtos e carrinho
├── styles/             # Estilos globais
│   └── main.scss       # Tema escuro e variáveis CSS
├── App.vue            # Componente principal
└── main.js            # Ponto de entrada
```

## 🎯 Funcionalidades Implementadas

### ✅ Concluído
- [x] Estrutura base do projeto Vue 3
- [x] Tema escuro responsivo
- [x] Header com busca e navegação
- [x] Carrossel de destaques
- [x] Sistema de filtros (desktop/mobile)
- [x] Grade de produtos com paginação
- [x] Cards de produtos interativos
- [x] Footer completo
- [x] Gerenciamento de estado com Pinia
- [x] Carrinho de compras básico
- [x] Responsividade total

### 🔮 Melhorias Futuras
- [ ] Integração com API real
- [ ] Sistema de autenticação
- [ ] Checkout completo
- [ ] Sistema de favoritos
- [ ] Reviews de produtos
- [ ] Chat de suporte
- [ ] PWA (Progressive Web App)

## 🎨 Paleta de Cores

- **Background Principal**: `#1a1a1a`
- **Background Secundário**: `#2d2d2d`
- **Background Terciário**: `#3a3a3a`
- **Texto Principal**: `#ffffff`
- **Texto Secundário**: `#b3b3b3`
- **Accent Primary**: `#ff6b35`
- **Accent Secondary**: `#f7931e`

## 📱 Responsividade

O projeto foi desenvolvido com mobile-first e é totalmente responsivo:

- **Desktop** (1200px+): Layout completo com sidebar fixa
- **Tablet** (768px-1199px): Layout adaptado com navegação otimizada
- **Mobile** (até 767px): Interface otimizada para touch com menu hambúrguer

## 🐛 Suporte

Para reportar bugs ou solicitar novas funcionalidades, abra uma issue no repositório.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido com ❤️ para produtores rurais e agropecuária! 🌾🐄

