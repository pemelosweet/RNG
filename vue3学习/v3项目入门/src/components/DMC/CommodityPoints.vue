<!-- 商品积分规则 -->
<template>
    <div class="commodity-points">
        <div
            class="item"
            :class="{ 'active-style': item.checked }"
            v-for="(item, index) in goodsList"
            :key="index"
            @click="onSelectedFn(item, index)"
        >
            <el-row>
                <el-col :span="24">
                    <el-image
                        style="width:118px; height:100px;"
                        :src="goods001"
                        type="fill"
                    ></el-image>
                </el-col>
                <el-col :span="8" class="right">商品名称：</el-col>
                <el-col :span="16" class="left">{{ item.name }}</el-col>
                <el-col :span="8" class="right">商品规格：</el-col>
                <el-col :span="16" class="left">{{ item.spc }}</el-col>
                <el-col :span="8" class="right">商品价格：</el-col>
                <el-col :span="16" class="left">{{ item.price }}</el-col>
                <el-col :span="8" class="right">商品库存：</el-col>
                <el-col :span="16" class="left">{{ item.store }}</el-col>
            </el-row>
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
    onMounted,
    getCurrentInstance
} from 'vue';
// import other
import { ElImage } from 'element-plus';
import goods001 from '@/assets/images/DMC/goods_001.png';

export default defineComponent({
    name: 'commodityPoints',
    props: {
        goodsArr: {
            type: Array,
            default: () => []
        }
    },
    components: {
        ElImage
    },
    setup(props) {
        const { goodsArr } = props;
        // 定义数据和方法
        const data = reactive({
            goods001,
            onSelectedFn: (item, index) => {
                item.checked = !item.checked;
            }
        });

        // 计算属性
        const goodsList = computed(() => {
            return goodsArr.map(item => {
                if(!item['checked']){
                    item['checked'] = false
                }
                return item;
            });
        });

        // 监听数据
        // watch(([])=>{})

        // 生命周期
        // onMounted(()=>{})

        return {
            goodsList,
            ...toRefs(data)
        };
    }
});
</script>

<style lang="scss" scoped>
.commodity-points {
    display: flex;
    justify-content: left;
    flex-direction: row;
    flex-wrap: wrap;
    .item {
        margin: 0 11px 20px;
        padding: 10px;
        width: 180px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        text-align: center;
        font-size: 12px;
        line-height: 1.5;
        cursor: pointer;
        .right {
            text-align: right;
        }
        .left {
            text-align: left;
        }
    }
    .active-style {
        border: 1px solid green;
        color: green;
    }
}
</style>
