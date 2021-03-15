<template>
  <div class="cueManage_administration_viewProcess">
    <el-card>
      <div slot="header">
        查看流程
      </div>
      <div style="marginBottom:18px">
        <el-row>
          <el-col :span="24">
            <span style="marginRight:20px">流程操作：</span>
            <!-- <el-button type="primary" :disabled="activeName!=='applicationForm'" plain @click="preservation"> 保 存</el-button> -->
            <el-button type="primary" :disabled="activeName!=='investigationForm'" plain> 保 存</el-button>
            <!-- <el-button type="primary" :disabled="activeName==='relatedAccessories'||activeName==='handlingInformation' || activeName === 'feedbackResults'" plain @click="submission"> 提 交</el-button> -->
            <el-button type="primary" :disabled="activeName==='relatedAccessories'||activeName==='handlingInformation' || activeName === 'feedbackResults'" plain> 提 交</el-button>
            <el-button type="primary"  plain @click="returnBtn"> 关 闭</el-button>
            <!-- <el-button type="primary" :disabled="activeName==='relatedAccessories'||activeName==='handlingInformation'" plain> 打 印</el-button> -->
            <el-button type="primary" :disabled="activeName==='relatedAccessories'||activeName==='handlingInformation'" plain> 打 印</el-button>
          </el-col>
        </el-row>
      </div>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="行政调查申请单" name="investigationForm">
          <el-form :model="form">
            <el-row class="table">
              <!-- <h3>中国人民银行（<input type="text" style="border:none;outline:none;text-align:center;">）</h3> -->
              <h3>中国人民银行</h3>
              <p>反洗钱跨辖区协助调查申请表</p>
              <table border="1">
                <tr>
                  <td width="230" height="70;" align="center" style="background:#ccc;">拟调查义务机构</td>
                  <td width="600" colspan="6" v-if="$route.query.type === 'read-only'">
                    {{getApplyForm.reportBody}}
                  </td>
                  <td width="600" colspan="6" v-if="$route.query.type === 'edit'">
                    <el-select v-model="getApplyForm.reportBody" filterable remote clearable reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" style="width:100%;">
                      <el-option v-for="item in reportingBodyName" :key="item.ricd" :label="item.rinm" :value="item.rinm">
                      </el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td height="70" style="background:#ccc;">拟调查可疑交易<br>活动主体或账号</td>
                  <td colspan="6" v-if="$route.query.type === 'read-only'">
                    {{getApplyForm.subjectAccount}}
                  </td>
                  <td colspan="6" style="text-align:left;" v-if="$route.query.type === 'edit'">
                    <el-input v-model="getApplyForm.subjectAccount"></el-input>
                  </td>
                </tr>
                <tr>
                  <td height="70" style="background:#ccc;">涉及区域</td>
                  <td colspan="6">
                    {{getApplyForm.involveArea}}
                  </td>
                </tr>
                <tr>
                  <td height="70" colspan="6" style="textAlign:left;border-right-color:#303133;background:#ccc;">可疑交易活动事实描述及初步分析意见</td>
                </tr>
                <tr>
                  <td height="100" colspan="6" style="border-right-color:#303133;" v-if="$route.query.type === 'read-only'">
                    {{getApplyForm.descAnalyse}}
                  </td>
                  <td height="100" colspan="6" style="border-right-color:#303133;" v-if="$route.query.type === 'edit'">
                    <el-input type="textarea" v-model="getApplyForm.descAnalyse"></el-input>
                  </td>
                </tr>
                <tr>
                  <td height="70" colspan="6" style="textAlign:left;border-right-color:#303133;background:#ccc;">申请跨辖区调查的理由和要求</td>
                </tr>
                <tr>
                  <td height="100" colspan="6" style="border-right-color:#303133;" v-if="$route.query.type === 'read-only'">
                    {{getApplyForm.reasonRequire}}
                  </td>
                  <td height="100" colspan="6" style="border-right-color:#303133;" v-if="$route.query.type === 'edit'">
                    <el-input type="textarea" v-model="getApplyForm.reasonRequire"></el-input>
                  </td>
                </tr>
                <tr>
                  <td height="120">处长审批意见：</td>
                  <td colspan="6" v-if="this.$route.query.type === 'edit'">
                    <el-input type="textarea"></el-input>
                    <p>
                      <span class="table_span">
                        <el-input></el-input>
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">年</span>
                      <span class="table_span">
                        <el-input></el-input>
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">月</span>
                      <span class="table_span">
                        <el-input></el-input>                      
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">日</span>
                    </p>
                  </td>
                  <td colspan="6" v-if="this.$route.query.type === 'read-only'">
                    <div v-if="tableData.length > 0">
                      {{tableData[0].opinion}}
                      <p>
                        <span class="table_right">
                          {{tableData[0].time}}
                        </span>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td height="120">反洗钱部门负责人意见：</td>
                  <td colspan="6" v-if="this.$route.query.type === 'edit'">
                    <el-input type="textarea"></el-input>
                    <p>
                      <span class="table_span">
                        <el-input></el-input>
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">年</span>
                      <span class="table_span">
                        <el-input></el-input>                      
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">月</span>
                      <span class="table_span">
                        <el-input></el-input>                      
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">日</span>
                    </p>
                  </td>
                  <td colspan="6" v-if="this.$route.query.type === 'read-only'">
                    <div v-if="tableData.length > 1">
                      {{tableData[1].opinion}}
                      <p>
                        <span class="table_right">
                          {{tableData[1].time}}
                        </span>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td height="120">总行反洗钱局意见：</td>
                  <td colspan="6" v-if="this.$route.query.type === 'edit'">
                    <el-input type="textarea"></el-input>
                    <p>
                      <span class="table_span">
                        <el-input></el-input>
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">年</span>
                      <span class="table_span">
                        <el-input></el-input>                      
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">月</span>
                      <span class="table_span">
                        <el-input></el-input>                      
                      </span>
                      <span class="table_span" style="text-align:left;width:20px;">日</span>
                    </p>
                  </td>
                  <td colspan="6" v-if="this.$route.query.type === 'read-only'">
                    <div v-if="tableData.length > 2">
                      {{tableData[2].opinion}}
                      <p>
                        <span class="table_right">
                          {{tableData[2].time}}
                        </span>
                      </p>
                    </div>
                  </td>
                  
                </tr>
              </table>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="行政调查反馈结果" name="feedbackResults">
          <div class="result">
            <el-form v-model="formTwo" label-width="150px">
              <el-col :span="24" style="margin-bottom: 10px;">反馈信息：</el-col>
              <el-row>
              <el-col :span="8">
                <el-form-item label="反馈人：" style="word-break:break-all;">
                  {{getApplyForm.feedback.feedbackPerson}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="反馈人所在机构：" style="word-break:break-all;">
                  {{getApplyForm.feedback.reportName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="反馈时间：" style="word-break:break-all;">
                  {{getApplyForm.feedback.feedbackTime}}
                </el-form-item>
              </el-col>
              </el-row>
            <!-- <el-row>
              <el-col :span="24">反馈信息：</el-col>
            </el-row>
            <el-row class="list">
              <el-col :span="4" class="border bg">
                <span>反馈人：</span>
              </el-col>
              <el-col :span="4" class="border">
                <div style="padding:1px;">
                  {{getApplyForm.feedback.feedbackPerson}}
                </div>
              </el-col>
              <el-col :span="4" class="border bg">
                <span>反馈人所在机构：</span>
              </el-col>
              <el-col :span="4" class="border">
                <div style="padding:1px;">
                  {{getApplyForm.feedback.reportName}}
                </div>
              </el-col>
              <el-col :span="4" class="border bg">
                <span>反馈时间：</span>
              </el-col>
              <el-col :span="4">
                <div style="padding:1px;">
                  {{getApplyForm.feedback.feedbackTime}}
                </div>
              </el-col>
            </el-row> -->
            </el-form>
          </div>
          <!-- <div class="divider divider-dashed"></div> -->
          <div class="result2">
            <el-row>
              <el-col :span="24">反馈结果：</el-col>
            </el-row>
            <el-row style="margin-top:15px">
              <el-col :span="24">
                <el-input type="textarea" :disabled="true" v-model="value"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class="divider divider-dashed"></div>
          <div class="result2">
            <el-row>
              <el-col :span="24">
                <el-upload ref="uploadFeedbackName" :action="uploadFeedbackUrl" :headers="headers" :file-list="fileFeedbackList" :on-change="changeFeedbackUpload" :on-success="successFeedbackUpload" :auto-upload="false">
                相关附件：<el-button size="small" type="primary">上传附件</el-button>
                </el-upload>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="办理信息" name="handlingInformation">
          <div class="information" style="margin-top:20px">
              <div class="list-block">
                <el-row>
                  <el-col :span="12" style="margin-bottom:10px">
                    <span>流程信息：</span>
                  </el-col>
                </el-row>
                <el-table :data="tableData">
                  <el-table-column label="序号" type="index"></el-table-column>
                  <el-table-column label="节点名称" prop="actName"></el-table-column>
                  <el-table-column label="执行用户" prop="approverName"></el-table-column>
                  <el-table-column label="办理时间" prop="time"></el-table-column>
                  <el-table-column label="办理意见" prop="opinion"></el-table-column>
                  <el-table-column label="备注" prop="remark"></el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                </el-pagination>

              </div>
              <div class="map-block">
                <el-row style="marginBottom:20px">
                  <el-col :span="12">
                    <span>流程监控图 ：</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-steps :active="2" align-center finish-status="success">
                      <el-step title="1" description="申请行政调查"></el-step>
                      <el-step title="2" description="处长审核"></el-step>
                      <el-step title="3" description="中心领导审核调查申请"></el-step>
                      <el-step title="4" description="反洗钱局审批调查申请"></el-step>
                      <el-step title="5" description="分支机构上传调查结果"></el-step>
                      <el-step title="6" description="反洗钱局审核反馈结果"></el-step>
                      <el-step title="7" description="中心领导审核反馈结果"></el-step>
                      <el-step title="8" description="查看反馈结果"></el-step>
                      <el-step title="9" description="结束"></el-step>
                    </el-steps>
                  </el-col>
                </el-row>
              </div>
            </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getApply } from '@/api/sys-monitoringAnalysis/statisticForm/large'
import { circulationRecord } from '@/api/administration.js'
import { getToken } from '@/utils/auth'
import { fileApply } from '@/api/administration.js'
import { getRinmList } from '@/api/sys-monitoringAnalysis/statisticForm/large'
export default {
  data() {
    return {
      loading: false,
      reportingBodyName: [],
      formTwo: {},
      feedbackEnclosure: '',
      enclosure: '',
      tableData: [],
      form: {
        directorAudit: '',
        radio: '1',
        reportBody: '',
        subjectAccount: '',
        involveArea: '',
        involveArea2: '',
        involveArea3: [],
        descAnalyse: '',
        reasonRequire: ''
      },
      getApplyForm: {},
      activeName: '',
      applyId: '',
      value: '',
      currentPage: 1,
      pagesize: 10,
      fileList: [],
      fileFeedbackList: [],
      headers: {
        Authorization: getToken()
      }
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeName
    this.applyId = this.$route.query.apply
    console.log(this.$route.query.type)
    this.initApi()
  },
  computed: {
    uploadUrl() {
      return '/monitor/thread/adm/uploadApply'
    },
    uploadFeedbackUrl() {
      return '/monitor/thread/adm/uploadApply'
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          getRinmList('', '').then(res => {
            if (res.code === 200) {
              this.loading = false
              this.reportingBodyName = res.data.filter(item => {
                return item.rinm.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1
              })
            }
          })
        }, 200)
      } else {
        this.reportingBodyName = []
      }
    },
    // 行政调查反馈结果 附件上传成功
    successFeedbackUpload(response, file, fileList) {},
    // 行政调查反馈结果 附件上传之前
    changeFeedbackUpload(file, fileList) {
      this.feedbackEnclosure = file
    },
    // 行政调查申请单 上传成功
    successUpload(response, file, fileList) {},
    // 行政调查申请单 上传之前
    changeUpload(file, fileList) {
      this.enclosure = file
    },
    // 标签页tab点击
    handleClick() {
      if (this.activeName === 'investigationForm') {
        console.log(1)
      } else if (this.activeName === 'feedbackResults') {
        console.log(2)
      } else if (this.activeName === 'handlingInformation') {
        console.log(3)
      }
    },
    initApi() {
      // 行政调查申请单反显的数据
      getApply(this.applyId).then(res => {
        if (res.code === 200) {
          this.getApplyForm = res.data
          this.value = res.data.feedback.feedbackResult
        }
      })
      // 办理信息-流程信息列表
      // 办理信息只有在查看流程的情况下展示
      if (this.$route.query.type === 'read-only') {
        circulationRecord(this.applyId).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
          }
        })
      }
      // 行政调查申请单中的文件列表
      fileApply(this.applyId).then(res => {
        if (res.code === 200) {
          console.log(res.data)
        }
      })
    },
    // 关闭按钮 返回上一级页面
    returnBtn() {
      this.$router.go(-1)
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
}
</script>

<style lang="scss">
 .list-block {
  margin-bottom: 30px;
}
.result {
  .list {
    height: 30px;
    line-height: 30px;
    border: 1px solid #ebeef5;
    text-align: center;
    margin-top: 15px;
    .border {
      border-right: 1px solid #ebeef5;
    }
    .border.bg {
      background: #f5f7fa;
    }
  }
  .listContent {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ebeef5;
    border-top: none;
  }
}
.result2 {
  margin-top: 15px;
  .file {
    margin-bottom: 10px;
  }
  .el-textarea__inner {
    min-height: 140px !important;
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
    margin-top: 20px;
    text-align: right;
  }
  #time span {
    width: 30px;
  }
}
.table_span {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.dialog-block{
    .el-radio{
      width: 100%;
      margin-left:30px;
    }
  }
.table_right {
  text-align: right;
  padding: 5px;
}
</style>