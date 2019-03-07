import Vue from 'vue'
import Router from 'vue-router'
import createJson from '@/components/createJson'
import Time from '@/components/Time'
import Nodejs from '@/components/Nodejs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'createJson',
      component: createJson
    },
    {
      path: '/createJson',
      name: 'createJson',
      component: createJson,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/Time',
      name: 'Time',
      component: Time,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/Nodejs',
      name: 'Nodejs',
      component: Nodejs,
      meta:{
        keepAlive:true
      }
    },
  ]
})



