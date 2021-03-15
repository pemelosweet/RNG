<template>
  <div class="summarize">
    <el-card>
      <div slot="header">
        <span>模型监控</span>
      </div>
      <!-- <transition name="el-zoom-in-center"> -->
      <div v-show="show1" class="transition-box">
        <!-- <img :src="img_chart" alt=""> -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <ve-pie :data="pieData" :settings="pieSettings" :width="pieWidth" :height="pieHeight" :title="pieTitle" :extend="pieExtend"></ve-pie>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <ve-pie :data="pieData2" :settings="pieSettings2" :width="pieWidth2" :height="pieHeight2" :title="pieTitle2" :extend="pieExtend2"></ve-pie>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <ve-pie :data="pieData3" :settings="pieSettings3" :width="pieWidth3" :height="pieHeight3" :title="pieTitle3" :extend="pieExtend3"></ve-pie>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:18px">
          <el-col :span="12">
            <el-card>
              <ve-histogram :data="histogramData" :settings="histogramSettings" :extend="histogramExtend" :title="histogramTitle"></ve-histogram>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <ve-bar :data="barData" :settings="barSettings" :title="barTitle" :extend="barExtend"></ve-bar>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
const modelOptions = [
  '反恐融资检测模型-001',
  '反恐融资检测模型-002',
  '反恐融资检测模型-003',
  '反恐融资检测模型-004'
]
const personOptions = [
  '方案开发员001',
  '方案开发员002',
  '方案开发员003',
  '方案开发员004',
  '方案开发员005',
  '方案开发员006',
  '方案开发员007',
  '方案开发员008',
  '模型创建者001'
]
import img_chart from '@/assets/chart/chart.png'
import VePie from 'v-charts/lib/pie'
import VeBar from 'v-charts/lib/bar'
import VeHistogram from 'v-charts/lib/histogram'
import historyMsg from '@/views/sys-monitoringAnalysis/modelPlatform/modelManage/historyMsg'
export default {
  components: {
    VePie,
    VeBar,
    VeHistogram,
    historyMsg
    // echarts
  },
  data() {
    return {
      show1: true,
      show2: false,
      checkAll: false,
      checkAll2: false,
      checkedModels: [],
      checkedPersons: [
        '方案开发员001',
        '方案开发员002',
        '方案开发员003',
        '方案开发员004',
        '方案开发员005',
        '方案开发员006',
        '方案开发员007',
        '方案开发员008',
        '模型创建者001'
      ],
      persons: personOptions,
      models: modelOptions,
      isIndeterminate: true,
      isIndeterminate2: true,
      dialogdataVisible: false,
      value1: '',
      value2: '',
      img_chart,
      activeName: 'second',
      activeName2: '1',
      dialogdeleteVisible: false,
      dialogUpVisible: false,
      dialogDownVisible: false,
      dialogmodelVisible: false,
      form: {
        modelName: '',
        startDate: '',
        endDate: '',
        modelExeId: '',
        modelCreater: '',
        resultState: '',
        warningResult: '',
        warningScope: '',
        disposeState: '',
        type: '',
        value3: ''
      },
      searchBlock: {
        name: '',
        ID: '',
        No: '',
        state: '',
        result: '',
        result2: ''
      },
      currentPage: 1,
      tableData: [
        {
          ID: '51',
          modelName: '反恐融资监测模型-001',
          executor: '模型创建员001',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '成功',
          modelScope: '方案开发处',
          // modelCurrEnv: '生产环境',
          modelCount: '第3次',
          period: '第3个执行周期',
          result: '10个',
          handleState: '待处理'
        },
        {
          ID: '50',
          modelName: '反恐融资监测模型-002',
          executor: '模型创建员002',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '运行中',
          modelScope: '模型创建员001',
          // modelCurrEnv: '生产环境',
          modelCount: '第1次',
          period: '——',
          result: '——',
          handleState: '——'
        },
        {
          ID: '49',
          modelName: '反恐融资监测模型-003',
          executor: '模型创建员003',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '暂停',
          modelScope: '方案开发处，模型创建员002',
          // modelCurrEnv: '生产环境',
          modelCount: '第3次',
          period: '——',
          result: '——',
          handleState: '——'
        },
        {
          ID: '48',
          modelName: '反恐融资监测模型-004',
          executor: '模型创建员004',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '失败',
          modelScope: '模型创建员004',
          // modelCurrEnv: '生产环境',
          modelCount: '第2次',
          period: '第3个执行周期',
          result: '100个',
          handleState: '待处理'
        },
        {
          ID: '47',
          modelName: '反恐融资监测模型-005',
          executor: '模型创建员005',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '告警',
          modelScope: '模型创建员005',
          // modelCurrEnv: '生产环境',
          modelCount: '第1次',
          period: '第3个执行周期',
          result: '——',
          handleState: '——'
        }
      ],
      tableData2: [
        {
          modelName: '反恐融资监测模型-001',
          person: '模型创建员001',
          person2: '模型业务审核员001',
          startDate: '2019-01-22 8:00:00',
          tecState: '待技术审核',
          cycle: '按天',
          range: '方案开发处'
        },
        {
          modelName: '反恐融资监测模型-002',
          person: '模型创建员002',
          person2: '模型业务审核员002',
          startDate: '2019-01-22 8:00:00',
          tecState: '技术审核通过',
          cycle: '按星期',
          range: '模型创建员001'
        },
        {
          modelName: '反恐融资监测模型-003',
          person: '模型创建员003',
          person2: '模型业务审核员003',
          startDate: '2019-01-22 8:00:00',
          tecState: '技术审核未通过',
          cycle: '按月份',
          range: '方案开发处，模型创建员002'
        },
        {
          modelName: '反恐融资监测模型-004',
          person: '模型创建员004',
          person2: '模型业务审核员004',
          startDate: '2019-01-22 8:00:00',
          tecState: '技术审核通过',
          cycle: '按季度',
          range: '模型创建员001'
        },
        {
          modelName: '反恐融资监测模型-005',
          person: '模型创建员005',
          person2: '模型业务审核员005',
          startDate: '2019-01-22 8:00:00',
          tecState: '技术审核通过',
          cycle: '2019-01-20 10:00:00',
          range: '模型创建员001'
        }
      ],
      tableData3: [
        {
          ID: '51',
          modelName: '反恐融资监测模型-001',
          executor: '模型创建员001',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '成功',
          modelScope: '方案开发处',
          // modelCurrEnv: '生产环境',
          modelCount: '第3次',
          period: '第3个执行周期',
          result: '10个',
          handleState: '待处理'
        },
        {
          ID: '50',
          modelName: '反恐融资监测模型-002',
          executor: '模型创建员002',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '失败',
          modelScope: '模型创建员001',
          // modelCurrEnv: '生产环境',
          modelCount: '第1次',
          period: '——',
          result: '——',
          handleState: '——'
        },
        {
          ID: '49',
          modelName: '反恐融资监测模型-003',
          executor: '模型创建员003',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '成功',
          modelScope: '方案开发处，模型创建员002',
          // modelCurrEnv: '生产环境',
          modelCount: '第3次',
          period: '——',
          result: '——',
          handleState: '——'
        },
        {
          ID: '48',
          modelName: '反恐融资监测模型-004',
          executor: '模型创建员004',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '失败',
          modelScope: '模型创建员004',
          // modelCurrEnv: '生产环境',
          modelCount: '第2次',
          period: '第3个执行周期',
          result: '100个',
          handleState: '待处理'
        },
        {
          ID: '47',
          modelName: '反恐融资监测模型-005',
          executor: '模型创建员005',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '告警',
          modelScope: '模型创建员005',
          // modelCurrEnv: '生产环境',
          modelCount: '第1次',
          period: '第3个执行周期',
          result: '——',
          handleState: '——'
        },
        {
          ID: '51',
          modelName: '反恐融资监测模型-001',
          executor: '模型创建员001',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '成功',
          modelScope: '方案开发处',
          // modelCurrEnv: '生产环境',
          modelCount: '第3次',
          period: '第3个执行周期',
          result: '10个',
          handleState: '待处理'
        },
        {
          ID: '50',
          modelName: '反恐融资监测模型-002',
          executor: '模型创建员002',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '失败',
          modelScope: '模型创建员001',
          // modelCurrEnv: '生产环境',
          modelCount: '第1次',
          period: '——',
          result: '——',
          handleState: '——'
        },
        {
          ID: '49',
          modelName: '反恐融资监测模型-003',
          executor: '模型创建员003',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '成功',
          modelScope: '方案开发处，模型创建员002',
          // modelCurrEnv: '生产环境',
          modelCount: '第3次',
          period: '——',
          result: '——',
          handleState: '——'
        },
        {
          ID: '48',
          modelName: '反恐融资监测模型-004',
          executor: '模型创建员004',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '失败',
          modelScope: '模型创建员004',
          // modelCurrEnv: '生产环境',
          modelCount: '第2次',
          period: '第3个执行周期',
          result: '100个',
          handleState: '待处理'
        },
        {
          ID: '47',
          modelName: '反恐融资监测模型-005',
          executor: '模型创建员005',
          startDate: '2018-01-23 3:00:30',
          endDate: '2018-01-23 3:00:45',
          totalDate: '15sec',
          resultState: '告警',
          modelScope: '模型创建员005',
          // modelCurrEnv: '生产环境',
          modelCount: '第1次',
          period: '第3个执行周期',
          result: '——',
          handleState: '——'
        }
      ]
    }
  },
  created: function() {
    this.pieData = {
      columns: ['环境', '数量'],
      rows: [{ 环境: '生产环境', 数量: 545 }, { 环境: '集研环境', 数量: 255 }]
    }
    this.pieWidth = '100%'
    this.pieHeight = '320px'
    this.pieTitle = {
      text: '模型总数量统计',
      x: 'center',
      top: 5,
      right: 100,
      textStyle: {
        fontWeight: 500,
        fontSize: 16,
        fontFamily: 'Microsoft YaHei'
      },
      subtext: '模型总量：800个'
    }
    this.pieSettings = {
      offsetY: 170,
      dimension: '环境',
      metrics: '数量',
      radius: 100,
      label: {
        normal: {
          position: 'inside',
          formatter: '{c}'
        }
      }
    }
    this.pieExtend = {
      legend: {
        bottom: 0
      }
    }
    this.pieData2 = {
      columns: ['运行状态', '数量'],
      rows: [
        { 运行状态: '已完成', 数量: 45 },
        { 运行状态: '运行中', 数量: 19 },
        { 运行状态: '未运行', 数量: 35 },
        { 运行状态: '异常', 数量: 3 }
      ]
    }
    this.pieWidth2 = '100%'
    this.pieHeight2 = '320px'
    this.pieTitle2 = {
      text: '生产环境模型运行状态统计',
      x: 'center',
      top: 5,
      right: 100,
      textStyle: {
        fontWeight: 500,
        fontSize: 16,
        fontFamily: 'Microsoft YaHei'
      },
      subtext: '模型总量：545个'
    }
    this.pieSettings2 = {
      offsetY: 170,
      dimension: '运行状态',
      metrics: '数量',
      radius: 100,
      label: {
        normal: {
          position: 'inside',
          formatter: '{c}'
        }
      }
    }
    this.pieExtend2 = {
      legend: {
        bottom: 0
      }
    }
    this.pieData3 = {
      columns: ['审核状态', '数量'],
      rows: [
        { 审核状态: '审核通过', 数量: 120 },
        { 审核状态: '已通过业务审核', 数量: 89 },
        { 审核状态: '已通过技术审核', 数量: 46 }
      ]
    }
    this.pieWidth3 = '100%'
    this.pieHeight3 = '320px'
    this.pieTitle3 = {
      text: '集研环境模型审核数量统计',
      x: 'center',
      top: 5,
      right: 100,
      textStyle: {
        fontWeight: 500,
        fontSize: 16,
        fontFamily: 'Microsoft YaHei'
      },
      subtext: '模型总量：255个'
    }
    this.pieSettings3 = {
      offsetY: 170,
      dimension: '审核状态',
      metrics: '数量',
      radius: 100,
      label: {
        normal: {
          position: 'inside',
          formatter: '{c}'
        }
      }
    }
    this.pieExtend3 = {
      legend: {
        bottom: 0
      }
    }
    this.barData = {
      columns: ['名称', '已运行时间(sec)', '还需运行时间(sec)'],
      rows: [
        { 名称: '反恐融资监测模型-001', '已运行时间(sec)': 55, '还需运行时间(sec)': 5 },
        { 名称: '反恐融资监测模型-002', '已运行时间(sec)': 40, '还需运行时间(sec)': 20 },
        { 名称: '反恐融资监测模型-003', '已运行时间(sec)': 30, '还需运行时间(sec)': 30 },
        { 名称: '反恐融资监测模型-004', '已运行时间(sec)': 28, '还需运行时间(sec)': 32 },
        { 名称: '反恐融资监测模型-005', '已运行时间(sec)': 18, '还需运行时间(sec)': 42 }
      ]
    }
    this.barTitle = {
      text: '生产环境模型运行时长统计Top5',
      x: 'center',
      top: 5,
      right: 100,
      textStyle: {
        fontWeight: 500,
        fontSize: 16,
        fontFamily: 'Microsoft YaHei'
      }
    }
    this.barSettings = {
      // yAxisType: '',
      xAxisType: 'value'
    }
    this.barExtend = {
      legend: {
        bottom: 0
      }
    }
    this.histogramData = {
      columns: ['名称', '预测正确', '预测错误', '占比', '其他'],
      rows: [
        { 预测正确: 220, 名称: '反恐融资监测模型-001', 预测错误: 30, 占比: 0.12, 其他: 100 },
        { 预测正确: 170, 名称: '反恐融资监测模型-002', 预测错误: 45, 占比: 0.345, 其他: 100 },
        { 预测正确: 200, 名称: '反恐融资监测模型-003', 预测错误: 100, 占比: 0.7, 其他: 100 },
        { 预测正确: 70, 名称: '反恐融资监测模型-004', 预测错误: 10, 占比: 0.31, 其他: 100 },
        { 预测正确: 210, 名称: '反恐融资监测模型-005', 预测错误: 50, 占比: 0.31, 其他: 100 }
      ]
    }
    this.histogramTitle = {
      text: '生产环境模型预测结果统计Top5',
      x: 'center',
      top: 5,
      right: 100,
      textStyle: {
        fontWeight: 500,
        fontSize: 16,
        fontFamily: 'Microsoft YaHei'
      }
    }
    this.histogramSettings = {
      metrics: ['预测正确', '预测错误'],
      dimension: ['名称']
    }
    this.histogramExtend = {
      xAxis: {
        axisLabel: {
          rotate: 45
        }
      },
      legend: {
        bottom: 0
      }
    }
    if (this.$route.params.show1 === false) {
      this.show1 = this.$route.params.show1
    }
    if (this.$route.params.show2) {
      this.show2 = this.$route.params.show2
    }
    if (this.$route.params.name) {
      this.activeName2 = this.$route.params.name
    }
  },
  methods: {
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
    handleCheckedModelssChange2() {},
    handleCheckAllChange(val) {
      this.checkedPersons = val ? personOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.persons.length
    },
    handleCheckAllChange2(val) {
      this.checkedModels = val ? modelOptions : []
      this.isIndeterminate2 = false
    },
    handleCheckedCitiesChange2(value) {
      const checkedCount = value.length
      this.checkAll2 = checkedCount === this.cities.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.models.length
    },
    toggle() {
      if (this.show1) {
        this.show1 = false
        setTimeout(() => {
          this.show2 = true
        }, 100)
      } else if (this.show2) {
        this.show2 = false
        setTimeout(() => {
          this.show1 = true
        }, 200)
      }
    },
    changeName() {
      this.activeName2 = '3'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.summarize {
  .ul-inline li {
    padding: 0 5px;
  }
}
</style>
