// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import MintUI from 'mint-ui';
import 'sanitize.css';

import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import store from './store';
import './assets/richtext.css';
import setConfig from './utils/setConfig';

Vue.config.productionTip = false;

Vue.use(MintUI);
if (window.whatdevice && window.whatdevice.isiOS) {
  setConfig();
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
