<template>
    <div>
        <el-calendar v-model="calendarValue"></el-calendar>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
export default {
    name: 'YzlCalendar',
    components: {},
    setup(props, context) {
        // 当前页面数据

        const calendarValue = ref(new Date());

        // 生命周期
        return {
            calendarValue,
        };
    },
};
</script>
<style scoped>
</style>
