<template>
  <div class="modelInfoDataCR">
      <p>请使用非ie浏览器访问如下链接，登陆sophon系统，链接：{{this.absAderrss}}</p>
<!-- <div class="titlefix">
        <span style="lineHeight:32px">建模数据列表：</span>
        <div style="float:right;display:flex;justifyItems:auto">
            <el-button @click="batchDelete" style="margin:0 15px">批量删除</el-button>
        </div>
      </div>
    <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" fixed="left" width="50" :selectable='selectInit'></el-table-column>
      <el-table-column type="index" label="序号" min-width="50"></el-table-column>
      <el-table-column prop="dsName" label="数据模板名称" width="270">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
                <p>{{scope.row.dsName}}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" style="width: 100%;overflow: hidden;">
                        <el-button type="text" @click="details(scope)">{{scope.row.dsName}}</el-button>
                    </el-tag>
                </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" sortable label="数据落地时间" width="300">
          <template slot-scope="scope">
            {{scope.row.dsStartTime}}~{{scope.row.dsEndTime}}
          </template>
      </el-table-column>
      <el-table-column prop="dsDataSources" label="数据来源" width="110"></el-table-column>
      <el-table-column prop="dsTotalNumber" label="总笔数" width="110"></el-table-column>
      <el-table-column prop="dsVisualRange" label="数据可见范围" width="130">
          <template slot-scope="scope">
              <el-button type="text" @click="dataDetails(scope)">{{scope.row.dsVisualRange}}</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="dsUpdatetime" sortable label="更新时间" width="130"></el-table-column>
      <el-table-column prop="dsCreator" label="数据创建人" width="150">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="previewTheData(scope)">预览数据</el-button>
          <el-button type="text" size="small" @click="allocatedData">分配数据集</el-button>
          <el-button type="text" size="small" @click="tableDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.PageNum" :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination> -->
    <!-- 上传文件 -->
    <!-- <el-upload class="upload-demo" drag :action="uploadUrl" :on-success="onSuccess" :limit="1" :on-remove="handleRemove" :before-remove="beforeRemove"  :on-exceed="handleExceed" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传Excel文件</div>
    </el-upload> -->

    <!-- 预览数据 -->
    <!-- <el-dialog :visible.sync="dialogPreviewVisible" width="70%" class="personDialog">
      <span>
          <b style="margin:5px 0;display:inline-block">模板名称：{{previewTableData.dataTemplateName}}</b>
          <b style="margin:5px 0 5px 150px;display:inline-block">数据落地时间：{{previewTableData.newTableName}}</b>
      </span>
      <el-table border  ref="multipleTable" :data="previewTableData.dataPreviewArr"  tooltip-effect="dark"  style="width: 100%">
            <el-table-column align="center" v-for="(item,index) in this.previewTableData.tableName" :key="index" :label="item">
            <template slot-scope="scope">
                <span>
                    {{scope.row[previewTableData.objKeyName[index]]}}
                </span>
            </template>
            </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPreviewVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 分配数据集 -->
    <!-- <el-dialog title="分配数据集" :visible.sync="dialogDistributionVisible" width="60%" top="10vh">
      <el-form ref="allocatedDataSet" :model="allocatedDataSet" label-width="120px">
        <el-form-item label="数据模板名称：">
          <el-input v-model="allocatedDataSet.dataName"></el-input>
        </el-form-item>
        <el-form-item label="数据可见人：">
          <div class="dataVisible">
            <el-tree accordion ref="tree" :data="allocatedDataSet.dataVisible" @check="handleNodeClick"  default-expand-all show-checkbox node-key="id"  :props="defaultProps"></el-tree>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="distriButionSure">确定</el-button>
          <el-button @click="dialogDistributionVisible = false">取消</el-button>
      </span>
    </el-dialog> -->
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
  artificialUpload
} from '@/api/sys-monitoringAnalysis/dataControlCR/establishDataInfo.js'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
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
        dsName: [],
        taskStartTime: [],
        dsVisualRange: [],
        totalStartNumber: [],
        totalEndNumber: [],
        dsCreator: [],
        dsDataSources: [],
        updateTime: []
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
        dataName: '',
        dataVisible: []
      },
      defaultProps: {
        children: 'children',
        label: 'text'
      },
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
      tableData: [],
      absAderrss: ''
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
        dsVisualRange: this.formModeling.dsVisualRange ? this.formModeling.dsVisualRange : null,
        dsCreator: this.formModeling.dsCreator ? this.formModeling.dsCreator : null,
        dsTotalSNumber: this.formModeling.totalStartNumber ? this.formModeling.totalStartNumber : null,
        dsTotalBNumber: this.formModeling.totalEndNumber ? this.formModeling.totalEndNumber : null,
        dsFileSSize: this.formModeling.fillStartSize ? this.formModeling.fillStartSize : null,
        dsFileBSize: this.formModeling.fillEndSize ? this.formModeling.fillEndSize : null,
        dsDataSources: this.formModeling.dsDataSources ? this.formModeling.dsDataSources : null,
        dsUpdatetime: this.formModeling.updateTime ? this.formModeling.updateTime[0] : null
      }
    },
    jdbcDbConnection: function() {
      this.connectionjdbc.jdbcDbConnection = 'jdbc:hive2://' + this.connectionjdbc.jdbcAddress + ':' + this.connectionjdbc.jdbcPort + '/' + this.connectionjdbc.jdbcDbName + this.connectionjdbc.jdbcAdditionalAttributes
      return this.connectionjdbc.jdbcDbConnection
    }
  },
  created() {
    this.absAderrss = window.sophonCR
    // if (this.isIE()) {
    //   this.$alert('请使用非ie浏览器访问如下链接，登陆sophon系统，链接：' + window.sophonCR, '提示', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //     }
    //   })
    // }
    if (!this.isIE()) {
      window.open(window.sophonCR, '_blank')
    }
  },
  mounted() {
    // this.getDataList()
  },
  methods: {
    isIE() {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return true
      } else {
        return false
      }
    },
    // 获取列表信息
    getDataList() {
      searchModeling(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: '获取列表失败！',
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 查询
    modelingSearch() {
      this.getDataList()
    },
    // 清空
    clearForm() {
      this.$refs.formModeling.resetFields()
      this.getDataList()
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
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
          dataAllDeletes(scope.row.dsId).then(res => {
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
      dataAllDeletes(params).then(res => {
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
      console.log(111)
      this.select_orderId = []
      if (val) {
        val.forEach(val => {
          if (val) {
            this.select_orderId.push(val.dsId)
            // this.modelTable.push(val.modelTable)
            // this.cModelTable.push(val.cmodelTable)
          }
        })
      }
    },
    // 分配数据集 确定
    distriButionSure() {
      this.dialogDistributionVisible = false
    },
    // 数据可见范围的数据
    handleNodeClick(data) {
      var str = getToken()
      var arrString = this.$refs.tree.getCheckedKeys().join()
      obtainCentratSets(str, arrString).then(res => {
        if (res.code === 200) {
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      })
    },
    // 是飒飒
    allocatedData() {
      this.dialogDistributionVisible = true
      var str = getToken()
      addDataCentratSets(str).then(res => {
        if (res.code === 200) {
          this.allocatedDataSet.dataVisible = res.data.data.children
        }
      })
    },
    // 数据可见范围
    dataDetails(scope) {
      dataVisibility(scope.row.taskId).then(res => {
        console.log(res.data)
      })
    },
    // 模板详情
    details(scope) {
      this.dialogVisible = true
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
    // 预览数据
    previewTheData(scope) {
      this.previewTableData = {
        dataTemplateName: '',
        newTableName: '',
        tableName: [],
        dataPreviewArr: [],
        objKeyName: []
      }
      this.previewTableData.dataTemplateName = scope.row.templateName
      this.previewTableData.newTableName = scope.row.taskStartTime
      this.dialogPreviewVisible = true
      if (scope.row.dsDataSources === '系统抽取') {
        previewData(scope.row.modelTable, scope.row.taskId).then(res => {
          if (res.code === 200) {
            var arr = res.data[0].cfieldName.split(',')
            this.previewTableData.tableName = arr
            this.previewTableData.dataPreviewArr = res.data[1]
            this.previewTableData.objKeyName = res.data[0].fieldName.split(',')
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 6000,
              showClose: true
            })
          }
        })
      } else {
        // id是上传完文件的id
        artificialUpload().then(res => {
          console.log(res.data)
        })
      }
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
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
.modelInfoDataCR {
     position: relative;
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 120px);
        .iframeHtml {
            min-height: calc(100vh - 120px);
        }
    background: #ffffff;
    padding: 10px;
    .titlefix{
        margin: 5px;
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
                  text-align:center;
                  margin-left:-140px;
                  .el-form-item__content button {
                      margin:0 80px;
                      width:150px
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
