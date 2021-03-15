const code = `
<template>
    <div class="11table">
        <h1>el-table使用：二次封装table</h1>
        <h1>el-pagination使用：二次封装pagination</h1>
        <YzlElTable
            :colConfigs="colConfigs"
            :tableList="tableData"
            :height="450"
            @filterData="filterData"
            @selection-change="selectionChange"
        >
            <template v-slot:index>
                <el-table-column
                    width="55"
                    label="序号"
                    type="index"
                ></el-table-column>
            </template>
            <template v-slot:checkboxs>
                <el-table-column type="selection" width="55"></el-table-column>
            </template>
            <template v-slot:radio>
                <el-table-column width="55" label="单选" v-slot="scope">
                    <el-radio
                        :label="scope.row.id"
                        v-model="modelRadio"
                        @change="getSelectValues(scope.index_, scope.row)"
                        >&nbsp;
                    </el-radio>
                </el-table-column>
            </template>
            <template v-slot:operation>
                <el-table-column label="操作" fixed="right">
                    <el-button type="primary" size="mini">删除</el-button>
                </el-table-column>
            </template>
        </YzlElTable>
        <YzlPagination
            Postion="right"
            v-bind="pageInfo"
            @change="pageChange"
        ></YzlPagination>
        <pre>
            <code>{{sourceCode}}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import setSourceCode from './setSourceCode.js';
import YzlElTable from '@/components/YzlTable.vue';
import YzlPagination from '@/components/YzlPagination.vue';
export default defineComponent({
    name: '11table',
    components: {
        YzlElTable,
        YzlPagination,
    },
    setup(props, context) {
        const sourceCode = setSourceCode.code;
        const tableData = ref([
            {
                id: 1,
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
            },
            {
                id: 2,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
            },
            {
                id: 3,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
            },
            {
                id: 4,
                date: '2016-05-03',
                name: '王小虎',
                address: '御芝林御芝林御芝林',
            },
        ]);
        const state = reactive({
            colConfigs: [
                {
                    slot: 'index',
                },
                {
                    slot: 'checkboxs',
                },
                {
                    slot: 'radio',
                },
                {
                    prop: 'date',
                    label: '日期',
                    'min-width': 80,
                    sort: true,
                    link: true,
                },
                {
                    prop: 'name',
                    label: '学员姓名',
                    'min-width': 120,
                    sort: false,
                    'show-overflow-tooltip': false,
                    formatter: function (item) {
                        return item + '御芝林';
                    },
                },
                {
                    prop: 'address',
                    label: '地址',
                    'min-width': 100,
                    sort: true,
                    'show-overflow-tooltip': false,
                },
                {
                    slot: 'operation',
                },
            ],
            modelRadio: '',
            pageInfo: {
                TotalCount: 0, //总条数
                PageIndex: 1, //当前页数
                PageSize: 10, //每页多少条
            },
        });
        // 排序的回调事件
        const filterData = data => {
            //console.log(data);
        };
        // 多选、全选事件
        const selectionChange = value => {
            //console.log(value);
        };
        // 单选事件
        const getSelectValues = (index, value) => {
            //console.log(index, value);
        };
        //修改分页参数的时候
        const pageChange = ({ currentPage, pageSizeNum }) => {
            state.pageInfo.PageIndex = currentPage;
            state.pageInfo.PageSize = pageSizeNum;
            doSearch();
        };
        // 表格查询
        const doSearch = () => {};
        return {
            tableData,
            sourceCode, // pre展示模版内容
            ...toRefs(state),
            filterData,
            selectionChange,
            getSelectValues,
            doSearch,
            pageChange,
        };
    },
});
</script>
<style scoped>
</style>


`
export default {
    code
}