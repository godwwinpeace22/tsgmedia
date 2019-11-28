import Vue from 'vue'
// import './plugins/vuetify'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { bus } from './plugins/bus'
import './registerServiceWorker'
import { firebase, db, database, app } from '@/plugins/firebase'
import helpers from '@/plugins/helpers'
import vueHeadful from 'vue-headful';

Vue.config.productionTip = false
const plugin = {
  install () {
      Vue.helpers = helpers
      Vue.prototype.$helpers = helpers
      Vue.prototype.$eventBus = bus,
      Vue.prototype.$firebase = firebase,
      Vue.prototype.$db = db,
      Vue.prototype.$app = app,
      Vue.prototype.$database = database
  }
}

Vue.component('vue-headful', vueHeadful);

Vue.use(plugin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
