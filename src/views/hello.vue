<template>
  <div class="hello_frame fx jcc aic">
    <div class="hello_ctn">
      <div class="hello">歡迎光臨</div>
    </div>
  </div>
</template> 

<script>
////test
import setting from "@/setting";
export default {
  created() {
    if (isDEV) {
      this.$store.state.SiteCode = setting.SiteCode;
      this.$store.state.siteReady = false;
      this.$router.replace({ path: `/${setting.SiteCode}` });
    }
  }
}
////
</script>

<style lang="less">
@import "~@css/fn.less";
.hello_frame {
  .room_f();
  background-image: linear-gradient(45deg, #3494e6, #ec6ead);
}
.hello_ctn {
  text-align: center;
  .cf();
  font-size: 30px;
  @media (max-width: @sm) {
    font-size: 26px;
  }
  .hello {
    margin-bottom: 20px;
    font-size: 200%;
  }
}
</style>