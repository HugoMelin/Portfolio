import { createRouter, createWebHashHistory } from 'vue-router'
import AppHome from '@/views/App-Home.vue'
import SingleProject from '@/views/Single-Project.vue'
import NotFound from '@/views/Not-Found.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: AppHome,
      meta: {
        title: 'Accueil - Hugo Melin',
        metaTags: [
          {
            name: 'description',
            content: 'Bienvenue sur le portfolio de Hugo Melin, développeur web Full Stack.',
          },
        ],
      },
    },
    {
      path: '/project/:slug',
      name: 'Project',
      component: SingleProject,
      props: true,
      meta: {
        title: 'Projet - Hugo Melin',
        metaTags: [
          {
            name: 'description',
            content: 'Détails du projet.',
          },
        ],
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: 'Page Non Trouvée - Hugo Melin',
        metaTags: [
          {
            name: 'description',
            content: "Oups ! La page que vous recherchez n'existe pas.",
          },
        ],
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
