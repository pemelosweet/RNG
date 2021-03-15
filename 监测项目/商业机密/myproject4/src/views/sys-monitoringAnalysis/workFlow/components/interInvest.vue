<template>
  <div class="cueManage_administration_form">
    <!-- <el-card> -->
      <!-- <a @click="routerBack" class="back" :style="backImg"></a> -->
      <!-- <div slot="header">
        <span >{{$route.query.title}}</span>
      </div> -->
      <!-- <div style="marginBottom:18px">
        <el-row>
          <el-col :span="24">
            <el-button @click="handlePrint">打 印</el-button>
          </el-col>
        </el-row>
      </div> -->
      <monitor-workflow></monitor-workflow>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="文件处理单"  name="tabFiles">
            <el-form :model="form">
              <el-row :gutter="20">
                <el-col :span="8" :offset="2">
                  <el-form-item label="密级：" label-width="130px">
                    <el-select v-model="form.secret">
                      <el-option value="0" label="机密"></el-option>
                      <el-option value="1" label="秘密"></el-option>
                      <el-option value="2" label="内部"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="缓急：" label-width="130px">
                    <el-select v-model="form.urgencyDegree">
                      <el-option value="0" label="紧急"></el-option>
                      <el-option value="1" label="一般"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="table processTable">
                <p>反洗钱中心文件处理单</p>
                <table border="1">
                  <tr>
                    <td width="200" height="70;" align="center">主办处室</td>
                    <td width="200" colspan="2">
                      <el-input v-model="form.sponsor"></el-input>
                    </td>
                    <td width="200" colspan="2">经办人及电话</td>
                    <td width="200" colspan="2">
                      <el-input v-model="form.responsiblePhone"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td height="200" colspan="6">
                      <el-input v-model="form.fileContent" type="textarea" placeholder="关于xx的请示"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td height="200">行领导批示</td>
                    <td colspan="6">
                      <el-input v-model="form.examineOpin"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td height="200">中心领导意见</td>
                    <td colspan="6">
                      <el-input v-model="form.centreLeadOpin"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td width="200" height="200;" align="center">内部意见</td>
                    <td width="200" colspan="2">
                      <el-input v-model="form.interOpin"></el-input>
                    </td>
                    <td width="200" colspan="2">会签意见</td>
                    <td width="200" colspan="2">
                      <el-input v-model="form.countOpin"></el-input>
                    </td>
                  </tr>
                </table>

              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="业务表单" name="tabForm">
            <span>表单：</span>
            <el-radio-group v-model="fileType">
              <el-radio v-if="fileType === 0" :label="0">协查请求函</el-radio>
              <el-radio v-if="fileType === 1" :label="1">价值反馈表</el-radio>
              <el-radio v-if="fileType === 2" :label="2"> 协查反馈函</el-radio>
              <el-radio v-if="fileType === 3 " :label="3">通报</el-radio>
            </el-radio-group>
            <div class="divider divider-dashed"></div>
            <businessForm v-if="fileType===0" :businessFormData="businessFormData" ref="refBusiness"></businessForm>
            <CollaborativeForm v-if="fileType===1" :collaborativeFormData="collaborativeFormData" ref="refCollaborativeForm"></CollaborativeForm>
            <feedbackForm v-if="fileType===2" :feedbackFormData="feedbackFormData" ref="refFeedbackForm"></feedbackForm>
            <noticeForm v-if="fileType===3" :noticeFormData="noticeForm" ref="refNoticeForm"></noticeForm>
          </el-tab-pane>
          <el-tab-pane label="相关附件" name="tabAbout" class="classFiles">
            <!-- <Correlation></Correlation> -->
            <el-table :data="tablefileData">
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column label="附件名称" prop="attachName"></el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <el-button type="text" @click="download(scope)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    <!-- </el-card> -->
  </div>
</template>

<script>
import {
  sendNextTime,
  getFilelistApi,
  sendList,
  sendListflow
} from '@/api/sys-monitoringAnalysis/cueManage/interIntelligence.js'
import Correlation from '@/views/sys-monitoringAnalysis/cueManage/investigation/correlation'
import businessForm from '@/views/sys-monitoringAnalysis/cueManage/interIntelligence/businessForm'
import noticeForm from '@/views/sys-monitoringAnalysis/cueManage/interIntelligence/noticeForm'
import feedbackForm from '@/views/sys-monitoringAnalysis/cueManage/interIntelligence/feedbackForm'
import CollaborativeForm from '@/views/sys-monitoringAnalysis/cueManage/interIntelligence/CollaborativeForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    Correlation,
    businessForm,
    noticeForm,
    feedbackForm,
    CollaborativeForm
  },
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      activeName: 'tabFiles', // tab 切换
      UUID: '',
      disable: false, // 按钮是否显示
      fileType: 0,
      formId: '', // 文件上传表单Id
      form: {
        secret: '',
        urgencyDegree: '',
        sponsor: '',
        responsiblePhone: '',
        fileContent: '',
        examineOpin: '',
        centreLeadOpin: '',
        interOpin: '',
        countOpin: ''
      },
      tablefileData: [],
      currentPage: 1,
      pagesize: 10,
      // 子组件值
      businessFormData: {},
      collaborativeFormData: {},
      feedbackFormData: {},
      noticeForm: {}
    }
  },
  computed: {

    ...mapGetters(['businessFlag', 'workFlow2business', 'userInfo', 'institution', 'formContent'])

  },
  watch: {
    businessFlag(val) {
      if (val) {
        this.updateForm()
      }
    }
  },
  mounted() {
    this.getData()
    this.getFilelist()
  },
  updated() {
    // console.log(11111)
  },
  methods: {
  // 回显信息
    getData() {
      this.form = this.formContent.fileHand
      if (this.formContent.TongBao) {
        this.noticeForm = this.formContent.TongBao
        this.fileType = 3
      } else if (this.formContent.InvRequest) {
        this.noticeForm = this.formContent.InvRequest
        this.fileType = 0
      } else if (this.formContent.XcFeedBack) {
        this.noticeForm = this.formContent.XcFeedBack
        this.fileType = 1
      } else if (this.formContent.FeedBackGJ) {
        this.noticeForm = this.formContent.FeedBackGJ
        this.fileType = 2
      }
    },

    // 切换tabs
    handleClick(tab, event) {
      console.log(tab, event)
    },

    // 提交 - 下一步
    nextStep() {
      sendListflow(this.newSubParams()).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        } else {
          this.$confirm(res.message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        }
      })
    },

    newSubParams() {
      const workflowObj = this.formContent.workflow.configCode === 'interInvest' ? '0' : '1'
      var childForm = {}
      const objForm = this.form
      const obj = {
        FileHand: objForm,
        // intelBusinessType: workflowObj, // 工作流
        fileType: this.fileType.toString(),
        mailId: this.form.fhId,
        workflow: this.workFlow2business
      }
      obj.intelBusinessType = workflowObj
      switch (this.fileType) {
        case 0: // 协查请求函
          childForm = this.$refs.refBusiness.form
          obj.InvRequest = childForm
          break
        case 1: // 价值反馈表
          childForm = this.$refs.refCollaborativeForm.collaborativeForm
          obj.XcFeedBack = childForm
          break
        case 2: //  协查反馈函
          childForm = this.$refs.refFeedbackForm.feedbackForm
          obj.FeedBackGJ = childForm
          break
        case 3: // 通报
          childForm = this.$refs.refNoticeForm.noticeForm
          obj.TongBao = childForm
          break
        default:
          break
      }
      return obj
    },

    // 提交
    updateForm() {
      // interQingbao  行领导
      //   interInvest  中心领导
      sendNextTime(this.newSubParams()).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
        this.$store.dispatch('changeFlag', false)
      })
    },

    // 保存
    handleSave() {
      sendList(this.newparams()).then()
    },

    // 上传成功 - 回调
    onSuccess(res) {
      if (res.data.code === 200) {
        this.getFilelist()
      }
    },
    // 相关附件 - 获取附件列表
    getFilelist() {
      // const obj = {}
      switch (this.fileType) {
        case 0: // 协查请求函
          getFilelistApi({ gjSurveyid: this.$route.query.mailId }).then(res => {
            this.tablefileData = res.data
          })
          break
        case 1: // 价值反馈表
          getFilelistApi({ xcfeedbackId: this.$route.query.mailId }).then(res => {
            this.tablefileData = res.data.data
          })
          break
        case 2: //  协查反馈函
          getFilelistApi({ fbId: this.$route.query.mailId }).then(res => {
            this.tablefileData = res.data.data
          })
          break
        case 3: // 通报
          getFilelistApi({ tongbaoId: this.$route.query.mailId }).then(res => {
            this.tablefileData = res.data.data
          })
          break
        default:
          break
      }
      // const objparamKeys = Object.keys(obj)
      // var paramKey = objparamKeys[0]
      // getFilelistApi({ paramKey: this.$route.query.mailId }).then()
    },

    // 相关附件 - 下载
    download(scope) {
      location.href = `/international/download1/${scope.row.attachId}`
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },

    // 打印
    handlePrint() {
      var newHtml = document.getElementsByClassName('processTable')[0].innerHTML
      document.body.innerHTML = newHtml
      window.print()
      window.location.reload()
    },
    routerBack() {
      this.$router.go(-1) // 返回上一层
    }
  }
}
</script>

<style lang="scss">
.cueManage_administration_form {
  position: relative;
  .list-block {
    margin-bottom: 30px;
  }
  .classFiles {
    .upload-demo {
      .el-upload {
        width: 100%;
        .el-upload-dragger {
          width: 100%;
        }
      }
    }
  }
  .table {
    p,
    h3 {
      margin: 10px auto;
      text-align: center;
    }
    table {
      border-collapse: collapse;
      text-align: center;
      margin: 0 auto;
    }
    table p {
      margin-top: 83px;
      text-align: right;
    }
    table span {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    #time span {
      width: 30px;
    }
  }
}
</style>
