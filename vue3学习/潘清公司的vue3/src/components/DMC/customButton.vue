<!-- 自定义按钮 -->
<template>
    <div class="custom-button" :class="{ mini: type === 'mini' }">
        <div class="custom-button-style custom-button-left">
            <div class="text" @click="handleLeftFn">{{ addText }}</div>
            <div class="horn"></div>
        </div>
        <div
            v-if="type !== 'mini'"
            class="custom-button-style custom-button-middle"
        ></div>
        <div class="custom-button-style custom-button-right">
            <div class="horn"></div>
            <div class="text" @click="handleRightFn">{{ showText }}</div>
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

export default defineComponent({
    name: 'customButton',
    props: {
        type: {
            type: String,
            default: ''
        },
        addText: {
            type: String,
            default: ''
        },
        showText: {
            type: String,
            default: ''
        }
    },
    //components: {},
    setup(props, {emit}) {
        // 定义数据和方法
        const data = reactive({
            handleLeftFn(){
                emit('handleLeftFn')
            },
            handleRightFn() {
                emit('handleRightFn')
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
$bgcolor1: #409EFF;
.custom-button {
    position: relative;
    display: flex;
    margin: 10px 0 20px 0;
    clear: both;
    .custom-button-left {
        display: flex;
        position: relative;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        overflow: hidden;
        .text {
            padding: 0 20px 0 50px;
            color: #fff;
            font-size: 21px;
            font-weight: bold;
            background: $bgcolor1;
        }
        .horn {
            width: 41px;
            height: 60px;
            background: url('../../assets/images/DMC/custom_button.png') top
                left no-repeat;
        }
    }
    .custom-button-middle {
        position: relative;
        padding: 0;
        left: -5px;
        transform: skew(-33deg, 0);
        width: 1px;
        height: 60px;
        background: #9a9a9a;
    }
    .custom-button-right {
        position: relative;
        display: flex;
        left: -5px;
        margin-top: 20px;
        font-size: 16px;
        line-height: 27px;
        cursor: pointer;
        overflow: hidden;
        .text {
            padding: 0 30px 0 1px;
            height: 35px;
            line-height: 35px;
            border: 1px solid #dcdfe6;
            border-left: none;
        }
        .horn {
            width: 22px;
            height: 37px;
            background: url('../../assets/images/DMC/custom_button.png') top
                right no-repeat;
        }
    }
}
.mini {
    .custom-button-left {
        display: flex;
        position: relative;
        left: 18px;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        overflow: hidden;
        .text {
            padding: 0 30px 0 50px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            background: bgcolor1;
        }
        .horn {
            width: 41px;
            height: 36px;
            background: url('../../assets/images/DMC/custom_button.png') bottom
                left no-repeat;
        }
    }
    .custom-button-right {
        position: relative;
        display: flex;
        top: 2px;
        left: -18px;
        margin-top: 10px;
        font-size: 16px;
        line-height: 27px;
        cursor: pointer;
        overflow: hidden;
        .text {
            padding: 0 30px 0 1px;
            height: 29px;
            line-height: 29px;
            border: 1px solid #dcdfe6;
            border-left: none;
        }
        .horn {
            width: 26px;
            height: 31px;
            background: url('../../assets/images/DMC/custom_button.png') bottom
                right no-repeat;
        }
    }
}
</style>
