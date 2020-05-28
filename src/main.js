import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSwal from 'vue-swal';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { store } from './store';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueSwal);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
