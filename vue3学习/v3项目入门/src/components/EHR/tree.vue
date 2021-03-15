<template>
    <div>
        <el-tree
            :data="data.data"
            :props="data.defaultProps"
            @node-click="handleNodeClick"
        ></el-tree>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';

export default defineComponent({
    props: { datap: { type: Array, default: [] } },

    setup(props) {
        const data = reactive({
            data: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                            children: [
                                {
                                    label: '三级 2-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 2-2',
                            children: [
                                {
                                    label: '三级 2-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [
                                {
                                    label: '三级 3-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 3-2',
                            children: [
                                {
                                    label: '三级 3-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        });

        function handleNodeClick(data) {
            console.log(data);
        }

        return {
            data,
            handleNodeClick
        };
    }
});
</script>
<style scoped></style>

// 父组件传值数据： // const data = ref([ // { // id: 1, // label: '一级 1', //
children: [ // { // id: 4, // label: '二级 1-1', // children: [ // { // id: 9,
// label: '三级 1-1-1', // }, // { // id: 10, // label: '三级 1-1-2', // }, //
], // }, // ], // }, // { // id: 2, // label: '一级 2', // children: [ // { //
id: 5, // label: '二级 2-1', // }, // { // id: 6, // label: '二级 2-2', // }, //
], // }, // { // id: 3, // label: '一级 3', // children: [ // { // id: 7, //
label: '二级 3-1', // }, // { // id: 8, // label: '二级 3-2', // }, // ], // },
// ]);
