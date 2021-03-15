<template>
  <div class="dataLifeCycleManage">
    <el-card>
      <div slot="header">
        <!-- <a @click="routerBack" class="back" :style="backImg"></a> -->
        <span>数据申请单</span>
        <!-- <span>{{$route.query.title}}</span> -->
      </div>
      <div style="marginBottom:18px">
        <!-- <el-row>
          <el-col :span="24" v-if="this.$route.query.sign==='new'||this.$route.query.sign==='modify'">
            <span style="marginRight:20px">流程操作：</span>
            <el-button type="primary" plain :loading="loading" @click="submit">提 交</el-button>
          </el-col>
        </el-row> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="迁移条件" name="first">
            <el-form :model="myform" ref="forms" label-width="140px" disabled :rules="fristRules" style="height: 380px">

               <!--  <div class="popup" v-if="this.$route.query.sign !== 'details'">
                <div class="onFired">
                  <p><b>{{this.initialMode.migrationMode}}</b></p>
                  <p><b>{{this.initialMode.migrationName}}</b>: <span style="font-size:14px">{{this.initialMode.migrationStartTime}} ~ {{this.initialMode.migrationStopTime}}</span></p>
                </div>
                <div class="posecond" v-if='myform.migrationMode&&this.bs' style="padding-left:10px">
                  <p v-if="flag&&myform.migrationMode=='在线近线'"><b>近线</b></p>
                  <p v-if="flag&&myform.migrationMode=='近线离线'"><b>离线</b></p>
                  <p v-if="flag&&myform.migrationMode=='离线临时区'"><b>临时区</b></p>
                  <p v-if='modeList.migrationMode&&this.bs && this.modeList'>
                    <b>{{this.modeList.migrationName}}:</b>
                    <span style="font-size:14px" v-if='this.modeList.migrationStopTime&& this.modeList.migrationStartTime'>{{this.modeList.migrationStartTime}} ~ {{this.modeList.migrationStopTime}}</span>
                    <span style="font-size:14px" v-else>无</span>
                  </p>
                  <p v-if='modeList.migrationMode&&this.bs && this.modeList === null'>
                    <span style="font-size:14px">无</span>
                  </p>

                </div>
              </div>-->
              <el-row>
                <el-col :span="15">
                  <el-form-item label=" 选择数据表：" prop="migrationTableName">
                    <!-- <el-checkbox-group v-model="myform.migrationTableName" @change="enentDaguer">

                      <el-checkbox v-for="(item, index) in data" :value='item.label' :label="item.label" :key="index">{{item.label}}</el-checkbox>
                    </el-checkbox-group> -->
                    <el-radio-group v-model="myform.migrationTableName">
                      <el-radio v-for="(item, index) in data" :value='item.label' :label="item.label" :key="index">{{item.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="迁移方式：" prop="migrationMode">
                    <el-radio-group v-model="myform.migrationMode">
                      <el-radio v-if="flag" :disabled="onToLine" :label="'在线近线'">在线->近线</el-radio>
                      <el-radio v-if="flag" :disabled="nearToLine" :label="'近线离线'">近线->离线</el-radio>
                      <el-radio v-if="flag2" :disabled="leaveToLine" :label="'离线临时区'">离线->临时区</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>

                <el-col :span="6">
                  <el-form-item label="迁移申请时间：" prop="transferStartTime">
                    <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="myform.transferTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions0">
                    </el-date-picker> -->
                      <el-date-picker disabled v-model="myform.transferStartTime" value-format="yyyy-MM-dd" type="date" placeholder="选择开始日期" :picker-options="pickerOptions0"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <span style="text-align:center;display:inline-block;width:100%;padding-left:5px">~</span>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="" label-width="0" prop="transferEndTime">
                      <el-date-picker v-model="myform.transferEndTime" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期" :picker-options="pickerOptions0"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                  <el-col :span="10">
                    <el-form-item label="临时区时效时间：" prop="timeliness" v-if="this.myform.migrationMode === '离线临时区'">
                        <el-date-picker disabled v-model="myform.timeliness" value-format="yyyy-MM-dd" start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期" type="daterange" :picker-options="pickerOptions1"></el-date-picker>
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
            <el-form :model="form" ref="form" class="table processTable" id="processTable">

              <el-row :gutter="20">
                <el-col :span="8" :offset="2">
                  <el-form-item label="密级：" label-width="130px">
                    <el-select clearable v-model="form.secLevel" v-if="printFlag" disabled>
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
                  <el-form-item label="缓急：" label-width="130px" >
                    <el-select clearable v-model="form.urgencyLevel" v-if="printFlag" disabled>
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
                <table border="1" style="border-collapse: collapse;">
                  <tr>
                    <td width="200" height="70;" align="center">主办处室</td>
                    <td width="200" colspan="2">
                      <el-form-item prop="mainDepart" :rules="[ { validator: isValidInput, trigger: 'blur' },]">
                        <el-input v-if="printFlag" disabled v-model="form.mainDepart" type="textarea" maxlength="50" placeholder="请输入,最长50字符"></el-input>
                        <el-input v-if="!printFlag" disabled v-text="form.mainDepart" type="textarea" maxlength="50" placeholder="请输入,最长50字符"></el-input>
                      </el-form-item>
                    </td>
                    <td width="200" colspan="2" align="center">经办人及电话</td>
                    <td width="200" colspan="2">
                      <el-form-item prop="conductPeoPhone" :rules="[ { validator: isValidInput, trigger: 'blur' },]">
                        <el-input v-if="printFlag" disabled v-model="form.conductPeoPhone" type="textarea" maxlength="20" placeholder="请输入,最长20字符"></el-input>
                        <el-input v-if="!printFlag" disabled v-text="form.conductPeoPhone" type="textarea" maxlength="20" placeholder="请输入,最长20字符"></el-input>
                      </el-form-item>

                    </td>
                  </tr>
                  <tr>
                    <td height="200" colspan="6">
                      <el-form-item prop="applyContent" :rules="[ { validator: isValidInput, trigger: 'blur' },]">
                        <el-input v-if="printFlag" disabled v-model="form.applyContent" type="textarea" maxlength="100" placeholder="请输入xxx的提示,最长100字符"></el-input>
                        <el-input v-if="!printFlag" disabled v-text="form.applyContent" type="textarea" maxlength="100" placeholder="请输入xxx的提示,最长100字符"></el-input>
                      </el-form-item>

                    </td>
                  </tr>
                  <tr>
                    <td height="200" align="center">行领导批示</td>
                    <td colspan="6">
                      <!-- <el-form-item prop="leaderOpinion" :rules="[ { validator: isValidInput, trigger: 'blur' },]"> -->
                      <el-form-item prop="leaderOpinion">
                        <el-input  v-model="form.leaderOpinion" type="textarea" maxlength="100" placeholder="请输入行领导批示,最长100字符"></el-input>
                        <!-- <el-input disabled v-if="!printFlag" v-text="form.leaderOpinion" type="textarea" maxlength="100" placeholder="请输入行领导批示,最长100字符"></el-input> -->
                      </el-form-item>

                    </td>
                  </tr>
                  <tr>
                    <td height="200" align="center">中心领导意见</td>
                    <td colspan="6">
                      <!-- <el-form-item prop="centerOpinion" :rules="[ { validator: isValidInput, trigger: 'blur' },]"> -->
                      <el-form-item prop="centerOpinion">
                        <el-input  v-model="form.centerOpinion" type="textarea" maxlength="100" placeholder="请输入中心领导意见,最长100字符"></el-input>
                        <!-- <el-input disabled v-if="!printFlag" v-text="form.centerOpinion" type="textarea" maxlength="100" placeholder="请输入中心领导意见,最长100字符"></el-input> -->
                      </el-form-item>

                    </td>
                  </tr>
                  <tr>
                    <td width="200" height="200" align="center">内部意见</td>
                    <td width="200" colspan="2">
                      <!-- <el-form-item prop="privateOpinion" :rules="[ { validator: isValidInput, trigger: 'blur' },]"> -->
                      <el-form-item prop="privateOpinion">
                        <el-input  v-model="form.privateOpinion" type="textarea" maxlength="100" placeholder="请输入内部意见,最长100字符"></el-input>
                        <!-- <el-input disabled v-if="!printFlag" v-text="form.privateOpinion" type="textarea" maxlength="100" placeholder="请输入内部意见,最长100字符"></el-input> -->
                      </el-form-item>

                    </td>
                    <td width="200" colspan="2" align="center">会签意见</td>
                    <td width="200" colspan="2">
                      <!-- <el-form-item prop="signOpinion" :rules="[ { validator: isValidInput, trigger: 'blur' },]"> -->
                      <el-form-item prop="signOpinion">
                        <el-input  v-model="form.signOpinion" type="textarea" maxlength="100" placeholder="请输入会签意见,最长100字符"></el-input>
                        <!-- <el-input disabled v-if="!printFlag" v-text="form.signOpinion" type="textarea" maxlength="100" placeholder="请输入会签意见,最长100字符"></el-input> -->
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
import { mapGetters } from 'vuex'
import { Authority, UpdateData } from '@/api/sys-monitoringAnalysis/dataCycle/add'
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
      loading: false,
      power: '', // 后台返回的权限
      flag: true, // 迁移方式控制参数1(迁移员)
      flag2: true, // 迁移方式控制参数2（分析员）
      disabled: true,
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      myform: {
        // transferTime: [],
        transferStartTime: '',
        transferEndTime: '',
        migrationMode: '在线近线',
        migrationTableName: '银行业大额交易',
        timeliness: []
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
      initialMode: {},
      pickerOptions0: {},
      onToLine: false,
      nearToLine: false,
      leaveToLine: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent']),
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
    },
    businessFlag(val) {
      if (val) this.updateForm()
      this.$store.dispatch('changeFlag', false)
    },
    formContent: {
      handler(newVal, oldVal) {
        // this.jurisdiction()
        // var arr = []
        this.dataId = newVal.dataLifeCycle.dataId
        if (newVal.dataLifeCycle) {
          // arr.push(newVal.dataLifeCycle.transferStartTime, newVal.dataLifeCycle.transferStopTime)
          // this.myform.transferTime = arr
          // this.myform.migrationMode = newVal.dataLifeCycle.migrationMode
          // this.myform.migrationTableName = newVal.dataLifeCycle.migrationTableName.split(',')
          this.myform.transferStartTime = newVal.dataLifeCycle.transferStartTime
          this.myform.transferEndTime = newVal.dataLifeCycle.transferStopTime
          this.myform.migrationMode = newVal.dataLifeCycle.migrationMode
          this.myform.migrationTableName = newVal.dataLifeCycle.migrationTableName
          if (newVal.dataLifeCycle.migrationMode === '离线临时区') {
            this.myform.timeliness.push(newVal.dataLifeCycle.timeStartLiness, newVal.dataLifeCycle.timeliness)
          }
        }
        if (newVal.dataProcess) {
          this.form = newVal.dataProcess
          console.log(this.form)
        }
        // this.list = newVal.subjects
        // this.correctId = newVal.pkAut
      },
      deep: true
    }
  },
  methods: {
    updateForm() {
      const dataObj = {}
      dataObj.dataId = this.dataId
      dataObj.workflow = this.workFlow2business
      dataObj.dataProcess = this.form
      UpdateData(dataObj).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success',
            duration: 6000
          })
        }
        this.$store.dispatch('changeFlag', false)
        this.$router.go(-1)
      })
    },
    jurisdiction() {
      Authority().then(res => {
        if (res.code === 200) {
          this.power = res.data
        }
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
    handleClick(tab, event) {}
  }
}
</script>

<style lang="scss">
.dataLifeCycleManage {
  position: relative;
  .popup{
  width: 250px;
  border: 1px solid #292929;
  position: absolute;
  top:60px;
  right: 50px;
  }
  .el-date-editor--daterange {
    min-width: 100%;
  }
  .el-select {
    width: 100%;
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
