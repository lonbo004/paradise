<template>
  <div class="g_box">
    <div class="_photo">
      <img :src="photo" />
    </div>
    <div class="_data">
      <div class="_name">林雁兒</div>
      <div class="_list clear">
        <div>
          國别:
          <span>港澳妹</span>
        </div>
        <div class="_50">
          年齡:
          <span>20</span>
        </div>
        <div class="_50">
          身高:
          <span>164</span>
        </div>
        <div class="_50">
          體重:
          <span>暫無</span>
        </div>
        <div class="_50">
          罩杯:
          <span>E</span>
        </div>
        <div>
          環境:
          <span>外約</span>
        </div>
        <div>
          類型:
          <span>外約</span>
        </div>
        <div>
          托播價:
          <span class="_price">8200</span>
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
    }
  }
};
</script>

<style>
</style>