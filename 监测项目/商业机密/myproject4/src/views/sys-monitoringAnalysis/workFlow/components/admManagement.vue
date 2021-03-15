<template>
  <div>
    <el-form :model="form">
      <el-row class="table">
        <h3>中国人民银行（）</h3>
        <p>反洗钱跨辖区协助调查申请表</p>
        <table border="1">
          <tr>
            <td width="230" height="70;" align="center" style="background:#ccc;">拟调查义务机构</td>
            <td width="600" colspan="6">
              <p>{{formDataVal.reportBody}}</p>
            </td>
          </tr>
          <tr>
            <td height="70" style="background:#ccc;">拟调查可疑交易<br>活动主体或账号</td>
            <td colspan="6">
              <p>{{formDataVal.subjectAccount}}</p>
            </td>
          </tr>
          <tr>
            <td height="70" style="background:#ccc;">涉及区域</td>
            <td colspan="6">
              <p>{{formDataVal.involveArea}}</p>
            </td>
          </tr>
          <tr>
            <td height="70" colspan="6" style="textAlign:left;border-right-color:#303133;background:#ccc;">可疑交易活动事实描述及初步分析意见</td>
          </tr>
          <tr>
            <td height="100" colspan="6" style="border-right-color:#303133;">
              <p>{{formDataVal.descAnalyse}}</p>
            </td>
          </tr>
          <tr>
            <td height="70" colspan="6" style="textAlign:left;border-right-color:#303133;background:#ccc;">申请跨辖区调查的理由和要求</td>
          </tr>
          <tr>
            <td height="100" colspan="6" style="border-right-color:#303133;">
              <p>{{formDataVal.reasonRequire}}</p>
            </td>
          </tr>
          <tr>
            <td height="120">处长审批意见：</td>
            <td colspan="6">
              <p v-if="state === '处长审批' || state === '中心领导审批' || state === '局领导审批'">{{opinionData[0].opinion}}</p>
              <p v-if="state === '处长审批' || state === '中心领导审批' || state === '局领导审批'" style="margin-top: 20px;text-align:right;">{{opinionData[0].time}}</p>
            </td>
          </tr>
          <tr>
            <td height="120">反洗钱局负责人意见：</td>
            <td colspan="6">
              <p v-if="state === '中心领导审批' || state === '局领导审批'">{{opinionData[1].opinion}}</p>
              <p v-if="state === '中心领导审批' || state === '局领导审批'" style="margin-top: 20px;text-align:right;">{{opinionData[1].time}}</p>
            </td>
          </tr>
          <tr>
            <td height="120">反洗钱中心负责人意见：</td>
            <td colspan="6">
              <p v-if="state === '局领导审批'">{{opinionData[2].opinion}}</p>
              <p v-if="state === '局领导审批'" style="margin-top: 20px;text-align:right;">{{opinionData[2].time}}</p>
            </td>
          </tr>
        </table>
      </el-row>
      <el-row v-if="state === '分支机构反馈' && this.$route.query.roleType !== 'done'">
        <div class="result">
          <el-row>
            <el-col :span="24">反馈信息：</el-col>
          </el-row>
          <el-row class="list">
            <el-col :span="4" class="border bg">
              <span>反馈人：</span>
            </el-col>
            <el-col :span="4" class="border">
              <span>
                <el-input v-model="form.feedbackPerson"></el-input>
              </span>
            </el-col>
            <el-col :span="4" class="border bg">
              <span>反馈人所在机构：</span>
            </el-col>
            <el-col :span="4" class="border">
              <span>
                <el-input v-model="form.feedbackPersonMechanism"></el-input>
              </span>
            </el-col>
            <el-col :span="4" class="border bg">
              <span>反馈时间：</span>
            </el-col>
            <el-col :span="4">
              <span>
                <el-input v-model="form.feedbackTime"></el-input>
              </span>
            </el-col>
          </el-row>
        </div>
        <div class="divider divider-dashed"></div>
        <div class="result2">
          <el-row>
            <el-col :span="24">反馈结果：</el-col>
          </el-row>
          <el-row style="margin-top:15px">
            <el-col :span="24">
              <el-input type="textarea" v-model="form.feedbackResults"></el-input>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row v-if="state === '分支机构反馈' && this.$route.query.roleType === 'done' || state === '局领导审批反馈' || state === '中心领导审批反馈'">
        <div class="result">
          <el-row>
            <el-col :span="24">反馈信息：</el-col>
          </el-row>
          <el-row class="list">
            <el-col :span="4" class="border bg">
              <span>反馈人：</span>
            </el-col>
            <el-col :span="4" class="border">
              <span>
                {{formDataVal.feedback.feedbackPerson}}
              </span>
            </el-col>
            <el-col :span="4" class="border bg">
              <span>反馈人所在机构：</span>
            </el-col>
            <el-col :span="4" class="border">
              <span>
                {{formDataVal.feedback.reportName}}
              </span>
            </el-col>
            <el-col :span="4" class="border bg">
              <span>反馈时间：</span>
            </el-col>
            <el-col :span="4">
              <span>
                {{formDataVal.feedback.feedbackTime}}
              </span>
            </el-col>
          </el-row>
        </div>
        <div class="divider divider-dashed"></div>
        <div class="result2">
          <el-row>
            <el-col :span="24">反馈结果：</el-col>
          </el-row>
          <el-row style="margin-top:15px">
            <el-col :span="24">
              {{formDataVal.feedback.feedbackResult}}
            </el-col>
          </el-row>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { updateAdm } from '@/api/sys-monitoringAnalysis/dataGovernance/dataClean/task.js'
import { getOpinion } from '@/api/sys-monitoringAnalysis/workFlow/index.js'
import { updateExam, stateApi } from '@/api/administration.js'
export default {
  data() {
    return {
      state: '',
      form: {
        feedbackPerson: '',
        feedbackPersonMechanism: '',
        feedbackTime: '',
        feedbackResults: ''
      },
      applyId: '',
      formDataVal: {},
      opinionData: [],
      value: ''
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent', 'roles']),
    proInstId() {
      return this.$route.query.proInstId
    }
  },
  watch: {
    businessFlag(val) {
      if (val) {
        this.updateForm()
      }
    },
    formContent: {
      handler(newVal, oldVal) {
        this.tradeId = newVal.workflow.pkId
        this.formDataVal = newVal
        // this.applyId = newVal.applyId
        stateApi(newVal.applyId).then(res => {
          if (res.code === 200) {
            this.state = res.data
            console.log(this.state)
          }
        })
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.$route.query.roleType)
    this.getOpinionList()
  },
  methods: {
    getOpinionList() {
      // if (this.applyId !== '') {

      // }
      getOpinion({ proInstId: this.proInstId }).then(res => {
        if (res.code === 200) {
          this.opinionData = res.data
        }
      }).catch()
    },
    updateForm() {
      const obj = Object.assign({}, this.form)
      const map = {
        feedbackResult: obj.feedbackResults,
        feedbackTime: obj.feedbackTime,
        feedbackPerson: obj.feedbackPerson,
        reportName: obj.feedbackPersonMechanism,
        workflow: this.workFlow2business
      }
      updateExam(this.formDataVal.applyId, map).then(res => {
        if (res.code === 200) {
          if (res.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$store.dispatch('changeFlag', false)
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          }
        }
      })
    }
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
    max-width: 500px;
    // margin-top: 20px;
    text-align: center;
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
</style>