<template>
  <el-card class="box-card newTask">
    <div slot="header" class="clearfix">
      <span>预警任务审核</span>
      <!-- <div style="float: right; padding: 3px 0">
        <span type="text">新建时间：2017-12-25</span>
        <span style="margin-left:20px">创建人： 张明</span>
      </div> -->

    </div>
    <div class="content">
      <el-form :model="form"  label-width="160px" class="demo-form-inline" ref="taskForm">
        <el-row v-if="redirectType !== 'approving'" class="taskName">
          <el-col :span="18" :offset="2">
            <el-form-item label="任务名称：" prop="wJName" :rules="[{ required: true, message: '请输入任务名称', trigger: 'change' },{validator: isValidInput, trigger: 'blur'},{ max: 50, message: '名称长度不能超过50个字符', trigger: 'change' }]">
              <el-input v-model="form.wJName" disabled placeholder="预警任务"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row v-if="redirectType == 'approving'" class="taskName">
          <el-col :span="9">
            <el-form-item label="任务名称：">
              {{form.wJName}}
            </el-form-item>
          </el-col>
           <el-col :span="9" :offset="2">
            <el-form-item label="预警名单份数：">
              {{rosterData.length}} 
            </el-form-item>
          </el-col>
        </el-row> -->
       
        <div class="nameList">
          <el-row class="title">
            <el-row>
              <el-col :span="12">
                <span style="margin-right:40px">预警名单列表</span>
              </el-col>
              <!-- <el-col :span="12" style="textAlign:right">
                <div style="padding-right:20px">
                  <el-button type="primary" plain @click="PoupTitle = '新增名单';dialogFormVisible=true;componentId='Poup1'">从中心名单库选择</el-button>
                  <el-button type="primary" plain @click="PoupTitle = '新增名单';dialogFormVisible=true;componentId='Poup2'">从分析员关注名单中选择</el-button>
                  <el-upload class="upload-demo" :on-success="onSuccess" :action="fileUrl" multiple style="display:inline-block;margin-left:10px" :show-file-list="false" accept=".xlsx">
                    <el-button type="primary" plain>导入预警主体</el-button>
                  </el-upload>

                  <el-button type="text" icon="el-icon-download" @click="dowloadTemplate">下载模板</el-button>
                </div>

              </el-col> -->
            </el-row>
          </el-row>
          <el-table style="width: 100%" :data="pageData" tooltip-effect="dark">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="subjectName" label="主体名称" min-width="140" :key='1'></el-table-column>
            <template v-if="showTableItem==='center'">
              <el-table-column prop="sourceDire" label="来源方向" min-width="140" :key='2'></el-table-column>
              <el-table-column prop="sourceBusiness" label="来源业务" min-width="140" :key='3'></el-table-column>
              <el-table-column label="账号" min-width="140"  show-overflow-tooltip :key='4'>
                <template slot-scope="scope">
                  <div v-if="scope.row.charosterAccountDOS">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content" v-for="(item,index2) in scope.row.charosterAccountDOS" :key="index2" style="margin:4px">{{item.accountNum}}</div>
                    <span v-for="(item,index) in scope.row.charosterAccountDOS" :key="index">
                      <span>{{item.accountNum}}</span>
                    </span>
                  </el-tooltip>
                  </div>
                  <div v-if="scope.row.listAccountDOList">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content" v-for="(item,index2) in scope.row.listAccountDOList" :key="index2" style="margin:4px">{{item.accNum}}</div>
                    <span v-for="(item,index) in scope.row.listAccountDOList" :key="index">
                      <span>{{item.accNum}}</span>
                    </span>
                  </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="涉罪类型" min-width="140" :key='5'>
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content" v-for="(item,index2) in scope.row.listWarnJobPreliminaryJudgmentDO" :key="index2" style="margin:4px">{{item.preliminaryJudgme}}</div>
                    <span v-for="(item,index) in scope.row.listWarnJobPreliminaryJudgmentDO" :key="index">
                      <span>{{item.preliminaryJudgme}}</span>
                    </span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </template>
            <template v-if="showTableItem==='analyst'">
              <el-table-column prop="subjectIType" label="证件类型" min-width="140" :key='6'></el-table-column>
              <el-table-column prop="iNum" label="证件号码" min-width="140" :key='7'></el-table-column>
              <el-table-column label="账号" min-width="140" :key='8'>
                <template slot-scope="scope">
                   <div v-if="scope.row.charosterAccountDOS">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content" v-for="(item,index2) in scope.row.charosterAccountDOS" :key="index2" style="margin:4px">{{item.accountNum}}</div>
                    <span v-for="(item,index) in scope.row.charosterAccountDOS" :key="index">
                      <span>{{item.accountNum}}</span>
                    </span>
                  </el-tooltip>
                  </div>
                  <div v-if="scope.row.listAccountDOList">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content" v-for="(item,index2) in scope.row.listAccountDOList" :key="index2" style="margin:4px">{{item.accNum}}</div>
                    <span v-for="(item,index) in scope.row.listAccountDOList" :key="index">
                      <span>{{item.accNum}}</span>
                    </span>
                  </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-if="showTableItem==='file'">
              <el-table-column prop="subjectIType" label="证件类型" min-width="140" :key='9'></el-table-column>
              <el-table-column prop="iNum" label="证件号码" min-width="140" :key='10'></el-table-column>
              <el-table-column label="账号" min-width="140" :key='11'>
                <template slot-scope="scope">
                   <div v-if="scope.row.charosterAccountDOS">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content" v-for="(item,index2) in scope.row.charosterAccountDOS" :key="index2" style="margin:4px">{{item.accountNum}}</div>
                    <span v-for="(item,index) in scope.row.charosterAccountDOS" :key="index">
                      <span>{{item.accountNum}}</span>
                    </span>
                  </el-tooltip>
                  </div>
                  <div v-if="scope.row.listAccountDOList">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content" v-for="(item,index2) in scope.row.listAccountDOList" :key="index2" style="margin:4px">{{item.accNum}}</div>
                    <span v-for="(item,index) in scope.row.listAccountDOList" :key="index">
                      <span>{{item.accNum}}</span>
                    </span>
                  </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </template>
          </el-table>
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
          </el-pagination> -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
          </el-pagination>
        </div>
        <div data-v-58e4f814="" class="divider divider-horizontal"></div>
        <div class="roleList">
          <el-row class="title">
            <el-col :span="12">
              <span style="margin-right:20px">预警规则列表</span>
            </el-col>
            <!-- <el-col v-if="redirectType !== 'approving'" :span="12" style="textAlign:right; margin-bottom:10px">
              <el-button type="primary" plain @click="PoupTitle = '选择预警规则';dialogFormVisible=true;componentId='Rule'">添加预警规则</el-button>
            </el-col> -->
          </el-row>
          
          <el-table style="width: 100%" :data="ruleData">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="ruleName" label="规则名称" min-width="120"></el-table-column>
            <el-table-column label="监测周期" min-width="140">
              <template slot-scope="scope">
                <span v-if="scope.row.mCycleStart">{{`${scope.row.mCycleStart}~${scope.row.mCycleEnd}`}}</span>
                <span v-else>—</span>
              </template>
            </el-table-column>
            <el-table-column prop="wornCycle" label="预警周期" min-width="100"></el-table-column>
            <el-table-column prop="JCFW" label="预警范围" min-width="140">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                  <div slot="content" v-for="(item,index2) in scope.row.listWarnRangeDO" :key="index2" style="margin:4px">{{item.rangeName}}</div>
                  <span v-for="(item,index) in scope.row.listWarnRangeDO" :key="index">
                    <span>{{item.rangeName}}</span>
                  </span>
                </el-tooltip>

              </template>
            </el-table-column>
            <el-table-column prop="wornLevel" label="预警程度" min-width="140"></el-table-column>
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

      <!-- <div v-if="redirectType !== 'approving'" style="textAlign:center">
        <el-button type="primary" @click="publish('taskForm')">保 存</el-button>
        <el-button type="primary" @click="callWorkFlow">发 布</el-button>
        <router-link style="margin-left:20px" :to="{name: 'forewarningTask'}">
          <el-button>返 回</el-button>
        </router-link>
      </div>
      <div v-if="redirectType == 'approving' && approveStatus == '0' " style="textAlign:center">
          <el-button type="primary" @click="approving('1')">通过</el-button>
          <el-button @click="approving('2')">不通过</el-button>
      </div>-->
    </div> 
    <monitor-workflow></monitor-workflow>
    <!-- 弹框内容 -->
    <div>
      <el-dialog :visible.sync="dialogFormVisible" :title="PoupTitle" width="70%" top="20px" @close="closeDialog">
        <keep-alive>
          <component v-bind:is="componentId" @listFn="getData" ref="dialogComponent"></component>
        </keep-alive>

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
  auditInsert
  // approving
} from '@/api/sys-monitoringAnalysis/roster-warning/warning-task.js'
import {
  ruleDetail
} from '@/api/sys-monitoringAnalysis/roster-warning/warning-rule.js'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import Poup1 from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningTask/poup1.vue'
import Poup2 from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningTask/poup2.vue'
import Rule from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/forewarningTask/rulePoup.vue'
import { commonPattern } from '@/utils/formValidate'
export default {
  components: {
    Poup1,
    Poup2,
    Rule
  },
  data() {
    return {
      token: getToken(),
      form: {
        wJName: ''
      },
      isDisabled: true,
      dialogForm: {},
      dialogFormVisible: false,
      dialogVisible: false,
      singleRuleData: [],
      ruleData: [],
      rosterData: [],
      componentId: 'Poup1',
      showTableItem: 'center',
      PoupTitle: '',
      wornLevelArr: [],
      wornCycleArr: [],
      sourceDireArr: [],
      sourceBusinessArr: [],
      approveStatus: '',
      approveResult: '',
      pageData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'userInfo', 'institution', 'formContent']),
    // isCenter() {
    //   return this.institution === this.GLOBAL.INSTITUTION_CENTER
    // },
    wJId() {
      return this.$route.params.id
    },
    redirectType() {
      return this.$route.params.type
    },
    fileUrl() {
      return `monitor/listwarn/warn-job/upFile?token=` + this.token
    },
    downloadUrl() {
      return `monitor/listwarn/warn-job/downloadFile?token=` + this.token
    }
  },
  created() {
    if (this.$route.params.id) {
      this.backView()
    }
  },

  methods: {
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
      console.log(this.$refs.dialogComponent.$refs.poupTable.clearSelection())
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.pageChange(this.pageInfo.pageNum, size)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.pageChange(pageNum, this.pageInfo.pageSize)
    },
    // 获取数据
    getData(data) {
      this.dialogFormVisible = data.Visible
      if (data.showTableItem) this.showTableItem = data.showTableItem
      if (this.componentId.indexOf('Poup') !== -1) {
        this.rosterData = data.selectArr
        this.sourceDireArr = data.sourceDireArr
        this.sourceBusinessArr = data.sourceBusinessArr
      }
      if (this.componentId === 'Rule') {
        this.ruleData = data.ruleData
        this.wornCycleArr = data.wornCycleArr
        this.wornLevelArr = data.wornLevelArr
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
      console.log('------------hui--------------')
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
          this.rosterData = res.data.listWarnDOS
          this.ruleData = res.data.warnRuleDOList
          this.form.wJName = res.data.wJName
          this.approveStatus = res.data.approveStatus
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
      if (this.rosterData.length === 0) {
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
            this.$store.dispatch('workFlow', { configCode: 'listWarnJob' })
            this.$store.dispatch('openWorkFlow', true)
          } else {
            return false
          }
        })
      }
    },
    nextStep() {
      const ruleDataObj = this.ruleData
      const rosterDataObj = this.rosterData

      for (let i = 0; i < rosterDataObj.length; i++) {
        if (rosterDataObj[i].charosterAccountDOS) {
          rosterDataObj[i].listAccountDOList = rosterDataObj[i].charosterAccountDOS
          delete rosterDataObj[i].charosterAccountDOS
          for (let j = 0; j < rosterDataObj[i].listAccountDOList.length; j++) {
            rosterDataObj[i].listAccountDOList[j].accNum = rosterDataObj[i].listAccountDOList[j].accountNum
            delete rosterDataObj[i].listAccountDOList[j].accountNum
          }
        }
      }

      const jointAnalysisDO = {
        warnRuleDOList: ruleDataObj,
        listWarnDOS: rosterDataObj,
        wJName: this.form.wJName,
        wJId: this.form.wJId
      }
      this.$refs['taskForm'].validate((valid) => {
        if (valid) {
          this.loading2 = true
          auditInsert(jointAnalysisDO, this.workFlow2business).then(res => {
            if (res.code === 200) {
              this.loading2 = false
              this.$message({
                message: '提交成功',
                type: 'success',
                duration: 6000
              })
              this.$router.push({ name: 'monitor_workPlatform' })
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
      if (this.rosterData.length === 0) {
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
        const rosterDataObj = this.rosterData

        for (let i = 0; i < rosterDataObj.length; i++) {
          if (rosterDataObj[i].charosterAccountDOS) {
            rosterDataObj[i].listAccountDOList = rosterDataObj[i].charosterAccountDOS
            delete rosterDataObj[i].charosterAccountDOS
            for (let j = 0; j < rosterDataObj[i].listAccountDOList.length; j++) {
              rosterDataObj[i].listAccountDOList[j].accNum = rosterDataObj[i].listAccountDOList[j].accountNum
              delete rosterDataObj[i].listAccountDOList[j].accountNum
            }
          }
        }

        const jointAnalysisDO = {
          warnRuleDOList: ruleDataObj,
          listWarnDOS: rosterDataObj,
          wJName: this.form.wJName
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading2 = true
            publish(jointAnalysisDO).then(res => {
              if (res.code === 200) {
                this.loading2 = false
                this.$router.push({ name: 'forewarningTask' })
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
    pageChange(pageNum, pageSize) {
      if (pageNum !== 1) {
        this.pageStart = (pageSize * (pageNum - 1))
      } else {
        this.pageStart = 0
      }
      if (this.pageInfo.total % pageSize !== 0 && pageNum !== 1) {
        this.pageSize = this.pageInfo.total % pageSize + (pageNum * pageSize)
      } else {
        this.pageSize = pageSize * pageNum
      }
      this.pageData = this.rosterData.slice(this.pageStart, this.pageSize)
    },
    // 查看单条规则
    viewSingle(id) {
      ruleDetail(id).then(res => {
        console.log(id)
        if (res.code === 200) {
          this.singleRuleData = res.data
          this.dialogVisible = true
        }
      })
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    },
    formContent: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal.workflow.nodeAttributes) {
          if (newVal.workflow.nodeAttributes.length > 0) {
            if (newVal.workflow.nodeAttributes[0].extendKey === 'editFlag' && newVal.workflow.nodeAttributes[0].extendValue === 'Y') {
              this.isDisabled = false
            } else {
              this.isDisabled = true
            }
          }
        }

        this.taskId = newVal.workflow.pkId
        this.form.wJName = newVal.wJName
        this.form.wJId = newVal.wJId
        this.rosterData = newVal.listWarnDOS
        this.ruleData = newVal.warnRuleDOList
        for (var i = 0; i < this.rosterData.length; i++) {
          const current = this.rosterData[i]
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
        this.pageInfo.total = this.rosterData.length
        this.pageChange(this.pageInfo.pageNum, this.pageInfo.pageSize)
      }
    }
  }
}
</script>
<style scope lang="scss">
.content {
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