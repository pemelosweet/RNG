<template>
  <div class="judgedClues_subsequent">
    <el-card>
      <div slot="header">
        <span>人民银行分支机构机上报分析申请</span>
        <div class="headerTip" style="float:right">
          <span>分支行： ***分行</span>
          <span>当前状态：已提交</span>
          <span>编号：111111-2017-03-0001</span>
        </div>
      </div>
      <el-form>
        <div class="block">
          <div class="itemBlock">
            <el-form-item label="上报分析申请名称： " label-width="140px">
              <el-input v-model="baseCase.clueName" placeholder="关于xxx的研判线索" disabled></el-input>
            </el-form-item>
            <el-form-item label=" 报告机构： " label-width="140px">
              <el-input v-model="baseCase.branch" placeholder="xx报告机构" disabled></el-input>
            </el-form-item>
            <el-form-item label="关联移动记录： " label-width="140px">
              <el-input v-model="baseCase.transfer" placeholder="xx移动记录" disabled></el-input>
            </el-form-item>
          </div>
          <div class="itemBlock">
            <el-form-item label="分析触发点： " label-width="140px">
              <el-radio-group v-model="baseCase.trigger">
                <el-radio label="1">可疑交易报告</el-radio>
                <el-radio label="2" disabled>行政调查</el-radio>
                <el-radio label="3" disabled>现场检查</el-radio>
                <el-radio label="4" disabled>举报</el-radio>
                <el-radio label="5" disabled>
                  <el-input v-model="baseCase.redioValue" placeholder="其他" disabled></el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="itemBlock">
            <el-form-item label="涉案类型： " label-width="140px">
              <el-row>
                <el-col :span="24">
                  <el-checkbox-group v-model="baseCase.type">
                    <el-checkbox label="1">涉嫌与犯罪贩毒有关的可疑交易</el-checkbox>
                    <el-checkbox label="2" disabled>涉嫌与跨国洗钱有关的可疑交易</el-checkbox>
                    <el-checkbox label="3" disabled>
                      <el-input v-model="baseCase.checkValue" placeholder="其他" disabled></el-input>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
        </div>

        <div class="divider divider divider-horizontal"></div>

        <div class="block">
          <h4>可疑交易基本情况</h4>
          <div class="itemBlock">
            <div>
              <el-form-item label="交易发生地：" label-width="120px">
                <el-input v-model="tradeCondition.dealAdress" placeholder="山东省青岛市" disabled></el-input>
              </el-form-item>
            </div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="交易日期：" label-width="120px">
                    <el-date-picker disabled v-model="tradeCondition.tradeDate" type="daterange" range-separator="至" start-placeholder="2017-10-10" end-placeholder="2018-1-10" unlink-panels></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="本币金额：" label-width="120px">
                    <el-input v-model="tradeCondition.currency" placeholder="1000" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外币金额（折万美元）：" label-width="180px">
                    <el-input v-model="tradeCondition.foreign" placeholder="200" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </div>
            <div>
              <el-form-item label="分析概述：" label-width="120px">
                <el-input v-model="tradeCondition.analyze" type="textarea" placeholder="分析概述分析概述分析概述分析概述分析概述分析概述"></el-input>
              </el-form-item>
            </div>

          </div>
        </div>

        <div class="divider divider divider-horizontal"></div>

        <div class="block">
          <h4>主要交易主体及交易对手基本情况</h4>
          <div class="itemBlock">
            <div class="dataList">
              <el-table :data="dataTable">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="单位名称">
                  <template slot-scope="scope">
                    <span>{{scope.row.unit}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="证件类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.value}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="证件号码">
                  <template slot-scope="scope">
                    {{scope.row.card}}
                  </template>
                </el-table-column>
                <el-table-column label="主体/对手">
                  <template slot-scope="scope">
                    主体
                  </template>
                </el-table-column>
              </el-table>

            </div>

          </div>
          <div class="itemBlock">
            <div class="dataList">
              <el-table :data="dataTable2">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="账户名称">
                  <template slot-scope="scope">
                    {{scope.row.name}}
                  </template>
                </el-table-column>
                <el-table-column label="账户号码（卡号）">
                  <template slot-scope="scope">
                    {{scope.row.card}}
                  </template>
                </el-table-column>
                <el-table-column label="开户行">
                  <template slot-scope="scope">
                    {{scope.row.bank}}

                  </template>
                </el-table-column>
                <el-table-column label="代办人名称">
                  <template slot-scope="scope">
                    {{scope.row.agent}}
                  </template>
                </el-table-column>
                <el-table-column label="代办人证件号">
                  <template slot-scope="scope">
                    {{scope.row.agentNo}}
                  </template>
                </el-table-column>
              </el-table>

            </div>

          </div>
          <div class="itemBlock">
            <el-form-item label="分析报告：">
              <span>附件1</span>
            </el-form-item>

            <el-form-item label="身份信息：">
              <span>附件1</span>
            </el-form-item>

            <el-form-item label="账户信息：">
              <span>附件1</span>
            </el-form-item>

            <el-form-item label="交易明细：">
              <span> 附件1</span>
            </el-form-item>
          </div>
        </div>

        <div class="divider divider divider-horizontal"></div>

        <div class="block">
          <h4>分析研判意见</h4>
          <div class="itemBlock">
            <el-form-item label="交易发生地：" label-width="140px">
              <el-input v-model="tradeCondition.dealAdress" placeholder="山东省青岛市"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="本币金额：" label-width="140px">
                  <el-input v-model="tradeCondition.currency" placeholder="1000"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="外币金额（折万美元）：" label-width="220px">
                  <el-input v-model="tradeCondition.foreign" placeholder="200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="分析结论是否一致：" label-width="140px" class="searchBlock_special_formIten">
                  <el-select v-model="tradeCondition.isConsistent" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分析结论是否一致其他输入项：" label-width="220px" class="searchBlock_special_formIten">
                  <el-input v-model="tradeCondition.otherInput" placeholder="分析研判意见其他输入项"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="分析研判意见：" label-width="140px" class="searchBlock_special_formIten">
                  <el-select v-model="tradeCondition.analyzeAdvice" placeholder="请选择">
                    <el-option label="中心-移送" value="1"></el-option>
                    <el-option label="中心-通报" value="2"></el-option>
                    <el-option label="分支机构-通报" value="3"></el-option>
                    <el-option label="分支机构-移送" value="4"></el-option>

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分析研判意见其他输入项：" label-width="220px" class="searchBlock_special_formIten">
                  <el-input v-model="tradeCondition.o_analyzeAdvice" placeholder="分析研判意见其他输入项"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label=" 线索评价：" label-width="140px">
                  <el-select v-model="tradeCondition.cluesEvaluation" placeholder="请选择">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="线索评价其他输入项：" label-width="220px" class="searchBlock_special_formIten">
                  <el-input v-model="tradeCondition.o_cluesEvaluation" placeholder="线索评价其他输入项"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="分支机构是否可见:" label-width="140px">
                  <el-select v-model="tradeCondition.visibleToBranch" placeholder="">
                    <el-option label="不可见" value="1"></el-option>
                    <el-option label="可见" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="分析概述：" label-width="140px">
              <el-input v-model="tradeCondition.analyze" type="textarea" placeholder="分析概述分析概述分析概述分析概述分析概述分析概述"></el-input>
            </el-form-item>
            <el-form-item label="附件： " label-width="140px">
              <el-button type="text">点击添加附件</el-button>
            </el-form-item>
          </div>
        </div>

        <div class="divider divider divider-horizontal"></div>

        <div class="block">
          <h4>审核意见</h4>
          <div class="itemBlock">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="审核会议名称：" label-width="140px">
                  <el-input v-model="auditOpinion.MeetingName" placeholder="审核会议名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核会议时间：" label-width="220px">
                  <el-date-picker v-model="auditOpinion.MeetingTime" placeholder="选择时间"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="审核意见是否和分析研判意见一致:" label-width="140px" class="searchBlock_special_formIten">
                  <el-select v-model="auditOpinion.isConsistent" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核意见是否和分析研判意见一致其他输入项:" label-width="220px" class="searchBlock_special_formIten">
                  <el-input v-model="auditOpinion.otherInput" placeholder="审核意见是否和分析研判意见一致其他输入项"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label=" 审核意见:" label-width="140px" class="searchBlock_special_formIten">
                  <el-select v-model="auditOpinion.analyzeAdvice" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核意见其他输入项:" label-width="220px" class="searchBlock_special_formIten">
                  <el-input v-model="auditOpinion.o_analyzeAdvice" placeholder="审核意见其他输入项"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="领导指示：" label-width="140px">
              <el-input v-model="auditOpinion.analyze" type="textarea" placeholder="领导指示"></el-input>
            </el-form-item>
            <el-form-item label="附件： " label-width="140px">
              <span>附件1</span>
            </el-form-item>

          </div>
        </div>

        <div class="divider divider divider-horizontal"></div>

        <div class="block">
          <h4>移送情况</h4>
          <div class="itemBlock">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="移送编号：" label-width="140px">
                  <span>{{handOver.code}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="移送时间：" label-width="140px">
                  <span>{{handOver.date}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="移送方向：" label-width="140px">
                  <span>{{handOver.direction}}</span>
                </el-form-item>
              </el-col>

            </el-row >
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="交易发生地：" label-width="140px">
                  <span>{{handOver.area}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="涉罪类型：" label-width="140px">
                  <span>{{handOver.crimeType}}</span>
                </el-form-item>
              </el-col>
            </el-row>

          </div>
        </div>

        <div class="divider divider divider-horizontal"></div>

        <div class="block">
          <h4>后续办理情况</h4>
          <div class="itemBlock">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="涉罪类型：" label-width="140px">
                  <el-select v-model="followUp.crimeType" placeholder="请选择涉罪类型">
                    <el-option label="涉嫌与毒品犯罪相关的可疑交易行为" value="1"></el-option>
                    <el-option label="涉嫌与黑社会性质的可疑交易行为" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="涉罪类型其他输入项：" label-width="220px">
                  <el-input v-model="followUp.crimeOther" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="线索状态：" label-width="140px">
                  <el-select v-model="followUp.clueState" placeholder="请选择">
                    <el-option label="仅报告" value="1"></el-option>
                    <el-option label="立案" value="2"></el-option>
                    <el-option label="破案" value="3"></el-option>
                    <el-option label="撤案" value="4"></el-option>
                    <el-option label="不予立案" value="5"></el-option>

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="接收处室：" label-width="140px">
                  <el-input v-model="followUp.office" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="涉案金额：" label-width="140px">
                  <el-input v-model="followUp.sum" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="报告时间：" label-width="140px">
                  <el-date-picker v-model="followUp.reportTime" placeholder="选择日期" type="date"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="立案时间：" label-width="140px">
                  <el-date-picker v-model="followUp.fileTime" placeholder="选择日期" type="date"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结案时间：" label-width="140px">
                  <el-date-picker v-model="followUp.CloseTime" placeholder="选择日期" type="date"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="立案名目：" label-width="140px">
                  <el-input v-model="followUp.register" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专项行动及专案名称：" label-width="220px">
                  <el-input v-model="followUp.registerName" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="领导批示及有关线索的评：" label-width="140px">
              <el-input v-model="followUp.analyze" type="textarea" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="案件总结：" label-width="140px">
              <el-input v-model="followUp.analyze" type="textarea" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="交办方向：" label-width="140px">
              <el-input v-model="followUp.direction" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="附件： " label-width="140px">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <el-button type="text">点击添加附件</el-button>
              </el-upload>
            </el-form-item>

          </div>
        </div>

        <div class="divider divider divider-horizontal"></div>

        <el-row>
          <el-col :span="6">
            <el-form-item label="填报人（联系人）：">
              <span>北京营管部</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话：">
              <span>1872364532352</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核人：">
              <span>北京营管部</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话：">
              <span>1872364532352</span>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div class="saveBtn" style="paddingTop:20px">
        <router-link :to="{name:'judgedClues_manage'}">
          <el-button type="primary" plain>关 闭</el-button>
        </router-link>
        <router-link :to="{name: 'judgedClues_manage'}">
          <el-button type="primary" plain>保存</el-button>
        </router-link>
        <el-button type="primary" plain>导出线索</el-button>

      </div>

    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 3; i++) {
        data.push({
          key: i,
          label: `分析${i}处 `
        })
      }
      return data
    }
    return {
      baseCase: {
        clueName: '',
        branch: '',
        transfer: '',
        trigger: '1',
        type: ['1'],
        checkValue: '',
        redioValue: ''

      },

      dataTable: [
        {
          name: '张三',
          unit: '阿里巴巴',
          value: '身份证',
          options: [
            {
              value: '1',
              label: '身份证'
            },
            {
              value: '2',
              label: '护照'
            },
            {
              value: '3',
              label: '官兵证'
            }
          ],
          card: '130***12455248552',
          check: []
        }
      ],
      dataTable2: [
        {
          name: '张三',
          card: '652256854522454',
          bank: '北京银行上海支行',
          agent: '李四',
          agentNo: '1231564231232'
        }
      ],
      tradeCondition: {
        tradeDate: '',
        dealAdress: '',
        currency: '',
        foreign: '',
        isConsistent: '1',
        otherInput: '',
        analyzeAdvice: '1',
        o_analyzeAdvice: '',
        cluesEvaluation: '1',
        o_cluesEvaluation: '',
        visibleToBranch: '1',
        analyze: ''
      },
      auditOpinion: {
        MeetingName: '',
        MeetingTime: '',
        isConsistent: '1',
        otherInput: '',
        analyzeAdvice: '1',
        o_analyzeAdvice: '',
        analyze: ''

      },
      clue: [],
      handOver: {
        code: '110000-2018-02-67-01',
        date: '2018-02-21',
        direction: '公安部',
        area: '山东济南',
        crimeType: '关于xxx类型的犯罪'
      },
      followUp: {
        crimeType: '',
        crimeOther: '',
        clueState: '',
        office: '',
        sum: '',
        reportTime: '',
        fileTime: '',
        CloseTime: '',
        register: '',
        registerName: '',
        analyze: '',
        direction: ''
      },
      radio: '1',
      transferData: generateData(),
      value1: [1, 4],
      advice: ''
    }
  }
}
</script>

<style lang="scss">
$border: 1px solid #ebeef5;
$margin: 20px;
.judgedClues_subsequent {
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
  .headerTip {
    span {
      padding: 0 20px;
    }
  }
  .block {
    h4 {
      margin: 20px 0;
    }
    .itemBlock {
      margin-left: 5%;
      margin-bottom: $margin;
      .messageLine {
        margin-bottom: $margin;
      }
      .dataList {
        .el-col {
          text-align: center;
        }
        .listHeader {
          line-height: 40px;
          background-color: #f6f6f6;
        }
        .list {
          line-height: 50px;
        }
      }
    }
    .searchBlock_special_formIten {
      .el-form-item__label {
        line-height: inherit;
      }
    }
  }
  .uploadContent {
    border: $border;
    padding: 10px;
    .fileList {
      border-left: $border;
    }
  }
  .saveBtn {
    text-align: center;
  }

  .dialog-block {
    .title {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
    }
    .task {
      margin-bottom: 30px;
      .title {
        font-size: 16px;
        color: #333;
        margin-bottom: 10px;
      }
    }
    .el-transfer__button.el-button--primary {
      min-width: 32px;
      min-height: 32px;
    }
  }
}
</style>
