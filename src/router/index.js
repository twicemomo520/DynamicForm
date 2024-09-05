import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/ManageSurvey',
      name: 'ManageSurvey',
      component: () => import('../views/ManageSurvey.vue'),

      children:[
          { path: '/Questionnaire', 
            name: 'Questionnaire',
            component: () => import('../views/Questionnaire.vue'),
          },
        ]
    },
    {
      path: '/FillSurvey',
      name: 'FillSurvey',
      component: () => import('../views/FillSurvey.vue'),
      
    },

    {
      path: '/Questionnaire',
      name: 'Questionnaire',
      component: () => import('../views/Questionnaire.vue'),
      beforeEnter:(to, from, next)=>{
        next()
      },
    },
    {
      path: '/QuestionWrite',
      name: 'QuestionWrite',
      component: () => import('../views/QuestionWrite.vue')
    },
    {
      path: '/QuestionStatistics',
      name: 'QuestionStatistics',
      component: () => import('../views/QuestionStatistics.vue')
    },
    {
      path: '/SeatTest',
      name: 'SeatTest',
      component: () => import('../views/SeatTest.vue')
    },

    {
      path: '/PiniaTest',
      name: 'PiniaTest',
      component: () => import('../views/PiniaTest.vue')
    },
    {
      path: '/FuriosaTest',
      name: 'FuriosaTest',
      component: () => import('../views/FuriosaTest.vue')
    },
    {
      path: '/PatternTest',
      name: 'PatternTest',
      component: () => import('../views/PatternTest.vue')
    },
    {
      path: '/MouseEffectTest',
      name: 'MouseEffectTest',
      component: () => import('../views/MouseEffectTest.vue')
    },
    {
      path: '/BeautifulTableTest',
      name: 'BeautifulTableTest',
      component: () => import('../views/BeautifulTableTest.vue')
    },    
    {
      path: '/AlertTest',
      name: 'AlertTest',
      component: () => import('../views/AlertTest.vue')
    },    
    
  ]
})

export default router
