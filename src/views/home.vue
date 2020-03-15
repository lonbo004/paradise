<template>
  <div class="home_frame">
    <div class="banner_frame">
      <div class="banner_ctn _slick">
        <slick v-if="siteInfo.Carousel" ref="slick" :options="slickOptions" @reInit="reInit">
          <template v-if="siteInfo.Carousel.length">
            <img :src="item" v-for="item in siteInfo.Carousel" />
          </template>
          <template v-else>
            <img src="@img/banner_default_01.jpg" />
            <img src="@img/banner_default_02.jpg" />
            <img src="@img/banner_default_03.jpg" />
          </template>
        </slick>
      </div>
    </div>
    <div class="town_frame">
      <div class="town_ctn fx fw">
        <div class="town_box" v-for="item in TownList" :class="{active: item.Code === sd_TownList}" @click="sp_TownList('sd', item.Code)">{{item.Name}}</div>
        <div class="town_box" @click="toPage('escort')">伴遊</div>
      </div>
    </div>
    <!-- 排行榜 -->
    <template v-if="LeaderBoard_LadyList.length">
      <div class="menu_frame">
        <div class="menu_title phb_title">
          <img class="phb" src="@img/phb.jpg" />
          <span class="_1">排行榜 約妹真實評價，請勿洗分，違規者予以封鎖。</span>
          <!-- <span class="_2" @click="toPage('top')">更多排行 >></span> -->
        </div>
        <MeLayout>
          <MeCard :mode="'_top_home'" v-for="(item,index) in LeaderBoard_LadyList" :meInfo="item" />
        </MeLayout>
      </div>
    </template>
    <!-- 定點 -->
    <template v-for="(district,district_i) in Locate_LadyList">
      <div class="menu_frame">
        <div class="menu_title type_title fx aic">
          <span class="_town">{{currentTown_name}}{{district.district_name}}</span>
          <span class="_type _fill">定點</span>
          <span class="_more" @click="toPage('town_local', district)">更多定點 >></span>
        </div>
        <MeLayout>
          <MeCard :mode="'_home'" v-for="item in district.LadyList" :meInfo="item" />
        </MeLayout>
      </div>
    </template>
    <!-- 外約 -->
    <template v-if="Outside_LadyList.length">
      <div class="menu_frame">
        <div class="menu_title type_title fx aic">
          <span class="_town">{{currentTown_name}}</span>
          <span class="_type _fill">外約</span>
          <span class="_more" @click="toPage('town_outside')">更多外約 >></span>
        </div>
        <MeLayout>
          <MeCard :mode="'_home'" v-for="(item,index) in Outside_LadyList" :meInfo="item" />
        </MeLayout>
      </div>
    </template>
    <!-- awt -->
    <awt v-if="!sd_TownList&&siteInfo.MainTown" :callback="callback" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// awt
import awt from "@/awt";
//api
import { Lady_Firstpage_Search } from "@/api";
//components
import MeLayout from "@c/MeLayout";
import MeCard from "@c/MeCard/MeCard.vue";
import slick from "vue-slick";//initialSlide
//mixins
import cacheCurrentPage from "@mix/cacheCurrentPage";
export default {
  components: { MeLayout, slick, MeCard, awt },
  mixins: [cacheCurrentPage],
  data() {
    return {
      slickOptions: {
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000
      },
      sd_TownList: "",
      LeaderBoard_LadyList: [],
      Locate_LadyList: [],
      Outside_LadyList: []
    }
  },
  computed: {
    ...mapState(["siteData", "SiteCode"]),
    ...mapGetters(["siteInfo", "TownList", "MarqueeList"]),
    currentTown_name() {
      return (this.TownList.find(x => x.Code === this.sd_TownList) || {}).Name;
    },
    cacheData() {
      return {
        sd_TownList: this.sd_TownList
      }
    }
  },
  mounted() {
    if (this.sd_TownList) this.sp_TownList("get", this.sd_TownList);
  },
  methods: {
    //slick
    reInit() {
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
    //awt
    callback() {
      this.sd_TownList = this.siteInfo.MainTown.Code;
      this.LeaderBoard_LadyList = this.siteData.LeaderBoard_LadyList;
      this.Locate_LadyList = this.siteData.Locate_LadyList;
      this.Outside_LadyList = this.siteData.Outside_LadyList;
    },
    sp_TownList(type, code) {
      if (type === "get") {
        this.sd_TownList = code;
        Lady_Firstpage_Search(code).then(res => {
          this.LeaderBoard_LadyList = res.LeaderBoard_LadyList;
          this.Locate_LadyList = res.Locate_LadyList;
          this.Outside_LadyList = res.Outside_LadyList;
        })
      }
      else if (type === "sd") {
        if (this.sd_TownList === code) return false;
        this.sp_TownList("get", code);
      }
    },
    toPage(page, val) {
      if (page === "top") {
        sessionStorage.removeItem("page_top");
        this.$router.push({ path: `/${this.SiteCode}/top/${this.sd_TownList}` });
      }
      else if (page === "town_local") {
        sessionStorage.removeItem("page_town");
        this.$router.push({ path: `/${this.SiteCode}/town/${this.sd_TownList}/${val.district_code}/-1/0` });
      }
      else if (page === "town_outside") {
        sessionStorage.removeItem("page_town");
        this.$router.push({ path: `/${this.SiteCode}/town/${this.sd_TownList}/-1/-1/1` });
      }
      else if (page === "escort") {
        sessionStorage.removeItem("page_escort");
        this.$router.push({ path: `/${this.SiteCode}/escort` });
      }
    }
  }
};
</script>

<style>
</style>