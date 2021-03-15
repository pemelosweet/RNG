<template>
  <div class="conjointAnalysisDetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>详情</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>

      <el-tabs v-model="activePane">
        <el-tab-pane v-if="activePane=='1'" label="联合分析查看" name="1">
          <Creator :showBottom="showBottom"></Creator>

        </el-tab-pane>
        <el-tab-pane v-if="activePane=='2'" label="参与联合分析用户" name="2">
          <NoCreator></NoCreator>
        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>
<script>
import Creator from '@/views/sys-monitoringAnalysis/conjointAnalysis/tabs/creator.vue'
import NoCreator from '@/views/sys-monitoringAnalysis/conjointAnalysis/tabs/noCreator.vue'
// import { getList, branch, getDetail } from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
export default {
  components: {
    Creator,
    NoCreator
  },
  data() {
    return {
      form: {},
      organDoListData: [],
      url: '',
      activePane: '1',
      showBottom: true
    }
  },
  methods: {
    // getRef(){
    //    this.ref.joinId = this.$route.query.id
    //    this.url='monitor/joint-analysis/'+this.ref.joinId
    //    console.log(this.url)
    // },
    // initList(params,url){
    //   getDetail(params,url).then(res=>{
    //     this.form=res.data
    //     console.log(this.form)
    //   })
    // }
  },
  mounted() {},
  created() {
    if (this.$route.query.activePane) {
      if (this.$route.query.activePane === '3') {
        this.showBottom = false
      } else {
        this.activePane = this.$route.query.activePane
      }
    }
    // this.getRef()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
