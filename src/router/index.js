import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CreateStudent from '../views/Create-Student.vue'
import store from '@/store'

Vue.use(VueRouter)


const requireAuth = (to,from,next) => {
  let loggedin =  store.getters['isLoggedIn']
  if (!loggedin){
    next({name : 'Login'})
  }else{
    next()
  }
  
  }

  const requirenoAuth = (to,from,next) => {
    let loggedin =  store.getters['isLoggedIn']
    if (loggedin){
      next({name : 'Home'})
    }else{
      next()
    }
    
    }

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    beforeEnter : requireAuth
  },
  {
    path: '/Create',
    name: 'CreateStudent',
    component: CreateStudent,
    beforeEnter : requireAuth
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter : requirenoAuth
  }
]

const router = new VueRouter({
  routes
})

export default router
