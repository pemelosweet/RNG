<template>
  <div class="warningProcessing_view">
    <el-card>
      <div slot="header">
        <span>模型预警详情</span>
        <a @click="goBack" class="back" :style="backImg"></a>
      </div>
      <el-form ref="formData" :model="formData" :rules="formDataRules" label-width="120px">
            <el-row>
                <el-col :span="8">
                  <el-form-item label="主体名称：" prop="name">
                      <el-input  v-model="formData.name" maxlength="50" placeholder="内容长度不能超过50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件号码：" prop="identificationNumber">
                      <el-input  v-model="formData.identificationNumber" maxlength="50" placeholder="内容长度不能超过50"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="预警编号：" prop="warningNumber">
                         <el-input  v-model="formData.warningNumber" maxlength="50" placeholder="内容长度不能超过50"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="状态：" prop="pushStatus">
                          <el-select clearable v-model="formData.pushStatus" placeholder="请选择">
                            <!-- <el-option label="待处理（待认领）" value="待处理（待认领）"></el-option>
                            <el-option label="待处理（待分配）" value="待处理（待分配）"></el-option> -->
                            <!-- <el-option label="待处理" value="待处理"></el-option> -->
                            <el-option label="未分配" value="未分配"></el-option>
                            <el-option label="待处理" value="待处理"></el-option>
                            <el-option label="处理中" value="处理中"></el-option>
                            <el-option label="已处理" value="已处理"></el-option>
                          </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="valable">
                <el-button type="primary" @click="searchPag">查询</el-button>
                <el-button @click="clearForm" type="primary" plain>清空</el-button>
            </el-form-item>
      </el-form>
      <div class="searchBlock">
        <div class="listBlock">
          <el-table :data="tableData"
           tooltip-effect="dark"
           v-loading="loadingWarnView"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.1)"
           >
            <el-table-column type="selection" fixed="left" width="30"></el-table-column>
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column label="主体名称" show-overflow-tooltip min-width="180">
              <template slot-scope="scope">
                <!-- <router-link :to="{name:'modelPlatform_modelManage_detail',params:{tab:'模型预警处理'}}"> -->
                  <el-button type="text">{{scope.row.subjectName}}</el-button>
                <!-- </router-link> -->
              </template>
            </el-table-column>
            <el-table-column label="证件号码" prop="identificationNumber" min-width="80"> </el-table-column>
            <el-table-column label="预警日期" prop="mresultTime" min-width="140"></el-table-column>
            <el-table-column label="预警编号" prop="warningNumber" min-width="140"></el-table-column>
            <el-table-column label="状态" prop="status" min-width="140"></el-table-column>
            <el-table-column label="操作" fixed="right" width="210">
              <template slot-scope="scope">
                <el-button type="text" @click="inAnalysisTools(scope)">进入分析工具</el-button>
                <el-button type="text" @click="createClueTable(scope)">创建线索表</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
         </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  warmSearch,
  creatXsTable
  // jumpIndex
} from '@/api/sys-monitoringAnalysis/warningProcessing/view'
import { adminisValidInput, ValidQueryInput, isValidNameInput } from '@/utils/formValidate.js'
export default {
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      pageInfo: {
        pageSize: 10,
        pageNum: 1
      },
      total: null,
      loadingWarnView: false,
      tableData: [],
      currentPage: 1,
      formData: {
        name: null,
        warningNumber: null,
        identificationNumber: null,
        pushStatus: null
      },
      formDataRules: {
        // suspectedCrimes: null,
        // warningNumber: null,
        // identificationNumber: null,
        // warningTime: null
        name: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '内容长度不能超50', trigger: 'blur' }
        ],
        identificationNumber: [
          { validator: isValidNameInput, trigger: 'blur' },
          { max: 50, message: '内容长度不能超50', trigger: 'blur' }
        ],
        pushStatus: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '内容长度不能超50', trigger: 'blur' }
        ],
        warningNumber: [
          { validator: ValidQueryInput, trigger: 'blur' },
          { max: 50, message: '内容长度不能超50', trigger: 'blur' }
        ]
      },
      routeData: {}
    }
  },
  computed: {
    paramsObj: function() {
      return {
        // pageSize: this.pageInfo.pageSize,
        // pageNum: this.pageInfo.pageNum,
        subjectName: this.formData.name ? this.formData.name : null,
        identificationNumber: this.formData.identificationNumber ? this.formData.identificationNumber : null,
        warningNumber: this.formData.warningNumber ? this.formData.warningNumber : null,
        pushStatus: this.formData.pushStatus ? this.formData.pushStatus : null,
        time1: this.routeData.time1 ? this.routeData.time1 : null,
        table: this.routeData.table ? this.routeData.table : null,
        modelName: this.routeData.modelName ? this.routeData.modelName : null,
        modelKey: this.routeData.modelKey ? this.routeData.modelKey : null
      }
    }
  },
  mounted() {
    this.routeData = this.$route.query
    this.loadingWarning = true
    this.getDataList(this.pageInfo.pageNum, this.pageInfo.pageSize, this.paramsObj)
  },
  methods: {
    // 获取列表信息
    getDataList(num, size, paramsObj) {
      warmSearch(num, size, paramsObj).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.loadingWarnView = false
          // var arr = res.data[0].cfieldName.split(',')
          // this.previewTableData.tableName = arr
          // this.previewTableData.dataPreviewArr = res.data[1]
          // this.previewTableData.objKeyName = res.data[0].fieldName.split(',')
          // this.previewTableData.newTableName = res.data[0].downTime
          // for (let i = 0; i < this.previewTableData.objKeyName.length; i++) {
          //   this.previewTableData.objKeyName[i] = this.previewTableData.objKeyName[i].toLowerCase()
          // }
        } else {
          this.loadingWarnView = false
          this.$message({
            type: 'error',
            message: '获取列表失败！',
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => {
          this.loadingWarnView = false
        })
    },
    // 查询
    searchPag() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.loadingWarnView = true
          this.getDataList(1, 10, this.paramsObj)
        }
      })
    },
    // 清空
    clearForm() {
      this.$refs.formData.resetFields()
    //   this.pageInfo.pageNum = 1
    //   this.pageInfo.pageSize = 10
    //   this.loadingWarnView = true
    //   this.getDataList(this.pageInfo.pageNum, this.pageInfo.pageSize, this.paramsObj)
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.loadingWarnView = true
      this.getDataList(this.pageInfo.pageNum, this.pageInfo.pageSize, this.paramsObj)
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.loadingWarnView = true
      this.getDataList(this.pageInfo.pageNum, this.pageInfo.pageSize, this.paramsObj)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 5 || rowIndex === 6) {
        return 'success-row'
      } else if (rowIndex === 3) {
        return 'haddle-row'
      }
      return ''
    },
    titleFilter(value) {
      const obj = {
        'identification_number': '身份证号码',
        'main': '主体名称',
        'biological_father': '认领人',
        'claim_time': '认领时间',
        'claim_status': '认领状态',
        'disposal_state': '处置状态'
      }
      return obj[value] ? obj[value] : value
    },
    inAnalysisTools(scope) {
      // 发起主动分析
      window.open('http://' + window.inAnalysisTools + '/datac/jsp/security/askLogin', '_blank')
    },
    // 返回
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchDataWarningPro'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchDataWarningPro'))
        obj.ifReviewWarningPro = true
        sessionStorage.setItem('searchDataWarningPro', JSON.stringify(obj))
      }
      this.$router.go(-1)
    },
    // 创建链接表
    createClueTable(scope) {
      creatXsTable(scope.row.mewpcId).then(res => {
        if (res.code === 200) {
          if (res.data === 'false') {
            this.$router.push({
              name: 'cueManage_autonomousAnalysisInfo',
              query: {
                activeName: 'second',
                keyIndex: '2',
                triggerForm: '模型预警',
                index: scope.row.warningNumber
              }
            })
          } else {
            this.$message({
              message: res.message,
              type: 'warning',
              duration: 6000,
              showClose: true
            })
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            duration: 6000
          })
        }
      })
    }

  }
}
</script>

<style  lang="scss">
.warningProcessing_view {
  position: relative;
  .header_title {
    span {
      margin-left: 16px;
      font-size: 14px;
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
  .table{
    border-collapse: collapse;
    tr{
      border-top:1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
    }
    th{
      padding:0 10px;
      height: 56px;
      line-height: 56px;
      background: #fafafa;
      font-size: 14px;
    }
    td{
      height: 40px;
      line-height: 40px;
      padding:0 10px;
      font-size: 14px;
    }
    tr:hover{
      background:#ecf5ff;
    }
  }
}
</style>
