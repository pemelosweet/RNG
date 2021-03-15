<template>
  <div class="apporderwrap" v-loading="subLoading" element-loading-text="提交中，请稍侯..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.2)">
    <el-card>
      <div slot="header">
        <span>数据录入审批单</span>
        <div style="float:right" v-if="activeName === 'first'">
          <el-button :disabled="this.$route.query.pageFlag === 'look'" @click="handleSave" type="warning" plain>保 存</el-button>
          <el-button :disabled="this.$route.query.pageFlag === 'look'" @click="handleSubmit" type="primary" plain>提 交</el-button>
          <el-button  @click="handlePrint" type="primary" plain>打 印</el-button>
          <el-button @click="handleClose" type="info" plain>关 闭</el-button>

        </div>
      </div>
      <monitor-workflow></monitor-workflow>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- start -->
        <div style="text-align:center" v-if="activeName==='first'">
          <h3>录入数据审批单</h3>
        </div>
        <el-tab-pane label="数据录入审批单" name="first">
          <div class="styleFist">
            <el-form :model="inputForm" ref="refForm" :rules="inputFormRules" label-width="110px">
              <el-row>
                <el-col :span="12" style="border-right:none">
                  <el-form-item label="录入方式" prop="appInputmode">
                    <el-select clearable style="width:100%" :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.appInputmode" placeholder="请选择" @change="modeTadiaChange">
                      <el-option v-for="(item, index) in optionsmode" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="录入类型" prop="appInputtype">
                    <el-select  @change="clearTypes" clearable style="width:100%" :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.appInputtype" placeholder="请选择">
                      <!-- <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value">
                      </el-option> -->
                        <el-option v-if="this.typenames.split(',').includes('2')"  label="国际协查文件管理" value="1"></el-option>
                        <el-option  v-if="this.typenames.split(',').includes('1')" label="反馈信息" value="2"></el-option>
                        <el-option v-if="this.typenames.split(',').includes('2')"  label="境内协查类文件管理" value="3"></el-option>
                        <el-option v-if="inputForm.appInputmode==='2'&&this.typenames.split(',').includes('4')" label="公文函件" value="4"></el-option>
                        <el-option  v-if="inputForm.appInputmode==='2'&&(this.typenames.split(',').includes('3')||this.typenames.split(',').includes('4'))" label="其他" value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="!((inputForm.appInputtype==='3'||inputForm.appInputtype==='1'))">
                  <el-form-item label="文件类型" prop="filetype">
                    <el-input :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.filetype" maxlength="20" placeholder="请输入文件类型，最长为20字符"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                 <el-col :span="24"  v-if="(inputForm.appInputtype==='3'||inputForm.appInputtype==='1')">
                  <el-form-item label="文件类型" prop="filetype">
                     <el-select clearable style="width:100%" :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.filetype" placeholder="请选择"   @change="chooseFile" >
                      <el-option  label="协查" value="协查"></el-option>
                      <el-option  label="通报" value="通报"></el-option>
                     </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="信息来源" prop="inforsource" >
                    <el-input :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.inforsource" maxlength="20" placeholder="请输入信息来源，最长为20字符"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="12" style="border-right:none">
                  <el-form-item label="申请人">
                    <el-input disabled v-model="this.name" maxlength="20" placeholder="请输入申请人，最长为20字符"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="申请处室" prop="applyOffice" :rules="[{validator: isValidInput, trigger: 'blur'}]">
                    <el-input :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.applyOffice" maxlength="20" placeholder="请输入申请处室，最长为20字符"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" style="border-right:none">
                  <el-form-item label="申请时间" prop="">
                    <el-date-picker style="max-width:100%;min-width:100%;" :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.applyTime" type="date" :picker-options="pickerOptions" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="录入时间" prop="inputTime">
                    <el-date-picker style="max-width:100%;min-width:100%;" :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.inputTime" type="date" :picker-options="pickerOptions" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col   :span="24" >
                  <el-form-item label="录入内容" prop="inputContent">
                    <el-input type="textarea" :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.inputContent" maxlength="200" placeholder="请输入录入内容，最长为200字符"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="内容描述" prop="contentDesc">
                    <el-input type="textarea" :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.contentDesc" maxlength="200" placeholder="请输入内容描述，最长为200字符"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注" prop="remark" >
                    <el-input type="textarea" :disabled="this.$route.query.pageFlag === 'look'" v-model="inputForm.remark" maxlength="200" placeholder="请输入备注，最长为200字符"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="处领导审批" prop="chuApproval" :rules="[{validator: isValidInput, trigger: 'blur'}]">
                    <el-input disabled v-model="inputForm.chuApproval" maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="中心领导审批" prop="centreApproval" :rules="[{validator: isValidInput, trigger: 'blur'}]">
                    <el-input disabled v-model="inputForm.centreApproval"  maxlength="500"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- end -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label="附件" prop="">
                    <el-upload  :disabled="this.$route.query.pageFlag === 'look'||fileList.length>0" v-if="this.$route.query.pageFlag !== 'look'" class="upload-demo" :auto-upload="false" ref="refUpload" :action="actionUrl" :on-change="changeUpload" :before-upload="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" >
                      <el-button size="small" type="primary" :disabled="this.$route.query.pageFlag === 'look'||fileList.length>0">选择文件</el-button>
                    </el-upload>

                    <div v-if="this.$route.query.pageFlag === 'new'||this.$route.query.pageFlag === 'edit'">
                      <div v-for="(item,idx) in fileList" :key="idx"  >
                        <el-button type="text" style="float:left;line-height:15px;padding-top:7px;margin-left:15px">{{item.attachName}}
                          <!-- <span class="el-icon-close" v-if="!bld" @click="DelDownload(item.attachId)"></span>
                          <span style="margin-left:20px" class="el-icon-download"  @click="hanldDownload(item.attachId)"></span> -->
                        </el-button>
          
                        <el-button icon="el-icon-close" style="float:left;margin-right:30px;line-height:24px;" type="text" v-if="bld" @click="DelDownload(item.attachId)"></el-button>
                        <el-button icon="el-icon-download" style="float:left;margin-right:100px;line-height:24px;" type="text" @click="hanldDownload(item.attachId)"></el-button>
                        <div style="clear:both"></div>
                      </div>
                    </div>
                    <div v-else>
                      <div v-if=" this.fileList.length>0">
                        <div v-for="(item,idx) in fileList" :key="idx" style="display: inline-block;float: left;">
                          <el-button type="text" style="float:left;line-height:15px;padding-top:7px">
                            {{item.attachName}}
                            <!-- <span class="el-icon-close" v-if="!bld" @click="DelDownload(item.attachId)"></span>
                            <span class="el-icon-download" style="margin-right:30px" @click="hanldDownload(item.attachId)"></span> -->
                          </el-button>
                          <el-button icon='el-icon-delete' style="float:right;margin-right:200px;line-height:24px;" type="text" v-if="!bld" @click="DelDownload(item.attachId)">删除</el-button>
                          <el-button icon="el-icon-download" style="float:right;margin-right:100px;line-height:24px;" type="text" @click="hanldDownload(item.attachId)">点击下载</el-button>
                          <div style="clear:both"></div>
                        </div>
                      </div>
                      <div v-else>无</div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div ref="myPrintForm" v-show="printType">
              <h3 style="margin: 10px auto;text-align: center;">录入数据审批单</h3>
              <table border="1" style="border-collapse: collapse;text-align: center;margin: 0 auto;">
                <tr>
                  <td width="120" height="70;" align="center">录入方式</td>
                  <td width="300" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;">
                    <div v-if="inputForm.appInputmode !== ''">
                      {{inputForm.appInputmode==='1'?'手工录入':'介质传输'}}
                    </div>
                    <div v-else></div>
                  </td>
                  <td width="120" height="70;" align="center">录入类型</td>
                  <td width="300" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;">
                    <div v-if="inputForm.appInputtype !== ''">
                      {{NewappInputtype}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">文件类型</td>
                  <td height="70" colspan="12" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">
                    <div v-if="inputForm.filetype !== ''">
                      {{inputForm.filetype}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">信息来源</td>
                  <td height="70" colspan="12" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">
                    <div v-if="inputForm.inforsource !== ''">
                      {{inputForm.inforsource}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">申请人</td>
                  <td width="300" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;">
                    <div v-if="this.name !== ''">
                      {{this.name}}
                    </div>
                    <div v-else></div>
                  </td>
                  <td width="120" height="70;" align="center">申请处室</td>
                  <td width="300" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;">
                    <div v-if="inputForm.applyOffice !== ''">
                      {{inputForm.applyOffice}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">申请时间</td>
                  <td width="300" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;">
                    <div v-if="inputForm.applyTime !== ''">
                      {{inputForm.applyTime}}
                    </div>
                    <div v-else></div>
                  </td>
                  <td width="120" height="70;" align="center">录入时间</td>
                  <td width="300" colspan="6" style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;">
                    <div v-if="inputForm.inputTime !== ''">
                      {{inputForm.inputTime}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">录入内容</td>
                  <td height="100" colspan="12" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">
                    <div v-if="inputForm.inputContent !== ''">
                      {{inputForm.inputContent}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">内容描述</td>
                  <td height="70" colspan="12" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">
                    <div v-if="inputForm.contentDesc !== ''">
                      {{inputForm.contentDesc}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">备注</td>
                  <td height="70" colspan="12" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">
                    <div v-if="inputForm.remark !== ''">
                      {{inputForm.remark}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">处领导审批</td>
                  <td height="70" colspan="12" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">
                    <div v-if="inputForm.chuApproval !== ''">
                      {{inputForm.chuApproval}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr>
                  <td width="120" height="70;" align="center">中心领导审批</td>
                  <td height="70" colspan="12" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">
                    <div v-if="inputForm.centreApproval !== ''">
                      {{inputForm.centreApproval}}
                    </div>
                    <div v-else></div>
                  </td>
                </tr>
                <tr v-if=" this.$route.query.pageFlag !== 'new'">
                  <td width="120" height="70;" align="center">附件</td>
                  <td height="70" colspan="12" style="textAlign:left;text-indent: 10px;border-right-color:#303133;">
                    <div v-if="fileList.length>0">
                      <div v-for="(item,idx) in fileList" :key="idx">
                        {{item.attachName}}
                      </div>
                    </div>
                    <div v-else>无</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="办理信息" v-if="false" name="second">

          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="actName" label="节点名称"></el-table-column>
            <el-table-column prop="approverName" label="执行用户"></el-table-column>
            <el-table-column prop="opinion" label="办理意见"></el-table-column>
            <el-table-column prop="time" label="办理时间"></el-table-column>
          </el-table>
          <div class="handeltitle">流程监控图：</div>
          <el-steps :active="stepActive" align-center>
            <el-step v-for="(item,idx) in tableFlow" :title="item" :key="idx" description=""></el-step>
            <el-step v-if="endFlag === '流程结束，拒绝' || endFlag === '流程结束，同意录入'" title="结束" description=""></el-step>
          </el-steps>
        </el-tab-pane>
      </el-tabs>

    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { noSpaceAndTs, commonPattern } from '@/utils/formValidate.js'
import {
  sendSaveapi,
  sendSubmitapi,
  getviewapi,
  getfileListapi,
  getcircuitapi,
  delloadapi,
  ChooseType
} from '@/api/sys-monitoringAnalysis/cueManage/dataEntry/add.js'
import { getUUIDTo } from '@/utils/index.js'
export default {
  name: 'approvalOrder',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      typenames: '',
      bld: false,
      enclosure: '',
      filelength: 0,
      fileNum: 0,
      fileTypes: '',
      subLoading: false,
      printFlag: true, // 打印标记
      printType: false,
      fileList: [],
      activeName: 'first',
      UUID: '',
      type: '',
      inputForm: {
        appInputtype: '',
        appInputmode: '',
        filetype: '',
        inforsource: '',

        applyOffice: '',
        applyTime: '',
        inputTime: '',
        inputContent: '',
        accessory: '',
        contentDesc: '',
        remark: '',
        chuApproval: '',
        inputStuts: '',
        centreApproval: ''
      },
      // 办理信息
      stepActive: null, // 办理信息 进度
      endFlag: '', // 结束标记
      tableData: [],
      tableFlow: ['录入审核单'],
      options: [
        {
          value: '1',
          label: '国际协查文件管理'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        },
        {
          value: '4',
          label: '公文函件 '
        },
        {
          value: '5',
          label: '其他'
        }
      ],
      optionsmode: [
        {
          value: '1',
          label: '手工录入'
        },
        {
          value: '2',
          label: '介质传输'
        }
      ],
      // rules
      inputFormRules: {
        appInputtype: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        appInputmode: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        filetype: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        inforsource: [
          // { validator: noSpaceAndTs, trigger: 'blur' },
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],

        applyOffice: [
          { validator: noSpaceAndTs, trigger: 'blur' }
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        inputTime: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        inputContent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
          // { validator: noSpaceAndTs, trigger: 'blur' },
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        accessory: [
          { validator: noSpaceAndTs, trigger: 'blur' }
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        contentDesc: [
          // { validator: noSpaceAndTs, trigger: 'blur' },
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        remark: [
          // { validator: noSpaceAndTs, trigger: 'blur' },
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        chuApproval: [
          { validator: noSpaceAndTs, trigger: 'blur' }
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        centreApproval: [
          { validator: noSpaceAndTs, trigger: 'blur' }
          // { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'name']),
    actionUrl() {
      return `/monitor/inputafter/upload-allAfterInput?aId=${
        this.$route.query.pageFlag !== 'new' ? this.$route.query.aId : this.UUID
      }&fileType=0`
    },
    inputForms() {
      const obj = Object.assign({}, this.inputForm)
      obj.proposer = this.name
      return obj
    },
    NewappInputtype() {
      switch (this.inputForm.appInputtype) {
        case '1':
          this.type = '国际协查文件管理'
          break

        case '2':
          this.type = '国际协查文件管理'
          break
        case '3':
          this.type = '境内协查类文件管理'
          break
        case '4':
          this.type = '公文函件 '
          break
        case '5':
          this.type = '其他'
          break
      }
      return this.type
    }
  },
  mounted() {
    ChooseType().then(res => {
      if (res.code === 200) {
        this.typenames = res.data
        if (!this.typenames) {
          this.$message({
            message: '您没有录入该文件类型的权限！',
            type: 'error',
            duration: 6000
          })
        }
      }
    })
    this.bld = this.$route.query.pageFlag === 'look' || this.$route.query.pageFlag === undefined
    this.UUID = getUUIDTo()
    this.getData()
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    }
  },
  methods: {
    // 关闭
    handleClose() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.sjifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },

    // 打印
    handlePrint() {
      // this.printFlag = false
      // this.$nextTick(function() {
      //   var newHtml = document.getElementsByClassName('el-tabs__content')[0].innerHTML
      //   document.body.innerHTML = newHtml
      //   window.print()
      //   window.location.reload()
      // })
      if (this.$route.query.pageFlag === 'new') {
        sessionStorage.setItem('luru', JSON.stringify(this.inputForm))
      }
      this.printType = true
      document.body.innerHTML = this.$refs.myPrintForm.innerHTML
      window.print()
      window.location.reload()
    },

    // 下载附件
    hanldDownload(id) {
      location.href = `/file-service/upload/download/${id}?moduleName=${encodeURI('线索管理')}`
    },
    //  删除附件
    DelDownload(id) {
      delloadapi(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 6000
          })
        }
      }).then(() => {
        this.fileList.filter((item, index) => {
          if (item.attachId.indexOf(id) !== -1) {
            this.fileList.splice(index, 1)
          }
        })
      })
    },
    // tabs
    handleClick(tab, event) {
      if (tab.name === 'second' && this.$route.query.pageFlag !== 'new') {
        // 获取流程信息
        getcircuitapi(this.$route.query.aId).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.result
            this.tableFlow = res.data.status

            this.tableFlow.unshift('录入审核单')
            if (
              res.data.inputStatus === '流程结束，拒绝' ||
              res.data.inputStatus === '流程结束，同意录入'
            ) {
              this.stepActive = this.tableFlow.length + 1
            } else {
              this.stepActive = this.tableFlow.length - 1
            }
            this.endFlag = res.data.inputStatus
          }
        })
      }
    },

    // 录入方式
    modeTadiaChange(val) {
      const internRadiosMo = [
        {
          value: '1',
          label: '国际协查文件管理'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        },
        {
          value: '4',
          label: '公文函件 '
        },
        {
          value: '5',
          label: '其他'
        }

      ]
      const handRadios = [
        {
          value: '1',
          label: '国际协查文件管理'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        }
      ]
      if (val === '2') {
        this.options = internRadiosMo
      } else {
        this.options = handRadios
      }
      this.inputForm.appInputtype = ''
      // setTimeout(() => {
      //   this.$refs.refForm.clearValidate()
      // }, 10)
    },

    // 获取数据
    getData() {
      if (this.$route.query.id) {
        this.$route.query.pageFlag = 'look'
        this.$route.query.aId = this.$route.query.id
      }

      if (this.$route.query.pageFlag !== 'new') {
        getviewapi(this.$route.query.aId).then(res => {
          this.inputForm = res.data
        })
        getfileListapi(this.$route.query.aId).then(res => {
          if (res.code === 200) {
            this.fileList = res.data
          }
        })
      } else {
        if (sessionStorage.getItem('luru') && this.$route.query.pageFlag === 'new') {
          const searchData = JSON.parse(sessionStorage.getItem('luru'))
          this.inputForm = searchData
          setTimeout(() => {
            sessionStorage.removeItem('luru')
          }, 5000)
        }
      }
    },

    // 保存参数

    //   保存
    handleSave() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.subLoading = true
          if (this.enclosure !== '') {
            this.fileTypes = 'baocun'
            this.$refs.refUpload.submit()
          } else {
            this.baoParamter()
          }
        }
      })
    },
    clearTypes() {
      if (this.inputForm.appInputtype === '3' && this.inputForm.appInputmode === '1') {
        if (this.inputForm.filetype !== '') {
          this.inputForm.filetype = []
          setTimeout(() => {
            this.$refs.refForm.validateField('filetype')
          }, 10)
        }
      } else {
        this.inputForm.filetype = ''
      }
    },
    chooseFile() {
      setTimeout(() => {
        this.$refs.refForm.validateField('filetype')
      }, 10)
    },
    baoParamter() {
      var paramsObj = {
        ApprovalData: this.inputForms, // 数据录入审批单
        aId: this.UUID
      }
      if (this.$route.query.pageFlag === 'edit') {
        paramsObj.aId = this.$route.query.aId
      }
      sendSaveapi(paramsObj).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 6000
          })
          this.$router.go(-1)
        } else {
          this.subLoading = false
        }
      }).catch(() => {
        this.subLoading = false
      })
    },

    // 提交
    handleSubmit() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('workFlow', { configCode: 'inputafter' }) // 工作流 名字
          this.$store.dispatch('openWorkFlow', true)
        }
      })
    },
    // 提交 - 走流程
    nextStep() {
      this.subLoading = true
      if (this.enclosure !== '') {
        this.fileTypes = 'tijiao'
        this.$refs.refUpload.submit()
      } else {
        this.realSub()
      }
    },
    realSub() {
      var paramsObj = {
        ApprovalData: this.inputForms, // 数据录入审批单
        workflow: this.workFlow2business,
        aId: this.UUID
      }
      if (this.$route.query.pageFlag === 'edit') {
        paramsObj.aId = this.$route.query.aId
      }
      sendSubmitapi(paramsObj).then(res => {
        if (res.code === 200) {
          this.$router.go(-1)
          this.subLoading = false
          this.$message({
            message: '提交成功',
            type: 'success',
            duration: 6000
          })
        } else {
          this.subLoading = false
        }
      }).catch(() => {
        this.subLoading = false
      })
    },
    // input校验
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 文件
    handlePreview(file, fileList) { },
    handleRemove(file, fileList) { },
    changeUpload(file, fileList) {
      if (file.status === 'ready') {
        const fileArr = []
        fileList.forEach(el => {
          fileArr.push(el.name)
        })
        fileArr.pop()
        if (fileArr.indexOf(file.name) === -1) {
        // console.log(a);
        } else {
          this.$message({
            message: '上传文件名不能相同',
            type: 'warning',
            duration: 6000
          })
          fileList.pop()
        }
        if (fileList.length > 1) {
          var step = 0
          for (let i = 0; i < fileList.length; i++) {
            step++
            fileList.pop()
          }
          if (step === fileList.length) {
            this.$message({
              message: '最多只可以上传一个附件',
              type: 'warning',
              duration: 6000
            })
          }
        }
        const isLt2k = file.size / 1024 / 1024 > 500
        if (isLt2k) {
          this.$message({
            message: '上传文件大小不能超过500M!',
            type: 'warning',
            duration: 6000
          })
          fileList.pop()
        } else {
          this.filelength = fileList.length
          this.enclosure = file
        }
      }
    },
    handleSuccess(file, fileList) {
      this.fileNum++
      if (this.fileNum === this.filelength && this.fileTypes !== 'baocun') {
        this.realSub()
      } else if (this.fileNum === this.filelength && this.fileTypes === 'baocun') {
        this.baoParamter()
      }
    },
    handleError(file, fileList) { }
  }
}
</script>

<style lang="scss">
.apporderwrap {
  .el-col {
    padding-bottom: 0px;
  }
  .styleFist {
    .el-col {
      border: 1px solid #727475;
      border-bottom: 10px;
    }
    .el-row:last-of-type .el-col {
      border: 1px solid #727475;
    }
    .el-form-item {
      margin-bottom: 0px;
      //   padding: 5px;
    }
    .el-form-item__label {
      padding: 12px;
      border-right: 1px solid #727475;
      //   background: #ebeff1;
    }
    .el-form-item__content {
      padding: 12px;
      padding-bottom: 0;
    }
    .el-form-item__content::before {
      //   border: 1px solid #303133;
      content: '';
    }
  }
  .el-textarea__inner{
        margin-top: -8px;

  }
  .el-upload {
    float: left;
  }
  .el-upload-list {
    float: left;
  }
  .el-upload-list__item {
    float: left;
    width: 200px;
  }
     .el-form-item__error{
         z-index: 1;
    }
}
</style>
