<template>
  <div class="scaningwrap">
    <el-card>
      <div slot="header"> 
        <span>扫描问题处理</span>   
      </div>
      <el-form :model="searchForm" ref="searchForm" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="扫描规则：" prop="scanId">
              <el-select v-model="searchForm.scanId" placeholder="扫描规则" filterable clearable style="width: 100%;">
                <el-option v-for="(item,index) in ruleOptions" :key="index" :label="item.srName" :value="item.srId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业类型：" prop="industryType">
              <el-select v-model="searchForm.industryType" placeholder="行业类型" filterable clearable style="width: 100%;">
                <el-option v-for="(item,index) in industryTypeOptionsSearch" :label="item.text" :value="item.text" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="扫描时间：" prop="scanDate">
              <el-date-picker v-model="searchForm.scanDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="报告机构：" prop="operator">
              <el-autocomplete v-model="searchForm.operator" value-key="rinm" placeholder="报告机构" :fetch-suggestions="querySearchRinm" :trigger-on-focus="false" style="width: 100%;" @select="handleRinmSelect"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易类型：" prop="transactionType">
              <el-select v-model="searchForm.transactionType" clearable style="width: 100%;" placeholder="交易类型">
                <el-option label="大额" value="0"></el-option>
                <el-option label="可疑" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易ID：" prop="transactionId">
              <el-input v-model="searchForm.transactionId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btnalign">
          <el-button type="primary" @click="handleQuery" :loading="loading">查 询</el-button>
          <el-button type="primary" plain @click="resetForm('searchForm')">清 空</el-button>
        </div>
      </el-form>
      <el-row class="btnrow">
        <span>扫描问题列表：</span>
        <!-- <el-button type="primary" @click="autoClean" plain>自动清理</el-button> -->
        <el-button type="primary" @click="handelCorrection" plain>人工补正</el-button>
        <el-button type="primary" plain @click="handleAllExport">批量导出</el-button>
        <span style="color: #f56c6c; font-size: 12px; margin-left: 10px;">列表默认只显示当天的扫描问题数据</span>
      </el-row>
      <el-table style="width: 100%" :data="list" @selection-change="handleSelectionChange" v-loading="listLoading" element-loading-text="正在查询，请稍候……" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column type="index" label="序号" min-width="55" fixed></el-table-column>
        <el-table-column prop="tradeId" label="交易ID" min-width="110">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{ scope.row.tradeId }}</div>
              <span>{{ scope.row.tradeId }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="ctnm" label="主体名称" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ctid" label="证件号码" min-width="140">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{ scope.row.ctid }}</div>
              <span>{{ scope.row.ctid }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="tstm" label="交易发生日期" min-width="110"></el-table-column>
        <el-table-column prop="type" label="交易类型" min-width="90">
          <template slot-scope="scope">
            {{scope.row.type === 'BH' || scope.row.type === 'IH' || scope.row.type === 'SH' ? '大额' : '可疑'}}
          </template>
        </el-table-column>
        <el-table-column prop="ricdName" label="报告机构" min-width="100">
           <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{ scope.row.ricdName }}</div>
              <span>{{ scope.row.ricdName }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="induType" label="行业类型" min-width="110"></el-table-column>
        <el-table-column prop="scanName" label="扫描规则" min-width="130">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{ scope.row.scanName }}</div>
              <span>{{ scope.row.scanName }}</span>
            </el-tooltip>
          </template>
        </el-table-column> 
        <el-table-column prop="scanTime" label="扫描时间" min-width="100"></el-table-column>
        <el-table-column prop="markState" label="标注状态" min-width="80">
          <template slot-scope="scope">
            {{ scope.row.markState === 0 ? '未标注' : '已标注' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="100">
          <template slot-scope="scope">
            <!-- <router-link :to="{name:'dataGovernance_tradeDetail_tradeDetail', query: { tradeId: scope.row.tradeId, type: scope.row.type}}"> -->
              <el-button type="text" @click="handleView(scope)">查看</el-button>      
            <!-- </router-link> -->
            <el-button type="text" @click="delRow(scope)">删除</el-button> 
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
    </el-card>  

    <!-- 自动清理弹框内容 -->
    <el-dialog :visible.sync="cleandialogVisible" width="30%">
      <plan-approval @setCleanVisible="getCleanVisible" :cleanParams="cleanParams" :cleandialogVisible="cleandialogVisible" :cleanMulList="cleanMulList"></plan-approval>
    </el-dialog>

    <!-- 人工补正弹框 -->
    <el-dialog :title="correctionDialogTitle" :visible.sync="dialogVisible" width="80%">
      <component :is="correctionComName" :correctParams="correctParams" @dialogState="closeDialog" :dialogVisible="dialogVisible"></component>
    </el-dialog>

    <monitor-workflow></monitor-workflow>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
// import { getRinmList, industryType } from '@/api/common/industry'
import { getRinmList } from '@/api/common/industry'
import { correctCheck, correctCheckError } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch.js'
import { getUUIDTo } from '@/utils/index.js'
import { getList, getRuleList, delRowList, industryXu } from '@/api/sys-monitoringAnalysis/dataGovernance/rule/scanningMonitor'
import { cleanCheck } from '@/api/sys-monitoringAnalysis/dataGovernance/dataClean/program.js' // 自动清理校验工作流接口
import Large from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/large'
import Suspicious from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/suspicious'
import PlanApproval from '@/views/sys-monitoringAnalysis/dataGovernance/dataClean/components/planApproval.vue'
import { ValidQueryInput } from '@/utils/formValidate.js'

export default {
  components: {
    Large,
    Suspicious,
    PlanApproval
  },
  data() {
    // const isValidDate = (rule, value, callback) => {
    //   if (value) {
    //     if (Date.parse(value[0]) + 3600 * 1000 * 24 * 7 < Date.parse(value[1])) {
    //       callback(new Error('时间跨度为7天'))
    //     } else {
    //       callback()
    //     }
    //   } else {
    //     callback()
    //   }
    // }
    return {
      listLoading: false,
      rules: {
        // scanDate: [{ validator: isValidDate, trigger: 'change' }],
        transactionId: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '最大长度为50位', trigger: 'blur' }
        ],
        operator: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '最大长度为50位', trigger: 'blur' }
        ]
      },
      ricdCode: '',
      searchForm: {
        scanId: '',
        industryType: '',
        scanDate: '',
        operator: '',
        transactionType: '',
        transactionId: ''
      },
      industryTypeOptions: [],
      industryTypeOptionsSearch: [],
      noticeForm: {
        type: ''
      },
      ruleOptions: [],
      correctionComName: null,
      correctionDialogTitle: null,
      cleandialogVisible: false, // 自动清理弹框参数
      dialogVisible: false, // 弹框
      list: [],
      total: 1,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 每页显示条数
      rinmOptions: [], // 报告机构列表
      queryVisiblelist: [],
      multipleSelection: [], // 表格选择项
      msg: {},
      correctParams: {
        tradeId: '',
        correctType: '',
        organ: ''
      }, // 人工补正弹框传值
      cleanParams: {
        tradeId: '',
        reportName: '',
        tradeType: '',
        origin: ''
      }, // 自动清理弹框传值
      cleanMulList: [],
      token: getToken(),
      loading: false,
      UUID: ''
    }
  },
  created() {
    const obj = JSON.parse(sessionStorage.getItem('scaningSearchData'))
    if (obj) {
      if (obj.ifScaningTradeFlag) {
        this.pageInfo = obj.pageInfo
        this.searchForm = obj.searchForm
      }
    }
    sessionStorage.removeItem('scaningSearchData')
    this.init()
  },
  mounted() {
    this.getData()
    this.UUID = getUUIDTo()
  },
  methods: {
    init() {
      industryXu()
        .then(res => {
          // 所属行业
          this.industryTypeOptionsSearch = res.data
        })
        .catch()
      // industryType()
      //   .then(res => {
      //     // 所属行业
      //     this.industryTypeOptions = res.data
      //   })
      //   .catch()

      getRuleList()
        .then(res => {
          if (res.code === 200) {
            this.ruleOptions = res.data
          }
        })
        .catch(() => {})
    },
    getData() {
      const paramsObj = {
        scanId: this.searchForm.scanId,
        industryType: this.searchForm.industryType,
        scanDateStart: this.searchForm.scanDate ? this.searchForm.scanDate[0] : '',
        scanDateEnd: this.searchForm.scanDate ? this.searchForm.scanDate[1] : '',
        operator: this.searchForm.operator ? this.ricdCode : '',
        transactionType: this.searchForm.transactionType,
        transactionId: this.searchForm.transactionId,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        token: this.token
      }
      this.listLoading = true
      getList(paramsObj)
        .then(res => {
          if (res.code === 200) {
            if (res.data) {
              // if (res.data.list.length !== 0) {
              //   res.data.list.map(item => {
              //     if (item.induType) {
              //       this.industryTypeOptions.map(el => {
              //         if (item.induType === el.pkMrot) {
              //           item.induType = el.organType
              //         }
              //       })
              //     }
              //   })
              // }
              this.list = res.data.list
              this.total = res.data.total
            } else {
              this.list = []
              this.total = 0
            }
            this.$nextTick(function() {
              this.loading = false
              this.listLoading = false
            })
          } else {
            this.$nextTick(function() {
              this.loading = false
              this.listLoading = false
            })
          }
        })
        .catch(res => {
          this.$nextTick(function() {
            this.loading = false
            this.listLoading = false
          })
        })
    },
    handleView(scope) {
      const searchData = {
        pageInfo: this.pageInfo,
        searchForm: this.searchForm
      }
      sessionStorage.setItem('scaningSearchData', JSON.stringify(searchData))
      this.$router.push({ name: 'dataGovernance_tradeDetail_tradeDetail', query: { tradeId: scope.row.tradeId, type: scope.row.type, source: 1 }})
    },
    closeDialog(val) {
      // 人工补正组件接收子组件弹框dialogVisible传值
      this.dialogVisible = val
    },
    getCleanVisible(val) {
      this.cleandialogVisible = val
    },
    handleQuery() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.pageInfo.pageNum = 1
          this.getData()
        } else {
          return false
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
    },
    handleRinmSelect(item) {
      if (item) {
        this.ricdCode = item.ricd
      }
    },
    resetForm(formName) {
      this.$refs[formName].clearValidate()
      this.searchForm = {
        scanId: '',
        industryType: '',
        scanDate: '',
        operator: '',
        transactionType: '',
        transactionId: ''
      }
      this.ricdCode = ''
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    querySearchRinm(query, cb) {
      this.$refs['searchForm'].validateField('operator', (valid) => {
        if (!valid) {
          if (query !== '') {
            const paramsObj = {
              industry: this.searchForm.industryType,
              region: 'all',
              rinm: encodeURI(query)
            }
            getRinmList(paramsObj).then(res => {
              if (res.code === 200) {
                cb(res.data)
              }
            })
          } else {
            // this.rinmData = []
          }
        }
      })
    },
    autoClean() {
      // 自动清理
      const length = this.multipleSelection.length
      if (length === 0) {
        this.$confirm('请至少选择一条数据', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      } else if (length === 1) {
        this.getAutoParams(this.multipleSelection)
      } else {
        if (this.isAllScanNameEqual(this.multipleSelection)) {
          this.getAutoParams(this.multipleSelection)
        } else {
          this.$confirm('交易来自不同的扫描规则，不可一起发起自动清理', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
            .then(() => {
              // 向请求服务端删除
            })
            .catch(() => {})
        }
      }
    },
    getAutoParams(mulList) { // 自动清理参数
      this.cleanMulList = []
      const arr = []
      this.cleanParams = {
        origin: '0',
        srId: mulList[0].length !== 0 ? mulList[0].scanId : ''
      }
      mulList.forEach(item => {
        const obj = {
          tradeId: item.tradeId,
          tradeType: item.type === 'BH' || item.type === 'IH' || item.type === 'SH' ? '0' : '1',
          reportBody: item.ricdName,
          reportCode: item.ricd
        }
        arr.push(item.tradeId)
        this.cleanMulList.push(obj)
      })

      cleanCheck(arr.join(',')).then(res => {
        if (res.code === 200) {
          this.cleandialogVisible = true
        } else {
          this.$message.error(res.message)
        }
      }).catch()
    },
    handelCorrection() {
      // 人工补正
      const length = this.multipleSelection.length
      if (length === 0) {
        this.$confirm('请至少选择一条数据', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      } else if (length === 1) {
        this.validateRinmType()
      } else {
        const typeArr = []
        this.multipleSelection.forEach(item => {
          const type = (item.type === 'BH' || item.type === 'IH' || item.type === 'SH') ? '0' : '1'
          typeArr.push(type)
        })

        if (this.isAllEqual(typeArr) === true && this.isAllRinmEqual(this.multipleSelection) === false) {
          this.$confirm('属于不同机构不同交易类型的交易，不可一起发起人工补正', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
        } else if (this.isAllEqual(typeArr) === false && this.isAllRinmEqual(this.multipleSelection) === false) {
          this.$confirm('属于不同机构的交易，不可一起发起人工补正', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
        } else if (this.isAllEqual(typeArr) === false && this.isAllRinmEqual(this.multipleSelection)) {
          this.$confirm('属于不同交易类型的交易，不可一起发起人工补正', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
        } else {
          this.validateRinmType()
        }
      }
    },
    validateRinmType() { // 校验列表有无报告机构和交易类型
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].ricdName === '' || this.multipleSelection[i].ricdName === null) {
          this.$confirm('所选交易的报告机构不能为空！', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
          return false
        } else if (this.multipleSelection[i].type === '' || this.multipleSelection[i].type === null) {
          this.$confirm('所选交易的交易类型不能为空！', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
          return false
        } else {
          this.getCorrectionData()
          return
        }
      }
    },
    isAllEqual(array) { // type
      if (array.length > 0) {
        return !array.some(function(value, index) {
          return value !== array[0]
        })
      } else {
        return true
      }
    },
    isAllRinmEqual(array) { // ricdName
      if (array.length > 0) {
        return !array.some(function(value, index) {
          return value.ricdName !== array[0].ricdName
        })
      } else {
        return true
      }
    },
    isAllScanNameEqual(array) { // scanName
      if (array.length > 0) {
        return !array.some(function(value, index) {
          return value.scanName !== array[0].scanName
        })
      } else {
        return true
      }
    },
    getCorrectionData() {
      const arr = []
      const induArr = []
      const dateArr = []
      this.multipleSelection.map(item => {
        if (new Date(item.redt).getTime() < new Date('2009-01-01 00:00:00').getTime()) {
          dateArr.push(item.tradeId)
        }
        if (item) {
          arr.push(item.tradeId)
          // this.industryTypeOptions.map(el => {
          //   if (item.induType === el.organType) {
          //     induArr.push(el.pkMrot)
          //   }
          // })
          this.industryTypeOptionsSearch.map(el => {
            if (item.induType === el.text) {
              induArr.push(el.pvalue)
            }
          })
          induArr.push(item.induType)
        }
      })
      if (dateArr.length > 0) {
        this.$message({
          type: 'error',
          message: '暂不支持对落地时间为09年1月1日以前的交易发起人工补正，如需补正，请通过信息补充发起。不符合条件的交易ID为：' + dateArr.join(','),
          showClose: true,
          duration: 6000
        })
        return false
      }
      var type = this.multipleSelection[0].type
      const induType = induArr[0]
      var tradeType = ''
      if (arr.length !== 0 && type) {
        if (type === 'BH' || type === 'IH' || type === 'SH') {
          tradeType = '0'
        } else {
          tradeType = '1'
        }
        const obj = {
          tradeId: arr.toString(),
          correctType: tradeType,
          industry: induType
        }
        // correctCheck(arr.toString(), tradeType, induType).then(res => {
        correctCheck(obj, this.UUID).then(res => {
          if (res.code === 200) {
            correctCheckError(this.UUID).then(response => {
              if (response.code === 200) {
                this.dialogVisible = true
                if (type === 'BH' || type === 'IH' || type === 'SH') {
                  this.correctionComName = 'Large'
                  this.correctionDialogTitle = '大额信息更正通知'
                  this.correctParams = {
                    tradeId: arr.toString(),
                    correctType: '0',
                    organ: '0',
                    industry: induType
                  }
                } else {
                  this.correctionComName = 'Suspicious'
                  this.correctionDialogTitle = '可疑信息更正通知'
                  this.correctParams = {
                    tradeId: arr.toString(),
                    correctType: '1',
                    organ: '0',
                    industry: induType
                  }
                }
              }
            }).catch(() => {
            })
          } else {
            this.$message.error(res.message)
          }
        }).catch()
      } else {
        this.$message.warning('此交易无交易类型！')
      }
    },
    handleAllExport() {
      const length = this.multipleSelection.length
      if (length === 0) {
        this.$confirm('请至少选择一条数据', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      } else {
        const arr = []
        const types = []
        this.multipleSelection
          .map(function(item) {
            arr.push(item.tradeId)
            types.push(item.type)
          })
        const ids = arr.join(',')
        const type = types.join(',')
        if (ids) {
          location.href = 'monitor/governance/scaning/history/export/' + ids + '/' + type + '?token=' + this.token
        } else {
          this.$message.error('批量导出失败！')
        }
      }
    },
    delRow(scope) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRowList(scope.row.tradeId).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功！')
            setTimeout(() => {
              this.getData()
            }, 10)
          }
        }).catch()
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.scaningwrap {
  .item { // 表格加省略号
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .btnrow {
    padding: 10px 0;
  }
  .btnalign {
    text-align: right;
  }
  .el-message--error {
    .el-message__content {
      word-wrap: break-word;
    }
  }
}
</style>
