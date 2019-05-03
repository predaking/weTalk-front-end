import Vue from 'vue'
import Router from 'vue-router'
import Me from '@/components/Me'
import ChangeInfo from '@/components/ChangeInfo'
import ChangePsw from '@/components/ChangePsw'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Publish from '@/components/Publish'
import Main from '@/components/Main'
import Detail from '@/components/Detail'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Me/Register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/Me',
      name: 'Me',
      component: Me,
    },
    {
      path: '/Me/ChangeInfo',
      name: 'ChangeInfo',
      component: ChangeInfo,
    },
    {
      path: '/Me/ChangePsw',
      name: 'ChangePsw',
      component: ChangePsw,
    },
    {
      path:'/Publish',
      name:'Publish',
      component:Publish,
    },
  ]
})

export default router;
