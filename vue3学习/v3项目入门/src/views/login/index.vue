<template>
    <div>
        <div class="login">
            <h1>系统登录</h1>
            <div class="inputBox">
                <input
                    type="text"
                    v-model.trim="username"
                    :placeholder="'默认 6666'"
                />
                <label>用户名</label>
            </div>
            <div class="inputBox">
                <input
                    type="password"
                    v-model.trim="password"
                    :placeholder="'默认 123456'"
                />
                <label>密码</label>
            </div>
            <el-button
                size="large"
                type="primary"
                @click="handleLoginFnc"
                :disabled="fullscreenLoading"
                >登录</el-button
            >
        </div>
        <div class="login-bg" v-if="loginStatus">
            <div class="loading">
                <div class="circle circle1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="circle circle2">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="circle circle3">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
import loginAPI from '@/api/Login/';
import { useRouter, useRoute } from 'vue-router';
import store from '@/store/';
import { setToken } from '@/utils/auth';

// 执行环境
const pathParams = process.env.NODE_ENV;
export default {
    name: 'login',
    setup(props, context) {
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            fullscreenLoading: false, // 登录按钮状态是否禁用
            username: '6666', //测试数据，用后删除
            password: '123456',
            loginStatus: false, //loading是否显示
            handleLoginFnc: () => {
                if (data.username === '' || data.password === '') {
                    ElMessage({
                        message: '用户名或密码不能为空',
                        type: 'error',
                    });
                } else {
                    data.loginStatus = true;
                    data.fullscreenLoading = true;
                    if (pathParams === 'mock') {
                        const user = {
                            userNo: data.username,
                            password: data.password,
                        };
                        store
                            .dispatch('login', user)
                            .then(resp => {
                                data.loginStatus = true;
                                router.replace({
                                    path: '/',
                                });
                                data.fullscreenLoading = false;
                            })
                            .catch(() => {
                                data.loginStatus = false;
                                data.fullscreenLoading = false;
                            });
                    } else {
                        const user = {
                            userNo: data.username,
                            password: data.password,
                        };
                        store
                            .dispatch('login', user)
                            .then(resp => {
                                data.loginStatus = false;
                                let goPageUrl = '/';
                                if (route.fullPath.indexOf('?redirect=') > -1) {
                                    goPageUrl = route.fullPath.split(
                                        '?redirect='
                                    )[1];
                                }
                                router.push({
                                    path: goPageUrl,
                                });
                                data.fullscreenLoading = false;
                            })
                            .catch(() => {
                                data.loginStatus = false;
                                data.fullscreenLoading = false;
                            });
                    }
                }
            },
        });
        return {
            ...toRefs(data),
        };
    },
};
</script>

<style lang="scss">
body {
    background: url('../../assets/images/login_bg.jpg') center left no-repeat;
    background-size: auto auto;
}
.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    padding: 80px 40px;
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px; /*登录窗口边角圆滑*/
    font-family: 'Micrsoft YAHEI';
    h1 {
        margin: 0 0 30px;
        padding: 0;
        color: #fff;
        text-align: center;
    }
    .inputBox {
        position: relative;
        input {
            width: 100%;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            letter-spacing: 1px;
            margin-bottom: 30px; /*输入框设置*/
            border: none;
            border-bottom: 1px solid #fff;
            outline: none;
            background: transparent;
        }
        label {
            position: absolute;
            top: 0;
            left: -10px;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            pointer-events: none;
            transition: 0.5s;
        }
        input:focus ~ label,
        input:valid ~ label {
            top: -32px;
            left: 0;
            color: #fff;
            font-size: 16px;
        }
    }
}
.login-bg {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0);
    .loading {
        width: 30px;
        height: 30px;
        margin: 50px auto;
        position: relative;
    }
    .circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .circle span {
        width: 8px;
        height: 8px;
        display: inline-block;
        background: #409eff;
        border-radius: 100%;
        position: absolute;
        -webkit-animation: mycircle 1.2s infinite ease-in-out;
        animation: mycircle 1.2s infinite ease-in-out;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    .circle2 {
        -webkit-transform: rotateZ(45deg);
        transform: rotateZ(45deg);
    }
    .circle3 {
        -webkit-transform: rotateZ(90deg);
        transform: rotateZ(90deg);
    }
    .circle > span:nth-child(1) {
        top: 0;
        left: 0;
    }
    .circle > span:nth-child(2) {
        top: 0;
        right: 0;
    }
    .circle > span:nth-child(3) {
        right: 0;
        bottom: 0;
    }
    .circle > span:nth-child(4) {
        left: 0;
        bottom: 0;
    }
    .circle2 > span:nth-child(1) {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }
    .circle3 > span:nth-child(1) {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }
    .circle1 > span:nth-child(2) {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }
    .circle2 > span:nth-child(2) {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
    .circle3 > span:nth-child(2) {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s;
    }
    .circle1 > span:nth-child(3) {
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s;
    }
    .circle2 > span:nth-child(3) {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s;
    }
    .circle3 > span:nth-child(3) {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s;
    }
    .circle1 > span:nth-child(4) {
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s;
    }
    .circle2 > span:nth-child(4) {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s;
    }
    .circle3 > span:nth-child(4) {
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s;
    }
    @-webkit-keyframes mycircle {
        0% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
        80% {
            transform: scale(0);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes mycircle {
        0% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
        80% {
            transform: scale(0);
        }
        100% {
            transform: scale(0);
        }
    }
}
</style>
