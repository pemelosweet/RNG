<template>
  <div class="rule-deletion">
    <el-form :model="form" ref="form" label-width="140px">
      <el-form-item label="规则名称：" prop="srName">
        <span>{{form.srName}}</span>
      </el-form-item>
      <el-row :span="24"> 
        <el-form-item label="落地时间：" prop="dateValue" label-width="150px" style="width: 60%;">
          <el-date-picker v-model="form.dateValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" disabled>
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row :span="24">   
        <el-form-item label="返回问题数据条数：" prop="tradeNum" label-width="150px">
          <el-input v-model="form.tradeNum" placeholder="请输入1000到10000之间的数值" style="width: 220px;" maxlength="5" disabled></el-input>
        </el-form-item>
      </el-row>
      <div class="dIndustryinfo" v-for="(item, index) in form.ruleDetails" :key="index">
        <el-form-item label="选择行业：" prop="rdIndustry">
          <el-select v-model="item.rdIndustry" disabled>
            <el-option v-for="(cItem, cIndex) in industryOptions" :label="cItem.codeName" :value="cItem.code" :key="cIndex"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段要素：" class="element">
          <el-select v-model="item.fieldFactors" multiple placeholder="请选择字段要素" disabled style="width: 78%;">
            <el-option v-for="(cItem, cIndex) in fileEleOPtions[index]" :label="cItem.property_name" :value="cItem.property" :key="cIndex"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-row>
        <el-form-item label="要素之间关系：" class="element">
          <el-select style="width:16%;" v-model="form.ffLink" placeholder="请选择要素之间关系" disabled>
            <el-option label="并且" value="0"></el-option>
            <el-option label="或者" value="1"></el-option>
            <el-option label="相等" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="判断符号：">
          <el-select v-model="form.judgementSymbol" placeholder="请选择判断符号" disabled>
            <el-option label="大于" value="0"></el-option>
            <el-option label="小于" value="1"></el-option>
            <el-option label="大于等于" value="2"></el-option>
            <el-option label="小于等于" value="3"></el-option>
            <el-option label="等于" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-select slot="label" v-model="form.rdNumberType" disabled>
            <el-option label="数值" value="0"></el-option>
            <el-option label="位数" value="1"></el-option>
            <el-option label="是否包含字符串" value="2"></el-option>
          </el-select>
          <el-input v-model="form.rdNumber" disabled></el-input>
        </el-form-item>
      </el-row>
      <div>
        <el-button type="primary" plain disabled>自定义编辑sql</el-button>
        <div>
          <el-form-item label="" prop="customizeSql" label-width="0px">
            <el-input type="textarea" v-model="form.customizeSql" style="margin: 10px 0;" disabled placeholder="最大长度为1000位" rows="4" maxlength="1000" show-word-limit resize="none"></el-input>
          </el-form-item>
        </div>
      </div> 
      <div class="divider divider-dashed"></div>
      <el-form-item label="申请事项：" prop="srApplyInfo">
        <span>{{form.srApplyInfo ? form.srApplyInfo : '无'}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  updateForm,
  getIndustry,
  getFiledEleList
} from '@/api/sys-monitoringAnalysis/dataGovernance/rule/index.js'

export default {
  data() {
    return {
      industryOptions: [],
      fields: [],
      ruleObj: {},
      form: {
        srName: '',
        srId: '',
        dateValue: [],
        tradeNum: 1000,
        customizeSql: '',
        srApplyInfo: '',
        ffLink: '',
        judgementSymbol: '',
        rdNumberType: '',
        rdNumber: '',
        ruleDetails: [
          {
            fieldFactors: [],
            judgementSymbol: '', // 判断符号
            ffLink: '', // 关联词
            rdIndustry: '',
            rdJudgeSym: '',
            rdNumber: '',
            rdNumberType: '',
            srId: ''
          }
        ]
      },
      fileEleOPtions: [] // 字段要素
    }
  },
  mounted() {
    getIndustry()
      .then(res => {
        // 所属行业
        this.industryOptions = res.data
        console.log('industryOptions', res)
      })
      .catch()
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent'])
  },
  watch: {
    businessFlag(val) {
      if (val) this.updateForm()
    },
    formContent: {
      handler(newVal, oldVal) {
        this.form = newVal
        var startTime = newVal.redtSt !== null && newVal.redtSt !== undefined ? newVal.redtSt : ''
        var endTime = newVal.redtEnd !== null && newVal.redtEnd !== undefined ? newVal.redtEnd : ''
        this.form.dateValue = [startTime, endTime]
        // this.ruleObj = Object.assign({}, newVal.ruleDetails)
        // this.ruleObj = newVal.ruleDetails
        if (newVal.ruleDetails.length !== 0) {
          newVal.ruleDetails.map((item, i) => {
            getFiledEleList(item.rdIndustry)
              .then(res => {
                if (res.code === 200) {
                  this.fileEleOPtions[i] = res.data
                  this.form.ruleDetails[i].fieldFactors = item.fieldFactor
                  this.form.ffLink = this.form.ruleDetails[0].ffLink
                  this.form.judgementSymbol = this.form.ruleDetails[0].judgementSymbol
                  this.form.rdNumberType = this.form.ruleDetails[0].rdNumberType
                  this.form.rdNumber = this.form.ruleDetails[0].rdNumber
                }
              })
              .catch()
          })
        } else {
          this.form.ffLink = ''
          this.form.judgementSymbol = ''
          this.form.rdNumberType = ''
          this.form.rdNumber = ''
        }
        this.correctId = newVal.workflow.pkId
      },
      deep: true
    }
  },
  methods: {
    updateForm() {
      updateForm(this.workFlow2business, this.correctId).then(res => {
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
    }
  }
}
</script>

<style lang="scss">
.rule-deletion {
  margin: 0 20px;
  .dIndustryinfo {
    // 弹框选择行业样式
    position: relative;
    border: 1px solid #dcdfe6;
    padding: 10px;
    margin-bottom: 6px;
    &:hover {
      .close-icon {
        display: block;
      }
    }
  }
}
</style>
