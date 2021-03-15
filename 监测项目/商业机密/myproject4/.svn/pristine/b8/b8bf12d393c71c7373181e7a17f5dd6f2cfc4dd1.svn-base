<template>
  <div class="judgedClues_statistics">
    <el-card>
      <div slot="header">
        <span>统计</span>
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
            <el-button type="primary" plain @click="crimeType">按涉罪类型统计</el-button>
            <el-button type="primary" plain @click="tradeArea">按交易发生地统计</el-button>
            <el-button type="primary" plain @click="reportBranch">按报告机构统计</el-button>
            <el-button type="primary" plain @click="branchCount">按分支机构上报份数统计</el-button>
            <el-button type="primary" plain @click="judgedAdvice">按分析研判意见统计</el-button>
            <el-button type="primary" plain @click="mettingName">按审核会议名称统计</el-button>
            <el-button type="primary" plain @click="resultConut">按办理结果统计</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24">
          <el-button @click="reportAll"  type="primary" >全部导出</el-button>
        </el-col>
      </el-row>
      <el-table 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        style="margin-top:10px" 
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
// import myTable from '@/views/sys-monitoringAnalysis/judgedClues/table.vue'
import {
  getTotal
} from '@/api/sys-monitoringAnalysis/judgedClues/statistics.js'
export default {
  // components: {
  //   myTable
  // },
  data() {
    return {
      stepNum: '',
      form: {
        minDate: '',
        maxDate: '',
        dateType: '1',
        minYearDate: '',
        maxYearDate: '',
        minMonthDate: '',
        maxMonthDate: '',
        maxSeason: '',
        minSeason: '',
        // maxSeasons: '',
        minSeasons: '',
        // startMonth: '',
        // endMonth:'',
        dateOptions: '1',
        startDate: '',
        startJdu: '',
        endDate: '',
        endJdu: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 第一部分
      listData: [], // 返回的数据
      countryData: [], // 国家数据
      provinceData: [], // 省份数据
      JudgmentData: [], // 涉罪code码
      branchData: [], // 分支机构
      tableData: [], //  表格列
      columnData: [], //  表格行
      // 第三部分
      reportData: [],
      loading: false,
      params: {},
      formRules: {
        minYearDate: [
          { required: true, message: '统计时段不能为空', trigger: 'change' }
        ],
        maxYearDate: [
          { required: true, message: '统计时段不能为空', trigger: 'change' }
        ],
        minMonthDate: [
          { required: true, message: '统计时段不能为空', trigger: 'change' }
        ],
        maxMonthDate: [
          { required: true, message: '统计时段不能为空', trigger: 'change' }
        ],
        data: [
          { required: true, message: '统计时段不能为空', trigger: 'change' }
        ]
      }
    }
  },

  computed: {
    searchParams() {
      const obj = {}
      if (this.form.dateType === '4') {
        obj.dateOptionsForTotal = 'y'
        obj.minYearDate = this.form.minYearDate
        obj.maxYearDate = this.form.maxYearDate
      }
      if (this.form.dateType === '3') {
        obj.dateOptionsForTotal = 'm'
        obj.minYearDate = this.form.startDate + '' + this.form.startJdu
        obj.maxYearDate = this.form.endDate + '' + this.form.endJdu
      }
      if (this.form.dateType === '2') {
        obj.dateOptionsForTotal = 'm'
        obj.minYearDate = this.form.minMonthDate
        obj.maxYearDate = this.form.maxMonthDate
      }
      if (this.form.dateType === '1') {
        obj.dateOptionsForTotal = 'd'
        obj.minYearDate = this.form.minDate
        obj.maxYearDate = this.form.maxDate
      }
      return obj
    }
  },

  methods: {
    reportAll() {
      if (this.tableData.length > 0) {
        const params = Object.assign({}, this.params, this.pageInfo)
        console.log(params)
        delete this.pageInfo.total
        params.type = this.stepNum
        location.href = `monitor/reportLeads/total/export?type=${params.type}&dateOptions=${params.dateOptionsForTotal}&startTime=${params.minYearDate}&endTime=${params.maxYearDate}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`
      } else {
        this.$message({
          message: '暂无导出数据',
          type: 'warning'
        })
      }
    },
    // 涉罪按钮
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
      this.stepNum = '4'
      this.params = Object.assign({}, this.params, this.pageInfo)
      delete this.pageInfo.total
      this.tableData = []
      this.params.totalTypes = '4'
      getTotal(this.params).then(res => {
        if (res.code === 200) {
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
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 交易发生地按钮
    tradeArea() {
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
            this.tradeArea1()
          }
        })
      }
    },
    tradeArea1() {
      this.loading = true
      this.stepNum = '5'
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.tableData = []
      this.params.totalTypes = '5'
      getTotal(this.params).then(res => {
        if (res.code === 200) {
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
              label: '交易发生地',
              prop: 'branch'
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
        }
      })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 报告机构
    reportBranch() {
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
            this.reportBranch1()
          }
        })
      }
    },
    reportBranch1() {
      this.loading = true
      this.stepNum = '6'
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.tableData = []
      this.columnData = [
        {
          label: '序号',
          type: true,
          width: 60
        },
        {
          label: '报告机构',
          prop: 'reporting_body'
        },
        {
          label: '份数',
          prop: 'codename_count'
        }
      ]
      this.params.totalTypes = '6'
      getTotal(this.params).then(res => {
        if (res.code === 200) {
          this.pageInfo.total = res.data.maps.total
          this.tableData = res.data.maps.list
          this.loading = false
        } else {
          this.loading = false
        }
      })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 分支机构上报份数
    branchCount() {
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
            this.branchCount1()
          }
        })
      }
    },
    branchCount1() {
      this.loading = true
      this.stepNum = '7'
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.tableData = []
      this.columnData = [
        {
          label: '序号',
          type: true,
          width: 60
        },
        {
          label: '分支机构',
          prop: 'ricd'
        },
        {
          label: '份数',
          prop: 'codename_count'
        }
      ]
      this.params.totalTypes = '7'
      getTotal(this.params).then(res => {
        if (res.code === 200) {
          this.pageInfo.total = res.data.maps.total
          this.tableData = res.data.maps.list
          this.loading = false
        } else {
          this.loading = false
        }
      })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 分析研判
    judgedAdvice() {
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
            this.judgedAdvice1()
          }
        })
      }
    },
    judgedAdvice1() {
      this.loading = true
      this.stepNum = '8'
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.tableData = []
      this.columnData = [
        {
          label: '序号',
          type: true,
          width: 60
        },
        {
          label: '分析研判意见',
          prop: 'analyse_opinion'
        },
        {
          label: '份数',
          prop: 'codename_count'
        }
      ]
      this.params.totalTypes = '8'
      getTotal(this.params).then(res => {
        if (res.code === 200) {
          this.pageInfo.total = res.data.maps.total
          res.data.maps.list.forEach(el => {
            switch (el.analyse_opinion) {
              case '0':
                el.analyse_opinion = '中心-移送'
                break
              case '1':
                el.analyse_opinion = '中心-通报'
                break
              case '2':
                el.analyse_opinion = '中心-继续关注'
                break
              case '11':
                el.analyse_opinion = '分支机构-通报'
                break
              case '10':
                el.analyse_opinion = '分支机构-移送'
                break
              case '12':
                el.analyse_opinion = '分支机构-继续关注'
                break
              case '15':
                el.analyse_opinion = '其他'
                break
            }
          })
          this.tableData = res.data.maps.list
          this.loading = false
        } else {
          this.loading = false
        }
      })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 审核会议名称
    mettingName() {
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
            this.mettingName1()
          }
        })
      }
    },
    mettingName1() {
      this.loading = true
      this.stepNum = '9'
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.tableData = []
      this.columnData = [
        {
          label: '序号',
          type: true,
          width: 60
        },
        {
          label: '审核会议',
          prop: 'meeting_name'
        },
        {
          label: '份数',
          prop: 'codename_count'
        }
      ]
      this.params.totalTypes = '9'
      getTotal(this.params).then(res => {
        if (res.code === 200) {
          this.pageInfo.total = res.data.maps.total
          this.tableData = res.data.maps.list
          this.loading = false
        } else {
          this.loading = false
        }
      })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 办理结果
    resultConut() {
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
            this.resultConut1()
          }
        })
      }
    },
    resultConut1() {
      this.loading = true
      this.stepNum = '10'
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.columnData = [
        {
          label: '序号',
          type: true,
          width: 60
        },
        {
          label: '办理结果',
          prop: 'with_state'
        },
        {
          label: '份数',
          prop: 'codename_count'
        }
      ]
      this.params.totalTypes = '10'
      getTotal(this.params).then(res => {
        if (res.code === 200) {
          this.pageInfo.total = res.data.maps.total
          this.tableData = res.data.maps.list
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    selectClear(event) {
      this.$refs.form.resetFields()
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      if (this.stepNum === '4') {
        this.crimeType1()
      }
      if (this.stepNum === '5') {
        this.tradeArea1()
      }
      if (this.stepNum === '6') {
        this.reportBranch1()
      }
      if (this.stepNum === '7') {
        this.branchCount1()
      }
      if (this.stepNum === '8') {
        this.judgedAdvice1()
      }
      if (this.stepNum === '9') {
        this.mettingName1()
      }
      if (this.stepNum === '10') {
        this.getTotal1()
      }
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      if (this.stepNum === '4') {
        this.crimeType1()
      }
      if (this.stepNum === '5') {
        this.tradeArea1()
      }
      if (this.stepNum === '6') {
        this.reportBranch1()
      }
      if (this.stepNum === '7') {
        this.branchCount1()
      }
      if (this.stepNum === '8') {
        this.judgedAdvice1()
      }
      if (this.stepNum === '9') {
        this.mettingName1()
      }
      if (this.stepNum === '10') {
        this.getTotal1()
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

<style lang="scss">
.judgedClues_statistics {
  .start-end {
    .start {
      width: 350px;
      display: inline-block;
    }
    .end {
      display: inline-block;
      width: 350px;
    }
     .end2 {
      display: inline-block;
      width: 100px;
    }
  }
  .el-select {
    width: 100%;
  }
  .el-range-editor {
    min-width: 100%;
  }
  .el-button {
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
</style>