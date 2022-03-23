import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CalculatorSteps from '@/views/CalculatorSteps.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: ':step',
        name: 'calculator-steps',
        component: CalculatorSteps
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: HomeView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
