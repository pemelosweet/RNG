<template> 
  <div class="intelligenceFile_specific">
    <el-form :model="form" ref="form" :rules="rules" style="marginBottom:30px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="模板名称：" label-width="100px" prop="name">
            <el-select v-model="form.name" placeholder="请选择模板">
              <el-option v-for="item in tplOptions" :label="item.qttName" :value="item.pkQtt" :key="item.pkQtt"></el-option>
            </el-select>
            <router-link to="intelligenceFile/custom">
              <el-button type="primary" style="marginLeft:30px" plain>定制查询模板</el-button>
            </router-link>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="查询条件： " label-width="100px">
            <el-collapse v-model="activeNames">
              <!--基于线索查询-->
              <el-collapse-item name="1">
                <template slot="title">
                  <span>基于线索查询</span>
                </template>
                <div class="searchContent">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="情报函号：">
                        <el-input v-model="clue.code" placeholder="情报函号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="线索名称：">
                        <el-input v-model="clue.name" placeholder="线索名称"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="线索编号：">
                        <el-input v-model="clue.name" placeholder="线索编号"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="初步判断：" class="double">   
                        <el-select v-model="clue.judge" placeholder="请选择">
                          <el-option v-for="(item,index) in preJudgmentDoList" :key="index" :value="item.codeId" :label="item.codeName"></el-option>
                        </el-select>
                        <!-- <el-input placeholder="请输入内容" v-model="clue.other" class="other" style="width: 58%;"></el-input> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="线索类型：">
                        <el-select v-model="clue.type" placeholder="线索类型">
                          <el-option label="线索" value="1"></el-option>
                          <el-option label="协查" value="2"></el-option>
                          <el-option label="通报" value="3"></el-option>
                          <el-option label="分支行上报分析申请" value="4"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="移送方向：">
                        <el-select v-model="clue.type" placeholder="移送方向">
                          <el-option label="公安" value="1"></el-option>
                          <el-option label="海关" value="2"></el-option>
                          <el-option label="其他" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="分析概述：">
                        <el-input v-model="clue.statement" placeholder="分析概述"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="移送时间：">
                        <el-date-picker v-model="clue.dateValue" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label-width="160px">
                        <template slot="label">
                          <span>触发点类别：</span>
                          <el-checkbox label="全选" :indeterminate="area.isIndeterminate" v-model="area.checkAll" @change="handleCheckAll"></el-checkbox>
                        </template>
                        <div>
                          <el-checkbox-group v-model="area.checkedArr" @change="handleCheckedChange">
                            <el-checkbox v-for="item in area.sourceData" :label="item" :key="item"></el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="关联文件编号：" label-width="120px">
                        <el-input v-model="area.fileNo" placeholder="关联文件编号"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <!--通过线索主体关联可疑交易报告-->
              <el-collapse-item name="2">
                <template slot="title">
                  <span>通过线索主体关联可疑交易报告</span>
                </template>
                <div class="searchContent">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="报告ID：">
                        <el-input v-model="report.ID" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="报告机构名称：">
                        <el-autocomplete v-model="report.branchName" value-key="rinm" placeholder="报告机构名称" :fetch-suggestions="querySearchRinm" :trigger-on-focus="false"></el-autocomplete>
                        <!-- <el-select v-model="report.branchName" placeholder="">
                          <el-option label="全部" value="1"></el-option>
                          <el-option label="中国人民银行" value="2"></el-option>
                          <el-option label="中国建设银行" value="3"></el-option>
                        </el-select> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="报告机构行业：">
                        <el-select v-model="report.business" placeholder="">
                          <el-option v-for="item in this.businessOptions" :key="item" :label="银行业" :value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="落地时间：">
                        <el-date-picker v-model="report.time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" unlink-panels></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="主体名称：">
                        <el-input v-model="report.name" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="主体/对手：">
                        <el-select v-model="report.main">
                          <el-option value="" label="主体"></el-option>
                          <el-option value="" label="个人"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="主体证件号码：">
                        <el-input></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="可疑描述：">
                        <el-input v-model="report.describe" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="可疑特征：">
                        <el-input v-model="report.feature" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <!--通过线索关联交易-->
              <el-collapse-item name="3">
                <template slot="title">
                  <span>通过线索关联交易</span>
                </template>
                <div class="searchContent">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="付款方名称：">
                        <el-input v-model="trade.payName" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="收款方名称：">
                        <el-input v-model="trade.receiveName" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="付款方证件号：">
                        <el-input v-model="trade.payID" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="收款方证件号：">
                        <el-input v-model="trade.receiveID" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="付款方国籍：">
                        <el-input v-model="trade.payNational" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="收款方国籍：">
                        <el-input v-model="trade.receiveNational" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="付款方银行：">
                        <el-input v-model="trade.payBank" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="收款方银行：">
                        <el-input v-model="trade.receiveBank" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="交易时间段：">
                        <el-date-picker v-model="trade.time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" unlink-panels>
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="交易方式：">
                        <el-select v-model="trade.type" placeholder="">
                          <el-option label="现金" value="1"></el-option>
                          <el-option label="银行转账" value="2"></el-option>
                          <el-option label="保险" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="货币名称：">
                        <el-input v-model="trade.currencyName" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8"> 
                      <el-form-item label="交易发生地：" prop="city">
                        <el-select v-model="trade.area" @change="handleInterRegionChange" style="width: 40%;" clearable>
                          <el-option label="中国" value="CHN"></el-option>
                          <el-option label="大陆地区保税区" value="Z01"></el-option>
                          <el-option label="大陆地区加工区" value="Z02"></el-option>
                          <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                          <el-option label="国际" value="NAT"></el-option>
                        </el-select>
                        <el-cascader v-if="trade.area !== 'NAT'" style="width: 58%;" expand-trigger="hover" :options="cityListOptions" v-model="trade.city" clearable>
                        </el-cascader>

                        <el-select v-if="trade.area === 'NAT'" style="width: 58%;" v-model="trade.city" clearable>
                          <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="涉外收支分类：">
                        <el-input v-model="trade.classify" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="交易用途：">
                        <el-input v-model="trade.use" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="代办人名称：">
                        <el-input v-model="trade.agencyName" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="代办人证件号：">
                        <el-input v-model="trade.agencyID" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8"> 
                      <el-form-item label="报告机构：">
                        <el-autocomplete v-model="trade.branchName" value-key="rinm" placeholder="报告机构" :fetch-suggestions="querySearchRinm" :trigger-on-focus="false"></el-autocomplete>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>

              <el-collapse-item name="4">
                <template slot="title">
                  <span>关联名单库</span>
                </template>
                <div class="searchContent">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="主体名称：">
                        <el-input></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="主体证件号码：">
                        <el-input></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="主体类型：">
                        <el-select v-model="branch.mainType" clearable>
                          <el-option label="个人" value="0"></el-option>
                          <el-option label="机构" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="来源方向：">
                        <el-select v-model="branch.direction">
                          <el-option label="" value=""></el-option>
                          <el-option label="" value=""></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="初步判断：" class="double">
                          <el-select v-model="clue.judge" placeholder="请选择">
                            <el-option v-for="(item,index) in preJudgmentDoList" :key="index" :value="item.codeId" :label="item.codeName"></el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="来源业务：">
                        <el-select v-model="branch.business">
                          <el-option label="" value=""></el-option>
                          <el-option label="" value=""></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>

             <el-collapse v-model="activeNamesTwo">
              <!--基于线索查询-->
              <el-collapse-item name="1">
                <template slot="title">
                  <span>分支机构上报线索库查询</span>
                </template>
                <div class="searchContent">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="分支行名称：">
                        <el-input placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="线索编号：">
                        <el-input placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="线索状态：" class="double">
                        <el-select v-model="branch.clueState">
                          <el-option label="仅报告" value="justReport"></el-option>
                          <el-option label="立案" value=""></el-option>
                          <el-option label="破案" value=""></el-option>
                          <el-option label="撤案" value=""></el-option>
                          <el-option label="不予立案" value=""></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="初步判断：" class="double">
                        <el-select v-model="clue.judge" placeholder="请选择">
                          <el-option v-for="(item,index) in preJudgmentDoList" :key="index" :value="item.codeId" :label="item.codeName"></el-option>
                        </el-select>
                        <!-- <el-input placeholder="请输入内容" v-model="clue.other" class="other" style="width: 58%;"></el-input> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="主体名称：">
                        <el-input placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="案件侦破情况：">
                        <el-input v-model="branch.case" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="提交日期：">
                        <el-input v-model="branch.date" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="专项行动或专案要案名称：">
                        <el-input v-model="branch.caseName" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="领导批示及有关方面对线索的评价：">
                        <el-input v-model="branch.evaluate" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="案情总结：">
                        <el-input v-model="branch.summarize" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="是否有附件：" class="double">
                        <el-select v-model="branch.attachment" placeholder="选择附件">
                          <el-option label="有" value="1"></el-option>
                          <el-option label="无" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                </el-collapse-item>
              </el-collapse>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align: right;" ><el-button type="primary">查 询</el-button><el-button type="primary">清 空</el-button></el-row>
    </el-form>

    <div class="listBlock">
      <el-row style="marginBottom:10px">
        <el-col :span="12">
          <span>基于线索查询结果列表：</span>
          <el-button type="primary" plain>批量导出</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData">
        <el-table-column type="selection" width="60" fixed></el-table-column>
        <el-table-column label="序号" type="index" width="60" fixed></el-table-column>
        <el-table-column label="流水号" prop="serialnumber" min-width="100"></el-table-column>
        <el-table-column label="情报函号" prop="letternum" min-width="100"></el-table-column>
        <el-table-column label="线索编号" prop="cluenum" min-width="100"></el-table-column>
        <el-table-column label="线索名称" prop="cluename" min-width="100"></el-table-column>
        <el-table-column label="线索类型" prop="cluetype" min-width="100"></el-table-column>
        <el-table-column label="分析员" prop="analyst" min-width="100"></el-table-column>
        <el-table-column label="移送时间" prop="time" min-width="120"></el-table-column>
        <el-table-column label="初步判断" prop="jude" min-width="120"></el-table-column>
        <el-table-column label="移送方向" prop="transfer" min-width="120"></el-table-column>
        <el-table-column label="触发点类别" prop="trigger" min-width="160"></el-table-column>
        <el-table-column label="关联触发点文件编号" prop="triggerNo" min-width="120"></el-table-column>
        <el-table-column label="情报字函" prop="backInfo" min-width="120" fixed="right">
          <template slot-scope="scope">
            <router-link to="intelligenceFile/feedback">
              <el-button type="text">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="线索表/协查表/通报表" prop="clueInfo" min-width="100" fixed="right">
          <template slot-scope="scope">
            <router-link to="intelligenceFile/view">
              <el-button type="text" @click="handleClue(scope)">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="移送主体信息" prop="mainInfo" min-width="120" fixed="right">
          <template slot-scope="scope">
            <router-link to="intelligenceFile/view">
              <el-button type="text" @click="handleTransfer(scope)">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="常规附件" prop="attachment" min-width="100" fixed="right">
          <template slot-scope="scope">
            <router-link to="intelligenceFile/view">
              <el-button type="text" @click="hanlde">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="其他附件" prop="otherAttach" min-width="100" fixed="right">
          <template slot-scope="scope">
            <router-link to="intelligenceFile/view">
              <el-button type="text">查看</el-button>
            </router-link>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页 -->

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
    </div>

    <!-- 对话框 -->
    <el-dialog title="分支机构" :visible.sync="dialog.dialogVisible" class="dialog">
      <el-form :model="dialog">
        <el-checkbox-group v-model="dialog.checkedArr">
          <el-checkbox v-for="item in dialog.sourceData" :label="item" :value="item" :key="item"></el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getTplList, getCRinmList, dictionary, viewTransferData, viewClueData } from '@/api/sys-monitoringAnalysis/dataQuery/informationArchives/specific.js'
import { getArea, country } from '@/api/common/citys'
import { industry } from '@/api/common/industry.js'

export default {
  data() {
    return {
      activeNames: [],
      activeNamesTwo: [],
      form: {
        name: ''
      },
      tplOptions: [], // 模板列表
      preJudgmentDoList: [], // 初步判断
      businessOptions: [], // 报告机构行业
      rules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      clue: {
        code: '',
        name: '',
        type: '',
        judge: '',
        statement: '',
        dateValue: ''
      },
      area: {
        checkAll: false,
        checkedArr: [],
        isIndeterminate: true,
        sourceData: [
          '境内受托协查',
          '境外情报协查',
          '重点可疑交易报告',
          '名单预警结果',
          '分支机构上报分析申请',
          '报告机构专报',
          '遴选模型',
          '规则'
        ],
        fileNo: ''
      },
      report: {
        ID: '',
        branchName: '',
        business: '',
        name: '',
        main: '',
        time: '',
        describe: '',
        feature: '',
        handle: ''
      },
      trade: {
        branchName: '',
        use: '',
        time: '',
        payName: '',
        receiveName: '',
        payID: '',
        receiveID: '',
        national: '',
        receiveNational: '',
        payBank: '',
        receiveBank: '',
        type: '',
        area: '', // 交易发生地
        city: '', // 交易发生地
        classify: '',
        agencyName: '',
        agencyID: ''
      },
      countryData: [], // 交易发生地
      cityListOptions: [], // 交易发生地
      branch: {
        clueState: 'justReport',
        checkedArr: [],
        case: '',
        caseName: '',
        date: '',
        attachment: '',
        evaluate: '',
        summarize: '',
        mainType: 'unit',
        direction: '',
        business: ''
      },
      dialog: {
        checkedArr: [],
        sourceData: [
          '分支行名称',
          '分支行名称22',
          '分支行名称33',
          '分支行名称44',
          '分支行名称55',
          '分支行名称66',
          '分支行名称77',
          '分支行名称88'
        ],
        dialogVisible: false
      },
      tableData: [
        {
          serialnumber: 'C0000001',
          letternum: 'C0000001',
          cluenum: 'XXXXX001',
          cluename: '',
          cluetype: '',
          analyst: '张三',
          time: '2017-11-07 14：00',
          jude: '',
          transfer: '海关',
          trigger: '',
          triggerNo: ''
        },
        {
          serialnumber: 'C0000001',
          letternum: 'C0000001',
          cluenum: 'XXXXX001',
          cluename: '',
          cluetype: '',
          analyst: '张三',
          time: '2017-11-07 14：00',
          jude: '',
          transfer: '公安',
          trigger: '',
          triggerNo: ''
        }
      ],
      currentPage: 1
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getTplList().then(res => {
        if (res.code === 200) {
          this.tplOptions = res.data.list
        }
      }).catch()

      industry().then(res => {
        if (res.code === 200) {
          this.businessOptions = res.data.list
        }
      })
      this.getDictionary('TOSC')
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.preJudgmentDoList = res.data
              break

            default:
              break
          }
        }
      })
    },
    handleCheckAll(val) {
      this.area.checkedArr = val ? this.area.sourceData : []
      this.area.isIndeterminate = false
    },
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.area.checkAll = checkedCount === this.area.sourceData.length
      this.area.isIndeterminate = checkedCount > 0 && checkedCount < this.area.sourceData.length
    },
    // 交易发生地
    getArea() {
      getArea() // 获取交易地址
        .then(res => {
          if (res.code === 200) {
            this.cityListOptions = res.data
          } else {
            res.message
          }
        })
        .catch()
    },
    // 获取省份
    getCountry() {
      country().then(res => {
        if (res.code === 200) {
          this.countryData = res.data.list
        }
      })
    },
    querySearchRinm(query, cb) { // 报告机构
      if (query !== '') {
        getCRinmList(query).then(res => {
          if (res.code === 200) {
            cb(res.data)
          }
        })
      } else {
        // this.rinmData = []
      }
    },
    handleInterRegionChange(val) {
    // 交易发生地
      if (val !== 'NAT') {
        this.getArea()
      } else if (val === 'NAT') {
        this.getCountry()
      }

      this.trade.area = []
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClue(scope) {
      const clueType = scope.row.clueType
      const infoId = scope.row.infoId
      viewClueData(clueType, infoId).then(res => {
        if (res.code === 200) {
          console.log('2')
        }
      }).catch()
    },
    handleTransfer(scope) { // 查看移送主体
      viewTransferData().then(res => {
        if (res.code === 200) {
          console.log('1')
        }
      }).catch()
    }
  }
}
</script>

<style lang="scss">
.intelligenceFile_specific {
  .el-collapse {
    margin-top: 5px;
    border: 1px solid #d9d9d9;
    .el-collapse-item__header {
      border-bottom: 1px solid #d9d9d9;

      background: #fafafa;
      .el-collapse-item__arrow {
        float: left;
        margin-left: 20px;
        line-height: 48px;
      }
    }
    .el-collapse-item__content {
      padding: 20px 10px;
    }
    .el-select {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 7px;
    }
    .double {
      // .el-form-item__label {
      //   width: 100%;
      //   text-align: left;
      // }
      // .el-select {
      //   // width: 40%;
      //   .el-input {
      //     width: 100%;
      //     .el-input__inner {
      //       border-right: none;
      //       border-top-right-radius: 0;
      //       border-bottom-right-radius: 0;
      //     }
      //   }
      // }
      // .other {
      //   width: 60%;
      //   .el-input__inner {
      //     border-top-left-radius: 0;
      //     border-bottom-left-radius: 0;
      //   }
      // }
    }
  }
  .searchContent {
    .el-checkbox-group {
      margin-left: 20px;
      .el-checkbox {
        margin-left: 20px;
      }
      .more {
        font-size: 14px;
        color: #409eff;
        border-bottom: 1px solid #409eff;
        cursor: pointer;
      }
    }
    .el-range-editor.el-range-editor {
      min-width: 100%;
    }
  }
  .dialog {
    .el-checkbox {
      margin-left: 20px;
    }
  }
}
</style>
