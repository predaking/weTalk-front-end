// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' // 引入iview依赖
import 'iview/dist/styles/iview.css' // 引入iview css样式
import axios from 'axios'
import Footer from '@/commonComponents/Footer'
import globalVariable from '@/js/globalVariable'
import store from '@/js/store'
Vue.config.productionTip = false
Vue.use(iView, {
  transfer: true,
  size: 'large'
})
Vue.prototype.axios = axios
// Vue.prototype.globalVariable = globalVariable
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.component('Footer', Footer)
Vue.component('test-cp', {
  props: ['item'],
  template: '<li>{{item.content}}</li>'
})
router.beforeEach((to, from, next) => {
  if (JSON.parse(sessionStorage.getItem("store")).token || to.path === "/Me/Login" || to.path === "/Me/Register") {
    console.log(JSON.parse(sessionStorage.getItem("store")))
    next()
  }
  else {
    next({
      path: "/Me/Login"
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
