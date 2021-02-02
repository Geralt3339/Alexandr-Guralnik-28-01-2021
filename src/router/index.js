import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/index'
import Favorites from '@/pages/favorites'
import ErrorLayout from '@/layouts/error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/Alexandr-Guralnik-28-01-2021/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/favorites/*',
      redirect: '/favorites'
    },
    {
      path: '*',
      component: ErrorLayout
    }
  ]
})
