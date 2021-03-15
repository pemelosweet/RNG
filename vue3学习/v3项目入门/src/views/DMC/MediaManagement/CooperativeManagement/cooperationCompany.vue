<!-- cooprationManagement -->
<template>
    <div class="coopration-management">
        <el-image
            style="padding:16px 0;width:480px;height:300px;"
            lazy
            :src="url"
            fit="cover"
        />
        <div class="info">
            <div class="coopration-company-name">合作公司</div>
            <div class="coopration-company-select">请先创建合作公司！</div>
            <div class="coopration-company-relation">
                所媒介都需要先创建合作公司进行关联！
            </div>
            <custom-button
                style="padding: 50px 0 0"
                add-text="添加合作公司"
                show-text="查看合作公司"
                @handleLeftFn="addNewCompany"
                @handleRightFn="viewComponay"
            />
        </div>
    </div>
</template>

<script lang="ts">
import '@/assets/css/DMC/common.scss';
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
import { ElImage, ElMessage } from 'element-plus';
import customButton from '@/components/DMC/customButton.vue';
import imageFor400 from '@/assets/images/DMC/company.png';
export default defineComponent({
    name: 'cooprationManagement',
    //props: {},
    components: {
        ElImage,
        customButton
    },
    setup() {

        // 定义数据和方法
        const data = reactive({
            url: imageFor400,
            addNewCompany(){
                ElMessage('新增公司');
            },
            viewComponay(){
                ElMessage('查看公司');
            }
        });

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
.coopration-management {
    position: relative;
    padding: 0 0 100px 0;
    .info {
        padding: 30px 0 45px 45px;
        line-height: 1.5;
        .coopration-company-name {
            font-size: 36px;
            font-weight: bold;
        }
        .coopration-company-select {
            font-size: 18px;
        }
        .coopration-company-relation {
            font-size: 14px;
        }
    }
}
</style>
