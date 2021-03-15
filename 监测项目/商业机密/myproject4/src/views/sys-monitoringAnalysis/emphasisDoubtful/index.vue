<template>
  <div class="emphasisDoubtful-index"
   v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-card>
      <div slot="header">
        <span>重点可疑交易报告核对</span>
      </div>

      <el-form
        :model="form"
        inline
        class="search"
      >
        <el-form-item label="时间范围：">
          <!-- <el-date-picker
      v-model="form.dateRange"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份">
    </el-date-picker> -->
    <el-date-picker
      v-model="form.dateRange"
      type="monthrange"
      range-separator="-"
      start-placeholder="开始月份"
      value-format="yyyy-MM"
      unlink-panels
      end-placeholder="结束月份">
    </el-date-picker>
          <!-- <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="至"
            format="yyyy-MM"
            value-format="yyyy-MM"
          ></el-date-picker> -->
        </el-form-item>
        <el-form-item label="分支机构：">
          <!-- <el-input v-if="this.user_riid" v-model="form.localBank" :disabled="true"></el-input> -->
          <el-select
          clearable
            :disabled="isDisabled"
            v-model="form.localBank"
            placeholder="请选择"
          >
            <el-option
              v-for="item in localBankArr"
              :key="item.codeId"
              :label="item.codeName"
              :value="item.codeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          @click="searchData"
        >查 询</el-button>
      </el-form>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
      >
        <el-table-column
          label="ID"
          type="index"
        ></el-table-column>
        <el-table-column
          label="可疑客户名称"
          prop="ctnm"
          show-overflow-tooltip
          min-width="140px"
        ></el-table-column>
        <el-table-column
          label="证件类型"
          prop="citp"
          min-width="120px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="证件号码"
          prop="ctid"
          min-width="120px"
          show-overflow-tooltip=""
        ></el-table-column>
        <!-- <el-table-column label="时间" prop="acceptMonth" min-width="120px" show-overflow-tooltip=""></el-table-column> -->
        <el-table-column
          label="本期报告份数"
          prop="reptNum"
          min-width="100px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="累计报告份数"
          prop="reptTotalNum"
          min-width="100px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="报告机构名称"
          prop="ricd"
          min-width="140px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="报告机构所在地"
          prop="firc"
          min-width="140px"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <el-row>
        <el-col :span="8">
          <el-button
            type="primary"
            plain
            @click="exportData"
          >导 出</el-button>
        </el-col>
        <el-col :span="16">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNum"
            :page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            background
          >
          </el-pagination>
        </el-col>
      </el-row>

    </el-card>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getList } from '@/api/sys-monitoringAnalysis/emphasisDoubtful/query.js'
import { mapGetters } from 'vuex'
import { branch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
export default {
  data() {
    return {
      loading: false,
      form: {
        dateRange: [],
        localBank: ''
      },
      isDisabled: false,
      token: getToken(),
      localBankArr: [],
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'institution', 'user_riid']),
    // ...mapGetters([
    //   'businessFlag',
    //   'workFlow2business',
    //   'userInfo',
    //   'institution',
    //   'permissions_routers'
    // ]),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    },
    paramsObj() {
      if (this.isBranch) {
        this.form.localBank = this.user_riid
        console.log(this.form.localBank)
        this.isDisabled = true
      }
      const obj = Object.assign({}, this.form, this.pageInfo)
      const newObj = {
        localBank: obj.localBank,
        // startAcceptMonth: obj.dateRange.length !== 0 ? obj.dateRange[0] : '',
        // endAcceptMonth: obj.dateRange.length !== 0 ? obj.dateRange[1] : '',
        pageNum: obj.pageNum,
        pageSize: obj.pageSize
      }
      if (obj.dateRange === null) {
        newObj.startAcceptMonth = ''
        newObj.endAcceptMonth = ''
      } else {
        newObj.startAcceptMonth = obj.dateRange[0]
        newObj.endAcceptMonth = obj.dateRange[1]
      }
      console.log(newObj)
      return newObj
    }
  },
  mounted() {
    this.fetchData()
    this.getBranch()
  },
  methods: {
    // 是否为分支机构
    roleJudgment() {
      if (this.isBranch) {
        this.form.localBank = this.user_riid
        console.log(this.form.localBank)
        this.isDisabled = true
      }
    },
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJGD' }).then(res => {
        if (res.code === 200) {
          this.localBankArr = res.data.list
        }
      })
    },
    // 查询
    searchData() {
      this.fetchData()
    },
    // 导出
    exportData() {
      if (this.tableData.length === 0) {
        this.$message({
          message: '无导出数据',
          type: 'warning'
        })
      } else {
        const startTime = this.form.dateRange.length !== 0 ? this.form.dateRange[0] : ''
        const endTime = this.form.dateRange.length !== 0 ? this.form.dateRange[1] : ''
        location.href = `/monitor/keysus/export?startAcceptMonth=${startTime}&endAcceptMonth=${endTime}&localBank=${
          this.form.localBank
        }&token=${this.token}`
      }
    },
    fetchData1() {
      this.loading = true
      getList(this.paramsObj).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    fetchData() {
      this.loading = true
      this.pageInfo.pageNum = 1
      getList(this.paramsObj).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData1()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData1()
    }
  }
}
</script>

<style lang="scss">
.emphasisDoubtful-index {
  .search {
    .el-form-item {
      margin-right: 40px;
    }
  }
}
</style>