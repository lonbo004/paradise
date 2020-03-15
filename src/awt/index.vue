<template></template>

<script>
export default {
  props: {
    callback: Function
  },
  mounted() {
    this.callback && this.callback();
  }
}
</script>

<style>
</style>