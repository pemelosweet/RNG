<template>
  <div class="rosterManageanalyst-handleImport">
    <el-form :model="form" label-width="135px" :rules="rules" ref="ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="主体名称：" prop="subjectName">
            <el-input v-model="form.subjectName" :maxlength="100" placeholder="最大长度为100位"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="触发点：" prop="triggerPointeger">
            <el-select
              v-model="form.triggerPointeger"
              filterable clearable>
              <el-option
                v-for="(item,index) in triggerPointegerArr"
                :key="index"
                :label="item.codeName"
                :value="item.codeId"></el-option>
            </el-select>
          </el-form-item> 
        </el-col>

        <el-col :span="8">
          <el-form-item label="分析员：">
            <el-input
              disabled
              placeholder="分析员"
              v-model="analyze"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="证件类型："
            prop="certificateType">
            <el-select
              v-model="form.certificateType"
              placeholder="证件类型"
              filterable @change="handleCertChange" clearable>
              <el-option
                v-for="(item,index) in certificateTypeArr"
                :key="index"
                :label="item.codeName"
                :value="item.codeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="标注状态：" prop="markState">
             <el-select v-model="form.markState" placeholder="标注状态" filterable clearable>
                <el-option v-for="(item,index) in noteStatus" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="初次标注：" prop="firstMarkDate">
            <el-date-picker
              disabled
              v-model="form.firstMarkDate"
              value-format="yyyy-MM-dd"
              placeholder=""
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="证件号码：" prop="certificateNum">
            <el-input v-model="form.certificateNum" :maxlength="32" placeholder="最大长度为32位"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="可疑类型：" prop="suspiciousType">
            <el-select
              v-model="form.suspiciousType"
              filterable clearable
            >
              <el-option
                v-for="(item,index) in suspiciousTypeArr"
                :key="index"
                :label="item.codeName"
                :value="item.codeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="最后标注：" prop="lastMarkDate">
            <el-date-picker
              disabled
              v-model="form.lastMarkDate"
              value-format="yyyy-MM-dd"
              placeholder=""
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国籍/地区：" prop="nationality">
            <el-select v-model="form.nationality" placeholder="请选择国籍/地区" clearable>
              <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="移送状态：" prop="transferState">
            <el-input
              v-model="form.transferState"
              placeholder="最大长度为50位" :maxlength="50"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="建议：" prop="suggest">
            <el-input :rows="6" v-model.trim="form.suggest" @input="suggestInput" resize="none" type="textarea" :maxlength="1000" placeholder="最大长度为1000位"></el-input>
            <span style="float:right;color:#999;">{{suggestRemnant}}/1000</span>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-for="(item,index) in form.suspicious">
        <el-row
          :gutter="20"
          :key="index">
          <el-col :span="14">      
            <el-form-item :label="item.lable +' - '+ (index+1)+ '：'" :prop="'suspicious.' + index + '.value'" :rules="getSuspious()">
              <el-input v-model="item.value" placeholder="最大长度为64位" maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-button size="small" type="primary" icon="el-icon-plus" plain @click="addItem" v-if="form.suspicious.length===1||index==form.suspicious.length-1"></el-button>
          <el-button
            type="warning"
            plain
            @click="delItem(index)"
            v-if="form.suspicious.length>1"
            icon="el-icon-minus"
          ></el-button>
        </el-row>
      </template>

      <el-row>
        <el-form-item label="备注：" prop="remarks">
          <el-input type="textarea" :rows="6" @input="remarksInput" resize="none"
            v-model.trim="form.remarks" :maxlength="1000" placeholder="最大长度为1000位"></el-input>
          <span style="float:right;color:#999;">{{remarksRemnant}}/1000</span>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="btnalign" style="textAlign:center">
      <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">确定</el-button>
      <el-button type="default" @click="backTo">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isValidInput, delDataValidInput } from '@/utils/formValidate.js'
import { country } from '@/api/common/citys'
import { haddleAddRoster } from '@/api/sys-monitoringAnalysis/roster-warning/roster-analyze.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  props: {
    markObj: Object,
    marklistVisible: Boolean
  },
  data() {
    function currentDay(params) {
      const oDate = new Date()
      const y = oDate.getFullYear()
      const m = oDate.getMonth() + 1
      const d = oDate.getDate()
      return y + '-' + m + '-' + d
    }
    return {
      form: {
        subjectName: '',
        triggerPointeger: '',
        certificateNum: '',
        markState: '',
        firstMarkDate: currentDay(),
        certificateType: '',
        suspiciousType: '',
        lastMarkDate: currentDay(),
        nationality: '',
        suspiciousDegree: '',
        dense: '',
        transferState: '',
        transferNum: '',
        suggest: '',
        remarks: '',
        suspicious: [
        // 可疑账户
          {
            lable: '可疑客户',
            value: ''
          }
        ]
      },
      loading: false,
      countryData: [],
      markVisible: this.marklistVisible,
      analyze: '',
      noteStatus: [], // 标注状态
      triggerPointegerArr: [], // 触发点
      certificateTypeArr: [], // 证件类型
      suspiciousTypeArr: [], // 可疑类型
      // suspiciousDegreeArr: [], // 可疑程度
      rules: {
        subjectName: [{ required: false, message: '内容不能为空', trigger: 'blur' }, { validator: delDataValidInput, trigger: 'blur' }, { max: 100, message: '最大长度为100位', trigger: 'blur' }],
        certificateType: [{ required: true, message: '内容不能为空', trigger: 'change' }, { max: 32, message: '最大长度为32位', trigger: 'blur' }],
        certificateNum: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { max: 32, message: '最多长度为32位', trigger: 'blur' }],
        transferState: [{ required: false, message: '内容不能为空', trigger: 'blur' }, { validator: isValidInput, trigger: 'blur' }, { max: 50, message: '最大长度为50位', trigger: 'blur' }],
        nationality: [{ required: false, message: '内容不能为空', trigger: 'blur' }, { validator: isValidInput, trigger: 'blur' }, { max: 64, message: '最大长度为64位', trigger: 'blur' }],
        remarks: [{ required: false, message: '内容不能为空', trigger: 'blur' }, { max: 1000, message: '最大长度为1000位', trigger: 'blur' }],
        suggest: [{ required: false, message: '内容不能为空', trigger: 'blur' }, { max: 1000, message: '最大长度为1000位', trigger: 'blur' }]
      },
      suggestRemnant: 1000, // 记录textarea字数
      remarksRemnant: 1000 // 记录textarea字数
    }
  },
  computed: {
    ...mapGetters(['name']),
    paramsObj() {
      const obj = JSON.parse(JSON.stringify(this.form))
      delete obj.firstMarkDate
      delete obj.lastMarkDate
      const tempArr = []
      this.form.suspicious.forEach(e => {
        tempArr.push(e.value)
      })
      obj.suspiciousAccout = tempArr.join()
      return obj
    }
  },
  watch: {
    marklistVisible(val) {
      if (val) this.getData()
    }
  },
  mounted() {
    this.analyze = this.name
    this.getData()
  },
  methods: {
    getData() {
      this.getDictionary('TPOINT')
      this.getDictionary('SFZJ')
      this.getDictionary('SUSTYPE')
      this.getDictionary('DBDE')
      this.getDictionary('TAGGS')
      this.getCountry()
      this.$refs['ruleForm'].resetFields()
      this.form.suspicious = [{
        lable: '可疑客户',
        value: ''
      }]
      this.suggestRemnant = 1000
      this.remarksRemnant = 1000
      this.form.subjectName = this.markObj.subJectName // 主体名称
      this.form.certificateNum = this.markObj.documentNumber // 主体证件号
      this.form.certificateType = this.markObj.documentType
      this.form.nationality = this.markObj.nationality
    },
    getSuspious() {
      const R = [{ max: 64, message: '最大长度为64位', trigger: 'blur' }, { validator: isValidInput, trigger: 'blur' }]
      return R
    },
    // 获取省份
    getCountry() {
      country().then(res => {
        if (res.code === 200) {
          this.countryData = res.data.list
        }
      })
    },
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TAGGS':
              this.noteStatus = res.data
              break
            case 'TPOINT':
              this.triggerPointegerArr = res.data
              break
            case 'SFZJ':
              this.certificateTypeArr = res.data
              break
            case 'SUSTYPE':
              this.suspiciousTypeArr = res.data
              break
            case 'DBDE':
              this.suspiciousDegreeArr = res.data
              break

            default:
              break
          }
        }
      })
    },
    // 表单提交验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          haddleAddRoster(this.paramsObj)
            .then(res => {
              if (res.code === 200) {
                this.loading = false
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.markVisible = false
                this.$emit('setMarkVisible', this.markVisible)
              } else {
                this.$confirm(res.message, '提示', {
                  showCancelButton: false,
                  type: 'error'
                }).then()
                  .catch()
                this.loading = false
              }
            })
            .catch((res) => {
              this.$confirm(res.message, '提示', {
                showCancelButton: false,
                type: 'error'
              }).then()
                .catch()
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleCertChange(val) {
      if (val === '110001' || val === '110003') {
        this.rules.certificateNum = []
        this.rules.certificateNum.push({ required: true, message: '请输入证件号码', trigger: 'blur' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式有误！', trigger: 'blur' })
      } else {
        this.rules.certificateNum = []
        this.rules.certificateNum.push({ required: true, message: '内容不能为空', trigger: 'blur' }, { max: 32, message: '最大长度为32位', trigger: 'blur' })
      }
    },
    // 添加一条可疑账户
    addItem() {
      if (this.form.suspicious.length < 10) {
        this.form.suspicious.push({
          lable: '可疑客户',
          value: ''
        })
      } else {
        this.$confirm('最多可添加10个可疑账户', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      }
    },
    // 删除一条可疑帐号
    delItem(index) {
      this.form.suspicious.splice(index, 1)
    },
    // 回显名单方法
    echoRoster(obj) {
      for (var key in this.form) {
        for (var key2 in obj) {
          if (key === key2) {
            this.form[key] = obj[key2]
          }
        }
      }
    },
    suggestInput() {
      var txtVal = this.form.suggest.length
      this.suggestRemnant = 1000 - txtVal
    },
    remarksInput() {
      const txtVal = this.form.remarks.length
      this.remarksRemnant = 1000 - txtVal
    },
    backTo() {
      this.markVisible = false
      this.$emit('setMarkVisible', this.markVisible)
    }
  }
}
</script>

<style lang="scss">
.rosterManageanalyst-handleImport {
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    min-width: 100%;
  }
  .el-col-8 {
    height: 55px;
  }
  @media screen and(max-width: 1400px) {
    .el-col-8 {
      width: 50%;
    }
  }
}
</style>
