<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <span v-for="(item, i) in formInline.data" :key="i">
                <el-form-item
                    :label="item.txtName"
                    v-if="item.txtIndex === '0'"
                >
                    <el-input
                        v-model="item.txtValue"
                        placeholder="审批人"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    :label="item.txtName"
                    v-if="item.txtIndex === '1'"
                >
                    <el-select v-model="item.txtValue" placeholder="活动区域">
                        <el-option
                            v-for="item2 in item.valueData"
                            :key="item2.value"
                            :label="item2.label"
                            :value="item2.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :label="item.txtName"
                    v-if="item.txtIndex === '2'"
                >
                    <div class="block">
                        <el-date-picker
                            v-model="item.txtValue"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </div>
                </el-form-item>
            </span>

            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { ElSelect, ElOption } from 'element-plus';
import { defineComponent, onMounted, reactive, ref } from 'vue';
export default {
    name: 'index',
    components: { ElSelect, ElOption },
    props: { formInline: { type: Object, default: reactive } },
    setup(props, context) {
        // 生命周期
        return {
            // formInline,
        };
    },
};
</script>
<style lang="scss" scoped>
</style> scoped>



// 父组件数据传值：
//  const formInline = reactive({
//             id: '',
//             name: '',
//             data: [
//                 { id: '0000', txtName: '审批人', txtIndex: '0', txtValue: '' },
//                 {
//                     id: '0001',
//                     txtName: '活动区域1',
//                     txtIndex: '1',
//                     txtValue: '区域一',
//                     valueData: [
//                         { id: '1', label: '区域一', value: 'shanghai' },
//                         { id: '2', label: '区域二', value: 'beijing' },
//                         { id: '3', label: '区域三', value: 'shijizhuang' },
//                     ],
//                 },
//                 {
//                     id: '0002',
//                     txtName: '活动区域2',
//                     txtIndex: '1',
//                     txtValue: '区域二',
//                     valueData: [
//                         { id: '4', label: '区域一', value: 'shanghai' },
//                         { id: '5', label: '区域二', value: 'beijing' },
//                         { id: '6', label: '区域三', value: 'shijizhuang' },
//                     ],
//                 },
//                 {
//                     id: '0003',
//                     txtName: '选择时间',
//                     txtIndex: '2',
//                     txtValue: '',
//                 },
//             ],
//         });

