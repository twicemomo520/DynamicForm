import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Questionnaire',
      name: 'Questionnaire',
      component: () => import('../views/Questionnaire.vue')
    },
    {
      path: '/QuestionWrite',
      name: 'QuestionWrite',
      component: () => import('../views/QuestionWrite.vue')
    },
  ]
})

export default router
