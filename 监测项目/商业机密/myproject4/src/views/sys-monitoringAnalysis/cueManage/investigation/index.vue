<template>
  <div class="cueManage_investigation">
    <el-card>
      <div slot="header">
        <span>境内协查类文件管理</span>
          <router-link :to="{path:'investigation/archives', query:{key:'1'}}" style="float:right">
              <el-button type="text"  v-if="keBianJi">新增</el-button>
            </router-link>
      </div>
      <!-- 查询 -->
      <div class="searchBlock">
        <el-form :model="form" :rules="rulesSearch" ref="form" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="协查文号：" prop="referenceNumber">
                <el-input v-model="form.referenceNumber"  placeholder="请输入协查文号，最长为20字符" :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来文标题：" prop="communicationTitle">
                <el-input v-model="form.communicationTitle" placeholder="请输入来文标题，最长为20字符" :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来文单位：" prop="communicationUnite">
                <el-select  placeholder="请选择"  clearable v-model="form.communicationUnite">
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
            <el-col :span="8">
              <el-form-item label="紧急程度：" >
                <el-select clearable v-model="form.assUrgency"  placeholder="请选择">
                  <el-option
                    v-for="item in this.urgencyArr"
                    :key="item.codeId"
                    :label="item.codeName"
                    :value="item.codeName"
                  ></el-option>
                </el-select>

              </el-form-item>
            </el-col>
            
             <el-col :span="8">
              <el-form-item label="状态：">
                <el-select clearable v-model="form.select3"  placeholder="请选择">
                  <el-option label="待移送处处长审批" value="待移送处处长审批"></el-option>
                  <el-option label="待分析处处长分配" value="待分析处处长分配"></el-option>
                  <el-option label="待分析员反馈" value="待分析员反馈"></el-option>
                  <el-option label="待分析处领导审核" value="待分析处领导审核"></el-option>
                  <el-option label="待移送处复核" value="待移送处复核"></el-option>
                  <el-option label="已分析" value="已分析"></el-option>
                  <el-option label="保存" value="保存"></el-option>
                  <el-option label="完成移送" value="完成移送"></el-option>
                  <el-option label="审批不通过" value="审批不通过"></el-option>
                  <el-option label="无效" value="无效"></el-option>
                  <el-option label="退回" value="退回"></el-option>
                  <el-option label="发起人收回" value="发起人收回"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="padding-right:13px;">
              <el-form-item label="来件日期：" style="width:100%;">
                <el-date-picker   v-model="form.dateTime" class="datePickerWidth"  :picker-options="pickerOptions1" format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd" type="daterange" range-separator="至" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期" >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
          <el-row  :gutter="20">
            <el-col :span="8">
              <el-form-item label="协查类型：" prop="investigationType">
               <el-select v-model="form.investigationType"  clearable placeholder="请选择">
                  <el-option label="一级协查" value="一级协查"></el-option>
                  <el-option label="研判分析" value="研判分析"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预分配处室：" prop="preDistributionOffice">
                <el-select v-model="form.preDistributionOffice"  clearable  placeholder="请选择">
                  <el-option label="协查一处" value="FXQ005"></el-option>
                  <el-option label="协查二处" value="FXQ006"></el-option>
                  <el-option label="分析一处" value="FXQ007"></el-option>
                  <el-option label="分析二处" value="FXQ008"></el-option>
                  <el-option label="分析三处" value="FXQ009"></el-option>
                  <el-option label="分析四处" value="FXQ010"></el-option>
                  <!-- <el-option label="协查一处" value="协查一处"></el-option>
                  <el-option label="协查二处" value="协查二处"></el-option>
                  <el-option label="分析一处" value="分析一处"></el-option>
                  <el-option label="分析二处" value="分析二处"></el-option>
                  <el-option label="分析三处" value="分析三处"></el-option>
                  <el-option label="分析四处" value="分析四处"></el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="移送状态：">
                <el-select v-model="form.transState" style="width: 100%" clearable placeholder="请选择">
                  <el-option label="未移送" value="未移送"></el-option>
                  <el-option label="完成移送" value="完成移送"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="涉罪类型：">
                <el-select clearable v-model="form.crimeType" multiple  placeholder="请选择">
                  <el-option v-for="(item,index) in this.form.sheZui" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="textAlign:right;float:right">
              <el-button type="primary" @click="searchList()">查 询</el-button>
              <el-button type="primary" plain @click="clearList()">清 空</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 文件结果列表 -->
      <div class="listBlock">
        <el-row class="tableTitle">
          <el-col :span="24" v-if="this.roles === 'center'">
            <span style="marginRight:20px">协查文件列表</span>
          
            <!-- <el-button type="primary" plain style="margin-left:10px" v-if="isCenter">导 入</el-button> -->
            <!-- <div style="display:inline-block">
              <el-upload
               v-if="isCenter"
              :action="uploadUrl" name="files" :on-success="onSuccess" :limit="1" :before-upload="handleBeforeUpload" :show-file-list="false">
              <el-button type="primary" plain>导入</el-button>
            </el-upload>
            </div> -->
            
            <!-- <el-button type="primary" plain v-if="isCenter">导 出</el-button> -->
            <!-- <el-button type="primary" plain>协查分类</el-button>
            <el-button type="primary" plain>预分配</el-button>
            <el-button type="primary" plain>人工分配</el-button> -->
            <el-button type="primary" plain v-if="keBianJi" @click="setInvalidStatus()">置为无效</el-button>
            <!-- <el-button type="primary" plain>导出协查附件</el-button>
            <el-button type="primary" plain>打印部位协查单</el-button> -->
            <!-- <el-button type="primary" @click="getListInfo" plain>刷新</el-button> -->
            <!-- <el-button type="primary" plain>分 发</el-button> -->
            <el-button type="primary" plain :loading="isXieLoading" v-if="keBianJi" @click="callWorkFlow">提交</el-button>
            <el-button type="primary" plain @click="printXie">打印部委协查单</el-button>
            <el-button type="primary" plain @click="exportFiles">导出协查附件</el-button>
            <!-- <el-button type="primary" plain @click="nextDialogVisible=true">下一步</el-button> -->
            <!-- <el-button type="primary" plain> 取 回</el-button>
            <el-button type="primary" plain> 签 收</el-button>
            <el-button type="primary" plain> 委 派</el-button> -->
          </el-col>
          <el-col :span="24"  v-if="this.roles !== 'center'">
            <span style="marginRight:20px">协查文件列表</span>
            <!-- <el-button type="primary" plain @click="submitXieCha">提交</el-button> -->
            <el-button type="primary" plain @click="callWorkFlow">提交</el-button>
            <el-button type="primary" plain @click="deleteListMore" >删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData.list" @selection-change="handleSelectionChange" v-loading="loadingtechno"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)" ref="multipleTable">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column label="序号" type="index" width="60"></el-table-column>
          <el-table-column label="来件日期" prop="dateArrial" min-width="120"></el-table-column>
          <el-table-column label="协查文号" prop="referenceNumber" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="来文标题" prop="communicationTitle" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="预分配处室" prop="preDistributionOffice" min-width="140"></el-table-column>
          <el-table-column label="协查类型" prop="investigationType" min-width="140"></el-table-column>
          <el-table-column label="紧急程度" prop="assUrgency" min-width="100"></el-table-column>
          <el-table-column label="涉罪类型" prop="crimeType" min-width="120" :formatter="caseKindFormatterInfo" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              {{scope.row.crimeType | filterValue}}
            </template> -->
          </el-table-column>
          <el-table-column label="来文单位" prop="communicationUnite" min-width="120"></el-table-column>
          <!-- <el-table-column label="数据来源" prop="dataFrom" min-width="120"></el-table-column> -->
          <el-table-column prop="transState" label="移送状态" min-width="140"></el-table-column>
          <el-table-column label="状态" prop="state" min-width="100"></el-table-column>
          <el-table-column label="操作" min-width="100" fixed="right">
            <template slot-scope="scope">
              <!-- <router-link :to="{path:'investigation/archives', query:{key:'0'}}">
                <el-button type="text" @click="seeInfo(scope)">查看</el-button>
              </router-link> -->
              <el-button type="text" @click="seeInfo(scope)">查看</el-button>
              <el-button type="text"  v-if="keBianJi" :disabled="scope.row.state !=='保存' && scope.row.state !=='退回' " @click="updateInfo(scope)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination  v-if="tableData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="tableData.currentPage" :page-size="tableData.pagesize" :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
        </el-pagination>
      </div>
      <monitor-workflow></monitor-workflow>
    </el-card>
    <div ref="myPrintForm" v-show="printType" >
      <table width="100%"  border="1" style="border-collapse: collapse;text-align: center;margin: 0 auto;margin-top: 40px;">
        <tr>
          <td height="70" colspan="3">部委协查单</td>
        </tr>
        <tr>
          <td width="250" height="70;">文号</td>
          <td width="600" height="70" colspan="2" style="text-align:center;padding:10px;word-wrap:break-word;max-width: 500px;">
            {{piAll[0]}}
          </td>
        </tr>
        <tr>
          <td width="250" height="600;">中心领导批示</td>
          <td width="600" colspan="2"></td>
        </tr>
        <tr>
          <td width="250" height="70;">接收部室经手人及日期</td>
          <td width="150">综合处</td>
          <td></td>
        </tr>
        <tr>
          <td height="70;"></td>
          <td>分析处</td>
          <td></td>
        </tr>
        <tr>
          <td height="70;"></td>
          <td>线索移送处</td>
          <td></td>
        </tr>
      </table>
    </div>
    <!-- 弹出框 -->
    <!-- <el-dialog title="任务提交" :visible.sync="dialogVisible" width="600px" class="dialog-block">
      <div class="task">
        <div class="title">任务流向：</div>
        <el-row>
          <el-col :span="24">
            <el-radio v-model="radio" label="1">送移送处处长审核</el-radio>
            <el-radio v-model="radio" label="2">结束（如其他电子平台来件为主体信息空等情况）</el-radio>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="23" :offset="1">
          <el-transfer
          v-model="value1"
          :data="transferData"
          :titles="['待选用户', '已选用户']"
          ></el-transfer>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="任务提交" :visible.sync="dialogVisible" width="600px" class="dialog-block">
      <div class="task">
        <el-form :model="form" label-width="100px">
          <el-form-item label="任务流向：">
            <el-tag style="margin-left:10px">送移送处处长审核</el-tag>
          </el-form-item>
          <el-form-item label="待选用户：">
            <el-radio v-model="form.radio" label="1">备选项1</el-radio>
            <el-radio v-model="form.radio" label="2">备选项2</el-radio>
            <el-radio v-model="form.radio" label="3">备选项3</el-radio>
            <el-radio v-model="form.radio" label="4">备选项4</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="callWorkFlow">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="任务提交" :visible.sync="nextDialogVisible" width="600px" class="dialog-block">
      <div class="task">
        <el-form :model="form" label-width="100px">
          <el-form-item label="任务流向：">
            <el-tag style="margin-left:10px">送移送处处长审核</el-tag>
          </el-form-item>
          <el-form-item label="待选用户：">
            <el-radio v-model="form.radio" label="1">备选项1</el-radio>
            <el-radio v-model="form.radio" label="2">备选项2</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nextDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="nextDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidQueryInput } from '@/utils/formValidate'
import { getList, setInvalid, getRoot, deleteList, batchSubmitAssistFile, getSheZui, exportFiles, getRoles,
  getSheZuiList } from '@/api/sys-monitoringAnalysis/cueManage/investigation/investigation.js'
import { MYgetsourceBusinessArr } from '@/api/sys-monitoringAnalysis/cueManage/levelConfiguration.js'
import { getToken } from '@/utils/auth'
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 3; i++) {
        data.push({
          key: i,
          label: `领导姓名 ${i}`
        })
      }
      return data
    }
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      isXieLoading: false,
      loadingtechno: false,
      flag: false,
      form: {
        referenceNumber: '',
        communicationTitle: '',
        communicationUnite: '',
        assUrgency: '',
        select3: '',
        dateTime: [],
        crimeType: [],
        sheZui: [],
        investigationType: '',
        transState: '',
        preDistributionOffice: ''
      },
      formTwo: {
        referenceNumber: '',
        communicationTitle: '',
        communicationUnite: '',
        assUrgency: '',
        select3: '',
        dateTime: [],
        crimeType: [],
        sheZui: []
      },
      piPrint: 0,
      printType: false,
      piAll: [],
      piAssistId: [],
      laiwenUnitArr: [], // 来文单位
      urgencyArr: [],
      referenceNumber: [],
      piliangList: [], // 批量设置无效的数组
      tableData: {
        list: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      },

      dialogVisible: false,
      nextDialogVisible: false,
      radio: '1',
      transferData: generateData(),
      value1: [1, 4],
      rulesSearch: {
        referenceNumber: [
          { validator: ValidQueryInput, trigger: 'blur' }
          // { max: 50, message: '字符长度必须50位', trigger: 'blur' }
        ],
        communicationTitle: [
          { validator: ValidQueryInput, trigger: 'blur' }
        ],
        communicationUnite: [
          {
            validator: ValidQueryInput,
            trigger: 'blur'
          }
        ]
      },
      sheZuiLabel: '',
      keBianJi: true
    }
  },
  // filters: {
  //   // 过滤涉罪类型
  //   filterValue(value) {
  //     console.log(this.form.sheZui)
  //     const formValue = JSON.parse(value)
  //     console.log(JSON.parse(value))
  //     for (let index = 0; index < this.form.sheZui.length; index++) {
  //       for (let i = 0; i < formValue.length; i++) {
  //         if (formValue[i] === this.form.sheZui[index].codeId) {
  //           this.sheZuiLabel += this.form.sheZui[index].codeName
  //         }
  //       }
  //     }
  //   }
  // },
  created() {
    this.getRoles()
    this.getRestDictionary()
  },
  mounted() {
    // console.log(sessionStorage.getItem('xtfInvestigation'))
    if (sessionStorage.getItem('xtfInvestigation') !== null) {
      this.getSeeion()
    } else {
      this.getRootNothing()
      this.getAllList()
    }

    // this.getListInfo()
  },
  computed: {
    ...mapGetters(['institution']),
    ...mapGetters(['roles']),
    ...mapGetters(['businessFlag', 'workFlow2business', 'business2workFlow', 'userInfo']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    // 导入
    uploadUrl: function() {
      return '/assist/importXml' + '?token=' + getToken()
    },
    // 获取涉罪类型
    getRestDictionary() {
      getSheZui('TOSC').then(res => {
        this.form.sheZui = res.data
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
      MYgetsourceBusinessArr(page, '1').then(res => {
        if (res.code === 200) {
          this.urgencyArr = res.data.list
        }
      }).catch(() => {
        this.loadingA = false
      })
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    }
  },
  // beforeDestroy() {
  //   this.sessionStorageClear()
  // },
  methods: {
    // 获取权限
    getRoles() {
      getRoles().then(res => {
        if (res.data === 'open') {
          this.keBianJi = true
        } else {
          this.keBianJi = false
        }
      })
    },
    // 导出
    exportFiles() {
      if (this.piAssistId.length > 1 || this.piAssistId.length === 0) {
        this.$message({
          message: '有且只能选择一个协查文件进行导出',
          type: 'error',
          showClose: true,
          duration: 6000
        })
        return false
      }

      exportFiles(this.piAssistId[0]).then(res => {
        if (res.data === 205) {
          location.href = '/monitor/assist/exportAssistFile2/' + this.piAssistId[0]
        } else if (res.data === 209) {
          this.$message({
            message: '该条记录没有相关附件',
            type: 'error',
            showClose: true,
            duration: 6000
          })
        }
      }).catch(() => {
        this.$message({
          message: '导出失败',
          type: 'error',
          showClose: true,
          duration: 6000
        })
      })
    },
    // 打印
    printXie() {
      if (this.piAll.length > 1 || this.piAll.length === 0) {
        this.$message({
          message: '有且只能选择一个协查文件进行打印',
          type: 'error',
          showClose: true,
          duration: 6000
        })
        return false
      }
      this.printType = true
      document.body.innerHTML = this.$refs.myPrintForm.innerHTML
      window.print()
      window.location.reload()
    },
    filterValue(value, column) {
      const formValue = JSON.parse(value)
      for (let index = 0; index < this.form.sheZui.length; index++) {
        for (let i = 0; i < formValue.length; i++) {
          if (formValue[i] === this.form.sheZui[index].codeId) {
            this.sheZuiLabel += this.form.sheZui[index].codeName
          }
        }
      }
      return this.sheZuiLabel
    },
    // caseKindFormatter(row, column, cellValue) {
    //   const data = this.form.sheZui
    //   // const arr = {}
    //   const formValue = JSON.parse(cellValue)
    //   for (let index = 0; index < formValue.length; index++) {
    //     for (let i = 0; i < data.length; i++) {
    //       // arr[data[i].codeId] = data[i].codeName
    //       if (formValue[index] === data[i].codeId) {
    //         this.sheZuiLabel += data[i].codeName
    //       }
    //     }
    //     return this.sheZuiLabel
    //   }
    // },
    caseKindFormatterInfo(row, column, cellValue) {
      const obj = JSON.parse(cellValue)
      const data = this.form.sheZui
      const arr = {}
      let returnArr = []

      for (let i = 0; i < data.length; i++) {
        arr[data[i].codeId] = data[i].codeName
      }
      for (let i = 0; i < obj.length; i++) {
        returnArr.push(arr[obj[i]])
      }
      returnArr = returnArr.join(',')
      return returnArr
    },
    // 获取用户权限
    getRootNothing() {
      getRoot().then(res => {
      })
    },
    // 获取列表
    // getAllList() {
    //   const obj = {
    //     pageNum: this.tableData.currentPage,
    //     pageSize: this.tableData.pagesize
    //   }
    //   getAllList(obj).then(res => {
    //     this.tableData.list = res.data.data.list
    //     this.tableData.total = res.data.data.total
    //     this.tableData.list.forEach(item => {
    //       item.crimeType = JSON.parse(item.crimeType)
    //       item.crimeType.forEach()
    //     })
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    getAllList() {
      this.loadingtechno = true
      if (this.form.dateTime === null) {
        this.form.dateTime = []
      }
      const obj = {
        referenceNumber: this.form.referenceNumber, // 协查文号
        communicationTitle: this.form.communicationTitle, // 来文标题
        communicationUnite: this.form.communicationUnite, // 来文单位
        assUrgency: this.form.assUrgency, // 紧急程度
        startTime: this.form.dateTime[0] || '', // 开始时间
        endTime: this.form.dateTime[1] || '', // 结束时间
        crimeType: this.form.crimeType.join(','), // 涉罪类型
        state: this.form.select3,
        pageNum: this.tableData.currentPage,
        pageSize: this.tableData.pagesize
      }
      getSheZuiList(obj).then(res => {
        if (res.code === 200) {
          this.loadingtechno = false
          this.tableData.list = res.data.data.list
          this.tableData.total = res.data.data.total
        } else {
          this.loadingtechno = false
        }
      }).catch(error => {
        this.loadingtechno = false
        console.log(error)
      })
    },
    // 查询
    getListInfo() {
      this.loadingtechno = true
      if (this.form.dateTime === null) {
        this.form.dateTime = []
      }
      // this.tableData.currentPage = 1
      const listInfo = {
        // referenceNumber: encodeURI(this.form.referenceNumber), // 协查文号
        // communicationTitle: encodeURI(this.form.communicationTitle), // 来文标题
        // communicationUnite: encodeURI(this.form.communicationUnite), // 来文单位
        referenceNumber: encodeURI(this.form.referenceNumber), // 协查文号
        communicationTitle: encodeURI(this.form.communicationTitle), // 来文标题
        communicationUnite: this.form.communicationUnite, // 来文单位
        assUrgency: this.form.assUrgency, // 紧急程度
        startTime: this.form.dateTime[0] || '', // 开始时间
        endTime: this.form.dateTime[1] || '', // 结束时间
        crimeType: this.form.crimeType.join(','), // 涉罪类型
        state: this.form.select3,
        transState: this.form.transState,
        investigationType: this.form.investigationType,
        preDistributionOffice: this.form.preDistributionOffice,
        pageNum: this.tableData.currentPage,
        pageSize: this.tableData.pagesize
      }
      getList(listInfo).then(res => {
        if (res.code === 200) {
          this.loadingtechno = false
          this.tableData.list = res.data.data.list
          this.tableData.total = res.data.data.total
        } else {
          this.loadingtechno = false
        }
      }).catch(error => {
        this.loadingtechno = false
        console.log(error)
      })
    },
    // 查询列表
    searchList() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.tableData.currentPage = 1
          this.getListInfo()
        }
      })
    },
    // 清空列表查询选项
    clearList() {
      this.form.referenceNumber = ''
      this.form.communicationTitle = ''
      this.form.communicationUnite = ''
      this.form.assUrgency = ''
      this.form.investigationType = ''
      this.form.preDistributionOffice = ''
      this.form.transState = ''
      this.form.dateTime = []
      this.form.crimeType = []
      this.form.select3 = ''
    },
    // 批量设置为无效--移送处
    // setInvalidStatus() {
    //   this.flag = false
    //   if (this.piliangList.length === 0 || this.piliangList === []) {
    //     this.$message({
    //       message: '至少选择一个协查文件',
    //       type: 'warning'
    //     })
    //   } else if (this.piliangList.length > 0) {
    //     this.piliangList.forEach(ele => {
    //       if (ele.state === '保存') {
    //         const arr = []
    //         arr.push(ele.assistId)
    //         setInvalid(arr.join(',')).then(res => {
    //           if (res.code === 200) {
    //             this.$message({
    //               type: 'success',
    //               message: '批量置为无效成功'
    //             })
    //             this.getAllList()
    //           }
    //         })
    //       } else {
    //         this.flag = true
    //       }
    //     })
    //     if (this.flag) {
    //       // this.$refs.multipleTable.toggleRowSelection(ele)
    //       this.$message({
    //         message: '只能选择保存状态的协查文件进行提交或置为无效',
    //         type: 'warning',
    //         duration: 6000
    //       })
    //     }
    //   }
    // },
    setInvalidStatus() {
      if (this.piPrint !== 0) {
        this.$message({
          type: 'error',
          message: '只能选择保存状态的协查文件进行提交或置为无效',
          showClose: true,
          duration: 6000
        })
        return false
      }
      if (this.piliangList.length === 0 || this.piliangList === []) {
        this.$message({
          message: '至少选择一个协查文件',
          type: 'error',
          showClose: true,
          duration: 6000
        })
        return false
      }
      this.$confirm('协查一经置为无效，无法更改，是否确认继续？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const arr = this.piliangList
        setInvalid(arr.join(',')).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '置为无效成功',
              showClose: true,
              duration: 6000
            })
            this.getAllList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消'
        })
      })
    },
    // 提交协查文件
    submitXieCha() {
      if (this.piPrint !== 0) {
        this.$message({
          type: 'error',
          message: '只能选择保存状态的协查文件进行提交或置为无效',
          showClose: true,
          duration: 6000
        })
        return false
      }
      if (this.piliangList.length === 0 || this.piliangList === []) {
        this.$message({
          message: '至少选择一个协查文件',
          type: 'error',
          showClose: true,
          duration: 6000
        })
        return false
      }
      this.dialogVisible = true
    },
    // 删除列表数据--分析处
    deleteListMore() {
      if (this.piliangList.length === 0 || this.piliangList === []) {
        this.$message({
          message: '至少选择一个协查文件',
          type: 'error',
          showClose: true,
          duration: 6000
        })
        return false
      }
      const arr = this.piliangList
      deleteList(arr.join(',')).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功',
            showClose: true,
            duration: 6000
          })
          this.getAllList()
        }
      })
    },
    // 批量选择的、数量
    handleSelectionChange(val, rows) {
      console.log(val)
      if (val.length > 0) {
        this.piliangList = []
        this.piPrint = 0
        this.piAll = []
        this.piAssistId = []
        this.referenceNumber = []
        val.forEach(ele => {
          this.piAll.push(ele.referenceNumber)
          this.piAssistId.push(ele.assistId)
          this.referenceNumber.push(ele.referenceNumber)
          if (ele.state === '保存') {
            this.piliangList.push(ele.assistId)
          } else {
            this.piPrint++
          }
          // else {
          //   this.$refs.multipleTable.toggleRowSelection(ele)
          //   // this.$message({
          //   //   type: 'warning',
          //   //   message: '只能选择保存状态的协查文件进行提交或置为无效'
          //   // })
          // }
        })
        // if (this.piliangList.length === 0) {
        //   this.$message({
        //     type: 'error',
        //     message: '只能选择保存状态的协查文件进行提交或置为无效'
        //   })
        // }
      } else {
        this.piliangList = []
      }
    },
    // 调取工作流
    callWorkFlow() {
      if (this.piPrint !== 0) {
        this.$message({
          type: 'error',
          message: '只能选择保存状态的协查文件进行提交或置为无效',
          showClose: true,
          duration: 6000
        })
        return false
      }
      if (this.piliangList.length === 0 || this.piliangList === []) {
        this.$message({
          message: '至少选择一个协查文件',
          type: 'error',
          showClose: true,
          duration: 6000
        })
        return false
      }
      this.business2workFlow.configId = ''
      this.business2workFlow.workitemId = ''
      this.business2workFlow.proInstId = ''
      this.business2workFlow.proDirId = ''
      this.business2workFlow.actInstId = ''
      this.business2workFlow.actDefId = ''
      this.$store.dispatch('workFlow', { configCode: 'AnalysisFile' })
      this.$store.dispatch('openWorkFlow', true)
    },
    nextStep() {
      const obj = {
        assistIds: this.piliangList.join(','),
        workflow: this.workFlow2business
      }
      this.isXieLoading = true
      batchSubmitAssistFile(obj)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.message,
              showClose: true,
              duration: 6000
            })
            this.isXieLoading = false
            this.getListInfo()
          } else {
            this.$confirm(res.message, '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning'
            })
            this.isXieLoading = false
          }
        })
        .catch(() => {
          this.isXieLoading = false
        })
    },
    getSeeion() {
      const xtfSessionChuLi = JSON.parse(sessionStorage.getItem('xtfInvestigation'))
      this.form.referenceNumber = xtfSessionChuLi[0].referenceNumber
      this.form.communicationTitle = xtfSessionChuLi[0].communicationTitle
      this.form.communicationUnite = xtfSessionChuLi[0].communicationUnite
      this.form.assUrgency = xtfSessionChuLi[0].assUrgency
      this.form.select3 = xtfSessionChuLi[0].select3
      this.form.dateTime = xtfSessionChuLi[0].dateTime
      this.form.crimeType = xtfSessionChuLi[0].crimeType
      this.tableData.currentPage = xtfSessionChuLi[0].currentPage
      this.tableData.pagesize = xtfSessionChuLi[0].pagesize
      this.getListInfo()
      this.sessionStorageClear()
      // this.$$nextTick(() => {
      //   this.sessionStorageClear()
      // })
    },
    setSeeion() {
      const sess = [{
        referenceNumber: this.form.referenceNumber,
        communicationTitle: this.form.communicationTitle,
        communicationUnite: this.form.communicationUnite,
        assUrgency: this.form.assUrgency,
        select3: this.form.select3,
        dateTime: this.form.dateTime,
        crimeType: this.form.crimeType,
        currentPage: this.tableData.currentPage,
        pagesize: this.tableData.pagesize
      }]
      console.log(sess)
      sessionStorage.setItem('xtfInvestigation', JSON.stringify(sess))
    },
    sessionStorageClear() {
      sessionStorage.removeItem('xtfInvestigation')
    },
    // 查看
    seeInfo(scope) {
      this.setSeeion()
      this.$router.push({
        path: 'investigation/archives',
        query: {
          key: '0',
          assistId: scope.row.assistId,
          status: scope.row.state
        }
      })
    },
    // 编辑
    updateInfo(scope) {
      this.setSeeion()
      this.$router.push({
        path: 'investigation/archives',
        query: {
          key: '100',
          assistId: scope.row.assistId,
          status: scope.row.state
        }
      })
    },
    // 导入成功
    onSuccess() {
      console.log('成功了')
    },
    // 导入成功之前
    handleBeforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'error'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'error'
        })
      }
      return extension || (extension2 && isLt2M)
    },
    // 分页
    handleSizeChange(val) {
      this.tableData.pagesize = val
      this.getListInfo()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.tableData.currentPage = val
      this.getListInfo()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss">
.cueManage_investigation {
  table {
    border-collapse: collapse;
    text-align: center;
    margin: 0 auto;
  }
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .datePickerWidth{
    width: 100% !important;
    max-width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-radio {
    width: 100%;
    margin-left: 30px;
  }
  .searchBlock {
    margin-bottom: 30px;
  }
  .tableTitle {
    margin-bottom: 10px;
  }
  .dialog-block {
    .task {
      margin-bottom: 30px;
      .title {
        font-size: 16px;
        color: #333;
        margin-bottom: 10px;
      }
    }
    .el-transfer__button.el-button--primary {
      min-width: 32px;
      min-height: 32px;
    }
  }
}
</style>
