const code = `
<template>
    <div class="6computed">
        <h1>computed使用：计算属性</h1>
        <p>computed: {{ countAdd }}</p>
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import setSourceCode from './setSourceCode.js';
export default defineComponent({
    name: '6computed',
    components: {},
    setup(props, context) {
        const count = 10;
        const countAdd = computed(() => count + 8);
        const sourceCode = setSourceCode.code;
        return {
            countAdd, // 定义的组件内部变量
            sourceCode, // pre展示模版内容
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