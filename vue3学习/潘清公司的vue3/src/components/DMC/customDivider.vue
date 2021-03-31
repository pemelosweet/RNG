<!-- divider -->
<template>
    <div class="custom-divider">
        <el-divider content-position="left">
            <span :style="{fontSize:titleSize+'px'}">{{ title }}</span>
        </el-divider>
        <div class="color-box" :style="{width: number*27+ 'px'}">
            <ul>
                <li v-for="item in account" :key="item"></li>
            </ul>
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
import { ElDivider } from 'element-plus';

export default defineComponent({
    name: 'customDivider',
    props: {
        // 标题
        title: String,
        // 背景快个数
        number: {
            type: Number,
            default: 3
        },
        // 标题字体大小
        titleSize:{
            type: Number,
            default: 28
        }
    },
    components: {
        ElDivider
    },
    setup(props) {
        // 实例上下文
        const { number, titleSize } = props;
        // 定义数据和方法
        const data = reactive({
            titleSize
        })
        // 计算属性
        const account = computed(() => {
            return number>=3?3:number
        })

        // 监听数据
        // watch(([])=>{})

        // 生命周期
        // onMounted(()=>{})

        return {
            ...toRefs(data),
            account
        };
    }
});
</script>
<style lang="scss">
.custom-divider {
    position: relative;
    .el-divider__text {
        padding: 0 20px;
        font-size:28px;
        background-color: #f5f5f5 ;
    }
    .color-box{
        position: absolute;
        top: -12px;
        right: 0;
        width: 100px;
        ul{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            li{
                position: relative;
                margin:0 0 0 5px;
                width: 22px;
                height: 25px;
                &:nth-child(n){
                    background: #003366;
                }
                &:nth-child(2n){
                    background: #339999;
                }
                &:nth-child(3n){
                    background: #6699cc;
                }
                &:first-child {
                    margin: 0;
                    &::before{
                        background: transparent;
                    }
                }
                &::before {
                    position: absolute;
                    left: -5px;
                    content: '';
                    display: block;
                    width: 5px;
                    height: 25px;
                    background: #f5f5f5;
                }
            }
        }
    }
}
</style>
