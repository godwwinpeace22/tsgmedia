import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)
const opts = {
  icons: {
    iconfont: 'mdi',
    theme: {
      dark: false
    }
  },
}

export default new Vuetify(opts)