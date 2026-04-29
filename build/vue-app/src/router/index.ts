import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      // 使用动态导入实现懒加载，并添加预取提示
      component: () => import(/* webpackPrefetch: true */ '../views/ProjectsView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import(/* webpackPrefetch: true */ '../views/BlogView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackPrefetch: true */ '../views/AboutView.vue'),
    },
    {
      path: '/tests',
      name: 'tests',
      component: () => import('../views/TestsView.vue'),
    },
    {
      path: '/emergency',
      name: 'emergency',
      // 紧急求助页面需要快速加载，使用预加载
      component: () => import(/* webpackPreload: true */ '../views/EmergencyView.vue'),
    },
    {
      path: '/tests/mbti',
      name: 'mbti',
      // MBTI 测试页面较大，使用预取
      component: () => import(/* webpackPrefetch: true */ '../views/MbtiView.vue'),
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
    // 404 页面 - 必须放在最后
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
