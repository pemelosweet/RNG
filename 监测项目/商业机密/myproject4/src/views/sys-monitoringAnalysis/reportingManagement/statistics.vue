<template>
  <div class="reportingManagement_statistics">
    <el-card>
      <!-- <div slot="header" class="clearfix">
        <el-button type="primary" @click="batchClick">批量入库</el-button>
        <div style="float:left">

        </div>
      </div> -->
      <el-form :model="form" ref="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="统计条件组合：" prop="cross" :rules="[{required: true, message: '请选择', trigger: 'change'}]">
              <el-select v-model="form.cross" placeholder="请选择" class="box_width" clearable @change="crossChange">
                <el-option label="按数据接收来源统计" value="1" />
                <el-option label="按预处理情况统计" value="2" />
                <el-option label="按举报事由统计" value="3" />
                <el-option label="各处室办理情况统计" value="4" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间范围：" prop="afterTime" :rules="[{required: true, message: '请选择时间范围', trigger: 'change'}]">
              <el-date-picker v-model="form.afterTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="box_width" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.cross !== '4'">
          <el-col :span="12">
            <el-form-item prop="lengthwise" :rules="[{required: true, message: '请选择', trigger: 'change'}]">
              <el-select  v-model="form.lengthwise" placeholder="请选择" class="box_width" clearable>
                <el-option label="按处理状态统计" value="1" />
                <el-option label="按处理状态为分析的统计" value="2" />
                <el-option label="按处理状态为调查的统计" value="3" />
                <el-option label="按处理状态为移送的统计" value="4" />
                <el-option label="按处理状态为移送且反馈的统计" value="5" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align:right;">
            <el-form-item>
              <el-button type="primary" @click="query">统计</el-button>
              <el-button type="primary" plain @click="clearForm">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table v-if="tableColumn.length > 0" :data="tableData" border style="width: 100%;margin-top: 100px;">
        <el-table-column v-for="(item,index) in tableColumn" :key="index" :prop="item.prop" :label="item.label" show-overflow-tooltip />
      </el-table>
      <el-table v-if="tableColumn.length === 0 && tableData.length > 0" :data="tableData" style="width: 100%" :span-method="objectSpanMethod">
        <el-table-column prop="source" label="" width="180">
          <template slot-scope="scope">
            {{ scope.row.source | sourceFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="" width="180">
          <template slot-scope="scope">
            {{ scope.row.type | typeFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="org0" label="协查一处" width="180"></el-table-column>
        <el-table-column prop="org1" label="协查二处" width="180"></el-table-column>
        <el-table-column prop="org2" label="分析一处" width="180"></el-table-column>
        <el-table-column prop="org3" label="分析二处" width="180"></el-table-column>
        <el-table-column prop="org4" label="分析三处" width="180"></el-table-column>
        <el-table-column prop="org5" label="分析四处" width="180"></el-table-column>
        <el-table-column prop="org6" label="国际交流处" width="180"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { statisticsApi } from '@/api/sys-monitoringAnalysis/reportingManagement/statisticsQuery.js'
export default {
  data() {
    return {
      msg: '举报信息统计',
      form: {
        cross: '',
        lengthwise: '',
        afterTime: ''
      },
      tableData: [],
      tableColumn: [],
      spanArr: [],
      pos: ''
    }
  },
  filters: {
    sourceFilter: function(key) {
      switch (key) {
        case '01':
          return '纸质'
        case '03':
          return '互联网'
        default:
          break
      }
    },
    typeFilter: function(key) {
      switch (key) {
        case '1':
          return '处理中'
        case '2':
          return '已完成'
        default:
          break
      }
    }
  },
  methods: {
    crossChange(val) {
      if (val === '4') {
        this.form.lengthwise = ''
      }
    },
    getSpanArr() {
      for (var i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (this.tableData[i].source === this.tableData[i - 1].source) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    clearForm() {
      this.$refs.form.resetFields()
      this.form.afterTime = ''
    },
    query() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.tableData = []
          if (this.form.cross === '4') {
            this.tableColumn = []
          }
          statisticsApi(this.getParamter()).then(res => {
            if (res.code === 200) {
              this.tableData = res.data.data
              if (res.data.biaotou) {
                this.tableColumn = res.data.biaotou
              } else {
                this.spanArr = []
                this.pos = ''
                this.getSpanArr()
              }
            }
          })
        } else {
          return false
        }
      })
    },
    getParamter() {
      const obj = Object.assign({}, this.form)
      const newObj = {
        cross: obj.cross,
        lengthwise: obj.lengthwise,
        startAfterTime: obj.afterTime ? obj.afterTime[0] : '',
        endAfterTime: obj.afterTime ? obj.afterTime[1] : ''
      }
      return newObj
    }
  }
}
</script>

<style lang="scss">
  .reportingManagement_statistics {
    .box_width {
      width: 100% !important;
    }
    .el-table thead tr th {
      background:none;
    }
  }
</style>