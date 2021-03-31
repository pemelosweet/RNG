const code = `
<template>
    <div class="2ref">
        <h1>
            ref使用：接受一个内部值并返回一个响应式且可变的 ref 对象。ref
            对象具有指向内部值的单个 property .value。
        </h1>
        <p>ref: {{ count }}</p>
        <p v-if="routerQuery.id">routerQuery: {{ routerQuery }}</p>
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import setSourceCode from './setSourceCode.js';
export default defineComponent({
    name: '2ref',
    components: {},
    setup(props, context) {
        const count = ref(0);
        count.value++;
        const router = useRouter();
        // 获取路由参数
        const routerQuery = router.currentRoute.value.query;
        const sourceCode = setSourceCode.code;
        return {
            count, // 定义变量
            sourceCode, // pre展示模版内容
            routerQuery, // 路由参数
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