<template>
  <div>
    <el-button style="margin:0 10px 10px 10px"  type="primary" plain v-for="(item,index) in buttonList" :key="index" @click="submit(item)">{{item.operation}}</el-button>
    <el-dialog :visible.sync="flowChartDialog" fullscreen width="70%">
      <iframe v-loading.body="loading" :src="iframeURL" frameborder="0" id="iFrame1" width="100%" scrolling="no" height="540px"></iframe>
    </el-dialog>
    <el-dialog title="退回节点：" :visible.sync="sendBackDialog">
      <el-form :model="sendBackForm" ref="sendBackForm">
        <el-form-item prop="toActInstId" :rules="{ required: true, message: '请选择节点', trigger: 'change'}" style="margin-bottom:38px">
          <el-radio-group v-model="sendBackForm.toActInstId">
            <el-radio :label="item.id" v-for="(item,index) in backNodeData" :key="index">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="意见" label-width="40px">
          <el-input maxlength="100" v-model="sendBackForm.opinion" placeholder="请输入回退意见，最多输入100个字符" type="textarea" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="sendBack"  :loading="loadings">确定</el-button>
        <el-button @click="sendBackDialog=false">取消</el-button>
      </div>

    </el-dialog>
    <!-- 处置 -->
    <el-dialog :visible.sync="dealWithDialog" width="70%" :close-on-click-modal="false">
      <el-form :model="sendDealWithForm" label-width="80px">
        <el-form-item label="处置状态">
            <el-checkbox-group ref="checkGround" v-model="sendDealWithForm.checkList" style="display: flex;flex-direction: column;width:80%" @change="handleCheckedCitiesChange"  :disabled='dispthLookdialog'>
              <el-checkbox label="1001">1001-经初步分析，不能确定为可疑</el-checkbox>
              <el-checkbox label="1002" >1002-列入关注名单 <el-button type="text" v-if="oneZeroTwo" @click="EnterListInfo" style="textAlign:rigth">录入关注名单信息</el-button></el-checkbox>
              <el-checkbox label="1003">1003-已移送，中心对外移送情报（通报）字函号 <el-button v-if="oneZeroThree" type="text" @click="tranInformation">选择</el-button></el-checkbox>
              <div v-if="oneZeroThree || tagInfoThree">
                <el-tag
                  v-for="(tag,idx) in tranInformationtags"
                  :key="idx"
                  style="margin-left:5px"
                  closable>
                  {{tag}}
                </el-tag>
              </div>
              <el-checkbox label="1004">1004-加入已有的分析任务中 <el-button v-if='oneZeroFour' type="text" @click="tasksMation">选择</el-button></el-checkbox>
              <div v-if='oneZeroFour || tagInfoFour'>
                <el-tag
                  v-for="(tag,idx) in listtitletags"
                  :key="idx"
                  style="margin-left:5px">
                  {{tag}}
                </el-tag>
              </div>
              <el-checkbox label="1005">1005-创建新的分析任务 <el-button v-if='oneZeroFive' type="text" @click="analyticalTasks">发起分析任务</el-button></el-checkbox>
              <el-checkbox label="1006">1006-其他</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="处置意见" >
          <el-input maxlength="100"  :disabled='dispthLookdialog' v-model="sendDealWithForm.dealWithAdive" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="handleCheck" v-if="!dispthLookdialog" @click="managementSure">确定</el-button>
        <el-button v-if="!dispthLookdialog" @click="cancelManageAue">取消</el-button>
        <el-button type="primary" v-if="dispthLookdialog" @click="goHistory">返回</el-button>
      </div>
    </el-dialog>
    <!-- 撤销签收 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleDynamis" width="30%">
      <span>是否撤销签收？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="handleCheckDynamis" @click="withdrawalSignature">确 定</el-button>
        <el-button @click="dialogVisibleDynamis = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 回收 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleTakeBack" width="30%">
      <span>是否收回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="handleCheckTakeBack" @click="takeBackture">确 定</el-button>
        <el-button @click="dialogVisibleTakeBack = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { sendBack, backNode, takeBack, deliver, disposalComplet, lookComplet, lookDealWith, withdrawal, lookCancelDealWith, takeBackSuccess } from '@/api/sys-monitoringAnalysis/workFlow/index.js'
export default {
  data() {
    return {
      isRules: true,
      flowChartDialog: false,
      loading: false,
      loadings: false,
      sendBackDialog: false,
      dealWithDialog: false,
      handleCheck: false,
      // RegressionDialog: false,
      backNodeData: [],
      btnList: [],
      sendBackForm: {
        toActInstId: '', // 回退节点
        opinion: '' // 回退意见
      },
      sendDealWithForm: {
        checkList: [],
        dealWithAdive: ''
      },
      workFlowAllData: {},

      // 1002
      listformIdTwo: '',
      sessginInfo: {},
      subjectName: '',
      ctid: '',
      numberArr: '',
      // 以下为处置所需数据 1003
      tranInformationtags: [],
      tranInfoId: [],
      // 以下为处置所需数据 1004
      listtitletags: [],
      fxId: [],
      // 以下为处置所需数据 1005
      listformId: '',
      // 处置组装数据
      checkArrayInfo: [],
      roleTypeThree: '',
      pkIdStr: '',
      bloorValue: true,
      warningNB: '',
      // 组装的status
      makeCheckState: [],
      linkformId: [],
      oneZeroTwo: false,
      oneZeroThree: false,
      oneZeroFour: false,
      oneZeroFive: false,

      // 判断是查看还是新建处置
      dispthLookdialog: false,
      tagInfoThree: false,
      tagInfoFour: false,
      // 撤销签收
      dialogVisibleDynamis: false,
      handleCheckDynamis: false,
      // 收回
      dialogVisibleTakeBack: false,
      handleCheckTakeBack: false
    }
  },
  // props: ['viewProcess'],
  props: {
    viewProcess: {
      type: String
    },
    workflowsxp: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['business2workFlow', 'buttonData', 'formContent', 'workFlowInfobusiness', 'seniorListNumberArr']),
    // 处理buttonDa数据
    buttonList() {
      this.btnList = this.buttonData
      this.pkIdStr = this.workflowsxp.pkId
      if (this.workflowsxp.roleType === 'done' && this.bloorValue) {
        this.bloorValue === false
        lookCancelDealWith(this.pkIdStr).then(res => {
          if (res.code === 200) {
            if (res.data !== true) {
              for (let i = 0; i < this.btnList.length; i++) {
                if (this.btnList[i].operation === '处置') {
                  this.btnList.splice(i, 1)
                  break
                }
              }
            }
          }
        })
      }
      // const arr = []
      // this.btnList.forEach(el => {
      //   if (el.operation !== 'uploadAttachment') {
      //     arr.push(el)
      //   }
      // })
      // this.btnList = arr
      this.btnList.map(item => {
        switch (item.operation) {
          case 'add':
            item.operation = '会签加签'
            break
          case 'remove':
            item.operation = '会签减签'
            break
          case 'addnormal':
            item.operation = '加签'
            break
          case 'removenormal':
            item.operation = '减签'
            break
          case 'view':
            item.operation = '查看流程图'
            break
          case 'notify':
            item.operation = '通知'
            break
          case 'complete':
            item.operation = '提交'
            break
          case 'sendback':
            item.operation = '退回'
            break
          case 'undoaccept':
            item.operation = '撤销签收'
            break
          case 'reassign':
            item.operation = '转办'
            break
          case 'withdraw':
            item.operation = '收回'
            break
          case 'dispose':
            item.operation = '处置'
            break
          // case 'sendgoback':
          //   item.operation = '回退'
          //   break
          default:
            break
        }
        return item
      })
      return this.btnList
    },
    iframeURL() {
      return `http://192.168.200.65:8121/workflow/resoft/wfm/ApplicationServiceContainer/openFormPage?wfmInitPageType=view&proInstId=${
        this.business2workFlow.proInstId
      }&proDirId=${this.business2workFlow.proDirId}`
    },
    // 工作流回退参数
    sendBackParams() {
      const obj = JSON.parse(JSON.stringify(this.business2workFlow))
      delete obj.configCode
      this.backNodeData.forEach(el => {
        if (el.id === this.sendBackForm.toActInstId) {
          obj.name = el.name
          obj.proInstName = el.proInstName
          obj.resourceIds = el.resourceIds
        }
      })
      obj.toActInstId = this.sendBackForm.toActInstId
      obj.opinion = this.sendBackForm.opinion
      return obj
    },
    // 工作流---收回参数
    takeBackParams() {
      const obj = JSON.parse(JSON.stringify(this.business2workFlow))
      obj.name = this.workFlowAllData.name
      delete obj.configCode
      delete obj.workitemId
      return obj
    }
  },
  watch: {
    formContent: {
      handler(newVal, oldVal) {
        this.form = newVal
        // delete this.form.workflow
      }
    },
    workFlowInfobusiness: {
      handler(newVal, oldVal) {
        this.workFlowAllData = newVal
      }
    }
  },
  mounted() {
    this.sessginInfo = {}
    // this.$store.dispatch('operationButton', this.buttonParams)
    //   ---------------宋显鹏添加----------------------------------------
    if (JSON.parse(sessionStorage.getItem('dealWithInfo')) && JSON.parse(sessionStorage.getItem('dealWithInfo')).ifIsmanagement === true) {
      this.sessginInfo = JSON.parse(sessionStorage.getItem('dealWithInfo'))
      this.oneZeroTwo = this.sessginInfo.echoState.oneZeroTwo
      this.oneZeroThree = this.sessginInfo.echoState.oneZeroThree
      this.oneZeroFour = this.sessginInfo.echoState.oneZeroFour
      this.oneZeroFive = this.sessginInfo.echoState.oneZeroFive
      if (this.sessginInfo.ifIsmanagement) {
        this.sessginInfo.ifIsmanagement = false
        sessionStorage.setItem('dealWithInfo', JSON.stringify(this.sessginInfo))
        this.sendDealWithForm.checkList = this.sessginInfo.centerData
        this.checkArrayInfo = this.sessginInfo.centerData
        this.dealWithDialog = true
        if (JSON.stringify(this.sessginInfo.objIsDeal1002) !== '{}') {
        // 1002-加入已有的分析任务中
          this.listformIdTwo = this.sessginInfo.objIsDeal1002.analysisId
        }
        if (JSON.stringify(this.sessginInfo.objIsDeal1003) !== '{}') {
          // 1003-已移送，中心对外移送情报（通报）字函号
          this.tranInformationtags = this.sessginInfo.objIsDeal1003.objIsmanagement.split(',')
          this.tranInfoId = this.sessginInfo.objIsDeal1003.objIsmanageId.split(',')
        }
        if (JSON.stringify(this.sessginInfo.objIsDeal1004) !== '{}') {
        // 1004-加入已有的分析任务中
          this.listtitletags = this.sessginInfo.objIsDeal1004.objIsmanagement.split(',')
          this.fxId = this.sessginInfo.objIsDeal1004.objIsmanageId.split(',')
        }
        if (JSON.stringify(this.sessginInfo.objIsDeal1005) !== '{}') {
        // 1005-加入已有的分析任务中
          this.listformId = this.sessginInfo.objIsDeal1005.analysisId
        }
      }
    } else {
      this.oneZeroTwo = false
      this.oneZeroThree = false
      this.oneZeroFour = false
      this.oneZeroFive = false
      sessionStorage.removeItem('dealWithInfo')
    }
    if (sessionStorage.getItem('roleType') && sessionStorage.getItem('roleType') === 'done') {
      this.dispthLookdialog = true
      this.roleTypeThree = sessionStorage.getItem('roleType')
    }
  },
  methods: {
    submit(item) {
      // console.log(this.buttonData)
      switch (item.operation) {
        case '会签加签':
          this.unfinshed()
          break
        case '会签减签':
          this.unfinshed()
          break
        case '加签':
          this.unfinshed()
          break
        case '减签':
          this.unfinshed()
          break
        case '查看流程图':
          this.viewFlowRecord()
          break
        case '通知':
          this.unfinshed()
          break
        case '提交':
          this.$store.dispatch('openWorkFlow', true)
          break
        case '退回':
          this.getBackNode()
          break
        case '撤销签收':
          this.dialogVisibleDynamis = true
          break
        case '转办':
          this.unfinshed()
          break
        case '收回':
          this.dialogVisibleTakeBack = true
          break
        case '处置':
          this.dealWithInfo()
          break
        // case '回退':
        //   this.goSendBack()
        //   break
        default:
          break
      }
    },
    unfinshed() {
      this.$message({
        message: '该功能暂未开放，敬请期待!',
        type: 'warning'
      })
    },
    // 撤销签收 ---------------宋显鹏
    withdrawalSignature() {
      this.handleCheckDynamis = true
      const obj = this.business2workFlow
      delete obj.ricd
      delete obj.configCode
      this.dialogVisibleDynamis = false
      withdrawal(obj).then(res => {
        if (res.code === 200) {
          this.handleCheckDynamis = false
          this.$router.push({ name: 'monitor_workPlatform' })
          this.$message({
            type: 'success',
            message: '撤销签收成功!',
            duration: 6000,
            showClose: true
          })
        } else {
          this.handleCheckDynamis = false
          this.dialogVisibleDynamis = false
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 处置之前的调取接口判断是否处置处理
    dealEvent(beaool) {
      lookDealWith(this.workFlowAllData).then(res => {
        if (res.code === 200) {
          this.dealWithDialog = true
          lookComplet(this.business2workFlow.proInstId, this.workFlowAllData.pkId).then(res => {
            if (res.code === 200) {
              if (res.data === null) {
                this.dispthLookdialog = beaool
              } else {
                this.dispthLookdialog = true
                this.sendDealWithForm.dealWithAdive = res.data.opinion
                const seeData = res.data.subFormList
                for (let i = 0; i < seeData.length; i++) {
                  this.sendDealWithForm.checkList.push(seeData[i].status)
                  if (seeData[i].status === '1003' && seeData[i].extendsInfo !== '') {
                    this.tranInformationtags = seeData[i].extendsInfo.split(',')
                    this.tagInfoThree = true
                  }
                  if (seeData[i].status === '1004' && seeData[i].extendsInfo !== '') {
                    this.listtitletags = seeData[i].extendsInfo.split(',')
                    this.tagInfoFour = true
                  }
                }
              }
            } else {
              this.$message({
                type: 'error',
                message: res.message,
                duration: 6000,
                showClose: true
              })
            }
          })
        } else if (res.code === 599) {
          // this.dealWithDialog = true
          // this.dispthLookdialog = true
          this.$message({
            type: 'warning',
            message: res.message,
            duration: 6000,
            showClose: true
          })
          // setTimeout(() => {
          //   this.$router.push({ name: 'monitor_workPlatform' })
          // }, 3000)
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
    // 处置    ---------------宋显鹏添加
    dealWithInfo() {
      if (sessionStorage.getItem('roleType') === 'done') {
        this.dealEvent(true)
      } else {
        this.dealEvent(false)
      }
    },
    // 1002录入关注名单 按钮   ---------------宋显鹏添加
    EnterListInfo() {
      this.subjectName = ''
      this.ctid = ''
      // 模型
      if (this.formContent.workflow.configCode && this.formContent.workflow.configCode === 'modelQuery') {
        this.subjectName = this.formContent.subjectName
        this.ctid = this.formContent.identificationNumber
      }
      // 排名和高级预警
      if (this.formContent.workflow.configCode && (this.formContent.workflow.configCode === 'rankingRules' || this.formContent.workflow.configCode === 'seniorListWarnQuery')) {
        if (this.formContent.workflow.configCode === 'rankingRules') {
          this.subjectName = this.formContent.ctnm
          this.ctid = this.formContent.ctid
        }
        if (this.formContent.workflow.configCode === 'seniorListWarnQuery') {
          this.subjectName = this.formContent.list[0].ctnm
          this.ctid = this.formContent.list[0].ctid
          if (this.seniorListNumberArr.accountNumber !== null) {
            this.numberArr = this.seniorListNumberArr[0].accountNumber
          }
        }
      }
      const echostate = {}
      echostate.oneZeroTwo = this.oneZeroTwo
      echostate.oneZeroThree = this.oneZeroThree
      echostate.oneZeroFour = this.oneZeroFour
      echostate.oneZeroFive = this.oneZeroFive
      this.$router.push({
        name: 'rosterManageanalyst_handleImport',
        query: {
          ismanagement: true,
          centerData: this.sendDealWithForm.checkList,
          subjectName: this.subjectName,
          ctid: this.ctid,
          numberArr: this.numberArr !== '' ? this.numberArr : '',
          echoState: echostate
        }
      })
    },
    // 1005 发起主动分析 按钮   ---------------宋显鹏添加
    analyticalTasks() {
      const echostate = {}
      echostate.oneZeroTwo = this.oneZeroTwo
      echostate.oneZeroThree = this.oneZeroThree
      echostate.oneZeroFour = this.oneZeroFour
      echostate.oneZeroFive = this.oneZeroFive
      this.warningNB = ''
      if (this.formContent.warningNumber) {
        this.warningNB = this.formContent.warningNumber
      } else if (this.formContent.warningNum) {
        this.warningNB = this.formContent.warningNum
      } else if (this.formContent.warningnumber) {
        this.warningNB = this.formContent.warningnumber
      } else {
        this.warningNB = this.formContent.list[0].code
      }
      this.$router.push({
        name: 'cueManage_autonomousAnalysisInfo',
        query: {
          ismanagement: true,
          centerData: this.sendDealWithForm.checkList,
          echoState: echostate,
          keyIndex: '0',
          warningNum: this.warningNB,
          proInstId: this.business2workFlow.proInstId,
          configCode: this.business2workFlow.configCode
        }
      })
    },
    // 1003 中心对外移送情报   ---------------宋显鹏添加
    tranInformation() {
      const echostate = {}
      echostate.oneZeroTwo = this.oneZeroTwo
      echostate.oneZeroThree = this.oneZeroThree
      echostate.oneZeroFour = this.oneZeroFour
      echostate.oneZeroFive = this.oneZeroFive
      this.$router.push({
        name: 'cueManage_intelligence_analysis',
        query: {
          activePane: 'second',
          ismanagement: true,
          centerData: this.sendDealWithForm.checkList,
          echoState: echostate
        }
      })
    },
    // 1004 加入已有的分析任务中  ---------------宋显鹏添加
    tasksMation() {
      const echostate = {}
      echostate.oneZeroTwo = this.oneZeroTwo
      echostate.oneZeroThree = this.oneZeroThree
      echostate.oneZeroFour = this.oneZeroFour
      echostate.oneZeroFive = this.oneZeroFive
      this.$router.push({
        name: 'cueManage_autonomousAnalysis',
        query: {
          activePane: 'second',
          ismanagement: true,
          centerData: this.sendDealWithForm.checkList,
          echoState: echostate
        }
      })
    },
    // 处置勾选事件   ----------------宋显鹏添加
    handleCheckedCitiesChange(val) {
      if (val.length === 0) {
        this.oneZeroTwo = false
        this.oneZeroThree = false
        this.oneZeroFour = false
        this.oneZeroFive = false
      }
      this.checkArrayInfo = val
      this.makeDataFlag()
    },
    // 组装处置数据    ----------------宋显鹏添加
    makeDataFlag() {
      this.makeCheckState = []
      this.checkArrayInfo.forEach(el => {
        const checkTwo = this.checkArrayInfo.indexOf('1002')
        if (checkTwo === -1) {
          this.oneZeroTwo = false
        }
        const checkThree = this.checkArrayInfo.indexOf('1003')
        if (checkThree === -1) {
          this.tranInformationtags = []
          this.oneZeroThree = false
        }
        const checkFour = this.checkArrayInfo.indexOf('1004')
        if (checkFour === -1) {
          this.oneZeroFour = false
          this.listtitletags = []
        }
        const checkFive = this.checkArrayInfo.indexOf('1005')
        if (checkFive === -1) {
          this.oneZeroFive = false
        }
        if (el === '1001') {
          const obj1 = {}
          obj1.status = '1001'
          obj1.linkformId = ''
          obj1.extendsInfo = ''
          this.makeCheckState.push(obj1)
        }
        if (el === '1002') {
          this.oneZeroTwo = true
          const obj2 = {}
          obj2.status = '1002'
          obj2.linkformId = this.listformIdTwo
          obj2.extendsInfo = ''
          this.makeCheckState.push(obj2)
        }
        if (el === '1003') {
          this.oneZeroThree = true
          const obj3 = {}
          obj3.status = '1003'
          obj3.linkformId = this.tranInfoId.join(',')
          obj3.extendsInfo = this.tranInformationtags.join(',')
          this.makeCheckState.push(obj3)
        }
        if (el === '1004') {
          this.oneZeroFour = true
          const obj4 = {}
          obj4.status = '1004'
          obj4.linkformId = this.fxId.join(',')
          obj4.extendsInfo = this.listtitletags.join(',')
          this.makeCheckState.push(obj4)
        }
        if (el === '1005') {
          this.oneZeroFive = true
          const obj5 = {}
          obj5.status = '1005'
          obj5.linkformId = this.listformId
          obj5.extendsInfo = ''
          this.makeCheckState.push(obj5)
        }
        if (el === '1006') {
          const obj6 = {}
          obj6.status = '1006'
          obj6.linkformId = ''
          obj6.extendsInfo = ''
          this.makeCheckState.push(obj6)
        }
      })
    },
    // 处置确定按钮  -------------------宋显鹏添加
    managementSure() {
      this.handleCheck = true
      this.makeDataFlag()
      const obj = this.workFlowAllData
      obj.opinion = this.sendDealWithForm.dealWithAdive
      obj.disposeStatus = this.makeCheckState
      disposalComplet(obj).then(res => {
        if (res.code === 200) {
          this.dealWithDialog = false
          sessionStorage.removeItem('dealWithInfo')
          this.sessginInfo = {}
          // 以下为处置所需数据 1003
          this.tranInformationtags = []
          // 以下为处置所需数据 1004
          this.listtitletags = []
          this.oneZeroTwo = false
          this.oneZeroThree = false
          this.oneZeroFour = false
          this.oneZeroFive = false
          this.handleCheck = false
          this.$router.push({
            name: 'monitor_workPlatform'
          })
          this.$message({
            type: 'success',
            message: res.message,
            duration: 6000,
            showClose: true
          })
          this.$refs.checkGround.clearSelection()
        } else {
          this.dealWithDialog = false
          this.handleCheck = false
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 处置取消按钮   --------------宋显鹏添加
    cancelManageAue() {
      this.dealWithDialog = false
      this.handleCheck = false
      this.sendDealWithForm = {
        checkList: [],
        dealWithAdive: ''
      }
      this.oneZeroTwo = false
      this.oneZeroThree = false
      this.oneZeroFour = false
      this.oneZeroFive = false
      this.listtitletags = []
      this.tranInformationtags = []
      sessionStorage.removeItem('dealWithInfo')
    },
    goHistory() {
      this.dealWithDialog = false
    },
    // goSendBack() {
    //   this.RegressionDialog = true
    // },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 查看流程图
    viewFlowRecord() {
      window.open(this.viewProcess, '_blank')
    },
    // 获取回退节点
    getBackNode() {
      backNode({ actInstId: this.$route.query.actInstId })
        .then(res => {
          if (res.code === 200) {
            this.backNodeData = res.data
            this.sendBackDialog = true
          }
        })
    },

    // 工作流---------退回
    sendBack() {
      this.$refs['sendBackForm'].validate(valid => {
        if (valid) {
          this.loadings = true
          sendBack(this.sendBackParams)
            .then(res => {
              if (res.code === 200) {
                this.loadings = false
                this.$message({
                  message: '回退成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.sendBackDialog = false
                  this.$router.push({ name: 'monitor_workPlatform' })
                }, 1000)
              } else {
                this.loadings = false
              }
            }).catch(() => {
              this.loadings = false
            })
        } else {
          return false
        }
      })
    },
    // 工作流-----------转办
    deliver() {
      deliver(this.sendBackParams)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '回退成功',
              type: 'success'
            })
            setTimeout(() => {
              this.sendBackDialog = false
              this.$router.push({ name: 'monitor_workPlatform' })
            }, 1000)
          }
        })
    },
    // 工作流---------收回
    takeBackture() {
      this.handleCheckTakeBack = true
      takeBack(this.takeBackParams)
        .then(res => {
          if (res.code === 200) {
            this.handleCheckTakeBack = false
            this.dialogVisibleTakeBack = false
            if (res.data === '下一节点已签收，不允许收回!') {
              this.$message({
                message: '任务已被认领，无法回收',
                type: 'success'
              })
            } else if (res.data === '收回成功!') {
              takeBackSuccess(this.workFlowInfobusiness).then(res => {
                if (res.code === 200) {
                  // console.log(res, 222222)
                }
              })
              this.$message({
                message: res.data,
                type: 'success'
              })
            }

            setTimeout(() => {
              this.$router.push({ name: 'monitor_workPlatform' })
            }, 1500)
          } else if (res.code === 599) {
            this.handleCheckTakeBack = false
            this.dialogVisibleTakeBack = false
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.zZindex { z-index:3000 !important; }
</style>

