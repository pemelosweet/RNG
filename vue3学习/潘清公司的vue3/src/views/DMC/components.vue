<!-- DMC 公共组件入口 用于演示公共组件的使用方式 -->
<template>
    <div class="components-for-DMC">
        <custom-divider title="组合按钮（大）" />
        <div class="components-body">
            <custom-button
                add-text="添加合作公司"
                show-text="查看合作公司"
                @handleLeftFn="addCompanyFn"
                @handleRightFn="viewComponayFn"
            />

            <custom-button
                add-text="新建400电话号码"
                show-text="查看400电话列表"
            />
        </div>

        <custom-divider title="组合按钮（小）" />
        <div class="components-body">
            <custom-button type="mini" add-text="新建" show-text="查看列表" />
        </div>

        <custom-divider title="媒介类型" />
        <div class="components-body">
            <media-type
                style="margin: 0 39px 30px 0"
                v-for="item in 10"
                :Key="item"
                :props="item"
            />
        </div>

        <custom-divider
            :title-size="18"
            title="新建商品积分规则（标题字体大小）"
        />
        <commodity-points :goodsArr="goodsArr" />

        <custom-divider title="商品促销管理" />
        <product-promotion />
        <custom-divider title="富文本编辑器-wangEditor" />
        <el-row :gutter="20">
            <el-col :span="12">
                <div ref="div1"></div>
            </el-col>
            <el-col :span="12">
                <el-input
                    type="textarea"
                    v-model="htmlVal"
                    :autosize="{ minRows: 19.5, maxRows: 19.5 }"
                />
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
    onMounted,
    getCurrentInstance
} from 'vue';
// import other
import customButton from '@/components/DMC/customButton.vue';
import customDivider from '@/components/DMC/customDivider.vue';
import mediaType from '@/components/DMC/mediaType.vue';
import commodityPoints from '@/components/DMC/CommodityPoints.vue';
import productPromotion from '@/components/DMC/productPromotion.vue';
import { ElMessage } from 'element-plus';
import E from 'wangeditor';

export default defineComponent({
    name: 'componentForDMC',
    //props: {},
    components: {
        customButton,
        customDivider,
        mediaType,
        commodityPoints,
        productPromotion
    },
    setup() {
        // 方法集合
        const funcList = {
            addCompanyFn() {
                ElMessage('新增合作公司');
            },
            viewComponayFn() {
                ElMessage('查看合作公司');
            }
        };

        // 定义数据和方法
        const data = reactive({
            div1: null,
            htmlVal: '',
            goodsArr: [
                {
                    name: '变通牌天天胶囊',
                    spc: '24g',
                    price: '9.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                },
                {
                    name: '臻通集胶囊',
                    spc: '32g',
                    price: '19.90元',
                    store: 9999
                }
            ],
            ...funcList
        });

        // 计算属性
        // computed(() => {})

        // 监听数据
        // watch(([])=>{})

        // 生命周期
        onMounted(() => {
            console.log(data.div1);
            const editor = new E(data.div1);
            editor.config.onchange = function(html) {
                // 第二步，监控变化，同步更新到 textarea
                data.htmlVal = html;
            };
            editor.create();
        });

        return {
            ...toRefs(data)
        };
    }
});
</script>
<style lang="scss" scoped>
.components-for-DMC {
    padding: 0 20px;
    .components-body {
        padding: 0 0 10px;
    }
}
</style>
