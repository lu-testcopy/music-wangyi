import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

Vue.config.productionTip = false
import './views/style/css/global.less'
import './views/style/css/iconfont.less'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
