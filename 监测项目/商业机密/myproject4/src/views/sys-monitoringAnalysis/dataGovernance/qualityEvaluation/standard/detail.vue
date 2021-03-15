<template>
  <div class="standardwrap">
    <el-card>
      <div slot="header" class="clearfix">
        <span>反馈情况</span>
      </div>
      <el-row>
        <el-form ref="form" :model="form" label-width="120px" class="clearfix">
          <el-col :span="24">
            <el-col :span="9">
              <el-form-item label="评价任务名称：">
                <span>{{ininData.evaluationTaskName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="评价时间：">
                <span>{{ininData.evaluationDate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="评价处室：">
                <span>{{ininData.officeName}}</span>
              </el-form-item>
            </el-col>
          </el-col>
      <el-table :data="form.tableData" :span-method="objectSpanMethod" border>
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column prop="integrationFirstTarget" label="一级指标" show-overflow-tooltip></el-table-column>
        <el-table-column prop="targetName" label="二级指标" show-overflow-tooltip></el-table-column>
        <el-table-column prop="targetType" label="指标类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="giftWeight" label="权重" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="得分区间" prop="grading" show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 20px;">
        <el-button type="primary" @click="formTui.name = '';dialogVisible = true">退回</el-button>
        <el-button type="primary" @click="diaSure" :loading="diaSureLoading">确认</el-button>
        <el-button type="primary" @click="queryTrialFn">查看试算结果</el-button>
        <el-button type="primary" @click="aaaa" plain>返回</el-button>
      </div>

      <el-dialog title="退回原因：" :visible.sync="dialogVisible" width="30%">
        <div>
          <el-form ref="formTui" :model="formTui" class="clearfix">
            <el-form-item prop="name" :rules="[{ required: true, message: '请输入退回原因', trigger: 'blur' }]">
              <el-input type="textarea" v-model="formTui.name" maxlength="80" placeholder="请输入退回原因，最多输入80位"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="formNameSure" :loading="formNameSureLoading">确 定</el-button>
        </span>
      </el-dialog>
        </el-form>
      </el-row>
      
    </el-card>
  </div>
</template>

<script>
import { queryFeedbackSituation, confirm, goBack } from '@/api/sys-monitoringAnalysis/evaluate/integratedEvaluationController.js'
export default {
  data() {
    return {
      formNameSureLoading: false,
      diaSureLoading: false,
      ininData: {},
      dialogVisible: false,
      form: {
        tableData: []
      },
      currentPage: 1,
      spanArr: [],
      pos: '',
      formTui: {
        name: ''
      },
      chinaNull: /[\u4e00-\u9fa5]/, // 校验中文
      specialEnglish: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im, // 校验英文特殊符号
      sprcialChina: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im, // 校验中文特殊符号
      englishNull: /[abcdefghijklmnopqrstuvwxyz]/im, // 校验英文
      numberNull: /[1234567890]/im, // 校验数字
      blankSpace: /[ ]/im // 校验空格
    }
  },
  mounted() {
    this.initDataFn()
  },
  methods: {
    aaaa() {
      this.$router.push({
        name: 'dataGovernance_qualityEvaluation_standard',
        query: {
          evaluationTaskName: this.$route.query.nameType === 'N' ? '' : this.$route.query.evaluationTaskName,
          evaluationTaksId: this.$route.query.nameType === 'N' ? '' : this.$route.query.evaluationTaksId,
          boolType: false
        }
      })
    },
    // 校验只能输入数字
    validateNumber(rule, value, callback) {
      if (this.specialEnglish.test(value) || this.sprcialChina.test(value)) {
        callback(new Error('禁止输入特殊字符'))
      } else if (this.blankSpace.test(value)) {
        callback(new Error('禁止输入空格'))
      } else if (this.chinaNull.test(value)) {
        callback(new Error('禁止输入中文'))
      } else if (this.englishNull.test(value)) {
        callback(new Error('禁止输入英文'))
      } else if (value > 100 || value < 0) {
        callback(new Error('范围0~100'))
      } else {
        callback()
      }
    },
    queryTrialFn() {
      const arr = []
      this.form.tableData.forEach(v => {
        arr.push(v.targetId)
      })
      this.$router.push({
        name: 'dataGovernance_qualityEvaluation_thinIndicator_queryTrial',
        query: {
          type: 'standardwrap',
          evaluationTaksId: this.$route.query.evaluationTaksId,
          evaluationTaskName: this.$route.query.evaluationTaskName,
          officeStaff: this.$route.query.officeStaff,
          officeName: this.$route.query.officeName,
          feedBackStatus: this.$route.query.feedBackStatus,
          officeStaffId: this.$route.query.officeStaffId,
          evaluationDate: this.ininData.evaluationDate,
          targetIdList: arr.join()
        }
      })
    },
    formNameSure() {
      this.$refs.formTui.validate((valid) => {
        if (valid) {
          const arrId = []
          this.form.tableData.forEach(el => {
            arrId.push(el.targetId)
          })
          const queryBackDO = {
            list: arrId,
            officeName: this.ininData.officeName,
            officeStaff: this.ininData.officeStaff,
            officeStaffId: this.ininData.officeStaffId,
            returnReason: this.formTui.name
          }
          goBack(queryBackDO).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '退回成功',
                duration: 6000,
                showClose: true
              })
              this.dialogVisible = false
              this.$router.push({
                name: 'dataGovernance_qualityEvaluation_standard',
                query: {
                  evaluationTaskName: this.$route.query.nameType === 'N' ? '' : this.$route.query.evaluationTaskName,
                  evaluationTaksId: this.$route.query.nameType === 'N' ? '' : this.$route.query.evaluationTaksId
                }
              })
            } else {
              this.formNameSureLoading = true
              this.$message({
                type: 'warning',
                message: res.message,
                duration: 6000,
                showClose: true,
                onClose: function() {
                  this.formNameSureLoading = false
                }.bind(this)
              })
            }
          })
        } else {
          return false
        }
      })
    },
    diaSure() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const arrId = []
          this.form.tableData.forEach(el => {
            arrId.push(el.targetId)
          })
          const queryBackDO = {
            list: arrId,
            officeName: this.ininData.officeName,
            officeStaff: this.ininData.officeStaff,
            officeStaffId: this.ininData.officeStaffId,
            returnReason: ''
          }
          confirm(queryBackDO).then(res => {
            if (res.code === 200) {
              // let newBoolType = null
              // if (this.$route.query.nameType !== 'N') {
              //   newBoolType = false
              // } else {
              //   newBoolType = true
              // }
              this.$router.push({
                name: 'dataGovernance_qualityEvaluation_standard',
                query: {
                  evaluationTaskName: this.$route.query.nameType === 'N' ? '' : this.$route.query.evaluationTaskName,
                  evaluationTaksId: this.$route.query.nameType === 'N' ? '' : this.$route.query.evaluationTaksId,
                  boolType: false
                }
              })
            } else {
              this.diaSureLoading = true
              this.$message({
                type: 'warning',
                message: res.message,
                duration: 6000,
                showClose: true,
                onClose: function() {
                  this.diaSureLoading = false
                }.bind(this)
              })
            }
          })
        } else {
          return false
        }
      })
    },
    initDataFn() {
      const map = {
        evaluationTaskName: this.$route.query.evaluationTaskName,
        evaluationTaskId: this.$route.query.evaluationTaksId,
        officeStaff: this.$route.query.officeStaff,
        officeName: this.$route.query.officeName,
        feedBackStatus: this.$route.query.feedBackStatus,
        officeStaffId: this.$route.query.officeStaffId
      }
      queryFeedbackSituation(map).then(res => {
        if (res.code === 200) {
          this.ininData = res.data
          this.form.tableData = res.data.list
          this.getSpanArr()
        }
      })
    },
    getSpanArr() {
      for (var i = 0; i < this.form.tableData.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (this.form.tableData[i].targetId === this.form.tableData[i - 1].targetId) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  },
  watch: {
    dialogVisible: function(nl, ol) {
      if (nl !== ol) {
        setTimeout(() => {
          this.$refs.formTui.clearValidate()
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss">
.standardwrap {
  .btnalign {
    text-align: right;
  }
}
</style>
