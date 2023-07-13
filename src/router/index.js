import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    children: [
      {
        path: '/screen',
        name: 'home',
        component: () => import('../views/ScreenList.vue')
      },
      {
        path: '/index',
        name: 'index',
        component: HomeView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
