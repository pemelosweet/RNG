<template>
    <div class="2ref">
        <echarts-com
            :options="annularOptions"
            style="width: 500px; height: 500px"
        ></echarts-com>
        <el-button @click="handleClick">点击修改数据</el-button>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue';
import annular from '../../hooks/annular';
import EchartsCom from '@/components/Echarts/EchartsCom.vue';

export default defineComponent({
    name: 'annular',
    components: { EchartsCom },
    setup(props, context) {
        // 这样使用导入的数据，会导致组件被销毁后，数据还是保持的修改过的样子，下次重新加载这个组件的时候，还是修改过的数据
        // 类似实现了 缓存 的功能
        let annularOptions = reactive(annular());
        const handleClick = () => {
            annularOptions.title.text = '测试修改';
        };
        return {
            annularOptions,
            handleClick,
        };
    },
});
</script>
<style scoped>
</style>
