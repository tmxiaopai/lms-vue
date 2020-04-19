// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from './plugins/axios'

import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'

Vue.use(require('vue-moment'));
Vue.prototype.moment = moment
Vue.config.productionTip = false
Vue.use(axios)
Vue.use(ElementUI)


Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dateStr).format(pattern);
})
Vue.filter('dateFormat1',function(dateStr,pattern='YYYY-MM-DD'){
  return moment(dateStr).format(pattern);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
