import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './assets/less/common.less'
import router from './router'

Vue.config.productionTip = false
// 全局mixin， 解决el-upload自带网络请求没有设置token
Vue.mixin({
  methods: {
    getAuth() {
      return {
        Authorization: `Bearer ${sessionStorage.token||''}`
      }
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
