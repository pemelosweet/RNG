import Vue from 'vue'
import Vuex from 'vuex'
// import cloneDeep from 'lodash/cloneDeep'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'
// import suspicious from './modules/onlineSusp'
// import unionpay from './modules/onlineUnionpay'
import workFlow from './modules/workFlow'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    user,
    // suspicious,
    // unionpay,
    workFlow
  },
  getters
  // mutations: {
  //   // 重置vuex本地储存状态
  //   resetStore(state) {
  //     Object.keys(state).forEach((key) => {
  //       state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
  //     })
  //   }
  // }
})
