import { createStore } from 'vuex'
// 业务组件modules
import test from './modules/test'
// 登录API
import LoginAPI from '@/api/Login/index.ts'
// 用户信息API
import userAPI from '@/api/User/index.ts'

// 类型定义
const SET_USE_INFO = 'SET_USE_INFO';
const SET_ROUTES = 'SET_ROUTES';
const SET_CRUMB_LIST = 'SET_CRUMB_LIST';

// vuex变量定义
const state = {
    userInfo: '', //用户信息
    crumbList: '', //面包屑信息
    addRoutes: [], //动态路由
}

// vuex同步属性，更改state
const mutations = {
    SET_USE_INFO: (state: any, userInfo: any): void => {
        state.userInfo = userInfo;
    },
    SET_ROUTES: (state: any, routes: any): void => {
        state.addRoutes = routes;
    },
    SET_CRUMB_LIST: (state: any, crumbList: any): void => {
        state.crumbList = crumbList;
    }
}

// vuex异步属性，通过mutations更改state
const actions = {
    // 用户登录
    login({ commit }, loginInfo) {
        return new Promise((resolve, reject) => {
            LoginAPI.login(loginInfo).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取用户信息
    getUserInfo({ commit }, params) {
        return new Promise((resolve, reject) => {
            userAPI.getCurrentDetails({}).then(resp => {
                const { data } = resp
                commit(SET_USE_INFO, data)
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 路由权限列表
    generateRoutes({ commit }, roles: any[]) {
        return new Promise(resolve => {
            let accessedRoutes;
            commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes);
        });
    }
}

const getters = {

}

const modules = {
    test,
}

export default createStore({
    state,
    modules,
    mutations,
    actions,
    getters,
})
