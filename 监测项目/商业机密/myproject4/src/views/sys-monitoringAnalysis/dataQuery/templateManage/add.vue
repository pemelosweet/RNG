<template> 
  <div class="templateManage_add">
    <el-card>
      <a
        @click="routerBack"
        class="back"
        :style="backImg"></a>
      <div slot="header">
        <span>{{ getTitle }}查询模板</span>
      </div>
      <el-form
         :model="form" ref="form" :rules="rules"
        label-width="140px">
        <div class="block clearfix">
          <el-col :span="12">
            <el-form-item
              label="模板名称："
              class="querymodel"
              label-width="120px"
              prop="qttName">
              <el-input v-model="form.qttName" placeholder="最大长度为30位" :disabled="viewVisble" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div class="block clearfix">
          <div class="subblocktitle">
            <span
              class="title"
              style=" font-size: 16px;">查询条件</span>
          </div>
          <div class="subblocktitle">
            <span class="title">主体信息</span> 
            <el-button icon="el-icon-plus" type="primary" plain style="margin-left: 26px; padding: 6px 10px;" @click="addCustomer" v-if="!viewVisble"></el-button>
            <span style="color: #f56c6c; font-size: 12px; margin-left: 10px;">温馨提示：最多可有5个主体信息；使用主体信息查询时，请先选择主体类型：选择【个人】，必须使用主体证件号码查询，选择【机构】，以主体名称或主体证件号码查询；若填写了账号，无论哪种主体类型，仅以账号为查询条件；其中主体名称、主体证件号码、账号可支持后模糊匹配查询，例：可输入“张%”，查询“张三或是张三丰”。</span>
          </div>
          <el-row :gutter="20"
            class="infoWarp clearfix"
            v-for="(item, index) in form.clientInfo"
            :key="index"
            style="border: 1px solid #dcdfe6; padding:10px 10px 0; position: relative;">
            <el-button
              class="closeBtn"
              v-if="index !== 0"
              icon="el-icon-minus"
              type="primary"
              plain
              @click.prevent="removeCustomer(index)"></el-button>
            <div
              v-for="(client,cIndex) in item"
              :key="cIndex"
              label-width="120px"
              class="line-info">
              <el-col
                :span="8"
                v-if="client.ttConditionColumn.qttccType === 0"
              >
                <el-form-item :label="client.ttConditionColumn.qttccName" :prop="client.qttcVal" style="height: 34px;">
                  <el-radio-group
                    v-model="client.qttcVal"
                    :disabled="viewVisble">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="client.ttConditionColumn.qttccName === '主体名称'? 16 : 8" v-if="client.ttConditionColumn.qttccType === 1 && client.ttConditionColumn.qttccName !== '主体类型'">
                <el-form-item :label="client.ttConditionColumn.qttccName" :prop="'clientInfo.'+index+'.'+cIndex+'.qttcVal'" :rules="clientRule(item, cIndex)"  style="height: 34px;">
                  <el-input v-model="client.qttcVal" :disabled="viewVisble" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)" @blur="handleClientnameChange(client, index)" style="width: 100%;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 1 && client.ttConditionColumn.qttccName === '主体类型'">
                <el-form-item :label="client.ttConditionColumn.qttccName" :rules="clientRule(item, cIndex)" :prop="'clientInfo.'+index+'.'+cIndex+'.qttcVal'" style="height: 34px;">
                  <el-select v-model="client.qttcVal" clearable :disabled="viewVisble" @change="handleClientChange(client, index)" style="width: 100%;">
                    <el-option label="个人" value="0"></el-option>
                    <el-option label="机构" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 3">
                <el-form-item :label="client.ttConditionColumn.qttccName" style="height: 34px;">
                  <el-input v-model="client.qttcStartNum" style="width: 40%; margin-right:6px;" :disabled="viewVisble" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)"></el-input>~
                  <el-input
                    v-model="client.qttcEndNum"
                    style="width: 40%; margin-left:6px;"
                    :disabled="viewVisble" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                v-if="client.ttConditionColumn.qttccType === 4"
              >
                <el-form-item
                  :label="client.ttConditionColumn.qttccName"
                  :prop="client.qttcVal" style="height: 34px;">
                  <el-select
                    v-model="client.qttcVal"
                    clearable
                    :disabled="viewVisble" @change="handleDocumentTypeChange(client)" style="height: 34px; width: 100%;"
                  >
                    <el-option
                      v-for="(selItem, sIndex) in client.ttConditionColumn.codes"
                      :key="sIndex"
                      :value="selItem.codeId"
                      :label="selItem.codeName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 5">
                <el-form-item
                  :label="client.ttConditionColumn.qttccName"
                  :prop="client.qttcVal" style="height: 34px;">
                  <el-date-picker
                    v-model="client.ttConditionColumn.values"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :disabled="viewVisble">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                v-if="client.ttConditionColumn.qttccType === 6">
                <el-form-item
                  :label="client.ttConditionColumn.qttccName"
                  :prop="client.qttcVal" style="height: 34px;">
                  <el-select
                    v-model="client.qttcVal"
                    multiple
                    collapse-tags
                    clearable
                    :disabled="viewVisble"  style="width: 100%;">
                    <el-option
                      v-for="(selItem, sIndex) in client.ttConditionColumn.codes"
                      :key="sIndex"
                      :value="selItem.codeId"
                      :label="selItem.codeName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
          </el-row>


          <div class="subblocktitle">
            <span class="title">地区信息</span>
          </div>
           <el-row :gutter="20">
              <div v-for="(trade, tIndex) in form.tradeCheckList" :key="tIndex" label-width="120px">
                <el-col :span="15" v-if="trade.ttConditionColumn.qttccType === 7" class="inputwrap" style="position: relative;">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" style="height: 34px;">
                    <el-select v-model="form.interRegion" @change="handleInterRegionChange" style="width: 46%;" :disabled="viewVisble" clearable @clear="handleRegionClear">
                      <el-option label="中国" value="CHN"></el-option>
                      <el-option label="大陆地区保税区" value="Z01"></el-option>
                      <el-option label="大陆地区加工区" value="Z02"></el-option>
                      <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                      <el-option label="境外" value="NAT"></el-option>
                    </el-select> 
                    <el-cascader v-if="form.interRegion !== 'NAT'" style="width: 52%;" :options="cityListOptions" v-model="form.city" clearable :props="props" :disabled="viewVisble" collapse-tags>
                    </el-cascader>

                    <el-select v-if="form.interRegion === 'NAT'" style="width: 52%;" v-model="form.city" clearable :disabled="viewVisble">
                      <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

        </div>
        <div class="block clearfix">
          <div class="subblocktitle">
            <span class="title">报文、交易信息</span>
          </div>
          <div
            v-for="(report, rIndex) in form.reportOptions"
            :key="rIndex"
            label-width="120px">
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 0">
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="report.qttcVal" style="height: 34px;">
                <el-radio-group
                  v-model="report.qttcVal"
                  :disabled="viewVisble">
                  <el-radio label="是">是</el-radio>
                  <el-radio label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="report.ttConditionColumn.qttccType === 1">
              <el-form-item :label="report.ttConditionColumn.qttccName" :prop="'reportOptions.'+ rIndex + '.qttcVal'" :rules="Rules(report)" style="height: 34px;">
                <el-input v-model='report.qttcVal' :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)" v-if="report.ttConditionColumn.qttccName !== '报告机构编码'" style="width: 100%;" :disabled="viewVisble"></el-input>
                <el-autocomplete v-if="report.ttConditionColumn.qttccName === '报告机构编码'" 
                  style="width:100%"
                  v-model="report.qttcVal"
                  :fetch-suggestions="getRicdMethod"
                  value-key="ricd"
                  :trigger-on-focus="false"
                  :disabled="viewVisble" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-autocomplete>
               <!-- <el-select v-model='report.qttcVal' v-if="report.ttConditionColumn.qttccName === '义务机构网点名称'"
                  :disabled="viewVisble">
                  <el-option v-for="(net, netIndex) in networkOptions" :key="netIndex" ></el-option>
                </el-select> -->
                <!-- <el-autocomplete v-if="report.ttConditionColumn.qttccName === '义务机构网点名称'"
                  style="width:100%"
                  v-model="report.qttcVal"
                  :fetch-suggestions="getNetMethod"
                  value-key="finn_name"
                  :trigger-on-focus="false"
                  :disabled="viewVisble" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-autocomplete> -->
                 <!-- <el-input
                  v-model='report.qttcVal'
                  :disabled="viewVisble" v-if="report.ttConditionColumn.qttccName === '义务机构网点名称'"
                 :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)" style="width: 100%;"></el-input>  -->
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 2"
            >
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="report.qttcVal" style="height: 34px;">
                <el-checkbox
                  v-model="report.qttcVal"
                  :disabled="viewVisble"
                >{{report.ttConditionColumn.qttccName}}</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 3"
            >
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="'reportOptions.'+ rIndex + '.qttcStartNum'"
                :rules="Rules(report)" style="height: 34px;">
                <el-input
                  v-model="report.qttcStartNum"
                  style="width: 40%; margin-right:6px;"
                  :disabled="viewVisble" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-input>~
                <el-input
                  v-model="report.qttcEndNum"
                  style="width: 40%; margin-left:6px;"
                  :disabled="viewVisble" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 4" style="height: 34px;">
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="report.qttcVal">
                <el-select
                  v-model="report.qttcVal"
                  clearable
                  :disabled="viewVisble"  style="width: 100%;">
                  <el-option
                    v-for="(selItem, sIndex) in report.ttConditionColumn.codes"
                    :key="sIndex"
                    :value="selItem.codeId"
                    :label="selItem.codeName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 5"
            >
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="report.qttcVal" style="height: 34px;">
                <el-date-picker
                  v-model="report.ttConditionColumn.values"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="disabled" :picker-options="pickerOptions2">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 6">
              <!--义务机构名称-->
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="'reportOptions.'+ rIndex + '.qttcVal'"
                :rules="Rules(report)" style="height: 34px;">
                <el-autocomplete
                  style="width:100%"
                  v-model="report.qttcVal"
                  :fetch-suggestions="remoteMethod"
                  value-key="rinm"
                  :trigger-on-focus="false"
                  :disabled="viewVisble" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-autocomplete>
                <!-- <el-select style="width:100%" v-model="report.qttcVal" :remote-method="remoteMethod" value-key="rinm" :placeholder="getPlaceholder(report)" multiple filterable remote reserve-keyword :maxlength="getInputMax(report)" :disabled="viewVisble">
                   <el-option
                    v-for="item in rinmOptions"
                    :key="item.ricd"
                    :label="item.rinm"
                    :value="item.rinm">
                   </el-option>
                 </el-select> -->
              </el-form-item>
            </el-col>
          </div>
        </div>
        <!--数据范围-->
         <div class="block clearfix">
          <div class="subblocktitle">
            <span class="title">数据范围</span>
          </div>
          <el-row :gutter="20" v-show="!(form.dtOptions.length === 0 && form.dtOptions2.length === 0 && form.dtOptionsReport.length === 0 && form.dtOptionsOther.length === 0)">
            <el-form-item label="" class="dataMain" prop="type" label-width="0px" style="height: 34px;">
              <el-col :span="24" v-show="form.dtOptions.length !== 0">
                <el-col :span="2">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="dtCheckAll" :disabled="viewVisble" @change="handleDtCheckAllChange">全选</el-checkbox>
                </el-col>
                <el-col :span="22">
                  <el-checkbox-group v-model="form.dataTable" :disabled="viewVisble" @change="handleDtoptionsChange">
                    <el-checkbox v-for="(item, index) in form.dtOptions" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-col>
              
              <el-col :span="24" v-show="form.dtOptions2.length !== 0">
                <el-col :span="2">
                  <el-checkbox :indeterminate="isIndeterminate2" v-model="dtCheckAll2" @change="handleDtCheckAllChange2" :disabled="viewVisble">全选</el-checkbox>
                </el-col>
                <el-col :span="22">
                  <el-checkbox-group v-model="form.dataTable2" :disabled="viewVisble" @change="handleDtoptionsChange2">
                    <el-checkbox v-for="(item, index) in form.dtOptions2" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-col>

              <el-col :span="24" v-show="form.dtOptionsReport.length !== 0">
                <el-col :span="2">
                  <el-checkbox :indeterminate="isIndeterminateReport" v-model="dtReportCheckAll" @change="handleDtReportCheckAllChange" :disabled="viewVisble">全选</el-checkbox>
                </el-col>
                <el-col :span="22">
                  <el-checkbox-group v-model="form.dataTableReport" :disabled="viewVisble" @change="handleDtReportChange">
                    <el-checkbox v-for="(item, index) in form.dtOptionsReport" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-col>

              <el-col :span="24" v-show="form.dtOptionsOther.length !== 0">
                <el-col :span="2">
                  <el-checkbox :indeterminate="isIndeterminateOther" v-model="dtCheckAllOther" @change="handleDtCheckAllChangeOther" :disabled="viewVisble">全选</el-checkbox>
                </el-col>
                <el-col :span="22">
                  <el-checkbox-group v-model="form.dataTableOther" :disabled="viewVisble" @change="handleDtoptionsChangeOther">
                    <el-checkbox v-for="(item, index) in form.dtOptionsOther" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!--报告信息-->
        <div class="block clearfix">
          <div class="subblocktitle">
            <span class="title">报告查询选项</span>
            <!-- <el-button type="primary" plain style="margin-left: 26px;" @click="handleExit" v-if="!viewVisble">编辑</el-button> -->
          </div>
           <el-row :gutter="20">
              <div
                v-for="(trade, tIndex) in form.reportCheckList" :key="tIndex" label-width="120px">
                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 0" class="radiowrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" v-if="trade.ttConditionColumn.qttccName !== '可疑交易报告紧急程度'" style="height: 34px;">
                    <el-radio-group v-model="trade.qttcVal" :disabled="viewVisble || isDisabledReport" @change="handleChangeDay(trade)">
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.qttcVal'" v-if="trade.ttConditionColumn.qttccName === '可疑交易报告紧急程度'" label-width="160px" style="height: 34px;">
                    <el-select v-model="trade.qttcVal" placeholder="请选择" style="width: 100%;" :disabled="isDisabledReport">
                      <el-option label="特别紧急" value="02"></el-option>
                      <el-option label="非特别紧急" value="01"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 1"
                  class="inputwrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.qttcVal'"
                    :rules="Rules(trade)" style="height: 34px;">
                    <el-input v-model='trade.qttcVal' v-if="trade.ttConditionColumn.qttccName !== '联系电话'" :maxlength="getInputMax(trade)" :disabled="viewVisble || isDisabledReport" :placeholder="getPlaceholder(trade)" style="width: 100%;"></el-input>
                  <el-input v-model='trade.qttcVal' :disabled="viewVisble || isDisabledReport" v-if="trade.ttConditionColumn.qttccName === '联系电话'" :maxlength="getInputMax(trade)" :placeholder="getPlaceholder(trade)" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 2"
                  class="inputwrap">
                  <el-form-item :prop="trade.qttcVal" style="height: 34px;">
                    <el-checkbox
                      v-model="trade.qttcVal"
                      :disabled="viewVisble || isDisabledReport"
                    >{{trade.ttConditionColumn.qttccName}}</el-checkbox>
                  </el-form-item>
                </el-col>

                <!--交易金额-->
              <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="8" v-if="trade.ttConditionColumn.qttccType === 3" class="inputwrap">   
                <el-col style="width: 140px; text-align:right; font-size: 14px; padding: 8px 12px 0 0; color: #606266;"><div>{{trade.ttConditionColumn.qttccName}}</div></el-col>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px" :prop="'reportCheckList.'+ tIndex + '.qttcStartNum'" :rules="Rules(trade)" style="height: 34px;">  
                    <el-input v-model="trade.qttcStartNum" style="width: 100%;" :maxlength="getInputMax(trade)" @change="handleMinChange(tIndex)" :disabled="viewVisble || isDisabledReport" :placeholder="getPlaceholder(trade)"></el-input> 
                  </el-form-item>
                </el-col>
                <!-- 至 -->
                <el-col :span="2">
                      <span style="display: inline-block;width: 100%;line-height: 33px;text-align: center;">至</span>   
                </el-col>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px" :prop="'reportCheckList.'+ tIndex + '.qttcEndNum'" :rules="Rules(trade)" style="height: 34px;"> 
                    <el-input v-model="trade.qttcEndNum" style="width: 100%;" :maxlength="getInputMax(trade)" @change="handleMaxChange(tIndex)" :disabled="viewVisble || isDisabledReport" :placeholder="getPlaceholder(trade)"></el-input>  
                  </el-form-item>
                </el-col>
              </el-col>
                
                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 4"
                  class="inputwrap"
                >
                  <el-form-item
                    :label="trade.ttConditionColumn.qttccName"
                    :prop="trade.qttcVal" style="height: 34px;">
                    <el-select
                      v-model="trade.qttcVal"
                      clearable
                      :disabled="viewVisble || isDisabledReport"
                      v-if="trade.ttConditionColumn.pkQttcc !== '28'" style="width: 100%;">
                      <el-option
                        v-for="(selItem, sIndex) in trade.ttConditionColumn.codes"
                        :key="sIndex"
                        :label="selItem.codeName"
                        :value="selItem.codeId"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="trade.qttcVal"
                      clearable
                      :disabled="viewVisble || isDisabledReport"
                      v-if="trade.ttConditionColumn.pkQttcc === '28'" style="width: 100%;"
                    >
                       <el-option
                        v-for="(selItem, sIndex) in trade.ttConditionColumn.codes"
                        :key="sIndex"
                        :label="selItem.codeName"
                        :value="selItem.codeId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 5"
                  class="datewrap"
                >
                  <el-form-item
                    :label="trade.ttConditionColumn.qttccName"
                    :prop="trade.qttcVal" style="height: 34px;">
                    <el-date-picker
                      v-model="trade.ttConditionColumn.values"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      :disabled="viewVisble || isDisabledReport"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 6"
                  class="inputwrap" style="position: relative;">
                  <!-- <el-form-item label-width="0"> -->
                    <el-checkbox style="position: absolute; left: 20px; top: 8px;" v-model="form.checkAllLarge" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" @change="handleCheckLargeChange($event, trade)" :disabled="form.largeDisabled || isDisabledReport"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 8px;" v-model="form.checkAllCrime" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" @change="handleCheckCrimeChange($event, trade)" :disabled="form.crimeDisabled || isDisabledReport"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 70px; top: 8px;" v-model="form.checkAllReport" v-if="trade.ttConditionColumn.qttccName === '报送方向'" @change="handleCheckReportChange($event, trade)" :disabled="form.reportDisabled || isDisabledReport"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 8px;" v-model="form.checkAllTrade" v-if="trade.ttConditionColumn.qttccName === '交易种类'" @change="handleCheckTradeChange($event, trade)" :disabled="form.tradeDisabled || isDisabledReport"></el-checkbox>
                  <!-- </el-form-item> -->
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" class="el-select-uwrap" :label-width="trade.ttConditionColumn.qttccName === '报送方向' ? '160px' : '140px'" style="height: 34px;">
                    <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable :disabled="viewVisble || isDisabledReport" @change="selectLargeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" style="width: 100%;">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId" v-if="regison.codeName !== '（公转私）'">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable :disabled="viewVisble || isDisabledReport" @change="selectCrimeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" style="width: 100%;">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable :disabled="viewVisble || isDisabledReport" @change="selectReportChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '报送方向'" style="width: 100%;">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable :disabled="viewVisble || isDisabledReport" @change="selectTradeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '交易种类'" style="width: 100%;">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 7" class="inputwrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" style="height: 34px;">
                    <el-select v-model="form.interRegion" @change="handleInterRegionChange" style="width: 40%;" :disabled="viewVisble || isDisabledReport" clearable>
                      <el-option label="中国" value="CHN"></el-option>
                      <el-option label="大陆地区保税区" value="Z01"></el-option>
                      <el-option label="大陆地区加工区" value="Z02"></el-option>
                      <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                      <el-option label="国际" value="NAT"></el-option>
                    </el-select>
                    <el-cascader v-if="form.interRegion !== 'NAT'" style="width: 58%;" expand-trigger="hover" :options="cityListOptions" v-model="form.city" clearable :props="props" :disabled="viewVisble || isDisabledReport">
                    </el-cascader>

                    <el-select v-if="form.interRegion === 'NAT'" style="width: 58%;" v-model="form.city" clearable :disabled="viewVisble || isDisabledReport">
                      <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
        </div>
        <!--交易信息-->
        <div class="block clearfix">
          <div class="subblocktitle">
            <span class="title">交易查询选项</span>
            <el-button type="text" style="margin-left: 26px;" @click="handleExit" v-if="!viewVisble">更多<i class="el-icon-d-arrow-right
"></i></el-button>
          </div>
           <el-row :gutter="20">
              <div
                v-for="(trade, tIndex) in form.tradeCheckList" :key="tIndex" label-width="120px">
                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 0"
                  class="radiowrap">
                  <el-form-item
                    :label="trade.ttConditionColumn.qttccName"
                    :prop="trade.qttcVal" style="height: 34px;">
                    <el-select v-model="trade.qttcVal" :disabled="viewVisble || isDisabledTrade" placeholder="请选择" clearable　@change="handleChangeDay(trade)" style="width: 100%;">
                      <el-option label="是" value="是">是</el-option>
                      <el-option label="否" value="否">否</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 1"
                  class="inputwrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'tradeCheckList.'+ tIndex + '.qttcVal'"
                    :rules="Rules(trade)" style="height: 34px;">
                    <el-input v-model='trade.qttcVal' v-if="trade.ttConditionColumn.qttccName !== '联系电话'" :maxlength="getInputMax(trade)" :disabled="viewVisble || isDisabledTrade" :placeholder="getPlaceholder(trade)" style="width: 100%;"></el-input>
                  <el-input v-model='trade.qttcVal' :disabled="viewVisble || disabled || isDisabledTrade" v-if="trade.ttConditionColumn.qttccName === '联系电话'" :maxlength="getInputMax(trade)" :placeholder="getPlaceholder(trade)" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 2"
                  class="inputwrap">
                  <el-form-item :prop="trade.qttcVal" style="height: 34px;">
                    <el-checkbox
                      v-model="trade.qttcVal"
                      :disabled="viewVisble || isDisabledTrade"
                    >{{trade.ttConditionColumn.qttccName}}</el-checkbox>
                  </el-form-item>
                </el-col>

                <!--交易金额-->
              <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="8" v-if="trade.ttConditionColumn.qttccType === 3" class="inputwrap">   
                <el-col style="width: 140px; text-align:right; font-size: 14px; padding: 8px 12px 0 0; color: #606266;"><div>{{trade.ttConditionColumn.qttccName}}</div></el-col>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px" :prop="'tradeCheckList.'+ tIndex + '.qttcStartNum'" :rules="Rules(trade)" style="height: 34px;">  
                    <el-input v-model="trade.qttcStartNum" style="width: 100%;" :maxlength="getInputMax(trade)" @change="handleMinChange(tIndex)" :disabled="viewVisble || isDisabledTrade" :placeholder="getPlaceholder(trade)"></el-input> 
                  </el-form-item>
                </el-col>
                <!-- 至 -->
                <el-col :span="2">
                      <span style="display: inline-block;width: 100%;line-height: 33px;text-align: center;">至</span>   
                </el-col>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px" :prop="'tradeCheckList.'+ tIndex + '.qttcEndNum'" :rules="Rules(trade)" style="height: 34px;"> 
                    <el-input v-model="trade.qttcEndNum" style="width: 100%;" :maxlength="getInputMax(trade)" @change="handleMaxChange(tIndex)" :disabled="viewVisble || isDisabledTrade" :placeholder="getPlaceholder(trade)"></el-input>  
                  </el-form-item>
                </el-col>
              </el-col>
                
                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 4"
                  class="inputwrap"
                >
                  <el-form-item
                    :label="trade.ttConditionColumn.qttccName"
                    :prop="trade.qttcVal" style="height: 34px;">
                    <el-select
                      v-model="trade.qttcVal"
                      clearable
                      :disabled="viewVisble || isDisabledTrade"
                      v-if="trade.ttConditionColumn.pkQttcc !== '28'" style="width: 100%;"
                    >
                      <el-option
                        v-for="(selItem, sIndex) in trade.ttConditionColumn.codes"
                        :key="sIndex"
                        :label="selItem.codeName"
                        :value="selItem.codeId"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="trade.qttcVal"
                      clearable
                      :disabled="viewVisble  || isDisabledTrade"
                      v-if="trade.ttConditionColumn.pkQttcc === '28'" style="width: 100%;"
                    >
                       <el-option
                        v-for="(selItem, sIndex) in trade.ttConditionColumn.codes"
                        :key="sIndex"
                        :label="selItem.codeName"
                        :value="selItem.codeId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 5"
                  class="datewrap"
                >
                  <el-form-item
                    :label="trade.ttConditionColumn.qttccName"
                    :prop="trade.qttcVal" style="height: 34px;">
                    <el-date-picker
                      v-model="trade.ttConditionColumn.values"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      :disabled="viewVisble || isDisabledTrade"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期" :picker-options="pickerOptions">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 6" class="inputwrap" style="position: relative;">
                  <!-- <el-form-item label-width="0"> -->
                    <el-checkbox style="position: absolute; left: 20px; top: 8px;" v-model="form.checkAllLarge" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" @change="handleCheckLargeChange($event, trade)" :disabled="form.largeDisabled || isDisabledTrade"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 8px;" v-model="form.checkAllCrime" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" @change="handleCheckCrimeChange($event, trade)" :disabled="form.crimeDisabled || isDisabledTrade"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 8px;" v-model="form.checkAllReport" v-if="trade.ttConditionColumn.qttccName === '报送方向'" @change="handleCheckReportChange($event, trade)" :disabled="form.reportDisabled || isDisabledTrade"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 8px;" v-model="form.checkAllTrade" v-if="trade.ttConditionColumn.qttccName === '交易种类'" @change="handleCheckTradeChange($event, trade)" :disabled="form.tradeDisabled || isDisabledTrade"></el-checkbox>
                  <!-- </el-form-item> -->
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" class="el-select-uwrap" v-if="trade.ttConditionColumn.qttccName !== '交易种类'" style="height: 34px;">
                    <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable :disabled="viewVisble || isDisabledTrade" @change="selectLargeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" style="width: 100%;">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId" v-if="regison.codeName !== '（公转私）'">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable :disabled="viewVisble || isDisabledTrade" @change="selectCrimeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" style="width: 100%;">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable :disabled="viewVisble || isDisabledTrade" @change="selectReportChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '报送方向'" style="width: 100%;">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" class="el-select-uwrap-two" v-if="trade.ttConditionColumn.qttccName === '交易种类'" style="height: 34px;">
                    <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable :disabled="viewVisble || isDisabledTrade" @change="selectTradeChange($event, trade)" style="width: 100%;">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 7" class="inputwrap" style="position: relative;">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" style="height: 34px;">
                    <el-select v-model="form.interRegion" @change="handleInterRegionChange" style="width: 40%;" :disabled="viewVisble || isDisabledTrade || disabled" clearable @clear="handleRegionClear">
                      <el-option label="中国" value="CHN"></el-option>
                      <el-option label="大陆地区保税区" value="Z01"></el-option>
                      <el-option label="大陆地区加工区" value="Z02"></el-option>
                      <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                      <el-option label="境外" value="NAT"></el-option>
                    </el-select> 
                    <el-cascader v-if="form.interRegion !== 'NAT'" style="width: 58%;" :options="cityListOptions" v-model="form.city" clearable :disabled="viewVisble || isDisabledTrade || disabled" collapse-tags>
                    </el-cascader>

                    <el-select v-if="form.interRegion === 'NAT'" style="width: 58%;" v-model="form.city" clearable :disabled="viewVisble || isDisabledTrade || disabled">
                      <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
              </div>
            </el-row>
        </div>
        <div class="block">
          <div class="subblocktitle">
            <span class="title">主体查询选项</span>
          </div>
          <div class="content dtmain">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="匹配选项：" prop="match" class="matchMain" style="height: 34px;">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminateMatch" v-model="matchCheckAll" @change="handleMatchCheckAllChange" :disabled="viewVisble">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.match" class="other" :disabled="viewVisble">
                      <el-checkbox v-for="(item, index) in form.matchOptions" :label="item.ttMatch.qttmNameCh" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="block">
          <div class="subblocktitle">
            <span class="title">地区查询选项</span>
          </div>
          <div class="content dtmain">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="匹配选项：" prop="area" class="matchMain" style="height: 34px;">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminateArea" v-model="areaCheckAll" @change="handleAreaCheckAllChange" :disabled="viewVisble">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.area" class="other" :disabled="viewVisble">
                      <el-checkbox v-for="(item, index) in form.areaOptions" :label="item.ttMatchArea.qttmNameCh" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="block">
          <div class="subblocktitle">
            <span class="title">统计要素选项</span>
          </div>
          <div class="content">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="" class="clearfix" style="height: 34px;">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminateFactor" v-model="factorCheckAll" @change="handleFactorCheckAllChange" :disabled="viewVisble">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.factor" :disabled="viewVisble" @change="handleFactorOptionsChange">
                      <el-checkbox v-for="(item, index) in form.factorOptions" :label="item.ttStatisticFactor.qsfName" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="btnalign">
          <el-button
            type="primary"
            @click="getDefault"
            v-if="!viewVisble" :loading="loading">恢复默认选项</el-button>
          <el-button type="primary" @click="onSubmit" v-if="!viewVisble" :loading="saveLoading">保存</el-button>
          <el-button type="primary" plain @click="routerBack">返回</el-button>
        </div>
      </el-form>

      <!-- 报告，交易信息 -->
      <el-dialog title="交易查询选项" :visible.sync="tradeDialogVisible" width="60%" class="dialogReport" :before-close="closeExitDialog">
        <el-form :model="dialogForm" v-loading="exitDialogLoading">
          <el-checkbox-group v-model="dialogForm.tradeInfo">
            <el-checkbox
              v-for="(item, index) in dialogForm.tradeOptions"
              :label="item.ttConditionColumn.qttccName"
              :key="index">
            </el-checkbox>
          </el-checkbox-group>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer">
          <el-button @click="closeExitDialog">取 消</el-button>
          <el-button
            type="primary"
            @click="tradeSubmit"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template> 

<script>
import { isValidInput, isIpAddress, isValidBlank, onlyNumberValidate, ValidQueryInput, delDataValidInput } from '@/utils/formValidate.js'
import { getRinmList } from '@/api/common/industry'
import { getArea, country } from '@/api/common/citys'
import Treeselect from '@riophae/vue-treeselect'
import {
  initData,
  exitItem,
  addTpl,
  updateTpl,
  tplViewData
} from '@/api/sys-monitoringAnalysis/dataQuery/templateManage'

export default {
  components: {
    Treeselect
  },
  data() {
    const dataTableChecked = ['银行业大额交易'] // 默认选中状态
    const dataTableChecked2 = ['银行业可疑交易'] // 默认选中状态
    const dataTableReportChecked = [] // 默认选中状态
    const factorChecked = ['交易主体数', '账户数', '交易笔数', '本币金额', '外币金额', '单笔最大金额', '最早交易时间', '最晚交易时间'] // 统一配置选中
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      props: { checkStrictly: true },
      pickerOptions: {
        disabledDate(time) { // 交易时间控制时间范围
          return time.getTime() > Date.now()
        }
      },
      pickerOptions2: {
        disabledDate(time) { // 今天及以后的不能选
          return time.getTime() > Date.now() - 1 * 24 * 60 * 60 * 1000
        }
      },
      isCrimeHas: false,
      title: this.$route.query.title,
      viewVisble: false,
      disabled: false, // 判断日期插件是否禁用
      customerName: [{}],
      organOptions: [],
      selOptions: [],
      creUser: null,
      saveLoading: false, // 保存按钮
      loading: false, // 恢复默认
      ttccs: {
        ukQttcc: '',
        qttcVal: '',
        qttcStartDate: '',
        qttcEndDate: '',
        qttcStartNum: '',
        qttcEndNum: ''
      },
      isDisabledTrade: true,
      isDisabledReport: true,
      isIndeterminate: true, // 数据库表全选状态
      dtCheckAll: false, // 数据库表全选
      isIndeterminate2: true, // 数据库表--可疑全选状态
      isIndeterminateReport: true,
      dtReportCheckAll: false,
      dtCheckAll2: false, // 数据库表全选
      isIndeterminateOther: true, // 数据库表--其他全选状态
      dtCheckAllOther: false, // 数据库表全选
      isIndeterminateMatch: false, // 匹配信息
      matchCheckAll: true, // 匹配信息
      isIndeterminateArea: false, // 地区匹配信息
      areaCheckAll: true, // 地区匹配信息
      isIndeterminateFactor: false, // 配置统计要素
      factorCheckAll: true, // 配置统计要素
      networkOptions: [], // 网点机构代码
      form: {
        largeDisabled: true,
        crimeDisabled: true,
        reportDisabled: true,
        tradeDisabled: true,
        checkAllLarge: false,
        checkAllCrime: false,
        checkAllReport: false,
        checkAllTrade: false,
        // regionDisabled: true,
        // checkAllRegion: false,
        reportCheckList: [],
        tradeCheckList: [],
        qttName: '', // 模板名称
        organNum: '',
        organName: [],
        websiteName: '',
        dataTable: dataTableChecked, // 数据库表
        dataTable2: dataTableChecked2,
        dataTableReport: dataTableReportChecked,
        dataTableOther: [],
        dtOptions: [], // 数据库表
        dtOptions2: [],
        dtOptionsReport: [],
        dtOptionsOther: [],
        match: [], // 匹配
        matchOptions: [], //
        area: [], // 地区匹配
        areaOptions: [], // 地区匹配
        factor: factorChecked, // 配置
        factorOptions: [], // 配置
        clientInfo: [],
        clientOptions: [],
        reportOptions: [],
        dateValue: '',
        interRegion: '', // 地区--国际/国内
        city: []
      },
      flag: 0,
      rules: {
        qttName: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' },
          { max: 30, message: '最大长度为30位', trigger: 'blur' }
        ]
      },
      dialogForm: {
        tradeInfo: [],
        tradeOptions: []
      },
      regisonOPtions: [], // ceshi
      arr: [],
      tradeDialogVisible: false, // 报告
      cityListOptions: [],
      countryData: [],
      list: [],
      value: [],
      linkRid: '',
      newTradeCheckList: [], // 保存选中的交易信息
      isDocument: false, // 判断是否是身份证号
      tradeInfoObj: [],
      isClientPerson: [], // 获取主体类型是机构还是个人
      clientName: '',
      exitDialogLoading: false
    }
  },
  mounted() {
    if (this.$route.query.isView === '0') { // 修改
      this.viewVisble = false
    } else if (this.$route.query.isView === '1') { // 工作台消息查看
      this.viewVisble = true
    }

    this.getData(1)
  },
  computed: {
    ItemLength() {
      return this.form.clientInfo.length
    },
    getTitle() {
      const val = this.$route.query.title
      switch (val) {
        case 'new':
          this.title = '新增'
          break
        case 'update':
          this.title = '修改'
          break
        default:
          this.title = ''
          break
      }
      return this.title
    }
  },
  methods: {
    validateCom(rule, value, callback) { // 公共校验--交易金额
      if (value) {
        const MIN_NUMBER = 0
        const MAX_NUMBER = 99999999999999999999
        const moneyPoint = /^\d+(\.\d+)?$/
        const one = moneyPoint.test(value)
        if (one) {
          if (one <= MIN_NUMBER) {
            return callback(new Error('输入值必须大于等于0'))
          } else if (one > MAX_NUMBER) {
            callback(new Error('输入超过最大值'))
          }
          return callback()
        }
        return callback(new Error('请输入数值或者小数'))
      } else {
        return callback()
      }
    },
    handleMinChange(index) {
      this.$refs.form.validateField('tradeCheckList.' + index + '.qttcEndNum')
    },
    handleMaxChange(index) {
      this.$refs.form.validateField('tradeCheckList.' + index + '.qttcStartNum')
    },
    startMoneyRule(index) {
      const validateMin = (rule, value, callback) => {
        const one = value
        const max = this.form.tradeCheckList[index].qttcEndNum
        if (!max || one < max) {
          return callback()
        }
        return callback(new Error('输入值不得大于最大阈值'))
      }
      const R = []
      R.push({ required: false, message: '请填写交易金额最小值', trigger: 'blur' },
        { validator: this.validateCom, trigger: 'blur' },
        { validator: validateMin, trigger: 'blur' }, { pattern: /^\d+(\.\d+)?$/, trigger: 'blur' })
      return R
    },
    endMoneyRule(index) {
      const validateMax = (rule, value, callback) => {
        // const moneyPoint = /^\d+(\.\d+)?$/
        const one = value
        const min = this.form.tradeCheckList[index].qttcStartNum
        if (!min || one > min) {
          return callback()
        }
        return callback(new Error('输入值不得小于最小阈值'))
      }
      const R = []
      R.push({ required: false, message: '请填写交易金额最大值', trigger: 'blur' },
        { validator: this.validateCom, trigger: 'blur' },
        { validator: validateMax, trigger: 'blur' }, { pattern: /^\d+(\.\d+)?$/, trigger: 'blur' })
      return R
    },
    handleDocumentTypeChange(item) { // 关联证件类型和证件号码
      if (item.ttConditionColumn.qttccName === '证件类型') {
        if (item.qttcVal) {
          if (item.qttcVal === '110001' || item.qttcVal === '110003') {
            this.isDocument = true
          } else {
            this.isDocument = false
          }
        } else {
          this.isDocument = false
        }
      } else {
        this.isDocument = false
      }
    },
    clientRule(item, index) {
      if (item === undefined) return
      if (item[index].ttConditionColumn.qttccName === '账号') {
        const R = []
        R.push(
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 64, message: '最大长度为64位', trigger: 'blur' }
        )
        return R
      } else if (item[index].ttConditionColumn.qttccName === '主体证件号码') {
        const R = []
        if (this.isDocument) {
          R.push({ validator: ValidQueryInput, trigger: 'blur' },
            { max: 18, message: '最大长度为18位', trigger: 'input' }, { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式有误！', trigger: 'input' })
        } else {
          R.push(
            { validator: ValidQueryInput, trigger: 'blur' }, { max: 32, message: '最大长度为32位', trigger: 'blur' }
          )
        }
        return R
      } else if (item[index].ttConditionColumn.qttccName === '主体名称') {
        const R = []
        R.push(
          { validator: delDataValidInput, trigger: 'blur' },
          { max: 512, message: '最大长度为512位', trigger: 'blur' }
        )
        return R
      } else if (item[index].ttConditionColumn.qttccName === '主体类型') {
        const R = []
        R.push(
          { required: false, message: '请填写主体类型', trigger: 'change' }
        )
        return R
      }
    },
    Rules(item) {
      // 校验
      if (item === undefined) return

      const R = []
      if (item.ttConditionColumn.qttccName === '报告机构名称') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 200, message: '最大长度为200位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报告机构网点名称') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 200, message: '最大长度为200位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报告机构编码') {
        R.push({ validator: isValidInput, trigger: 'blur' }, { max: 15, message: '最大长度为15位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报文ID') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 100, message: '最大长度为100位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报文名') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 50, message: '最大长度为50位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '业务标识号') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 256, message: '最大长度为256位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === 'IP地址') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { validator: isIpAddress, trigger: 'blur' }, { max: 500, message: '最大长度为500位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '交易品种代码') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 32, message: '最大长度为32位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '保险合同号') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 32, message: '最大长度为32位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '收付款方匹配号') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 500, message: '最大长度为500位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '交易ID') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 500, message: '最大长度为500位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '联系电话') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 30, message: '最大长度为20位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '交易金额') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { validator: onlyNumberValidate, trigger: 'blur' })
      }

      return R
    },
    handleClientChange(item, index) {
      this.isClientPerson[index] = item.qttcVal
      this.Rules(item)
    },
    handleClientnameChange(item, index) { // 填写主体名称或证件号码，主体类型是必填
      // if (item.ttConditionColumn.qttccName === '主体名称' || item.ttConditionColumn.qttccName === '主体证件号码' || (item.ttConditionColumn.qttccName === '主体名称' && item.ttConditionColumn.qttccName === '主体证件号码')) {
      //   if (item.qttcVal) {
      //     this.clientName = '1'
      //   } else {
      //     this.clientName = ''
      //   }
      // }
    },
    getData(count) {
      initData() // 新增初始化数据
        .then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.isClientPerson = []
            this.handleDefault(count)
            this.loading = false
            if (res.data.ttQsts.length !== 0) {
              res.data.ttQsts.map((item, index) => { // 数据库表
                if (item.scopeTable.pkQst === 'w_11' || item.scopeTable.pkQst === 'w_22' || item.scopeTable.pkQst === 'w_33' || item.scopeTable.pkQst === 'w_240' || item.scopeTable.pkQst === 'w_250') {
                  this.form.dtOptions.push(item) // 数据库表大额
                } else if (item.scopeTable.pkQst === 'w_44' || item.scopeTable.pkQst === 'w_55' || item.scopeTable.pkQst === 'w_66' || item.scopeTable.pkQst === 'w_100' || item.scopeTable.pkQst === 'w_120' || item.scopeTable.pkQst === 'w_140' || item.scopeTable.pkQst === 'w_110' || item.scopeTable.pkQst === 'w_130' || item.scopeTable.pkQst === 'w_150') {
                  this.form.dtOptions2.push(item) // 数据库表可疑交易
                } else if (item.scopeTable.pkQst === 'w_77' || item.scopeTable.pkQst === 'w_88' || item.scopeTable.pkQst === 'w_99' || item.scopeTable.pkQst === 'w_160' || item.scopeTable.pkQst === 'w_180' || item.scopeTable.pkQst === 'w_200' || item.scopeTable.pkQst === 'w_220' || item.scopeTable.pkQst === 'w_210' || item.scopeTable.pkQst === 'w_170' || item.scopeTable.pkQst === 'w_190') {
                  this.form.dtOptionsReport.push(item) // 数据库表可疑报告
                } else if (item.scopeTable.pkQst === 'w_230') {
                  this.form.dtOptionsOther.push(item) // 数据库表其他
                }
              })
            }

            this.arr = res.data.ttccs

            this.form.matchOptions = res.data.qttQttms // 匹配
            this.form.matchOptions.map(item => {
              // 匹配
              if (item.ttMatch.qttmNameCh) {
                // if (item.ttMatch.qttmNameCh !== '法人' && item.ttMatch.qttmNameCh !== '股东') {
                this.form.match.push(item.ttMatch.qttmNameCh)
                // }
              }
            })

            this.form.areaOptions = res.data.qttQttmAreas // 地区匹配
            this.form.areaOptions.map(item => {
              // 匹配
              if (item.ttMatchArea.qttmNameCh) {
                this.form.area.push(item.ttMatchArea.qttmNameCh)
              }
            })

            this.form.factorOptions = res.data.qttQsfs // 配置
            this.form.factor = []
            this.form.factorOptions.map(item => {
              // 配置
              if (item.ttStatisticFactor.qsfName) {
                this.form.factor.push(item.ttStatisticFactor.qsfName)
              }
            })

            if (this.arr.length !== 0) {
              var clientOptionsArray = this.arr
              clientOptionsArray.forEach(item => {
                if (item !== null) {
                  if (item.ttConditionColumn.status === 2 || item.ttConditionColumn.status === 3) { // 交易信息
                    this.form.tradeCheckList.push(item)
                  }
                  if (item.ttConditionColumn.status === 0) { // 主体信息
                    this.form.clientOptions.push(item)
                  }
                  if (item.ttConditionColumn.status === 1) { // 报告机构信息
                    this.form.reportOptions.push(item)
                  }
                  if (item.ttConditionColumn.status === 4) { // 报告信息
                    this.form.reportCheckList.push(item)
                  }
                }
              })

              this.flag = 0

              this.$set(this.form.clientInfo, this.flag, JSON.parse(JSON.stringify(this.form.clientOptions)))

              const id = this.$route.query.id
              if (count === 1) { // 判断是恢复默认还是初始化  1.初始话（包括修改返现） 2.恢复默认
                if (id) {
                  this.getViewData()
                }
              }
            }
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    getViewData() {
      // 查看返显
      const id = this.$route.query.id
      tplViewData(id)
        .then(res => {
          if (res.code === 200) {
            this.$set(this.form, 'clientInfo', [])
            this.$set(this.form, 'tradeCheckList', [])
            this.$set(this.form, 'reportOptions', [])
            this.$set(this.form, 'reportCheckList', [])
            this.form.dataTable = []
            this.form.dataTable2 = []
            this.form.dataTableReport = []
            this.form.dataTableOther = []
            this.form.qttName = res.data.qttName // 模板名称
            this.creUser = res.data.creUser // 登录账号名称

            if (res.data.ttQsts.length !== 0) {
              res.data.ttQsts.map((item, index) => { // 数据库表
                if (item.scopeTable.pkQst === 'w_11' || item.scopeTable.pkQst === 'w_22' || item.scopeTable.pkQst === 'w_33' || item.scopeTable.pkQst === 'w_240' || item.scopeTable.pkQst === 'w_250') {
                  this.form.dataTable.push(item.scopeTable.qstNameCh) // 数据库表大额
                } else if (item.scopeTable.pkQst === 'w_44' || item.scopeTable.pkQst === 'w_55' || item.scopeTable.pkQst === 'w_66' || item.scopeTable.pkQst === 'w_100' || item.scopeTable.pkQst === 'w_120' || item.scopeTable.pkQst === 'w_140' || item.scopeTable.pkQst === 'w_110' || item.scopeTable.pkQst === 'w_130' || item.scopeTable.pkQst === 'w_150') {
                  this.form.dataTable2.push(item.scopeTable.qstNameCh) // 数据库表可疑交易
                } else if (item.scopeTable.pkQst === 'w_77' || item.scopeTable.pkQst === 'w_88' || item.scopeTable.pkQst === 'w_99' || item.scopeTable.pkQst === 'w_160' || item.scopeTable.pkQst === 'w_180' || item.scopeTable.pkQst === 'w_200' || item.scopeTable.pkQst === 'w_220' || item.scopeTable.pkQst === 'w_210' || item.scopeTable.pkQst === 'w_170' || item.scopeTable.pkQst === 'w_190') {
                  this.form.dataTableReport.push(item.scopeTable.qstNameCh) // 数据库表可疑报告
                } else if (item.scopeTable.pkQst === 'w_230') {
                  this.form.dataTableOther.push(item.scopeTable.qstNameCh) // 数据库表其他
                }
              })
              //  判断返现数据范围全选
              if (this.form.dataTable.length === this.form.dtOptions.length) {
                this.isIndeterminate = false
                this.dtCheckAll = true
              } else {
                this.isIndeterminate = true
                this.dtCheckAll = false
              }

              if (this.form.dataTable2.length === this.form.dtOptions2.length) {
                this.isIndeterminate2 = false
                this.dtCheckAll2 = true
              } else {
                this.isIndeterminate2 = true
                this.dtCheckAll2 = false
              }

              if (this.form.dataTableReport.length === this.form.dtOptionsReport.length) {
                this.isIndeterminateReport = false
                this.dtReportCheckAll = true
              } else {
                this.isIndeterminateReport = true
                this.dtReportCheckAll = false
              }

              if (this.form.dataTableOther.length === this.form.dtOptionsOther.length) {
                this.isIndeterminateOther = false
                this.dtCheckAllOther = true
              } else {
                this.isIndeterminateOther = true
                this.dtCheckAllOther = false
              }
            }

            // this.form.matchOptions = res.data.qttQttms // 匹配
            this.form.match = []
            this.form.match = res.data.qttQttms.map(item => {
              // 匹配
              if (item.ttMatch.qttmNameCh) {
                return item.ttMatch.qttmNameCh
              }
            })
            if (this.form.match.length === this.form.matchOptions.length) {
              this.isIndeterminateMatch = false
              this.matchCheckAll = true
            } else {
              this.isIndeterminateMatch = true
              this.matchCheckAll = false
            }

            this.form.area = []
            this.form.area = res.data.qttQttmsArea.map(item => {
              // 地区匹配
              if (item.ttMatchArea.qttmNameCh) {
                return item.ttMatchArea.qttmNameCh
              }
            })
            if (this.form.area.length === this.form.areaOptions.length) {
              this.isIndeterminateArea = false
              this.areaCheckAll = true
            } else {
              this.isIndeterminateArea = true
              this.areaCheckAll = false
            }
            // this.form.factorOptions = res.data.qttQsfs // 配置
            this.form.factor = [] // 配置
            this.form.factor = res.data.qttQsfs.map(item => {
              // 配置
              if (item.ttStatisticFactor.qsfName) {
                return item.ttStatisticFactor.qsfName
              }
            })

            if (this.form.factor.length === this.form.factorOptions.length) {
              this.isIndeterminateFactor = false
              this.factorCheckAll = true
            } else {
              this.isIndeterminateFactor = true
              this.factorCheckAll = false
            }
            this.arr = res.data.ttccs
            this.form.clientInfo = res.data.ttccList
            this.flag = res.data.ttccList.length - 1
            if (this.form.clientInfo.length !== 0) {
              const arrList = []
              this.form.clientInfo.forEach((item, index) => {
                item.forEach((cItem, cIndex) => {
                  if (cItem.ttConditionColumn.qttccName === '主体类型') {
                    arrList[index] = cItem.qttcVal
                    this.isClientPerson = arrList
                  }
                  // if (cItem.ttConditionColumn.qttccName === '主体名称') {
                  //   this.getCustomDisabled(cItem, index, arrList)
                  // }
                })
              })
            }

            if (this.arr.length !== 0) {
              var clientOptionsArray = this.arr

              clientOptionsArray.forEach((item, index) => {
                if (item !== null) {
                  if (item.ttConditionColumn.status === 2 || item.ttConditionColumn.status === 3) {
                    // 报告、交易信息
                    this.getInitTradeData(item)
                    this.form.tradeCheckList.push(item)
                  }
                  if (item.ttConditionColumn.status === 1) {
                    // 报告机构信息
                    this.getInitTradeData(item)
                    this.form.reportOptions.push(item)
                  }
                  if (item.ttConditionColumn.status === 4) {
                    this.getInitTradeData(item)
                    this.form.reportCheckList.push(item)
                  }
                }
              })
            }
            if (this.form.reportCheckList.length !== 0) {
              this.form.reportCheckList.forEach(item => {
                if (item.ttConditionColumn.qttccName === '涉罪类型') {
                  if (item.ttConditionColumn.values.length !== 0) {
                    this.form.checkAllCrime = true
                    this.form.crimeDisabled = false
                  } else {
                    this.form.checkAllCrime = false
                    this.form.crimeDisabled = true
                  }
                } else if (item.ttConditionColumn.qttccName === '报送方向') {
                  if (item.ttConditionColumn.values.length !== 0) {
                    this.form.checkAllReport = true
                    this.form.reportDisabled = false
                  } else {
                    this.form.checkAllReport = false
                    this.form.reportDisabled = true
                  }
                }
              })
            }
            if (this.form.tradeCheckList.length !== 0) {
              this.form.tradeCheckList.forEach(item => {
                if (item.ttConditionColumn.qttccName === '是否仅查询当日交易' && item.qttcVal === '是') {
                  this.disabled = true
                } else if (item.ttConditionColumn.qttccName === '是否仅查询当日交易' && item.qttcVal !== '是') {
                  this.disabled = false
                }

                if (item.ttConditionColumn.qttccName === '大额交易特征') {
                  if (item.ttConditionColumn.values.length !== 0) {
                    this.form.checkAllLarge = true
                    this.form.largeDisabled = false
                  } else {
                    this.form.checkAllLarge = false
                    this.form.largeDisabled = true
                  }
                } else if (item.ttConditionColumn.qttccName === '交易种类') {
                  if (item.ttConditionColumn.values.length !== 0) {
                    this.form.checkAllTrade = true
                    this.form.tradeDisabled = false
                  } else {
                    this.form.checkAllTrade = false
                    this.form.tradeDisabled = true
                  }
                } else if (item.ttConditionColumn.qttccName === '地区') {
                  if (this.form.city.length !== 0) {
                    if (this.form.city[0] !== '') {
                      // this.form.checkAllRegion = true
                      // this.form.regionDisabled = false
                    } else {
                      // this.form.checkAllRegion = false
                      // this.form.regionDisabled = true
                    }
                  } else {
                    // this.form.checkAllRegion = false
                    // this.form.regionDisabled = true
                  }
                }
              })
            }
            this.isDisabledBlock()
          }
        })
        .catch(() => {})
    },
    getInitTradeData(item) {
      // 初始化返显报告交易绑值处理
      if (item.ttConditionColumn.qttccType === 7) {
        if (item.qttcVal) {
          const val = item.qttcVal.split(',')
          const arr = []
          this.form.interRegion = val[0].toString()
          if (this.form.interRegion !== 'NAT') {
            val.forEach((item2, index) => {
              if (index !== 0) {
                if (item2.indexOf('-') !== -1) {
                  item2 = item2.split('-')
                }
                arr.push(item2)
              }
            })
            this.form.city = arr
            this.getArea()
          } else if (this.form.interRegion === 'NAT') {
            this.form.city = val[1].toString()
            this.getCountry()
          }
        }
      } else if (item.ttConditionColumn.qttccType === 6) {
        if (item.ttConditionColumn.qttccName !== '报告机构名称') {
          if (item.qttcVal !== null && item.qttcVal !== '') {
            item.ttConditionColumn.values = item.qttcVal.split(',')
          }
        }
      } else if (item.ttConditionColumn.qttccType === 5) {
        if (item.qttcStartDate && item.qttcEndDate) {
          item.ttConditionColumn.values = [item.qttcStartDate, item.qttcEndDate]
        }
      }
    },
    getTableData(val) {
      // 获取定制结果数据
      this.list = val
    },
    getCustomDisabled(val, index, arr) {
      // if (val) {
      //   if (val.ttConditionColumn.qttccName === '主体名称') {
      //     if (arr.length !== 0) {
      //       if (arr[index] === '0') {
      //         val.qttcVal = ''
      //         return true
      //       } else {
      //         return false
      //       }
      //     } else {
      //       return false
      //     }
      //   }
      // }
    },
    // getDialogVisible(val) {
    //   this.customResultvisible = val
    // },
    routerBack() {
      const obj = JSON.parse(sessionStorage.getItem('searchData'))
      if (obj) {
        obj.ifTmpFlag = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },
    // 获取主体信息参数
    getCustomerInformations() {
      const customerInformations = []
      for (var key in this.form.clientInfo) {
        var obj = {}
        this.form.clientInfo[key].forEach(e => {
          switch (e.ttConditionColumn.pkQttcc) {
            case '1':
              obj.customerType = e.qttcVal
              break
            case '2':
              obj.customerName = e.qttcVal
              break
            case '3':
              obj.documentType = e.qttcVal
              break
            case '4':
              obj.customerNum = e.qttcVal
              break
            case '5':
              obj.accountNum = e.qttcVal
              break

            default:
              break
          }
        })

        customerInformations.push(obj)
      }
      return customerInformations
    },
    customerHasValRules() {
      let isHas = true
      const arr = this.getCustomerInformations()
      if (arr.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
          const val = arr[i].customerType
          const a = arr[i].customerName !== '' && arr[i].customerName !== null // 主体名称不为空
          const a2 = arr[i].customerName === '' || arr[i].customerName === null // 主体名称为空
          const b = arr[i].customerNum !== '' && arr[i].customerNum !== null // 证件号不为空
          const b2 = arr[i].customerNum === '' || arr[i].customerNum === null // 证件号为空
          const c = arr[i].customerType !== '' || arr[i].customerType !== null // 主体类型不为空
          const c2 = arr[i].customerType === '' || arr[i].customerType === null // 主体类型为空
          if (c) { // 类型不为空
            if (val === '0') { // 个人
              if (b2) {
                this.$confirm('温馨提示：最多可有5个主体信息；使用主体信息查询时，请先选择主体类型：选择【个人】，必须使用主体证件号码查询，选择【机构】，以主体名称或主体证件号码查询；若填写了账号，无论哪种主体类型，仅以账号为查询条件', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'warning'
                })
                isHas = false
              }
            } else if (val === '1') { // 机构
              if (a2 && b2) {
                this.$confirm('温馨提示：最多可有5个主体信息；使用主体信息查询时，请先选择主体类型：选择【个人】，必须使用主体证件号码查询，选择【机构】，以主体名称或主体证件号码查询；若填写了账号，无论哪种主体类型，仅以账号为查询条件', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'warning'
                })
                isHas = false
              }
            }
          } else { // 类型为空
            if (a2 && b2 && c2) {
              isHas = true
            } else {
              if (a || b) {
                if (c2) {
                  this.$confirm('温馨提示：最多可有5个主体信息；使用主体信息查询时，请先选择主体类型：选择【个人】，必须使用主体证件号码查询，选择【机构】，以主体名称或主体证件号码查询；若填写了账号，无论哪种主体类型，仅以账号为查询条件', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'warning'
                  })
                  isHas = false
                }
              }
            }
          }
        }
      }
      return isHas
    },
    getParamsObj() {
      // 新增参数处理
      const customerInformations = this.getCustomerInformations() // 主体信息
      const matchObj = []
      if (this.form.match.length !== 0) {
        this.form.match.forEach(item => {
          this.form.matchOptions.map(item2 => {
            if (item === item2.ttMatch.qttmNameCh) {
              matchObj.push({ uktQqqttm: item2.ttMatch.pkQttm })
            }
          })
        })
      }

      const areaObj = []
      if (this.form.area.length !== 0) {
        this.form.area.forEach(item => {
          this.form.areaOptions.map(item2 => {
            if (item === item2.ttMatchArea.qttmNameCh) {
              areaObj.push({ uktQqqttm: item2.ttMatchArea.pkQttm })
            }
          })
        })
      }

      const factorObj = [] // factorOptions
      if (this.form.factor.length !== 0) {
        this.form.factor.forEach(item => {
          this.form.factorOptions.map(item2 => {
            if (item === item2.ttStatisticFactor.qsfName) {
              factorObj.push({ uksQqq: item2.ttStatisticFactor.pkQsf })
            }
          })
        })
      }

      const dTableObj = [] // 数据库表两部分
      if (this.form.dataTable.length !== 0) {
        this.form.dataTable.forEach(item => {
          this.form.dtOptions.map(item2 => {
            if (item === item2.scopeTable.qstNameCh) {
              dTableObj.push({ uksQttq: item2.scopeTable.pkQst })
            }
          })
        })
      }

      const dTableObj2 = []
      if (this.form.dataTable2.length !== 0) {
        this.form.dataTable2.forEach(item => {
          this.form.dtOptions2.map(item2 => {
            if (item === item2.scopeTable.qstNameCh) {
              dTableObj2.push({ uksQttq: item2.scopeTable.pkQst })
            }
          })
        })
      }

      const dTableObjOther = []
      if (this.form.dataTableOther.length !== 0) {
        this.form.dataTableOther.forEach(item => {
          this.form.dtOptionsOther.map(item2 => {
            if (item === item2.scopeTable.qstNameCh) {
              dTableObjOther.push({ uksQttq: item2.scopeTable.pkQst })
            }
          })
        })
      }

      const dTableObjReport = []
      if (this.form.dataTableReport.length !== 0) {
        this.form.dataTableReport.forEach(item => {
          this.form.dtOptionsReport.map(item2 => {
            if (item === item2.scopeTable.qstNameCh) {
              dTableObjReport.push({ uksQttq: item2.scopeTable.pkQst })
            }
          })
        })
      }
      const dTgatherObj = [...dTableObj, ...dTableObj2, ...dTableObjOther, ...dTableObjReport]
      const reportInfoObj = []
      if (this.form.reportCheckList.length !== 0) {
        this.form.reportCheckList.forEach((item, index) => {
          reportInfoObj.push(this.getReportInfoObj(item))
        })
      }
      if (this.form.tradeCheckList.length !== 0) {
        this.form.tradeCheckList.forEach((item, index) => {
        // 报告、交易信息
          reportInfoObj.push(this.getReportInfoObj(item))
        })
      }
      if (this.form.reportOptions.length !== 0) {
        this.form.reportOptions.forEach((item, index) => {
        // 报告机构信息
          reportInfoObj.push(this.getReportInfoObj(item))
        })
      }

      const paramsObj = {
        qttName: this.form.qttName,
        qttStatus: '0',
        creUser: '',
        qttQttms: matchObj,
        qttQttmsArea: areaObj,
        qttQsfs: factorObj,
        ttQsts: dTgatherObj,
        customerInformations: customerInformations,
        ttccs: reportInfoObj
      }
      return paramsObj
    },
    getReportInfoObj(item) {
      // "报告交易"绑值处理
      if (item.ttConditionColumn.qttccType === 7) {
        // 地区
        let city = null
        if (typeof this.form.city === 'object') {
          if (this.form.city.length !== 0) {
            city = []
            const tempArr = []
            this.form.city.forEach(item => {
              if (typeof item === 'object') {
                city.push(item.join('-'))
              } else {
                tempArr.push(item)
              }
            })
            const arr = [...tempArr, ...city]
            city = arr
            if (this.form.interRegion !== 'NAT') {
              city = city.toString()
            } else {
              city = this.form.city.toString()
            }
          } else {
            city = ''
          }
        } else {
          city = this.form.city
        }
        let qVal = ''
        if (this.form.interRegion !== '') {
          if (city === '' || city.length === 0) {
            qVal = this.form.interRegion
          } else {
            qVal = this.form.interRegion + ',' + city
          }
        }
        this.ttccs = {
          ukQttcc: item.ttConditionColumn.pkQttcc,
          qttcVal: qVal,
          qttcStartDate: '',
          qttcEndDate: '',
          qttcStartNum: '',
          qttcEndNum: ''
        }
      } else if (item.ttConditionColumn.qttccType === 6) {
        // 涉罪类型...字段
        // 通过type值判断qttcVal取什么值
        if (item.ttConditionColumn.qttccName === '报告机构名称') {
          this.ttccs = {
            ukQttcc: item.ttConditionColumn.pkQttcc,
            qttcVal:
            item.qttcVal === null
              ? ''
              : item.qttcVal,
            qttcStartDate: '',
            qttcEndDate: '',
            qttcStartNum: '',
            qttcEndNum: ''
          }
        } else {
          this.ttccs = {
            ukQttcc: item.ttConditionColumn.pkQttcc,
            qttcVal:
            item.ttConditionColumn.values.length === 0
              ? ''
              : item.ttConditionColumn.values.toString(),
            qttcStartDate: '',
            qttcEndDate: '',
            qttcStartNum: '',
            qttcEndNum: ''
          }
        }
      } else if (item.ttConditionColumn.qttccType === 5) {
        // 时间类型
        this.ttccs = {
          ukQttcc: item.ttConditionColumn.pkQttcc,
          qttcVal: '',
          qttcStartDate:
            item.ttConditionColumn.values === null ? '' : item.ttConditionColumn.values[0],
          qttcEndDate:
            item.ttConditionColumn.values === null ? '' : item.ttConditionColumn.values[1],
          qttcStartNum: '',
          qttcEndNum: ''
        }
      } else if (item.ttConditionColumn.qttccType === 3) {
        // 交易金额
        this.ttccs = {
          ukQttcc: item.ttConditionColumn.pkQttcc,
          qttcVal: '',
          qttcStartDate: '',
          qttcEndDate: '',
          qttcStartNum: item.qttcStartNum === null ? '' : item.qttcStartNum,
          qttcEndNum: item.qttcEndNum === null ? '' : item.qttcEndNum
        }
      } else {
        this.ttccs = {
          ukQttcc: item.ttConditionColumn.pkQttcc,
          qttcVal: item.qttcVal ? item.qttcVal : '',
          qttcStartDate: '',
          qttcEndDate: '',
          qttcStartNum: '',
          qttcEndNum: ''
        }
      }
      return this.ttccs
    },
    isAllEqual(array) {
      if (array.length > 0) {
        return !array.some(function(value, index) {
          return value !== array[0]
        })
      } else {
        return true
      }
    },
    isHasReport(a, b) {
      var isHas = false
      for (let i = 0; i < a.length; i++) {
        const item = a[i]
        if (item === 1 || item === 2) { // 只要sign值等于1就是包含报告
          isHas = true
          return true
        } else {
          isHas = false
        }
      }
      return isHas
    },
    isReport(a, b) {
      var isHas = false
      for (let i = 0; i < a.length; i++) {
        const item = a[i]
        for (let j = 0; j < b.length; j++) {
          const items = b[j]
          if (item === items) {
            isHas = true
            return true
          } else {
            isHas = false
          }
        }
      }
      return isHas
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const queryOption = [...this.form.dtOptions, ...this.form.dtOptions2, ...this.form.dtOptionsReport, ...this.form.dtOptionsOther]
          if (queryOption.length === 0) { // 判断有没有数据库表权限
            this.$confirm('您还未申请查询任何库表的权限，请先申请再查询！', '提示', {
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
              return false
            }).catch()
          } else {
            const customerArr = this.isCustomerHasVal(this.form.clientInfo)
            // const reportArr = this.isReportHasVal(this.form.reportOptions)
            // const reportCheckArr = this.isReportCheckHasVal(this.form.reportCheckList) // 报告信息
            // const tradeCheckArr = this.isReportCheckHasVal(this.form.tradeCheckList)
            // if (customerArr || reportArr || reportCheckArr || tradeCheckArr) { // 如果主体信息 、报告机构信息、报告信息和交易信息 ，必填写一项，存在主体信息不为空
            if (customerArr) { // 主体信息不为空，进行主体信息校验
              if (this.customerHasValRules()) {
                this.submitParamsObj()
              }
            } else { // 主体信息为空，不进行主体信息校验
              this.submitParamsObj()
            }
            // } else {
            //   this.$confirm('主体信息 、报告机构信息、报告信息和交易信息 ，必填写一项', '提示', {
            //     showCancelButton: false,
            //     type: 'warning'
            //   })
            // }
          }
        } else {
          this.$confirm('以上有不符合规则的校验', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {}).catch()
        }
      })
    },
    submitParamsObj() {
      const paramsObj = this.getParamsObj()
      const totalDt = [...this.form.dataTable, ...this.form.dataTable2, ...this.form.dataTableOther, ...this.form.dataTableReport]
      if (totalDt.length === 0) {
        this.$confirm('请选择数据范围', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      } else if (this.isCrimeHas && this.form.dataTableReport.length === 0) {
        this.$confirm('查询条件【涉罪类型】请匹配【可疑交易报告】使用', '提示', {
          showCancelButton: false,
          type: 'warning'
        })
      } else {
        this.getSubmitUrl(paramsObj)
      }
    },
    getSubmitUrl(paramsObj) {
      this.saveLoading = true
      if (this.$route.query.title === 'new') {
        // 新增接口
        // 获取主体信息参数
        this.getAddTpl(paramsObj)
      } else if (this.$route.query.title === 'update') {
        // 修改
        // 获取主体信息参数
        const id = this.$route.query.id
        updateTpl(paramsObj, id)
          .then(res => {
            if (res.code === 200) {
              this.$message({
                showClose: true,
                duration: 6000,
                message: '修改成功！',
                type: 'success'
              })
              this.$router.push({ name: 'dataQuery_templateManage' })
              this.saveLoading = false
            } else {
              this.saveLoading = false
              this.$confirm(res.message, '提示', {
                showCancelButton: false,
                type: 'error'
              }).then()
                .catch()
            }
          })
          .catch(() => {
            this.saveLoading = false
          })
      }
    },
    isCustomerHasVal(arr) { // 判断主体信息是否全部填写
      let isClient = false
      if (arr.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i]
          for (let j = 0; j < item.length; j++) {
            if (item[j].qttcVal) {
              if (item[j].qttcVal !== '') {
                isClient = true
                return isClient
              } else {
                isClient = false
              }
            } else {
              isClient = false
            }
          }
        }
      }
      return isClient
    },
    isReportCheckHasVal(arr) { // 报告信息
      let isHas = false
      if (arr.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].ttConditionColumn) {
            if (arr[i].ttConditionColumn.qttccType === 5 || arr[i].ttConditionColumn.qttccType === 6) {
              if (arr[i].ttConditionColumn.values != null && arr[i].ttConditionColumn.values.length !== 0) {
                isHas = true
                return isHas
              } else {
                isHas = false
              }
            } else if (arr[i].ttConditionColumn.qttccType === 3) {
              if (arr[i].qttcStartNum && arr[i].qttcEndNum) {
                isHas = true
                return isHas
              } else {
                isHas = false
              }
            } else if (arr[i].ttConditionColumn.qttccType === 7) {
              if (this.form.interRegion !== '' && this.form.city.length !== 0) {
                isHas = true
                return isHas
              } else {
                isHas = false
              }
            } else {
              if (arr[i].qttcVal !== null && arr[i].qttcVal !== '') {
                isHas = true
                return isHas
              } else {
                isHas = false
              }
            }
          }
        }
      }
      return isHas
    },
    isReportHasVal(arr) { // 报告机构信息
      let isHas = false
      if (arr.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].ttConditionColumn) {
            if (arr[i].ttConditionColumn.values != null && arr[i].ttConditionColumn.values.length !== 0) {
              if (arr[i].ttConditionColumn.values.length !== 0) {
                isHas = true
                return isHas
              } else {
                isHas = false
              }
            } else if (arr[i].ttConditionColumn.qttccType === 3) {
              if (arr[i].qttcStartNum && arr[i].qttcEndNum) {
                isHas = true
                return isHas
              } else {
                isHas = false
              }
            } else if (arr[i].ttConditionColumn.qttccType === 7) {
              if (this.form.interRegion !== '' && this.form.city.length !== 0) {
                isHas = true
                return isHas
              } else {
                isHas = false
              }
            } else {
              if (arr[i].qttcVal !== null && arr[i].qttcVal !== '') {
                isHas = true
                return isHas
              } else {
                isHas = false
              }
            }
          }
        }
      }
      return isHas
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getAddTpl(paramsObj) {
      // 调新增接口
      addTpl(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.saveLoading = false
            this.$message({
              showClose: true,
              duration: 6000,
              message: '保存成功！',
              type: 'success'
            })
            this.$router.push({ name: 'dataQuery_templateManage' })
          } else {
            this.saveLoading = false
            this.$confirm(res.message, '提示', {
              showCancelButton: false,
              type: 'error'
            }).then()
              .catch()
          }
        })
        .catch(() => {
          this.saveLoading = false
        })
    },
    handleChangeDay(e) {
      // 判断当日是true的话，日期插件禁用
      if (e !== null) {
        if (e.ttConditionColumn.qttccName === '是否仅查询当日交易') {
          if (e.qttcVal === '是') {
            this.disabled = true
            this.form.tradeCheckList.map((item, index) => {
              if (item.ttConditionColumn.qttccName === '交易日期') {
                item.ttConditionColumn.values = []
              }
              if (item.ttConditionColumn.qttccName === '主体国籍') {
                item.qttcVal = ''
              }
              if (item.ttConditionColumn.qttccName === '联系电话') {
                item.qttcVal = ''
              }
              // if (item.ttConditionColumn.qttccName === '地区') {
              //   item.qttcVal = ''
              //   this.form.city = []
              //   this.form.interRegion = ''
              // }
            })
          } else {
            this.disabled = false
          }
        }
      }
    },
    getDefault() {
      this.loading = true
      this.getData(2)
    },
    handleDefault(count) {
      // 恢复默认
      this.$set(this.form, 'clientInfo', [])
      this.$set(this.form, 'tradeCheckList', [])
      this.$set(this.form, 'reportOptions', [])
      this.$set(this.form, 'reportCheckList', [])
      const dataTableChecked = ['银行业大额交易'] // 默认选中状态
      const dataTableChecked2 = ['银行业可疑交易'] // 默认选中状态
      const dataTableReportChecked = [] // 默认选中状态
      const factorChecked = [
        '交易主体数',
        '账户数',
        '交易笔数',
        '本币金额',
        '外币金额',
        '单笔最大金额',
        '最早交易时间',
        '最晚交易时间'
      ] // 统一配置选中
      this.clientName = ''
      this.disabled = false
      this.form.dataTable = dataTableChecked
      this.form.dataTable2 = dataTableChecked2
      this.form.dataTableReport = dataTableReportChecked
      this.form.dataTableOther = []
      this.form.match = []
      this.form.factor = factorChecked
      this.form.dtOptions = []
      this.form.dtOptions2 = []
      this.form.dtOptionsReport = []
      this.form.dtOptionsOther = []
      this.form.matchOptions = []
      this.form.area = []
      this.form.areaOptions = []
      this.form.factorOptions = []
      this.form.clientOptions = []

      if (this.getTitle === '修改') {
        if (count === 1) {
          this.form.qttName = ''
        }
      } else {
        if (count === 2) {
          this.form.qttName = ''
        }
      }

      this.form.largeDisabled = true
      this.form.crimeDisabled = true
      this.form.reportDisabled = true
      this.form.tradeDisabled = true
      this.form.checkAllLarge = false // 大额特征一键删除参数
      this.form.checkAllCrime = false
      this.form.checkAllReport = false
      this.form.checkAllTrade = false
      // this.form.regionDisabled = true
      // this.form.checkAllRegion = false // 地区
      this.form.city = []
      this.form.interRegion = ''
      this.form.organNum = ''
      this.form.organName = []
      this.form.websiteName = ''
      this.form.dateValue = ''
      this.form.isNotStatistic = false // 是否仅统计
      this.form.redundancy = false // 是否剔重
      this.isIndeterminate = true // 数据库表--大额全选状态
      this.isIndeterminate2 = true // 数据库表--可疑全选状态
      this.isIndeterminateOther = true // 数据库表--其他全选状态
      this.isIndeterminateReport = true
      this.dtReportCheckAll = false
      this.dtCheckAll = false // 数据库表--大额全选状态
      this.dtCheckAll2 = false // 数据库表--可疑全选状态
      this.dtCheckAllOther = false // 数据库表全选
      this.isIndeterminateMatch = false // 匹配信息
      this.matchCheckAll = true // 匹配信息
      this.isIndeterminateArea = false // 地区匹配信息
      this.areaCheckAll = true // 地区匹配信息
      this.isIndeterminateFactor = false // 配置统计要素
      this.factorCheckAll = true // 配置统计要素
      this.isCrimeHas = false
      this.isDisabledBlock()
    },
    isDisabledBlock() { // 通过数据范围判断交易信息和报文信息置不置灰
      const tLen = [...this.form.dataTable, ...this.form.dataTable2]
      if (tLen.length > 0) {
        this.isDisabledTrade = false
      } else {
        this.isDisabledTrade = true
      }
      if (this.form.dataTableReport.length > 0) {
        this.isDisabledReport = false
      } else {
        this.isDisabledReport = true
      }
    },
    addCustomer() {
      // 添加主体信息
      this.flag++
      if (this.flag <= 4) {
        this.$set(
          this.form.clientInfo,
          this.flag,
          JSON.parse(JSON.stringify(this.form.clientOptions))
        )
      } else {
        this.$confirm('最多可添加5个主体信息', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      }
    },
    removeCustomer(id) {
      // 删除主体信息
      this.$delete(this.form.clientInfo, id)
      this.flag = this.form.clientInfo.length - 1
      this.isClientPerson = []
    },
    handleExit() {
      // 报告、交易--编辑弹框
      this.tradeDialogVisible = true
      if (this.tradeDialogVisible) {
        this.exitDialogLoading = true
        exitItem()
          .then(res => {
            if (res.code === 200) {
              this.dialogForm.tradeOptions = res.data
              const tmpArr = []
              this.form.tradeCheckList.map(function(item) {
                tmpArr.push(item.ttConditionColumn.qttccName)
              })
              this.dialogForm.tradeInfo = tmpArr
              this.$nextTick(function() {
                this.exitDialogLoading = false
              })
            } else {
              this.exitDialogLoading = false
            }
          })
          .catch(() => {
            this.exitDialogLoading = false
          })
      }
    },
    tradeSubmit() {
      // 报告、交易--弹框确定
      const newInfo = []
      this.dialogForm.tradeOptions.forEach((item, index) => {
        // 把this.dialogForm.tradeInfo里的值转化对象
        this.dialogForm.tradeInfo.map(item2 => {
          if (item.ttConditionColumn.qttccName === item2) {
            newInfo.push(item) // 编辑弹框选中数组对象
          }
        })
      })

      const newTradeList = []

      this.form.tradeCheckList.map(item => {
        newTradeList.push(item.ttConditionColumn.qttccName) // 默认字段数组
      })

      const arrInfo = [] // 1.newTradeList数组对象  2.newInfo数组对象

      const newInfo2 = []
      newInfo.forEach((item, index) => {
        // 编辑字段绑定的值
        newInfo2.push(item.ttConditionColumn.qttccName)
      })

      newInfo2.forEach((item, index) => {
        if (newTradeList.indexOf(item) !== -1) {
          this.form.tradeCheckList.forEach((item2, index2) => {
            if (item === item2.ttConditionColumn.qttccName) {
              arrInfo.push(item2)
            }
          })
        } else {
          arrInfo.push(newInfo[index])
        }
      })

      this.form.tradeCheckList = []
      this.form.tradeCheckList = JSON.parse(JSON.stringify(arrInfo)) // 数组赋值

      this.tradeDialogVisible = false
    },
    closeExitDialog() { // 关闭弹框
      this.exitDialogLoading = false
      this.tradeDialogVisible = false
    },
    handleInterRegionChange(val) {
      // 地区
      if (val) {
        // this.form.checkAllRegion = true
        // this.form.regionDisabled = false
        if (val !== 'NAT') {
          this.getArea()
        } else if (val === 'NAT') {
          this.getCountry()
        }
      } else {
        // this.form.checkAllRegion = false
        // this.form.regionDisabled = true
      }

      this.form.city = []
    },
    handleRegionClear() {
      this.cityListOptions = []
      this.countryData = []
    },
    getArea() {
      getArea() // 获取交易地址
        .then(res => {
          if (res.code === 200) {
            this.cityListOptions = []
            if (this.form.interRegion === 'CHN') {
              this.cityListOptions = res.data
            } else {
              res.data.forEach(item => {
                if (item.value !== '710000' && item.value !== '810000' && item.value !== '820000') {
                  this.cityListOptions.push(item)
                }
              })
            }
          } else {
            this.$confirm(res.message, '提示', {
              showCancelButton: false,
              type: 'error'
            }).then()
              .catch()
          }
        })
        .catch()
    },
    // 获取省份
    getCountry() {
      country().then(res => {
        if (res.code === 200) {
          this.countryData = []
          res.data.list.forEach(res => {
            if (res.numCode !== '156' && res.numCode !== '344' && res.numCode !== '446' && res.numCode !== '158') {
              this.countryData.push(res)
            }
          })
        }
      })
    },
    // 报告机构名称
    remoteMethod(query, cb) {
      if (query !== '' && query !== null) {
        const paramsObj = {
          region: 'all',
          rinm: query
        }
        getRinmList(paramsObj).then(res => {
          if (res.code === 200) {
            if (res.data.length < 300 && res.data.length >= 0) {
              cb(res.data)
            } else {
              let arr = res.data.slice(0, 300)
              arr = arr.map(item => {
                return item
              })
              arr.push('more')
              cb(arr)
            }
          }
        })
      }
    },
    getRicdMethod(query, cb) {
      if (query !== '') {
        const paramsObj = {
          region: 'all',
          ricd: query
        }
        getRinmList(paramsObj).then(res => {
          if (res.code === 200) {
            cb(res.data)
          }
        })
      }
    },
    handleDtCheckAllChange(val) { // 数据库表--大额（全选）
      const arr = []
      this.form.dtOptions.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTable = val ? arr : []
      this.isIndeterminate = false
      this.isDisabledBlock()
    },
    handleDtoptionsChange(val) { // 数据库表--大额（单选）
      const checkedCount = val.length
      this.dtCheckAll = checkedCount === this.form.dtOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.form.dtOptions.length
      this.isDisabledBlock()
    },
    handleDtCheckAllChange2(val) { // 数据库表--可疑（全选）
      const arr = []
      this.form.dtOptions2.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTable2 = val ? arr : []
      this.isIndeterminate2 = false
      this.isDisabledBlock()
    },
    handleDtoptionsChange2(val) { // 数据库表--可疑（单选）
      const checkedCount = val.length
      this.dtCheckAll2 = checkedCount === this.form.dtOptions2.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.form.dtOptions2.length
      this.isDisabledBlock()
    },
    handleDtReportCheckAllChange(val) {
      const arr = []
      this.form.dtOptionsReport.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTableReport = val ? arr : []
      this.isIndeterminateReport = false
      this.isDisabledBlock()
    },
    handleDtReportChange(val) { // 数据库表--其他（单选）
      const checkedCount = val.length
      this.dtReportCheckAll = checkedCount === this.form.dtOptionsReport.length
      this.isIndeterminateReport = checkedCount > 0 && checkedCount < this.form.dtOptionsReport.length
      this.isDisabledBlock()
    },
    handleDtCheckAllChangeOther(val) { // 数据库表--其他（全选）
      const arr = []
      this.form.dtOptionsOther.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTableOther = val ? arr : []
      this.isIndeterminateOther = false
    },
    handleDtoptionsChangeOther(val) { // 数据库表--其他（单选）
      const checkedCount = val.length
      this.dtCheckAllOther = checkedCount === this.form.dtOptionsOther.length
      this.isIndeterminateOther = checkedCount > 0 && checkedCount < this.form.dtOptionsOther.length
    },
    handleMatchCheckAllChange(val) { // 匹配信息
      const arr = []
      this.form.matchOptions.map(item => {
        arr.push(item.ttMatch.qttmNameCh)
      })
      this.form.match = val ? arr : []
      this.isIndeterminateMatch = false
    },
    handleMatchOptionsChange(val) { // 匹配信息
      const checkedCount = val.length
      this.matchCheckAll = checkedCount === this.form.matchOptions.length
      this.isIndeterminateMatch = checkedCount > 0 && checkedCount < this.form.matchOptions.length
    },
    handleAreaCheckAllChange(val) { // 地区匹配信息
      const arr = []
      this.form.areaOptions.map(item => {
        arr.push(item.ttMatchArea.qttmNameCh)
      })
      this.form.area = val ? arr : []
      this.isIndeterminateArea = false
    },
    handleAreaOptionsChange(val) { // 地区匹配信息
      const checkedCount = val.length
      this.areaCheckAll = checkedCount === this.form.areaOptions.length
      this.isIndeterminateArea = checkedCount > 0 && checkedCount < this.form.areaOptions.length
    },
    handleFactorCheckAllChange(val) { // 配置统计
      const arr = []
      this.form.factorOptions.map(item => {
        arr.push(item.ttStatisticFactor.qsfName)
      })
      this.form.factor = val ? arr : []
      this.isIndeterminateFactor = false
    },
    handleFactorOptionsChange(val) { // 配置统计
      const checkedCount = val.length
      this.factorCheckAll = checkedCount === this.form.factorOptions.length
      this.isIndeterminateFactor = checkedCount > 0 && checkedCount < this.form.factorOptions.length
    },
    getInputMax(item) {
      if (item.ttConditionColumn.qttccName === '主体名称') {
        return 512
      } else if (item.ttConditionColumn.qttccName === '主体证件号码') {
        return 32
      } else if (item.ttConditionColumn.qttccName === '账号') {
        return 64
      } else if (item.ttConditionColumn.qttccName === '报告机构编码') {
        return 15
      } else if (item.ttConditionColumn.qttccName === '报告机构名称') {
        return 200
      } else if (item.ttConditionColumn.qttccName === '报告机构网点名称') {
        return 200
      } else if (item.ttConditionColumn.qttccName === '业务标识号') {
        return 256
      } else if (item.ttConditionColumn.qttccName === '报文名') {
        return 50
      } else if (item.ttConditionColumn.qttccName === '报告ID') {
        return 100
      } else if (item.ttConditionColumn.qttccName === '交易金额') {
        return 20
      } else if (item.ttConditionColumn.qttccName === 'IP地址') {
        return 15
      } else if (item.ttConditionColumn.qttccName === '交易品种代码') {
        return 32
      } else if (item.ttConditionColumn.qttccName === '收付款方匹配号') {
        return 500
      } else if (item.ttConditionColumn.qttccName === '保险合同号') {
        return 32
      } else if (item.ttConditionColumn.qttccName === '联系电话') {
        return 30
      }
    },
    getPlaceholder(item) {
      if (item.ttConditionColumn.qttccName === '主体名称') {
        return '最大长度为512位'
      } else if (item.ttConditionColumn.qttccName === '主体证件号码') {
        return '最大长度为32位'
      } else if (item.ttConditionColumn.qttccName === '账号') {
        return '最大长度为64位'
      } else if (item.ttConditionColumn.qttccName === '报告机构编码') {
        return '最大长度为15位'
      } else if (item.ttConditionColumn.qttccName === '报告机构名称') {
        return '最大长度为200位'
      } else if (item.ttConditionColumn.qttccName === '报告机构网点名称') {
        return '最大长度为200位'
      } else if (item.ttConditionColumn.qttccName === '业务标识号') {
        return '最大长度为256位'
      } else if (item.ttConditionColumn.qttccName === '报文名') {
        return '最大长度为50位'
      } else if (item.ttConditionColumn.qttccName === '报告ID') {
        return '最大长度为100位'
      } else if (item.ttConditionColumn.qttccName === '交易金额') {
        return '最大长度为20位'
      } else if (item.ttConditionColumn.qttccName === 'IP地址') {
        return '请填写IP地址'
      } else if (item.ttConditionColumn.qttccName === '交易品种代码') {
        return '最大长度为32位'
      } else if (item.ttConditionColumn.qttccName === '收付款方匹配号') {
        return '最大长度为500位'
      } else if (item.ttConditionColumn.qttccName === '保险合同号') {
        return '最大长度为32位'
      } else if (item.ttConditionColumn.qttccName === '联系电话') {
        return '最大长度为30位'
      }
    },
    selectLargeChange(event, item) { // 多选下拉一键删除
      if (item.ttConditionColumn.values.length > 0) {
        this.form.checkAllLarge = true
        this.form.largeDisabled = false
      } else {
        this.form.checkAllLarge = false
        this.form.largeDisabled = true
      }
    },
    selectCrimeChange(event, item) { // 多选下拉一键删除
      if (item.ttConditionColumn.values.length > 0) {
        this.isCrimeHas = true
        this.form.checkAllCrime = true
        this.form.crimeDisabled = false
      } else {
        this.isCrimeHas = false
        this.form.checkAllCrime = false
        this.form.crimeDisabled = true
      }
    },
    selectReportChange(event, item) { // 多选下拉一键删除
      if (item.ttConditionColumn.values.length > 0) {
        this.form.checkAllReport = true
        this.form.reportDisabled = false
      } else {
        this.form.checkAllReport = false
        this.form.reportDisabled = true
      }
    },
    selectTradeChange(event, item) { // 多选下拉一键删除
      if (item.ttConditionColumn.values.length > 0) {
        this.form.checkAllTrade = true
        this.form.tradeDisabled = false
      } else {
        this.form.checkAllTrade = false
        this.form.tradeDisabled = true
      }
    },
    handleCheckRegionChange(val, item) { // 地区前面复选框按钮
      if (!val) {
        // this.form.regionDisabled = true
        this.form.interRegion = ''
        this.form.city = []
      }
    },
    handleCheckLargeChange(val, item) {
      if (!val) {
        this.form.largeDisabled = true
        item.ttConditionColumn.values = []
      }
    },
    handleCheckCrimeChange(val, item) {
      if (!val) {
        this.form.crimeDisabled = true
        item.ttConditionColumn.values = []
        this.isCrimeHas = false
      }
    },
    handleCheckReportChange(val, item) {
      if (!val) {
        this.form.reportDisabled = true
        item.ttConditionColumn.values = []
      }
    },
    handleCheckTradeChange(val, item) {
      if (!val) {
        this.form.tradeDisabled = true
        item.ttConditionColumn.values = []
      }
    }
  }
}
</script>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>
<style lang="scss">
@mixin icon($font: 26px, $v: middle) {
  font-size: $font;
  vertical-align: $v;
}

.templateManage_add {
  position: relative;
  .el-cascader__tags .el-tag > span{
    -webkit-box-flex:1;
    -ms-flex:none;
    flex:none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-date-editor--daterange{
    width: 100% !important;
  } 
  .btnalign {
    text-align: right;
    margin-top: 10px;
  }
  .el-select-uwrap .el-select .el-tag:nth-child(2) {
    display: none;
  }
  .el-select-uwrap-two .el-select .el-tag:nth-child(3) {
    display: none;
  }
  // 第一行查询模板样式
  .querymodel {
    margin-left: 20px;
    .el-form-item__label {
      font-weight: bold;
    }
  }
  .line-info {
    .el-form-item--small .el-form-item__content,
    .el-form-item--small .el-form-item__label {
      height: 32px;
    }
  }
  .line2 {
    .el-select {
      width: 100%;
    }
  }
  .el-select__tags {
    overflow: hidden;
  }
  .radiowrap .el-form-item--small.el-form-item,
  .datewrap .el-form-item--small.el-form-item, 
  .inputwrap .el-form-item--small.el-form-item {
    // 报告交易表单高度一致
    height: 33px;
  }
  .line3 {
    .el-select {
      width: 120px;
    }
    .dateSelect {
      .el-input__inner {
        border-right: none;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        background-color: #f5f7fa;
      }
    }
    .el-date-editor {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
  .dialogReport .el-checkbox + .el-checkbox {
    // 报告信息弹框复选框样式
    width: 20%;
    margin-left: 0px;
  }
  .dialogReport .el-checkbox {
    // 报告信息弹框（第一个）复选框样式
    width: 20%;
    margin-left: 0px;
  }
  .block {
    .subblocktitle {
      padding: 10px 0;
      .title {
        display: inline-block;
        width: 114px;
        font-size: 0.875em;
        font-weight: bold;
        text-align: right;
      }
    }
    
    .subblocktitle2 {
      padding-bottom: 10px;
      span {
        display: inline-block;
        font-size: 0.875em;
        font-weight: bold;
      }
    }
    .dataMain  { // 数据库表样式
      .el-checkbox {
        width: 20%;
        margin-left: 0px;
      }
      padding-left: 70px;
      padding-right: 70px;
    }
    .dataMain .el-checkbox:nth-child(22) { // 数据库表样式
      width: 80%;
    }
    .content {
      .el-checkbox {
        // overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      // .dataMain .el-checkbox {
      //   // 数据库表样式
      //   width: 20%;
      //   margin-left: 0px;
      // }

      .matchMain .el-checkbox {
        // 匹配选项样式
        width: 14.2%;
        margin-left: 0px;
      }
      .el-icon-remove-outline {
        @include icon();
      }
      .el-icon-circle-plus-outline {
        @include icon();
      }
    }
  }
  .dialogReport .el-checkbox + .el-checkbox {
    // 报告信息弹框复选框样式
    width: 20%;
    margin-left: 0px;
  }
  .dialogReport .el-checkbox {
    // 报告信息弹框（第一个）复选框样式
    width: 20%;
    margin-left: 0px;
  }
  .infoWarp {
    cursor: pointer;
    & {
      .closeBtn {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1000000;
      }
    }
    &:hover {
      .closeBtn {
        display: block;
      }
    }
  }
}
</style>
