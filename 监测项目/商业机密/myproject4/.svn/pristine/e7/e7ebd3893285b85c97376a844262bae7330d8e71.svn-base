<template>
  <div class="reportingManagement_letters">
    <el-card>
      <el-form :model="form" ref="form" v-if="$route.query.disFlag !== '1'">
        <h1 class="box_h1">中 国 反 洗 钱 监 测 分 析 中 心</h1>
        <div class="subheading">中心便函 <span><el-input :class="{ 'letterCode': isLetterCode }" v-model="form.letterCode" style="width:200px;" maxlength="10" placeholder="最多可输入10位"></el-input></span><span> 号</span></div>
        <div class="head_hr"></div>
        <div class="content">
          <h3>关 于 通 报 涉 嫌 违 反</h3>
          <h3>反 洗 钱 规 定 举 报 材 料 有 关 情 况 的 函</h3>
          <div style="margin-top:30px;">反洗钱局:</div>
          <!-- <div v-if="$route.query.disFlag === '1'">
            {{form.content}} -->
            <!-- <div style="line-height: 50px;"><span style="margin-left: 48px;"></span>近期，我中心陆续收到 {{ form.num }} 份关于 <span><el-input v-model="form.description" style="width:600px;"></el-input></span> 的举报材料，称【举报内容】。现将举报材料涉及的主要情况通报贵局，供工作参考。</div>
            <div style="line-height: 50px;"><span style="margin-left: 48px;"></span>联系人及联系方式：<span><el-input v-model="form.contact" style="width:200px;"></el-input></span>，【联系电话】。</div> -->
          <!-- </div> -->
          <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 6, maxRows: 20}" style="width:100%;font-size:20px;margin-top:30px;margin-top:100px;"></el-input>
          <!-- <p style="margin-top:100px;">附件：举报材料列表</p> -->
          <el-upload
            class="upload-demo"
            :action="fileUrl"
            name="files"
            :on-exceed="handleExceed"
            :beforeUpload="beforeAvatarUpload"
            :limit="5"
            :file-list="fileList" :on-success="successFn">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传zip、rar文件，最多上传5个，且单个不得超过10M</div>
          </el-upload>
          <div class="footer">
            <div>中国反洗钱监测分析中心</div>
            <div><span><el-input v-model="form.year" style="width:100px;" maxlength="4"></el-input></span> 年 <span><el-input v-model="form.month" style="width:100px;" maxlength="2"></el-input></span> 月 <span><el-input v-model="form.day" style="width:100px;" maxlength="2"></el-input></span> 日</div>
          </div>
        </div>
      </el-form>
      <div v-else>
        <h1 class="box_h1">中 国 反 洗 钱 监 测 分 析 中 心</h1>
        <div class="subheading">中心便函{{ form.letterCode }}号</div>
        <div class="head_hr"></div>
        <div class="content">
          <h3>关 于 通 报 涉 嫌 违 反</h3>
          <h3>反 洗 钱 规 定 举 报 材 料 有 关 情 况 的 函</h3>
          <div style="margin-top:30px;">反洗钱局:</div>
          <div v-html="form.content" style="line-height: 50px;white-space: pre-wrap;margin-top:100px;">
          </div>
          <el-form ref="form" :model="form2" style="margin-top: 30px;">
            <el-row>
              <el-col :span="20" v-if="enclosureX.length === 0">
                  <el-form-item label="附件：">
                    <div type="primary" style="font-size:24px;">暂无附件</div>
                  </el-form-item>
                </el-col>
              <el-col :span="24" v-if="enclosureX.length !== 0">
                  <el-form-item label="附件：">
                    <div v-for="(el, nums) in this.enclosureX" :key="nums" style="margin-bottom:10px;">
                      <span style="font-size:24px;">{{ el.attachName }}</span>
                      <i ref="icon_click" class="el-icon-download" @click="downloadClick(el.attachId)" style="margin-left:20px;color:#46a3ff;cursor:pointer;font-size:24px;">下载</i>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          <!-- <p style="margin-top:100px;">附件：举报材料列表</p> -->
          <div class="footer">
            <div>中国反洗钱监测分析中心</div>
            <div>{{form.year}}年{{form.month}}月{{form.day}}日</div>
          </div>
        </div>
      </div>
      <div style="text-align:center;">
        <el-button v-if="$route.query.disFlag !== '1'" type="primary" @click="preservation">保存</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { saveLetter } from '@/api/sys-monitoringAnalysis/reportingManagement/letters.js'
import { uploadApi } from '@/api/sys-monitoringAnalysis/reportingManagement/queryInformation'
import { findLetter } from '@/api/sys-monitoringAnalysis/reportingManagement/letters.js'
export default {
  data() {
    return {
      enclosureX: [],
      fileList: [],
      isLetterCode: false,
      form: {
        letterCode: '',
        // num: '',
        // description: '',
        // contact: '',
        content: '',
        year: '',
        month: '',
        day: ''
      },
      form2: {},
      token: getToken(),
      reportId: ''
    }
  },
  // watch: {
  //   'form.letterCode': function(val) {
  //     if (val === '') {
  //       this.isLetterCode = true
  //     }
  //   }
  // },
  computed: {
    fileUrl(file) {
      return `/monitor/fill-report/upload-allAttach?reportId=${this.reportId}&token=${this.token}`
    }
  },
  mounted() {
    if (this.$route.query.num) {
      this.form.num = this.$route.query.num
      this.form.content = `    近期，我中心陆续收到${this.form.num}份关于        的举报材料，称【举报内容】。现将举报材料涉及的主要情况通报贵局，供工作参考。
    联系人及联系方式：`
    } else {
      this.initData()
    }
  },
  methods: {
    downloadClick(attachId) {
      location.href = '/file-service/upload/download/' + attachId + '?token=' + this.token
    },
    initData() {
      findLetter(this.$route.query.reportNo).then(res => {
        if (res.code === 200) {
          if (res.data !== null || res.data !== '') {
            const arr = res.data.launchDate.split('-')
            this.form.letterCode = res.data.letterCode
            this.form.reportNo = res.data.reportNo
            // this.form.num = res.data.num
            // this.form.description = res.data.description
            // this.form.contact = res.data.contact
            this.form.content = res.data.content
            this.form.year = arr ? arr[0] : ''
            this.form.month = arr ? arr[1] : ''
            this.form.day = arr ? arr[2] : ''
            const letterId = res.data.letterId
            uploadApi(letterId).then(response => {
              if (response.code === 200) {
                console.log(response)
                this.enclosureX = response.data
                console.log(this.enclosureX)
              }
            })
          }
        }
      })
    },
    preservation() {
      if (this.form.letterCode === '') {
        this.isLetterCode = true
        this.$message({
          type: 'warning',
          message: '有错误内容'
        })
      } else {
        this.isLetterCode = false
        const obj = Object.assign({}, this.form)
        const params = {
          letterCode: obj.letterCode,
          reportNo: this.$route.query.reportNo,
          // num: obj.num,
          // description: obj.description,
          // contact: obj.contact,
          content: obj.content,
          launchDate: obj.year + '-' + obj.month + '-' + obj.day,
          reportId: this.$route.query.reportId,
          letterId: this.reportId
        }
        saveLetter(params).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.go(-1)
          }
        })
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件`)
    },
    beforeAvatarUpload(file) {
      this.files = file
      console.log(this.files)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'zip'
      const extension2 = testmsg === 'rar'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 zip、rar格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过10MB!',
          type: 'warning'
        })
      }
      return extension || extension2 && isLt2M
    },
    successFn(res, file) {
      if (res.code === 200) {
        this.reportId = res.data
        console.log(file)
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .reportingManagement_letters {
    font-size: 24px;
    .el-form-item__content {
      overflow: hidden;
      word-break: break-all;
    }
    .el-form-item__label {
      font-size: 24px;
    }
    .letterCode {
      input {
        border-color: #f56c6c;
      }
    }
    .box_h1 {
      width: 100%;
      height: 70px;
      text-align: center;
      color: red;
    }
    .subheading {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
    .head_hr {
      width: 95%;
      height: 1px;
      margin: 0 auto;
      background:red;
      margin-top: 30px;
    }
    .content {
      width: 90%;
      height: auto;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 50px;
    }
    h3 {
      text-align: center;
      // font-weight: 500;
    }
    p {
      margin: 10px;
      text-indent: 4em;
      line-height: 40px;
    }
    .footer {
      margin-left: 60%;
      margin-top: 200px;
      width: auto;
      height: auto;
      overflow: hidden;
      text-align: center;
      line-height: 40px;
    }
  }
</style>