<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>文本比较</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div class="content">
    <div class="codemirror">
      <codemirror :merge="true" :options="cmOption" @scroll="onCmScroll"></codemirror>
    </div>
  </div>
</el-card>
</template>

<script>
// require component
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/mdn-like.css'

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

export default {
  components: { codemirror },
  data() {
    const html = document.documentElement.innerHTML
      .replace(/<style([\s\S]*?)<\/style>/ig, '')
      .replace(/></ig, '>\n<')
      // const orig1 = html.replace('surmon@foxmail.com', 'surmon.me@gmail.com')
    const orig2 = html.replace('surmon@foxmail.com', 'surmon.me@gmail.com')
      .replace('content="320"', 'content="360"')
      .replace(/<title>([\s\S]*?)<\/title>/ig, '<title>test title</title>')
      // console.log('html', html, 'orig1', 'orig2', orig2)
    return {
      cmOption: {
        value: html,
        origLeft: null,
        orig: orig2,
        revertButtons: false,
        // theme: 'mdn-like', // 修改主题
        connect: 'align',
        mode: 'text/html',
        readOnly: true, // 文本只读
        // lineNumbers: false, // 行号
        collapseIdentical: false,
        highlightDifferences: true
      }
    }
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
    onCmScroll() {
      // console.log('onCmScroll')
    }
  }
}
</script>

