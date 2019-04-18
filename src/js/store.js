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
    streetNumber: ''
  },
  mutations: {
    loginInfo(state, payload) {
      store.state.token = payload.token;
      store.state.nickname = payload.nickname;
    }
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
