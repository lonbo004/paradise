import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    siteData: {},
    siteReady: false,
    memberData: {},
    //login
    isLogin: false,
    login_show: false,

  },
  getters
})
