<template>
  <div class="dataquery">
    <el-card>
      <div slot="header">
        <span>特定数据类型查询</span>
      </div>
      <el-form :model="form" ref="form" label-width="140px">
        <!-- <div class="block clearfix">
          <el-col :span="12">
            <el-form-item label="模板名称：" class="querymodel" label-width="120px">
              <el-select v-model="form.qttName" placeholder="请输入模板名称" @change="handleTemplate" @clear="getData(1)" clearable style="width: 100%;">
                <el-option v-for="(item, index) in tplOptions" :label="item.qttName" :value="item.pkQtt" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </div> -->
        <div class="block clearfix">
          <div class="subblocktitle"> 
            <span class="title" style=" font-size: 16px;">查询条件</span>
          </div>
          <div class="subblocktitle">
            <span class="title">主体信息</span>
            <el-button icon="el-icon-plus" type="primary" plain style="margin-left: 26px; margin-rigth: 6px; padding: 6px 10px;" @click="addCustomer"></el-button>
            <span style="color: #f56c6c; font-size: 12px; margin-left: 10px;">温馨提示：最多可有5个主体信息；使用主体信息查询时，请先选择主体类型：选择【个人】，必须使用主体证件号码查询，选择【机构】，以主体名称或主体证件号码查询；若填写了账号，无论哪种主体类型，仅以账号为查询条件；其中主体名称、主体证件号码、账号可支持后模糊匹配查询，例：可输入“张%”，查询“张三或是张三丰”。</span>
          </div>
          <el-row :gutter="20" class="infoWarp clearfix" v-for="(item, index) in form.clientInfo" :key="index" style="border: 1px solid #dcdfe6; padding:10px 10px 0; position: relative;">
            <el-button class="closeBtn" v-if="index !== 0" icon="el-icon-minus" type="primary" plain @click.prevent="removeCustomer(index)"></el-button>
            <div v-for="(client,cIndex) in item" :key="cIndex" label-width="120px">
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 0">
                <el-form-item :label="client.ttConditionColumn.qttccName" style="height: 34px;">
                  <el-radio-group v-model="client.qttcVal">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="client.ttConditionColumn.qttccName === '主体名称'? 16 : 8" v-if="client.ttConditionColumn.qttccType === 1 && client.ttConditionColumn.qttccName !== '主体类型'">
                <el-form-item :label="client.ttConditionColumn.qttccName" :rules="clientRule(item, cIndex)" :prop="'clientInfo.'+index+'.'+cIndex+'.qttcVal'" style="height: 34px;">
                  <el-input v-model="client.qttcVal" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)" @blur="handleClientnameChange(client, index)" style="width: 100%;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 1 && client.ttConditionColumn.qttccName === '主体类型'">
                <el-form-item :label="client.ttConditionColumn.qttccName"  :rules="clientRule(item, cIndex, index)" :prop="'clientInfo.'+index+'.'+cIndex+'.qttcVal'" style="height: 34px;">
                  <el-select v-model="client.qttcVal" clearable @change="handleClientChange(client, index)" style="width: 100%;">
                    <el-option label="个人" value="0"></el-option>
                    <el-option label="机构" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 3">
                <el-form-item :label="client.ttConditionColumn.qttccName" style="height: 34px;">
                  <el-input v-model="client.qttcStartNum" style="width: 40%; margin-right:6px;" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)"></el-input>~
                  <el-input v-model="client.qttcEndNum" style="width: 40%; margin-left:6px;" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 4">
                <el-form-item :label="client.ttConditionColumn.qttccName" style="height: 34px;">
                  <el-select v-model="client.qttcVal" @change="handleDocumentTypeChange(client)" clearable style="height: 34px; width: 100%;">
                    <el-option v-for="(selItem, sIndex) in client.ttConditionColumn.codes" :key="sIndex" :value="selItem.codeId" :label="selItem.codeName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 5">
                <el-form-item :label="client.ttConditionColumn.qttccName" style="height: 34px;">
                  <el-date-picker v-model="client.ttConditionColumn.values" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="client.ttConditionColumn.qttccType === 6">
                <el-form-item :label="client.ttConditionColumn.qttccName" style="height: 34px;">
                  <el-select v-model="client.qttcVal" clearable style="width: 100%;">
                    <el-option v-for="(selItem, sIndex) in client.ttConditionColumn.codes" :key="sIndex" :value="selItem.codeId" :label="selItem.codeName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
          </el-row> 
        </div>
        <el-collapse style="margin-top: 10px;" class="toggleWrap">
          <el-collapse-item name="1">
            <template slot="title">
              <div style="text-align: center; disabled: block;" @click="toggleZS"><el-button type="text" v-show="!isToggle"><i class="el-icon-arrow-down" style="margin-right: 3px;"></i>展开</el-button><el-button type="text" v-show="isToggle"><i class="el-icon-arrow-up" style="margin-right: 3px;"></i>收起</el-button></div>
            </template>
            <div class="block clearfix">
              <div class="subblocktitle">
                <span class="title toggletitle">地区信息</span>
              </div>
              <el-row :gutter="20">
                <div v-for="(trade, tIndex) in form.tradeCheckList" :key="tIndex" label-width="120px">
                  <el-col :span="15" v-if="trade.ttConditionColumn.qttccType === 7" class="inputwrap" style="position: relative;">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" style="height: 34px;">
                      <el-select v-model="form.interRegion" @change="handleInterRegionChange" style="width: 46%;" clearable @clear="handleRegionClear">
                        <el-option label="中国" value="CHN"></el-option>
                        <el-option label="大陆地区保税区" value="Z01"></el-option>
                        <el-option label="大陆地区加工区" value="Z02"></el-option>
                        <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                        <el-option label="境外" value="NAT"></el-option>
                      </el-select>
                      <el-cascader v-if="form.interRegion !== 'NAT'" style="width: 52%;" :options="cityListOptions" v-model="form.city" clearable :props="props" collapse-tags>
                      </el-cascader>

                      <el-select v-if="form.interRegion === 'NAT'" style="width: 52%;" v-model="form.city" clearable>
                        <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc" v-if="country.chSName !== '中国'"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </div>
              </el-row>
            </div>
            <div class="block clearfix">
              <div class="subblocktitle">
                <span class="title toggletitle">报文、交易信息</span>
              </div>
              <div v-for="(report, rIndex) in form.reportOptions" :key="rIndex" label-width="120px">

                <el-col :span="8" v-if="report.ttConditionColumn.qttccType === 0">
                  <el-form-item :label="report.ttConditionColumn.qttccName" :prop="report.qttcVal" style="height: 34px;">
                    <el-radio-group v-model="report.qttcVal" @change="handleChange">
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="report.ttConditionColumn.qttccType === 1">
                  <el-form-item :label="report.ttConditionColumn.qttccName" :prop="'reportOptions.'+ rIndex + '.qttcVal'" :rules="Rules(report)" style="height: 34px;">
                    <el-input v-model='report.qttcVal' :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)" v-if="report.ttConditionColumn.qttccName !== '报告机构编码'&& report.ttConditionColumn.qttccName !== '报文ID'" style="width: 100%;"></el-input>
                    <el-autocomplete v-if="report.ttConditionColumn.qttccName === '报告机构编码'"
                      style="width:100%"
                      v-model="report.qttcVal"
                      :fetch-suggestions="getRicdMethod"
                      value-key="ricd"
                      :trigger-on-focus="false"
                      :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                    ></el-autocomplete>
                    <el-input v-model='report.qttcVal' type="textarea" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)" v-if="report.ttConditionColumn.qttccName === '报文ID'" style="width: 100%;"></el-input>
                  <!-- <el-select v-model='report.qttcVal' v-if="report.ttConditionColumn.qttccName === '义务机构网点名称'">
                      <el-option v-for="(net, netIndex) in networkOptions" :key="netIndex" ></el-option>
                    </el-select> -->
                    <!-- <el-autocomplete v-if="report.ttConditionColumn.qttccName === '义务机构网点名称'"
                      style="width:100%"
                      v-model="report.qttcVal"
                      :fetch-suggestions="getNetMethod"
                      value-key="finn_name"
                      :trigger-on-focus="false"
                      :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                    ></el-autocomplete> -->
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="report.ttConditionColumn.qttccType === 2">
                  <el-form-item :prop="report.qttcVal" style="height: 34px;">
                    <el-checkbox v-model="report.qttcVal">{{report.ttConditionColumn.qttccName}}</el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="report.ttConditionColumn.qttccType === 3">
                  <el-form-item :label="report.ttConditionColumn.qttccName" :prop="'reportOptions.'+ rIndex + '.qttcStartNum'" :rules="Rules(report)" style="height: 34px;">
                    <el-input v-model="report.qttcStartNum" style="width: 40%; margin-right:6px;" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"></el-input>~
                    <el-input v-model="report.qttcEndNum" style="width: 40%; margin-left:6px;" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="report.ttConditionColumn.qttccType === 4">
                  <el-form-item :label="report.ttConditionColumn.qttccName" :prop="report.qttcVal" style="height: 34px;">
                    <el-select v-model="report.qttcVal" clearable style="width: 100%;">
                      <el-option v-for="(selItem, sIndex) in report.ttConditionColumn.codes" :key="sIndex" :value="selItem.codeId" :label="selItem.codeName"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="report.ttConditionColumn.qttccType === 5"> 
                  <el-form-item :label="report.ttConditionColumn.qttccName" :prop="report.qttcVal" style="height: 34px;">
                    <el-date-picker v-model="report.ttConditionColumn.values" value-format="yyyy-MM-dd" type="daterange" :disabled="disabled" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="report.ttConditionColumn.qttccType === 6">
                  <!--义务机构名称-->
                  <el-form-item :label="report.ttConditionColumn.qttccName" :prop="'reportOptions.'+ rIndex + '.qttcVal'" :rules="Rules(report)" style="height: 34px;">
                    <el-autocomplete style="width:100%" v-model="report.qttcVal" :fetch-suggestions="remoteMethod" value-key="rinm" :placeholder="getPlaceholder(report)" :trigger-on-focus="false" :maxlength="getInputMax(report)" icon="search"></el-autocomplete>
                  </el-form-item>
                </el-col>
              </div>
            </div>
            <!--数据范围-->
            <div class="block clearfix">
              <div class="subblocktitle">
                <span class="title toggletitle">数据范围</span>
              </div>
              <el-row :gutter="20" v-show="!(form.dtOptions.length === 0 && form.dtOptions2.length === 0 && form.dtOptionsReport.length === 0 && form.dtOptionsOther.length === 0)">
              <el-form-item label="" class="dataMain" prop="type" label-width="0px">
                <!-- <el-col :span="24" v-show="form.dtOptions.length !== 0">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="dtCheckAll" @change="handleDtCheckAllChange" style="width: 30%;">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.dataTable" @change="handleDtoptionsChange">
                      <el-checkbox v-for="(item, index) in form.dtOptions" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-col> -->
                <el-col :span="24" v-show="form.dtOptions2.length !== 0">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminate2" v-model="dtCheckAll2" @change="handleDtCheckAllChange2">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.dataTable2" @change="handleDtoptionsChange2">
                      <el-checkbox v-for="(item, index) in form.dtOptions2" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-col>

                <el-col :span="24" v-show="form.dtOptionsReport.length !== 0">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminateReport" v-model="dtReportCheckAll" @change="handleDtReportCheckAllChange">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.dataTableReport" @change="handleDtReportChange">
                      <el-checkbox v-for="(item, index) in form.dtOptionsReport" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-col>

                <el-col :span="24" v-show="form.dtOptionsOther.length !== 0">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminateOther" v-model="dtCheckAllOther" @change="handleDtCheckAllChangeOther">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.dataTableOther" @change="handleDtoptionsChangeOther">
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
                <span class="title toggletitle">报告查询选项</span>
                <!-- <el-button type="primary" plain style="margin-left: 26px;" @click="handleExit">编辑</el-button> -->
              </div>
              <el-row :gutter="20">
                <div v-for="(trade, tIndex) in form.reportCheckList" :key="tIndex" label-width="120px">
                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 0" class="radiowrap">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.qttcVal'" v-if="trade.ttConditionColumn.qttccName !== '可疑交易报告紧急程度'" style="height: 34px;">
                      <el-radio-group v-model="trade.qttcVal" @change="handleChangeDay(trade)" :disabled="isDisabledReport">
                        <el-radio label="是">是</el-radio>
                        <el-radio label="否">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.qttcVal'" v-if="trade.ttConditionColumn.qttccName === '可疑交易报告紧急程度'" label-width="160px" style="height: 34px;">
                      <el-select v-model="trade.qttcVal" placeholder="请选择" clearable style="width: 100%;" :disabled="isDisabledReport">
                        <el-option label="特别紧急" value="02"></el-option>
                        <el-option label="非特别紧急" value="01"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 1" class="inputwrap">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.qttcVal'" :rules="Rules(trade)" style="height: 34px;">
                      <el-input v-model='trade.qttcVal' v-if="trade.ttConditionColumn.qttccName !== '联系电话'" :maxlength="getInputMax(trade)" :placeholder="getPlaceholder(trade)" style="width:100%;" :disabled="isDisabledReport"></el-input>
                      <el-input v-model='trade.qttcVal' v-if="trade.ttConditionColumn.qttccName === '联系电话'" :maxlength="getInputMax(trade)" :placeholder="getPlaceholder(trade)" style="width:100%;" :disabled="isDisabledReport"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 2" class="inputwrap">
                  <el-form-item :prop="'reportCheckList.'+ tIndex + '.qttcVal'" style="height: 34px;">
                    <el-checkbox v-model="trade.qttcVal" :disabled="isDisabledReport">{{trade.ttConditionColumn.qttccName}}</el-checkbox>
                  </el-form-item>
                  </el-col>

                  <!--交易金额-->
                  <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="8" v-if="trade.ttConditionColumn.qttccType === 3" class="inputwrap">
                    <el-col style="width: 140px; text-align:right; font-size: 14px; padding: 8px 12px 0 0; color: #606266;"><div>{{trade.ttConditionColumn.qttccName}}</div></el-col>
                    <el-col :span="6">
                      <el-form-item label="" label-width="0px" :prop="'reportCheckList.'+ tIndex + '.qttcStartNum'" :rules="Rules(trade)" style="height: 34px;">  <!--:rules="trade.ttConditionColumn.qttccName === '交易金额' ? startMoneyRule(tIndex) : []"-->
                        <el-input v-model="trade.qttcStartNum" :maxlength="getInputMax(trade)" @change="handleMinChange(tIndex)" :placeholder="getPlaceholder(trade)" style="width: 100%;" :disabled="isDisabledReport"></el-input> <!--@change="handleMinChange(tIndex)"-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <span style="display: inline-block;width: 100%;line-height: 33px;text-align: center;">至</span>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="" label-width="0px" :prop="'reportCheckList.'+ tIndex + '.qttcEndNum'" :rules="Rules(trade)" style="height: 34px;"> <!-- :rules="trade.ttConditionColumn.qttccName === '交易金额' ? endMoneyRule(tIndex) : []"-->
                        <el-input v-model="trade.qttcEndNum" :maxlength="getInputMax(trade)" @change="handleMaxChange(tIndex)" :placeholder="getPlaceholder(trade)" style="width: 100%;" :disabled="isDisabledReport"></el-input>  <!-- @change="handleMaxChange(tIndex)"-->
                      </el-form-item>
                    </el-col>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 4" class="inputwrap">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.qttcVal'" style="height: 34px;">
                      <el-select v-model="trade.qttcVal" v-if="trade.ttConditionColumn.pkQttcc !== '28'" clearable style="width: 100%;" :disabled="isDisabledReport">
                        <el-option v-for="(selItem, sIndex) in trade.ttConditionColumn.codes" :key="sIndex" :label="selItem.codeName" :value="selItem.codeId"></el-option>
                      </el-select>
                      <el-select v-model="trade.qttcVal"  v-if="trade.ttConditionColumn.pkQttcc === '28'" clearable style="width: 100%;" :disabled="isDisabledReport">
                        <el-option v-for="(selItem, sIndex) in trade.ttConditionColumn.codes" :key="sIndex" :label="selItem.codeName" :value="selItem.codeId"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 5" class="datewrap">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.ttConditionColumn.values'" style="height: 34px;">
                      <el-date-picker v-model="trade.ttConditionColumn.values" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" :disabled="isDisabledReport">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 6" class="inputwrap" style="position: relative;">
                    <el-checkbox style="position: absolute; left: 20px; top: 5px;" v-model="form.checkAllLarge" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" @change="handleCheckLargeChange($event, trade)" :disabled="form.largeDisabled || isDisabledReport"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 5px;" v-model="form.checkAllCrime" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" @change="handleCheckCrimeChange($event, trade)" :disabled="form.crimeDisabled || isDisabledReport"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 70px; top: 5px;" v-model="form.checkAllReport" v-if="trade.ttConditionColumn.qttccName === '报送方向'" @change="handleCheckReportChange($event, trade)" :disabled="form.reportDisabled || isDisabledReport"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 5px;" v-model="form.checkAllTrade" v-if="trade.ttConditionColumn.qttccName === '交易种类'" @change="handleCheckTradeChange($event, trade)" :disabled="form.tradeDisabled || isDisabledReport"></el-checkbox>
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.ttConditionColumn.values'" class="el-select-uwrap" :label-width="trade.ttConditionColumn.qttccName === '报送方向' ? '160px': '140px'">
                      <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable @change="selectLargeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" style="width: 100%;" :disabled="isDisabledReport">
                        <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId" v-if="regison.codeName !== '（公转私）'"></el-option>
                      </el-select>
                      <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable @change="selectCrimeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" style="width: 100%;" :disabled="isDisabledReport">
                        <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId"></el-option>
                      </el-select>
                      <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable @change="selectReportChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '报送方向'" style="width: 100%;" :disabled="isDisabledReport">
                        <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId"></el-option>
                      </el-select>
                      <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable @change="selectTradeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '交易种类'" style="width: 100%;" :disabled="isDisabledReport">
                        <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 7" class="inputwrap" style="position: relative;">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" style="height: 34px;">
                    <el-select v-model="form.interRegion" @change="handleInterRegionChange" style="width: 40%;" clearable @clear="handleRegionClear" :disabled="isDisabledReport">
                      <el-option label="中国" value="CHN"></el-option>
                      <el-option label="大陆地区保税区" value="Z01"></el-option>
                      <el-option label="大陆地区加工区" value="Z02"></el-option>
                      <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                      <el-option label="境外" value="NAT"></el-option>
                    </el-select>
                    <el-cascader v-if="form.interRegion !== 'NAT'" style="width: 58%;" expand-trigger="hover" :options="cityListOptions" v-model="form.city" clearable :props="props" :disabled="isDisabledReport">
                    </el-cascader>

                    <el-select v-if="form.interRegion === 'NAT'" style="width: 58%;" v-model="form.city" multiple collapse-tags clearable :disabled="isDisabledReport">
                      <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc" v-if="country.chSName !== '中国'"></el-option>
                    </el-select>
                  </el-form-item>
                  </el-col>
                </div>
              </el-row>
            </div>
            <!--交易信息-->
            <div class="block clearfix">
              <div class="subblocktitle">
                <span class="title toggletitle">交易查询选项</span>
                <el-button type="text" style="margin-left: 26px;" @click="handleExit">更多<i class="el-icon-d-arrow-right"></i></el-button>
              </div>
              <el-row :gutter="20">
                <div v-for="(trade, tIndex) in form.tradeCheckList" :key="tIndex" label-width="120px">
                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 0" class="radiowrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'tradeCheckList.'+ tIndex + '.qttcVal'" style="height: 34px;">
                    <!-- <el-radio-group v-model="trade.qttcVal" @change="handleChangeDay(trade)">
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group> -->
                      <el-select v-model="trade.qttcVal" placeholder="请选择" clearable　@change="handleChangeDay(trade)" style="width: 100%;" :disabled="isDisabledTrade">
                        <el-option label="是" value="是">是</el-option>
                        <el-option label="否" value="否">否</el-option>
                      </el-select>
                  </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 1" class="inputwrap">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'tradeCheckList.'+ tIndex + '.qttcVal'" :rules="Rules(trade)" style="height: 34px;">
                      <el-input v-model='trade.qttcVal' v-if="trade.ttConditionColumn.qttccName !== '联系电话'" :maxlength="getInputMax(trade)" :placeholder="getPlaceholder(trade)" style="width: 100%;" :disabled="isDisabledTrade"></el-input>
                      <el-input v-model='trade.qttcVal' :disabled="disabled || isDisabledTrade" v-if="trade.ttConditionColumn.qttccName === '联系电话'" :maxlength="getInputMax(trade)" :placeholder="getPlaceholder(trade)" style="width: 100%;"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 2" class="inputwrap">
                  <el-form-item :prop="'tradeCheckList.'+ tIndex + '.qttcVal'" style="height: 34px;">
                    <el-checkbox v-model="trade.qttcVal" :disabled="isDisabledTrade">{{trade.ttConditionColumn.qttccName}}</el-checkbox>
                  </el-form-item>
                  </el-col>

                  <!--交易金额-->
                  <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="8" v-if="trade.ttConditionColumn.qttccType === 3" class="inputwrap">
                    <el-col style="width: 140px; text-align:right; font-size: 14px; padding: 8px 12px 0 0; color: #606266;"><div>{{trade.ttConditionColumn.qttccName}}</div></el-col>
                    <el-col :span="6">
                      <el-form-item label="" label-width="0px" :prop="'tradeCheckList.'+ tIndex + '.qttcStartNum'" :rules="Rules(trade)" style="height: 34px;">  <!--:rules="trade.ttConditionColumn.qttccName === '交易金额' ? startMoneyRule(tIndex) : []"-->
                        <el-input v-model="trade.qttcStartNum" :maxlength="getInputMax(trade)" @change="handleMinChange(tIndex)" :placeholder="getPlaceholder(trade)" style="width: 100%;" :disabled="isDisabledTrade"></el-input> <!--@change="handleMinChange(tIndex)"-->
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <span style="display: inline-block;width: 100%;line-height: 33px;text-align: center;">至</span>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="" label-width="0px" :prop="'tradeCheckList.'+ tIndex + '.qttcEndNum'" :rules="Rules(trade)" style="height: 34px;"> <!-- :rules="trade.ttConditionColumn.qttccName === '交易金额' ? endMoneyRule(tIndex) : []"-->
                        <el-input v-model="trade.qttcEndNum" :maxlength="getInputMax(trade)" @change="handleMaxChange(tIndex)" :placeholder="getPlaceholder(trade)" style="width: 100%;" :disabled="isDisabledTrade"></el-input>  <!-- @change="handleMaxChange(tIndex)"-->
                      </el-form-item>
                    </el-col>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 4" class="inputwrap">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'tradeCheckList.'+ tIndex + '.qttcVal'" style="height: 34px;">
                      <el-select v-model="trade.qttcVal" v-if="trade.ttConditionColumn.pkQttcc !== '28'" clearable style="width: 100%;" :disabled="isDisabledTrade">
                        <el-option v-for="(selItem, sIndex) in trade.ttConditionColumn.codes" :key="sIndex" :label="selItem.codeName" :value="selItem.codeId"></el-option>
                      </el-select>
                      <el-select v-model="trade.qttcVal"  v-if="trade.ttConditionColumn.pkQttcc === '28'" clearable :disabled=" isDisabledTrade" style="width: 100%;">
                        <el-option v-for="(selItem, sIndex) in trade.ttConditionColumn.codes" :key="sIndex" :label="selItem.codeName" :value="selItem.codeId"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 5" class="datewrap">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'tradeCheckList.'+ tIndex + '.ttConditionColumn.values'" style="height: 34px;">
                      <el-date-picker v-model="trade.ttConditionColumn.values" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" :disabled="isDisabledTrade">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 6" class="inputwrap" style="position: relative;">
                    <el-checkbox style="position: absolute; left: 20px; top: 5px;" v-model="form.checkAllLarge" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" @change="handleCheckLargeChange($event, trade)" :disabled="form.largeDisabled || isDisabledTrade"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 5px;" v-model="form.checkAllCrime" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" @change="handleCheckCrimeChange($event, trade)" :disabled="form.crimeDisabled || isDisabledTrade"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 5px;" v-model="form.checkAllReport" v-if="trade.ttConditionColumn.qttccName === '报送方向'" @change="handleCheckReportChange($event, trade)" :disabled="form.reportDisabled || isDisabledTrade"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 5px;" v-model="form.checkAllTrade" v-if="trade.ttConditionColumn.qttccName === '交易种类'" @change="handleCheckTradeChange($event, trade)" :disabled="form.tradeDisabled || isDisabledTrade"></el-checkbox>
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'tradeCheckList.'+ tIndex + '.ttConditionColumn.values'" class="el-select-uwrap" v-if="trade.ttConditionColumn.qttccName !== '交易种类'" style="height: 34px;">
                      <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable @change="selectLargeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" style="width: 100%;" :disabled="isDisabledTrade">
                        <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId" v-if="regison.codeName !== '（公转私）'"></el-option>
                      </el-select>
                      <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable @change="selectCrimeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" style="width: 100%;" :disabled="isDisabledTrade">
                        <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId"></el-option>
                      </el-select>
                      <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable @change="selectReportChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '报送方向'" style="width: 100%;" :disabled="isDisabledTrade">
                        <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'tradeCheckList.'+ tIndex + '.ttConditionColumn.values'" class="el-select-uwrap-two" v-if="trade.ttConditionColumn.qttccName === '交易种类'" style="height: 34px;">
                      <el-select v-model="trade.ttConditionColumn.values" multiple collapse-tags clearable @change="selectTradeChange($event, trade)" style="width: 100%;" :disabled="isDisabledTrade">
                        <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <!-- <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 7" class="inputwrap" style="position: relative;">
                    <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" style="height: 34px;">
                      <el-select v-model="form.interRegion" @change="handleInterRegionChange" style="width: 40%;" clearable @clear="handleRegionClear" :disabled="isDisabledTrade || disabled">
                        <el-option label="中国" value="CHN"></el-option>
                        <el-option label="大陆地区保税区" value="Z01"></el-option>
                        <el-option label="大陆地区加工区" value="Z02"></el-option>
                        <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                        <el-option label="境外" value="NAT"></el-option>
                      </el-select>
                      <el-cascader v-if="form.interRegion !== 'NAT'" style="width: 58%;" :options="cityListOptions" v-model="form.city" clearable collapse-tags :disabled="isDisabledTrade || disabled">
                      </el-cascader>

                      <el-select v-if="form.interRegion === 'NAT'" style="width: 58%;" v-model="form.city" clearable :disabled="isDisabledTrade || disabled">
                        <el-option v-for="(country, cIndex) in countryData" :key="cIndex" :label="country.chSName" :value="country.pkMc" v-if="country.chSName !== '中国'"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                </div>
              </el-row>
            </div>
            <div class="block">
              <div class="subblocktitle">
                <span class="title toggletitle">主体查询选项</span>
              </div>
              <div class="content dtmain">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="匹配选项：" prop="match" class="matchMain">
                      <el-col :span="2">
                        <el-checkbox :indeterminate="isIndeterminateMatch" v-model="matchCheckAll" @change="handleMatchCheckAllChange">全选</el-checkbox>
                      </el-col>
                      <el-col :span="22">
                      <el-checkbox-group v-model="form.match" class="other" @change="handleMatchOptionsChange">
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
                <span class="title toggletitle">地区查询选项</span>
              </div>
              <div class="content dtmain">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="匹配选项：" prop="area" class="matchMain">
                      <el-col :span="2">
                        <el-checkbox :indeterminate="isIndeterminateArea" v-model="areaCheckAll" @change="handleAreaCheckAllChange">全选</el-checkbox>
                      </el-col>
                      <el-col :span="22">
                      <el-checkbox-group v-model="form.area" class="other" @change="handleAreaOptionsChange">
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
                <span class="title toggletitle">统计要素选项</span>
              </div>
              <div class="content">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="" class="clearfix">
                      <el-col :span="2">
                        <el-checkbox :indeterminate="isIndeterminateFactor" v-model="factorCheckAll" @change="handleFactorCheckAllChange">全选</el-checkbox>
                      </el-col>
                      <el-col :span="22">
                        <el-checkbox-group v-model="form.factor" @change="handleFactorOptionsChange">
                          <el-checkbox v-for="(item, index) in form.factorOptions" :label="item.ttStatisticFactor.qsfName" :key="index"></el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>

            <div class="block">
              <div class="subblocktitle2">
                <span></span>
              </div>
              <div class="content">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="附加查询选项：" class="clearfix">
                      <!-- <el-checkbox-group> -->
                        <!-- <el-checkbox v-for="item in form.factorOptions" :label="item.ttStatisticFactor.qsfName" :key="item.ttStatisticFactor.pkQsf"></el-checkbox> -->
                        <el-checkbox label="查询交易结果统计" value="" v-model="form.isNotStatistic"></el-checkbox>
                        <el-checkbox label="是否进行数据剔重" value="" v-model="form.redundancy" style="width:300px;"></el-checkbox>
                        <!-- <el-checkbox :label="是否查询当日交易数据" value="" v-model="form.ss"></el-checkbox> -->
                      <!-- </el-checkbox-group> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 宋显鹏添加   进线离线功能 -->
                <el-row :gutter="20" v-if="!isBranch">
                  <el-col :span="24">
                    <el-form-item label="数据生命周期选项：" class="clearfix">
                        <el-radio-group v-model="radioLine">
                            <el-radio label="1">近线</el-radio>
                            <el-radio label="2">离线</el-radio>
                            <el-radio label="">两者均不选</el-radio>
                          </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

            </div>
          </el-collapse-item>
        </el-collapse>
        

        <div class="btnalign">
          <el-button type="primary" @click="onSubmit('form', '0', 1)" :loading="loading">查 询</el-button>
          <!-- <el-button type="primary">近线数据查询</el-button> -->
          <el-button @click="getDefault" type="primary" plain :loading="clearLoading">清 空</el-button>
        </div>
      </el-form>

      <el-row  :gutter="20" style="padding: 10px 0">
        <el-col :span="12">
          <span>查询结果列表：</span>
          <!-- <el-button type="primary" @click="handleAllExport" v-if="isAllExport">批量导出</el-button> -->
          <!-- <el-button type="primary" @click="handleTabExport" v-if="isAllExport" :loading="exportAllLoading">导出全部</el-button>
          <el-button type="primary" @click="handleExport" v-if="isAllExport" :loading="exportLoading">导出当前tab页</el-button> -->
          <!-- <el-button type="primary">扩展分析</el-button> -->
        </el-col>
      </el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" ref="tabWrap" @tab-click="handleTabClick">
          <el-tab-pane :label="tab" v-for="(tab, index) in tabOptions" :key="index"></el-tab-pane>
          <div v-show="isTable">
            <el-table class="tableList" :data="data_list" ref="tableList" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @cell-dblclick="handleTableList" v-loading="loadingBox" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.1)" :empty-text="emptyText"  @sort-change="handleSortChange">
              <el-table-column type="index" label="序号" fixed></el-table-column>
              <el-table-column :label="date" :sortable=" key === 'markingSusCustomers' || !isPaginationShow ? false : 'custom'" v-for="(date, key) in header" :key="key" min-width="130" v-if="isLargeDtId || isSuspCategory"> <!--除银证保通用大额-->
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top-start">
                      <div slot="content">{{ data_list[scope.$index][key]}}</div>
                      <span v-if="isLargeDtId && key === 'xml_name'" style="color: #409EFF; cursor: pointer;" @click="handleXmlName(scope)">{{ data_list[scope.$index][key] }}</span>
                      <span v-if="isLargeDtId && key !== 'xml_name'">{{ data_list[scope.$index][key] }}</span>
                      <span v-if="isSuspCategory && key === 'xml_id'" style="color: #409EFF; cursor: pointer;" @click="handleXmlName(scope)">{{ data_list[scope.$index][key] }}</span>
                      <span v-if="isSuspCategory && key !== 'xml_id'">{{ data_list[scope.$index][key] }}</span>
                    </el-tooltip>
                </template>
              </el-table-column>

              <el-table-column :label="date" :sortable=" key === 'markingSusCustomers' || !isPaginationShow ? false : 'custom'" v-for="(date, key) in header" :key="key" min-width="130" v-if="!isLargeDtId && !isSuspCategory"> 
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">{{ data_list[scope.$index][key]}}</div>
                    <span>{{ data_list[scope.$index][key] }}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" min-width="100px" v-if="isPaginationShow">
                <template slot-scope="scope">
                  <span v-for="(hItem, index) in handleOptions" :key="index" style="margin-right: 10px">
                    <el-button type="text" plain @click="handleTableBtn(hItem, scope.row)">{{hItem.operationName}}</el-button>
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <el-row v-show="isPaginationShow" style="text-align: right;">
              <span class="totalNum">查询{{totalAll}}条</span>
              <!-- <span class="totalNum">显示{{total}}条</span> -->
              <el-pagination style="display: inline-block;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
            </el-row>
          </div>
        </el-tabs>
      </el-col>

      <!-- 报告，交易信息 -->
      <el-dialog title="交易查询选项" :visible.sync="tradeDialogVisible" width="60%" :before-close="closeExitDialog">
        <el-form :model="dialogForm" v-loading="exitDialogLoading">
          <el-checkbox-group v-model="dialogForm.tradeInfo" class="dialogReport">
            <el-checkbox v-for="(item,index) in dialogForm.tradeOptions" :label="item.ttConditionColumn.qttccName" :key="index">
            </el-checkbox>
          </el-checkbox-group>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeExitDialog">取 消</el-button>
          <el-button type="primary" @click="tradeSubmit">确 定</el-button>
        </span>
      </el-dialog>

      <!--报告详情-->
      <el-dialog :title="tradeDialogTitle" width="96%" :visible.sync="tradeDetailVisible" top="3vh" class="exportwrapper">
        <component :is="treadeComName" :tradeDetailVisible="tradeDetailVisible" :disabled="disabled" :tradeDetailInfo="tradeDetailInfo" @setTradeDetailVisible="getTradeDetailVisible"></component>
      </el-dialog>

      <!--交易详情-->
      <el-dialog :title="tradeDialogTitle" width="96%" :visible.sync="dealDetailVisible" top="3vh" class="exportwrapper">
        <div v-loading="dealLoading" element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)" class="type-large-wrap">
        <el-form :model="dealForm" ref="dealForm" label-width="auto">
          <!-- 第一行 -->
          <el-row :gutter="20">
            <el-col :span="24">
              <div v-for="(val, key) in detailLeft" :key="key">
                <el-col :span="24">
                  <el-form-item :label="key + '：'" v-if="Object.prototype.toString.call(val) == '[object String]' || Object.prototype.toString.call(val) == '[object Null]' || Object.prototype.toString.call(val) == '[object Number]'">
                    <span class="label-item">{{val}}</span>
                  </el-form-item>
                  <div v-if="Object.prototype.toString.call(val) == '[object Object]' || Object.prototype.toString.call(val) == '[object Array]'">
                    <div class="title" style="padding-bottom: 0px; padding-top: 0px;">{{key}}</div>
                    <div>
                      <div v-for="(oVal, oKey) in val" :key="oKey">
                        <el-form-item :label="oKey + '：'" v-if="Object.prototype.toString.call(oVal) == '[object String]' || Object.prototype.toString.call(oVal) == '[object Null]' || Object.prototype.toString.call(oVal) == '[object Number]'">
                          <span class="label-item">{{oVal}}</span>
                        </el-form-item>
                        <el-row v-if="Object.prototype.toString.call(oVal) == '[object Object]' || Object.prototype.toString.call(oVal) == '[object Array]'" class="active-border">
                          <div class="title">{{oKey}}</div>
                          <el-col :span="tKey === '资金用途' || tKey === '交易目的' || tKey === '资金来源与用途' || tKey === '资金来源和用途' || tKey === '交易信息备注_1' || tKey === '交易信息备注_2' ? 24 : 12" v-for="(tVal, tKey) in oVal" :key="tKey">
                              <el-form-item :label="tKey + '：'" v-if="Object.prototype.toString.call(tVal) == '[object String]' || Object.prototype.toString.call(tVal) == '[object Null]' || Object.prototype.toString.call(tVal) == '[object Number]'">
                                <span class="label-item">{{tVal}}</span>
                              </el-form-item>
                              <div v-if="Object.prototype.toString.call(tVal) == '[object Object]' || Object.prototype.toString.call(tVal) == '[object Array]'">
                                <div>
                                  <div v-for="(thVal, thKey) in tVal" :key="thKey">
                                    <el-form-item :label="thKey + '：'" v-if="Object.prototype.toString.call(thVal) == '[object String]' || Object.prototype.toString.call(thVal) == '[object Null]' || Object.prototype.toString.call(thVal) == '[object Number]'">
                                      <span class="label-item">{{thVal}}</span>
                                    </el-form-item>
                                    <div v-if="Object.prototype.toString.call(thVal) == '[object Object]' || Object.prototype.toString.call(thVal) == '[object Array]'">
                                      <div class="title">{{thKey}}</div>
                                      <div>
                                        <div v-for="(fVal, fKey) in thVal" :key="fKey">
                                          <el-form-item :label="fKey + '：'" v-if="Object.prototype.toString.call(fVal) == '[object String]' || Object.prototype.toString.call(fVal) == '[object Null]' || Object.prototype.toString.call(fVal) == '[object Number]'">
                                            <span class="label-item">{{fVal}}</span>
                                          </el-form-item>
                                          <div v-if="Object.prototype.toString.call(fVal) == '[object Object]' || Object.prototype.toString.call(fVal) == '[object Array]'">
                                            <div class="title">{{fKey}}</div>
                                            <div>
                                              <div v-for="(fiVal, fiKey) in fVal" :key="fiKey">
                                                <el-form-item :label="fiKey + '：'" v-if="Object.prototype.toString.call(fiVal) == '[object String]' || Object.prototype.toString.call(fiVal) == '[object Null]'">
                                                  <span class="label-item">{{fiVal}}</span>
                                                </el-form-item>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>

          <el-row v-if="TradeType === 'IS'">
            <div class="title">被保险人身份信息</div>
            <div class="active-border">
              <el-table style="width: 100%" :data="rosterData" tooltip-effect="dark">
                <el-table-column type="index" label="序号" width="60" fixed="left"></el-table-column>
                <el-table-column prop="iabiid" label="被保险人ID" width="150"></el-table-column>
                <el-table-column prop="tradeid" label="保险可疑交易ID" width="150"></el-table-column>
                <el-table-column prop="iabiseqno" label="被保险人编号" width="150"></el-table-column>
                <el-table-column prop="istn" label="被保险人姓名" width="150"></el-table-column>
                <el-table-column prop="iitp" label="被保险人身份证件类型" width="170"></el-table-column>
                <el-table-column prop="oitp" label="被保险人其他身份证件类型" width="200"></el-table-column>
                <el-table-column prop="isid" label="被保险人身份证件号码" width="170"></el-table-column>
                <el-table-column prop="rltp" label="投保人和被保险人关系" width="170"></el-table-column>
                <el-table-column prop="bntn" label="受益人总数" width="150"></el-table-column>
                <el-table-column prop="iitp" label="受益人" width="120" fixed="right">
                  <template slot-scope="scope">
                    <el-popover placement="left" width="400" trigger="click">
                      <el-table :data="scope.row.bnifs">
                        <el-table-column width="110" property="bnifid" label="受益人ID"></el-table-column>
                        <el-table-column width="110" property="bnifseqno" label="受益人编号"></el-table-column>
                        <el-table-column width="110" property="bnnm" label="受益人姓名"></el-table-column>
                        <el-table-column width="190" property="bitp" label="受益人身份证件类型"></el-table-column>
                        <el-table-column width="190" property="oitp" label="受益人其他身份证件类型"></el-table-column>
                        <el-table-column width="190" property="bnid" label="受益人身份证件号码"></el-table-column>
                      </el-table>
                      <el-button slot="reference" type="text" size="small">查看受益人信息</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onCancel" type="primary" plain>取消</el-button>
        </div>
        </div>
      </el-dialog>

      <!-- 标注 -->
      <el-dialog title="录入标注名单信息" width="70%" :visible.sync="marklistVisible" top="3vh">
        <marklistInfo :marklistVisible="marklistVisible" :markObj="markObj" @setMarkVisible="getMarkVisible"></marklistInfo>
      </el-dialog>

      <!-- 纠删 -->
      <el-dialog title="查看追溯对比" width="70%" :visible.sync="recordVisible" top="3vh">
        <deleteRecord :recordVisible="recordVisible" :recordObj="recordObj" @setRecordVisible="getRecordVisible"></deleteRecord>
      </el-dialog>

      <!-- 人工补正弹框 -->
      <el-dialog :title="correctionDialogTitle" width="70%" :visible.sync="dialogVisible" top="3vh">
        <component :is="correctionComName" :correctParams="correctParams" @dialogState="closeDialog" :dialogVisible="dialogVisible"></component>
      </el-dialog>

      <!-- 进线离线弹窗 --宋显鹏 -->
      <el-dialog title="任务名称" width="20%" :close-on-click-modal="false" :visible.sync="dialogVisibleNearOff">
        <div>
          <span style="display:inline-block;margin-left:10px">任务名称：</span>
          <el-input v-model="nearOffData" placeholder="请输入任务名称" style="width:70%"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="routerEventnearOffLine">确 定</el-button>
          <el-button @click="cancelEventnearOff">取 消</el-button>
        </span>
      </el-dialog>

      <monitor-workflow></monitor-workflow>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { isIpAddress, ValidQueryInput, onlyNumberValidate, delDataValidInput } from '@/utils/formValidate.js'
import { getTplList, getQueryList, getNotQueryList, getSortList, getQueryFileStatus, fileExport, getTabList, getCatchQueryKey, continueExport, taskNearOffLine, nearOffLine } from '@/api/sys-monitoringAnalysis/dataQuery/dataType'
import { getRinmList } from '@/api/common/industry'
import { getUUIDTo } from '@/utils/index.js'
import { correctCheck, correctCheckError } from '@/api/sys-monitoringAnalysis/dataGovernance/artificialCorrection/launch.js'
// import { getNetworkName } from '@/api/sys-monitoringAnalysis/dataQuery/templateManage.js'
import { getArea, country } from '@/api/common/citys'
// import tradeDetail from '@/views/sys-monitoringAnalysis/dataQuery/dataType/tradeDetail'
import reportDetail from '@/views/sys-monitoringAnalysis/dataQuery/dataType/reportDetail'
import marklistInfo from '@/views/sys-monitoringAnalysis/dataQuery/dataType/marklistInfo'
import Treeselect from '@riophae/vue-treeselect'
import deleteRecord from '@/views/sys-monitoringAnalysis/dataQuery/dataType/deleteRecord'
import Large from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/large'
import Suspicious from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/suspicious'
import Notice from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/notice'
import { initData, exitItem, tplViewData } from '@/api/sys-monitoringAnalysis/dataQuery/templateManage'
import { getTradeData, getNotTradeData } from '@/api/sys-monitoringAnalysis/dataQuery/dataType'

export default {
  components: {
    Treeselect,
    // tradeDetail,
    reportDetail,
    marklistInfo,
    deleteRecord,
    Large,
    Suspicious,
    Notice
  },
  data() {
    // const dataTableChecked = ['银行业大额交易'] // 默认选中状态
    const dataTableChecked2 = ['银行业可疑交易'] // 默认选中状态
    const dataTableReportChecked = [] // 默认选中状态
    // const factorChecked = ['交易主体数', '账户数', '交易笔数', '本币交易笔数', '外币交易笔数', '本币交易金额', '外币交易金额(人民币)', '单笔最大金额(人民币)', '最早交易时间', '最晚交易时间']// 统一配置选中
    return {
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
      tempInitObj: {
        matchOptions: [],
        areaOptions: [],
        factorOptions: []
      },
      totalAll: 0, // 总条数
      tempKey: '',
      isTable: false,
      firstHeader: {},
      lastHeader: {},
      tempParamsObj: null,
      isCrimeHas: false, // 判断涉罪类型有值
      sortParamsObj: {}, // 暂存排序接口参数
      isSortVal: false, // 判断排序参数有没有值，记录，分页的时候用
      isLargeDtId: null,
      isSuspCategory: null,
      indexTepm: null, // 记录index
      totalDtId: null,
      loading: false, // 查询按钮
      clearLoading: false, // 清空
      loadingBox: false, //
      loadingText: '',
      exportAllLoading: false, // 导出全部
      exportLoading: false, // 导出tab
      isAllExport: false, // 控制批量导出按钮显示
      treadeComName: null, // 交易详情组件名称
      tradeDialogTitle: null, // 交易详情组件title
      tradeDetailInfo: {}, // 交易详情参数
      isPaginationShow: false,
      isClientPerson: [], // 记录主体类型所选的值
      isClientName: [],
      header: null,
      header_zc: null,
      data_list: [],
      data_list_zc: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      count_data_list: [],
      countHeader: {},
      countTotal: 1,
      provinceData: [], // 省份数据
      countryData: [], // 国家数据
      countType: '', // 统计type参数
      isCountTableShow: false,
      isOtherCountTableShow: false,
      multipleSelection: [],
      handleOptions: [], // 操作参数
      handleOptions_zc: [],
      disabled: false, // 判断日期插件是否禁用
      customerName: [{}],
      organOptions: [],
      selOptions: [],
      networkOptions: [], // 网点机构代码
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
      isIndeterminate: true, // 数据库表--大额全选状态
      isIndeterminate2: true, // 数据库表--可疑全选状态
      isIndeterminateOther: true, // 数据库表--其他全选状态
      isIndeterminateReport: true,
      dtReportCheckAll: false,
      dtCheckAll: false, // 数据库表--大额全选
      dtCheckAll2: false, // 数据库表--可疑全选状态
      dtCheckAllOther: false, // 数据库表全选
      isIndeterminateMatch: false, // 主体匹配信息
      matchCheckAll: true, // 主体匹配信息
      isIndeterminateArea: false, // 地区匹配信息
      areaCheckAll: true, // 地区匹配信息
      isIndeterminateFactor: false, // 配置统计要素
      factorCheckAll: true, // 配置统计要素
      form: {
        largeDisabled: true,
        crimeDisabled: true,
        reportDisabled: true,
        tradeDisabled: true,
        checkAllLarge: false, // 大额特征一键删除参数
        checkAllCrime: false,
        checkAllReport: false,
        checkAllTrade: false,
        // regionDisabled: true, // 地区
        // checkAllRegion: false, // 地区
        reportCheckList: [],
        tradeCheckList: [],
        qttName: '', // 模板名称
        organNum: '',
        organName: [],
        websiteName: '',
        dataTable: [], // 数据库表
        dataTable2: dataTableChecked2,
        dataTableReport: dataTableReportChecked,
        dataTableOther: [],
        dtOptions: [], // 数据库表--大额
        dtOptions2: [], // 数据库表--可疑
        dtOptionsOther: [], // 数据库表其他
        match: [], // 匹配
        matchOptions: [], //
        area: [], // 地区匹配
        areaOptions: [], // 地区匹配
        factor: [], // 配置
        factorOptions: [], // 配置
        clientInfo: [],
        clientOptions: [],
        reportOptions: [],
        dateValue: '',
        isNotStatistic: false, // 是否仅统计
        redundancy: false, // 是否剔重
        interRegion: '', // 地区--国际/国内
        city: []
      },
      workingStorage: [], // tab暂存
      dTableTab: [],
      tableId: [],
      flag: 0,
      dialogForm: {
        tradeInfo: [],
        tradeOptions: []
      },
      regisonOPtions: [], // ceshi
      arr: [],
      // customResultvisible: false, // 定制
      tradeDetailVisible: false, // 交易详情
      tradeDialogVisible: false, // 报告
      marklistVisible: false, // 标注
      recordVisible: false, // 纠删
      exportVisible: false, // 导出提示
      cityListOptions: [],
      exportObj: {}, // 记录导出参数
      recordObj: {}, // 查看追溯对比
      markObj: {}, // 标注主体
      list: [],
      value: [],
      linkRid: '',
      // newTradeCheckList: [], // 保存选中的交易信息
      resultList: [],
      tabOptions: [], // 统计表格循环参数
      tabCountOptions: [], // 统计表格循环参数
      tmpDtOptions: [], // 临时接收库表
      activeName: '0',
      tplOptions: [], // 模板列表
      correctParams: {}, // 人工补正弹框传值
      correctionComName: null,
      correctionDialogTitle: null,
      dialogVisible: false,
      isDocument: false, // 判断是否是身份证号
      tplId: '',
      token: getToken(),
      timeOut: null,
      rollStatus: false,
      rk: '',
      fileName: '',
      clientName: '', // 记录主体类型是否是必填
      limitCount: '',
      emptyText: ' ', // 表格空数据显示
      // 近线 离线---- 宋显鹏
      radioLine: '',
      dialogVisibleNearOff: false,
      nearOffData: '',
      allGrayZion: [],
      // 交易详情
      dealLoading: false,
      dealDetailVisible: false,
      rosterData: [],
      dealForm: {},
      detailOptions: null,
      detailLeft: {},
      // detailCenter: {}, // 3列可用
      detailRight: {},
      mstrBs: '',
      TradeType: '', // 获取行业类型
      exitDialogLoading: false,
      isToggle: false,
      UUID: ''
    }
  },
  computed: {
    ...mapGetters(['user_name', 'institution']),
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    }
  },
  mounted() {
    this.mstrBs = window.mstr
    // this.init()
    this.UUID = getUUIDTo()
    this.getData(1)
    // this.getConfigJson()
  },
  beforeDestroy() {
    clearTimeout(this.timeOut)
    this.timeOut = null
  },
  methods: {
    handleMinChange(index) {
      this.$refs.form.validateField('tradeCheckList.' + index + '.qttcEndNum')
    },
    handleMaxChange(index) {
      this.$refs.form.validateField('tradeCheckList.' + index + '.qttcStartNum')
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
    clientRule(item, index, tIndex) {
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
          R.push({ validator: ValidQueryInput, trigger: 'input' },
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
        if (((item[1].qttcVal === '' || item[1].qttcVal === null) && (item[3].qttcVal === '' || item[3].qttcVal === null))) {
          const R = []
          R.push(
            { required: false, message: '请填写主体类型', trigger: 'change' }
          )
          return R
        } else {
          const R = []
          R.push(
            { required: true, message: '请填写主体类型', trigger: 'change' }
          )
          return R
        }
      }
    },
    Rules(item) {
      // 校验
      const R = []
      if (item.ttConditionColumn.qttccName === '报告机构名称') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 200, message: '最大长度为200位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报告机构网点名称') {
        R.push({ require: false, validator: ValidQueryInput, trigger: 'blur' }, { max: 200, message: '最大长度为200位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报告机构编码') {
        R.push({ validator: ValidQueryInput, trigger: 'blur' }, { max: 15, message: '最大长度为15位', trigger: 'blur' })
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
    init() {
      getTplList()
        .then(res => {
          // 获取模板下拉列表
          if (res.code === 200) {
            this.tplOptions = res.data.list
            if (this.tplOptions.length > 0) {
              // const tplId = this.tplOptions[0].pkQtt
              // this.getData(2, tplId)
              this.getData(1)
            } else {
              this.getData(1)
            }
          }
        })
        .catch()
    },
    getData(count, val) {
      // 初始化
      this.handleDefault(count)
      initData() // 新增初始化数据
        .then(res => {
          if (res.code === 200) {
            this.isClientPerson = []
            this.isCountTableShow = false
            this.isOtherCountTableShow = false
            this.dataTableId = []
            this.disabled = false
            this.arr = []
            if (res.data.ttQsts.length !== 0) {
              res.data.ttQsts.map((item, index) => { // 数据库表
                if (item.scopeTable.pkQst === 'w_11' || item.scopeTable.pkQst === 'w_22' || item.scopeTable.pkQst === 'w_33' || item.scopeTable.pkQst === 'w_240' || item.scopeTable.pkQst === 'w_250') {
                  this.form.dtOptions.push(item) // 数据库表大额
                } else if (item.scopeTable.pkQst === 'w_44' || item.scopeTable.pkQst === 'w_55' || item.scopeTable.pkQst === 'w_66' || item.scopeTable.pkQst === 'w_100' || item.scopeTable.pkQst === 'w_120' || item.scopeTable.pkQst === 'w_140' || item.scopeTable.pkQst === 'w_110' || item.scopeTable.pkQst === 'w_130' || item.scopeTable.pkQst === 'w_150') {
                  this.form.dtOptions2.push(item) // 数据库表可疑交易
                } else if (item.scopeTable.pkQst === 'w_77' || item.scopeTable.pkQst === 'w_88' || item.scopeTable.pkQst === 'w_99' || item.scopeTable.pkQst === 'w_160' || item.scopeTable.pkQst === 'w_180' || item.scopeTable.pkQst === 'w_200' || item.scopeTable.pkQst === 'w_220' || item.scopeTable.pkQst === 'w_210' || item.scopeTable.pkQst === 'w_170' || item.scopeTable.pkQst === 'w_190') {
                  this.form.dtOptionsReport.push(item) // 数据库表可以报告
                } else if (item.scopeTable.pkQst === 'w_230') {
                  this.form.dtOptionsOther.push(item) // 数据库表其他
                }
              })
            }

            if (this.form.dtOptions.length === 0) {
              this.form.dataTable = []
            }
            if (this.form.dtOptions2.length === 0) {
              this.form.dataTable2 = []
            }
            if (this.form.dtOptionsReport.length === 0) {
              this.form.dataTableReport = []
            }
            if (this.form.dtOptionsOther.length === 0) {
              this.form.dataTableOther = []
            }

            this.arr = res.data.ttccs

            this.form.matchOptions = res.data.qttQttms // 匹配
            this.tempInitObj.matchOptions = res.data.qttQttms
            this.form.matchOptions.map(item => {
              // 匹配
              if (item.ttMatch.qttmNameCh) {
                // if (item.ttMatch.qttmNameCh !== '法人' && item.ttMatch.qttmNameCh !== '股东') {
                this.form.match.push(item.ttMatch.qttmNameCh)
                // }
              }
            })

            this.form.areaOptions = res.data.qttQttmAreas // 地区匹配
            this.tempInitObj.areaOptions = res.data.qttQttmAreas
            this.form.areaOptions.map(item => {
              // 匹配
              if (item.ttMatchArea.qttmNameCh) {
                // if (item.ttMatch.qttmNameCh !== '法人' && item.ttMatch.qttmNameCh !== '股东') {
                this.form.area.push(item.ttMatchArea.qttmNameCh)
                // }
              }
            })

            this.form.factorOptions = res.data.qttQsfs // 配置
            this.tempInitObj.factorOptions = res.data.qttQsfs
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
                  if ((item.ttConditionColumn.status === 2 && item.ttConditionColumn.qttccName !== '大额交易特征' && item.ttConditionColumn.qttccName !== '大额迟报') || item.ttConditionColumn.status === 3) {
                    this.form.tradeCheckList.push(item)
                  }
                  if (item.ttConditionColumn.status === 0) {
                    this.form.clientOptions.push(item)
                  }
                  if (item.ttConditionColumn.status === 1) {
                    this.form.reportOptions.push(item)
                  }
                  if (item.ttConditionColumn.status === 4) {
                    this.form.reportCheckList.push(item)
                  }
                }
              })
              this.flag = 0
              this.$set(
                this.form.clientInfo,
                this.flag,
                JSON.parse(JSON.stringify(this.form.clientOptions))
              )
            }
            if (count !== 1) {
              if (val) {
                this.getViewData(val)
              }
            }
            this.$nextTick(function() {
              this.clearLoading = false
            })
          } else {
            this.$nextTick(function() {
              this.clearLoading = false
            })
          }
        })
        .catch(() => {
          this.$nextTick(function() {
            this.clearLoading = false
          })
        })
    },
    handleSortChange(column) { // 排序
      this.loadingBox = true
      this.isSortVal = false
      this.sortParamsObj = {}
      let filed = ''
      for (var key in this.header) {
        if (this.header[key] === column.column.label) {
          filed = key
        }
      }
      let tOrder = ''
      if (column.column.order === 'descending') {
        tOrder = false
      } else if (column.column.order === 'ascending') {
        tOrder = true
      }
      const paramsObj = {
        tableName: this.tableId[this.activeName],
        column: filed,
        newDate: this.disabled,
        sort: tOrder,
        key: this.tempKey,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      this.sortParamsObj = paramsObj

      setTimeout(() => {
        this.getSortData(paramsObj)
      }, 1000)
    },
    getSortData(paramsObj) {
      this.loadingText = '正在查询中，请稍候……'
      getSortList(paramsObj).then(res => {
        if (res.code === 200) {
          if (res.data) {
            if (res.data.result.list.length === 0) {
              this.isSortVal = false
              this.$confirm('暂无数据', '提示', {
                showCancelButton: false,
                type: 'warning'
              }).then()
                .catch()
            } else {
              this.isSortVal = true
              this.data_list = res.data.result.list
            }
          }
          this.$nextTick(() => {
            this.loadingBox = false

            this.loadingText = ''
            this.loading = false
            this.isAllExport = true // 控制批量导出按钮显示
            this.isPaginationShow = true
          })
        } else {
          this.$nextTick(() => {
            this.loadingBox = false
            this.loadingText = ''
            this.loading = false
          })
        }
      }).catch((res) => {
        this.$nextTick(function() {
          this.loadingBox = false
          this.loadingText = ''
          this.loading = false
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClientChange(item, index, cIndex) {
      if (item.ttConditionColumn.qttccName === '主体类型') {
        this.isClientPerson[index] = item.qttcVal
        this.Rules(item)
      }
    },
    handleClientnameChange(item, index) { // 填写主体名称或证件号码，主体类型是必填
    },
    handleTableList(row) {
      this.isTableBtn(this.handleOptions[0], row)
    },
    getViewData(id) {
      // 查看返显
      tplViewData(id).then(res => {
        if (res.code === 200) {
          this.$set(this.form, 'clientInfo', [])
          this.$set(this.form, 'tradeCheckList', [])
          this.$set(this.form, 'reportCheckList', [])
          this.$set(this.form, 'reportOptions', [])
          this.form.dataTable = []
          this.form.dataTable2 = []
          this.form.dataTableReport = []
          this.form.dataTableOther = []
          // this.form.qttName = res.data.qttName // 模板名称
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
          if (this.form.dtOptions.length === 0) {
            this.form.dataTable = []
          }
          if (this.form.dtOptions2.length === 0) {
            this.form.dataTable2 = []
          }
          if (this.form.dtOptionsReport.length === 0) {
            this.form.dataTableReport = []
          }
          if (this.form.dtOptionsOther.length === 0) {
            this.form.dataTableOther = []
          }

          this.form.match = [] // 匹配
          if (res.data.qttQttms.length !== 0) {
            this.form.match = res.data.qttQttms.map(item => {
            // 匹配
              if (item.ttMatch.qttmNameCh) {
                return item.ttMatch.qttmNameCh
              }
            })
          }

          if (this.form.match.length === this.form.matchOptions.length) {
            this.isIndeterminateMatch = false
            this.matchCheckAll = true
          } else {
            this.isIndeterminateMatch = true
            this.matchCheckAll = false
          }

          this.form.area = [] // 地区匹配
          if (res.data.qttQttmsArea.length !== 0) {
            this.form.area = res.data.qttQttmsArea.map(item => {
            // 地区匹配
              if (item.ttMatchArea.qttmNameCh) {
                return item.ttMatchArea.qttmNameCh
              }
            })
          }

          if (this.form.area.length === this.form.areaOptions.length) {
            this.isIndeterminateArea = false
            this.areaCheckAll = true
          } else {
            this.isIndeterminateArea = true
            this.areaCheckAll = false
          }
          // this.form.factorOptions = res.data.qttQsfs // 配置
          this.form.factor = []
          if (res.data.qttQsfs.length !== 0) {
            this.form.factor = res.data.qttQsfs.map(item => {
            // 配置
              if (item.ttStatisticFactor.qsfName) {
                return item.ttStatisticFactor.qsfName
              }
            })
          }

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
              })
            })
          }
          if (this.arr.length !== 0) { // 主体信息，报告交易，报告交易
            var clientOptionsArray = this.arr
            clientOptionsArray.forEach((item, index) => {
              if (item !== null) {
                if ((item.ttConditionColumn.status === 2 && item.ttConditionColumn.qttccName !== '大额交易特征' && item.ttConditionColumn.qttccName !== '大额迟报') || item.ttConditionColumn.status === 3) {
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
          if (this.form.tradeCheckList.length !== 0) { // 判断返现是否选择当日，联系方式和国籍，交易日期不可选
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
    closeDialog(val) {
      // 人工补正组件接收子组件弹框dialogVisible传值
      this.dialogVisible = val
    },
    getTradeDetailVisible(val) {
      this.tradeDetailVisible = val
    },
    getMarkVisible(val) {
      this.marklistVisible = val
    },
    getRecordVisible(val) {
      this.recordVisible = val
    },
    handleTemplate(val) { // 选择模板显示
      if (val) {
        this.tplId = val
        this.getData(2, val)
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
    handleDtCheckAllChange2(val) { // 数据库表--可疑交易（全选）
      const arr = []
      this.form.dtOptions2.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTable2 = val ? arr : []
      this.isIndeterminate2 = false
      this.isDisabledBlock()
    },
    handleDtoptionsChange2(val) { // 数据库表--可疑交易（单选）
      const checkedCount = val.length
      this.dtCheckAll2 = checkedCount === this.form.dtOptions2.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.form.dtOptions2.length
      this.isDisabledBlock()
    },
    handleDtReportCheckAllChange(val) { // 数据库表--可疑报告（全选）
      const arr = []
      this.form.dtOptionsReport.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTableReport = val ? arr : []
      this.isIndeterminateReport = false
      this.isDisabledBlock()
    },
    handleDtReportChange(val) { // 数据库表--可疑报告（单选）
      const checkedCount = val.length
      this.dtReportCheckAll = checkedCount === this.form.dtOptionsReport.length
      this.isIndeterminateReport = checkedCount > 0 && checkedCount < this.form.dtOptionsReport.length
      this.isDisabledBlock()
    },
    handleDtCheckAllChangeOther(val) { // 数据库表--可疑（全选）
      const arr = []
      this.form.dtOptionsOther.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTableOther = val ? arr : []
      this.isIndeterminateOther = false
    },
    handleDtoptionsChangeOther(val) { // 数据库表--可疑（单选）
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
    routerBack() {
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
    isDtSame(dTableObj) { // 判断是否是银政保或者新三类，显示对应的统计查询
      let yzb = 0
      let xsl = 0
      const arr = []
      for (let i = 0; i < dTableObj.length; i++) {
        arr.push(dTableObj[i])
      }

      if (arr.includes('w_11') || arr.includes('w_22') || arr.includes('w_33') || arr.includes('w_44') || arr.includes('w_55') || arr.includes('w_66') || arr.includes('w_240') || arr.includes('w_250')) {
        // 银政保
        yzb = 1
      }
      if (arr.includes('w_100') || arr.includes('w_110') || arr.includes('w_120') || arr.includes('w_130') || arr.includes('w_140') || arr.includes('w_150')) {
        // 新三类
        xsl = 2
      }

      if (yzb === 1 && xsl === 2) { // 既有银政保，又有新三类
        return 3
      } else if (yzb === 1 && xsl !== 2) { // 银政保
        return 1
      } else if (yzb !== 1 && xsl === 2) { // 只有新三类
        return 2
      }
    },
    getParamsObj(activeIndex) { // 获取参数
      setTimeout(() => {
        let tags = document.getElementsByClassName('el-pagination__total')[0].innerHTML
        tags = '显示' + this.total + '条'
        console.log('tags2', tags)
        console.log('tags2', typeof tags)
      })
      // 新增参数处理
      const customerInformations = this.getCustomerInformations() // 主体信息
      const matchObj = []
      if (this.form.match.length !== 0) {
        this.form.match.forEach(item => { // 匹配
          this.form.matchOptions.map(item2 => {
            if (item === item2.ttMatch.qttmNameCh) {
              matchObj.push({ uktQqqttm: item2.ttMatch.pkQttm })
            }
          })
        })
      }
      const areaObj = []
      if (this.form.area.length !== 0) {
        this.form.area.forEach(item => { // 匹配
          this.form.areaOptions.map(item2 => {
            if (item === item2.ttMatchArea.qttmNameCh) {
              areaObj.push({ uktQqqttm: item2.ttMatchArea.pkQttm })
            }
          })
        })
      }
      const factorObj = [] // factorOptions
      if (this.form.factor.length !== 0) {
        this.form.factor.forEach(item => { // 配置
          this.form.factorOptions.map(item2 => {
            if (item === item2.ttStatisticFactor.qsfName) {
              factorObj.push({ uksQqq: item2.ttStatisticFactor.pkQsf })
            }
          })
        })
      }
      const dTableObj = [] // 获取数据库表主键id
      const totalOptions = [...this.form.dtOptions, ...this.form.dtOptions2, ...this.form.dtOptionsOther, ...this.form.dtOptionsReport]
      const queryDt = [...this.form.dataTable, ...this.form.dataTable2, ...this.form.dataTableReport, ...this.form.dataTableOther]
      if (queryDt.length !== 0) {
        queryDt.forEach(item => { //  不管定制结果是否有无值，报告都是课查询出结果的
          totalOptions.map(item2 => {
            if (item2 !== null) {
              if (item === item2.scopeTable.qstNameCh) {
                dTableObj.push({ uksQttq: item2.scopeTable.pkQst })
              }
            }
          })
        })
      }
      const andArr = []
      if (this.form.tradeCheckList.length !== 0) {
        this.form.tradeCheckList.forEach((item, index) => {
          andArr.push(this.getReportInfoObj(item))
        })
      }
      if (this.form.reportCheckList.length !== 0) {
        this.form.reportCheckList.forEach((item, index) => {
          andArr.push(this.getReportInfoObj(item))
        })
      }
      if (this.form.reportOptions.length !== 0) {
        this.form.reportOptions.forEach((item, index) => {
        // 报告机构信息
          andArr.push(this.getReportInfoObj(item))
        })
      }
      var paramsObj = {}
      if (activeIndex) {
        this.activeName = activeIndex
        this.totalDtId = this.tableId[activeIndex]
        paramsObj = {
          whetherStatistics: this.form.isNotStatistic,
          redundancy: this.form.redundancy,
          parameterTable: this.tableId.length !== 0 ? this.tableId[activeIndex] : '',
          qttQttms: matchObj,
          qttQttmsArea: areaObj,
          qttQsfs: factorObj,
          ttQsts: dTableObj,
          customerInformations: customerInformations,
          ttccs: andArr,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize
        }
      }
      return paramsObj
    },
    handleTabClick(tab, event) {
      // tab--click
      clearTimeout(this.timeOut)
      const eObj = event.srcElement ? event.srcElement : event.target
      if (
        eObj.innerHTML === '银证保统计' ||
        eObj.innerHTML === '新三类统计'
      ) {
        this.isPaginationShow = false
      }
      this.isSortVal = false
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = 10
      this.$set(this.tempParamsObj, 'pageNum', 1)
      this.$set(this.tempParamsObj, 'pageSize', 10)
      this.getParamsUrl(this.tempParamsObj)
    },
    arrQuChong(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) { // 第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1)
            j--
          }
        }
      }
      return arr
    },
    handleTableBtn(e, row) {
      // 点击表格操作按钮
      if (e.operationName === '查看详情') {
        this.isTableBtn(e, row)
      } else if (e.operationName === '查看纠删履历' && !this.disabled) {
        this.recordObj = {
          type: e.documentNumber,
          tradeId: row.id
        }
        this.recordVisible = true
      } else if (e.operationName === '标注主体') {
        if (e.ukQstQqo === 'w_55' || e.ukQstQqo === 'w_66') {
          this.markObj = {
            documentNumber: row[e.documentNumber],
            documentType: row[e.documentType],
            subJectName: row[e.subJectName],
            nationality: row.stnt
          }
        } else {
          this.markObj = {
            documentNumber: row[e.documentNumber],
            documentType: row[e.documentType],
            subJectName: row[e.subJectName],
            nationality: row.ctnt ? row.ctnt : ''
          }
        }
        this.marklistVisible = true
      } else if (e.operationName === '人工补正') {
        this.getCorrectionData(e, row)
      }
    },
    getCorrectionData(e, row) { // 获取人工补正传参
      if (new Date(row.redt).getTime() < new Date('2009-01-01 00:00:00').getTime()) {
        this.$message({
          type: 'error',
          message: '不能对2009年1月1日之前的交易发起人工补正',
          showClose: true,
          duration: 6000
        })
        return false
      }
      let type = ''
      if (e.ukQstQqo === 'w_11' || e.ukQstQqo === 'w_22' || e.ukQstQqo === 'w_33' || e.ukQstQqo === 'w_240' || e.ukQstQqo === 'w_250') {
        type = '0'
      } else if (e.ukQstQqo === 'w_44' || e.ukQstQqo === 'w_66' || e.ukQstQqo === 'w_55' || e.ukQstQqo === 'w_100' || e.ukQstQqo === 'w_120' || e.ukQstQqo === 'w_140') {
        type = '1'
      } else {
        type = '2'
      }
      let indus = ''
      if (this.tableId[this.activeName] === 'w_11' || this.tableId[this.activeName] === 'w_44') {
        indus = 'B'
      } else if (this.tableId[this.activeName] === 'w_22' || this.tableId[this.activeName] === 'w_66') {
        indus = 'S'
      } else if (this.tableId[this.activeName] === 'w_33' || this.tableId[this.activeName] === 'w_55') {
        indus = 'I'
      } else if (this.tableId[this.activeName] === 'w_100' || this.tableId[this.activeName] === 'w_110') {
        indus = 'U001'
      } else if (this.tableId[this.activeName] === 'w_120' || this.tableId[this.activeName] === 'w_130' || this.tableId[this.activeName] === 'w_250') {
        indus = 'P001'
      } else if (this.tableId[this.activeName] === 'w_140' || this.tableId[this.activeName] === 'w_150') {
        indus = 'Z001'
      } else if (this.tableId[this.activeName] === 'w_240') {
        // 通用大额
        indus = 'J'
      }
      const obj = {
        tradeId: row.id,
        correctType: type,
        industry: indus
      }
      // correctCheck(row.id, type, indus).then(res => {
      this.UUID = getUUIDTo()
      correctCheck(obj, this.UUID).then(res => {
        if (res.code === 200) {
          correctCheckError(this.UUID).then(response => {
            if (response.code === 200) {
              this.dialogVisible = true
              if (
                e.ukQstQqo === 'w_11' ||
                e.ukQstQqo === 'w_22' ||
                e.ukQstQqo === 'w_33' ||
                e.ukQstQqo === 'w_240' ||
                e.ukQstQqo === 'w_250'
              ) {
                this.correctionComName = 'Large'
                this.correctionDialogTitle = '大额信息更正通知'
                this.correctParams = {
                  tradeId: row.id,
                  correctType: '0',
                  organ: '4',
                  industry: indus
                }
              } else if (
                e.ukQstQqo === 'w_44' ||
                e.ukQstQqo === 'w_66' ||
                e.ukQstQqo === 'w_55' ||
                e.ukQstQqo === 'w_100' ||
                e.ukQstQqo === 'w_120' ||
                e.ukQstQqo === 'w_140'
              ) {
                this.correctionComName = 'Suspicious'
                this.correctionDialogTitle = '可疑信息更正通知'
                this.correctParams = {
                  tradeId: row.id,
                  correctType: '1',
                  organ: '4',
                  industry: indus
                }
              } else {
                this.correctionComName = 'Notice'
                this.correctionDialogTitle = '信息补充通知'
                this.correctParams = {
                  tradeId: row.id,
                  correctType: '2',
                  organ: '4'
                }
              }
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch()
    },
    handleXmlName(scope) {
      this.treadeComName = 'reportDetail'
      this.tradeDialogTitle = '报告详情'
      let id = ''
      if (this.tableId.length !== 0) {
        if (this.tableId[this.activeName] === 'w_44' || this.tableId[this.activeName] === 'w_55' || this.tableId[this.activeName] === 'w_66' || this.tableId[this.activeName] === 'w_100' || this.tableId[this.activeName] === 'w_110' || this.tableId[this.activeName] === 'w_120' || this.tableId[this.activeName] === 'w_130' || this.tableId[this.activeName] === 'w_140' || this.tableId[this.activeName] === 'w_150') { // 交易
          if (this.disabled) {
            id = scope.row.rept_id
          } else {
            id = scope.row.xml_id
          }
        } else {
          id = scope.row.id
        }
        this.tradeDetailInfo = {
          id: id,
          tableId: this.tableId[this.activeName],
          newDate: this.disabled
        }
        this.tradeDetailVisible = true
      }
    },
    isTableBtn(e, row) {
      // 查看详情
      if (e.ukQstQqo === 'w_11' || e.ukQstQqo === 'w_22' || e.ukQstQqo === 'w_44' || e.ukQstQqo === 'w_66' || e.ukQstQqo === 'w_33' || e.ukQstQqo === 'w_250' || e.ukQstQqo === 'w_55' || e.ukQstQqo === 'w_100' ||
         e.ukQstQqo === 'w_110' || e.ukQstQqo === 'w_120' || e.ukQstQqo === 'w_130' || e.ukQstQqo === 'w_140' || e.ukQstQqo === 'w_150' || e.ukQstQqo === 'w_230' || e.ukQstQqo === 'w_240' ||
         e.ukQstQqo === 'w_250' || e.ukQstQqo === 'w_260' || e.ukQstQqo === 'w_270' || e.ukQstQqo === 'w_280' || e.ukQstQqo === 'w_290' || e.ukQstQqo === 'w_300' || e.ukQstQqo === 'w_310') { // 交易
        // this.treadeComName = 'tradeDetail'
        this.tradeDialogTitle = '交易详情'
        var timestamp = (new Date()).valueOf()
        this.tradeDetailInfo = {
          id: row.id,
          tableId: e.ukQstQqo,
          newDate: this.disabled,
          timer: timestamp
        }
        this.rosterData = []
        this.TradeType = ''
        this.detailOptions = {}
        this.detailLeft = {}
        // this.detailCenter = {}
        this.detailRight = {}
        this.dealLoading = true
        this.dealDetailVisible = true
        setTimeout(() => {
          this.getDealData()
        }, 1500)
      } else { // 报告
        this.treadeComName = 'reportDetail'
        this.tradeDialogTitle = '报告详情'
        this.tradeDetailInfo = {
          id: row.id,
          tableId: e.ukQstQqo,
          newDate: this.disabled
        }
        this.tradeDetailVisible = true
      }
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
    customerHasValRules() { // 主体类型选个人和机构的判断
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
    getCatchQuery(rk, paramsObj, source) { // 从缓存去数据（查询【当日和非当日】和统计【当日和非当日】写一块了）
      getCatchQueryKey(rk).then(res => {
        if (res.code === 200) {
          this.tabOptions = res.data.navigation
          this.tableId = res.data.nature
          this.tempKey = res.data.key
          if (res.data.navigation.length !== 0) {
            this.getParamsUrl(paramsObj)
          } else {
            this.$nextTick(function() {
              this.loading = false
              this.loadingBox = false
              this.emptyText = '暂无数据'
              this.isAllExport = false
            })
          }
        } else {
          this.$confirm(res.message, '提示', {
            showCancelButton: false,
            type: 'error'
          }).then()
            .catch()
          this.$nextTick(function() {
            this.loadingBox = false
            this.loadingText = ''
            this.emptyText = '暂无数据'
            this.loading = false
            this.isAllExport = false
          })
        }
      }).catch(() => {
        this.$nextTick(function() {
          this.loadingBox = false
          this.loadingText = ''
          this.loading = false
          this.emptyText = '暂无数据'
        })
      })
    },
    getQueryStatus(rk, paramsObj, source) { // 查询轮训
      getQueryFileStatus(rk).then(res => {
        if (res.code === 200) {
          const isHasQueryVal = res.data
          if (isHasQueryVal === false) {
            const _this = this
            this.timeOut = setTimeout(() => {
              _this.getQueryStatus(rk, paramsObj, source)
            }, 5000)
          } else {
            this.timeOut = ''
            this.getCatchQuery(rk, paramsObj)
          }
        } else {
          this.$nextTick(function() {
            this.loadingBox = false
            this.loadingText = ''
            this.loading = false
            this.emptyText = '暂无数据'
            clearTimeout(this.timeOut)
          })
        }
      }).catch(() => {
        this.$nextTick(function() {
          this.loadingBox = false
          this.loadingText = ''
          this.loading = false
          this.emptyText = '暂无数据'
          clearTimeout(this.timeOut)
        })
      })
    },
    getAllExport(rk) { // 导出全部--轮训
      getQueryFileStatus(rk).then(res => {
        if (res.code === 200) {
          const isHasQueryVal = res.data
          if (isHasQueryVal === false) {
            const _this = this
            this.timeOut = setTimeout(() => {
              _this.getAllExport(rk)
            }, 10000)
          } else {
            this.exportAllLoading = false
            this.loadingText = ''
            this.timeOut = ''
            location.href = '/caml-query/query/template/preserve/importAll/' + rk + '?token=' + this.token
          }
        } else {
        //   this.exportAllLoading = false
        //   this.loadingText = ''
        //   clearTimeout(this.timeOut)
        }
      }).catch(() => {
        // this.exportAllLoading = false
        // this.loadingText = ''
        // clearTimeout(this.timeOut)
      })
    },
    isBlankDtable() { // 判断数据库表是否为空
      const queryDt = [...this.form.dataTable, ...this.form.dataTable2, ...this.form.dataTableReport, ...this.form.dataTableOther]
      if (queryDt.length === 0) {
        this.$confirm('报告不能进行结果统计', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          return false
        }).catch()
      }
    },
    getTabList(paramsObj, source) {
      getTabList(paramsObj).then(res => {
        if (res.code === 200) {
          this.getQueryStatus(res.data, paramsObj, source)
        }
      }).catch()
    },
    onSubmit(formName, activeIndex, count) {
      if ((this.form.dataTable2.length > 0 && this.form.area.length === 0) || (this.form.dataTable2.length > 0 && this.form.area[this.form.area.length - 1] === '上报网点' && this.form.area.length === 1)) {
        this.$confirm('地区选项中的交易方、对手方、交易发生地至少选择一项', '提示', {
          showCancelButton: false,
          type: 'warning'
        }).then(() => {

        }).catch()
        return false
      }
      if ((this.form.dataTableReport.length > 0 && this.form.area.length === 0) || (this.form.dataTableReport.length > 0 && this.form.area.length > 0 && this.form.area[this.form.area.length - 1] !== '上报网点')) {
        this.$confirm('请勾选地区选项中的上报网点！', '提示', {
          showCancelButton: false,
          type: 'warning'
        }).then(() => {

        }).catch()
        return false
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitParamter(formName, activeIndex, count)
        } else {
          this.$confirm('以上有不符合规则的校验', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {}).catch(() => {

          })
        }
      })
    },
    submitParamter(formName, activeIndex, count) {
      this.isSortVal = false
      this.sortParamsObj = {}
      const queryOption = [...this.form.dtOptions, ...this.form.dtOptions2, ...this.form.dtOptionsReport, ...this.form.dtOptionsOther]
      if (queryOption.length === 0) { // 判断有没有数据库表权限
        this.$confirm('您还未申请查询任何库表的权限，请先申请再查询！', '提示', {
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          return false
        }).catch()
      } else { // 有数据库表权限的话，执行...
        const customerArr = this.isCustomerHasVal(this.form.clientInfo)
        const reportArr = this.isReportHasVal(this.form.reportOptions)
        const reportCheckArr = this.isReportCheckHasVal(this.form.reportCheckList) // 报告信息
        const tradeCheckArr = this.isReportCheckHasVal(this.form.tradeCheckList)
        if (customerArr || reportArr || reportCheckArr || tradeCheckArr) { // 如果主体信息 、报告机构信息、报告信息和交易信息 ，必填写一项，存在主体信息不为空
          if (customerArr) { // 主体信息不为空，进行主体信息校验
            const isQuery = this.customerHasValRules()
            if (isQuery) {
              this.tempParamsObj = null
              this.submitNextParamter(formName, activeIndex, count)
            }
          } else { // 主体信息为空，不进行主体信息校验
            this.submitNextParamter(formName, activeIndex, count)
          }
        } else {
          this.$confirm('主体信息 、报告机构信息、报告信息和交易信息 ，必填写一项', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
        }
      }
      // if (this.isBranch) { // 分支机构--判断：主体名称，主体证件号码，账号，义务机构编码，义务机构名称，义务机构网点名称，必选其一
    },
    submitNextParamter(formName, activeIndex, count) {
      this.tableId = []
      // --------以下if宋显鹏添加------------
      if (this.radioLine) {
        this.tabOptions = []
        this.data_list = []
        this.header = {}
        this.isCountTableShow = false
        this.isOtherCountTableShow = false
        this.isTable = false
        this.isPaginationShow = false
        this.isAllExport = false
        // const queryDt = [...this.form.dataTable, ...this.form.dataTable2, ...this.form.dataTableOther]
        const isLine = false
        this.isBlankDtable()
        const paramsObj = this.getParamsObj(activeIndex)
        const nearOffObj = paramsObj
        nearOffObj.queryType = this.radioLine
        this.allGrayZion = nearOffObj
        nearOffLine(nearOffObj).then(res => {
          if (res.code === 200) {
            this.dialogVisibleNearOff = true
            this.loading = false
          } else {
            this.loading = false
            this.radioLine = ''
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        }).catch()

        return isLine
      } else {
        if (this.form.isNotStatistic === true) {
          // 统计
          this.isBlankDtable()
          if (this.disabled) {
            this.$confirm('您好，查询当日交易不能进行结果统计', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
              return false
            }).catch()
          }
          this.loading = true
          this.isTable = true
          this.isPaginationShow = true
          this.loadingBox = true
          this.loadingText = '首次加载较慢，请稍候...'
          this.emptyText = ' '
          this.tabOptions = []
          this.isAllExport = false
          this.header = null
          this.data_list = []
          this.totalAll = 0
          this.total = 0
          this.handleOptions = []
          const paramsObj = this.getParamsObj(activeIndex)
          this.getTabList(paramsObj, 'statistics')
        } else {
          // 查询接口
          this.tabOptions = []

          this.data_list = []
          this.header = {}
          this.total = 0
          this.totalAll = 0
          this.handleOptions = []
          let isClient = false
          if (this.form.clientInfo.length !== 0) {
            for (let i = 0; i < this.form.clientInfo.length; i++) {
              const item = this.form.clientInfo[i]
              for (let j = 0; j < item.length; j++) {
                if (item[j].qttcVal) {
                  if (item[j].qttcVal !== '') {
                    isClient = true
                  } else {
                    isClient = false
                  }
                } else {
                  isClient = false
                }
              }
            }
          }
          this.isBlankDtable()
          if (isClient === false && this.form.match.length === 0) { // 主体信息没填，匹配信息为空
            this.$confirm('请至少选择一项匹配选项', '提示', {
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
              return false
            }).catch()
          }
          if (this.isCrimeHas && this.form.dataTableReport.length === 0) {
            this.$confirm('查询条件【涉罪类型】请匹配【可疑交易报告】使用', '提示', {
              showCancelButton: false,
              type: 'warning'
            })
          } else if (this.isCrimeHas && this.form.dataTableReport.length === 0) {
            this.$confirm('查询条件【涉罪类型】请匹配【可疑交易报告】使用', '提示', {
              showCancelButton: false,
              type: 'warning'
            })
          } else {
            this.loading = true
            this.isTable = true
            this.isPaginationShow = true
            this.loadingBox = true
            this.loadingText = '首次加载较慢，请稍候...'
            this.emptyText = ' '
            this.tabOptions = []
            this.isAllExport = false
            const paramsObj = this.getParamsObj(activeIndex)
            this.getTabList(paramsObj, 'query')
          }
        }
      } // ----------------------------------- 宋
    },
    getParamsUrl(paramsObj) {
      this.loadingBox = true
      this.loadingText = '正在查询中，请稍候……'

      this.emptyText = ' '
      this.$set(paramsObj, 'seleteKey', this.tempKey)
      this.$set(paramsObj, 'parameterTable', this.tableId[this.activeName])
      this.tempParamsObj = paramsObj
      if (this.tableId.length !== 0) {
        this.isLargeDtId = (this.tableId[this.activeName] === 'w_44' || this.tableId[this.activeName] === 'w_55' || this.tableId[this.activeName] === 'w_66')
        this.isSuspCategory = (this.tableId[this.activeName] === 'w_100' || this.tableId[this.activeName] === 'w_120' || this.tableId[this.activeName] === 'w_140')
      }

      if (this.disabled) { // 查询当日
        getQueryList(paramsObj).then(res => {
          if (res.code === 200) {
            if (res.data !== null) {
              this.header = res.data.show // 表格头部
              if (paramsObj.parameterTable === 'silverCertificate' || paramsObj.parameterTable === 'newThreeCategories') {
                this.isPaginationShow = false
                this.data_list = res.data.statistics
                this.isAllExport = true
              } else {
                this.isAllExport = false
                this.isPaginationShow = true
                this.data_list = res.data.result.list
                this.total = res.data.result.total
                this.totalAll = res.data.result.totalAll
                this.handleOptions = res.data.operation
              }

              this.$nextTick(function() {
                this.loadingBox = false
                this.loadingText = ''
                this.loading = false
                this.emptyText = ' '
              })
            } else {
              this.header = null
              this.data_list = []
              this.total = 0
              this.handleOptions = []
              this.$nextTick(function() {
                this.isAllExport = false
                this.loadingBox = false
                this.loadingText = ''
                this.loading = false
                this.emptyText = '暂无数据'
              })
            }
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 6000
            })
            this.$nextTick(function() {
              this.isAllExport = false
              this.loadingBox = false
              this.loadingText = ''
              this.loading = false
              this.emptyText = '暂无数据'
            })
          }
        })
          .catch((res) => {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 6000
            })
            this.$nextTick(function() {
              this.isAllExport = false
              this.loadingBox = false
              this.loadingText = ''
              this.loading = false
              this.emptyText = '暂无数据'
            })
          })
      } else {
        getNotQueryList(paramsObj).then(res => { // 查询
          if (res.code === 200) {
            if (res.data !== null) {
              this.header = res.data.show // 表格头部

              if (paramsObj.parameterTable === 'silverCertificate' || paramsObj.parameterTable === 'newThreeCategories') {
                this.data_list = res.data.statistics
                this.isPaginationShow = false
                this.isAllExport = false
              } else {
                this.isAllExport = true
                this.data_list = res.data.result.list
                this.total = res.data.result.total
                this.totalAll = res.data.result.totalAll
                this.handleOptions = res.data.operation
                this.isPaginationShow = true
                // let tags = document.getElementsByClassName('el-pagination__total')[0].innerHTML
                // tags = '显示' + this.total + '条'
                // console.log('tags2', tags)
                // console.log('tags2', typeof tags)
              }
              this.$nextTick(function() {
                this.loadingBox = false
                this.loadingText = ''
                this.loading = false
                this.emptyText = ' '
              })
            } else {
              this.header = null
              this.data_list = []
              this.total = 0
              this.handleOptions = []
              this.$nextTick(function() {
                this.isAllExport = false
                this.loadingBox = false
                this.loadingText = ''
                this.loading = false
                this.emptyText = '暂无数据'
              })
            }
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 6000
            })
            this.$nextTick(function() {
              this.isAllExport = false
              this.loadingBox = false
              this.loadingText = ''
              this.loading = false
              this.emptyText = '暂无数据'
            })
          }
        })
          .catch((res) => {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 6000
            })
            this.$nextTick(function() {
              this.isAllExport = false
              this.loadingBox = false
              this.loadingText = ''
              this.loading = false
              this.emptyText = '暂无数据'
            })
          })
      }
    },
    // 跳转页面弹窗事件-----宋显鹏
    routerEventnearOffLine() {
      if (this.nearOffData) {
        const jumpNearOffObj = this.allGrayZion
        jumpNearOffObj.taskName = this.nearOffData
        taskNearOffLine(jumpNearOffObj).then(res => {
          if (res.code === 200) {
            this.$router.push({
              name: 'dataQuery_dataDown',
              tableName: this.nearOffData
            })
            this.nearOffData = ''
            this.allGrayZion = []
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              showClose: true,
              duration: 6000
            })
          }
        })
      } else {
        this.$message({
          message: '请输入任务名称！',
          type: 'warning',
          showClose: true,
          duration: 6000
        })
      }
    },
    // 取消----宋
    cancelEventnearOff() {
      this.dialogVisibleNearOff = false
      this.nearOffData = ''
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex // 把每一行的索引放进row
      return ''
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
    handleTabExport() {
      this.exportAllLoading = true
      this.loadingText = '正在导出中，请耐心等待……'
      continueExport(this.tempParamsObj).then(res => {
        if (res.code === 200) {
          this.getAllExport(res.data)
        } else {
          this.exportAllLoading = false
          this.loadingText = ''
        }
      }).catch(() => {
        this.exportAllLoading = false
        this.loadingText = ''
      })
    },
    handleExport() { // 导出tab页数据
      const messageModel = {
        tableName: this.tableId[this.activeName],
        newDate: this.disabled,
        key: this.tempKey
      }

      this.exportLoading = true
      this.loadingText = '正在导出中，请耐心等待……'
      this.rk = ''
      this.fileName = ''
      this.rollStatus = false
      fileExport(messageModel).then(res => {
        if (res.code === 200) {
          this.rk = res.data.rk
          this.fileName = res.data.fileName
          this.getFileStatus(res.data.rk)
        }
      }).catch()
    },
    getFileStatus(rk) { // 轮训
      getQueryFileStatus(rk).then(res => {
        if (res.code === 200) {
          this.rollStatus = res.data
          if (this.rollStatus === false) {
            const _this = this
            this.timeOut = setTimeout(() => {
              _this.getFileStatus(this.rk)
            }, 5000)
          } else {
            this.timeOut = ''
            this.getFileDown()
          }
        }
      }).catch()
    },
    getFileDown() {
      this.exportLoading = false
      this.loadingBox = false
      if (this.rk && this.fileName) {
        location.href = `/caml-query/query/template/importAll/${this.rk}/${this.fileName}?token=${this.token}`
      } else {
        this.$confirm('导出失败！', '提示', {
          showCancelButton: false,
          type: 'error'
        }).then()
          .catch()
      }
    },
    getDefault() {
      this.clearLoading = true
      this.getData(1)
    },
    handleDefault(count) {
      // 恢复默认
      this.$set(this.form, 'clientInfo', [])
      this.$set(this.form, 'tradeCheckList', [])
      this.$set(this.form, 'reportCheckList', [])
      this.$set(this.form, 'reportOptions', [])
      const dataTableChecked = ['银行业大额交易'] // 默认选中状态
      const dataTableChecked2 = ['银行业可疑交易'] // 默认选中状态
      const dataTableReportChecked = [] // 默认选中状态
      // const factorChecked = ['交易主体数', '账户数', '交易笔数', '本币交易笔数', '外币交易笔数', '本币交易金额', '外币交易金额(人民币)', '单笔最大金额(人民币)', '最早交易时间', '最晚交易时间'] // 统一配置选中
      this.totalAll = 0
      this.clientName = ''
      this.disabled = false
      this.isTable = false
      this.isPaginationShow = false
      this.form.dataTable = dataTableChecked
      this.form.dataTable2 = dataTableChecked2
      this.form.dataTableReport = dataTableReportChecked
      this.form.dataTableOther = []
      this.form.match = []
      if (this.tempInitObj.matchOptions.length !== 0) {
        this.tempInitObj.matchOptions.map(item => {
          // 匹配
          if (item.ttMatch.qttmNameCh) {
            // if (item.ttMatch.qttmNameCh !== '法人' && item.ttMatch.qttmNameCh !== '股东') {
            this.form.match.push(item.ttMatch.qttmNameCh)
            // }
          }
        })
      }
      this.form.area = []
      if (this.tempInitObj.areaOptions.length !== 0) {
        this.tempInitObj.areaOptions.map(item => {
          // 地区匹配
          if (item.ttMatchArea.qttmNameCh) {
            this.form.area.push(item.ttMatchArea.qttmNameCh)
          }
        })
      }
      this.form.factor = []
      if (this.tempInitObj.factorOptions.length !== 0) {
        this.tempInitObj.factorOptions.map(item => {
          // 配置
          if (item.ttStatisticFactor.qsfName) {
            this.form.factor.push(item.ttStatisticFactor.qsfName)
          }
        })
      }
      this.form.dtOptions = []
      this.form.dtOptions2 = []
      this.form.dtOptionsReport = []
      this.form.dtOptionsOther = []
      this.form.matchOptions = []
      this.form.areaOptions = []
      this.form.factorOptions = []
      this.form.clientOptions = []
      if (!this.tplId) {
        if (count === 1) {
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
      // this.form.checkAllRegion = false
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
      this.dtCheckAll2 = false // 数据库表全选
      this.dtCheckAllOther = false // 数据库表全选
      this.isIndeterminateMatch = false // 匹配信息
      this.matchCheckAll = true // 匹配信息
      this.isIndeterminateArea = false // 地区匹配信息
      this.areaCheckAll = true // 地区匹配信息
      this.isIndeterminateFactor = false // 配置统计要素
      this.factorCheckAll = true // 配置统计要素
      this.isCrimeHas = false
      this.radioLine = ''
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
        this.$confirm('最多添加5个主体信息', '提示', { showCancelButton: false, type: 'warning' })
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
    },
    handleExit() {
      // 报告、交易--编辑弹框
      this.tradeDialogVisible = true
      if (this.tradeDialogVisible) {
        this.exitDialogLoading = true
        exitItem()
          .then(res => {
            if (res.code === 200) {
              const tmpArr = []
              this.dialogForm.tradeOptions = []
              res.data.forEach(res => {
                if (res.ttConditionColumn.qttccName !== '大额迟报' && res.ttConditionColumn.qttccName !== '大额交易特征') {
                  this.dialogForm.tradeOptions.push(res)
                }
              })
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
      this.dialogForm.tradeOptions.forEach((item, index) => { // 把this.dialogForm.tradeInfo里的值转化对象
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
      newInfo.forEach((item, index) => { // 编辑字段绑定的值
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      if (this.isSortVal) {
        this.sortParamsObj.pageNum = this.pageInfo.pageNum
        this.sortParamsObj.pageSize = this.pageInfo.pageSize
        this.getSortData(this.sortParamsObj)
      } else {
        this.tempParamsObj.pageSize = val
        this.getParamsUrl(this.tempParamsObj)
      }
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      if (this.isSortVal) {
        this.sortParamsObj.pageNum = this.pageInfo.pageNum
        this.sortParamsObj.pageSize = this.pageInfo.pageSize
        this.getSortData(this.sortParamsObj)
      } else {
        // this.loadingBox = true
        // this.emptyText = ' '
        // this.loadingText = '正在查询中，请稍候……'
        this.tempParamsObj.pageNum = val
        this.getParamsUrl(this.tempParamsObj)
      }
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
    // 国家或者省市
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
          ricd: encodeURI(query)
        }
        getRinmList(paramsObj).then(res => {
          if (res.code === 200) {
            cb(res.data)
          }
        })
      }
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
      } else if (item.ttConditionColumn.qttccName === '报文ID') {
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
      } else if (item.ttConditionColumn.qttccName === '报文ID') {
        return '支持多个id,并用逗号隔开且最大长度为100位'
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
    },
    reBytes(str) {
      var num = str.length
      for (var i = 0; i < num; i++) {
        if (str.charCodeAt(i) > 255) {
          num++
        }
      }
      if (num > 15) {
        return true
      } else {
        return false
      }
    },
    getDealData() {
      if (this.disabled) {
        getTradeData(this.tradeDetailInfo)
          .then(res => {
            if (res.code === 200) {
              this.detailOptions = res.data ? res.data.trade : {}
              if (this.detailOptions !== {}) {
                var name = []
                var value = []
                for (var i in this.detailOptions) {
                  name.push(i)
                  value.push(this.detailOptions[i])
                }
                this.detailLeft = this.detailOptions
              }
              this.rosterData = res.data.isifs
              this.TradeType = res.data.type
              this.$nextTick(function() {
                this.dealLoading = false
              })
            } else {
              this.$nextTick(function() {
                this.dealLoading = false
              })
            }
          })
          .catch(() => {
            this.$nextTick(function() {
              this.dealLoading = false
            })
          })
      } else {
        getNotTradeData(this.tradeDetailInfo)
          .then(res => {
            if (res.code === 200) {
              this.detailOptions = res.data ? res.data.trade : {}

              if (this.detailOptions !== {}) {
                var name = []
                var value = []
                for (var i in this.detailOptions) {
                  name.push(i)
                  value.push(this.detailOptions[i])
                }
                this.detailLeft = this.detailOptions
              }
              this.rosterData = res.data.isifs
              this.TradeType = res.data.type
              this.$nextTick(function() {
                this.dealLoading = false
              })
            } else {
              this.$nextTick(function() {
                this.dealLoading = false
              })
            }
          })
          .catch(() => {
            this.$nextTick(function() {
              this.dealLoading = false
            })
          })
      }
    },
    onCancel() {
      this.dealDetailVisible = false
    },
    toggleZS() {
      this.isToggle = !this.isToggle
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
.el-select__tags {
  overflow: hidden;
}
.moneyWrap .el-input {
  width: 100px;
}
.dataquery {
  .toggleWrap {
    .el-collapse-item__header{
      display: block!important;
    }
    .el-collapse-item__arrow {
      display: none;
    }
  }
  .totalNum {
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 400;
    color: #606266;
    font-size: 12px;
    display: inline-block;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
  }
  .tableList thead tr th{
    padding: 0 0;
  }
  .el-date-editor--daterange{
    width: 100% !important;
  }
  .el-cascader__tags .el-tag > span{
    -webkit-box-flex:1;
    -ms-flex:none;
    flex:none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item { // 表格加省略号
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  // 第一行查询模板样式
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
  .el-table .warning-row {
    background: #f8c270;
  }
  .radiowrap .el-form-item--small.el-form-item, .datewrap .el-form-item--small.el-form-item,
  .inputwrap .el-form-item--small.el-form-item { // 报告交易表单高度一致
    height: 33px;
  }
  .line2 {
    .el-select {
      width: 100%;
    }
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
      .toggletitle {
        font-size: 14px;
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
      
      .matchMain .el-checkbox { // 匹配选项样式
        width: 14.2%;
        margin-left: 0px;
      }
      // .matchMain .el-checkbox-group:nth-child(3) { // 匹配选项样式
      //   margin-right: auto;
      // }
      .el-icon-remove-outline {
        @include icon();
      }
      .el-icon-circle-plus-outline {
        @include icon();
      }
      .more {
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .dialogReport .el-checkbox+.el-checkbox { // 报告信息弹框复选框样式
    width: 20%;
    margin-left: 0px;
  }
  .dialogReport .el-checkbox { // 报告信息弹框（第一个）复选框样式
    width: 20%;
    margin-left: 0px;
  }
  .customizationContainer {
    .el-card__header {
      background: #fafafa;
      padding: 10px 20px;
    }
    .customization {
      .el-form-item {
        display: inline-block;
      }
    }
    .treeContainer {
      height: 400px;
    }
  }
  .exportwrapper {
    .el-dialog__body {
      padding-top: 0px;
      padding-bottom: 8px;
    }
  }
  .type-large-wrap {
    position: relative;
    .title {
      padding: 8px 0 10px 25px;
    }
    .dialog-footer{
      margin-top: 10px;
      text-align: right;
    }
    .active-border {
      border: 1px solid #eee;
      padding: 5px 10px 10px;
      margin-top: 10px;
    }
    .active-noBorder {
      border-bottom: 1px solid #eee;
      padding: 10px;
    }
    .label-item {
      word-break:break-all;
      word-wrap:break-word;
    }
    .el-form-item__label, .el-form-item__content {
      font-size: 13px;
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
      line-height: 20px;
    }
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
