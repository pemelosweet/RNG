<!-- 优惠类型 -->
<template>
<div class="discount-type">
    <div
     v-for="(item, index) in types"
      :key="index"
       class="item"
       :style="{color: color, borderColor: color}"
       >{{item}}</div>
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
name: 'discountType',
props: {
    types: {
        type: Array,
        default: () => []
    },
    color: String
},
// components: {},
setup(props) {
const { types } = props
// 定义数据和方法
const data = reactive({
    types
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
    .discount-type{
        position: relative;
        display: flex;
        .item{
            margin: 4px;
            padding: 3px 15px;
            border: 1px solid #F56C6C;
            color: #F56C6C;
            border-radius: 8px;
        }
    }
</style>