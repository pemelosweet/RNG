<template>
  <div class="reportLibrayImoport">
    <el-card>
      <div slot="header" class="clearfix">
        <span>导入线索</span>
        <el-button style="float:right" type="text" icon="el-icon-download" @click="downloadTemplate">下载模板</el-button>
      </div>

      <el-upload class="upload-clue" drag :action="attachUrl" multiple accept=".xls" :on-success="onSuccess" :on-remove="onRemove" :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-progress="onProgress" v-loading="uploadLoading" element-loading-text="文件正在上传，请耐心等待">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
      </el-upload>

      <!-- <div class="backBtn">
        <el-button type="primary" @click="go2Back">返 回</el-button>
      </div> -->
      
    </el-card>
    <el-card style="margin-top:28px">
      <clue-tep :clueData="clueData"></clue-tep>
    </el-card>

  </div>

</template>

<script>
import { getToken } from '@/utils/auth'
import clueTep from '@/views/sys-monitoringAnalysis/informationInteraction/reportClues/components/clueTep.vue'
export default {
  components: {
    clueTep
  },
  data() {
    return {
      uploadLoading: false,
      token: getToken(),
      clueData: null
    }
  },
  computed: {
    attachUrl() {
      return `/monitor/reportClue/impReportClue?token=${this.token}`
    }
  },
  filters: {},
  created() {},
  methods: {
    // 限制上传个数
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传一个文件`)
    },
    // 下载模板
    downloadTemplate() {
      location.href = `/monitor/reportClue/download?token=${this.token}`
    },
    onError() {
      this.$message({
        message: '上传失败',
        type: 'error'
      })
      this.uploadLoading = false
    },
    onSuccess(res, file, fileList) {
      if (res.code === 200) {
        if (!res.data.reportClueDistrictDos) {
          res.data.reportClueDistrictDos = [{
            district: '',
            city: '',
            districtFlag: ''
          }]
        }
        this.clueData = res.data
      } else {
        this.$message({
          type: 'warning',
          message: res.message,
          duration: 6000,
          showClose: true
        })
        fileList.pop()
      }
      this.uploadLoading = false
    },
    onProgress() {
      this.uploadLoading = true
    },
    onRemove() {
      this.clueData = []
    }
  }
}
</script>

<style lang="scss">
.reportLibrayImoport {
  .upload-clue {
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
  .backBtn {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
