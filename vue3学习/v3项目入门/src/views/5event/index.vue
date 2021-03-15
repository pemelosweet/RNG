<template>
    <div class="5event">
        <h1>
            event使用：将响应式对象转换为普通对象，在不丢失响应性的情况下对返回的对象进行分解/扩散
        </h1>
        <el-button @click="add" type="primary">小型按钮add</el-button>
        <p>event: {{ age }}</p>
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import setSourceCode from './setSourceCode.js';
export default defineComponent({
    name: '5event',
    components: {},
    setup(props, context) {
        const state = reactive({
            age: 100,
            name: '御芝林',
            add: () => {
                state.age++;
            },
        });
        const sourceCode = setSourceCode.code;
        return {
            ...toRefs(state), // 定义的组件内部变量
            sourceCode, // pre展示模版内容
        };
    },
});
</script>
<style scoped>
</style>
