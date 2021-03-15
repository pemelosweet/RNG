<template>
  <div class="reportLibrarystatistics">
    <el-card>
      <div slot="header">
        <span>上报重点可疑交易报告</span>
      </div>
        <el-form :model="form" ref="form" :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item required label="日期单位：">
              <el-select v-model="form.dateType" clearable placeholder @change="selectClear">
                <el-option label="按日统计" value="1"></el-option>
                <el-option label="按月统计" value="2"></el-option>
                <el-option label="按季统计" value="3"></el-option>
                <el-option label="按年统计" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 日 -->
          <el-col :span="8" v-if="form.dateType==='1'">
            <el-form-item prop="minDate" label="统计时段：" :rules="[{ required: true, message: '请选择开始日期', trigger: 'change' }, { validator: minDateValid, trigger: 'change' }]">
              <el-date-picker
                style="width:100%!important"
                value-format="yyyy-MM-dd"
                v-model="form.minDate"
                type="date"
                placeholder="开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.dateType==='1'">
            <el-form-item prop="maxDate" label-width="40px" label="至" :rules="[{ required: true, message: '请选择结束日期', trigger: 'change' }, { validator: maxDateValid, trigger: 'change' }]">
              <el-date-picker
                style="width:100%!important"
                value-format="yyyy-MM-dd"
                v-model="form.maxDate"
                type="date"
                placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 年 -->
          <el-col :span="8" v-if="form.dateType==='4'">
              <el-form-item prop="minYearDate" label="统计时段：" :rules="[{ required: true, message: '请选择开始年份', trigger: 'change' }, { validator: minYearDateValid, trigger: 'change' }]">
                <el-date-picker
                  style="width:100%"
                  value-format="yyyy"
                  v-model="form.minYearDate"
                  type="year"
                  placeholder="开始年份"
                ></el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.dateType==='4'">
            <el-form-item prop="maxYearDate" label-width="40px" label="至" :rules="[{ required: true, message: '请选择结束年份', trigger: 'change' }, { validator: maxYearDateValid, trigger: 'change' }]">
              <el-date-picker
                style="width:100%"
                value-format="yyyy"
                v-model="form.maxYearDate"
                type="year"
                placeholder="结束年份"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 季 -->
          <el-col :span="16" v-if="form.dateType==='3'">
              <el-col :span="6">
                <el-form-item label-width="0px" prop="startDate" :rules="[{ required: true, message: '请选择开始年份', trigger: 'change' }, { validator: timeCheckStart, trigger: 'change' }]">
                  <el-date-picker style="width:100% !important;" placeholder="开始年份" v-model="form.startDate" type="year" value-format="yyyy"> </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label-width="0px" prop="startJdu" :rules="[{ required: true, message: '请选择开始季度', trigger: 'change' }, { validator: quarterCheckStart, trigger: 'change' }]">
                  <el-select v-model="form.startJdu" placeholder="开始季度" clearable style="width:100%;">
                    <el-option label="第一季度" value="-01"></el-option>
                    <el-option label="第二季度" value="-04"></el-option>
                    <el-option label="第三季度" value="-07"></el-option>
                    <el-option label="第四季度" value="-10"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              
              <el-col :span="6">
                <el-form-item label-width="0px" prop="endDate" :rules="[{ required: true, message: '请选择结束年份', trigger: 'change' }, {validator: timeCheck, trigger: 'change'}]">
                  <el-date-picker style="width:100% !important;" placeholder="结束年份" v-model="form.endDate" type="year" value-format="yyyy">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="0px" prop="endJdu" :rules="[{ required: true, message: '请选择结束季度', trigger: 'change' }, { validator: quarterCheckEnd, trigger: 'change' }]">
                  <el-select v-model="form.endJdu" placeholder="结束季度" clearable style="width:100%;">
                    <el-option label="第一季度" value="-03"></el-option>
                    <el-option label="第二季度" value="-06"></el-option>
                    <el-option label="第三季度" value="-09"></el-option>
                    <el-option label="第四季度" value="-12"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          </el-col>
          <!-- 月 -->
          <el-col :span="8" v-if="form.dateType==='2'">
              <el-form-item prop="minMonthDate" label="统计时段：" :rules="[{ required: true, message: '请选择开始月份', trigger: 'change' }, { validator: minMonthDateVaild, trigger: 'change' }]">
                <el-date-picker
                  style="width:100%"
                  value-format="yyyy-MM"
                  v-model="form.minMonthDate"
                  type="month"
                  placeholder="开始月份"
                ></el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.dateType==='2'">
            <el-form-item prop="maxMonthDate" label-width="40px" label="至" :rules="[{ required: true, message: '请选择结束月份', trigger: 'change' }, { validator: maxMonthDateVaild, trigger: 'change' }]">
              <el-date-picker
                style="width:100%"
                value-format="yyyy-MM"
                v-model="form.maxMonthDate"
                type="month"
                placeholder="结束月份"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="统计类型：">
            <el-button type="primary" @click="crimeType" plain >按涉罪类型统计</el-button>
            <el-button type="primary" @click="object" plain >按主体情况统计</el-button>
            <el-button type="primary" @click="reportClues" plain >按线索状态统计</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24">
        <el-button @click="reportAll" type="primary" >全部导出</el-button>
      </el-col>
      </el-row>
      <el-table 
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
      style="margin-top:20px" 
      :data="tableData" 
      width="100%" 
      tooltip-effect="dark">
        <template v-for="(column, index) in columnData">
          <el-table-column
            v-if="column.type"
            :label="column.label"
            :key="index"
            type="index"
            :width="column.width"
          ></el-table-column>
          <el-table-column
            v-else-if="column.operations"
            :label="column.label"
            :prop="column.prop"
            :key="index"
            :width="column.width"
            :min-width="column.minWidth"
            :formatter="column.formatter"
            :show-overflow-tooltip="true"
          >
            <template>
              <el-button v-for="(operate, index) in item.operations" :key="index">{{operate.label}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :formatter="column.formatter"
            :key="index"
          ></el-table-column>
        </template>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :total="pageInfo.total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import Tab1 from '@/views/sys-monitoringAnalysis/informationInteraction/reportClues/components/tab1.vue'
// import Tab2 from '@/views/sys-monitoringAnalysis/informationInteraction/reportClues/components/tab2.vue'
import { getDataList } from '@/api/sys-monitoringAnalysis/report-clues/statistics.js'
export default {
  // components: {
  //   Tab1,
  //   Tab2,
  //   Tab3
  // },
  data() {
    return {
      form: {
        dateType: '1',
        minYearDate: '',
        maxYearDate: '',
        minMonthDate: '',
        maxMonthDate: '',
        startDate: '',
        startJdu: '',
        endDate: '',
        endJdu: '',
        minDate: '',
        maxDate: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      listData: [], // 返回的数据
      countryData: [], // 国家数据
      provinceData: [], // 省份数据
      JudgmentData: [], // 涉罪code码
      branchData: [], // 分支机构
      tableData: [], //  表格列
      columnData: [], //  表格行
      loading: false,
      // 第三部分
      reportData: [],
      stepNum: '',
      params: {},
      formRules: {
        dateType: [
          { required: true, message: '请选择日期单位', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    dataType() {
      return this.form.dateType
    },
    searchParams() {
      const obj = {}
      if (this.form.dateType === '4') {
        obj.dateOptions = 'y'
        obj.startTime = this.form.minYearDate
        obj.endTime = this.form.maxYearDate
      }
      if (this.form.dateType === '3') {
        obj.dateOptions = 'm'
        obj.startTime = this.form.startDate + '' + this.form.startJdu
        obj.endTime = this.form.endDate + '' + this.form.endJdu
      }
      if (this.form.dateType === '2') {
        obj.dateOptions = 'm'
        obj.startTime = this.form.minMonthDate
        obj.endTime = this.form.maxMonthDate
      }
      if (this.form.dateType === '1') {
        obj.dateOptions = 'd'
        obj.startTime = this.form.minDate
        obj.endTime = this.form.maxDate
      }
      return obj
    }
  },
  methods: {
    crimeType() {
      if (this.form.dateType === '') {
        this.$message({
          message: '请选择日期单位及统计时段',
          type: 'warning'
        })
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.pageInfo = {
              pageNum: 1,
              pageSize: 10,
              total: 0
            }
            this.params = Object.assign({}, this.searchParams, this.pageInfo)
            this.crimeType1()
          }
        })
      }
    },
    crimeType1() {
      this.loading = true
      this.stepNum = '1'
      this.params = Object.assign({}, this.params, this.pageInfo)
      delete this.pageInfo.total
      this.params.type = '1'
      getDataList(this.params).then(res => {
        if (res.code === 200) {
          this.tableData = []
          this.pageInfo.total = res.data.results.total
          this.JudgmentData = res.data.codes
          this.branchData = res.data.brankName.data
          this.listData = res.data.results.list
          this.columnData = [
            {
              label: '序号',
              type: true,
              width: 60
            },
            {
              label: '分支机构',
              prop: 'branch',
              width: 190
            }
          ]
          this.JudgmentData.forEach((el, index) => {
            const item = el.toString()
            const obj = {
              label: item,
              prop: item
            }
            this.columnData = this.columnData.concat(obj)
          })
          this.listData.forEach((el, index) => {
            const item = el
            const obj = {
              branch: item.codeName
            }
            const obj3 = res.data.results.list[index]
            const objs = Object.assign({}, obj, obj3)
            this.tableData = this.tableData.concat(objs)
          })
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    object() {
      if (this.form.dateType === '') {
        this.$message({
          message: '请选择日期单位及统计时段',
          type: 'warning'
        })
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.pageInfo = {
              pageNum: 1,
              pageSize: 10,
              total: 0
            }
            this.params = Object.assign({}, this.searchParams, this.pageInfo)
            this.object1()
          }
        })
      }
    },
    object1() {
      this.loading = true
      this.stepNum = '2'
      this.params = Object.assign({}, this.params, this.pageInfo)
      delete this.pageInfo.total
      this.params.type = '2'
      getDataList(this.params).then(res => {
        if (res.code === 200) {
          this.tableData = []
          console.log(this.tableData)
          this.pageInfo.total = res.data.results.total
          this.JudgmentData = res.data.codes
          this.branchData = res.data.brankName.data
          this.listData = res.data.results.list
          this.columnData = [
            {
              label: '序号',
              type: true,
              width: 60
            },
            {
              label: '分支机构',
              prop: 'branch',
              width: 190
            }
          ]
          this.JudgmentData.forEach((el, index) => {
            const item = el.toString()
            const obj = {
              label: item,
              prop: item
            }
            this.columnData = this.columnData.concat(obj)
          })
          this.listData.forEach((el, index) => {
            const item = el
            const obj = {
              branch: item.codeName
            }
            const obj3 = res.data.results.list[index]
            const objs = Object.assign({}, obj, obj3)
            this.tableData = this.tableData.concat(objs)
          })
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    reportClues() {
      if (this.form.dateType === '') {
        this.$message({
          message: '请选择日期单位及统计时段',
          type: 'warning'
        })
      } else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.pageInfo = {
              pageNum: 1,
              pageSize: 10,
              total: 0
            }
            this.params = Object.assign({}, this.searchParams, this.pageInfo)
            this.reportClues1()
          }
        })
      }
    },
    reportClues1() {
      this.loading = true
      this.stepNum = '3'
      this.params = Object.assign({}, this.params, this.pageInfo)
      delete this.pageInfo.total
      this.params.type = '3'
      getDataList(this.params).then(res => {
        if (res.code === 200) {
          this.tableData = []
          console.log(this.tableData)
          this.pageInfo.total = res.data.results.total
          this.JudgmentData = res.data.codes
          this.branchData = res.data.brankName.data
          this.listData = res.data.results.list
          this.columnData = [
            {
              label: '序号',
              type: true,
              width: 60
            },
            {
              label: '分支机构',
              prop: 'branch',
              width: 190
            }
          ]
          this.JudgmentData.forEach((el, index) => {
            const item = el.toString()
            const obj = {
              label: item,
              prop: item
            }
            this.columnData = this.columnData.concat(obj)
          })
          this.listData.forEach((el, index) => {
            const item = el
            const obj = {
              branch: item.codeName
            }
            const obj3 = res.data.results.list[index]
            const objs = Object.assign({}, obj, obj3)
            this.tableData = this.tableData.concat(objs)
          })
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    reportAll() {
      if (this.tableData.length > 0) {
        const params = Object.assign({}, this.params, this.pageInfo)
        delete this.pageInfo.total
        params.type = this.stepNum
        location.href = `monitor/reportClue/total/export?type=${params.type}&dateOptions=${params.dateOptions}&startTime=${params.startTime}&endTime=${params.endTime}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`
      } else {
        this.$message({
          message: '暂无导出数据',
          type: 'warning'
        })
      }
    },
    selectClear(event) {
      this.$refs.form.resetFields()
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      if (this.stepNum === '1') {
        this.tableData = []
        this.columnData = []
        this.crimeType1()
      }
      if (this.stepNum === '2') {
        this.tableData = []
        this.columnData = []
        this.object1()
      }
      if (this.stepNum === '3') {
        this.tableData = []
        this.columnData = []
        this.reportClues1()
      }
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      if (this.stepNum === '1') {
        this.crimeType1()
      }
      if (this.stepNum === '2') {
        this.tableData = []
        this.columnData = []
        this.object1()
      }
      if (this.stepNum === '3') {
        this.tableData = []
        this.columnData = []
        this.reportClues1()
      }
    },
    // 日
    minDateValid(rule, value, callback) {
      if (this.form.maxDate) {
        const time1 = new Date(this.form.maxDate)
        const time2 = new Date(value)
        if (time1 < time2) {
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    maxDateValid(rule, value, callback) {
      if (this.form.minDate) {
        const time1 = new Date(this.form.minDate)
        const time2 = new Date(value)
        if (time1 > time2) {
          callback(new Error('结束时间必须大于开始时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 月
    minMonthDateVaild(rule, value, callback) {
      if (this.form.maxMonthDate) {
        const time1 = new Date(this.form.maxMonthDate)
        const time2 = new Date(value)
        if (time1 < time2) {
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    maxMonthDateVaild(rule, value, callback) {
      if (this.form.minMonthDate) {
        const time1 = new Date(this.form.minMonthDate)
        const time2 = new Date(value)
        if (time1 > time2) {
          callback(new Error('结束时间必须大于开始时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 年
    minYearDateValid(rule, value, callback) {
      if (this.form.maxYearDate) {
        const time1 = new Date(this.form.maxYearDate)
        const time2 = new Date(value)
        if (time1 < time2) {
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    maxYearDateValid(rule, value, callback) {
      if (this.form.minYearDate) {
        const time1 = new Date(this.form.minYearDate)
        const time2 = new Date(value)
        if (time1 > time2) {
          callback(new Error('结束时间必须大于开始时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 季
    timeCheckStart(rule, value, callback) {
      if (this.form.endDate) {
        const time1 = new Date(this.form.endDate)
        const time2 = new Date(value)
        if (time1 < time2) {
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    timeCheck(rule, value, callback) {
      if (this.form.startDate) {
        const time1 = new Date(this.form.startDate)
        const time2 = new Date(value)
        if (time1 > time2) {
          callback(new Error('结束时间必须大于开始时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    quarterCheckStart(rule, value, callback) {
      if (this.form.startDate === this.form.endDate && this.form.endJdu) {
        const arr1 = this.form.endJdu.split('-')
        const time1 = Number(arr1[1])
        const arr2 = value.split('-')
        const time2 = Number(arr2[1])
        if (time1 < time2) {
          callback(new Error('开始季度必须小于结束季度'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    quarterCheckEnd(rule, value, callback) {
      if (this.form.startDate === this.form.endDate && this.form.startJdu) {
        const arr1 = this.form.startJdu.split('-')
        const time1 = Number(arr1[1])
        const arr2 = value.split('-')
        const time2 = Number(arr2[1])
        if (time1 > time2) {
          callback(new Error('结束季度必须大于开始季度'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  }
}
</script>

<style  lang="scss">
.reportLibrarystatistics {
  .el-select {
    width: 100%;
  }
  .specialFormItem {
    .el-form-item__label {
      line-height: 40px;
    }
    .el-tabs__nav-wrap::after{
      height: 0

    }
  }
}
</style>
