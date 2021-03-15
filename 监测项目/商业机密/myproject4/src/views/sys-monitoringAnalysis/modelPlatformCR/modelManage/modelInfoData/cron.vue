<template lang="html">
  <div class="cron" :val="value_">
    <el-tabs v-model="activeName" class="tabsBor">
      <el-tab-pane label="秒" name="s">
        <second-and-minute v-model="sVal" lable="秒"></second-and-minute >
      </el-tab-pane>
      <el-tab-pane label="分" name="m">
        <second-and-minute v-model="mVal" lable="分"></second-and-minute >
      </el-tab-pane>
      <el-tab-pane label="时" name="h">
        <hour v-model="hVal" lable="时"></hour>
      </el-tab-pane>
      <el-tab-pane label="日" name="d">
        <day v-model="dVal" lable="日"></day>
      </el-tab-pane>
      <el-tab-pane label="月" name="month">
        <month v-model="monthVal" lable="月"></month>
      </el-tab-pane>
      <el-tab-pane label="周" name="week">
        <week v-model="weekVal" lable="周"></week>
      </el-tab-pane>
      <el-tab-pane label="年" name="year">
        <year v-model="yearVal" lable="年"></year>
      </el-tab-pane>
    </el-tabs>
    <!-- table -->
    <el-table :data="tableData" size="mini" border style="width: 100%;">
       <el-table-column prop="sVal" label="秒">
       </el-table-column>
       <el-table-column prop="mVal" label="分">
       </el-table-column>
       <el-table-column prop="hVal" label="时">
       </el-table-column>
       <el-table-column prop="dVal" label="日">
       </el-table-column>
       <el-table-column prop="monthVal" label="月">
       </el-table-column>
       <el-table-column prop="weekVal" label="周">
       </el-table-column>
       <el-table-column prop="yearVal" label="年">
       </el-table-column>
     </el-table>
  </div>
</template>

<script>
import SecondAndMinute from '../../../../../components/cron/secondAndMinute'
import hour from '../../../../../components/cron/hour'
import day from '../../../../../components/cron/day'
import month from '../../../../../components/cron/month'
import week from '../../../../../components/cron/week'
import year from '../../../../../components/cron/year'
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      //
      activeName: 's',
      sVal: '',
      mVal: '',
      hVal: '',
      dVal: '',
      monthVal: '',
      weekVal: '',
      yearVal: ''
    }
  },
  watch: {
    'value'(a, b) {
      this.updateVal()
    }
  },
  computed: {
    tableData() {
      return [{
        sVal: this.sVal,
        mVal: this.mVal,
        hVal: this.hVal,
        dVal: this.dVal,
        monthVal: this.monthVal,
        weekVal: this.weekVal,
        yearVal: this.yearVal
      }]
    },
    value_() {
      if (!this.dVal && !this.weekVal) {
        return ''
      }
      // if (this.dVal === '?' && this.weekVal === '?') {
      //   this.$message.error('日期与星期不可以同时为“不指定”')
      // }
      // if (this.dVal !== '?' && this.weekVal !== '?') {
      //   this.$message.error('日期与星期必须有一个为“不指定”')
      // }
      const v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`
      if (v !== this.value) {
        this.$emit('input', v)
      }
      return v
    }
  },
  methods: {
    updateVal() {
      if (!this.value) {
        return
      }
      const arrays = this.value.split(' ')
      this.sVal = arrays[0]
      this.mVal = arrays[1]
      this.hVal = arrays[2]
      this.dVal = arrays[3]
      this.monthVal = arrays[4]
      this.weekVal = arrays[5]
      this.yearVal = arrays[6]
    }
  },
  created() {
    this.updateVal()
  },
  components: {
    SecondAndMinute, hour, day, month, week, year
  }
}
</script>

<style lang="css">
.tabsBor{
  padding: 10px 20px 20px;
  margin:0 0 20px;
  border: 1px solid #dcdfe6;
}
.cron {
  text-align: left;

  background: #fff;
  /* border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04); */
}
 .cron .el-table tr th{padding:0;}
</style>
