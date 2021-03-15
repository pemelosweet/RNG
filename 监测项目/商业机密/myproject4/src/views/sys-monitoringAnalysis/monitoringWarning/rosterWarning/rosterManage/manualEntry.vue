<template>
  <div class="rosterManage-manualentrywrap">
    <el-card>
      <div slot="header" class="clearfix">
        <span>名单信息</span>
        <!-- <span v-else>创建人：{{name}}</span> -->
        <el-button  v-if="isGoShow" type="text" style="float:right" size="medium" @click="goRouter">名单来源文档编号：{{form.listSourceDocNum}}</el-button>
      </div>
      <div style="margin:20px 0">
        <span>名单类型：</span>
        <el-radio-group v-model="rosterType" :disabled="isDisabled">
          <el-radio label="subject">主体类型名单</el-radio>
          <el-radio label="account">账号类型名单</el-radio>
        </el-radio-group>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" validate-on-rule-change :disabled="isDisabled">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item
              label="主体名称："
              prop="subjectName"
              ref="subjectName"
              :class="{cancleValid:!mainType}"
            >
              <el-input v-model="form.subjectName" placeholder="最长512字符数" maxlength="512" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主体类型：" prop="subjectType">
              <el-select v-model="form.subjectType" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in subjectTypeArr"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主体国籍/地区：" prop="subjectNationality">
              <el-select v-model="form.subjectNationality" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in subjectNationalityArr"
                  :key="index"
                  :value="item.numCode"
                  :label="item.chSName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="个人主体性别：" prop="personSubjectSex">
              <el-select v-model="form.personSubjectSex" placeholder="请选择" :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in personSubjectSexArr"
                  :key="index"
                  :value="item.codeId"
                  :label="item.codeName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item
              label="主体证件类型："
              prop="subjectIType"
              ref="subjectIType"
              :class="{cancleValid:!mainType}"
            >
              <el-select v-model="form.subjectIType" placeholder="请选择" filterable @change="certificate" :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in subjectITypeArr"
                  :key="index"
                  :value="item.codeId"
                  :label="item.codeName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="主体证件号码："
              prop="subjectINum"
              ref="subjectINum"
              :class="{cancleValid:!mainType}"
            >
              <el-input v-model="form.subjectINum" placeholder="最长128字符数" maxlength="128" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="来源方向：" prop="sourceDire">
              <el-select v-model="form.sourceDire" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in sourceDireArr"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来源业务：" prop="sourceBusiness">
              <el-select  v-model="form.sourceBusiness" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in sourceBusinessArr"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="6">
            <el-form-item label="名单标识：">
              <el-select v-model="form.listIdentification" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in listIdentificationArr"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6" v-if="!isGoShow">
            <el-form-item label="名单来源文档编号：" prop="listSourceDocNum">
              <el-input v-model="form.listSourceDocNum" placeholder="最长128字符数" maxlength="128" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信息入库日期：" required>
              <el-date-picker
                value-format="yyyy-MM-dd"
                disabled
                v-model="form.infoSaveDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生日期（或注册登记日期）：" prop="bornDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.bornDate"
                :picker-options="pickerOptions1"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生地（或注册地）：" prop="bornPlace">
              <el-input v-model="form.bornPlace" placeholder="最长128字符数" maxlength="128" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
              <el-input type="textarea" v-model="form.remark" placeholder="最长1024字符数" maxlength="1024" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="divider divider divider-horizontal"></div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="主办部门：">
              <el-select v-model="form.holdDept" placeholder="请选择" filterable :clearable="!isDisabled" @change="changeAnalyst">
                <el-option
                  v-for="(item,index) in holdDeptArr"
                  :key="index"
                  :label="item.deptName"
                  :value="item.deptCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主办部门分析员：" prop="holdDeptAnalyst">
              <el-select v-model="form.holdDeptAnalyst" placeholder="请选择" @focus="changeAnalyst(form.holdDept)" filterable :clearable="!isDisabled" no-data-text="请先选择主办部门">
                <el-option
                  v-for="(item,index) in analystArr"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公开级别：" prop="publicLevel">
              <el-select v-model="form.publicLevel" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in publicLevelArr"
                  :key="index"
                  :value="item.codeId"
                  :label="item.codeName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名单主体对手：">
              <el-select v-model="form.listSOpponent" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in listSOpponentArr"
                  :key="index"
                  :value="item.codeId"
                  :label="item.codeName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="对外移送（通报、反馈协查）日期:">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.fTransforDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="对外移送（通报、反馈协查）部门：" prop="fTransforDept">
               <el-select v-model="form.fTransforDept" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in sourceDireArr"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId"
                ></el-option>
              </el-select>
              <!-- <el-input v-model="form.fTransforDept" placeholder="最长128字符数" maxlength="128" ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="24">
         <el-form-item
          label="初步判断："
          class="itme-block"
          prop="preliminaryJudgment"
        >
          <el-select
            filterable
            v-model="form.preliminaryJudgment"
            multiple
            placeholder="请选择"
            @change="replenish"
          >
            <el-option
              v-for="(item,index) in dialogJudgmentData"
              :key="index"
              :label="item.codeName"
              :value="item.codeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label=" "
          class="itme-block"
          v-if="isReplenishOne"
          prop="preliminaryJudgmentInp1"
        >
          <el-input
            maxlength="100"
            v-model="form.preliminaryJudgmentInp1"
            placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充最长100字符数"
          ></el-input>
        </el-form-item>
        <el-form-item
          label=" "
          class="itme-block"
          v-if="isReplenishTwo"
          prop="preliminaryJudgmentInp2"
        >
          <el-input
            maxlength="100"
            v-model="form.preliminaryJudgmentInp2"
            placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充最长100字符数"
          ></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="外方索引号：" prop="otherIndexNum">
              <el-input v-model="form.otherIndexNum" placeholder="最长128字符数" maxlength="128" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="外方初步判断：" prop="foreignPreliminaryJudgment">
              <el-input v-model="form.foreignPreliminaryJudgment" placeholder="最长128字符数" maxlength="128" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="外方来函细节：" prop="fLetterDesc">
              <el-input v-model="form.fLetterDesc" placeholder="最长128字符数" maxlength="128" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关联文档编号：" prop="relationDocNum">
              <el-input v-model="form.relationDocNum" placeholder="最长128字符数" maxlength="128" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <!-- <el-form-item label="外方来函涉及类型：" label-width="140px" class="foreign">
              <el-button type="text" @click="dialogVisible=true">请选择</el-button>
            </el-form-item>
            <div style="margin-bottom:16px">
              <el-checkbox-group v-model="fletterType">
                <el-checkbox v-for="(item,index) in fletterTypeArr" :key="index" :label="item.codeId">{{item.codeName}}</el-checkbox>
              </el-checkbox-group>
            </div>-->
            <el-form-item label="外方来函涉及类型：" prop="fLetterType">
              <el-select v-model="fLetterType" placeholder="请选择" multiple>
                <el-option
                  v-for="(item,index) in fletterTypeData"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <template v-if="mainType">
          <el-row
            :gutter="20"
            :class="{smallInput:mainType}"
            v-for="(item,index) in form.charosterAccountDOS"
            :key="index"
          >
            <el-col :span="6">
              <el-form-item label="开户机构名称（或简称）：" :prop="'charosterAccountDOS.' + index + '.openAccountOrgName'" :rules="rules.openAccountOrgName">
                <el-input v-model="item.openAccountOrgName"  maxlength="128" placeholder="最长128字符数" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账户号码：" :prop="'charosterAccountDOS.' + index + '.accountNum'" :rules="rules.accountNum">
                <el-input v-model="item.accountNum"  maxlength="64" placeholder="最长64字符数" ></el-input>
              </el-form-item>
            </el-col>
            <el-button
              style="margin-top:32px"
              v-if="mainType&&index===form.charosterAccountDOS.length-1"
              type
              icon="el-icon-plus"
              @click="addSingleAccount(item,index)"
            ></el-button>
            <el-button
              style="margin-top:32px"
              v-if="mainType&&(index!==0||index!==form.charosterAccountDOS.length-1)"
              type
              icon="el-icon-minus"
              @click="delSingleAccount(item,index)"
            ></el-button>
          </el-row>
        </template>

        <template v-else>
          <el-row :gutter="20" :class="{smallInput:mainType}">
            <el-col :span="6">
              <el-form-item
                label="开户机构名称（或简称）："
                prop="openAccountOrgName"
                ref="openAccountOrgName0"
                :class="{cancleValid:mainType}"
              >
                <el-input v-model="form.openAccountOrgName" placeholder="最长128字符数" maxlength="128" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="账户号码："
                ref="accountNum0"
                prop="accountNum"
                :class="{cancleValid:mainType}"
              >
                <el-input v-model="form.accountNum" placeholder="最长64字符数" maxlength="64" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
      <div v-if="isXTF">
        <div class="btnalign" style="textAlign:center" v-if="!isDisabled">
          <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right:20px" :loading="isTrue">提 交</el-button>
          <el-button type="default" @click="goback">取 消</el-button>
      </div>
      <div class="btnalign" style="textAlign:center" v-else>
          <el-button type="default" @click="goback">返 回</el-button>
      </div>
      </div>
      
    </el-card>
    <!-- <el-dialog title="外方来函涉及类型" :visible.sync="dialogVisible" class="dialogForeign">
      <el-checkbox-group v-model="fletterTypeCheckd" @change="dialogCheckd">
        <el-checkbox v-for="(item,index) in fletterTypeData" :key="index" :label="item.codeId">{{item.codeName}}</el-checkbox>
      </el-checkbox-group>

      <div slot="footer">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getsourceBusinessArr } from '@/api/sys-monitoringAnalysis/roster-warning/levelConfiguration.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import {
  haddleAddRoster,
  viewRoster,
  getDepartment
} from '@/api/sys-monitoringAnalysis/roster-warning/roster-manage.js'
import { common_Validate, adminisValidInput, common_ValidateB, delDataValidInput, commonPattern, spaceBarAndSpecial } from '@/utils/formValidate'
import { deptUser } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
export default {
  components: {
    preliminaryJudgment
  },
  props: {
    nameListXTF: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    // var validaCommon = function(rule, value, callback) {
    //   if (value === '') {
    //     callback(new Error('此项内容不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      rosterType: 'subject',
      dialogVisible: false,
      isDisabled: false,
      isXTF: true,
      isTrue: false,
      dialogJudgmentData: [],
      analystArr: [],
      isReplenishOne: false,
      isReplenishTwo: false,
      isGoShow: false,
      listSourceDocNumId: '',
      form: {
        creUser: '',
        establishdept: '',
        distinguishUser: '',
        subjectName: '',
        subjectType: '',
        subjectNationality: '',
        personSubjectSex: '',
        subjectIType: '',
        subjectINum: '',
        sourceDire: '',
        sourceBusiness: '',
        listSourceDocNum: '',
        infoSaveDate: '',
        lastUpdDate: '',
        bornDate: '',
        bornPlace: '',
        remark: '',
        holdDept: '',
        holdDeptAnalyst: '',
        publicLevel: '',
        listRival: '',
        listSOpponent: '',
        fTransforDate: '',
        fTransforDept: '',
        accountNum: '',
        openAccountOrgName: '',
        otherIndexNum: '',
        foreignPreliminaryJudgment: '',
        fLetterDesc: '',
        relationDocNum: '',
        supreme: '',
        publicScope: '1', // 公开范围 默认
        // listIdentification: '', // 名单标识
        preliminaryJudgmentInp1: '', // 校验初步判断1401
        preliminaryJudgmentInp2: '', // 校验初步判断1401
        preliminaryJudgment: [],
        charosterAccountDOS: [
          {
            openAccountOrgName: '',
            accountNum: ''
          }
        ]
      },
      fLetterType: [],
      fletterTypeArr: [],
      fletterTypeData: [],
      fletterTypeCheckd: '',
      subjectTypeArr: [],
      personSubjectSexArr: [],
      publicLevelArr: [],
      listSOpponentArr: [],
      subjectNationalityArr: [],
      subjectITypeArr: [],
      holdDeptArr: [],
      fTransforDeptArr: [],
      sourceDireArr: [], // 来源方向
      sourceBusinessArr: [], // 来源业务
      publicScopeArr: [],
      // listIdentificationArr: [],
      rules: {
        subjectName: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: delDataValidInput, trigger: 'blur' }],
        sourceDire: [{ required: true, message: '请选择来源方向', trigger: 'change' }],
        listSourceDocNum: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: common_ValidateB, trigger: 'blur' }],
        subjectIType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        subjectINum: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: common_Validate, trigger: 'blur' }],
        sourceBusiness: [{ required: true, message: '请选择来源业务', trigger: 'blur' }],
        preliminaryJudgmentInp1: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: common_Validate, trigger: 'blur' }],
        preliminaryJudgmentInp2: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: common_Validate, trigger: 'blur' }],
        // 非必填
        // holdDeptAnalyst: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        openAccountOrgName: [{ max: 128, validator: spaceBarAndSpecial, trigger: 'blur' }],
        accountNum: [{ max: 128, validator: this.onlyNumberValidate1, trigger: 'blur' }],
        // fTransforDept: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        foreignPreliminaryJudgment: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        fLetterDesc: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        relationDocNum: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        bornPlace: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        otherIndexNum: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }]
        // remark: [{ max: 1024, validator: adminisValidInput, trigger: 'blur' }]
      }
    }
  },
  computed: {
    paramsObj() {
      const obj = JSON.parse(JSON.stringify(this.form))
      obj.rosterType = this.rosterType
      if (this.rosterType === 'subject') {
        const accountNumArr = []
        const openAccountOrgNameArr = []
        this.form.charosterAccountDOS.forEach(e => {
          accountNumArr.push(e.accountNum)
          openAccountOrgNameArr.push(e.openAccountOrgName)
        })
        obj.accountNum = accountNumArr.join()
        obj.openAccountOrgName = openAccountOrgNameArr.join()
      }
      delete obj.preliminaryJudgment
      if (this.$route.query.id === undefined) {
        delete obj.infoSaveDate
      }
      // delete obj.preliminaryJudgmentInp1
      // delete obj.preliminaryJudgmentInp2
      return obj
    },
    ...mapGetters(['name']),
    ...mapGetters(['permissions_routers']),
    mainType() {
      if (this.rosterType === 'subject') {
        this.rules.subjectIType[0].required = true
        this.rules.subjectINum = [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: this.common_Validate, trigger: 'blur' }]
        this.rules.subjectName = [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: delDataValidInput, trigger: 'blur' }]
        this.rules.openAccountOrgName = [{ validator: spaceBarAndSpecial, trigger: 'blur' }]
        this.rules.accountNum = [{ validator: this.onlyNumberValidate1, trigger: 'blur' }]
        return true
      } else {
        this.rules.subjectIType[0].required = false
        this.rules.subjectINum = [{ validator: this.common_Validate, trigger: 'blur' }]
        this.rules.subjectName = [{ validator: delDataValidInput, trigger: 'blur' }]
        this.rules.openAccountOrgName = [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: spaceBarAndSpecial, trigger: 'blur' }]
        this.rules.accountNum = [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: this.onlyNumberValidate1, trigger: 'blur' }]
        return false
      }
    }
  },
  watch: {
    mainType(val) {
      this.$nextTick(() => {
        this.$refs.subjectName.clearValidate()
        this.$refs.subjectINum.clearValidate()
        this.$refs.subjectIType.clearValidate()
        if (!val) {
          this.$refs.openAccountOrgName0.clearValidate()
          this.$refs.accountNum0.clearValidate()
        }
      })
    },
    rosterType(val) {
      // this.clearValidate([])
      this.$refs.ruleForm.clearValidate(['sourceDire', 'sourceBusiness', 'listSourceDocNum'])
    }
  },
  methods: {
    currentDay(params) {
      const oDate = new Date()
      const y = oDate.getFullYear()
      const m = oDate.getMonth() + 1
      const d = oDate.getDate()
      return y + '-' + m + '-' + d
    },
    // 切换数据
    changeAnalyst(params) {
      let deptId = ''
      this.holdDeptArr.forEach(el => {
        if (el.deptCode === params) {
          deptId = el.deptId
          return
        }
      })
      deptUser({ deptId: deptId }).then(res => {
        if (res.code === 200) {
          this.form.holdDeptAnalyst = ''
          this.analystArr = res.data
        }
      })
    },
    getDepartmentInit() {
      getDepartment('').then(res => {
        if (res.code === 200) {
          this.holdDeptArr = res.data
        }
      })
    },
    // 树形组件 -  获取部门
    // gettreeDep() {
    //   getTree().then(res => {
    //     if (res.code === 200) {
    //       this.holdDeptArr = res.data.children[2].children.concat(res.data.children[0].children)
    //     }
    //   })
    // },
    // 证件类型校验
    certificate() {
      switch (this.form.subjectIType) {
        case '110003':
          this.rules.subjectINum = [
            { required: true, message: '请填正确的身份证号码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }
          ]
          break
        case '110001':
          this.rules.subjectINum = [
            { required: true, message: '请填正确的身份证号码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }
          ]
          break
        case '':
          this.rules.subjectINum = [{ validator: this.onlyNumberValidate, trigger: 'blur' }]
          break
        default:
          this.rules.subjectINum = [{ required: true, message: '内容不能为空', trigger: 'blur' }, { validator: this.onlyNumberValidate, trigger: 'change' }]
          break
      }
    },
    onlyNumberValidate(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (value.length <= 5 || value.length >= 129) {
          callback(new Error('内容应在6-128位之间'))
        } else if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    onlyNumberValidate1(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 初步判断为1401 1402 的时候  返回的数据
    judgmentOther(inp1, inp2) {
      this.form.preliminaryJudgmentInp1 = inp1
      this.form.preliminaryJudgmentInp2 = inp2
    },
    // 添加一条账户
    addSingleAccount(item, index) {
      if (this.form.charosterAccountDOS.length < 5) {
        this.form.charosterAccountDOS.push({
          openAccountOrgName: '',
          accountNum: ''
        })
      } else {
        this.$message({
          message: '您最多只能添加5个',
          type: 'warning',
          duration: 6000
        })
      }
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.preliminaryJudgment.indexOf('1402') !== -1) {
        this.isReplenishTwo = true
      } else {
        this.isReplenishTwo = false
      }
      if (this.form.preliminaryJudgment.indexOf('1401') !== -1) {
        this.isReplenishOne = true
      } else {
        this.isReplenishOne = false
      }
    },
    // 判断公开级别是否显示
    // judge() {
    //   if (this.permissions_routers.indexOf(this.jurisdiction) === -1) {
    //     this.openLevel = true // 中心
    //   } else {
    //     this.openLevel = false
    //   }
    // },
    // 回显数据
    getDetail() {
      if (this.nameListXTF.typeXTF === 'typeXTF') {
        console.log(this.nameListXTF)

        const id = this.nameListXTF.id
        this.isDisabled = true
        this.isXTF = false
        if (id) { // 中心回显
          viewRoster(id).then(res => {
            if (res.code === 200) {
              for (var key in this.form) {
                this.form[key] = res.data[key]
              }
              if (res.data.listSourceDocNumId !== null) {
                this.isGoShow = true
                this.listSourceDocNumId = res.data.listSourceDocNumId
              }
              this.fLetterType = res.data.fLetterType ? res.data.fLetterType.split(',') : []
              this.rosterType = res.data.rosterType ? res.data.rosterType : ''
              if (this.rosterType !== 'account') {
                if (res.data.charosterAccountDOS.length > 0) {
                  this.form.charosterAccountDOS = res.data.charosterAccountDOS
                } else {
                  this.form.charosterAccountDOS = [
                    {
                      openAccountOrgName: '',
                      accountNum: ''
                    }
                  ]
                }
              } else {
                this.form.openAccountOrgName = res.data.charosterAccountDOS.length > 0 ? res.data.charosterAccountDOS[0].openAccountOrgName : ''
                this.form.accountNum = res.data.charosterAccountDOS.length > 0 ? res.data.charosterAccountDOS[0].accountNum : ''
              }
              const JudgmentVal = (res.data.charosterPreliminaryJudgmentDOList[0].preliminaryJudgme !== null && res.data.charosterPreliminaryJudgmentDOList[0].preliminaryJudgme !== '') ? res.data.charosterPreliminaryJudgmentDOList : []
              const JudgmentValNew = []
              if (JudgmentVal.length > 0) {
                for (let i = 0; i < JudgmentVal.length; i++) {
                  if (JudgmentVal[i].preliminaryJudgme.indexOf('1401') !== 'undefined' && JudgmentVal[i].preliminaryJudgme.indexOf('1401') !== -1) {
                    this.form.preliminaryJudgmentInp1 = JudgmentVal[i].preliminaryJudgme.substring('5')
                    JudgmentValNew[i] = '1401'
                  } else if (JudgmentVal[i].preliminaryJudgme.indexOf('1402') !== 'undefined' && JudgmentVal[i].preliminaryJudgme.indexOf('1402') !== -1) {
                    this.form.preliminaryJudgmentInp2 = JudgmentVal[i].preliminaryJudgme.substring('5')
                    JudgmentValNew[i] = '1402'
                  } else {
                    JudgmentValNew[i] = JudgmentVal[i].preliminaryJudgme
                  }
                }
                this.form.preliminaryJudgment = JudgmentValNew
              } else {
                this.form.preliminaryJudgment = []
              }

              this.replenish()
            }
          })
        } else {
          this.form.infoSaveDate = this.currentDay()
        }
      } else {
        const id = this.$route.query.id
        if (this.$route.query.type) {
          this.isDisabled = true
        }
        if (id) { // 中心回显
          viewRoster(id).then(res => {
            if (res.code === 200) {
              for (var key in this.form) {
                this.form[key] = res.data[key]
              }
              if (res.data.listSourceDocNumId !== null) {
                this.isGoShow = true
                this.listSourceDocNumId = res.data.listSourceDocNumId
              }
              this.fLetterType = res.data.fLetterType ? res.data.fLetterType.split(',') : []
              this.rosterType = res.data.rosterType ? res.data.rosterType : ''
              if (this.rosterType !== 'account') {
                if (res.data.charosterAccountDOS.length > 0) {
                  this.form.charosterAccountDOS = res.data.charosterAccountDOS
                } else {
                  this.form.charosterAccountDOS = [
                    {
                      openAccountOrgName: '',
                      accountNum: ''
                    }
                  ]
                }
              } else {
                this.form.openAccountOrgName = res.data.charosterAccountDOS.length > 0 ? res.data.charosterAccountDOS[0].openAccountOrgName : ''
                this.form.accountNum = res.data.charosterAccountDOS.length > 0 ? res.data.charosterAccountDOS[0].accountNum : ''
              }
              const JudgmentVal = (res.data.charosterPreliminaryJudgmentDOList[0].preliminaryJudgme !== null && res.data.charosterPreliminaryJudgmentDOList[0].preliminaryJudgme !== '') ? res.data.charosterPreliminaryJudgmentDOList : []
              const JudgmentValNew = []
              if (JudgmentVal.length > 0) {
                for (let i = 0; i < JudgmentVal.length; i++) {
                  if (JudgmentVal[i].preliminaryJudgme.indexOf('1401') !== 'undefined' && JudgmentVal[i].preliminaryJudgme.indexOf('1401') !== -1) {
                    this.form.preliminaryJudgmentInp1 = JudgmentVal[i].preliminaryJudgme.substring('5')
                    JudgmentValNew[i] = '1401'
                  } else if (JudgmentVal[i].preliminaryJudgme.indexOf('1402') !== 'undefined' && JudgmentVal[i].preliminaryJudgme.indexOf('1402') !== -1) {
                    this.form.preliminaryJudgmentInp2 = JudgmentVal[i].preliminaryJudgme.substring('5')
                    JudgmentValNew[i] = '1402'
                  } else {
                    JudgmentValNew[i] = JudgmentVal[i].preliminaryJudgme
                  }
                }
                this.form.preliminaryJudgment = JudgmentValNew
              } else {
                this.form.preliminaryJudgment = []
              }

              this.replenish()
            }
          })
        } else {
          this.form.infoSaveDate = this.currentDay()
        }
      }
    },
    // 删除一条账户
    delSingleAccount(item, index) {
      this.form.charosterAccountDOS.splice(index, 1)
    },
    // 提交表单
    submitForm(formName) {
      this.certificate()
      if (this.form.preliminaryJudgment && this.form.preliminaryJudgment.length) {
        for (let i = 0; i < this.form.preliminaryJudgment.length; i++) {
          if (this.form.preliminaryJudgment[i] === '1402') {
            this.form.preliminaryJudgment[i] += '-' + this.form.preliminaryJudgmentInp2
          }
          if (this.form.preliminaryJudgment[i] === '1401') {
            this.form.preliminaryJudgment[i] += '-' + this.form.preliminaryJudgmentInp1
          }
        }
      }
      this.paramsObj.preliminaryJudgment = this.form.preliminaryJudgment ? this.form.preliminaryJudgment.join(',') : ''
      this.paramsObj.fLetterType = this.fLetterType ? this.fLetterType.join() : ''
      if (this.rosterType && this.rosterType === 'subject') {
        this.paramsObj.charosterAccountDOS = this.form.charosterAccountDOS
      } else {
        this.paramsObj.charosterAccountDOS = [{ openAccountOrgName: this.form.openAccountOrgName, accountNum: this.form.accountNum }]
      }
      this.paramsObj.lcnId = this.$route.query.id ? this.$route.query.id : ''
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isTrue = true
          haddleAddRoster(this.paramsObj)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 6000
                })
              }
            })
            .then(() => {
              this.$router.go(-1)
              this.isTrue = false
            })
            .catch(() => {
              this.isTrue = false
            })
        } else {
          return false
        }
      })
    },

    // dialogCheckd(val) {
    //   this.fletterType = []
    //   this.fletterTypeArr = []
    //   val.forEach(item => {
    //     this.fletterTypeData.map(item2 => {
    //       if (item === item2.codeId) {
    //         this.fletterTypeArr.push(item2)
    //         this.fletterType.push(item)
    //       }
    //     })
    //   })
    // },
    // 获取来源业务
    getsourceBusinessArr() {
      var paramsObj = {
        pageNum: 1,
        pageSize: 9999
      }
      getsourceBusinessArr(paramsObj, '0').then(res => {
        if (res.code === 200) {
          this.sourceBusinessArr = res.data.list
        }
      })
      getsourceBusinessArr(paramsObj, '1').then(res => {
        if (res.code === 200) {
          this.sourceDireArr = res.data.list
        }
      })
      getsourceBusinessArr(paramsObj, '2').then(res => {
        if (res.code === 200) {
          this.subjectTypeArr = res.data.list
        }
      })
      // getsourceBusinessArr('SCDS').then(res => {
      //   if (res.code === 200) {
      //     this.sourceBusinessArr = res.data
      //   }
      // })
    },
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            // case 'SUBTYPE':
            //   this.subjectTypeArr = res.data
            //   break
            case 'SEX':
              this.personSubjectSexArr = res.data
              break
            case 'PUBLEVEL':
              this.publicLevelArr = res.data
              break
            case 'LOCP':
              this.listSOpponentArr = res.data
              break
            case 'COUNTRY':
              this.subjectNationalityArr = res.data
              break
            case 'SFZJ':
              this.subjectITypeArr = res.data
              break
            // case 'HTDP':
            //   this.holdDeptArr = res.data
            //   break
            case 'FRTS':
              this.fTransforDeptArr = res.data
              break
            // case 'SCDT':
            //   this.sourceDireArr = res.data
            //   break
            case 'TTOUC':
              this.fletterTypeData = res.data
              break
            case 'PUBSCOPE':
              this.publicScopeArr = res.data
              break
            // case 'LISTIDE':
            //   this.listIdentificationArr = res.data
            //   break
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            // case 'SCDS':
            //   this.sourceBusinessArr = res.data
            //   break
            default:
              break
          }
        }
      })
    },
    goback() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.ifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },
    goRouter(scope) {
      if (this.form.sourceBusiness === '8' || this.form.sourceBusiness === '9') {
        // 中心的
        this.$router.push({ name: 'cueManage_autonomousAnalysisInfo',
          query: {
            keyIndex: '1',
            anaId: this.listSourceDocNumId
          }})
      } else {
        // 协查
        this.$router.push({ name: 'cueManage_investigation_archives',
          query: {
            key: '0',
            assistId: this.listSourceDocNumId
          }})
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    checkboxChange(val) {}
  },
  mounted() {
    this.getDepartmentInit()
    this.getsourceBusinessArr()
    // this.gettreeDep()
    this.getDictionary('SUBTYPE')
    this.getDictionary('SEX')
    this.getDictionary('PUBLEVEL')
    this.getDictionary('LOCP')
    this.getDictionary('COUNTRY')
    this.getDictionary('SFZJ')
    this.getDictionary('HTDP')
    this.getDictionary('FRTS')
    this.getDictionary('SCDT')
    // this.getDictionary('SCDS')
    this.getDictionary('TTOUC')
    this.getDictionary('PUBSCOPE')
    this.getDictionary('LISTIDE')
    this.getDictionary('TOSC')
    setTimeout(() => {
      this.getDetail()
    }, 100)
    this.judge()
  }
}
</script>

<style lang="scss">
.rosterManage-manualentrywrap {
  .cancleValid {
    .el-form-item__content {
      .el-input__inner {
        border-color: #dcdfe6;
        &:focus {
          border-color: #dcdfe6;
        }
      }
    }
  }
  .check-box--input {
    position: absolute;
    width: 90%;
  }

  .el-form-item__label {
    float: none;
  }
  .foreign {
    .el-form-item__label {
      float: left;
    }
  }
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    min-width: 100%;
  }
  .el-checkbox {
    margin-left: 18px;
  }
  .marginBottom24 {
    margin-bottom: 24px;
  }
  .dialogForeign {
    .el-dialog__body {
      max-height: 60vh;
      overflow: auto;
      .el-checkbox {
        display: block;
        margin-left: 12px;
      }
    }
  }
  .el-input.is-disabled .el-input__inner{
    // background-color:white;
    color: #3C3C3C;
  }
  
  @media screen and(max-width: 1400px) {
    .el-col-6 {
      width: 50%;
    }
    .smallInput {
      .el-col-6 {
        width: 40%;
      }
    }
  }
}
</style>
