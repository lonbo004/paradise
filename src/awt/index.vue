<template></template>

<script>
export default {
  props: {
    callback: Function
  },
  mounted() {
    this.callback && this.callback();
    this.$destroy();
  }
}
</script>

<style>
</style>