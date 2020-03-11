<template>
  <div class="meme_frame">
    <div class="meme_ctn">
      <div class="banner_frame">
        <div class="banner_ctn">
          <div class="me_box fx">
            <div class="_photo">
              <img :src="photo" />
            </div>
            <div class="_data _fill">
              <div class="_name">{{currentMe.name}}</div>
              <div class="_list fx fw">
                <template v-for="row in templateList">
                  <div v-for="item in row" :class="{_50: row.length>1}">
                    {{item.label}}
                    <span :class="item.value_css">{{item.value}}</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="meme_info">
        <div class="meme_file fx fw jcsb">
          <div class="file_box" v-for="item in currentMe.FileList">
            <template v-if="/^image/.test(item.filetype)">
              <img :src="item.path" />
            </template>
            <template v-if="/^video/.test(item.filetype)">
              <video :src="item.path" controls preload></video>
            </template>
          </div>
        </div>
        <div class="meme_service">
          <div class="service_list" v-for="item in templateList_detail">
            {{item.label}}
            <span v-html="item.value"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import slick from "vue-slick";//initialSlide
//api
import { Escort_GetOne } from "@/api";
export default {
  components: { slick },
  data() {
    return {
      currentMe: {}
    }
  },
  computed: {
    ...mapState(["isLogin", "memberData"]),
    ...mapGetters(["siteInfo"]),
    photo() {
      return ((this.currentMe.FileList || [])[0] || {}).path;
    },
    templateList() {
      let result = [];
      function row(label, value) {
        return { label, value }
      }
      result.push([
        new row("類別:", { 0: "單純", 1: "全方位" }[this.currentMe.type])
      ]);
      result.push([
        new row("國别:", this.currentMe.country_name),
        new row("編號:", this.currentMe.id),
      ]);
      result.push([
        new row("年齡:", this.currentMe.age)
      ]);
      result.push([
        new row("身高:", this.currentMe.height)
      ]);
      result.push([
        new row("體重:", this.currentMe.weight)
      ]);
      result.push([
        new row("罩杯:", this.currentMe.cup)
      ]);
      return result;
    },
    templateList_detail() {
      let result = [];
      function row(label, value) {
        return { label, value }
      }
      result = [
        new row("個人基本介紹:", this.currentMe.introduce_detail),
        new row("可接受服務:", this.currentMe.allow_name),
        new row("不可接受服務:", this.currentMe.not_allow_name),
        new row("預約價格說明:", this.currentMe.price_detail),
        new row("約會備註:", this.currentMe.date_detail)
      ]
      return result;
    },
    MMT: () => MMT
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      Escort_GetOne(this.$route.params.code).then(res => {
        if (res) {
          this.currentMe = res;
        };
      })
    }
  }
};
</script>

<style lang="less">
@import "~@c/MeCard/css.less";
</style>
