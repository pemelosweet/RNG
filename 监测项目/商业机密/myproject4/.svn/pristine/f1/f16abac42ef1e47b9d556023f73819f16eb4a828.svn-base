<template>
  <div class="dataCycle_add">
    <el-card>
      <div slot="header">
        <a @click="routerBack" class="back" :style="backImg"></a>
        <span>数据申请单</span>
        <!-- <span>{{$route.query.title}}</span> -->
      </div>
      <div style="marginBottom:18px">
        <el-row>
          <el-col :span="24" v-if="this.$route.query.sign==='new'||this.$route.query.sign==='modify'">
            <span style="marginRight:20px">流程操作：</span>
            <el-button  type="primary" plain :loading="loading" v-if="this.$route.query.sign === 'modify'" @click="updataFun" > 保 存</el-button>
            <el-button type="primary" plain :loading="loading" v-if="this.$route.query.sign === 'new'" @click="submit">保 存</el-button>
            <!-- <el-button  @click="handlePrint">打 印</el-button> -->
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="迁移条件" name="first">
            <el-form :model="myform" ref="forms" label-width="140px" :rules="fristRules" :disabled="disabled" style="height: 380px">

              <div class="popup" v-if="this.$route.query.sign !== 'details'">
                <div class="onFired">
                  <p><b>{{this.initialMode.migrationMode}}</b></p>
                  <p><b>{{this.initialMode.migrationName}}</b>: <span style="font-size:14px">{{this.initialMode.migrationStartTime}} ~ {{this.initialMode.migrationStopTime}}</span></p>
                </div>
                <div class="posecond" v-if='myform.migrationMode&&this.bs' style="padding-left:10px">
                  <p><b>近线</b></p>
                  <p>
                    <b>{{this.jxTemporary.migrationName}}:</b>
                    <span style="font-size:14px" v-if=' this.jxTemporary.migrationStopTime&&  this.jxTemporary.migrationStartTime'>{{ this.jxTemporary.migrationStartTime}} ~ {{ this.jxTemporary.migrationStopTime}}</span>
                    <span style="font-size:14px" v-else>无</span>
                  </p>
                  <p><b>离线</b></p>
                  <!-- <b v-if="flag&&myform.migrationMode=='离线临时区'"><b>临时区</b></p> -->
                  <p>
                    <b>{{this.temporaryArea.migrationName}}:</b>
                    <span style="font-size:14px" v-if='this.temporaryArea.migrationStopTime&& this.temporaryArea.migrationStartTime'>{{this.temporaryArea.migrationStartTime}} ~ {{this.temporaryArea.migrationStopTime}}</span>
                    <span style="font-size:14px" v-else>无</span>
                  </p>

                </div>
              </div>
              <el-row>
                <el-col :span="15">
                  <el-form-item label=" 选择数据表：" prop="migrationTableName">
                    <!-- <el-checkbox-group v-model="myform.migrationTableName" @change="enentDaguer">

                      <el-checkbox v-for="(item, index) in data" :value='item.label' :label="item.label" :key="index">{{item.label}}</el-checkbox>
                    </el-checkbox-group> -->
                    <el-radio-group v-model="myform.migrationTableName" @change="enentDaguer">
                      <el-radio v-for="(item, index) in data" :value='item.label' :label="item.label" :key="index">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="迁移方式：" prop="migrationMode">
                    <el-radio-group v-model="myform.migrationMode" @change="lineStatus">
                      <el-radio v-if="flag" :disabled="onToLine" :label="'在线近线'">在线->近线</el-radio>
                      <el-radio v-if="flag" :disabled="nearToLine" :label="'近线离线'">近线->离线</el-radio>
                      <el-radio v-if="flag2" :disabled="!bsDisable" :label="'离线临时区'">离线->临时区</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-row :span="14">
                    <el-col :span="10">
                      <el-form-item label="迁移申请时间：" prop="transferStartTime">
                        <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="myform.transferTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions0">
                        </el-date-picker> -->
                          <el-date-picker disabled v-model="myform.transferStartTime" value-format="yyyy-MM-dd" type="date" placeholder="选择开始日期"></el-date-picker>
                      </el-form-item>
                      <!-- <span style="text-align: center;width: 100%;display: inline-block"> 至 </span> -->
                    </el-col>
                    <el-col :span="2">
                      <span style="text-align: center;width: 100%;padding-left:15px;display: inline-block"> ~</span>
                    </el-col>
                    <el-col :span="9">
                      <!-- <span style="margin:0px 5px;text-align:center;display:inline-block;width:50px;padding-top:5px">至</span> -->
                      <el-form-item label-width="0" prop="transferEndTime">
                          <el-date-picker :disabled="this.power===2 && this.temporaryArea.migrationStopTime=== null&& this.temporaryArea.migrationStartTime=== null" v-model="myform.transferEndTime" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-if="this.qzsxElPick" :picker-options="pickerOptions0"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
                <el-row v-if="this.myform.migrationMode === '离线临时区' || this.power === 2">
                  <el-col :span="10">
                    <el-form-item label="临时区时效时间：" prop="timeliness">
                        <el-date-picker :disabled="this.power === 2 && this.temporaryArea.migrationStopTime === null&& this.temporaryArea.migrationStartTime=== null" v-model="myform.timeliness" value-format="yyyy-MM-dd" start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期" type="daterange" :picker-options="pickerOptions1"></el-date-picker>
                    </el-form-item>
                  </el-col>
              </el-row>

              <!-- <el-row>
                <el-form-item
                  label="选择数据表："
                  prop="migrationTableName"
                >
                  <el-transfer
                    @change="lineStatus"
                    v-model="myform.migrationTableName"
                    :data="data"
                    :titles="['待选列表', '已选列表']"
                    :button-texts="['加入左侧', '加入右侧']"
                  ></el-transfer>
                </el-form-item>
              </el-row>-->
            </el-form>

          </el-tab-pane>
          <el-tab-pane label="处置单" name="second">
            <el-form :model="form" ref="form" class="table processTable" id="processTable" :disabled="disabled">

              <el-row :gutter="20">
                <el-col :span="8" :offset="2">
                  <el-form-item label="密级：" label-width="130px">
                    <el-select clearable v-model="form.secLevel" v-if="printFlag">
                      <el-option value="机密" label="机密"></el-option>
                      <el-option value="秘密" label="秘密"></el-option>
                      <el-option value="内部" label="内部"></el-option>
                    </el-select>
                    <div v-if="!printFlag">
                      <span>{{form.secLevel | filterSecret}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="缓急：" label-width="130px">
                    <el-select clearable v-model="form.urgencyLevel" v-if="printFlag">
                      <el-option value="紧急" label="紧急"></el-option>
                      <el-option value="一般" label="一般"></el-option>
                    </el-select>
                    <div v-if="!printFlag">
                      <span>{{form.urgencyLevel | filterDegreeOfUrgency}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- startprint -->
              <el-row>
                <p>反洗钱中心文件处理单</p>
                <table border="1" style="border-collapse: collapse;" class="deletInputBorder">
                  <tr>
                    <td width="200" height="70;" align="center">主办处室</td>
                    <td width="200" colspan="2">
                      <el-form-item prop="mainDepart" :rules="[ { validator: isValidInput, trigger: 'blur' },]">
                        <el-input v-if="printFlag" v-model="form.mainDepart" type="textarea" maxlength="50" placeholder="请输入,最长50字符"></el-input>
                        <el-input v-if="!printFlag" v-text="form.mainDepart" maxlength="50" placeholder="请输入,最长50字符"></el-input>
                      </el-form-item>
                    </td>
                    <td width="200" colspan="2" align="center">经办人及电话</td>
                    <td width="200" colspan="2">
                      <el-form-item prop="conductPeoPhone" :rules="[ { validator: isValidInput, trigger: 'blur' },]">
                        <el-input v-if="printFlag" v-model="form.conductPeoPhone" type="textarea" maxlength="20" placeholder="请输入,最长20字符"></el-input>
                        <el-input v-if="!printFlag" v-text="form.conductPeoPhone" type="textarea" maxlength="20" placeholder="请输入,最长20字符"></el-input>
                      </el-form-item>

                    </td>
                  </tr>
                  <tr>
                    <td height="200" colspan="6">
                      <!-- <el-form-item prop="applyContent" :rules="[ { validator: isValidInput, trigger: 'blur' },]"> -->
                      <el-form-item prop="applyContent">
                        <el-input v-if="printFlag" v-model="form.applyContent" type="textarea" maxlength="100" placeholder="请输入xxx的提示,最长100字符"></el-input>
                        <el-input v-if="!printFlag" v-text="form.applyContent" type="textarea" maxlength="100" placeholder="请输入xxx的提示,最长100字符"></el-input>
                      </el-form-item>

                    </td>
                  </tr>
                  <tr>
                    <td height="200" align="center">行领导批示</td>
                    <td colspan="6">
                      <!-- <el-form-item prop="leaderOpinion" :rules="[ { validator: isValidInput, trigger: 'blur' },]"> -->
                      <el-form-item prop="leaderOpinion">
                        <el-input v-if="printFlag" disabled v-model="form.leaderOpinion" type="textarea" maxlength="100" placeholder="请输入行领导批示,最长100字符"></el-input>
                        <el-input disabled v-if="!printFlag" v-text="form.leaderOpinion" type="textarea" maxlength="100" placeholder="请输入行领导批示,最长100字符"></el-input>
                      </el-form-item>

                    </td>
                  </tr>
                  <tr>
                    <td height="200" align="center">中心领导意见</td>
                    <td colspan="6">
                      <el-form-item prop="centerOpinion" :rules="[ { validator: isValidInput, trigger: 'blur' },]">
                        <el-input disabled v-if="printFlag" v-model="form.centerOpinion" type="textarea" maxlength="100" placeholder="请输入中心领导意见,最长100字符"></el-input>
                        <el-input disabled v-if="!printFlag" v-text="form.centerOpinion" type="textarea" maxlength="100" placeholder="请输入中心领导意见,最长100字符"></el-input>
                      </el-form-item>

                    </td>
                  </tr>
                  <tr>
                    <td width="200" height="200" align="center">内部意见</td>
                    <td width="200" colspan="2">
                      <el-form-item prop="privateOpinion" :rules="[ { validator: isValidInput, trigger: 'blur' },]">
                        <el-input disabled v-if="printFlag" v-model="form.privateOpinion" type="textarea" maxlength="100" placeholder="请输入内部意见,最长100字符"></el-input>
                        <el-input disabled v-if="!printFlag" v-text="form.privateOpinion" type="textarea" maxlength="100" placeholder="请输入内部意见,最长100字符"></el-input>
                      </el-form-item>

                    </td>
                    <td width="200" colspan="2" align="center">会签意见</td>
                    <td width="200" colspan="2">
                      <el-form-item prop="signOpinion" :rules="[ { validator: isValidInput, trigger: 'blur' },]">
                        <el-input disabled v-if="printFlag" v-model="form.signOpinion" type="textarea" maxlength="100" placeholder="请输入会签意见,最长100字符"></el-input>
                        <el-input disabled v-if="!printFlag" v-text="form.signOpinion" type="textarea" maxlength="100" placeholder="请输入会签意见,最长100字符"></el-input>
                      </el-form-item>

                    </td>
                  </tr>
                </table>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
import { commonPattern } from '@/utils/formValidate'
import {
  Authority,
  AddList,
  upDataList,
  getInfo,
  onlineNearLine,
  tableNameOnline
} from '@/api/sys-monitoringAnalysis/dataCycle/add'
export default {
  data() {
    return {
      data: [
        { label: '银行业大额交易', key: '银行业大额交易', enMigrationTableName: 'T_BH_TRADE' },
        { label: '银行业可疑交易', key: '银行业可疑交易', enMigrationTableName: 'T_BS_TRADE' },
        { label: '银行业可疑报告', key: '银行业可疑报告', enMigrationTableName: 'T_BS_XML' }
      ],
      bs: false, //  新增的时候才显示框
      DataId: '',
      processId: '',
      loading: false,
      power: '', // 后台返回的权限
      flag: true, // 迁移方式控制参数1(迁移员)
      flag2: true, // 迁移方式控制参数2（分析员）
      disabled: true,
      qzsxElPick: true,
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      myform: {
        // transferTime: [],
        transferStartTime: '',
        transferEndTime: '',
        timeliness: [],
        migrationMode: '在线近线',
        migrationTableName: '银行业大额交易'
      },
      fristRules: {
        transferStartTime: [{ trigger: 'blur', required: true, message: '请选择迁移申请时间' }],
        transferEndTime: [{ trigger: 'blur', message: '请选择迁移申请结束时间' }],
        timeliness: [{ trigger: 'change', required: true, message: '请选择迁移申请时间' }],
        migrationMode: [{ trigger: 'change', required: true, message: '请选择迁移方式' }],
        migrationTableName: [{ trigger: 'change', required: true, message: '请选择数据表' }]
      },
      modeList: {},
      typeList1: [],
      typeList2: [],
      typeList3: [],
      printFlag: true,
      activeName: 'first',
      form: {
        secLevel: '',
        urgencyLevel: '',
        mainDepart: '',
        conductPeoPhone: '',
        applyContent: '',
        leaderOpinion: '',
        centerOpinion: '',
        privateOpinion: '',
        signOpinion: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 获取在线数据的变量
      initialMode: {},
      // 获取近线数据的变量
      jxTemporary: {},
      // 获取离线数据的变量
      temporaryArea: {},
      pickerOptions0: {},

      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      onToLine: false,
      nearToLine: false,
      leaveToLine: false,
      onLerderOne: '',
      onLerderTwo: '',
      bsDisable: false,
      updataTimeOne: '',
      updataTimeTwo: '',

      allInfoDataBoth: {},
      nmb: true,
      frist: false
    }
  },
  computed: {
    authority() {
      return this.power
    }
  },
  watch: {
    authority(val) {
      switch (val) {
        case 1: // 迁移
          this.flag = true
          this.flag2 = false
          break
        case 2: // 分析
          this.flag = false
          this.flag2 = true
          break
        case 4: // 迁移分析员
          this.flag = true
          this.flag2 = true
          break
      }
    }
  },
  mounted() {
    console.log(this.$route)
    this.activeName = 'first'
    this.frist = true
    // 获取权限
    Authority().then(res => {
      if (res.code === 200) {
        switch (res.data) {
          case 1: // 迁移
            this.flag = true
            this.flag2 = false
            break
          case 2: // 分析
            this.flag = false
            this.flag2 = true
            this.myform.migrationMode = '离线临时区'
            break
          case 4: // 迁移分析员
            this.flag = true
            this.flag2 = true
            break
        }
        this.power = res.data
      }
    })

    if (this.$route.query.sign === 'new') { // 新建
      this.disabled = false
      this.bs = true
      this.jurisdiction()
      // this.enentDaguer('银行业大额交易')
    } else if (this.$route.query.sign === 'modify') { // 修改
      this.disabled = false
      this.bs = true
      this.DataId = this.$route.query.id
      this.jurisdiction()
    } else if (this.$route.query.sign === 'details') { // 查看
      this.DataId = this.$route.query.id
      this.disabled = true
      this.dataInfo()
    }
  },
  methods: {
    // 获取 在线进线离线数据 --------一直保持查询有无创建过
    jurisdiction() {
      const marginMode = '在线,近线,离线'
      if (this.$route.query.sign === 'modify' && this.frist) {
        getInfo(this.DataId).then(res => {
          if (res.code === 200) {
            this.myform.migrationTableName = res.data.dataLifeCycle.migrationTableName
            const abbsp = this.myform.migrationTableName
            this.watieJurisdic(marginMode, abbsp)
            this.frist = false
          }
        })
      } else {
        const abbsp = this.myform.migrationTableName
        this.watieJurisdic(marginMode, abbsp)
      }
    },
    watieJurisdic(marginMode, abbsp) {
      tableNameOnline(encodeURI(marginMode), encodeURI(abbsp)).then(res => {
        if (res.code === 200) {
          this.initialMode = res.data[0] // 在线
          if (res.data[1].migrationStartTime === null) {
            this.bsDisable = false
            this.jxTemporary = res.data[1]
            if (this.$route.query.sign === 'modify') {
              this.nearToLine = true
            }
          } else {
            this.bsDisable = true
            this.jxTemporary = res.data[1] // 进线
          }
          if (res.data[2].migrationStartTime === null) {
            this.bsDisable = false
            this.temporaryArea = res.data[2]
          } else {
            this.bsDisable = true
            this.temporaryArea = res.data[2] // 离线
          }
          if (this.$route.query.sign === 'modify' && this.nmb) {
            this.dataInfo()
          } else {
            this.lineStatus()
            this.nmb = true
          }
        }
      })
    },
    // 在线接口
    // 选取表名change事件
    enentDaguer(val) {
      this.nmb = false
      if (this.power === 2) {
        this.myform.migrationMode = '离线临时区'
      } else {
        this.myform.migrationMode = '在线近线'
      }
      if (this.$route.query.sign === 'modify') {
        this.myform.transferEndTime = ''
      }
      this.jurisdiction()
    },
    // 改变迁移方式时
    lineStatus(val) {
      // this.enentDaguer()
      var mode = this.myform.migrationMode
      var types = this.myform.migrationTableName
      this.myform.transferEndTime = ''
      // var types = this.myform.migrationTableName[0]
      this.modeList = {}
      onlineNearLine(encodeURI(mode), encodeURI(types)).then(res => {
        if (res.code === 200) {
          if (res.data) {
            this.modeList = res.data
            if (res.data.migrationMode === '近线') {
              if (res.data.migrationStartTime && res.data.migrationStopTime) {
                // this.myform.transferStartTime = res.data.migrationStartTime
                // this.onLerderOne = res.data.migrationStartTime
                // this.onLerderTwo = res.data.migrationStopTime
                this.onToLine = false
                this.nearToLine = false
                this.leaveToLine = true
              } else {
                this.onToLine = false
                this.nearToLine = true
                this.leaveToLine = true
              }
              if (this.initialMode && this.$route.query.sign !== 'new') {
                this.myform.transferStartTime = this.initialMode.migrationStartTime
                // this.myform.transferEndTime = this.initialMode.migrationStopTime
              } else {
                this.myform.transferStartTime = this.initialMode.migrationStartTime
                this.myform.transferEndTime = ''
              }
              if (this.$route.query.sign === 'modify' && this.allInfoDataBoth.migrationTableName === this.myform.migrationTableName && this.allInfoDataBoth.migrationMode === this.myform.migrationMode) {
                this.myform.transferEndTime = this.allInfoDataBoth.transferStopTime
                // if (this.myform.transferEndTime !== this.allInfoDataBoth.transferStopTime) {
                //   this.myform.transferEndTime = this.myform.transferEndTime
                // } else {
                //   this.myform.transferEndTime = this.allInfoDataBoth.transferStopTime
                // }
              }
              this.qzsxElPick = false
              const a = new Date(this.initialMode.migrationStartTime).getTime()
              const b = new Date(this.initialMode.migrationStopTime).getTime()
              this.pickerOptions0.disabledDate = time => {
                return time.getTime() > b || time.getTime() < a - 8.64e7
              }
              setTimeout(() => {
                this.qzsxElPick = true
              }, 10)
            } else if (res.data.migrationMode === '离线') {
              if (this.$route.query.sign === 'modify' && this.allInfoDataBoth.migrationTableName === this.myform.migrationTableName && this.allInfoDataBoth.migrationMode === this.myform.migrationMode) {
                // if (this.myform.transferEndTime !== this.allInfoDataBoth.transferStopTime) {
                //   this.myform.transferEndTime = this.myform.transferEndTime
                // } else {
                this.myform.transferEndTime = this.allInfoDataBoth.transferStopTime
                // }
              }

              if (res.data.migrationStartTime && res.data.migrationStopTime) {
                // this.myform.transferStartTime = this.onLerderOne
                this.qzsxElPick = false
                this.onToLine = false
                this.nearToLine = false
                this.leaveToLine = false

                if (this.onLerderOne && this.onLerderTwo) {
                  this.myform.transferStartTime = this.onLerderOne
                  var a = new Date(this.onLerderOne).getTime()
                  const b = new Date(this.onLerderTwo).getTime()
                  this.pickerOptions0.disabledDate = time => {
                    return time.getTime() > b || time.getTime() < a - 8.64e7
                  }

                  setTimeout(() => {
                    this.qzsxElPick = true
                  }, 10)
                } else {
                  this.myform.transferStartTime = this.jxTemporary.migrationStartTime
                  const a = new Date(this.jxTemporary.migrationStartTime).getTime()
                  const b = new Date(this.jxTemporary.migrationStopTime).getTime()
                  this.pickerOptions0.disabledDate = time => {
                    return time.getTime() > b || time.getTime() < a - 8.64e7
                  }

                  setTimeout(() => {
                    this.qzsxElPick = true
                  }, 10)
                }
              } else {
                this.qzsxElPick = false

                if (this.onLerderOne && this.onLerderTwo) {
                  this.myform.transferStartTime = this.onLerderOne
                  const a = new Date(this.onLerderOne).getTime()
                  const b = new Date(this.onLerderTwo).getTime()
                  this.pickerOptions0.disabledDate = time => {
                    return time.getTime() > b || time.getTime() < a - 8.64e7
                  }
                  setTimeout(() => {
                    this.qzsxElPick = true
                  }, 10)
                } else {
                  this.myform.transferStartTime = this.jxTemporary.migrationStartTime
                  const a = new Date(this.jxTemporary.migrationStartTime).getTime()
                  const b = new Date(this.jxTemporary.migrationStopTime).getTime()
                  this.pickerOptions0.disabledDate = time => {
                    return time.getTime() > b || time.getTime() < a - 8.64e7
                  }
                  setTimeout(() => {
                    this.qzsxElPick = true
                  }, 10)
                }

                this.onToLine = false
                this.nearToLine = false
                this.leaveToLine = true
              }
            }
            // const a = new Date(res.data.migrationStartTime).getTime()
            // const b = new Date(res.data.migrationStopTime).getTime()
            // this.pickerOptions0.disabledDate = time => {
            //   return time.getTime() > b || time.getTime() < a - 8.64e7
            // }
          } else if (res.data === null) {
            this.myform.transferStartTime = this.temporaryArea.migrationStartTime
            this.qzsxElPick = false
            if (this.$route.query.sign === 'modify' && this.allInfoDataBoth.migrationTableName === this.myform.migrationTableName && this.allInfoDataBoth.migrationMode === this.myform.migrationMode) {
              this.myform.transferEndTime = this.allInfoDataBoth.transferStopTime
            }
            const a = new Date(this.temporaryArea.migrationStartTime).getTime()
            const b = new Date(this.temporaryArea.migrationStopTime).getTime()
            this.pickerOptions0.disabledDate = time => {
              return time.getTime() > b || time.getTime() < a - 8.64e7
            }
            if (val === this.allInfoDataBoth.migrationMode && this.$route.query.sign === 'modify') {
              this.myform.transferEndTime = this.allInfoDataBoth.transferStopTime
            }

            setTimeout(() => {
              this.qzsxElPick = true
            }, 10)
            this.onToLine = false
            this.nearToLine = false
            this.leaveToLine = false
          } else {
            this.modeList = null
          }
        }
      })
    },
    upDataEvent() {

    },
    // 查看修改回显数据
    dataInfo() {
      this.allInfoDataBoth = {}
      this.updataTimeOne = ''
      this.updataTimeTwo = ''
      getInfo(this.DataId).then(res => {
        if (res.code === 200) {
          // var arr = []
          if (res.data.dataLifeCycle) {
            this.allInfoDataBoth = res.data.dataLifeCycle

            this.myform.migrationTableName = res.data.dataLifeCycle.migrationTableName
            this.myform.migrationMode = res.data.dataLifeCycle.migrationMode
            this.myform.transferStartTime = res.data.dataLifeCycle.transferStartTime

            // this.myform.migrationMode = '在线近线'
            if (res.data.dataLifeCycle.migrationMode === '离线临时区') {
              this.myform.timeliness.push(res.data.dataLifeCycle.timeStartLiness, res.data.dataLifeCycle.timeliness)
            }
            // this.enentDaguer()
            if (this.$route.query.sign === 'modify') {
              if (res.data.dataLifeCycle.migrationMode === '在线近线') {
                this.updataTimeOne = this.initialMode.migrationStartTime
                this.updataTimeTwo = this.initialMode.migrationStopTime
                this.myform.transferStartTime = res.data.dataLifeCycle.transferStartTime
                this.myform.transferEndTime = res.data.dataLifeCycle.transferStopTime
              } else if (res.data.dataLifeCycle.migrationMode === '近线离线') {
                this.updataTimeOne = this.jxTemporary.migrationStartTime
                this.updataTimeTwo = this.jxTemporary.migrationStopTime
                this.myform.transferStartTime = res.data.dataLifeCycle.transferStartTime
                this.myform.transferEndTime = res.data.dataLifeCycle.transferStopTime
              } else {
                this.updataTimeOne = this.temporaryArea.migrationStartTime
                this.updataTimeTwo = this.temporaryArea.migrationStopTime
                this.myform.transferStartTime = res.data.dataLifeCycle.transferStartTime
                this.myform.transferEndTime = res.data.dataLifeCycle.transferStopTime
              }
              this.qzsxElPick = false
              var a = new Date(this.updataTimeOne).getTime()
              const b = new Date(this.updataTimeTwo).getTime()
              this.pickerOptions0.disabledDate = time => {
                return time.getTime() > b || time.getTime() < a - 8.64e7
              }

              setTimeout(() => {
                this.qzsxElPick = true
              }, 10)
              if (res.data.dataLifeCycle.migrationMode === '在线近线') {
                console.log(this.jxTemporary)
                this.modeList = this.jxTemporary
              } else if (res.data.dataLifeCycle.migrationMode === '近线离线') {
                console.log(this.temporaryArea)
                this.modeList = this.temporaryArea
              } else {
                this.modeList = {}
              }

              console.log(this.modeList)
            } else {
              this.myform.transferEndTime = res.data.dataLifeCycle.transferStopTime
            }
          }
          if (res.data.dataProcess) {
            this.form = res.data.dataProcess
            this.processId = res.data.dataProcess.processId
          }
        }
      })
    },
    // 提交
    submit() {
      if (this.power === 2 && this.temporaryArea.migrationStopTime === null && this.temporaryArea.migrationStartTime === null) {
        this.$message({
          message: '当前表暂无离线数据, 无法创建临时区数据！',
          type: 'warning',
          duration: 6000,
          showClose: true
        })
        return
      }
      this.$refs.forms.validate(valid => {
        if (valid) {
          if (this.myform.transferEndTime) {
            this.$refs.form.validate(valid => {
              if (valid) {
                this.loading = true
                var obj = {}
                obj.dataProcess = this.form
                var obj1 = {}
                obj1.migrationMode = this.myform.migrationMode
                if (this.power !== 1 && this.myform.migrationMode === '离线临时区') {
                  obj1.timeStartLiness = this.myform.timeliness[0]
                  obj1.timeliness = this.myform.timeliness[1]
                }
                // const arrDouBle = []
                // for (let index = 0; index < this.myform.migrationTableName.length; index++) {
                //   for (let ins = 0; ins < this.data.length; ins++) {
                //     if (this.data[ins].label === this.myform.migrationTableName[index]) {
                //       arrDouBle.push(this.data[ins].enMigrationTableName)
                //     }
                //   }
                // }
                for (let ins = 0; ins < this.data.length; ins++) {
                  if (this.data[ins].label === this.myform.migrationTableName) {
                    obj1.enMigrationTableName = this.data[ins].enMigrationTableName
                    break
                  }
                }
                // obj1.enMigrationTableName = arrDouBle.join()
                // obj1.migrationTableName = this.myform.migrationTableName.join()
                obj1.migrationTableName = this.myform.migrationTableName
                obj1.transferStartTime = this.myform.transferStartTime
                obj1.transferStopTime = this.myform.transferEndTime
                obj.dataLifeCycle = obj1

                AddList(obj)
                  .then(res => {
                    if (res.code === 200) {
                      this.loading = false
                      this.$message({
                        message: '保存成功',
                        type: 'success',
                        duration: 6000
                      })
                      this.$router.go(-1)
                    } else {
                      this.loading = false
                    }
                  })
                  .catch(() => {
                    this.loading = false
                  })
              } else {
                this.$message({
                  message: '填写内容需要符合检验规范',
                  type: 'warning',
                  duration: 6000
                })
                return false
              }
            })
          } else {
            this.$message({
              message: '请选择迁移结束时间',
              type: 'warning',
              duration: 6000
            })
          }
        } else {
          this.$message({
            message: '填写内容需要符合检验规范',
            type: 'warning',
            duration: 6000
          })
          return false
        }
      })
    },
    // 修改保存
    updataFun() {
      if (this.power === 2 && this.temporaryArea.migrationStopTime === null && this.temporaryArea.migrationStartTime === null) {
        this.$message({
          message: '当前表暂无离线数据, 无法创建临时区数据！',
          type: 'warning',
          duration: 6000,
          showClose: true
        })
        return
      }
      this.$refs.forms.validate(valid => {
        if (valid) {
          if (this.myform.transferEndTime) {
            this.$refs.form.validate(valid => {
              if (valid) {
                this.loading = true
                var obj = {}
                obj.dataProcess = this.form
                obj.dataProcess.processId = this.processId
                var obj1 = {}
                obj1.migrationMode = this.myform.migrationMode
                // const arrDouBle = []
                // for (let index = 0; index < this.myform.migrationTableName.length; index++) {
                //   for (let ins = 0; ins < this.data.length; ins++) {
                //     if (this.data[ins].label === this.myform.migrationTableName[index]) {
                //       arrDouBle.push(this.data[ins].enMigrationTableName)
                //     }
                //   }
                // }
                if ((this.power === 2 || this.power === 4) && this.myform.migrationMode === '离线临时区') {
                  obj1.timeliness = this.myform.timeliness.join(',')
                }
                for (let ins = 0; ins < this.data.length; ins++) {
                  if (this.data[ins].label === this.myform.migrationTableName) {
                    obj1.enMigrationTableName = this.data[ins].enMigrationTableName
                    break
                  }
                }
                // obj1.enMigrationTableName = arrDouBle.join()
                // obj1.migrationTableName = this.myform.migrationTableName.join()
                obj1.migrationTableName = this.myform.migrationTableName
                obj1.transferStartTime = this.myform.transferStartTime
                obj1.transferStopTime = this.myform.transferEndTime
                obj1.dataId = this.DataId
                obj.dataLifeCycle = obj1
                upDataList(obj)
                  .then(res => {
                    if (res.code === 200) {
                      this.loading = false
                      this.$message({
                        message: '修改成功',
                        type: 'success',
                        duration: 6000
                      })
                      this.$router.go(-1)
                    } else {
                      this.loading = false
                    }
                  })
                  .catch(() => {
                    this.loading = false
                  })
              } else {
                this.$message({
                  message: '填写内容需要符合检验规范',
                  type: 'warning',
                  duration: 6000
                })
                return false
              }
            })
          } else {
            this.$message({
              message: '请选择迁移结束时间',
              type: 'warning',
              duration: 6000
            })
          }
        } else {
          this.$message({
            message: '填写内容需要符合检验规范',
            type: 'warning',
            duration: 6000
          })
          return false
        }
      })
    },
    // 打印
    handlePrint() {
      this.printFlag = false
      this.$nextTick(function() {
        document.getElementsByClassName('processTable')[0].style.display = 'block'
        var newHtml = document.getElementsByClassName('processTable')[0].innerHTML
        document.body.innerHTML = newHtml
        window.print()
        window.location.reload()
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
    handleClick(tab, event) {},
    routerBack() {
      if (JSON.parse(sessionStorage.getItem('searchDatadataCycIndex'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchDatadataCycIndex'))
        obj.ifReviewdataCycIndex = true
        sessionStorage.setItem('searchDatadataCycIndex', JSON.stringify(obj))
      }
      this.$router.go(-1) // 返回上一层
    }
  }
}
</script>

<style lang="scss">
.dataCycle_add {
  position: relative;
  .popup {
    padding: 8px;
    z-index: 99;
    height: 340px;
    overflow-x: scroll;
    width: 310px;
    border: 1px solid #dcdfe6;
    position: absolute;
    top: 40px;
    right: 50px;
  }
  .posecond {
    z-index: 99;
    height: 130px;
    // overflow-x: scroll;
    width: 300px;
    // border: 1px solid #292929;
    // position: absolute;
    // top: 40px;
    // right: 20px;
  }
  .onFired {
    padding-left: 8px;
    z-index: 99;
    height: 100px;
    // overflow-x: scroll;
    width: 300px;
    border-bottom: 1px solid #292929;
    // position: absolute;
    // top: 40px;
    // right: 320px;
  }
  .el-date-editor--daterange {
    width: 100%;
  }
  .el-date-editor--date {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .table {
    .el-input--small{
      border: none;
    }
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
