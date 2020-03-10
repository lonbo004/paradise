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
@import "~@css/fn.less";
.me_box {
  width: 32%;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  padding: 10px;
  @media (max-width: 800px) {
    width: 49%;
    padding: 7px;
    margin-bottom: 10px;
  }
  &._top_home {
    background-image: linear-gradient(180deg, #ffffff, @main);
  }
  &._top,
  &._town,
  &._es {
    padding: 0;
    ._list {
      > div {
        border: none;
        padding: 0;
      }
    }
  }
  &._home {
    .bc(@main_deep);
  }
  &._kw {
    padding: 0;
  }
  ._photo {
    height: 300px;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .cp();
    @media (max-width: @lg) and (min-width: 801px) {
      height: 30vw;
    }
    @media (max-width: 800px) {
      height: 40vw;
    }
    & > img {
      width: 100%;
    }
  }
  ._data {
    padding: 20px 10px;
    .bc(@f);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    @media (min-width: @sm) {
      padding-bottom: 10px;
    }
  }
  ._name {
    color: @0;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
    line-height: 1;
    @media (max-width: @sm) {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
  ._list {
    & > div {
      width: 100%;
      border-bottom: 1px dashed #ddd;
      padding-bottom: 5px;
      margin-bottom: 5px;
      font-size: 20px;
      font-weight: bold;
      @media (max-width: @sm) {
        font-size: 14px;
      }
      &._50 {
        width: 50%;
      }
      & > span {
        color: #999999;
        &._price {
          color: @main;
          font-style: italic;
          @media (max-width: @sm) {
            font-size: 100%;
          }
        }
      }
    }
  }
}
</style>