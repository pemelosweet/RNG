<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>查看详情</span>
      </div>
      <el-form v-model="this.form" disabled label-width="120px">
        <el-form-item label="预警编号：">
          <el-input v-model="this.form.warningnumber"></el-input>
        </el-form-item>
        <el-form-item label="报文名：">
          <el-input v-model="this.form.messagename"></el-input>
        </el-form-item>
        <el-form-item label="报送类型：">
          <el-input v-model="this.form.submissiontype"></el-input>
        </el-form-item>
        <el-form-item label="报告机构名称：">
          <el-input v-model="this.form.institutionname"></el-input>
        </el-form-item>
        <el-form-item label="报送日期：">
          <el-input v-model="this.form.submissiondate"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度：">
          <el-input v-model="this.form.urgencydegree"></el-input>
        </el-form-item>
        <el-form-item label="涉罪类型：">
          <el-input v-model="this.form.crimestype"></el-input>
        </el-form-item>
        <el-form-item label="报送方向：">
          <el-input v-model="this.form.submissiondirection"></el-input>
        </el-form-item>
        <el-form-item label="预警日期：">
          <el-input v-model="this.form.earlywarningtime"></el-input>
        </el-form-item>
        <el-form-item label="处置信息：" v-if="this.diageouer">
          <!-- <el-input v-model="this.form.state"></el-input> -->
          <el-button type="primary" @click="lookworkFlowInfo()">查看处置信息</el-button>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input v-model="this.form.state"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button @click="goback()">返回</el-button>
      </div>
    </el-card>
    <!-- 查看处置信息 -->
    <el-dialog title="查看处置信息" :visible.sync="lookBackDialogVisible" width="70%">
      <el-form :model="sendDealWithForm" disabled label-width="80px">
        <el-form-item label="处置状态">
            <el-checkbox-group ref="checkGround" v-model="sendDealWithForm.checkList" style="display: flex;flex-direction: column;width:80%">
              <el-checkbox label="1001">1001-经初步分析，不能确定为可疑</el-checkbox>
              <el-checkbox label="1002" >1002-列入关注名单</el-checkbox>
              <el-checkbox label="1003">1003-已移送，中心对外移送情报（通报）字函号 </el-checkbox>
              <div v-if="oneZeroThree">
                <el-tag
                  v-for="(tag,idx) in tranInformationtags"
                  :key="idx"
                  style="margin-left:5px"
                  closable>
                  {{tag}}
                </el-tag>
              </div>
              <el-checkbox label="1004">1004-加入已有的分析任务中</el-checkbox>
              <div v-if='oneZeroFour'>
                <el-tag
                  v-for="(tag,idx) in listtitletags"
                  :key="idx"
                  style="margin-left:5px">
                  {{tag}}
                </el-tag>
              </div>
              <el-checkbox label="1005">1005-创建新的分析任务</el-checkbox>
              <el-checkbox label="1006">1006-其他</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="处置意见" >
          <el-input maxlength="500" v-model="sendDealWithForm.dealWithAdive" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lookBackDialogVisible = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getInfoData } from '@/api/sys-monitoringAnalysis/taskManagement/suspiciousWarning/warning.js'
import {
  getReasptInfo,
  getNoAllReaspt
} from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/model.js'
export default {
  data() {
    return {
      form: {
        warningnumber: '', // 预警编号
        messagename: '', // 报文名
        submissiontype: '', // 报送类型
        institutionName: '', // 报告机构名称
        submissiondate: '',
        urgencydegree: '', // 紧急程度
        adminassignment: '', // 是否管理员分配
        operator: '', // 操作员
        state: '', // 状态
        crimestype: '', // 涉罪类型
        submissiondirection: '', // 报送方向
        SubmittedTime: '',
        updateTime: '',
        earlyWarningTime: ''
      },
      idsRouter: '',
      // ----------查看处置信息--------
      lookBackDialogVisible: false,
      sendDealWithForm: {
        checkList: [],
        dealWithAdive: ''
      },
      oneZeroThree: false,
      oneZeroFour: false,
      listtitletags: [],
      diageouer: false
      // -------------------------
    }
  },
  mounted() {
    if (this.$route.query) {
      this.idsRouter = this.$route.query.id
    }
    getNoAllReaspt(this.idsRouter).then(res => {
      if (res.code === 200) {
        switch (res.data) {
          case 'true':
            this.diageouer = true
            break
          case 'false':
            this.diageouer = false
            break
        }
      }
    })
    getInfoData(this.$route.query.id).then(res => {
      if (res.code === 200) {
        const formData = res.data
        this.form = formData
        const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
        const formatedDate = formData.submissiondate.replace(pattern, '$1-$2-$3')
        this.form.submissiondate = formatedDate
        if (formData.warningStrDate !== null) {
          this.form.earlyWarningTime = formData.warningStrDate + ' ~ ' + formData.warningEndDate
        }
      }
    })
  },
  methods: {
    lookworkFlowInfo() {
      getReasptInfo(this.idsRouter).then(res => {
        if (res.code === 200) {
          this.lookBackDialogVisible = true
          this.sendDealWithForm.dealWithAdive = res.data.opinion
          const seeData = res.data.subFormList
          for (let i = 0; i < seeData.length; i++) {
            this.sendDealWithForm.checkList.push(seeData[i].status)
            if (seeData[i].status === '1003' && seeData[i].extendsInfo !== '') {
              this.tranInformationtags = seeData[i].extendsInfo.split(',')
              this.oneZeroThree = true
            }
            if (seeData[i].status === '1004' && seeData[i].extendsInfo !== '') {
              this.listtitletags = seeData[i].extendsInfo.split(',')
              this.oneZeroFour = true
            }
          }
        } else if (res.code === 599) {
          this.$message({
            type: 'warning',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    goback() {
      if (JSON.parse(sessionStorage.getItem('searchWariSxpForm'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchWariSxpForm'))
        obj.ifReviewLookXqWariSxp = true
        sessionStorage.setItem('searchWariSxpForm', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  },
  created() {
    // if (this.$route.query.isView) {
    //   this.idsRouter = this.$route.query.id
    // }
  }
}
</script>
