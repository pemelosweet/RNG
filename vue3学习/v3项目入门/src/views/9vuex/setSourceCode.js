const code = `
<template>
    <div class="9vuex">
        <h1>store使用：状态管理工具</h1>
        <p>state: {{ state }}</p>
        <el-button type="primary" @click="commitCount">点击commit</el-button>
        <el-button type="primary" @click="dispathCount">点击dispatch</el-button>
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { useStore, mapState } from 'vuex';
import { defineComponent, computed, ref } from 'vue';
import setSourceCode from './setSourceCode.js';
export default defineComponent({
    name: '9vuex',
    components: {},
    setup(props, context) {
        const sourceCode = setSourceCode.code;
        const store = useStore();
        const state = store.state;
        const commitCount = () => {
            store.commit('setCount', (store.state.count += 3));
        };
        const dispathCount = () => {
            store.dispatch('countActions');
        };
        return {
            sourceCode, // pre展示模版内容
            state, // state变量
            commitCount, // mutations属性
            dispathCount, // actions属性
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