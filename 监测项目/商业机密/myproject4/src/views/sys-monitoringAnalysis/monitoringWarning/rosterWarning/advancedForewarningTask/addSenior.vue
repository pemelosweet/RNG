<template>
  <el-card class="box-card newTask">
    <div slot="header" class="clearfix">
      <span>新建任务</span>
      <!-- <div style="float: right; padding: 3px 0">
        <span type="text">新建时间：2017-12-25</span>
        <span style="margin-left:20px">创建人： 张明</span>
      </div> -->

    </div>
    <div class="content">
      <el-form :model="form" label-width="160px" class="demo-form-inline" ref="taskForm">
        <el-row  class="taskName">
          <el-col :span="18" :offset="2">
            <el-form-item label="任务名称：" prop="wJName" :rules="[{ required: true, message: '请输入任务名称', trigger: 'blur' },{validator: isValidInput, trigger: 'blur'}]">
              <el-input v-model="form.wJName" @blur="validateName" :disabled="!(redirectType == 'add' || (auditorFlag == '0' && this.approveStatus == '3'))" maxlength="50" placeholder="最长50字符数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       
        <div class="nameList">
          <el-row class="title">
            <el-row>
              <el-col :span="12">
                <span style="margin-right:40px">预警名单列表</span>
              </el-col>
              <el-col :span="12" v-if="(auditorFlag === '0' && this.approveStatus === '3') || redirectType == 'add'" style="textAlign:right">
                <div style="padding-right:20px">
                  <el-button type="primary" plain @click="PoupTitle = '新增名单';dialogFormVisible=true;componentId='Poup1'">从中心名单库选择</el-button>
                  <!-- <el-button type="primary" plain @click="PoupTitle = '新增名单';dialogFormVisible=true;componentId='Poup2'">从分析员关注名单中选择</el-button>
                  <el-upload class="upload-demo" :on-success="onSuccess" :action="fileUrl" multiple style="display:inline-block;margin-left:10px" :show-file-list="false" accept=".xlsx">
                    <el-button type="primary" plain>导入预警主体</el-button>
                  </el-upload>

                  <el-button type="text" icon="el-icon-download" @click="dowloadTemplate">下载模板</el-button> -->
                </div>

              </el-col>
            </el-row>
          </el-row>
          <el-table 
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)" 
          style="width: 100%" 
          :data="rosterData" >
            <el-table-column label="序号" type="index" fixed="left"></el-table-column>
            <el-table-column prop="subjectName" label="主体名称" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="subjectINum" label="证件号码" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sourceDire" label="来源方向" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sourceBusiness" label="来源业务" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column label="账号" min-width="140">
              <template slot-scope="scope">
                  <div v-if="scope.row.charosterAccountDOS">
                    <el-tooltip placement="top-start">
                      <template slot="content">
                        <div style="margin-bottom:10px" v-for="(item,index) in scope.row.charosterAccountDOS" :key="index">
                          {{item.accountNum}}
                          <br/>
                        </div>
                      </template>
                      <span v-for="(item,index) in scope.row.charosterAccountDOS" :key="index">
                        <span>{{item.accountNum}}</span>
                      </span>
                    </el-tooltip>
                  </div>
                  <div v-if="scope.row.listAccountDOList">
                    <el-tooltip placement="top-start">
                    <template slot="content">
                      <div style="margin-bottom:10px" v-for="(item,index) in scope.row.listAccountDOList" :key="index">
                        {{item.accountNum}}
                        <br/>
                      </div>
                    </template>
                    <span v-for="(item,index) in scope.row.listAccountDOList" :key="index">
                      <span>{{item.accountNum}}</span>
                    </span>
                    </el-tooltip>
                  </div>
              </template>
            </el-table-column>
             <el-table-column label="涉罪类型" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.charosterPreliminaryJudgmentDOList" :key="index">{{item.preliminaryJudgme}}</span>
              </template>
            </el-table-column>
          </el-table>
          
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
          </el-pagination>
        </div>
      
        <div data-v-58e4f814="" class="divider divider-horizontal"></div>
        <div class="roleList">
          <el-row class="title">
            <el-col :span="12">
              <span style="margin-right:20px">预警规则列表</span>
            </el-col>
            <el-col :span="12" v-if="(auditorFlag === '0' &&  this.approveStatus === '3') || redirectType == 'add'" style="textAlign:right; margin-bottom:10px">
              <el-button type="primary" plain @click="PoupTitle = '选择预警规则';dialogFormVisible=true;componentId='Rule'">添加预警规则</el-button>
            </el-col>
          </el-row>
          <el-table style="width: 100%" :data="ruleData">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="ruleName" label="规则名称" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column label="监测周期" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.mCycleStart">{{`${scope.row.mCycleStart}~${scope.row.mCycleEnd}`}}</span>
                <span v-else>—</span>
              </template>
            </el-table-column>
            <el-table-column prop="wornCycle" label="预警周期" min-width="100" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="JCFW" label="预警范围" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                  <div slot="content" v-for="(item,index2) in scope.row.listWarnRangeDO" :key="index2" style="margin:4px">{{item.rangeName}}</div>
                  <span v-for="(item,index) in scope.row.listWarnRangeDO" :key="index">
                    <span v-if="index==0">{{item.rangeName}}</span>
                  </span>
                </el-tooltip>

              </template>
            </el-table-column> -->
            <el-table-column prop="wornLevel" label="预警程度" min-width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="option" label="操作" width="140" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="viewSingle(scope.row.ruleId)">查看预警条件</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo2.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
          </el-pagination> -->

        </div>

      </el-form>
      <div style="textAlign:center">
        <el-button type="primary" v-if="(auditorFlag === '0' && this.approveStatus === '3')  || redirectType == 'add'" @click="publish('taskForm')" :loading="loading2">保 存</el-button>
        <el-button type="primary" v-if="(auditorFlag === '0' && this.approveStatus === '3')  || redirectType == 'add'" @click="callWorkFlow" :loading="loading2">提交审核</el-button>
        <el-button @click="goBack">返 回</el-button>
      </div>
    </div>
    <monitor-workflow></monitor-workflow>
    <!-- 弹框内容 -->
    <div>
      <el-dialog :visible.sync="dialogFormVisible" :title="PoupTitle" @open='openDialog' width="70%" top="20px" @close="closeDialog">
        <!-- <keep-alive> -->
          <component v-bind:is="componentId" @listFn="getData" ref="dialogComponent"></component>
        <!-- </keep-alive> -->
      </el-dialog>
    </div>

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

</template>

<script>
import {
  publish,
  single,
  validateName,
  seniorApproving
} from '@/api/sys-monitoringAnalysis/roster-warning/warning-task.js'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import {
  ruleDetail
} from '@/api/sys-monitoringAnalysis/roster-warning/warning-rule.js'
import Poup1 from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningTask/poup1.vue'
// import Poup2 from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningTask/poup2.vue'
import Rule from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/advancedForewarningTask/rulePoup.vue'
import { commonPattern } from '@/utils/formValidate'
// import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { centerRoster } from '@/api/sys-monitoringAnalysis/roster-warning/warning-task.js'
export default {
  components: {
    Poup1,
    // Poup2,
    Rule
  },
  data() {
    return {
      token: getToken(),
      form: {
        wJName: '',
        wJId: '',
        yesOrNot: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      loading2: false,
      loading: false,
      dialogFormVisible: false,
      dialogVisible: false,
      singleRuleData: [],
      ruleData: [],
      rosterData: [],
      componentId: 'Poup1',
      showTableItem: 'center',
      PoupTitle: '',
      approveStatus: '',
      approveResult: '',
      dialogForm: {
        preliminaryJudgment: ''
      }
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'userInfo', 'institution']),
    // isCenter() {
    //   return this.institution === this.GLOBAL.INSTITUTION_CENTER
    // },
    wJId() {
      return this.$route.params.id
    },
    auditorFlag() {
      return this.$route.params.auditorFlag
    },
    redirectType() {
      return this.$route.params.type
    },
    fileUrl() {
      return `monitor/listwarn/warn-job/upFile?token=` + this.token
    },
    downloadUrl() {
      return `monitor/listwarn/warn-job/downloadFile?token=` + this.token
    },
    searchParams() {
      const obj = Object.assign({}, this.dialogForm, this.pageInfo)
      return obj
    }
  },
  created() {
    if (this.$route.params.id) {
      this.backView()
    }
    if (this.$route.params.preliminaryJudgment) {
      this.dialogForm.preliminaryJudgment = this.$route.params.preliminaryJudgment
    }
  },

  methods: {
    // 获取数据字典
    // getDictionary(params) {
    //   dictionary(params).then(res => {
    //     if (res.code === 200) {
    //       switch (params) {
    //         case 'SCDT':
    //           this.sourceDireArr = res.data
    //           break
    //         case 'SCDS':
    //           this.sourceBusinessArr = res.data
    //           break
    //         case 'TOSC':
    //           this.dialogJudgmentData = res.data
    //           break
    //         default:
    //           break
    //       }
    //     }
    //   })
    // },
    dowloadTemplate() {
      location.href = this.downloadUrl
    },
    // 文件上传成功
    onSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.$message({
          message: '文件上传成功',
          type: 'success'
        })
        this.showTableItem = 'file'
        this.rosterData = response.data
      } else {
        this.$message({
          message: '文件格式错误',
          type: 'info'
        })
      }
    },
    // 关闭弹层
    closeDialog() {
      this.$refs.dialogComponent.tableData = []
      this.$refs.dialogComponent.dialogForm = {}
      this.$refs.dialogComponent.params = {}
      this.$refs.dialogComponent.isReplenishOne = false
      this.$refs.dialogComponent.isReplenishTwo = false
      this.$refs.dialogComponent.pageInfo = {
        pageNum: 1,
        pageSize: 10
      }
      this.$refs.dialogComponent.pageInfo.total = 0
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
    fetchData() {
      this.loading = true
      centerRoster(this.searchParams).then(res => {
        if (res.code === 200) {
          this.rosterData = res.data.pageInfo.list
          this.rosterData.forEach(res => {
            res.iNum = res.subjectINum
          })
          this.pageInfo.total = res.data.pageInfo.total
          this.loading = false
        } else {
          this.loading = false
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 获取数据
    getData(data) {
      console.log(data)
      this.dialogFormVisible = data.Visible
      if (data.showTableItem) this.showTableItem = data.showTableItem
      if (this.componentId.indexOf('Poup') !== -1) {
        if (data.preliminaryJudgment) {
          this.dialogForm.preliminaryJudgment = data.preliminaryJudgment
          this.rosterData = data.selectArr
          this.pageInfo.total = data.total
          // this.rosterData.forEach(res => {
          //   res.wType = this.showTableItem
          // })
        }
        this.form.yesOrNot = data.yesOrNot
      }
      if (this.componentId === 'Rule') {
        if (data.ruleData.length !== 0) {
          this.ruleData = data.ruleData
          this.ruleData.forEach(res => {
            res.wType = this.showTableItem
          })
        }
      }
    },
    // 发布
    publishFn() {
      // lcnId laId subjectName sourceBusiness sourceDire  iNum证件号码  wType：类型  subjectType impName  listSourceDocNum remark listAccountDOList
      this.$refs.taskForm.validate(valid => {
        // if (valid) {
        //   if (this.wJId) {
        //     temObj.wJId = _this.wJId
        //     modify(temObj).then(res => {
        //       if (res.code === 200) {
        //         this.$message({
        //           message: '修改成功',
        //           type: 'success'
        //         })
        //         _this.$router.push({ name: 'forewarningTask' })
        //       }
        //     })
        //   } else {
        //     publish(temObj).then(res => {
        //       if (res.code === 200) {
        //         this.$message({
        //           message: '添加成功',
        //           type: 'success'
        //         })
        //         _this.$router.push({ name: 'forewarningTask' })
        //       } else if (res.code === 201) {
        //         this.$message({
        //           message: res.message,
        //           type: 'warning'
        //         })
        //       }
        //     })
        //   }
        // } else {
        //   this.$message({
        //     message: '请输入任务名称',
        //     type: 'info'
        //   })
        // }
      })
    },
    // 编辑回显
    backView() {
    // 获取数据
      single(this.wJId).then(res => {
        if (res.code === 200) {
          var data = res.data.listWarnDOS
          for (var i = 0, len = data.length; i < len; i++) {
            const current = data[i]
            if (current.wType) {
              if (current.wType === 'warnMain') {
                this.showTableItem = 'file'
              } else if (current.wType === 'center') {
                this.showTableItem = 'center'
              } else if (current.wType === 'analyst') {
                this.showTableItem = 'analyst'
              }
              break
            }
          }
          this.fetchData()
          this.ruleData = res.data.warnRuleDOList
          this.form.wJName = res.data.wJName
          this.approveStatus = res.data.approveStatus
          for (let i = 0; i < this.rosterData.length; i++) {
            this.rosterData[i].charosterPreliminaryJudgmentDOList = this.rosterData[i].listWarnJobPreliminaryJudgmentDO
            delete this.rosterData[i].listWarnJobPreliminaryJudgmentDO
            // for (let j = 0; j < this.rosterData[i].listAccountDOList.lenth; j++) {
            //   this.rosterData[i].listAccountDOList[j].accountNum = this.rosterData[i].listAccountDOList[j].accNum
            //   delete this.rosterData[i].listAccountDOList[j].accNum
            // }
            // this.rosterData[i].listAccountDOList = this.rosterData[i].listAccountDOList
          }
        }
      })
    },
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 调取工作流
    callWorkFlow() {
      if (this.form.wJName === '') {
        this.$message({
          message: '请输入任务名称',
          type: 'info'
        })
      } else if (this.rosterData.length === 0) {
        this.$message({
          message: '请选择预警名单',
          type: 'info'
        })
      } else if (this.ruleData.length === 0) {
        this.$message({
          message: '请选择预警规则',
          type: 'info'
        })
      } else {
        this.$refs['taskForm'].validate(valid => {
          if (valid) {
            if (this.showTableItem === 'file') {
              this.$confirm(`是否需要进行历史交易监测`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.form.yesOrNot = '0'
                this.$store.dispatch('workFlow', { configCode: 'seniorListWarnJob' })
                this.$store.dispatch('openWorkFlow', true)
              }).catch(() => {
                this.form.yesOrNot = '1'
                this.$store.dispatch('workFlow', { configCode: 'seniorListWarnJob' })
                this.$store.dispatch('openWorkFlow', true)
              })
            } else {
              this.form.yesOrNot = '1'
              this.$store.dispatch('workFlow', { configCode: 'seniorListWarnJob' })
              this.$store.dispatch('openWorkFlow', true)
            }
          } else {
            return false
          }
        })
      }
    },
    nextStep() {
      const ruleDataObj = this.ruleData
      var rosterDataObj = {}
      if (this.rosterData.length > 10) {
        rosterDataObj = this.rosterData.slice(0, 10)
      } else {
        rosterDataObj = this.rosterData
      }

      const listWarnJobDO = {
        warnRuleDOList: ruleDataObj,
        preliminaryJudgme: this.dialogForm.preliminaryJudgment,
        listWarnDOS: rosterDataObj,
        wJName: this.form.wJName,
        yesOrNot: this.form.yesOrNot,
        wJId: this.wJId,
        advancedWarnJob: '1'
      }
      this.$refs['taskForm'].validate((valid) => {
        if (valid) {
          this.loading2 = true
          seniorApproving(listWarnJobDO, this.workFlow2business).then(res => {
            if (res.code === 200) {
              this.loading2 = false
              this.$message({
                duration: 6000,
                message: '提交成功！',
                type: 'success'
              })
              this.$router.push({ name: 'advancedForewarningTask' })
            } else {
              this.loading2 = false
            }
          }).catch(() => {
            this.loading2 = false
          })
        } else {
          return false
        }
      })
    },
    // 保存
    publish(formName) {
      if (this.form.wJName === '') {
        this.$message({
          message: '请输入任务名称',
          type: 'info'
        })
      } else if (this.rosterData.length === 0) {
        this.$message({
          message: '请选择预警名单',
          type: 'info'
        })
      } else if (this.ruleData.length === 0) {
        this.$message({
          message: '请选择预警规则',
          type: 'info'
        })
      } else {
        const ruleDataObj = this.ruleData
        var rosterDataObj = {}
        if (this.rosterData.length > 10) {
          rosterDataObj = this.rosterData.slice(0, 10)
        } else {
          rosterDataObj = this.rosterData
        }

        const jointAnalysisDO = {
          warnRuleDOList: ruleDataObj,
          preliminaryJudgme: this.dialogForm.preliminaryJudgment,
          listWarnDOS: rosterDataObj,
          wJName: this.form.wJName,
          wJId: this.wJId,
          advancedWarnJob: '1',
          yesOrNot: '1'
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading2 = true
            publish(jointAnalysisDO).then(res => {
              if (res.code === 200) {
                this.$message({
                  duration: 6000,
                  message: '保存成功！',
                  type: 'success'
                })
                this.fetchData()
                this.loading2 = false
                this.$router.push({ name: 'advancedForewarningTask' })
              } else {
                this.loading2 = false
              }
            }).catch(() => {
              this.loading2 = false
            })
          } else {
            return false
          }
        })
      }
    },
    openDialog() {
      console.log(this.componentId)
      if (this.componentId === 'Rule') {
        this.$refs.dialogComponent.fetchData()
      }
      this.$refs.dialogComponent.$refs.searchForm.clearValidate()
    },
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.isReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
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
    validateName() {
      this.$refs.taskForm.validate((valid) => {
        if (valid) {
          if (this.form.wJName.length !== 0) {
            validateName({ wJName: this.form.wJName }).then(res => {
              if (res.code === 201) {
                this.$message({
                  message: res.message,
                  type: 'error',
                  duration: 6000
                })
              }
            })
          }
        }
      })
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    }
  }
}
</script>
<style scope lang="scss">
.content {
  span{
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .divider divider-horizontal {
    height: 1px;
    background-color: #e8e8e8;
    margin: 24px 0 32px 0;
  }
  .nameList {
    .title {
      margin-bottom: 10px;
    }

    margin-bottom: 30px;
  }
  .roleList {
    margin-bottom: 30px;
  }
}
</style>
