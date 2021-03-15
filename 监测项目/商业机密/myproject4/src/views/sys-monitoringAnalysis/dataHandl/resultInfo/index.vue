<template>
  <div class="resultInfo-index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>处理结果列表</span>
      </div>
      <div class="content">
        <el-form ref="form" :inline="true" :model="form" label-width="120px">
          <el-col :span="8">
            <el-form-item label="项目名称：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程名称：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执行ID：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结果状态：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="成功" value="1"></el-option>
                <el-option label="失败" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="启动截止时间：">
              <el-date-picker
                v-model="value3"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>

        <!-- 按钮组样式 -->
        <div class="button-group clearfix">
          <ul class="ul-inline" style="float:right">
            <li><el-button type="primary">查询</el-button></li>
            <li>
              <el-input placeholder="请输入内容" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </li>
          </ul>
        </div>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" min-width="80"></el-table-column>
          <el-table-column label="执行ID" min-width="80">
            <template slot-scope="scope">
              <router-link to="resultInfo/resultId"><el-button type="text">{{scope.row.exeId}}</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column label="流程名称" min-width="150">
            <template slot-scope="scope">
              <router-link to="resultInfo/resultProcess"><el-button type="text">{{scope.row.processName}}</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="150">
            <template slot-scope="scope">
              <router-link to="resultInfo/resultProcess"><el-button type="text">{{scope.row.subjectName}}</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column prop="exector" label="执行用户" min-width="100"></el-table-column>
          <el-table-column prop="startDate" label="处理启动时间" min-width="130"></el-table-column>
          <el-table-column prop="endDate" label="处理结束时间" min-width="130"></el-table-column>
          <el-table-column prop="totla" label="总耗时"></el-table-column>
          <el-table-column prop="resultState" label="结果状态" min-width="80"></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template>
              <router-link :to="{name:'dataHandl_resultInfo_resultId'}"><el-button type="text" size="small">查看处理结果详情</el-button></router-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: ''
        },
        currentPage4: 1,
        value3: [new Date(2018, 1, 10, 10, 10), new Date(2018, 1, 11, 10, 10)],
        tableData: [{
          exeId: '101',
          processName: '银行大额交易剔重流程-001',
          subjectName: '银行业交易剔重项目-01',
          exector: '分析员001',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '100',
          processName: '银行大额交易剔重流程-002',
          subjectName: '银行业交易剔重项目-02',
          exector: '分析员002',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '99',
          processName: '银行大额交易剔重流程-003',
          subjectName: '银行业交易剔重项目-03',
          exector: '分析员003',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '98',
          processName: '银行大额交易剔重流程-004',
          subjectName: '银行业交易剔重项目-04',
          exector: '分析员004',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '97',
          processName: '银行大额交易剔重流程-005',
          subjectName: '银行业交易剔重项目-05',
          exector: '分析员005',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '96',
          processName: '银行大额交易剔重流程-006',
          subjectName: '银行业交易剔重项目-06',
          exector: '分析员006',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '95',
          processName: '银行大额交易剔重流程-007',
          subjectName: '银行业交易剔重项目-07',
          exector: '分析员007',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '失败'
        }]
      }
    },
    methods: {
      handleCurrentChange() {},
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      }
    }
  }
</script>
