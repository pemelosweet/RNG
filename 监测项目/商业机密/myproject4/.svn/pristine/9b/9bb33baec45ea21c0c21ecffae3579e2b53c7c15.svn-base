import 'babel-polyfill'
import 'url-search-params-polyfill'
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import '@/permission' // 权限
import router from './router'

import i18n from './lang' // 国际化
import '@/icons' // icon
import global from './global.js'// 全局变量引用文件
// import config from '../static/config.js'
import './errorLog' // error log

import * as filters from './filters' // global filters

import uploader from 'vue-simple-uploader'
Vue.use(uploader)

import VCharts from 'v-charts'
Vue.use(VCharts)

// import VueCron from 'vue-cron'
// Vue.use(VueCron)
// Vue.prototype.config = config
// import axios from 'axios'
// axios.get('../static/project.config.json').then((result) => {
//   Vue.prototype.baseConfig = result.data
// }).catch((error) => {
//   console.log('get baseConfig error...' + error)
// })
Vue.prototype.GLOBAL = global // 挂载到Vue实例上面

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'small'
})
// 注册工作流全局组件----------数据接收-----------黄----
// import receiveWorkflow from '@/components/reportingAgency-workFlow/index.vue'
// Vue.component('receive-workflow', receiveWorkflow)
// 注册工作流全局组件-------------监测分析--------黄----
import monitorWorkflow from '@/components/monitoringAnalysis-workFlow/index.vue'
Vue.component('monitor-workflow', monitorWorkflow)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
