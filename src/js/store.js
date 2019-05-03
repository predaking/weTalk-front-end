import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    token: '',
    user_id: '',
    nickname: '管理员',
    headImgSrc: require("../assets/head-boy.jpg"),

    city: '未知位置',
    cityCode: '',
    district: '',
    province: '',
    street: '',
    streetNumber: '',

    errorContent: '',
  },
  mutations: {
    loginInfo(state, payload) {
      store.state.user_id = payload.user_id;
      store.state.token = payload.token;
      store.state.nickname = payload.nickname;
    },
    errorInfo(state, payload) {
      switch(payload.status) {
        case 400: store.state.errorContent = "请求错误"; break;
        case 401: store.state.errorContent = "未授权，访问被拒绝"; break;
        case 403: store.state.errorContent = "服务器拒绝执行"; break;
        case 404: store.state.errorContent = "未找到指定资源"; break;
        case 407: store.state.errorContent = "需要代理认证"; break;
        case 408: store.state.errorContent = "请求超时"; break;
        case 500: store.state.errorContent = "服务器内部错误"; break;
        case 502: store.state.errorContent = "网关失败"; break;
        case 503: store.state.errorContent = "服务不可用"; break;
        case 504: store.state.errorContent = "网关超时"; break;
        default: store.state.errorContent = "未知错误";
      }
    },
    // viewImg(state, payload) {
    //   store.state.imgName = payload.imgName;
    //   store.state.visible = payload.visible
    // }
  },
  getters: {
    pos: (state) => {
      return state.city + state.district
    },
    format() {
      return function(time) {
        const MIN = 60 * 1000;
        const HOUR = 60 * MIN;
        const DAY = 24 * HOUR;
        var date = new Date(time);
        var currentDate = new Date();
        var diff = currentDate - date;
        var r = 0;
        if (diff > DAY) {
          r = parseInt(diff / DAY);
          return r + "天前";
        }
        if (diff > HOUR) {
          r = parseInt(diff / HOUR);
          return r + "小时前";
        }
        if (diff > MIN) {
          r = parseInt(diff / MIN);
          return r + "分钟前";
        } else return "刚刚"
        return time;
      }
    }
  }
})

export default store;
