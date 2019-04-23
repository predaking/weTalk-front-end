// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' // 引入iview依赖
import 'iview/dist/styles/iview.css' // 引入iview css样式
import axios from 'axios'
import Footer from '@/commonComponents/Footer'
import Error from '@/commonComponents/Error'
// import globalVariable from '@/js/globalVariable'
import store from '@/js/store'
Vue.config.productionTip = false
Vue.use(iView, {
  transfer: true,
  size: 'large'
})
Vue.prototype.axios = axios
// axios.defaults.headers.post["Content-Type"]='application/x-www-form-urlencoded'
Vue.component('Footer', Footer)
Vue.component('Error', Error)
Vue.component('test-cp', {
  props: ['item'],
  template: '<li>{{item.content}}</li>'
})
router.beforeEach((to, from, next) => {
  if (to.path === "/"
    || to.path === "/Me/Register"
    || (JSON.parse(sessionStorage.getItem("store"))
    && JSON.parse(sessionStorage.getItem("store")).token))
    {
      // console.log(sessionStorage.getItem("store"))
      next()
    }
  else {
    next({
      path: "/"
    })
  }
})
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
