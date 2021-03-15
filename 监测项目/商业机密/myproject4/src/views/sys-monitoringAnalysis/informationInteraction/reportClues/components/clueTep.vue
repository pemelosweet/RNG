<template>
  <div class="reportLibraryHadle">
    
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      :disabled="$route.query.roles === 'center' || xtfInfo==='xtf'"
    >
      <div class="head">
        <el-form-item
          v-if="user_riid !== ''"
          label="分支行： "
          label-width="100px"
        >
          <el-input
            disabled
            v-model="form.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="线索名称： "
          label-width="100px"
          prop="clueName"
        >
          <el-input
            v-model="form.clueName"
            placeholder="请输入线索名称，最多输入50位"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <!-- <preliminary-judgment :lableWidth="100" ref="judgment" :propVal="'initJudge'" :judgmentInp1="judgmentInp1" :judgmentInp2="judgmentInp2" @judgment="getJudgment" :echoJudgment="reportCluePreJudgment" @judgmentOther="getJudgmentOther">
        </preliminary-judgment>-->
        <el-form-item
          label="初步判断："
          class="itme-block"
          label-width="100px"
          prop="preJudmentDoList"
          :rules="[{ required: true, message: '请至少选择一个涉罪类型', trigger: 'change' }]"
        >
          <el-select
            filterable
            v-model="form.preJudmentDoList"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in dialogJudgmentData"
              :key="index"
              :label="item.codeName"
              :value="item.codeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label
          class="itme-block"
          v-if="form.preJudmentDoList.indexOf('1401') !== -1"
          label-width="100px"
          prop="judicialOrAdministrativeInvestigation"
          :rules="[{validator: validateDept, trigger: 'blur'}]"
        >
          <el-input
            maxlength="100"
            v-model="form.judicialOrAdministrativeInvestigation"
            placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充，最多输入100字符"
          ></el-input>
        </el-form-item>
        <el-form-item
          label
          class="itme-block"
          v-if="form.preJudmentDoList.indexOf('1402') !== -1"
          label-width="100px"
          prop="suspectedOfOtherCrimes"
          :rules="[{validator: validateDept, trigger: 'blur'}]"
        >
          <el-input
            maxlength="100"
            v-model="form.suspectedOfOtherCrimes"
            placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充，最多输入100个字符"
          ></el-input>
        </el-form-item>
      </div>

      <div class="block">
        <el-row class="blckTitle">
          <el-col :span="12">
            <span>交易主体及交易对手基本情况</span>
          </el-col>
        </el-row>
        <div class="itemBlock">
          <el-form-item
            label="身份信息："
            label-width="100px"
            class="messageLine"
          >
            <el-row class="messageContent">
              <el-col :span="16">
                <el-upload
                  :action="IDCardUrl"
                  class="upload-btn"
                  :on-error="onError"
                  :on-success="onSuccess"
                  :show-file-list="false"
                  :accept="'.xlsx'"
                >
                  <el-button type>点击上传身份信息文件</el-button>
                </el-upload>
                <el-button
                  @click="downIDCard"
                  type="text"
                  icon="el-icon-download"
                >身份信息导入模板下载</el-button>
                <!-- <el-button type="primary">导入</el-button> -->
              </el-col>
              <el-col
                :span="8"
                style="textAlign:right"
              >
                <el-button
                  type
                  icon="el-icon-plus"
                  @click="addIdentity"
                >添加一行</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <div class="dataList">
            <el-table :data="form.IDCardData" style="width: 100%;">
              <el-table-column
                type="index"
                label="序号"
              ></el-table-column>
              <el-table-column label="姓名/单位名称">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'IDCardData.' + scope.$index + '.name'"
                    :rules="[{ validator: delDataValidInput,trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.name"
                      maxlength="50"
                      placeholder="请输入姓名/单位名称，最多输入50位"
                    >{{scope.$index}}</el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="证件类型">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'IDCardData.'+scope.$index+'.attachType'"
                    :rules="[{ required:true, message: '请选择证件类型',trigger: 'change'}]"
                  >
                    <el-select
                      v-model="scope.row.attachType"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index ) in attachTypeArr"
                        :key="index"
                        :value="item.codeId"
                        :label="item.codeName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="证件号码">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'IDCardData.'+scope.$index+'.attachContent'"
                    :rules="[{ required:true, message:'证件号码不能为空', trigger: 'blur'},
                  {validator: validateAgentNum, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.attachContent"
                      placeholder="请输入证件号码，最多输入128位"
                      maxlength="128"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="主体/对手"
                width="160"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'IDCardData.'+scope.$index+'.tradeType'"
                    :rules="[{required:true, message:'至少选择一个类型', trigger: 'change'}]"
                  >
                    <el-radio-group v-model="scope.row.tradeType">
                      <el-radio label="主体">主体</el-radio>
                      <el-radio label="对手">对手</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="delIdentity(scope.$index)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="itemBlock">
          <el-form-item
            label="账户信息："
            label-width="100px"
            class="messageLine"
          >
            <el-row class="messageContent">
              <el-col :span="16">
                <el-upload
                  :action="AccountUrl"
                  class="upload-btn"
                  :show-file-list="false"
                  :on-success="account_onSuccess"
                  :on-error="account_onError"
                  accept=".xlsx"
                >
                  <el-button>点击上传账户信息文件</el-button>
                </el-upload>
                <el-button
                  type="text"
                  icon="el-icon-download"
                  @click="downAccount"
                >账户信息导入模板下载</el-button>
                <!-- <el-button type="primary">导入</el-button> -->
              </el-col>
              <el-col
                :span="8"
                style="textAlign:right"
              >
                <el-button
                  type
                  icon="el-icon-plus"
                  @click="addAccount"
                >添加一行</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <div class="dataList">
            <el-table :data="form.accountData">
              <el-table-column
                type="index"
                label="序号"
              ></el-table-column>
              <el-table-column label="账户名称">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'accountData.'+scope.$index+'.accountName'"
                    :rules="[
                  { validator: spaceBarAndSpecial, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.accountName"
                      placeholder="请输入账户名称，最多输入50位"
                      maxlength="50"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="账户号码（卡号）">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'accountData.'+scope.$index+'.accountNum'"
                    :rules="[
                  { required: true, message: '账户号码不能为空', trigger: 'blur'},
                  { validator: validateNumber, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.accountNum"
                      placeholder="请输入账户号码（卡号），最多输入50位"
                      maxlength="50"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="开户行">
                <template slot-scope="scope">
                  <el-form-item
                    label-width="0"
                    :prop="'accountData.' + scope.$index + '.openBank'"
                    :rules="[{ validator: validateOpenBank, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.openBank"
                      placeholder="请输入开户行，最多输入50位"
                      maxlength="50"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="代办人名称">
                <template slot-scope="scope">
                  <el-form-item
                    label-width="0"
                    :prop="'accountData.' + scope.$index + '.agentName'"
                    :rules="[{ validator: spaceBarAndSpecial, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.agentName"
                      placeholder="请输入代办人名称，最多输入50位"
                      maxlength="50"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="代办人证件号">
                <template slot-scope="scope">
                  <el-form-item
                    label-width="0"
                    :prop="'accountData.' + scope.$index + '.agentNum'"
                    :rules="[
                  { validator: validateNumber, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.agentNum"
                      maxlength="50"
                      placeholder="请输入代办人证件号，最多输入50位"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="80px"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="delAccount(scope.$index)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="block">
        <el-row class="blckTitle">
          <el-col :span="12">
            <span>可疑交易基本情况</span>
          </el-col>
        </el-row>
        <div class="itemBlock">
          <div class="district">
             <el-form :model="form.rdesignAreas"   ref="rdesignAreas" label-width="100px" class="demo-dynamic" :disabled="$route.query.roles === 'center' || xtfInfo ==='xtf'">
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                    v-for="(city, index) in form.rdesignAreas.citys"
                    :label="index===0?'主要交易发生地：':''"
                    :key="city.key"
                    :prop="'citys.' + index + '.districtFlag'"
                    label-width="160px"
                    :rules="[{ required: true, message:'交易发生地不能为空',trigger: 'change'}]"
                    
                  >
                    <el-select
                      @change="countryOrProvince(city)"
                      v-model="city.districtFlag"
                      placeholder
                      class="districtFlag"
                    >
                      <el-option value="1" label="省份"></el-option>
                      <el-option value="2" label="国家"></el-option>
                    </el-select>
                      
                  </el-form-item>
                  </el-col>
                  <el-col :span="8">
                  <el-form-item
                     label-width="0px"
                    v-for="(city, index) in form.rdesignAreas.citys"
                    :key="index"
                    :prop="'citys.' + index + '.district'"
                    :rules="[{ required:true, message: '请选择交易发生地',trigger: 'change'}]"
                  >
                    <el-select
                      v-if="city.districtFlag==='2'"
                      v-model="city.district"
                      placeholder="请选择"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="(item,index) in countryData"
                        :key="index"
                        :label="item.chSName"
                        :value="item.numCode"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-else
                      v-model="city.district"
                      placeholder="请选择"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="(item,index) in provinceData"
                        :key="index"
                        :label="item.codeName"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                  <el-col :span="8">
                  <el-form-item 
                    label-width="0px"
                    v-for="(city, index) in form.rdesignAreas.citys"
                    :key="index"
                    :rules="[{validator: validateDept, trigger: 'blur'}]"
                    :prop="'citys.' + index + '.city'"
                  >
                    <el-input
                      v-if="city.districtFlag==='1'"
                     style="width:70%"
                      maxlength="20"
                      class="city"
                      v-model="city.city"
                      placeholder="市,最长20字符"
                    ></el-input>
                    <el-button v-if="index>0" style="margin-left:0"  @click.prevent="removecity(city)" icon="el-icon-remove-outline"></el-button>
                    <el-button    @click="addcity" icon="el-icon-circle-plus-outline"></el-button>
                  </el-form-item>
                </el-col>
                </el-row>
            </el-form>
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item
                  label="交易发生地："
                  label-width="120px"
                  prop="reportClueDistrictDos.districtFlag"
                  :rules="[{ required: true, message: '请选择交易发生地',trigger: 'change'}]"
                >
                  <el-select
                    @change="countryOrProvince"
                    v-model="form.reportClueDistrictDos.districtFlag"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      value="1"
                      label="省份"
                    ></el-option>
                    <el-option
                      value="2"
                      label="国家"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  prop="reportClueDistrictDos.district"
                  :rules="[{ required:true, message: '请选择交易发生地',trigger: 'change'}]"
                >
                  <el-select
                    v-if="form.reportClueDistrictDos.districtFlag=='2'"
                    v-model="form.reportClueDistrictDos.district"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="(item,index) in countryData"
                      :key="index"
                      :label="item.chSName"
                      :value="item.numCode"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-else
                    v-model="form.reportClueDistrictDos.district"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="(item,index) in provinceData"
                      :key="index"
                      :label="item.codeName"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  prop="reportClueDistrictDos.city"
                  :rules="[{validator: validateDept, trigger: 'blur'}]"
                >
                  <el-input
                    maxlength="50"
                    v-if="form.reportClueDistrictDos.districtFlag=='1'"
                    class="city"
                    style="width:100%"
                    v-model="form.reportClueDistrictDos.city"
                    placeholder="市，最多输入50位"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
          </div>
          <div>
            <el-form-item
              label="分析概述："
              label-width="160px"
              prop="analysisDes"
            >
              <el-input
                v-model="form.analysisDes"
                placeholder="请选择分析概述，最多输入4000位"
                type="textarea"
                :rows="4"
                maxlength="4000"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="block">
        <el-row class="blckTitle">
          <el-col :span="12">
            <span>线索处理情况</span>
          </el-col>
        </el-row>
        <div class="itemBlock">
          <div>
            <el-form-item
              label="线索处理情况："
              label-width="120px"
              prop="clueState"
            >
              <el-radio-group v-model="form.clueState">
                <el-radio label="1">仅移送</el-radio>
                <el-radio label="2">立案</el-radio>
                <el-radio label="3">破案</el-radio>
                <el-radio label="4">撤案</el-radio>
                <el-radio label="5">不予立案</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="报告时间 ："
                  label-width="120px"
                  ref="refTransferTime"
                  prop="transferTime"
                  :rules="[{ required: isTransfer, message: '时间不能为空', trigger: 'change' }]"
                >
                  <el-date-picker
                    style="width:100% !important;"
                    v-model="form.transferTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    :placeholder="isShowChromeTip ? '' : '选择时间'"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="立案时间 ："
                  label-width="120px"
                  ref="refRegisterTime"
                  prop="registerTime"
                  :rules="[{ required: isRegister, message: '时间不能为空', trigger: 'change' }]"
                >
                  <el-date-picker
                    style="width:100% !important;"
                    v-model="form.registerTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    :placeholder="isShowChromeTip ? '' : '选择时间'"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="结案时间 ："
                  label-width="120px"
                  ref="refEndTime"
                  prop="endTime"
                  :rules="[{ required: isEnd, message: '时间不能为空', trigger: 'change' }]"
                >
                  <el-date-picker
                    style="width:100% !important;"
                    v-model="form.endTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    :placeholder="isShowChromeTip ? '' : '选择时间'"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="立案名目 ："
                  label-width="120px"
                  prop="registerDes"
                  :rules="[{ required: isRegister, message: '立案名目不能为空', trigger: 'blur' }, { validator:validateDes, trigger: 'blur' }]"
                >
                  <el-input
                    v-model="form.registerDes"
                    placeholder="请输入立案名目，最多输入50位"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="接收部门 ："
                  label-width="120px"
                  prop="reviceDept"
                  :rules="[{ required: isTransfer, message: '接收部门不能为空', trigger: 'blur' }, { validator:validateDept, trigger: 'blur' }]"
                >
                  <el-input
                    v-model="form.reviceDept"
                    placeholder="请选择接收部门，最多输入50位"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="涉案金额 ："
                  label-width="120px"
                  prop="cart"
                  :rules=" [
            { required: isEnd, message: '涉案金额不能为空', trigger: 'blur' }, { validator:isValidMoney, trigger: 'blur' }
          ]"
                >
                  <el-input
                    v-model="form.cart"
                    placeholder="请输入涉案金额，最多输入20位"
                    maxlength="20"
                    style="width:80%;"
                  ></el-input>
                  万元
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div>
            <el-form-item
              label="案件侦破情况："
              label-width="120px"
              prop="caseNote"
            >
              <el-input
                v-model="form.caseNote"
                placeholder="请输入案件侦破情况，最多输入500位"
                type="textarea"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>

          <div>
            <el-form-item
              label="专项行动或专案要案名称："
              label-width="120px"
            >
              <el-input
                v-model="form.caseName"
                placeholder="请输入专项行动或专案要案名称，最多输入500位"
                type="textarea"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              label="领导批示及有关对线索的评价："
              label-width="120px"
            >
              <el-input
                v-model="form.evaluation"
                placeholder="请输入领导批示及有关对线索的评价，最多输入500位"
                type="textarea"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              label="案件总结："
              label-width="120px"
            >
              <el-input
                v-model="form.experience"
                placeholder="请输入案件总结，最多输入500位"
                type="textarea"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>

          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item
                  label="填报联系人："
                  label-width="120px"
                  prop="createUser"
                >
                  <el-input
                    v-model="form.createUser"
                    placeholder="请输入填报联系人，最多输入50位"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="电话："
                  label-width="120px"
                  prop="createUserTel"
                >
                  <el-input
                    v-model="form.createUserTel"
                    placeholder="请输入电话，最多输入15位"
                    maxlength="15"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="审核人："
                  label-width="120px"
                  prop="auditingUser"
                >
                  <el-input
                    v-model="form.auditingUser"
                    placeholder="请输入审核人，最多输入50位"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="电话："
                  label-width="120px"
                  prop="auditingUserTel"
                >
                  <el-input
                    v-model="form.auditingUserTel"
                    placeholder="请输入电话，最多输入15位"
                    maxlength="15"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div v-loading="uploadLoading" element-loading-text="文件正在上传，请耐心等待">
            <el-form-item
              label="附件："
              label-width="120px"
            >
              <el-row class="uploadContent">
                <el-col :span="20">
                  <el-upload
                    :action="attachUrl"
                    :on-error="onError"
                    :on-success="attach_onSuccess"
                    multiple
                    :on-progress="onProgress"
                    :on-preview="onPreview"
                    :show-file-list="true"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileList"
                    :on-remove="handleRemove"
                  >
                    <el-button type>点击上传附件</el-button>
                  </el-upload>
                  <!-- <el-button type="primary">上传</el-button> multiple-->
                </el-col>
                <!-- <el-col :span="18" class="fileList">
                  <ul style="margin-left:18px">
                    <li v-for="(item,index) in reportClueAttachDos" :key="index">
                      <span>附件{{index+1}}：</span>{{item.attachName}}
                    </li>

                  </ul>

                </el-col>-->
              </el-row>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否共享：" label-width="120px" prop="shareState">
                  <el-select v-model="form.shareState" placeholder="是否共享给其他分支行">
                    <el-option value="1" label="是"></el-option>
                    <el-option value="0" label="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="70%"
      >
        <span v-html="dataMessage"></span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dataMessageOn"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-form>
    <div class="saveBtn" v-if="xtfInfo==='xtf'">
      <!-- <el-button type="primary" plain @click="routerBack">返 回</el-button> -->
    </div>
    <div class="saveBtn" v-else>
      <el-button v-if="$route.query.state !== '已提交' && roles === 'branch' && this.$route.query.roles === 'branch' || $route.query.state !== '已提交' && roles === 'branch' && this.$route.query.roles === undefined" type="primary" @click="submitForm('编辑中')"  :loading="loading">保 存</el-button>
      <el-button v-if="roles === 'branch' && this.$route.query.roles === 'branch' || roles === 'branch' && this.$route.query.roles === undefined" type="primary" @click="submitForm('已提交')"  :loading="loading">提 交</el-button>
      <el-button type="primary" plain @click="go2Bck">返 回</el-button>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import {
  dictionary,
  province,
  country
} from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { newBranch } from '@/api/sys-monitoringAnalysis/conjointAnalysis/index.js'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
import { saveClue, putClue, delAttach, approve, getDeptName } from '@/api/sys-monitoringAnalysis/report-clues/search.js'
import { commonPattern, spaceBarAndSpecial } from '@/utils/formValidate'
// import { isChinaNull } from '@/utils/formValidate.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    preliminaryJudgment
  },
  props: {
    clueData: {
      type: Object
    },
    xtfInfo: {
      type: String
    }
  },
  data() {
    return {
      pickerMinDate: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime()
          if (maxDate) {
            this.pickerMinDate = ''
          }
        },
        disabledDate: (time) => {
          if (this.pickerMinDate !== '') {
            const day30 = (30 - 1) * 24 * 3600 * 1000
            let maxTime = this.pickerMinDate + day30
            if (maxTime > new Date()) {
              maxTime = new Date()
            }
            return time.getTime() > maxTime
          }
          return time.getTime() > Date.now()
        }
      },
      spaceBarAndSpecial: spaceBarAndSpecial,
      cityFlag: false,
      uploadLoading: false,
      dialogVisible: false,
      dataMessage: '',
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im, // 校验空格
      fileList: [],
      // attachUrl: `http://192.168.50.77:8771/monitor/reportClue/upAttach`,
      isReplenishOther: false,
      loading: false,
      isReplenish: false,
      dialogJudgmentData: [],
      isTransfer: false, // 仅报告
      isRegister: false, // 立案
      isEnd: false, // 结案
      isDetection: false, // 破案
      clueNo: '', // 线索编号
      judgmentInp1: '', // 初步判断1401 input
      judgmentInp2: '', // 初步判断1402 input
      id: '',
      deptName: '',
      form: {
        deptName: '',
        caseName: '',
        evaluation: '',
        experience: '',
        suspectedOfOtherCrimes: '', // 1402
        judicialOrAdministrativeInvestigation: '', // 1401
        preJudmentDoList: [],
        currentState: '',
        clueName: '',
        rdesignAreas: {
          citys: [{
            districtFlag: '',
            district: '',
            city: ''
          }]
        },
        initJudge: [],
        IDCardData: [], // 身份信息
        accountData: [], // 账号信息
        reportClueDistrictDos: {
          district: '',
          city: '',
          districtFlag: ''
        },
        analysisDes: '',
        createUserId: '',
        clueState: '',
        shareState: '',
        transferTime: '',
        registerTime: '',
        endTime: '',
        registerDes: '',
        reviceDept: '',
        cart: '',
        caseNote: '',
        createUser: '',
        createUserTel: '',
        auditingUser: '',
        auditingUserTel: '',
        preliminaryJudgmentInp1: '', // 1401
        preliminaryJudgmentInp2: '' // 1402
      },
      currentState: '', // 当前状态
      attachTypeArr: [],
      reportCluePreJudgment: [], // 回显的数据
      provinceData: [], // 省份数据
      countryData: [], // 国家数据
      reportClueAttachDos: [], // 附件参数
      isShowBtn: true, // 保存按钮是否显示
      // 校验数据
      rules: {
        clueName: [
          { required: true, message: '请输入线索名称', trigger: 'blur' },
          { validator: this.validateAgentName, trigger: 'blur' }
        ],
        initJudge: [
          { type: 'array', required: true, message: '请至少选择一个类型', trigger: 'change' }
        ],
        reportClueDistrictDos: {
          district: [{ required: true, message: '交易发生地不能为空', trigger: 'blur' }]
        },

        clueState: [{ required: true, message: '至少选择一种线索情况', trigger: 'change' }],
        shareState: [{ required: true, message: '请选择是否共享给其他分支行', trigger: 'change' }],
        // caseNote: [{ required: true, message: '接收部门不能为空', trigger: 'blur' }],
        createUser: [
          { required: true, message: '填报联系人不能为空', trigger: 'blur' },
          { validator: spaceBarAndSpecial, trigger: 'blur' }
        ],
        // createUserTel: [
        //   { validator: this.validateAgentName, trigger: 'blur' }
        // { required: true, message: '电话不能为空', trigger: 'blur' },
        // { validator: isChinaNull, trigger: 'blur' }
        // ],
        auditingUser: [
          { required: true, message: '审核人不能为空', trigger: 'blur' },
          { validator: spaceBarAndSpecial, trigger: 'blur' }
        ]
        // auditingUserTel: [
        //   { validator: this.validateAgentName, trigger: 'blur' }
        // { required: true, message: '电话不能为空', trigger: 'blur' },
        // { validator: isChinaNull, trigger: 'blur' }
        // ]
      },
      token: getToken()
    }
  },
  computed: {
    ...mapGetters(['name', 'user_riid', 'roles']),
    isShowChromeTip() {
      const USER_AGENT = navigator.userAgent.toLowerCase()
      const isChrome = /.*(chrome)\/([\w.]+).*/
      return !isChrome.test(USER_AGENT)
    },
    pre_clueState() {
      return this.form.clueState
    },
    IDCardUrl() {
      return `/monitor/reportClue/upFileTradeMain?token=${this.token}`
    },
    AccountUrl() {
      return `/monitor/reportClue/upFileTradeAccount?token=${this.token}`
    },
    attachUrl() {
      return `/monitor/reportClue/upAttach?token=${this.token}&clueId=${this.id}`
    },

    paramsObj() {
      const obj = Object.assign({}, this.form)
      delete obj.initJudge
      delete obj.IDCardData
      delete obj.accountData
      delete obj.reportClueDistrictDos
      delete obj.preliminaryJudgmentInp1
      delete obj.preliminaryJudgmentInp2
      for (var i = 0; i < obj.preJudmentDoList.length; i++) {
        if (obj.preJudmentDoList[i].indexOf('1401') !== -1) {
          obj.preJudmentDoList[i] = '1401-' + obj.judicialOrAdministrativeInvestigation
        }
        if (obj.preJudmentDoList[i].indexOf('1402') !== -1) {
          obj.preJudmentDoList[i] = '1402-' + obj.suspectedOfOtherCrimes
        }
      }
      obj.reportClueDistrictDos = obj.rdesignAreas.citys
      obj.preliminaryJudgmeStr = obj.preJudmentDoList.join()
      delete obj.preJudmentDoList
      delete obj.suspectedOfOtherCrimes
      delete obj.judicialOrAdministrativeInvestigation
      // obj.reportClueDistrictDos = []
      // obj.reportClueDistrictDos.push(JSON.parse(JSON.stringify(this.form.reportClueDistrictDos)))
      obj.reportClueTradeMainDos = JSON.parse(JSON.stringify(this.form.IDCardData))
      obj.reportClueTradeAccountDos = JSON.parse(JSON.stringify(this.form.accountData))
      // obj.reportClueAttachDos = JSON.parse(JSON.stringify(this.reportClueAttachDos))
      obj.flag = false
      return obj
    }
  },
  created() {

  },
  watch: {
    pre_clueState(val) {
      switch (val) {
        case '1':
          this.whoIsValid('isTransfer')
          break
        case '2':
          this.whoIsValid('isRegister')
          break
        case '3':
          this.whoIsValid('isEnd')
          break
        case '4':
          this.whoIsValid('isDetection')
          break
        case '5':
          this.whoIsValid('isDetection')
          break
        default:
          break
      }
    },
    clueData: {
      handler() {
        this.clueData instanceof Object && this.echoCule(this.clueData)
      }
      // deep: true
    }
  },
  destroyed() {
    if (this.$route.name !== 'reportClues_index') {
      if (sessionStorage.getItem('sessionMemoryJyl')) {
        sessionStorage.removeItem('sessionMemoryJyl')
      }
    }
  },
  mounted() {
    newBranch('SFZJ').then(res => {
      if (res.code === 200) {
        this.attachTypeArr = res.data
      }
    })
    this.getDictionary('TOSC')
    this.getProvince()
    this.getCountry()
    if (this.$route.params.type === 'new') {
      this.getDeptName()
    }
  },

  methods: {
    getDeptName() {
      getDeptName().then(res => {
        if (res.code === 200) {
          this.form.deptName = res.data
        }
      })
    },
    approve(val) {
      const obj = {
        clueId: this.$route.params.id,
        currentState: val
      }
      approve(obj).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '审批提交成功',
            type: 'success'
          })
          this.$router.push({ name: 'reportClues_index' })
        }
      })
    },
    // 设置文件大小和格式
    beforeAvatarUpload(file) {
      // var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      // const extension = testmsg === 'xls'
      // const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 500
      // if (!extension && !extension2) {
      //   this.$message({
      //     message: '上传文件只能是 xls、xlsx格式!',
      //     type: 'warning'
      //   })
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'warning'
        })
      }
      return isLt2M
    },
    // 校验只能输入数字
    validateNumber(rule, value, callback) {
      // if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
      //   callback(new Error('禁止输入特殊字符'))
      // } else if (this.blankSpace.test(value)) {
      //   callback(new Error('禁止输入空格'))
      // } else if (this.chinaNull.test(value)) {
      //   callback(new Error('禁止输入中文'))
      // } else if (this.englishNull.test(value)) {
      //   callback(new Error('禁止输入英文'))
      // } else {
      //   callback()
      // }
      if (value !== null && value !== '' && value !== undefined) {
        if (value.length <= 5 || value.length >= 129) {
          callback(new Error('内容应在6-128位之间'))
        } else if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    validateKong(rule, value, callback) {
      if (this.form.clueState === '4' && this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else {
        callback()
      }
    },
    // 校验身份证号位数及特殊字符空格中英文
    validateAgentNum(rule, value, callback) {
      const arr = rule.field.split('.')
      const newStr = Number(arr[1])
      if (value !== null && value !== '' && value !== undefined) {
        if (
          this.form.IDCardData[newStr].attachType ===
          '110001' ||
        this.form.IDCardData[newStr].attachType ===
          '110003'
        ) {
          if (value.length !== 15 && value.length !== 18) {
            callback(new Error('身份证件格式标准为15及18位'))
          } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
            callback(new Error('禁止输入特殊字符'))
          } else if (this.blankSpace.test(value)) {
            callback(new Error('禁止输入空格'))
          } else if (this.chinaNull.test(value)) {
            callback(new Error('禁止输入中文'))
          } else {
            callback()
          }
        } else {
          if (value.length <= 5 || value.length >= 129) {
            callback(new Error('内容应在6-128位之间'))
          } else if (commonPattern.headerAndFooter.test(value)) {
            callback(new Error('首尾不能有空格'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    validateAgentName(rule, value, callback) {
      if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else {
        callback()
      }
    },
    delDataValidInput(rule, value, callback) {
      if (commonPattern.specialDataName.test(value) || commonPattern.specialEngDataName.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else {
        callback()
      }
    },
    validateOpenBank(rule, value, callback) {
      if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else if (this.numberNull.test(value)) {
        callback(new Error('禁止输入数字'))
      } else {
        callback()
      }
    },
    validateDept(rule, value, callback) {
      if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else {
        callback()
      }
    },
    validateDept1(rule, value, callback) {
      if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else {
        callback()
      }
    },
    validateDes(rule, value, callback) {
      if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else {
        callback()
      }
    },
    // 判断是否显示补充
    replenish() {
      // alert(this.form.preJudmentDoList.length)
      if (this.form.preJudmentDoList.indexOf('1402') !== -1) {
        this.isReplenish = true
      } else {
        this.isReplenish = false
      }
      if (this.form.preJudmentDoList.indexOf('1401') !== -1) {
        this.isReplenishOther = true
      } else {
        this.isReplenishOther = false
      }

      // this.form.preJudmentDoList.forEach(el => {
      //   if (el === '1402') {
      //     this.isReplenish = true
      //   } else if (el !== '1402' || this.form.preJudmentDoList.length === 0) {
      //     this.isReplenish = false
      //   }
      // })
    },
    // 初步判断下拉获取数据
    // dictionaryFn(params) {
    //   dictionary(params).then(res => {
    //     if (res.code === 200) {
    //       switch (params) {
    //         case 'TOSC':
    //           this.dialogJudgmentData = res.data
    //           break

    //         default:
    //           break
    //       }
    //     }
    //   })
    // },
    //
    // 获取初步判断其它
    getJudgmentOther(val1, val2) {
      this.form.preliminaryJudgmentInp1 = val1
      this.form.preliminaryJudgmentInp2 = val2
    },
    // 回显线索
    echoCule(echoClueObj) {
      // 回显初步判断
      if (echoClueObj.length === 0 || echoClueObj === null) {
        this.form = {
          suspectedOfOtherCrimes: '', // 1402
          judicialOrAdministrativeInvestigation: '', // 1401
          preJudmentDoList: [],
          currentState: '',
          clueName: '',
          initJudge: [],
          IDCardData: [], // 身份信息
          accountData: [], // 账号信息
          reportClueDistrictDos: {
            district: '',
            city: '',
            districtFlag: ''
          },
          analysisDes: '',
          createUserId: '',
          clueState: '',
          transferTime: '',
          registerTime: '',
          endTime: '',
          registerDes: '',
          reviceDept: '',
          cart: '',
          caseNote: '',
          createUser: '',
          createUserTel: '',
          auditingUser: '',
          auditingUserTel: '',
          preliminaryJudgmentInp1: '', // 1401
          preliminaryJudgmentInp2: '' // 1402
        }
        setTimeout(() => {
          this.$refs.ruleForm.clearValidate()
        }, 0)
      } else {
        this.id = echoClueObj.clueId === null ? '' : echoClueObj.clueId
        this.form.clueName = echoClueObj.clueName
        this.form.IDCardData = echoClueObj.reportClueTradeMainDos
        this.form.accountData = echoClueObj.reportClueTradeAccountDos
        // this.form.reportClueDistrictDos =
        //   echoClueObj.reportClueDistrictDos.length > 0
        //     ? echoClueObj.reportClueDistrictDos[0]
        //     : this.form.reportClueDistrictDos
        this.form.analysisDes = echoClueObj.analysisDes
        this.form.clueState = echoClueObj.clueState
        this.form.transferTime = echoClueObj.transferTime
        this.form.registerTime = echoClueObj.registerTime
        this.form.createUserId = echoClueObj.createUserId
        this.form.endTime = echoClueObj.endTime
        var obj = {}
        obj.citys = echoClueObj.reportClueDistrictDos
        this.form.rdesignAreas = obj
        if (echoClueObj.showDeptName) {
          this.form.deptName = echoClueObj.showDeptName
        } else {
          this.getDeptName()
        }

        console.log(this.form.rdesignAreas)

        // this.form.endTime = '2019-01-02'
        this.form.caseName = echoClueObj.caseName
        this.form.evaluation = echoClueObj.evaluation
        this.form.experience = echoClueObj.experience
        this.form.registerDes = echoClueObj.registerDes
        this.form.reviceDept = echoClueObj.reviceDept
        this.form.cart = echoClueObj.cart
        this.form.caseNote = echoClueObj.caseNote
        this.form.createUser = echoClueObj.createUser
        this.form.createUserTel = echoClueObj.createUserTel
        this.form.auditingUser = echoClueObj.auditingUser
        this.form.auditingUserTel = echoClueObj.auditingUserTel
        this.form.shareDt = echoClueObj.shareDt
        this.form.shareState = echoClueObj.shareState
        this.reportClueAttachDos = echoClueObj.attachDoList === null ? [] : echoClueObj.attachDoList
        if (echoClueObj.attachDoList.length > 0) {
          echoClueObj.attachDoList.forEach(el => {
            this.fileList.push({
              name: el.attachName,
              url: el.attachPath,
              id: el.attachId
            })
          })
        } else {
          this.fileList = []
        }

        this.currentState = echoClueObj.currentState
        if (this.currentState === '已提交') {
          this.isShowBtn = false
        }
        if (echoClueObj.reportCluePreJudgmentDos[0].preliminaryJudgme !== null) {
          echoClueObj.reportCluePreJudgmentDos.forEach(item => {
            // suspectedOfOtherCrimes: '', // 1402
            // judicialOrAdministrativeInvestigation: '', // 1401
            if (item.preliminaryJudgme.indexOf('1401') !== -1) {
              const tempArr = item.preliminaryJudgme.split('-')
              this.form.judicialOrAdministrativeInvestigation = tempArr[1]
              this.form.preJudmentDoList.push('1401')
            } else if (item.preliminaryJudgme.indexOf('1402') !== -1) {
              const tempArr = item.preliminaryJudgme.split('-')
              this.form.suspectedOfOtherCrimes = tempArr[1]
              this.form.preJudmentDoList.push('1402')
            } else {
              this.form.preJudmentDoList.push(item.preliminaryJudgme)
            }
          })
        }
      }
    },
    // 获取省份
    getProvince() {
      province().then(res => {
        if (res.code === 200) {
          this.provinceData = res.data
        }
      })
    },
    // 获取省份
    getCountry() {
      country().then(res => {
        if (res.code === 200) {
          res.data.list = res.data.list.filter(item => {
            return item.numCode !== '344' && item.numCode !== '446' && item.numCode !== '158'
          })
          this.countryData = res.data.list
          // for (var i = 0; i < this.countryData.length; i++) {
          //   if (this.countryData[i].chSName.indexOf('省份') !== -1) {
          //     this.countryData.splice(i, 1)
          //   }
          // }
        }
      })
    },
    removecity(item) {
      var index = this.form.rdesignAreas.citys.indexOf(item)
      if (index !== -1) {
        this.form.rdesignAreas.citys.splice(index, 1)
      }
    },
    addcity() {
      const obj = {
        districtFlag: '',
        district: '',
        city: ''
      }
      this.form.rdesignAreas.citys.push(obj)
    },
    // 国家或者省份
    countryOrProvince(val) {
      val.district = ''
      val.city = ''
      this.form.reportClueDistrictDos.district = ''
    },
    // 获取子组件发射的信息  --- 初步判断
    getJudgment(val) {
      this.form.initJudge = val
    },

    // 下载身份证信息
    downIDCard() {
      location.href = `/monitor/reportClue/downloadTradeMain?moduleName=${encodeURI('上报线索库')}&token=${this.token}`
    },

    // 上传回显身份证信息 --Success
    onSuccess(response, file, fileList) {
      if (response.code === 200) {
        response.data.forEach(item => {
          this.form.IDCardData.push(item)
        })
        this.successOrError('上传成功', 'success')
      } else if (response.code === 205) {
        this.successOrError(response.message, 'info')
      } else {
        this.successOrError('上传失败', 'info')
      }
    },
    // 上传回显身份证信息-- Error
    onError() {
      this.uploadLoading = false
      this.successOrError('上传失败', 'info')
    },
    // 添加身份信息
    addIdentity() {
      const hold = {
        name: '',
        attachType: '',
        attachContent: '',
        tradeType: ''
      }
      this.form.IDCardData.push(hold)
    },
    // 删除某条身份信息
    delIdentity(index) {
      this.$confirm('确定要删除数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.IDCardData.splice(index, 1)
          this.successOrError('删除成功过 !', 'success')
        })
        .catch(() => {})
    },
    // 删除附件
    handleRemove(file, fileList) {
      if (file && file.status === 'success') {
        if (file.response) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?moduleName=' + encodeURI('上报线索库')
        } else if (file.id) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.id + '?moduleName=' + encodeURI('上报线索库')
        }
        delAttach('', this.delUrl).then(res => {
          this.$message({
            message: '删除附件成功',
            type: 'success'
          })
        })
      }
    },
    // 下载账户模板
    downAccount() {
      location.href = `/monitor/reportClue/downloadTradeAccount?moduleName=${encodeURI('上报线索库')}&token=${this.token}`
    },
    onPreview(file) {
      console.log(file)
      location.href = `/file-service/upload/download/${file.id}?moduleName=${encodeURI('上报线索库')}`
    },
    // 上传账号信息 --Success
    account_onSuccess(response, file, fileList) {
      if (response.code === 200) {
        response.data.forEach(item => {
          this.form.accountData.push(item)
        })
        this.successOrError('上传成功', 'success')
      } else if (response.code === 205) {
        this.successOrError(response.message, 'info')
      } else {
        this.successOrError('上传失败', 'info')
      }
    },
    // 上传账号信息 --Error
    account_onError() {
      this.successOrError('上传失败', 'info')
    },
    // 添加账户信息
    addAccount() {
      const hold = {
        accountName: '',
        accountNum: '',
        openBank: '',
        agentName: '',
        agentNum: ''
      }
      this.form.accountData.push(hold)
    },
    // 删除某条账户信息
    delAccount(index) {
      this.$confirm('确定要删除数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.accountData.splice(index, 1)
          this.$message({
            message: '删除成功 ！',
            type: 'success'
          })
        })
        .catch(() => {})
    },
    // 金额校验
    isValidMoney(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

      if (this.isEnd) {
        if (value > 99999999999999999999) {
          callback(new Error('最多输入20位!'))
          return
        }
        if (value === '') {
          callback(new Error('内容不能为空'))
        } else if (this.blankSpace.test(value)) {
          callback(new Error('禁止输入空格'))
        } else if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
          callback(new Error('禁止输入特殊字符'))
        } else if (!money.test(value)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },

    // whoIsValid 谁应该验证
    whoIsValid(type) {
      this.isTransfer = false
      this.isRegister = false
      this.isEnd = false
      this.isDetection = false
      this[type] = true
    },
    onProgress() {
      this.uploadLoading = true
    },
    // 附件上传
    attach_onSuccess(response, file, fileList) {
      if (response.code === 200) {
        if (this.id === '') {
          this.id = response.data.noteId
        }
        // this.id = response.data.noteId
        // this.attachList = fileList
        this.reportClueAttachDos.push({
          attachName: file.name

        })
        this.uploadLoading = false
        this.successOrError('上传成功', 'success')
      } else {
        this.$message({
          message: response.message,
          type: 'error'
        })
        fileList.pop()
        this.uploadLoading = false
      }
    },
    dataMessageOn() {
      const obj = Object.assign({}, this.paramsObj)
      obj.flag = true
      saveClue(obj).then(res => {
        if (res.code === 200) {
          this.successOrError('操作成功', 'success')
          this.$router.push({ name: 'reportClues_index' })
        }
      })
      this.dialogVisible = false
    },
    //  保存线索库
    submitForm(type) {
      this.$refs.rdesignAreas.validate(valid => {
        if (valid) {
          this.cityFlag = true
        } else {
          this.cityFlag = false
        }
      })
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.cityFlag) {
          this.loading = true
          // 为新建线索库
          if (this.$route.params.type === 'new' || this.$route.query.type === 'import') {
            this.paramsObj.currentState = type
            this.paramsObj.clueId = this.id
            saveClue(this.paramsObj).then(res => {
              if (res.code === 200) {
                this.loading = false
                this.successOrError('操作成功', 'success')
                this.$router.push({ name: 'reportClues_index' })
              } else if (res.code === 208) {
                this.loading = false
                this.dataMessage = res.message
                this.dialogVisible = true
              }
            })
          } else {
            // 编辑线索 需要两个状态 需要确定进入进来的状态
            this.paramsObj.currentState = this.currentState
            this.paramsObj.state = type
            this.paramsObj.clueId = this.$route.params.id
            putClue(this.paramsObj).then(res => {
              // if (res.code === 200) {
              //   this.successOrError('操作成功', 'success')
              //   this.$router.push({ name: 'reportClues_index' })
              // }
              if (res.code === 200) {
                this.loading = false
                this.successOrError('操作成功', 'success')
                this.$router.push({ name: 'reportClues_index' })
              } else if (res.code === 208) {
                this.loading = false
                this.dataMessage = res.message
                this.dialogVisible = true
              } else {
                this.loading = false
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 成功或失败
    successOrError(msg, type, time) {
      this.$message({
        message: msg || '操作成功',
        type: type || 'info',
        duration: time || 1000
      })
    },
    // go2Bck 返回
    go2Bck() {
      this.$router.push({
        name: 'reportClues_index',
        query: {
          memory: this.$route.query.memory
        }
      })
    },
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
$border: 1px solid #ebeef5;
$margin: 20px;
.reportLibraryHadle {
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
  .head {
    .judge-checkbox {
      .el-checkbox {
        margin-left: 30px;
      }
    }
  }
  .block {
    .blckTitle {
      padding-bottom: 10px;
      border-bottom: $border;
      margin-bottom: $margin;
    }
    .itemBlock {
      margin-bottom: $margin;
      .messageLine {
        margin-bottom: 6px;
      }
      .upload-btn {
        display: inline-block;
        margin: 0 10px;
      }
      .dataList {
        margin-left: 100px;
        .el-form-item {
          margin-bottom: 0;
        }
        .el-table__row {
          td {
            height: 62px;
            padding: 14px 0 0 0;
            .cell {
              height: 100%;
              .el-checkbox-group {
                line-height: 28px;
              }
            }
          }
        }

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
      .district {
        .el-form-item__content {
          .el-form-item__error {
            left: 100px;
          }
          .city {
            .el-input__inner {
              border: 1px solid #dcdfe6;
            }
          }
          .districtFlag {
            .el-input__inner {
              border: 1px solid #dcdfe6;
            }
          }
        }
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
}
</style>
