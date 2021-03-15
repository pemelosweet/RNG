<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>预警结果列表</span>
    </div>
    <div class="content">
      <el-form :model="form" label-width="110px" ref="searchForm" :rules="searchRules" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="预警任务名称" prop="wJName">
              <el-input v-model="form.wJName" maxlength="50" placeholder="最长50字符数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监测周期">
              <el-date-picker v-model="form.monitorCycle" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offet="2" style="margin-left:40px">
            <el-button type="primary" @click='searchList'>查询</el-button>
            <el-button type="primary" plain @click="cleanUp">清空</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)" 
        style="width: 100%" 
        :data="tableData">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="wJName" label="预警任务" min-width="140"></el-table-column>
        <el-table-column prop="creDt" label="创建日期" width="140"></el-table-column>
        <el-table-column prop="creUser" label="创建人" min-width="140"></el-table-column>
        <el-table-column label="预警程度" min-width="140">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.listWarnJobRuleDos" :key="index">
              <span class="mark-span" v-if="item.warnLevel == '1'" style="background:#67C23A"></span>
              <span class="mark-span" v-else style="background:#F56C6C"></span>
              <span>{{item.warnLevel == '1'?'平急':'紧急'}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="预警结果" min-width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.listWarnResult8ADOS" v-for="(item, index) in scope.row.listWarnResult8ADOS" :key="index">
              <el-button type="text" @click="showDetail(scope,item)">{{item.batchdt}}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="collect(scope)">定期汇总</el-button>
            <el-button type="text" @click="showAll(scope)">查看更多</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
      </el-pagination>
    </div>
  </el-card>

</template>

<script>
import { getTable } from '@/api/sys-monitoringAnalysis/roster-warning/warning-result.js'
import { ValidQueryInput } from '@/utils/formValidate'
export default {
  data() {
    return {
      form: {
        wJName: '',
        monitorCycle: ''
      },
      tableData: [],
      params: {},
      loading: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchRules: {
        wJName: [{ validator: ValidQueryInput, trigger: 'blur' }]
      }
    }
  },
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form)
      delete obj.total
      delete obj.monitorCycle
      if (this.form.monitorCycle) {
        obj.startCreDate = this.form.monitorCycle[0]
        obj.endCreDate = this.form.monitorCycle[1]
      } else {
        obj.startCreDate = ''
        obj.endCreDate = ''
      }

      return obj
    }
  },
  mounted() {
    if (sessionStorage.getItem('searchData')) {
      const searchData = JSON.parse(sessionStorage.getItem('searchData'))
      if (searchData.pageName === this.$route.name && searchData.isReview) {
        this.pageInfo = searchData.pageInfo
        this.form = searchData.searchForm
        this.params = searchData.params
        this.toggleSearch = false
      }
    }
    sessionStorage.removeItem('searchData')
    this.fetchData()
  },
  methods: {
    searchList() {
      this.$refs.searchForm.validate(val => {
        if (val) {
          this.pageInfo.pageNum = 1
          this.params = Object.assign({}, this.searchParams, this.pageInfo)
          this.fetchData()
        }
      })
    },
    // 请求列表数据
    fetchData() {
      this.loading = true
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.$refs.searchForm.validate(val => {
        if (val) {
          getTable(this.params)
            .then(res => {
              if (res.code === 200) {
                this.tableData = res.data.list
                this.pageInfo.total = res.data.total
                this.loading = false
              } else {
                this.loading = false
              }
            })
            .catch(err => {
              this.loading = false
              console.log(err)
            })
        }
      })
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
    collect(scope) {
      const searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.form,
        params: this.params
      }
      sessionStorage.setItem('searchData', JSON.stringify(searchData))
      this.$router.push({ name: 'forewarningEnd_more', query: { taskId: scope.row.wJId, ruleId: scope.row.listWarnJobRuleDos[0].ruleId, batchdt: '' }, params: { type: 'period-summarize' }})
    },
    showAll(scope) {
      const searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.form,
        params: this.params
      }
      sessionStorage.setItem('searchData', JSON.stringify(searchData))
      this.$router.push({ name: 'forewarningEnd_more', query: { taskId: scope.row.wJId, ruleId: scope.row.listWarnJobRuleDos[0].ruleId, batchdt: '' }, params: { type: 'more' }})
    },
    showDetail(scope, item) {
      const searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.form,
        params: this.params
      }
      sessionStorage.setItem('searchData', JSON.stringify(searchData))
      this.$router.push({ name: 'forewarningEnd_detail', query: { taskId: scope.row.wJId, ruleId: scope.row.listWarnJobRuleDos[0].ruleId, batchdt: item.batchdt, ruleName: scope.row.wJName }})
    },
    cleanUp() {
      this.$refs.searchForm.resetFields()
      this.form = {
        wJName: '',
        monitorCycle: ''
      }
    }
  }
}
</script>

<style lang="scss">
.box-card{
  .mark-span {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    vertical-align: 1px;
  }
}

</style>
