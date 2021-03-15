<template>
  <div class="standardwrap">
    <el-card>
      <div slot="header"><span>整合评价标准（收集处）</span></div>
      <el-row>
        <el-form ref="form" :model="form" label-width="120px">
          <el-col :span="12">
            <el-form-item label="评价任务名称：">
              <el-select v-model="form.task" value-key="evaluationTaksId" filterable style="width:95% !important;" clearable>
                <el-option v-for="(item) in dropDownOptions" :value="item" :key="item.evaluationTaksId" :label="item.evaluationTaskName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" :loading="queryLoading" @click="query">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
      <div style="margin-top: 10px;margin-bottom: 15px;">
        <span>各处室细化指标反馈状态列表</span>
        <!-- <router-link :to="{ name: 'dataGovernance_qualityEvaluation_standard_indicatorWay'}"> -->
          <el-button type="primary" plain :loading="IntegratedIndicatorLoading" @click="IntegratedIndicator" :disabled="isType">整合指标方案</el-button>
          <!-- </router-link> -->
      </div>
      <el-table :data="tableData" v-loading="tableDataLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="officeName" label="处室" show-overflow-tooltip></el-table-column>
        <el-table-column prop="officeStaff" label="处室人员" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feedBackStatus" label="反馈状态">
          <template slot-scope="scope">
            <span v-if="scope.row.feedBackStatus === '0'">未反馈</span>
            <span v-if="scope.row.feedBackStatus === '1'">已反馈</span>
          </template>
        </el-table-column>
        <el-table-column prop="verifyStatus" label="核实状态">
          <template slot-scope="scope">
            <span v-if="scope.row.verifyStatus === '0'">— —</span>
            <span v-if="scope.row.verifyStatus === '1'">未核实</span>
            <span v-if="scope.row.verifyStatus === '2'">确认</span>
            <span v-if="scope.row.verifyStatus === '3'">退回</span>
            <span v-if="scope.row.verifyStatus === '4'">退回后提交</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- <router-link :to="{ name: 'dataGovernance_qualityEvaluation_standard_detail', query: {  evaluationTaskName: evaluationTask, officeStaff: scope.row.officeStaff, officeName: scope.row.officeName, feedBackStatus: scope.row.feedBackStatus}}"> -->
              <el-button type="text" :disabled="scope.row.feedBackStatus === '0'" @click="viewFeedback(scope.row.evaluationTaskName, scope.row.officeStaff, scope.row.officeName, scope.row.feedBackStatus, scope.row.officeStaffId, scope.row.evaluationTaksId)">查看反馈情况</el-button>
            <!-- </router-link> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination background :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination> -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getAllEvaluationTask, feedBackList, feedBackDefaultList } from '@/api/sys-monitoringAnalysis/evaluate/integratedEvaluationController.js'
export default {
  data() {
    return {
      tableDataLoading: false,
      IntegratedIndicatorLoading: false,
      isType: false,
      queryLoading: false,
      // evaluationTask: '',
      form: {
        task: {}
      },
      createUser: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dropDownOptions: []
    }
  },
  mounted() {
    this.initDropdown()
    if (this.$route.query.boolType === false) {
      this.form.task.evaluationTaskName = this.$route.query.evaluationTaskName
      this.form.task.evaluationTaksId = this.$route.query.evaluationTaksId
      this.queryData()
    } else {
      this.initData()
    }
  },
  methods: {
    messageBtn(obj, loading) {
      loading = true
      this.$message({
        type: obj.type,
        message: obj.message,
        duration: 6000,
        showClose: true
      })
    },
    IntegratedIndicator() {
      let type = true
      this.tableData.forEach(element => {
        if (element.feedBackStatus !== '1' || element.verifyStatus !== '2') {
          type = false
        }
      })
      if (this.tableData.length > 0) {
        if (type) {
          this.$router.push({
            name: 'dataGovernance_qualityEvaluation_standard_indicatorWay',
            query: {
              userName: this.createUser,
              id: this.tableData[0].evaluationTaksId,
              name: this.tableData[0].evaluationTaskName,
              isType: this.tableData[0].status,
              type: '2'
            }
          })
        } else {
          this.IntegratedIndicatorLoading = true
          this.$message({
            type: 'warning',
            message: '待全部已确认可进入处室反馈的整合指标方案',
            duration: 6000,
            showClose: true,
            onClose: function() {
              this.IntegratedIndicatorLoading = false
            }.bind(this)
          })
        }
      } else {
        this.IntegratedIndicatorLoading = true
        this.$message({
          type: 'warning',
          message: '暂无数据',
          duration: 6000,
          showClose: true,
          onClose: function() {
            this.IntegratedIndicatorLoading = false
          }.bind(this)
        })
      }
    },
    viewFeedback(evaluationTaskName, officeStaff, officeName, feedBackStatus, officeStaffId, evaluationTaksId) {
      // const map = {
      //   evaluationTaskName: evaluationTaskName,
      //   officeStaff: officeStaff,
      //   officeName: officeName,
      //   feedBackStatus: feedBackStatus,
      //   officeStaffId: officeStaffId
      // }
      if (this.form.name === '') {
        this.$router.push({
          name: 'dataGovernance_qualityEvaluation_standard_detail',
          query: {
            evaluationTaskName: evaluationTaskName,
            officeStaff: officeStaff,
            officeName: officeName,
            feedBackStatus: feedBackStatus,
            officeStaffId: officeStaffId,
            evaluationTaksId: evaluationTaksId,
            nameType: this.isType ? 'N' : ''
          }
        })
      } else {
        this.$router.push({
          name: 'dataGovernance_qualityEvaluation_standard_detail',
          query: {
            evaluationTaskName: evaluationTaskName,
            officeStaff: officeStaff,
            officeName: officeName,
            feedBackStatus: feedBackStatus,
            officeStaffId: officeStaffId,
            evaluationTaksId: evaluationTaksId
          }
        })
      }
      // queryFeedbackSituation(map).then(res => {
      //   if (res.code === 200) {

      //   }
      // })
    },
    initData() {
      feedBackDefaultList().then(res => {
        if (res.code === 200) {
          this.tableData = res.data.integrationHomepages
          this.createUser = res.data.createUser
          let aType = true
          this.tableData.forEach(el => {
            if (el.verifyStatus !== '2') {
              aType = false
            }
          })
          if (aType) {
            this.isType = false
          }
          if (this.tableData.length > 0) {
            this.form.task = {
              evaluationTaksId: this.tableData[0].evaluationTaksId,
              evaluationTaskName: this.tableData[0].evaluationTaskName
            }
          }
        }
      })
    },
    queryData() {
      // const evName = this.form.task.evaluationTaskName
      // this.evaluationTask = evName
      const obj = {
        evaluationTaskName: this.form.task.evaluationTaskName,
        evaluationTaksId: this.form.task.evaluationTaksId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.tableDataLoading = true
      feedBackList(obj).then(res => {
        if (res.code === 200) {
          this.queryLoading = false
          this.createUser = res.data.createUser
          this.tableData = res.data.pi.list
          this.total = res.data.pi.total
        } else {
          this.queryLoading = false
        }
        this.tableDataLoading = false
      }).catch(() => {
        this.queryLoading = false
        this.tableDataLoading = false
      })
    },
    query() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.queryLoading = true
          if (JSON.stringify(this.form.task) === '{}') {
            this.isType = true
          } else {
            this.isType = false
          }
          // const evName = this.form.task.evaluationTaskName
          // this.evaluationTask = evName
          this.queryData()
        } else {
          return false
        }
      })
    },
    initDropdown() {
      getAllEvaluationTask().then(res => {
        if (res.code === 200) {
          this.dropDownOptions = res.data
        }
      })
    },
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.queryData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.queryData()
    }
  }
}
</script>

<style lang="scss">
</style>
