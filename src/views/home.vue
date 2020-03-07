<template>
  <div class="home_frame ctn0">
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
        <div class="town_box" v-for="item in TownList" :class="{active: item.Code === sd_TownList}" @click="sp_TownList('get', item.Code)">{{item.Name}}</div>
        <div class="town_box">伴遊</div>
      </div>
    </div>
    <!-- 排行榜 -->
    <template v-if="LeaderBoard_LadyList.length">
      <div class="menu_frame">
        <div class="menu_title phb_title">
          <img class="phb" src="@img/phb.jpg" />
          <span class="_1">排行榜 約妹真實評價，請勿洗分，違規者予以封鎖。</span>
          <span class="_2" @click="toPage('top')">更多排行 >></span>
        </div>
        <div class="menu_ctn fx fw jcsb me_fill">
          <MeCard :class="'_top_home'" v-for="(item,index) in LeaderBoard_LadyList" :meInfo="item" />
        </div>
      </div>
    </template>
    <!-- 定點 -->
    <template v-for="(district,district_i) in Locate_LadyList">
      <div class="menu_frame">
        <div class="menu_title type_title fx aic">
          <span class="_town">{{currentTown_name}}{{district.district_name}}</span>
          <span class="_type _fill">定點</span>
          <span class="_more">更多定點 >></span>
        </div>
        <div class="menu_ctn fx fw jcsb me_fill">
          <MeCard :class="'_home'" v-for="item in district.LadyList" :meInfo="item" />
        </div>
      </div>
    </template>
    <!-- 外約 -->
    <template v-if="Outside_LadyList.length">
      <div class="menu_frame">
        <div class="menu_title type_title fx aic">
          <span class="_town">{{currentTown_name}}</span>
          <span class="_type _fill">外約</span>
          <span class="_more">更多外約 >></span>
        </div>
        <div class="menu_ctn fx fw jcsb me_fill">
          <MeCard :class="'_home'" v-for="(item,index) in Outside_LadyList" :meInfo="item" />
        </div>
      </div>
    </template>
    <!-- awt -->
    <awt v-if="siteInfo.MainTown" :callback="callback" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import slick from "vue-slick";//initialSlide
import MeCard from "@c/MeCard.vue";
// awt
import awt from "@/awt"
//api
import { Lady_Firstpage_Search } from "@/api";
export default {
  components: { slick, MeCard, awt },
  data() {
    return {
      slickOptions: {
        dots: true
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
    }
  },
  mounted() {

  },
  methods: {
    sp_TownList() { },
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
        if (this.sd_TownList === code) return false;
        this.sd_TownList = code;
        Lady_Firstpage_Search(code).then(res => {
          this.LeaderBoard_LadyList = res.LeaderBoard_LadyList;
          this.Locate_LadyList = res.Locate_LadyList;
          this.Outside_LadyList = res.Outside_LadyList;
        })
      }
    },
    toPage(page) {
      if (page === "top") {
        this.$router.push({ path: `/${this.SiteCode}/top/${this.sd_TownList}` })
      }
    }
  }
};
</script>

<style>
</style>