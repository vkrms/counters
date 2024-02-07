// router.js
import { createRouter, createWebHistory } from 'vue-router'

import CounterComp from './../components/CounterComp';


const routes = [
  // dynamic segments start with a colon
  {
    name: 'counter',
    path: '/:slug',
    component: CounterComp,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router