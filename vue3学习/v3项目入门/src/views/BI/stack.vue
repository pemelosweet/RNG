<template>
    <div class="2ref">
        <echarts-com
            :options="stacksOptions"
            style="width: 500px; height: 500px"
        ></echarts-com>
    </div>
</template>

<script lang="ts">
import EchartsCom from '@/components/Echarts/EchartsCom.vue';
import stacks from '../../hooks/stack';
import { reactive, defineComponent, onMounted } from 'vue';
export default defineComponent({
    name: 'stack',
    components: { EchartsCom },
    setup(props, context) {
        let stacksOptions = reactive(stacks());
        onMounted(() => {});
        return {
            stacksOptions
        };
    },
});
</script>
<style scoped>
</style>
