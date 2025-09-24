import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import SobreNos from '../views/SobreNos.vue'
import Produtos from '../views/Produtos/Produtos.vue'
import Contato from '../views/Contato.vue'
import Blog from '../views/Blog.vue'

// Configuração das rotas
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sobre-nos',
    name: 'SobreNos',
    component: SobreNos
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: Produtos
  },
  {
    path: '/contato',
    name: 'Contato',
    component: Contato
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  }
]

// Criação do router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Comportamento de scroll suave
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
