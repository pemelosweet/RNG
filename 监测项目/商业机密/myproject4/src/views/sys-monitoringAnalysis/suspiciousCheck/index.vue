<template>
  <div
    class="suspiciousCheck-index"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <el-card>
      <div slot="header">
        <span>重点可疑交易报告核对管理查询</span>
        <div style="float:right;" v-if="!powers">
        <!-- <div style="float:right;"> -->
          <router-link :to="{name:'suspiciousCheck_batchImport'}">
            <el-button
              v-if="isBranch"
              type="text"
            >批量导入</el-button>
          </router-link>
          <span
            class="itemline"
            v-if="isBranch"
            style="color:#409EFF"
          >|</span>
          <router-link :to="{name:'suspiciousCheck_add'}">
            <el-button
              v-if="isBranch"
              type="text"
            >手工录入</el-button>
          </router-link>
        </div>
      </div>
      <el-form
        :model="form"
        ref="forms"
        label-width="120px"
        class="search"
      >
        <el-row>
<el-col :span="8">
          <el-form-item
            label="分支机构名称："
            prop='localBank'
            v-if='isBranch'
          >
          <el-select
              style="width:100%"
              v-model="user_riid"
              placeholder="请选择机构"
							:disabled="isBranch"
              clearable
            >
              <el-option
                v-for="(item,index) in localBankArr"
                :key="index"
                :value="item.codeId"
                :label="item.codeName"
              ></el-option>
            </el-select>
            <!-- <el-input
              disabled
              v-model="this.user_riid"
              placeholder="请选择机构"
              maxlength="50"
            ></el-input> -->
          </el-form-item>
          <el-form-item
            label="分支机构名称："
            prop='localBank'
            v-if='!isBranch'
          >
            <el-select
              style="width:100%"
              v-model="form.localBank"
              placeholder="请选择机构"
              clearable
            >
              <el-option
                v-for="(item,index) in localBankArr"
                :key="index"
                :value="item.codeName"
                :label="item.codeName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="上报时间："
            :inline="true"
            prop='year'
          >
            <el-date-picker
              size="mini"
              style="width:95px;"
              v-model="form.year"
              value-format="yyyy"
              type="year"
              placeholder="年份"
            ></el-date-picker>
            <span>年</span>
            <el-select
              clearable
              v-model="form.quarter"
              placeholder="——"
              style="width:95px;"
            >
              <el-option
                label="全年"
                value="0"
              ></el-option>
              <el-option
                label="上半年"
                value="1"
              ></el-option>
              <el-option
                label="下半年"
                value="2"
              ></el-option>
            </el-select>
            <!-- <span>半年</span> -->
          </el-form-item>
        </el-col>
          <el-col :span='8'>
          <el-form-item
            label="状态"
            prop='approveState'
          >
            <el-select
              style="width:100%"
              v-model="form.approveState"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,index) in approveStateArr"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-row>
          <div style="textAlign:right; margin-bottom:10px">
            <el-button type="primary"  @click="searchData"
          >查 询</el-button>
          <el-button  type="primary" plain @click="cleanUp">清 空</el-button>
          </div>   
      </el-form>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          label="分支机构名称"
          prop="branchM"
        ></el-table-column>
        <el-table-column
          label="上报时间"
          prop="reportTime"
        ></el-table-column>
          <el-table-column
          label="状态"
          prop="approveState"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name:'suspiciousCheck_details',query: { msg: scope.row}}">
              <el-button type="text">查看详情</el-button>
            </router-link>
            <el-button
              type="text"
              @click="exportData(scope)"
            >导 出</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:10px;">
        <!-- <el-col :span="8">
          <el-button type="primary" plain @click="exportData">导 出</el-button>
        </el-col> -->
        <!-- <el-col :span="16"> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          background
        ></el-pagination>
        <!-- </el-col> -->
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { branch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
import { getList, getPower } from '@/api/sys-monitoringAnalysis/suspiciousCheck/index.js'
export default {
  data() {
    return {
      powers: true,
      loading: false,
      delArr: [],
      form: {
        approveState: '',
        localBank: '',
        year: '',
        quarter: [
          { label: '一', value: 1 },
          { label: '二', value: 2 },
          { label: '三', value: 3 },
          { label: '四', value: 4 }
        ],
        value: ''
      },
      approveStateArr: [
        { label: '审核中', value: '0' },
        { label: '已提交', value: '1' },
        { label: '不通过', value: '2' }
      ],
      token: getToken(),
      localBankArr: [],
      tableData: [
        // {
        //   index: 1,
        //   name: '中国银行',
        //   time: '2018年第一季度',
        //   applyId: 1
        // },
        // {
        //   index: 2,
        //   name: '山西银行',
        //   time: '2019年第二季度',
        //   applyId: 2
        // }
      ],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'institution', 'name', 'user_riid']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    },
    searchParams() {
      if (sessionStorage.getItem('searchData')) {
        const searchData = JSON.parse(sessionStorage.getItem('searchData'))
        if (searchData.pageName === this.$route.name && searchData.ifReview) {
          this.pageInfo = searchData.pageInfo
          this.form = searchData.searchFrom
        }
      }
      const obj = Object.assign({}, this.pageInfo)
      delete obj.total
      obj.approveState = this.form.approveState ? this.form.approveState : ''
      obj.branchM = this.form.localBank ? this.form.localBank : ''
      obj.year = this.form.year ? this.form.year : ''
      obj.quarter = this.form.quarter ? this.form.quarter : ''
      return obj
    }
  },
  mounted() {
    console.log(this.user_riid)
    this.getBranch()
    this.getPower()
    this.initList(this.searchParams)
  },
  methods: {
    async getPower() {
      const res = await getPower()
      console.log(res, 111)
      // this.powers = false
      this.powers = res.message === '是'
    },
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJGD' }).then(res => {
        if (res.code === 200) {
          const arr = res.data.list
          arr.forEach(el => {
            if (el.codeId === 'A1000131000023') {
              el.codeName = '上海总部'
            }
          })
          this.localBankArr = arr
        }
      })
    },
    // 获取列表数据方法
    initList(params) {
      this.loading = true
      getList(params)
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            this.pageInfo.total = res.data.total
            const arry = res.data.list // 获取的数据
            const arr = []
            arry.forEach(el => {
              const obj = {}
              switch (el.quarter) {
                case '1':
                  el.quarter = '一'
                  break
                case '2':
                  el.quarter = '二'
                  break
                case '3':
                  el.quarter = '三'
                  break
                case '4':
                  el.quarter = '四'
                  break
                default:
                  break
              }
              switch (el.approveState) {
                case '0':
                  el.approveState = '审核中'
                  break
                case '1':
                  el.approveState = '已提交'
                  break
                case '2':
                  el.approveState = '不通过'
                  break

                default:
                  break
              }
              obj.reportTime = el.year + '年' + el.quarter
              obj.branchM = el.branchM
              obj.id = el.keySusId
              obj.approveState = el.approveState
              arr.push(obj)
            })
            const searchData = {
              pageName: this.$route.name,
              pageInfo: this.pageInfo,
              searchFrom: this.form
            }
            sessionStorage.setItem('searchData', JSON.stringify(searchData))
            this.tableData = arr
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 清空
    cleanUp() {
      this.$refs.forms.resetFields()
      this.form.year = ''
      this.form.quarter = ''
      this.form.localBank = ''
    },
    // 查询
    searchData() {
      this.loading = true
      this.pageInfo.pageNum = 1
      getList(this.searchParams)
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            this.pageInfo.total = res.data.total
            const arry = res.data.list // 获取的数据
            const arr = []
            arry.forEach(el => {
              const obj = {}
              switch (el.quarter) {
                case '1':
                  el.quarter = '一'
                  break
                case '2':
                  el.quarter = '二'
                  break
                case '3':
                  el.quarter = '三'
                  break
                case '4':
                  el.quarter = '四'
                  break
                default:
                  break
              }
              switch (el.approveState) {
                case '0':
                  el.approveState = '审核中'
                  break
                case '1':
                  el.approveState = '已提交'
                  break
                case '2':
                  el.approveState = '不通过'
                  break

                default:
                  break
              }
              obj.approveState = el.approveState
              obj.reportTime = el.year + '年' + el.quarter
              obj.branchM = el.branchM
              obj.id = el.keySusId
              arr.push(obj)
            })
            const searchData = {
              pageName: this.$route.name,
              pageInfo: this.pageInfo,
              searchFrom: this.form
            }
            sessionStorage.setItem('searchData', JSON.stringify(searchData))
            this.tableData = arr
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 导出
    exportData(scope) {
      console.log(scope)

      // if (this.delArr.length === 1) {
      //   const ids = []
      //   this.delArr.forEach(el => {
      //     ids.push(el.id)
      //   })
      //   location.href = `/monitor/keySusReport/output?id=${ids.join(
      //     ','
      //   )}&token=${this.token}`
      // } else {
      //   this.$message({
      //     message: '请选择一条线索！',
      //     type: 'warning'
      //   })
      //   return
      // }
      location.href = `/monitor/keySusReport/output?id=${scope.row.id}&token=${this.token}`
    },
    // 选择要删的数据
    handleChange(val) {
      this.delArr = val
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.initList(this.searchParams)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.initList(this.searchParams)
    }
  }
}
</script>

<style lang="scss">
.suspiciousCheck-index {
  .el-date-editor--daterange {
    min-width: 100%;
  }
}
</style>