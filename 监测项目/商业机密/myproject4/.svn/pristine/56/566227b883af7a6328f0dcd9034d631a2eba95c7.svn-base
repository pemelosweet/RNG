<template>
  <div class="establishDataInfo" v-loading.fullscreen.lock="submitFlag" element-loading-text="文件正在上传，请耐心等待！">
      <div slot="header" class="titlefix">
        <span style="lineHeight:32px">建模数据信息</span>
      </div>
    <el-form ref="formModeling" :model="formModeling" :rules="formModelingRules"  label-width="150px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="数据模板名称：" prop="dsName">
               <el-input  v-model="formModeling.dsName" maxlength="50" placeholder="内容长度不能超过50"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8" prop="taskStartTime">
          <el-form-item label="数据落地时间：">
            <el-date-picker v-model="formModeling.taskStartTime" value-format="yyyy-MM-dd" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数据可见范围：" prop="dsVisualRange">
            <el-input  v-model="formModeling.dsVisualRange" maxlength="50" placeholder="内容长度不能超过50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
            <el-form-item label="更新时间：" prop="updateTime" style="width:100%">
                 <el-date-picker v-model="formModeling.updateTime" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数据创建人：" prop="dsCreator">
                <el-input  v-model="formModeling.dsCreator" maxlength="50" placeholder="内容长度不能超过50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
             <el-form-item label="数据来源：" prop="dsDataSources">
              <el-input  v-model="formModeling.dsDataSources" maxlength="50" placeholder="内容长度不能超过50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
              <el-row :span="10">
                <el-col :span="14">
                  <el-form-item label="总笔数：" prop="checkNumberInpOne">
                      <el-input  v-model="formModeling.totalStartNumber" placeholder="内容长度不能超过50" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span style="text-align: center;width: 100%;display: inline-block;"> ~ </span>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="checkNumberInpTwo" label-width="0px">
                    <el-input  v-model="formModeling.totalEndNumber" placeholder="内容长度不能超过50" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
      </el-row>
      <el-form-item class="valable">
        <el-button type="primary" @click="modelingSearch">查询</el-button>
        <el-button @click="clearForm" type="primary" plain>清空</el-button>
      </el-form-item>
    </el-form>
        <!-- 上传文件 -->
     <div class="titlefix">
        <span style="lineHeight:32px;float:left">建模数据列表：</span>
          <el-upload
            class="upload-demo1"
            :action="uploadUrl" ref="upload" name="files" :on-success="onSuccess" :on-error="onError" :on-remove="handleRemove" :before-upload="handleBeforeUpload"  style="float:left;margin: 0 10px 15px 10px" :show-file-list="false">
            <el-button plain size="small" type="primary">上传数据</el-button>
          </el-upload>
          <el-button plain type="primary" @click="batchDelete" style="float:left">批量删除</el-button>
      </div>
    <el-table :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loadingEstable"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
      @sort-change="sortChange">
      <el-table-column type="selection" fixed="left" width="50" :selectable='selectInit'></el-table-column>
      <el-table-column type="index" label="序号" min-width="50"></el-table-column>
      <el-table-column prop="dsName" label="数据模板名称" min-width="400" >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
                <p>{{scope.row.dsName}}</p>
                <!-- <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" style="width: 100%;overflow: hidden;">
                        <el-button type="text" @click="details(scope)">{{scope.row.dsName}}</el-button>
                    </el-tag>
                </div> -->
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" v-if="scope.row.dsDataSources === '系统抽取'" style="width: 100%;overflow: hidden;">
                        <el-button style="width:98%;color:#606266;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" type="text" @click="details(scope)">{{scope.row.dsName}}</el-button>
                    </el-tag>
                    <span v-else>{{scope.row.dsName}}</span>
                </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="数据落地时间" min-width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.dsStartTime}}~{{scope.row.dsEndTime}}
          </template>
      </el-table-column>
      <el-table-column prop="dsDataSources" label="数据来源" min-width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dsTotalNumber" label="总笔数" width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dsVisualRange" label="数据可见范围" min-width="130" show-overflow-tooltip>
          <template slot-scope="scope">
              <el-button type="text" @click="dataDetails(scope,'查看')">{{scope.row.dsVisualRange}}</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="dsUpdatetime" sortable='custom' label="更新时间" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dsCreator" label="数据创建人" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="text" size="medium" v-if="scope.row.dsDataSources !== '人工上传'" @click="previewTheData(scope)">预览数据</el-button>
          <el-button type="text" size="medium" v-if="scope.row.dsDataSources === '人工上传'" @click="deriveData(scope)">导出数据</el-button>
          <el-button type="text" size="medium" v-if="!scope.row.dsVisualRange" @click="allocatedData(scope)">分配数据可见范围</el-button>
          <el-button type="text" size="medium" v-else @click="dataDetails(scope,'编辑')">编辑数据可见范围</el-button>
          <el-button type="text" size="medium" @click="tableDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>


    <!-- 系统抽取预览数据 -->
    <el-dialog :visible.sync="dialogPreviewVisible" width="70%" @close="closeDialog" class="personDialog">
      <span>
          <b style="margin:5px 0;display:inline-block">模板名称：{{previewTableData.dataTemplateName}}</b>
          <b style="margin:5px 0 5px 150px;display:inline-block">数据落地时间：{{previewTableData.newTableName}}</b>
      </span>
      <el-table border  ref="multipleTable"
       :data="previewTableData.dataPreviewArr"
       tooltip-effect="dark"
       style="width: 100%"
       v-loading="loadingEstPreview"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.1)"
       >
            <el-table-column type="index" label="序号" min-width="50"></el-table-column>
            <el-table-column align="center" width="150" v-for="(item,index) in this.previewTableData.tableName" :key="index" :label="item">
            <template slot-scope="scope">
             <el-popover trigger="hover" placement="top">
                   <p>{{scope.row[previewTableData.objKeyName[index]]}} </p>
                    <div slot="reference" class="name-wrapper">
                            <el-button type="text" style="color:#606266">{{scope.row[previewTableData.objKeyName[index]]}} </el-button>
                    </div>
                </el-popover>
                <!-- <span>
                    {{scope.row[previewTableData.objKeyName[index]]}}
                </span> -->
            </template>
            </el-table-column>
      </el-table>
      <el-pagination
      v-if="previewTotal"
      background
      @size-change="handleSizeLookChange"
      @current-change="handleCurrentLookChange"
      :current-page="previewPageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="previewPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="previewTotal"/>
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
            <el-table-column type="index" label="序号" min-width="50"></el-table-column>
            <el-table-column align="center"  v-for="(item,index) in this.previewTableData.tableName" :key="index" :label="item">
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
    <!-- 分配数据集 -->
    <el-dialog :title="ifdetailTIle" :visible.sync="dialogDistributionVisible" width="80%" top="10vh">
      <el-form ref="allocatedDataSet" :model="allocatedDataSet" label-width="120px">
        <el-form-item label="数据模板名称：" v-if="!this.ifdetail">
          <el-input disabled v-model="allocatedDataSet.dataName"></el-input>
        </el-form-item>
        <el-form-item label="数据可见人：">
          <div class="dataVisible">
            <el-row>
              <el-col :span="10">
                <div class="divScroll">
                  <el-tree accordion ref="tree" :data="allocatedDataSet.dataVisible" @check="handleNodeClick"  default-expand-all show-checkbox node-key="id"  :props="defaultProps"></el-tree>
                </div>
              </el-col>
              <el-col :span="14">
                <el-transfer v-model="transferData" :data="transferOptions" :titles="['部门成员', '可见范围']" :props="ifdetail?{key: 'userId',disabled:'userId',label: 'name'}:{key: 'userId',label: 'name'}"></el-transfer>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="ifdetail" @click="dialogDistributionVisible = false">确定</el-button>
        <el-button type="primary" :disabled="this.submitExamine" v-if="!ifdetail" @click="distriButionSure">确定</el-button>
        <el-button @click="dialogDistributionVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 模板详情 -->
    <el-dialog title="数据模板详情"  :visible.sync="dialogVisible" width="60%" top="2vh">
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
          <el-button type="primary" @click="cancalSure">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import {
  searchModeling,
  dataAllDeletes,
  previewData,
  addDataCentratSets,
  dataTemplateDetails,
  dataVisibility,
  obtainCentratSets,
  artificialUpload,
  dSUser
} from '@/api/sys-monitoringAnalysis/dataControl/establishDataInfo.js'
import { getToken } from '@/utils/auth'
import { adminisValidInput, commonPattern, ValidQueryInput } from '@/utils/formValidate.js'
// , delDataValidInput
export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      const objStart = this.formModeling.totalStartNumber
      const objEnd = this.formModeling.totalEndNumber
      if (!commonPattern.number.test(this.formModeling.totalStartNumber) && objStart !== '' && objStart !== null) {
        callback(new Error('必须输入数值'))
      } else if (!commonPattern.number.test(this.formModeling.totalEndNumber) && objEnd !== '' && objEnd !== null) {
        callback(new Error('必须输入数值'))
      } else {
        callback()
      }
    }
    return {
      ifdetail: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
      loadingEstable: false,
      previewPageNum: 1,
      previewPageSize: 10,
      previewTotal: 0,
      lookDataVeiw: {},
      // 查询
      formModeling: {
        dsName: null,
        taskStartTime: null,
        dsVisualRange: null, // 数据可见范围
        totalStartNumber: null, // 总笔数
        totalEndNumber: null,
        dsCreator: null,
        dsDataSources: null,
        updateTime: null
      },
      // 校验
      formModelingRules: {
        dsName: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        taskStartTime: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        dsVisualRange: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        checkNumberInp: [
          { validator: checkNumber, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        totalStartNumber: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        totalEndNumber: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        dsCreator: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        dsDataSources: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        checkNumberInpOne: [{ validator: checkNumber, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }],
        checkNumberInpTwo: [{ validator: checkNumber, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }]
      },

      // 预览数据
      dialogPreviewVisible: false,
      PeopleDialogPreviewVisible: false,
      previewTableData: {
        dataTemplateName: '',
        newTableName: '',
        tableName: [],
        dataPreviewArr: [],
        objKeyName: [] // 装对象的key值
      },
      select_orderId: [],
      modelTableArr: [],
      taskIdCopy: [],
      allocatedDataSet: {
        dsId: '',
        dataName: '',
        dataVisible: []
      },
      dataVisibleShow: [],
      dataVisibleEdit: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      loadingEstPreview: false,
      checkAll: false,
      checkedPersons: [],
      persons: '',
      isIndeterminate: true,
      currentPage4: 1,
      value4: '',
      modelClassify: {},
      fileList: [],
      dialogDistributionVisible: false,
      deletePopover: false,
      dialogVisible: false,
      dialogDeleteVisible: false,
      dialogdataVisible: false,
      dialogupVisible: false,
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
      submitFlag: false,
      tableData: [],
      transferData: [],
      transferOptions: [],
      sortVal: '',
      sortName: '',
      submitExamine: false,
      ttoSupage: false,
      ifdetailTIle: ''
    }
  },
  computed: {
    uploadUrl: function() {
      return 'caml-model/model/query/upload-all-attach' + '?token=' + getToken()
    },
    paramsObj: function() {
      return {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        dsName: this.formModeling.dsName ? this.formModeling.dsName : null,
        dsStarSTime: this.formModeling.taskStartTime ? this.formModeling.taskStartTime[0] : null,
        dsEntETime: this.formModeling.taskStartTime ? this.formModeling.taskStartTime[1] : null,
        dsVisualRange: this.formModeling.dsVisualRange ? this.formModeling.dsVisualRange : null,
        dsCreator: this.formModeling.dsCreator ? this.formModeling.dsCreator : null,
        dsTotalSNumber: this.formModeling.totalStartNumber ? this.formModeling.totalStartNumber : null,
        dsTotalBNumber: this.formModeling.totalEndNumber ? this.formModeling.totalEndNumber : null,
        dsFileSSize: this.formModeling.fillStartSize ? this.formModeling.fillStartSize : null,
        dsFileBSize: this.formModeling.fillEndSize ? this.formModeling.fillEndSize : null,
        dsDataSources: this.formModeling.dsDataSources ? this.formModeling.dsDataSources : null,
        updateStart: this.formModeling.updateTime ? this.formModeling.updateTime[0] : null,
        updateByEnd: this.formModeling.updateTime ? this.formModeling.updateTime[1] : null,
        sortVal: this.sortVal ? this.sortVal : null,
        sortName: this.sortName ? this.sortName : null
      }
    },
    jdbcDbConnection: function() {
      this.connectionjdbc.jdbcDbConnection = 'jdbc:hive2://' + this.connectionjdbc.jdbcAddress + ':' + this.connectionjdbc.jdbcPort + '/' + this.connectionjdbc.jdbcDbName + this.connectionjdbc.jdbcAdditionalAttributes
      return this.connectionjdbc.jdbcDbConnection
    }
  },
  mounted() {
    this.loadingEstable = true
    this.getDataList()
  },
  created() {
    this.getTreeData()
  },
  methods: {
    sortChange({ column, prop, order }) {
      if (prop !== null) {
        this.sortVal = order === 'ascending' ? 'asc' : 'desc'
        this.sortName = prop
      } else {
        this.sortVal = null
        this.sortName = null
      }
      this.getDataList()
    },
    // 获取列表信息
    getDataList() {
      searchModeling(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.loadingEstable = false
        } else {
          this.loadingEstable = false
          this.$message({
            type: 'error',
            message: '获取列表失败！',
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => {
          this.loadingEstable = false
        })
    },
    // 查询
    modelingSearch() {
      this.$refs.formModeling.validate((valid) => {
        if (valid) {
          this.loadingEstable = true
          this.pageInfo.pageNum = 1
          this.pageInfo.pageSize = 10
          this.getDataList()
        }
      })
    },
    // 清空
    clearForm() {
      this.$refs['formModeling'].resetFields()
      // this.$refs.formModeling.resetFields()
      this.formModeling.taskStartTime = []
      this.formModeling.totalStartNumber = ''
      this.formModeling.totalEndNumber = ''
    //   this.getDataList()
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.loadingEstable = true
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.loadingEstable = true
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
          const modelStr = scope.row.modelTable
          dataAllDeletes(scope.row.dsId, 1, scope.row.taskId, modelStr).then(res => {
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
    GetLength(val) {
      var len = 0
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i)
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2
        } else {
          len += 1
        }
      }
      return len
    },
    handleBeforeUpload(file) {
      this.submitFlag = true
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 10
      const fileLenth = file.name.length <= 100

      if (this.$refs.upload.fileList.length > 1) {
        this.submitFlag = false
        this.$message({
          message: '只能上传一个文件!',
          type: 'warning',
          duration: 6000,
          showClose: true
        })
      }
      if (!extension && !extension2) {
        this.submitFlag = false
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning',
          duration: 6000,
          showClose: true
        })
      }

      if (!fileLenth) {
        this.submitFlag = false
        this.$message({
          message: '文件名称长度不能超过100位!',
          type: 'warning',
          duration: 6000,
          showClose: true
        })
      }
      if (!isLt2M) {
        this.submitFlag = false
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning',
          duration: 6000,
          showClose: true
        })
      }
      return (extension && isLt2M && fileLenth) || (extension2 && isLt2M && fileLenth)
    },
    onError(res, file, fileList) {
      this.submitFlag = false
      // if (res.code === 444) {
      this.$message({
        type: 'error',
        message: res.message,
        duration: 6000,
        showClose: true
      })
      // }
    },
    // 删除名单
    delRosterFn(dsId, type, taskId, modelTable) {
      dataAllDeletes(dsId, type, taskId, modelTable).then(res => {
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
            this.delRosterFn(this.select_orderId.join(), 0, this.taskIdCopy.join(), this.modelTableArr.join())
          })
          .catch(() => {
            this.$message({
              message: '已取消删除',
              type: 'info',
              duration: 6000
            })
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据 ！',
          duration: 6000
        })
      }
    },
    // 批量
    handleSelectionChange(val) {
      this.select_orderId = []
      this.taskIdCopy = []
      this.modelTableArr = []
      if (val) {
        val.forEach(val => {
          if (val) {
            this.select_orderId.push(val.dsId)
            this.taskIdCopy.push(val.taskId)
            this.modelTableArr.push(val.modelTable)
            // this.modelTable.push(val.modelTable)
            // this.cModelTable.push(val.cmodelTable)
          }
        })
      }
    },
    // 分配数据集 确定
    distriButionSure() {
      this.ifdetailTIle = ''
      this.ifdetail = false
      this.submitExamine = true
      if (this.transferData.length === 0) {
        this.submitExamine = false
        this.$message({
          message: '请选择人员',
          type: 'warning',
          duration: 6000
        })
        return false
      }
      const params = {
        userIdList: this.transferData,
        dsId: this.allocatedDataSet.dsId,
        thrProductList: this.$refs.tree.getCheckedKeys()
      }
      dSUser(params).then(res => {
        if (res.code === 200) {
          this.submitExamine = false
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 6000
          })
          this.dialogDistributionVisible = false
          this.getDataList()
        } else {
          this.submitExamine = false
          this.$message({
            message: res.message,
            type: 'warning',
            duration: 6000
          })
        }
      })
        .catch(() => {
          this.submitExamine = false
        })
    },
    closeDialog() {
      this.dialogVisible = false
      this.previewTotal = 0
      this.previewPageNum = 1
      this.previewPageSize = 10
    },
    // 数据可见范围的数据
    handleNodeClick(data) {
      var str = getToken()
      if (this.$refs.tree.getCheckedKeys().length) {
        var arrString = this.$refs.tree.getCheckedKeys().join()
        obtainCentratSets(str, arrString).then(res => {
          if (res.code === 200) {
            const data = res.data.data
            const arr = []
            for (var item in data) {
              for (let i = 0; i < data[item].length; i++) {
                arr.push(data[item][i])
              }
            }
            this.transferOptions = arr
          } else {
            this.$message({
              message: res.message,
              type: 'warning',
              duration: 6000
            })
          }
        })
      } else {
        this.transferOptions = []
        this.transferData = []
      }
    },
    getTreeData() {
      var str = getToken()
      addDataCentratSets(str).then(res => {
        if (res.code === 200) {
          this.dataVisibleEdit = JSON.parse(JSON.stringify(res.data.data))
          this.dataVisibleShow = JSON.parse(JSON.stringify(res.data.data))
          for (let i = 0; i < this.dataVisibleShow.length; i++) {
            const obj = this.dataVisibleShow[i]
            obj['disabled'] = true
            for (let i = 0; i < obj.children.length; i++) {
              const objItem = obj.children[i]
              objItem['disabled'] = true
              for (let i = 0; i < objItem.children.length; i++) {
                const objItemSub = objItem.children[i]
                objItemSub['disabled'] = true
              }
            }
          }
        }
      })
    },
    // 分配数据可见范围
    allocatedData(scope) {
      this.ifdetailTIle = '分配数据可见范围'
      this.ifdetail = false
      this.transferData = []
      this.transferOptions = []
      this.allocatedDataSet.dataVisible = this.dataVisibleEdit
      this.allocatedDataSet.dsId = scope.row.dsId
      this.allocatedDataSet.dataName = scope.row.dsName
      this.dialogDistributionVisible = true
      this.$refs.tree.setCheckedKeys([])
      this.$refs.$nextTick(function() {
        this.$refs.tree.setCheckedKeys([])
      })
    },
    cancalSure() {
      this.dialogVisible = false
    },
    // 数据可见范围
    dataDetails(scope, type) {
      if (type === '查看') {
        // this.ttoSupage = true
        this.allocatedDataSet.dataVisible = this.dataVisibleShow
        this.ifdetail = true
        this.ifdetailTIle = ''
      } else {
        this.allocatedDataSet.dataVisible = this.dataVisibleEdit
        this.ifdetailTIle = '编辑数据可见范围'
        this.ifdetail = false
      }
      this.dialogDistributionVisible = true
      this.allocatedDataSet.dataName = scope.row.dsName
      // this.ifdetail = type === '查看'
      this.transferOptions = []
      this.transferData = []
      // this.allocatedDataSet.dataVisible = type === '查看' ? this.dataVisibleShow : this.dataVisibleEdit
      this.allocatedDataSet.dsId = scope.row.dsId
      dataVisibility(scope.row.dsId).then(res => {
        this.$refs.tree.setCheckedKeys([])
        this.transferData = res.data[0].listUser

        const key = res.data[0].listProduct
        this.$refs.tree.setCheckedKeys(key)
        var str = getToken()
        var arrString = this.$refs.tree.getCheckedKeys().join()
        obtainCentratSets(str, arrString).then(res => {
          if (res.code === 200) {
            const data = res.data.data
            const arr = []
            for (var item in data) {
              for (let i = 0; i < data[item].length; i++) {
                arr.push(data[item][i])
              }
            }
            this.transferOptions = arr
          } else {
            this.$message({
              message: res.message,
              type: 'warning',
              duration: 6000
            })
          }
        })
      })
    },
    // 模板详情
    details(scope) {
      this.dialogVisible = true
      dataTemplateDetails(scope.row.taskId).then(res => {
        if (res.code === 200) {
          this.modelClassify = res.data
          if (res.data === null) {
            this.modelClassify = {}
          }
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000
          })
        }
      })
    },
    handleSizeLookChange(val) {
      this.previewPageSize = val
      this.previewTheData(this.lookDataVeiw)
    },
    handleCurrentLookChange(val) {
      this.previewPageNum = val
      this.previewTheData(this.lookDataVeiw)
    },
    // 预览数据
    previewTheData(scope) {
      this.lookDataVeiw = scope
      this.loadingEstPreview = true
      this.previewTableData = {
        dataTemplateName: '',
        newTableName: '',
        tableName: [],
        dataPreviewArr: [],
        objKeyName: []
      }
      this.previewTableData.dataTemplateName = scope.row.dsName
      this.previewTableData.newTableName = scope.row.dsStartTime + '~' + scope.row.dsEndTime
      if (scope.row.dsDataSources === '系统抽取') {
        if (this.dialogPreviewVisible === false) {
          this.previewPageSize = 10
          this.previewPageNum = 1
        }
        this.dialogPreviewVisible = true
        previewData(scope.row.modelTable, scope.row.taskId, this.previewPageNum, this.previewPageSize).then(res => {
          if (res.code === 200) {
            var arr = res.data[0].cfieldName.split(',')
            this.previewTableData.tableName = arr
            this.previewTotal = res.data[2].total
            this.previewTableData.dataPreviewArr = res.data[1]
            this.previewTableData.objKeyName = res.data[0].fieldName.split(',')
            this.loadingEstPreview = false
          } else {
            this.loadingEstPreview = false
            this.$message({
              type: 'error',
              message: res.message,
              duration: 6000
            })
          }
        })
          .catch(() => {
            this.loadingEstPreview = false
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
    // 导出数据
    deriveData(scope) {
      const str = encodeURI('模型平台(生产)')
      location.href = `/file-service/upload/download-file/${scope.row.upLoadId}?moduleName= ${str}&token=${getToken()}`
    },
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
    },
    handlePreview(file) {
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
    selectInit(row, index) {
      if (row.executionStatus === '进行中') {
        return false // 不可勾选
        //   } else if() {
      } else {
        return true
      }
    },
    onSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.submitFlag = false
        this.$message({
          message: '导入成功',
          type: 'success',
          duration: 6000,
          showClose: true
        })
        this.getDataList()
        this.$refs.upload.clearFiles()
      } else {
        this.submitFlag = false
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
    // padding: 0 10px ;
    .titlefix{
        margin: 5px;
    }
    .el-transfer-panel__body {
    .el-checkbox-group {
      .el-checkbox {
        margin-right: 56px
      }
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
                            width: 100% !important;
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
      .el-upload{
          width: 100%;
          .el-upload-dragger{
              width: 100%;
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
  .divScroll{
    height: 300px;
    margin:0 20px 0 0;
    overflow-y: auto;
  }
}
</style>
