<template></template>

<script>
//api
import { GetInfo } from "@/api";
export default {
  mounted() {
    GetInfo(this.$route.params.SiteCode).then(res => {
      this.$store.state.siteInfo = res.Data.Site;
      this.$store.state.MarqueeList = res.Data.MarqueeList;
      this.$store.state.siteReady = true;
    });
  }
};
</script>

<style>
</style>