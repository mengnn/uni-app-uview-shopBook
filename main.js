import App from './App'

// 引入store
import store from '@/store/index.js'

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

// 引入全局uview
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})

// 引入请求封装，将app参数传递到配置中 Api集中管理
require('config/request.js')(app)

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif