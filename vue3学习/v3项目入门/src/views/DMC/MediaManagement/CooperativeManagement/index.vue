<!-- 合作管理 -->
<template>
    <div class="cooperative-management">
        <el-row :gutter="30">
            <el-col :span="8" class="el-col-after-style">
                <cooprationManagement />
            </el-col>
            <el-col :span="16">
                <mediaType />
            </el-col>
        </el-row>
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
import cooprationManagement from './cooperationCompany.vue';
import customButton from '@/components/DMC/customButton.vue'
import mediaType from './mediaType.vue';
export default defineComponent({
    name: 'CooperativeManagement',
    //props: {},
    components: {
        cooprationManagement,
        mediaType,
        customButton
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
.cooperative-management {
    position: relative;
}
</style>
