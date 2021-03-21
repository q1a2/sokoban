import Vue from 'vue'
import VueRouter from 'vue-router'
import Instructions from '../views/Instructions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Instructions',
    component: Instructions
  },
  {
    path: '/levels',
    name: 'Levels',
    component: () => import('../views/Levels.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('../views/Editor.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
