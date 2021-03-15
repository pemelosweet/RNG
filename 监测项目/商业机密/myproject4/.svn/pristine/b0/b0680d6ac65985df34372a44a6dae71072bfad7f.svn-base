<template>
  <div class="cueManage_matchField" v-loading="searchDoading" element-loading-text="正在查询中，请稍侯……" element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-card>
      <div slot="header">
        <span>匹配信息查询</span>
        <el-button style="float:right" size="small" type="primary" @click="openDialog">设置默认过期时间</el-button>
      </div>
      <div class="block">
        <el-tabs v-model="activeName"  @tab-click="handleClick" >
          <el-tab-pane label="信息查询" name="1">
            <Search :active="activeName" @activeName="getState" @loading="loadingFn"  :inputName="clearInfo"></Search>
          </el-tab-pane>
          <el-tab-pane label="查询结果" name="2" :disabled="flag">
            <Result ref="result" :mode="mode" @getFlag="getFlag" :noticeId="noticeId" :noticeType="noticeType" :searchFlag="searchFlag" :queryCriteria="queryCriteria" :md5ID="md5Id" v-if="activeName=='2'"></Result>
          </el-tab-pane>
          <el-tab-pane  label="查询历史管理"  name="3">
            <History :inputName="clearInfo" :getData="getData"></History>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dialog title="设置默认过期时间" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="130px" :rules="rules" ref="form">
        <el-row>
          <el-col :span='20'>
            <el-form-item label="过期时间(月)：" prop="num">
              <el-input v-model="form.num" placeholder="请输入过期时间(月)，最长3字符数" maxlength="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit()">保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import Search from '@/views/sys-monitoringAnalysis/cueManage/matchField/search.vue'
  import Result from '@/views/sys-monitoringAnalysis/cueManage/matchField/result.vue'
  import History from '@/views/sys-monitoringAnalysis/cueManage/matchField/history.vue'
  import { getDate, updateDate } from '@/api/sys-monitoringAnalysis/cueManage/matchField/search.js'
  export default {
    components: {
      Search,
      Result,
      History
    },
    data() {
      return {
        md5Id: '',
        total: 0,
        queryCriteria: {},
        noticeId: '',
        noticeType: '',
        searchDoading: false,
        clearInfo: false,
        getData: false,
        activeName: '1',
        mode: '',
        listData: {},
        historyList: [],
        flag: true,
        dialogVisible: false,
        searchFlag: false,
        form: {
          num: ''
        },
        rules: {
          num: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      if (this.$route.query.id) {
        const params = this.$route.query.id.split(',')
        this.noticeId = params[0]
        this.noticeType = params[1]
        this.activeName = '2'
      }
    },
    methods: {
      openDialog() {
        getDate().then(res => {
          if (res.code === 200) {
            this.form.num = res.data
            this.dialogVisible = true
          }
        })
      },
      submit() {
        updateDate(this.form).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功',
              duration: 6000
            })
            this.dialogVisible = false
          }
        })
      },
      handleEdit() {
        this.flag = this.$refs['result'].getVal()
      },
      loadingFn(val) {
        this.searchDoading = val
      },
      handleClick(tab, event) {
        sessionStorage.setItem('searchFlag', 'false')
        this.searchFlag = false
      },
      getState(val) {
        this.queryCriteria = val
        this.total = val.total
        this.type = val.type
        this.md5Id = val.md5Id
        this.listData = val.data
        this.activeName = val.activeName
        this.mode = val.mode
        this.searchFlag = true
      },
      getFlag(val) {
        this.flag = val
      }
    }
  }
</script>

<style lang="scss">
</style>