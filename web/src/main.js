// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from "buefy";
// Keep the material design import before the buefy css import ( https://github.com/lobo-tuerto/buefy-css-build-problem )
import "@mdi/font/css/materialdesignicons.min.css";
import "buefy/lib/buefy.css";

Vue.use(Buefy);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
