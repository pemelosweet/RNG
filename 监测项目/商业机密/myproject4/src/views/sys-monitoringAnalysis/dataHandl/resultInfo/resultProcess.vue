<template>
  <div class="resultInfo-result">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>查看处理结果</span>
      </div>
      <div class="content">
        <el-form ref="form" :inline="true" :model="form" label-width="120px">
          <el-col :span="8">
            <el-form-item label="报告机构编码：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易日期：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务标识号：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理启动时间：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理结束时间：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执行ID：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程名称：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="区域一" value="1"></el-option>
                <el-option label="区域二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <!-- 按钮组样式 -->
        <div class="button-group clearfix">
          <ul class="ul-inline" style="float:right">
            <li><el-button type="primary">查询</el-button></li>
            <li><el-button>清空</el-button></li>
          </ul>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" min-width="80"></el-table-column>
          <el-table-column label="执行ID" min-width="80">
            <template slot-scope="scope">
              <router-link to="resultInfo/result"><el-button type="text">{{scope.row.exeId}}</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column label="流程名称" min-width="150">
            <template slot-scope="scope">
              <router-link to="resultInfo/result"><el-button type="text">{{scope.row.processName}}</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="150">
            <template slot-scope="scope">
              <router-link to="resultInfo/result"><el-button type="text">{{scope.row.subjectName}}</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column prop="exector" label="执行用户" min-width="100"></el-table-column>
          <el-table-column prop="startDate" label="处理启动时间" min-width="130"></el-table-column>
          <el-table-column prop="endDate" label="处理结束时间" min-width="130"></el-table-column>
          <el-table-column prop="totla" label="总耗时"></el-table-column>
          <el-table-column prop="resultState" label="结果状态" min-width="80"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template>
              <el-button type="text" size="small">查看</el-button>
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
          region: ''
        },
        currentPage4: 1,
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
          processName: '银行大额交易剔重流程-001',
          subjectName: '银行业交易剔重项目-01',
          exector: '分析员002',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '99',
          processName: '银行大额交易剔重流程-001',
          subjectName: '银行业交易剔重项目-01',
          exector: '分析员003',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '98',
          processName: '银行大额交易剔重流程-001',
          subjectName: '银行业交易剔重项目-01',
          exector: '分析员004',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '97',
          processName: '银行大额交易剔重流程-001',
          subjectName: '银行业交易剔重项目-01',
          exector: '分析员005',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '96',
          processName: '银行大额交易剔重流程-001',
          subjectName: '银行业交易剔重项目-01',
          exector: '分析员006',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功'
        }, {
          exeId: '95',
          processName: '银行大额交易剔重流程-001',
          subjectName: '银行业交易剔重项目-01',
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
