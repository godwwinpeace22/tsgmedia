import Vue from 'vue'
import helpers from '@/plugins/help'

Vue.prototype.$eventBus = new Vue();

const plugin = {
  install () {
      Vue.helpers = helpers
      Vue.prototype.$helpers = helpers
  }
}

Vue.use(plugin)