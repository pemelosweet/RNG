<template>
  <div class="handelinfowrap">
      <div class="handeltitle">办理信息：</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="节点名称"></el-table-column>
        <el-table-column prop="user" label="执行用户"></el-table-column>
        <el-table-column prop="idea" label="办理意见"></el-table-column>
        <el-table-column prop="date" label="办理时间"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <div class="handeltitle">流程监控图：</div>
      <el-steps :active="2" align-center>
        <el-step title="填写录入申请" description=""></el-step>
        <el-step title="移送处处长审核" description=""></el-step>
        <el-step title="...." description=""></el-step>
        <el-step title="结束" description=""></el-step>
      </el-steps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '填写录入申请',
          user: '张三',
          idea: '请领导审核',
          date: '2017-11-10 10：04',
          remark: ''
        },
        {
          name: '处长审核',
          user: '刘处长',
          idea: '同意',
          date: '2017-11-10 10：05',
          remark: '**********'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.handelinfowrap {
  .handeltitle {
    padding: 20px 0 10px;
  }
}
</style>
