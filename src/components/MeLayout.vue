<template>
  <div class="fx fw jcsb me_fill">
    <slot></slot>
  </div>
</template>

<style lang="less">
.me_fill {
  &::after {
    content: "";
    display: block;
    width: 32%;
  }
}
</style>