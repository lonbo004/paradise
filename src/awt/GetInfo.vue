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
      if (!res.Data || res.Data.Site.status === 0) {
        this.callback();
        this.$router.replace({ path: "/" });
        return false;
      }
      if (!res.Data.Site.LogoUrl) res.Data.Site.LogoUrl = "./img/logo_default.jpg";
      this.$store.state.siteData = res.Data || {};
      this.$store.state.siteReady = true;
      //html render
      document.title = res.Data.Site.Name;
    }).finally(() => {
      this.$destroy();
    });
  }
};
</script>

<style>
</style>