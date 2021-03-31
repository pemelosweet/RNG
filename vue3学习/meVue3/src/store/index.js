import { createStore } from "vuex";
import getters from './getters'
import permission from './modules/permission'
// import app from './modules/app'
// import settings from './modules/settings'
// import user from './modules/user'
import test from './modules/test'
export default createStore({
  modules: {
    test,
    permission
  },
  getters
});