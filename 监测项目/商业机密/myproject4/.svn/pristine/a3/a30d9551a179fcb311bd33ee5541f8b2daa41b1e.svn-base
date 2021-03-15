<template>
  <div class="content">
    <el-card>
      <div slot="header" class="clearfix">
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
        </el-pagination>
      </div>

      <div style="margin-top:50px">
        <el-form ref="searchForm" :model="form" :rules="formRules" :inline="true">
          <el-row>
          <el-col :span="6">
          <el-form-item label="主体名称：" prop="ctnm">
            <el-input v-model="form.ctnm" placeholder="请输入主体名称,最长50字符" maxlength="50"/>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="证件号码：" prop="ctid">
            <el-input v-model="form.ctid" placeholder="请输入证件号码,最长50字符" maxlength="50"/>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="账号：" prop="ctac">
            <el-input v-model="form.ctac" placeholder="请输入账号,最长50字符" maxlength="50"/>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <div style="text-align:right;margin-bottom:30px">
            <el-button type="primary" @click="searchList">查 询</el-button>
            <el-button @click="cleanUp">清 空</el-button>
          </div>
          </el-col>
          </el-row>
        </el-form>
        <el-table style="width: 100%" :data="tableData2">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
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
          <el-table-column prop="xmlTypeStr" label="报文类型" min-width="80"></el-table-column>
          <el-table-column prop="handleState" label="处理状态" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.handle =='0'?'未处理':'已处理'}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" prop="option" label="操作" width="140">
            <template slot-scope="scope">
              <el-button :disabled="!scope.row.handle == '0'" type="text" @click="changeStatus(scope)">标记为已处理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="pageInfo2.pageNum" :page-size="pageInfo2.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo2.total" background>
        </el-pagination>
      </div>
      <div style="text-align:center;margin-top:28px">
        <el-button type="primary" @click="goBack">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { isValidInput } from '@/utils/formValidate'
import { EchoList } from '@/api/sys-monitoringAnalysis/taskManagement/seniorwarning/new.js'
import { getData, single, querySubject, changeStatus, getTitle } from '@/api/sys-monitoringAnalysis/roster-warning/warning-result.js'
export default {
  data() {
    return {
      listData: [],
      form: {
        ctnm: '',
        ctid: '',
        ctac: ''
        // state: false
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
      routeJson: {},
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
  computed: {
    paramsObj() {
      const obj = Object.assign({}, this.pageInfo)
      if (this.$route.query.id) {
        obj.batchdt = this.listData.batchdt
        obj.ctid = this.listData.ctid
        obj.ctnm = this.listData.ctnm
        obj.ctac = this.listData.ctac
        obj.taskId = this.listData.taskId
        this.ruleName = this.listData.ruleName
        const batchArr = this.listData.batchdt.split('~')
        const arr1 = batchArr[0].split('-')
        const arr2 = batchArr[1].split('-')
        this.batchStart = arr1[0] + '年' + Number(arr1[1]) + '月' + arr1[2] + '日'
        this.batchEnd = arr2[0] + '年' + Number(arr2[1]) + '月' + arr2[2] + '日'
      } else {
        obj.batchdt = this.$route.query.batchdt
        obj.ctid = this.$route.query.ctid
        obj.ctnm = this.$route.query.ctnm
        obj.ctac = this.$route.query.ctac
        obj.taskId = this.$route.query.taskId
        this.ruleName = this.$route.query.ruleName
        const batchArr = this.$route.query.batchdt.split('~')
        const arr1 = batchArr[0].split('-')
        const arr2 = batchArr[1].split('-')
        this.batchStart = arr1[0] + '年' + Number(arr1[1]) + '月' + arr1[2] + '日'
        this.batchEnd = arr2[0] + '年' + Number(arr2[1]) + '月' + arr2[2] + '日'
      }
      delete obj.total
      return obj
    },
    paramsObj2() {
      const obj = {}
      if (this.$route.query.code) {
        obj.batchdt = this.$route.query.batchdt ? this.$route.query.batchdt : ''
        obj.taskId = this.$route.query.taskId ? this.$route.query.taskId : ''
        obj.ctnm = this.form.ctnm ? this.form.ctnm : ''
        obj.ctac = this.form.ctac ? this.form.ctac : ''
        obj.ctid = this.form.ctid ? this.form.ctid : ''
        obj.ctnm2 = this.$route.query.ctnm ? this.$route.query.ctnm : ''
        obj.ctid2 = this.$route.query.ctid ? this.$route.query.ctid : ''
        obj.ctac2 = this.$route.query.ctac ? this.$route.query.ctac : ''
      } else if (this.$route.query.id) {
        obj.batchdt = this.listData.batchdt
        // obj.ctid = this.listData.ctid
        // obj.ctnm = this.listData.ctnm
        obj.taskId = this.listData.taskId
        obj.ctnm = this.form.ctnm ? this.form.ctnm : ''
        obj.ctac = this.form.ctac ? this.form.ctac : ''
        obj.ctid = this.form.ctid ? this.form.ctid : ''
        obj.ctnm2 = this.listData.ctnm ? this.listData.ctnm : ''
        obj.ctid2 = this.listData.ctid ? this.listData.ctid : ''
        obj.ctac2 = this.listData.ctac ? this.listData.ctac : ''
      } else {
        obj.batchdt = this.$route.query.batchdt ? this.$route.query.batchdt : ''
        obj.taskId = this.$route.query.taskId ? this.$route.query.taskId : ''
        obj.ctnm = this.form.ctnm ? this.form.ctnm : ''
        obj.ctac = this.form.ctac ? this.form.ctac : ''
        obj.ctid = this.form.ctid ? this.form.ctid : ''
      }
      return obj
    }
  },

  mounted() {
    if (this.$route.query.id) {
      this.routeJson = JSON.parse(this.$route.query.id)
      if (this.routeJson.batchdt && this.routeJson.taskId) {
        this.$route.query.id = ''
        this.$route.query.taskId = this.routeJson.taskId
        this.$route.query.batchdt = this.routeJson.batchdt[0]
        this.mainInfo()
        this.querySubjectArr()
      } else {
        this.getList()
      }
    } else {
      this.mainInfo()
      this.querySubjectArr()
    }
  },
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
      console.log(scope)
      this.$router.push({ name: 'rosterManageanalyst_handleImport', params: { type: 'attention' }, query: { subject: scope.row }})
    },
    getList() {
      EchoList(this.$route.query.id).then(res => {
        if (res.code === 200) {
          this.listData = res.data.list[0]
          // this.form.ctnm = this.listData.ctnm
          // this.ctnmDisable = true
          this.$route.query.taskId = this.listData.taskId
        }
      }).then(res => {
        this.mainInfo()
        this.querySubjectArr()
      })
    },
    // 获取主体信息
    mainInfo() {
      getData(this.paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.list
            this.tableData.forEach(res => {
              for (var item in res) {
                if (res[item] === '@N' || res[item] === 'null' || res[item] === '-') {
                  res[item] = ''
                }
              }
            })
            this.pageInfo.total = res.data.total
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
    getTitle() {
      getTitle(this.$route.query.taskId).then(res => {
        if (res.code === 200) {
          for (var item in this.titleType) {
            if (res.data.indexOf(item) !== -1) {
              this.titleType[item] = true
            }
          }
        }
      })
    },
    changeMain(val) {
      console.log(val)
      this.viewSingle()
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.mainInfo(this.paramsObj)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.mainInfo(this.paramsObj)
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
        }
      })
    },
    queryBySubject(row) {
      const subject = {
        subName: row.ctnm,
        subNumber: row.ctid,
        accountNumber: row.ctac,
        subType: !row.ctnm && row.ctid ? '机构' : (row.ctnm && !row.ctid) || (!row.ctid && !row.ctnm) ? '个人' : ''
      }
      const subArr = []
      subArr.push(subject)
      this.$router.push({ name: 'dataQuery_automaticQuery', query: { subject: subArr }})
    },
    queryBySubjectArr() {
      this.subjectArr.forEach(res => {
        res.subType = !res.subName && res.subNumber ? '机构' : (res.subName && !res.subNumber) || (!res.subNumber && !res.subName) ? '个人' : ''
      })
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
          this.getTitle()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.isReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
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
