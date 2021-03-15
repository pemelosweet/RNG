<template>
  <div class="resultsummary">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{$route.query.evaluationTaskName}}质量评价表</span>
      </div>
      <el-table :data="tableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="organization" label="机构名称"></el-table-column>
        <el-table-column prop="sumScore" label="评分"></el-table-column>
        <el-table-column prop="evaluationOpinions" label="评价意见"></el-table-column>
      </el-table>

      <div style="margin-top: 10px;">
        <el-button type="primary" @click="download">下载</el-button>
        <!-- <router-link :to="{ name: 'dataGovernance_qualityEvaluation_result'}"></router-link> -->
        <el-button type="primary" plain @click="$router.go(-1)">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { qualityEvaluationTable } from '@/api/sys-monitoringAnalysis/evaluate/queryEvaluationResult.js'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 下载
    download() {
      location.href = 'monitor/viewEvaluation/download/' + this.$route.query.evaluationTaskName
    },
    initData() {
      qualityEvaluationTable(this.$route.query.evaluationTaskName).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    }
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
