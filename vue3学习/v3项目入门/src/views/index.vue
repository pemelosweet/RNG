<template>
    <div class="index">
        <p class="index-header">欢迎来到前端组</p>
        <p class="index-introduce">
            这里是Vue3 + vue-CLI4.x + Ts + Element-plus 模版
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'index',
    components: {},
    setup(props, context) {
        // 生命周期
        return {};
    },
});
</script>
<style scoped lang="scss">
.index {
    width: calc(100% - 180px);
    margin-top: 200px;
    text-align: center;
}
.index-header {
    font-size: 50px;
    color: $main-color;
}
.index-introduce {
    font-size: 20px;
}
</style>
