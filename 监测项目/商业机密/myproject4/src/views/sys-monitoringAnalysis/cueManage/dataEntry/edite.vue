<template>
  <div class="dataEntry_edit">
    <el-card>
      <a @click="goBack" class="back" :style="backImg"></a>
      <div slot="header">
        <span>数据录入申请</span>
      </div>
      <div>
        <el-row>
          <el-col :span="2" style="padding-top:7px">流程操作：</el-col>
          <el-col :span="22">
            <el-button @click="handleSave" type="warning" plain>保 存</el-button>
            <el-button @click="handleSubmit" type="primary" plain>提 交</el-button>
            <el-button type="primary" plain>打 印</el-button>
          </el-col>
        </el-row>
        <el-tabs type="border-card" style="margin-top:20px" @tab-click="handleClick">
          <el-tab-pane label="数据录入审批单">
            <ApprovalOrder ref="refApprovalorder"></ApprovalOrder>
          </el-tab-pane>

          <el-tab-pane label="录入信息">
            <el-form :model="inputInforForm">
              <el-form-item label="录入方式">
                <el-radio-group :disabled="disabled" v-model="inputInforForm.inputMode" @change="modeTadiaChange">
                  <el-radio v-for="(item,idx) in modeRadios" :label="item.label" :key="idx">{{item.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="录入类型">
                <el-radio-group :disabled="disabled" v-model="inputInforForm.inputtype" @change="giInputChange">
                  <el-radio v-for="(item,idx) in internRadios" :label="item.label" :key="idx">{{item.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>

            <!-- 国际协查请求信息 v-show="isShow"-->
            <el-form :model="internationForm" ref="refinternation" :rules="internationFormRules" v-if="inputInforForm.inputMode === '1' && inputInforForm.inputtype === '1'">
              <fieldset class="classFiledset">
                <legend>常用信息</legend>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="中心编号" prop="centerNum">
                      <el-input v-model="internationForm.centerNum" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="类别" prop="leibie">
                      <el-input v-model="internationForm.leibie" placeholder="协查请求">

                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="常用国家/地区（请求方）" prop="">
                      <el-select clearable v-model="internationForm.qiNation" filterable placeholder="请选择" class="w100">
                        <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- </el-row>
                <el-row :gutter="20"> -->
                  <el-col :span="6">
                    <el-form-item label="常用国家/地区（披露方）" prop="">
                      <el-select clearable v-model="internationForm.piNation" filterable placeholder="请选择" class="w100">
                        <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </fieldset>

              <fieldset class="classFiledset">
                <legend>请求方信息</legend>

                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="编号" prop="qNum">
                      <el-input v-model="internationForm.qNum" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="国家/地区" prop="qNation">
                      <el-select clearable v-model="internationForm.qNation" filterable placeholder="请选择" class="w100">
                        <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="机构" prop="qOrg">
                      <el-select v-model="internationForm.qOrg" placeholder="请选择活动区域">
                        <el-option label="协查请求" value="协查请求"></el-option>
                        <el-option label="协查请求2" value="协查请求2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="联系人" prop="qLinkman">
                      <el-input v-model="internationForm.qLinkman" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人职务" prop="qDuty">
                      <el-input v-model="internationForm.qDuty" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话" prop="qPhone">
                      <el-input v-model="internationForm.qPhone" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="传真" prop="qFax">
                      <el-input v-model="internationForm.qFax" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮箱" prop="qEmail">
                      <el-input v-model="internationForm.qEmail" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="地址" prop="qAddress">
                      <el-input v-model="internationForm.qAddress" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="法定代表人" prop="qLegalrepre">
                      <el-input v-model="internationForm.qLegalrepre" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="签名" prop="qSignature">
                      <el-input v-model="internationForm.qSignature" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="日期" prop="qDate">
                      <el-date-picker type="date" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="internationForm.qDate" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注" prop="qremark">
                      <el-input v-model="internationForm.qremark" placeholder="请输入内容" type="textarea" :rows="3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </fieldset>

              <fieldset class="classFiledset">
                <legend>披露方信息</legend>

                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="国家/地区">
                      <el-select clearable v-model="internationForm.fnation" filterable placeholder="请选择" class="w100">
                        <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="机构" prop="forg">
                      <el-select v-model="internationForm.forg" placeholder="请选择活动区域">
                        <el-option label="协查请求" value="协查请求"></el-option>
                        <el-option label="协查请求2" value="协查请求2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人" prop="flinkman">
                      <el-input v-model="internationForm.flinkman" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="联系人职务" prop="fduty">
                      <el-input v-model="internationForm.fduty" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话" prop="fphone">
                      <el-input v-model="internationForm.fphone" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="传真" prop="ffax">
                      <el-input v-model="internationForm.ffax" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="邮箱" prop="femail">
                      <el-input v-model="internationForm.femail" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="地址" prop="faddress">
                      <el-input v-model="internationForm.faddress" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注" prop="fremark">
                      <el-input v-model="internationForm.fremark" placeholder="请输入内容" type="textarea" :rows="3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </fieldset>
            </el-form>

            <!-- 反馈信息 v-show="isShow3" -->
            <div class="apporderwrap" v-if="inputInforForm.inputMode === '1' && inputInforForm.inputtype === '2'" style="margin-top:50px">
              <InputInfo ref="refInputInfo"></InputInfo>
            </div>

            <!-- 国内协查请求信息  v-show="isShow5" -->
            <div class="apporderwrap" v-if="inputInforForm.inputMode === '1' && inputInforForm.inputtype === '5'" style="margin-top:50px">
              <!-- <div class="modeltitle">国内协查请求信息</div> -->
              <el-form :model="domesticForm" :rules="domesticFormRules" ref="refDomesForm">
                <fieldset class="classFiledset">
                  <legend>来件信息1</legend>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="来件日期" prop="receiveDate">
                        <el-date-picker type="date" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="domesticForm.receiveDate" placeholder="选择日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="协查文号" prop="asssnum">
                        <el-input v-model="domesticForm.asssnum" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="关联文号" prop="relevancenum">
                        <el-input v-model="domesticForm.relevancenum" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="协查类型" prop="assstype">
                        <el-select v-model="domesticForm.assstype" placeholder="请选择">
                          <el-option label="一级协查" value="1"></el-option>
                          <el-option label="研判分析" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="紧急程度" prop="urgency">
                        <el-select v-model="domesticForm.urgency" placeholder="请选择">
                          <el-option label="特别紧急" value="特别紧急"></el-option>
                          <el-option label="一般紧急" value="一般紧急"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="涉罪类型" prop="crimetype">
                        <el-select v-model="domesticForm.crimetype" placeholder="请选择">
                          <el-option label="特别紧急" value="特别紧急"></el-option>
                          <el-option label="一般紧急" value="一般紧急"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-form-item label="来文标题" prop="laiwentitle">
                        <el-input v-model="domesticForm.laiwentitle" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-form-item label="案情简介" prop="Introductioncase">
                        <el-input v-model="domesticForm.Introductioncase" placeholder="请输入内容" type="textarea" :rows="5"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="案情标签" prop="caselabel">
                        <el-input v-model="domesticForm.caselabel" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="来文单位" prop="laiwenUnit">
                        <el-select v-model="domesticForm.laiwenUnit" placeholder="请选择">
                          <el-option label="特别紧急" value="特别紧急"></el-option>
                          <el-option label="一般紧急" value="一般紧急"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="请求事项" prop="requestitem">
                        <el-input v-model="domesticForm.requestitem" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-form-item label="协查名单" prop="assList">
                        <el-input v-model="domesticForm.assList" placeholder="请输入内容" type="textarea" :rows="5"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </fieldset>

                <fieldset class="classFiledset">
                  <legend>来件信息2</legend>
                  <el-form :model="informationPartss">
                    <el-table :data="informationPartss.inMessageTabledata" width="95%">
                      <el-table-column label="联系人">
                        <template slot-scope="scope">
                          <el-form-item :prop="'inMessageTabledata.'+scope.$index+'.inforName'" :rules="[{ validator: isValidInput, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }]">
                            <el-input v-model="scope.row.inforName" placeholder="请输入"></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>

                      <el-table-column label="联系人电话">
                        <template slot-scope="scope">
                          <el-form-item :prop="'inMessageTabledata.'+scope.$index+'.inforPhone'" :rules="[{ validator: isValidInput, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }]">
                            <el-input v-model="scope.row.inforPhone" placeholder="请输入"></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                          <el-button type="text" @click="addInfor">增加</el-button>
                          <el-button type="text" @click="deleteInfor(scope)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form>

                  <div style="margin:10px;border:1px"></div>
                  <el-table :data="informationPartss.inReapTabledata" width="95%">
                    <el-table-column label="负责人">
                      <template slot-scope="scope">
                        <el-form-item :prop="'inReapTabledata.'+scope.$index+'.functionary'" :rules="[{ validator: isValidInput, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }]">
                          <el-input v-model="scope.row.functionary" placeholder="请输入"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="负责人电话">
                      <template slot-scope="scope">
                        <el-form-item :prop="'inReapTabledata.'+scope.$index+'.functionaryPhone'" :rules="[{ validator: isValidInput, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }]">
                          <el-input v-model="scope.row.functionaryPhone" placeholder="请输入"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button type="text" @click="addResp">增加</el-button>
                        <el-button type="text" @click="deleteResp(scope)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </fieldset>
              </el-form>
            </div>

            <!-- 介质传输 -->
            <el-form :model="mediumForm" ref="refmediumForm" :rules="mediumFormRules" v-if="inputInforForm.inputMode === '2' && inputInforForm.inputtype !== ''">
              <fieldset class="classFiledset">
                <legend>录入信息</legend>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="申请录入人" prop="entryName">
                      <el-input v-model="mediumForm.entryName"  placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在部门" prop="entryDepartment">
                      <el-input v-model="mediumForm.entryDepartment"  placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请时间" prop="applyTime">
                      <el-date-picker :picker-options="pickerOptions" v-model="mediumForm.applyTime" clearable type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 录入文件 -->
                <el-form-item label=""></el-form-item>
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </fieldset>

            </el-form>
          </el-tab-pane>

          <el-tab-pane label="相关附件">
            <Enclosure></Enclosure>
          </el-tab-pane>

          <el-tab-pane label="办理信息">
            <HandleInfo></HandleInfo>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { commonPattern } from '@/utils/formValidate'
import { noSpaceAndTs } from '@/utils/formValidate.js'
import { mapGetters } from 'vuex'
import { sendSaveapi, sendSubmitapi, getviewapi } from '@/api/sys-monitoringAnalysis/cueManage/dataEntry/add.js'
import { country } from '@/api/common/citys.js'
import { getUUIDTo } from '@/utils/index.js'
import ApprovalOrder from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/approvalOrder'
import Enclosure from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/enclosure'
import HandleInfo from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/handleInfo'
import InputInfo from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/feedBack/InputFeedback'
export default {
  components: {
    Enclosure,
    ApprovalOrder,
    HandleInfo,
    InputInfo
  },

  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      UUID: '', // uuid
      disabled: false,
      inputInforForm: {
        inputMode: '1',
        inputtype: ''
      },
      // 国际
      internationForm: {
        centerNum: '',
        leibie: '',
        qiNation: '',
        piNation: '',
        qNum: '',
        qNation: '',
        qOrg: '',
        qLinkman: '',
        qDuty: '',
        qPhone: '',
        qFax: '',
        qEmail: '',
        qAddress: '',
        qLegalrepre: '',
        qSignature: '',
        qDate: '',
        qremark: '',
        fnation: '',
        forg: '',
        flinkman: '',
        fduty: '',
        fphone: '',
        ffax: '',
        femail: '',
        faddress: '',
        fremark: ''
      },
      // 国内
      domesticForm: {
        receiveDate: '',
        asssnum: '',
        relevancenum: '',
        assstype: '',
        urgency: '',
        crimetype: '',
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

      // 介质传输
      mediumForm: {
        entryName: '',
        entryDepartment: '',
        applyTime: ''

      },

      internRadios: [
        {
          label: '1',
          value: '国际协查请求信息'
        },
        {
          label: '2',
          value: '反馈信息'
        },
        {
          label: '5',
          value: '国内协查请求信息'
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
      countryOption: [], // 国家地区

      options: [
        {
          value: '选项1',
          label: '协查请求'
        }
      ],

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
        qNum: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qNation: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qLinkman: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qDuty: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qPhone: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qFax: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qEmail: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qAddress: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        qLegalrepre: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],

        qSignature: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],

        qremark: [

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

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        ffax: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        femail: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        faddress: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ],
        fremark: [

          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ]
      },

      // 国内协查请求
      domesticFormRules: {
        receiveDate: [
          { required: true, message: '内容不能为空', trigger: 'change' }],
        asssnum: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        relevancenum: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        assstype: [
          { required: true, message: '内容不能为空', trigger: 'change' }],
        crimetype: [
          { required: true, message: '内容不能为空', trigger: 'change' }],
        laiwentitle: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        Introductioncase: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        caselabel: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        laiwenUnit: [
          { required: true, message: '内容不能为空', trigger: 'change' }],
        requestitem: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        assList: [
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ]
      },

      // ruleas 介质传输
      mediumFormRules: {
        entryName: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 50, message: '最大长度不能超过50位', trigger: 'blur' }
        ],
        entryDepartment: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business'])
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    }
  },
  mounted() {
    this.getCountryList()
    this.UUID = getUUIDTo()
    this.getData()
  },
  methods: {
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },

    // 获取详情
    getData() {
      getviewapi().then(res => {
        if (res.code === 200) {
          //
        }
      })
    },

    // 录入方式
    modeTadiaChange(val) {
      const internRadiosMo = [
        {
          label: '1',
          value: '国际协查请求信息'
        },
        {
          label: '2',
          value: '反馈信息'
        },
        {
          label: '3',
          value: '公众举报信息'
        },
        {
          label: '4',
          value: '公文函件'
        },
        {
          label: '5',
          value: '国内协查请求信息'
        }
      ]
      const handRadios = [
        {
          label: '1',
          value: '国际协查请求信息'
        },
        {
          label: '2',
          value: '反馈信息'
        },
        {
          label: '5',
          value: '国内协查请求信息'
        }
      ]
      if (val === '2') {
        this.internRadios = internRadiosMo
      } else {
        this.internRadios = handRadios
      }
    },

    // 录入类型
    giInputChange(val) {
      // val
    },

    // 保存  参数
    paramsOne() {
      // 录入类型
      // this.inputInforForm // 录入形式
      const paramsObj = {
        ApprovalData: this.$refs.refApprovalorder.inputForm, // 数据录入审批单
        inputMode: this.inputInforForm.inputMode, // 录入方式
        inputtype: this.inputInforForm.inputtype,
        aId: this.UUID
      }
      if (this.inputInforForm.inputMode === '1') {
        if (this.inputInforForm.inputtype === '1') {
          // 国际协查请求信息
          paramsObj.EntryInfor = this.internationForm
        } else if (this.inputInforForm.inputtype === '2') {
          // 反馈信息
          paramsObj.EntryInfor = this.$refs.refInputInfo.feedbackdata
        } else if (this.inputInforForm.inputtype === '5') {
          // 国内协查请求
          paramsObj.EntryInfor = this.domesticForm
          paramsObj.EntryInfor.informationPartss = this.informationPartss
        } else {
          return false
        }
      } else {
        paramsObj.EntryInfor = this.mediumForm
      }

      return paramsObj
    },

    // 提交  参数
    paramsSub() {
      // 录入类型
      // this.inputInforForm // 录入形式
      const paramsObj = {
        ApprovalData: this.$refs.refApprovalorder.inputForm, // 数据录入审批单
        inputMode: this.inputInforForm.inputMode, // 录入方式
        inputtype: this.inputInforForm.inputtype,
        workflow: this.workFlow2business,
        aId: this.UUID
      }
      if (this.inputInforForm.inputMode === '1') {
        // 手工录入
        if (this.inputInforForm.inputtype === '1') {
          // 国际协查请求信息
          paramsObj.EntryInfor = this.internationForm
        } else if (this.inputInforForm.inputtype === '2') {
          // 反馈信息
          paramsObj.EntryInfor = this.$refs.refInputInfo.feedbackdata
        } else if (this.inputInforForm.inputtype === '5') {
          // 国内协查请求
          paramsObj.EntryInfor = this.domesticForm
          paramsObj.EntryInfor.informationPartss = this.informationPartss
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
      this.$store.dispatch('workFlow', { configCode: 'inputafter' }) // 工作流 名字
      this.$store.dispatch('openWorkFlow', true)
    },

    // 提交 - 走流程
    nextStep() {
      sendSubmitapi(this.paramsSub()).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },

    //   保存
    handleSave() {
      this.$refs.refinternation.validate(valid => {
        if (valid) {
          this.$refs.refApprovalorder.$refs.refUpload.submit()
          sendSaveapi(this.paramsOne()).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
            }
          })
        }
      })
    },

    //  来件信息2：
    addInfor() {
      this.inMessageTabledata.push({
        inforName: '',
        inforPhone: ''
      })
    },
    deleteInfor(scope) {
      this.inMessageTabledata.splice(scope.$index, 1)
    },
    addResp() {
      this.inReapTabledata.push({
        inforName: '',
        inforPhone: ''
      })
    },
    deleteResp(scope) {
      this.inReapTabledata.splice(scope.$index, 1)
    },

    // 返回
    goBack() {
      this.$router.push({
        name: 'cueManage_dataEntry'
      })
    },

    handleClick(tab, event) {

    },

    // 国家名
    getCountryList() {
      country().then(res => {
        this.countryOption = res.data.list
      })
    }

  }
}
</script>

<style lang="scss">
.dataEntry_edit {
  position: relative;
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
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
}
</style>
