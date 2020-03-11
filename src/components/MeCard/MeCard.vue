<template>
  <div class="me_box" :class="mode">
    <div class="_photo">
      <img :src="photo" @click="toDetail" />
    </div>
    <div class="_data">
      <div class="_name">
        {{meInfo.name}}
        <div v-if="total_point" class="_point">{{total_point}}</div>
      </div>
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
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    meInfo: Object,
    mode: String
  },
  computed: {
    ...mapState(["SiteCode"]),
    ...mapGetters(["siteInfo"]),
    photo() {
      return this.meInfo && (this.meInfo.FileList[0] || {}).path;
    },
    price() {
      const sl = this.meInfo.shorttime_local_final_price;
      const so = this.meInfo.shorttime_outside_final_price;
      const ll = this.meInfo.longtime_local_final_price;
      const lo = this.meInfo.longtime_outside_final_price;
      const _price = [sl, so, ll, lo];
      if (_price.every(x => x === 0)) return false;
      const _max = Math.max(..._price);
      const _min = Math.min(..._price);
      return [_min, _max].filter(x => x > 0).join("~");
    },
    total_point() {
      return this.mode === "_top_home" && this.meInfo.total_point ? `${this.meInfo.total_point}分` : "";
    },
    templateList() {
      let result = [];
      function row(label, value) {
        return { label, value }
      }
      result.push([
        new row("國别:", this.meInfo.country_name),
        new row("編號:", this.meInfo.id),
      ]);
      result.push([
        new row("年齡:", this.meInfo.age),
        new row("身高:", this.meInfo.height)
      ]);
      result.push([
        new row("體重:", this.meInfo.weight),
        new row("罩杯:", this.meInfo.cup)
      ]);
      result.push([
        new row("環境:", this.meInfo.environment_name)
      ]);
      result.push([
        new row("類型:", this.meInfo.service_type_name)
      ]);
      if (this.siteInfo.ShowPrice) {
        result.push([
          { label: "托播價:", value: this.price, value_css: "_price" }
        ]);
      }
      return result;
    }
  },
  methods: {
    toDetail() {
      this.$store.state.currentMe = this.meInfo;
      this.$router.push({ path: `/${this.SiteCode}/meme/${this.meInfo.code}` })
    }
  }
};
</script>

<style lang="less">
@import "./css.less";
</style>