<template>
  <el-card class="taskManagement_index">
    <div slot="header" class="clearfix">
      <span>预警结果分发</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="24" style="text-align:right;margin-bottom:50px;">
        <el-button type="primary">选择分析员</el-button>
      </el-col>
    </el-row>
    <el-table style="width:100%;" :data="tabData">
      <el-table-column type="selection" min-width="100"></el-table-column>
      <el-table-column type="index" label="序号" min-width="100"></el-table-column>
      <el-table-column prop="" label="主体（账号）名称" min-width="100"></el-table-column>
      <el-table-column prop="" label="身份证件号码" min-width="100"></el-table-column>
      <el-table-column prop="" label="涉罪类型" min-width="100"></el-table-column>
      <el-table-column prop="" label="分析处室" min-width="100"></el-table-column>
      <el-table-column prop="" label="预警结果" min-width="100"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="0">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tabData: []
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss">
  
</style>