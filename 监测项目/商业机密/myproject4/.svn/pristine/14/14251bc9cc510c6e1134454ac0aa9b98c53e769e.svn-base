<template>
  <div class="seniorList">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{ruleName}}</span>
        <sub>（{{batchStart}}~{{batchEnd}}监测报告）</sub>
        <el-button style="float:right" @click="queryBySubjectArr" type="text">查询当前监测周期所有交易</el-button>
      </div>
      <div class="block">
        <b style="font-size:14px">主体信息汇总</b>
        <el-table style="width: 100%" :data="tableData">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column label="主体名称" prop="ctnm" min-width="140"></el-table-column>
          <el-table-column label="账号" prop="ctac" min-width="140"></el-table-column>
          <el-table-column prop="crat" label="交易总金额" min-width="120"></el-table-column>
          <el-table-column prop="tcount" label="交易总笔数" min-width="100"></el-table-column>
          <el-table-column prop="tcnm" label="交易对手总数" min-width="100"></el-table-column>
          <el-table-column prop="trcd" label="交易发生地" min-width="140"></el-table-column>
          <el-table-column prop="option" label="操作" width="140">
            <template slot-scope="scope">
              <el-button class="attention-btn" @click="concernObject(scope)" plain type="text">关注主体</el-button>
              <el-button type="text" @click="queryBySubject(scope.row)">查看主体全部交易</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </div>

      <div style="margin-top:50px">
        <el-form ref="searchForm" :rules="formRules" :model="form" :inline="true">
          <el-row>
          <el-col :span="7">
          <el-form-item label="主体名称：" prop="ctnm">
            <el-input v-model="form.ctnm" placeholder="请输入主体名称,最长50字符" maxlength="50"/>
          </el-form-item>
          </el-col>
          <el-col :span="7">
          <el-form-item label="证件号码：" prop="ctid">
            <el-input v-model="form.ctid" placeholder="请输入证件号码,最长50字符" maxlength="50"/>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="账号：" prop="ctac">
            <el-input v-model="form.ctac" placeholder="请输入账号,最长50字符" maxlength="50"/>
          </el-form-item>
          </el-col>
          <el-col :span="4">
          <div style="text-align:right;margin-bottom:30px">
            <el-button type="primary" @click="searchList">查 询</el-button>
            <el-button @click="cleanUp">清 空</el-button>
          </div>
          </el-col>
          </el-row>
        </el-form>
        <el-table style="width: 100%" :data="tableData2">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="tradeId" label="交易id" min-width="100"></el-table-column>
          <el-table-column prop="ctnm" label="主体名称" min-width="100"></el-table-column>
          <el-table-column prop="ctid" label="证件号码" min-width="100"></el-table-column>
          <el-table-column prop="ctac" label="账号" min-width="140"></el-table-column>
          <el-table-column v-if="titleType.YT" prop="crpp" label="用途" min-width="100"></el-table-column>
          <el-table-column v-if="titleType.JYSJ" prop="tstm" label="交易时间" min-width="140"></el-table-column>
          <el-table-column v-if="titleType.DBJYJE" prop="crat" label="单笔交易金额" min-width="100"></el-table-column>
          <el-table-column v-if="titleType.JYFS" prop="tstp" label="交易方式" min-width="100"></el-table-column>
          <el-table-column v-if="titleType.JYLX" prop="industry" label="交易类型" min-width="100"></el-table-column>
          <el-table-column v-if="titleType.JYFSD" prop="trcd" label="交易发生地" min-width="140"></el-table-column>
          <el-table-column v-if="titleType.LJJYJE" prop="crats" label="累计交易金额" min-width="120"></el-table-column>
          <el-table-column prop="xmlTypeStr" label="报文类型" min-width="140"></el-table-column>
          <el-table-column prop="handle" label="处理状态" min-width="140">
            <template slot-scope="scope">
              <span>{{scope.row.handle =='0'?'未处理':'已处理'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="option" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                :disabled="!scope.row.handle == '0'"
                type="text"
                @click="changeStatus(scope)"
              >标记为已处理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="pageInfo2.pageNum"
          :page-size="pageInfo2.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo2.total"
          background
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isValidInput } from '@/utils/formValidate'
import { claimApi } from '@/api/sys-monitoringAnalysis/taskManagement/seniorwarning/wrokflow.js'
import { getData, single, querySubject, changeStatus, getTitle } from '@/api/sys-monitoringAnalysis/roster-warning/warning-result.js'
export default {
  data() {
    return {
      dataList: [],
      form: {
        ctnm: '',
        ctid: '',
        ctac: ''
      },
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      pageInfo2: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      params: {},
      tableData2: [],
      batchStart: '',
      batchEnd: '',
      subjectArr: [],
      ruleName: '',
      ctnmDisable: false,
      titleType: {
        JYFSD: false,
        JYFS: false,
        YT: false,
        JYSJ: false,
        LJJYJE: false,
        DBJYJE: false,
        JYLX: false
      },
      formRules: {
        ctnm: [{ validator: isValidInput, trigger: 'blur' }],
        ctid: [{ validator: isValidInput, trigger: 'blur' }],
        ctac: [{ validator: isValidInput, trigger: 'blur' }]
      }
    }
  },
  watch: {
    businessFlag(val) {
      if (val) {
        this.updateForm()
        this.$store.dispatch('changeFlag', false)
      }
    },
    formContent: {
      handler(newVal, oldVal) {
        if (newVal.workflow) {
          if (newVal.workflow.nodeAttributes) {
            if (newVal.workflow.nodeAttributes.length > 0) {
              if (
                newVal.workflow.nodeAttributes[0].extendKey === 'editFlag' &&
              newVal.workflow.nodeAttributes[0].extendValue === 'Y'
              ) {
                this.isDisabled = false
              } else {
                this.isDisabled = true
              }
            }
          }
        }
        this.dataList = newVal.list[0]
        // this.form.ctnm = this.dataList.ctnm
        // this.ctnmDisable = true
        console.log(this.dataList, '58585858')
        this.mainInfo()
        this.querySubjectArr()
      }
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'userInfo', 'institution', 'formContent']),
    paramsObj() {
      const obj = Object.assign({}, this.pageInfo)
      obj.taskId = this.dataList.taskId
      obj.ctid = this.dataList.ctid
      obj.ctnm = this.dataList.ctnm
      obj.ctac = this.dataList.ctac
      obj.batchdt = this.dataList.batchdt
      this.ruleName = this.dataList.ruleName
      const batchArr = this.dataList.batchdt.split('~')
      const arr1 = batchArr[0].split('-')
      const arr2 = batchArr[1].split('-')
      this.batchStart = arr1[0] + '年' + Number(arr1[1]) + '月' + arr1[2] + '日'
      this.batchEnd = arr2[0] + '年' + Number(arr2[1]) + '月' + arr2[2] + '日'
      delete obj.total
      return obj
    },
    paramsObj2() {
      const obj = {}
      obj.batchdt = this.dataList.batchdt ? this.dataList.batchdt : ''
      obj.taskId = this.dataList.taskId ? this.dataList.taskId : ''
      obj.ctnm = this.form.ctnm ? this.form.ctnm : ''
      obj.ctac = this.form.ctac ? this.form.ctac : ''
      obj.ctid = this.form.ctid ? this.form.ctid : ''
      obj.ctnm2 = this.dataList.ctnm ? this.dataList.ctnm : ''
      obj.ctac2 = this.dataList.ctac ? this.dataList.ctac : ''
      obj.ctid2 = this.dataList.ctid ? this.dataList.ctid : ''
      return obj
    }
  },
  // mounted() {
  //   this.mainInfo()
  //   this.querySubjectArr()
  // },
  methods: {
    searchList() {
      this.$refs.searchForm.validate(val => {
        if (val) {
          this.pageInfo2.total = 0
          this.pageInfo2.pageNum = 1
          this.params = Object.assign({}, this.paramsObj2, this.pageInfo2)
          this.viewSingle()
        }
      })
    },
    cleanUp() {
      this.form.ctid = ''
      this.form.ctac = ''
      this.form.ctnm = ''
    },
    concernObject(scope) {
      this.$router.push({ name: 'rosterManageanalyst_handleImport', params: { type: 'attention' }, query: { subject: scope.row }})
    },
    getTitle() {
      getTitle(this.dataList.taskId).then(res => {
        if (res.code === 200) {
          for (var item in this.titleType) {
            if (res.data.indexOf(item) !== -1) {
              this.titleType[item] = true
            }
          }
        }
      })
    },
    // 调取工作流
    callWorkFlow() {
      //   this.$refs['xxxx'].validate(valid => {
      //     if (valid) {
      this.$store.dispatch('workFlow', { configCode: 'seniorListWarnQuery' })
      this.$store.dispatch('openWorkFlow', true)
      // } else {
      //   return false
      // }
      //   })
    },
    updateForm() {
      const obj = {}
      obj.ctid = this.dataList.ctid
      obj.ctnm = this.dataList.ctnm
      obj.workStatus = this.dataList.workstatus
      console.log(obj, 323232)
      claimApi(obj, this.workFlow2business).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功',
            duration: 6000
          })
          this.$store.dispatch('changeFlag', false)
          setTimeout(() => {
            this.$router.push({ name: 'home' })
          }, 1000)
        }
      })
    },
    // 获取主体信息
    mainInfo() {
      getData(this.paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.list
            this.pageInfo.total = res.data.total
            // this.form.ctnmObj = res.data.list[0] ? res.data.list[0] : {}
            this.tableData.forEach(res => {
              for (var item in res) {
                if (res[item] === '@N' || res[item] === 'null' || res[item] === '-') {
                  res[item] = ''
                }
              }
            })
          }
        })
        .then(res => {
          this.viewSingle()
          this.getTitle()
        })
    },
    // 产看单条主体的交易结果
    viewSingle() {
      this.params = Object.assign({}, this.paramsObj2, this.pageInfo2)
      single(this.params).then(res => {
        if (res.code === 200) {
          if (res.data) {
            this.tableData2 = res.data.list
            this.pageInfo2.total = res.data.total
            this.tableData2.forEach(res => {
              for (var item in res) {
                if (res[item] === '@N' || res[item] === 'null' || res[item] === '-') {
                  res[item] = ''
                }
              }
            })
          } else {
            this.tableData2 = []
            this.pageInfo2.total = 0
          }
        }
      })
    },
    changeMain() {
      this.viewSingle()
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.mainInfo()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.mainInfo()
    },
    // 切换分页条数
    handleSizeChange2(size) {
      this.pageInfo2.pageSize = size
      this.viewSingle()
    },
    // 点击切换分页
    handleCurrentChange2(pageNum) {
      this.pageInfo2.pageNum = pageNum
      this.viewSingle()
    },
    querySubjectArr() {
      querySubject(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.subjectArr = res.data
          this.$store.dispatch('seniorListNumberArr', res.data)
        }
      })
    },
    queryBySubject(row) {
      const subject = {
        subName: row.ctnm,
        subNumber: row.ctid,
        accountNumber: row.ctac
      }
      const subArr = []
      subArr.push(subject)
      this.$router.push({ name: 'dataQuery_automaticQuery', query: { subject: subArr }})
    },
    queryBySubjectArr() {
      this.$router.push({ name: 'dataQuery_automaticQuery', query: { subjectArr: this.subjectArr }})
    },
    changeStatus(scope) {
      const obj = {
        expId: scope.row.expId,
        tradeId: scope.row.tradeId,
        batchdt: scope.row.batchdt
      }
      // const fd = new FormData()
      // fd.append('expId', scope.row.expId)
      // fd.append('tradeId', scope.row.tradeId)
      // fd.append('batchdt', scope.row.batchdt)
      changeStatus(obj).then(res => {
        if (res.code === 200) {
          this.viewSingle()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.attention-btn {
  vertical-align: -webkit-baseline-middle;
  padding: 4px 10px;
}
</style>
