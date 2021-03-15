// 智能分析-宏观分析
<template>
  <div>
    <el-card>
      <div slot="header">
        <span>智能分析</span>
      </div>
      
      <div class="header">
        <el-tabs type="" v-model="active" @tab-click="handleClick">
          <el-tab-pane label="中心主要业务" name="1">
            <Business></Business>
          </el-tab-pane>
          <el-tab-pane label="报告机构履职情况" name="2">
            <ExecuteCondition></ExecuteCondition>
          </el-tab-pane>
          <el-tab-pane label="可疑交易报告质量" name="3"></el-tab-pane>
          <el-tab-pane label="常规性宏观分析" name="4"></el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  

  </div>
</template>

<script>
  import Business from '@/views/sys-monitoringAnalysis/macroAnalysis/intelligentAnalyze/business.vue'
  import ExecuteCondition from '@/views/sys-monitoringAnalysis/macroAnalysis/intelligentAnalyze/executeCondition.vue'
  export default {
    components: {
      Business,
      ExecuteCondition
    },
    data() {
      return {
        active: '1'
      }
    },
    methods: {
      handleClick(tab) {
        if (tab.$options.propsData.name !== '1') {
          this.$router.push({ path: '/404' })
        }
      }
    }
  }
</script>

<style scoped>

</style>