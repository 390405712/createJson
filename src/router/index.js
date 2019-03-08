import Vue from 'vue'
import Router from 'vue-router'
import createJson from '@/views/createJson'
import time from '@/views/time'
import nodejs from '@/views/nodejs'
import home from '@/views/home'
import login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/createJson',
      children:[
        {
          path: '/createJson',
          name: 'createJson',
          component: createJson,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/time',
          name: 'time',
          component: time,
          meta:{
            keepAlive:false
          }
        },
        {
          path: '/nodejs',
          name: 'nodejs',
          component: nodejs,
          meta:{
            keepAlive:false
          }
        },
      ]
    },

  ]
})



