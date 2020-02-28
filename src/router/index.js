import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:SiteCode',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
  // {
  //   path: '/',
  //   redirect: '/'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
