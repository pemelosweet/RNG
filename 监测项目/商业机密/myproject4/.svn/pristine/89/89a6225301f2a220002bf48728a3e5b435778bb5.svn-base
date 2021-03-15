<template>
  <div class="interAddForm">
    <div>
      <el-row style="height:80px;line-height:80px;">
        <el-col :span="6" style="font-size:20px;font-weight: bold">编号移送流程审批</el-col>
        <!-- <el-col :span="3">
          <el-button type="primary" style="text-align:left" size="mini" @click="returnList()">返回列表</el-button>
        </el-col> -->
      </el-row>
    </div>
    <!-- <div>
      <el-row style="height:60px;line-height:60px;">
        <el-col :span="2">流程操作：</el-col>
        <el-col :span="2">
          <el-button plain size="mini" diasbled class="buttonSize">打印</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">保存</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">提交</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">意见</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">关闭</el-button>
        </el-col>
      </el-row>
    </div> -->
    <el-tabs type="border-card">
      <el-tab-pane label="签呈批单">
        <!-- <QianCheng></QianCheng> -->
        <div>
          <el-form :model="petitionForm" :rules="petitionFormRules" ref="petitionFormRef" label-width="100px" :disabled="isDisabled" label="签呈批单表单">
              <el-row>
                <!-- 第一行 -->
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="单号：" prop="number">
                      <el-input v-model="petitionForm.number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保存时间：" class="oddinput" prop="saveDt">
                      <el-date-picker
                      style="width:100% !important" 
                        v-model="petitionForm.saveDt"
                        type="date"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-col>
                <!-- 第二行 -->
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="签/呈：" prop="sign">
                      <el-select v-model="petitionForm.sign" style="width:100% !important"  placeholder="请选择活动区域">
                        <el-option label="签批单" value="签批单"></el-option>
                        <el-option label="呈批单" value="呈批单"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="类  别：" prop="s_type">
                      <el-select v-model="petitionForm.s_type" style="width:100% !important"  placeholder="请选择活动区域">
                        <el-option label="线索" value="线索"></el-option>
                        <el-option label="通报" value="通报"></el-option>
                        <el-option label="协查--受托" value="协查--受托"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <!-- 第三行 -->
                <el-col :span="24">
                  <el-form-item label="单标题：" class="ptitleitem" prop="stitle">
                      <el-input v-model="petitionForm.stitle"></el-input>
                  </el-form-item>
                </el-col>
                <!-- 第四行 -->
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="份数：" prop="copiesNum">
                      <el-input v-model="petitionForm.copiesNum"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发送单位：" prop="sendDepart" class="oddinput">
                      <el-select style="width:100% !important" v-model="petitionForm.sendDepart" clearable placeholder="请选择">
                        <el-option v-for="(item,index) in departArr" :key="index" :label="item.text" :value="item.code"></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="发送单位：" prop="sendDepart">
                      <el-select v-model="petitionForm.sendDepart" placeholder="请选择活动区域">
                        <el-option label="公安部" value="公安部"></el-option>
                        <el-option label="中纪委" value="中纪委"></el-option>
                        <el-option label="最高检" value="最高检"></el-option>
                      </el-select>
                    </el-form-item> -->
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="签批单备注："  v-if="petitionForm.sign==='签批单'" prop="signRemark">
                      <el-input type="textarea" v-model="petitionForm.signRemark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="呈批单备注："  v-if="petitionForm.sign==='呈批单' " prop="showRemark">
                      <el-input type="textarea" v-model="petitionForm.showRemark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="函标题：" prop="letterTitle">
                      <el-input v-model="petitionForm.letterTitle"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="来函号：" prop="receNum">
                      <el-input v-model="petitionForm.receNum"></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="函正文：" prop="letterText">
                      <el-input type="textarea" v-model="petitionForm.letterText"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <!-- <el-col :span="12">
                    <el-form-item label="单内流水号：">
                      <router-link :to="{name:'cueManage_analysis_fileList',params:{name:'second'}}">
                        <el-button type="text">{{this.waterNum}}</el-button>
                      </router-link>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="12">
                    <el-form-item label="编号情况：" prop="numSuit">
                      <el-input v-model="petitionForm.numSuit"></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <!-- <div class="ptitle">附件情况：</div>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="文件2：">
                    <el-input v-model="petitionForm.odd"></el-input>
                  </el-form-item>
                </el-col>
              <el-col :span="2">
                <i class="el-icon-circle-plus-outline icon-add"></i>
              </el-col>
              </el-row> -->
            </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="情报字函">
        <el-button type="primary" plain @click="printXie">打印</el-button>
        <el-row class="table">
          <el-form :model="qingBaoForm" :rules="qingBaoRules" :disabled="isDisabled" ref="qingBaoRef">
            <table border="1">
            <tr>
              <td width="850" colspan="6" height="70;" align="center">
                <h2>中国反洗钱监测分析中心</h2>
                <p>
                  <el-form-item prop="nNum">
                    <el-input v-model="qingBaoForm.nNum" placeholder="中心情报字（2018）号" style="width:40%"></el-input>
                  </el-form-item>
                </p>
              </td>
            </tr>
            <tr>
              <td height="900" colspan="6">
                <p class="p1">
                  <el-form-item prop="nTitle">
                    <el-input  v-model="qingBaoForm.nTitle" placeholder="关于有关账户协查结果的函" style="width:40%"></el-input>
                  </el-form-item>
                </p>
                <p class="p2">
                  <el-form-item prop="nDepart">
                    <el-input  v-model="qingBaoForm.nDepart" placeholder="海关总署缉私局：" style="width:40%"></el-input>
                  </el-form-item>
                </p>
                <p class="p2">
                  <el-form-item prop="nContent" style="margin-left:60px;">来函（
                    <el-input  v-model="qingBaoForm.receNum" placeholder="缉私情函（2018）号" style="width:40%"></el-input>）收悉，业经监测分析。现将协查结果提供
                  </el-form-item>
                  
                  </p>
                  <p class="p2">
                    <el-form-item prop="nDepart">
                    <el-input  v-model="qingBaoForm.nDepart" placeholder="贵局" style="width:40%"></el-input>，请查收
                  </el-form-item>
                  </p>
                <p class="p3">
                  <el-form-item prop="nAttachsuit">
                    <el-input  v-model="qingBaoForm.nAttachsuit" placeholder="附件：协查结果反馈表（共一份）" style="width:40%"></el-input>
                  </el-form-item>
                  
                </p>
                <p class="p4">中国反洗钱监测分析中心</p>
                <p class="p5"> {{this.qingBaoForm.nReceTime}}</p>
                <p class="p6"> 根据《中华人民共和国反洗钱法》的规定，本中心移送的线索内容及客户身份资料和交易信息须严格保密， 未经本中心同意严禁向线索涉及单位和个人及其他第三方披露，并只能用于法律规定的目的，不可作为执法、司法的证据。 另，线索及相关资料使用完毕须及时销毁，并请将使用情况及时反馈本中心。
                </p>
              </td>
            </tr>
          </table>
          </el-form>
          
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="附件信息" style="margin-bottom: 400px;">
        <el-upload
            :disabled="isDisabled"
            class="upload-demo"
            :action="uploadUrl"
            :on-success="showFileList1"
            multiple
            :limit="3">
              <el-button size="small" type="primary" style="text-align:center" :disabled="isDisabled">点击上传</el-button>
            </el-upload>
        <!-- <FileInfo></FileInfo> -->
        <div class="accestitle">附件列表</div>
            <el-table style="width: 100%" :data="accessoryTable.list">
              <!-- <el-table-column type="selection" width="55" fixed></el-table-column> -->
              <el-table-column type="index" width="120" label="序号" fixed></el-table-column>
              <!-- <el-table-column prop="type" label="附件类型" min-width="120" fixed></el-table-column> -->
              <el-table-column prop="attachName" label="附件名称" min-width="180" fixed></el-table-column>
              <el-table-column prop="option" fixed="right" label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text"><a @click="downloadUrl(scope.row.attachId)">下载</a></el-button>
                  <el-button type="text" v-if="!isDisabled" @click="delRow(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
      </el-tab-pane>
      <!-- <el-tab-pane label="流转信息">
        <div class="list-block">
              <el-row>
                <el-col :span="12">
                  <span>流转信息</span>
                </el-col>
              </el-row>
              <el-table :data="liuZhuan.list">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="姓名" prop="approverName"></el-table-column>
                <el-table-column label="操作名称" prop="actName"></el-table-column>
                <el-table-column label="操作时间" prop="time"></el-table-column>
                <el-table-column label="意见" prop="isAgree">
                  <template slot-scope="scope" >
                    {{scope.row.isAgree === 'Y'?'同意':'不同意'}}
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" background
                :current-page="liuZhuan.currentPage"
                :page-size="liuZhuan.pagesize" 
                :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper"
                :total="liuZhuan.list.length">
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
                  <el-steps :active="this.liuZhuan.list.length" align-center>
                    <el-step v-for="(item, index) in this.liuZhuan.list" :key="index" :title="item.actName" description=""></el-step>
                  </el-steps>
                </el-col>
              </el-row>
            </div>
      </el-tab-pane> -->
    </el-tabs>
    <div ref="myPrintForm" v-show="printType">
      <el-row class="table">
        <table border="1" style="border-collapse: collapse;
      text-align: center;
      margin: 0 auto;">
            <tr>
              <td width="850" colspan="6" height="70;" align="center">
                <h2>中国反洗钱监测分析中心</h2>
                <p>
                  {{qingBaoForm.nNum}}
                </p>
              </td>
            </tr>
            <tr>
              <td height="900" colspan="6">
                <p class="p1">
                  {{qingBaoForm.nTitle}}
                </p>
                <p class="p2" style="margin-left: 10px;text-align: left;
      margin-top: 50px;">
                  {{qingBaoForm.nDepart}}
                </p>
                <p class="p2" style="margin-left: 60px;text-align: left;margin-top: 50px;">
                  来函（{{qingBaoForm.receNum}}）收悉，业经监测分析。现将协查结果提供
                </p>
                <p class="p2"  style="margin-left: 10px;text-align: left;margin-top: 50px;">
                  {{qingBaoForm.nDepart}}，请查收
                </p>
                <p class="p3" style="margin-left: 10px;
      text-align: left;
      margin-top: 100px;">
                  {{qingBaoForm.nAttachsuit}}
                </p>
                <p class="p4" style="margin-left: 10px;
      text-align: right;
      margin-right: 30px;
      margin-top: 200px;">中国反洗钱监测分析中心</p>
                <p class="p5" style="text-align: right;
      margin-right: 30px;"> {{this.qingBaoForm.nReceTime}}</p>
                <p class="p6" style="width: 800px;
      margin: 240px auto 0;
      text-align: -webkit-auto;"> 根据《中华人民共和国反洗钱法》的规定，本中心移送的线索内容及客户身份资料和交易信息须严格保密， 未经本中心同意严禁向线索涉及单位和个人及其他第三方披露，并只能用于法律规定的目的，不可作为执法、司法的证据。 另，线索及相关资料使用完毕须及时销毁，并请将使用情况及时反馈本中心。
                </p>
              </td>
            </tr>
          </table>
      </el-row>
    </div>
  </div>
</template>

<script>
import Conduct from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/conduct'
import FileInfo from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/fileInfo'
import { noNothing, commonPattern } from '@/utils/formValidate' // 校验规则
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth' // 验权
// import QianCheng from '@/views/sys-monitoringAnalysis/cueManage/intelligence/addForm/qianCheng'
// 情报文件接口引用
import { getSignDetailInfo, numberTransUpdate, getFileList, deleteFileById, getDepart } from '@/api/sys-monitoringAnalysis/cueManage/intelligence/intelligence.js'
export default {
  components: {
    Conduct,
    FileInfo
  },
  data() {
    return {
      // 签呈批单数据
      petitionValue: '',
      petitionForm: {
        number: '', // 单号
        saveDt: '', // 保存时间
        sign: '', // 签、呈
        s_type: '', // 类别
        stitle: '', // 单标题
        copiesNum: '', // 分数
        sendDepart: '', // 发送单位
        signRemark: '', // 签批单备注
        showRemark: '', // 呈批单备注
        letterTitle: '', // 函标题
        letterText: '', // 函正文
        numSuit: '', // 编号情况，
        receNum: ''

      },
      stopRepeat: 0,
      departArr: [],
      petitionFormRules: {
        signId: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '主键',
        number: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '单号',
        sign: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], //  '签/呈/签呈',
        saveDt: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ], // '保存时间',
        s_type: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '类别-线索 协查 通报',
        sTitle: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.mynoSpaceAndTs, trigger: 'blur' }
        ], // '单标题',
        copiesNum: [
          { required: false, message: '内容不能为空', trigger: 'blur' },
          { validator: this.onlyNumberValidate, trigger: 'blur' }
        ], // '份数',
        sendDepart: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // 'sendDepart',
        signRemark: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ], // '签批单备注',
        showRemark: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ], // '呈批单备注',
        letterTitle: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '函标题',
        receNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '来函号',
        letterText: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ], // '函正文',
        enclosureInf: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '附件情况',
        numSuit: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ], // '编号情况',
        status: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ] // '状态'
      },
      // 情报自涵表单
      qingBaoForm: {
        nNum: '', // '情报字号',
        nTitle: '', // '标题',
        nDepart: '', // '来文单位',
        receNum: '', // '内容',
        nAttachsuit: '', // '附件情况',
        singId: '', // '签批单ID',
        nReceTime: ''
      },
      // 情报自涵校验
      qingBaoRules: {},
      // 传过来的infoId
      infoId: '',
      // 附件列表
      accessoryTable: {
        // 请求信息分页
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      signId: '',
      nId: '',
      // 会签需要的参数
      actInstId: '',
      proInstId: '',
      workitemId: '',
      // 流转信息列表
      liuZhuan: {
        list: [],
        currentPage: 1,
        pagesize: 10,
        total: 10
      },
      isDisabled: true,
      printType: false // 打印情报字函
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.updateForm()
      this.$store.dispatch('changeFlag', false)
    },
    workFlow: {
      www(newVal, oldVal) {
        console.log(newVal, 333)
      }
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
        this.proInstId = newVal.workflow.proInstId
        // 签呈批单数据
        if (newVal.signDO) {
          this.signId = newVal.signDO.signId
          this.petitionForm.number = newVal.signDO.number
          this.petitionForm.saveDt = newVal.signDO.saveDt
          this.petitionForm.sign = newVal.signDO.sign
          this.petitionForm.s_type = newVal.signDO.s_type
          this.petitionForm.stitle = newVal.signDO.sTitle
          this.petitionForm.copiesNum = newVal.signDO.copiesNum
          this.petitionForm.sendDepart = newVal.signDO.sendDepart
          this.petitionForm.signRemark = newVal.signDO.signRemark
          this.petitionForm.showRemark = newVal.signDO.showRemark
          this.petitionForm.letterTitle = newVal.signDO.letterTitle
          this.petitionForm.letterText = newVal.signDO.letterText
          this.petitionForm.numSuit = newVal.signDO.numSuit
          this.petitionForm.receNum = newVal.signDO.receNum
        }
        if (newVal.intelligenceLetterDO) {
          // 情报自函数据
          this.nId = newVal.intelligenceLetterDO.nId
          this.qingBaoForm.nNum = newVal.intelligenceLetterDO.nNum
          this.qingBaoForm.nTitle = newVal.intelligenceLetterDO.nTitle
          this.qingBaoForm.nDepart = newVal.intelligenceLetterDO.nDepart
          this.qingBaoForm.receNum = newVal.intelligenceLetterDO.receNum
          this.qingBaoForm.nAttachsuit = newVal.intelligenceLetterDO.nAttachsuit
          this.qingBaoForm.nReceTime = newVal.intelligenceLetterDO.nReceTime
        }
        getFileList(this.signId).then(res => {
          this.accessoryTable.list = res.data
        })
        // 获取流转信息
        // recode(this.proInstId).then(res => {
        //   console.log(res)
        //   if (res.data) {
        //     this.liuZhuan.list = res.data
        //   }
        // })
      }
    }
  },
  computed: {
    ...mapGetters(['institution']),
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    // 上传附件
    uploadUrl() {
      return `/monitor/numberTrans/attach-upload?mainId=` + this.signId + `&token=` + getToken()
    }
  },
  mounted() {
    this.getDepart()
    // this.signId = this.$route.query.signId
    // this.getSignDetailInfoById()
    // console.log(this.infoId)
    // this.getFileList() // 获取附件列表
  },
  methods: {
    getDepart() {
      getDepart().then(res => {
        if (res.code === 200) {
          this.departArr = res.data
        }
      })
    },
    onlyNumberValidate(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (!commonPattern.number.test(value) && value !== '') {
        callback(new Error('必须输入数值'))
      } else {
        callback()
      }
    },
    printXie() {
      this.printType = true
      document.body.innerHTML = this.$refs.myPrintForm.innerHTML
      window.print()
      window.location.reload()
    },
    downloadUrl(scope) {
      location.href = '/file-service/upload/download/' + scope + '?moduleName=' + encodeURI('线索管理')
    },
    returnList() {
      this.$router.go(-1)
    },
    // 签呈批单数据回显
    getSignDetailInfoById() {
      getSignDetailInfo(this.signId).then(res => {
        // 签呈批单数据
        this.petitionForm.number = res.data.data.signDO.number
        this.petitionForm.saveDt = res.data.data.signDO.saveDt
        this.petitionForm.sign = res.data.data.signDO.sign
        this.petitionForm.s_type = res.data.data.signDO.s_type
        this.petitionForm.stitle = res.data.data.signDO.sTitle
        this.petitionForm.copiesNum = res.data.data.signDO.copiesNum
        this.petitionForm.sendDepart = res.data.data.signDO.sendDepart
        this.petitionForm.signRemark = res.data.data.signDO.signRemark
        this.petitionForm.showRemark = res.data.data.signDO.showRemark
        this.petitionForm.letterTitle = res.data.data.signDO.letterTitle
        this.petitionForm.letterText = res.data.data.signDO.letterText
        this.petitionForm.numSuit = res.data.data.signDO.numSuit
        this.petitionForm.receNum = res.data.data.signDO.receNum
        // 情报自函数据
        this.qingBaoForm.nNum = res.data.data.letterDO.nnum
        this.qingBaoForm.nTitle = res.data.data.letterDO.ntitle
        this.qingBaoForm.nDepart = res.data.data.letterDO.ndepart
        this.qingBaoForm.receNum = res.data.data.letterDO.receNum
        this.qingBaoForm.nAttachsuit = res.data.data.letterDO.nattachsuit
        console.log(res)
      })
    },
    // 起草按钮弹窗的提交
    updateForm() {
      if (this.stopRepeat === 1) {
        return false
      } else {
        this.$refs['petitionFormRef'].validate((valid) => {
          if (valid) {
            this.stopRepeat++
            const formArchivesInfo = {
              signId: this.signId,
              workflow: this.workFlow2business,
              signDO: {
                signId: this.signId,
                number: this.petitionForm.number,
                sign: this.petitionForm.sign,
                saveDt: this.petitionForm.saveDt,
                s_type: this.petitionForm.s_type,
                sTitle: this.petitionForm.stitle,
                copiesNum: this.petitionForm.copiesNum,
                sendDepart: this.petitionForm.sendDepart,
                signRemark: this.petitionForm.signRemark,
                showRemark: this.petitionForm.showRemark,
                letterTitle: this.petitionForm.letterTitle,
                receNum: this.petitionForm.receNum,
                letterText: this.petitionForm.letterText,
                numSuit: this.petitionForm.numSuit
              },
              letterDO: {
                nId: this.nId,
                nNum: this.qingBaoForm.nNum,
                nTitle: this.qingBaoForm.nTitle,
                nDepart: this.qingBaoForm.nDepart,
                receNum: this.qingBaoForm.receNum,
                nAttachsuit: this.qingBaoForm.nAttachsuit,
                singId: this.signId
              }

            }
            numberTransUpdate(formArchivesInfo).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.stopRepeat = 0
                this.$store.dispatch('changeFlag', false)
                setTimeout(() => {
                  this.$router.push({ name: 'home' })
                }, 1000)
              }
            })
          }
        })
      }
    },
    updateForm1111() {
      const formArchivesInfo = {
        signId: this.signId,
        workflow: this.workFlow2business,
        signDO: {
          signId: this.signId,
          number: this.petitionForm.number,
          sign: this.petitionForm.sign,
          saveDt: this.petitionForm.saveDt,
          s_type: this.petitionForm.s_type,
          sTitle: this.petitionForm.stitle,
          copiesNum: this.petitionForm.copiesNum,
          sendDepart: this.petitionForm.sendDepart,
          signRemark: this.petitionForm.signRemark,
          showRemark: this.petitionForm.showRemark,
          letterTitle: this.petitionForm.letterTitle,
          receNum: this.petitionForm.receNum,
          letterText: this.petitionForm.letterText,
          numSuit: this.petitionForm.numSuit
        },
        letterDO: {
          nId: this.nId,
          nNum: this.qingBaoForm.nNum,
          nTitle: this.qingBaoForm.nTitle,
          nDepart: this.qingBaoForm.nDepart,
          receNum: this.qingBaoForm.receNum,
          nAttachsuit: this.qingBaoForm.nAttachsuit,
          singId: this.signId
        }

      }
      numberTransUpdate(formArchivesInfo).then(res => {
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
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 附件上传成功
    showFileList1(res, file) {
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      }
      getFileList(this.signId).then(res => {
        if (res.code === 200) {
          this.accessoryTable.list = res.data
        }
        console.log(res)
      })
    },
    // 上传文件之前
    handleBeforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
      }
      return extension || (extension2 && isLt2M)
    },
    // 删除附件
    delRow(scope) {
      this.$confirm('确定要删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFileById(scope.row.attachId).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            getFileList(this.signId).then(res => {
              this.accessoryTable.list = res.data
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.interAddForm{
  .buttonSize{
    width: 86px;
  }
  .table {
    table {
      border-collapse: collapse;
      text-align: center;
      margin: 0 auto;
    }
    table p {
      text-align: center;
      margin-top: 20px;
    }
    table span {
      display: inline-block;
      width: 430px;
      text-align: right;
    }
    #time span {
      width: 30px;
    }
    .p2 {
      margin-left: 10px;
      text-align: left;
      margin-top: 50px;
    }
    .p3 {
      margin-left: 10px;
      text-align: left;
      margin-top: 100px;
    }
    .p7 {
      margin-left: 10px;
      text-align: left;
      margin-top: 100px;
    }
    .p4 {
      margin-left: 10px;
      text-align: right;
      margin-right: 30px;
      margin-top: 200px;
    }
    .p5 {
      text-align: right;
      margin-right: 30px;
    }
    .p6 {
      width: 800px;
      margin: 240px auto 0;
      text-align: -webkit-auto;
    }
  }
}


</style>
