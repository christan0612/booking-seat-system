import Vue from 'vue'

// 全站共用的 function，會注入每個 component 當中
Vue.mixin({
  filters: {
    formatComma (value) {
      return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value
    }
  }
})
