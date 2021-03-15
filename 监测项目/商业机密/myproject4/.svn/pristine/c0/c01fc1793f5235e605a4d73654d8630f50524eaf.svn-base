<template>
  <div
    class="dataEntry_add"
    v-loading="subLoading"
    element-loading-text="提交中，请稍侯..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <el-card>
      <a
        @click="goBack"
        class="back"
        :style="backImg"
      ></a>
      <div slot="header">
        <span>数据录入申请</span>
      </div>
      <div>
        <el-row>
          <el-col
            :span="2"
            style="padding-top:7px"
          >流程操作：</el-col>
          <el-col :span="22">
            <el-button
              v-if="this.$route.query.pageFlag!=='look'"
              @click="handleSave"
              type="warning"
              plain
            >保 存</el-button>
            <el-button
              v-if="this.$route.query.pageFlag!=='look'"
              @click="handleSubmit"
              type="primary"
              plain
            >提 交</el-button>
            <el-button
              type="primary"
              plain
              :disabled="this.activeName !=='1'"
              @click="handlePrint"
            >打 印</el-button>
          </el-col>
        </el-row>

        <el-tabs
          type="border-card"
          style="margin-top:20px"
          v-model="activeName"
          @tab-click="handleClick"
        >

          <el-tab-pane
            label="数据录入审批单"
            name="1"
          >
            <div style="text-align:center">
              <h3>录入数据审批单</h3>
            </div>
            <el-form
              :model="inputForm"
              label-width="110px"
              class="styleFist"
            >
              <el-row>
                <el-col
                  :span="12"
                  style="border-right:0;"
                >
                  <el-form-item
                    label="录入方式"
                    prop="appInputmode"
                  >
                    <el-select
                      :disabled="true"
                      v-model="inputForm.appInputmode"
                      placeholder="请选择"
                      @change="modeTadiaChange"
                    >
                      <el-option
                        v-for="(item, index) in optionsmode"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="录入类型"
                    prop="appInputtype"
                  >
                    <el-select
                      :disabled="true"
                      v-model="inputForm.appInputtype"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="文件类型"
                    prop="filetype"
                  >
                    <el-input
                      :disabled="true"
                      v-model="inputForm.filetype"
                      placeholder="请输入文件类型,最长为20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="信息来源"
                    prop="inforsource"
                  >
                    <el-input
                      :disabled="true"
                      v-model="inputForm.inforsource"
                      placeholder="请输入信息来源,最长为20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col
                  :span="12"
                  style="border-right:0;"
                >
                  <el-form-item
                    label="申请人"
                    prop=""
                  >
                    <el-input
                      :disabled="true"
                      v-model="inputForm.proposer"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="申请处室"
                    prop=""
                  >
                    <el-input
                      :disabled="true"
                      v-model="inputForm.applyOffice"
                      placeholder="请输入申请处室,最长为20字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="12"
                  style="border-right:0;"
                >
                  <el-form-item
                    label="申请时间"
                    prop=""
                  >
                    <el-date-picker
                      :disabled="true"
                      v-model="inputForm.applyTime"
                      type="date"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="录入时间"
                    prop="inputTime"
                  >
                    <el-date-picker
                      :disabled="true"
                      v-model="inputForm.inputTime"
                      type="date"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="录入内容"
                    prop="inputContent"
                  >
                    <el-input
                      :disabled="true"
                      v-model="inputForm.inputContent"
                      placeholder="请输入录入内容,最长为200字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="内容描述"
                    prop=""
                  >
                    <el-input
                      :disabled="true"
                      v-model="inputForm.contentDesc"
                      placeholder="请输入内容描述,最长为200字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="备注"
                    prop=""
                  >
                    <el-input
                      :disabled="true"
                      v-model="inputForm.remark"
                      placeholder="请输入内容描述,最长为200字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="处领导审批"
                    prop=""
                  >
                    <el-input
                      :disabled="true"
                      maxlength="100"
                      v-model="inputForm.chuApproval"
                      placeholder="请输入处领导审批，最长为50字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="中心领导审批"
                    prop=""
                  >
                    <el-input
                      maxlength="100"
                      :disabled="true"
                      v-model="inputForm.centreApproval"
                      placeholder="请输入中心领导审批，最长为50字符"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    label="附件"
                    prop=""
                  >
                    <div v-if="fileList.length !== 0">
                      <div
                        v-for="(item,idx) in fileList"
                        :key="idx"
                      >
                        <el-tooltip
                          effect="dark"
                          :content="item.attachName"
                          placement="top"
                        >>
                          <el-button
                            class="downloadStyle"
                            type="text"
                            @click="hanldDownload(item.attachId)"
                          >
                            {{item.attachName}}
                          </el-button>
                        </el-tooltip>
                      </div>

                      <div style="clear:both"></div>
                    </div>

                    <div v-else>
                      <span>无</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label="录入信息"
            name="2"
          >

            <!-- 国际协查文件管理 -->

            <el-form
              :disabled="this.$route.query.pageFlag==='look'"
              :model="internationForm"
              ref="refinternation"
              :rules="internationFormRules"
              v-if="inputInforForm.inputMode === '1' && inputInforForm.inputtype === '1'"
            >
              <h3
                style="text-align:center"
                v-if="inputInforForm.inputMode === '1' && inputInforForm.inputtype === '1'"
              >国际协查文件管理</h3>
              <el-tabs
                v-model="interInfo"
                @tab-click="handleClickInfo"
              >
                <el-tab-pane
                  label="基本信息"
                  name="first"
                >
                  <fieldset class="classFiledset">
                    <legend>常用信息</legend>
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <el-form-item
                          label="中心编号"
                          prop="centerNum"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.centerNum"
                            placeholder="请输入中心编号，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item
                          label="类型"
                          prop="leibie"
                        >
                          <el-select
                            disabled
                            clearable
                            v-model="internationForm.leibie"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in tyoos"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item
                          label="常用国家/地区（请求方）"
                          prop=""
                        >
                          <el-select
                            clearable
                            v-model="internationForm.qiNation"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              v-for="(item,idx) in  countryOption"
                              :label="item.chSName"
                              :value="item.numCode"
                              :key="idx"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item
                          label="常用国家/地区（披露方）"
                          prop=""
                        >
                          <el-select
                            clearable
                            v-model="internationForm.piNation"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              v-for="(item,idx) in  countryOption"
                              :label="item.chSName"
                              :value="item.numCode"
                              :key="idx"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </fieldset>

                  <fieldset class="classFiledset">
                    <legend v-if="internationForm.leibie==='0'">请求方信息</legend>
                    <legend v-if="internationForm.leibie==='1'">信息披露方</legend>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="编号"
                          prop="qnum"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.qnum"
                            placeholder="请输入内容，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="国家/地区"
                          prop="qnation"
                        >
                          <el-select
                            clearable
                            v-model="internationForm.qnation"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              v-for="(item,idx) in  countryOption"
                              :label="item.chSName"
                              :value="item.numCode"
                              :key="idx"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="机构"
                          prop="qorg"
                        >
                          <el-input
                            maxlength="50"
                            v-model="internationForm.qorg"
                            placeholder="请输入机构，最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="联系人"
                          prop="qlinkman"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.qlinkman"
                            placeholder="请输入联系人，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="联系人职务"
                          prop="qduty"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.qduty"
                            placeholder="请输入联系人职务，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="电话"
                          prop="qphone"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.qphone"
                            placeholder="请输入电话，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="传真"
                          prop="qfax"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.qfax"
                            placeholder="请输入传真，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="邮箱"
                          prop="qemail"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.qemail"
                            placeholder="请输入邮箱，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="地址"
                          prop="qaddress"
                        >
                          <el-input
                            maxlength="50"
                            v-model="internationForm.qaddress"
                            placeholder="请输入地址，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="法定代表人"
                          prop="qlegalrepre"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.qlegalrepre"
                            placeholder="请输入法定代表人，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="签名"
                          prop="qsignature"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.qsignature"
                            placeholder="请输入签名，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="日期"
                          prop="qdate"
                        >
                          <el-date-picker
                            type="date"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            v-model="internationForm.qdate"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item
                          label="备注"
                          prop="qremark"
                        >
                          <el-input
                            maxlength="500"
                            v-model="internationForm.qremark"
                            placeholder="请输入备注，最长500字符"
                            type="textarea"
                            :rows="3"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </fieldset>

                  <fieldset class="classFiledset">
                    <legend v-if="internationForm.leibie==='0'">披露方信息</legend>
                    <legend v-if="internationForm.leibie==='1'">信息披露至</legend>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="国家/地区">
                          <el-select
                            clearable
                            v-model="internationForm.fnation"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              v-for="(item,idx) in  countryOption"
                              :label="item.chSName"
                              :value="item.numCode"
                              :key="idx"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="机构"
                          prop="forg"
                        >
                          <el-input
                            maxlength="50"
                            v-model="internationForm.forg"
                            placeholder="请输入机构，最长为50字符"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="联系人"
                          prop="flinkman"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.flinkman"
                            placeholder="请输入联系人，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="联系人职务"
                          prop="fduty"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.fduty"
                            placeholder="请输入联系人职务，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="电话"
                          prop="fphone"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.fphone"
                            placeholder="请输入电话，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="传真"
                          prop="ffax"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.ffax"
                            placeholder="请输入传真，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="邮箱"
                          prop="femail"
                        >
                          <el-input
                            maxlength="30"
                            v-model="internationForm.femail"
                            placeholder="请输入邮箱，最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="地址"
                          prop="faddress"
                        >
                          <el-input
                            maxlength="50"
                            v-model="internationForm.faddress"
                            placeholder="请输入地址，最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- <el-row>
                      <el-col :span="24">
                        <el-form-item
                          label="备注"
                          prop="fremark"
                        >
                          <el-input
                            maxlength="500"
                            v-model="internationForm.fremark"
                            placeholder="请输入内容，最长500字符"
                            type="textarea"
                            :rows="3"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row> -->
                  </fieldset>
                  <fieldset class="classFiledset">
                    <legend>金融及其他信息</legend>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item
                          label="关联企业"
                          prop="fenterprise"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.fenterprise"
                            maxlength="30"
                            placeholder="请输入关联企业,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="地址"
                          prop="fadress"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.fadress"
                            maxlength="50"
                            placeholder="请输入地址,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item
                          label="银行名称"
                          prop="fbankname"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.fbankname"
                            maxlength="30"
                            placeholder="请输入银行名称,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="银行账号"
                          prop="fbankaccount"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.fbankaccount"
                            maxlength="30"
                            placeholder="请输入银行账号,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">

                      <el-col :span="12">
                        <el-form-item
                          label="银行地址"
                          prop="fbankadress"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.fbankadress"
                            maxlength="50"
                            placeholder="请输入银行地址,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </fieldset>

                  <div class="block">
                    <el-row :gutter="20">
                      <el-col :span="24">
                        <el-form-item
                          label="请描述该调查案件的情况，并陈述其主要违法事实："
                          prop="anjianCase"
                        >
                          <el-input
                            :disabled="disabled"
                            :autosize="{ minRows: 2, maxRows: 14}"
                            v-model="internationForm.anjianCase"
                            type="textarea"
                            maxlength="500"
                            placeholder="请描述该调查案件的情况,最长500字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="24">
                        <el-form-item
                          label="您需要披露方的FIU提供什么样的信息？"
                          prop="plMess"
                        >
                          <el-input
                            :disabled="disabled"
                            :autosize="{ minRows: 2, maxRows: 14}"
                            v-model="internationForm.plMess"
                            type="textarea"
                            maxlength="500"
                            placeholder="您需要披露方的FIU提供什么样的信息？最长500字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="24">
                        <el-form-item
                          label="通过协查获得的信息将作何用？怎样使用？"
                          prop="messEmploy"
                        >
                          <el-input
                            :disabled="disabled"
                            :autosize="{ minRows: 2, maxRows: 14}"
                            v-model="internationForm.messEmploy"
                            type="textarea"
                            maxlength="500"
                            placeholder="通过协查获得的信息将作何用？怎样使用？最长500字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="24">
                        <el-form-item
                          label="有没有正在进行的正式调查或司法程序？"
                          prop="judProcedure"
                        >
                          <el-input
                            :disabled="disabled"
                            :autosize="{ minRows: 2, maxRows: 14}"
                            v-model="internationForm.judProcedure"
                            type="textarea"
                            maxlength="500"
                            placeholder="有没有正在进行的正式调查或司法程序？最长500字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="24">
                        <el-form-item
                          label="你认为涉案资产会被没收或被冻结吗？"
                          prop="frozen"
                        >
                          <el-input
                            :disabled="disabled"
                            :autosize="{ minRows: 2, maxRows: 14}"
                            v-model="internationForm.frozen"
                            type="textarea"
                            maxlength="500"
                            placeholder="你认为涉案资产会被没收或被冻结吗？最长500字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="24">
                        <el-form-item
                          label="请陈述涉案资产的数量、类型或是性质："
                          prop="propertyMess"
                        >
                          <el-input
                            :disabled="disabled"
                            :autosize="{ minRows: 2, maxRows: 14}"
                            v-model="internationForm.propertyMess"
                            type="textarea"
                            maxlength="500"
                            placeholder="请陈述涉案资产的数量、类型或是性质，最长500字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="24">
                        <el-form-item
                          label="调查中涉及哪些其他机构或国家？"
                          prop="involeNation"
                        >
                          <el-input
                            :disabled="disabled"
                            :autosize="{ minRows: 2, maxRows: 14}"
                            v-model="internationForm.involeNation"
                            type="textarea"
                            maxlength="500"
                            placeholder="调查中涉及哪些其他机构或国家？最长500字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane
                  label="主体信息"
                  name="second"
                >
                  <div style="height:32px">
                    <el-button
                      style="float:right"
                      @click="add"
                    >新增</el-button>
                  </div>
                  <fieldset class="classFiledset">
                    <legend>主体信息</legend>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="主体名称(自然人或企业)"
                          prop="ztName"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztName"
                            maxlength="50"
                            placeholder="请输入主体名称,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="别名"
                          prop="ztBname"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztBname"
                            maxlength="50"
                            placeholder="请输入别名,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="地址"
                          prop="ztAddress"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztAddress"
                            maxlength="50"
                            placeholder="请输入地址,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="该主体与本调查的关系"
                          prop="ztGuanxi"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztGuanxi"
                            maxlength="50"
                            placeholder="请输入该主体与本调查的关系,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="职业活动"
                          prop="ztActivity"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztActivity"
                            maxlength="50"
                            placeholder="请输入职业活动,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="证件号码(社会保险号，营业执照等)"
                          prop="ztIdnum"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztIdnum"
                            maxlength="50"
                            placeholder="请输入证件号码,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="护照号"
                          prop="ztPassport"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztPassport"
                            maxlength="50"
                            placeholder="请输入护照号,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="颁发机构"
                          prop="ztIdnumorg"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztIdnumorg"
                            maxlength="50"
                            placeholder="请输入颁发机构,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="其他证件号码"
                          prop="ztOtheridnum"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztOtheridnum"
                            maxlength="50"
                            placeholder="请输入其他证件号码,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="其他证件号码颁发机构"
                          prop="ztOtheridnumorg"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztOtheridnumorg"
                            maxlength="50"
                            placeholder="请输入其他证件号码颁发机构,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="电话号码"
                          prop="ztPhone"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztPhone"
                            maxlength="50"
                            placeholder="请输入电话号码,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="其他(请注明)"
                          prop="ztOther"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztOther"
                            maxlength="50"
                            placeholder="请输入其他,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="国籍">
                          <el-select
                            :disabled="disabled"
                            clearable
                            v-model="internationForm.ztNationlity"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              v-for="(item,idx) in  countryOption"
                              :label="item.chSName"
                              :value="item.numCode"
                              :key="idx"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="性别"
                          prop="ztSex"
                        >
                          <el-select
                            :disabled="disabled"
                            clearable
                            v-model="internationForm.ztSex"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              label="男"
                              value="男"
                            ></el-option>
                            <el-option
                              label="女"
                              value="女"
                            ></el-option>
                          </el-select>
                          <!-- <el-input :disabled="disabled"   v-model="internationForm.ztSex" maxlength="50"  placeholder="请输入性别,最长50字符"></el-input> -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="生日"
                          prop="ztBirthday"
                        >
                          <el-date-picker
                            :disabled="disabled"
                            v-model="internationForm.ztBirthday"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="出生地"
                          label-width="70px"
                          prop="ztCity"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztCity"
                            placeholder="城市"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="ztProvinces">
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.ztProvinces"
                            placeholder="州/省"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="ztNation">
                          <el-select
                            :disabled="disabled"
                            v-model="internationForm.ztNation"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              v-for="(item,idx) in  countryOption"
                              :label="item.chSName"
                              :value="item.numCode"
                              :key="idx"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </fieldset>
                  <fieldset class="classFiledset">
                    <legend>交易对手信息</legend>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item
                          label="对方名称(自然人或企业)"
                          prop="rivlName"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.rivlName"
                            maxlength="30"
                            placeholder="请输入对方名称,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="对方证件号(社会保险号，营业执照等)"
                          prop="rivlIdnum"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.rivlIdnum"
                            maxlength="30"
                            placeholder="请输入对方证件号,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item
                          label="护照号"
                          prop="rivlPassportnum"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.rivlPassportnum"
                            maxlength="30"
                            placeholder="请输入护照号,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="银行名"
                          prop="rivlBankname"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.rivlBankname"
                            maxlength="30"
                            placeholder="请输入银行名,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">

                      <el-col :span="12">
                        <el-form-item
                          label="银行账号"
                          prop="rivlBankaccount"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.rivlBankaccount"
                            maxlength="30"
                            placeholder="请输入银行账号,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="交易日期"
                          prop="rivlTradedate"
                        >
                          <!-- <el-date-picker :picker-options="pickerOptions" :disabled="disabled" v-model="form.rivlTradedate" type="date" placeholder="选择日期">
              </el-date-picker> -->
                          <el-date-picker
                            :disabled="disabled"
                            v-model="internationForm.rivlTradedate"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item
                          label="交易金额"
                          prop="rivlTradeamount"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="internationForm.rivlTradeamount"
                            maxlength="20"
                            placeholder="请输入交易金额,最长20字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col
                        :span="12"
                        style="margin-top:30px"
                      >
                        <el-form-item
                          label="交易方向"
                          prop="rivlTradedirection"
                        >
                          <el-radio
                            :disabled="disabled"
                            v-model="internationForm.rivlTradedirection"
                            label="1"
                          >收款</el-radio>
                          <el-radio
                            :disabled="disabled"
                            v-model="internationForm.rivlTradedirection"
                            label="2"
                          >付款</el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </fieldset>
                  <!-- 开始 -->
                     <div class="vfor" v-for="(el,index) in myarr" :key="index">
                         <div style="height:32px">
        <el-button style="float:right"  :disabled="disabled"   @click.prevent="removeDomain(el)">删除</el-button>
      </div>
          <fieldset class="classFiledset">
                    <legend>主体信息{{index+2}}</legend>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="主体名称(自然人或企业)"
                          prop="ztName"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztName"
                            maxlength="50"
                            placeholder="请输入主体名称,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="别名"
                          prop="ztBname"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztBname"
                            maxlength="50"
                            placeholder="请输入别名,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="地址"
                          prop="ztAddress"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztAddress"
                            maxlength="50"
                            placeholder="请输入地址,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="该主体与本调查的关系"
                          prop="ztGuanxi"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztGuanxi"
                            maxlength="50"
                            placeholder="请输入该主体与本调查的关系,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="职业活动"
                          prop="ztActivity"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztActivity"
                            maxlength="50"
                            placeholder="请输入职业活动,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="证件号码(社会保险号，营业执照等)"
                          prop="ztIdnum"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztIdnum"
                            maxlength="50"
                            placeholder="请输入证件号码,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="护照号"
                          prop="ztPassport"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztPassport"
                            maxlength="50"
                            placeholder="请输入护照号,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="颁发机构"
                          prop="ztIdnumorg"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztIdnumorg"
                            maxlength="50"
                            placeholder="请输入颁发机构,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="其他证件号码"
                          prop="ztOtheridnum"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztOtheridnum"
                            maxlength="50"
                            placeholder="请输入其他证件号码,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="其他证件号码颁发机构"
                          prop="ztOtheridnumorg"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztOtheridnumorg"
                            maxlength="50"
                            placeholder="请输入其他证件号码颁发机构,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="电话号码"
                          prop="ztPhone"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztPhone"
                            maxlength="50"
                            placeholder="请输入电话号码,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="其他(请注明)"
                          prop="ztOther"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztOther"
                            maxlength="50"
                            placeholder="请输入其他,最长50字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="国籍">
                          <el-select
                            :disabled="disabled"
                            clearable
                            v-model="el.ztNationlity"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              v-for="(item,idx) in  countryOption"
                              :label="item.chSName"
                              :value="item.numCode"
                              :key="idx"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="性别"
                          prop="ztSex"
                        >
                          <el-select
                            :disabled="disabled"
                            clearable
                            v-model="el.ztSex"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              label="男"
                              value="男"
                            ></el-option>
                            <el-option
                              label="女"
                              value="女"
                            ></el-option>
                          </el-select>
                          <!-- <el-input :disabled="disabled"   v-model="el.ztSex" maxlength="50"  placeholder="请输入性别,最长50字符"></el-input> -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="生日"
                          prop="ztBirthday"
                        >
                          <el-date-picker
                            :disabled="disabled"
                            v-model="el.ztBirthday"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item
                          label="出生地"
                          label-width="70px"
                          prop="ztCity"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztCity"
                            placeholder="城市"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="ztProvinces">
                          <el-input
                            :disabled="disabled"
                            v-model="el.ztProvinces"
                            placeholder="州/省"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="ztNation">
                          <el-select
                            :disabled="disabled"
                            v-model="el.ztNation"
                            filterable
                            placeholder="请选择"
                            class="w100"
                          >
                            <el-option
                              v-for="(item,idx) in  countryOption"
                              :label="item.chSName"
                              :value="item.numCode"
                              :key="idx"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </fieldset>
                                    <fieldset class="classFiledset">
                    <legend>交易对手信息{{index+2}}</legend>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item
                          label="对方名称(自然人或企业)"
                          prop="rivlName"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.rivlName"
                            maxlength="30"
                            placeholder="请输入对方名称,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="对方证件号(社会保险号，营业执照等)"
                          prop="rivlIdnum"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.rivlIdnum"
                            maxlength="30"
                            placeholder="请输入对方证件号,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item
                          label="护照号"
                          prop="rivlPassportnum"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.rivlPassportnum"
                            maxlength="30"
                            placeholder="请输入护照号,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="银行名"
                          prop="rivlBankname"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.rivlBankname"
                            maxlength="30"
                            placeholder="请输入银行名,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">

                      <el-col :span="12">
                        <el-form-item
                          label="银行账号"
                          prop="rivlBankaccount"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.rivlBankaccount"
                            maxlength="30"
                            placeholder="请输入银行账号,最长30字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="交易日期"
                          prop="rivlTradedate"
                        >
                          <!-- <el-date-picker :picker-options="pickerOptions" :disabled="disabled" v-model="form.rivlTradedate" type="date" placeholder="选择日期">
              </el-date-picker> -->
                          <el-date-picker
                            :disabled="disabled"
                            v-model="el.rivlTradedate"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item
                          label="交易金额"
                          prop="rivlTradeamount"
                        >
                          <el-input
                            :disabled="disabled"
                            v-model="el.rivlTradeamount"
                            maxlength="20"
                            placeholder="请输入交易金额,最长20字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col
                        :span="12"
                        style="margin-top:30px"
                      >
                        <el-form-item
                          label="交易方向"
                          prop="rivlTradedirection"
                        >
                          <el-radio
                            :disabled="disabled"
                            v-model="el.rivlTradedirection"
                            label="1"
                          >收款</el-radio>
                          <el-radio
                            :disabled="disabled"
                            v-model="el.rivlTradedirection"
                            label="2"
                          >付款</el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </fieldset>

                     </div>
                </el-tab-pane>
              </el-tabs>
            </el-form>

            <!-- 反馈信息  -->
            <div
              class="apporderwrap"
              v-if="inputInforForm.inputMode === '1' && inputInforForm.inputtype === '2'"
              style="margin-top:50px"
            >
              <h3 style="text-align:center">反馈信息</h3>
              <InputInfo
                ref="refInputInfo"
                :banned="this.$route.query.pageFlag==='look'"
                @loadState='myload'
                :uploadChild="uploadFather"
                :formFather="formFather"
              ></InputInfo>
            </div>

            <!-- 境内协查类文件管理   -->
            <div
              class="apporderwrap"
              v-if="inputInforForm.inputMode === '1' && inputInforForm.inputtype === '3'"
              style="margin-top:50px"
            >
              <el-form>
                <!-- inputInforForm.inputtype -->
                <el-row>
                  <el-col :span="8">录入类型：{{NewappInputtype}}</el-col>
                  <el-col :span="8">文件类型：
                    <el-radio-group
                      v-model="types"
                      @change="radioChange"
                    >
                      <el-radio
                        disabled
                        :label="0"
                      >协查</el-radio>
                      <el-radio
                        disabled
                        :label="1"
                      >通报</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="8">
                    <el-checkbox
                      :disabled="this.$route.query.pageFlag==='look'"
                      v-model="database"
                      @change="goList"
                    >是否入名单库</el-checkbox>
                  </el-col>
                </el-row>
              </el-form>
              <h3 style="text-align:center">境内协查类文件管理</h3>
              <el-form
                :model="domesticForm"
                :disabled="this.$route.query.pageFlag==='look'"
                :rules="domesticFormRules"
                ref="refDomesForm"
              >
                <el-tabs
                  v-model="domestic"
                  @tab-click="domesticMethod"
                >
                  <el-tab-pane
                    label="录入信息"
                    name="ones"
                    v-if="types===0"
                  >
                    <fieldset class="classFiledset">
                      <legend>来件信息1</legend>
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <el-form-item
                            label="来件日期"
                            prop="receiveDate"
                          >
                            <el-date-picker
                              type="date"
                              :picker-options="pickerOptions"
                              value-format="yyyy-MM-dd"
                              v-model="domesticForm.receiveDate"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="协查文号"
                            prop="asssnum"
                          >
                            <el-input
                              maxlength="20"
                              v-model="domesticForm.asssnum"
                              placeholder="请输入内容，最长20字符"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="关联文号"
                            prop="relevancenum"
                          >
                            <el-input
                              maxlength="20"
                              v-model="domesticForm.relevancenum"
                              placeholder="请输入内容，最长20字符"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :span="8">
                          <el-form-item
                            label="协查类型"
                            prop="assstype"
                          >
                            <!-- <el-radio-group v-model="domesticForm.assstype">
                          <el-radio label="一级协查"></el-radio>
                          <el-radio label="研判分析"></el-radio>
                        </el-radio-group> -->
                            <el-select
                              v-model="domesticForm.assstype"
                              placeholder="请选择"
                            >
                              <el-option
                                label="一级协查"
                                value="一级协查"
                              ></el-option>
                              <el-option
                                label="研判分析"
                                value="研判分析"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="紧急程度"
                            prop="urgency"
                          >
                            <el-select
                              v-model="domesticForm.urgency"
                              placeholder="请选择"
                            >
                              <el-option
                                label="特别紧急"
                                value="特别紧急"
                              ></el-option>
                              <el-option
                                label="一般紧急"
                                value="一般紧急"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="来文标题"
                            prop="laiwentitle"
                          >
                            <el-input
                              maxlength="30"
                              v-model="domesticForm.laiwentitle"
                              placeholder="请输入内容，最长30字符"
                            ></el-input>
                          </el-form-item>

                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <el-form-item
                            label="案情标签"
                            prop="caselabel"
                          >
                            <el-input
                              maxlength="50"
                              v-model="domesticForm.caselabel"
                              placeholder="请输入内容，最长50字符"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="来文单位"
                            prop="laiwenUnit"
                          >
                            <el-select
                              maxlength="30"
                              v-model="domesticForm.laiwenUnit"
                              placeholder="请输入"
                            >
                              <el-option
                                v-for="item in this.laiwenUnitArr"
                                :key="item.codeId"
                                :label="item.codeName"
                                :value="item.codeName"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item
                            label="涉罪类型"
                            prop="crimetype"
                          >
                            <el-select
                              v-model="domesticForm.crimetype"
                              placeholder="请选择"
                              multiple
                            >
                              <el-option
                                v-for="item in this.sheZui"
                                :key="item.codeId"
                                :label="item.codeName"
                                :value="item.codeId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item
                            label="案情简介"
                            prop="Introductioncase"
                          >
                            <el-input
                              maxlength="400"
                              v-model="domesticForm.introductioncase"
                              placeholder="请输入内容，最长400字符"
                              type="textarea"
                              :rows="3"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item
                            label="请求事项"
                            prop="requestitem"
                          >
                            <el-input
                              maxlength="400"
                              type="textarea"
                              :rows="3"
                              v-model="domesticForm.requestitem"
                              placeholder="请输入内容，最长400字符"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item
                            label="协查名单"
                            prop="assList"
                          >
                            <el-input
                              v-model="domesticForm.assList"
                              placeholder="请输入内容"
                              type="textarea"
                              :rows="5"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row> -->
                    </fieldset>

                    <fieldset class="classFiledset">
                      <legend>来件信息2</legend>
                      <el-form
                        :model="informationPartss"
                        :disabled="this.$route.query.pageFlag==='look'"
                      >
                        <el-table
                          :data="informationPartss.inMessageTabledata"
                          width="95%"
                        >
                          <el-table-column label="联系人">
                            <template slot-scope="scope">
                              <el-form-item
                                :prop="'inMessageTabledata.'+scope.$index+'.inforName'"
                                :rules="[{ validator: isValidInput, trigger: 'blur' }]"
                              >
                                <el-input
                                  maxlength="32"
                                  v-model="scope.row.inforName"
                                  placeholder="请输入，最长32字符"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>

                          <el-table-column label="联系人电话">
                            <template slot-scope="scope">
                              <el-form-item :prop="'inMessageTabledata.'+scope.$index+'.inforPhone'">
                                <el-input
                                  maxlength="32"
                                  v-model="scope.row.inforPhone"
                                  placeholder="请输入，最长32字符"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="操作"
                            width="100"
                          >
                            <template slot-scope="scope">
                              <el-button
                                type="text"
                                @click="addInfor"
                              >增加</el-button>
                              <el-button
                                type="text"
                                v-if="scope.$index !== 0"
                                @click="deleteInfor(scope)"
                              >删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div style="margin:10px;border:1px"></div>
                        <el-table
                          :data="informationPartss.inReapTabledata"
                          width="95%"
                        >
                          <el-table-column label="负责人">
                            <template slot-scope="scope">
                              <el-form-item
                                :prop="'inReapTabledata.'+scope.$index+'.functionary'"
                                :rules="[{ validator: isValidInput, trigger: 'blur' }]"
                              >
                                <el-input
                                  maxlength="32"
                                  v-model="scope.row.functionary"
                                  placeholder="请输入，最长32字符"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column label="负责人电话">
                            <template slot-scope="scope">
                              <el-form-item :prop="'inReapTabledata.'+scope.$index+'.functionaryPhone'">
                                <el-input
                                  maxlength="32"
                                  v-model="scope.row.functionaryPhone"
                                  placeholder="请输入，最长32字符"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="操作"
                            width="100"
                          >
                            <template slot-scope="scope">
                              <el-button
                                type="text"
                                @click="addResp"
                              >增加</el-button>
                              <el-button
                                type="text"
                                v-if="scope.$index !== 0"
                                @click="deleteResp(scope)"
                              >删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form>
                    </fieldset>
                  </el-tab-pane>
                  <el-tab-pane
                    label="录入信息"
                    name="twos"
                    v-if="types===1"
                  >
                    <el-form
                      ref="formTwoTB"
                      :model="formTwoTB"
                      :rules="formTwoTBRules"
                      label-width="200px"
                      :disabled="this.$route.query.pageFlag==='look'"
                    >
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            label="可疑交易名称："
                            prop="adispose"
                          >
                            <el-input
                              v-model="formTwoTB.adispose"
                              placeholder="可疑交易名称,最长为30字符"
                              :maxlength="30"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="关联移送记录："
                            prop="triggerMessage"
                          >
                            <el-input
                              placeholder="关联移送记录,最长为200字符"
                              type="textarea"
                              v-model="formTwoTB.triggerMessage"
                              :maxlength="200"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            label="主要交易发生地："
                            prop="bodyMessage"
                          >
                            <el-input
                              placeholder="主要交易发生地,最长为50字符"
                              v-model="formTwoTB.bodyMessage"
                              :maxlength="50"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="交易时间段："
                            prop="adealdate"
                            class="oddinput"
                          >
                            <el-date-picker
                              v-model="formTwoTB.adealdate"
                              type="daterange"
                              range-separator="至"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                            >
                            </el-date-picker>
                            <!-- <el-input v-model="formTwoTB.adealdate" placeholder="请输入"></el-input> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            label="累计交易金额（人民币）："
                            prop="armb"
                          >
                            <el-input
                              v-model="formTwoTB.armb"
                              placeholder="万元，最长为9字符"
                              :maxlength="9"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="累计交易金额（外币）："
                            prop="ayb"
                          >
                            <el-input
                              v-model="formTwoTB.ayb"
                              placeholder="万美元，最长为9字符"
                              :maxlength="9"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            label="涉及交易笔数："
                            prop="anumber"
                          >
                            <el-input
                              placeholder="涉及交易笔数,最长为9字符"
                              v-model="formTwoTB.anumber"
                              :maxlength="9"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="涉及主要账户个数："
                            prop="amainnumber"
                          >
                            <el-input
                              placeholder="涉及主要账户个数,最长为9字符"
                              v-model="formTwoTB.amainnumber"
                              :maxlength="9"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item
                            label="初步判断："
                            prop="ajudge"
                          >
                            <el-select
                              style="width:100%"
                              v-model="formTwoTB.ajudge"
                              clearable
                              placeholder="请选择"
                              multiple
                            >
                              <el-option
                                v-for="item in this.sheZui"
                                :key="item.codeId"
                                :label="item.codeName"
                                :value="item.codeId"
                              ></el-option>
                            </el-select>
                            <!-- <el-input v-model="formTwoTB.ajudge" type="textarea"></el-input> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            label="监测分析触发点："
                            prop="apoints"
                          >
                            <el-input
                              placeholder="监测分析触发点,最长为200字符"
                              v-model="formTwoTB.apoints"
                              type="textarea"
                              :maxlength="200"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="交易主体身份及相关信息："
                            prop="asubject"
                          >
                            <el-input
                              placeholder="交易主体身份及相关信息,最长为200字符"
                              v-model="formTwoTB.asubject"
                              type="textarea"
                              :maxlength="200"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            label="建议："
                            prop="asuggest"
                          >
                            <el-input
                              placeholder="建议,最长为200字符"
                              v-model="formTwoTB.asuggest"
                              type="textarea"
                              :maxlength="200"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="分析概述：">
                            <el-upload
                              style="float:none"
                              :action="actionUrls"
                              multiple
                              :on-success="FXuploadSuccess"
                              :on-remove="FXhandleRemove"
                              :before-upload="beforeFXUpload"
                              :on-preview="FXdownFile"
                              :on-error="FXerrorFile"
                              :limit="1"
                              :file-list="fileListFenXiTB"
                            >
                              <el-button
                                size="small"
                                style="text-align: center"
                                type="primary"
                              >点击上传</el-button>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane
                    label="录入名单"
                    name="thirds"
                    v-if="database"
                  >
                    <div style="margin:20px 0">
                      <span>名单类型：</span>
                      <el-radio-group
                        v-model="rosterType"
                        :disabled="isDisabled"
                      >
                        <el-radio label="subject">主体类型名单</el-radio>
                        <el-radio label="account">账号类型名单</el-radio>
                      </el-radio-group>
                    </div>
                    <el-form
                      :disabled="this.$route.query.pageFlag==='look'"
                      :model="form"
                      :rules="rules"
                      ref="ruleForm"
                      validate-on-rule-change
                    >
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item
                            label="主体名称："
                            prop="subjectName"
                            ref="subjectName"
                            :class="{cancleValid:!mainType}"
                          >
                            <el-input
                              v-model="form.subjectName"
                              placeholder="最长512字符数"
                              maxlength="512"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="主体类型："
                            prop="subjectType"
                          >
                            <el-select
                              v-model="form.subjectType"
                              placeholder="请选择"
                              filterable
                            >
                              <el-option
                                v-for="(item,index) in subjectTypeArr"
                                :key="index"
                                :label="item.codeName"
                                :value="item.codeId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="主体国籍："
                            prop="subjectNationality"
                          >
                            <el-select
                              v-model="form.subjectNationality"
                              placeholder="请选择"
                              filterable
                              :clearable="!isDisabled"
                            >
                              <el-option
                                v-for="(item,index) in subjectNationalityArr"
                                :key="index"
                                :value="item.numCode"
                                :label="item.chSName"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="个人主体性别："
                            prop="personSubjectSex"
                          >
                            <el-select
                              v-model="form.personSubjectSex"
                              placeholder="请选择"
                              :clearable="!isDisabled"
                            >
                              <el-option
                                v-for="(item,index) in personSubjectSexArr"
                                :key="index"
                                :value="item.codeId"
                                :label="item.codeName"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item
                            label="主体证件类型："
                            prop="subjectIType"
                            ref="subjectIType"
                            :class="{cancleValid:!mainType}"
                          >
                            <el-select
                              v-model="form.subjectIType"
                              placeholder="请选择"
                              filterable
                              @change="certificate"
                              :clearable="!isDisabled"
                            >
                              <el-option
                                v-for="(item,index) in subjectITypeArr"
                                :key="index"
                                :value="item.codeId"
                                :label="item.codeName"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="主体证件号码："
                            prop="subjectINum"
                            ref="subjectINum"
                            :class="{cancleValid:!mainType}"
                          >
                            <el-input
                              v-model="form.subjectINum"
                              placeholder="最长128字符数"
                              maxlength="128"
                            ></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="6">
                          <el-form-item
                            label="来源方向："
                            prop="sourceDire"
                          >
                            <el-select
                              v-model="form.sourceDire"
                              placeholder="请选择"
                              filterable
                              :clearable="!isDisabled"
                            >
                              <el-option
                                v-for="(item,index) in sourceDireArr"
                                :key="index"
                                :label="item.codeName"
                                :value="item.codeId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="来源业务："
                            prop="sourceBusiness"
                          >
                            <el-select
                              v-model="form.sourceBusiness"
                              placeholder="请选择"
                              filterable
                              :clearable="!isDisabled"
                            >
                              <el-option
                                v-for="(item,index) in sourceBusinessArr"
                                :key="index"
                                :label="item.codeName"
                                :value="item.codeId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <!-- <el-col :span="6">
            <el-form-item label="名单标识：">
              <el-select v-model="form.listIdentification" placeholder="请选择" filterable :clearable="!isDisabled">
                <el-option
                  v-for="(item,index) in listIdentificationArr"
                  :key="index"
                  :label="item.codeName"
                  :value="item.codeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
                        <el-col :span="6">
                          <el-form-item
                            label="名单来源文档编号："
                            prop="listSourceDocNum"
                          >
                            <el-input
                              v-model="form.listSourceDocNum"
                              placeholder="最长128字符数"
                              maxlength="128"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="信息入库日期："
                            required
                          >
                            <el-date-picker
                              value-format="yyyy-MM-dd"
                              disabled
                              v-model="form.infoSaveDate"
                              type="date"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="出生日期（或注册登记日期）："
                            prop="bornDate"
                          >
                            <el-date-picker
                              value-format="yyyy-MM-dd"
                              v-model="form.bornDate"
                              :picker-options="pickerOptions1"
                              type="date"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="出生地（或注册地）："
                            prop="bornPlace"
                          >
                            <el-input
                              v-model="form.bornPlace"
                              placeholder="最长128字符数"
                              maxlength="128"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item
                            label="备注："
                            prop="remark"
                          >
                            <el-input
                              type="textarea"
                              v-model="form.remark"
                              placeholder="最长1024字符数"
                              maxlength="1024"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div class="divider divider divider-horizontal"></div>
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="主办部门：">
                            <el-select
                              v-model="form.holdDept"
                              placeholder="请选择"
                              filterable
                              :clearable="!isDisabled"
                              @change="changeAnalyst"
                            >
                              <el-option
                                v-for="(item,index) in holdDeptArr"
                                :key="index"
                                :label="item.deptName"
                                :value="item.deptCode"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="主办部门分析员："
                            prop="holdDeptAnalyst"
                          >
                            <!-- <el-input v-model="form.holdDeptAnalyst" placeholder maxlength="128"></el-input> -->
                            <el-select
                              v-model="form.holdDeptAnalyst"
                              placeholder="请选择"
                              filterable
                              :clearable="!isDisabled"
                              no-data-text="请先选择主办部门"
                            >
                              <el-option
                                v-for="(item,index) in analystArr"
                                :key="index"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="公开级别："
                            prop="publicLevel"
                          >
                            <el-select
                              v-model="form.publicLevel"
                              placeholder="请选择"
                              filterable
                              :clearable="!isDisabled"
                            >
                              <el-option
                                v-for="(item,index) in publicLevelArr"
                                :key="index"
                                :value="item.codeId"
                                :label="item.codeName"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="名单主体对手：">
                            <el-select
                              v-model="form.listSOpponent"
                              placeholder="请选择"
                              filterable
                              :clearable="!isDisabled"
                            >
                              <el-option
                                v-for="(item,index) in listSOpponentArr"
                                :key="index"
                                :value="item.codeId"
                                :label="item.codeName"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="对外移送（通报、反馈协查）日期:">
                            <el-date-picker
                              value-format="yyyy-MM-dd"
                              v-model="form.fTransforDate"
                              type="date"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="对外移送（通报、反馈协查）部门："
                            prop="fTransforDept"
                          >
                            <!-- <el-select v-model="form.fTransforDept" placeholder="请选择" filterable>
                <el-option v-for="(item,index) in fTransforDeptArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>-->
                            <el-input
                              v-model="form.fTransforDept"
                              placeholder="最长128字符数"
                              maxlength="128"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item
                            label="初步判断："
                            class="itme-block"
                            prop="preliminaryJudgment"
                          >
                            <el-select
                              filterable
                              v-model="form.preliminaryJudgment"
                              multiple
                              placeholder="请选择"
                              @change="replenish"
                            >
                              <el-option
                                v-for="(item,index) in dialogJudgmentData"
                                :key="index"
                                :label="item.codeName"
                                :value="item.codeId"
                              >
                              </el-option>
                            </el-select>
                            <el-form-item
                              v-if="isReplenishOne"
                              prop="supplementOne"
                              :rules="[{required:true, validator: szisValidInput1, trigger: 'blur'}]"
                            >
                              <el-input
                                maxlength="100"
                                v-model="supplementOne"
                                placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
                              ></el-input>
                            </el-form-item>
                            <el-form-item
                              v-if="isReplenishTwo"
                              prop="supplementTwo"
                              :rules="[{required:true, validator: szisValidInput2, trigger: 'blur'}]"
                            >
                              <el-input
                                maxlength="100"
                                v-model="supplementTwo"
                                placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"
                              ></el-input>
                            </el-form-item>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item
                            label="外方索引号："
                            prop="otherIndexNum"
                          >
                            <el-input
                              v-model="form.otherIndexNum"
                              placeholder="最长128字符数"
                              maxlength="128"
                            ></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="6">
                          <el-form-item
                            label="外方初步判断："
                            prop="foreignPreliminaryJudgment"
                          >
                            <el-input
                              v-model="form.foreignPreliminaryJudgment"
                              placeholder="最长128字符数"
                              maxlength="128"
                            ></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="6">
                          <el-form-item
                            label="外方来函细节："
                            prop="fLetterDesc"
                          >
                            <el-input
                              v-model="form.fLetterDesc"
                              placeholder="最长128字符数"
                              maxlength="128"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item
                            label="关联文档编号："
                            prop="relationDocNum"
                          >
                            <el-input
                              v-model="form.relationDocNum"
                              placeholder="最长128字符数"
                              maxlength="128"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item
                            label="外方来函涉及类型："
                            prop="fLetterType"
                          >
                            <el-select
                              v-model="form.fLetterType"
                              placeholder="请选择"
                              multiple
                            >
                              <el-option
                                v-for="(item,index) in fletterTypeData"
                                :key="index"
                                :label="item.codeName"
                                :value="item.codeId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <template v-if="mainType">
                        <el-row
                          :gutter="20"
                          :class="{smallInput:mainType}"
                          v-for="(item,index) in form.charosterAccountDOS"
                          :key="index"
                        >
                          <el-col :span="6">
                            <el-form-item
                              label="开户机构名称（或简称）："
                              :prop="'charosterAccountDOS.' + index + '.openAccountOrgName'"
                              :rules="rules.openAccountOrgName"
                            >
                              <el-input
                                v-model="item.openAccountOrgName"
                                maxlength="128"
                                placeholder="最长128字符数"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item
                              label="账户号码："
                              :prop="'charosterAccountDOS.' + index + '.accountNum'"
                              :rules="rules.accountNum"
                            >
                              <el-input
                                v-model="item.accountNum"
                                maxlength="64"
                                placeholder="最长64字符数"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-button
                            style="margin-top:32px"
                            v-if="mainType&&index===form.charosterAccountDOS.length-1"
                            type
                            icon="el-icon-plus"
                            @click="addSingleAccount(item,index)"
                          ></el-button>
                          <el-button
                            style="margin-top:32px"
                            v-if="mainType&&(index!==0||index!==form.charosterAccountDOS.length-1)"
                            type
                            icon="el-icon-minus"
                            @click="delSingleAccount(item,index)"
                          ></el-button>
                        </el-row>
                      </template>

                      <template v-else>
                        <el-row
                          :gutter="20"
                          :class="{smallInput:mainType}"
                        >
                          <el-col :span="6">
                            <el-form-item
                              label="开户机构名称（或简称）："
                              prop="openAccountOrgName"
                              ref="openAccountOrgName0"
                              :class="{cancleValid:mainType}"
                            >
                              <el-input
                                v-model="form.openAccountOrgName"
                                placeholder="最长128字符数"
                                maxlength="128"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item
                              label="账户号码："
                              ref="accountNum0"
                              prop="accountNum"
                              :class="{cancleValid:mainType}"
                            >
                              <el-input
                                v-model="form.accountNum"
                                placeholder="最长64字符数"
                                maxlength="64"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </template>
                    </el-form>
                    <!-- <el-button
                      type="primary"
                      @click="submitForm('ruleForm')"
                      style="margin-right:20px"
                    >提 交</el-button> -->
                  </el-tab-pane>
                </el-tabs>
              </el-form>
            </div>

            <!-- 介质传输 -->
            <el-form
              :model="mediumForm"
              ref="refmediumForm"
              :rules="mediumFormRules"
              v-if="inputInforForm.inputMode === '2' && inputInforForm.inputtype !== ''"
            >
              <h3 style="text-align:center">{{names}} </h3>
              <fieldset class="classFiledset">
                <legend>录入信息</legend>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item
                      label="申请录入人"
                      prop="entryName"
                    >
                      <el-input
                        v-model="mediumForm.entryName"
                        maxlength="10"
                        placeholder="请输入内容，最长10字符"
                        :disabled="flag"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="所在部门"
                      prop="entryDepartment"
                    >
                      <el-input
                        v-model="mediumForm.entryDepartment"
                        maxlength="30"
                        placeholder="请输入内容，最长30字符"
                        :disabled="flag"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="申请时间"
                      prop="applyTime"
                    >
                      <el-date-picker
                        :picker-options="pickerOptions"
                        v-model="mediumForm.applyTime"
                        :disabled="flag"
                        clearable
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 录入文件 -->
                <el-form-item label="录入文件：">
                  <el-upload
                    :disabled="flag"
                    :auto-upload="false"
                    :action="actionUrl"
                    ref="refUpload"
                    multiple
                    :limit="5"
                    class="upload-btn"
                    :on-change="changeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-button
                      type="text"
                      :disabled="flag"
                    >添加附件</el-button>
                  </el-upload>
                  <div
                    v-for="(item,idx) in mediumFile"
                    :key="idx"
                  >
                    <span style="float:left;">{{item.attachName}}</span>
                    <el-button
                      v-if="!flag"
                      icon='el-icon-delete'
                      style="float:right;margin-right:200px;line-height:24px"
                      type="text"
                      @click="DelDownload(item.attachId)"
                    >删除</el-button>
                    <el-button
                      icon="el-icon-download"
                      style="float:right;margin-right:100px;line-height:24px"
                      type="text"
                      @click="hanldDownload(item.attachId)"
                    >点击下载</el-button>
                    <div style="clear:both"></div>
                    <!-- <el-button
                        style="float:left;margin-right:15px"
                        type="text"
                        @click="hanldDownload(item.attachId)"
                      >{{item.attachName}}</el-button> -->
                  </div>
                </el-form-item>
              </fieldset>
            </el-form>
          </el-tab-pane>

          <el-tab-pane
            label="办理信息"
            name="last"
            v-if="false"
          >
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序号"
              ></el-table-column>
              <el-table-column
                prop="actName"
                label="节点名称"
              ></el-table-column>
              <el-table-column
                prop="approverName"
                label="执行用户"
              ></el-table-column>
              <el-table-column
                prop="opinion"
                label="办理意见"
              ></el-table-column>
              <el-table-column
                prop="time"
                label="办理时间"
              ></el-table-column>
            </el-table>
            <div class="handeltitle">流程监控图：</div>
            <el-steps
              :active="stepActive"
              align-center
            >
              <el-step
                v-for="(item,idx) in tableFlow"
                :title="item"
                :key="idx"
                description=""
              ></el-step>
              <el-step
                v-if="endFlag === '流程结束，拒绝' || endFlag === '流程结束，同意录入'||endFlag === '已入库'"
                title="结束"
                description=""
              ></el-step>
            </el-steps>
          </el-tab-pane>
        </el-tabs>
        <div
          ref="myPrintForm"
          v-show="printType"
        >
          <h3 style="margin: 10px auto;text-align: center;">录入数据审批单</h3>
          <table
            border="1"
            style="border-collapse: collapse;text-align: center;margin: 0 auto;"
          >
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >录入方式</td>
              <td
                width="300"
                colspan="6"
                style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;"
              >
                <div v-if="inputForm.appInputmode !== ''">
                  {{inputForm.appInputmode==='1'?'手工录入':'介质传输'}}
                </div>
                <div v-else></div>
              </td>
              <td
                width="120"
                height="70;"
                align="center"
              >录入类型</td>
              <td
                width="300"
                colspan="6"
                style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;"
              >
                <div v-if="inputForm.appInputtype !== ''">
                  {{NewappInputtype}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >文件类型</td>
              <td
                height="70"
                colspan="12"
                style="textAlign:left;text-indent: 10px;border-right-color:#303133;"
              >
                <div v-if="inputForm.filetype !== ''">
                  {{inputForm.filetype}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >信息来源</td>
              <td
                height="70"
                colspan="12"
                style="textAlign:left;text-indent: 10px;border-right-color:#303133;"
              >
                <div v-if="inputForm.inforsource !== ''">
                  {{inputForm.inforsource}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >申请人</td>
              <td
                width="300"
                colspan="6"
                style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;"
              >
                <div v-if="inputForm.proposer !== ''">
                  {{inputForm.proposer}}
                </div>
                <div v-else></div>
              </td>
              <td
                width="120"
                height="70;"
                align="center"
              >申请处室</td>
              <td
                width="300"
                colspan="6"
                style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;"
              >
                <div v-if="inputForm.applyOffice !== ''">
                  {{inputForm.applyOffice}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >申请时间</td>
              <td
                width="300"
                colspan="6"
                style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;"
              >
                <div v-if="inputForm.applyTime !== ''">
                  {{inputForm.applyTime}}
                </div>
                <div v-else></div>
              </td>
              <td
                width="120"
                height="70;"
                align="center"
              >录入时间</td>
              <td
                width="300"
                colspan="6"
                style="text-align:left;padding:10px;word-wrap:break-word;max-width: 300px;"
              >
                <div v-if="inputForm.inputTime !== ''">
                  {{inputForm.inputTime}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >录入内容</td>
              <td
                height="100"
                colspan="12"
                style="textAlign:left;text-indent: 10px;border-right-color:#303133;"
              >
                <div v-if="inputForm.inputContent !== ''">
                  {{inputForm.inputContent}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >内容描述</td>
              <td
                height="70"
                colspan="12"
                style="textAlign:left;text-indent: 10px;border-right-color:#303133;"
              >
                <div v-if="inputForm.contentDesc !== ''">
                  {{inputForm.contentDesc}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >备注</td>
              <td
                height="70"
                colspan="12"
                style="textAlign:left;text-indent: 10px;border-right-color:#303133;"
              >
                <div v-if="inputForm.remark !== ''">
                  {{inputForm.remark}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >处领导审批</td>
              <td
                height="70"
                colspan="12"
                style="textAlign:left;text-indent: 10px;border-right-color:#303133;"
              >
                <div v-if="inputForm.chuApproval !== ''">
                  {{inputForm.chuApproval}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >中心领导审批</td>
              <td
                height="70"
                colspan="12"
                style="textAlign:left;text-indent: 10px;border-right-color:#303133;"
              >
                <div v-if="inputForm.centreApproval !== ''">
                  {{inputForm.centreApproval}}
                </div>
                <div v-else></div>
              </td>
            </tr>
            <tr>
              <td
                width="120"
                height="70;"
                align="center"
              >附件</td>
              <td
                height="70"
                colspan="12"
                style="textAlign:left;text-indent: 10px;border-right-color:#303133;"
              >
                <div v-if="fileList.length>0">
                  <div
                    v-for="(item,idx) in fileList"
                    :key="idx"
                  >
                    {{item.attachName}}
                  </div>
                </div>
                <div v-else>无</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { deptUser } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { delloadapi } from '@/api/sys-monitoringAnalysis/cueManage/dataEntry/add.js'
import { commonPattern } from '@/utils/formValidate'
import {
  noSpaceAndTs,
  common_Validate,
  onlyNumberValidateNotNull,
  adminisValidInput,
  spaceBarAndSpecial
} from '@/utils/formValidate.js'
import {
  sendSubmitapi,
  getviewapi,
  getfileListapi,
  getcircuitapi
} from '@/api/sys-monitoringAnalysis/cueManage/dataEntry/approvalOrder.js'
import { MYgetsourceBusinessArr } from '@/api/sys-monitoringAnalysis/cueManage/levelConfiguration.js'

import { country } from '@/api/common/citys.js'
import ApprovalOrder from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/approvalOrder'
import Enclosure from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/enclosure'
import HandleInfo from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/handleInfo'
import InputInfo from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/feedBack/InputFeedback'
import { getSheZui } from '@/api/sys-monitoringAnalysis/cueManage/autonomousAnalysis/autonomousAnalysis.js'
import { getsourceBusinessArr } from '@/api/sys-monitoringAnalysis/roster-warning/levelConfiguration.js'
import { getDepartment } from '@/api/sys-monitoringAnalysis/roster-warning/roster-manage.js'
export default {
  components: {
    Enclosure,
    ApprovalOrder,
    HandleInfo,
    InputInfo
  },

  data() {
    function currentDay(params) {
      const oDate = new Date()
      const y = oDate.getFullYear()
      const m = oDate.getMonth() + 1
      const d = oDate.getDate()
      return y + '-' + m + '-' + d
    }
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      myarr: [], // 主体数组
      tyoos: [
        {
          value: '0',
          label: '协查'
        },
        {
          value: '1',
          label: '通报'
        }
      ],
      // 可疑交易通报
      formTwoTB: {
        // ------下面是可疑交易通报数据字段------//
        adispose: '', // 可疑交易通报----可疑交易名称
        triggerMessage: '', // 可疑交易通报----关联移送记录
        bodyMessage: '', // 可疑交易通报----主要交易发生地
        adealdate: '', // 可疑交易通报----交易时间段
        armb: '', // 可疑交易通报----累计交易金额(人民币)
        ayb: '', // 可疑交易通报----累计交易金额(外币)
        anumber: '', // 可疑交易通报----涉及交易笔数
        amainnumber: '', // 可疑交易通报----涉及主要账户个数
        ajudge: [], // 可疑交易通报----初步判断
        asubject: '', // 可疑交易通报----交易主体身份及相关信息
        apoints: '', // 可疑交易通报----检测分析触发点
        asuggest: '' // 可疑交易通报----建议
      },
      formTwoTBRules: {
        // 可疑交易通报----可疑交易名称
        adispose: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: common_Validate, trigger: 'blur' }
        ],
        // 可疑交易通报----关联移送记录
        triggerMessage: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: common_Validate, trigger: 'blur' }
        ],
        // 可疑交易通报----主要交易发生地
        bodyMessage: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: common_Validate, trigger: 'blur' }
        ],
        // 可疑交易通报----交易时间段
        adealdate: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        // 可疑交易通报----累计交易金额(人民币)
        armb: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: onlyNumberValidateNotNull, trigger: 'blur' }
        ],
        // 可疑交易通报----累计交易金额(外币)
        ayb: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: onlyNumberValidateNotNull, trigger: 'blur' }
        ],
        // 可疑交易通报----涉及交易笔数
        anumber: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: onlyNumberValidateNotNull, trigger: 'blur' }
        ],
        // 可疑交易通报----涉及主要账户个数
        amainnumber: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: onlyNumberValidateNotNull, trigger: 'blur' }
        ],
        // 可疑交易通报----初步判断
        ajudge: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        // 可疑交易通报----交易主体身份及相关信息
        asubject: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: common_Validate, trigger: 'blur' }
        ],
        // 可疑交易通报----检测分析触发点
        apoints: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: common_Validate, trigger: 'blur' }
        ],
        // 可疑交易通报----建议
        asuggest: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: common_Validate, trigger: 'blur' }
        ]
      },
      // 可疑交易线索校验
      rosterType: 'subject',
      isDisabled: false,
      interInfo: 'first',
      types: 3,
      domestic: 'ones',
      database: false,
      enclosure: '',
      filelength: 0,
      fileNum: 0,
      fileTypes: '',
      printType: false,
      flag: false,
      names: '',
      subLoading: false,
      uploadFather: false, // 反馈信息上传
      fileList: [], // 文件
      fileListFenXiTB: [],
      mediumFile: [], // 我的文件
      activeName: '',
      UUID: '', // uuid
      dialogJudgmentData: [],
      disabled: false,
      analystArr: [],
      fletterTypeArr: [],
      fletterTypeData: [],
      fletterTypeCheckd: '',
      subjectTypeArr: [],
      personSubjectSexArr: [],
      publicLevelArr: [],
      listSOpponentArr: [],
      subjectNationalityArr: [],
      subjectITypeArr: [],
      holdDeptArr: [],
      fTransforDeptArr: [],
      sourceDireArr: [], // 来源方向
      sourceBusinessArr: [], // 来源业务
      laiwenUnitArr: [], // 来文单位
      publicScopeArr: [],
      inputInforForm: {
        inputMode: '',
        inputtype: ''
      },
      sheZui: [], // 涉罪类型
      isReplenishOne: false,
      isReplenishTwo: false,
      supplementOne: '',
      supplementTwo: '',
      isReplenishOnem: false,
      isReplenishTwom: false,
      supplementOnem: '',
      supplementTwom: '',
      // 名单库
      form: {
        subjectName: '',
        subjectType: '',
        subjectNationality: '',
        personSubjectSex: '',
        subjectIType: '',
        subjectINum: '',
        sourceDire: '',
        sourceBusiness: '',
        listSourceDocNum: '',
        infoSaveDate: currentDay(),
        fLetterType: [],
        lastUpdDate: '',
        bornDate: '',
        bornPlace: '',
        remark: '',
        holdDept: '',
        holdDeptAnalyst: '',
        publicLevel: '',
        listRival: '',
        listSOpponent: '',
        fTransforDate: '',
        fTransforDept: '',
        accountNum: '',
        openAccountOrgName: '',
        otherIndexNum: '',
        foreignPreliminaryJudgment: '',
        fLetterDesc: '',
        relationDocNum: '',
        publicScope: '1', // 公开范围 默认
        // listIdentification: '', // 名单标识
        preliminaryJudgment: [],
        charosterAccountDOS: [
          {
            openAccountOrgName: '',
            accountNum: ''
          }
        ]
      },
      rules: {
        subjectName: [{ required: true, validator: spaceBarAndSpecial, trigger: 'blur' }],
        sourceDire: [{ required: true, message: '请选择来源方向', trigger: 'change' }],
        listSourceDocNum: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        subjectIType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        subjectINum: [{ required: true, validator: common_Validate, trigger: 'blur' }],
        sourceBusiness: [{ required: true, message: '请选择', trigger: 'blur' }],
        // 非必填
        // holdDeptAnalyst: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        openAccountOrgName: [{ max: 128, validator: spaceBarAndSpecial, trigger: 'blur' }],
        accountNum: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        fTransforDept: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        foreignPreliminaryJudgment: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        fLetterDesc: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        relationDocNum: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        bornPlace: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }],
        otherIndexNum: [{ max: 128, validator: adminisValidInput, trigger: 'blur' }]
        // remark: [{ max: 1024, validator: adminisValidInput, trigger: 'blur' }]
      },
      // 审批单
      inputForm: {
        appInputtype: '',
        appInputmode: '',
        filetype: '',
        inforsource: '',
        proposer: '',
        applyOffice: '',
        applyTime: '',
        inputTime: '',
        inputContent: '',
        accessory: '',
        contentDesc: '',
        remark: '',
        chuApproval: '',
        centreApproval: ''
      },
      // 国际
      internationForm: {
        centerNum: '',
        leibie: '',
        qiNation: '',
        piNation: '',
        qnum: '',
        qnation: '',
        qorg: '',
        qlinkman: '',
        qduty: '',
        qphone: '',
        qfax: '',
        qemail: '',
        qaddress: '',
        qlegalrepre: '',
        qsignature: '',
        qdate: '',
        qremark: '',
        fnation: '',
        forg: '',
        flinkman: '',
        fduty: '',
        fphone: '',
        ffax: '',
        femail: '',
        faddress: '',
        fremark: '',
        ztName: '',
        ztBname: '',
        ztAddress: '',
        ztGuanxi: '',
        ztActivity: '',
        ztIdnum: '',
        ztPassport: '',
        ztIdnumorg: '',
        ztOtheridnumorg: '',
        ztPhone: '',
        ztOther: '',
        ztNationlity: '',
        ztSex: '',
        ztBirthday: '',
        ztCity: '',
        ztProvinces: '',
        ztNation: '',
        ztOtheridnum: ''
      },
      // 反馈
      formFather: {},
      // 国内
      domesticForm: {
        receiveDate: '',
        asssnum: '',
        relevancenum: '',
        assstype: '',
        urgency: '',
        crimetype: [],
        laiwentitle: '',
        Introductioncase: '',
        caselabel: '',
        laiwenUnit: '',
        requestitem: '',
        assList: ''
      },

      // 来件信息2
      informationPartss: {
        inMessageTabledata: [
          {
            inforName: '',
            inforPhone: ''
          }
        ],
        inReapTabledata: [
          {
            functionary: '',
            functionaryPhone: ''
          }
        ]
      },
      // 办理信息
      stepActive: null, // 办理信息 进度
      endFlag: '', // 结束标记
      tableData: [],
      tableFlow: ['录入审核单'],

      // 介质传输
      mediumForm: {
        entryName: '',
        entryDepartment: '',
        applyTime: ''
      },

      internRadios: [
        {
          label: '1',
          value: '国际协查文件管理'
        },
        {
          label: '2',
          value: '反馈信息'
        },
        {
          label: '3',
          value: '境内协查类文件管理'
        }
      ],
      internRadios2: [
        {
          label: '1',
          value: '国际协查文件管理'
        },
        {
          label: '2',
          value: '反馈信息'
        },
        {
          label: '3',
          value: '境内协查类文件管理'
        },
        {
          label: '4',
          value: '公文函件 '
        },
        {
          label: '5',
          value: '其他'
        }
      ],
      modeRadios: [
        {
          label: '1',
          value: '手工录入'
        },
        {
          label: '2',
          value: '介质传输'
        }
      ],
      options: [
        {
          value: '1',
          label: '国际协查文件管理'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '4',
          label: '公文函件'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        },
        {
          value: '5',
          label: '其他'
        }
      ],
      optionsmode: [
        {
          value: '1',
          label: '手工录入'
        },
        {
          value: '2',
          label: '介质传输'
        }
      ],
      countryOption: [], // 国家地区

      // rules

      // ruleas 国际协查
      internationFormRules: {
        centerNum: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        leibie: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qnum: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qnation: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qlinkman: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qduty: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qphone: [
          // { validator: this.onlyNumberValidateNotNull, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qfax: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qemail: [
          { validator: this.emailValidate, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qaddress: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qlegalrepre: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],

        qsignature: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        flinkman: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        fduty: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        fphone: [
          // { validator: this.onlyNumberValidateNotNull, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        ffax: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        femail: [
          { validator: this.emailValidate, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        faddress: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        fremark: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztName: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztBname: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztAddress: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztGuanxi: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztActivity: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztIdnum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztPassport: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztIdnumorg: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztOtheridnumorg: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        // ztPhone: [{ validator: this.onlyNumberValidate, trigger: 'blur' }],
        ztNationlity: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        // ztSex: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztCity: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztProvinces: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztNation: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztOtheridnum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        fenterprise: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        fadress: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        fbankname: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        fbankaccount: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        fbankadress: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        rivlName: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        rivlIdnum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        rivlPassportnum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        rivlBankname: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        rivlBankaccount: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        rivlTradeamount: [{ validator: noSpaceAndTs, trigger: 'blur' }]
      },

      // 国内协查请求
      domesticFormRules: {
        receiveDate: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        asssnum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        relevancenum: [
          { required: true, validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        urgency: [{ required: true, validator: noSpaceAndTs, trigger: 'blur' }],
        assstype: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        crimetype: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        laiwentitle: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        Introductioncase: [
          { required: true, validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        caselabel: [
          { required: true, validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        laiwenUnit: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        assList: [{ validator: noSpaceAndTs, trigger: 'blur' }]
      },

      // ruleas 介质传输
      mediumFormRules: {
        entryName: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        entryDepartment: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    actionUrl() {
      return `/monitor/inputafter/upload-allAfterInput?aId=${this.$route.query.aId}&fileType=4`
    },
    actionUrls() {
      return `/monitor/inputafter/upload-allAfterInput?aId=${this.$route.query.aId}&fileType=5`
    },
    NewappInputtype() {
      switch (this.inputForm.appInputtype) {
        case '1':
          this.type = '国际协查文件管理'
          break

        case '2':
          this.type = '反馈信息'
          break
        case '3':
          this.type = '境内协查类文件管理'
          break
        case '4':
          this.type = '公文函件 '
          break
        case '5':
          this.type = '其他'
          break
      }
      return this.type
    },
    mainType() {
      if (this.rosterType === 'subject') {
        this.rules.subjectIType[0].required = true
        this.rules.subjectINum = [{ required: true, validator: common_Validate, trigger: 'blur' }]
        this.rules.subjectName = [{ required: true, validator: common_Validate, trigger: 'blur' }]
        this.rules.openAccountOrgName = [{ validator: spaceBarAndSpecial, trigger: 'blur' }]
        this.rules.accountNum = [{ validator: adminisValidInput, trigger: 'blur' }]
        return true
      } else {
        this.rules.subjectIType[0].required = false
        this.rules.subjectINum = [{ validator: adminisValidInput, trigger: 'blur' }]
        this.rules.subjectName = [{ validator: adminisValidInput, trigger: 'blur' }]
        this.rules.openAccountOrgName = [
          { required: true, validator: spaceBarAndSpecial, trigger: 'blur' }
        ]
        this.rules.accountNum = [{ required: true, validator: common_Validate, trigger: 'blur' }]
        return false
      }
    },
    myparamsObj() {
      const obj = JSON.parse(JSON.stringify(this.form))
      obj.rosterType = this.rosterType
      if (this.form.charosterAccountDOS === null) {
        this.form.charosterAccountDOS = [
          {
            openAccountOrgName: '',
            accountNum: ''
          }
        ]
      }
      if (this.rosterType === 'subject') {
        const accountNumArr = []
        const openAccountOrgNameArr = []
        this.form.charosterAccountDOS.forEach(e => {
          accountNumArr.push(e.accountNum)
          openAccountOrgNameArr.push(e.openAccountOrgName)
        })
        obj.accountNum = accountNumArr.join()
        obj.openAccountOrgName = openAccountOrgNameArr.join()
      }
      const ary0 = []
      this.form.preliminaryJudgment.forEach(el => {
        if (el === '1401') {
          el = '1401-' + this.supplementOne
        } else if (el === '1402') {
          el = '1402-' + this.supplementTwo
        }
        ary0.push(el)
      })
      obj.preliminaryJudgment = ary0.join(',')
      return obj
    }
  },
  watch: {
    mainType(val) {
      this.$nextTick(() => {
        this.$refs.subjectName.clearValidate()
        this.$refs.subjectINum.clearValidate()
        this.$refs.subjectIType.clearValidate()
        if (!val) {
          this.$refs.openAccountOrgName0.clearValidate()
          this.$refs.accountNum0.clearValidate()
        }
      })
    }
  },
  mounted() {
    this.getCountryList()
    this.getData()
    this.getRestDictionary()
  },
  methods: {
    myload(data) {
      this.subLoading = data
    },
    radioChange(val) {
      if (val === 0) {
        this.domestic = 'ones'
      } else if (val === 1) {
        this.domestic = 'twos'
      }
    },
    removeDomain(item) {
      var index = this.myarr.indexOf(item)
      if (index !== -1) {
        this.myarr.splice(index, 1)
      }
    },
    add() {
      this.myarr.push({
        ztName: '',
        ztBname: '',
        ztAddress: '',
        ztGuanxi: '',
        ztActivity: '',
        ztIdnum: '',
        ztPassport: '',
        ztIdnumorg: '',
        ztOtheridnum: '',
        ztOtheridnumorg: '',
        ztPhone: '',
        ztOther: '',
        ztNationlity: '',
        ztSex: '',
        ztBirthday: '',
        ztCity: '',
        ztProvinces: '',
        ztNation: '',
        rivlName: '',
        rivlIdnum: '',
        rivlPassportnum: '',
        rivlBankname: '',
        rivlBankaccount: '',
        rivlTradedate: '',
        rivlTradeamount: '',
        rivlTradedirection: ''
      })
      console.log(this.myarr, 555555555555555555)
    },
    // 获取涉罪类型
    getRestDictionary() {
      getSheZui('TOSC').then(res => {
        this.sheZui = res.data
      })
      const page = {
        pageNum: '1',
        pageSize: '999'
      }
      MYgetsourceBusinessArr(page, '0').then(res => {
        if (res.code === 200) {
          this.laiwenUnitArr = res.data.list
        }
      }).catch(() => {
        this.loadingA = false
      })
    },
    emailValidate(rule, value, callback) {
      var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!value) {
        callback()
      } else {
        if (!email.exec(value)) {
          callback(new Error('请输入邮箱，如：123456@163.com'))
        } else {
          callback()
        }
      }
    },
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    onlyNumberValidateNotNull(rule, value, callback) {
      if (value !== null) {
        if (value === '') {
          callback()
        } else {
          if (!commonPattern.number.test(value)) {
            callback(new Error('必须输入数值'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    domesticMethod(tab, event) {
      console.log(tab, event)
    },
    // 获取反显数据
    getData() {
      this.activeName = '2'
      getviewapi(this.$route.query.aId).then(res => {
        if (res.code === 200) {
          this.inputForm = res.data
          switch (this.inputForm.filetype) {
            case '通报':
              this.types = 1
              break
            case '协查':
              this.types = 0
              break
          }
          if (this.types === 1 && this.NewappInputtype === '境内协查类文件管理') {
            this.domestic = 'twos'
          }
          this.flag = res.data.inputStuts === '已入库'
          if (this.inputForm.appInputmode === '1') {
            var gjobj = {}
            if (res.data.gjInvrequest) {
              gjobj = Object.assign({}, res.data.gjInvrequest, res.data.gjInvrequest.subjectList[0])
              gjobj.subjectList.shift()
              this.myarr = gjobj.subjectList
            } else {
              gjobj = Object.assign({}, res.data.gjInvrequest)
            }
            this.internationForm = gjobj || this.internationForm // 国际
            if (res.data.gjInvrequest) {
              this.internationForm.leibie = res.data.filetype === '通报' ? '1' : '0'
              // this.internationForm.leibie = res.data.gjInvrequest.leibie
            } else {
              this.internationForm.leibie = '0'
            }
            var formFatherArr = res.data.feedbackafter ? res.data.feedbackafter : {} // 反馈
            if (formFatherArr.evokejudge) {
              // var newarr = JSON.parse(formFatherArr.evokejudge)
              var arr = formFatherArr.evokejudge.split(',')
              console.log(arr, 2222222222)
              const psclueIdArr = []
              arr.forEach(el => {
                if (el.indexOf('1401') !== -1) {
                  const tempArr = el.split('-')
                  this.supplementOnem = tempArr[1]
                  this.isReplenishOnem = true
                  psclueIdArr.push('1401')
                } else if (el.indexOf('1402') !== -1) {
                  const tempArr = el.split('-')
                  this.supplementTwom = tempArr[1]
                  this.isReplenishTwom = true
                  psclueIdArr.push('1402')
                } else {
                  psclueIdArr.push(el)
                }
              })
              arr = psclueIdArr
              formFatherArr.evokejudge = arr
              // const psclueIdArr = []
              // arr.forEach(el => {
              //   if (el.psclueId.indexOf('1401') !== -1) {
              //     const tempArr = el.psclueId.split('-')
              //     this.supplementOnem = tempArr[1]
              //     this.isReplenishOnem = true
              //     psclueIdArr.push('1401')
              //   } else if (el.psclueId.indexOf('1402') !== -1) {
              //     const tempArr = el.psclueId.split('-')
              //     this.supplementTwom = tempArr[1]
              //     this.isReplenishTwom = true
              //     psclueIdArr.push('1402')
              //   } else {
              //     psclueIdArr.push(el.psclueId)
              //   }
              // })
              // arr = psclueIdArr
              // formFatherArr.evokejudge = arr
              this.$set(formFatherArr, 'supplementOne', this.supplementOnem)
              this.$set(formFatherArr, 'supplementTwo', this.supplementTwom)
              this.$set(formFatherArr, 'isReplenishOne', this.isReplenishOnem)
              this.$set(formFatherArr, 'isReplenishTwo', this.isReplenishTwom)

              // formFatherArr.supplementOne = this.supplementOnem // 第一个输入框
              // formFatherArr.supplementTwo = this.supplementTwom // 第一个输入框显示
              // formFatherArr.isReplenishOne = this.isReplenishOnem // 第二个输入框
              // formFatherArr.isReplenishTwo = this.isReplenishTwom // 第二个输入框显示
              this.formFather = formFatherArr
            } else {
              this.formFather = formFatherArr
            }

            if (res.data.charosterNamesDO !== null) {
              this.database = true
              const psclueIdArr = []
              if (res.data.charosterNamesDO.charosterPreliminaryJudgmentDOList) {
                res.data.charosterNamesDO.charosterPreliminaryJudgmentDOList.forEach(el => {
                  if (el.preliminaryJudgme.indexOf('1401') !== -1) {
                    const tempArr = el.preliminaryJudgme.split('-')
                    this.supplementOne = tempArr[1]
                    this.isReplenishOne = true
                    psclueIdArr.push('1401')
                  } else if (el.preliminaryJudgme.indexOf('1402') !== -1) {
                    const tempArr = el.preliminaryJudgme.split('-')
                    this.supplementTwo = tempArr[1]
                    this.isReplenishTwo = true
                    psclueIdArr.push('1402')
                  } else {
                    if (el.preliminaryJudgme !== '') {
                      psclueIdArr.push(el.preliminaryJudgme)
                    }
                  }
                })
                res.data.charosterNamesDO.preliminaryJudgment = psclueIdArr
              }
              this.form = res.data.charosterNamesDO
              this.form.fLetterType = JSON.parse(res.data.charosterNamesDO.fLetterType)

              this.goList(true)
            }
            if (this.types === 0) {
              this.domesticForm = res.data.assisInvest ? res.data.assisInvest : this.domesticForm // 国内
              if (res.data.assisInvest) {
                this.domesticForm.crimetype = JSON.parse(res.data.assisInvest.crimetype)
              }
            } else {
              this.formTwoTB = res.data.bullet ? res.data.bullet : this.domesticForm // 国内
              if (res.data.bullet) {
                this.formTwoTB.adealdate = JSON.parse(res.data.bullet.adealdate) // 交易时间段
                this.formTwoTB.ajudge = JSON.parse(res.data.bullet.ajudge) // 初步判断
              } else {
                setTimeout(() => {
                  this.$nextTick(() => {
                    this.$refs.formTwoTB.clearValidate()
                  })
                }, 100)
              }
            }

            if (res.data.assisInvest) {
              var obj = {
                inMessageTabledata: [
                  {
                    inforName: '',
                    inforPhone: ''
                  }
                ],
                inReapTabledata: [
                  {
                    functionary: '',
                    functionaryPhone: ''
                  }
                ]
              }
              this.informationPartss =
                res.data.assisInvest.informationParts.inReapTabledata.length !== 0 &&
                res.data.assisInvest.informationParts.inMessageTabledata.length !== 0
                  ? res.data.assisInvest.informationParts
                  : obj
            } else {
              this.informationPartss = {
                inMessageTabledata: [
                  {
                    inforName: '',
                    inforPhone: ''
                  }
                ],
                inReapTabledata: [
                  {
                    functionary: '',
                    functionaryPhone: ''
                  }
                ]
              }
            }
          } else {
            if (res.data.mediaTrans) {
              this.mediumForm = res.data.mediaTrans
            } else {
              this.mediumForm = {}
            }
          }
          this.inputInforForm.inputMode = this.inputForm.appInputmode
          // console.log(this.inputForm.appInputtype)
          this.inputInforForm.inputtype = this.inputForm.appInputtype
          switch (this.inputInforForm.inputtype) {
            case '1':
              this.names = '国际协查文件管理'
              break
            case '2':
              this.names = '反馈信息'
              break
            case '3':
              this.names = '境内协查类文件管理'
              break
            case '4':
              this.names = '公文函件'
              break
            case '5':
              this.names = '其他'
              break
          }
        }
      })
      getfileListapi(this.$route.query.aId, '0').then(res => {
        if (res.code === 200) {
          if (res.code === 200) {
            this.fileList = res.data ? res.data : []
          }
        }
      })
      getfileListapi(this.$route.query.aId, '4').then(res => {
        if (res.code === 200) {
          if (res.code === 200) {
            this.mediumFile = res.data ? res.data : []
          }
        }
      })
      getfileListapi(this.$route.query.aId, '5').then(res => {
        if (res.code === 200) {
          if (res.code === 200) {
            const arrs = []
            res.data.forEach(el => {
              const obj = {}
              obj.name = el.attachName
              obj.url = el.attachPath
              obj.attachId = el.attachId
              arrs.push(obj)
            })
            this.fileListFenXiTB = arrs
            // this.fileListFenXiTB = res.data ? res.data : []
          }
        }
      })
    },

    // 录入方式2
    modeTadiaChange(val) {
      const internRadiosMo = [
        {
          value: '1',
          label: '国际协查文件管理'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        },
        {
          value: '4',
          label: '公文函件 '
        },
        {
          value: '5',
          label: '其他'
        }
      ]
      const handRadios = [
        {
          value: '1',
          label: '国际协查文件管理'
        },
        {
          value: '2',
          label: '反馈信息'
        },
        {
          value: '3',
          label: '境内协查类文件管理'
        }
      ]
      if (val === '2') {
        this.options = internRadiosMo
      } else {
        this.options = handRadios
      }
    },
    // 录入方式
    modeTadiaChange1(val) {},

    // 录入类型
    giInputChange(val) {
      // val
    },
    // 打印
    handlePrint() {
      this.printType = true
      document.body.innerHTML = this.$refs.myPrintForm.innerHTML
      window.print()
      window.location.reload()
    },
    // 保存  参数
    paramsOne() {
      // 录入类型
      const paramsObj = {
        inputMode: this.inputInforForm.inputMode, // 录入方式
        inputtype: this.inputInforForm.inputtype,
        entryFlag: '1',
        aId: this.$route.query.aId
      }
      if (this.inputInforForm.inputMode === '1') {
        if (this.inputInforForm.inputtype === '1') {
          // 国际协查文件管理
          var obj = this.internationForm
          var ztObj = {
            ztName: obj.ztName ? obj.ztName : '',
            ztBname: obj.ztBname ? obj.ztBname : '',
            ztAddress: obj.ztAddress ? obj.ztAddress : '',
            ztGuanxi: obj.ztGuanxi ? obj.ztGuanxi : '',
            ztActivity: obj.ztActivity ? obj.ztActivity : '',
            ztIdnum: obj.ztIdnum ? obj.ztIdnum : '',
            ztPassport: obj.ztPassport ? obj.ztPassport : '',
            ztIdnumorg: obj.ztIdnumorg ? obj.ztIdnumorg : '',
            ztOtheridnum: obj.ztOtheridnum ? obj.ztOtheridnum : '',
            ztOtheridnumorg: obj.ztOtheridnumorg ? obj.ztOtheridnumorg : '',
            ztPhone: obj.ztPhone ? obj.ztPhone : '',
            ztOther: obj.ztOther ? obj.ztOther : '',
            ztNationlity: obj.ztNationlity ? obj.ztNationlity : '',
            ztSex: obj.ztSex ? obj.ztSex : '',
            ztBirthday: obj.ztBirthday ? obj.ztBirthday : '',
            ztCity: obj.ztCity ? obj.ztCity : '',
            ztProvinces: obj.ztProvinces ? obj.ztProvinces : '',
            ztNation: obj.ztNation ? obj.ztNation : '',
            rivlName: obj.rivlName ? obj.rivlName : '',
            rivlIdnum: obj.rivlIdnum ? obj.rivlIdnum : '',
            rivlPassportnum: obj.rivlPassportnum ? obj.rivlPassportnum : '',
            rivlBankname: obj.rivlBankname ? obj.rivlBankname : '',
            rivlBankaccount: obj.rivlBankaccount ? obj.rivlBankaccount : '',
            rivlTradedate: obj.rivlTradedate ? obj.rivlTradedate : '',
            rivlTradeamount: obj.rivlTradeamount ? obj.rivlTradeamount : '',
            rivlTradedirection: obj.rivlTradedirection ? obj.rivlTradedirection : ''
          }
          paramsObj.EntryInfor = obj
          if (this.myarr.length > 0) {
            paramsObj.EntryInfor.subjectList = this.myarr
            paramsObj.EntryInfor.subjectList.unshift(ztObj)
          } else {
            var arr = []
            arr.push(ztObj)
            paramsObj.EntryInfor.subjectList = arr
          }
          delete obj.ztName
          delete obj.ztBname
          delete obj.ztAddress
          delete obj.ztGuanxi
          delete obj.ztActivity
          delete obj.ztIdnum
          delete obj.ztPassport
          delete obj.ztIdnumorg
          delete obj.ztOtheridnum
          delete obj.ztOtheridnumorg
          delete obj.ztPhone
          delete obj.ztOther
          delete obj.ztNationlity
          delete obj.ztSex
          delete obj.ztBirthday
          delete obj.ztCity
          delete obj.ztProvinces
          delete obj.ztNation
          delete obj.rivlName
          delete obj.rivlIdnum
          delete obj.rivlPassportnum
          delete obj.rivlBankname
          delete obj.rivlBankaccount
          delete obj.rivlTradedate
          delete obj.rivlTradeamount
          delete obj.rivlTradedirection
        } else if (this.inputInforForm.inputtype === '2') {
          // 反馈信息
          // this.uploadFather = true
          var EntryInforArr = []
          EntryInforArr = this.$refs.refInputInfo.feedbackdata
          const ary0 = []
          EntryInforArr.evokejudge.forEach(el => {
            if (el === '1401') {
              el = '1401-' + EntryInforArr.supplementOne
            } else if (el === '1402') {
              el = '1402-' + EntryInforArr.supplementTwo
            }
            ary0.push(el)
          })
          EntryInforArr.evokejudge = ary0.join(',')
          // EntryInforArr.evokejudge.forEach(el => {
          //   const obj3 = {}
          //   if (el === '1401') {
          //     el = '1401-' + EntryInforArr.supplementOne
          //   } else if (el === '1402') {
          //     el = '1402-' + EntryInforArr.supplementTwo
          //   }
          //   obj3.psclueId = el
          //   ary0.push(obj3)
          // })
          // EntryInforArr.evokejudge = ary0
          paramsObj.EntryInfor = EntryInforArr

          //   this.$refs.refInputInfo.$refs.refuploadDetial.submit()// 案件详情
        } else if (this.inputInforForm.inputtype === '3') {
          // 国内协查请求
          paramsObj.fileType = this.types ? '通报' : '协查'
          paramsObj.isEntryList = this.database ? '1' : '0' // 是否入名单库
          paramsObj.entryList = this.myparamsObj
          if (this.types === 0) {
            paramsObj.EntryInfor = this.domesticForm
            paramsObj.EntryInfor.informationParts = this.informationPartss
          } else {
            paramsObj.EntryInfor = this.formTwoTB
          }
        } else {
          return false
        }
      } else {
        paramsObj.EntryInfor = this.mediumForm
      }

      return paramsObj
    },
    //  删除附件
    DelDownload(id) {
      delloadapi(id)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 6000
            })
          }
        })
        .then(() => {
          this.mediumFile.filter((item, index) => {
            if (item.attachId.indexOf(id) !== -1) {
              this.mediumFile.splice(index, 1)
            }
          })
        })
    },
    // 提交  参数
    paramsSub() {
      // 录入类型
      // this.inputInforForm // 录入形式
      const paramsObj = {
        inputMode: this.inputInforForm.inputMode, // 录入方式
        inputtype: this.inputInforForm.inputtype,
        entryFlag: '2',
        aId: this.$route.query.aId
      }
      if (this.inputInforForm.inputMode === '1') {
        // 手工录入
        if (this.inputInforForm.inputtype === '1') {
          // 国际协查文件管理
          var obj = this.internationForm
          var ztObj = {
            ztName: obj.ztName ? obj.ztName : '',
            ztBname: obj.ztBname ? obj.ztBname : '',
            ztAddress: obj.ztAddress ? obj.ztAddress : '',
            ztGuanxi: obj.ztGuanxi ? obj.ztGuanxi : '',
            ztActivity: obj.ztActivity ? obj.ztActivity : '',
            ztIdnum: obj.ztIdnum ? obj.ztIdnum : '',
            ztPassport: obj.ztPassport ? obj.ztPassport : '',
            ztIdnumorg: obj.ztIdnumorg ? obj.ztIdnumorg : '',
            ztOtheridnum: obj.ztOtheridnum ? obj.ztOtheridnum : '',
            ztOtheridnumorg: obj.ztOtheridnumorg ? obj.ztOtheridnumorg : '',
            ztPhone: obj.ztPhone ? obj.ztPhone : '',
            ztOther: obj.ztOther ? obj.ztOther : '',
            ztNationlity: obj.ztNationlity ? obj.ztNationlity : '',
            ztSex: obj.ztSex ? obj.ztSex : '',
            ztBirthday: obj.ztBirthday ? obj.ztBirthday : '',
            ztCity: obj.ztCity ? obj.ztCity : '',
            ztProvinces: obj.ztProvinces ? obj.ztProvinces : '',
            ztNation: obj.ztNation ? obj.ztNation : '',
            rivlName: obj.rivlName ? obj.rivlName : '',
            rivlIdnum: obj.rivlIdnum ? obj.rivlIdnum : '',
            rivlPassportnum: obj.rivlPassportnum ? obj.rivlPassportnum : '',
            rivlBankname: obj.rivlBankname ? obj.rivlBankname : '',
            rivlBankaccount: obj.rivlBankaccount ? obj.rivlBankaccount : '',
            rivlTradedate: obj.rivlTradedate ? obj.rivlTradedate : '',
            rivlTradeamount: obj.rivlTradeamount ? obj.rivlTradeamount : '',
            rivlTradedirection: obj.rivlTradedirection ? obj.rivlTradedirection : ''
          }
          paramsObj.EntryInfor = obj
          if (this.myarr.length > 0) {
            paramsObj.EntryInfor.subjectList = this.myarr
            paramsObj.EntryInfor.subjectList.unshift(ztObj)
          } else {
            var arr = []
            arr.push(ztObj)
            paramsObj.EntryInfor.subjectList = arr
          }
          delete obj.ztName
          delete obj.ztBname
          delete obj.ztAddress
          delete obj.ztGuanxi
          delete obj.ztActivity
          delete obj.ztIdnum
          delete obj.ztPassport
          delete obj.ztIdnumorg
          delete obj.ztOtheridnum
          delete obj.ztOtheridnumorg
          delete obj.ztPhone
          delete obj.ztOther
          delete obj.ztNationlity
          delete obj.ztSex
          delete obj.ztBirthday
          delete obj.ztCity
          delete obj.ztProvinces
          delete obj.ztNation
          delete obj.rivlName
          delete obj.rivlIdnum
          delete obj.rivlPassportnum
          delete obj.rivlBankname
          delete obj.rivlBankaccount
          delete obj.rivlTradedate
          delete obj.rivlTradeamount
          delete obj.rivlTradedirection
        } else if (this.inputInforForm.inputtype === '2') {
          // 反馈信息
          // paramsObj.EntryInfor = this.$refs.refInputInfo.feedbackdata
          var EntryInforArr = []
          EntryInforArr = this.$refs.refInputInfo.feedbackdata
          const ary0 = []
          EntryInforArr.evokejudge.forEach(el => {
            if (el === '1401') {
              el = '1401-' + EntryInforArr.supplementOne
            } else if (el === '1402') {
              el = '1402-' + EntryInforArr.supplementTwo
            }
            ary0.push(el)
          })
          // EntryInforArr.evokejudge.forEach(el => {
          //   const obj3 = {}
          //   if (el === '1401') {
          //     el = '1401-' + EntryInforArr.supplementOne
          //   } else if (el === '1402') {
          //     el = '1402-' + EntryInforArr.supplementTwo
          //   }
          //   obj3.psclueId = el
          //   ary0.push(obj3)
          // })
          EntryInforArr.evokejudge = ary0.join(',')
          paramsObj.EntryInfor = EntryInforArr
          // this.uploadFather = true
        } else if (this.inputInforForm.inputtype === '3') {
          // 国内协查请求
          // paramsObj.EntryInfor = this.domesticForm
          // paramsObj.EntryInfor.informationParts = this.informationPartss
          paramsObj.fileType = this.types ? '通报' : '协查'
          paramsObj.isEntryList = this.database ? '1' : '0' // 是否入名单库
          paramsObj.entryList = this.myparamsObj
          if (this.types === 0) {
            paramsObj.EntryInfor = this.domesticForm
            paramsObj.EntryInfor.informationParts = this.informationPartss
          } else {
            paramsObj.EntryInfor = this.formTwoTB
          }
        } else {
          return false
        }
      } else {
        // 介质传输
        paramsObj.EntryInfor = this.mediumForm
      }

      return paramsObj
    },

    // 提交
    handleSubmit() {
      // this.$refs.inputInforForm.validate((valid) => {
      //   if (valid) {
      //     this.realSubmit()
      //   }
      // })
      if (this.inputForm.appInputmode === '2') {
        // 介质
        this.$refs.refmediumForm.validate(valid => {
          if (valid) {
            this.subLoading = true
            if (this.enclosure !== '') {
              this.fileTypes = 'baocun'
              this.$refs.refUpload.submit()
            } else {
              this.realSubmit()
            }
          } else {
            this.$message({
              message: '有未填写的必填项未填写，请检查',
              type: 'error',
              duration: 6000
            })
          }
        })
      } else if (this.inputInforForm.inputMode === '1' && this.inputInforForm.inputtype === '1') {
        // 国际协查文件管理

        this.$refs.refinternation.validate(valid => {
          if (valid) {
            this.subLoading = true
            this.realSubmit()
          } else {
            this.$message({
              message: '有未填写的必填项未填写，请检查',
              type: 'error',
              duration: 6000
            })
          }
        })
      } else if (this.inputInforForm.inputMode === '1' && this.inputInforForm.inputtype === '2') {
        // 反馈信息
        var flag = this.$refs['refInputInfo'].validateForm()
        if (flag) {
          this.subLoading = true
          this.uploadFather = true
          this.realSubmit()
        } else {
          this.$message({
            message: '有未填写的必填项未填写，请检查',
            type: 'error',
            duration: 6000
          })
        }
      } else if (this.inputInforForm.inputMode === '1' && this.inputInforForm.inputtype === '3') {
        // 国内协查请求
        this.$refs.refDomesForm.validate(valid => {
          if (valid) {
            if (this.database) {
              this.$refs.ruleForm.validate(valid => {
                if (valid) {
                  this.subLoading = true
                  this.realSubmit()
                } else {
                  this.$message({
                    message: '有未填写的必填项未填写，请检查',
                    type: 'error',
                    duration: 6000
                  })
                }
              })
            } else {
              this.subLoading = true
              this.realSubmit()
            }
          } else {
            this.$message({
              message: '有未填写的必填项未填写，请检查',
              type: 'error',
              duration: 6000
            })
          }
        })
      }
    },
    realSubmit() {
      sendSubmitapi(this.paramsSub())
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.subLoading = false
            this.$router.go(-1)
          } else {
            this.subLoading = false
          }
        })
        .catch(() => {
          this.subLoading = false
        })
      this.$refs.refUpload.submit()
    },

    //   保存
    handleSave() {
      if (this.inputForm.appInputmode === '2') {
        // 介质
        this.$refs.refmediumForm.validate(valid => {
          if (valid) {
            this.subLoading = true
            if (this.enclosure !== '') {
              this.fileTypes = 'baocun'
              this.$refs.refUpload.submit()
            } else {
              this.realSave()
            }
          } else {
            this.$message({
              message: '有未填写的必填项未填写，请检查',
              type: 'error',
              duration: 6000
            })
          }
        })
      } else if (this.inputInforForm.inputMode === '1' && this.inputInforForm.inputtype === '1') {
        // 国际协查文件管理

        this.$refs.refinternation.validate(valid => {
          if (valid) {
            this.subLoading = true
            this.realSave()
          } else {
            this.$message({
              message: '有未填写的必填项未填写，请检查',
              type: 'error',
              duration: 6000
            })
          }
        })
      } else if (this.inputInforForm.inputMode === '1' && this.inputInforForm.inputtype === '2') {
        // 反馈信息
        var flag = this.$refs['refInputInfo'].validateForm()
        if (flag) {
          this.subLoading = true
          this.uploadFather = true
          this.realSave()
        } else {
          this.$message({
            message: '有未填写的必填项未填写，请检查',
            type: 'error',
            duration: 6000
          })
        }
      } else if (this.inputInforForm.inputMode === '1' && this.inputInforForm.inputtype === '3') {
        // 国内协查请求
        if (this.types === 0) {
          this.$refs.refDomesForm.validate(valid => {
            if (valid) {
              if (this.database) {
                this.$refs.ruleForm.validate(valid => {
                  if (valid) {
                    this.subLoading = true
                    this.realSave()
                  } else {
                    this.$message({
                      message: '有未填写的必填项未填写，请检查',
                      type: 'error',
                      duration: 6000
                    })
                  }
                })
              } else {
                this.subLoading = true
                this.realSave()
              }
            } else {
              this.$message({
                message: '有未填写的必填项未填写，请检查',
                type: 'error',
                duration: 6000
              })
            }
          })
        }
        if (this.types === 1) {
          this.$refs.formTwoTB.validate(valid => {
            if (valid) {
              this.subLoading = true
              this.realSave()
            } else {
              this.$message({
                message: '有未填写的必填项未填写，请检查',
                type: 'error',
                duration: 6000
              })
            }
          })
        }
      }
    },
    realSave() {
      sendSubmitapi(this.paramsOne())
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.go(-1)
            this.subLoading = false
          } else {
            this.subLoading = false
          }
        })
        .catch(() => {
          this.subLoading = false
        })
    },
    handleClickInfo(tab, event) {
      console.log(tab, event)
    },
    //  来件信息2：
    addInfor() {
      this.informationPartss.inMessageTabledata.push({
        inforName: '',
        inforPhone: ''
      })
    },
    deleteInfor(scope) {
      this.informationPartss.inMessageTabledata.splice(scope.$index, 1)
    },
    addResp() {
      this.informationPartss.inReapTabledata.push({
        inforName: '',
        inforPhone: ''
      })
    },
    deleteResp(scope) {
      this.informationPartss.inReapTabledata.splice(scope.$index, 1)
    },

    // 返回
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.sjifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
      // this.$router.push({
      //   name: 'cueManage_dataEntry'
      // })
    },
    // 下载附件
    hanldDownload(id) {
      location.href = `/file-service/upload/download/${id}?moduleName=${encodeURI('线索管理')}`
    },
    handleClick(tab, event) {
      if (tab.name === 'last') {
        getcircuitapi(this.$route.query.aId).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.result
            this.tableFlow = res.data.status

            this.tableFlow.unshift('录入审核单')
            if (
              res.data.inputStatus === '流程结束，拒绝' ||
              res.data.inputStatus === '流程结束，同意录入' ||
              res.data.inputStatus === '已入库'
            ) {
              this.stepActive = this.tableFlow.length + 1
            } else {
              this.stepActive = this.tableFlow.length - 1
            }
            this.endFlag = res.data.inputStatus
          }
        })
      }
    },
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      var number = /^\d+(\.\d+)?$/
      if (value === '' || value === undefined) {
        callback()
      } else {
        if (!number.test(value)) {
          callback(new Error('必须输入数值'))
        } else {
          callback()
        }
      }
    },
    // 国家名
    getCountryList() {
      country().then(res => {
        this.countryOption = res.data.list
      })
    },

    // 文件
    beforeAvatarUpload() {},
    handlePreview(file, fileList) {},
    handleRemove(file, fileList) {},
    changeUpload(file, fileList) {
      const isLt2k = file.size / 1024 / 1024 > 500
      if (isLt2k) {
        this.$message({
          message: '上传文件大小不能超过500M!',
          type: 'warning'
        })
        fileList.pop()
      } else {
        this.filelength = fileList.length
        this.enclosure = file
      }
    },
    handleSuccess(response, file, fileList) {
      this.fileNum++
      if (this.fileNum === this.filelength && this.fileTypes !== 'baocun') {
        this.realSubmit()
      } else if (this.fileNum === this.filelength && this.fileTypes === 'baocun') {
        this.realSave()
      }
    },
    handleError(file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    certificate() {
      switch (this.form.subjectIType) {
        case '110003':
          this.rules.subjectINum = [
            { required: true, message: '请填正确的身份证号码', trigger: 'blur' },
            {
              pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/,
              message: '请输入正确的身份证号码,15或18位',
              trigger: 'blur'
            }
          ]
          break
        case '110001':
          this.rules.subjectINum = [
            { required: true, message: '请填正确的身份证号码', trigger: 'blur' },
            {
              pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/,
              message: '请输入正确的身份证号码,15或18位',
              trigger: 'blur'
            }
          ]
          break
        case '':
          this.rules.subjectINum = [{ validator: adminisValidInput, trigger: 'blur' }]
          break
        default:
          this.rules.subjectINum = [
            { required: true, validator: common_Validate, trigger: 'change' },
            { message: '最少输入6个字符', trigger: 'blur', min: 6, max: 128 }
          ]
          break
      }
    },
    // 切换数据
    changeAnalyst(params) {
      let deptId = ''
      this.holdDeptArr.forEach(el => {
        if (el.deptCode === params) {
          deptId = el.deptId
          return
        }
      })
      deptUser({ deptId: deptId }).then(res => {
        if (res.code === 200) {
          this.form.holdDeptAnalyst = ''
          this.analystArr = res.data
        }
      })
    },
    // 添加一条账户
    addSingleAccount(item, index) {
      if (this.form.charosterAccountDOS.length < 5) {
        this.form.charosterAccountDOS.push({
          openAccountOrgName: '',
          accountNum: ''
        })
      } else {
        this.$message({
          message: '您最多只能添加5个',
          type: 'warning',
          duration: 6000
        })
      }
    },
    getsourceBusinessArr() {
      var paramsObj = {
        pageNum: 1,
        pageSize: 9999
      }
      getsourceBusinessArr(paramsObj, '0').then(res => {
        if (res.code === 200) {
          this.sourceBusinessArr = res.data.list
        }
      })
      getsourceBusinessArr(paramsObj, '1').then(res => {
        if (res.code === 200) {
          this.sourceDireArr = res.data.list
        }
      })
      // getsourceBusinessArr('SCDS').then(res => {
      //   if (res.code === 200) {
      //     this.sourceBusinessArr = res.data
      //   }
      // })
    },
    getDepartmentInit() {
      getDepartment('').then(res => {
        if (res.code === 200) {
          this.holdDeptArr = res.data
        }
      })
    },
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.preliminaryJudgment.indexOf('1402') !== -1) {
        this.isReplenishTwo = true
      } else {
        this.isReplenishTwo = false
      }
      if (this.form.preliminaryJudgment.indexOf('1401') !== -1) {
        this.isReplenishOne = true
      } else {
        this.isReplenishOne = false
      }
    },
    // 涉罪校验
    szisValidInput1(rule, value, callback) {
      if (!commonPattern.spaceBar.test(this.supplementOne)) {
        callback(new Error('内容不能含有空格'))
      } else if (
        commonPattern.specialChar.test(this.supplementOne) ||
        commonPattern.specialEng.test(this.supplementOne)
      ) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (this.supplementOne === '') {
        callback(new Error('请输入内容'))
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
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    },
    goList(val) {
      if (val) {
        this.domestic = 'thirds'
        this.getDictionary('TOSC')
        this.getDictionary('TTOUC')
        this.getDepartmentInit()
        this.getsourceBusinessArr()
        this.getDictionary('SUBTYPE')
        this.getDictionary('SEX')
        this.getDictionary('PUBLEVEL')
        this.getDictionary('LOCP')
        this.getDictionary('COUNTRY')
        this.getDictionary('SFZJ')
        this.getDictionary('HTDP')
        this.getDictionary('FRTS')
        this.getDictionary('SCDT')
        // this.getDictionary('SCDS')
        this.getDictionary('PUBSCOPE')
        this.getDictionary('LISTIDE')
      } else {
        if (this.types === 0) {
          this.domestic = 'ones'
        } else {
          this.domestic = 'twos'
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form)
        } else {
          return false
        }
      })
    },
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'SUBTYPE':
              this.subjectTypeArr = res.data
              break
            case 'SEX':
              this.personSubjectSexArr = res.data
              break
            case 'PUBLEVEL':
              this.publicLevelArr = res.data
              break
            case 'LOCP':
              this.listSOpponentArr = res.data
              break
            case 'COUNTRY':
              this.subjectNationalityArr = res.data
              break
            case 'SFZJ':
              this.subjectITypeArr = res.data
              break
            // case 'HTDP':
            //   this.holdDeptArr = res.data
            //   break
            case 'FRTS':
              this.fTransforDeptArr = res.data
              break
            // case 'SCDT':
            //   this.sourceDireArr = res.data
            //   break
            case 'TTOUC':
              this.fletterTypeData = res.data
              break
            case 'PUBSCOPE':
              this.publicScopeArr = res.data
              break
            // case 'LISTIDE':
            //   this.listIdentificationArr = res.data
            //   break
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            // case 'SCDS':
            //   this.sourceBusinessArr = res.data
            //   break
            default:
              break
          }
        }
      })
    },
    FXuploadSuccess(response, file, fileList) {
      this.subLoading = false
      if (response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 6000
        })
      } else {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 6000
        })
      }
    },
    beforeFXUpload(file) {
      this.subLoading = true
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.$message({
          message: '上传文件大小不能超过500MB',
          type: 'error',
          duration: 6000
        })
      }

      return isLt500M
    },
    FXerrorFile() {
      this.subLoading = false
      this.$message({
        message: '上传失败',
        type: 'error',
        duration: 6000
      })
    },
    // 下载附件
    FXdownFile(file) {
      location.href =
        '/file-service/upload/download/' + file.attachId + '?moduleName=' + encodeURI('线索管理')
    },
    // 分析删除
    FXhandleRemove(file, fileList) {
      if (file && file.status === 'success') {
        var id
        if (file.attachId) {
          id = file.attachId
        } else {
          id = file.response.data.attachId
        }
        delloadapi(id).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 6000
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.dataEntry_add {
  position: relative;
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  // .el-step__main{
  //   margin-right:20px;
  // }
  .el-step,
  .is-horizontal,
  .is-center {
    max-width: none !important;
  }
  .is-center {
    width: 500px !important;
    max-width: none !important;
  }
  .styleFist {
    .downloadStyle {
      float: left;
      margin-right: 18px;
      line-height: 24px;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-col {
      border: 1px solid #727475;
      border-bottom: 10px;
    }
    .el-row:last-of-type .el-col {
      border: 1px solid #727475;
    }
    .el-form-item {
      margin-bottom: 0px;
      //   padding: 5px;
    }
    .el-form-item__label {
      padding: 12px;
      border-right: 1px solid #727475;
      //   background: #ebeff1;
    }
    .el-form-item__content {
      padding: 12px;
      padding-bottom: 0;
    }
    .el-form-item__content::before {
      //   border: 1px solid #303133;
      content: '';
    }
  }

  .classFiledset {
    border-radius: 5px;
    // border-color: #67c23a;
    border-color: #e1f3d8;
    margin-bottom: 10px;
  }

  .el-select {
    width: 100%;
  }

  .el-date-editor--date {
    width: 100% !important;
  }
  .el-date-editor {
    width: 100%;
  }

  .el-radio + .el-radio {
    margin-left: 1px !important;
  }
  .el-radio__label {
    font-size: 14px;
    padding-left: 5px;
  }
  .block {
    margin-top: 40px;
    .font {
      margin-bottom: 15px;
    }
    .blockTitle {
      margin-bottom: 20px;
    }
  }
  .apporderwrap {
    .flex-modelmain {
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .flex-row {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    .row-header-column {
      display: flex;
      flex: 0 0 30%;
      margin-bottom: 10px;

      span {
        flex: 0 0 120px;
        text-align: right;
        align-self: center;
      }
      .el-input {
        flex: 1;
      }
    }
    .flex-col-1 {
      flex: 1;
      display: flex;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    .flex-label {
      flex: 0 0 150px;
      padding: 10px 20px;
      text-align: right;
      border-right: 1px solid #ccc;
      // flex垂直居中的方法
      display: flex;
      align-items: center;
    }
    .flex-input {
      flex: 1;
      padding: 10px 20px;
      align-self: center;
    }
  }
  .table-title {
    padding: 10px 20px;
    font-weight: bold;
  }
  .modeltitle {
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  // .dialog-block{
  //   .leader{
  //     width: 100%;
  //     margin-left:30px;
  //   }
  // }

  .flex-modelmain {
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .flex-row {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .row-header-column {
    display: flex;
    flex: 0 0 30%;
    margin-bottom: 10px;

    span {
      flex: 0 0 120px;
      text-align: right;
      align-self: center;
    }
    .el-input {
      flex: 1;
    }
  }
  .flex-col-1 {
    flex: 1;
    display: flex;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .flex-label {
    flex: 0 0 140px;
    align-self: center;
    padding: 10px 20px;
    text-align: right;
  }
  .flex-input {
    flex: 1;
    padding: 10px 20px;
    border-left: 1px solid #ccc;
  }
}
</style>
