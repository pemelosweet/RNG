<template>
  <div>
    <el-dialog title="图表展示" width="90%" :visible.sync="dialogCom" @open="openDialogTableVisible" :append-to-body="true">
      <div style="width:100%;height:800px;position:relative;">
      <el-form :model="form" ref="searchForm">
          <el-row>
            <el-col :span="8" v-if="pageId === '1'">
              <el-form-item label="统计指标：" label-width="100px">
                <el-select style="width:100%" v-model="form.statisticalType" @change="indexFn">
                  <el-option label="大额交易报告份数" value="0" ></el-option>
                  <el-option label="大额交易报告金额（万元）" value="1"></el-option>
                  <el-option label="大额交易上报笔数" value="2"></el-option>
                  <el-option label="大额交易报告涉及账户数" value="3"></el-option>
                  <el-option label="大额交易报告涉及交易主体数" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="pageId === '2'">
              <el-form-item label="统计指标：" label-width="100px">
                <el-select style="width:100%" v-model="form.statisticalType" @change="suspiciousFn">
                  <el-option label="可疑交易报告份数" value="0" ></el-option>
                  <el-option label="可疑交易报告金额（万元）" value="1"></el-option>
                  <el-option label="可疑交易报告交易笔数" value="2"></el-option>
                  <el-option label="可疑交易报告涉及账户数" value="3"></el-option>
                  <el-option label="可疑交易报告涉及交易主体数" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="pageId === '3' && this.S_TYPE === 'RICD' && this.D_TYPE === 'B'">
              <el-form-item label="统计指标：" label-width="100px">
                <el-select style="width:100%" v-model="form.statisticalType" @change="dealmainFn">
                  <el-option label="涉及的大额交易报告份数" value="0" ></el-option>
                  <el-option label="涉及的大额交易报告金额（万元）" value="1"></el-option>
                  <el-option label="涉及的大额交易报告交易笔数" value="2"></el-option>
                  <el-option label="涉及的大额交易报告账户数" value="3"></el-option>
                  <el-option label="涉及的大额交易报告交易主体数" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="pageId === '3' && this.S_TYPE === 'RICD' && this.D_TYPE === 'S'">
              <el-form-item label="统计指标：" label-width="100px">
                <el-select style="width:100%" v-model="form.statisticalType" @change="dealmainFn">
                  <el-option label="涉及的可疑交易报告份数" value="0" ></el-option>
                  <el-option label="涉及的可疑交易报告金额（万元）" value="1"></el-option>
                  <el-option label="涉及的可疑交易报告交易笔数" value="2"></el-option>
                  <el-option label="涉及的可疑交易报告账户数" value="3"></el-option>
                  <el-option label="涉及的可疑交易报告交易主体数" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="pageId === '3' && this.S_TYPE === 'INDUSTRY' && this.D_TYPE === 'B'">
              <el-form-item label="统计指标：" label-width="100px">
                <el-select style="width:100%" v-model="form.statisticalType" @change="dealmainFn">
                  <el-option label="涉及的大额交易报告份数" value="0" ></el-option>
                  <el-option label="涉及的大额交易报告金额（万元）" value="1"></el-option>
                  <el-option label="涉及的大额交易报告交易笔数" value="2"></el-option>
                  <el-option label="涉及的大额交易报告账户数" value="3"></el-option>
                  <el-option label="涉及的大额交易报告交易主体数" value="4"></el-option>
                  <el-option label="大额报告机构数" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="pageId === '3' && this.S_TYPE === 'INDUSTRY' && this.D_TYPE === 'S'">
              <el-form-item label="统计指标：" label-width="100px">
                <el-select style="width:100%" v-model="form.statisticalType" @change="dealmainFn">
                  <el-option label="涉及的可疑交易报告份数" value="0" ></el-option>
                  <el-option label="涉及的可疑交易报告金额（万元）" value="1"></el-option>
                  <el-option label="涉及的可疑交易报告交易笔数" value="2"></el-option>
                  <el-option label="涉及的可疑交易报告账户数" value="3"></el-option>
                  <el-option label="涉及的可疑交易报告交易主体数" value="4"></el-option>
                  <el-option label="可疑报告机构数" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="pageId === '5'">
              <el-form-item label="统计指标：" label-width="100px">
                <el-select style="width:100%" v-model="form.statisticalType" @change="timerrateFn">
                  <el-option label="大额交易笔数" value="0" ></el-option>
                  <el-option label="大额交易按时报告笔数" value="1"></el-option>
                  <el-option label="大额交易上报及时率" value="2"></el-option>
                  <el-option label="大额交易需补正笔数" value="3"></el-option>
                  <el-option label="大额交易按时补正笔数" value="4"></el-option>
                  <el-option label="大额交易补正及时率" value="5"></el-option>
                  <el-option label="可疑交易报告份数" value="6"></el-option>
                  <el-option label="可疑交易需补正笔数" value="7"></el-option>
                  <el-option label="可疑交易按时补正笔数" value="8"></el-option>
                  <el-option label="可疑交易补正及时率" value="9"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="graphSwitching" style="margin-left:10px;">{{ graphSwitchingType ? '柱状图展示' : '扇形图展示' }}</el-button>
              <!-- <el-button type="primary" @click="goFn" plain style="margin-left:10px;">返回</el-button> -->
            </el-col>
          </el-row>
      </el-form>
      <div>
      <div id="myChart" v-show="graphSwitchingType === false"></div>
      <div id="myChartEr" v-show="graphSwitchingType"></div>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  const echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    props: {
      dialogTableVisible: {
        type: Boolean,
        default: false
      },
      id: {
        type: String
      },
      S_TYPES: {
        type: String
      },
      S_NAMES: {
        type: String
      },
      tablist: {
        type: Array
      },
      D_TYPES: {
        type: String
      }
    },
    data() {
      return {
        percentage: false,
        D_TYPE: '',
        S_NAME: '',
        newName: [],
        graphSwitchingType: false,
        financialInstitutionsName: [],
        statisticalQuantity: [],
        lists: '',
        valName: '',
        pageId: '',
        S_TYPE: '',
        form: {
          statisticalType: '0'
        }
      }
    },
    computed: {
      dialogCom: {
        get() {
          return this.dialogTableVisible
        },
        set(val) {
          this.$emit('setDialog', val)
        }
      },
      barWidthNum() {
        if (this.statisticalQuantity.length > 0 && this.statisticalQuantity.length <= 10) {
          return 50
        } else if (this.statisticalQuantity.length > 10 && this.statisticalQuantity.length <= 20) {
          return 30
        } else if (this.statisticalQuantity.length > 20 && this.statisticalQuantity.length <= 30) {
          return 20
        } else if (this.statisticalQuantity.length > 30 && this.statisticalQuantity.length <= 40) {
          return 15
        }
      }
    },
    methods: {
      openDialogTableVisible() {
        this.form.statisticalType = '0'
        if (this.D_TYPES) {
          this.D_TYPE = this.D_TYPES
        }
        this.pageId = this.id
        this.S_NAME = this.S_NAMES
        this.S_TYPE = this.S_TYPES
        this.lists = this.tablist
        setTimeout(() => {
          this.typeFn()
        }, 0)
      },
      indexFn() {
        if (this.S_TYPE === 'RICD') {
          if (this.form.statisticalType === '0') {
            this.valName = '大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.organizationName
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.organizationName
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '大额交易上报笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.organizationName
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '按大额交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.organizationName
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '按大额交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.organizationName
              })
            })
          }
        } else if (this.S_TYPE === 'INDUSTRY') {
          if (this.form.statisticalType === '0') {
            this.valName = '大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.industryName
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.industryName
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '大额交易上报笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.industryName
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '按大额交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.industryName
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '按大额交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.industryName
              })
            })
          }
        } else if (this.S_TYPE === 'CRCD') {
          if (this.form.statisticalType === '0') {
            this.valName = '大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.transactionCharacteristicCode)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.transactionCharacteristicCode
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.transactionCharacteristicCode)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.transactionCharacteristicCode
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '大额交易上报笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.transactionCharacteristicCode)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.transactionCharacteristicCode
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '按大额交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.transactionCharacteristicCode)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.transactionCharacteristicCode
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '按大额交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.transactionCharacteristicCode)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.transactionCharacteristicCode
              })
            })
          }
        } else if (this.S_TYPE === 'TRCD') {
          if (this.form.statisticalType === '0') {
            this.valName = '大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.placeOfBusiness
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.placeOfBusiness
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '大额交易上报笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.placeOfBusiness
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '按大额交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.placeOfBusiness
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '按大额交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.placeOfBusiness
              })
            })
          }
        } else if (this.S_TYPE === 'CRATPART') {
          if (this.form.statisticalType === '0') {
            this.valName = '大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.reportAmount
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.reportAmount
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '大额交易上报笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.reportAmount
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '按大额交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.reportAmount
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '按大额交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.reportAmount
              })
            })
          }
        } else if (this.S_TYPE === 'CATP') {
          if (this.form.statisticalType === '0') {
            this.valName = '大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.accountType
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.accountType
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '大额交易上报笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.accountType
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '按大额交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.accountType
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '按大额交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.accountType
              })
            })
          }
        } else if (this.S_TYPE === 'FINNNAME') {
          if (this.form.statisticalType === '0') {
            this.valName = '大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfInflux)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.placeOfInflux
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfInflux)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.placeOfInflux
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '大额交易上报笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfInflux)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.placeOfInflux
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '按大额交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfInflux)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.placeOfInflux
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '按大额交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfInflux)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.placeOfInflux
              })
            })
          }
        }
        // if (this.graphSwitchingType) {
        //   this.drawPie()
        // } else {
        //   this.drawLine()
        // }
        this.drawLine()
        this.drawPie()
      },
      suspiciousFn() {
        if (this.S_TYPE === 'RICD') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.organizationName
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.organizationName
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.organizationName
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.organizationName
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.organizationName)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.organizationName
              })
            })
          }
        } else if (this.S_TYPE === 'INDUSTRY') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.industryName
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.industryName
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.industryName
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.industryName
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.industryName)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.industryName
              })
            })
          }
        } else if (this.S_TYPE === 'STCR') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.stcr)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.stcr
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.stcr)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.stcr
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.stcr)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.stcr
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.stcr)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.stcr
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.stcr)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.stcr
              })
            })
          }
        } else if (this.S_TYPE === 'TRCD') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.placeOfBusiness
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.placeOfBusiness
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.placeOfBusiness
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.placeOfBusiness
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.placeOfBusiness)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.placeOfBusiness
              })
            })
          }
        } else if (this.S_TYPE === 'CRATPART') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.reportAmount
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.reportAmount
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.reportAmount
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.reportAmount
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.reportAmount)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.reportAmount
              })
            })
          }
        } else if (this.S_TYPE === 'CATP') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.accountType
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.accountType
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.accountType
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.accountType
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.accountType)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.accountType
              })
            })
          }
        } else if (this.S_TYPE === 'TSTP') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tstp)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.tstp
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tstp)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.tstp
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tstp)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.tstp
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tstp)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.tstp
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tstp)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.tstp
              })
            })
          }
        } else if (this.S_TYPE === 'TOSC') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tosc)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.tosc
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tosc)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.tosc
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tosc)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.tosc
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tosc)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.tosc
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.tosc)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.tosc
              })
            })
          }
        } else if (this.S_TYPE === 'CTTP') {
          if (this.form.statisticalType === '0') {
            this.valName = '可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.sevc)
              this.statisticalQuantity.push(el.largeNumberOfReports)
              this.newName.push({
                value: el.largeNumberOfReports,
                name: el.sevc
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.sevc)
              this.statisticalQuantity.push(el.largeAmountOfReport)
              this.newName.push({
                value: el.largeAmountOfReport,
                name: el.sevc
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.sevc)
              this.statisticalQuantity.push(el.transactionPenNumber)
              this.newName.push({
                value: el.transactionPenNumber,
                name: el.sevc
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '可疑交易报告涉及账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.sevc)
              this.statisticalQuantity.push(el.accountNumber)
              this.newName.push({
                value: el.accountNumber,
                name: el.sevc
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '可疑交易报告涉及交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.sevc)
              this.statisticalQuantity.push(el.numberOfSubjects)
              this.newName.push({
                value: el.numberOfSubjects,
                name: el.sevc
              })
            })
          }
        }
        this.drawLine()
        this.drawPie()
      },
      timerrateFn() {
        if (this.form.statisticalType === '0') {
          this.percentage = false
          this.valName = '大额交易笔数'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(el.hnum)
            this.newName.push({
              value: el.hnum,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '1') {
          this.percentage = false
          this.valName = '大额交易按时报告笔数'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(el.hontimeNum)
            this.newName.push({
              value: el.hontimeNum,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '2') {
          this.percentage = true
          this.valName = '大额交易上报及时率'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            var newHighPercent = el.highPercent.replace('%', '')
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(newHighPercent)
            this.newName.push({
              value: newHighPercent,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '3') {
          this.percentage = false
          this.valName = '大额交易需补正笔数'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(el.hcorNum)
            this.newName.push({
              value: el.hcorNum,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '4') {
          this.percentage = false
          this.valName = '大额交易按时补正笔数'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(el.hcorOntimeNum)
            this.newName.push({
              value: el.hcorOntimeNum,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '5') {
          this.percentage = true
          this.valName = '大额交易补正及时率'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            var newHighPercent = el.highPercent.replace('%', '')
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(newHighPercent)
            this.newName.push({
              value: newHighPercent,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '6') {
          this.percentage = false
          this.valName = '可疑交易报告份数'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(el.snum)
            this.newName.push({
              value: el.snum,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '7') {
          this.percentage = false
          this.valName = '可疑交易需补正笔数'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(el.scorNum)
            this.newName.push({
              value: el.scorNum,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '8') {
          this.percentage = false
          this.valName = '可疑交易按时补正笔数'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(el.scorOntimeNum)
            this.newName.push({
              value: el.scorOntimeNum,
              name: el.rinm
            })
          })
        } else if (this.form.statisticalType === '9') {
          this.percentage = true
          this.valName = '可疑交易补正及时率'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            var newHighPercent = el.highPercent.replace('%', '')
            this.financialInstitutionsName.push(el.rinm)
            this.statisticalQuantity.push(newHighPercent)
            this.newName.push({
              value: newHighPercent,
              name: el.rinm
            })
          })
        }
        this.drawLine()
        this.drawPie()
      },
      sequenceFn() {
        if (this.D_TYPE === '0') {
          this.valName = '按年份统计数量'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.years)
            this.statisticalQuantity.push(el.srn)
            this.newName.push({
              value: el.srn,
              name: el.years
            })
          })
        } else if (this.D_TYPE === '1') {
          this.valName = '按季度统计数量'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.years + '-Q' + el.quarter)
            this.statisticalQuantity.push(el.srn)
            this.newName.push({
              value: el.srn,
              name: el.years + '-Q' + el.quarter
            })
          })
        } else if (this.D_TYPE === '2') {
          this.valName = '按月份统计数量'
          this.financialInstitutionsName = []
          this.statisticalQuantity = []
          this.newName = []
          this.lists.forEach(el => {
            this.financialInstitutionsName.push(el.acceptMonth)
            this.statisticalQuantity.push(el.srn)
            this.newName.push({
              value: el.srn,
              name: el.acceptMonth
            })
          })
        }
        this.drawLine()
        this.drawPie()
      },
      dealmainFn() {
        if (this.S_TYPE === 'RICD' && this.D_TYPE === 'B') {
          if (this.form.statisticalType === '0') {
            this.valName = '涉及的大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hNum)
              this.newName.push({
                value: el.hNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '涉及的大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hCratNum)
              this.newName.push({
                value: el.hCratNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '涉及的大额交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hRepNum)
              this.newName.push({
                value: el.hRepNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '涉及的大额交易报告账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hCtacNum)
              this.newName.push({
                value: el.hCtacNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '涉及的大额交易报告交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hSubNum)
              this.newName.push({
                value: el.hSubNum,
                name: el.ctnm + el.ctid
              })
            })
          }
        } else if (this.S_TYPE === 'RICD' && this.D_TYPE === 'S') {
          if (this.form.statisticalType === '0') {
            this.valName = '涉及的可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sNum)
              this.newName.push({
                value: el.sNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '涉及的可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sCratNum)
              this.newName.push({
                value: el.sCratNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '涉及的可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sRepNum)
              this.newName.push({
                value: el.sRepNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '涉及的可疑交易报告账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sCtacNum)
              this.newName.push({
                value: el.sCtacNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '涉及的可疑交易报告交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sSubNum)
              this.newName.push({
                value: el.sSubNum,
                name: el.ctnm + el.ctid
              })
            })
          }
        } else if (this.S_TYPE === 'INDUSTRY' && this.D_TYPE === 'B') {
          if (this.form.statisticalType === '0') {
            this.valName = '涉及的大额交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hNum)
              this.newName.push({
                value: el.hNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '涉及的大额交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hCratNum)
              this.newName.push({
                value: el.hCratNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '涉及的大额交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hRepNum)
              this.newName.push({
                value: el.hRepNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '涉及的大额交易报告账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hCtacNum)
              this.newName.push({
                value: el.hCtacNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '涉及的大额交易报告交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.hSubNum)
              this.newName.push({
                value: el.hSubNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '5') {
            this.valName = '大额报告机构数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.ricdNum)
              this.newName.push({
                value: el.ricdNum,
                name: el.ctnm + el.ctid
              })
            })
          }
        } else if (this.S_TYPE === 'INDUSTRY' && this.D_TYPE === 'S') {
          if (this.form.statisticalType === '0') {
            this.valName = '涉及的可疑交易报告份数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sNum)
              this.newName.push({
                value: el.sNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '1') {
            this.valName = '涉及的可疑交易报告金额（万元）'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sCratNum)
              this.newName.push({
                value: el.sCratNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '2') {
            this.valName = '涉及的可疑交易报告交易笔数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sRepNum)
              this.newName.push({
                value: el.sRepNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '3') {
            this.valName = '涉及的可疑交易报告账户数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sCtacNum)
              this.newName.push({
                value: el.sCtacNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '4') {
            this.valName = '涉及的可疑交易报告交易主体数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.sSubNum)
              this.newName.push({
                value: el.sSubNum,
                name: el.ctnm + el.ctid
              })
            })
          } else if (this.form.statisticalType === '5') {
            this.valName = '可疑报告机构数'
            this.financialInstitutionsName = []
            this.statisticalQuantity = []
            this.newName = []
            this.lists.forEach(el => {
              this.financialInstitutionsName.push(el.ctnm + el.ctid)
              this.statisticalQuantity.push(el.ricdNum)
              this.newName.push({
                value: el.ricdNum,
                name: el.ctnm + el.ctid
              })
            })
          }
        }
        this.drawLine()
        this.drawPie()
      },
      goFn() {
        this.$router.go(-1)
      },
      typeFn() {
        if (this.pageId === '1') {
          this.indexFn()
        } else if (this.pageId === '2') {
          this.suspiciousFn()
        } else if (this.pageId === '3') {
          this.dealmainFn()
        } else if (this.pageId === '5') {
          this.timerrateFn()
        } else if (this.pageId === '6') {
          this.sequenceFn()
        }
      },
      graphSwitching() {
        if (this.graphSwitchingType) {
          this.graphSwitchingType = false
        } else {
          this.graphSwitchingType = true
        }
      },
      drawLine() {
        const myChart = echarts.init(document.getElementById('myChart'))
        myChart.setOption({
          title: {
            text: this.S_NAME + '柱状图展示',
            left: 'center'
          },
          tooltip: {
            show: true,
            confine: true,
            trigger: 'item',
            extraCssText: 'width:700px; white-space:pre-wrap',
            formatter: this.percentage ? '{a} <br/>{b} : {c}%' : '{a} <br/>{b} : {c}'
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 40,
              formatter: function(value) {
                return (value.length > 10 ? (value.slice(0, 10) + '...') : value)
              }
            },
            data: this.financialInstitutionsName
          },
          yAxis: {
            axisLabel: {
              formatter: this.percentage ? '{value}%' : '{value}'
            }
          },
          grid: {
            width: 'auto',
            height: 'auto',
            containLabel: true,
            x: 40,
            y: 80,
            x2: 40,
            y2: 30
          },
          series: [{
            name: this.valName,
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(d) { return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16) },
                label: {
                  formatter: this.percentage ? '{c} %' : '{c}',
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  rotate: 40,
                  textStyle: { // 数值样式
                    color: 'black'
                  }
                }
              }
            },
            barWidth: this.barWidthNum,
            barMinHeight: 10,
            data: this.statisticalQuantity
          }]
        })
      },
      drawPie() {
        const myChartEr = echarts.init(document.getElementById('myChartEr'))
        myChartEr.setOption({
          title: {
            text: this.S_NAME + '扇形图展示',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            confine: true,
            extraCssText: 'width:600px; white-space:pre-wrap',
            formatter: this.percentage ? '{a} <br/>{b} : {c}% ({d}%)' : '{a} <br/>{b} : {c} ({d}%)'
          },
          grid: {
            width: 'auto',
            height: 'auto',
            x: 40,
            y: 50,
            x2: 40,
            y2: 30
          },
          series: [
            {
              name: this.valName,
              minAngle: 1,
              type: 'pie',
              radius: '50%',
              center: ['50%', '63%'],
              data: this.newName.sort(function(a, b) { return a.value - b.value }),
              label: {
                normal: {
                  formatter: function(e) {
                    return e.name.replace(/(.{30})/g, '$1\n') // 隔15个字换行
                  },
                  textStyle: {
                    color: '#000'
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: function(params) {
                    // 自定义颜色
                    var colorList = [
                      '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463', '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463', '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463', '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463', '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463', '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463', '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00'
                    ]
                    return colorList[params.dataIndex]
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#ccc'
                  },
                  smooth: 0.2,
                  length: 20,
                  length2: 50
                }
              },
              axisLabel: {
                interval: 0
              },
              animationDelay: function(idx) {
                return Math.random() * 200
              }
            }
          ]
        })
      }
    }
}
</script>

<style>
  #myChart{
    width: 100%;
    height: 680px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  #myChartEr{
    width: 1300px;
    height: 680px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>