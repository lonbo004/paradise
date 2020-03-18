<template>
  <div class="s_frame" v-show="show">
    <div class="fx jcc aic h100">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  beforeDestroy() {
    this.sp_show("close");
  },
  methods: {
    sp_show(type) {
      if (type === "show") {
        document.querySelectorAll("html, body").forEach(el => {
          el.style.overflowY = "hidden";
        })
      }
      else if (type === "close") {
        document.querySelectorAll("html, body").forEach(el => {
          el.style.overflowY = "auto";
        })
      }
    }
  },
  watch: {
    show: {
      handler(val) {
        this.sp_show(val ? "show" : "close");
      },
      immediate: true
    }
  }
}
</script>

<style lang="less">
@import "~@css/fn.less";
.s_frame {
  .room_f();
  .bc(rgba(0, 0, 0, 0.8));
  z-index: 200;
}
</style>