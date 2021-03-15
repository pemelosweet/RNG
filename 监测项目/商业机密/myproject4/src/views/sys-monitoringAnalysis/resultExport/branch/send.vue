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
            label="移送编号："
            prop="ysCodeNum"
            class="itme-block"
          >
            <el-input
              maxlength="100"
              v-model="form.ysCodeNum"
              placeholder="请输入移送编号，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="移送方向："
            prop="ysReceiveDept"
            class="itme-block"
          >
            <el-input
              maxlength="100"
              :disabled="isUpdate"
              v-model="form.ysReceiveDept"
              placeholder="请输入移送方向，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
            <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="移送时间："
            prop="ysTime"
          >
            <el-date-picker
              v-model="form.ysTime"
              class="itme-block"
              type="date"
              placeholder="开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="交易发生地："
            prop="ysArea"
            class="itme-block"
          >
            <el-input
              maxlength="100"
              v-model="form.ysArea"
              placeholder="请输入交易发生地，最多输入100字符"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="初步判断：" prop="ysJub" >
            <el-select style="width:100%" v-model="form.ysJub" clearable placeholder="请选择" multiple >
              <el-option  v-for="item in sheZui" :key="item.codeId" :label="item.codeName" :value="item.codeId"></el-option>
            </el-select>
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
import { getSheZui, sendUpdate } from '@/api/sys-monitoringAnalysis/resultExportJian/index'

export default {
  data() {
    return {
      token: getToken(),
      form: {
        orId: '',
        orState: null,
        ysCodeNum: '',
        ysReceiveDept: '',
        ysTime: '',
        ysArea: '',
        ysJub: ''
      },
      publicName: '移送情况',
      isUpdate: false,
      loading: false,
      sheZui: [],
      disForm: false,
      rules: {
        ysCodeNum: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        ysReceiveDept: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        ysTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getSheZuiLX()
    this.form.orId = this.$route.query.scope.orId
    this.form.ysJub = this.$route.query.scope.ysJub.split(',')
    this.form.ysCodeNum = this.$route.query.scope.ysCodeNum
    this.form.ysReceiveDept = this.$route.query.scope.ysReceiveDept
    this.form.ysTime = this.$route.query.scope.ysTime
    this.form.ysArea = this.$route.query.scope.ysArea
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
          this.form.ysJub = this.form.ysJub.join(',')
          sendUpdate(this.form).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '填写移送情况成功',
                showClose: true,
                duration: 6000,
                type: 'success'
              })
              this.$router.push({ path: '/fenResultExportJian/fenResultExportJian' })
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
          this.form.ysJub = this.form.ysJub.join(',')
          this.form.orState = '3'
          sendUpdate(this.form).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '填写移送情况成功',
                showClose: true,
                duration: 6000,
                type: 'success'
              })
              this.$router.push({ path: '/fenResultExportJian/fenResultExportJian' })
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
