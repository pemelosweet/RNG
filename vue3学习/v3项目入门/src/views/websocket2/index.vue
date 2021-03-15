<template>
    <div class="webinde">
        <input type="text" id="input" />
        <div id="inner"></div>
        <div v-show="webSKData.websocketson1IsShow === true">
            <keep-alive>
                <webSon1 :txtDataP="webSKData.txtDataSon1"></webSon1>
            </keep-alive>
        </div>

        <div v-if="webSKData.websocketson2IsShow">
            <keep-alive>
                <webSon2 :txtDataP="webSKData.txtDataSon2"></webSon2>
            </keep-alive>
        </div>
    </div>

    <pre>
            <code>{{sourceCode}}</code>
        </pre>
</template>

<style   scoped>
</style>

<script>
import { onMounted, reactive } from 'vue';
import webSon1 from './Component/websocket_son1';
import webSon2 from './Component/websocket_son2';
import setSourceCode from './setSourceCode.js';

export default {
    components: { webSon1, webSon2 },

    setup(content) {
        const webSKData = reactive({
            ws: '',
            websocketson1IsShow: false,
            websocketson2IsShow: false,
            txtDataSon1: '',
            txtDataSon2: '',
            port: 4200,
        });

        onMounted(() => {
            start();
            main();
        });

        function start() {
            // 判断是开启websocket
            if (window.WebSocket) {
                webSKData.ws = new WebSocket(
                    'ws://127.0.0.1:' + webSKData.port
                );

                webSKData.ws.onopen = function () {
                    // 开启
                    console.log('websocket starting ');
                    document.getElementById('inner').innerHTML = 'starting';
                };

                webSKData.ws.onclose = function () {
                    // 关闭
                    console.log('webscoket close');
                };

                webSKData.ws.onmessage = function (e) {
                    // 服务器返回
                    document.getElementById('inner').innerHTML = e.data;
                };
            }
        }

        function main() {
            const input = document.getElementById('input');
            const debounceAxios = debounce(axios, 500);
            input.addEventListener('input', function (e) {
                debounceAxios(e.target.value);
            });
        }

        function indexOf(content, any) {
            const a = content.indexOf(any) != -1;
            console.log(a);
            if (a === true) {
                webSKData.txtData = any;
                webSKData.websocketson1IsShow = true;
            }
        }

        function indexOf2(content, any) {
            const a = content.indexOf(any) != -1;
            console.log(a);
            if (a === true) {
                webSKData.txtData = any;
                webSKData.websocketson2IsShow = true;
            }
        }

        // 发送请求，websocket
        function axios(content) {
            // var txt = document.getElementById("input").value;
            webSKData.ws.send(content);

            indexOf(content, '123');
            indexOf2(content, '456');

            if (content === '') {
                webSKData.websocketson2IsShow = false;
                webSKData.websocketson1IsShow = false;
            }
        }

        // 防抖
        function debounce(fun, delay) {
            return function (args) {
                const _this = this;
                const _arg = args;
                clearTimeout(fun.id);
                fun.id = setTimeout(function () {
                    fun.call(_this, _arg);
                }, delay);
            };
        }

        const sourceCode = setSourceCode.code;
        return { webSKData, sourceCode };
    },
};
</script>
