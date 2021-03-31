<template>
    <div class='roster'>
        <el-table :data='tableData' border :resizable='false'>
            <el-table-column prop='name' label='员工' align='center'>
                <template v-slot='{row}'>
                    <div>{{ row.name }}</div>
                    <div>{{ row.position }}</div>
                </template>
            </el-table-column>
            <el-table-column
                v-for='(item, index) in days'
                :key='getKey(item)'
                width='100px'
                align='center'
                :class-name='isWeekEnd(item) ? "disabled" : ""'
            >
                <template #header=''>
                    <span v-html='getDayLabel(item, index)'></span>
                </template>
                <template v-slot='{row, $index}'>
                    <div v-if='isWeekEnd(item)'>休息</div>
                    <div v-else-if='row[getKey(item)] === weekTime.morning.value'>{{ weekTime.morning.text }}</div>
                    <div v-else-if='row[getKey(item)] === weekTime.afternoon.value'>{{ weekTime.afternoon.text }}</div>
                    <div v-else-if='row[getKey(item)] === weekTime.SoonerOrLater.value'>
                        {{ weekTime.SoonerOrLater.text }}
                    </div>
                    <div v-else-if='row[getKey(item)] === weekTime.day.value'>{{ weekTime.day.text }}</div>
                    <div v-else-if='row[getKey(item)] === weekTime.evening.value'>{{ weekTime.evening.text }}</div>
                    <div v-else>
                        <el-button type='text' @click='handleScheduling($event, $index, getKey(item))'>排班</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-card v-show='showCard' class='select-week' :style='{top: cardTop + "px", left: cardLeft + "px"}'>
            <div>排班设置</div>
            <el-radio-group v-model='cardValue'>
                <div v-for='item in weekTime' :key='item.value'>
                    <el-radio
                        :label='item.value'
                    >{{ item.text }}
                    </el-radio>
                </div>
            </el-radio-group>
            <div>
                <el-button type='primary' @click='cardSure'>确定</el-button>
                <el-button type='primary' @click='hideCard'>取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { MoveEvent } from 'vuedraggable';

export default defineComponent({
    name: 'Roster',
    setup() {

        const tableData = ref([
            { name: '张三', position: 'R1', 1: 3 },
            { name: '李四', position: 'R2', 3: 4 },
            { name: '王五', position: 'R3', 6: 1 },
            { name: '赵六', position: 'R4', 2: 2 }
        ]);

        const days = ref<Dayjs[]>([]);
        // 获取当月的天数
        const l = dayjs().daysInMonth();
        for (let i = 1; i <= l; i++) {
            days.value.push(dayjs().date(i));
        }

        const week = ['日', '一', '二', '三', '四', '五', '六'];
        // 表头文字
        const getDayLabel = (day: Dayjs, index: number) => {
            return index
                ? day.format('DD号') + '<br/>' + week[day.get('day')]
                : day.format('MM月DD号') + '<br/>周' + week[day.get('day')];
        };
        // 获取时间对应的当月的第几天，做key
        const getKey = (day: Dayjs) => {
            return day.get('date');
        };

        const weekTime = reactive({
            morning: { value: 1, text: '上午班' }, // 上午班
            afternoon: { value: 2, text: '下午班' }, // 下午班
            SoonerOrLater: { value: 3, text: '早晚班' }, // 早晚班
            day: { value: 4, text: '白天班' }, // 白天班
            evening: { value: 5, text: '晚上上班' } // 晚上上班
        });

        const cardTop = ref(0);
        const cardLeft = ref(0);
        const showCard = ref(false);
        const cardValue = ref(null);
        const selectedIndex = ref(0);
        const selectedKey = ref<string | number>(0);
        // 显示排班
        const handleScheduling = (e: MouseEvent, index: number, key: number | string) => {
            cardTop.value = e.pageY + 10;
            cardLeft.value = e.pageX + 10;
            showCard.value = true;
            cardValue.value = false;
            selectedIndex.value = index;
            selectedKey.value = key;
        };
        // 隐藏排班
        const hideCard = () => {
            showCard.value = false;
            cardValue.value = false;
        };
        // 排班确定
        const cardSure = () => {
            if (!cardValue.value) {
                showCard.value = false;
                return;
            }
            tableData.value[selectedIndex.value][selectedKey.value] = cardValue.value;
            console.log(tableData.value);
            showCard.value = false;
            cardValue.value = false;
        };
        /**
         * 返回是否是周末
         * @param day
         */
        const isWeekEnd = (day: Dayjs): boolean => {
            return [0, 6].includes(day.get('day'));
        };

        return {
            tableData,
            days,
            weekTime,
            cardTop,
            cardLeft,
            showCard,
            cardValue,
            getDayLabel,
            getKey,
            handleScheduling,
            hideCard,
            cardSure,
            isWeekEnd
        };
    }
});
</script>

<style scoped lang='scss'>

.roster {
    position: relative;
}

.select-week {
    position: fixed;
    z-index: 9;
}

$disabled-bg: #cccccc;
.roster::v-deep(.disabled) {
    background: $disabled-bg;
}

.roster::v-deep(.el-table--enable-row-hover .el-table__body tr:hover) > td.disabled {
    background-color: $disabled-bg;
}
</style>