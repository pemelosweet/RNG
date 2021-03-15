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
                <el-option label="010046101023211" value="1"></el-option>
                <el-option label="010046101023212" value="2"></el-option>
                <el-option label="010046101023214" value="4"></el-option>
                <el-option label="010046101023215" value="5"></el-option>
                <el-option label="010046101023216" value="6"></el-option>
                <el-option label="010046101023217" value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易日期：">
              <el-date-picker
                v-model="form.trading"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务标识号：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="201707311136385110133" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理启动时间：">
              <el-date-picker
                v-model="form.disposeStartDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理结束时间：">
              <el-date-picker
                v-model="form.disposeEndDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理结果：">
              <el-select placeholder="请选择" v-model="form.region">
                <el-option label="成功" value="1"></el-option>
                <el-option label="失败" value="2"></el-option>
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
              <router-link to=""><el-button type="text">{{scope.row.exeId}}</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column prop="orgCode" label="报告机构编码" min-width="150"></el-table-column>
          <el-table-column prop="tradeDate" label="交易日期" min-width="150"></el-table-column>
          <el-table-column prop="markCode" label="业务标识号" min-width="100"></el-table-column>
          <el-table-column prop="processBefore" label="数据处理前" min-width="100">
            <template slot-scope="scope">
              <el-popover
                ref="processBefore"
                placement="top"
                width="1024"
                trigger="click">
                <el-table :data="gridData" width="100%">
                  <el-table-column min-width="150" prop="RICD" label="报告机构编码RICD" fixed="left"></el-table-column>
                  <el-table-column min-width="150" prop="HTDT" label="交易发生日期HTDT"></el-table-column>
                  <el-table-column min-width="150" prop="TICD" label="业务标识号TICD"></el-table-column>
                  <el-table-column min-width="150" prop="CSNM" label="客户号CSNM"></el-table-column>
                  <el-table-column min-width="150" prop="CTNM" label="客户名称CTNM"></el-table-column>
                  <el-table-column min-width="150" prop="CATP" label="客户账户类型CATP"></el-table-column>
                  <el-table-column min-width="150" prop="CTAC" label="客户账号CTAC"></el-table-column>
                  <el-table-column min-width="200" prop="OATM" label="客户账户开立时间OATM"></el-table-column>
                  <el-table-column min-width="200" prop="CBCN" label="客户银行卡号码CBCN"></el-table-column>
                  <el-table-column min-width="150" prop="TSTM" label="交易时间TSTM"></el-table-column>
                  <el-table-column min-width="150" prop="TRCD" label="交易发生地TRCD"></el-table-column>
                  <el-table-column min-width="150" prop="TSTP" label="交易方式TSTP"></el-table-column>
                  <el-table-column min-width="150" prop="CRTP" label="交易币种CRTP"></el-table-column>
                  <el-table-column min-width="150" prop="CRAT" label="交易金额CRAT"></el-table-column>
                </el-table>
              </el-popover>
              <el-button type="text" v-popover:processBefore>处理前</el-button>
            </template>
          </el-table-column>
          <el-table-column label="数据处理后" min-width="100">
            <template slot-scope="scope">
              <el-popover
                ref="processAfter"
                placement="top"
                width="1024"
                trigger="click">
                <el-table :data="gridData" width="100%">
                  <el-table-column min-width="150" prop="RICD" label="报告机构编码RICD" fixed="left"></el-table-column>
                  <el-table-column min-width="150" prop="HTDT" label="交易发生日期HTDT"></el-table-column>
                  <el-table-column min-width="150" prop="TICD" label="业务标识号TICD"></el-table-column>
                  <el-table-column min-width="150" prop="CSNM" label="客户号CSNM"></el-table-column>
                  <el-table-column min-width="150" prop="CTNM" label="客户名称CTNM"></el-table-column>
                  <el-table-column min-width="150" prop="CATP" label="客户账户类型CATP"></el-table-column>
                  <el-table-column min-width="150" prop="CTAC" label="客户账号CTAC"></el-table-column>
                  <el-table-column min-width="200" prop="OATM" label="客户账户开立时间OATM"></el-table-column>
                  <el-table-column min-width="200" prop="CBCN" label="客户银行卡号码CBCN"></el-table-column>
                  <el-table-column min-width="150" prop="TSTM" label="交易时间TSTM"></el-table-column>
                  <el-table-column min-width="150" prop="TRCD" label="交易发生地TRCD"></el-table-column>
                  <el-table-column min-width="150" prop="TSTP" label="交易方式TSTP"></el-table-column>
                  <el-table-column min-width="150" prop="CRTP" label="交易币种CRTP"></el-table-column>
                  <el-table-column min-width="150" prop="CRAT" label="交易金额CRAT"></el-table-column>
                </el-table>
              </el-popover>
              <el-button type="text" v-popover:processAfter>处理后</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="startDate" label="处理启动时间" min-width="140"></el-table-column>
          <el-table-column prop="endDate" label="处理结束时间" min-width="140"></el-table-column>
          <el-table-column prop="totla" label="耗时（秒）" min-width="120"></el-table-column>
          <el-table-column prop="resultState" label="处理结果" min-width="80"></el-table-column>
          <el-table-column prop="exector" label="执行用户" min-width="80"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <router-link :to="{name:'dataHandl_resultInfo_resultId_detail'}"><el-button type="text" size="small">追溯查询</el-button></router-link>
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
          trading: '',
          disposeStartDate: '',
          disposeEndDate: '',
          region: ''
        },
        currentPage4: 1,
        tableData: [{
          exeId: '101',
          orgCode: '010046101023211',
          tradeDate: '20170731',
          markCode: '201707311136385110133',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功',
          exector: '分析员001'
        }, {
          exeId: '101',
          orgCode: '010046101023212',
          tradeDate: '20170731',
          markCode: '201707311136385110133',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功',
          exector: '分析员001'
        }, {
          exeId: '101',
          orgCode: '010046101023213',
          tradeDate: '20170731',
          markCode: '201707311136385110133',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功',
          exector: '分析员001'
        }, {
          exeId: '101',
          orgCode: '010046101023214',
          tradeDate: '20170731',
          markCode: '201707311136385110133',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功',
          exector: '分析员001'
        }, {
          exeId: '101',
          orgCode: '010046101023215',
          tradeDate: '20170731',
          markCode: '201707311136385110133',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '3 sec',
          resultState: '成功',
          exector: '分析员001'
        }, {
          exeId: '101',
          orgCode: '010046101023216',
          tradeDate: '20170731',
          markCode: '201707311136385110133',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '2 sec',
          resultState: '成功',
          exector: '分析员001'
        }, {
          exeId: '101',
          orgCode: '010046101023217',
          tradeDate: '20170731',
          markCode: '201707311136385110133',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '1 sec',
          resultState: '成功',
          exector: '分析员001'
        }, {
          exeId: '101',
          orgCode: '010046101023218',
          tradeDate: '20170731',
          markCode: '201707311136385110133',
          startDate: '2018-01-04 03:05:05',
          endDate: '2018-01-04 03:05:06',
          totla: '5 sec',
          resultState: '成功',
          exector: '分析员001'
        }],
        gridData: [{
          RICD: '010046101023211',
          HTDT: '20170731',
          TICD: '201707311136385110133',
          CSNM: '000051552433',
          CTNM: '柯虎明',
          CATP: '0012',
          CTAC: '6225-8802-8100-8800',
          OATM: '20170131101010',
          CBCN: '6212260200096770281',
          TSTM: '20170731121212',
          TRCD: 'CHN110101',
          TSTP: '000012',
          CRTP: 'CNY',
          CRAT: '88888888'
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
