import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalculatorSteps from '../views/CalculatorSteps.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'calculator-steps-0',
        component: CalculatorSteps
      },
      {
        path: ':step',
        name: 'calculator-steps',
        component: CalculatorSteps
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
