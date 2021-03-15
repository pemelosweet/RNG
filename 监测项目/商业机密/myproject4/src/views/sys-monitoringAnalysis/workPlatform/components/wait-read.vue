<template>
  <div class="wait-read"><!--待阅事项模块-->
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-form :model="form" ref="searchForm" :rules="searchRules" :inline="true">
          <el-form-item label="标题：" prop="title" label-width="60px">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="接收日期：" label-width="100px">
            <el-date-picker value-format="yyyy-MM-dd" v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="searchData">查 询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table style="width: 100%" :data="tableData" tooltip-effect="dark">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip>

      </el-table-column>
      <el-table-column label="接收日期" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.createtime}}  <!--| formatTime('{y}-{m}-{d} {h}:{m}:{s}')}-->
        </template>
      </el-table-column>
      <!-- <el-table-column prop="creatorName" label="申请人"></el-table-column>
      <el-table-column prop="senderNames" label="发送人"></el-table-column> -->
      <el-table-column prop="workitemName" label="环节名称"></el-table-column>

      <el-table-column prop="option" label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="{name:'monitoringAnalysisWorkFlow',query:{
            proInstId: scope.row.proInstId,
            workitemId: scope.row.workitemId,
            actInstId: scope.row.actInstId,
            actDefId: scope.row.actDefId,
            readType:'todo'

          }}">
            <el-button type="text">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
    </el-pagination>
  </div>

</template>
<script>
import { operatPlatform } from '@/api/sys-monitoringAnalysis/workFlow/index.js'
import { formatTime } from '@/utils'
import { ValidQueryInput } from '@/utils/formValidate'
export default {
  component() {
    formatTime
  },
  data() {
    return {
      form: {
        title: '',
        date: '',
        readType: 'doneAndFinished'
      },
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      searchRules: {
        title: [{ validator: ValidQueryInput, trigger: 'blur' }]
      }
    }
  },
  filters: {
    formatTime(date, option) {
      return formatTime(date, option)
    }
  },
  computed: {
    paramsObj() {
      const obj = Object.assign({}, this.form, this.pageInfo)
      delete obj.date
      delete obj.total
      if (this.form.date) {
        obj.startTime = this.form.date[0]
        obj.endTime = this.form.date[1]
      } else {
        obj.startTime = ''
        obj.endTime = ''
      }
      return obj
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    searchData() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.pageInfo.pageNum = 1
          this.fetchData()
        }
      })
    },
    // 请求数据
    fetchData() {
      operatPlatform(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData(this.searchParams)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData(this.searchParams)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.wait-read {
  .el-form--inline .el-form-item {
    margin-bottom: 8px;
    margin-right: 0px;
  }
}
</style>
