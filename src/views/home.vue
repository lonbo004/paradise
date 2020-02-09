<template>
  <div class="page_frame home_frame">
    <div class="page_header">
      <span class="site_name">小八定點外約</span>
      <span class="gj_btn">進階搜尋</span>
      <div class="key_box fx aic">
        <input class="key_input _fill" type="text" />
        <img class="key_icon" src="@img/index-search.png" />
      </div>
    </div>
    <slick ref="slick" :options="slickOptions">
      <img src="@img/banner-04.jpg" />
      <img src="@img/banner-05.jpg" />
      <img src="@img/banner-06.jpg" />
    </slick>
    <div class="area_ctn">
      <div class="area_box fx aic">
        <span>地區選擇：</span>
        <el-select class="_fill" v-model="sd_area">
          <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
    </div>
    <div class="g_frame">
      <div class="g_title fx aic">
        <div class="type">外約</div>
        <div class="line"></div>
        <div class="location">台中全區</div>
        <div class="more">更多</div>
      </div>
      <div class="g_ctn">
        <div class="g_box" v-for="item in g_list">
          <img class="g_img" src="@img/test/g0.jpg" />
          <div class="g_info">
            暱稱：
            <span>{{item.name}}</span>
            <br />年齡：
            <span>{{item.age}}</span> | 身高：
            <span>{{item.height}}</span>
            <br />體重：
            <span>{{item.wight}}</span> | 罩杯：
            <span>{{item.cup}}</span>
            <br />國別：
            <span>{{item.country}}</span>
            <br />類型：
            <span>{{item.type}}</span>
            <br />價格：
            <span>{{item.price}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slick from 'vue-slick';
export default {
  components: { slick },
  data() {
    return {
      slickOptions: {},
      areaList: [{
        id: "",
        name: "台中"
      }],
      sd_area: "台中",
      g_list: [
        {
          name: "拉拉",
          age: "16",
          height: 162,
          wight: 45,
          cup: "D",
          country: "台妹",
          type: "外約",
          price: "8000"
        }
      ]
    }
  },
  mounted() {
    for (var a = 0; a < 5; a++) {
      this.g_list = this.g_list.concat(this.g_list);
    }
  },
  methods: {

  }
}
</script>

<style>
</style>