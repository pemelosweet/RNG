<template>
  <div class="rosterManage-viewRoster">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>创建人：{{form.name}}</span>
        <span style="float:right">创建时间：{{form.creationTime}}</span>
      </div>
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="分析报告类型：">
              <span>{{form.type}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标题：">
              <span>{{form.title}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="内容：">
              <el-input v-model="form.content" type="textarea" :rows="10" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="附件下载：">
             <el-button type="text" @click="getAttach(form.annexId)">{{form.annexName}}</el-button>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" v-for="(item,index) in 5" :key="index">
           <el-button type="text">{{item}}</el-button>
          </el-col> -->
        </el-row>
      </el-form>
      <div
        class="btnalign"
        style="textAlign:center"
      >
        <el-button
          type="primary"
          style="margin-right:20px"
          @click="goback"
        >返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { viewRoster } from '@/api/sys-monitoringAnalysis/reportManage/index.js'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      token: getToken(),
      form: {
        title: '',
        annexName: '',
        content: '',
        creationTime: '',
        annexId: '',
        state: ''
      }
    }
  },
  created() {
    const queryId = this.$route.query.id
    viewRoster(queryId).then(res => {
      if (res.code === 200) {
        this.form = res.data
        if (this.form.type === '0') {
          this.form.type = '灰皮书'
        } else if (this.form.type === '1') {
          this.form.type = '红皮书'
        }
      }
    })
  },
  methods: {
    getAttach(id) {
      location.href = `/file-service/upload/download-file/${id}?token=${getToken()}&moduleName=${encodeURI('宏观分析')}`
    },
    goback() {
      if (JSON.parse(sessionStorage.getItem('searchData'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchData'))
        obj.ifReview = true
        sessionStorage.setItem('searchData', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.rosterManage-viewRoster {
  // .el-textarea__inner{
  //   border: none
  // }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color:white;
    color: #303133;
  }
  @media screen and(max-width: 1400px) {
    .el-col-6 {
      width: 50%;
    }
  }
  span{
    word-break: break-all; 
    word-wrap: break-word;
  }
}
</style>
