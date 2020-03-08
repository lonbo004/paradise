<template>
  <div id="app">
    <template v-if="SiteCode">
      <div class="h_frame">
        <div class="h_ctn _head ctn1 clear" v-if="isHomePage">
          <div class="title">{{siteInfo.Name}}</div>
          <img v-if="!isLogin" class="login" src="@img/user.png" @click="login_show = true" />
        </div>
        <div class="h_ctn _nav fx aic ctn1" :class="{_home: isHomePage}">
          <div class="index_logo" v-if="isHomePage" :style="{backgroundImage: `url(${siteInfo.LogoUrl})`}"></div>
          <div class="index_logo page_go_back" v-else @click="$router.go(-1)"></div>
          <div class="kw_box _fill">
            <div class="kw_item fx aic">
              <input v-model="keyword" type="text" placeholder="輸入關鍵字查詢" class="_fill" @keypress.enter="sp_keyword('get')" />
              <img class="icon" src="@img/index-search.png" @click="sp_keyword('get')" />
            </div>
          </div>
          <a class="adc" v-html="`進階<br class=up_sm_hide />搜尋`" @click="toPage('search')"></a>
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
            <div class="f_icon home" @click="toHomePage" :class="{active: isHomePage}">
              <p>首頁</p>
            </div>
          </div>
          <div class="f_btn">
            <a class="f_icon line" :href="siteInfo.LineQRCode" target="_blank">
              <p>Line</p>
            </a>
          </div>
          <div class="f_btn">
            <template v-if="!isLogin">
              <div class="f_icon sign_in" @click="login_show = true">
                <p>登入</p>
              </div>
            </template>
            <template v-else>
              <div class="f_icon login_out" @click="logout">
                <p>登出</p>
              </div>
            </template>
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
import Login from "@c/Login";
export default {
  components: { GetInfoVue, Login },
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    ////test
    ...mapState(["siteData"]),
    ////
    ...mapState(["isLogin"]),
    ...mapGetters(["siteInfo", "MarqueeList"]),
    login_show: {
      get() { return this.$store.state.login_show; },
      set(val) { this.$store.state.login_show = val; }
    },
    SiteCode: {
      get() { return this.$store.state.SiteCode; },
      set(val) { this.$store.state.SiteCode = val; }
    },
    siteReady: {
      get() { return this.$store.state.siteReady; },
      set(val) { this.$store.state.siteReady = val; }
    },
    isHomePage() {
      return this.$route.name === "home";
    }
  },
  created() {
    this.SiteCode = location.pathname.replace(/^\//, "").split("/")[0];
    if (!this.SiteCode) {
      this.$router.replace({ path: "/" });
      this.siteReady = true;
    }
    else {
      this.$store.commit("set_isLogin");
    }
  },
  methods: {
    clear() {
      this.keyword = "";
      this.SiteCode = "";
    },
    toHomePage() {
      if (this.isHomePage) return false;
      this.$router.push({ path: `/${this.SiteCode}` })
    },
    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("memberData");
      this.$store.commit("set_isLogin");
    },
    sp_keyword(type) {
      if (type === "get") {
        if (!this.keyword) return false;
        if (this.keyword === this.$route.params.keyword) return false;
        this.$router.push({ path: `/${this.SiteCode}/keyword/${this.keyword}` })
      }
    },
    toPage(page) {
      if (page === "search") {
        this.$router.push({ path: `/${this.SiteCode}/search/` })
      }
    }
  }
};
</script>

<style>
</style>