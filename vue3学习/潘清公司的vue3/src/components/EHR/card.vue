<template>
    <div>
        <el-card class="box-card">
            <el-form ref="form" :model="form" label-width="80px">
                <span class="spanImgPS">
                    <img height="30" :src="peopleSucess" alt="" />
                </span>
                <span> 车位申请 </span>
                <el-form-item label="应用范围"> ：所有人 </el-form-item>
                <span v-for="(item, i) in form" :key="i" class="spanItem">
                    <el-button type="primary" @click="onSubmit(i)">{{
                        item.name
                    }}</el-button>
                </span>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import peopleSucess from '@/assets/EHR/peopleSucess.svg';
export default {
    name: 'index',
    components: {},
    setup(props, context) {
        // 当前页面数据

        const form = reactive([
            { name: '编辑' },
            { name: '禁用' },
            { name: '复制' },
            { name: '移动到' },
            { name: '删除' },
        ]);

        function onSubmit(i) {
            console.log('submit!' + form[i]['name']);
        }

        // 生命周期
        return {
            form,
            onSubmit,
            peopleSucess,
        };
    },
};
</script>
<style scoped>
.spanImgPS {
    margin-left: 20px;
}
.spanItem {
    margin: auto 5px;
}
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 400px;
}
</style>
