<template>
  <div class="noticewrap">
    <el-form :model="form" ref="form" label-width="400px">
      <el-row :gutter="20">
        <div class="title">人工补正要求通知</div>
        <div class="noticeMain" >
          <el-col :span="24" style="font-weight:bold; font-size:16px; margin:0 0 15px 22px;">基本信息</el-col>
          <el-row>
            <el-form-item label="行业类型：" prop="industry">
              <el-select v-model="form.industry" placeholder="行业类型" disabled>
                <el-option label="银行业" value="B"></el-option>
                <el-option label="证券业" value="S"></el-option>
                <el-option label="保险业" value="I"></el-option>
                 <el-option label="银联业" value="U001"></el-option>
                <el-option label="支付业" value="P001"></el-option>
                <el-option label="资金清算" value="Z001"></el-option>
                 <el-option label="信托公司等八类" value="J"></el-option>
                <el-option label="贵金属" value="PM"></el-option>
                <el-option label="房地产" value="RP"></el-option>
                <el-option label="会计师事务所" value="AF"></el-option>
                <el-option label="社会组织" value="ORG"></el-option>
                <el-option label="律师事务所" value="LO"></el-option>
                <el-option label="公证机构" value="NO"></el-option>
                <el-option label="公司服务提供" value="ISP"></el-option>
                <el-option label="互联网金融" value="NF"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="报告机构：" prop="reportBody">
              <!-- <el-select v-model="form.reportBody" placeholder="报告机构编码" disabled>
                <el-option v-for="(item,index) in rinmOptions" :key="index" :label="item.rinm + item.ricd" :value="item.rinm"></el-option>
              </el-select> -->
              <span>{{form.reportBody ? form.reportBody : '无'}}</span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="补充完成时限：" prop="supplyLimitTime">
             <el-date-picker v-model="form.correctLimitTime" type="date" value-format="yyyyMMdd" placeholder="选择日期" disabled>
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="补充填报要求：" prop="supplyAsk">
              <span>{{form.correctAsk ? form.correctAsk : '无'}}</span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="补充开始日期：" prop="supplyStartTime">
              <!-- <span>{{form.supplyStartTime}}</span> -->
              <el-date-picker v-model="form.supplyStartTime" type="date" value-format="yyyyMMdd" placeholder="选择日期" disabled>
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="补充结束日期：" prop="supplyEndTime">
              <!-- <span>{{form.supplyEndTime}}</span> -->
              <el-date-picker v-model="form.supplyEndTime" type="date" value-format="yyyyMMdd" placeholder="选择日期" disabled>
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="客户身份证件/证明文件类型：" prop="citp">
              <el-select disabled v-model="form.citp" clearable style="width: 60%;"> 
                <el-option v-for="(item, index) in citpOptions" :key="index" :label="'（' + item.codeId + '）' + item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="客户身份证件/证明文件号码：" prop="ctid">
              <span>{{form.ctid ? form.ctid : '无'}}</span>
            </el-form-item>
          </el-row>
          <el-row v-show="isShowItem">
            <el-form-item label="交易行为主体名称/姓名：" prop="ctnm">
              <span>{{form.ctnm ? form.ctnm : '无'}}</span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="客户账号：" prop="ctac">
              <span>{{form.ctac ? form.ctac : '无'}}</span>
            </el-form-item>
          </el-row>
          <el-row v-show="isShowItem">
            <el-form-item label="银行账户卡类型：" prop="cbat">
              <el-select v-model="form.cbat" placeholder="" disabled>
                <el-option label="10借记卡" value="10借记卡"></el-option>
                <el-option label="20贷记卡" value="20贷记卡"></el-option>
                <el-option label="30准贷记卡" value="30准贷记卡"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row v-show="isShowItem">
            <el-form-item label="客户银行卡号码：" prop="cbcn">
              <span>{{form.cbcn ? form.cbcn : '无'}}</span>
            </el-form-item>
          </el-row>
        </div>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="onCancel">返 回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getViewInfo } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/notice'
import { dataFiled } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch.js'

export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    correctParams: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        industry: '',
        citp: '',
        correctAsk: '',
        correctLimitTime: '',
        ctac: '',
        ctid: '',
        reportBody: '',
        supplyEndTime: '',
        supplyStartTime: ''
      },
      citpOptions: [],
      isShowItem: false,
      correctId: '',
      nVisible: this.dialogVisible
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    dialogVisible(val) {
      if (val) this.getData()
    }
  },
  methods: {
    getData() {
      this.isShowItem = false
      getViewInfo(this.correctParams.correctId)
        .then(res => {
          if (res.code === 200) {
            this.form = res.data.report
            console.log('correctLimitTime', this.form.correctLimitTime)
            let type = ''
            if (this.form.industry === 'B' || this.form.industry === 'S' || this.form.industry === 'I' || this.form.industry === 'J' || this.form.industry === 'PM' || this.form.industry === 'RP' || this.form.industry === 'AF' || this.form.industry === 'ORG' || this.form.industry === 'LO' || this.form.industry === 'NO' || this.form.industry === 'ISP' || this.form.industry === 'NF') {
              this.isShowItem = false
              type = 'SFZJ'
            } else {
              this.isShowItem = true
              type = 'CITP'
            }
            this.getDataFiled(type)
          }
        })
        .catch()
    },
    getDataFiled(type) {
      dataFiled(type)
        .then(res => {
          if (res.code === 200) {
            this.citpOptions = res.data
          }
        })
        .catch()
    },
    onCancel() {
      this.nVisible = false
      this.$emit('dialogState', this.nVisible)
    }
  }
}
</script>

<style lang="scss">
.noticewrap {
  .title {
    padding-bottom: 15px;
    padding-left: 15px;
    font-weight: 500;
    font-size: 16px;
  }
  .inforow {
    padding-bottom: 15px;
    font-weight: bold;
  }
  .infoalign {
    text-align: right;
  }
  .dialog-footer {
    text-align: right;
  }
}
</style>
