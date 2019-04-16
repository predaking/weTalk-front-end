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

    city: '定位中...',
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
    }
  }
})

export default store;
