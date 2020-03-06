<template>
  <div class="hello_frame fx jcc aic">
    <div class="hello_ctn">
      <div class="hello">歡迎光臨</div>
      <div class="plasm">首頁即將發佈，敬請期待</div>
    </div>
  </div>
</template> 

<script>
////test
import setting from "@/setting";
export default {
  created() {
    this.$store.state.SiteCode = setting.SiteCode;
    this.$router.replace({ path: `/${setting.SiteCode}` });
  }
}
////
</script>

<style lang="less">
@import "~@css/fn.less";
.hello_frame {
  .room_f();
  .bc(#7b0f3b);
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