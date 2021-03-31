<template>
    <div class="2ref">
        <echarts-com
            :options="curveOption"
            style="width: 500px; height: 500px"
        ></echarts-com>
    </div>
</template>

<script lang="ts">
import EchartsCom from '@/components/Echarts/EchartsCom.vue';
import curves from '../../hooks/curve'
import { reactive,defineComponent,onMounted } from 'vue'
export default defineComponent({
    name: 'curve',
    components: { EchartsCom },
    setup(props, context) {
        let curveOption = reactive(curves());
        onMounted(() => {
        })
        return {
            curveOption,
        };
    },
});
</script>
<style scoped>
</style>
