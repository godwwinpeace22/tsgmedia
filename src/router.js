import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import {firebase} from './plugins/firebase'
import Home from '@/components/Home.vue'
import Series from '@/components/Series.vue'
import Admin from '@/components/Admin.vue'
import notFound from "@/views/404.vue"
import Login from '@/views/Login.vue'

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
          component: Home
        },
        {
          path: '/series/:id',
          name: 'series',
          props: true,
          component: Series
        },
        {
          path: '/admin',
          component: Admin,
          beforeEnter: requireAuth
        },
        {
          path: '/404',
          name: '404',
          component: notFound
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: requireLogout
    },
    {
      path: '/404',
      name: '404_',
      component: notFound
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
