<template>
    <div class="2ref">
        <echarts-com
            :options="pieOptions"
            style="width: 500px; height: 500px"
        ></echarts-com>
        <upload :uploadOption='uploadOption' @handleUpload='handleUpload'></upload>
    </div>
</template>

<script lang="ts">
import EchartsCom from '@/components/Echarts/EchartsCom.vue';
import upload from '../../components/Upload/index.vue'
import pies from '../../hooks/pies'
import { reactive,defineComponent,onMounted } from 'vue'
export interface uploadType {
    drag:boolean,
    limit:string,
    url:string,
    multiple:boolean
}
export default defineComponent({
    name: 'pie',
    components: {EchartsCom,upload},
    setup(props, context) {
        let pieOptions = reactive(pies())
        let uploadOption:uploadType = reactive({
            drag:true,
            limit:'5',
            url:'http://mt.cn:3355/backend/config/uploadImg',
            multiple:true
        })
        const handleUpload = (val) => {
            // console.log('触发emit事件',val)
        }
        onMounted(() => {
        })
        return {
            pieOptions,
            handleUpload,
            uploadOption
        };
    },
});
</script>
<style scoped>
</style>
