<template>
  <div class="me_box" :class="mode">
    <div class="_photo">
      <img :src="photo" @click="toDetail" />
    </div>
    <div class="_data">
      <div class="_name">{{meInfo.name}}</div>
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
        new row("年齡:", this.meInfo.age)
      ]);
      result.push([
        new row("身高:", this.meInfo.height)
      ]);
      result.push([
        new row("體重:", this.meInfo.weight)
      ]);
      result.push([
        new row("罩杯:", this.meInfo.cup)
      ]);
      return result;
    }
  },
  methods: {
    toDetail() {
      this.$store.state.currentMe = this.meInfo;
      this.$router.push({ path: `/${this.SiteCode}/esme/${this.meInfo.code}` })
    }
  }
};
</script>

<style lang="less">
@import "./css.less";
</style>