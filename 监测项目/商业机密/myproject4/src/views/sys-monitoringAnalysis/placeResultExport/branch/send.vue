<template>
  <div class="conjointAnalysisAdd">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{publicName}}</span>
      </div>
      <el-form
        style="width: 90%; margin: 0 auto"
        ref="form"
        :rules="rules"
        :disabled="disForm"
        :model="form"
        label-width="160px"
      >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="反馈文号："
            prop="feedNum"
            class="itme-block"
          >
            <el-input
              maxlength="100"
              v-model="form.feedNum"
              placeholder="请输入反馈文号，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="反馈方向："
            prop="feedToDept"
            class="itme-block"
          >
            <el-input
              maxlength="100"
              :disabled="isUpdate"
              v-model="form.feedToDept"
              placeholder="请输入反馈方向，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
            <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="反馈时间："
            prop="feedDate"
          >
            <el-date-picker
              v-model="form.feedDate"
              class="itme-block"
              type="date"
              placeholder="开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      <div style="text-align: center">
          <!-- <el-button
          :disabled="disForm"
            type="primary"
            plain
            @click="update('form')"
            :loading="loading"
          >修改</el-button> -->
          <el-button
            :disabled="disForm"
            type="primary"
            @click="publish('form')"
            :loading="loading"
          >提交</el-button>
          <el-button
            type="primary"
            @click="$router.back(-1)"
          >返回</el-button>
        </div>
      <monitor-workflow></monitor-workflow>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getSheZui, sendUpdate } from '@/api/sys-monitoringAnalysis/placeResultExport/index'

export default {
  data() {
    return {
      token: getToken(),
      form: {
        id: '',
        feedNum: '',
        feedToDept: '',
        feedDate: ''
      },
      publicName: '反馈情况',
      isUpdate: false,
      loading: false,
      sheZui: [],
      disForm: false,
      rules: {
        feedNum: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        feedToDept: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        feedDate: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getSheZuiLX()
    this.form.id = this.$route.query.scope.id
    this.form.feedNum = this.$route.query.scope.feedNum
    this.form.feedToDept = this.$route.query.scope.feedToDept
    this.form.feedDate = this.$route.query.scope.feedDate
  },
  methods: {
    // 获取涉罪类型
    getSheZuiLX() {
      getSheZui('TOSC').then(res => {
        this.sheZui = res.data
      })
    },
    update(form) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          sendUpdate(this.form).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '填写反馈情况成功',
                showClose: true,
                duration: 6000,
                type: 'success'
              })
              this.$router.push({ path: '/fenResultExport/fenResultExport' })
              this.loading = false
            } else {
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    publish(form) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.form.assistState = '3'
          sendUpdate(this.form).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '填写反馈情况成功',
                showClose: true,
                duration: 6000,
                type: 'success'
              })
              this.$router.push({ path: '/fenResultExport/fenResultExport' })
              this.loading = false
            } else {
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.conjointAnalysisAdd {
  .el-select {
    display: block;
  }
  .line {
    text-align: center;
  }
  // .el-checkbox-group label:first-child {
  //   margin-left: 30px;
  // }
  .itme-block {
    width: 100% !important;
  }
  .start-end {
    .start {
      width: 400px;
      display: inline-block;
    }
    .end {
      display: inline-block;
      width: 400px;
    }
  }

  .el-table thead tr th {
    padding: 8px 0;
  }
  .el-table .el-table__row td {
    height: 62px;
    padding: 14px 0 0 0;
    .cell {
      height: 100%;
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  .upload-demo {
    margin-bottom: 5px;
  }
  .inline-input {
    margin-left: 30px;
  }
}
</style>
