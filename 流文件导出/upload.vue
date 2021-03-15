<template>
  <el-card class="fkStyle">
    <div slot="header" class="clearfix btnCard">
      <span>付款管理</span>
    </div>
    <div>
      <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" label="合同编号:" prop="contractNum">
              <el-input v-model="auditForm.contractNum" :placeholder="p1" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="120px" label="合同名称:" prop="contractName">
              <el-input v-model="auditForm.contractName" :placeholder="p1" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="120px" label="付款状态:" prop="payStatus">
              <el-select v-model="auditForm.payStatus" clearable :placeholder="p2">
                <el-option
                  v-for="item in inPayOptions"
                  :key="item.value"
                  :label="item.labelZhCh"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" label="年度:" prop="contractYear">
              <el-date-picker
                v-model="auditForm.contractYear"
                value-format="yyyy"
                type="year"
                :placeholder="p2"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="display:flex">
              <el-form-item label-width="120px" label="付款金额:" prop="payMoneyStart">
                <el-input v-model="auditForm.payMoneyStart" :placeholder="p1" />
              </el-form-item>
              <div style="padding:10px">~</div>
              <el-form-item prop="payMoneyEnd" label-width="13px">
                <el-input v-model="auditForm.payMoneyEnd" :placeholder="p1" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="120px" label="付款比例:" prop="payScale">
              <el-input v-model="auditForm.payScale" :placeholder="p1" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="toggleSearch">
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="120px" label="付款类型:" prop="payType">

                <el-select v-model="auditForm.payType" clearable :placeholder="p2">
                  <el-option
                    v-for="item in payTypeData"
                    :key="item.value"
                    :label="item.labelZhCh"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="120px" label="付款次数:" prop="payNum">
                <el-select v-model="auditForm.payNum" clearable :placeholder="p2">
                  <el-option
                    v-for="item in paycontOptions"
                    :key="item.value"
                    :label="item.labelZhCh"
                    :value="item.value"
                  />
                </el-select>
                <!-- <el-input v-model="auditForm.payNum" :placeholder="p1" maxlength="50" /> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="120px" label="付款笔数：" prop="payCount">
                <el-select v-model="auditForm.payCount" clearable :placeholder="p2">
                  <el-option
                    v-for="item in inCountOptions"
                    :key="item.value"
                    :label="item.labelZhCh"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <!-- <el-form-item label-width="120px" label="付款笔数:" prop="payCount">
                <el-input v-model="auditForm.payCount" :placeholder="p1" maxlength="50" />
              </el-form-item> -->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="120px" label="项目编号:" prop="projectNum">
                <el-input v-model="auditForm.projectNum" :placeholder="p1" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="120px" label="项目名称:" prop="projectName">
                <el-input v-model="auditForm.projectName" :placeholder="p1" maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <el-row>
          <el-col :span="24" class="textRight">
            <el-button size="small" type="primary" @click="pageInfo.current=1;seachAuditForm('auditForm')">查 询</el-button>
            <el-button size="small" type="primary" plain @click="clearAuditForm('auditForm')">清 空</el-button>
            <el-button type="text" size="small" style="display: inline-block;margin: 0 10px" @click="toggleSearch = !toggleSearch">
              <i v-if="toggleSearch" class="el-icon-caret-top">收 起</i>
              <i v-else class="el-icon-caret-bottom">展 开</i>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br>
    <el-row>
      <el-col :span="24" class="textLeft">
        <el-button v-if="xz" size="small" type="primary" @click="goNew">新 增</el-button>
        <el-button v-if="scqsh" size="small" type="primary" @click="scQS">生成请示(批量)</el-button>
        <!-- <el-button size="small" type="primary">导出请示</el-button>
        <el-button size="small" type="primary">生成函</el-button>
        <el-button size="small" type="primary">导出函</el-button> -->
        <el-button v-if="bkjs" size="small" type="primary" @click="baoKJ">报会计司</el-button>
        <el-button v-if="qrdz" size="small" type="primary" @click="querenDz">确认对账</el-button>
        <!-- <el-button size="small" type="primary" @click="querenBK">确认拨款</el-button> -->
      </el-col>
    </el-row>
    <br>
    <el-table
      v-loading="IsloadingA"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="50" fixed="left" />
      <el-table-column prop="contractNum" width="120" label="合同编号" show-overflow-tooltip />
      <el-table-column prop="contractName" width="120" label="合同名称" show-overflow-tooltip />
      <el-table-column prop="contractYear" label="年度" show-overflow-tooltip />
      <el-table-column prop="payType" label="付款类型" :formatter="PayTypeDic" show-overflow-tooltip />
      <!-- <el-table-column prop="payType" label="付款类型" :formatter="PayTypeDic" show-overflow-tooltip /> -->
      <el-table-column prop="payNum" label="合同付款次数" width="120" :formatter="numDic" show-overflow-tooltip align="right" />
      <el-table-column prop="payCount" label="付款笔数" width="120" :formatter="countDic" show-overflow-tooltip align="right" />
      <el-table-column prop="payScale" label="付款比例（%）" width="120" show-overflow-tooltip align="right" />
      <el-table-column prop="payMoney" label="付款金额" width="120" show-overflow-tooltip align="right" />
      <el-table-column prop="payStatus" label="付款状态" :formatter="payStatusDic" show-overflow-tooltip />
      <el-table-column prop="letterStatus" label="函状态" show-overflow-tooltip />
      <el-table-column prop="applyStatus" label="请示状态" show-overflow-tooltip />
      <!-- <el-table-column prop="payStatus" label="记录状态" show-overflow-tooltip /> -->
      <!-- <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="goView(scope.row)">查看</el-button>
          <el-button size="small" type="text" @click="goModify(scope.row)">修改</el-button>
          <el-button size="small" type="text" @click="goDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.payStatus==='01'&&bj" type="text" size="small" @click="goModify(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.payStatus==='01'&&sc" type="text" size="small" @click="goDelete(scope.row.payId)">删除</el-button>
          <el-button v-if="scope.row.payStatus!=='01'&&ck" type="text" size="small" @click="goView(scope.row)">查看</el-button>
          <el-button v-if="sch&&scope.row.letterStatus!=='已生成'&&(scope.row.payStatus==='03' || scope.row.payStatus ==='05'|| scope.row.payStatus ==='04')" type="text" size="small" @click="cLetter(scope.row)">生成函</el-button>
          <el-button v-if="dch&&scope.row.letterStatus==='已生成'" type="text" size="small" @click="eLetter(scope.row)">导出函</el-button>
          <el-button v-if="scqsh&&scope.row.applyStatus!=='已生成'&&(scope.row.payStatus==='03'|| scope.row.payStatus ==='05'|| scope.row.payStatus ==='04')" type="text" size="small" @click="cRequest(scope.row)">生成请示</el-button>
          <el-button v-if="dcqs&&scope.row.applyStatus==='已生成'" type="text" size="small" @click="eRequest(scope.row)">导出请示</el-button>
          <!-- <el-button type="text" size="small" @click="goModify(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="goDelete(scope.row.payId)">删除</el-button>
          <el-button type="text" size="small" @click="goView(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="cLetter(scope.row)">生成函</el-button>
          <el-button type="text" size="small" @click="eLetter(scope.row)">导出函</el-button>
          <el-button type="text" size="small" @click="cRequest(scope.row)">生成请示</el-button>
          <el-button type="text" size="small" @click="eRequest(scope.row)">导出请示</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfo.current"
      :page-size="pageInfo.size"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { getDictionary } from '@/api/common/index' // 字典
import { listinfo, deleteInfo, accounting, applyFile, reconciliation, funding, fileexport, letterFile, applyFileExport } from '@/api/managements/fkmanagement.js'
// import { commonValidate } from '@/utils/formVali'
import { noSpaceAndTs, isValidMoney } from '@/utils/formVali'
export default {
  data() {
    return {
      toggleSearch: false,
      // 权限
      scqsh: false,
      bkjs: false,
      qrdz: false,
      bj: false,
      sc: false,
      ck: false,
      sch: false,
      xz: false,
      dcqs: false,
      dch: false,
      //
      paycontOptions: [],
      inCountOptions: [],
      chooseArr: [],
      IsloadingA: false,
      isTrue: false,
      paramsOldA: {},
      searchData: {},
      payTypeData: [],
      token: getToken(),
      // SelectionArr: [],
      SelectionStr: '',
      auditForm: {
        contractNum: '',
        contractName: '',
        payStatus: '',
        contractYear: '',
        payMoneyStart: '',
        payMoneyEnd: '',
        payScale: '',
        payType: '',
        payNum: '',
        payCount: '',
        projectNum: '',
        projectName: ''
      },
      Contnum: 0,
      ContNo: 0,
      SelectionStatus: [],
      pageInfo: {
        current: 1,
        size: 10
      },
      total: 0,
      tableData: [

      ],
      inPayOptions: [

      ],
      rules: {
        contractNum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        contractName: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        payStatus: [{ message: '该项为必填项', trigger: 'change' }],
        contractYear: [{ message: '该项为必填项', trigger: 'change' }],
        payMoneyStart: [{ validator: isValidMoney, trigger: 'blur' }],
        payMoneyEnd: [{ validator: isValidMoney, trigger: 'blur' }],
        payScale: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        payType: [{ message: '该项为必填项', trigger: 'change' }],
        payNum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        payCount: [{ message: '该项为必填项', trigger: 'change' }],
        projectNum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        projectName: [{ message: '该项为必填项', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['elements']),
    p1() {
      return this.isTrue ? '' : '请输入'
    },
    p2() {
      return this.isTrue ? '' : '请选择'
    },
    p3() {
      return this.isTrue ? '' : '选择日期'
    }
  },
  mounted() {
    if (sessionStorage.getItem('paymoneyObj')) {
      const paymoneyObj = JSON.parse(sessionStorage.getItem('paymoneyObj'))
      if (paymoneyObj.pageName === this.$route.name && paymoneyObj.ifReview) {
        this.pageInfo = paymoneyObj.pageInfo
        this.auditForm = paymoneyObj.auditForm
        this.toggleSearch = paymoneyObj.toggleSearch
      }
    }
    this.power()
    this.getData()
    this.dictionaries()
  },
  methods: {
    payStatusDic(row, column, cellValue) {
      const data = this.inPayOptions
      const arr = {}
      for (let i = 0; i < data.length; i++) {
        arr[data[i].value] = data[i].labelZhCh
      }
      return arr[cellValue]
    },
    numDic(row, column, cellValue) {
      const data = this.paycontOptions
      const arr = {}
      for (let i = 0; i < data.length; i++) {
        arr[data[i].value] = data[i].labelZhCh
      }
      return arr[cellValue]
    },
    countDic(row, column, cellValue) {
      const data = this.inCountOptions
      const arr = {}
      for (let u = 0; u < data.length; u++) {
        arr[data[u].value] = data[u].labelZhCh
      }
      return arr[cellValue]
    },
    power() {
      // 生成请示函
      this.scqsh = this.elements.indexOf('pmis_payMoney_applyFile') !== -1
      // 报会计司
      this.bkjs = this.elements.indexOf('pmis_payMoney_accountingDepartment') !== -1
      // 确认对账
      this.qrdz = this.elements.indexOf('pmis_payMoney_confirmReconciliation') !== -1
      this.bj = this.elements.indexOf('pmis_payMoney_view_edit') !== -1
      this.sc = this.elements.indexOf('pmis_payMoney_deleteInfo') !== -1
      this.ck = this.elements.indexOf('pmis_payMoney_view') !== -1
      this.sch = this.elements.indexOf('pmis_payMoney_letterFile') !== -1
      this.xz = this.elements.indexOf('pmis_payMoney_saveInfo') !== -1
      this.dcqs = this.elements.indexOf('pmis_payMoney_applyFileExport') !== -1
      this.dch = this.elements.indexOf('pmis_payMoney_letterFileExport') !== -1
    },
    dictionaries() {
      getDictionary('root1_C1022').then(res => { this.inCountOptions = res.data.rows })
      getDictionary('root1_C1023').then(res => { this.inKindOptions = res.data.rows })
      getDictionary('root1_C1021').then(res => { this.paycontOptions = res.data.rows })
      getDictionary('root1_C1020').then(res => { this.payTypeData = res.data.rows })
      getDictionary('root1_C1024').then(res => { this.inPayOptions = res.data.rows })
    },
    PayTypeDic(row, column, cellValue) { // 来源过滤
      const data = this.payTypeData
      const arr = {}
      for (let i = 0; i < data.length; i++) {
        arr[data[i].value] = data[i].labelZhCh
      }
      return arr[cellValue]
    },
    scQS() {
      if (this.chooseArr.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一条数据'
        })
        return
      }
      if (this.chooseArr.length < 6) {
        this.$confirm('是否生成请示?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          applyFile(this.SelectionStr).then(res => {
            // if (res.code === 200) {
            //   this.$message({
            //     type: 'success',
            //     message: '生成请示成功'
            //   })
            // } else {
            //   this.$message({
            //     type: 'warning',
            //     message: res.message
            //   })
            // }
            this.download(res, '付款管理请示' + this.getExportName() + '.doc')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消生成'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '最多选择五条数据'
        })
      }
    },
    baoKJ() {
      this.Contnum = 0
      this.SelectionStatus.forEach(el => {
        if (el === '03') {
          this.Contnum++
        }
      })
      if (this.Contnum !== (this.SelectionStatus.length)) {
        this.$message({
          type: 'warning',
          message: '只有初审通过的数据才可以报会计司'
        })
        return
      }
      if (this.chooseArr.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一条数据'
        })
        return
      }

      this.$confirm('是否上报会计司?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          payId: this.SelectionStr
        }
        accounting(obj).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '上报成功'
            })
            this.getData()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上报'
        })
      })
    },
    querenDz() {
      this.ContNo = 0
      this.SelectionStatus.forEach(el => {
        if (el === '04') {
          this.ContNo++
        }
      })
      if (this.ContNo !== (this.SelectionStatus.length)) {
        this.$message({
          type: 'warning',
          message: '只有已报会计司的数据才可以报会计司'
        })
        return
      }
      if (this.chooseArr.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一条数据'
        })
        return
      }
      this.$confirm('是否确认对账?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          payId: this.SelectionStr
        }
        reconciliation(obj).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '上报成功'
            })
            this.getData()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上报'
        })
      })
    },
    querenBK() {
      if (this.chooseArr.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一条数据'
        })
        return
      }
      this.$confirm('是否确认拨款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        funding(this.SelectionStr).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '上报成功'
            })
            this.getData()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上报'
        })
      })
    },
    handleSelectionChange(val) {
      if (val) {
        var SelectionArr = []
        var Arr = []
        val.forEach(row => {
          SelectionArr.push(row.payId)
          Arr.push(row.payStatus)
        })
        this.chooseArr = val
        this.SelectionStatus = Arr
        this.SelectionStr = SelectionArr.join(',')
      }
    },
    // 生成请示
    cRequest(scope) {
      applyFile(scope.payId).then(res => {
        // if (res.code === 200) {
        this.$message.success('生成请示成功!')
        this.getData()
        // } else {
        //   this.$message.warning(res.message)
        // }
      })
    },
    // 导出请示
    eRequest(scope) {
      applyFileExport(scope.payId).then(res => {
        this.download(res, '付款管理导出请示' + this.getExportName() + '.doc')
        this.getData()
      })
    },
    download(data, fileName) {
      if (!data) {
        return
      }
      // application/msword
      const blob = new Blob([data], { type: 'application/x-msdownload' })
      if (!!window.ActiveXObject || 'ActiveXObject' in window) { // IE (包含10)10+
        navigator.msSaveBlob(blob, fileName)
      } else {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url) // 释放内存
      }
    },
    getExportName() {
      var mydate = new Date()
      mydate.setTime(mydate.getTime())
      var dateName = mydate.getFullYear() + '' + (mydate.getMonth() + 1) + '' + mydate.getDate() + '' + mydate.getHours() + '' + mydate.getMinutes() + '' + mydate.getSeconds()
      return dateName
    },
    // 生成函
    cLetter(scope) {
      letterFile(scope.payId).then(res => {
        if (res.code === 200) {
          this.$message.success('生出函成功!')
          this.getData()
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    // 导出函
    eLetter(scope) {
      fileexport(scope.payId).then(res => {
        this.download(res, '付款管理导出函' + this.getExportName() + '.doc')
        this.getData()
      })
    },
    // 查看
    goView(scope) {
      this.$router.push({
        name: 'fkdetails',
        query:
        {
          type: '0',
          optionId: scope.payId
        }
      })
    },
    // 修改
    goModify(scope) {
      this.$router.push({
        name: 'fkdetails',
        query:
        {
          type: '1',
          optionId: scope.payId
        }
      })
    },
    goNew() {
      this.$router.push({
        name: 'fkdetails',
        query:
        {
          type: '2'
        }
      })
    },
    goDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteInfo(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getData()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getData()
        } else {
          return false
        }
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.auditForm.payType = ''
      this.auditForm.payNum = ''
      this.auditForm.payCount = ''
      this.auditForm.projectNum = ''
      this.auditForm.projectName = ''
      // this.getData()
    },
    // 获取列表数据
    getData(num) {
      const params = Object.assign({}, this.pageInfo, this.auditForm)

      this.IsloadingA = true
      listinfo(params).then(res => {
        this.IsloadingA = false
        res.data.records.forEach(el => {
          switch (el.applyStatus) {
            case '0':
              el.applyStatus = '未生成'
              break
            case '1':
              el.applyStatus = '已生成'
              break
            default:
              break
          }
          switch (el.letterStatus) {
            case '0':
              el.letterStatus = '未生成'
              break
            case '1':
              el.letterStatus = '已生成'
              break
            default:
              break
          }
        })
        this.tableData = res.data.records
        this.paramsOldA = params
        this.total = res.data.total
        const paymoneyObj = {
          pageName: this.$route.name,
          pageInfo: this.pageInfo,
          auditForm: this.auditForm,
          toggleSearch: this.toggleSearch
        }

        sessionStorage.setItem('paymoneyObj', JSON.stringify(paymoneyObj))
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.size = val
      this.paramsOldA.size = val
      this.IsloadingA = true
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.current = val
      this.paramsOldA.current = val
      this.IsloadingA = true
      this.getData()
    }
  }
}
</script>

<style  lang="scss">
</style>
