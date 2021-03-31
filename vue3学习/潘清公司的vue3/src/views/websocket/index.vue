<template>
    <div class="ws">
        <h2><span>注意：</span>开启 WsService1, WsService1 服务。</h2>
        <el-row :gutter="20">
        <el-col :span="6">
        <el-input
            size="large"
            type="text"
            v-model.trim="val"
        />
        </el-col>
        <el-col :span="6">
        <el-button type="primary" size="large" @click="sendMsg"
            >Send！</el-button
        >
        </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <ul>
                    <li v-for="(item, index) in data1" :key="index">
                        {{ item }}
                    </li>
                </ul>
            </el-col>
            <el-col :span="6">
                <ul>
                    <li v-for="(item, index) in data2" :key="index">
                        {{ item }}
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { reactive, onMounted, toRefs } from 'vue';
const ws1 = new WebSocket('ws://localhost:8181');
const ws2 = new WebSocket('ws://localhost:8182');
export default {
    name: 'websocket',
    setup() {
        //数据及方法定义
        const data = reactive({
            val: '',
            data1: [],
            data2: [],
            sendMsg: () => {
                if (!data.val) return;
                ws1.send(data.val);
                data.val = '';
            },
        });

        //生命周期
        onMounted(() => {
            ws1.onopen = function (e) {
                console.log('已连接服务器 8081。');
            };
            ws2.onopen = function (e) {
                console.log('已连接服务器 8082。');
            };
            ws1.onmessage = function (evt) {
                data.data1.push(evt.data);
                ws2.send(evt.data + '------8081返回信息');
                console.log(evt.data);
            };
            ws2.onmessage = function (evt) {
                data.data2.push(evt.data);
                console.log(evt.data);
            };
        });

        return {
            ...toRefs(data),
        };
    },
};
</script>

<style lang="scss">
.ws {
    padding: 20px;
    width: 200%;
    h2{
        padding:10px 0;
        span{
        color: #f56c6c;
        }
    }
    ul{
        li{
            padding: 10px 0;
            font-size:14px;
        }
    }
}
</style>
