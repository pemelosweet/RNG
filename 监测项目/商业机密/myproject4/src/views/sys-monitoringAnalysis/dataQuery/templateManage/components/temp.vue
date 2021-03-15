<template>
  <div class="templateManage_add_t">
    <el-card>
      <el-form :model="form" ref="form" label-width="140px">
        <div class="block clearfix">
          <div class="subblocktitle">
            <span class="title" style=" font-size: 16px;">查询条件</span>
          </div>
          <!-- <div class="subblocktitle">
            <span class="title">主体信息</span>
            <span style="color: #f56c6c; font-size: 12px; margin-left: 10px;">温馨提示：最多可有5个主体信息；使用主体信息查询时，请先选择主体类型：选择【个人】，必须使用主体证件号码查询，选择【机构】，以主体名称或主体证件号码查询；若填写了账号，无论哪种主体类型，仅以账号为查询条件</span>
          </div>
          <el-row
            class="infoWarp clearfix"
            v-for="(item, index) in form.clientInfo"
            :key="index"
            style="border: 1px solid #dcdfe6; padding:10px 10px 0; position: relative;">
            <div
              v-for="(client,cIndex) in item"
              :key="cIndex"
              label-width="120px"
              class="line-info">
              <el-col
                :span="8"
                v-if="client.ttConditionColumn.qttccType === 0"
              >
                <el-form-item
                  :label="client.ttConditionColumn.qttccName"
                  :prop="client.qttcVal">
                  <el-radio-group
                    v-model="client.qttcVal"
                    :disabled="disabled">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col
                :xs="client.ttConditionColumn.qttccName === '主体名称'? 16 : 8" :sm="client.ttConditionColumn.qttccName === '主体名称'? 16 : 8" :md="client.ttConditionColumn.qttccName === '主体名称'? 16 : 8" :lg="client.ttConditionColumn.qttccName === '主体名称'? 16 : 8" :xl="8"
                v-if="client.ttConditionColumn.qttccType === 1 && client.ttConditionColumn.qttccName !== '主体类型'">
                <el-form-item
                  :label="client.ttConditionColumn.qttccName"
                  :prop="'clientInfo.'+index+'.'+cIndex+'.qttcVal'"
                  :rules="clientRule(item, cIndex)">
                  <el-input v-model="client.qttcVal" :disabled="disabled" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                v-if="client.ttConditionColumn.qttccType === 1 && client.ttConditionColumn.qttccName === '主体类型'"
              >
                <el-form-item :label="client.ttConditionColumn.qttccName">
                  <el-select
                    v-model="client.qttcVal"
                    clearable
                    :disabled="disabled"
                    @change="handleClientChange(client)"
                  >
                    <el-option
                      label="个人"
                      value="0"
                    ></el-option>
                    <el-option
                      label="机构"
                      value="1"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                v-if="client.ttConditionColumn.qttccType === 3"
              >
                <el-form-item :label="client.ttConditionColumn.qttccName">
                  <el-input
                    v-model="client.qttcStartNum"
                    style="width: 40%; margin-right:6px;"
                    :disabled="disabled" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)"></el-input>~
                  <el-input
                    v-model="client.qttcEndNum"
                    style="width: 40%; margin-left:6px;"
                    :disabled="disabled" :maxlength="getInputMax(client)" :placeholder="getPlaceholder(client)"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                v-if="client.ttConditionColumn.qttccType === 4"
              >
                <el-form-item
                  :label="client.ttConditionColumn.qttccName"
                  :prop="client.qttcVal"
                >
                  <el-select
                    v-model="client.qttcVal"
                    clearable
                    :disabled="disabled" @change="handleDocumentTypeChange(client)"
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
                  :prop="client.qttcVal">
                  <el-date-picker
                    v-model="client.ttConditionColumn.values"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :disabled="disabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                v-if="client.ttConditionColumn.qttccType === 6"
              >
                <el-form-item
                  :label="client.ttConditionColumn.qttccName"
                  :prop="client.qttcVal"
                >
                  <el-select
                    v-model="client.qttcVal"
                    multiple
                    collapse-tags
                    clearable
                    :disabled="disabled"
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
            </div>
          </el-row> -->
        </div>
        <!-- <div class="block clearfix">
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
                :prop="report.qttcVal">
                <el-radio-group
                  v-model="report.qttcVal"
                  :disabled="disabled">
                  <el-radio label="是">是</el-radio>
                  <el-radio label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 1"
            >
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="'reportOptions.'+ rIndex + '.qttcVal'"
                :rules="Rules(report)"
              >
                <el-autocomplete v-if="report.ttConditionColumn.qttccName === '报告机构编码'" 
                  style="width:100%"
                  v-model="report.qttcVal"
                  :fetch-suggestions="getRicdMethod"
                  value-key="ricd"
                  :trigger-on-focus="false"
                  :disabled="disabled" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-autocomplete>
                 <el-input
                  v-model='report.qttcVal'
                  :disabled="disabled" v-if="report.ttConditionColumn.qttccName === '报告机构网点名称'"
                 :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"></el-input> 
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 2"
            >
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="report.qttcVal"
              >
                <el-checkbox
                  v-model="report.qttcVal"
                  :disabled="disabled"
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
                :rules="Rules(report)"
              >
                <el-input
                  v-model="report.qttcStartNum"
                  style="width: 40%; margin-right:6px;"
                  :disabled="disabled" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-input>~
                <el-input
                  v-model="report.qttcEndNum"
                  style="width: 40%; margin-left:6px;"
                  :disabled="disabled" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 4"
            >
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="report.qttcVal"
              >
                <el-select
                  v-model="report.qttcVal"
                  clearable
                  :disabled="disabled"
                >
                  <el-option
                    v-for="(selItem, sIndex) in report.ttConditionColumn.codes"
                    :key="sIndex"
                    :value="selItem.codeId"
                    :label="selItem.codeName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 5"
            >
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="report.qttcVal"
              >
                <el-date-picker
                  v-model="report.ttConditionColumn.values"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              v-if="report.ttConditionColumn.qttccType === 6"
            >
              <el-form-item
                :label="report.ttConditionColumn.qttccName"
                :prop="'reportOptions.'+ rIndex + '.qttcVal'"
                :rules="Rules(report)">
                <el-autocomplete
                  style="width:100%"
                  v-model="report.qttcVal"
                  :fetch-suggestions="remoteMethod"
                  value-key="rinm"
                  :trigger-on-focus="false"
                  :disabled="disabled" :maxlength="getInputMax(report)" :placeholder="getPlaceholder(report)"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
          </div>
        </div> -->
        <!--报告信息-->
        <!-- <div class="block clearfix">
          <div class="subblocktitle">
            <span class="title">报告信息</span>
          </div>
           <el-row>
              <div
                v-for="(trade, tIndex) in form.reportCheckList"
                :key="tIndex"
                label-width="120px">
                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 0" class="radiowrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.qttcVal'" v-if="trade.ttConditionColumn.qttccName !== '可疑交易报告紧急程度'">
                    <el-radio-group v-model="trade.qttcVal" :disabled="disabled" @change="handleChangeDay(trade)">
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'reportCheckList.'+ tIndex + '.qttcVal'" v-if="trade.ttConditionColumn.qttccName === '可疑交易报告紧急程度'">
                    <el-select v-model="trade.qttcVal" placeholder="请选择">
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
                    :rules="Rules(trade)">
                    <el-input v-model='trade.qttcVal' v-if="trade.ttConditionColumn.qttccName !== '联系电话'" :maxlength="getInputMax(trade)" :disabled="disabled" :placeholder="getPlaceholder(trade)"></el-input>
                  <el-input v-model='trade.qttcVal' :disabled="disabled" v-if="trade.ttConditionColumn.qttccName === '联系电话'" :maxlength="getInputMax(trade)" :placeholder="getPlaceholder(trade)"></el-input>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 2"
                  class="inputwrap">
                  <el-form-item :prop="trade.qttcVal">
                    <el-checkbox
                      v-model="trade.qttcVal"
                      :disabled="disabled">{{trade.ttConditionColumn.qttccName}}</el-checkbox>
                  </el-form-item>
                </el-col>
              <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="8" v-if="trade.ttConditionColumn.qttccType === 3" class="inputwrap">   
                <el-col style="width: 140px; text-align:right; font-size: 14px; padding: 8px 12px 0 0; color: #606266;"><div>{{trade.ttConditionColumn.qttccName}}</div></el-col>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px" :prop="'reportCheckList.'+ tIndex + '.qttcStartNum'">  
                    <el-input v-model="trade.qttcStartNum" style="width: 100%;" :maxlength="getInputMax(trade)" @change="handleMinChange(tIndex)" :disabled="disabled" :placeholder="getPlaceholder(trade)"></el-input> 
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                      <span style="display: inline-block;width: 100%;line-height: 33px;text-align: center;">至</span>   
                </el-col>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px" :prop="'reportCheckList.'+ tIndex + '.qttcEndNum'"> 
                    <el-input v-model="trade.qttcEndNum" style="width: 100%;" :maxlength="getInputMax(trade)" @change="handleMaxChange(tIndex)" :disabled="disabled" :placeholder="getPlaceholder(trade)"></el-input>  
                  </el-form-item>
                </el-col>
              </el-col>
                
                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 4"
                  class="inputwrap">
                  <el-form-item
                    :label="trade.ttConditionColumn.qttccName"
                    :prop="trade.qttcVal">
                    <el-select
                      v-model="trade.qttcVal"
                      clearable
                      :disabled="disabled"
                      v-if="trade.ttConditionColumn.pkQttcc !== '28'">
                      <el-option
                        v-for="(selItem, sIndex) in trade.ttConditionColumn.codes"
                        :key="sIndex"
                        :label="selItem.codeName"
                        :value="selItem.codeId"></el-option>
                    </el-select>
                    <el-select v-model="trade.qttcVal" clearable :disabled="disabled" v-if="trade.ttConditionColumn.pkQttcc === '28'">
                      <el-option
                        v-for="(selItem, sIndex) in trade.ttConditionColumn.codes"
                        :key="sIndex"
                        :label="selItem.chSName" :value="selItem.enCodeThree"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 5"
                  class="datewrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal">
                    <el-date-picker
                      v-model="trade.ttConditionColumn.values"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      :disabled="disabled"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 6" class="inputwrap" style="position: relative;">
                    <el-checkbox style="position: absolute; left: 20px; top: 6px;" v-model="form.checkAllLarge" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" @change="handleCheckLargeChange($event, trade)" :disabled="form.largeDisabled || disabled"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 6px;" v-model="form.checkAllCrime" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" @change="handleCheckCrimeChange($event, trade)" :disabled="form.crimeDisabled || disabled"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 6px;" v-model="form.checkAllReport" v-if="trade.ttConditionColumn.qttccName === '报送方向'" @change="handleCheckReportChange($event, trade)" :disabled="form.reportDisabled || disabled"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 6px;" v-model="form.checkAllTrade" v-if="trade.ttConditionColumn.qttccName === '交易种类'" @change="handleCheckTradeChange($event, trade)" :disabled="form.tradeDisabled || disabled"></el-checkbox>
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" class="el-select-uwrap">
                    <el-select v-model="trade.ttConditionColumn.values" multiple clearable :disabled="disabled" @change="selectLargeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId" v-if="regison.codeName !== '（公转私）'">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple clearable :disabled="disabled" @change="selectCrimeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple clearable :disabled="disabled" @change="selectReportChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '报送方向'">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple clearable :disabled="disabled" @change="selectTradeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '交易种类'">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col
                  :span="8"
                  v-if="trade.ttConditionColumn.qttccType === 7"
                  class="inputwrap"
                >
                  <el-form-item
                    :label="trade.ttConditionColumn.qttccName"
                    :prop="trade.qttcVal"
                  >
                    <el-select
                      v-model="form.interRegion"
                      @change="handleInterRegionChange"
                      style="width: 40%;"
                      :disabled="disabled"
                      clearable>
                      <el-option
                        label="中国"
                        value="CHN"
                      ></el-option>
                      <el-option
                        label="大陆地区保税区"
                        value="Z01"
                      ></el-option>
                      <el-option
                        label="大陆地区加工区"
                        value="Z02"
                      ></el-option>
                      <el-option
                        label="大陆地区加工区钻石交易所"
                        value="Z03"
                      ></el-option>
                      <el-option
                        label="国际"
                        value="NAT"
                      ></el-option>
                    </el-select>
                    <el-cascader
                      v-if="form.interRegion !== 'NAT'"
                      style="width: 58%;"
                      expand-trigger="hover"
                      :options="cityListOptions"
                      v-model="form.city"
                      clearable
                      :disabled="disabled">
                    </el-cascader>

                    <el-select
                      v-if="form.interRegion === 'NAT'"
                      style="width: 58%;"
                      v-model="form.city"
                      clearable
                      :disabled="disabled">
                      <el-option
                        v-for="(country, cIndex) in countryData"
                        :key="cIndex"
                        :label="country.chSName"
                        :value="country.pkMc"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
        </div> -->
        <!--交易信息-->
        <!-- <div class="block clearfix">
          <div class="subblocktitle">
            <span class="title">交易信息</span>
          </div>
           <el-row>
              <div v-for="(trade, tIndex) in form.tradeCheckList" :key="tIndex" label-width="120px">
                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 0" class="radiowrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal">
                    <el-radio-group v-model="trade.qttcVal" :disabled="disabled" @change="handleChangeDay(trade)">
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 1" class="inputwrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="'tradeCheckList.'+ tIndex + '.qttcVal'"
                    :rules="Rules(trade)">
                    <el-input v-model='trade.qttcVal' v-if="trade.ttConditionColumn.qttccName !== '联系电话'" :maxlength="getInputMax(trade)" :disabled="disabled" :placeholder="getPlaceholder(trade)"></el-input>
                  <el-input v-model='trade.qttcVal' :disabled="disabled" v-if="trade.ttConditionColumn.qttccName === '联系电话'" :maxlength="getInputMax(trade)" :placeholder="getPlaceholder(trade)"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 2" class="inputwrap">
                  <el-form-item :prop="trade.qttcVal">
                    <el-checkbox v-model="trade.qttcVal" :disabled="disabled">{{trade.ttConditionColumn.qttccName}}</el-checkbox>
                  </el-form-item>
                </el-col>

              <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="8" v-if="trade.ttConditionColumn.qttccType === 3" class="inputwrap">   
                <el-col style="width: 140px; text-align:right; font-size: 14px; padding: 8px 12px 0 0; color: #606266;"><div>{{trade.ttConditionColumn.qttccName}}</div></el-col>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px" :prop="'tradeCheckList.'+ tIndex + '.qttcStartNum'">  
                    <el-input v-model="trade.qttcStartNum" style="width: 100%;" :maxlength="getInputMax(trade)" @change="handleMinChange(tIndex)" :disabled="disabled" :placeholder="getPlaceholder(trade)"></el-input> 
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span style="display: inline-block;width: 100%;line-height: 33px;text-align: center;">至</span>   
                </el-col>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px" :prop="'tradeCheckList.'+ tIndex + '.qttcEndNum'"> 
                    <el-input v-model="trade.qttcEndNum" style="width: 100%;" :maxlength="getInputMax(trade)" @change="handleMaxChange(tIndex)" :disabled="disabled" :placeholder="getPlaceholder(trade)"></el-input>  
                  </el-form-item>
                </el-col>
              </el-col>
                
                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 4" class="inputwrap">
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal">
                    <el-select v-model="trade.qttcVal" clearable :disabled="disabled" v-if="trade.ttConditionColumn.pkQttcc !== '28'">
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
                      :disabled="disabled"
                      v-if="trade.ttConditionColumn.pkQttcc === '28'"
                    >
                      <el-option
                        v-for="(selItem, sIndex) in trade.ttConditionColumn.codes"
                        :key="sIndex"
                        :label="selItem.chSName" :value="selItem.enCodeThree"
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
                    :prop="trade.qttcVal"
                  >
                    <el-date-picker
                      v-model="trade.ttConditionColumn.values"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      :disabled="disabled"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 6" class="inputwrap" style="position: relative;">
                    <el-checkbox style="position: absolute; left: 20px; top: 6px;" v-model="form.checkAllLarge" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'" @change="handleCheckLargeChange($event, trade)" :disabled="form.largeDisabled || disabled"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 6px;" v-model="form.checkAllCrime" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'" @change="handleCheckCrimeChange($event, trade)" :disabled="form.crimeDisabled || disabled"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 6px;" v-model="form.checkAllReport" v-if="trade.ttConditionColumn.qttccName === '报送方向'" @change="handleCheckReportChange($event, trade)" :disabled="form.reportDisabled || disabled"></el-checkbox>
                    <el-checkbox style="position: absolute; left: 50px; top: 6px;" v-model="form.checkAllTrade" v-if="trade.ttConditionColumn.qttccName === '交易种类'" @change="handleCheckTradeChange($event, trade)" :disabled="form.tradeDisabled || disabled"></el-checkbox>
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" class="el-select-uwrap" v-if="trade.ttConditionColumn.qttccName !== '交易种类'">
                    <el-select v-model="trade.ttConditionColumn.values" multiple clearable :disabled="disabled" @change="selectLargeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '大额交易特征'">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId" v-if="regison.codeName !== '（公转私）'">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple clearable :disabled="disabled" @change="selectCrimeChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '涉罪类型'">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                    <el-select v-model="trade.ttConditionColumn.values" multiple clearable :disabled="disabled" @change="selectReportChange($event, trade)" v-if="trade.ttConditionColumn.qttccName === '报送方向'">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal" class="el-select-uwrap-two" v-if="trade.ttConditionColumn.qttccName === '交易种类'">
                    <el-select v-model="trade.ttConditionColumn.values" multiple clearable :disabled="disabled" @change="selectTradeChange($event, trade)">
                      <el-option v-for="(regison, rIndex) in trade.ttConditionColumn.codes" :key="rIndex" :label="regison.codeName" :value="regison.codeId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-if="trade.ttConditionColumn.qttccType === 7" class="inputwrap" style="position: relative;">
                  <el-checkbox style="position: absolute; left: 32px; top: 6px;" v-model="form.checkAllRegion" @change="handleCheckRegionChange($event, trade)" :disabled="form.regionDisabled || disabled"></el-checkbox>
                  <el-form-item :label="trade.ttConditionColumn.qttccName" :prop="trade.qttcVal">
                    <el-select v-model="form.interRegion" @change="handleInterRegionChange" style="width: 40%;" :disabled="disabled" clearable>
                      <el-option label="中国" value="CHN"></el-option>
                      <el-option label="大陆地区保税区" value="Z01"></el-option>
                      <el-option label="大陆地区加工区" value="Z02"></el-option>
                      <el-option label="大陆地区加工区钻石交易所" value="Z03"></el-option>
                      <el-option label="境外" value="NAT"></el-option>
                    </el-select>
                    <el-cascader v-if="form.interRegion !== 'NAT'" style="width: 58%;" :options="cityListOptions"
                      v-model="form.city" clearable :disabled="disabled" :props="props">
                    </el-cascader>

                    <el-select v-if="form.interRegion === 'NAT'" style="width: 58%;"
                      v-model="form.city" clearable :disabled="disabled">
                      <el-option v-for="(country, cIndex) in countryData" :key="cIndex"
                        :label="country.chSName" :value="country.pkMc">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
        </div> -->
        <div class="block">
          <div class="subblocktitle">
            <span class="title">数据范围</span>
          </div>
          <div class="content dtmain">
            <el-row :gutter="20" v-show="!(form.dtOptions.length === 0 && form.dtOptions2.length === 0 && form.dtOptionsReport.length === 0 && form.dtOptionsOther.length === 0)">
              <el-form-item label="" class="dataMain" prop="type">
                <el-col :span="24" v-show="form.dtOptions.length !== 0">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="dtCheckAll" @change="handleDtCheckAllChange" style="width: 30%;" :disabled="disabled">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.dataTable" @change="handleDtoptionsChange" :disabled="disabled">
                      <el-checkbox v-for="(item, index) in form.dtOptions" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-col>
                <el-col :span="24" v-show="form.dtOptions2.length !== 0">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminate2" v-model="dtCheckAll2" @change="handleDtCheckAllChange2" :disabled="disabled">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.dataTable2" @change="handleDtoptionsChange2" :disabled="disabled">
                      <el-checkbox v-for="(item, index) in form.dtOptions2" :label="item.scopeTable.qstNameCh" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-col>
                
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="block">
          <div class="subblocktitle">
            <span class="title">主体查询选项</span>
          </div>
          <div class="content dtmain">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="匹配选项：" prop="match" class="matchMain">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminateMatch" v-model="matchCheckAll" @change="handleMatchCheckAllChange" :disabled="disabled">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                  <el-checkbox-group v-model="form.match" class="other" @change="handleMatchOptionsChange" :disabled="disabled">
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
                <el-form-item label="匹配选项：" prop="area" class="matchMain">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminateArea" v-model="areaCheckAll" @change="handleAreaCheckAllChange" :disabled="disabled">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                  <el-checkbox-group v-model="form.area" class="other" @change="handleAreaOptionsChange" :disabled="disabled">
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
                <el-form-item label="" class="clearfix">
                  <el-col :span="2">
                    <el-checkbox :indeterminate="isIndeterminateFactor" v-model="factorCheckAll" @change="handleFactorCheckAllChange" :disabled="disabled">全选</el-checkbox>
                  </el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="form.factor" @change="handleFactorOptionsChange" :disabled="disabled">
                      <el-checkbox v-for="(item, index) in form.factorOptions" :label="item.ttStatisticFactor.qsfName" :key="index"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { isValidInput, onlyNumberValidate, isValidMoney, isIpAddress, delDataValidInput } from '@/utils/formValidate.js'
import { getRinmName, getRicdName } from '@/api/common/industry'
import { getArea, country } from '@/api/common/citys'
import Treeselect from '@riophae/vue-treeselect'
import { isValidBlank } from '@/utils/formValidate.js'
import { initData, tplViewData } from '@/api/sys-monitoringAnalysis/dataQuery/templateManage'

export default {
  props: {
    tplId: String
  },
  components: {
    Treeselect
  },
  data() {
    const dataTableChecked = ['银行业大额交易'] // 默认选中状态
    const dataTableChecked2 = ['银行业可疑交易'] // 默认选中状态
    const dataTableReportChecked = [] // 默认选中状态
    const factorChecked = ['交易主体数', '账户数', '交易笔数', '本币金额', '外币金额', '单笔最大金额', '最早交易时间', '最晚交易时间'] // 统一配置选中
    return {
      props: { checkStrictly: true },
      disabled: true,
      defaultDisabled: true,
      title: this.$route.query.title,
      customerName: [{}],
      organOptions: [],
      selOptions: [],
      ttccs: {
        ukQttcc: '',
        qttcVal: '',
        qttcStartDate: '',
        qttcEndDate: '',
        qttcStartNum: '',
        qttcEndNum: ''
      },
      isIndeterminate: false, // 数据库表--大额全选状态
      isIndeterminate2: false, // 数据库表--可疑全选状态
      isIndeterminateOther: true, // 数据库表--其他全选状态
      isIndeterminateReport: false,
      dtReportCheckAll: true,
      dtCheckAll: true, // 数据库表全选
      dtCheckAll2: true, // 数据库表全选
      dtCheckAllOther: false, // 数据库表全选
      isIndeterminateMatch: false, // 匹配信息
      matchCheckAll: true, // 匹配信息
      isIndeterminateArea: false, // 地区匹配信息
      areaCheckAll: true, // 地区匹配信息
      isIndeterminateFactor: false, // 配置统计要素
      factorCheckAll: true, // 配置统计要素
      netOptions: [],
      rinmOptions: [],
      ricdOptions: [],
      countryData: [],
      form: {
        largeDisabled: true,
        crimeDisabled: true,
        reportDisabled: true,
        tradeDisabled: true,
        checkAllLarge: false,
        checkAllCrime: false,
        checkAllReport: false,
        checkAllTrade: false,
        regionDisabled: true,
        checkAllRegion: false,
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
      customResultvisible: false, // 定制
      tradeDialogVisible: false, // 报告
      reportListOptions: [],
      cityListOptions: [],
      value: [],
      linkRid: '',
      newTradeCheckList: [] // 保存选中的交易信息
    }
  },
  watch: {
    tplId(val) {
      if (val !== '') {
        this.getViewData()
      } else {
        this.getData()
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      initData() // 新增初始化数据
        .then(res => {
          if (res.code === 200) {
            this.handleDefault()

            this.isCountTableShow = false
            this.isOtherCountTableShow = false
            this.dataTableId = []
            this.disabled = true
            this.arr = []
            if (res.data.ttQsts.length !== 0) {
              res.data.ttQsts.map((item, index) => { // 数据库表
                if (item.scopeTable.pkQst === 'w_11' || item.scopeTable.pkQst === 'w_22' || item.scopeTable.pkQst === 'w_33' || item.scopeTable.pkQst === 'w_250') {
                  if (item.scopeTable.qstNameCh === '银行业大额交易') {
                    this.form.dtOptions.push(item) // 数据库表大额
                  }
                } else if (item.scopeTable.pkQst === 'w_44' || item.scopeTable.pkQst === 'w_55' || item.scopeTable.pkQst === 'w_66' || item.scopeTable.pkQst === 'w_100' || item.scopeTable.pkQst === 'w_120' || item.scopeTable.pkQst === 'w_140') {
                  if (item.scopeTable.qstNameCh === '银行业可疑交易') {
                    this.form.dtOptions2.push(item) // 数据库表可疑交易
                  }
                } else if (item.scopeTable.pkQst === 'w_77' || item.scopeTable.pkQst === 'w_88' || item.scopeTable.pkQst === 'w_99' || item.scopeTable.pkQst === 'w_160' || item.scopeTable.pkQst === 'w_180' || item.scopeTable.pkQst === 'w_200' || item.scopeTable.pkQst === 'w_220') {
                  this.form.dtOptionsReport.push(item) // 数据库表可以报告
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
                this.form.match.push(item.ttMatch.qttmNameCh)
              }
            })

            this.form.areaOptions = res.data.qttQttmAreas // 地区匹配
            this.form.areaOptions.map(item => {
              // 地区匹配
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
                  if (item.ttConditionColumn.status === 2 || item.ttConditionColumn.status === 3) {
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
            if (this.tplId !== '') {
              this.getViewData()
            }
          }
        })
        .catch(() => {})
    },
    remoteMethod(query) {
      if (query !== '' && query !== null) {
        getRinmName(query).then(res => {
          if (res.code === 200) {
            this.rinmOptions = res.data
          }
        })
      }
    },
    getRicdMethod(query, cb) {
      if (query !== '') {
        getRicdName(query).then(res => {
          if (res.code === 200) {
            this.ricdOptions = res.data
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
    clientRule(item, index) {
      if (item === undefined) return
      if (item[index].ttConditionColumn.qttccName === '账号') {
        const R = []
        R.push(
          { validator: isValidInput, trigger: 'blur' },
          { max: 64, message: '最大长度为64位', trigger: 'blur' }
        )
        return R
      } else if (item[index].ttConditionColumn.qttccName === '主体证件号码') {
        const R = []
        if (this.isDocument) {
          R.push({ validator: isValidInput, trigger: 'blur' }, { validator: onlyNumberValidate, trigger: 'blur' },
            { max: 18, message: '最大长度为18位', trigger: 'blur' }, { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式有误！', trigger: 'blur' })
        } else {
          R.push(
            { validator: isValidInput, trigger: 'blur' }, { max: 32, message: '最大长度为32位', trigger: 'blur' }
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
      }
    },
    Rules(item) {
      // 校验
      if (item === undefined) return

      const R = []
      if (item.ttConditionColumn.qttccName === '报告机构名称') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 200, message: '最大长度为200位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报告机构网点名称') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 200, message: '最大长度为200位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报告机构编码') {
        R.push({ validator: isValidInput, trigger: 'blur' }, { max: 15, message: '最大长度为15位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报告ID') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 100, message: '最大长度为100位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '报文名') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 50, message: '最大长度为50位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '业务标识号') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 256, message: '最大长度为256位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === 'IP地址') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { validator: isIpAddress, trigger: 'blur' }, { max: 500, message: '最大长度为500位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '交易品种代码') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 32, message: '最大长度为32位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '保险合同号') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 32, message: '最大长度为32位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '收付款方匹配号') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 500, message: '最大长度为500位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '联系电话') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { max: 30, message: '最大长度为20位', trigger: 'blur' })
      } else if (item.ttConditionColumn.qttccName === '交易金额') {
        R.push({ require: false, validator: isValidInput, trigger: 'blur' }, { validator: isValidMoney, trigger: 'blur' })
      }

      return R
    },
    getViewData() {
      // 查看返显
      const id = this.tplId

      tplViewData(id)
        .then(res => {
          if (res.code === 200) {
            this.$set(this.form, 'clientInfo', [])
            this.$set(this.form, 'tradeCheckList', [])
            this.$set(this.form, 'reportCheckList', [])
            this.$set(this.form, 'reportOptions', [])
            this.form.dataTable = []
            this.form.dataTable2 = []
            this.form.dataTableReport = []
            this.form.dataTableOther = []
            this.form.qttName = res.data.qttName // 模板名称
            this.creUser = res.data.creUser // 登录账号名称

            if (res.data.ttQsts.length !== 0) {
              res.data.ttQsts.map((item, index) => { // 数据库表
                if (item.scopeTable.pkQst === 'w_11' || item.scopeTable.pkQst === 'w_22' || item.scopeTable.pkQst === 'w_33' || item.scopeTable.pkQst === 'w_250') {
                  if (item.scopeTable.qstNameCh === '银行业大额交易') {
                    this.form.dataTable.push(item.scopeTable.qstNameCh) // 数据库表大额
                  }
                } else if (item.scopeTable.pkQst === 'w_44' || item.scopeTable.pkQst === 'w_55' || item.scopeTable.pkQst === 'w_66' || item.scopeTable.pkQst === 'w_100' || item.scopeTable.pkQst === 'w_120' || item.scopeTable.pkQst === 'w_140') {
                  if (item.scopeTable.qstNameCh === '银行业可疑交易') {
                    this.form.dataTable2.push(item.scopeTable.qstNameCh) // 数据库表可疑交易
                  }
                } else if (item.scopeTable.pkQst === 'w_77' || item.scopeTable.pkQst === 'w_88' || item.scopeTable.pkQst === 'w_99' || item.scopeTable.pkQst === 'w_160' || item.scopeTable.pkQst === 'w_180' || item.scopeTable.pkQst === 'w_200' || item.scopeTable.pkQst === 'w_220') {
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

            this.form.match = [] // 匹配
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

            this.form.area = [] // 地区匹配
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

            if (this.arr.length !== 0) { // 主体信息，报告交易，报告交易
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
            if (this.form.tradeCheckList.length !== 0) { // 判断返现是否选择当日，联系方式和国籍，交易日期不可选
              this.form.tradeCheckList.forEach(item => {
                /* if (item.ttConditionColumn.qttccName === '是否查询当日交易' && item.qttcVal === '是') {
                  this.disabled = true
                } else if (item.ttConditionColumn.qttccName === '是否查询当日交易' && item.qttcVal !== '是') {
                  this.disabled = false
                } */

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
                      this.form.checkAllRegion = true
                      this.form.regionDisabled = false
                    } else {
                      this.form.checkAllRegion = false
                      this.form.regionDisabled = true
                    }
                  } else {
                    this.form.checkAllRegion = false
                    this.form.regionDisabled = true
                  }
                }
              })
            }
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
    getParamsObj() {
      // 新增参数处理
      const customerInformations = this.getCustomerInformations() // 主体信息
      const matchObj = []
      this.form.match.forEach(item => {
        this.form.matchOptions.map(item2 => {
          if (item === item2.ttMatch.qttmNameCh) {
            matchObj.push({ uktQqqttm: item2.ttMatch.pkQttm })
          }
        })
      })

      const factorObj = [] // factorOptions
      this.form.factor.forEach(item => {
        this.form.factorOptions.map(item2 => {
          if (item === item2.ttStatisticFactor.qsfName) {
            factorObj.push({ uksQqq: item2.ttStatisticFactor.pkQsf })
          }
        })
      })

      const dTableObj = [] // 数据库表两部分
      const dTableSelect = []
      const dTableSelect2 = []
      this.form.dataTable.forEach(item => {
        this.form.dtOptions.map(item2 => {
          if (item === item2.scopeTable.qstNameCh) {
            dTableObj.push({ uksQttq: item2.scopeTable.pkQst })
            dTableSelect.push(item2)
          }
        })
      })
      const dTableObj2 = []
      this.form.dataTable2.forEach(item => {
        this.form.dtOptions2.map(item2 => {
          if (item === item2.scopeTable.qstNameCh) {
            dTableObj2.push({ uksQttq: item2.scopeTable.pkQst })
            dTableSelect2.push(item2)
          }
        })
      })

      dTableObj.push.apply(dTableObj, dTableObj2)
      dTableSelect.push.apply(dTableSelect, dTableSelect2)
      this.dTableData = dTableSelect
      const reportInfoObj = []
      this.form.reportCheckList.forEach((item, index) => {
        // 报告、交易信息
        reportInfoObj.push(this.getReportInfoObj(item))
      })
      this.form.tradeCheckList.forEach((item, index) => {
        // 报告、交易信息
        reportInfoObj.push(this.getReportInfoObj(item))
      })

      this.form.reportOptions.forEach((item, index) => {
        // 报告机构信息
        reportInfoObj.push(this.getReportInfoObj(item))
      })
      const paramsObj = {
        qttName: this.form.qttName,
        qttStatus: '0',
        creUser: '',
        qttQttms: matchObj,
        qttQsfs: factorObj,
        ttQsts: dTableObj,
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
    handleDefault() {
      // 恢复默认
      this.$set(this.form, 'clientInfo', [])
      this.$set(this.form, 'tradeCheckList', [])
      this.$set(this.form, 'reportCheckList', [])
      this.$set(this.form, 'reportOptions', [])

      const dataTableChecked = ['银行业大额交易'] // 默认选中状态
      const dataTableChecked2 = ['银行业可疑交易'] // 默认选中状态
      const dataTableReportChecked = [] // 默认选中状态
      const factorChecked = ['交易主体数', '账户数', '交易笔数', '本币金额', '外币金额', '单笔最大金额', '最早交易时间', '最晚交易时间'] // 统一配置选中
      this.disabled = true
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
      this.form.factorOptions = []
      this.form.clientOptions = []
      this.form.largeDisabled = true
      this.form.crimeDisabled = true
      this.form.reportDisabled = true
      this.form.tradeDisabled = true
      this.form.checkAllLarge = false // 大额特征一键删除参数
      this.form.checkAllCrime = false
      this.form.checkAllReport = false
      this.form.checkAllTrade = false
      this.form.regionDisabled = true
      this.form.checkAllRegion = false
      this.form.city = []
      this.form.interRegion = ''
      this.form.organNum = ''
      this.form.organName = []
      this.form.websiteName = ''
      this.form.dateValue = ''
      this.form.isNotStatistic = false // 是否仅统计
      this.form.redundancy = false // 是否剔重
      this.isIndeterminate = false // 数据库表--大额全选状态
      this.isIndeterminate2 = false // 数据库表--可疑全选状态
      this.isIndeterminateOther = true // 数据库表--其他全选状态
      this.isIndeterminateReport = false
      this.dtReportCheckAll = true
      this.dtCheckAll = true // 数据库表全选
      this.dtCheckAll2 = true // 数据库表全选
      this.dtCheckAllOther = false // 数据库表全选
      this.isIndeterminateMatch = false // 匹配信息
      this.matchCheckAll = true // 匹配信息
      this.isIndeterminateArea = false // 地区匹配信息
      this.areaCheckAll = true // 地区匹配信息
      this.isIndeterminateFactor = false // 配置统计要素
      this.factorCheckAll = true // 配置统计要素
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
    },
    handleCustomResult() {
      // 点击定制结果按钮
      const length = this.form.dataTable.length
      const length2 = this.form.dataTable2.length
      if (length === 0 && length2 === 0) {
        this.$confirm('请选择数据库表', '提示', { showCancelButton: false, type: 'warning' })
          .then(() => {
            // 向请求服务端删除
          })
          .catch(() => {})
      } else {
        const dtlist = [] // 收集交易
        const dtReportList = [] // 收集报告
        this.form.dataTable.forEach(item => {
          this.form.dtOptions.map(item2 => {
            if (item === item2.scopeTable.qstNameCh) {
              dtlist.push(item2.scopeTable.pkQst)
              dtReportList.push(item2.scopeTable.sign)
            }
          })
        })
        const dtlist2 = [] // 收集交易
        const dtReportList2 = [] // 收集报告
        this.form.dataTable2.forEach(item => {
          this.form.dtOptions2.map(item2 => {
            if (item === item2.scopeTable.qstNameCh) {
              dtlist2.push(item2.scopeTable.pkQst)
              dtReportList2.push(item2.scopeTable.sign)
            }
          })
        })

        dtlist.push.apply(dtlist, dtlist2)
        dtReportList.push.apply(dtReportList, dtReportList2)
        var isTrue = true
        var len = dtReportList.length
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            if (dtReportList.indexOf(dtReportList[i]) !== 0) { // 全部相同，可以全部为交易或者全部为报告
              isTrue = true // 既有报告又有交易
              break
            } else {
              if (dtReportList[i] === 1) { // 全部报告
                isTrue = false
              } else { // 全部交易
                isTrue = true
              }
            }
          }
        }
        if (isTrue) {
          this.linkRid = dtlist.toString()
          this.customResultvisible = true
        } else {
          this.$confirm('数据库表选择全部为报告，不需要定制结果', '提示', {
            showCancelButton: false,
            type: 'warning'
          })
            .then()
            .catch()
        }
      }
    },
    handleInterRegionChange(val) {
      // 地区
      if (val) {
        this.form.checkAllRegion = true
        this.form.regionDisabled = false
        if (val !== 'NAT') {
          this.getArea()
        } else if (val === 'NAT') {
          this.getCountry()
        }
      } else {
        this.form.checkAllRegion = false
        this.form.regionDisabled = true
      }

      this.form.city = []
    },
    getArea() {
      getArea() // 获取交易地址--国内
        .then(res => {
          if (res.code === 200) {
            this.cityListOptions = res.data
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
    handleCheckRegionChange(val, item) { // 地区前面复选框按钮
      if (!val) {
        this.form.regionDisabled = true
        this.form.interRegion = ''
        this.form.city = []
      }
    },
    handleDtCheckAllChange(val) { // 数据库表--大额（全选）
      const arr = []
      this.form.dtOptions.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTable = val ? arr : []
      this.isIndeterminate = false
    },
    handleDtoptionsChange(val) { // 数据库表--大额（单选）
      const checkedCount = val.length
      this.dtCheckAll = checkedCount === this.form.dtOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.form.dtOptions.length
    },
    handleDtCheckAllChange2(val) { // 数据库表--可疑交易（全选）
      const arr = []
      this.form.dtOptions2.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTable2 = val ? arr : []
      this.isIndeterminate2 = false
    },
    handleDtoptionsChange2(val) { // 数据库表--可疑交易（单选）
      const checkedCount = val.length
      this.dtCheckAll2 = checkedCount === this.form.dtOptions2.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.form.dtOptions2.length
    },
    handleDtReportCheckAllChange(val) { // 数据库表--可疑报告（全选）
      const arr = []
      this.form.dtOptionsReport.map(item => {
        arr.push(item.scopeTable.qstNameCh)
      })
      this.form.dataTableReport = val ? arr : []
      this.isIndeterminateReport = false
    },
    handleDtReportChange(val) { // 数据库表--可疑报告（单选）
      const checkedCount = val.length
      this.dtReportCheckAll = checkedCount === this.form.dtOptionsReport.length
      this.isIndeterminateReport = checkedCount > 0 && checkedCount < this.form.dtOptionsReport.length
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

.templateManage_add_t {
  .el-cascader__tags .el-tag > span{
    -webkit-box-flex:1;
    -ms-flex:none;
    flex:none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .radiowrap .el-form-item--small.el-form-item,
  .datewrap .el-form-item--small.el-form-item, 
  .inputwrap .el-form-item--small.el-form-item {
    // 报告交易表单高度一致
    height: 33px;
  }
  .btnalign {
    text-align: right;
    margin-top: 10px;
  }
  // 第一行查询模板样式
  .querymodel {
    margin-left: 20px;
    .el-form-item__label {
      font-weight: bold;
    }
  }
  .el-select-uwrap .el-select .el-tag:nth-child(2) {
    display: none;
  }
  .el-select-uwrap-two .el-select .el-tag:nth-child(3) {
    display: none;
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
    .subblocktitle .title {
      display: inline-block;
      width: 114px;
      font-size: 14px;
      padding: 10px 0;
      font-weight: bold;
      text-align: right;
    }
    .subblocktitle2 span {
      display: inline-block;
      font-size: 0.875em;
      padding-bottom: 10px;
      font-weight: bold;
    }
    .content {
      .el-checkbox {
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
      .dataMain .el-checkbox { // 数据库表样式 
        width: 20%;
        margin-left: 0px;
      }
      .dataMain .el-checkbox:nth-child(22) { // 数据库表样式 
        width: 80%;
      }
      .matchMain .el-checkbox { // 匹配选项样式
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
    .dtmain {
      // 数据库
      .el-checkbox {
        width: 170px;
      }
      .el-checkbox:nth-child(4n + 1) {
        margin-left: 0;
      }
    }
  }
  .el-dialog {
    .el-checkbox {
      margin-left: 30px;
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .infoWarp {
    cursor: pointer;
    // & {
    //   .closeBtn {
    //     display: none;
    //     position: absolute;
    //     right: 0;
    //     top: 0;
    //     z-index: 1000000;
    //   }
    // }
    // &:hover {
    //   .closeBtn {
    //     display: block;
    //   }
    // }
  }
}
</style>
