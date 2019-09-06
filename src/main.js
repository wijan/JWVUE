import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import {store} from './store'
import jQuery from 'jquery';
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'


window.$ = window.jQuery = jQuery;

import 'popper.js';
import 'bootstrap';
import './assets/app.scss'
import './fa.config'

Vue.component('Navbar', require('./components/navbar.vue').default);
Vue.component('Modal', require('./components/Modal.vue').default);
Vue.component('Calendario', Datetime);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
