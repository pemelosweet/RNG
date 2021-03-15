<template>
  <div class="intelligentAnalyze_execute">
    <el-form :model="form" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="分析流程类型：">
            <el-button type="primary" plain>报告机构上报报告情况</el-button>
            <el-button type="primary" plain>报告机构行业履职情况</el-button>
            <el-button type="primary" plain>报告机构区域履职情况</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <Tab1></Tab1>
    </div>
  </div>
</template>

<script>
  import Tab1 from '@/views/sys-monitoringAnalysis/macroAnalysis/intelligentAnalyze/components/tab1.vue'
  export default {
    components: {
      Tab1
    },
    data() {
      return {
        form: {
          date: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>