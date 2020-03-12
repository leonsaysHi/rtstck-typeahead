import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.config.productionTip = false

window._ = require('lodash')  // eslint-disable-line
Vue.component('input-typeahead', require('./components/rtstck-typeahead/RtstckInputTypeahead.vue').default)  // eslint-disable-line

new Vue({
  render: h => h(App),
}).$mount('#app')
