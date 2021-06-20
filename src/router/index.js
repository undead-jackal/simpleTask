import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from './../store/index'
Vue.use(VueRouter)
const Login = () => import('@/components/login')
const Register = () => import('@/components/register')
const Admin = () => import('@/components/admin/main')
const Freelancer = () => import('@/components/freelancer/main')

function routeGuard(toRole, next){
  if (Store.state.isLogged) {
    if((Store.state.role == toRole)){
      next()
    }else if(Store.state.role == 0){
      next({name:'AdminMain'})
    }else if(Store.state.role == 1){
      next({name:'FreelancerMain'})
    }
  }else{
      next({name:'Login'})
  }
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'AdminMain',
    beforeEnter(to, from, next){routeGuard(0, next);},
    component: Admin,
  },
  {
    path: '/freelancer',
    name: 'FreelancerMain',
    beforeEnter(to, from, next){routeGuard(1, next);},
    component: Freelancer,
  },

  // {
  //   path: '/freelancer',
  //   redirect: '/freelancer/dashboard',
  //   name: 'Freelancer',
  //   // beforeEnter(to, from, next){routeGuard(0, next);},
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'FreelancerMain',
  //       component: Freelancer,
  //     },
  //   ]
  // }

  
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
