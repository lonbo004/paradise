import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    siteReady: false,
    siteData: {},
    memberData: {},
    currentMe: {},
    //login
    isLogin: false,
    login_show: false,
    //
    SiteCode: ""
  },
  mutations: {
    set_isLogin: (state) => {
      state.isLogin = !!sessionStorage.getItem("token");
      state.memberData = JSON.parse(sessionStorage.getItem("memberData"));
    }
  },
  getters
})
