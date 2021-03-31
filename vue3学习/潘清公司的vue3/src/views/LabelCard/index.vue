<template>
    <div style='padding-top: 20px'>
        <label-card
            title='基础属性'
            right-label='标签类型'
            v-model='label.right'
            :right-options='option'
        >
            <label-card
                title='性别'
                right-label='标签类型'
                v-model='label.right'
                :right-options='option'
                @add-click='handleClick'
            >
                <el-tag
                    :key='tag'
                    v-for='tag in dynamicTags'
                    closable
                    :disable-transitions='false'
                    @close='handleClose(tag)'>
                    {{ tag }}
                </el-tag>
                <el-input
                    class='input-new-tag'
                    v-if='inputVisible'
                    v-model='inputValue'
                    ref='saveTagInput'
                    size='small'
                    @keyup.enter.native='handleInputConfirm'
                    @blur='handleInputConfirm'
                >
                </el-input>
                <el-button v-else class='button-new-tag' size='small' @click='showInput'>+ New Tag</el-button>
            </label-card>
            <label-card title='地图echarts' :show-right='false' @add-click='handleSetEcharts'>
                <el-button type='primary' @click='resetEcharts'>重置</el-button>
                <echarts-com :options='echartsOptions' style='height: 500px;'></echarts-com>
            </label-card>
            <label-card
                title='日历'
            >
                <yzl-calendar />
            </label-card>
        </label-card>
    </div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import LabelCard from '@/components/LabelCard/index.vue';
import YzlCalendar from '@/components/YzlCalendar.vue';
import EchartsCom from '@/components/Echarts/EchartsCom.vue';

export default defineComponent({
    name: 'label-card-view',
    components: { EchartsCom, YzlCalendar, LabelCard },
    setup() {
        const label = reactive({
            right: ''
        });
        const rightOption = reactive({
            option: [1, 2, 3].map(item => ({ label: item, value: item + 1 }))
        });
        const dynamicTags = ref(['标签一', '标签二', '标签三']);
        const inputVisible = ref(false);
        const saveTagInput = ref(null);
        const inputValue = ref('');
        const handleClick = () => {
            console.log('add');
        };
        const handleClose = (tag) => {
            dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
        };
        const showInput = () => {
            inputVisible.value = true;
            nextTick(() => {
                saveTagInput.value.focus();
            });
        };
        const handleInputConfirm = () => {
            if (inputValue.value) {
                dynamicTags.value.push(inputValue.value);
            }
            inputVisible.value = false;
            inputValue.value = '';
        };

        const echartsOptions = ref({
            title: {
                text: '顾客地域分布'
            },
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    return `${params.name}<br />${params.data ? params.data.value : 0}人`;
                }
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                }
            },
            visualMap: {
                min: 0,
                max: 50000,
                text: ['最高', '最低'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
            series: [
                {
                    name: '地图展示',
                    type: 'map',
                    mapType: 'china', // 自定义扩展图表类型
                    selectedMode: 'multiple',
                    label: {
                        show: true
                    },
                    data: [
                        { name: '山西', value: 20057 },
                        { name: '河南', value: 15477 },
                        { name: '北京', value: 31686 },
                        { name: '河北', value: 6992 },
                        { name: '广东', value: 44045 },
                        { name: '广西', value: 40689 },
                        { name: '贵州', value: 37659 },
                        { name: '云南', value: 45180 },
                        { name: '四川', value: 55204 },
                        { name: '青海', value: 21900 },
                        { name: '辽宁', value: 4918 },
                        { name: '黑龙江', value: 5881 },
                        { name: '山东', value: 4178 },
                        { name: '陕西', value: 2227 },
                        { name: '重庆', value: 2180 },
                        { name: '湖南', value: 9172 },
                        { name: '湖北', value: 3368 },
                        { name: '西藏', value: 806 },
                        { name: '台湾', value: 300 }
                    ]
                }
            ]
        });

        const handleSetEcharts = () => {
            echartsOptions.value.series[0].data[0].value = 5000;
        };

        const resetEcharts = () => {
            echartsOptions.value = {
                title: {
                    text: '顾客地域分布'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                        return `${params.name}<br />${params.data ? params.data.value : 0}人`;
                    }
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                visualMap: {
                    min: 0,
                    max: 50000,
                    text: ['最高', '最低'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['lightskyblue', 'yellow', 'orangered']
                    }
                },
                series: [
                    {
                        name: '地图展示',
                        type: 'map',
                        mapType: 'china', // 自定义扩展图表类型
                        label: {
                            show: true
                        },
                        selectedMode: 'multiple',
                        data: [
                            { name: '山西', value: 20057 },
                            { name: '河南', value: 15477 },
                            { name: '北京', value: 31686 },
                            { name: '河北', value: 6992 },
                            { name: '广东', value: 44045 },
                            { name: '广西', value: 40689 },
                            { name: '贵州', value: 37659 },
                            { name: '云南', value: 45180 },
                            { name: '四川', value: 55204 },
                            { name: '青海', value: 21900 },
                            { name: '辽宁', value: 4918 },
                            { name: '黑龙江', value: 5881 },
                            { name: '山东', value: 4178 },
                            { name: '陕西', value: 2227 },
                            { name: '重庆', value: 2180 },
                            { name: '湖南', value: 9172 },
                            { name: '湖北', value: 3368 },
                            { name: '西藏', value: 806 },
                            { name: '台湾', value: 300 }
                        ]
                    }
                ]
            };
        };

        return {
            label,
            dynamicTags,
            inputVisible,
            inputValue,
            saveTagInput,
            ...toRefs(rightOption),
            handleClick,
            handleClose,
            showInput,
            handleInputConfirm,
            handleSetEcharts,
            resetEcharts,
            echartsOptions
        };
    }
});
</script>

<style scoped lang='scss'>
.el-tag + .el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>