<template>
  <div class="nTradeList">
    <el-card>
      <a @click="routerBack" class="back" :style="backImg"></a>
      <div slot="header" class="clearfix">
        <span>发送补正通知--查看</span>
      </div>
      <el-table :data="list" style="width: 100%;">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="tradeId" label="交易ID"></el-table-column>
        <el-table-column prop="subject" label="主体名称"></el-table-column>
        <el-table-column prop="number" label="证件号码"></el-table-column>
        <el-table-column prop="tstm" label="交易发生日期"></el-table-column>
        <el-table-column prop="tradeType" label="交易类型">
          <template slot-scope="scope">{{ scope.row.tradeType === 0? '大额': '可疑'}}</template>
        </el-table-column>
        <el-table-column prop="ricd" label="报告机构"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <router-link :to="{name:'dataGovernance_tradeDetail_tradeDetail', query: { tradeId: scope.row.tradeId}}">
              <el-button type="text">查 看</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import { viewData } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/notice'
export default {
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    '$route'(to, from) {
      this.getData()
    }
  },
  methods: {
    getData() {
      // const correctId = this.$route.query.correctId
      // viewData(correctId).then(res => {
      //   if (res.code === 200) {
      //     this.list = res.data.list
      //     this.total = res.data.total
      //   }
      // }).catch(() => {})
    },
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.nTradeList {
  position: relative;
}
</style>
