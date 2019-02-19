import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Time from '@/components/Time'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/Time',
      name: 'Time',
      component: Time
    },
  ]
})



