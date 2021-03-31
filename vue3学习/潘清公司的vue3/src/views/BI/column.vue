<template>
    <div class="2ref">
        <echarts-com
            :options="columnarOptions"
            style="width: 500px; height: 500px"
        ></echarts-com>
        <el-button @click="handleClick">点击修改数据</el-button>
    </div>
</template>

<script lang="ts">
import EchartsCom from '@/components/Echarts/EchartsCom.vue';
import columnar from '../../hooks/columnar'
import { reactive,defineComponent,onMounted } from 'vue'
export default defineComponent({
    name: 'column',
    components: {EchartsCom},
    setup(props, context) {
        let columnarOptions = reactive(columnar());
        onMounted(() => {
        })
        return {
            columnarOptions,
        };
    },
});
</script>
<style scoped>
</style>
