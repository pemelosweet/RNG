<template>
    <div class="3reactive">
        <h1>
            reactive使用：reactive的用法与ref的用法相似，也是将数据变成响应式数据，当数据发生变化时UI也会自动更新。不同的是ref用于基本数据类型，而reactive是用于复杂数据类型
        </h1>
        <p>reactive: {{ state.age }}</p>
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import setSourceCode from './setSourceCode.js';
export default defineComponent({
    name: '3reactive',
    components: {},
    setup(props, context) {
        const state = reactive({
            age: 80,
            name: '御芝林',
        });
        state.age++;
        const sourceCode = setSourceCode.code;
        return {
            state, // 定义的组件内部变量
            sourceCode, // pre展示模版内容
        };
    },
});
</script>
<style scoped>
</style>
