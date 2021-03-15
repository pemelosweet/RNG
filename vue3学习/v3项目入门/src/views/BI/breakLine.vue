<template>
    <div class="2ref">
        <echarts-com
            :options="brokeLineOptions"
            style="width: 500px; height: 500px"
        ></echarts-com>
        <el-button @click="handleClick">测试修改</el-button>
    </div>
</template>

<script lang='ts'>
import brokeLines from '../../hooks/brokeLine';
import { defineComponent, reactive, ref } from 'vue';
import EchartsCom from '@/components/Echarts/EchartsCom.vue';

export default defineComponent({
    name: 'columPoly',
    components:{
        EchartsCom
    },
    setup(props, context) {
        let brokeLineOptions = reactive(brokeLines())
        const handleClick = () => {
            brokeLineOptions.title.text = '测试修改123';
        };
        return {
            brokeLineOptions,
            handleClick,
        };
    },
});
</script>
<style scoped>
</style>
