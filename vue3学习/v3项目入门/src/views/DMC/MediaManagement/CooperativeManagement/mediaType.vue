<!-- 媒体类型 -->
<template>
    <div class="media-type">
        <h2>媒介类型<div>选择相关联的媒介类型！</div></h2>
        <customDivider />
        <div class="components-body">
            <media-types style="margin: 0 39px 30px 0" v-for="item in 6" :Key="item" :props="item" />
        </div>
    </div>
</template>

<script lang="ts">
// vue功能组件
import {
    defineComponent,
    reactive,
    toRefs,
    computed,
    watch,
    onMounted
} from 'vue';
// import other
import customDivider from '@/components/DMC/customDivider.vue'
import mediaTypes from '@/components/DMC/mediaType.vue'

export default defineComponent({
    name: 'mediaType',
    //props: {},
    components: {
        customDivider,
        mediaTypes
    },
    setup() {

        // 定义数据和方法
        const data = reactive({});

        // 计算属性
        // computed(() => {})

        // 监听数据
        // watch(([])=>{})

        // 生命周期
        // onMounted(()=>{})

        return {
            ...toRefs(data)
        };
    }
});
</script>
<style lang="scss" scoped>
.media-type{
    h2{
        line-height: 2.5;
        div{
            font-size:16px;
            line-height: 1;
            font-weight:normal;
            .components-body{
                padding: 0 0 10px;
            }
        }
    }
}
</style>
