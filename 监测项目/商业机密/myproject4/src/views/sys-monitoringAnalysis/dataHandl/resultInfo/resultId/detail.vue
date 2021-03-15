<template>
  <div class="resultIddetail">
    <el-card>
      <div slot="header"><span class="spantitle">银行业交易剔重项目-01</span><b>/</b><span class="spantitle2">银行业大额交易主键剔重流程-001</span></div>
      <!-- <div class="prompt">针对银行业大额交易或可疑交易主键剔重，创建时间2019年1月8日。</div>
      <div class="ruleinfo">
        <span><label>修改人：</label>分析员001</span><span><label>修改时间：</label>2019-01-08 10:30:00</span>
      </div> -->
      <div class="executingtitle">查询交易信息</div>
      <el-row>
        <el-form :model="form" label-width="120px" inline="">
           <el-col :span="8">
              <el-form-item label="报告机构编码：">
                <el-select v-model="form.code">
                  <el-option label="010046101023211" value="first"></el-option>
                </el-select>
              </el-form-item>
           </el-col>
           <el-col :span="8">
              <el-form-item label="处理启动时间：">
                 <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
           </el-col>
           <el-col :span="8">
               <el-form-item label="处理结束时间：">
                 <el-date-picker
                  v-model="value2"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
           </el-col>
           <!-- 第二行 -->
            <el-col :span="8">
               <el-form-item label="交易日期：">
                 <el-date-picker
                  v-model="value3"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
           </el-col>
           <el-col :span="8">
              <el-form-item label="业务标识号：">
                <el-input></el-input>
            </el-form-item>
           </el-col>
           <el-col :span="8" class="btnalign">
              <el-button type="primary">查询</el-button>
              <el-button type="primary" plain>清空</el-button>
           </el-col>
        </el-form>
      </el-row>
      <div class="divider divider-horizontal"></div>

      <el-row>
        <el-col :span="24">
          <div class="button-group">
            <ul class="ul-inline">
              <li class="executingtitle">重复交易追溯</li>
            </ul>
            <ul class="ul-inline" style="float:right">
              <li><el-button @click="allDetail = true" style="float: right; padding: 3px 0" type="text">查看详情</el-button></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="contrastfilewrap">
            <el-steps align-center>
              <el-step>
                <template slot="title">
                  <el-button type="text" @click="detail = true">执行ID=1</el-button>
                </template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
              <el-step>
                <template slot="title"><el-button type="text" @click="detail = true">执行ID=2</el-button></template>
                <template slot="description">处理结果：成功</template>
              </el-step>
            </el-steps>
          </div>
        </el-col>
      </el-row>

    </el-card>

    <el-dialog title="处理详情" width="80%" :visible.sync="detail">
        <el-form ref="form" :model="form" label-width="120px">
          <el-row>
            <el-col :span="8"><el-form-item label="执行ID：">1</el-form-item></el-col>
            <el-col :span="8"><el-form-item label="报告机构编码：">010046101023211</el-form-item></el-col>
            <el-col :span="8"><el-form-item label="交易日期：">20170731</el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><el-form-item label="业务标识号：">201707311136385110133</el-form-item></el-col>
            <el-col :span="8"><el-form-item label="处理启动时间：">2018-01-04 03:05:05</el-form-item></el-col>
            <el-col :span="8"><el-form-item label="处理结束时间：">2018-01-04 03:05:06</el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><el-form-item label="总耗时：">1 sec</el-form-item></el-col>
            <el-col :span="8"><el-form-item label="执行用户：">分析员001</el-form-item></el-col>
          </el-row>
        </el-form>
        <el-table :data="gridData">
          <el-table-column type="selection" fixed></el-table-column>
          <el-table-column type="index" label="序号" fixed></el-table-column>
          <el-table-column min-width="150" prop="RICD" label="报告机构编码RICD"></el-table-column>
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
      </el-dialog>

      <el-dialog title="处理详情" width="80%" :visible.sync="allDetail">
        <el-table :data="allData">
          <!-- <el-table-column type="selection" fixed></el-table-column>
          <el-table-column type="index" label="序号" fixed></el-table-column> -->
          <el-table-column min-width="100" prop="EXEID" label="执行ID" fixed="left"></el-table-column>
          <el-table-column min-width="150" prop="RICD" label="报告机构编码RICD"></el-table-column>
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
        <el-pagination
        :current-page="currentPage" background=""
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: false,
      allDetail: false,
      currentPage: 1,
      currentPage2: 1,
      show: false,
      form: {
        code: 'first',
        time: 'first'
      },
      value1: '',
      value2: '',
      value3: '',
      tableData: [{
        exeId: '101',
        organ: '010046101023211',
        date: '20170731',
        mark: '201707311136385110133',
        startDate: '2018-01-04 03:05:05',
        endDate: '2018-01-04 03:05:06',
        totla: '1 sec',
        resultState: '成功',
        exector: '分析员001'
      }, {
        exeId: '100',
        organ: '010046101023211',
        date: '20170731',
        mark: '201707311136385110133',
        startDate: '2018-01-04 03:05:05',
        endDate: '2018-01-04 03:05:06',
        totla: '1 sec',
        resultState: '失败',
        exector: '分析员002'
      }, {
        exeId: '99',
        organ: '010046101023211',
        date: '20170731',
        mark: '201707311136385110133',
        startDate: '2018-01-04 03:05:05',
        endDate: '2018-01-04 03:05:06',
        totla: '3 sec',
        resultState: '成功',
        exector: '分析员003'
      }, {
        exeId: '98',
        organ: '010046101023211',
        date: '20170731',
        mark: '201707311136385110133',
        startDate: '2018-01-04 03:05:05',
        endDate: '2018-01-04 03:05:06',
        totla: '1 sec',
        resultState: '成功',
        exector: '分析员004'
      }, {
        exeId: '97',
        organ: '010046101023211',
        date: '20170731',
        mark: '201707311136385110133',
        startDate: '2018-01-04 03:05:05',
        endDate: '2018-01-04 03:05:06',
        totla: '2 sec',
        resultState: '失败',
        exector: '分析员005'
      }, {
        exeId: '96',
        organ: '010046101023211',
        date: '20170731',
        mark: '201707311136385110133',
        startDate: '2018-01-04 03:05:05',
        endDate: '2018-01-04 03:05:06',
        totla: '1 sec',
        resultState: '成功',
        exector: '分析员006'
      }, {
        exeId: '95',
        organ: '010046101023211',
        date: '20170731',
        mark: '201707311136385110133',
        startDate: '2018-01-04 03:05:05',
        endDate: '2018-01-04 03:05:06',
        totla: '1 sec',
        resultState: '失败',
        exector: '分析员007'
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
      },
      {
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
      }],
      allData: [{
        EXEID: '1',
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
      }, {
        EXEID: '1',
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
      }, {
        EXEID: '2',
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
      }, {
        EXEID: '2',
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
      }, {
        EXEID: '3',
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
      }, {
        EXEID: '3',
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
    handleDetail() {
      this.show = true
    }
  }
}
</script>

<style lang="scss">
.resultIddetail {
  .el-card__header { // 标题
    .spantitle {
      color: #409EFF;
    }
    b {
      margin: 0 4px;
    }
    .spantitle2 {
      font-size: 0.9rem;
    }
  }
  .prompt {
    font-size: 0.8rem;
    color:#999;
    padding-bottom: 15px;
  }
  .ruleinfo {
    font-size: 0.8rem;
    span {
      margin-right: 20px;
    }
    label {
      color: #666;
    }
  }
  .executingtitle {
    font-size: 1rem;
    font-weight: bold;
    margin: 10px 0;
  }
  .btnalign {
    text-align: right;
  }
  .contrastfilewrap {
    overflow-x: auto;
    padding: 20px 0;
    min-height: 40vh;
    .el-step.is-center .el-step__description {
      padding: 0 10%;
      width: 100%;      
    }
  }
}
</style>
