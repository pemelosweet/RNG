<template>
  <div>
    <el-dialog title="评价历史" width="80%" :visible.sync="diaCom" @open="openDialogTableVisible" :append-to-body="true">
      <div style="width: 100%;height: 100px;text-align: center;line-height: 50px;color: rgb(143, 143, 143);" v-if="tableData.length === 0">无历史评价</div>
      <el-table v-for="(el, i) in tableData" :key="i" :data="el" style="width: 100%;margin-bottom: 50px;">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="version" label="版本" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="transactionName" label="可疑交易报告名称" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="affiliate" label="所属机构" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="evaluationDate" label="报告时间" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="suspiciousDescription" label="可疑描述" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column label="评价指标（100）" width="130">
          <template v-if="el.length > 0">
            <el-table-column v-for="(item, index) in el[0].idexes" :key="index" :label="item.indexName + '(' + item.fullMarks + ')'" width="300">
              <template slot-scope="scope">
                {{tabDataMap(scope.$index, el)[index]}}
              </template>
            </el-table-column>
          </template>
        </el-table-column>
         <el-table-column prop="totalScore" label="总分" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="remarks" label="备注" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="location" label="所在处室" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="evaluator" label="评价人员" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="evaluationDate" label="评价时间" show-overflow-tooltip width="100"></el-table-column>
        <!-- <el-table-column prop="evaluationDate" label="评价次数" show-overflow-tooltip width="100"></el-table-column> -->
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { historyRecording } from '@/api/sys-monitoringAnalysis/dataGovernance/samplingEvaluetion/querySer.js'
export default {
  name: 'history',
  props: {
    dialogTable: {
      type: Boolean,
      default: false
    },
    paramsId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    // this.initData()
  },
  computed: {
    diaCom: {
      get() {
        return this.dialogTable
      },
      set(val) {
        this.$emit('setDia', val)
      }
    }
  },
  methods: {
    openDialogTableVisible() {
      this.tableData = []
      this.initData()
    },
    tabDataMap(index, data) {
      const arr = []
      data[index].idexes.map(item => {
        arr.push(item.samplingIndexScore.score)
      })
      return arr
    },
    initData() {
      historyRecording(this.paramsId).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>