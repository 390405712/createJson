import Vue from 'vue'
import Router from 'vue-router'
import createJson from '@/views/createJson'
import time from '@/views/time'
import nodejs from '@/views/nodejs'
import home from '@/views/home'
import login from '@/views/login'
import excel from '@/views/excel'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      keepAlive:false,
      // redirect: '/?'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      keepAlive:false,
      children:[
        {
          path: '/',
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
        {
          path: '/excel',
          name: 'excel',
          component: excel,
          meta:{
            keepAlive:false
          }
        },
      ]
    },

  ]
})



