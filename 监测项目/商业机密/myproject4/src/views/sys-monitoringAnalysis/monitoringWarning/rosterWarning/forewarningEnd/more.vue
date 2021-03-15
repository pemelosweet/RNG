<template>
  <div>
    <el-card>
      <div slot="header">
        <span>{{headTitle}}</span>
      </div>
      <el-table :data="tableData" :show-header="false">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="任务名称" prop="ruleName" min-width="140" align="left"></el-table-column>
        <el-table-column label="批次" min-width="140" align="left">
          <template slot-scope="scope">
            <router-link :to="{
             name:routeName,
             query:{
                taskId:scope.row.taskId,
                batchdt:scope.row.batchdt
              }}">
              <el-button type="text">{{scope.row.batchdt}}</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-table v-if="this.routeJson" :data="routeJson.batchdt" :show-header="false">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="批次" min-width="140" align="left">
          <template slot-scope="scope">
            <router-link :to="{
             name:routeName,
             query:{
                taskId:scope.row.taskId,
                batchdt:scope.row.batchdt
              }}">
              <el-button type="text">{{scope.row.batchdt}}</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table> -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
      </el-pagination>

      <div style="text-align:center;margin-top:28px">
        <el-button type="primary" @click="goBack">返 回</el-button>
      </div>

    </el-card>

  </div>

</template>

<script>
import { mainData } from '@/api/sys-monitoringAnalysis/roster-warning/warning-result.js'
export default {
  data() {
    return {
      tableData: [],
      routeJson: {},
      queryJson: {},
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  computed: {
    paramsObj() {
      const obj = Object.assign({}, this.$route.query, this.pageInfo)
      delete obj.total
      return obj
    },
    paramsObj2() {
      const obj = Object.assign({}, this.$route.query, this.pageInfo2)
      // obj.ctnm = this.form.ctnm
      return obj
    },
    headTitle() {
      return this.$route.params.type === 'more' || this.$route.query.id ? '更多结果' : '定期汇总'
    },
    routeName() {
      return this.$route.params.type === 'more' || this.$route.query.id ? 'forewarningEnd_detail' : 'periodSummarize_detail'
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.routeJson = JSON.parse(this.$route.query.id)
      var taskId = this.routeJson.taskId
      this.routeJson.batchdt.forEach(res => {
        this.tableData.push({ batchdt: res, taskId: taskId })
      })
      this.pageInfo.total = this.tableData.length
    } else {
      this.mainInfo()
    }
  },
  methods: {
    // 获取主体信息
    mainInfo() {
      mainData(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          // this.form.ctnm = res.data.list[0].ctnm
          // this.viewSingle()
        }
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.mainInfo(this.paramsObj)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.mainInfo(this.paramsObj)
    },
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.isReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
</style>
