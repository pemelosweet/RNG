/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */

import axios from 'axios';
import QS from 'qs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { setToken, getToken, removeToken } from '@/utils/auth.ts';
import router from '@/router';
import { isProd } from '@/utils/env'

function useInterceptors(service) {
    // 请求拦截器
    service.interceptors.request.use(
        config => {
            // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
            config.headers['Content-Type'] = 'application/json';
            if (getToken()) {
                config.headers.token = getToken();
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
    // 响应拦截器
    service.interceptors.response.use(
        response => {
            // 存储token
            if (response.headers.token) {
                setToken(response.headers.token);
            }

            if (response.status === 200) {
                if (response.data.code === 200) {
                    return Promise.resolve(response.data);
                } else {
                    ElMessage.error(response.data);
                    return Promise.reject(response.data);
                }
            } else {
                ElMessage.error(response.data);
                return Promise.reject(response);
            }
        },
        // 服务器状态码不是200的情况
        error => {
            const { status } = error.response;
            const { data } = error.response;
            if (status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                switch (status) {
                    case 401:
                        removeToken();
                        ElMessageBox.confirm(data.message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'error'
                        })
                            .then(() => {
                                if (router.currentRoute.value.fullPath === '/') {
                                    router.push(`/login`);
                                } else {
                                    router.push(
                                        `/login?redirect=${router.currentRoute.value.fullPath}`
                                    );
                                }
                            })
                            .catch(() => {

                            });
                        break;
                    case 403:
                        removeToken();
                        ElMessageBox.confirm(data.message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'error'
                        })
                            .then(() => {
                                if (router.currentRoute.value.fullPath === '/') {
                                    router.push(`/login`);
                                } else {
                                    router.push(
                                        `/login?redirect=${router.currentRoute.value.fullPath}`
                                    );
                                }
                            })
                            .catch(() => {

                            });
                        break;
                    default:
                    // ElMessageBox.confirm(
                    //     data.message || '权限异常，请重新登录！',
                    //     '提示',
                    //     {
                    //         confirmButtonText: '确定',
                    //         cancelButtonText: '取消',
                    //         type: 'error'
                    //     }
                    // )
                    //     .then(() => {

                    //     })
                    //     .catch(() => {

                    //     });
                }
                return Promise.reject(error.response);
            }
        }
    );
    return service
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url: string, params: any) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
};
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url: string, params: any) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
};
//oauth(登录) path
const OAUTH_URL = isProd() ? process.env.VUE_APP_YZL_OAUTH_API : '/oauth';
//crm path
const CRM_URL = isProd() ? process.env.VUE_APP_YZL_CRM_API : '/crm';
//ehr path
const EHR_URL = isProd() ? process.env.VUE_APP_YZL_EHR_API : '/ehr';
//crm path
const BI_URL = isProd() ? process.env.VUE_APP_YZL_BI_API : '/bi';
//ehr path
const DMC_URL = isProd() ? process.env.VUE_APP_YZL_DMC_API : '/dmc';

export const oauthService = useInterceptors(axios.create({
    baseURL: OAUTH_URL, // url = base url + request url
    timeout: 10000 // request timeout
}))
export const crmService = useInterceptors(axios.create({
    baseURL: CRM_URL, // url = base url + request url
    timeout: 10000 // request timeout
}))
export const ehrService = useInterceptors(axios.create({
    baseURL: EHR_URL, // url = base url + request url
    timeout: 10000 // request timeout
}))
export const biService = useInterceptors(axios.create({
    baseURL: BI_URL, // url = base url + request url
    timeout: 10000 // request timeout
}))
export const dmcService = useInterceptors(axios.create({
    baseURL: DMC_URL, // url = base url + request url
    timeout: 10000 // request timeout
}))
