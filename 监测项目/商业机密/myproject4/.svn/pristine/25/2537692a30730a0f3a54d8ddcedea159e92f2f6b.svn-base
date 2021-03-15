<template>
  <div>
    <el-card>
      <div slot="header">
        <span>跨境协查申请统计</span>
      </div>
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
             <el-form-item label="日期：" label-width="60px">
          <el-date-picker value-format="yyyy-MM-dd" v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" unlink-panels>
          </el-date-picker>
         
        </el-form-item>
          </el-col>
          <el-col  :span="12">
          <el-button type="primary" style="margin-left:20px;" @click="onSubmit"> 统 计</el-button>
          </el-col>
        </el-row>
       
      </el-form>

      <el-table :data="tableData">
        <el-table-column label="分支机构名称" prop="branchBank"></el-table-column>
        <el-table-column label="申请次数" prop="applyNum"></el-table-column>
        <el-table-column label="涉及主体数" prop="mainNum"></el-table-column>
        <el-table-column label="涉及账户数" prop="accountNum"></el-table-column>
        <!-- <el-table-column label="交易笔数" prop="tradeNo"></el-table-column>
        <el-table-column label="交易金额（万元）" prop="amount"></el-table-column> -->
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
      </el-pagination>

    </el-card>

  </div>

</template>
<script>
import { statistics } from '@/api/sys-monitoringAnalysis/analysisSpecial/index2.js'
export default {
  data() {
    return {
      form: {
        date: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      tableData: []
    }
  },
  // 列表查询参数
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form, this.pageInfo)
      delete obj.date
      delete obj.total
      if (this.form.date) {
        obj.uploadDtStart = this.form.date[0]
        obj.uploadDtEnd = this.form.date[1]
      }
      return obj
    }
  },
  methods: {
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.initList(this.searchParams)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.initList(this.searchParams)
    },
    // 获取列表
    initList(params) {
      console.log(params)
      statistics(params).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.pageInfo.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    onSubmit() {
      this.initList(this.searchParams)
    }
  },
  mounted() {
    this.initList(this.searchParams)
  }
}
</script>
<style lang="scss">
</style>


