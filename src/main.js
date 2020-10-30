import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import router from './router';
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueCountdown from '@chenfengyuan/vue-countdown';
import VueTheMask from 'vue-the-mask'
//import store from "./store/store";

//import tronweb from 'tronweb';
// eslint-disable-next-line no-unused-vars
//import $ from 'jquery'
//window.$ = window.jQuery = require('jquery')
Vue.use(VueTheMask)
Vue.use(Chartkick.use(Chart));
Vue.config.productionTip = false
Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue'));
Vue.component(VueCountdown.name, VueCountdown);

new Vue({
  created(){
    AOS.init();
  },
  vuetify,
 // tronweb,
  router,
 // store: store,
  render: h => h(App)
}).$mount('#app')