<template>
  <div class="intelligenceFile_fullText">
    <div class="searchBlock">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="查询关键词：" label-width="100px">
              <el-input v-model="keywords" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-upload class="upload-demo" ref="upload" drag multiple :action="actionURL">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div style="font-size: 12px; color:#F56C6C; text-align:center; margin-top: 10px;">*上传文件为文本格式，每个查询关键字为一行，可多行</div>
          </el-col>
        </el-row>
        <div style="textAlign:right; marginBottom:30px" >
          <el-button type="primary" @click="handleQuery"> 查 询</el-button>
        </div>

      </el-form>

      <div class="listBlock">
        <div style="marginBottom:10px">
          <span>查询结果信息：</span>
          <el-button type="primary" plain>导 出</el-button>
          <span style="font-size: 12px; color:#F56C6C; margin-left: 10px;">注：其中常规附件（账户/交易/身份/名单）列的Y代表有，N代表没有</span>
        </div>
        <el-table :data="tableData">
          <el-table-column type="selection" width="60" fixed></el-table-column>
          <el-table-column label="序号" type="index" width="60" fixed></el-table-column>
          <el-table-column label="结果序号" prop="result" min-width="120"></el-table-column>
          <el-table-column label="命中字符串" prop="targetStr" min-width="120"></el-table-column>
          <el-table-column label="线索类型" prop="clueType" min-width="120"></el-table-column>
          <el-table-column label="文件编号（流水号或其他）" prop="fileCode" min-width="140"></el-table-column>
          <el-table-column label="线索状态" prop="clueState" min-width="120"></el-table-column>
          <el-table-column label="线索名称" prop="clueName" min-width="120"></el-table-column>
          <el-table-column label="触发点/协查函号" prop="Point" min-width="160"></el-table-column>
          <el-table-column label="情报函或线索表正文" prop="text" min-width="160"></el-table-column>
          <el-table-column label="常规附件（账户/交易/身份/名单）" prop="attach" min-width="120"></el-table-column>
          <el-table-column label="其他附件" prop="Otherattach" min-width="120"></el-table-column>
        </el-table>
        <!-- 分页 -->

          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>

      </div>

      <div v-show="showDown">
        <div >
          <span>下载进度</span>
        </div>
        <el-table :data="processData">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="任务名称" prop="name"></el-table-column>
          <el-table-column label="已完成任务数" type="task"></el-table-column>
          <el-table-column label="未完成任务数" type="noTask"></el-table-column>
          <el-table-column label="进度" type="process"></el-table-column>
          <el-table-column label="任务提交时间" type="time"></el-table-column>
        </el-table>
      </div>
      <div v-show="showProcess">
        <div>
          <span>查询进度</span>
        </div>
        <el-table :data="searchData">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="任务名称" type="taskName"></el-table-column>
          <el-table-column label="已完成任务数" type="taskNo"></el-table-column>
          <el-table-column label="进度" type="process"></el-table-column>
          <el-table-column label="任务提交时间" type="time"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      keywords: '',
      tableData: [
        {
          result: '1-1',
          targetStr: '张三',
          clueType: '线索',
          fileCode: '123',
          clueState: '已移送',
          clueName: '',
          Point: '',
          text: '有',
          attach: 'YNYY',
          Otherattach: '无'
        },
        {
          result: '1-2',
          targetStr: '张三',
          clueType: '协查',
          fileCode: '345',
          clueState: '已分配',
          clueName: '',
          Point: '',
          text: '无',
          attach: 'YNYN',
          Otherattach: '无'
        },
        {
          result: '2-1',
          targetStr: '120200198111020000',
          clueType: '通报',
          fileCode: '234',
          clueState: '待签批',
          clueName: '',
          Point: '',
          text: '有',
          attach: 'YYNN',
          Otherattach: '无'
        },
        {
          result: '2-3',
          targetStr: '120200198111020000',
          clueType: '分支机构上报分析申请',
          fileCode: '320000-2015-03-0001',
          clueState: '已提交审核会',
          clueName: '',
          Point: '',
          text: '无',
          attach: 'NNNN',
          Otherattach: '附件名'
        },
        {
          result: '2-4',
          targetStr: '120200198111020000',
          clueType: '分支机构对外报告线索',
          fileCode: '320000-2015-03-0001',
          clueState: '仅移送',
          clueName: '',
          Point: '',
          text: '无',
          attach: 'NNNY',
          Otherattach: '附件名'
        },
        {
          result: '3-0',
          targetStr: '李四',
          clueType: '--',
          fileCode: '--',
          clueState: '--',
          clueName: '',
          Point: '',
          text: '无',
          attach: 'NNNN',
          Otherattach: '无'
        }
      ],
      currentPage: 1,
      processData: [],
      searchData: [],
      showDown: false,
      showProcess: false,
      token: getToken()
    }
  },
  computed: {
    actionURL() {
      return `/caml-hbase/hbase?token=${this.token}`
    }
  },
  methods: {
    handleQuery() {
      this.$refs.upload.submit()
    },
    handleSizeChange() {},
    handleCurrentChange() {}

  }
}
</script>

<style lang="scss">
.intelligenceFile_fullText{
  .el-upload{
    width: 100%;
    .el-upload-dragger{
      width: 100%
    }
  }

}


</style>
