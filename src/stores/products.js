import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import produtosData from '../assets/json/produtos.json'

export const useProductStore = defineStore('products', () => {
  // Função para normalizar categoria para ID
  function normalizeCategoryId(categoria) {
    return categoria
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .trim()
  }

  // Função para transformar dados do JSON no formato do store
  function transformProductData(produto, index) {
    const hasValidPrice = produto.preco !== 'Não preenchido' && typeof produto.preco === 'number'
    const hasImage = produto.imagem && produto.imagem.trim() !== ''
    
    // Função para converter caminho da imagem para caminho público
    function getImagePath(imagePath) {
      if (!imagePath || imagePath.trim() === '') {
        return 'https://via.placeholder.com/300x300/2d2d2d/ffffff?text=Produto'
      }
      
      // Converter caminho de src/assets para /images/ com base path correto
      const publicPath = imagePath
        .replace('src/assets/imagem/produtos/', '/images/produtos/')
        .replace(/\\/g, '/') // Normalizar separadores de caminho
      
      // Usar BASE_URL do Vite para incluir o base path correto
      const baseUrl = import.meta.env.BASE_URL
      return baseUrl + publicPath.substring(1) // Remove a barra inicial para evitar duplicação
    }
    
    return {
      id: index + 1,
      name: produto.descricao,
      price: hasValidPrice ? produto.preco : 0,
      image: getImagePath(produto.imagem),
      category: normalizeCategoryId(produto.categoria),
      description: produto.descricao || `${produto.categoria}`,
      inStock: produto.fornecedor !== 'Não preenchido' && hasValidPrice,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Rating entre 3.0 e 5.0
      supplier: produto.fornecedor,
      deliveryTime: produto.prazo_entrega,
      location: produto.localizacao,
      originalCategory: produto.categoria,
      hasCompleteInfo: produto.fornecedor !== 'Não preenchido'
    }
  }

  // Estado reativo - carregar produtos do JSON
  const products = ref(produtosData.map(transformProductData))

  // Função para gerar categorias automaticamente baseadas nos produtos
  function generateCategories() {
    const categoryMap = new Map()
    
    // Contar produtos por categoria
    products.value.forEach(product => {
      const cat = product.originalCategory
      if (categoryMap.has(cat)) {
        categoryMap.set(cat, categoryMap.get(cat) + 1)
      } else {
        categoryMap.set(cat, 1)
      }
    })
    
    // Mapeamento de ícones por categoria
    const iconMap = {
      'Rações para Gatos': 'bi-heart',
      'Rações para Cachorro': 'bi-heart-fill',
      'Rações para Animais de Criação': 'bi-basket',
      'Medicamentos': 'bi-capsule',
      'Vitaminas Pet': 'bi-capsule-pill',
      'Sais Minerais': 'bi-gem',
      'Produtos para Lavoura': 'bi-tree',
      'Proteção Individual': 'bi-shield-check',
      'Saches e Petiscos': 'bi-bag',
      'Bebedouros e Comedouros': 'bi-cup',
      'Areias e Tapetes para Pet': 'bi-house',
      'Acessórios Pet': 'bi-tools'
    }
    
    // Converter para array e ordenar por quantidade (principais primeiro)
    const sortedCategories = Array.from(categoryMap.entries())
      .sort(([,a], [,b]) => b - a)
      .map(([category, count]) => ({
        id: normalizeCategoryId(category),
        name: category,
        icon: iconMap[category] || 'bi-grid-3x3-gap',
        count,
        isMain: count >= 5 // Categorias principais têm 5+ produtos
      }))
    
    return [
      { id: 'todos', name: 'Todos os Produtos', icon: 'bi-grid', count: products.value.length, isMain: true },
      ...sortedCategories
    ]
  }
  
  const categories = ref(generateCategories())
  
  // Categorias principais (para exibir em destaque)
  const mainCategories = computed(() => 
    categories.value.filter(cat => cat.isMain)
  )
  
  // Todas as categorias (para filtros completos)
  const allCategories = computed(() => categories.value)

  const selectedCategory = ref('todos')
  const searchTerm = ref('')
  const cart = ref([])
  
  // Filtros avançados
  const filters = ref({
    minPrice: null,
    maxPrice: null,
    inStock: false,
    categories: []
  })

  // Getters computados
  const filteredProducts = computed(() => {
    let filtered = products.value

    // Filtrar por categoria principal
    if (selectedCategory.value !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory.value)
    }

    // Filtrar por categorias múltiplas (checkbox)
    if (filters.value.categories && filters.value.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.value.categories.includes(product.category)
      )
    }

    // Filtrar por termo de busca
    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.originalCategory.toLowerCase().includes(term) ||
        (product.supplier && product.supplier.toLowerCase().includes(term))
      )
    }

    // Filtrar por faixa de preço
    if (filters.value.minPrice !== null && filters.value.minPrice > 0) {
      filtered = filtered.filter(product => product.price >= filters.value.minPrice)
    }
    
    if (filters.value.maxPrice !== null && filters.value.maxPrice > 0) {
      filtered = filtered.filter(product => product.price <= filters.value.maxPrice)
    }

    // Filtrar por disponibilidade
    if (filters.value.inStock) {
      filtered = filtered.filter(product => product.inStock)
    }

    return filtered
  })
  
  // Produtos em destaque (com informações completas e em estoque)
  const featuredProducts = computed(() => {
    return products.value
      .filter(product => product.hasCompleteInfo && product.inStock)
      .slice(0, 8)
  })
  
  // Produtos em promoção (simulação baseada em critérios)
  const promotionalProducts = computed(() => {
    return products.value
      .filter(product => product.hasCompleteInfo && product.price > 0)
      .filter(product => product.rating >= 4.5 || product.price < 50)
      .slice(0, 6)
  })

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const cartItemCount = computed(() => {
    return cart.value.reduce((count, item) => count + item.quantity, 0)
  })

  // Actions
  function setCategory(categoryId) {
    selectedCategory.value = categoryId
  }

  function setSearchTerm(term) {
    searchTerm.value = term
  }

  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }
  
  function clearFilters() {
    filters.value = {
      minPrice: null,
      maxPrice: null,
      inStock: false,
      categories: []
    }
  }

  function addToCart(product) {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  function removeFromCart(productId) {
    const index = cart.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cart.value.splice(index, 1)
    }
  }

  function updateCartQuantity(productId, quantity) {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    cart.value = []
  }

  return {
    // Estado
    products,
    categories,
    selectedCategory,
    searchTerm,
    cart,
    filters,
    
    // Getters
    filteredProducts,
    featuredProducts,
    promotionalProducts,
    mainCategories,
    allCategories,
    cartTotal,
    cartItemCount,
    
    // Actions
    setCategory,
    setSearchTerm,
    setFilters,
    clearFilters,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    
    // Utilities
    normalizeCategoryId
  }
})

