import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/blog/cpp',
      name: 'blog-cpp',
      component: () => import('../views/blog/CPPView.vue'),
    },
    {
      path: '/blog/jetbrains',
      name: 'blog-jetbrains',
      component: () => import('../views/blog/JetbrainsView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/project/github-clone',
      name: 'project-github-clone',
      component: () => import('../views/project/GithubCloneView.vue'),
    },
    {
      path: '/project/minecraft-toos',
      name: 'project-minecraft-toos',
      component: () => import('../views/project/MinecraftToosView.vue'),
    },
    {
      path: '/project/jetbrains-crack',
      name: 'project-jetbrains-crack',
      component: () => import('../views/project/JetbrainsCrackView.vue'),
    },
    {
      path: '/project/english-listen',
      name: 'project-english-listen',
      component: () => import('../views/project/EnglishListenView.vue'),
    },
    {
      path: '/project/goodminecraft',
      name: 'project-goodminecraft',
      component: () => import('../views/project/GoodMinecraftView.vue'),
    },
    {
      path: '/project/goodminecraftwiki',
      name: 'project-goodminecraftwiki',
      component: () => import('../views/project/GoodMinecraftWikiView.vue'),
    },
    {
      path: '/project/minecraft-toos-help',
      name: 'project-minecraft-toos-help',
      component: () => import('../views/project/MinecraftToosHelpView.vue'),
    },
  ],
})

export default router
