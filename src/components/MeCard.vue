<template>
  <div class="me_box">
    <div class="_photo">
      <img :src="photo" @click="toDetail" />
    </div>
    <div class="_data">
      <div class="_name">{{meInfo.name}}</div>
      <div class="_list fx fw">
        <div>
          國别:
          <span>{{meInfo.country_name}}</span>
        </div>
        <div class="_50">
          年齡:
          <span>{{meInfo.age}}</span>
        </div>
        <div class="_50">
          身高:
          <span>{{meInfo.height}}</span>
        </div>
        <div class="_50">
          體重:
          <span>{{meInfo.weight}}</span>
        </div>
        <div class="_50">
          罩杯:
          <span>{{meInfo.cup}}</span>
        </div>
        <div>
          環境:
          <span>{{meInfo.environment_name}}</span>
        </div>
        <div>
          類型:
          <span>{{meInfo.service_type_name}}</span>
        </div>
        <div v-if="price">
          托播價:
          <span class="_price">{{price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    meInfo: Object
  },
  computed: {
    ...mapState(["SiteCode"]),
    photo() {
      return (this.meInfo.LadyFileList[0] || {}).path;
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

<style>
</style>