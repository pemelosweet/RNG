const code = `
<template>
    <div class="7watch">
        <h1>watch使用：监听单个或多个变量。</h1>
        <el-button @click="addCount" type="primary">Add Count</el-button>
        <el-button @click="addAge" type="primary">Add Age</el-button>
        <el-button @click="addAll" type="primary">Add All</el-button>
        <p>watch: count变化了{{ count }} --- age变化了{{ age }}</p>
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import setSourceCode from './setSourceCode.js';
export default defineComponent({
    name: '7watch',
    components: {},
    setup(props, context) {
        const count = ref(0);
        const age = ref(10);
        const addCount = () => {
            count.value++;
        };
        const addAge = () => {
            age.value++;
        };
        const addAll = () => {
            count.value++;
            age.value++;
        };
        // watch(count, (count, prevCount) => {
        //     /* ... */
        // });
        watch(
            () => [count.value, age.value],
            ([countNew, ageNew], [countOld, ageOld]) => {
                if (countNew != countOld) {
                    //console.log('count变化了');
                }
                if (ageNew != ageOld) {
                    //console.log('age变化了');
                }
            }
        );
        const sourceCode = setSourceCode.code;
        return {
            count, // 定义变量
            age,
            addCount,
            addAge,
            addAll,
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