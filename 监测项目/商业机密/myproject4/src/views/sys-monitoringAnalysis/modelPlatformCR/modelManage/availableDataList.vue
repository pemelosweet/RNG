<template>
  <div class="establishDataInfo">
      <div slot="header" class="titlefix">
        <span style="lineHeight:32px">可用数据列表</span>
      </div>
    <el-form ref="formModeling" :model="formModeling" :rules="formModelingRules"  label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="数据模板名称：" prop="dsName">
               <el-input  v-model.trim="formModeling.dsName"  maxlength="50" placeholder="长度不能超过50"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8" prop="taskStartTime">
          <el-form-item label="数据落地时间：">
            <el-date-picker v-model="formModeling.taskStartTime" value-format="yyyy-MM-dd" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">

              <el-row :span="10">
                <el-col :span="14">
                  <el-form-item label="总笔数：" prop="checkNumberInpOne">
                      <el-input  v-model="formModeling.totalStartNumber" placeholder="长度不能超过50" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span style="text-align: center;width: 100%;display: inline-block;"> ~ </span>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="checkNumberInpTwo" label-width="0px">
                    <el-input  v-model="formModeling.totalEndNumber" placeholder="长度不能超过50" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
          <el-form-item label="数据创建人：" prop="dsCreator">
                <el-input  v-model.trim="formModeling.dsCreator" maxlength="50" placeholder="长度不能超过50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-form-item label="更新时间：" prop="dsUpdatetime">
            <el-date-picker v-model="formModeling.dsUpdatetime" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="valable">
        <el-button type="primary" @click="modelingSearch">查询</el-button>
        <el-button @click="clearForm" type="primary" plain>清空</el-button>
      </el-form-item>
    </el-form>
     <div class="titlefix">
        <span style="lineHeight:32px;float:left">可用数据列表：</span>
        <div style="float:left;margin:0 0 15px 15px">
            <el-button type="primary" plain @click="batchDelete" style="margin:0 15px">批量删除</el-button>
        </div>
      </div>
    <el-table :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loadingAvail"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
      >
      <el-table-column type="selection" fixed="left" width="50"></el-table-column>
      <el-table-column type="index" label="序号" min-width="50"></el-table-column>
      <el-table-column prop="dsName" label="数据模板名称" width="270">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
                <p>{{scope.row.dsName}}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" v-if="scope.row.dsDataSources === '系统抽取'" style="width: 100%;overflow: hidden;color:#606266">
                        <el-button type="text" style="color:#606266" @click="details(scope)">{{scope.row.dsName}}</el-button>
                    </el-tag>
                    <span v-else>{{scope.row.dsName}}</span>
                </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" sortable label="数据落地时间"  width="170" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.dsStartTime}}~{{scope.row.dsEndTime}}
          </template>
      </el-table-column>
      <el-table-column prop="dsDataSources" label="数据来源" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dsTotalNumber" label="总笔数" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="dsFileSize" label="文件大小" width="110"></el-table-column> -->
      <!-- <el-table-column prop="dsVisualRange" label="数据可见范围">
      </el-table-column> -->
      <el-table-column prop="dsUpdatetime" sortable label="更新时间"  width="170" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dsCreator" label="数据创建人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="text" size="medium" :disabled="scope.row.taskId===null" @click="allocatedData(scope)">查看连接信息
</el-button>
          <el-button type="text" size="medium" v-if="scope.row.dsDataSources !== '人工上传'"  @click="previewTheData(scope)">预览数据</el-button>
          <el-button type="text" size="medium" v-if="scope.row.dsDataSources === '人工上传'" @click="deriveDatas(scope)">导出数据</el-button>
          <el-button type="text" size="medium" @click="tableDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 预览数据 -->
    <el-dialog :visible.sync="dialogPreviewVisible" width="70%" class="personDialog">
      <!-- <span>
          <b style="margin:5px 0;display:inline-block">数据集名称：{{previewTableData.dataTemplateName}}</b>
          <b style="margin:5px 0 5px 150px;display:inline-block">数据落地时间：{{previewTableData.newTableName}}</b>
      </span> -->
      <el-table border  ref="multipleTable" :data="previewTableData.dataPreviewArr"  tooltip-effect="dark" v-loading="loadingReadyPreview" style="width: 100%">
        <el-table-column type="index" label="序号" fixed="left" width="50"></el-table-column>
            <el-table-column align="center" v-for="(item,index) in this.previewTableData.tableName" :key="index" :label="item">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                    <p>{{scope.row[previewTableData.objKeyName[index]]}}</p>
                    <div slot="reference" class="name-wrapper">
                            <el-button type="text" style="color:#606266">{{scope.row[previewTableData.objKeyName[index]]}}</el-button>
                    </div>
                </el-popover>
            </template>
            </el-table-column>
      </el-table>
      <el-pagination v-if="pageInfoLook.total" background @size-change="handleSizeLookChange" @current-change="handleCurrentLookChange" :current-page="pageInfoLook.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfoLook.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfoLook.total" />
      <el-row>
          <el-col :span="11">
            <p class="tip_info" style="color:red">注：预览数据时，页面默认显示10条数据记录，用于查看数据格式等信息。</p>
          </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPreviewVisible = false">确 定</el-button>
      </span>
    </el-dialog>
   <!-- 人工上传预览数据 -->
    <el-dialog :visible.sync="PeopleDialogPreviewVisible" width="70%" class="personDialog">
      <el-table border  ref="multipleTable" :data="previewTableData.dataPreviewArr"  tooltip-effect="dark"  style="width: 100%">
          <el-table-column type="index" label="序号" fixed="left" width="50"></el-table-column>
          <el-table-column align="center" v-for="(item,index) in this.previewTableData.tableName" :key="index" :label="item" show-overflow-tooltip>
            <template slot-scope="scope">
               <el-popover trigger="hover" placement="top">
                    <p>{{previewTableData.dataPreviewArr[scope.$index][index]}}</p>
                    <div slot="reference" class="name-wrapper">
                            <el-button type="text"  style="color:#606266">{{previewTableData.dataPreviewArr[scope.$index][index]}}</el-button>
                    </div>
                </el-popover>
            </template>
          </el-table-column>
      </el-table>
      <el-row>
          <el-col :span="11">
            <p class="tip_info" style="color:red">注：预览数据时，页面默认显示10条数据记录，用于查看数据格式等信息。</p>
          </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="PeopleDialogPreviewVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看连接信息 -->
    <el-dialog title="查看连接信息" :visible.sync="dialogDistributionVisible" width="60%" top="10vh">
      <el-form :model="watchConnectData" label-width="120px">
        <el-form-item label="数据模板名称：">
            <template>
                {{watchConnectData.dsName}}
            </template>
        </el-form-item>
      </el-form>

        <div v-if="this.watchConnectData.conn_type=== 'jdbc'">
            <el-form :model="watchConnectData" label-width="120px">
                <el-form-item label="连接类型：">
                    <template>
                        {{watchConnectData.conn_type}}
                    </template>
                </el-form-item>
                <el-form-item label="名称：">
                    <template>
                        {{watchConnectData.jdbcName}}
                    </template>
                </el-form-item>
                <el-form-item label="驱动：">
                    <template>
                        {{watchConnectData.jdbcDrive}}
                    </template>
                </el-form-item>
                <el-form-item label="地址：">
                    <template>
                        {{watchConnectData.jdbcAddress}}
                    </template>
                </el-form-item>
                <el-form-item label="端口：">
                    <template>
                        {{watchConnectData.jdbcPort}}
                    </template>
                </el-form-item>
                <el-form-item label="数据库名称：">
                    <template>
                        {{watchConnectData.jdbcDbName}}
                    </template>
                </el-form-item>
                <el-form-item label="目标表名：">
                    <template>
                    {{watchConnectData.jdbcAdditionalAttributes}}
                    </template>
                </el-form-item>
                <el-form-item label="数据库链接：">
                    <template>
                    {{watchConnectData.jdbcDbConnection}}
                    </template>
                </el-form-item>
                <el-form-item label="NameNodes：" v-if="watchConnectData.nameNodes">
                    <template>
                    {{watchConnectData.nameNodes}}
                    </template>
                </el-form-item>
                <el-form-item label="port：" v-if="watchConnectData.port">
                    <template>
                    {{watchConnectData.port}}
                    </template>
                </el-form-item>
                    <el-form-item label="用户名：">
                    <template>
                    {{watchConnectData.jdbcUsername}}
                    </template>
                </el-form-item>
                <el-form-item label="密码：">
                    <template>
                    <!-- <el-input v-model="watchConnectData.jdbcPassword" show-password disabled style="border: none" class="wbd"></el-input> -->
                    {{watchConnectData.jdbcPassword}}
                    </template>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="this.watchConnectData.conn_type=== 'hbase'">
            <el-form :model="watchConnectData" label-width="120px">
                <el-form-item label="连接类型：">
                    <template>
                        {{watchConnectData.hbaseConnType}}
                    </template>
                </el-form-item>
                <el-form-item label="名称：">
                    <template>
                        {{watchConnectData.hbaseName}}
                    </template>
                </el-form-item>
                <el-form-item label="nameSpace：">
                    <template>
                        {{watchConnectData.hbaseNamespace}}
                    </template>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="this.watchConnectData.conn_type=== 'hdfs'">
            <el-form :model="watchConnectData" label-width="120px">
                <el-form-item label="连接类型：">
                    <template>
                        {{watchConnectData.conn_type}}
                    </template>
                </el-form-item>
                <el-form-item label="名称：" prop="hdfsName">
                    <template>
                        {{watchConnectData.hdfsName}}
                    </template>
                </el-form-item>
                <el-form-item label="NameNodes：" v-if="watchConnectData.hdfsNameNodes">
                    <template>
                        {{watchConnectData.hdfsNameNodes}}
                    </template>
                </el-form-item>
                <el-form-item label="port：" v-if="watchConnectData.hdfsPort">
                    <template>
                        {{watchConnectData.hdfsPort}}
                    </template>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="this.watchConnectData.conn_type=== 'odps'">
            <el-form :model="watchConnectData" label-width="120px">
                <el-form-item label="连接类型：">
                    <template>
                        {{watchConnectData.conn_type}}
                    </template>
                </el-form-item>
                <el-form-item label="名称：">
                    <template>
                        {{watchConnectData.odpsName}}
                    </template>
                </el-form-item>
                <el-form-item label="项目名称：">
                    <template>
                        {{watchConnectData.odpsProjectName}}
                    </template>
                </el-form-item>
                <el-form-item label="驱动：">
                   <template>
                        {{watchConnectData.odpsDrive}}
                    </template>
                </el-form-item>
                <el-form-item label="额外属性：">
                    <template>
                        {{watchConnectData.odpsAdditional}}
                    </template>
                </el-form-item>
                <el-form-item label="数据库链接：">
                    <template>
                        {{watchConnectData.odpsDbConnection}}
                    </template>
                </el-form-item>
                <el-form-item label="Access Id：">
                    <template>
                        {{watchConnectData.odpsAccessId}}
                    </template>
                </el-form-item>
                <el-form-item label="Access Key">
                    <template>
                        {{watchConnectData.odpsAccessKey}}
                    </template>
                </el-form-item>
            </el-form>
        </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="distriButionSure">确定</el-button>
          <el-button @click="dialogDistributionVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 模板详情 -->
    <el-dialog title="数据模板详情" :visible.sync="modelDialogVisible" width="60%" top="2vh">
      <el-form ref="modelClassify" :model="modelClassify" label-width="120px">
        <el-form-item label="数据分类：">
          <template>
            <span>{{modelClassify.dataClassification}}</span>
          </template>
        </el-form-item>
        <el-form-item label="数据表名：">
          <template>
            <span>{{modelClassify.cmodelTable}}</span>
          </template>
        </el-form-item>
        <!-- <div v-show="moreModel"> -->
        <el-form-item label="字段名称：">
          <template>
            <span>{{modelClassify.taskCFieldName}}</span>
          </template>
          <!-- <el-button type="text" style="margin-left:10px" @click="moreModel=!moreModel">更多<i class="el-icon-d-arrow-right"></i></el-button> -->
        </el-form-item>
        <!-- </div> -->
        <el-form-item label="数据落地时间：">
          <template>
            <span>{{modelClassify.startTime}} ~ {{modelClassify.endTime}}</span>
          </template>
        </el-form-item>
        <el-form-item label="描述信息：">
          <template>
            <span>{{modelClassify.dataMessage}}</span>
          </template>
        </el-form-item>
        <el-form-item style="marginRight:20px;textAlign:right">
          <el-button type="primary" @click="modelDialogVisible = false">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import { commonPattern, ValidQueryInput } from '@/utils/formValidate.js'
import {
  searchModeling1,
  dataAllDeletes,
  previewData,
  viewDataConnection,
  dataTemplateDetails,
  artificialUpload
} from '@/api/sys-monitoringAnalysis/dataControlCR/establishDataInfo.js'
import { getToken } from '@/utils/auth'

export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      // console.log(this.formModeling.totalStartNumber)
      if (!commonPattern.number.test(this.formModeling.totalStartNumber) && this.formModeling.totalStartNumber !== '') {
        callback(new Error('必须输入数值'))
      } else if (!commonPattern.number.test(this.formModeling.totalEndNumber) && this.formModeling.totalEndNumber !== '') {
        callback(new Error('必须输入数值'))
      } else {
        callback()
      }
    }
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      pageInfoLook: {
        pageSize: 10,
        pageNum: 1,
        total: null
      },
      loadingReadyPreview: false,
      lookDataVeiw: {},
      total: 1,
      loadingAvail: false,
      taskIdArry: [],
      // 查询
      formModeling: {
        dsName: null,
        taskStartTime: null,
        totalStartNumber: '', // 总笔数
        totalEndNumber: '',
        dsCreator: null,
        fillStartSize: null,
        fillEndSize: null,
        dsUpdatetime: ''
      },
      // 校验
      formModelingRules: {
        dsName: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        taskStartTime: [],
        checkNumberInp: [
          { validator: checkNumber, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        totalEndNumber: [],
        dsCreator: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        fillStartSize: [],
        fillEndSize: [],
        checkNumberInpOne: [{ validator: checkNumber, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }],
        checkNumberInpTwo: [{ validator: checkNumber, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }]
      },
      // 预览数据
      dialogPreviewVisible: false,
      previewTableData: {
        dataTemplateName: '',
        newTableName: '',
        tableName: [],
        dataPreviewArr: [],
        objKeyName: [] // 装对象的key值
      },
      select_orderId: [],
      allocatedDataSet: {
        dataVisible: []
      },
      checkAll: false,
      checkedPersons: [],
      persons: '',
      isIndeterminate: true,
      currentPage4: 1,
      value4: '',
      modelClassify: {},
      modelDialogVisible: false,
      watchConnectData: {},
      fileList: [],
      dialogDistributionVisible: false,
      deletePopover: false,
      dialogVisible: false,
      dialogDeleteVisible: false,
      dialogdataVisible: false,
      dialogupVisible: false,
      PeopleDialogPreviewVisible: false,
      moreModel: false,
      dialog: {
        radio: '1',
        dialogTime: '',
        range: []
      },
      dialog2: {
        radio: '1',
        dialogTime: '',
        range: []
      },
      tableData: []
    }
  },
  computed: {
    uploadUrl: function() {
      return '/model/query/upload-all-attach' + '?token=' + getToken()
    },
    paramsObj: function() {
      return {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        dsName: this.formModeling.dsName ? this.formModeling.dsName : null,
        dsStarSTime: this.formModeling.taskStartTime ? this.formModeling.taskStartTime[0] : null,
        dsEntETime: this.formModeling.taskStartTime ? this.formModeling.taskStartTime[1] : null,
        // dsVisualRange: this.formModeling.dsVisualRange ? this.formModeling.dsVisualRange : null,
        dsCreator: this.formModeling.dsCreator ? this.formModeling.dsCreator : null,
        dsTotalSNumber: this.formModeling.totalStartNumber ? this.formModeling.totalStartNumber : null,
        dsTotalBNumber: this.formModeling.totalEndNumber ? this.formModeling.totalEndNumber : null,
        dsFileSSize: this.formModeling.fillStartSize ? this.formModeling.fillStartSize : null,
        dsFileBSize: this.formModeling.fillEndSize ? this.formModeling.fillEndSize : null,
        startTime: this.formModeling.dsUpdatetime ? this.formModeling.dsUpdatetime[0] : null,
        endTime: this.formModeling.dsUpdatetime ? this.formModeling.dsUpdatetime[1] : null
      }
    },
    jdbcDbConnection: function() {
      this.connectionjdbc.jdbcDbConnection = 'jdbc:hive2://' + this.connectionjdbc.jdbcAddress + ':' + this.connectionjdbc.jdbcPort + '/' + this.connectionjdbc.jdbcDbName + this.connectionjdbc.jdbcAdditionalAttributes
      return this.connectionjdbc.jdbcDbConnection
    }
  },
  mounted() {
    this.loadingAvail = true
    this.getDataList()
  },
  methods: {
    // 模板详情
    details(scope) {
      this.modelDialogVisible = true
      dataTemplateDetails(scope.row.taskId).then(res => {
        if (res.code === 200) {
          this.modelClassify = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 获取列表信息
    getDataList() {
      searchModeling1(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.loadingAvail = false
        } else {
          this.loadingAvail = false
          this.$message({
            type: 'error',
            message: '获取列表失败！',
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => {
          this.loadingAvail = false
        })
    },
    // 查询
    modelingSearch() {
      this.$refs.formModeling.validate((valid) => {
        if (valid) {
          this.loadingAvail = true
          this.pageInfo.pageNum = 1
          this.pageInfo.pageSize = 10
          this.getDataList()
        }
      })
    },
    // 清空
    clearForm() {
      this.$refs.formModeling.resetFields()
      this.formModeling.fillEndSize = ''
      this.formModeling.totalEndNumber = ''
      this.formModeling.totalStartNumber = ''
      this.formModeling.taskStartTime = ''
    //   this.loadingAvail = true
    //   this.getDataList()
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.loadingAvail = true
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.loadingAvail = true
      this.getDataList()
    },
    // 删除
    tableDelete(scope) {
      this.$confirm('是否删除当前选中的数据模板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          dataAllDeletes(scope.row.dsId, 0, scope.row.taskId).then(res => {
            this.getDataList()
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 6000,
            showClose: true
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 6000,
            showClose: true
          })
        })
    },
    // 删除名单
    delRosterFn(params) {
      dataAllDeletes(params, 0, this.taskIdArry.join()).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 6000,
            showClose: true
          })
          this.getDataList()
          this.$refs.rosterTable.clearSelection()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!',
            duration: 6000,
            showClose: true
          })
        }
      })
        .then(() => {
          this.getDataList()
        })
        .catch(() => {})
    },
    // 批量删除
    batchDelete() {
      if (this.select_orderId.length > 0) {
        this.$confirm('确定要删除选中的数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.delRosterFn(this.select_orderId.join())
          })
          .catch(() => {
            this.$message({
              message: '已取消删除',
              type: 'info',
              duration: 6000,
              showClose: true
            })
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据 ！',
          duration: 6000,
          showClose: true
        })
      }
    },
    // 批量
    handleSelectionChange(val) {
      this.select_orderId = []
      if (val) {
        val.forEach(val => {
          if (val) {
            this.select_orderId.push(val.dsId)
            this.taskIdArry.push(val.taskId)
            // this.cModelTable.push(val.cmodelTable)
          }
        })
      }
    },
    // 分配数据集 确定
    distriButionSure() {
      this.dialogDistributionVisible = false
    },
    // ssada
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 查看数据连接
    allocatedData(scope) {
      this.dialogDistributionVisible = true
      //   var str = getToken()
      viewDataConnection(scope.row.taskId).then(res => {
        if (res.code === 200) {
          this.lookConnectData(res, scope)
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 组装查看连接数据
    lookConnectData(res, scope) {
      // var addSetEventObj = {}
      const data = res.data[0][0]
      let conn_type = null
      if (data.jdbcConnType) {
        conn_type = 'jdbc'
        this.connectionjdbc = data
      } else if (data.hbaseConnType) {
        conn_type = 'hbase'
        this.watchConnectData = data
        this.watchConnectData.conn_type = conn_type
        this.watchConnectData.dsName = scope.row.dsName
      } else if (data.hdfsConnType) {
        conn_type = 'hdfs'
        this.watchConnectData = data
        this.watchConnectData.conn_type = conn_type
        this.watchConnectData.dsName = scope.row.dsName
      } else if (data.odpsConnType) {
        conn_type = 'odps'
        const objodps = data
        switch (objodps.odpsDrive) {
          case 'hive2':
            objodps.odpsDrive = 'inceptor-5.1.0'
            break
          case 'mysql':
            objodps.odpsDrive = 'MySQL'
            break
          case 'db2':
            objodps.odpsDrive = 'db2jcc4'
            break
          case 'oracle:thin':
            objodps.odpsDrive = 'oracle6'
            break
          case 'sqlserver':
            objodps.odpsDrive = 'sqlserver41'
            break

          default:
            break
        }
        this.watchConnectData = data
        this.watchConnectData.conn_type = conn_type
        this.watchConnectData.dsName = scope.row.dsName
      }
      if (data.jdbcConnType) {
        const obj = data
        switch (obj.jdbcDrive) {
          case 'hive2':
            obj.jdbcDrive = 'inceptor-5.1.0'
            break
          case 'mysql':
            obj.jdbcDrive = 'MySQL'
            break
          case 'db2':
            obj.jdbcDrive = 'db2jcc4'
            break
          case 'oracle:thin':
            obj.jdbcDrive = 'oracle6'
            break
          case 'sqlserver':
            obj.jdbcDrive = 'sqlserver41'
            break

          default:
            break
        }
        this.watchConnectData = obj
        this.watchConnectData.conn_type = conn_type
        this.watchConnectData.dsName = scope.row.dsName
      }

      // switch (res.data[0].conn_type) {
      //   case 'jdbc':
      //     addSetEventObj.conn_type = res.data[0].conn_type
      //     addSetEventObj.jdbcName = res.data[0].jdbc_name
      //     addSetEventObj.jdbcDrive = res.data[0].jdbc_drive
      //     addSetEventObj.jdbcAddress = res.data[0].jdbc_address
      //     addSetEventObj.jdbcPort = res.data[0].jdbc_port
      //     addSetEventObj.jdbcDbName = res.data[0].jdbc_db_name
      //     addSetEventObj.jdbcAdditionalAttributes = res.data[0].jdbc_additional_attributes
      //     addSetEventObj.jdbcDbConnection = res.data[0].jdbc_db_connection
      //     addSetEventObj.jdbcUsername = res.data[0].jdbc_username
      //     addSetEventObj.jdbcPassword = res.data[0].jdbc_password
      //     addSetEventObj.template_name = res.data[0].template_name
      //     addSetEventObj.nameNodes = res.data[0].name_nodes
      //     addSetEventObj.port = res.data[0].port
      //     break
      //   case 'hbase':
      //     addSetEventObj.conn_type = res.data[0].conn_type
      //     addSetEventObj.hbaseConnType = res.data[0].hbase_conn_type
      //     addSetEventObj.hbaseName = res.data[0].hbase_name
      //     addSetEventObj.hbaseNamespace = res.data[0].hbase_namespace
      //     addSetEventObj.template_name = res.data[0].template_name
      //     break
      //   case 'hdfs':
      //     addSetEventObj.conn_type = res.data[0].conn_type
      //     addSetEventObj.hdfsConnType = res.data[0].hdfs_conn_type
      //     addSetEventObj.hdfsName = res.data[0].hdfs_name
      //     addSetEventObj.template_name = res.data[0].template_name
      //     addSetEventObj.hdfsNameNodes = res.data[0].hdfs_namenodes
      //     addSetEventObj.hdfsPort = res.data[0].hdfs_port
      //     break
      //   case 'odps':
      //     addSetEventObj.conn_type = res.data[0].conn_type
      //     addSetEventObj.odpsConnType = res.data[0].odps_conn_type
      //     addSetEventObj.odpsName = res.data[0].odps_name
      //     addSetEventObj.odpsProjectName = res.data[0].odps_project_name
      //     addSetEventObj.odpsDrive = res.data[0].odps_drive
      //     addSetEventObj.odpsAdditional = res.data[0].odps_additional
      //     addSetEventObj.odpsDbConnection = res.data[0].odps_db_connection
      //     addSetEventObj.odpsAccessId = res.data[0].odps_access_id
      //     addSetEventObj.odpsAccessKey = res.data[0].odps_access_key
      //     addSetEventObj.template_name = res.data[0].template_name
      //     break
      // }
      // this.watchConnectData = addSetEventObj
      // console.log(this.watchConnectData)
    },
    // 预览数据
    previewTheData(scope) {
      this.previewTableData = {
        dataTemplateName: '',
        newTableName: '',
        tableName: [],
        dataPreviewArr: [],
        objKeyName: []
      }
      this.loadingReadyPreview = true
      this.lookDataVeiw = {}
      this.lookDataVeiw = scope
      this.previewTableData.dataTemplateName = scope.row.dsName
      this.previewTableData.newTableName = scope.row.dsStartTime + '~' + scope.row.dsEndTime
      if (scope.row.dsDataSources === '系统抽取') {
        this.dialogPreviewVisible = true
        const obj = {
          pageNum: this.pageInfoLook.pageNum,
          pageSize: this.pageInfoLook.pageSize,
          modelTable: scope.row.modelTable,
          taskId: scope.row.taskId
        }
        previewData(obj).then(res => {
          if (res.code === 200) {
            var arr = res.data[0].cfieldName.split(',')
            this.previewTableData.tableName = arr
            this.previewTableData.dataPreviewArr = res.data[1]
            this.previewTableData.objKeyName = res.data[0].fieldName.split(',')
            this.loadingReadyPreview = false
            this.pageInfoLook.total = res.data[2].total
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 6000,
              showClose: true
            })
            this.loadingReadyPreview = false
          }
        })
          .catch(() => {
            this.loadingReadyPreview = false
          })
      } else {
        // id是上传完文件的id
        this.PeopleDialogPreviewVisible = true
        artificialUpload(scope.row.dsId).then(res => {
          if (res.code === 200) {
            const data = JSON.parse(JSON.stringify(res.data))
            data.shift()
            this.previewTableData.tableName = res.data[0]
            this.previewTableData.dataPreviewArr = data
          }
        })
      }
    },
    handleSizeLookChange(val) {
      this.pageInfoLook.pageSize = val
      this.loadingReadyPreview = true
      this.previewTheData(this.lookDataVeiw)
    },
    handleCurrentLookChange(val) {
      this.pageInfoLook.pageNum = val
      this.loadingReadyPreview = true
      this.previewTheData(this.lookDataVeiw)
    },
    // 导出数据
    deriveDatas(scope) {
      location.href = `/file-service/upload/download-file/${scope.row.upLoadId}?token=${getToken()}`
    },
    // previewTheData(scope) {
    //   this.previewTableData = {
    //     dataTemplateName: '',
    //     newTableName: '',
    //     tableName: [],
    //     dataPreviewArr: [],
    //     objKeyName: []
    //   }
    //   this.previewTableData.dataTemplateName = scope.row.templateName
    //   this.previewTableData.newTableName = scope.row.taskStartTime
    //   this.dialogPreviewVisible = true
    //   previewData(scope.row.modelTable, scope.row.taskId).then(res => {
    //     if (res.code === 200) {
    //       var arr = res.data[0].cfieldName.split(',')
    //       this.previewTableData.tableName = arr
    //       this.previewTableData.dataPreviewArr = res.data[1]
    //       this.previewTableData.objKeyName = res.data[0].fieldName.split(',')
    //       for (let i = 0; i < this.previewTableData.objKeyName.length; i++) {
    //         this.previewTableData.objKeyName[i] = this.previewTableData.objKeyName[i].toLowerCase()
    //       }
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.message
    //       })
    //     }
    //   })
    // },
    handleCheckAllChange(val) {
    //   this.checkedPersons = val ? personOptions : []
    //   this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
    //   const checkedCount = value.length
    //   this.checkAll = checkedCount === this.cities.length
    //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.persons.length
    },
    onSubmit() {

    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onRemoveFile(file, fielList) {
      this.formData.fileList = fielList
    }, // 移除文件
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.$message({
          message: '导入成功',
          type: 'success',
          duration: 6000,
          showClose: true
        })
      } else {
        this.$message({
          message: res.message,
          type: 'warnimg',
          duration: 6000,
          showClose: true
        })
      }
    } // 导入成功
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.establishDataInfo {
    background: #ffffff;
    padding: 10px;
    .titlefix{
        margin: 5px;
    }
    .wbd{
      .el-input__inner{
        border: none;
      }
    }
    .el-form {
        margin-bottom: 14px;
        padding-top:10px;
        border-radius: 10px;
        border: 1px solid #f2f2f2;
        .el-row{
            .el-col{
                .el-form-item{
                    .el-form-item__content{
                        .el-input{
                            width:100%
                        }
                        .el-select{
                            width: 100%;
                            display: flex;
                            justify-items: auto
                        }

                    }
                }
            }
        }
        .el-date-editor--daterange {
            width: 100% !important;
            }
         .valable{
                  width:100%;
                  text-align:right;
                  .el-form-item__content button {
                      margin:0 10px;
                  }
              }
    }
  .line {
    text-align: center;
  }
  .upload-demo{
      padding: 10px 0;
      .el-upload{
          width: 100%;
          padding: 0 10px;
          .el-upload-dragger{
              width: 100%;
          }
      }
  }
}
.personDialog{
  .el-checkbox__label{
    padding-right: 20px;
  }
  .el-checkbox+.el-checkbox{
    margin-left: 0px;
  }
}
</style>
