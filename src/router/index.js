import Vue from 'vue'
import Router from 'vue-router'
import Mainframe from '@/components/Mainframe'
import Me from '@/components/Me'
import Mitama from '@/components/Mitama'
import Biography from '@/components/Biography'
import ChangeInfo from '@/components/ChangeInfo'
import ChangePsw from '@/components/ChangePsw'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Publish from '@/components/Publish'
import Main from '@/components/Main'
import Detail from '@/components/Detail'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Me/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Me/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Me',
      name: 'Me',
      component: Me
    },
    {
      path: '/Me/ChangeInfo',
      name: 'ChangeInfo',
      component: ChangeInfo
    },
    {
      path: '/Me/ChangePsw',
      name: 'ChangePsw',
      component: ChangePsw
    },
    {
      path:'/Publish',
      name:'Publish',
      component:Publish
    },
    {
      path:'/Biography',
      name:'Biography',
      component:Biography
    }
  ]
})
// router.beforeEach((to, from, next)=>{
//   if(!JSON.parse(sessionStorage.getItem("store")).token) {
//     return next({path: '/Me/Login'});
//   }
// })
export default router;