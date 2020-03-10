<template></template>

<script>
//api
import { GetInfo } from "@/api";
export default {
  props: {
    SiteCode: String,
    callback: Function
  },
  computed: {
    siteReady: {
      get() { return this.$store.state.siteReady; },
      set(val) { this.$store.state.siteReady = val; }
    },
  },
  mounted() {
    if (this.siteReady) return false;
    GetInfo(this.SiteCode).then(res => {
      // if (!res.Data || res.Data.Stie.status === 0) {
      //   this.callback();
      //   this.$router.replace({ path: "/" });
      //   return false;
      // }
      if (!res.Data.Site.LogoUrl) res.Data.Site.LogoUrl = "./img/logo_default.jpg";
      this.$store.state.siteData = res.Data || {};
      this.siteReady = true;
      //html render
      document.title = res.Data.Site.Name;
    });
  }
};
</script>

<style>
</style>