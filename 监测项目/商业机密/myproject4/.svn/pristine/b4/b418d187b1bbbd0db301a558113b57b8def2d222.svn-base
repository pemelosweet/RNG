<template>
  <div class="rulesWarning_detailsWorkFlow">
    <el-card>
      <el-form v-model="this.form"  label-width="120px">
        <el-row>
          <el-col>
            <el-form-item label="预警编号：">
              <el-input disabled v-model="this.form.warningNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="主体名称：">
              <el-input disabled v-model="this.form.ctnm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="证件号码：">
              <el-input disabled v-model="this.form.ctid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="预警日期：">
              <el-input disabled v-model="this.form.datBegin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="处置信息：" v-if="this.form.dmRankmSynchronizations.status === '已处置'">
          <el-button type="primary" @click="lookworkFlowInfo()">查看处置信息</el-button>
        </el-form-item> -->
        <el-form-item label="状态：">
          <el-input disabled v-model="this.form.status"></el-input>
        </el-form-item>
      </el-form>
      <!-- <div style="text-align:center">
        <el-button type="primary" @click="goback()">返回</el-button>
      </div> -->
    </el-card>
  </div>
</template>
<script>
// import {
//   getLookRuleList
// } from '@/api/sys-monitoringAnalysis/taskManagement/rulesWarning/rules.js'
import { mapGetters } from 'vuex'
import { ruleAnalysisUpdate } from '@/api/sys-monitoringAnalysis/taskManagement/rulesWarning/ruleQueryWorkFlow.js'
export default {
  data() {
    return {
      form: {},
      idsRouter: '',
      activeIndex: 'first',
      synchronizedId: ''
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
        this.synchronizedId = newVal.warningNum
        this.form = newVal
        // delete this.form.workflow
      }
    }
  },
  methods: {
    updateForm() {
      const formArchivesInfo = {
        // synchronizedId: this.synchronizedId,
        // warningNum: this.synchronizedId,
        workflow: this.workFlow2business
      }
      ruleAnalysisUpdate(this.synchronizedId, formArchivesInfo).then(res => {
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
<style lang="scss">
.rulesWarning_detailsWorkFlow {
  .el-card{
    .el-card__body{
        .el-tabs-demo{
          width: 100%;
            .el-tabs__header{
              display: flex;
              justify-content: center;
              align-items: center;
            }
        }
    }
  }
  
}
</style>