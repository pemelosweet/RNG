<template>
  <div class="technologyModel">
    <el-card>
      <div slot="header">模型审核</div>
      <el-form ref="modelForm" :model="form" :rules="modelFormRules" label-width="115px">
            <el-row>
                <el-col :span="8">
                <el-form-item label="项目名称：" prop="productName">
                    <el-input  style="width:100%" v-model.trim="form.productName" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="名称：" prop="modelName">
                    <el-input  style="width:100%" v-model.trim="form.modelName" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="提交人：" prop="submitter">
                    <el-input  style="width:100%" v-model.trim="form.submitter" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                <el-form-item label="提交时间：" prop="submissionTime">
                    <el-date-picker v-model="form.submissionTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="审核时间：" prop="auditTime">
                        <el-date-picker v-model="form.auditTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="审核人：" prop="auditor">
                    <el-input  v-model.trim="form.auditor" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                <el-form-item label="可疑涉罪类型：" prop="suspectOffenceType">
                    <el-input  v-model.trim="form.suspectOffenceType" maxlength="50" placeholder="长度不能超过50"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="审核状态：" prop="auditType">
                            <el-checkbox-group v-model="form.auditType">
                            <el-checkbox label="待审核" value="待审核"></el-checkbox>
                            <el-checkbox label="审核通过" value="审核通过" style="margin-left: 5px"></el-checkbox>
                            <el-checkbox label="未通过" value="未通过" style="margin-left: 5px"></el-checkbox>
                            </el-checkbox-group>
                </el-form-item>
                </el-col>

            </el-row>
            <el-form-item class="valable">
                <el-button type="primary" @click="searchPag">查询</el-button>
                <el-button @click="clearForm" type="primary" plain>清空</el-button>
            </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <div class="titlefix" style="margin:10px">
        <span style="lineHeight:32px;float:left">审核列表：</span>
        <div style="float:left;margin:0 0 15px 15px">
            <el-button type="primary" plain @click="batchDelete">批量删除</el-button>
        </div>
    </div>
      <el-table :data="data"
        @selection-change="handleSelectionChange"
        v-loading="loadingtechno"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        @sort-change="sortChange">
        <el-table-column type="selection" fixed="left"></el-table-column>
        <!-- <el-table-column type="index" label="序号"></el-table-column> -->
        <el-table-column label="项目名称" prop="productName" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modelName" label="名称" min-width="250" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
              <el-button type="text">{{scope.row.modelName}}</el-button>
          </template> -->
        </el-table-column>
        <el-table-column prop="suspectOffenceType" label="可疑涉罪类型" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="warningRang" label="预警范围" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="showMoreRange(scope)">{{showWarRang(scope)}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="submitter" label="提交人" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="submissionTime" label="提交时间" min-width="160" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column prop="auditor" label="审核人" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="auditTime" label="审核时间" min-width="150" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column prop="auditType" label="审核状态" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" min-width="270" fixed="right">
          <template slot-scope="scope">
              <router-link :to='{name: "modelPlatform_modelInfoIndex"}'>
                  <el-button  type="text" size="medium">查看详情</el-button>
                </router-link>
               <router-link :to='{name: "modelPlatform_lookDataCollection",query:{aId:encodeURI(scope.row.modelAId)}}'>
                  <el-button  type="text" size="medium">查看提交信息</el-button>
                </router-link>
            <el-button  type="text" size="medium" :disabled="scope.row.auditType!=='待审核'" @click="techModel(scope)">审核</el-button>
            <el-button type="text" size="medium" @click="deleteModel(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
        <!--审核-->
    <el-dialog title="审核" :visible.sync="dialogAuditListVisible" width="40%" class="personDialog">
      <el-form ref="auditList" :model="auditList" label-width="100px" style="border:none">
        <el-form-item label="审核结果：" style="padding:10px" required>
          <template>
                <el-radio v-model="auditList.radio" label="通过" value="通过">通过</el-radio>
                <el-radio v-model="auditList.radio" label="未通过" value="未通过">未通过</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="审核意见：" style="padding:10px" prop="auditOpinion">
          <template>
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="auditList.auditOpinion"></el-input>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendAssemblyData">确 定</el-button>
        <el-button @click="dialogAuditListVisible = false">取 消</el-button>
      </span>
    </el-dialog>
        <!--预警范围-->
    <el-dialog title="预警范围" :visible.sync="dialogWarningRangeVisible" width="40%" class="personDialog">
      <div>
        <p>{{warningRange}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogWarningRangeVisible = false">确 定</el-button>
        <el-button @click="dialogWarningRangeVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  techSearch,
  goDeleteds,
  toaudit
} from '@/api/sys-monitoringAnalysis/technologyModel/index'
import { adminisValidInput } from '@/utils/formValidate.js'
export default {
  data() {
    return {
      dialogAuditListVisible: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 5,
      loadingtechno: false,
      auditList: {
        radio: '通过',
        auditOpinion: ''
      },
      title: '技术',
      value4: '',
      data: [],
      form: {
        productName: '',
        modelName: '',
        suspectOffenceType: '',
        submitter: '',
        submissionTime: [],
        forecastCycle: '',
        auditor: '',
        auditTime: [],
        auditType: []
      },
      scope: [],
      modelFormRules: {
        productName: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        modelName: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        submitter: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        suspectOffenceType: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        auditor: [
          { validator: adminisValidInput, trigger: 'blur' },
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ]
      },
      sortVal: '',
      sortName: '',
      selOrderId: [],
      dialogWarningRangeVisible: false,
      warningRange: ''
    }
  },
  computed: {
    paramsObj: function() {
      return {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        productName: this.form.productName ? this.form.productName : null,
        modelName: this.form.modelName ? this.form.modelName : null,
        suspectOffenceType: this.form.suspectOffenceType ? this.form.suspectOffenceType : null,
        submitter: this.form.submitter ? this.form.submitter : null,
        submitSTime: this.form.submissionTime[0] ? this.form.submissionTime[0] : null,
        submitETime: this.form.submissionTime[1] ? this.form.submissionTime[1] : null,
        auditor: this.form.auditor ? this.form.auditor : null,
        auditSTime: this.form.auditTime[0] ? this.form.auditTime[0] : null,
        auditETime: this.form.auditTime[1] ? this.form.auditTime[1] : null,
        auditType: this.form.auditType.length ? this.form.auditType.join(',') : null,
        sortVal: this.sortVal ? this.sortVal : null,
        sortName: this.sortName ? this.sortName : null
      }
    }
  },
  mounted() {
    this.loadingtechno = true
    this.getList()
    this.title = this.$route.params.title
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
      this.getList()
    },
    // 获取列表
    getList() {
      techSearch(this.paramsObj).then(res => {
        if (res.code === 200) {
          this.data = res.data.list
          this.total = res.data.total
          this.loadingtechno = false
        } else {
          this.loadingtechno = false
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    showWarRang(scope) {
      if (scope.row.warningRang) {
        const str = scope.row.warningRang
        if (str !== '' || str !== null) {
          return str.split(',').length > 0 ? str.split(',')[0] : ''
        } else {
          return ''
        }
      }
    },
    showMoreRange(scope) {
      this.dialogWarningRangeVisible = true
      this.warningRange = scope.row.warningRang
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.getList()
    },
    // 查询
    searchPag() {
      this.$refs.modelForm.validate((valid) => {
        if (valid) {
          this.loadingtechno = true
          this.pageInfo.pageNum = 1
          this.pageInfo.pageSize = 10
          this.getList()
        }
      })
    },
    // 清空
    clearForm() {
      this.$refs['modelForm'].resetFields()
    //   this.loadingtechno = true
    //   this.getList()
    },
    // 审核意见
    sendAssemblyData() {
      const params = {
        modelAId: this.scope.row.modelAId,
        auditType: this.auditList.radio,
        auditOpinion: this.auditList.auditOpinion
      }
      toaudit(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '审核成功',
            duration: 6000,
            showClose: true
          })
          this.dialogAuditListVisible = false
          this.getList()
        }
      })
    },
    // 单删除
    deleteModel(scope) {
      this.$confirm('请确认是否删除当前选中的特征？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        goDeleteds(encodeURI(scope.row.modelAId)).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 6000,
              showClose: true
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!',
              duration: 6000,
              showClose: true
            })
          }
        })
      })
    //   .catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    },
    // 批量删除
    batchDelete() {
      if (this.selOrderId.length > 0) {
        this.$confirm('确定要删除选中的数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.delRosterFn(encodeURI(this.selOrderId.join()))
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
    // 批量 选中的
    handleSelectionChange(val) {
      this.selOrderId = []
      if (val) {
        val.forEach(val => {
          if (val) {
            this.selOrderId.push(val.modelAId)
          }
        })
      }
    },
    // 删除名单
    delRosterFn(params) {
      goDeleteds(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 6000,
            showClose: true
          })
          this.getList()
          this.$refs.rosterTable.clearSelection()
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => { })
    },
    // 审核
    techModel(scope) {
      this.auditList.radio = '通过'
      this.auditList.auditOpinion = ''
      this.scope = scope
      this.dialogAuditListVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.technologyModel {
    .el-card{
        .el-card__body{
          .el-form {
            margin-bottom: 14px;
            padding-top:10px;
            border-radius: 10px;
            border: 1px solid #f2f2f2;
            .el-select {
                width: 100%;
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
         .titlefix{
             margin: 5px;
            }
        .el-table {
            margin-top:52px;
        }
        }
    }
}
</style>
