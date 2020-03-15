export default {
  // computed:{
  //   cacheData(){}
  // },
  created() {
    const page_cache = JSON.parse(sessionStorage.getItem(`page_${this.$route.name}`));
    if (page_cache) {
      for (let key in page_cache) {
        this[key] = page_cache[key];
      }
    }
  },
  watch: {
    cacheData: {
      handler() {
        sessionStorage.setItem(`page_${this.$route.name}`, JSON.stringify(this.cacheData));
      },
      deep: true
    }
  }
}