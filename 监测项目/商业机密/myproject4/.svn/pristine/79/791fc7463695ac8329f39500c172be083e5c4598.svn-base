<template>
  <div class="point"
     v-loading="load"
    element-loading-text="文件正在上传，请耐心等待"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <el-row>
      <!-- {{this.reportLeads.clewState}} -->
      <!-- {{this.$route}} -->
      <!-- {{this.isDisabled}} -->
      <span v-if="(this.$route.query.roleType!=='done'&&(this.state  === '已退回'))"  
        style="text-align:center; position: absolute;top: -57px;left: -10px;"> 
        <el-button  type="primary" plain  icon="el-icon-edit"  @click="saveone(true)">保存</el-button>
      </span>  
      <el-form :model="form" ref="validForm" :rules="rules" :disabled="isDisabled">
        <div class="block">
          <el-form-item
            label="上报分析申请名称： "
            label-width="160px"
            prop="clueName"
            :rules="[{ required: true,validator: isValidInput, trigger: 'blur'}]"
          >
            <el-input v-model="form.clueName" placeholder="xx个人/单位/账户可疑交易线索,最长50字符" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item
            label=" 报告机构： "
            label-width="160px"
            prop="reportingBody"
          >
            <!-- <el-input v-model="form.reportingBody" placeholder></el-input> -->
            <el-select
              clearable
              multiple
              v-model="form.reportingBody"
              filterable
              remote
              reserve-keyword
              placeholder="请输入或选择报告机构"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="关联移送记录： "
            label-width="160px"
            :rules="[{validator: isValidInput, trigger: 'blur'}]"
            prop="linkId"
          >
            <el-input v-model="form.linkId" placeholder="请输入关联移送记录,最长50字符" maxlength="50"></el-input>
          </el-form-item>
          <div>
            <el-form-item
              label="分析触发点： "
              label-width="160px"
              prop="triggerOther"
              :rules="[{validator: isValidInputs, trigger: 'blur'}]"
            >
              <el-radio-group v-model="form.triggerPoint">
                <el-radio label="1">可疑交易报告</el-radio>
                <el-radio label="2">行政调查</el-radio>
                <el-radio label="3">现场检查</el-radio>
                <el-radio label="4">举报</el-radio>
                <el-radio label="5">
                  其他
                  <el-input
                    v-if="form.triggerPoint==='5'"
                    v-model="form.triggerOther"
                    placeholder="其他"
                  ></el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              label="涉罪类型："
              class="itme-block"
              label-width="160px"
              prop="psclueId"
              :rules="  { type: 'array', required: true, message: '请至少选择一个类型', trigger: 'change' }"
            >
              <el-select
                filterable
                style="width:100%"
                v-model="form.psclueId"
                multiple
                placeholder="请选择"
                @change="replenish"
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
              label-width="160px"
              v-if="isReplenishOne"
              prop="supplementOne"
              :rules="[{validator: szisValidInput1, trigger: 'blur'}]"
            >
              <el-input
                maxlength="100"
                v-model="supplementOne"
                placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
              ></el-input>
            </el-form-item>
            <el-form-item
              label-width="160px"
              v-if="isReplenishTwo"
              prop="supplementTwo"
              :rules="[{validator: szisValidInput2, trigger: 'blur'}]"
            >
              <el-input maxlength="100" v-model="supplementTwo" placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"></el-input>
            </el-form-item>
            <!-- <preliminary-judgment
              :lableWidth="150"
              ref="judgment"
              :judgmentInp1="judgmentInp1"
              :judgmentInp2="judgmentInp2"
              :echoJudgment="reportCluePreJudgment"
            ></preliminary-judgment>-->
          </div>
        </div>
        <!-- <h4>身份信息</h4>
        <div class="dataList">
          <el-table :data="form.IDCardData">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="姓名/单位名称">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input
                    v-model="scope.row.attachTitle"
                    placeholder="请输入单位名称,最长20字符"
                    maxlength="20"
                  >{{scope.$index}}</el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="证件类型">
              <template slot-scope="scope">
                <el-form-item>
                  <el-select v-model="scope.row.attachType" placeholder="请选择">
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
                <el-form-item>
                  <el-input
                    v-model="scope.row.attachContent"
                    placeholder="请输入证件号码,最长20字符"
                    maxlength="20"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="主体/对手">
              <template slot-scope="scope">
                <el-form-item>
                  <el-radio-group v-model="scope.row.uploadUser">
                    <el-radio label="主体">主体</el-radio>
                    <el-radio label="对手">对手</el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </div>-->
        <div class="itemBlock">
          <el-form-item label="身份信息：" label-width="100px" class="messageLine">
            <el-row class="messageContent">
              <el-col :span="4">
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
              </el-col>
              <el-col :span="12">
                <el-button @click="downIDCard" type="text" icon="el-icon-download">身份信息导入模板下载</el-button>
              </el-col>
              <el-col :span="8" style="textAlign:right">
                <el-button type icon="el-icon-plus" @click="addIdentity">添加一行</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <div class="dataList">
            <el-table :data="form.IDCardData">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column label="姓名/单位名称">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'IDCardData.' + scope.$index + '.attachTitle'"
                    :rules="[{required: true,validator: delDataValidInput, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.attachTitle"
                      placeholder="请输入单位名称,最长20字符"
                      maxlength="20"
                    >{{scope.$index}}</el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="证件类型">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'IDCardData.'+scope.$index+'.attachType'"
                    :rules="[{ required:true, validator: isValidInput,trigger: 'change'}]"
                  >
                    <el-select v-model="scope.row.attachType" placeholder="请选择">
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
                    :rules="[{ required:true, message:'证件号码不能为空', trigger: 'blur'},{validator: validateAgentNum, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.attachContent"
                      placeholder="请输入证件号码,最长128字符"
                      maxlength="128"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="主体/对手">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'IDCardData.'+scope.$index+'.uploadUser'"
                    :rules="[{ required: true, message: '请选择主体/对手', trigger: 'change' }]"
                  >
                    <el-radio-group v-model="scope.row.uploadUser">
                      <el-radio label="主体">主体</el-radio>
                      <el-radio label="对手">对手</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="text" @click="delIdentity(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- <h4>账户信息</h4>
        <el-table :data="form.accountData">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column label="账户名称">
            <template slot-scope="scope">{{scope.row.accountTitle}}</template>
          </el-table-column>
          <el-table-column label="账户号码（卡号）">
            <template slot-scope="scope">{{scope.row.attachTitle}}</template>
          </el-table-column>
          <el-table-column label="开户行">
            <template slot-scope="scope">{{scope.row.attachType}}</template>
          </el-table-column>
          <el-table-column label="代办人名称">
            <template slot-scope="scope">{{scope.row.attachContent}}</template>
          </el-table-column>
          <el-table-column label="代办人证件号">
            <template slot-scope="scope">{{scope.row.uploadUser}}</template>
          </el-table-column>
        </el-table>-->
        <div class="itemBlock">
          <el-form-item label="账户信息：" label-width="100px" class="messageLine">
            <el-row class="messageContent">
              <el-col :span="4">
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
              </el-col>
              <el-col :span="12">
                <el-button type="text" icon="el-icon-download" @click="downAccount">账户信息导入模板下载</el-button>
              </el-col>
              <el-col :span="8" style="textAlign:right">
                <el-button type icon="el-icon-plus" @click="addAccount">添加一行</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <div class="dataList">
            <el-table :data="form.accountData">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column label="账户名称">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'accountData.'+scope.$index+'.accountTitle'"
                    :rules="[{ required:true, validator: spaceBarAndSpecial, trigger: 'blur'}]"
                  >
                    <el-input v-model="scope.row.accountTitle" placeholder="请输入账户名称" maxlength="20"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="账户号码（卡号）">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'accountData.'+scope.$index+'.attachTitle'"
                    :rules="[{ required:true, message: '账户号码不能为空', trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.attachTitle"
                      placeholder="请输入账户号码（卡号）"
                      maxlength="128"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="开户行">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'accountData.'+scope.$index+'.attachType'"
                    :rules="[{ required:true,validator: isValidInput, trigger: 'blur'}]"
                  >
                    <el-input v-model="scope.row.attachType" placeholder="请输入开户行" maxlength="20"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="代办人名称">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'accountData.'+scope.$index+'.attachContent'"
                    :rules="[{ required:true,validator: isValidInput, trigger: 'blur'}]"
                  >
                    <el-input
                      v-model="scope.row.attachContent"
                      placeholder="请输入代办人名称"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="代办人证件号">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'accountData.'+scope.$index+'.uploadUser'"
                    :rules="[{validator: onlyNumberValidate, trigger: 'blur'}]"
                  >
                    <el-input v-model="scope.row.uploadUser" placeholder="请输入代办人证件号" maxlength="128"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="text" @click="delAccount(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="block">
          <el-row class="blckTitle" style="margin-top:10px;">
            <el-col :span="12">
              <span>可疑交易基本情况</span>
            </el-col>
          </el-row>
          <div class="itemBlock">
            <div>
                 <el-form :model="form.rdesignAreas" ref="rdesignAreas" :disabled="isDisabled" label-width="100px" class="demo-dynamic">
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
                    label-width="160px"
                    prop="districtFlag"
                    :rules="[{ required: true, message: '请选择交易发生地',trigger: 'change'}]"
                  >
                    <el-select
                      @change="countryOrProvince"
                      v-model="form.districtFlag"
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
                    prop="district"
                    :rules="[{ required:true, message: '请选择交易发生地',trigger: 'change'}]"
                  >
                    <el-select
                      v-if="form.districtFlag=='2'"
                      v-model="form.district"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="(item,index) in countryData"
                        :key="index"
                        :label="item.chSName"
                        :value="item.numCode"
                      ></el-option>
                    </el-select>
                    <el-select v-else v-model="form.district" placeholder="请选择" filterable>
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
                    prop="city"
                    :rules="[{validator: validateDept, trigger: 'blur'}]"
                  >
                    <el-input
                      maxlength="20"
                      v-if="form.districtFlag=='1'"
                      class="city"
                      v-model="form.city"
                      placeholder="市,最长20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>-->
            </div> 
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="交易日期："
                    label-width="160px"
                    prop="tradeDate"
                    :rules=" [{required: true, message: '交易日期不能为空', trigger: 'blur' }]"
                  >
                    <el-date-picker
                     :default-value='timeDefaultShow'
                     :picker-options="pickerOptions"
                      v-model="form.tradeDate"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      unlink-panels
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                      <el-col :span="12">
                  <el-form-item
                    :inline="true"
                    label="本币金额："
                    label-width="160px"
                    prop="moneyRmb"
                    :rules="[{required: isRmbs,validator: isValidMoneyss, trigger: 'blur'}]"
                  >
                    <el-input style="width:80%" v-model="form.moneyRmb" placeholder="请输入本币金额,最长20字符" maxlength="20"></el-input>
                    <span>万元</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :inline="true"
                    label="外币金额（折万美元）："
                    label-width="180px"
                    prop="moneyUsd"
                    :rules="[{required: isDollars,validator: isValidMoneyss, trigger: 'blur'}]"
                  >
                    <el-input  style="width:70%" v-model="form.moneyUsd" placeholder="请输入外币金额,最长20字符" maxlength="20"></el-input>
                      <span>万美元</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-form-item
                label="分析概述："
                label-width="160px"
                prop="analysis"
                :rules="[  {max: 4000, message: '服务器正在处理中', trigger: 'blur' }]"
              >
                <el-input
                  v-model="form.analysis"
                  type="textarea"
                  :rows="4"
                  placeholder="最长4000字符数,如超过限制字数或包含图表等非文本格式的内容,请以附件形式提供,并在此填写“见附件XX”"
                  maxlength="4000"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="分析报告：" label-width="160px">
                <el-upload
                  :action="formUrl"
                  multiple
                  class="upload-btn"
                  :file-list="fileList"
                  :on-success="fxuploadSuccess"
                  :on-preview="downFile"
                  :on-remove="handleRemove1"
                  :before-upload="beforeAvatarUpload"
                     :on-error="onError"
                >
                  <el-button type="text">添加附件</el-button>
                  <div slot="tip" class="el-upload__tip" style="display:inline">（该类型文件必须以00开头）</div>
                </el-upload>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="身份信息：" label-width="160px">
                <el-upload
                  :action="formUrl2"
                  multiple
                  class="upload-btn"
                  :file-list="fileList2"
                  :on-success="fxuploadSuccess"
                  :on-preview="downFile"
                  :on-remove="handleRemove2"
                  :before-upload="beforeAvatarUpload2"
                     :on-error="onError"
                >
                  <el-button type="text">添加附件</el-button>
                  <div slot="tip" class="el-upload__tip" style="display:inline">（该类型文件必须以01开头）</div>
                </el-upload>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="账户信息：" label-width="160px">
                <el-upload
                  :action="formUrl3"
                  multiple
                  class="upload-btn"
                  :onSuccess="fxuploadSuccess"
                  :file-list="fileList3"
                  :on-preview="downFile"
                  :on-remove="handleRemove3"
                  :before-upload="beforeAvatarUpload3"
                     :on-error="onError"
                >
                  <el-button type="text">添加附件</el-button>
                  <div slot="tip" class="el-upload__tip" style="display:inline">（该类型文件必须以02开头）</div>
                </el-upload>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="交易明细：" label-width="160px">
                <el-upload
                  :action="formUrl4"
                  multiple
                  class="upload-btn"
                  :onSuccess="fxuploadSuccess"
                  :file-list="fileList4"
                  :on-preview="downFile"
                  :on-remove="handleRemove4"
                  :before-upload="beforeAvatarUpload4"
                     :on-error="onError"
                >
                  <el-button type="text">添加附件</el-button>
                  <div slot="tip" class="el-upload__tip" style="display:inline">（该类型文件必须以03开头）</div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </el-row>
    <el-row>
      <el-form
        :model="AnalysisList"
        ref="validForm1"
        :disabled="(this.reportLeads.clewState === '已审核'||this.reportLeads.clewState === '待审核'
        ||this.reportLeads.clewState === '移送中'||this.reportLeads.clewState === '已移送'||this.reportLeads.clewState === '仅报告'
        ||this.reportLeads.clewState === '立案'||this.reportLeads.clewState === '不予立案'||this.reportLeads.clewState === '结案'||this.reportLeads.clewState === '撤案')"
        :rules="rules"
        v-if=" (this.state  === '已分配'&&this.$route.query.roleType!=='done'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '已审核'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '已分析'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '待审核'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '移送中'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
         ||(this.reportLeads.clewState === '已移送'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '仅报告'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '立案'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '结案'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '撤案'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '不予立案'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))"
      >
        <div class="block" style="margin-top:20px;">
          <el-row class="blckTitle">
            <el-col :span="12">
              <span>分析研判意见</span>
               <span v-if="this.state  === '已分配'&&this.$route.query.roleType!=='done'||this.state  === '已分析'&&this.$route.query.roleType!=='done'"  
          style="margin-left:10px;"> 
             <el-button type="primary" plain   icon="el-icon-edit" @click="saves(true)">保存</el-button>
               </span>
            </el-col>
          </el-row>
          <div class="itemBlock">
          <el-form   :disabled="(this.reportLeads.clewState === '已审核'||this.reportLeads.clewState === '待审核'
        ||this.reportLeads.clewState === '移送中'||this.reportLeads.clewState === '已移送'||this.reportLeads.clewState === '仅报告'
        ||this.reportLeads.clewState === '立案'||this.reportLeads.clewState === '不予立案'||this.reportLeads.clewState === '结案'||this.reportLeads.clewState === '撤案')" :model="AnalysisList.reportAnalyzeDistrictList"  ref="reportAnalyzeDistrictList" label-width="100px" class="demo-dynamic">
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                    v-for="(city, index) in AnalysisList.reportAnalyzeDistrictList.citys"
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
                    v-for="(city, index) in AnalysisList.reportAnalyzeDistrictList.citys"
                    :key="index"
                    :prop="'citys.' + index + '.district'"
                    :rules="[{ required:true, message: '请选择交易发生地',trigger: 'change'}]"
                  >
                    <el-select
                      v-if="city.districtFlag==='2'"
                      v-model="city.district"
                      placeholder="请选择"
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
                    v-for="(city, index) in AnalysisList.reportAnalyzeDistrictList.citys"
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
                    <el-button v-if="index>0" style="margin-left:0"  @click.prevent="removecitys(city)" icon="el-icon-remove-outline"></el-button>
                    <el-button    @click="addcitys" icon="el-icon-circle-plus-outline"></el-button>
                  </el-form-item>
                </el-col>
                </el-row>
            </el-form>
            <!-- <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="交易发生地："
                    label-width="160px"
                    prop="districtFlag"
                    :rules="[{ required: true, message: '请选择交易发生地',trigger: 'change'}]"
                  >
                    <el-select
                      @change="countryOrProvince1"
                      v-model="AnalysisList.districtFlag"
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
                    prop="district"
                    :rules="[{ required:true, message: '请选择交易发生地',trigger: 'change'}]"
                  >
                    <el-select
                      v-if="AnalysisList.districtFlag=='2'"
                      v-model="AnalysisList.district"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="(item,index) in countryData"
                        :key="index"
                        :label="item.chSName"
                        :value="item.numCode"
                      ></el-option>
                    </el-select>
                    <el-select v-else v-model="AnalysisList.district" placeholder="请选择" filterable>
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
                    prop="city"
                    :rules="[{validator: validateDept, trigger: 'blur'}]"
                  >
                    <el-input
                      maxlength="20"
                      v-if="AnalysisList.districtFlag=='1'"
                      class="city"
                      v-model="AnalysisList.city"
                      placeholder="市,最长20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div> -->
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  :inline="true"
                  label="本币金额："
                  label-width="160px"
                  prop="moneyRmb"
                  :rules="[{required: isRmb,validator: isValidMoneys, trigger: 'blur'}]"
                >
                  <el-input
                    style="width:80%"
                    v-model="AnalysisList.moneyRmb"
                    placeholder="请输入本币金额,最长20字符"
                    maxlength="20"
                  ></el-input>
                  <span>万元</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :inline="true"
                  label="外币金额（折万美元）："
                  label-width="220px"
                  prop="moneyUsd"
                  :rules="[{ required: isDollar,validator: isValidMoneys, trigger: 'blur' }]"
                >
                  <el-input
                    style="width:80%"
                    v-model="AnalysisList.moneyUsd"
                    placeholder="请输入外币金额,最长20字符"
                    maxlength="20"
                  ></el-input>
                  <span>万美元</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="分析结论是否一致："
                  label-width="160px"
                  class="searchBlock_special_formIten"
                  prop="acac"
                  style="width:100%"
                >
                  <el-select v-model="AnalysisList.acac" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                    <el-option label="其他" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="分析结论是否一致其他输入项："
                  label-width="220px"
                  class="searchBlock_special_formIten"
                  style="width:100%"
                  :rules="[{validator: isValidInput, trigger: 'blur' }]"
                  prop="acacOther"
                >
                  <el-input
                    :disabled="AnalysisList.acac!=='3'"
                    v-model="AnalysisList.acacOther"
                    placeholder="分析结论其他输入项,最长50字符"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="分析研判意见："
                  label-width="160px"
                  class="searchBlock_special_formIten"
                  prop="analyseOpinion"
                >
                  <el-select v-model="AnalysisList.analyseOpinion" placeholder="请选择">
                    <el-option label="中心-移送" value="0"></el-option>
                    <el-option label="中心-通报" value="1"></el-option>
                    <el-option label="中心-继续关注" value="2"></el-option>
                    <el-option label="分支机构-移送" value="10"></el-option>
                    <el-option label="分支机构-通报" value="11"></el-option>
                    <el-option label="分支机构-继续关注" value="12"></el-option>
                    <!-- <el-option label="需补充行政调查" value="13"></el-option>
                    <el-option label="分支机构-酌情处理" value="14"></el-option>-->
                    <el-option label="其他" value="15"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="分析研判意见其他输入项："
                  label-width="220px"
                  class="searchBlock_special_formIten"
                  prop="analyseOpinionOther"
                  :rules="[{validator: isValidInput, trigger: 'blur' }]"
                >
                  <el-input
                    :disabled="AnalysisList.analyseOpinion!=='15'"
                    v-model="AnalysisList.analyseOpinionOther"
                    placeholder="分析研判意见其他输入项,,最长50字符"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label=" 线索评价：" label-width="160px" prop="evaluate">
                  <el-select v-model="AnalysisList.evaluate" placeholder="请选择">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                    <el-option label="6" value="6"></el-option>
                    <el-option label="7" value="7"></el-option>
                    <el-option label="8" value="8"></el-option>
                    <el-option label="9" value="9"></el-option>
                    <el-option label="10" value="10"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="线索评价其他输入项："
                  label-width="220px"
                  class="searchBlock_special_formIten"
                  prop="evaluateOther"
                  :rules="[{validator: isValidInput, trigger: 'blur' }]"
                >
                  <el-input
                   :disabled="AnalysisList.evaluate!=='其他'"
                    v-model="AnalysisList.evaluateOther"
                    placeholder="线索评价其他输入项,,最长50字符"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="分支机构是否可见:" label-width="160px" prop="isvisible">
                  <el-select
                    v-model="AnalysisList.isvisible"
                    placeholder="请选择"
                    style="padding-right: 10px;"
                  >
                    <el-option label="不可见" value="0"></el-option>
                    <el-option label="可见" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="分析概述：" label-width="160px" prop="summary">
              <el-input
                v-model="AnalysisList.summary"
                type="textarea"
                maxlength="1000"
                :rows="4"
                placeholder="请输入分析概述，最多1000字符"
              ></el-input>
            </el-form-item>
            <el-form-item label="附件： " label-width="160px">
              <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <el-button type="text">点击添加附件</el-button>
              </el-upload>-->
              <el-upload
                :action="formUrl5"
                multiple
                class="upload-btn"
                :onSuccess="fxuploadSuccess"
                :file-list="fileList5"
                :before-upload="beforeAvatarUpload5"
                :on-preview="downFile"
                :on-remove="handleRemove"
                :on-error="onError"
              >
                <el-button type="text">添加附件</el-button>
              </el-upload>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-row>
    <el-row>
      <el-form
        ref="validForm2"
        :rules="rules"
        :disabled="this.reportLeads.clewState === '已审核' ||this.reportLeads.clewState === '移送中'||this.reportLeads.clewState === '已移送'||this.reportLeads.clewState === '仅报告'
        ||this.reportLeads.clewState === '立案'||this.reportLeads.clewState === '不予立案'||this.reportLeads.clewState === '结案'||this.reportLeads.clewState === '撤案'"
        v-if="(this.reportLeads.clewState === '待审核'&&this.$route.query.roleType!=='done'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '已审核'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '移送中'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '已移送'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '仅报告'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '立案'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '不予立案'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '结案'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))
        ||(this.reportLeads.clewState === '撤案'&&(this.isCenter||(this.isBranch&&this.AnalysisList.isvisible==='1')))"
        :model="ExamineList"
      >
        <div class="block" style="margin-top:20px;">
          <el-row class="blckTitle">
            <el-col :span="12">
              <span>审核意见</span>
               <span v-if="this.state  === '待审核'&&this.$route.query.roleType!=='done'"  
               style="margin-left:10px;"
           > 
             <el-button type="primary" plain   icon="el-icon-edit" @click="savetwos(true)">保存</el-button>
           </span>
            </el-col>
          </el-row>
          <div class="itemBlock">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="审核会议名称：" label-width="160px" prop="meetingName">
                  <el-input
                    v-model="ExamineList.meetingName"
                    placeholder="审核会议名称,最长50字符"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核会议时间：" label-width="220px" prop="meetingDate">
                  <el-date-picker
                    :picker-options="pickerOptions2"
                    v-model="ExamineList.meetingDate"
                    placeholder="选择时间"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="审核意见是否和分析研判意见一致:"
                  label-width="160px"
                  class="searchBlock_special_formIten"
                  prop="roac"
                >
                  <el-select v-model="ExamineList.roac" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                    <el-option label="其他" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="审核意见是否和分析研判意见一致其他输入项:"
                  label-width="220px"
                  class="searchBlock_special_formIten"
                  :rules="[{validator: isValidInput, trigger: 'blur' }]"
                  prop="roacOther"
                >
                  <el-input
                    :disabled="ExamineList.roac!=='3'"
                    v-model="ExamineList.roacOther"
                    placeholder="审核意见是否和分析研判意见一致其他输入项,最长50字符"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label=" 审核意见:"
                  label-width="160px"
                  class="searchBlock_special_formIten"
                  prop="reviewOpinion"
                >
                  <el-select v-model="ExamineList.reviewOpinion" placeholder="请选择">
                    <el-option label="中心-移送" value="0"></el-option>
                    <el-option label="中心-通报" value="1"></el-option>
                    <el-option label="中心-继续关注" value="2"></el-option>
                    <el-option label="分支机构-移送" value="10"></el-option>
                    <el-option label="分支机构-通报" value="11"></el-option>
                    <el-option label="分支机构-继续关注" value="12"></el-option>
                    <!-- <el-option label="需补充行政调查" value="13"></el-option>
                    <el-option label="分支机构-酌情处理" value="14"></el-option>-->
                    <el-option label="其他" value="15"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="审核意见其他输入项:"
                  label-width="220px"
                  class="searchBlock_special_formIten"
                  :rules="[{validator: isValidInput, trigger: 'blur' }]"
                  prop="reviewOpinionOther"
                >
                  <el-input
                    :disabled="ExamineList.reviewOpinion!=='15'"
                    v-model="ExamineList.reviewOpinionOther"
                    placeholder="审核意见其他输入项,最长50字符"
                    maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="领导指示：" label-width="160px">
              <el-input
                v-model="ExamineList.ledInstruct"
                type="textarea"
                placeholder="领导指示,最长4000字符"
                maxlength="4000"
              ></el-input>
            </el-form-item>
            <el-form-item label="附件： " label-width="160px">
              <el-upload
                :action="formUrl6"
                multiple
                class="upload-btn"
                :onSuccess="fxuploadSuccess"
                :file-list="fileList6"
                :before-upload="beforeAvatarUpload5"
                :on-preview="downFile"
                :on-remove="handleRemove"
                :on-error="onError"
              >
                <el-button type="text">添加附件</el-button>
              </el-upload>
            </el-form-item>
            <!-- <div class="saveBtn">
                 <el-button type="primary" @click="ExamSaveForm('validForm2')"  v-if="this.reportLeads.clewState === '待审核'" >保 存</el-button>
            </div>-->
          </div>
        </div>
      </el-form>
    </el-row>
    <el-row>
      <el-form :model="form" :disabled="isDisabled" :rules="rules" ref="validForms">
        <div class="block">
          <div class="itemBlock">
            <div>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="填报联系人：" label-width="170px" prop="createUser">
                    <el-input v-model="form.createUser" placeholder="请输入填报联系人" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电话：" label-width="120px" prop="createUserTel">
                    <el-input v-model="form.createUserTel" placeholder="请输入填报联系人电话" maxlength="15"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="审核人：" label-width="120px" prop="auditingUser">
                    <el-input v-model="form.auditingUser" placeholder="请输入审核人" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电话：" label-width="120px" prop="auditingUserTel">
                    <el-input v-model="form.auditingUserTel" placeholder="请输入审核人电话" maxlength="15"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col>
                  <el-form-item
                    label="部门负责人审批意见："
                    label-width="170px"
                    prop="deptOpinion"
                    :rules="[{ required: true, message: '请输入部门负责人审批意见', trigger: 'blur' }]"
                  >
                    <el-input
                      type="textarea"
                      v-model="form.deptOpinion"
                      :rows="3"
                      maxlength="500"
                      placeholder="请输入部门负责人审批意见, 最多可输入500位"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { commonPattern, spaceBarAndSpecial } from '@/utils/formValidate'
import {
  approvalStaus,
  getapproval,
  updateForm,
  updateForm2,
  updateForm3,
  updateForm4,
  saveApi
} from '@/api/sys-monitoringAnalysis/judgedClues/branch.js'
import { delAttach, backSave, lastSave } from '@/api/sys-monitoringAnalysis/judgedClues/add.js'
import {
  dictionary,
  province,
  country
} from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { rinmList } from '@/api/common/industry'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/crimeInvolved.vue'
export default {
  components: {
    preliminaryJudgment
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      spaceBarAndSpecial: spaceBarAndSpecial,
      timeDefaultShow: '',
      load: false,
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im, // 校验空格
      isDisabled: true,
      idFiles: '',
      cityFlag: false,
      cityFlag2: false,
      reportClueAttachDos: [], // 附件参数
      attachTypeArr: [],
      actDefId: '',
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileId: '',
      fileData: [],
      options: [],
      rinmOptions: [], // 报告机构列表
      countryData: [], // 国家数据
      provinceData: [], // 省份数据
      dialogJudgmentData: [],
      judgmentInp1: '', // 初步判断1401 input
      judgmentInp2: '', // 初步判断1402 input
      reportCluePreJudgment: [], // 回显的数据
      reportLeads: {},
      loading: false,
      isRmb: true,
      isDollar: true,
      isRmbs: true,
      isDollars: true,
      state: '',
      isReplenishOne: false,
      isReplenishTwo: false,
      supplementOne: '',
      supplementTwo: '',
      token: getToken(),
      AnalysisList: {
        // 分析研判意见
        city: '',
        reportAnalyzeDistrictList: {
          citys: [{
            districtFlag: '',
            district: '',
            city: ''
          }]
        },
        districtFlag: '1',
        district: '',
        moneyRmb: '',
        moneyUsd: '',
        acac: '',
        acacOther: '',
        analyseOpinion: '',
        analyseOpinionOther: '',
        evaluate: '',
        evaluateOther: '',
        isvisible: '',
        summary: '',
        analyze: ''
      },
      ExamineList: {
        // 审核意见
        meetingName: '',
        meetingDate: '',
        roac: '',
        roacOther: '',
        reviewOpinion: '',
        reviewOpinionOther: '',
        ledInstruct: ''
      },
      form: {
        triggerPoint: '',
        clueName: '',
        linkId: '',
        triggerOther: '',
        psclueId: [],
        reportingBody: [],
        // 可疑交易基本情况
        tradeDate: '',
        rdesignAreas: {
          citys: [{
            districtFlag: '',
            district: '',
            city: ''
          }]
        },
        district: '',
        city: '',
        moneyRmb: '',
        moneyUsd: '',
        analysis: '',
        districtFlag: '1',
        createUser: '',
        createUserTel: '',
        auditingUser: '',
        auditingUserTel: '',
        deptOpinion: '',
        IDCardData: [
          // {
          //   accountTitle: '张三',
          //   attachType: '身份证',
          //   options: [
          //     {
          //       attachType: '1',
          //       label: '身份证'
          //     },
          //     {
          //       attachType: '2',
          //       label: '护照'
          //     },
          //     {
          //       attachType: '3',
          //       label: '官兵证'
          //     }
          //   ],
          //   attachContent: '130***12455248552',
          //   uploadUser: '1'
          // },
        ],
        accountData: [
          // {
          //   accountTitle: '赵三',
          //   attachTitle: '652256854522454',
          //   attachType: '北京银行上海支行',
          //   attachContent: '李四',
          //   uploadUser: '1231564231232'
          // }
        ]
      },
      rules: {
        district: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        acac: [{ required: true, message: '请选择', trigger: 'change' }],
        evaluate: [{ required: true, message: '请选择评价', trigger: 'change' }],
        analyseOpinion: [{ required: true, message: '请选择', trigger: 'change' }],
        isvisible: [{ required: true, message: '请选择是否可见', trigger: 'change' }],
        summary: [{ required: true, message: '请输入分析概述', trigger: 'blur' }],
        // 审核意见验证
        roac: [{ required: false, message: '请选择', trigger: 'change' }],
        reviewOpinion: [{ required: false, message: '请选择', trigger: 'change' }],
        meetingName: [{ required: false, validator: this.isValidInput, trigger: 'blur' }],
        meetingDate: [{ required: false, message: '请输入审核会议时间', trigger: 'blur' }],
        // 联系人验证
        createUser: [{ required: true, validator: this.NospaceBarInput, trigger: 'blur' }],
        // createUserTel: [{ required: true, validator: this.onlyNumberValidate1, trigger: 'blur' }],
        auditingUser: [{ required: true, validator: this.NospaceBarInput, trigger: 'blur' }]
        // auditingUserTel: [{ required: true, validator: this.onlyNumberValidate1, trigger: 'blur' }]
      },
      list: [],
      total: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tradeDetailVisible: false,
      tradeId: '',
      taskId: ''
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent', 'institution']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    isBranch() {
      return this.institution === this.GLOBAL.INSTITUTION_BRANCH
    },
    moneyObj() {
      const obj = {}
      obj.moneyRmb = this.AnalysisList.moneyRmb
      obj.moneyUsd = this.AnalysisList.moneyUsd
      return obj
    },
    moneyObjs() {
      const obj = {}
      obj.moneyRmb = this.form.moneyRmb
      obj.moneyUsd = this.form.moneyUsd
      return obj
    },
    IDCardUrl() {
      return `/monitor/reportLeads/upFileTradeMain?token=${this.token}`
    },
    AccountUrl() {
      return `/monitor/reportLeads/upFileTradeAccount?token=${this.token}`
    },
    // formUrl() {
    //   return `/monitor/reportLeads/upAttach?token=${this.token}&clueId=${this.idFiles}`
    // },
    formUrl() {
      return `/monitor/reportLeads/upAttach?token=${this.token}&clueId=${this.idFiles}&type=00`
    },
    formUrl2() {
      return `/monitor/reportLeads/upAttach?token=${this.token}&clueId=${this.idFiles}&type=01`
    },
    formUrl3() {
      return `/monitor/reportLeads/upAttach?token=${this.token}&clueId=${this.idFiles}&type=02`
    },
    formUrl4() {
      return `/monitor/reportLeads/upAttach?token=${this.token}&clueId=${this.idFiles}&type=03`
    },
    formUrl5() {
      return `/monitor/reportLeads/upAttach?token=${this.token}&clueId=${this.idFiles}&type=04`
    },
    formUrl6() {
      return `/monitor/reportLeads/upAttach?token=${this.token}&clueId=${this.idFiles}&type=05`
    }
  },
  mounted() {
    this.timeDefaultShow = new Date()
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1)
    this.getData()
    this.getDictionary('SFZJ')
    this.getDictionary('TOSC')
    this.getCountry()
    this.getProvince()
    // console.log(this.$route.query.roleType)
  },
  watch: {
    businessFlag(val) {
      if (val) {
        this.updateForm()
        this.nextStep()
        this.$store.dispatch('changeFlag', false)
      }
    },
    moneyObj(val) {
      if (Boolean(val.moneyRmb) === false && Boolean(val.moneyUsd) === false) {
        this.isDollar = true
        this.isRmb = true
      } else if (Boolean(val.moneyRmb) && Boolean(val.moneyUsd) === false) {
        this.isDollar = false
        this.isRmb = true
      } else if (!val.moneyRmb && Boolean(val.moneyUsd)) {
        this.isDollar = true
        this.isRmb = false
      } else if (val.moneyRmb === undefined && val.moneyUsd === undefined) {
        this.isDollar = true
        this.isRmb = true
      } else {
        this.isDollar = true
        this.isRmb = true
      }
    },
    moneyObjs(val) {
      if (val.moneyRmb === '' && val.moneyUsd === '') {
        this.isDollars = true
        this.isRmbs = true
      } else if (val.moneyRmb !== '' && val.moneyUsd === '') {
        this.isDollars = false
        this.isRmbs = true
      } else if (val.moneyRmb === '' && val.moneyUsd !== '') {
        this.isDollars = true
        this.isRmbs = false
      } else {
        this.isDollars = true
        this.isRmbs = true
      }
    },
    formContent: {
      handler(newVal, oldVal) {
        if (newVal.workflow.nodeAttributes) {
          if (newVal.workflow.nodeAttributes.length > 0) {
            if (
              newVal.workflow.nodeAttributes[0].extendKey === 'editFlag' &&
              newVal.workflow.nodeAttributes[0].extendValue === 'Y'
            ) {
              this.isDisabled = false
            } else {
              this.isDisabled = true
            }
          }
        }
        this.reportLeads.clewState = newVal.reportLeadsList[0].clewState
        this.state = newVal.reportLeadsList[0].clewState
        this.actDefId = newVal.workflow.actDefId
        // console.log(newVal, '8888')
        // console.log(this.reportLeads.clewState, '011100')
        // console.log(this.actDefId, '666')
        this.reportLeads.clueId = newVal.workflow.pkId
        // this.list = newVal.comparisonResults
        // 附件
        if (newVal.reportLeadsList[0].attachDoList00.length > 0) {
          this.idFiles = newVal.reportLeadsList[0].attachDoList00[0].noteId
        }
        if (newVal.reportLeadsList[0].attachDoList01.length > 0) {
          this.idFiles = newVal.reportLeadsList[0].attachDoList01[0].noteId
        }
        if (newVal.reportLeadsList[0].attachDoList02.length > 0) {
          this.idFiles = newVal.reportLeadsList[0].attachDoList02[0].noteId
        }
        if (newVal.reportLeadsList[0].attachDoList03.length > 0) {
          this.idFiles = newVal.reportLeadsList[0].attachDoList03[0].noteId
        }
        // 后2个附件
        if (newVal.reportLeadsList[0].attachDoList04.length === 0) {
          this.idFiles = newVal.rcriminalTypeList[0].clueId
        }
        if (newVal.reportLeadsList[0].attachDoList05.length === 0) {
          this.idFiles = newVal.rcriminalTypeList[0].clueId
        }
        const arrs = []
        newVal.reportLeadsList[0].attachDoList00.forEach(el => {
          const obj = {}
          obj.name = el.attachName
          obj.url = el.attachPath
          obj.attachId = el.attachId
          arrs.push(obj)
        })
        this.fileList = arrs

        const arrs2 = []
        newVal.reportLeadsList[0].attachDoList01.forEach(el => {
          const obj = {}
          obj.name = el.attachName
          obj.url = el.attachPath
          obj.attachId = el.attachId
          arrs2.push(obj)
        })
        this.fileList2 = arrs2

        const arrs3 = []
        newVal.reportLeadsList[0].attachDoList02.forEach(el => {
          const obj = {}
          obj.name = el.attachName
          obj.url = el.attachPath
          obj.attachId = el.attachId
          arrs3.push(obj)
        })
        this.fileList3 = arrs3

        const arrs4 = []
        newVal.reportLeadsList[0].attachDoList03.forEach(el => {
          const obj = {}
          obj.name = el.attachName
          obj.url = el.attachPath
          obj.attachId = el.attachId
          arrs4.push(obj)
        })
        this.fileList4 = arrs4
        // 分析研判意见附件
        const arrs5 = []
        newVal.reportLeadsList[0].attachDoList04.forEach(el => {
          const obj = {}
          obj.name = el.attachName
          obj.url = el.attachPath
          obj.attachId = el.attachId
          arrs5.push(obj)
        })
        this.fileList5 = arrs5
        const arrs6 = []
        newVal.reportLeadsList[0].attachDoList05.forEach(el => {
          const obj = {}
          obj.name = el.attachName
          obj.url = el.attachPath
          obj.attachId = el.attachId
          arrs6.push(obj)
        })
        this.fileList6 = arrs6
        const arry1 = []
        newVal.reportingBodies.forEach(el => {
          arry1.push(el.reportingBody)
        })
        this.form.clueName = newVal.reportLeadsList[0].clueName
        this.form.reportingBody = arry1
        this.form.linkId = newVal.reportLeadsList[0].linkId
        this.form.triggerPoint = newVal.reportLeadsList[0].triggerPoint
        this.form.triggerOther = newVal.reportLeadsList[0].triggerOther
        const obj = {}
        obj.citys = newVal.rdesignAreas
        this.form.rdesignAreas = obj
        // this.form.districtFlag = newVal.reportLeadsList[0].rdesignArea.districtFlag
        // this.form.city = newVal.reportLeadsList[0].rdesignArea.city
        // const districtstr = newVal.reportLeadsList[0].cityCountry
        // this.form.district = Object.keys(districtstr)[0]
        const ary = []
        ary.push(newVal.reportLeadsList[0].tradeStartDate)
        ary.push(newVal.reportLeadsList[0].tradeEndDate)
        this.form.tradeDate = ary
        this.form.moneyRmb = newVal.reportLeadsList[0].moneyRmb
        this.form.moneyUsd = newVal.reportLeadsList[0].moneyUsd
        this.form.analysis = newVal.reportLeadsList[0].analysis
        this.form.createUser = newVal.reportLeadsList[0].createUser
        this.form.createUserTel = newVal.reportLeadsList[0].createUserTel
        this.form.auditingUser = newVal.reportLeadsList[0].auditingUser
        this.form.auditingUserTel = newVal.reportLeadsList[0].auditingUserTel
        this.form.deptOpinion = newVal.reportLeadsList[0].deptOpinion
        const psclueIdArr = []
        newVal.rcriminalTypeList.forEach(el => {
          if (el.pSClueId.indexOf('1401') !== -1) {
            const tempArr = el.pSClueId.split('-')
            this.supplementOne = tempArr[1]
            this.isReplenishOne = true
            psclueIdArr.push('1401')
          } else if (el.pSClueId.indexOf('1402') !== -1) {
            const tempArr = el.pSClueId.split('-')
            this.supplementTwo = tempArr[1]
            this.isReplenishTwo = true
            psclueIdArr.push('1402')
          } else {
            psclueIdArr.push(el.pSClueId)
          }
        })
        this.form.psclueId = psclueIdArr
        // 新赦罪
        // const psclueIdArr = []
        // newVal.rcriminalTypeList.forEach(el => {
        //   psclueIdArr.push(el.psclueId)
        // })
        // setTimeout(() => {
        //   this.reportCluePreJudgment = psclueIdArr
        // }, 0)
        const arr = []
        newVal.raccountInformationList.forEach(el => {
          const obj1 = {}
          obj1.attachTitle = el.attachTitle
          obj1.attachType = el.attachType
          obj1.attachContent = el.attachContent
          obj1.uploadUser = el.uploadUser
          obj1.accountTitle = el.accountTitle
          arr.push(obj1)
        })
        this.form.accountData = arr
        const arr1 = []
        newVal.rsubjectIdentityList.forEach(el => {
          const obj = {}
          obj.attachTitle = el.attachTitle
          obj.attachType = el.attachType
          obj.attachContent = el.attachContent
          obj.uploadUser = el.uploadUser
          arr1.push(obj)
        })
        this.form.IDCardData = arr1
        // this.AnalysisList.district = newVal.reportLeadsList[0].reportAnalyze.district
        // const Anadistrictstr = newVal.reportLeadsList[0].reportAnalyzecityCountry
        // this.AnalysisList.district = Object.keys(Anadistrictstr)[0]
        //   const districtstr = newVal.reportLeadsList[0].cityCountry
        // this.form.district = Object.keys(districtstr)[0]
        var objs = {}
        objs.citys = newVal.reportAnalyzeDistricts ? newVal.reportAnalyzeDistricts : this.AnalysisList.reportAnalyzeDistrictList.citys
        this.AnalysisList.reportAnalyzeDistrictList = objs
        // this.AnalysisList.city = newVal.reportLeadsList[0].reportAnalyze.city
        // this.AnalysisList.districtFlag = newVal.reportLeadsList[0].reportAnalyze.districtFlag
        this.AnalysisList.moneyRmb = newVal.reportLeadsList[0].reportAnalyze.moneyRmb
        this.AnalysisList.moneyUsd = newVal.reportLeadsList[0].reportAnalyze.moneyUsd
        this.AnalysisList.acac = newVal.reportLeadsList[0].reportAnalyze.acac
        this.AnalysisList.acacOther = newVal.reportLeadsList[0].reportAnalyze.acacOther
        this.AnalysisList.analyseOpinion = newVal.reportLeadsList[0].reportAnalyze.analyseOpinion
        this.AnalysisList.analyseOpinionOther =
          newVal.reportLeadsList[0].reportAnalyze.analyseOpinionOther
        this.AnalysisList.evaluate = newVal.reportLeadsList[0].reportAnalyze.evaluate
        this.AnalysisList.evaluateOther = newVal.reportLeadsList[0].reportAnalyze.evaluateOther
        this.AnalysisList.isvisible = newVal.reportLeadsList[0].reportAnalyze.isvisible
        this.AnalysisList.summary = newVal.reportLeadsList[0].reportAnalyze.opinionAnalysis

        this.ExamineList.meetingName = newVal.reportLeadsList[0].reportAudit.meetingName
        this.ExamineList.meetingDate = newVal.reportLeadsList[0].reportAudit.meetingDate
        this.ExamineList.roac = newVal.reportLeadsList[0].reportAudit.roac
        this.ExamineList.roacOther = newVal.reportLeadsList[0].reportAudit.roacOther
        this.ExamineList.reviewOpinion = newVal.reportLeadsList[0].reportAudit.reviewOpinion
        this.ExamineList.reviewOpinionOther =
          newVal.reportLeadsList[0].reportAudit.reviewOpinionOther
        this.ExamineList.ledInstruct = newVal.reportLeadsList[0].reportAudit.ledInstruct
      },
      deep: true
    }
  },
  methods: {
    nextStep() {},
    updateForm() {
      if (this.reportLeads.clewState === undefined) {
        this.$message({
          message: '该线索已删除',
          type: 'error',
          duration: 6000
        })
      }
      if (this.reportLeads.clewState === '无效') {
        this.$message({
          message: '置为无效的线索不可以提交',
          type: 'error',
          duration: 6000
        })
      }
      if (this.reportLeads.clewState === '已退回') {
        this.saveone(false)
        const submitObj = {}
        // 主键ID
        // this.idFiles = this.reportLeads.clueId
        submitObj.clueId = this.reportLeads.clueId
        submitObj.clueName = this.form.clueName
        const array = []
        this.form.reportingBody.forEach(el => {
          const obj = {}
          obj.reportingBody = el
          array.push(obj)
        })
        submitObj.reportingBodies = array
        submitObj.linkId = this.form.linkId
        submitObj.triggerPoint = this.form.triggerPoint
        submitObj.triggerOther = this.form.triggerOther
        const ary0 = []
        this.form.psclueId.forEach(el => {
          const obj3 = {}
          if (el === '1401') {
            el = '1401-' + this.supplementOne
          } else if (el === '1402') {
            el = '1402-' + this.supplementTwo
          }
          obj3.psclueId = el
          ary0.push(obj3)
        })
        submitObj.rcriminalType = ary0
        const ary = []
        this.form.IDCardData.forEach(el => {
          const obj = {}
          obj.attachTitle = el.attachTitle
          obj.attachType = el.attachType
          obj.attachContent = el.attachContent
          obj.uploadUser = el.uploadUser
          ary.push(obj)
        })
        submitObj.rsubjectIdentity = ary
        const arr = []
        this.form.accountData.forEach(el => {
          const obj1 = {}
          obj1.attachTitle = el.attachTitle
          obj1.attachType = el.attachType
          obj1.attachContent = el.attachContent
          obj1.uploadUser = el.uploadUser
          obj1.accountTitle = el.accountTitle
          arr.push(obj1)
        })
        submitObj.raccountInformation = arr
        submitObj.tradeStartDate = this.form.tradeDate[0] // 交易日期
        submitObj.tradeEndDate = this.form.tradeDate[1] // 交易日期
        // const obj2 = {}
        // obj2.districtFlag = this.form.districtFlag // 控制地区三个
        // obj2.district = this.form.district
        // obj2.city = this.form.city
        // submitObj.rdesignArea = obj2
        submitObj.rdesignAreas = this.form.rdesignAreas.citys
        submitObj.moneyRmb = this.form.moneyRmb // 本币
        submitObj.moneyUsd = this.form.moneyUsd // 外币
        submitObj.analysis = this.form.analysis // 分析概况
        submitObj.annexId = this.idFiles // 附件
        submitObj.auditingUser = this.form.auditingUser
        submitObj.auditingUserTel = this.form.auditingUserTel
        submitObj.deptOpinion = this.form.deptOpinion
        submitObj.createUser = this.form.createUser
        submitObj.createUserTel = this.form.createUserTel
        //  submitObj.clueId =
        // Update(submitObj).then(res => {
        //   if (res.code === 200) {
        //     this.$message({
        //       type: 'success',
        //       message: '提交成功'
        //     })
        //     this.$store.dispatch('changeFlag', false)
        //     setTimeout(() => {
        //       this.$router.push({ name: 'home' })
        //     }, 1000)
        //   }
        // })
        this.$refs.validForm.validate(valid => {
          if (valid) {
            this.$refs.validForms.validate(valid => {
              if (valid) {
                approvalStaus(submitObj, this.workFlow2business).then(res => {
                  if (res.code === 200) {
                    this.$message({
                      type: 'success',
                      message: '提交成功',
                      duration: 6000
                    })
                    this.$store.dispatch('changeFlag', false)
                    setTimeout(() => {
                      this.$router.push({ name: 'home' })
                    }, 1000)
                  }
                })
              } else {
                this.$message({
                  message: '请填写必填内容',
                  type: 'error',
                  duration: 6000
                })
              }
            })
          } else {
            this.$message({
              message: '请填写必填内容',
              type: 'error',
              duration: 6000
            })
          }
        })
      }
      if (this.reportLeads.clewState === '行内审批') {
        getapproval(this.reportLeads, this.workFlow2business).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success',
              duration: 6000
            })
            this.$store.dispatch('changeFlag', false)
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          }
        })
      }
      if (this.reportLeads.clewState === '已提交') {
        updateForm(this.reportLeads, this.workFlow2business).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success',
              duration: 6000
            })
            this.$store.dispatch('changeFlag', false)
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          }
        })
      }
      if (this.reportLeads.clewState === '已分发') {
        updateForm2(this.reportLeads, this.workFlow2business).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success',
              duration: 6000
            })
            this.$store.dispatch('changeFlag', false)
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          }
        })
      }
      if (this.reportLeads.clewState === '已分配' || this.reportLeads.clewState === '已分析') {
        // console.log(this.workFlow2business, 999)
        this.saves(false)
        this.AnaSaveForm('validForm1')
      }
      if (this.reportLeads.clewState === '待审核') {
        this.savetwos(false)
        // console.log(this.workFlow2business, 321)
        this.ExamSaveForm('validForm2')
      }
      if (this.reportLeads.clewState === '已审核') {
        // console.log(this.workFlow2business, 321)
        this.ExamSaveForm('validForm2')
      }
    },
    // 分析研判意见保存
    AnaSaveForm(formName) {
      this.$refs.reportAnalyzeDistrictList.validate(valid => {
        if (valid) {
          this.cityFlag2 = true
        } else {
          this.cityFlag2 = false
        }
      })
      this.$refs[formName].validate(valid => {
        if (valid && this.cityFlag2) {
          const reportAnalyze = {
            reportAnalyzeDistrictList: this.AnalysisList.reportAnalyzeDistrictList.citys,
            districtFlag: this.AnalysisList.districtFlag,
            annexId: this.idFiles, // 附件
            district: this.AnalysisList.district,
            city: this.AnalysisList.city,
            moneyRmb: this.AnalysisList.moneyRmb,
            moneyUsd: this.AnalysisList.moneyUsd,
            acac: this.AnalysisList.acac,
            acacOther: this.AnalysisList.acacOther,
            analyseOpinion: this.AnalysisList.analyseOpinion,
            analyseOpinionOther: this.AnalysisList.analyseOpinionOther,
            evaluate: this.AnalysisList.evaluate,
            evaluateOther: this.AnalysisList.evaluateOther,
            isvisible: this.AnalysisList.isvisible,
            opinionAnalysis: this.AnalysisList.summary,
            clewState: this.reportLeads.clewState,
            clueId: this.reportLeads.clueId
          }
          // console.log(reportAnalyze, 222)
          updateForm3(reportAnalyze, this.workFlow2business).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success',
                duration: 6000
              })
              this.$store.dispatch('changeFlag', false)
              setTimeout(() => {
                this.$router.push({ name: 'home' })
              }, 1000)
            }
          })
        } else {
          this.$message({
            message: '请填写分析研判意见内容',
            type: 'error',
            duration: 6000
          })
        }
      })
    },
    // 审核意见意见保存
    ExamSaveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const reportAudit = {
            annexId: this.idFiles, // 附件
            meetingName: this.ExamineList.meetingName,
            meetingDate: this.ExamineList.meetingDate,
            roac: this.ExamineList.roac,
            roacOther: this.ExamineList.roacOther,
            reviewOpinion: this.ExamineList.reviewOpinion,
            reviewOpinionOther: this.ExamineList.reviewOpinionOther,
            ledInstruct: this.ExamineList.ledInstruct,
            clewState: this.reportLeads.clewState,
            clueId: this.reportLeads.clueId
          }
          // console.log(reportAudit, 222)
          updateForm4(reportAudit, this.workFlow2business).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success',
                duration: 6000
              })
              this.$store.dispatch('changeFlag', false)
              setTimeout(() => {
                this.$router.push({ name: 'home' })
              }, 1000)
            }
          })
        } else {
          this.$message({
            message: '请填写审核意见意见内容',
            type: 'error',
            duration: 6000
          })
        }
      })
    },
    savetwos(val) {
      this.$refs.validForm2.validate(valid => {
        if (valid) {
          const reportAudit = {
            clueId: this.reportLeads.clueId,
            annexId: this.idFiles, // 附件
            meetingName: this.ExamineList.meetingName,
            meetingDate: this.ExamineList.meetingDate,
            roac: this.ExamineList.roac,
            roacOther: this.ExamineList.roacOther,
            reviewOpinion: this.ExamineList.reviewOpinion,
            reviewOpinionOther: this.ExamineList.reviewOpinionOther,
            ledInstruct: this.ExamineList.ledInstruct,
            clewState: this.reportLeads.clewState

          }
          // console.log(reportAudit, 222)
          lastSave(reportAudit).then(res => {
            if (res.code === 200) {
              if (val) {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 6000
                })
                this.$router.go(-1)
              }
            } else {
              if (val) {
                this.$message({
                  message: '保存失败',
                  type: 'error',
                  duration: 6000
                })
              }
            }
          })
        } else {
          if (val) {
            this.$message({
              message: '请填写审核意见意见内容',
              type: 'error',
              duration: 6000
            })
          }
        }
      })
    },
    saveone(val) {
      const submitObj = {}
      // 主键ID
      // this.idFiles = this.reportLeads.clueId
      submitObj.clueId = this.reportLeads.clueId
      submitObj.clueName = this.form.clueName
      const array = []
      this.form.reportingBody.forEach(el => {
        const obj = {}
        obj.reportingBody = el
        array.push(obj)
      })
      submitObj.reportingBodies = array
      submitObj.linkId = this.form.linkId
      submitObj.triggerPoint = this.form.triggerPoint
      submitObj.triggerOther = this.form.triggerOther
      const ary0 = []
      this.form.psclueId.forEach(el => {
        const obj3 = {}
        if (el === '1401') {
          el = '1401-' + this.supplementOne
        } else if (el === '1402') {
          el = '1402-' + this.supplementTwo
        }
        obj3.psclueId = el
        ary0.push(obj3)
      })
      submitObj.rcriminalType = ary0
      const ary = []
      this.form.IDCardData.forEach(el => {
        const obj = {}
        obj.attachTitle = el.attachTitle
        obj.attachType = el.attachType
        obj.attachContent = el.attachContent
        obj.uploadUser = el.uploadUser
        ary.push(obj)
      })
      submitObj.rsubjectIdentity = ary
      const arr = []
      this.form.accountData.forEach(el => {
        const obj1 = {}
        obj1.attachTitle = el.attachTitle
        obj1.attachType = el.attachType
        obj1.attachContent = el.attachContent
        obj1.uploadUser = el.uploadUser
        obj1.accountTitle = el.accountTitle
        arr.push(obj1)
      })
      submitObj.raccountInformation = arr
      submitObj.tradeStartDate = this.form.tradeDate[0] // 交易日期
      submitObj.tradeEndDate = this.form.tradeDate[1] // 交易日期
      const obj2 = {}
      obj2.districtFlag = this.form.districtFlag // 控制地区三个
      obj2.district = this.form.district
      obj2.city = this.form.city
      submitObj.rdesignAreas = this.form.rdesignAreas.citys
      submitObj.rdesignArea = obj2
      submitObj.moneyRmb = this.form.moneyRmb // 本币
      submitObj.moneyUsd = this.form.moneyUsd // 外币
      submitObj.analysis = this.form.analysis // 分析概况
      submitObj.annexId = this.idFiles // 附件
      submitObj.auditingUser = this.form.auditingUser
      submitObj.auditingUserTel = this.form.auditingUserTel
      submitObj.deptOpinion = this.form.deptOpinion
      submitObj.createUser = this.form.createUser
      submitObj.createUserTel = this.form.createUserTel
      this.$refs.rdesignAreas.validate(valid => {
        if (valid) {
          this.cityFlag = true
        } else {
          this.cityFlag = false
        }
      })
      this.$refs.validForm.validate(valid => {
        if (valid && this.cityFlag) {
          backSave(submitObj).then(res => {
            if (res.code === 200) {
              if (val) {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 6000
                })
                this.$router.go(-1)
              }
            } else {
              if (val) {
                this.$message({
                  message: '保存失败',
                  type: 'error',
                  duration: 6000
                })
              }
            }
          })
        }
      })
    },
    getProvince() {
      province().then(res => {
        if (res.code === 200) {
          this.provinceData = res.data
        }
      })
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
    // 上传账号信息 --Success
    account_onSuccess(response, file, fileList) {
      if (response.code === 200) {
        response.data.forEach(item => {
          this.form.accountData.push(item)
        })
        this.successOrError('上传成功', 'success')
      } else if (response.code === 205) {
        this.successOrError('上传内容不能为空', 'info')
      } else {
        this.successOrError('上传失败', 'info')
      }
    },
    account_onError() {
      this.successOrError('上传失败', 'info')
    },
    saves(val) {
      this.$refs.reportAnalyzeDistrictList.validate(valid => {
        if (valid) {
          this.cityFlag2 = true
        } else {
          this.cityFlag2 = false
        }
      })
      this.$refs.validForm1.validate(valid => {
        if (valid && this.cityFlag2) {
          const reportAnalyze = {
            reportAnalyzeDistrictList: this.AnalysisList.reportAnalyzeDistrictList.citys,
            districtFlag: this.AnalysisList.districtFlag,
            annexId: this.idFiles, // 附件
            district: this.AnalysisList.district,
            city: this.AnalysisList.city,
            moneyRmb: this.AnalysisList.moneyRmb,
            moneyUsd: this.AnalysisList.moneyUsd,
            acac: this.AnalysisList.acac,
            acacOther: this.AnalysisList.acacOther,
            analyseOpinion: this.AnalysisList.analyseOpinion,
            analyseOpinionOther: this.AnalysisList.analyseOpinionOther,
            evaluate: this.AnalysisList.evaluate,
            evaluateOther: this.AnalysisList.evaluateOther,
            isvisible: this.AnalysisList.isvisible,
            opinionAnalysis: this.AnalysisList.summary,
            clewState: this.reportLeads.clewState,
            clueId: this.reportLeads.clueId
          }
          saveApi(reportAnalyze).then(res => {
            if (res.code === 200) {
              if (val) {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 6000
                })
                this.$router.go(-1)
              }
            } else {
              if (val) {
                this.$message({
                  message: '保存失败',
                  type: 'error',
                  duration: 6000
                })
              }
            }
          })
        } else {
          if (val) {
            this.$message({
              message: '请填写分析研判意见内容',
              type: 'error',
              duration: 6000
            })
          }
        }
      })
    },
    getData() {
      rinmList()
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            this.rinmOptions = res.data
          } else {
            res.message
          }
        })
        .then(() => {
          this.list = this.rinmOptions.map(item => {
            return { value: item.riid, label: item.rinm }
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.indexOf(query) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    iseras(rule, value, callback) {
      // console.log(typeof value)
      if (value === '') {
        callback(new Error('请选择地区'))
      } else {
        if (this.form.districtFlag === '1') {
          if (this.form.city === '') {
            callback()
          } else {
            if (!commonPattern.spaceBar.test(this.form.city)) {
              callback(new Error('内容不能含有空格'))
            } else if (
              commonPattern.specialChar.test(this.form.city) ||
              commonPattern.specialEng.test(this.form.city)
            ) {
              callback(new Error('内容不能填写特殊字符'))
            } else {
              callback()
            }
          }
        } else if (this.form.districtFlag === '2') {
          callback()
        }
      }
    },
    // 校验身份证号位数及特殊字符空格中英文
    validateAgentNum(rule, value, callback) {
      if (value !== null && value !== '' && value !== undefined) {
        if (
          this.form.IDCardData[rule.field.substr(rule.field.indexOf('.') + 1, 1)].attachType ===
          '110001' ||
        this.form.IDCardData[rule.field.substr(rule.field.indexOf('.') + 1, 1)].attachType ===
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
    szisValidInput1(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementOne)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialChar.test(this.supplementOne) ||
        commonPattern.specialEng.test(this.supplementOne)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementOne === '') {
        callback(new Error('内容不能为空'))
      } else {
        callback()
      }
    },
    szisValidInput2(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementTwo)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialChar.test(this.supplementTwo) ||
        commonPattern.specialEng.test(this.supplementTwo)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementTwo === '') {
        callback(new Error('内容不能为空'))
      } else {
        callback()
      }
    },
    onError() {
      this.successOrError('上传失败', 'info')
    },
    // 分析附件上传
    fxuploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.load = false
        // console.log(this.idFiles === '')
        if (this.idFiles === '') {
          this.idFiles = response.data
        }
        this.reportClueAttachDos.push(file.name)
        this.successOrError('上传成功', 'success')
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    // 添加账户信息
    addAccount() {
      const hold = {
        accountTitle: '',
        attachContent: '',
        attachTitle: '',
        attachType: '',
        uploadUser: ''
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
          this.successOrError('刪除成功', 'success')
        })
        .catch(() => {})
    },
    // 添加身份信息
    addIdentity() {
      const hold = {
        attachTitle: '',
        attachContent: '',
        attachType: '',
        uploadUser: ''
      }
      this.form.IDCardData.push(hold)
    },
    // 下载账户模板
    downAccount() {
      location.href = `/monitor/reportLeads/downloadTradeAccount?token=${this.token}`
    },
    downIDCard() {
      location.href = `/monitor/reportLeads/downloadTradeIdent?token=${this.token}`
    },
    beforeAvatarUpload(file) {
      this.load = true
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.load = false
        this.$message({
          message: '上传文件大小不能超过500MB',
          type: 'error',
          duration: 6000
        })
      }
      // console.log(file)
      const names = file.name.substr(0, 2) === '00'
      // console.log(names)
      if (!names) {
        this.load = false
        this.$message({
          message: '该类型文件必须以00开头',
          type: 'error',
          duration: 6000
        })
      }
      return isLt500M && names
    },
    beforeAvatarUpload2(file) {
      this.load = true
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.load = false
        this.$message({
          message: '上传文件大小不能超过500MB',
          type: 'error',
          duration: 6000
        })
      }
      // console.log(file)
      const names = file.name.substr(0, 2) === '01'
      // console.log(names)
      if (!names) {
        this.load = false
        this.$message({
          message: '该类型文件必须以01开头',
          type: 'error',
          duration: 6000
        })
      }
      return isLt500M && names
    },
    beforeAvatarUpload3(file) {
      this.load = true
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.load = false
        this.$message({
          message: '上传文件大小不能超过500MB',
          type: 'error',
          duration: 6000
        })
      }
      // console.log(file)
      const names = file.name.substr(0, 2) === '02'
      // console.log(names)
      if (!names) {
        this.load = false
        this.$message({
          message: '该类型文件必须以02开头',
          type: 'error',
          duration: 6000
        })
      }
      return isLt500M && names
    },
    beforeAvatarUpload4(file) {
      this.load = true
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.load = false
        this.$message({
          message: '上传文件大小不能超过500MB',
          type: 'error',
          duration: 6000
        })
      }
      // console.log(file)
      const names = file.name.substr(0, 2) === '03'
      // console.log(names)
      if (!names) {
        this.load = false
        this.$message({
          message: '该类型文件必须以03开头',
          type: 'error',
          duration: 6000
        })
      }
      // 不可以相同名字
      // this.fileList1.push(file)
      // const isName = this.isFileNameSame(this.fileList1)
      // const w = !isName
      // if (isName) {
      //   this.$confirm('上传的文件名称不能重复', '提示', {
      //     confirmButtonText: '确 定',
      //     showCancelButton: false,
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       this.fileList1.splice(this.fileList1.length - 1, 1)
      //     })
      //     .catch()
      //   return w
      // }
      return isLt500M && names
    },
    // 下载附件
    downFile(file) {
      // console.log(file, 888)
      location.href = '/file-service/upload/download/' + file.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
    },
    // 删除附件
    handleRemove(file, fileList) {
      if (file && file.status === 'success') {
        if (file.response) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
        } else if (file.attachId) {
          this.delUrl = 'file-service/upload/delete-attach/' + file.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
        }
        // this.delUrl = 'file-service/upload/delete-attach/' + file.attachId
        delAttach('', this.delUrl).then(res => {
          this.$message({
            message: '删除附件成功',
            type: 'success',
            duration: 6000
          })
        })
      }
    },
    handleRemove1(file, fileList) {
      if (file.name.substr(0, 2) === '00') {
        if (file && file.status === 'success') {
          if (file.response) {
            this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
          } else {
            this.delUrl = 'file-service/upload/delete-attach/' + file.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
          }
          delAttach('', this.delUrl).then(res => {
            this.$message({
              message: '删除附件成功',
              type: 'success',
              duration: 6000
            })
          })
        }
      }
    },
    handleRemove2(file, fileList) {
      if (file.name.substr(0, 2) === '01') {
        if (file && file.status === 'success') {
          if (file.response) {
            this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
          } else {
            this.delUrl = 'file-service/upload/delete-attach/' + file.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
          }
          delAttach('', this.delUrl).then(res => {
            this.$message({
              message: '删除附件成功',
              type: 'success',
              duration: 6000
            })
          })
        }
      }
    },
    handleRemove3(file, fileList) {
      if (file.name.substr(0, 2) === '02') {
        if (file && file.status === 'success') {
          if (file.response) {
            this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
          } else {
            this.delUrl = 'file-service/upload/delete-attach/' + file.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
          }
          delAttach('', this.delUrl).then(res => {
            this.$message({
              message: '删除附件成功',
              type: 'success',
              duration: 6000
            })
          })
        }
      }
    },
    handleRemove4(file, fileList) {
      if (file.name.substr(0, 2) === '03') {
        if (file && file.status === 'success') {
          if (file.response) {
            this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
          } else {
            this.delUrl = 'file-service/upload/delete-attach/' + file.attachId + '?' + 'moduleName=' + encodeURI('上报分析申请')
          }
          delAttach('', this.delUrl).then(res => {
            this.$message({
              message: '删除附件成功',
              type: 'success',
              duration: 6000
            })
          })
        }
      }
    },
    beforeAvatarUpload5(file) {
      this.load = true
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.load = false
        this.$message({
          message: '上传文件大小不能超过500MB',
          type: 'error',
          duration: 6000
        })
      }
      return isLt500M
    },
    addcity() {
      const obj = {
        districtFlag: '',
        district: '',
        city: ''
      }
      this.form.rdesignAreas.citys.push(obj)
    },
    addcitys() {
      const obj = {
        districtFlag: '',
        district: '',
        city: ''
      }
      this.AnalysisList.reportAnalyzeDistrictList.citys.push(obj)
    },
    // 身份信息
    sfuploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.ids2 = response.data
        this.reportClueAttachDos.push(file.name)
        this.successOrError('上传成功', 'success')
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    zhuploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.ids3 = response.data
        this.reportClueAttachDos.push(file.name)
        this.successOrError('上传成功', 'success')
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    jyuploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.ids4 = response.data
        this.reportClueAttachDos.push(file.name)
        this.successOrError('上传成功', 'success')
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    // 上传回显身份证信息 --Success
    onSuccess(response, file, fileList) {
      if (response.code === 200) {
        response.data.forEach(item => {
          this.form.IDCardData.push(item)
        })
        this.successOrError('上传成功', 'success')
      } else if (response.code === 205) {
        this.successOrError('上传内容不能为空', 'info')
      } else {
        this.successOrError('上传失败', 'info')
      }
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
          this.successOrError('删除成功', 'success')
        })
        .catch(() => {})
    },
    // 成功或失败
    successOrError(msg, type, time) {
      this.$message({
        message: msg || '操作成功',
        type: type || 'info',
        duration: time || 6000
      })
    },
    // 获取国家
    getCountry() {
      country().then(res => {
        if (res.code === 200) {
          res.data.list = res.data.list.filter(item => {
            return item.numCode !== '344' && item.numCode !== '446' && item.numCode !== '158'
          })
          this.countryData = res.data.list
        }
      })
    },
    countryOrProvince(val) {
      this.form.district = ''
    },
    countryOrProvince1(val) {
      this.AnalysisList.district = ''
    },
    // input校验
    NospaceBarInput(rule, value, callback) {
      if (value === '' || value === undefined) {
        callback(new Error('内容不能为空'))
      }
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // input校验
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
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
    isValidInputs(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('分析触发点中其他不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('分析触发点中其他不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 获取涉罪类型
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'SFZJ':
              this.attachTypeArr = res.data
              break
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break

            default:
              break
          }
        }
      })
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.psclueId.indexOf('1402') !== -1) {
        this.isReplenishTwo = true
      } else {
        this.isReplenishTwo = false
      }
      if (this.form.psclueId.indexOf('1401') !== -1) {
        this.isReplenishOne = true
      } else {
        this.isReplenishOne = false
      }
    },
    isValidMoneyss(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (!this.moneyObjs.moneyRmb === '' || !this.moneyObjs.moneyUsd === '') {
        callback(new Error('内容不能为空'))
      }
      if (this.moneyObjs.moneyRmb !== '' && this.moneyObjs.moneyUsd !== '') {
        if (!money.test(this.moneyObjs.moneyRmb)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          if (!money.test(this.moneyObjs.moneyUsd)) {
            callback(new Error('请输入正确的数字，最多保留三位小数!'))
          } else {
            callback()
          }
        }
      }
      if (this.moneyObjs.moneyRmb !== '' || this.moneyObjs.moneyUsd === '') {
        if (value > 99999999999999999999) {
          callback(new Error('最多输入20位!'))
          return
        } else if (!money.test(this.moneyObjs.moneyRmb)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      }
      if (this.moneyObjs.moneyRmb === '' || this.moneyObjs.moneyUsd !== '') {
        if (value > 99999999999999999999) {
          callback(new Error('最多输入20位!'))
          return
        } else if (!money.test(this.moneyObjs.moneyUsd)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      }
    },
    removecity(item) {
      var index = this.form.rdesignAreas.citys.indexOf(item)
      if (index !== -1) {
        this.form.rdesignAreas.citys.splice(index, 1)
      }
    },
    removecitys(item) {
      var index = this.AnalysisList.reportAnalyzeDistrictList.citys.indexOf(item)
      if (index !== -1) {
        this.AnalysisList.reportAnalyzeDistrictList.citys.splice(index, 1)
      }
    },
    // 金额校验
    isValidMoneys(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      // console.log(this.moneyObj.moneyRmb, 888)
      // 两个都为空
      if (!this.moneyObj.moneyRmb && !this.moneyObj.moneyUsd) {
        callback(new Error('内容不能为空'))
      } else if (this.moneyObj.moneyRmb && !this.moneyObj.moneyUsd) {
        if (this.moneyObj.moneyRmb > 99999999999999999999) {
          callback(new Error('最多输入20位!'))
          // return
        } else if (!money.test(this.moneyObj.moneyRmb)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      } else if (!this.moneyObj.moneyRmb && this.moneyObj.moneyUsd) {
        if (this.moneyObj.moneyUsd > 99999999999999999999) {
          callback(new Error('最多输入20位!'))
          // return
        } else if (!money.test(this.moneyObj.moneyUsd)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      } else if (this.moneyObj.moneyRmb && this.moneyObj.moneyUsd) {
        if (
          this.moneyObj.moneyRmb > 99999999999999999999 &&
          this.moneyObj.moneyUsd > 99999999999999999999
        ) {
          callback(new Error('最多输入20位!'))
          // return
        } else if (money.test(this.moneyObj.moneyRmb)) {
          // 本币
          if (money.test(this.moneyObj.moneyUsd)) {
            callback()
          } else {
            callback(new Error('请输入正确的数字，最多保留三位小数!'))
          }
        } else if (money.test(this.moneyObj.moneyUsd)) {
          // 外币
          if (money.test(this.moneyObj.moneyRmb)) {
            callback()
          } else {
            callback(new Error('请输入正确的数字，最多保留三位小数!'))
          }
        } else {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        }
      }
    },
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      // if (!commonPattern.spaceBar.test(value)) {
      //   callback(new Error('内容不能含有空格'))
      // } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
      //   callback(new Error('内容不能填写特殊字符'))
      // } else if (!commonPattern.number.test(value) && value !== '') {
      //   callback(new Error('必须输入数值'))
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
    // 数字检查
    onlyNumberValidate1(rule, value, callback) {
      if (value !== '') {
        if (!commonPattern.spaceBar.test(value)) {
          callback(new Error('内容不能含有空格'))
        } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
          callback(new Error('内容不能填写特殊字符'))
        } else if (!commonPattern.number.test(value) && value !== '') {
          callback(new Error('必须输入数值'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入电话号码'))
      }
    },
    isValidMoney(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (value > 99999999999999999999) {
        callback(new Error('最多输入20位!'))
        return
      }
      if (value === '') {
        callback(new Error('内容不能为空'))
      } else if (!money.test(value)) {
        callback(new Error('请输入正确的数字，最多保留三位小数!'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss">
.block {
  $border: 1px solid #ebeef5;
  $margin: 20px;
  .el-select {
    width: 100%;
  }
  .el-date-editor--date {
    min-width: 100%;
  }
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
  }
}
.saveBtn {
  text-align: center;
}
</style>