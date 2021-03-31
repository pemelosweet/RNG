<!-- 面包屑 -->
<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in crumbList" :key="index" :to="index!==0?item.path:''" @click="handleRouterToFnc(item, index)">{{ item.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider class="divider-self" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { ElBreadcrumb, ElBreadcrumbItem, ElDivider } from 'element-plus';
import { useRouter, useRoute } from "vue-router"

export default defineComponent({
    name: 'crumbs',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    components: {
        ElBreadcrumb,
        ElBreadcrumbItem,
        ElDivider
    },
    setup() {
        const route = useRoute()
        const router = useRouter();
        const crumbList = computed(()=>{
            return route.matched.map(item => ({
                path: item.path,
                title: item.meta.title
            }))
        })
        
        const handleRouterToFnc = (item, index) => {
            if(index!==0){
                router.push({
                    path: item.path
                })
            }
        }
        
        return {
            handleRouterToFnc,
            crumbList
        }
    }
});
</script>
<style lang="scss" scoped>
.crumbs{
    position: relative;
    font-size: 16px;
}
.divider-self{
    position: relative;
    margin-bottom: 0;
    &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: -10px;
        display: block;
        width: 20px;
        height: 20px;
        background: #00ccff;
    }
}
</style>

<style>
    .el-breadcrumb__inner:empty + .el-breadcrumb__separator{
        display: none;
    }
</style>
