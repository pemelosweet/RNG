<template>
    <div>
        <el-calendar>
            <template #dateCell="{data}">
                <p @click='getDay(data.day)' :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }} {{ dealMyDate(data.day).isSelected ? '✔️' : '' }} <br /> {{dealMyDate(data.day).res}}
                <!-- {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }} -->
                </p>
            </template>
        </el-calendar>
    </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
export default defineComponent({
    setup(){
        let resDate = reactive([
            {"date":"2020-12-10","content":"咕噜入职",'isSelected':true},
            {"date":"2020-12-16","content":"技术视频面试",'isSelected':true},
            {"date":"2020-12-26","content":"产品视频面试",'isSelected':true}
        ])
        let dealMyDate = (v) => {
            let len = resDate.length
            let obj = {
                res:'',
                isSelected:false
            }
            for(let i=0; i<len; i++){
                if(resDate[i].date == v) {
                    obj.res = resDate[i].content
                    obj.isSelected = resDate[i].isSelected
                    break
                }
            }
            return obj
        }
        let getDay = (day) => {
            // console.log(day)
        }
        return {
            resDate,
            dealMyDate,
            getDay
        }
    }
})
</script>
<style>
.is-selected {
    color: #1989FA;
}
.el-calendar-table .el-calendar-day p{
    display:block;
    height:85px;
}
.el-calendar-table tr:first-child td{
    border-top:none;
}
.el-calendar-table tr td:first-child{
    border-left:none;
}
.el-calendar-table td{
    border-bottom:none;
    border-right:none;
}
</style>