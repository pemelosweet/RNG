<template>
  <div class="rosterManageanalyst-handleImport">
    <el-card>
      <div slot="header">
        <span>录入标注名单信息</span>
      </div>

      <el-form :model="form" label-width="135px" ref="ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="主体名称：">
              <span>{{form.subjectName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="触发点：">
              <span>{{form.triggerPointeger}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分析员：">
              <span>{{form.creUser}}</span>
            </el-form-item>
          </el-col>
          </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="certificateType">
              <span>{{form.certificateType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" prop="certificateNum">
              <span>{{form.certificateNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="初次标注：">
              <span>{{form.firstMarkDate}}</span>
            </el-form-item>
          </el-col>
          </el-row>
        <el-row>
         <el-col :span="8">
            <el-form-item label="标注状态：">
              <span>{{form.markState}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可疑类型：">
              <span>{{form.suspiciousType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可疑程度：">
              <span>{{form.suspiciousDegree |suspiciousDegree}}</span>
            </el-form-item>
          </el-col>
          </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="最后标注：">
              <span>{{form.lastMarkDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国籍/地区：">
              <span>{{form.nationality}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="移送状态：">
              <span>{{form.transferState}}</span>
            </el-form-item>
          </el-col>
          </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="移送编码：">
              <span>{{form.transferNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主体类型：">
              <span>{{form.subjectType}}</span>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="建议：">
              <el-input v-model="form.suggest" type="textarea" :rows="3" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input v-model="form.remarks" type="textarea" :rows="5" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" :key="index" v-for="(item,index) in form.susAccountDOList">
            <el-col :span="24">
              <el-form-item :label="`可疑客户-${index+1}：`">
                <span>{{item.suspiciousAccout}}</span>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div class="btnalign" style="textAlign:center">
          <el-button type="primary" @click="goback">返回</el-button>
      </div>
    </el-card>
  </div>

</template>

<script>
import { viewRoster } from '@/api/sys-monitoringAnalysis/roster-warning/roster-analyze.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { getsourceBusinessArr } from '@/api/sys-monitoringAnalysis/roster-warning/levelConfiguration.js'
export default {
  props: {
    nameListXTF: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  filters: {
    suspiciousDegree(val) {
      switch (val) {
        case '1':
          return '特别可疑'
        case '2':
          return '重点可疑'
        case '3':
          return '一般可疑'
        default:
          break
      }
    }
  },
  data() {
    return {
      form: {
        subjectType: '',
        subjectName: '',
        creUser: '',
        triggerPointeger: '',
        certificateNum: '',
        markState: '',
        firstMarkDate: '',
        certificateType: '',
        suspiciousType: '',
        lastMarkDate: '',
        nationality: '',
        suspiciousDegree: '',
        dense: '',
        transferState: '',
        transferNum: '',
        suggest: '',
        remarks: '',
        susAccountDOList: []
      },
      nationalityArr: [],
      subjectTypeOption: [],
      noteStatus: [],
      analyze: '',
      suspicious: [
        // 可疑账户
        {
          lable: '可疑客户',
          value: ''
        }
      ]
    }
  },
  computed: {
    paramsObj() {
      const obj = JSON.parse(JSON.stringify(this.form))
      delete obj.firstMarkDate
      delete obj.lastMarkDate
      const tempArr = []
      this.suspicious.forEach(e => {
        tempArr.push(e.value)
      })
      obj.suspiciousAccout = tempArr.join()
      return obj
    }
  },
  methods: {
    goback() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.ifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.push({ name: 'rosterWarning_rosterManageanalyst' })
    },
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'COUNTRY':
              this.nationalityArr = res.data
              this.nationalityArr.forEach(e => {
                if (this.form.nationality === e.numCode) {
                  this.form.nationality = e.chSName
                }
              })
              break
            case 'TAGGS':
              this.noteStatus = res.data
              break
            default:
              break
          }
        }
      })
    },
    getsourceBusinessArr() {
      var paramsObj = {
        pageNum: 1,
        pageSize: 9999
      }
      getsourceBusinessArr(paramsObj, '2').then(res => {
        if (res.code === 200) {
          this.subjectTypeOption = res.data.list
        }
      })
    },
    // 请求单条数据
    echoRoster(params) {
      viewRoster(params).then(res => {
        if (res.code === 200) {
          for (var key in this.form) {
            this.form[key] = res.data[key]
          }
          this.getDictionary('COUNTRY')
          this.subjectTypeOption.forEach(res => {
            if (this.form.subjectType === res.codeId) {
              this.form.subjectType = res.codeName
            }
          })
          this.noteStatus.forEach(e => {
            if (this.form.markState === e.codeId) {
              this.form.markState = e.codeName
            }
          })
        }
      })
    }
  },
  mounted() {
    this.getDictionary('TAGGS')
    this.getsourceBusinessArr()
    if (this.nameListXTF.typeXTF === 'typeXTF') {
      this.echoRoster(this.nameListXTF.id)
    }
    if (this.$route.params.id) {
      this.echoRoster(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
.rosterManageanalyst-handleImport {
  .el-select {
    width: 100%;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color:white;
    color: #303133;
  }
  .el-col-8 {
    height: 55px;
  }
  @media screen and(max-width: 1400px) {
    .el-col-8 {
      width: 50%;
    }
  }
  span{
    word-break: break-all; 
    word-wrap: break-word;
  }
}
</style>
