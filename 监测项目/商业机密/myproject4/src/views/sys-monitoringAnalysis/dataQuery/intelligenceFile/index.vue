<template>
  <div class="intelligenceFile">
    <el-card>
      <div slot="header">
         <span>情报类文件档案查询</span>
      </div>
      <div>
        <el-tabs v-model="active">
          <el-tab-pane label="特定类型查询" name="1">
            <Specific></Specific>
          </el-tab-pane>
          <el-tab-pane label="全文查询" name="2">
            <FullText></FullText>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>   

<script>
  import Specific from '@/views/sys-monitoringAnalysis/dataQuery/intelligenceFile/specific.vue'
  import FullText from '@/views/sys-monitoringAnalysis/dataQuery/intelligenceFile/fullText.vue'
  
  export default {
    components: {
      Specific,
      FullText
    },
    data() {
      return {
        active: '1'
      }
    }
  }
</script>

<style scoped>

</style>