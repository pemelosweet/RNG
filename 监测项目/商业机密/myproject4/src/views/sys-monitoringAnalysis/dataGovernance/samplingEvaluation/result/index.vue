<template>
  <div class="samplingResult">
    <el-card>
      <div slot="header">
        <span>抽样评价结果</span>
      </div>
      <el-form :model="searchForm" ref="searchForm" :rules="searchRules" label-width="140px">
        <el-row>
          <el-col :span="12"> 
            <el-form-item label="版本号：" prop="versionNumber" >
              <el-select v-model="searchForm.versionNumber" placeholder="请选择版本号" style="width: 100%" clearable>
                <el-option v-for="(item, index) in versionNumberOptions" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可疑交易报告名称：" prop="suspiciousName">
              <el-input v-model="searchForm.suspiciousName" placeholder="请输入可疑交易报告名称"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所在处室：">
              <!-- <el-select v-model="searchForm.scoringService" placeholder="请选择评分处室" style="width: 100%" clearable>
                <el-option v-for="(item, index) in serviceOptions" :key="index" :label="item.text" :value="item.text"></el-option>
              </el-select> -->
              <el-cascader v-model="searchForm.scoringService" :options="serviceOptions" :props="myprops" :show-all-levels="false" clearable style="width: 100%;"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评价人员：" prop="rater">
              <el-input v-model="searchForm.rater" placeholder="请输入评分人员"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构：" prop="levelType">
              <el-select clearable v-model="searchForm.levelType" @change="clearCustStr" placeholder="请选择" style="width:100% !important;">
                <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0" prop="Cust">
              <el-select clearable v-model="searchForm.Cust" multiple @focus="custFocus" placeholder="请选择" style="width:100% !important;" @change="typeChange">
                <el-option v-for="(item,index) in typeDate" :key="index" :label="item.text" :value="item.value" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
                <el-select clearable v-model="searchForm.str" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="optionLoading" style="width:100% !important;">
                <el-option
                  v-for="item in rinmOptions"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="btnalign">
            <el-button type="primary" @click="statisticsBtn">统 计</el-button>
            <el-button type="primary" @click="queryBtn">查 询</el-button>
            <el-button type="primary" plain @click="clearForm">清 空</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div>可疑交易报告列表</div> -->
      <el-table :data="tableData" :row-class-name="tableRowClassName" v-loading="tabLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="version" label="版本" show-overflow-tooltip width="180" key="880"></el-table-column>
        <el-table-column prop="transactionName" label="可疑交易报告名称" v-if="!queryType" show-overflow-tooltip width="400" key="881"></el-table-column>
        <el-table-column label="可疑交易报告名称" v-if="queryType" width="400" key="882">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.transactionName" placement="top">
              <el-button type="text" @click="queryHistoryFn(scope.row)">{{ scope.row.transactionName }}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="affiliate" label="所属机构" show-overflow-tooltip width="280" key="883"></el-table-column>
        <el-table-column prop="rept" label="报告时间" show-overflow-tooltip width="100" key="884"></el-table-column>
        <el-table-column prop="suspiciousDescription" label="可疑描述" show-overflow-tooltip width="300" key="885"></el-table-column>
        <el-table-column label="评价指标（100）" v-if="!queryType" min-width="130" key="893">
          <template v-if="tableData.length > 0">
            <el-table-column v-for="(item, index) in tableData[0].idexs" :key="index" :label="item.indexName + '(' + item.fullMarks + ')'" width="300" show-overflow-tooltip>
              <template slot-scope="scope">
                {{tabDataMap(scope.$index)[index]}}
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column label="评价指标（100）" v-if="queryType" min-width="130" key="894">
          <template v-if="tableData.length > 0">
            <el-table-column v-for="(item, index) in tableData[0].idexes" :key="index" :label="item.indexName + '(' + item.fullMarks + ')'" width="300" show-overflow-tooltip>
              <template slot-scope="scope">
                {{tabDataMap(scope.$index)[index]}}
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column prop="totalScore" label="总分" v-if="queryType" show-overflow-tooltip width="100" key="886"></el-table-column>
        <el-table-column prop="totalScore" label="平均分" v-if="!queryType" show-overflow-tooltip width="100" key="887"></el-table-column>
        <el-table-column prop="remarks" label="备注" show-overflow-tooltip width="100" key="888"></el-table-column>
        <el-table-column prop="location" v-if="queryType" label="所在处室" show-overflow-tooltip width="100" key="889"></el-table-column>
        <el-table-column prop="evaluator" v-if="queryType" label="评价人员" show-overflow-tooltip width="100" key="890"></el-table-column>
        <el-table-column prop="evaluationDate" v-if="queryType" label="评价时间" show-overflow-tooltip width="100" key="891"></el-table-column>
        <el-table-column prop="evaluationCount" v-if="statisticsType" label="评价次数" show-overflow-tooltip width="100" key="892"></el-table-column>
      </el-table>
      <el-row>
        <el-col :span="8" v-if="queryType"><el-button type="primary" @click="queryDownloadBtn" :disabled="tableData.length < 1">下载</el-button></el-col>
        <el-col :span="8" v-if="statisticsType"><el-button type="primary" @click="statisticsDownloadBtn" :disabled="tableData.length < 1">下载</el-button></el-col>
        <el-col :span="16">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { listInfo, versionList, statistics } from '@/api/sys-monitoringAnalysis/dataGovernance/samplingEvaluetion/querySer.js'
import { listRinm } from '@/api/sys-monitoringAnalysis/evaluate/mechanismTemplate.js'
import {
  getIndustryFrist,
  getIndustrySecond
  // getRinmList
} from '@/api/sys-monitoringAnalysis/dataGovernance/common/tradeDetailLarge.js'
import { getToken } from '@/utils/auth'
import { ValidQueryInput } from '@/utils/formValidate'
import { getTree } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  data() {
    return {
      myprops: {
        label: 'text',
        value: 'text',
        children: 'children'
      },
      serviceOptions: [],
      tabLoading: false,
      paramForm: {},
      allSelect: [],
      options: [],
      typeDate: [],
      rinmOptions: [],
      optionLoading: false,
      mechanismOptions: [],
      versionNumberOptions: [],
      searchForm: {
        levelType: '',
        Cust: [],
        str: [],
        versionNumber: '',
        suspiciousName: '',
        mechanism: '',
        scoringService: [],
        rater: ''
      },
      statisticsType: false,
      queryType: true,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableHeader: [
        { prop: 'version', label: '版本' },
        { prop: 'transactionName', label: '可疑交易报告名称' },
        { prop: 'affiliate', label: '所属机构' },
        { prop: 'evaluationDate', label: '报告时间' },
        { prop: 'suspiciousDescription', label: '可疑描述' },
        { prop: 'aaaaa', label: '评价指标（100）', children: true },
        { prop: 'totalScore', label: '总分' },
        { prop: 'remarks', label: '备注' },
        { prop: 'location', label: '所在处室' },
        { prop: 'evaluator', label: '评价人员' },
        { prop: 'evaluationDate', label: '评价时间' },
        { prop: 'evaluationDate', label: '评价次数' }
      ],
      tableData: [],
      // 默认开始页码
      currentPage: 1,
      // 每页显示条数
      pagesize: 10,
      multipleSelection: [],
      token: getToken(),
      searchRules: {
        versionNumber: [{ required: true, message: '请选择版本号', trigger: 'change' }],
        suspiciousName: [{ validator: ValidQueryInput, trigger: 'blur' }],
        rater: [{ validator: ValidQueryInput, trigger: 'blur' }]
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  mounted() {
    this.initDropDown()
    if (this.$route.query.levelType !== undefined) {
      this.tabLoading = true
      this.searchForm = Object.assign({}, this.$route.query)
      this.paramForm = Object.assign({}, this.searchForm)
      this.queryData()
    }
  },
  methods: {
    copyTransactionName(row, column, event) {
      console.log(event)
      var tag = document.createElement('input')
      tag.setAttribute('id', 'cp_hgz_input')
      tag.value = row.transactionName
      document.getElementsByTagName('body')[0].appendChild(tag)
      document.getElementById('cp_hgz_input').select()
      document.execCommand('copy')
      document.getElementById('cp_hgz_input').remove()
      event.view.preventDefault()
    },
    clearForm() {
      // this.tableData = []
      this.searchForm = {
        levelType: '',
        Cust: [],
        str: [],
        versionNumber: '',
        suspiciousName: '',
        mechanism: '',
        scoringService: [],
        rater: ''
      }
      setTimeout(() => {
        this.$refs.searchForm.clearValidate()
      }, 0)
    },
    typeChange(val) {
      this.allSelect = []
      for (const item of this.typeDate) {
        if (item.value !== 'ALL') {
          this.allSelect.push(item.value)
        }
      }
      if (val.includes('ALL')) {
        this.typeDate.map(item => {
          if (item.value === 'ALL') {
            this.searchForm.Cust = ['ALL']
            item.disabled = false
          } else {
            item.disabled = true
          }
        })
      } else {
        this.typeDate.map(item => {
          item.disabled = false
        })
      }
    },
    clearCustStr() {
      this.searchForm.Cust = []
    },
    custFocus() {
      this.typeDate = []
      if (this.searchForm.levelType === '') {
        this.typeDate = []
        this.searchForm.Cust = []
      } else {
        getIndustrySecond({ type: this.searchForm.levelType }).then(res => {
          if (res.code === 200) {
            this.typeDate = res.data
            this.typeDate.unshift({
              text: '所有选项',
              value: 'ALL'
            })
            this.typeChange(this.searchForm.Cust)
          }
        })
      }
    },
    remoteMethod(query) {
      if (this.searchForm.Cust.length > 0 || this.searchForm.levelType !== '') {
        if (query !== '') {
          this.optionLoading = true
          let category = ''
          let keyword = ''
          category = this.searchForm.Cust.includes('ALL') ? this.allSelect.join() : this.searchForm.Cust.join()
          keyword = query
          setTimeout(() => {
            listRinm(category, keyword)
              .then(res => {
                if (res.code === 200) {
                  this.optionLoading = false
                  this.rinmOptions = res.data.filter(item => {
                    return item.text.toLowerCase()
                      .indexOf(query.toLowerCase()) > -1
                  })
                }
              })
              .catch()
          }, 200)
        } else {
          this.rinmOptions = []
        }
      }
    },
    tabDataMap(index) {
      const arr = []
      if (this.queryType) {
        this.tableData[index].idexes.map(item => {
          arr.push(item.samplingIndexScore.score)
        })
      } else {
        this.tableData[index].idexs.map(item => {
          arr.push(item.score)
        })
      }
      return arr
    },
    tableRowClassName({ row, rowIndex }) {
      // this.tableData.index = rowIndex
    },
    // 查看
    queryHistoryFn(row) {
      this.$router.push({
        name: 'dataGovernance_samplingEvaluation_queryHistoryResults',
        query: {
          id: row.transactionReportId,
          datas: JSON.stringify(this.paramForm)
        }
      })
    },
    // 查询下载
    queryDownloadBtn() {
      let str = ''
      for (const i in this.getParamter()) {
        str += i + '=' + this.getParamter()[i] + '&'
      }
      location.href = 'monitor/statistical/downList?' + str + 'token=' + this.token
    },
    // 统计下载
    statisticsDownloadBtn() {
      let str = ''
      for (const i in this.getParamter()) {
        str += i + '=' + this.getParamter()[i] + '&'
      }
      location.href = 'monitor/statistical/downStatistics?' + str + 'token=' + this.token
    },
    // 初始下拉

    initDropDown() {
      // 版本号
      versionList().then(res => {
        if (res.code === 200) {
          this.versionNumberOptions = res.data
        }
      })
      getIndustryFrist().then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
      getTree().then(res => {
        if (res.code === 200) {
          res.data.children.map(item => {
            if (item.code === 'center') {
              this.serviceOptions.push(item)
            }
            if (item.code === 'branch') {
              this.serviceOptions.push(item)
            }
          })
          this.serviceOptions.map(item => {
            item.children.forEach(el => {
              if (el.children.length === 0) {
                delete el.children
              }
            })
          })
        }
      })
    },
    getParamter() {
      const obj = {
        version: this.searchForm.versionNumber,
        transactionName: this.searchForm.suspiciousName,
        ficp: this.searchForm.levelType,
        category: this.searchForm.Cust.includes('ALL') ? this.allSelect.join() : this.searchForm.Cust.join(),
        ricd: this.searchForm.str.join(),
        location: this.searchForm.scoringService.length === 0 ? '' : this.searchForm.scoringService[1],
        evaluator: this.searchForm.rater
      }
      return obj
    },
    // 统计
    statisticsBtn() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.tabLoading = true
          this.statisticsType = true
          this.queryType = false
          statistics(this.getParamter()).then(res => {
            if (res) {
              this.tabLoading = false
              if (res.code === 200) {
                let arr = []
                res.data.map(item => {
                  arr = arr.concat(item)
                })
                this.tableData = arr
              }
            } else {
              this.tabLoading = false
            }
          })
        } else {
          return false
        }
      })
    },
    queryData() {
      listInfo(this.getParamter()).then(res => {
        if (res) {
          if (res.code === 200) {
            this.tabLoading = false
            let arr = []
            res.data.map(item => {
              arr = arr.concat(item)
            })
            this.tableData = arr
          } else {
            this.tabLoading = false
          }
        } else {
          this.tabLoading = false
        }
      })
    },
    // 查询
    queryBtn() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.tabLoading = true
          this.paramForm = Object.assign({}, this.searchForm)
          this.queryType = true
          this.statisticsType = false
          this.queryData()
        } else {
          return false
        }
      })
    },
    handleSizeChange(size) {
      this.pagesize = size
      console.log(`每页 ${size} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // this.title = '已选当前页' + this.multipleSelection.length + '项'
    }
  }
}
</script>

<style lang="scss">
.samplingResult {
  .btnalign {
    text-align: right;
  }
}
</style>
