<template>
  <div class="home_frame ctn0">
    <div class="banner_frame">
      <div class="banner_ctn">
        <slick ref="slick" :options="slickOptions" @reInit="reInit">
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
        <div class="town_box" v-for="item in TownList" :class="{active: item.Code === sd_TownList}">{{item.Name}}</div>
        <div class="town_box">伴遊</div>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="menu_frame">
      <div class="menu_title phb_title">
        <img class="phb" src="@img/phb.jpg" />
        <span class="_1">排行榜 約妹真實評價，請勿洗分，違規者予以封鎖。</span>
        <span class="_2">更多排行 >></span>
      </div>
      <div class="menu_ctn fx fw jcsb g_fill">
        <GCard :class="'_top'" v-for="(item,index) in LeaderBoard_LadyList" :GInfo="item" :key="index" />
      </div>
    </div>

    <div class="menu_frame">
      <div class="menu_title type_title fx aic">
        <span class="_town">台中</span>
        <span class="_type _fill">定點</span>
        <span class="_more">更多定點 >></span>
      </div>
      <div class="menu_ctn fx fw jcsb g_fill">
        <!-- <GCard :class="'_home'" v-for="(item,index) in 4" :key="index" /> -->
      </div>
    </div>
    <!-- awt -->
    <awt v-if="siteInfo.MainTown" :callback="()=>{sd_TownList = siteInfo.MainTown.Code}" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import slick from "vue-slick";//initialSlide
import GCard from "@c/GCard.vue";
// awt
import awt from "@/awt"

export default {
  components: { slick, GCard, awt },
  data() {
    return {
      slickOptions: {
        dots: true
      },
      sd_TownList: "",
    }
  },
  computed: {
    ...mapGetters(["siteInfo", "TownList", "MarqueeList", "LeaderBoard_LadyList"]),
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
  }
};
</script>

<style>
</style>