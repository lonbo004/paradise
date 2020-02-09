<template>
  <div id="app">
    <div class="space_frame">
      <div class="marquee_ctn fx aic">
        <img class="laba" src="@img/laba.png" />
        <marquee-text class="_fill">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</marquee-text>
      </div>
      <div class="marquee_ctn_fill"></div>
      <router-view />
    </div>
  </div>
</template>