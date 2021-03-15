<template>
  <div class="cueManage_interIntelligence_feedbackForm">
    <el-form :model="feedbackForm" :disabled="disableds" :rules="rules" ref="feedbackForm">
      <fieldset class="classFiledset">
        <legend>中国反洗钱监测分析信息</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文档号" prop="documentNum">
              <el-input :disabled="disabled"   v-model="feedbackForm.documentNum" maxlength="20"  placeholder="请输入文档号,最长20字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国家/地区" prop="chSName">
              <el-select :disabled="disabled" clearable  v-model="feedbackForm.daState" filterable placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="机构" prop="daOrg">
              <el-input :disabled="disabled"   v-model="feedbackForm.daOrg" maxlength="50"  placeholder="请输入机构,最长50字符"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人" prop="daLinkman">
              <el-input :disabled="disabled"   v-model="feedbackForm.daLinkman" maxlength="30"  placeholder="请输入联系人,最长30字符"></el-input>
            </el-form-item>
          </el-col>
               <el-col :span="12">
            <el-form-item label="职位" prop="daDuty">
              <el-input :disabled="disabled"   v-model="feedbackForm.daDuty" maxlength="30"  placeholder="请输入职位,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="20">

     <el-col :span="12">
            <el-form-item label="地址" prop="daAddress">
              <el-input :disabled="disabled"   v-model="feedbackForm.daAddress" maxlength="50"  placeholder="请输入地址,最长50字符"></el-input>
            </el-form-item>
          </el-col>
                <el-col :span="12">
            <el-form-item label="电话" prop="daPhone"> 
              <el-input :disabled="disabled"   v-model="feedbackForm.daPhone" maxlength="30"  placeholder="请输入电话,最长30字符"></el-input>
            </el-form-item>
          </el-col>
  </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="传真" prop="daFax">
              <el-input :disabled="disabled"   v-model="feedbackForm.daFax" maxlength="30"  placeholder="请输入传真,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮件" prop="daEmail">
              <el-input :disabled="disabled"   v-model="feedbackForm.daEmail" maxlength="30"  placeholder="请输入电子邮件,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
           <el-col :span="12">
            <el-form-item label="签名" prop="daSignature">
              <el-input :disabled="disabled"   v-model="feedbackForm.daSignature" maxlength="30"  placeholder="请输入签名,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期">
              <el-date-picker :disabled="disabled" v-model="feedbackForm.daDate" value-format="yyyy-MM-dd" type="date" >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
   <el-row :gutter="20"  style="margin-top:20px">
     <el-col :span="12">
            <el-form-item label="授权人" prop="daCertigier"> 
              <el-input :disabled="disabled"   v-model="feedbackForm.daCertigier" maxlength="30"  placeholder="请输入授权人,最长30字符"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="职位" prop="daCertigierDuty">
              <el-input :disabled="disabled"   v-model="feedbackForm.daCertigierDuty" maxlength="30"  placeholder="请输入职位,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="授权人签名" prop="daCertigierSignature">
              <el-input :disabled="disabled"   v-model="feedbackForm.daCertigierSignature" maxlength="30"  placeholder="请输入签名,最长30字符"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
          
            <el-form-item label="授权人日期">
              <el-date-picker  :disabled="disabled" type="date" v-model="feedbackForm.daCertigierDate"  value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>

      <fieldset class="classFiledset">
        <legend>协查请求方信息</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文档号" prop="xdocumentNum">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdocumentNum" maxlength="20"  placeholder="请输入文档号,最长20字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国家/地区">
              <el-select :disabled="disabled" clearable  v-model="feedbackForm.xdaState" placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
<el-row :gutter="20">
 <el-col :span="12">
            <el-form-item label="机构" prop="xdaOrg">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaOrg" maxlength="50"  placeholder="请输入机构,最长50字符"></el-input>
            </el-form-item>
          </el-col>
</el-row>
        <el-row :gutter="20">
        
          <el-col :span="12">
            <el-form-item label="名字" prop="xdaLinkman">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaLinkman" maxlength="30"  placeholder="请输入名字,最长30字符"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="职位" prop="xdaDuty">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaDuty" maxlength="30"  placeholder="请输入职位,最长30字符"></el-input>
            </el-form-item>
          </el-col>            
        </el-row>

        <el-row :gutter="20">
                   <el-col :span="12">
            <el-form-item label="电话" prop="xdaPhone">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaPhone" maxlength="30"  placeholder="请输入电话,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="12">
            <el-form-item label="电子邮件" prop="xdaEmail">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaEmail" maxlength="30"  placeholder="请输入电子邮件,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="20">  
 <el-col :span="12">
            <el-form-item label="传真" prop="xdaFax">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaFax" maxlength="30"  placeholder="请输入传真,最长30字符"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
        <el-row :gutter="20" style="margin-top:20px;">
          <el-col :span="12">
            <el-form-item label="授权人" prop="xdaCertigier">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaCertigier" maxlength="30"  placeholder="请输入授权人,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="xdaCertigierDuty">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaCertigierDuty" maxlength="30"  placeholder="请输入职位,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="传真" prop="xdaCertigierEmail">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaCertigierEmail" maxlength="30"  placeholder="请输入传真,最长30字符"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="电话" prop="xdaCertigierPhone">
              <el-input :disabled="disabled"   v-model="feedbackForm.xdaCertigierPhone" maxlength="30"  placeholder="请输入电话,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>

      <fieldset class="classFiledset">
        <legend>内容</legend>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="具体反馈内容">
              <el-input :disabled="disabled"    :autosize="{ minRows: 2, maxRows: 14}"  v-model="feedbackForm.contentfk" type="textarea" maxlength="500"  placeholder="请输入具体反馈内容,最长500字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
    </el-form>
  </div>
</template>

<script>
import { country } from '@/api/common/citys.js'
import { noSpaceAndTs, commonPattern } from '@/utils/formValidate.js'
export default {
  props: {
    feedbackFormData: Object,
    disableds: Boolean
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      disabled: false,
      feedbackForm: {
        documentNum: '',
        daState: '',
        daOrg: '',
        daLinkman: '',
        daDuty: '',
        daPhone: '',
        daFax: '',
        daEmail: '',
        daAddress: '',
        daSignature: '',
        daDate: '',
        daCertigier: '',
        daCertigierDuty: '',
        daCertigierSignature: '',
        daCertigierDate: '',

        xdocumentNum: '',
        xdaState: '',
        xdaOrg: '',
        xdaLinkman: '',
        xdaDuty: '',
        xdaPhone: '',
        xdaFax: '',
        xdaEmail: '',
        xdaCertigier: '',
        xdaCertigierDuty: '',
        xdaCertigierPhone: '',
        xdaCertigierEmail: '',

        contentfk: ''
      },
      rules: {
        documentNum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        daOrg: [{ validator: this.NullAndTs, trigger: 'blur' }],
        daLinkman: [{ validator: this.NullAndTs, trigger: 'blur' }],
        daDuty: [{ validator: this.NullAndTs, trigger: 'blur' }],
        // daPhone: [{ validator: this.onlyNumberValidate, trigger: 'blur' }],
        daFax: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        daEmail: [{ validator: this.emailValidate, trigger: 'blur' }],
        daAddress: [{ validator: this.NullAndTs, trigger: 'blur' }],
        daSignature: [{ validator: this.NullAndTs, trigger: 'blur' }],
        daCertigier: [{ validator: this.NullAndTs, trigger: 'blur' }],
        daCertigierDuty: [{ validator: this.NullAndTs, trigger: 'blur' }],
        daCertigierSignature: [{ validator: this.NullAndTs, trigger: 'blur' }],

        xdocumentNum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        xdaState: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        xdaOrg: [{ validator: this.NullAndTs, trigger: 'blur' }],
        xdaLinkman: [{ validator: this.NullAndTs, trigger: 'blur' }],
        xdaDuty: [{ validator: this.NullAndTs, trigger: 'blur' }],
        // xdaPhone: [{ validator: this.onlyNumberValidate, trigger: 'blur' }],
        xdaFax: [{ validator: this.NullAndTs, trigger: 'blur' }],
        xdaEmail: [{ validator: this.emailValidate, trigger: 'blur' }],
        xdaCertigier: [{ validator: this.NullAndTs, trigger: 'blur' }],
        xdaCertigierDuty: [{ validator: this.NullAndTs, trigger: 'blur' }],
        // xdaCertigierPhone: [{ validator: this.onlyNumberValidate, trigger: 'blur' }],
        xdaCertigierEmail: [{ validator: this.NullAndTs, trigger: 'blur' }]

      },
      countryOption: [] // 国家
    }
  },
  watch: {
    feedbackFormData: {
      handler(val) {
        if (val) {
          this.feedbackForm = val
          this.disabled = this.feedbackFormData.noWrite
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getCountryList()
    // this.propsData()
  },
  methods: {
    // 父子赋值
    // propsData() {
    //   this.feedbackFormData ? this.feedbackForm = this.feedbackFormData : this.feedbackForm
    // },
    NullAndTs(rule, value, callback) {
      var spcae = /(^\s)|(\s$)/
      if (spcae.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    emailValidate(rule, value, callback) {
      var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '' || value === undefined) {
        callback()
      } else {
        if (!email.exec(value)) {
          callback(new Error('请输入邮箱，如：123456@163.com'))
        } else {
          callback()
        }
      }
    },
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      // var phone = /^((1[0-9]{10})|((\d{3,4}-)?\d{7,8}))$/
      var phone = /^\d+(-)?(\d+)?$/
      if (value === '' || value === undefined) {
        callback()
      } else {
        if (!phone.test(value)) {
          callback(new Error('请输入电话号码'))
        } else {
          callback()
        }
      }
    },
    validateForm() {
      let flag = false
      this.$refs['feedbackForm'].validate((valid) => {
        flag = valid
      })
      return flag
    },
    // 国家名
    getCountryList() {
      country().then(res => {
        this.countryOption = res.data.list
      })
    }
  }
}
</script>

<style lang="scss">
.cueManage_interIntelligence_feedbackForm {
  .dates{
    color:#c0c4cc;
    position: absolute;
    top: 33px;
    left: 30px;
    z-index: 9999;
  }
  .classFiledset {
    border-radius: 5px;
    // border-color: #67c23a;
    border-color: #e1f3d8;
    margin-bottom: 10px;
  }
  .el-date-editor--date {
    width: 100% !important;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .title {
    margin-bottom: 20px;
  }
}
</style>
