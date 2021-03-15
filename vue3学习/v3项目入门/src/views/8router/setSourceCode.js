const code = `
<template>
    <div class="8router">
        <h1>router使用：页面跳转传参&接收。</h1>
        <el-button type="primary" @click="goRefPage">跳转至ref页面</el-button>
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import setSourceCode from './setSourceCode.js';
export default defineComponent({
    name: '8router',
    components: {},
    setup(props, context) {
        const sourceCode = setSourceCode.code;
        const router = useRouter();
        const goRefPage = () => {
            router.push({
                path: '/system/2ref',
                query: {
                    id: 1,
                },
            });
        };
        return {
            sourceCode, // pre展示模版内容
            goRefPage, //跳转页面并传参event
        };
    },
});
</script>
<style scoped>
</style>

`
export default {
	code
}