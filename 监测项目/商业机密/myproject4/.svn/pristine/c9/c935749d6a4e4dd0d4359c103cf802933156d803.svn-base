<template>
  <div class="suspiciousfocusList1">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>详情</span>
      </div>
      <div class="text item">
        <el-form
          class="demo-form-inline"
          label-width="220px"
          style="margin-bottom:30px;"
          :model="regularForm"
          disabled
        >
          <el-row class="toggle" :gutter="20">
            <el-col :span="8">
               <el-form-item label="分支机构名称：" prop="branchM" label-width="170px">
               <el-select
              style="width:100%"
              v-model="regularForm.branchM"
              placeholder="请选择机构"
              clearable
            >
              <el-option
                v-for="(item,index) in localBankArr"
                :key="index"
                :value="item.codeId"
                :label="item.codeName"
              ></el-option>
            </el-select>
              </el-form-item>
              <!-- <el-form-item label="分支机构名称：" prop="branchM" label-width="170px">
                <el-input v-model="regularForm.branchM" ></el-input>
              </el-form-item> -->
            </el-col>
            <el-col :span="4">
              <el-form-item :inline="true" label-width="0px" prop="year">
                <el-input v-model="regularForm.year" style="width:80%"></el-input>
                <span>年</span>
                <!-- <el-input v-model="regularForm.quarter"  style="width:40%"  prop="quarter"></el-input>
                <span>季度</span>-->
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :inline="true" label-width="0px" prop="quarter">
                <!-- <el-input v-model="regularForm.year" style="width:40%" ></el-input>
                <span>年第</span>-->
                <!-- <span>第</span> -->
                <el-input v-model="regularForm.quarter" style="width:60%" prop="quarter"></el-input>
                <!-- <span>半年</span> -->
              </el-form-item>
            </el-col>
            <!-- <el-col :span="2" :offset="2">
              <el-form-item label prop="year" label-width="1px">
                <el-input v-model="regularForm.year" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label label-width="1px" style="margin-left:-15px">年第</el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label prop="quarter" label-width="1px">
                <el-input v-model="regularForm.quarter" style="margin-left:-40px" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label label-width="1px" style="margin-left:-55px">季度</el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="本期实际接收可疑报告份数：" prop="reportNum" label-width="210px">
                <el-input v-model="regularForm.reportNum" class="page-class"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          :model="formInline"
          ref="searchForm"
          class="demo-form-inline"
          label-width="120px"
          disabled
        >
          <template>
            <el-row class="toggle" :gutter="20">
              <el-col :span="12">
                <el-form-item label="可疑客户名称：" prop="name" label-width="170px">
                  <el-input v-model="formInline.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="可疑客户证件号码：" prop="certificateNum" label-width="140px">
                  <el-input v-model="formInline.certificateNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toggle" :gutter="20">
              <el-col :span="12">
                <el-form-item label="报告机构名称：" prop="reportM" label-width="170px">
                  <el-input v-model="formInline.reportM"></el-input>
                </el-form-item>
              </el-col>
							<el-col :span="12">
                <el-form-item label="处理时间：" prop="dealDate" label-width="140px">
                  <el-date-picker
                    style="width:100%"
                    v-model="formInline.dealDate"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toggle" :gutter="20">
							<el-col :span="12">
              <el-form-item label="报告接收情况：" prop="receptionSituation" label-width="170px">
                  <el-select v-model="formInline.receptionSituation">
                    <el-option
                      v-for="(item,index) in receiveArr"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理状态：" prop="dealStatus" label-width="140px">
                  <el-select v-model="formInline.dealStatus">
                    <el-option
                      v-for="(item,index) in stateArr"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toggle" :gutter="20">
              <el-col :span="12">
                <el-form-item label="涉罪可疑交易行为初判：" prop="preliminaryJudgement" label-width="170px">
                  <el-select v-model="formInline.preliminaryJudgement">
                    <el-option
                      v-for="(item,index) in dialogJudgmentData"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="接收部门名称：" prop="receiveDepartment" label-width="140px">
                  <el-input v-model="formInline.receiveDepartment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="toggle" :gutter="20">
              <el-col :span="24">
                <el-form-item label="判断理由：" prop="judgementReason" label-width="170px">
                  <el-input type="textarea" v-model="formInline.judgementReason" :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-form>
        <el-form :model="regularForm" class="demo-form-inline" label-width="170px" disabled>
          <el-col :span="8">
            <el-form-item label="填报人：" prop="fillUser">
              <el-input v-model="regularForm.fillUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审批人：" prop="approver" label-width="140px">
              <el-input v-model="regularForm.approver"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="contact">
              <el-input v-model="regularForm.contact"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div style="textAlign:center">
          <el-button type="primary" @click="last">上一客户</el-button>
          <el-button type="primary" @click="next">下一客户</el-button>
           <el-button type="primary" v-if="powers" @click="dialogFormVisible=true">审批</el-button>
          <el-button type="primary" @click="goback()">返回</el-button>
        </div>
<el-dialog title="审核情况" :visible.sync="dialogFormVisible">
  <el-form ref="dialogforms" :model="dialogforms">
    <el-form-item label="审核意见" :label-width="formLabelWidth" prop="approveState" :rules="[{ required: true, message: '请选择审核意见', trigger: 'change' }]">
      <el-select v-model="dialogforms.approveState" clearable  placeholder="请选择活动区域">
        <el-option label="通过" value="1"></el-option>
        <el-option label="不通过" value="2"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="审核内容" :label-width="formLabelWidth">
      <el-input v-model="dialogforms.approveText"  type="textarea"
  :rows="3"
  placeholder="请输入内容" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">关 闭</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </div>
</el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
import { branch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/list.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { viewRoster, examine } from '@/api/sys-monitoringAnalysis/suspiciousCheck/details.js'
import { getPower } from '@/api/sys-monitoringAnalysis/suspiciousCheck/index.js'
export default {
  data() {
    return {
      keySusId: '',
      localBankArr: [],
      powers: false,
      step: 0,
      lengths: 0,
      dialogforms: {
        approveState: '',
        approveText: ''
      },
      formLabelWidth: '140px',
      dialogFormVisible: false,
      dialogJudgmentData: [],
      receiveArr: [],
      stateArr: [],
      regularForm: {
        branchM: '',
        year: '',
        quarter: '',
        reportNum: '',
        fillUser: '',
        approver: '',
        contact: ''
      },
      formInline: {
        // branchM: '',
        // reportNum: '',
        receptionSituation: '',
        dealDate: '',
        reportM: '',
        receiveDepartment: '',
        dealStatus: '',
        judgementReason: '',
        // contact: '',
        // approver: '',
        // fillUser: '',
        preliminaryJudgement: '',
        name: '',
        certificateNum: ''
        // year: '',
        // quarter: ''
      }
    }
  },
  created() {

  },
  mounted() {
    this.getDetail()
    this.getBranch()
    this.getPower()
    this.getDictionary('KEYSUSREC')
    this.getDictionary('TOSC')
    this.getDictionary('KEYSUSSTATUS')
  },
  methods: {
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJGD' }).then(res => {
        if (res.code === 200) {
          const arr = res.data.list
          arr.forEach(el => {
            if (el.codeId === 'A1000131000023') {
              el.codeName = '上海总部'
            }
          })
          this.localBankArr = arr
        }
      })
    },
    async getPower() {
      const res = await getPower()
      this.powers = res.message === '是'
      console.log(res, this.powers, 2222)
    },
    // 返回
    goback() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.ifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.dialogJudgmentData = res.data
              // console.log(this.dialogJudgmentData)

              break
            case 'KEYSUSREC':
              this.receiveArr = res.data
              break
            case 'KEYSUSSTATUS':
              this.stateArr = res.data
              break
            default:
              break
          }
        }
      })
    },
    submit() {
      this.$refs.dialogforms.validate(async(valid) => {
        if (valid) {
          var res = await examine(this.dialogforms.approveState, this.dialogforms.approveText, this.keySusId)
          console.log(res)
          this.dialogFormVisible = false
          this.$message.success(res.data)
          this.goback()
        } else {
          return false
        }
      })
    },
    // 表单回显
    getDetail() {
      console.log(this.$route.query, '0000000000')
      const id = this.$route.query.msg ? this.$route.query.msg.id : this.$route.query.id

      if (id) {
        viewRoster(id).then(res => {
          if (res.code === 200) {
            switch (res.data.quarter) {
              case '0':
                res.data.quarter = '全年'
                break
              case '1':
                res.data.quarter = '上半年'
                break
              case '2':
                res.data.quarter = '下半年'
                break
              case '3':
                res.data.quarter = '三'
                break
              case '4':
                res.data.quarter = '四'
                break
              default:
                break
            }
            this.keySusId = res.data.keySusId
            this.regularForm = res.data
            this.formInline = res.data.keySusMainDOList[this.step]
            this.lengths = res.data.keySusMainDOList.length
          }
        })
      }
    },
    last() {
      if (this.step < 1) {
        this.$message({
          message: '已经是第一条啦',
          type: 'warning',
          duration: 6000
        })
      } else {
        this.step--
        this.getDetail()
      }
    },
    next() {
      if (this.step < this.lengths - 1) {
        this.step++
        this.getDetail()
      } else {
        this.$message({
          message: '已经是最后一条啦',
          type: 'warning',
          duration: 6000
        })
      }
    }
  }
}
</script>
<style lang="scss">
.suspiciousfocusList1 {
  .el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
     color: #000000;
    cursor: not-allowed;
}
.el-textarea.is-disabled .el-textarea__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
      color: #000000;
    cursor: not-allowed;
}
  .el-date-editor--date {
    min-width: 100% !important;
  }
  .el-date-editor--daterange {
    min-width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .rangeData {
    .el-date-editor--daterange {
      min-width: 100%;
    }
  }
  @media screen and(max-width: 1400px) {
    .toggle {
      .el-col-8 {
        width: 50%;
      }
    }
  }
}
.input-class {
  .el-input__inner {
    width: 286.33px;
  }
}
</style>