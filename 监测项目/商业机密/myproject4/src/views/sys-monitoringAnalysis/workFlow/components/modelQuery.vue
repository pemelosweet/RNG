<template>
  <div class="modelWarning_detail">
    <el-card>
      <el-form v-model="form" disabled label-width="120px" >
        <el-row>
          <el-col>
            <el-form-item label="预警编号：">
              <el-input v-model="form.warningNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col>
            <el-form-item label="主体名称：">
              <el-input v-model="form.subjectName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="证件号码：">
              <el-input v-model="form.identificationNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col>
            <el-form-item label="疑似犯罪类型：">
              <el-input v-model="form.wadecrimeTypes"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="预警时间：">
              <el-input v-model="form.mResultTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
         <el-col>
            <el-form-item label="状态：">
              <el-input v-model="form.status"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { modelAnalysisUpdate } from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/modelQueryWorkFlow.js'
export default {
  data() {
    return {
      form: {},
      mEwpcId: ''
      // activeIndex: 'first'
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王大虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }]
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
        this.mEwpcId = newVal.mEwpcId
        this.form = newVal
        // delete this.form.workflow
      }
    }
  },
  methods: {
    updateForm() {
      const formArchivesInfo = {
        // mEwpcId: this.mEwpcId,
        workflow: this.workFlow2business
      }
      modelAnalysisUpdate(this.mEwpcId, formArchivesInfo).then(res => {
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
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    goback() {
      this.$router.go(-1)
    }
  },
  mounted() {
    // console.log(this.workFlow2business)
  }
}
</script>
<style lang="scss" scoped>
.modelWarning_detail {
  .el-card{
    .el-card__body{
        .el-tabs-demo{
          width: 100%;
            .el-tabs__header{
              padding-left: 120px
              // display: flex;
              // justify-content: center;
              // align-items: center;
            }
        }
    }
  }
  
}
</style>