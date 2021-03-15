<template>
    <div>
        <br />
        <br />
        <br />
        websocketSon2
        <input type="text" id="inputTestO1" :value="data.txtData" />
        <div id="innerTestO1"></div>
    </div>
</template>

<style lang="stylus" scoped></style>

<script>
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
    name: 'websocket_son2',
    props: {
        txtDataP: { default: '000' },
    },

    setup(props) {
        const data = reactive({
            ws: '',
            txtData: '',
            port: 4300,
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
                    document.getElementById('innerTestO1').innerHTML =
                        'starting';
                };

                data.ws.onclose = function () {
                    // 关闭
                    console.log('webscoket close');
                };

                data.ws.onmessage = function (e) {
                    // 服务器返回
                    document.getElementById('innerTestO1').innerHTML = e.data;
                };
            }
        }

        function main() {
            const inputTestO1 = document.getElementById('inputTestO1');
            console.log(inputTestO1);
            const debounceAxios = debounce(axios, 500);
            inputTestO1.addEventListener('input', function (e) {
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
            // var txt = document.getElementById("inputTestO1").value;
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