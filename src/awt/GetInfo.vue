<template></template>

<script>
//api
import { GetInfo } from "@/api";
export default {
  props: {
    SiteCode: String,
    callback: Function
  },
  mounted() {
    GetInfo(this.SiteCode).then(res => {
      if (!res.Data) {
        this.callback();
        this.$router.replace({ path: "/" });
        this.$store.state.siteReady = true;
        return false;
      }
      this.$store.state.siteData = res.Data || {};
      this.$store.state.siteReady = true;
    });
  }
};
</script>

<style>
</style>