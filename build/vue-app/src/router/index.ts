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
      path: '/project/github-clone',
      name: 'project-github-clone',
      component: () => import('../views/project/GithubCloneView.vue'),
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
      path: '/project/minecraft-tools',
      name: 'project-minecraft-tools',
      component: () => import('../views/project/minecrafttools.vue'),
    },

    {
      path: '/project/goodminecraft',
      name: 'project-goodminecraft',
      component: () => import("../views/project/goodminecraft.vue"),
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: () => import('../views/RedirectView.vue'),
    },
    
  ],
})

export default router
