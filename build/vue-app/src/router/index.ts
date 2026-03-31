import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
        {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

  ],
})

export default router
