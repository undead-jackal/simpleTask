import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import VueMoment from 'vue-moment'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import moment from 'moment-timezone'
Vue.use(VueMoment);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.config.productionTip = false

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
