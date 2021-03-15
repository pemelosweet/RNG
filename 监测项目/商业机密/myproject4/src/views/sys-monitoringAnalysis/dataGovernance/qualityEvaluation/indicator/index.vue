<template>
  <div class="indicatorwrap">
    <el-card>
      <div slot="header" class="clearfix"><span>指标评价</span></div>
      <el-row>
        <el-form ref="form" :model="form" label-width="120px">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="评价任务名称：" prop="name">
                <el-select v-model="form.name">
                  <el-option label="所有整合确认发送的评价任务名称" value="all"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="生成时间：" prop="dateValue">
                <el-date-picker v-model="form.dateValue" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="版本：" prop="version">
                <el-input v-model="form.version"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态：" prop="state">
                <el-select v-model="form.state">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="待评价" value="1"></el-option>
                  <el-option label="已评价" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="btnalign">
              <el-button type="primary">查询</el-button>
              <el-button type="primary" plain @click="resetForm('form')">重 置</el-button>
            </el-col>
          </el-col>
        </el-form>
      </el-row>

      <div><span>评价方案列表:</span></div>
      <el-table :data="tableData">
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column type="index" label="序号" fixed></el-table-column>
        <el-table-column prop="name" label="评价任务名称"></el-table-column>
        <el-table-column prop="version" label="版本"></el-table-column>
        <el-table-column prop="createdate" label="生成时间"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <router-link :to="{ name: 'dataGovernance_qualityEvaluation_thinIndicator_trial'}"><el-button type="text" v-if="scope.row.state === '待评价'">打分</el-button></router-link>
            <router-link :to="{ name: 'dataGovernance_qualityEvaluation_thinIndicator_trial'}"><el-button type="text" v-if="scope.row.state === '已评价'">查看打分结果</el-button></router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        version: '',
        dateValue: '',
        state: ''
      },
      currentPage: 1,
      tableData: [
        {
          name: '2018年全国24家全国性法人金融机构列表',
          version: 'V1',
          createdate: '2018-12-12 09:30:00',
          state: '待评价'
        },
        {
          name: '2018保险业机构列表',
          version: 'V2',
          createdate: '2018-12-13 09:30:00',
          state: '已评价'
        }
      ]
    }
  },
  methods: {
    resetForm(formName) { // 重置清空操作
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.indicatorwrap {
  .btnalign {
    text-align: right;
  }
}
</style>
