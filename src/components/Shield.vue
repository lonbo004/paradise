<template>
  <div class="shield_frame" ref="Shield" v-show="show" @keyup.esc="closeEvent" tabindex="-1">
    <div class="shield_ctn" :class="s_ctn_class">
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
    },
    s_ctn_class: {
      type: String,
      default: "fx jcc aic h100"
    },
    close: Function
  },
  mounted() {
    setTimeout(() => {
      this.$refs.Shield.focus();
    }, 0);
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
    },
    closeEvent() {
      this.close && this.close();
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
<style lang="less" scoped>
@import "~@css/fn.less";
.shield_frame {
  .room_f();
  .bc(rgba(0, 0, 0, 0.8));
  z-index: 200;
}
</style>