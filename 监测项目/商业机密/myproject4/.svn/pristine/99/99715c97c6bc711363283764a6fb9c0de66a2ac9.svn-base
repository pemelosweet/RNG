<template>
  <div class="sensitive-persons">
    <el-table :data="list">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="subName" label="主体名称"></el-table-column>
      <el-table-column prop="subType" label="身份证件类型"></el-table-column>
      <el-table-column prop="subNumber" label="证件号码"></el-table-column>
      <el-table-column prop="subDetailed" label="原因"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateForm } from '@/api/sys-monitoringAnalysis/dataQuery/automaticQuery'

export default {
  data() {
    return {
      list: [],
      correctId: ''
    }
  },
  computed: {
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent'])
  },
  watch: {
    businessFlag(val) {
      if (val) this.updateForm()
    },
    formContent: {
      handler(newVal, oldVal) {
        this.list = newVal.subjects
        this.correctId = newVal.pkAut
      },
      deep: true
    }
  },
  methods: {
    updateForm() {
      updateForm(this.workFlow2business, this.correctId).then(res => {
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
  }
}
</script>

<style>

</style>
