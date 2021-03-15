<template>
    <div class="4toRefs">
        <h1>
            toRefs使用：将响应式对象转换为普通对象，在不丢失响应性的情况下对返回的对象进行分解/扩散
        </h1>
        <p>toRefs: {{ age }}</p>{{name}}
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
        <el-button @click="fun">+</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import setSourceCode from './setSourceCode.js';
export default defineComponent({
    name: '4toRefs',
    components: {},
    setup(props, context) {
        const state = reactive({
            age: 90,
            name: '御芝林',
        });
        state.age++;
        const sourceCode = setSourceCode.code;
      function fun(){
           state.age++;
      }
        return {
            fun,
            ...toRefs(state), // 定义的组件内部变量
            sourceCode, // pre展示模版内容
        };
    },
});
</script>
<style scoped>
</style>
