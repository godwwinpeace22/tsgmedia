import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import {firebase} from './plugins/firebase'

Vue.use(Router)


const requireAuth = (to, from, next) => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      
      next()
    }
    else{
      next('/login')
    }
  });
  
}
const requireLogout = (to, from, next) => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      
      next('/')
    }
    else{
      next()
    }
  });
  
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/components/Home.vue')
        },
        {
          path: '/series/:id',
          name: 'series',
          props: true,
          component: () => import('@/components/Series.vue')
        },
        {
          path: '/admin',
          component: () => import('@/components/Admin.vue'),
          beforeEnter: requireAuth
        },
        {
          path: '/404',
          name: '404',
          component: () => import('./views/404.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      beforeEnter: requireLogout
    },
    {
      path: '/404',
      name: '404_',
      component: () => import('./views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/404');
  } else {
    next();
  }
});

export default router
