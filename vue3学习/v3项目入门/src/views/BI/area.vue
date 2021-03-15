<template>
    <div class="2ref">
        <echarts-com
            :options="areaOptions"
            style="width: 500px; height: 500px"
        ></echarts-com>
        <el-button @click="handleClick">点击修改数据</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import EchartsCom from '@/components/Echarts/EchartsCom.vue';
import areaOption from '../../hooks/useArea'
export default defineComponent({
    name: 'yzl-area',
    components: {EchartsCom},
    setup(props, context) {
        let areaOptions = reactive(areaOption());
        const handleClick = () => {
            areaOptions.title.text = '测试修改';
        };
        return {
            areaOptions,
            handleClick,
        };
    },
});
</script>
<style scoped>
</style>
