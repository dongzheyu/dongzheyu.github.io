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
      path: '/emergency',
      name: 'emergency',
      component: () => import('../views/EmergencyView.vue'),
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
    {
      path: '/tests/anxiety',
      name: 'anxiety',
      component: () => import('../views/AnxietyView.vue'),
    },
    {
      path: '/tests/bipolar',
      name: 'bipolar',
      component: () => import('../views/BipolarView.vue'),
    },
    {
      path: '/tests/phobia',
      name: 'phobia',
      component: () => import('../views/PhobiaView.vue'),
    },
    {
      path: '/tests/ptsd',
      name: 'ptsd',
      component: () => import('../views/PtsdView.vue'),
    },
    {
      path: '/tests/ocd',
      name: 'ocd',
      component: () => import('../views/OcdView.vue'),
    },
    {
      path: '/tests/eating',
      name: 'eating',
      component: () => import('../views/EatingView.vue'),
    },
    {
      path: '/tests/substance',
      name: 'substance',
      component: () => import('../views/SubstanceView.vue'),
    },
    {
      path: '/tests/gambling',
      name: 'gambling',
      component: () => import('../views/GamblingView.vue'),
    },
    {
      path: '/tests/gaming',
      name: 'gaming',
      component: () => import('../views/GamingView.vue'),
    },
    {
      path: '/tests/adhd',
      name: 'adhd',
      component: () => import('../views/AdhdView.vue'),
    },
    {
      path: '/tests/asd',
      name: 'asd',
      component: () => import('../views/AsdView.vue'),
    },
    {
      path: '/tests/bpd',
      name: 'bpd',
      component: () => import('../views/BpdView.vue'),
    },
    {
      path: '/tests/somatic',
      name: 'somatic',
      component: () => import('../views/SomaticView.vue'),
    },
  ],
})

export default router
