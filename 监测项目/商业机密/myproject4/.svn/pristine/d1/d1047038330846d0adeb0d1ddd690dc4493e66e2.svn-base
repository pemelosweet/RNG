<template>
  <div>
    <el-card>
      <div slot="header">
        <span>行政调查数据收集情况统计</span>
      </div>
      <el-form :model="form" inline>
        <el-form-item label="日期：" >
          <el-date-picker v-model="form.date"  value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" unlink-panels>
          </el-date-picker>                  
        </el-form-item>
         <el-form-item label="分支机构：" prop="branchBank">
          <el-select :disabled="isDisabled" style="width:100%;" clearable v-model="form.branchBank" filterable allow-create default-first-option placeholder="请选择分支机构">
            <el-option v-for="(item,index) in branchData" :key="index" :label="item.codeName" :value="item.codeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="margin-left:20px" @click="searchData"> 统 计</el-button>
      </el-form>

      <el-table :data="tableData">
        <el-table-column label="分支机构名称" prop="branchBank"></el-table-column>
        <el-table-column label="上传次数" prop="upNum"></el-table-column>
        <el-table-column label="涉及主体数" prop="mainNum"></el-table-column>
        <el-table-column label="涉及账户数" prop="accountNum"></el-table-column>
      </el-table>
      <el-row>
        <el-col :span="8">
          <el-button style="margin-top:10px" @click="exportData" type="primary" plain>全部导出</el-button>
        </el-col>
        <el-col :span="16">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { getTotal } from '@/api/sys-monitoringAnalysis/administration-collect/query.js'
import { branch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        date: '',
        branchBank: ''
      },
      isDisabled: false,
      tableData: [],
      branchData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      token: getToken()
    }
  },
  computed: {
    ...mapGetters(['name', 'institution', 'user_riid']),
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    },
    paramsObj() {
      if (this.isBranch) {
        this.form.branchBank = this.user_riid
        console.log(this.form.branchBank)
        this.isDisabled = true
      }
      const obj = Object.assign({}, this.form)
      delete obj.total
      delete obj.date
      obj.pageNum = this.pageInfo.pageNum
      obj.pageSize = this.pageInfo.pageSize
      obj.branchBank = this.form.branchBank
      if (this.form.date) {
        obj.uploadDtStart = this.form.date[0]
        obj.uploadDtEnd = this.form.date[1]
      } else {
        obj.uploadDtStart = ''
        obj.uploadDtEnd = ''
      }

      return obj
    }
  },
  mounted() {
    this.fetchData()
    this.getBranch()
  },
  methods: {
    searchData() {
      this.fetchData()
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData()
    },
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJGD' }).then(res => {
        if (res.code === 200) {
          this.branchData = res.data.list
        }
      })
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData()
    },
    // 请求数据
    fetchData() {
      getTotal(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
      })
    },
    //
    exportData() {
      location.href = `/monitor/admInvestigation/exportBatch?beginDate=${
        this.paramsObj.uploadDtStart
      }&endDate=${this.paramsObj.uploadDtEnd}&token=${this.token}&branchBank=${this.form.branchBank}`
    }
  }
}
</script>
<style lang="scss">
</style>


