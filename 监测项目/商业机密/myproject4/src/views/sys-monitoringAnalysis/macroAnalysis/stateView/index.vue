<template>
  <div>
    <el-card>
      <span slot="header">报表查看</span>
      <el-tabs v-model="activePane" type="card">
        <el-tab-pane name="1" label="月">
          <Month v-if="activePane=='1'"></Month>
        </el-tab-pane>
        <el-tab-pane name="2" label="季">
          <Quarter v-if="activePane=='2'"></Quarter>
        </el-tab-pane>
        <el-tab-pane name="3" label="年">
          <Year v-if="activePane=='3'"></Year>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import Month from '@/views/sys-monitoringAnalysis/macroAnalysis/stateView/month.vue'
  import Quarter from '@/views/sys-monitoringAnalysis/macroAnalysis/stateView/quarter.vue'
  import Year from '@/views/sys-monitoringAnalysis/macroAnalysis/stateView/year.vue'
  export default {
    components: {
      Month,
      Quarter,
      Year
    },
    data() {
      return {
        activePane: '1'

      }
    },
    methods: {
    }

  }
</script>

<style scoped>

</style>
