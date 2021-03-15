<template>
  <div class="newModelWarnConfigur">
    <el-card>
      <div slot="header">
        <span>{{this.$route.query.type}}参数</span>
        <a @click="goBack" class="back" :style="backImg"></a>
      </div>
      <el-form :model="modelMainstayForm" :rules="rulesMainstayForm" label-width="120px" ref="refForm">
        <el-row :gutter="20">
          <el-col :span="18" :offset="1">
            <el-form-item label="参数名称" prop="key">
              <el-input :disabled="this.$route.query.type !== '新建'" @blur='onblur' v-model="modelMainstayForm.key" placeholder="内容长度不能超过50" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="参数修改历史" v-if="this.$route.query.type === '查看'" >
              <el-button v-if="this.$route.query.type === '查看'" style="width:132px" type="primary" @click="handleRanking">查看参数修改历史</el-button>
            </el-form-item>
            <el-form-item label="参数描述" prop="desc">
              <el-input :disabled="this.$route.query.type === '查看'"  v-model="modelMainstayForm.desc" :rows="2" type="textarea" placeholder="内容长度不能超过50" maxlength="50"></el-input>
            </el-form-item>

            <el-form-item label="参数类型" prop="checkList">
              <el-checkbox-group v-model="modelMainstayForm.checkList" :disabled="this.$route.query.type === '查看'">
                <el-checkbox label="数字参数">数字参数</el-checkbox>
                <el-checkbox label="参数不可分割">参数不可分割</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="参数值" prop="value">
              <el-input :disabled="this.$route.query.type === '查看'"  v-model="modelMainstayForm.value" placeholder="内容长度不能超过50" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="适用范围" prop="scope">
              <el-checkbox-group v-model="modelMainstayForm.scope" @change="scopeChange" :disabled="this.$route.query.type === '查看'">
                <el-checkbox label="CLIENT">主体属性</el-checkbox>
                <el-checkbox label="ACCOUNT">账户属性</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="生效时间" prop="availDate">
              <el-date-picker :disabled="this.$route.query.type === '查看'" :picker-options="pickerOptions" clearable v-model="modelMainstayForm.availDate" value-format="yyyy-MM-dd" type="date"></el-date-picker>
            </el-form-item>

          </el-col>
        </el-row>
        <div style="text-align:center;margin-bottom:6px;">
          <el-button type="primary" :disabled="!preventClicks" v-if="!(this.$route.query.type === '查看')"  @click="handleSubmi">保 存</el-button>
          <el-button type="primary" v-if="this.$route.query.type === '查看'" @click="goBack">返回</el-button>
        </div>
      </el-form>
    </el-card>
   <!-- 弹层 -->
   <el-dialog title="参数修改历史" :visible.sync="dialogTableVisible" width="75%">
      <el-table :data="tableRankingData"
        tooltip-effect="dark"
        v-loading="loadingMainstayAdminTwo"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-table-column label="序号" type="index" width="50" fixed="left"></el-table-column>
        <el-table-column label="参数名称" prop="key" min-width="220"></el-table-column>
        <el-table-column label="参数描述" prop="desc" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="参数值" prop="value" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="适用范围" prop="scope" min-width="80" show-overflow-tooltip>
           <template slot-scope="scope">
             {{scope.row.scope | Transform}}
           </template>
        </el-table-column>
        <el-table-column label="生效时间" prop="availDate" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新日期" prop="insertDate" min-width="140" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
      <div style="text-align:right;margin-bottom:6px;">
        <el-button type="primary"  @click="closeDigion">返回</el-button>
      </div>
  </el-dialog>
  </div>
</template>
<script>
// import { noSpaceAndTs } from '@/utils/formValidate.js'
// import { getToken } from '@/utils/auth'
import {
  addRankingData,
  lookRankingData,
  rankingHistoryList,
  updataRanking,
  onBlurEvent
} from '@/api/sys-monitoringAnalysis/rankingRules/rankingMainstayAdmin.js'
export default {
  name: 'newModelWarnConfigur',

  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      loadingMainstayAdminTwo: false,
      dialogTableVisible: false,
      tableRankingData: [],
      total: null,
      pageSize: 10,
      pageNum: 1,
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      modelMainstayForm: {
        key: '',
        desc: '',
        value: '',
        checkList: [],
        scope: [],
        availDate: ''
      },
      preventClicks: true,
      timer: null, // 定时任务
      rulesMainstayForm: {
        availDate: [
          { required: true, message: '生效日期不能为空', trigger: 'blur' }],
        key: [
          { required: true, message: '参数名称不能为空', trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }],
        desc: [
          // { validator: noSpaceAndTs, trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }],
        value: [
          { required: true, message: '参数值不能为空', trigger: 'blur' },
          { max: 100, message: '最大长度不能超过100位', trigger: 'blur' }],
        checkList: [
          { required: true, message: '参数类型不能为空', trigger: 'change' }],
        scope: [{ required: true, message: '请选择适用范围', trigger: 'change' }]
      },
      onBlurDoigao: false

    }
  },
  filters: {
    Transform(val) {
      const pattern = val.split(',')
      var arrInfo = []
      for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === 'ACCOUNT') {
          arrInfo.push('账户属性')
        }
        if (pattern[i] === 'CLIENT') {
          arrInfo.push('主体属性')
        }
      }
      var formatedDate = arrInfo.join(',')
      return formatedDate
    }
  },
  computed: {
  },
  mounted() {
    if (this.$route.query.type === '查看' || this.$route.query.type === '修改') {
      lookRankingData(this.$route.query.mainKey).then(res => {
        if (res.code === 200) {
          this.modelMainstayForm.key = res.data.key
          this.modelMainstayForm.desc = res.data.desc
          this.modelMainstayForm.value = res.data.value
          this.modelMainstayForm.availDate = res.data.availDate
          if (res.data.isWhole !== false) {
            this.modelMainstayForm.checkList.push('参数不可分割')
          }
          if (res.data.isNumber !== false) {
            this.modelMainstayForm.checkList.push('数字参数')
          }
          if (res.data.scope !== null) {
            this.modelMainstayForm.scope = res.data.scope.split(',')
          }
        } else {
          this.$message({
            type: 'error',
            message: '请求数据失败！',
            duration: 6000,
            showClose: true
          })
        }
      })
    } else {
      console.log('新建')
    }
  },
  methods: {
    // 查看参数修改历史
    handleRanking() {
      this.dialogTableVisible = true
      this.loadingMainstayAdminTwo = true
      this.getListRanking()
      if (this.timer) { // 定时刷新页面
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
          this.getListRanking()
        }, 100000)
      }
    },
    // 校验名称是否重复
    onblur() {
      if (this.$route.query.type === '新建') {
        const blurName = encodeURI(this.modelMainstayForm.key)
        onBlurEvent(blurName).then(res => {
          if (res.code === 200) {
            this.onBlurDoigao = true
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 6000,
              showClose: true
            })
          }
        })
      }
    },
    scopeChange(val) {
    },
    closeDigion() {
      this.dialogTableVisible = false
    },
    // 获取列表
    getListRanking() {
      const pageObj = {
        key: encodeURI(this.modelMainstayForm.key),
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      rankingHistoryList(pageObj).then(res => {
        if (res.code === 200) {
          clearInterval(this.timer)
          this.loadingMainstayAdminTwo = false
          this.tableRankingData = res.data.list
          this.total = res.data.total
        } else {
          this.loadingMainstayAdminTwo = false
          this.$message({
            type: 'error',
            message: res.message,
            duration: 6000,
            showClose: true
          })
        }
      })
        .catch(() => {
          this.loadingMainstayAdminTwo = false
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getListRanking()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getListRanking()
    },
    // 保存
    handleSubmi() {
      this.preventClicks = false
      this.$refs['refForm'].validate((valid) => {
        if (valid) {
          const paramsObject = {
            key: this.modelMainstayForm.key,
            desc: this.modelMainstayForm.desc,
            value: this.modelMainstayForm.value
          }
          if (this.modelMainstayForm.checkList) {
            if (this.modelMainstayForm.checkList.indexOf('数字参数') > -1 && this.modelMainstayForm.checkList.indexOf('参数不可分割') <= -1) {
              paramsObject.isNumber = true
              paramsObject.isWhole = false
            } else if (this.modelMainstayForm.checkList.indexOf('数字参数') <= -1 && this.modelMainstayForm.checkList.indexOf('参数不可分割') > -1) {
              paramsObject.isNumber = false
              paramsObject.isWhole = true
            } else if (this.modelMainstayForm.checkList.indexOf('数字参数') > -1 && this.modelMainstayForm.checkList.indexOf('参数不可分割') > -1) {
              paramsObject.isNumber = true
              paramsObject.isWhole = true
            }
          } else {
            paramsObject.isNumber = false
            paramsObject.isWhole = false
          }
          if (this.modelMainstayForm.scope) {
            paramsObject.scope = this.modelMainstayForm.scope.join(',')
          }
          paramsObject.availDate = this.modelMainstayForm.availDate
          if (this.$route.query.type === '新建') {
            addRankingData(paramsObject).then(res => {
              if (res.code === 200) {
                this.preventClicks = true
                this.$router.go(-1)
                this.$message({
                  type: 'success',
                  message: '新增成功！',
                  duration: 6000,
                  showClose: true
                })
              } else {
                this.preventClicks = true
                this.$message({
                  type: 'error',
                  message: res.message,
                  duration: 6000,
                  showClose: true
                })
              }
            })
              .catch(() => {
                this.preventClicks = true
              })
          } else {
            updataRanking(paramsObject).then(res => {
              if (res.code === 200) {
                this.preventClicks = true
                this.$router.go(-1)
                this.$message({
                  type: 'success',
                  message: '修改成功！',
                  duration: 6000,
                  showClose: true
                })
              } else {
                this.preventClicks = true
                this.$message({
                  type: 'error',
                  message: res.message,
                  duration: 6000,
                  showClose: true
                })
              }
            })
              .catch(() => {
                this.preventClicks = true
              })
          }
        } else {
          this.preventClicks = true
          return false
        }
      })
    },

    // 返回
    goBack() {
      if (JSON.parse(sessionStorage.getItem('searchDataZTZHCS'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchDataZTZHCS'))
        obj.ifReviewZTZHCS = true
        sessionStorage.setItem('searchDataZTZHCS', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.newModelWarnConfigur {
  position: relative;
  .modelFrame{
    .el-transfer-panel{
      .el-transfer-panel__body{
        .el-transfer-panel__list{
          .el-transfer-panel__item{
            width:100% !important;
          }
        }
      }
    }
  }
  .el-form-item__content{
    width: 100%;
    .modelNames{
      width:100%;
      margin-top: 5px;
      display:inline-block;
      padding:2px 4px;
      border-radius:5px;
      border:1px solid #ccc;
      min-height: 32px
    }
  }
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .el-date-editor--daterange {
    width: 100% !important;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }

  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 54px;
    overflow: auto;
    margin: 0;
  }
}
</style>
