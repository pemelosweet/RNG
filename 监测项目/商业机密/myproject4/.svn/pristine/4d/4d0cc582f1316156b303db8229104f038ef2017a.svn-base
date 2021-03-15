<template>
  <div class="resultsummary">
    <el-card>
      <div style="text-align:center">
        <h3>金融机构反洗钱数据报送情况统计表</h3>
      </div>
      <div style="textAlign:right" class="searchBtn">
          <el-button type="primary" @click="onLoade">下 载</el-button>
          <el-button type="primary" @click="goBack">返 回</el-button>
      </div>
      <el-row>
        <el-col :offset="1" :span="9">
          <span>{{organization}}</span>
        </el-col>
        <el-col :span="9">
          <span>评价时段：{{evaluationDate}}</span>
        </el-col>
        <el-col :span="5">
          <span>总分：{{sum}}</span>
        </el-col>
      </el-row>
      <el-table :data="tableData" :span-method="objectSpanMethod" style="margin-top:10px" border>
        <el-table-column label="一级指标" prop="firstTargetName" show-overflow-tooltip/>
        <el-table-column label="二级指标" prop="targetName" show-overflow-tooltip/>
        <el-table-column label="评价情况" prop="evaluationResult" show-overflow-tooltip/>
        <el-table-column label="评分" prop="weightAverage" show-overflow-tooltip/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getDetail } from '@/api/sys-monitoringAnalysis/evaluate/queryEvaluationResult.js'
export default {
  data() {
    return {
      organization: '',
      evaluationDate: '',
      sum: '',
      titleName: '',
      tableData: [],
      spanArr: [],
      pos: ''
    }
  },
  mounted() {
    this.initData()
    this.organization = this.$route.query.organization
  },
  methods: {
    goDetail(scope) {
      this.$router.push({
        name: 'dataGovernance_qualityEvaluation_result_detail',
        query: {
          organization: scope.row.organization,
          titleName: this.titleName
        }
      })
    },
    onLoade() {
      location.href = `monitor/viewEvaluation/downloadRicd/${this.$route.query.titleName}/${this.$route.query.organization}`
    },
    initData() {
      getDetail(this.$route.query.organization, this.$route.query.titleName).then(res => {
        this.tableData = res.data.eList
        this.getSpanArr(res.data.eList)
        this.evaluationDate = res.data.evaluationDate
        this.sum = res.data.sum
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同  inAccessCode（批次字段）
          if (data[i].firstTargetName === data[i - 1].firstTargetName) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    // 进行表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (rowIndex % 2 === 0 && rowIndex <= 3) {
    //       console.log('111')
    //       return {
    //         rowspan: 2,
    //         colspan: 1
    //       }
    //     } else if (rowIndex % 1 === 0 && rowIndex > 3 && rowIndex <= 6) {
    //       console.log('222')
    //       return {
    //         rowspan: 3,
    //         colspan: 1
    //       }
    //     } else {
    //       console.log('333')
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
.resultsummary {
  .btnalign {
    text-align: right;
  }
}
</style>
