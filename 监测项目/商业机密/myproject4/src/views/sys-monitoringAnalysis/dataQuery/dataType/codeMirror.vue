<template>
  <div class="codemirror">
    <codemirror :merge="true" :options="cmOption"></codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/mdn-like.css'

// language
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'

// merge css
import 'codemirror/addon/merge/merge.css'

// merge js
import 'codemirror/addon/merge/merge.js'

// google DiffMatchPatch
import DiffMatchPatch from 'diff-match-patch'

// // DiffMatchPatch config with global
window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0

import { getDealcontrast } from '@/api/common/common'
export default {
  // props:{
  //   value: '',
  //   orig1: ''
  // },
  components: { codemirror, getDealcontrast },
  data() {
    return {
      cmOption: {
        value: '',
        // code: '',
        origLeft: null,
        origRight: '',
        orig: this.code,
        revertButtons: false,
        theme: 'mdn-like', // 修改主题
        connect: 'align',
        mode: 'string',
        readOnly: true, // 文本只读
        lineNumbers: false, // 行号
        collapseIdentical: false,
        highlightDifferences: true
      },
      listLoading: true
    }
  },
  created() {
    // var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
    this.fetchData()
  },
  methods: {
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
    fetchData() {
      this.listLoading = true
      getDealcontrast().then(response => {
        this.cmOption.value = response.data.bigDealfile.RICD
        // this.cmOption.orig = this.cmOption.value.replace(/\u003cscript/g, "/\u003cscript type='text/javascript'")
        // setTimeout(() => {
        //   this.cmOption.orig = response.data.bigDealfile2.title
        //   console.log(this.cmOption.orig)
        // }, 5000)
        this.cmOption.code = response.data.bigDealfile2.title
        console.log(this.cmOption.code)
        this.listLoading = false
      })
    }
  },
  mounted() {
    // this.cmOption.orig = 'rrrrr'
    // console.log('ww' + this.cmOption.orig)
  }
}
</script>

<style>

</style>
