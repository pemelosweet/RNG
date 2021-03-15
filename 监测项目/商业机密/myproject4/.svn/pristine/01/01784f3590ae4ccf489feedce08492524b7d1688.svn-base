<template>
  <div class="recordwrap">
    <el-form label-width="140px">
      <div class="recorditem">
        <div class="contrasttitle">交易履历时间轴：</div>
        <div class="contrastfilewrap">
          <el-steps :active="1" align-center v-if="recordOptions !== '无内容'">
            <el-step icon="el-step__icon is-text" v-for="(item, index) in recordOptions" :key="index">
              <el-badge slot="title">
                <el-checkbox v-model="recordList[index]" @change="handleRecordChange(item, index)">{{ item.xmlName }}</el-checkbox>
              </el-badge>
              <el-badge slot="description">时间：{{item.redt}}</el-badge>
            </el-step>
          </el-steps>

          <div v-if="recordOptions === '无内容'">{{recordOptions}}</div>
          <div class="btnalign" v-show="isBtnShow">
            <el-button type="primary" @click="onCompareSubmit" :disabled="isBtnDisabled">开始对比</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="trace-contrast" v-show="isShow">
        <div class="contrasttitle">交易对比</div>
        <el-row>
          <div class="contrastfilewrap clearfix">
          <el-col :span="24">
            <el-col :span="12">
                <div class="paramfiletitle">参与对比报文1</div>
                <div class="paramfile-info">
                    <span class="infoitem">报文名称：<span>XXXssssss.XML</span></span>
                    <span class="infoitem">上传时间：<span>2017-07-01</span></span>
                </div>
            </el-col>
            <el-col :span="12">
              <div class="paramfiletitle">参与对比报文2</div>
              <div class="paramfile-info">
                  <span class="infoitem">报文名称：<span>XXX.XML</span></span>
                  <span class="infoitem">上传时间：<span>2017-07-01</span></span>
              </div>
           </el-col>
          </el-col>
          </div>
        </el-row>
        <div class="btnrow">
            <el-button type="primary">交换</el-button>
            <el-button type="primary" @click="dialogVisible = true">对比</el-button>
        </div>
    </div> -->
      <!-- <div class="btnalign">
        <el-button type="primary" style="margin-top: 20px;" @click="onCancel">取消</el-button>
      </div> -->
    </el-form>

    <el-dialog width="60%" title="交易追溯文件对比" :visible.sync="dialogVisible" append-to-body>
      <!-- <el-row>
        <el-col :span="12">
          <div class="paramfile-info">
            <span class="infoitem">报文名称：
              <span>XXXssssss.XML</span>
            </span>
            <span class="infoitem">上传时间：
              <span>2017-07-01</span>
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="paramfile-info">
            <span class="infoitem">报文名称：
              <span>XXXssssss.XML</span>
            </span>
            <span class="infoitem">上传时间：
              <span>2017-07-01</span>
            </span>
          </div>
        </el-col>
      </el-row> -->
      <div class="codemirror">
        <codemirror :merge="true" :options="cmOption"></codemirror>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { getRecordList, getCompare } from '@/api/sys-monitoringAnalysis/dataQuery/dataType'
// require component
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/mdn-like.css'

// language
// import 'codemirror/mode/css/css.js'
// import 'codemirror/mode/xml/xml.js'
// import 'codemirror/mode/htmlmixed/htmlmixed.js'

// merge css
import 'codemirror/addon/merge/merge.css'

// merge js
import 'codemirror/addon/merge/merge.js'

// google DiffMatchPatch
import DiffMatchPatch from 'diff-match-patch'

// DiffMatchPatch config with global
window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0

import { getDealcontrast } from '@/api/common/common'
export default {
  props: {
    recordVisible: Boolean,
    recordObj: Object
  },
  data() {
    return {
      recordTabVisible: this.recordVisible,
      noticeVisible: false, // 弹框
      dialogVisible: false, // 弹框
      checked: false, // 复选框是否选中
      recordOptions: [],
      recordList: [],
      val: '',
      orig2: '',
      cmOption: {
        value: this.val,
        origLeft: null,
        orig: this.orig2,
        revertButtons: false,
        // theme: 'mdn-like', // 修改主题
        connect: 'align',
        mode: 'text/html',
        readOnly: true, // 文本只读
        lineNumbers: false, // 行号
        collapseIdentical: false,
        highlightDifferences: true,
        lineSeparator: '/n'
      },
      listLoading: true,
      vTradeId: '',
      firstTradeId: '',
      secordTradeId: '',
      isBtnShow: false, // 判断是否显示开始对比按钮
      isBtnDisabled: true, // 开始对比按钮是否可以点击
      count: 0 // 记录选中纠删条数
    }
  },
  // components: { codeMirror },
  components: { codemirror, getDealcontrast },
  mounted() {
    this.getList()
  },
  watch: {
    recordVisible(val) {
      if (val) this.getList()
    }
  },
  methods: {
    getList() {
      this.count = 0
      this.isBtnShow = false
      const pramsObj = {
        type: this.recordObj.type,
        tradeId: this.recordObj.tradeId
      }
      getRecordList(pramsObj)
        .then(res => {
          if (res.code === 200) {
            this.recordOptions = res.data === null || res.data.length === 0 ? '无内容' : res.data
            this.recordOptions.forEach((item, index) => {
              this.$set(this.recordList, index, false)
            })

            if (this.recordOptions === '无内容') {
              this.isBtnShow = false
            } else {
              this.isBtnShow = true
              if (this.recordOptions.length >= 2) {
                this.isBtnDisabled = false
              } else {
                this.isBtnDisabled = true
              }
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .catch()
    },
    handleRecordChange(val, index) {
      if (this.count === 0) {
        if (this.recordList[index] === true) {
          this.count++
          this.firstTradeId = val.tradeId
        }
      } else if (this.count === 1) {
        if (this.firstTradeId !== val.tradeId) {
          if (this.recordList[index] === true) {
            this.count++
            this.secordTradeId = val.tradeId
          }
        }
      } else if (this.count >= 2) {
        this.$confirm('有且只能选择两条数据进行对比!', '提示', {
          showCancelButton: false,
          type: 'warning'
        })
          .then(() => {
            this.$set(this.recordList, index, false)
            if (this.recordList[index] === false) {
              this.count = this.count - 1
            }
          })
          .catch()
      }
    },
    onCompareSubmit() {
      if (this.firstTradeId && this.secordTradeId) {
        const paramsObj = {
          leftTradeId: this.firstTradeId,
          rightTradeId: this.secordTradeId
        }
        getCompare(paramsObj)
          .then(res => {
            if (res.code === 200) {
              this.recordTabVisible = false
              this.$emit('setRecordVisible', this.recordTabVisible)
              this.dialogVisible = true
              this.cmOption.value = JSON.stringify(res.data[0].trade)
              this.cmOption.value = this.cmOption.value.replace(/,/g, '/n')
              this.cmOption.orig = JSON.stringify(res.data[1].trade)
              this.cmOption.orig = this.cmOption.orig.replace(/,/g, '/n')
            }
          })
          .catch()
      } else {
        this.recordTabVisible = false
        this.$emit('setRecordVisible', this.recordTabVisible)
        setTimeout(() => {
          this.dialogVisible = true
        }, 200)

        // this.$confirm('有且只能选择两条数据进行对比!', '提示', { showCancelButton: false, type: 'warning' }).then().catch()
      }
    },
    onCmCursorActivity(a, b, c) {
      // console.log('onCmCursorActivity', a, b, c)
    },
    onCmReady(a, b, c) {
      // console.log('onCmReady', a, b, c)
    },
    onCmFocus(a, b, c) {
      // console.log('onCmFocus', a, b, c)
    },
    onCmBlur(a, b, c) {
      // console.log('onCmBlur', a, b, c)
    },
    onCmInput(code) {
      // console.log('onCmInput', code)
    },
    onCancel() {
      this.recordTabVisible = false
      this.$emit('setRecordVisible', this.recordTabVisible)
    }
  }
}
</script>

<style lang="scss">
.recordwrap {
  .contrasttitle {
    font-size: 1em;
    margin-bottom: 15px;
    margin-top: 20px;
  }
  .paramfiletitle {
    font-size: 0.9em;
    text-align: center;
  }
  .contrastfilewrap {
    border: 1px solid #cccccc;
    padding: 30px;
  }
  .btnrow {
    text-align: center;
    margin-top: 10px;
  }
  .paramfile-info {
    text-align: center;
    margin: 10px 0 20px;
    .infoitem {
      display: inline-block;
      font-size: 0.9em;
      color: #666;
      span {
        color: #333;
      }
      &:last-child {
        margin-left: 40px;
      }
    }
  }
  .btnalign {
    text-align: center;
  }
  // 时间轴图标样式
  .el-step__icon.is-icon {
    width: auto;
  }
  .el-step__description.is-finish {
    color: #333;
  }
  .dialog-footer{
    margin-top: 10px;
    text-align: right;
  }
}
</style>
