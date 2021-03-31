<template>
    <el-calendar>
        <template #dateCell="{data}">
            <div class="calendarCaDiv" @click="logCd(data.day)">
                <!-- <div class="calendarCaDivBtn">
                    <el-button
                        style="z-index:1024"
                        size="mini"
                        @click="logBk(data.day)"
                        v-if="dealMyDate(data.day).res == '迟到'"
                        type="primary"
                        >补卡</el-button
                    >
                </div> -->
                <div class="calendarCaDivInfo">
                    <div :class="data.isSelected ? 'is-selected' : ''">
                        {{
                            data.day
                                .split('-')
                                .slice(2)
                                .join('-')
                        }}
                    </div>

                    <div>
                        {{ dealMyDate(data.day).res }}
                    </div>

                    <div>
                        {{ dealMyDate(data.day).dataTime }}
                    </div>
                    <div>
                        {{ dealMyDate(data.day).roster }}
                    </div>
                </div>
            </div>

            <!-- 早班 8:00-12:00 迟到 -->
        </template>
    </el-calendar>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
export default {
    name: 'index',
    components: {},
    setup(props, context) {
        // 当前页面数据
        function logCd(newVlue) {
            console.log(newVlue);
            console.log('我是');
        }

        function logBk(newVal) {
            console.log('补卡' + newVal);
        }

        let resDate = reactive([
            {
                date: '2020-12-11',
                roster: '早班',
                content: '放假',
                dataTime: '8:26~18:03',
                isSelected: true
            },
            {
                date: '2020-12-21',
                roster: '晚班',
                content: '上班',
                dataTime: '8:26~18:03',
                isSelected: true
            },
            {
                date: '2020-12-31',
                roster: '早班',
                content: '年假',
                dataTime: '8:26~18:03',
                isSelected: true
            },
            {
                date: '2020-12-01',
                roster: '早班',
                content: '迟到',
                dataTime: '8:26~18:03',
                isSelected: false
            }
        ]);

        let dealMyDate = v => {
            let len = resDate.length;
            let obj = {
                res: '',
                roster: '',
                dataTime: '',
                isSelected: false
            };
            for (let i = 0; i < len; i++) {
                if (resDate[i].date == v) {
                    obj.res = resDate[i].content;
                    obj.isSelected = resDate[i].isSelected;
                    obj.roster = resDate[i].roster;
                    obj.dataTime = resDate[i].dataTime;
                    break;
                }
            }
            return obj;
        };
        // 生命周期
        return { resDate, dealMyDate, logCd, logBk };
    }
};
</script>
<style lang="scss" scoped>
.is-selected {
    color: #1989fa;
}

.calendarCaDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 20px;
}

.calendarCaDivBtn {
    position: 20px;
}
.calendarCaDivInfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    // height: 85px;
}
</style>
