<template>
  <div class="reportLibrarystatistics">
    <el-card>
      <div slot="header">
        <span>统计</span>
      </div>
        <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="上报分支行：" prop="localBank">
              <!-- <el-input v-model="searchForm.localBank" :disabled="deptDisable" placeholder="上报分支行"></el-input> -->
              <el-select clearable :disabled="deptDisable" v-model="searchForm.localBank" filterable placeholder="请选择">
                <el-option v-for="item in localBankArr" :key="item.codeId" :label="item.codeName" :value="item.codeName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上报时间：" prop="date"> 
              <el-date-picker
                v-model="searchForm.date"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库存情况：" label-width="120px" prop="stockFlag">
              <el-select v-model="searchForm.stockFlag" clearable placeholder="请选择">
                <el-option value="0" label="已存在"></el-option>
                <el-option value="1" label="不存在"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="textAlign:right;margin-bottom:10px;margin-top:10px">
        <el-button type="primary" @click="searchList">查 询</el-button>
        <el-button type="" @click="cleanUp">清 空</el-button>
      </div>
      <el-row>
        <el-col :span="24">
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </el-col>
      </el-row>
      <el-table
        style="margin-top:15px"
        :data="tableData"
        tooltip-effect="dark"
        :row-key="getRowkey"
        v-loading="tableDataLoading" 
        element-loading-text="拼命加载中..." 
        element-loading-spinner="el-icon-loading" 
        element-loading-background="rgba(0, 0, 0, 0.1)"
      >
          <!-- <el-table-column type="selection" width="60" reserve-selection fixed="left"></el-table-column> -->
          <el-table-column type="index" label="序号" width="80" fixed="left"></el-table-column>
          <el-table-column prop="branch" label="上报分支行" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="reportNum" label="上报数量" min-width="150" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :total="pageInfo.total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { branch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
import { query } from '@/api/sys-monitoringAnalysis/reportEmphasisDoubtful/statistics.js'
import { getDeptName } from '@/api/sys-monitoringAnalysis/report-clues/search.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableDataLoading: false,
      // chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      // specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      // sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      // englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      // englishNullx: /[abcdefghijklmnopqrstuvwyz]/im, // 校验英文
      // numberNull: /[1234567890]/im, // 校验数字
      // blankSpace: /[ ]/im, // 校验空格
      token: getToken(),
      searchForm: {
        date: [],
        localBank: '',
        stockFlag: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      deptDisable: false,
      treadeComName: '',
      tradeDetailVisible: false,
      tradeDialogTitle: '',
      disabled: false,
      tradeDetailInfo: {},
      getRowkey(row) {
        return row.clueId
      },
      tableData: [],
      select_orderId: [],
      localBankArr: []
    }
  },
  computed: {
    ...mapGetters(['roles']),
    paramsObj() {
      const obj = Object.assign({}, this.searchForm)
      delete obj.date
      if (this.searchForm.date.length > 1) {
        obj.startRedt = this.searchForm.date[0]
        obj.endRedt = this.searchForm.date[1]
      } else {
        obj.startRedt = ''
        obj.endRedt = ''
      }

      return obj
    }
  },
  methods: {
    getBranch() {
      branch({ typeId: 'FZJGD' }).then(res => {
        if (res.code === 200) {
          this.localBankArr = res.data.list
        }
      })
    },
    getDeptName() {
      getDeptName().then(res => {
        if (res.code === 200) {
          this.searchForm.localBank = res.data
        }
      })
    },
    exportExcel() {
      if (this.tableData.length > 0) {
        const obj = this.params
        location.href = `monitor/message/count-export?stockFlag=${obj.stockFlag}&localBank=${obj.localBank}&startRedt=${obj.startRedt}&endRedt=${obj.endRedt}&token=${this.token}`
      } else {
        this.$message({
          message: '暂无导出数据',
          type: 'warning'
        })
      }
    },
    // 清空搜索条件
    cleanUp() {
      this.searchForm = {
        date: [],
        stockFlag: '',
        localBank: this.searchForm.localBank
      }
      this.$refs.searchForm.resetFields()
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData()
    },
    // 请求数据
    fetchData() {
      this.tableDataLoading = true
      this.params = Object.assign({}, this.params, this.pageInfo)
      query(this.params).then(res => {
        if (res.code === 200) {
          this.tableData = []
          this.pageInfo.total = res.data.results.total
          this.JudgmentData = res.data.codes
          this.branchData = res.data.brankName.data
          this.listData = res.data.results.list
          this.columnData = [
            {
              label: '序号',
              type: true,
              width: 60
            },
            {
              label: '分支机构',
              prop: 'branch',
              width: 190
            }
          ]
          this.JudgmentData.forEach((el, index) => {
            const item = el.toString()
            const obj = {
              label: item,
              prop: item
            }
            this.columnData = this.columnData.concat(obj)
          })
          this.listData.forEach((el, index) => {
            const item = el
            const obj = {
              branch: item.codeName
            }
            const obj3 = res.data.results.list[index]
            const objs = Object.assign({}, obj, obj3)
            this.tableData = this.tableData.concat(objs)
          })
          console.log(this.columnData)
          console.log(this.tableData)
          this.tableDataLoading = false
        } else {
          this.tableDataLoading = false
        }
      }).catch(() => {
        this.tableDataLoading = false
      })
    },
    // 查寻
    searchList() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.pageInfo.pageNum = 1
          this.params = Object.assign({}, this.paramsObj, this.pageInfo)
          this.fetchData()
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    // this.fetchData()
    this.getBranch()
    if (this.roles === 'branch') {
      this.getDeptName()
      this.deptDisable = true
    }
  }
}
</script>

<style  lang="scss">
.reportLibrarystatistics {
  .el-select {
    width: 100%;
  }
  .specialFormItem {
    .el-form-item__label {
      line-height: 40px;
    }
    .el-tabs__nav-wrap::after{
      height: 0

    }
  }
  .tableCell{
    text-align: left; 
    overflow:hidden; 
    white-space: nowrap; 
    text-overflow:ellipsis;
  }
}
</style>
