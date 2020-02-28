<template>
  <div id="app">
    <div class="h_frame">
      <div class="h_ctn _head ctn1 clear" v-if="isHomePage">
        <div class="title">{{siteInfo.Name}}</div>
        <img class="login" src="@img/user.png" />
      </div>
      <div class="h_ctn _nav fx aic ctn1">
        <div class="index_logo" :style="{backgroundImage: `url(./img/logo.jpg)`}"></div>
        <div class="kw_box _fill">
          <div class="kw_item fx aic">
            <input v-model="keyword" type="text" placeholder="輸入關鍵字查詢" class="_fill" />
            <img class="icon" src="@img/index-search.png" />
          </div>
        </div>
        <a class="adc" v-html="`進階<br class=up_sm_hide />搜尋`"></a>
      </div>
      <div class="h_ctn _mar fx aic ctn1">
        <img class="laba" src="@img/laba.png" />
        <marquee-text class="_fill">{{re_MarqueeList}}</marquee-text>
      </div>
    </div>
    <div class="h_fill"></div>
    <router-view v-if="siteReady" />
    <div class="f_fill"></div>
    <div class="f_frame">
      <div class="f_ctn fx aic ctn1">
        <div>img</div>
      </div>
    </div>
    <!-- awt -->
    <GetInfoVue v-if="SiteCode" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GetInfoVue from "@/awt/GetInfo.vue";
import { GetInfo } from "@/api";
export default {
  components: { GetInfoVue },
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    ...mapState(["siteInfo", "siteReady", "MarqueeList"]),
    SiteCode() {
      return this.$route.params.SiteCode;
    },
    re_MarqueeList() {
      return this.MarqueeList.map((x, i) => `${(i + 1)}.${x.Title}`).join(" ".repeat(10));
    },
    isHomePage() {
      return this.$route.name === "home";
    }
  },
  created() {
    ////test
    this.$router.replace({ path: "/a8spcegp8zw" });
  },
  mounted() { },
  methods: {}
};
</script>

<style>
</style>