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
    {
      path: '/tests',
      name: 'tests',
      component: () => import('../views/TestsView.vue'),
    },
    {
      path: '/tests/mbti',
      name: 'mbti',
      component: () => import('../views/MbtiView.vue'),
    },
    {
      path: '/tests/depression',
      name: 'depression',
      component: () => import('../views/DepressionView.vue'),
    },
    {
      path: '/tests/sunshine',
      name: 'sunshine',
      component: () => import('../views/SunshineDepressionView.vue'),
    },
  ],
})

export default router
