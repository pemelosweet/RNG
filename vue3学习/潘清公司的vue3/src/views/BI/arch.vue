<template>
    <div class="2ref">
        <echarts-com
            :options="archOptions"
            style="width: 500px; height: 500px"
        ></echarts-com>
        <el-button @click="handleClick">点击修改数据</el-button>
    </div>
</template>

<script lang="ts">
import EchartsCom from '@/components/Echarts/EchartsCom.vue';
import arch from '../../hooks/arch'
import { reactive,defineComponent,onMounted } from 'vue'
export default defineComponent({
    name: 'curve',
    components: {EchartsCom},
    setup(props, context) {
        let archOptions = reactive(arch())
        onMounted(() => {
        })
        return {
            archOptions
        };
    },
});
</script>
<style scoped>
</style>
