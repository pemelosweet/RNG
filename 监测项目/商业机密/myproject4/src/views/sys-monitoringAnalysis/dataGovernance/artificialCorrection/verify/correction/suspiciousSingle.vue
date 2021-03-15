<template>
  <div class="suspicious">

    <el-form :model="suspForm" ref="suspForm" :rules="suspRules" label-width="190px">
      <!-- 第二块 -->
      <el-row :gutter="20">
        <el-col :span="24" style="font-weight:bold; font-size:16px; margin:0 0 15px 22px;">基本信息</el-col>
        <el-col :span="24">
          <el-form-item label="报告机构：" prop="rinm">
            <el-autocomplete v-model="suspForm.rinm" value-key="rinm" placeholder="报告机构" v-if="isView" :fetch-suggestions="querySearchRinm" :trigger-on-focus="false" @select="handleRinmSelect" style="width: 60%;"></el-autocomplete>
            <!-- <el-autocomplete v-model="suspForm.rinm" value-key="rinm" placeholder="报告机构编码" v-if="isView" :fetch-suggestions="querySearchRinm" :trigger-on-focus="false" @select="handleRinmSelect"></el-autocomplete> -->
            <span v-else>{{ suspForm.rinm }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="更正完成时限：" prop="correctLimitTime">
            <el-date-picker v-model="suspForm.correctLimitTime" value-format="yyyyMMdd" format="yyyy-MM-dd" type="date" placeholder="" v-if="isView" :picker-options="updataPickerOptions">
            </el-date-picker>
            <el-date-picker v-else disabled v-model="suspForm.correctLimitTime" value-format="yyyyMMdd" format="yyyy-MM-dd" type="date" placeholder="" :picker-options="updataPickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="更正填报要求：" prop="correctAsk">
            <el-input type="textarea" v-model="suspForm.correctAsk" v-if="isView" placeholder="最大长度为1000位" maxlength="1000" show-word-limit rows="5"></el-input>
            <span v-else>{{ suspForm.correctAsk }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="原可疑交易报告报文名：" prop="ornm">
            <el-input v-model="suspForm.ornm" style="width: 60%;" v-if="isView"></el-input>
            <span v-else>{{ suspForm.ornm }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="待更正可疑交易总数：" prop="askNum"> 
            <el-input v-if="isView" type="text" style="width: 60%;" v-model="suspForm.askNum"  placeholder="待更正可疑交易总数不能大于1000"></el-input>
            <span v-else>{{ suspForm.askNum }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="font-weight:bold; font-size:16px; margin:0 0 15px 22px;">交易信息</el-col>
        <el-table :data="suspForm.list">
          <el-table-column label="可疑交易在原可疑交易报告中的序号" prop="tsno" min-width="100">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+ scope.$index+'.tsno'" :rules="suspRules.tsno">
                <el-input v-model="scope.row.tsno" v-if="isView"></el-input>
                <span v-if="!isView">{{scope.row.tsno}}</span>
              </el-form-item>
            </template>
          </el-table-column>  
          <el-table-column label="待更正可疑交易发生日期" min-width="200" prop="tstm">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+ scope.$index+'.tstm'" :rules="suspRules.tstm">
                <el-date-picker v-model="scope.row.tstm" type="datetime" value-format="yyyyMMddHHmmss" format="yyyy年MM月dd日 HH时mm分ss秒" placeholder="选择日期" v-if="isView" style="width: 100%;">
                </el-date-picker>
                <el-date-picker v-model="scope.row.tstm" type="datetime" value-format="yyyyMMddHHmmss" format="yyyy年MM月dd日 HH时mm分ss秒" placeholder="选择日期" v-if="!isView" disabled style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="待更正字段" prop="item" min-width="300">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.item'" :rules="suspRules.item" class="change_length">
                <el-select multiple placeholder="请选择" v-model="scope.row.item" v-if="isView" style="width: 100%;">
                  <el-option v-for="(item, index) in filedOptions" :key="index" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
                <el-select multiple placeholder="请选择" v-model="scope.row.item" disabled v-if="!isView" style="width: 100%;">
                  <el-option v-for="(item, index) in filedOptions" :key="index" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="isView" width="100px">
            <template slot-scope="scope" v-if="scope.$index !== 0">
              <el-button type="text" @click="removeRow(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addRow" v-if="isView" style="margin-top: 10px;">增加可疑交易</el-button>
        <div class="dialog-footer" v-if="isView">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="callWorkFlow" :loading="spLoading">提交审批</el-button>
        </div>
        <div class="dialog-footer" v-if="!isView">
          <el-button @click="onCancel">返 回</el-button>
        </div>
      </el-row>
      <!-- <div v-else style="text-align: center; height:100px; line-height: 100px;">暂无数据</div> -->
    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isValidInput, isValidBlank, onlyNumberValidate } from '@/utils/formValidate.js'
import {
  addsuspData,
  addOtherSuspData,
  getFiled
} from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch'
import { getRinmList } from '@/api/sys-monitoringAnalysis/statisticForm/large.js'
import { getViewInfo } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/notice.js'

export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    correctParams: {
      type: Object
    },
    closeLoading: {
      type: Boolean
    }
  },
  data() {
    return {
      updataPickerOptions: { // 更正时间 选中今天及以后
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      suspVisible: this.dialogVisible,
      rinmOptions: [], // 报告机构列表
      isView: false,
      filedOptions: [],
      suspForm: {
        rinm: '',
        ricd: '',
        correctLimitTime: '',
        correctAsk: '',
        ornm: '',
        askNum: '',
        list: [
          {
            tsno: '',
            tstm: '',
            item: []
          }
        ]
      },
      suspRules: {
        rinm: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        // ricd: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        ornm: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' },
          { max: 50, message: '最大长度为50位', trigger: 'blur' }
        ],
        askNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: onlyNumberValidate, trigger: 'blur' }
        ],
        // tsno: [{ max: 10, message: '最大长度为10位', trigger: 'blur' }],
        correctAsk: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' },
          { max: 1000, message: '最大长度为1000位', trigger: 'blur' }
        ],
        correctLimitTime: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        tsno: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' },
          { max: 10, message: '最大长度为10位', trigger: 'blur' }
        ],
        tstm: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        item: [{ required: true, message: '内容不能为空', trigger: 'change' }]
      },
      listObj: {},
      tradeId: null,
      correctId: null,
      cTitle: null,
      tempDataSrc: '',
      tempIndustry: '',
      spLoading: false
    }
  },
  computed: {
    ...mapGetters(['roles', 'businessFlag', 'workFlow2business'])
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    },
    dialogVisible(val) {
      if (val) this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    callWorkFlow() {
      this.$refs['suspForm'].validate(val => {
        if (val) {
          if (this.suspForm.list.length.toString() !== this.suspForm.askNum.toString()) {
            this.$message({
              type: 'error',
              message: '待更正可疑交易总数与交易信息不匹配,请仔细检查'
            })
            return false
          } else {
            // this.suspVisible = false
            // this.$emit('dialogState', this.suspVisible)
            setTimeout(() => {
              this.$store.dispatch('workFlow', { configCode: 'suspectCorrect' })
              this.$store.dispatch('openWorkFlow', true)
            }, 500)
          }
        } else {
          return false
        }
      })
    },
    getData() {
      this.spLoading = this.closeLoading
      this.tradeId = this.correctParams.tradeId
      this.correctId = this.correctParams.correctId
      this.correctType = this.correctParams.correctType
      this.cTitle = this.correctParams.cTitle
      this.tempIndustry = this.correctParams.industry
      this.resetForm('suspForm')

      this.isView = false
      this.tempDataSrc = ''
      if (this.cTitle === '0') {
        this.isView = false
      } else {
        this.isView = true
      }
      this.getViewInfo()
    },
    getViewInfo() {
      getViewInfo(this.correctId).then(res => {
        if (res.code === 200) {
          const obj = {
            rinm: res.data.report.reportBody,
            ricd: res.data.report.reportCode,
            correctLimitTime: res.data.report.correctLimitTime,
            correctAsk: res.data.report.correctAsk,
            askNum: res.data.report.list.length,
            ornm: res.data.report.ornm,
            list: []
          }
          if (res.data.report.list.length !== 0) {
            res.data.report.list.forEach(el => {
              const temObj = {
                tsno: el.tsno,
                tstm: el.stdt,
                item: el.item
              }
              obj.list.push(temObj)
            })
          }
          this.suspForm = obj
          this.tempDataSrc = res.data.report.dataSrc
          this.getFiledInfo(this.suspForm.ricd, this.tempDataSrc)
        }
      }).catch()
    },
    querySearchRinm(query, cb) {
      if (query !== '') {
        const paramsObj = {
          region: 'all',
          rinm: query
        }
        getRinmList(paramsObj).then(res => {
          if (res.code === 200) {
            cb(res.data)
          }
        })
      } else {
        // this.rinmData = []
      }
    },
    handleRinmSelect(item) {
      if (item) {
        this.suspForm.ricd = item.ricd
        this.getFiledInfo(this.suspForm.ricd)
      }
    },
    getFiledInfo(ricd, dataSrc) {
      // 获取待更正字段
      const paramsObj = {
        ricd: ricd,
        tradeType: '1',
        dataSrc: dataSrc
      }
      getFiled(paramsObj)
        .then(res => {
          // 获取字段列表
          if (res.code === 200) {
            this.filedOptions = res.data
          }
        })
        .catch(() => {})
    },
    onCancel() {
      this.spLoading = false
      this.suspVisible = false
      this.$emit('dialogState', this.suspVisible)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    nextStep() {
      this.correctSubmit()
    },
    correctSubmit() {
      this.spLoading = true
      const paramsObj = {
        correctType: this.correctType,
        tradeId: this.tradeId,
        reportCode: this.suspForm.ricd,
        correctLimitTime: this.suspForm.correctLimitTime,
        correctAsk: this.suspForm.correctAsk,
        ornm: this.suspForm.ornm,
        suspectTrades: this.suspForm.list,
        workflow: this.workFlow2business
      }
      addsuspData(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.spLoading = false
            this.suspVisible = false
            this.$emit('dialogState', this.suspVisible)

            this.$message({
              type: 'success',
              message: '提交成功！'
            })
            this.resetForm('suspForm')
          } else {
            this.spLoading = false
            this.$message.error('提交失败！')
          }
        })
        .catch(() => {
          this.spLoading = false
        })
    },
    otherCorrectSubmit() {
      this.suspForm.list.forEach(e => {
        const fileds = e.item
        console.log(fileds)
        this.itemObj = {
          item: fileds
        }
      })

      const paramsObj = {
        correctType: this.correctType,
        tradeId: this.tradeId,
        reportCode: this.suspForm.ricd,
        problemSource: this.correctParams.organ,
        correctLimitTime: this.suspForm.correctLimitTime,
        correctAsk: this.suspForm.correctAsk,
        industry: this.tempIndustry,
        ornm: this.suspForm.ornm,
        suspectTrade: this.itemObj,
        workflow: this.workFlow2business
      }
      addOtherSuspData(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.suspVisible = false
            this.$emit('dialogState', this.suspVisible)

            this.$message({
              type: 'success',
              message: '提交成功！'
            })
          } else {
            this.$message.error('提交失败！')
          }
        })
        .catch(() => {})
    },
    addRow() {
      var _data = {
        tsno: '',
        tstm: ''
      }
      this.suspForm.list.push(_data)
      const len = this.suspForm.list.length
      if (len > 1000) {
        this.suspForm.list.splice(Number(len - 1), 1)
        this.$message({
          message: '最多可以添加1000条交易',
          type: 'warning'
        })
      }
    },
    removeRow(scope) {
      const index = scope.$index
      this.$confirm('确定要删除此交易吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.suspForm.list.splice(index, 1)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.suspicious {
  .el-table__header-wrapper .cell::before {
    content: '*';
    color: #f00;
    margin-right: 4px;
  }
  .el-date-editor--datetime {
    width: 250px !important;
  }
  .inforow {
    padding-bottom: 15px;
    font-weight: bold;
  }
  .dialog-footer {
    padding-top: 10px;
    text-align: right;
  }
  .el-table .el-table__row td {
    .cell {
      height: 100%;
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content {
          margin-left: 0px !important;
        }
      }
    }
  }
  .change_length {
    .el-select__tags >span {
      display: block!important;
      width: 100%;
    } 
    .el-form-item__content {
      margin-left: 0!important;
    }
  }
}
</style>
