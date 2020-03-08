import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
Vue.config.productionTip = false;
//base
import base from '@js/base';
//vue-slick
//=>https://github.com/kenwheeler/slick#readme
//=>https://www.npmjs.com/package/vue-slick
import 'slick-carousel/slick/slick-theme.less';
import 'slick-carousel/slick/slick.less';
//Element
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-TW';
Vue.use(Element, { locale });
//css
import '@css/style.less';
import '@css/common.less';
import '@css/main.less';
//vue-marquee-text-component
//https://www.npmjs.com/package/vue-marquee-text-component
import MarqueeText from 'vue-marquee-text-component';
Vue.component('marquee-text', MarqueeText);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')