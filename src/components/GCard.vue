<template>
  <div class="g_box">
    <div class="_photo">
      <img :src="photo" />
    </div>
    <div class="_data">
      <div class="_name">{{GInfo.name}}</div>
      <div class="_list clear">
        <div>
          國别:
          <span>{{GInfo.country_name}}</span>
        </div>
        <div class="_50">
          年齡:
          <span>{{GInfo.age}}</span>
        </div>
        <div class="_50">
          身高:
          <span>{{GInfo.height}}</span>
        </div>
        <div class="_50">
          體重:
          <span>{{GInfo.weight}}</span>
        </div>
        <div class="_50">
          罩杯:
          <span>{{GInfo.cup}}</span>
        </div>
        <div>
          環境:
          <span>{{GInfo.environment_name}}</span>
        </div>
        <div>
          類型:
          <span>{{GInfo.service_type_name}}</span>
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
export default {
  props: {
    GInfo: Object
  },
  computed: {
    photo() {
      return (this.GInfo.LadyFileList[0] || {}).path;
    },
    price(){
      const sl = this.GInfo.shorttime_local_final_price;
      const so = this.GInfo.shorttime_outside_final_price;
      const ll = this.GInfo.longtime_local_final_price;
      const lo = this.GInfo.longtime_outside_final_price;
      const _price = [sl , so , ll , lo];
      if(_price.every(x=>x===0)) return false;
      const _max = Math.max(..._price);
      const _min = Math.min(..._price);
      return [_min, _max].filter(x=>x>0).join("~");
    }
  }
};
</script>

<style>
</style>