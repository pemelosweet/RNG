<template>
  <div>
    <el-card>
      <el-form v-model="this.form" disabled label-width="120px">
        <el-form-item label="预警编号：">
          <el-input v-model="this.form.warningnumber"></el-input>
        </el-form-item>
        <el-form-item label="报文名：">
          <el-input v-model="this.form.messagename"></el-input>
        </el-form-item>
        <el-form-item label="报送类型：">
          <el-input v-model="this.form.submissiontype"></el-input>
        </el-form-item>
        <el-form-item label="报告机构名称：">
          <el-input v-model="this.form.institutionname"></el-input>
        </el-form-item>
        <el-form-item label="报送日期：">
          <el-input v-model="this.form.submissiondate"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度：">
          <el-input v-model="this.form.urgencydegree"></el-input>
        </el-form-item>
        <el-form-item label="涉罪类型：">
          <el-input v-model="this.form.crimestype"></el-input>
        </el-form-item>
        <el-form-item label="报送方向：">
          <el-input v-model="this.form.submissiondirection"></el-input>
        </el-form-item>
        <el-form-item label="预警时间：">
          <el-input v-model="this.form.earlywarningtime"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input v-model="this.form.state"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { findAnalysisUpdate } from '@/api/sys-monitoringAnalysis/taskManagement/suspiciousWarning/findByReportDispose.js'
export default {
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent', 'workFlowInfobusiness'])
  },
  watch: {
    businessFlag(val) {
      if (val) this.updateForm()
      this.$store.dispatch('changeFlag', false)
    },
    formContent: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.id = newVal.id
        this.form = newVal
      }
    }
  },
  mounted() {
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    updateForm() {
      const formArchivesInfo = {
        // id: this.id,
        workflow: this.workFlow2business
      }
      findAnalysisUpdate(this.id, formArchivesInfo).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$store.dispatch('changeFlag', false)
          setTimeout(() => {
            this.$router.push({ name: 'home' })
          }, 1000)
        }
      })
    }
  },
  created() {

  }
}
</script>