<template>
  <div>
    <el-form label-width="120px" :model="cleandialogForm" ref="cleandialogForm" :rules="cleanRules">
      <el-form-item label="选择清理方案：" prop="planName">
        <el-select v-model="cleandialogForm.planName" @change="handleChange" clearable filterable>
          <el-option v-for="item in cleanOptions" :label="item.planName" :key="item.planId" :value="item.planName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="清理原因：" prop="reason">
        <el-input type="textarea" v-model="cleandialogForm.reason"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="callWorkFlow('cleandialogForm')">确定</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCleanRuleList, getCleanList } from '@/api/sys-monitoringAnalysis/dataGovernance/dataClean/program.js'
import { addCleanList } from '@/api/sys-monitoringAnalysis/dataGovernance/dataClean/task'
export default {
  props: {
    cleandialogVisible: {
      type: Boolean
    },
    cleanParams: {
      type: Object
    },
    cleanMulList: {
      type: Array
    }
  },
  data() {
    return {
      cleandialogForm: {
        // 自动清理form
        planName: '',
        reason: ''
      },
      cleanVisible: this.cleandialogVisible,
      cleanRules: {
        // 自动清理验证
        planName: [{ required: true, message: '请选择清理方案', trigger: 'change' }],
        reason: [
          { required: true, message: '请填写清理原因', trigger: 'blur' },
          { max: 200, message: '最大长度为200位', trigger: 'blur' }
        ]
      },
      planId: '',
      cleanOptions: [],
      srId: this.cleanParams.srId
    }
  },
  computed: {
    ...mapGetters(['roles', 'businessFlag', 'workFlow2business'])
  },
  watch: {
    businessFlag(val) {
      if (val) this.nextStep()
    },
    srId(val) {
      if (val) this.getCleanRuleList()
    },
    cleandialogVisible(val) {
      if (val) this.getCleanRuleList()
    }
  },
  mounted() {
    this.getCleanRuleList()
  },
  methods: {
    callWorkFlow(formName) {
      // 自动清理
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.cleanVisible = false
          this.$emit('setCleanVisible', this.cleanVisible)
          setTimeout(() => {
            this.$store.dispatch('workFlow', { configCode: 'planApproval' })
            this.$store.dispatch('openWorkFlow', true)
          }, 500)
        } else {
          return false
        }
      })
    },
    getCleanRuleList() {
      this.$refs['cleandialogForm'].resetFields()
      if (this.srId) {
        getCleanRuleList(this.srId)
          .then(res => {
            // 下拉
            if (res.code === 200) {
              this.cleanOptions = res.data
            }
          })
          .catch(() => {})
      } else {
        const paramsObj = {
          pageNum: 1,
          pageSize: 10
        }
        getCleanList(paramsObj).then(res => {
          if (res.code === 200) {
            this.cleanOptions = res.data.list
          }
        }).catch()
      }
    },
    handleChange(val) {
      this.planId = val.planId
      this.cleanOptions.find(item => {
        if (item.planName === val) {
          this.planId = item.planId
        }
      })
    },
    nextStep() {
      // 自动清理弹框提交
      const paramsObj = {
        planId: this.planId,
        planName: this.cleandialogForm.planName,
        origin: this.cleanParams.origin,
        reason: this.cleandialogForm.reason,
        approvals: this.cleanMulList,
        workflow: this.workFlow2business
      }
      this.getCleanData(paramsObj)
    },
    getCleanData(paramsObj) {
      addCleanList(paramsObj)
        .then(res => {
          if (res.code === 200) {
            this.$store.dispatch('openWorkFlow', false)
            this.$message({
              type: 'success',
              message: '提交自动清理成功！'
            })
          }
        })
        .catch()
    },
    onCancel() {
      this.cleanVisible = false
      this.$emit('setCleanVisible', this.cleanVisible)
    }
  }
}
</script>

<style>
</style>
