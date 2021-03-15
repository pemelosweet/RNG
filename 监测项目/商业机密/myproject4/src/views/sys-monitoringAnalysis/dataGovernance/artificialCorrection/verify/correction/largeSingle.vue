<template>
  <div class="largewrap">

    <el-form :model="largeForm" ref="largeForm" :rules="largeRules" label-width="200px">
      <!-- 第二块 -->
      <el-row :gutter="20">
        <el-col :span="24" style="font-weight:bold; font-size:16px; margin:0 0 15px 22px;">基本信息</el-col>
        <el-col :span="24">
          <el-form-item label="报告机构：" prop="rinm">
            <el-autocomplete v-model="largeForm.rinm" value-key="rinm" placeholder="报告机构" v-if="isView" :fetch-suggestions="querySearchRinm" :trigger-on-focus="false" @select="handleRinmSelect" style="width: 60%;"></el-autocomplete>
            <span v-if="!isView">{{ largeForm.rinm }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="更正完成时限：" prop="correctLimitTime">
            <el-date-picker v-model="largeForm.correctLimitTime" value-format="yyyy-MM-dd" type="date" placeholder="选择更正完成时限" v-if="isView" :picker-options="updataPickerOptions">
            </el-date-picker>
            <el-date-picker v-if="!isView" v-model="largeForm.correctLimitTime" value-format="yyyyMMdd" format="yyyy-MM-dd" type="date" placeholder="选择更正完成时限" :picker-options="updataPickerOptions" disabled>
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="更正填报要求：" prop="correctAsk">
            <el-input type="textarea" v-model="largeForm.correctAsk" v-if="isView" placeholder="最大长度为1000位" maxlength="1000" show-word-limit rows="5"></el-input>
            <span v-if="!isView">{{ largeForm.correctAsk }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="待更正大额交易总数：" prop="askNum">
            <el-input v-if="isView" type="text" v-model="largeForm.askNum" maxlength="1" placeholder="待更正可疑交易总数不能大于5"></el-input>
            <span v-if="!isView">{{ largeForm.askNum }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="24" style="font-weight:bold; font-size:16px; margin:0 0 15px 22px;">交易信息</el-col>
        <el-table :data="largeForm.list">
          <el-table-column label="原客户号" min-width="120" prop="ocnm">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.ocnm'" :rules="largeRules.ocnm">
                <el-input v-model="scope.row.ocnm" v-if="isView" placeholder="最大长度为32位" maxlength="32"></el-input>
                <span v-if="!isView">{{scope.row.ocnm}}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="原大额交易发生日期" min-width="200" prop="otdt">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.otdt'" :rules="largeRules.otdt">
                <el-date-picker v-model="scope.row.otdt" type="date"  value-format="yyyyMMdd" format="yyyy-MM-dd" placeholder="选择日期" v-if="isView">
                </el-date-picker>
                <el-date-picker v-if="!isView" disabled v-model="scope.row.otdt" type="date"  value-format="yyyyMMdd" format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="原大额交易特征代码" width="110" prop="otcd">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.otcd'" :rules="largeRules.otcd">
                <el-select v-model="scope.row.otcd" v-if="isView" style="width: 100%;">
                  <el-option v-for="(item,index) in largeOptions" :label="item.codeId" :value="item.codeId" :key="index"></el-option>
                </el-select>
                <el-select v-model="scope.row.otcd"  v-if="!isView" disabled style="width: 100%;">
                  <el-option v-for="(item,index) in largeOptions" :label="item.codeId" :value="item.codeId" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="原业务标识号" prop="otic" min-width="160">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.otic'" :rules="largeRules.otic">
                <el-input v-model="scope.row.otic" v-if="isView" placeholder="最大长度为256位" maxlength="256"></el-input>
                <span v-if="!isView">{{scope.row.otic}}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="待更正字段" prop="item" min-width="300">
            <template slot-scope="scope">
              <el-form-item :prop="'list.'+scope.$index+'.item'" :rules="largeRules.item" class="change_length">
                <el-select multiple placeholder="请选择" v-model="scope.row.item" v-if="isView" style="width: 100%;">
                  <el-option v-for="(item, index) in filedOptions" :key="index" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
                <el-select multiple placeholder="请选择" v-model="scope.row.item" v-if="!isView" disabled style="width: 100%;">
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
        <el-button type="primary" @click="addRow" v-if="isAddTradeBtn" style="margin-top: 10px;">增加大额交易</el-button>
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
import { isValidInput, isValidBlank, onlyNumberValidate } from '@/utils/formValidate.js'
import {
  addCorrectData,
  addOtherCorrectData,
  getFiled
} from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch'
import { getRinmList } from '@/api/sys-monitoringAnalysis/statisticForm/large.js'
import { getViewInfo } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/notice.js'
import { dataTask } from '@/api/sys-monitoringAnalysis/dataGovernance/crossbodyAlignment/index'
import { mapGetters } from 'vuex'

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
      largeVisible: this.dialogVisible,
      rinmOptions: [], // 报告机构列表
      largeOptions: [], // 获取交易特征代码
      largeForm: {
        rinm: '',
        ricd: '',
        correctLimitTime: '',
        correctAsk: '',
        askNum: '',
        list: [
          {
            ocnm: '',
            otdt: '',
            otcd: '',
            otic: '',
            item: []
          }
        ]
      },
      largeRules: {
        rinm: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        // ricd: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        correctLimitTime: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        correctAsk: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' },
          { max: 1000, message: '最大长度为1000位', trigger: 'blur' }
        ],
        askNum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: onlyNumberValidate, trigger: 'blur' }
        ],
        ocnm: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' },
          { max: 32, message: '最大长度为32位', trigger: 'blur' }
        ],
        otdt: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        otcd: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        otic: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidInput, trigger: 'blur' },
          { max: 256, message: '最大长度为256位', trigger: 'blur' }
        ],
        item: [{ required: true, message: '内容不能为空', trigger: 'change' }]
      },
      filedOptions: [],
      tradeId: null,
      correctType: null,
      correctId: null,
      cTitle: null,
      listObj: {},
      isView: false,
      isAddTradeBtn: false,
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
      this.$refs.largeForm.validate(validate => {
        if (validate) {
          if (this.largeForm.list.length.toString() !== this.largeForm.askNum.toString()) {
            this.$message({
              type: 'error',
              message: '待更正大额交易总数与交易信息不匹配,请仔细检查'
            })
            return false
          } else {
            // this.largeVisible = false
            // this.$emit('dialogState', this.largeVisible)
            setTimeout(() => {
              this.$store.dispatch('workFlow', { configCode: 'correctApproval' })
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
      this.correctType = this.correctParams.correctType
      this.correctId = this.correctParams.correctId
      this.cTitle = this.correctParams.cTitle
      this.tempIndustry = this.correctParams.industry
      this.resetForm('largeForm')
      this.isView = false
      this.tempDataSrc = ''
      if (this.cTitle === '0') { // 0是查看补正结果
        this.isView = false
        this.isAddTradeBtn = false
      } else {
        this.isView = true
        this.isAddTradeBtn = true
      }
      this.getViewInfo()
    },
    getViewInfo() {
      getViewInfo(this.correctId).then(res => {
        if (res.code === 200) {
          this.getCharacteInfo()
          const obj = {
            rinm: res.data.report.reportBody,
            ricd: res.data.report.reportCode,
            correctLimitTime: res.data.report.correctLimitTime,
            correctAsk: res.data.report.correctAsk,
            askNum: res.data.report.list.length,
            list: res.data.report.list
          }
          this.largeForm = obj
          this.tempDataSrc = res.data.report.dataSrc
          this.getFiledInfo(this.largeForm.ricd, this.tempDataSrc)
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
        this.largeForm.ricd = item.ricd
        this.getFiledInfo(this.largeForm.ricd)
      }
    },
    getFiledInfo(ricd, dataSrc) {
      const paramsObj = {
        ricd: ricd,
        tradeType: '0',
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
    getCharacteInfo() {
      const typeId = 'CRCD'
      dataTask(typeId)
        .then(res => {
          if (res.code === 200) {
            this.largeOptions = res.data
          }
        })
        .catch()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onCancel() {
      // 取消
      this.spLoading = false
      this.largeVisible = false
      this.$emit('dialogState', this.largeVisible)
    },
    nextStep() {
      // 提交
      this.correctSubmit()
    },
    correctSubmit() {
      this.spLoading = true
      const paramsObj = {
        correctType: this.correctType,
        tradeId: this.tradeId,
        reportCode: this.largeForm.ricd,
        correctLimitTime: this.largeForm.correctLimitTime,
        correctAsk: this.largeForm.correctAsk,
        highTrades: this.largeForm.list,
        workflow: this.workFlow2business
      }
      addCorrectData(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.spLoading = false
            this.largeVisible = false
            this.$emit('dialogState', this.largeVisible)

            this.$message({
              type: 'success',
              message: '提交成功！'
            })
            this.resetForm('largeForm')
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
      this.largeForm.list.forEach(e => {
        const fileds = e.item
        console.log(fileds)
        this.itemObj = {
          item: fileds
        }
      })

      const paramsObj = {
        correctType: this.correctType,
        tradeId: this.tradeId,
        reportCode: this.largeForm.ricd,
        problemSource: this.correctParams.organ,
        correctLimitTime: this.largeForm.correctLimitTime,
        correctAsk: this.largeForm.correctAsk,
        industry: this.tempIndustry,
        highTrade: this.itemObj,
        workflow: this.workFlow2business
      }
      addOtherCorrectData(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.largeVisible = false
            this.$emit('dialogState', this.largeVisible)

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
        ocnm: '',
        otdt: '',
        otcd: '',
        otic: '',
        item: []
      }
      this.largeForm.list.push(_data)
      const len = this.largeForm.list.length
      if (len > 1000) {
        this.largeForm.list.splice(Number(len - 1), 1)
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
          this.largeForm.list.splice(index, 1)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.largewrap {
  .el-table__header-wrapper .cell::before {
    content: '*';
    color: #f00;
    margin-right: 4px;
  }
  .inforow {
    padding-bottom: 15px;
    font-weight: bold;
  }
  .el-table .el-table__row td {
    padding: 20px 0;
    .cell {
      height: 100%;
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content {
          margin-left: 0px !important;
        }
      }
      overflow: inherit;
    }
  }
  .dialog-footer {
    padding-top: 10px;
    text-align: right;
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
