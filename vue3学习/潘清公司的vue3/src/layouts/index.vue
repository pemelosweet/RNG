<template>
    <div class="layout">
        <!-- 头部组件 -->
        <Headers></Headers>
        <el-container class="layout-base-container">
            <!-- 左侧导航组件 -->
            <Lefter></Lefter>
            <!-- 右侧视图 -->
            <el-main>
                <Crumbs />
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Headers from './Header.vue';
import Lefter from './Lefter.vue';
import Crumbs from '@/components/Crumbs/index.vue';
import { ElContainer, ElMain } from 'element-plus';

export default defineComponent({
    name: 'layout',
    components: {
        Headers,
        Lefter,
        ElContainer,
        Crumbs,
        ElMain,
    },
    setup(props, context) {
        return {};
    },
});
</script>
<style scoped lang="scss">
.layout-base-container {
    display: flex;
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #f5f5f5;
}
.el-main {
    padding: 16px;
}
</style>
