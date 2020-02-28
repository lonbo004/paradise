import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteInfo: {},
    siteReady: false,
    MarqueeList: [],
    isLogin: false
  },
})
