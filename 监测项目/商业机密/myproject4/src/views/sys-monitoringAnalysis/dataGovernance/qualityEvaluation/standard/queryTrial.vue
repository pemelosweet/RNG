<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>查看试算</span>
        <router-link :to="{ name: 'dataGovernance_qualityEvaluation_standard_detail', query: this.$route.query}"><el-button type="text" style="float:right;">返回</el-button></router-link>
      </div>
      <el-row>
        <el-form :model="form" ref="form">
          <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="评价任务名称：">
              <span>{{form.evaluationTaskName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评价时间：">
              <span>{{form.evaluationDate}}</span>
            </el-form-item>
          </el-col>
        </el-col>
        <el-table :data="trialTabData" :span-method="objectSpanMethod" border>
          <!-- <el-table-column type="selection" fixed></el-table-column> -->
          <el-table-column prop="assignationOrganization" label="评价机构名称"></el-table-column>
          <el-table-column prop="integrationFirstTarget" label="一级指标"></el-table-column>
          <el-table-column prop="secondTargetName" label="二级指标"></el-table-column>
          <el-table-column prop="targetType" label="指标类型"></el-table-column>
          <el-table-column prop="giftWeight" label="权重"></el-table-column>
          <el-table-column label="评价结果" prop="evaluationResult"></el-table-column>
          <el-table-column label="得分" prop="getScore"></el-table-column>
          <el-table-column label="加权平均分" prop="weightAverage"></el-table-column>
          <el-table-column label="总分" prop="sumScore"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          background
          layout="prev, pager, next"
          :total="total * 10">
        </el-pagination>

        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination> -->
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { queryTrialCalculation } from '@/api/sys-monitoringAnalysis/evaluate/integratedEvaluationController.js'
export default {
  data() {
    return {
      pageNum: 1,
      form: {
        evaluationDate: '',
        evaluationTaskName: ''
      },
      total: 0,
      trialTabData: [],
      spanArr: [],
      pos: '',
      spanArr2: [],
      pos2: ''
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const map = {
        evaluationTaskName: this.$route.query.evaluationTaskName,
        officeStaff: this.$route.query.officeStaff,
        evaluationDate: this.$route.query.evaluationDate,
        targetIdList: this.$route.query.targetIdList,
        pageNum: this.pageNum
      }
      queryTrialCalculation(map).then(res => {
        if (res.code === 200) {
          this.form.evaluationTaskName = res.data.evaluationTaskName
          this.form.evaluationDate = res.data.evaluationDate
          this.trialTabData = res.data.list
          this.total = res.data.total
          this.spanArr = []
          this.pos = ''
          this.spanArr2 = []
          this.pos2 = ''
          this.getSpanArr(this.trialTabData)
        }
      })
    },
    getSpanArr(val) {
      for (var i = 0; i < val.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
          this.spanArr2.push(1)
          this.pos2 = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (val[i].officeId === val[i - 1].officeId && val[i].integrationFirstTarget === val[i - 1].integrationFirstTarget && val[i].assignationOrganization === val[i - 1].assignationOrganization) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
          if (val[i].firstTargetId === val[i - 1].firstTargetId) {
            this.spanArr2[this.pos2] += 1
            this.spanArr2.push(0)
          } else {
            this.spanArr2.push(1)
            this.pos2 = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 8) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      } else if (columnIndex === 1) {
        const _row = this.spanArr2[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.initData()
    }
  }
}
</script>