<!-- 合作管理 -->
<template>
    <div class="resource-management"></div>
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

export default defineComponent({
    name: 'ResourceManagement',
    //props: {},
    //components: {},
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
<style lang="scss" scoped></style>
