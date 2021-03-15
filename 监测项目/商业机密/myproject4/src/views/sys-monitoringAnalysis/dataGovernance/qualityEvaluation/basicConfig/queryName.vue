<template>
  <div>
    <el-card class="el-card_div_01">
      <div slot="header" class="clearfix">
        <span>查看评价机构</span>
        <el-button type="text" style="float:right;" @click="returnBtn">返回</el-button>
      </div>
      <div style="width:auto;height:auto;padding:5px 10px;margin:5px;float:left;border-radius:3px;background:#d8d8d8;color:#5f5f5f;" v-for="(item, index) in initData.split(',')" :key="index">
        {{item}}
      </div>
    </el-card>
  </div>
</template>

<script>
import { evaluationOrganization } from '@/api/sys-monitoringAnalysis/evaluate/mechanismTemplate.js'
export default {
  data() {
    return {
      initData: ''
    }
  },
  mounted() {
    this.initDatas()
  },
  destroyed() {
    if (this.$route.name !== 'dataGovernance_qualityEvaluation_basicConfig') {
      if (sessionStorage.getItem('returnMemoryJyl')) {
        sessionStorage.removeItem('returnMemoryJyl')
      }
    }
  },
  methods: {
    initDatas() {
      evaluationOrganization(this.$route.query.organizationTemplateName).then(res => {
        if (res.code === 200) {
          this.initData = res.data
        }
      })
    },
    returnBtn() {
      if (sessionStorage.getItem('returnMemoryJyl')) {
        const obj = JSON.parse(sessionStorage.getItem('returnMemoryJyl'))
        obj.returnBtn = 'Y'
        sessionStorage.setItem('returnMemoryJyl', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
 .el-card_div_01 {
   .el-card__body {
     overflow: hidden;
   }
 }
</style>