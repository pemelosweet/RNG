<template>
  <div class="advancedForewarningRule">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>高级预警规则管理</span>
        <router-link to="advancedForewarningRule/addSenior" style="float: right">
          <el-button type="text" icon="el-icon-plus"> 新增规则</el-button>
        </router-link>
      </div>
      <div class="content">
        <el-form :model="form" ref="searchForm" label-width="114px" class="demo-form-inline" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="规则名称" prop="ruleName">
                <el-input v-model="form.ruleName" placeholder="规则名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预警程度" prop="wornLevel">
                <el-select v-model="form.wornLevel" clearable placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in wornLevelArr" :key="item.codeId" :label="item.codeName" :value="item.codeId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>            
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="预警周期" prop="wornCycle">
                <!-- <el-select v-model="form.wornCycle" clearable placeholder="请选择" disabled="disabled" style="width:100%;">
                  <el-option v-for="item in wornCycleArr" :key="item.codeId" :label="item.codeName" :value="item.codeId">
                  </el-option>
                  <el-option label="日" value="5"></el-option>
                </el-select> -->
                <el-input value="日" disabled></el-input>
              </el-form-item> 
            </el-col>
            <el-col :span="12">
              <el-form-item label="监测周期"  prop="monitorCycle">
                <el-date-picker value-format="yyyy-MM-dd" v-model="form.monitorCycle" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" style="width:100% !important;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <organization-tree :lableWidth="114" ref="tree"></organization-tree>
            </el-col> -->
          </el-row>

          <div class="searchBtn" style="text-align:right;margin-bottom:30px">
            <el-button type="primary" @click="searchList"> 查 询</el-button>
            <el-button @click="cleanUp">清 空</el-button>
          </div>          
        </el-form>
        <el-table 
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)" 
          style="width: 100%" 
          :data="tableData">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="ruleName" label="规则名称" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column label="监测周期" show-overflow-tooltip min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.mCycleStart">{{`${scope.row.mCycleStart}~${scope.row.mCycleEnd}`}}</span>
              <span v-else>—</span>
            </template>
          </el-table-column>
          <el-table-column prop="wornCycle" label="预警周期" min-width="100"></el-table-column>
          <!-- <el-table-column prop="JCFW" label="预警范围" min-width="140">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <div slot="content" v-for="(item,index2) in scope.row.listWarnRangeDO" :key="index2" style="margin:4px">{{item.rangeName}}</div>
                <span v-if="index===0" v-for="(item,index) in scope.row.listWarnRangeDO" :key="index">{{`${item.rangeName}${item.rangeName}`}}</span>
              </el-tooltip>

            </template>
          </el-table-column> -->
          <el-table-column prop="wornLevel" label="预警程度" min-width="140"></el-table-column>
          <el-table-column prop="creUser" label="创建人" min-width="120"></el-table-column>
          <el-table-column prop="option" label="操作" width="140" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="viewSingle(scope.row.ruleId)">查看预警条件</el-button>
              <el-button type="text" @click="deleteSingleRule(scope.row.ruleId,scope)">删除</el-button>
              <el-button type="text" @click="goDetail(scope)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
        </el-pagination>
      </div>

      <!-- 弹框内容 -->
      <div>
        <el-dialog :visible.sync="dialogVisible" title="预警条件详情" top="20px">
          <el-form :model="dialogForm" label-width="200px">
            <div>
              <el-form-item v-for="(item,index) in singleRuleData" :key="index" :label="`${item.worn_value}：`">
                <span v-if="item.para_type=='time'">{{item.param_value.replace('|','~')}}</span>
                <span style="margin:0 10px" v-if="item.br_name && item.para_type !=='time'">{{item.br_name}}</span>
                <span style="margin:0 10px" v-if="item.param_value && item.para_type !=='time'">{{item.param_value}}</span>
              </el-form-item>
            </div>

          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>

          </span>
        </el-dialog>
      </div>

    </el-card>
  </div>

</template>

<script>
import organizationTree from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/organizationTree.vue'
import {
  searchRule,
  ruleDetail,
  isEditable,
  delRule
} from '@/api/sys-monitoringAnalysis/roster-warning/warning-rule.js'
import { ValidQueryInput } from '@/utils/formValidate'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  components: {
    organizationTree
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      form: {
        ruleName: '',
        wornLevel: '',
        wornCycle: '5',
        monitorCycle: ''
      },
      wornLevelArr: [],
      wornCycleArr: [],
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      tableData: [],
      dialogForm: {},
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 4
      },
      rules: {
        ruleName: [{
          validator: ValidQueryInput,
          trigger: 'blur'
        }]
      },
      singleRuleData: [] // 查看预警规则中的要素
    }
  },
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form)
      const newObj = {
        ruleName: obj.ruleName,
        wornLevel: obj.wornLevel,
        wornCycle: obj.wornCycle,
        mCycleStart: obj.monitorCycle === '' ? '' : obj.monitorCycle[0],
        mCycleEnd: obj.monitorCycle === '' ? '' : obj.monitorCycle[1],
        pageNum: obj.pageNum,
        pageSize: obj.pageSize,
        ids: ''
      }
      return newObj
    }
  },
  methods: {
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'WARNDEGREE':
              this.wornLevelArr = res.data
              break
            case 'WARNCYCLE':
              this.wornCycleArr = res.data
              break

            default:
              break
          }
        }
      })
    },
    searchList() {
      this.$refs.searchForm.validate(val => {
        if (val) {
          this.pageInfo.pageNum = 1
          this.params = Object.assign({}, this.searchParams, this.pageInfo)
          this.fetchData()
        }
      })
    },
    noSpaceAndTs(rule, value, callback) {
      var commonPattern = {
        specialChar: /[！#￥：；“”‘’、，|《。》？、【】[\]]/im,
        specialEng: /[`~!@#$%^&*+<>?:"{},.\/;'[\]]/im,
        spaceBar: /^\S*$/
      }
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 清除查询条件
    cleanUp() {
      this.$refs.searchForm.resetFields()
    },

    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData(this.searchParams)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData(this.searchParams)
    },

    // 请求数据
    fetchData() {
      this.loading = true
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.params.advancedWarning = '1'
      searchRule(this.params).then(res => {
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
    },
    // 查看单条规则
    viewSingle(id) {
      ruleDetail(id).then(res => {
        if (res.code === 200) {
          this.singleRuleData = res.data
          this.dialogVisible = true
        }
      })
    },
    goDetail(scope) {
      isEditable({ ruleId: scope.row.ruleId }).then(res => {
        if (res.data === '可编辑') {
          this.$router.push({
            name: 'forewarningRule_addSenior',
            query: {
              id: scope.row.ruleId
            }
          })
        } else {
          const reslutDate = JSON.parse(res.data)
          const obj = {}
          obj.ruleName = reslutDate[0].warnRuleDOList[0].ruleName
          obj.mCycleStart = reslutDate[0].warnRuleDOList[0].mCycleStart.split('-')
          obj.mCycleStart = obj.mCycleStart[0] + '年' + obj.mCycleStart[1] + '月' + obj.mCycleStart[2] + '日'
          obj.mCycleEnd = reslutDate[0].warnRuleDOList[0].mCycleEnd.split('-')
          obj.mCycleEnd = obj.mCycleEnd[0] + '年' + obj.mCycleEnd[1] + '月' + obj.mCycleEnd[2] + '日'
          obj.wJNames = []
          reslutDate.forEach(res => {
            obj.wJNames.push(res.wJName)
          })
          obj.wJNames = '【' + obj.wJNames.join(',') + '】'
          this.$alert(`"${obj.ruleName}"目前应用于${obj.wJNames}等预警任务 (监测周期：${obj.mCycleStart}~${obj.mCycleEnd})，不能进行修改操作！`, {
            confirmButtonText: '确定'
          })
        }
      })
    },
    // 删除单条规则
    deleteSingleRule(id) {
      this.$confirm('是否删除当前数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delRule(id).then(res => {
            if (res.code === 200) {
              if (res.data === '删除成功') {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.fetchData()
              } else {
                const reslutDate = JSON.parse(res.data)
                const obj = {}
                obj.ruleName = reslutDate[0].warnRuleDOList[0].ruleName
                obj.mCycleStart = reslutDate[0].warnRuleDOList[0].mCycleStart.split('-')
                obj.mCycleStart = obj.mCycleStart[0] + '年' + obj.mCycleStart[1] + '月' + obj.mCycleStart[2] + '日'
                obj.mCycleEnd = reslutDate[0].warnRuleDOList[0].mCycleEnd.split('-')
                obj.mCycleEnd = obj.mCycleEnd[0] + '年' + obj.mCycleEnd[1] + '月' + obj.mCycleEnd[2] + '日'
                obj.wJNames = []
                reslutDate.forEach(res => {
                  obj.wJNames.push(res.wJName)
                })
                obj.wJNames = '【' + obj.wJNames.join(',') + '】'
                this.$alert(`"${obj.ruleName}"目前应用于${obj.wJNames}等预警任务 (监测周期：${obj.mCycleStart}~${obj.mCycleEnd})，不能进行删除操作！`, {
                  confirmButtonText: '确定'
                })
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.fetchData()
    this.getDictionary('WARNDEGREE')
    this.getDictionary('WARNCYCLE')
  }
}
</script>
<style lang="scss" >
.forewarningRule {
  .el-select {
    width: 100%;
  }
  .el-range-editor {
    min-width: 100%;
  }
  .content {
    .checkGroup {
      .el-checkbox {
        margin-left: 14px;
      }
    }
  }

  .searchBtn {
    text-align: right;
    margin-bottom: 20px;
  }

  .rang-dialog {
    .list {
      height: 350px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      display: inline-block;
      vertical-align: middle;
      width: 200px;
      max-height: 100%;
      box-sizing: border-box;
      position: relative;
      .title {
        position: relative;
        height: 40px;
        line-height: 40px;
        background: #f5f7fa;
        margin: 0;
        padding-left: 15px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        color: #000;
        .title-num {
          position: absolute;
          right: 15px;
          color: #909399;
          font-size: 12px;
          font-weight: 400;
        }
      }
      .user {
        margin: 0;
        padding: 6px 0;
        list-style: none;
        height: 294px;
        overflow: auto;
        box-sizing: border-box;
        .el-checkbox {
          height: 30px;
          line-height: 30px;
          padding-left: 15px;
          display: block;
          margin-left: 0;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
