<template>
  <div class="reportLibrary">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>上报重点可疑交易报告</span>
        <div style="float:right" v-if="roles === 'branch'">
          <router-link :to="{name:'reportClues_add',params:{type:'new'}}">
            <el-button type="text">新建线索</el-button>
            <span class="itemline">|</span>
          </router-link>
          <router-link :to="{name:'reportClues_import',query:{type:'import'}}">
            <el-button type="text">导入线索</el-button>
          </router-link>

        </div>
      </div>
      <!-- 填报历史 表单搜索条件模块 -->
      <div class="historyBlock">
        <div class="searchBlock">
          <el-form
            :model="form"
            label-width="100px"
            ref="searchForm"
          >
            <template v-if="toggleSearch">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item
                    label="线索名称"
                    prop="clueName"
                    :rules="[{ validator: validateKongTe, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.clueName"
                      maxlength="50"
                      placeholder="线索名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="线索编号"
                    prop="clueNo"
                    :rules="[{ validator: validateKongTe, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.clueNo"
                      maxlength="50"
                      placeholder="线索编号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-button
                    type="primary"
                    @click="searchList"
                  >查 询</el-button>
                  <el-button @click="cleanUp">清 空</el-button>
                  <el-button
                    type="text"
                    icon="el-icon-arrow-down"
                    @click="toggleSearch=false"
                  >展开</el-button>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <el-row
                class="toggle"
                :gutter="20"
              >
                <el-col :span="8">
                  <el-form-item
                    label="线索名称"
                    prop="clueName"
                    :rules="[{ validator: validateKongTe, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.clueName"
                      maxlength="50"
                      placeholder="线索名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="线索编号"
                    prop="clueNo"
                    :rules="[{ validator: validateKongTe, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.clueNo"
                      maxlength="50"
                      placeholder="线索编号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="线索状态"
                    prop="clueState"
                    :rules="[{ required: false, trigger: 'change'}]"
                  >
                    <el-select
                      v-model="form.clueState"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in clueData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row
                class="toggle"
                :gutter="20"
              >
                <el-col :span="8">
                  <el-form-item
                    label="证件号码"
                    prop="attachContent"
                    :rules="[{ validator: validateNumber, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.attachContent"
                      maxlength="128"
                      placeholder="证件号码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="账户号码"
                    prop="accountNum"
                    :rules="[{ validator: validateNumber, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.accountNum"
                      maxlength="128"
                      placeholder="账户号码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="姓名/单位名称"
                    prop="name"
                    :rules="[{ validator: delDataValidInput, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.name"
                      maxlength="50"
                      placeholder="姓名/单位名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-col :span="8">
                  <el-form-item label="交易发生地" prop="district">
                    <el-input v-model="form.district" placeholder="交易发生地"></el-input>
                  </el-form-item>
                </el-col> -->
              <el-row
                class="toggle"
                :gutter="20"
              >
                <el-col :span="8">
                  <el-form-item
                    label="立案名目"
                    prop="registerDes"
                    :rules="[{ validator: validateKongTe, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.registerDes"
                      maxlength="50"
                      placeholder="立案名目"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="接收部门"
                    prop="reviceDept"
                    :rules="[{ validator: validateKongTe, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.reviceDept"
                      maxlength="50"
                      placeholder="接收部门"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    label="填报人"
                    prop="createUser"
                    :rules="[{ validator: validateKongTe, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="form.createUser"
                      maxlength="50"
                      placeholder="填报人"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row
                class="toggle"
                :gutter="20"
              >
                <el-col :span="8">
                  <el-form-item
                    label="当前状态"
                    prop="currentState"
                    :rules="[{ required: false, trigger: 'change'}]"
                  >
                    <el-select
                      v-model="form.currentState"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in currentStateArr"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    prop="isHistory"
                    label="查询历史版本"
                  >
                    <el-radio
                      v-model="form.isHistory"
                      label="1"
                    >是</el-radio>
                    <el-radio
                      v-model="form.isHistory"
                      label="2"
                    >否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="立案时间"
                    prop="registerTime"
                    :rules="[{ required: false, trigger: 'change'}]"
                  >
                    <el-date-picker
                      v-model="form.registerTime"
                      type="daterange"
                   
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row
                class="toggle"
                :gutter="20"
              >
                <el-col :span="8">
                  <el-form-item
                    label="结案时间"
                    prop="endTime"
                    :rules="[{ required: false, trigger: 'change'}]"
                  >
                    <el-date-picker
                      v-model="form.endTime"
                      type="daterange"
                     
                      
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="提交时间"
                    prop="commitTime"
                    :rules="[{ required: false, trigger: 'change'}]"
                  >
                    <el-date-picker
                      v-model="form.commitTime"
                      type="daterange"
                    
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="报告时间"
                    prop="createTime"
                    :rules="[{ required: false, trigger: 'change'}]"
                  >
                    <el-date-picker
                      v-model="form.createTime"
                      type="daterange"
                    
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-col :span="24">
                <el-col :span="8">
                  <el-form-item
                    label="交易发生地"
                    prop="districtFlag"
                    :rules="[{ required: false, trigger: 'change'}]"
                  >
                    <el-select
                      @change="countryOrProvince"
                      clearable
                      v-model="form.districtFlag"
                      placeholder="请选择"
                      style="width:100%"
                      class="districtFlag"
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
                    label-width="0"
                    prop="district"
                    :rules="[{ required: false, trigger: 'change'}]"
                  >
                    <el-select
                      v-if="form.districtFlag=='2'"
                      clearable
                      v-model="form.district"
                      placeholder="请选择"
                      style="width:100%"
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
                      v-model="form.district"
                      clearable
                      placeholder="请选择"
                      style="width:100%"
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
                    label-width="0"
                    prop="city"
                    :rules="[{ validator: validateKongTe, trigger: 'blur' }]"
                  >
                    <el-input
                      v-if="form.districtFlag=='1'"
                      class="city"
                      style="width:100%"
                      v-model="form.city"
                      placeholder="市"
                      maxlength="50"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>

              <el-col :span="24">
                <!-- 初步判断 -->
                <!-- <preliminary-judgment :lableWidth="100" :echoJudgment="reportCluePreJudgment" ref="judgment"></preliminary-judgment> -->
                <el-form-item
                  label="初步判断："
                  class="itme-block"
                  label-width="100px"
                  prop="reportCluePreJudgment"
                  :rules="[{ required: false, trigger: 'change'}]"
                >
                  <el-select
                    filterable
                    v-model="form.reportCluePreJudgment"
                    multiple
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,index) in dialogJudgmentData"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label=""
                  class="itme-block"
                  v-if="form.reportCluePreJudgment.indexOf('1401') !== -1"
                  label-width="100px"
                  prop="judicialOrAdministrativeInvestigation"
                  :rules="[{ required:true, message: '请填写补充',trigger: 'blur'}, { validator: validateKongTe, trigger: 'blur' }]"
                >
                  <el-input
                    maxlength="100"
                    v-model="form.judicialOrAdministrativeInvestigation"
                    placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label=""
                  class="itme-block"
                  v-if="form.reportCluePreJudgment.indexOf('1402') !== -1"
                  label-width="100px"
                  prop="suspectedOfOtherCrimes"
                  :rules="[{ required:true, message: '请填写补充',trigger: 'blur'}, { validator: validateKongTe, trigger: 'blur' }]"
                >
                  <el-input
                    maxlength="100"
                    v-model="form.suspectedOfOtherCrimes"
                    placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"
                  ></el-input>
                </el-form-item>
              </el-col>
              <div style="textAlign:right;margin-bottom:10px">
                <el-button
                  type="primary"
                  @click="searchList"
                >查 询</el-button>
                <el-button
                  type=""
                  @click="cleanUp"
                >清 空</el-button>
                <el-button
                  type="text"
                  icon="el-icon-arrow-up"
                  @click="toggleSearch=true"
                >收起</el-button>
              </div>
            </template>
          </el-form>
        </div>

      </div>

      <div class="taleBlock">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          @selection-change="handelSelect"
          :row-key="getRowkey"
           v-loading="tableDataLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)"
        >
          <el-table-column
            type="selection"
            width="60"
            reserve-selection
            fixed="left"
          ></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
            fixed="left"
          ></el-table-column>
          <el-table-column
            prop="clueNo"
            label="线索编号"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{`${scope.row.clueNo}-${scope.row.seq}`}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="clueName"
            label="线索名称"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="初步判断"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ preliminaryJudgmeFilter(scope.row.reportCluePreJudgmentDos) }}
            </template>

          </el-table-column>
          <el-table-column
            prop="branchBank"
            label="填报分支行"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="currentState"
            label="当前状态"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="clueState"
            label="线索状态"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="涉及主体"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                  v-for="(item,index) in scope.row.reportClueTradeMainDos"
                  :key="index"
                >
                  <span v-if="index === scope.row.reportClueTradeMainDos.length - 1">{{item.name}}</span>
                  <span v-else>{{item.name + '，'}}</span>
                </span>
            </template>
          </el-table-column>
          <el-table-column
            label="账户号码"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                  v-for="(item,index) in scope.row.reportClueTradeAccountDos"
                  :key="index"
                >
                  <span v-if="index === scope.row.reportClueTradeAccountDos.length - 1">{{item.accountNum}}</span>
                  <span v-else>{{item.accountNum + '，'}}</span>
                </span>
            </template>

          </el-table-column>
          <el-table-column
            label="交易发生地"
            min-width="150"
            show-overflow-tooltip
             prop="reportClueDistrictDos"
          >
            <!-- <template slot-scope="scope">
              <el-tooltip placement="top-start">
                <template slot="content">
                  <div
                    v-for="(item,index) in scope.row.reportClueDistrictDos"
                    :key="index"
                  >{{item.district}}</div>
                </template>
                <span
                  v-for="(item,index) in scope.row.reportClueDistrictDos"
                  :key="index"
                >
                  <span v-if="index==0">{{item.district}}</span>
                </span>
              </el-tooltip>
            </template> -->

          </el-table-column>
          <el-table-column
            prop="transferTime"
            label="报告时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="reviceDept"
            label="接收部门"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createUser"
            label="填报人"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="commitTime"
            label="提交时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="registerTime"
            label="立案时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="registerDes"
            label="立案名目"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="endTime"
            label="结案时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cart"
            label="涉案金额（万元）"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="共享状态"
            min-width="100"
          >
            <template slot-scope="scope">
              {{scope.row.shareState=='1'?'共享':(scope.row.shareState=='2'?'非共享':'')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="shareDt"
            label="共享时间"
            min-width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="操作"
            width="200"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.shareState || scope.row.currentState === '编辑中'"
                type="text"
                disabled
              >设置共享</el-button>
              <el-button
                type="text"
                v-else
                @click="getClueId(scope.row.clueId)"
              >设置共享</el-button>
              <el-button
                type="text"
                @click="editSingleClue(scope.row)"
              >{{ roles === 'branch' && scope.row.editFlag ? '编辑' : '查看'}}</el-button>
              <el-button
                v-if="roles === 'branch'"
                type="text"
                :disabled="roles === 'branch' && !scope.row.editFlag"
                @click="delItem(scope.row.clueId, scope.row.currentState)"
              >删除</el-button>
              <el-button
                type="text"
                @click="exportData(scope.row.clueId)"
              >导出线索</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col
            :span="12"
            style="paddingTop:10px"
          >
            <!-- <el-button type="primary">提 交</el-button> -->
            <el-button
              type="primary"
              plain
              @click="exportDataBatch"
            >导出列表</el-button>
            <el-button
              v-if="roles === 'branch'"
              type="primary"
              plain
              @click="delMultiple"
            >批量删除</el-button>
          </el-col>
          <el-col :span="12">
            <el-pagination
              v-if="pageInfo.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.pageNum"
              :page-size="pageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              background
            >
            </el-pagination>
          </el-col>

        </el-row>

      </div>

    </el-card>

    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="400px"
    >
      <span>您确认要全国共享吗？</span>
      <!-- <el-dialog title="设置共享" :visible.sync="innerVisible" width="500px" append-to-body>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-radio v-model="shareState" label="1">共享</el-radio>
            <el-radio v-model="shareState" label="2">非共享</el-radio>
          </el-col>

        </el-row>
        <div slot="footer">
          <el-button @click="setShare" type="primary">确 定</el-button>
        </div>
      </el-dialog> -->
      <div slot="footer">
        <!-- <el-button
          @click="dialogVisible=false"
          type="primary"
        >仅中心共享</el-button> -->
        <el-button
          @click="setShare"
          type="primary"
        >全国共享</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {
  dictionary,
  province,
  country
} from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { getToken } from '@/utils/auth'
import { commonPattern } from '@/utils/formValidate'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
import { getClues, deleteClue, setState } from '@/api/sys-monitoringAnalysis/report-clues/search.js'
// getEdit
import { mapGetters } from 'vuex'
export default {
  components: {
    preliminaryJudgment
  },
  data() {
    return {
      tableDataLoading: false,
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      englishNullx: /[abcdefghijklmnopqrstuvwyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im, // 校验空格
      dialogJudgmentData: [],
      toggleSearch: true,
      token: getToken(),
      form: {
        reportCluePreJudgment: [], // 回显的数据
        judicialOrAdministrativeInvestigation: '', // 1401
        suspectedOfOtherCrimes: '', // 1402
        clueName: '',
        clueNo: '',
        clueState: '',
        attachContent: '',
        accountNum: '',
        name: '',
        district: '',
        districtFlag: '',
        city: '',
        registerTime: [],
        registerDes: '',
        reviceDept: '',
        endTime: '',
        createUser: '',
        commitTime: '',
        currentState: '',
        createTime: '',
        isHistory: '2',
        preliminaryJudgmeStr: ''
      },
      countryData: [],
      provinceData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },

      currentStateArr: [
        {
          value: '1',
          label: '编辑中'
        },
        {
          value: '2',
          label: '已提交'
        }
      ],
      clueData: [
        {
          value: '1',
          label: '仅移送'
        },
        {
          value: '2',
          label: '立案'
        },
        {
          value: '3',
          label: '破案'
        },
        {
          value: '4',
          label: '撤案'
        },
        {
          value: '5',
          label: '不予立案'
        }
      ],
      getRowkey(row) {
        return row.clueId
      },
      tableData: [],
      select_orderId: [],
      innerVisible: false,
      dialogVisible: false,
      shareState: '1',
      shareClueId: ''
    }
  },
  computed: {
    ...mapGetters(['roles']),
    paramsObj() {
      const obj = Object.assign({}, this.form, this.pageInfo)
      delete obj.total
      delete obj.endTime
      delete obj.commitTime
      delete obj.registerTime
      delete obj.createTime
      delete obj.districtFlag
      obj.reportCluePreJudgment.forEach((el, index) => {
        if (el.indexOf('1401') !== -1) {
          obj.reportCluePreJudgment[index] = '1401-' + obj.judicialOrAdministrativeInvestigation
        }
        if (el.indexOf('1402') !== -1) {
          obj.reportCluePreJudgment[index] = '1402-' + obj.suspectedOfOtherCrimes
        }
      })
      obj.preliminaryJudgmeStr = obj.reportCluePreJudgment.join()
      delete obj.reportCluePreJudgment
      delete obj.judicialOrAdministrativeInvestigation // 1401
      delete obj.suspectedOfOtherCrimes // 1402
      if (this.form.endTime) {
        obj.endTimeStart = this.form.endTime[0]
        obj.endTimeEnd = this.form.endTime[1]
      }
      if (this.form.commitTime) {
        obj.commitTimeStart = this.form.commitTime[0]
        obj.commitTimeEnd = this.form.commitTime[1]
      }
      if (this.form.registerTime) {
        obj.registerTimeStart = this.form.registerTime[0]
        obj.registerTimeEnd = this.form.registerTime[1]
      }
      if (this.form.createTime) {
        obj.createTimeStart = this.form.createTime[0]
        obj.createTimeEnd = this.form.createTime[1]
      }

      return obj
    }
  },
  methods: {
    preliminaryJudgmeFilter(arr) {
      const newArr = []
      if (arr) {
        arr.map(item => {
          newArr.push(item.preliminaryJudgme)
        })
      }
      return newArr.join(',')
    },
    returnMemory() {
      if (sessionStorage.getItem('sessionMemoryJyl')) {
        const obj = sessionStorage.getItem('sessionMemoryJyl')
        this.toggleSearch = JSON.parse(obj).toggleSearch
        this.form = JSON.parse(obj).form
        this.pageInfo.pageNum = JSON.parse(obj).pageInfo.pageNum
        this.pageInfo.pageSize = JSON.parse(obj).pageInfo.pageSize
        sessionStorage.removeItem('sessionMemoryJyl')
      }
    },
    // 校验空格,特殊字符
    validateKongTe(rule, value, callback) {
      if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
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
    // 校验只能输入数字
    validateNumber(rule, value, callback) {
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
        if (value.length !== 0 && (value.length <= 5 || value.length >= 129)) {
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
    // 清空搜索条件
    cleanUp() {
      this.form = {
        reportCluePreJudgment: [], // 回显的数据
        judicialOrAdministrativeInvestigation: '', // 1401
        suspectedOfOtherCrimes: '', // 1402
        clueName: '',
        clueNo: '',
        clueState: '',
        attachContent: '',
        accountNum: '',
        name: '',
        district: '',
        districtFlag: '',
        city: '',
        registerTime: [],
        registerDes: '',
        reviceDept: '',
        endTime: '',
        createUser: '',
        commitTime: '',
        currentState: '',
        createTime: '',
        isHistory: '2',
        preliminaryJudgmeStr: ''
      }
      // this.form.reportCluePreJudgment = []
      this.$refs.searchForm.resetFields()
      // this.form.city = ''
      // this.form.districtFlag = ''
      // this.form.district = ''
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
        }
      })
    },
    // 国或者省份
    countryOrProvince() {
      this.form.district = ''
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData()
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData()
    },
    // 请求数据
    fetchData() {
      //  const cityArr = []
      //       el.rdesignAreas.forEach(item => {
      //         cityArr.push(item.district)
      //       })
      //       obj.area = cityArr.join(',')// 地区
      this.tableDataLoading = true
      getClues(this.paramsObj).then(res => {
        if (res.code === 200) {
          var arys = res.data.list
          arys.forEach(el => {
            var arr = []
            el.reportClueDistrictDos.forEach(els => {
              arr.push(els.district)
            })
            el.reportClueDistrictDos = arr.join()
          })
          this.tableData = arys
          this.pageInfo.total = res.data.total
        }
        this.tableDataLoading = false
      }).catch(() => {
        this.tableDataLoading = false
      })
    },
    // 查寻
    searchList() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.fetchData()
        } else {
          return false
        }
      })
    },

    // 获取共享线索Id
    getClueId(id) {
      this.shareClueId = id
      this.dialogVisible = true
    },
    // 设置共享
    setShare() {
      setState(this.shareClueId, this.shareState).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.innerVisible = false
          this.successOrError('设置成功！', 'success')
          this.fetchData()
        } else {
          this.successOrError(res.msg)
        }
      })
    },

    // 编辑线索
    editSingleClue(val) {
      const memory = {
        form: this.form,
        pageInfo: {
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize
        },
        toggleSearch: this.toggleSearch
      }
      sessionStorage.setItem('sessionMemoryJyl', JSON.stringify(memory))
      this.$router.push({
        name: 'reportClues_add',
        params: { type: 'edit', id: val.clueId },
        query: { types: 'edit', state: val.currentState, roles: this.roles === 'branch' && val.editFlag ? 'branch' : 'center' }
      })
    },
    // 删除某条数据
    delItem(id, currentState) {
      this.$confirm('确定要删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteClue(id).then(res => {
            if (res.code === 200) {
              if (currentState === '已提交') {
                this.$message({
                  message: '已提交的不可删除',
                  type: 'warning'
                })
              } else {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.fetchData()
              }
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              })
              this.fetchData()
            }
          })
        })
        .catch(() => {})
    },

    // 批量删除
    delMultiple() {
      if (this.select_orderId.length > 0) {
        this.$confirm('确定要删除选中的数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteClue(this.select_orderId.join()).then(res => {
              if (res.code === 200) {
                // msg = res.message.indexOf('失败0个') !== -1 ? 'success' : 'warning'
                // this.success('删除成功')
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.fetchData()
              } else {
                this.$message({
                  message: res.message,
                  type: 'warning'
                })
              }
            })
          })
          .catch(() => {})
      } else {
        this.$message({
          message: '请选择要删除的数据 ！',
          type: 'warning'
        })
      }
    },

    // exportData 导出数据
    exportData(id) {
      console.log(id, 222)
      location.href = `/monitor/reportClue/export?clueId=${id}&token=${this.token}`
    },
    // 批量导出
    exportDataBatch() {
      const len = this.select_orderId.length
      if (len > 0) {
        location.href = `/monitor/reportClue/exportBatch?clueId=${this.select_orderId.join()}&token=${
          this.token
        }`
      } else {
        this.$message({
          message: '请至少选择一条线索',
          type: 'warning'
        })
      }
    },

    // 获取选中的数据
    handelSelect(rows) {
      this.select_orderId = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.select_orderId.push(row.clueId)
          }
        })
      }
    },
    // 成功/失败提示
    successOrError(msg, type) {
      this.$message({
        message: msg || '操作成功',
        type: type || 'info'
      })
    }
  },
  mounted() {
    this.returnMemory()
    this.getDictionary('TOSC')
    this.fetchData()
    this.getProvince()
    this.getCountry()
  }
}
</script>

<style  lang="scss">
@mixin padding($t, $l) {
  padding: $t $l;
}
.reportLibrary {
  .historyBlock {
    .searchBlock {
      .el-input--small {
        font-size: 14px;
      }
      .el-form-item {
        margin-bottom: 12px;
      }
      .el-range-editor {
        min-width: 100%;
      }
      // .el-form-item__label {
      //   line-height: 24px;
      // }
      .el-date-editor--daterange {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
  }
  .itemline {
    font-size: 16px;
    color: #409eff;
    padding: 0 4px 0 8px;
  }
  // @media screen and(max-width: 1400px) {
  //   .toggle {
  //     .el-col-8 {
  //       width: 50%;
  //     }
  //   }
  // }
}
</style>
