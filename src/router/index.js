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
    path: '/:SiteCode/top/:town_code',
    name: 'top',
    component: () => import('../views/top.vue'),
  },
  {
    path: '/:SiteCode/town/:town_code/:district_code/:country_code/:service_type_code',
    name: 'top',
    component: () => import('../views/town.vue'),
  },
  {
    path: '/:SiteCode/escort',
    name: 'escort',
    component: () => import('../views/escort.vue'),
  },
  {
    path: '/:SiteCode/meme/:code',
    name: 'meme',
    component: () => import('../views/meme.vue'),
  },
  {
    path: '/:SiteCode/search',
    name: 'meme',
    component: () => import('../views/search.vue'),
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