import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    token: '',
    nickname: '管理员',
    headImgSrc: require("../assets/head-boy.jpg")
  },
  mutations: {
    loginInfo(state, payload) {
      store.state.token = payload.token;
      store.state.nickname = payload.nickname;
    }
  }
})

export default store;
