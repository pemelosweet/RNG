<template>
  <div class="preliminary-judgment">
    <el-form-item :label="labelName" :label-width="lableWidth+'px'" class="item" :prop="propVal">
      <template slot="label" v-if="!lableWidth">
        <span>涉罪类型：</span>
      </template>
      <el-button v-if="!lableWidth" style="margin-left:10px" type="text" @click="openDialog">请选择</el-button>

      <el-button v-if="lableWidth" type="text" @click="openDialog">请选择</el-button>
      <el-checkbox-group v-model="preliminaryJudgment" class="checkbox-list">
        <template v-for="(item,index) in preliminaryJudgmentData">
          <el-checkbox :key="index" :class="{marginBottom24:showInp1}" :label="item.codeId" v-if="item.codeId=='1401'">
            <div>
              {{item.codeName}}
            </div>
            <div v-if="showInp1" class="check-box--input">
              <el-form-item prop="preliminaryJudgmentInp1" :rules="{required: true, message: '此项不能为空', trigger: 'blur'}">
                <el-input v-model="preliminaryJudgmentInp1" placeholder="" ></el-input>
              </el-form-item>
            </div>
          </el-checkbox>
          <el-checkbox v-else-if="item.codeId=='1402'" :key="index" :label="item.codeId" :class="{marginBottom24:showInp2}">
            <div>
              {{item.codeName}}
            </div>
            <div v-if="showInp2" class="check-box--input">
              <el-form-item prop="preliminaryJudgmentInp2" :rules="{required: true, message: '此项不能为空', trigger: 'blur'}">
                <el-input v-model="preliminaryJudgmentInp2" placeholder=""></el-input>
              </el-form-item>

            </div>
          </el-checkbox>
          <el-checkbox :key="index" :label="item.codeId" v-else> {{item.codeName}}</el-checkbox>
        </template>
      </el-checkbox-group>
    </el-form-item>
    <!-- 初步判断弹窗 -->
    <el-dialog title="选择初步判断" :visible.sync="dialogJudgmentVisible" class="dialogJudgment-dialog" :append-to-body="inner" >
      <el-checkbox-group v-model="dialogJudgmentData_checked">
        <el-checkbox v-for="(item,index) in dialogJudgmentData" :key="index" :label="item.codeId"> {{item.codeName}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer">
        <el-button type="primary" @click="dialogJudgmentVisible=false">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  props: {
    lableWidth: Number,
    inner: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: '涉罪类型：'
    },
    propVal: {
      type: String,
      default: null
    },
    echoJudgment: {
      type: Array,
      default: function() {
        return []
      }
    },
    judgmentInp1: {
      type: String,
      default: ''
    },
    judgmentInp2: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogJudgmentVisible: false, // 初步判断弹窗 --关闭
      dialogJudgmentData: [], // 初步判断弹窗--数据
      dialogJudgmentData_checked: [], // 初步判断弹窗--选择的类型
      preliminaryJudgmentData: [], // 列表页--初步判断数据
      preliminaryJudgmentInp1: '', // 列表页--1401 input框
      preliminaryJudgmentInp2: '', // 列表页--1402 input框
      preliminaryJudgment: [], // 列表页--初步判断选择的数据
      vicariousPreliminaryJudgment: [], // 列表页--初步判断参数数据
      showInp1: false, // 列表页--初步判断1401 input框显示
      showInp2: false // 列表页--初步判断1402 input框显示
    }
  },
  updated() {
    this.$emit('judgmentOther', this.preliminaryJudgmentInp1, this.preliminaryJudgmentInp2)
  },
  computed: {
    // 列表查询参数
    searchParams() {
      const index1 = this.vicariousPreliminaryJudgment.indexOf('1401')
      const index2 = this.vicariousPreliminaryJudgment.indexOf('1402')
      if (this.showInp1) {
        this.$set(this.vicariousPreliminaryJudgment, index1, `1401-${this.preliminaryJudgmentInp1}`)
      }
      if (this.showInp2) {
        this.$set(this.vicariousPreliminaryJudgment, index2, `1402-${this.preliminaryJudgmentInp2}`)
      }
      return this.vicariousPreliminaryJudgment
    }
  },
  watch: {
    preliminaryJudgment(val) {
      val.indexOf('1401') !== -1 ? (this.showInp1 = true) : (this.showInp1 = false)
      val.indexOf('1402') !== -1 ? (this.showInp2 = true) : (this.showInp2 = false)
      this.vicariousPreliminaryJudgment = JSON.parse(JSON.stringify(val))
      if (this.propVal) {
        this.$emit('judgment', this.preliminaryJudgment)
      }
    },
    // 监听回显数据
    echoJudgment(val) {
      this.dialogJudgmentData_checked = JSON.parse(JSON.stringify(val))
      this.preliminaryJudgment = this.dialogJudgmentData_checked
      // alert(this.dialogJudgmentData_checked)
      // alert(this.preliminaryJudgment)
    },
    // 监听回显数据 1401 --input
    judgmentInp1(val) {
      this.preliminaryJudgmentInp1 = val
    },
    // 监听回显数据 1402 --input
    judgmentInp2(val) {
      this.preliminaryJudgmentInp2 = val
    },
    // 初步判断弹窗 - 选择CheckBox
    dialogJudgmentData_checked(val) {
      this.getDictionary('TOSC')
      this.preliminaryJudgmentData = []
      this.preliminaryJudgment = []
      val.forEach(item => {
        this.dialogJudgmentData.map(item2 => {
          if (item === item2.codeId) {
            this.preliminaryJudgmentData.push(item2)
            this.preliminaryJudgment.push(item)
          }
        })
      })
    }
  },
  created() {
    this.getDictionary('TOSC')
  },
  mounted() {},
  methods: {
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break

            default:
              break
          }
        }
      })
    },
    // 打开弹窗---请求数据
    openDialog() {
      this.getDictionary('TOSC')
      this.dialogJudgmentVisible = true
    }
  }
}
</script>
<style lang="scss" >
.preliminary-judgment {
  .item {
    .el-form-item__label {
      float: left;
    }
  }
  .marginBottom24 {
    margin-bottom: 24px;
  }
  .check-box--input {
    position: absolute;
    width: 90%;
  }
  .checkbox-list {
    label {
      &:first-child {
        margin-left: 0;
      }
    }
    .el-checkbox {
      margin: 0;
      margin-right: 10px;
    }
  }
  .dialogJudgment-dialog {
    .el-dialog__body {
      max-height: 60vh;
      overflow: auto;
      .el-checkbox {
        display: block;
        margin-left: 12px;
      }
    }
  }
}
</style>
