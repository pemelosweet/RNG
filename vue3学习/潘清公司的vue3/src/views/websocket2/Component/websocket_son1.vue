<template>
    <div>
        <br />
        <br />
        <br />
        websocketSon1
        <input type="text" id="input2" :value="data.txtData" />
        <div id="inner2"></div>
    </div>
</template>

<style  scoped>
</style>

<script>
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
    name: 'websocket_son1',
    props: {
        txtDataP: { default: '000' },
    },

    setup(props) {
        const data = reactive({
            ws: '',
            txtData: '',
            port: 4200,
        });

        watch: {
            () => [props.txtDataP, data.txtData],
                ([txtDataPNew, txtDataNew]) => {
                    data.txtData = txtDataPNew;
                    console.log(txtDataNew);
                };
        }

        function start() {
            data.txtData = props.txtDataP;

            // 判断是开启websocket
            if (window.WebSocket) {
                data.ws = new WebSocket('ws://127.0.0.1:' + data.port);

                data.ws.onopen = function () {
                    // 开启
                    console.log('websocket starting ');
                    document.getElementById('inner2').innerHTML = 'starting';
                };

                data.ws.onclose = function () {
                    // 关闭
                    console.log('webscoket close');
                };

                data.ws.onmessage = function (e) {
                    // 服务器返回
                    document.getElementById('inner2').innerHTML = e.data;
                };
            }
        }

        function main() {
            const input2 = document.getElementById('input2');
            console.log(input2);
            const debounceAxios = debounce(axios, 500);
            input2.addEventListener('input', function (e) {
                debounceAxios(e.target.value);
            });
        }

        onMounted(() => {
            start();
            main();
        });

        // 检测是否存在
        function indexOf(content, any) {
            const a = content.indexOf(any) != -1;
            console.log(a);
        }

        // 发送请求，websocket
        function axios(content) {
            // var txt = document.getElementById("input2").value;
            data.ws.send(content);
            indexOf(content, '456');
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

        return { data };
    },
});
</script>