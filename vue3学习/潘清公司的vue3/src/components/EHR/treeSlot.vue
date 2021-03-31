<template>
    <div class="custom-tree-container">
        <div class="block">
            <el-tree
                :data="dataValue"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
            >
                <template #default="{ node, data }">
                    <span class="custom-tree-node">
                        <span>{{ node.label }}</span>
                        <span>
                            <a @click="append(data)"> 增加 </a>
                            <a @click="remove(node, data)"> 删除 </a>
                        </span>
                    </span>
                </template>
            </el-tree>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { reactive, ref } from 'vue';
export default {
    setup() {
        let id = ref(1000);
        const dataValue = reactive([
            {
                id: 1,
                label: '一级 1',
                children: [
                    {
                        id: 4,
                        label: '二级 1-1',
                        children: [
                            {
                                id: 9,
                                label: '三级 1-1-1',
                            },
                            {
                                id: 10,
                                label: '三级 1-1-2',
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                label: '一级 2',
                children: [
                    {
                        id: 5,
                        label: '二级 2-1',
                    },
                    {
                        id: 6,
                        label: '二级 2-2',
                    },
                ],
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                    {
                        id: 7,
                        label: '二级 3-1',
                    },
                    {
                        id: 8,
                        label: '二级 3-2',
                    },
                ],
            },
        ]);

        function append(data) {

            const newChild = {
                id: id.value++,
                label: 'testtest',
                children: [],
            };
            if (!data.children) {
                data.children = [];
            }
            data.children.push(newChild);
            data = [...dataValue];
        }

        function remove(node, data) {


            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
            data = [...dataValue];
        }
        return {
            dataValue: JSON.parse(JSON.stringify(dataValue)),
            id,
        };
    },
};
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>