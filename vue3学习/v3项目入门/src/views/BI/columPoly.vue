<template>
    <div class="2ref">
        <echarts-com
            :options="columnPolyOptions"
            style="width: 500px; height: 500px"
        ></echarts-com>
    </div>
</template>

<script lang="ts">
import EchartsCom from '@/components/Echarts/EchartsCom.vue';
import columnPoly from '../../hooks/useColumnPoly'
import { defineComponent, onMounted, reactive } from 'vue';
export default defineComponent({
    name: 'columPoly',
    components: { EchartsCom },
    setup(props, context) {
        let columnPolyOptions = reactive(columnPoly());
        onMounted(() => {
        })
        return {
            columnPolyOptions
        };
    },
});
</script>
<style scoped>
</style>
