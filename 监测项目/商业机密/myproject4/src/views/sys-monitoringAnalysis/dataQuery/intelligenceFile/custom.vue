<template>
  <div class="intelligenceFile_custom">
    <el-card>
      <a @click="routerBack" class="back" :style="backImg"></a>
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>线索查询模板</span>
          </el-col>
        </el-row>
      </div> 
      <el-form class="formBlock" :model="cForm">
        <!-- 头部 -->
        <div class="header">
          <el-row>
            <el-col :span="10" :offset="1">
              <el-form-item label="模板名称：" label-width="120px">
                <el-input v-model="cForm.templateName" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 线索查询 -->
        <div class="block">
          <el-row class="blockTitle">
            <el-col :span="24">
              <span>线索查询：</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="情报函号：" >
                <el-input v-model="cForm.cluseQueryDO.intelligenceLette" placeholder="情报函号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="线索名称：">
                <el-input v-model="cForm.cluseQueryDO.threadName" placeholder="线索名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="线索编号：">
                <el-input v-model="cForm.cluseQueryDO.threadId" placeholder="线索编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="初步判断："  class="double" prop="preliminaryJudgme">
                <el-select v-model="cForm.cluseQueryDO.preliminaryEstimateDO.preliminaryJudgme" placeholder="请选择" clear multiple>
                  <el-option v-for="(item,index) in preJudgmentDoList" :key="index" :value="item.codeId" :label="item.codeName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="线索类型：">
                <el-select v-model="cForm.cluseQueryDO.threadType" placeholder="线索类型">
                  <el-option label="线索" value="1"></el-option>
                  <el-option label="协查" value="2"></el-option>
                  <el-option label="通报" value="3"></el-option>
                  <el-option label="分支行上报分析申请" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="移送方向：">
                <el-select v-model="cForm.cluseQueryDO.evokeDirection" placeholder="移送方向">
                  <el-option label="公安" value="0"></el-option>
                  <el-option label="海关" value="1"></el-option>
                  <el-option label="其他" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" :offset="1">
              <el-form-item label="分析概述：">
                <el-input v-model="cForm.cluseQueryDO.analyzeSummarize" placeholder="分析概述"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="移送时间：">
                <el-date-picker v-model="cForm.cluseQueryDO.dateValue" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">  
              <el-form-item label-width="160px">
                <template slot="label">
                  <span>触发点类别：</span>
                  <el-checkbox label="全选" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll"></el-checkbox>
                </template>
                <div>
                  <el-checkbox-group  v-model="cForm.cluseQueryDO.triggerCategory" @change="handleCheckedChange">
                    <el-checkbox  v-for="item in sourceData" :label="item" :key="item"></el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="关联文件编号：" label-width="120px">
                <el-input v-model="cForm.cluseQueryDO.relevanceId" placeholder="关联文件编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="font-size: 12px; color:#F56C6C; margin: 10px 0 0 10px; ">*支持录入多个文件编号，编号之间用“；”隔开</el-col>
          </el-row>
        </div>
        <!-- 通过线索主体关联可疑交易报告 -->
        <div class="block">
          <el-row class="blockTitle">
            <el-col :span="24">
              <span>通过线索主体关联可疑交易报告：</span>
            </el-col>
          </el-row> 
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="报告ID：">
                <el-input v-model="cForm.informMakeDO.reportId" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="报告机构行业：">
                <el-select v-model="cForm.informMakeDO.reportIndustry" placeholder="">
                  <el-option label="银行业" value="B"></el-option>
                  <el-option label="证券业" value="S"></el-option>
                  <el-option label="保险业" value="I"></el-option>
                  <el-option label="银联业" value="U001"></el-option>
                  <el-option label="支付业" value="P001"></el-option>
                  <el-option label="资金清算" value="Z001"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="报告机构名称："> 
                <el-autocomplete v-model="cForm.informMakeDO.reportName" value-key="rinm" placeholder="报告机构" :fetch-suggestions="querySearchRinm" :trigger-on-focus="false"></el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="落地时间：">
                <el-date-picker
                  v-model="cForm.informMakeDO.fallTime" 
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  unlink-panels
                  ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="主体名称：">
                <el-input v-model="cForm.informMakeDO.subjectName" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="主体/对手：">
                <el-select v-model="cForm.informMakeDO.subjectRival">
                  <el-option value="0" label="主体"></el-option>
                  <el-option value="1" label="对手"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="主体证件号码：">
                <el-input v-model="cForm.informMakeDO.subjectNumber" placeholder="主体证件号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="可疑描述：">
                <el-input v-model="cForm.informMakeDO.dubiousAccount" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="可疑特征：">
                <el-input v-model="cForm.informMakeDO.dubiousTrait" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
        </div>
        <!-- 通过线索关联交易 -->
        <div class="block">
          <el-row class="blockTitle">
            <el-col :span="24">
              <span>通过线索关联交易：</span>
            </el-col>
          </el-row>
      
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="付款方名称：">
                <el-input v-model="cForm.associationDealDO.payerName" placeholder="付款方名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="收款方名称：">
                <el-input v-model="cForm.associationDealDO.payeeName" placeholder="收款方名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="付款方证件号：">
                <el-input v-model="cForm.associationDealDO.payerIdnumber" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="收款方证件号：">
                <el-input v-model="cForm.associationDealDO.payeeIdnumber" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="付款方国籍：">
                <el-input v-model="cForm.associationDealDO.payerNationality" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="收款方国籍：">
                <el-input v-model="cForm.associationDealDO.payeeNationality" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="付款方银行：">
                <el-input v-model="cForm.associationDealDO.payerBank" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="收款方银行：">
                <el-input v-model="cForm.payeeBank" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="交易时间段：">
                <el-date-picker 
                  v-model="cForm.associationDealDO.dealTime" 
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  unlink-panels
                  >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="交易方式：">
                <el-select v-model="cForm.associationDealDO.dealMode" placeholder="交易方式">
                  <el-option v-for="item in tradeWayOptions" :key="item.pkMcd" :label="item.codeName" :value="item.pkMcd"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="货币名称：">
                <el-input v-model="cForm.associationDealDO.currencyName" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="交易发生地：">
                 <el-select v-model="cForm.associationDealDO.dealLocality" @change="handleInterRegionChange" style="width: 40%;" clearable>
                  <el-option label="中国" value="CHN"></el-option>
                  <el-option label="大陆地区保税区" value="Z01"></el-option>
                  <el-option label="大陆地区加工区" value="Z02"></el-option>
                  <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                  <el-option label="国际" value="NAT"></el-option>
                </el-select>
                <el-cascader v-if="cForm.associationDealDO.dealLocality !== 'NAT'" style="width: 58%;" expand-trigger="hover" :options="cityListOptions" v-model="cForm.associationDealDO.city" clearable>
                </el-cascader>

                <el-select v-if="cForm.associationDealDO.dealLocality === 'NAT'" style="width: 58%;" v-model="cForm.associationDealDO.city" clearable>
                  <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="涉外收支分类：">
                <el-select v-model="cForm.associationDealDO.concerningClassif">
                  <el-option label="全部" value="all"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="交易用途：">
                <el-input v-model="cForm.associationDealDO.daelUse" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="代办人名称：">
                <el-input v-model="cForm.associationDealDO.publicName" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="代办人证件号：">
                <el-input v-model="cForm.associationDealDO.publicIdnumber" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="报告机构：">
                <el-select v-model="cForm.associationDealDO.reportOrganizatio" placeholder="">
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="中国人民银行" value="2"></el-option>
                  <el-option label="中国建设银行" value="3"></el-option>
                </el-select>
              </el-form-item>
           </el-col>
          </el-row>
        </div>
        <!-- 分支机构对外报告线索库 -->
        <div class="block">
          <el-row class="blockTitle">
            <el-col :span="24">
              <span>分支机构对外报告线索库：</span>
            </el-col>
          </el-row>
          <el-row style="padding: 16px 0;">
            <el-col :span="21" :offset="1">
              <el-form-item label="分支行名称：" label-width="100px">
                <!-- <el-select v-model="cForm.openAccountName" placeholder=""> -->
                  <!-- <ElOption v-for="" :key=""></ElOption> -->
                <!-- </el-select> -->
                <el-input  v-model="cForm.branchClueDO.openAccountName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="线索状态：">
                <el-select v-model="cForm.branchClueDO.state">
                  <el-option label="仅报告" value="1"></el-option>
                  <el-option label="立案" value="2"></el-option>
                  <el-option label="破案" value="3"></el-option>
                  <el-option label="撤案" value="4"></el-option>
                  <el-option label="不予立案" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="主体名称：">
                <el-input v-model="cForm.branchClueDO.subjectBName" placeholder="主体名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="案件侦破情况：">
                <el-input v-model="cForm.branchClueDO.caseDetected" placeholder="案件侦破情况"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="提交日期：">
                <el-date-picker 
                  v-model="cForm.branchClueDO.infosaveDate" 
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  unlink-panels
                  > 
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="专项行动或专案要案名称：">
                <el-input v-model="cForm.branchClueDO.specificProject" placeholder="专项行动或专案要案名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="领导批示及有关方面对线索的评价：">
                <el-input v-model="cForm.branchClueDO.leadConcern" placeholder="领导批示及有关方面对线索的评价"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="1">
              <el-form-item label="案情总结：">
                <el-input v-model="cForm.branchClueDO.caseSummarize" placeholder="案情总结"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="7" :offset="1">
              <el-form-item label="是否有附件：">
                <el-select v-model="cForm.branchClueDO.whetherAdjunct" placeholder="选择附件">
                  <el-option label="有" value="0"></el-option>
                  <el-option label="无" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="block">
            <el-row class="blockTitle">
              <el-col :span="24">
                <span>关联名单库：</span>
              </el-col>
            </el-row>
      
            <el-row :gutter="20">
              <el-col :span="7" :offset="1">
                <el-form-item label="主体名称：">
                  <el-input v-model="cForm.relevancyPanelDO.listName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="主体证件号码：">
                  <el-input v-model="cForm.relevancyPanelDO.listIdnumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="主体类型：">
                  <el-select v-model="cForm.relevancyPanelDO.subjectType">
                    <el-option label="个人" value="0"></el-option>
                    <el-option label="机构" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="7" :offset="1">
                <el-form-item label="来源方向：">
                  <el-select v-model="cForm.relevancyPanelDO.sourceDirection">
                    <el-option label="11" value="1"></el-option>
                    <el-option label="22" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="信息入库日期：">
                  <el-date-picker
                    v-model="cForm.relevancyPanelDO.messageTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="初步判断：" class="double" prop="preliminaryJudgme">
                  <el-select v-model="cForm.relevancyPanelDO.preliminaryJudgme" placeholder="请选择" clearable multiple>
                    <el-option v-for="(item,index) in preJudgmentDoList" :key="index" :value="item.codeId" :label="item.codeName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="来源业务：">
                  <el-select v-model="cForm.relevancyPanelDO.comeDirection">
                    <el-option label="11" value="0"></el-option>
                    <el-option label="22" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- button -->
        <el-row style="textAlign:right;padding:20px 0"> 
          <el-col :span="24">
            <el-button type="primary" @click="onSubmit">保 存</el-button>
          </el-col>
        </el-row> 
      </el-form>

      <div class="listBlock" style="marginBottom:30px">
        <div style="marginBottom:10px">
          <span>已保存模板列表</span>
        </div>
          <el-table :data="tableData">
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column label="序号" type="index" width="60"></el-table-column>
            <el-table-column label="模板编号" prop="templateId" ></el-table-column>
            <el-table-column label="模板名称" prop="templateName"></el-table-column>
            <el-table-column label="创建时间" prop="creationTime"></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
              <el-button type="text" @click="handleUpdate(scope)">修改</el-button>
              <el-button type="text" @click="handleDel(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]"
              :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
        
    
      </div>

      <div class="backBtn" style="textAlign:center;marginBottom:30px">
        <router-link :to="{name: 'dataQuery_intelligenceFile'}">
          <el-button type="primary">返 回</el-button>
        </router-link>
        
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
      
    </el-card>
  </div>
</template>

<script>
import { getRinmName } from '@/api/common/industry'
import { dictionary, addCustomData, delCustomData, updateCustomData, getCustomData, viewCustomData } from '@/api/sys-monitoringAnalysis/dataQuery/informationArchives/specific.js'
export default {
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      checkAll: false,
      isIndeterminate: true,
      cForm: {
        templateName: '', // 模板名称
        cluseQueryDO: { //
          intelligenceLette: '', // 情报函号
          threadName: '', // 线索名称
          threadId: '', // 线索编号
          threadType: '', // 线索类型
          analyzeSummarize: '', // 分析概述
          evokeDirection: '', // 移送方向
          dateValue: '', // 移送时间
          triggerCategory: [], // 触发点类别
          relevanceId: '', // 关联编号
          // preliminaryJudgme: [],
          timeStart: '',
          timeEnd: '',
          preliminaryEstimateDO: {
            preliminaryJudgme: []
          }
        },
        // 线索主体关联可疑交易报告条件
        informMakeDO: {
          reportId: '', // 报文ID
          reportIndustry: '', // 报告机构类型
          reportName: '', // 报文名称
          fallTime: '', // 落地时间
          subjectName: '', // 主体名称
          subjectRival: '', // 主体对手
          subjectNumber: '', // 主体证件号码
          dubiousAccount: '', // 可疑描述
          dubiousTrait: '' // 可疑特征
        },
        //
        associationDealDO: {
          payerName: '', // 付款方名称
          payeeName: '', // 收款方名称
          payerIdnumber: '', // 付款方证件号码
          payeeIdnumber: '', // 收款方证件号码
          payerNationality: '', // 付款方国籍
          payeeNationality: '', // 收款方国籍
          payerBank: '', // 付款方银行
          payeeBank: '', // 收款方银行
          dealTime: '', // 交易时间
          dealMode: '', // 交易方式
          currencyName: '', // 货币
          dealLocality: '', // 交易发生地
          city: '',
          concerningClassif: '', // 涉罪类型
          daelUse: '', // 交易用途
          publicName: '', // 代办人名称
          publicIdnumber: '', // 代办人证件号
          reportOrganizatio: '', // 报告机构
          dealTimeStart: '',
          dealTimeEnd: ''
        },
        branchClueDO: {
          openAccountName: '', // 分支行名称
          state: '', // 线索状态
          subjectBName: '', // 主体名称
          caseDetected: '', // 案件侦破情况
          infosaveDate: '', // 提交时间
          specificProject: '', // 专项行动或专案要案名称
          leadConcern: '', //  领导批示及有关方面对线索的评价
          caseSummarize: '', // 案情总结
          whetherAdjunct: '', // whetherAdjunct
          startInfosaveDat: '',
          endInfosaveDate: ''
        },
        relevancyPanelDO: { // 关联名单库
          listName: '', //
          listIdnumber: '',
          subjectType: '',
          sourceDirection: '',
          messageTime: '',
          comeDirection: '',
          establishTime: '',
          preliminaryJudgme: []
        }
      },
      sourceData: ['境内受托协查', '境外情报协查', '重点可疑交易报告', '名单预警结果', '分支机构上报分析申请', '报告机构专报', '遴选模型', '规则'],
      preJudgmentDoList: [], // 初步判断
      countryData: [], // 交易发生地
      cityListOptions: [], // 交易发生地
      tableData: [],
      pageInfo: {
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      dialog: {
        checkedArr: [],
        sourceData: ['分支行名称', '分支行名称22', '分支行名称33', '分支行名称44', '分支行名称55', '分支行名称66', '分支行名称77', '分支行名称88'],
        dialogVisible: false

      },
      tempId: '',
      tradeWayOptions: [] // 交易方式
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.getDictionary('TOSC')
      this.getDictionary('TSTP_H')

      getCustomData(this.pageInfo).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      }).catch()
    },
    handleCheckAll(val) {
      this.cForm.checkedArr = val ? this.sourceData : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.sourceData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.sourceData.length
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.preJudgmentDoList = res.data
              break
            case 'TSTP_H':
              this.tradeWayOptions = res.data
              break
            default:
              break
          }
        }
      })
    },
    routerBack() {
      this.$router.go(-1) // 返回上一层
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getData()
    },
    handleInterRegionChange(val) {
      if (val !== 'NAT') {
        this.getArea()
      } else if (val === 'NAT') {
        this.getCountry()
      }

      this.cForm.dealLocality = []
    },
    onSubmit() {
      var obj = Object.assign(this.cForm)
      obj.cluseQueryDO.timeStart = obj.cluseQueryDO.dateValue ? obj.cluseQueryDO.dateValue[0] : ''
      obj.cluseQueryDO.timeEnd = obj.cluseQueryDO.dateValue ? obj.cluseQueryDO.dateValue[1] : ''
      obj.cluseQueryDO.preliminaryEstimateDO.preliminaryJudgme = obj.cluseQueryDO.preliminaryEstimateDO.preliminaryJudgme.toString()
      obj.relevancyPanelDO.preliminaryJudgme = obj.relevancyPanelDO.preliminaryJudgme.toString()
      obj.cluseQueryDO.triggerCategory = obj.cluseQueryDO.triggerCategory.toString()
      obj.associationDealDO.dealTimeStart = obj.associationDealDO.dealTime ? obj.associationDealDO.dealTime[0] : ''
      obj.associationDealDO.dealTimeEnd = obj.associationDealDO.dealTime ? obj.associationDealDO.dealTime[1] : ''
      obj.associationDealDO.dealLocality = obj.associationDealDO.dealLocality + obj.associationDealDO.city.toString()
      obj.branchClueDO.startInfosaveDat = obj.branchClueDO.infosaveDate ? obj.branchClueDO.infosaveDate[0] : ''
      obj.branchClueDO.endInfosaveDate = obj.branchClueDO.infosaveDate ? obj.branchClueDO.infosaveDate[1] : ''
      delete obj.cluseQueryDO.dateValue
      delete obj.associationDealDO.dealTime
      delete obj.associationDealDO.city
      delete obj.branchClueDO.infosaveDate
      if (!this.tempId) {
        addCustomData(obj).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功！')
            setTimeout(() => {
              this.getData()
            }, 100)
          }
        }).catch()
      } else {
        obj.templateId = this.tempId
        updateCustomData(obj).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功！')
            setTimeout(() => {
              this.getData()
            }, 100)
          }
        }).catch()
      }
    },
    handleDel(scope) {
      this.$confirm('是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const templateId = scope.row.templateId
          delCustomData(templateId).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getData()
            }
          }).catch()
        })
        .catch(() => {})
    },
    handleUpdate(scope) {
      const templateId = scope.row.templateId
      this.tempId = scope.row.templateId
      viewCustomData(templateId).then(res => {
        if (res.code === 200) {
          this.cForm = res.data
          var obj = Object.assign(this.cForm)
          obj.cluseQueryDO.dateValue = [obj.cluseQueryDO.timeStart, obj.cluseQueryDO.timeEnd]
          obj.cluseQueryDO.preliminaryEstimateDO.preliminaryJudgme = obj.cluseQueryDO.preliminaryEstimateDO.preliminaryJudgme === '' ? [] : obj.cluseQueryDO.preliminaryEstimateDO.preliminaryJudgme.slice(',')
          obj.relevancyPanelDO.preliminaryJudgme = obj.relevancyPanelDO.preliminaryJudgme === '' ? [] : obj.relevancyPanelDO.preliminaryJudgme.slice(',')
          obj.cluseQueryDO.triggerCategory = obj.cluseQueryDO.triggerCategory === '' ? [] : obj.cluseQueryDO.triggerCategory.slice(',')
          obj.associationDealDO.dealTime = [obj.associationDealDO.dealTimeStart, obj.associationDealDO.dealTimeEnd]
          obj.associationDealDO.dealLocality = obj.associationDealDO.dealLocality === '' ? '' : obj.associationDealDO.dealLocality.slice(',')
          obj.associationDealDO.city = obj.associationDealDO.dealLocality[0]
          obj.branchClueDO.infosaveDate = [obj.branchClueDO.startInfosaveDat, obj.branchClueDO.endInfosaveDate]
        }
      }).catch()
    },
    querySearchRinm(query, cb) {
      if (query !== '') {
        if (query !== '') {
          getRinmName(query).then(res => {
            if (res.code === 200) {
              cb(res.data)
            }
          })
        }
      } else {
        // this.rinmData = []
      }
    }
  }
}
</script>

<style lang="scss">
.intelligenceFile_custom{
  position: relative;
  .formBlock{
      margin-bottom: 20px
    }
  .block{
    .el-select{
      width: 100%
    } 
    .el-form-item{
      margin-bottom: 7px;
    }
    .double{
      // .el-form-item__label{
      //   width: 100%;
      //   text-align: left;
      // }
      // .el-select{
      //   width: 40%;
      //   .el-input{
      //     width: 100%;
      //     .el-input__inner{
      //       border-right: none;
      //       border-top-right-radius: 0;
      //       border-bottom-right-radius: 0
      //     }
      //   }
      // }
      // .other{
      //   width: 60%;
      //   .el-input__inner{
      //     border-top-left-radius: 0;
      //     border-bottom-left-radius: 0
      //   }
      
      // }
    } 
    
    .el-checkbox-group{
      .el-checkbox{
        margin-left: 20px
      }
      .more{
        font-size: 14px;
        color: #409EFF;
        border-bottom:  1px solid #409EFF;
        cursor: pointer;
      }
    } 
    .el-range-editor.el-range-editor{
      min-width: 100%
    }
    .blockTitle{
      padding: 30px 0 10px 0
    }
    
  

  }
}



</style>