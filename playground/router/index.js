import { createRouter, createWebHashHistory } from 'vue-router'
import Example1 from '../views/Example1.vue'

const history = createWebHashHistory()
const routes = [
  {
    path: '/',
    name: 'Example1',
    component: Example1,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/example2',
    name: 'Example2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "example2" */ '../views/Example2.vue'),
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
