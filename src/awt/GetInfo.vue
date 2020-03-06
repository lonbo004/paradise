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
      ////test
      // if (!res.Data) {
      //   this.callback();
      //   this.$router.replace({ path: "/" });
      //   return false;
      // }
      this.$store.state.siteData = res.Data || {};
      //html render
      document.title = res.Data.Site.Name;
    });
  }
};
</script>

<style>
</style>