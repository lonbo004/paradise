import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:SiteCode',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/:SiteCode/keyword/:keyword',
    name: 'keyword',
    component: () => import('../views/keyword.vue'),
  },
  {
    path: '/:SiteCode/top/:townCode',
    name: 'top',
    component: () => import('../views/top.vue'),
  },
  {
    path: '/:SiteCode/meme/:code',
    name: 'meme',
    component: () => import('../views/meme.vue'),
  },
  {
    path: '/',
    name: 'hello',
    component: () => import('../views/hello.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
