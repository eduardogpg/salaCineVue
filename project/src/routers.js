import Sala from './components/Sala.vue'

import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: Sala,
  },
]

const router = new VueRouter({
  routes,
})

export default router
