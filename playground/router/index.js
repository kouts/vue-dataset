import OptionsApi from '../views/OptionsApi.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const history = createWebHashHistory()
const routes = [
  {
    path: '/',
    name: 'OptionsApi',
    component: OptionsApi,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/composition-api',
    name: 'CompositionApi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "composition-api" */ '../views/CompositionApi.vue'),
    meta: {
      layout: 'default'
    }
  }
]
const router = createRouter({
  linkActiveClass: 'active',
  history,
  routes
})

export { router }
