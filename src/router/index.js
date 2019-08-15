import Vue from 'vue'
import Router from 'vue-router'

const createJson       = () =>import('@/views/createJson');
const time             = () =>import('@/views/time');
const nodejs           = () =>import('@/views/nodejs');
const home             = () =>import('@/views/home');
const login            = () =>import('@/views/login');
const excel            = () =>import('@/views/excel');
const cloudMusic       = () =>import('@/views/cloudMusic');
const sortTemplate     = () =>import('@/views/sortTemplate');
const sortSpeed     = () =>import('@/views/sortSpeed');

const appAdmin         = () =>import('@/views/appAdmin');
const appUser          = () =>import('@/views/appUser');
const appLogin         = () =>import('@/views/appLogin');
const adminHouse       = () =>import('@/views/appAdmin/adminHouse');
const adminUser        = () =>import('@/views/appAdmin/adminUser');
const adminAppointment = () =>import('@/views/appAdmin/adminAppointment');

const userHouse        = () =>import('@/views/appUser/userHouse');
const userHome         = () =>import('@/views/appUser/userHome');
const koa2         = () =>import('@/views/koa2');

Vue.use(Router)

export default new Router({
  // fallback: false,
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: login,
    //   keepAlive:false,
    //   // redirect: '/?'
    // },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: '/login',
      // redirect: '/appUser',
      children:[
        {
          path: '/login',
          name: 'login',
          component: login,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/createJson',
          name: 'createJson',
          component: createJson,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/time',
          name: 'time',
          component: time,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/nodejs',
          name: 'nodejs',
          component: nodejs,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/excel',
          name: 'excel',
          component: excel,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/cloudMusic',
          name: 'cloudMusic',
          component: cloudMusic,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/sortTemplate',
          name: 'sortTemplate',
          component: sortTemplate,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/sortSpeed',
          name: 'sortSpeed',
          component: sortSpeed,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/appLogin',
          name: 'appLogin',
          component: appLogin,
          meta:{
            keepAlive:true
          },
        },
        {
          path: '/appAdmin',
          name: 'appAdmin',
          component: appAdmin,
          redirect: '/adminHouse',
          meta:{
            keepAlive:true
          },
          children:[
            {
              path: '/adminHouse',
              name: 'adminHouse',
              component: adminHouse,
              meta:{
                keepAlive:false
              }
            },
            {
              path: '/adminUser',
              name: 'adminUser',
              component: adminUser,
              meta:{
                keepAlive:false
              }
            },
           {
              path: '/adminAppointment',
              name: 'adminAppointment',
              component: adminAppointment,
              meta:{
                keepAlive:false
              }
            },
          ]
        },
        {
          path: '/appUser',
          name: 'appUser',
          component: appUser,
          redirect: '/userHouse',
          meta:{
            keepAlive:true
          },
          children:[
            {
              path: '/userHouse',
              name: 'userHouse',
              component: userHouse,
              meta:{
                keepAlive:true
              }
            },
            {
              path: '/userHome',
              name: 'userHome',
              component: userHome,
              meta:{
                keepAlive:false
              }
            },
          ]
        },
        {
          path: '/koa2',
          name: 'koa2',
          component: koa2,
          meta:{
            keepAlive:true
          }
        },
      ]
    },

  ]
})



