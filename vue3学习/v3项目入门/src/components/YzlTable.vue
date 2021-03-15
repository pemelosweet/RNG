<template>
    <div class="yzl-el-table">
        <el-table
            v-if="isRefresh"
            ref="refTable"
            :data="tableList"
            :height="height"
            :max-height="maxHeight"
            @selection-change="selectionChangeF"
            @header-dragend="headerDragendF"
            :span-method="spanMethod"
            :row-key="rowKey"
            border
            :stripe="stripe"
            tooltip-effect="dark"
        >
            <template v-for="colConfig in colConfigs">
                <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
                <el-table-column
                    v-else-if="colConfig.type !== 'selection'"
                    v-bind="colConfig"
                    :key="colConfig.prop"
                >
                    <template #header>
                        <span>{{ colConfig.label }}</span>
                        <span
                            class="yzl-el-table__sortBox"
                            v-if="colConfig.sort"
                        >
                            <i
                                @click="setSort(colConfig.prop, 0)"
                                class="yzl-el-table__sort yzl-el-table__asc"
                                :style="{
                                    borderBottomColor:
                                        tempObj[colConfig.prop].sort === 0
                                            ? '#1F9B83'
                                            : '#c0c4cc',
                                }"
                            ></i>
                            <i
                                @click="setSort(colConfig.prop, 1)"
                                class="yzl-el-table__sort yzl-el-table__desc"
                                :style="{
                                    borderTopColor:
                                        tempObj[colConfig.prop].sort === 1
                                            ? '#1F9B83'
                                            : '#c0c4cc',
                                }"
                            ></i>
                        </span>
                    </template>
                    <template v-slot="scope">
                        <a
                            v-if="colConfig.link"
                            @click="itemClick(scope.row, colConfig.prop)"
                        >
                            {{ scope.row[colConfig.prop] }}
                        </a>
                        <template v-else-if="colConfig.formatter">
                            <div
                                v-html="
                                    colConfig.formatter(
                                        scope.row[colConfig.prop],
                                        scope.row,
                                        colConfig.prop
                                    )
                                "
                            ></div>
                        </template>
                        <template v-else>{{
                            scope.row[colConfig.prop] === undefined
                                ? '——'
                                : scope.row[colConfig.prop]
                        }}</template>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    v-bind="colConfig"
                    :key="colConfig.prop"
                ></el-table-column>
            </template>
        </el-table>
    </div>
</template>
<script lang="ts">
import {
    getCurrentInstance,
    reactive,
    ref,
    toRefs,
    onMounted,
    nextTick,
} from 'vue';
export default {
    name: 'yzl-el-table',
    props: {
        stripe: {
            type: Boolean,
            default: true,
        },
        colConfigs: {
            type: Array,
            default: () => [],
        },
        tableList: {
            type: Array,
            default() {
                return [];
            },
        },
        height: Number,
        maxHeight: Number,
        rowKey: String,
        spanMethod: Function,
    },
    setup(props, context) {
        const state = reactive({
            isRefresh: true,
            tempObj: {},
            searchData: {
                filter: [], //列过滤条件集合
                sort: [], //列排序条件集合
            },
            refTable: null,
        });
        onMounted(() => {
            init();
        });
        /* 初始化排序信息 */
        const init = () => {
            for (var i = props.colConfigs.length - 1; i >= 0; i--) {
                if (props.colConfigs[i].prop) {
                    state.tempObj[props.colConfigs[i].prop] = {
                        sort: '',
                    };
                }
            }
        };
        //表头设置排序  0升序 1降序
        const setSort = (prop, val) => {
            if (!state.tempObj[prop]) {
                state.tempObj[prop] = { sort: val };
            } else {
                state.tempObj[prop].sort = val;
            }
            let i = arrHasItme(state.searchData.sort, prop);
            if (i > -1) {
                state.searchData.sort[i].sort = val;
            } else {
                state.searchData.sort.push({
                    prop: prop,
                    sort: val,
                });
            }
            context.emit('filterData', state.searchData);
            goToRefresh();
        };
        const goToRefresh = () => {
            state.isRefresh = false;
            // 在组件移除后，重新渲染组件
            // nextTick可实现在DOM 状态更新后，执行传入的方法。
            nextTick(() => {
                state.isRefresh = true;
            });
        };
        //判断数组是否存在改元素
        const arrHasItme = (arr, prop) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].prop == prop) {
                    return i;
                }
            }
            return -1;
        };
        //表格元素点击事件
        const itemClick = (data, prop) => {
            context.emit('itemClick', { data: data, prop: prop });
        };
        //选中行变化时
        const selectionChangeF = val => {
            context.emit('selection-change', val);
        };
        //当拖动表头改变了列的宽度的时候会触发该事件
        const headerDragendF = () => {
            nextTick(() => {
                state.refTable.doLayout();
            });
        };
        return {
            ...toRefs(state),
            setSort,
            itemClick,
            selectionChangeF,
            headerDragendF,
        };
    },
};
</script>

<style lang="scss">
.yzl-el-table .el-table__row a {
    color: $main-color;
    text-decoration: underline;
    cursor: pointer;
}
.yzl-el-table .el-table__row a.yzl-el-table__btn {
    text-decoration: none;
    padding: 0 5px;
}
.yzl-el-table .el-table th,
.yzl-el-table .el-table thead.is-group th {
    font-size: 14px;
    padding: 11px 0;
    font-weight: normal;
    color: #222;
    background: #f5f5f5;
}
.yzl-el-table .el-table td {
    font-size: 12px;
    padding: 7px 0;
    font-weight: normal;
    color: #666;
}
.yzl-el-table .el-table .cell {
    line-height: 24px;
}
.yzl-el-table .el-table__body tr.hover-row > td {
    background: $main-color-light;
    color: #222;
}
.yzl-el-table__sortBox {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 22px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
}
.yzl-el-table__sort {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    position: absolute;
    left: 7px;
}
.yzl-el-table__sort.yzl-el-table__asc {
    border-bottom-color: #c0c4cc;
    top: -3px;
}
.yzl-el-table__sort.yzl-el-table__desc {
    border-top-color: #c0c4cc;
    bottom: -1px;
}
.yzl-el-table .el-table .yzl-el-table__history td {
    color: #999;
}
.yzl-el-table .el-table .yzl-el-table__pre__cancel td {
    color: #999;
}
</style>
