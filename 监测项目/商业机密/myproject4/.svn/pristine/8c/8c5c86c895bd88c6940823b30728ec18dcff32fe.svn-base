<template>
  <div class="customwrap">
    <el-card>
      <div slot="header"><span>自定义统计分析</span></div>
      <div class="title">查询条件：</div>
      <el-row>
        <el-form :model="form" label-width="140px">
          <el-col :span="4">
            <div style="margin-bottom: 10px;"><el-button type="primary" plain  @click="dialogVisible = true, dialogParase = '选择统计分类要素'">选择统计分类要素</el-button></div>
            <el-button type="primary" plain  @click="dialogVisible = true, dialogParase = '选择统计项目要素'">选择统计项目要素</el-button>
          </el-col>
          <el-col :span="20">

          </el-col>
        </el-form> 
      </el-row>
      <div class="btnalign"><el-button type="primary">统计</el-button><el-button type="primary" plain>清空</el-button></div>
      <div style="margin-bottom:10px;">自定义结果表：<el-button type="primary">批量导出</el-button><el-button type="primary" plain>柱状图展示</el-button><el-button type="primary" plain>饼状图展示</el-button></div>
      <el-table>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index " label="序号" width="55"></el-table-column>
        <el-table-column prop="name" min-width="120" label="统计项目要素1"></el-table-column>
        <el-table-column prop="name" min-width="120" label="统计项目要素2"></el-table-column>
        <el-table-column prop="name" min-width="" label="统计项目要素3"></el-table-column>
        <el-table-column prop="name" min-width="" label="统计项目要素4"></el-table-column>
        <el-table-column prop="name" min-width="" label="统计项目要素5"></el-table-column>
        <el-table-column prop="name" min-width="" label="统计项目要素6"></el-table-column>
        <el-table-column prop="name" min-width="" label="统计项目要素7"></el-table-column>
      </el-table> 
      <el-pagination background :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog :title="dialogParase" :visible.sync="dialogVisible">
      <el-transfer v-model="dialogValue" :data="data" :button-texts="['到左边', '到右边']"></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 穿梭框
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `报告日期时间段 ${i}`
        })
      }
      return data
    }
    return {
      dialogVisible: false,
      dialogValue: [],
      dialogParase: '',
      data: generateData(),
      currentPage: 1,
      form: {
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.customwrap {
  .title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
  }
  .btnalign {
    text-align: right;
    margin-bottom: 15px;
  }
  .el-transfer {
    margin-left:40px;
  }
}
</style>
