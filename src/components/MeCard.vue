<template>
  <div class="me_box">
    <div class="_photo">
      <img :src="photo" @click="toDetail" />
    </div>
    <div class="_data">
      <div class="_name">{{MeInfo.name}}</div>
      <div class="_list clear">
        <div>
          國别:
          <span>{{MeInfo.country_name}}</span>
        </div>
        <div class="_50">
          年齡:
          <span>{{MeInfo.age}}</span>
        </div>
        <div class="_50">
          身高:
          <span>{{MeInfo.height}}</span>
        </div>
        <div class="_50">
          體重:
          <span>{{MeInfo.weight}}</span>
        </div>
        <div class="_50">
          罩杯:
          <span>{{MeInfo.cup}}</span>
        </div>
        <div>
          環境:
          <span>{{MeInfo.environment_name}}</span>
        </div>
        <div>
          類型:
          <span>{{MeInfo.service_type_name}}</span>
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
    MeInfo: Object
  },
  computed: {
    ...mapState(["SiteCode"]),
    photo() {
      return (this.MeInfo.LadyFileList[0] || {}).path;
    },
    price() {
      const sl = this.MeInfo.shorttime_local_final_price;
      const so = this.MeInfo.shorttime_outside_final_price;
      const ll = this.MeInfo.longtime_local_final_price;
      const lo = this.MeInfo.longtime_outside_final_price;
      const _price = [sl, so, ll, lo];
      if (_price.every(x => x === 0)) return false;
      const _max = Math.max(..._price);
      const _min = Math.min(..._price);
      return [_min, _max].filter(x => x > 0).join("~");
    }
  },
  methods: {
    toDetail() {
      this.$router.push({ path: `/${this.SiteCode}/meme/${this.MeInfo.id}` })
    }
  }
};
</script>

<style>
</style>