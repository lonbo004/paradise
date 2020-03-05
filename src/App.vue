<template>
  <div id="app">
    <template v-if="SiteCode">
      <div class="h_frame">
        <div class="h_ctn _head ctn1 clear" v-if="isHomePage">
          <div class="title">{{siteInfo.Name}}</div>
          <img class="login" src="@img/user.png" @click="login_show = true" />
        </div>
        <div class="h_ctn _nav fx aic ctn1">
          <div class="index_logo" :style="{backgroundImage: `url(${siteInfo.LogoUrl})`}"></div>
          <div class="kw_box _fill">
            <div class="kw_item fx aic">
              <input v-model="keyword" type="text" placeholder="輸入關鍵字查詢" class="_fill" />
              <img class="icon" src="@img/index-search.png" />
            </div>
          </div>
          <a class="adc" v-html="`進階<br class=up_sm_hide />搜尋`"></a>
        </div>
        <div class="h_ctn _mar fx aic ctn1" v-if="MarqueeList.length">
          <marquee-text class="_fill">
            <span class="vtc" v-for="item in MarqueeList">
              <img class="laba" src="@img/laba.png" />
              <span>{{item.Title}}</span>
            </span>
          </marquee-text>
        </div>
      </div>
      <div class="h_fill"></div>
    </template>
    <router-view v-if="siteReady" />
    <template v-if="SiteCode">
      <div class="f_fill"></div>
      <div class="f_frame">
        <div class="f_ctn fx aic ctn1 f">
          <div class="f_btn">
            <div class="f_icon home" @click="$router.push({path: '/'})">
              <p>首頁</p>
            </div>
          </div>
          <div class="f_btn">
            <a class="f_icon line" :href="siteInfo.LineQRCode">
              <p>Line</p>
            </a>
          </div>
          <div class="f_btn">
            <div class="f_icon" @click="login_show = true" :class="( !isLogin? 'sign_in' : 'login_out' )">
              <p> {{ !isLogin? '登入' : '登出'}} </p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <Login v-if="login_show" />
    <!-- awt -->
    <GetInfoVue v-if="SiteCode" :SiteCode="SiteCode" :callback="clear" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import GetInfoVue from "@/awt/GetInfo.vue";
import { GetInfo } from "@/api";
//components
import Login from "@c/Login"
////test
import setting from "@/setting";
////
export default {
  components: { GetInfoVue, Login },
  data() {
    return {
      keyword: "",
      SiteCode: ""
    };
  },
  computed: {
    ...mapState(["siteReady", "isLogin", "siteData"]),////test
    ...mapGetters(["siteInfo", "MarqueeList"]),
    isLogin() {
      return this.$store.state.isLogin;
    },
    login_show: {
      get() {
        return this.$store.state.login_show;
      },
      set(val) {
        this.$store.state.login_show = val;
      }
    },
    isHomePage() {
      return this.$route.name === "home";
    }
  },
  created() {
    ////test
    this.$router.replace({ path: "/" + setting.SiteCode });
    this.SiteCode = setting.SiteCode;
    ////
    // this.SiteCode = location.pathname.replace(/^\//, "");
    // if (!this.SiteCode) this.$store.state.siteReady = true;
  },
  mounted() { },
  methods: {
    clear() {
      this.keyword = "";
      this.SiteCode = "";
    }
  }
};
</script>

<style>
</style>