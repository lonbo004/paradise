<template>
  <Shield :s_ctn_class="''" :close="close">
    <slick class="zoom_frame" ref="slick" :options="slickOptions" @reInit="reInit">
      <template v-for="item in list">
        <template v-if="/^image/.test(item.filetype)">
          <div class="zoom_box" :style="{backgroundImage: `url('${item.path}')`}"></div>
        </template>
        <template v-if="/^video/.test(item.filetype)">
          <div class="zoom_box">
            <video class="zoom_video" :src="item.path" controls preload></video>
          </div>
        </template>
      </template>
    </slick>
    <div class="zoom_x" @click="close"></div>
  </Shield>
</template>

<script>
import slick from "vue-slick";
//components
import Shield from "@c/Shield";
export default {
  components: { slick, Shield },
  props: {
    close: Function,
    list: Array,
    index: Number
  },
  data() {
    return {
      slickOptions: {
        initialSlide: this.index
      },
    }
  },
  methods: {
    //slick
    reInit() {
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    }
  }
}
</script>

<style>
</style>