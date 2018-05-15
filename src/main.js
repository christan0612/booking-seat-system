// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/icons'
import store from './store/Index'
import VeeValidate from 'vee-validate'
// 全站共用 function
import './utils/mixins'
import 'babel-polyfill'
// element-ui
import { Dropdown, DropdownMenu, DatePicker } from 'element-ui'
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DatePicker)

// 欄位驗證
Vue.use(VeeValidate, {
  // 語系
  locale: 'zh_TW',
  // 驗證字串
  dictionary: {
    zh_TW: {
      messages: {
        required () { return '必填' },
        email () { return 'Email格式不正確' },
        min (field, length) { return `至少${length}個字` },
        confirmed () { return '與密碼不同' }
      }
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
