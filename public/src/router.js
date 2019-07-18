import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import firebase from '@/firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/n/:dep/:year?/:reg?/:sub?',
      name: 'groups',
      component: Home
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('./views/Upload.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!currentUser && requiresAuth)
    next('sign-in')
  else if (currentUser && to.name === 'sign-in')
    next('upload')
  else
    next()
})

export default router