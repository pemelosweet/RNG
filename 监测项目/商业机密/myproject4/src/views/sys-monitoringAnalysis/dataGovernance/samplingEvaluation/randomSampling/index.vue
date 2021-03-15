<template>
  <div class="randomSampling">
    <el-card>
      <div slot="header">
        <span>随机抽样评价</span>
      </div>
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="限制报告数量：" prop="reportCount" :rules="[{required: true, message: '请输入限制报告数量', trigger: 'blur'}, { validator: numCheck, trigger: 'blur' }]">
              <el-input type="text" v-model="searchForm.reportCount" maxlength="5" placeholder="请输入限制报告数量，最多输入5位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="落地时间：" prop="createDate">
              <el-date-picker
                style="width: 100% !important;"
                clearable
                value-format="yyyy-MM-dd"
                v-model="searchForm.establishDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                placeholder
              ></el-date-picker>
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
            <el-button type="primary" @click="queryFn" :loading="queryLoading">查 询</el-button>
            <el-button type="primary" plain @click="clearForm">清 空</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div style="margin-bottom: 15px;">可疑交易报告列表</div>
      <el-table :data="tableData" v-loading="tabLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rinm" label="报告机构" width="280" show-overflow-tooltip></el-table-column>
        <el-table-column prop="xmlName" label="可疑交易报告" width="400" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="exportXml(scope.row)">{{scope.row.xmlName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="redt" label="落地时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <router-link :to="{ name:'dataGovernance_samplingEvaluation_randomSampling_sampling', query: {ricd: scope.row.ricd, xmlId: scope.row.xmlId, datas: JSON.stringify(paramFrom)}} "></router-link> -->
            <el-button type="text" @click="evaluateBtn(scope.row)">评价</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tabTotal">
      </el-pagination>
      <sampling :dialogType="diaType" :ricd="myRicd" :myObj="myObj" :xmlId="myXmlId" @dialogSwitch="dialogSwitch"></sampling>
    </el-card>
  </div>
</template>

<script>
import { query } from '@/api/sys-monitoringAnalysis/dataGovernance/samplingEvaluetion/querySer.js'
import { listRinm } from '@/api/sys-monitoringAnalysis/evaluate/mechanismTemplate.js'
import {
  getIndustryFrist,
  getIndustrySecond
  // getRinmList
} from '@/api/sys-monitoringAnalysis/dataGovernance/common/tradeDetailLarge.js'
import { numberCheck } from '@/utils/check.js'
import sampling from '@/views/sys-monitoringAnalysis/dataGovernance/samplingEvaluation/randomSampling/sampling.vue'
export default {
  data() {
    return {
      myRicd: '',
      myXmlId: '',
      myObj: {},
      diaType: false,
      numCheck: numberCheck,
      tabTotal: 0,
      queryLoading: false,
      tabLoading: false,
      paramFrom: {},
      allSelect: [],
      options: [],
      typeDate: [],
      rinmOptions: [],
      optionLoading: false,
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im, // 校验空格
      searchForm: {
        levelType: '',
        Cust: [],
        str: [],
        industry: '',
        establishDate: [],
        reportCount: '',
        ricd: ''
      },
      tableData: [],
      // 默认开始页码
      currentPage: 1,
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      multipleSelection: []
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
  components: {
    sampling
  },
  mounted() {
    this.initData()
    if (this.$route.query.levelType !== undefined) {
      this.searchForm = Object.assign({}, this.$route.query)
      this.paramFrom = Object.assign({}, this.$route.query)
      this.tabLoading = true
      this.queryData()
    }
  },
  methods: {
    exportXml(row) {
      if (row) {
        location.href = `monitor/random/export?tableId=${row.tableId}&tableName=${row.tableName}&xmlId=${row.xmlId}`
      }
    },
    evaluateBtn(row) {
      this.myObj = {
        tableId: row.tableId,
        tableName: row.tableName,
        xmlId: row.xmlId
      }
      this.myRicd = row.ricd
      this.myXmlId = row.xmlId
      this.diaType = true
    },
    dialogSwitch(val) {
      this.diaType = val
    },
    clearForm() {
      this.searchForm = {
        levelType: '',
        Cust: [],
        str: [],
        industry: '',
        establishDate: [],
        reportCount: '',
        ricd: ''
      }
      // this.tableData = []
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
    initData() {
      getIndustryFrist().then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
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
    // 校验只能输入数字
    validateNumber(rule, value, callback) {
      if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.chinaNull.test(value)) {
        callback(new Error('禁止输入中文'))
      } else if (this.englishNull.test(value)) {
        callback(new Error('禁止输入英文'))
      } else {
        callback()
      }
    },
    getParamter() {
      const obj = Object.assign({}, this.searchForm)
      const newObj = {
        industry: obj.industry,
        startDate: obj.establishDate.length > 0 ? obj.establishDate[0] : '',
        endDate: obj.establishDate.length > 0 ? obj.establishDate[1] : '',
        reportCount: Number(obj.reportCount),
        ficp: obj.levelType,
        category: obj.Cust.includes('ALL') ? this.allSelect.join() : obj.Cust.join(),
        ricd: obj.str.join(),
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      return newObj
    },
    queryData() {
      query(this.getParamter()).then(res => {
        if (res) {
          this.queryLoading = false
          this.tabLoading = false
          if (res.code === 200) {
            this.tableData = res.data.list
            this.tabTotal = res.data.total
          }
        } else {
          this.queryLoading = false
          this.tabLoading = false
        }
      })
    },
    queryFn() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.queryLoading = true
          this.tabLoading = true
          this.paramFrom = Object.assign({}, this.searchForm)
          this.queryData()
        } else {
          return false
        }
      })
    },
    fetchData(listQuery) {
      // this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.projects
      //   this.listLoading = false
      // })
    },
    handleSizeChange(size) {
      this.pageNum = 1
      this.pageSize = size
      this.queryData()
    },
    handleCurrentChange(currentPage) {
      this.pageNum = currentPage
      this.queryData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // this.title = '已选当前页' + this.multipleSelection.length + '项'
    }
  }
}
</script>

<style lang="scss">
.randomSampling {
  .btnalign {
    text-align: right;
  }
}
</style>
