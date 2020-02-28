<template>
  <div class="home_frame ctn0">
    <div class="banner_frame">
      <div class="banner_ctn">
        <slick ref="slick" :options="slickOptions">
          <img src="@img/banner-04.jpg" />
          <img src="@img/banner-05.jpg" />
          <img src="@img/banner-06.jpg" />
        </slick>
      </div>
    </div>
    <div class="town_frame">
      <div class="town_ctn fx">
        <div class="town_box" v-for="item in TownList" :class="{active: false}">{{item.Text}}</div>
      </div>
    </div>
    <div class="menu_frame">
      <div class="type_title fx aic">
        <span class="_town">台中</span>
        <span class="_type _fill">定點</span>
        <span class="_more">更多定點 >></span>
      </div>
      <div class="menu_ctn fx fw jcsb g_fill">
        <GCard :class="'_home'" v-for="(item,index) in 4" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import slick from "vue-slick";//initialSlide
import GCard from "@c/GCard.vue";


export default {
  components: { slick, GCard },
  data() {
    return {
      slickOptions: {
        dots: true
      },
    }
  },
  computed: {
    ...mapState(["siteInfo"]),
    TownList() {
      return this.siteInfo.TownList || [];
    }
  },
  mounted() {

  }
};
</script>

<style>
</style>