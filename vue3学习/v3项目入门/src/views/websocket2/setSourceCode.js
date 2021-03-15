const code = `

需要后端开启4200和4300端口号连接



index.vue：

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
</template>

<style   scoped>
</style>

<script>
import { onMounted, reactive } from 'vue';
import webSon1 from './Component/websocket_son1';
import webSon2 from './Component/websocket_son2';

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

        return { webSKData };
    },
};
</script>





子组件：websocket_son1:

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


子组件2： websocket_son2

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

`

export default {
    code
}