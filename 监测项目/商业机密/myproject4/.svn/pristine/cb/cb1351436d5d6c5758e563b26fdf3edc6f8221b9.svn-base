<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>批量导入</span>
        <div style="float: right;margin-right:28px">
          <el-button type="text" icon="el-icon-download" @click="downloadFn">报文名模板下载</el-button>
        </div>
      </div>
      <el-form :model="submitForm" label-width="120px" ref="submitForm">
        <el-row>
          <el-col :span="12" :offset="6">
            <el-row>
              <el-form-item required label="报文名：" label-width="80px">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :action="uploadUrl2"
                  :limit="10"
                  :on-success="fileSucees"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :on-change="fileChange"
                  accept=".xlsx"
                  :auto-upload="true"
                >
                  <el-button  slot="trigger" size="small" type="text">选取文件</el-button>
                </el-upload>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="12" :offset="6" style="margin-top:20px">
            <el-table :data="tableData" border tooltip-effect="dark">
              <!-- <el-table-column type="selection" width="60" reserve-selection fixed="left"></el-table-column> -->
              <el-table-column type="index" label="序号" width="80" fixed="left"></el-table-column>
              <el-table-column prop="xmlName" label="报文名">
                <template slot-scope="scope">
                  <el-tooltip effect="dark" placement="top-start">
                    <div slot="content" style="margin:4px">{{scope.row.xmlName}}</div>
                    <span class="tableCell">{{scope.row.xmlName}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button type="text" @click="delReportName(scope.row,scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6" style="margin-top:20px">
            <fileUpload ref="file" :tokenURL="tokenURL" :uploadURL="uploadURL" @submitData="getSubmitData" :fileId="getUUIDRandom"/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6" style="margin-top:50px">
            <div style="color:red;font-size: 14px">
              <p>说明：附件名必须与报文名一致;</p>
              <p style="margin-left:43px;">附件数与报文数一致</p>
              <p style="margin-left:43px;">报告原件及报告相关的所有附件统一打成一个压缩包，格式统一为zip。</p>
              <p style="margin-left:43px;">每个附件大小限制100M</p>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div style="textAlign:center;margin-top:150px">
        <el-button size="small" type="primary" @click="handleSubmit">提 交</el-button>
        <el-button @click="goBack">返 回</el-button>
    </div>
    </el-card>
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
import fileUpload from '@/components/hbFileUpload/index.vue'
import { getUUIDTo } from '@/utils/index.js'
import { commonPattern } from '@/utils/formValidate'
import { submit } from '@/api/sys-monitoringAnalysis/reportEmphasisDoubtful/index.js'
export default {
  components: {
    fileUpload
  },
  data() {
    return {
      submitForm: {
        xmlName: '',
        zipName: ''
      },
      uuId: '',
      fileList: [],
      tableData: []
    }
  },
  computed: {
    tokenURL() {
      // /file-service
      return '/file-service/upload/token'
    },
    uploadURL() {
      return '/file-service/upload/upload'
    },
    uploadUrl2() {
      return `monitor/message/upFile`
    }
  },
  methods: {
    delReportName(scope, index) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index, 1)
        })
    },
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
      })
    },
    getUUIDRandom() {
      return 'xxxxxxxxxxxx6xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
      })
    },
    handleSubmit() {
      if (this.tableData.length !== 0) {
        if (this.$refs.file.fileData.length !== 0) {
          if (this.tableData.length === this.$refs.file.fileData.length) {
            const arr1 = []
            const arr2 = []
            this.tableData.forEach(res => {
              arr1.push(res.xmlName.replace('.XML', ''))
            })
            this.$refs.file.fileData.forEach(res => {
              var fileType = (res.name.substring(res.name.lastIndexOf('.') + 1))
              res.name = res.name.replace(fileType, 'zip')
              arr2.push(res.name.replace('.zip', ''))
            })
            arr1.sort()
            arr2.sort()
            if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
              this.$refs.file.startUpload()
            } else {
              this.$message({
                message: '报文名和附件名不匹配',
                type: 'warning'
              })
            }
          } else {
            this.$message({
              message: '报文名数量和附件数量不匹配',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '请添加报文附件',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请添加报文名',
          type: 'warning'
        })
      }
    },
    getSubmitData(data) {
      console.log(data)
      const arr = []
      data.forEach(res => {
        var fileType = (res.fileName.substring(res.fileName.lastIndexOf('.') + 1))
        if (fileType.toLowerCase() === 'zip') {
          res.fileName = res.fileName.replace(fileType, '')
          const obj = {
            xmlName: res.fileName + 'XML',
            zipName: res.fileName + fileType,
            noteId: res.transmitId
          }
          arr.push(obj)
        }
      })
      const fd = new FormData()
      fd.append('listJSON', JSON.stringify(arr))
      submit(fd).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success',
            duration: 6000
          })
          this.goBack()
        }
      })
    },
    fileChange(file, fileList) {
      this.uuId = getUUIDTo()
      console.log(fileList)
      var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = testmsg === 'xlsx'
      if (!extension) {
        this.$refs.upload.uploadFiles.splice(fileList.length - 1, 1)
        this.$message({
          message: '只能上传.xlsx格式文件!',
          duration: 6000,
          type: 'error'
        })
        return false
      } else {
        this.submitForm.zipName = file.name
      }
      // const isName = this.isFileNameSame(fileList)
      // if (isName) {
      //   this.$message({
      //     message: '上传的文件名称不能重复',
      //     duration: 6000,
      //     type: 'warning'
      //   })
      //   this.$refs.upload.uploadFiles.splice(fileList.length - 1, 1)
      // }
      // const isMaxSize = file.size / 1024 / 1024 < 10
      // if (!isMaxSize) {
      //   this.$message({
      //     message: '上传文件大小不能超过 10MB!',
      //     duration: 6000,
      //     type: 'warning'
      //   })
      //   this.$refs.upload.uploadFiles.splice(fileList.length - 1, 1)
      // }
      // console.log(this.$refs.upload.uploadFiles)
      // this.fileNum = this.$refs.upload.uploadFiles.length
    },
    // isFileNameSame(arr) {
    //   const hash = {}
    //   for (const i in arr) {
    //     if (hash[arr[i].name]) {
    //       return true
    //     }
    //     hash[arr[i].name] = true
    //   }
    //   return false
    // },
    handleRemove(file, fileList) {
      this.fileNum--
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    fileSucees(res) {
      if (res.code === 9999) {
        this.$message({
          message: res.message,
          duration: 6000,
          type: 'error'
        })
      } else if (res.code === 205) {
        this.$message({
          message: res.message,
          duration: 6000,
          type: 'success'
        })
      } else {
        this.tableData = res.data
      }
    },
    fileChange2(file, fileList) {
      this.uuId = getUUIDTo()
      var testmsg = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = testmsg === 'xlsx'
      if (!extension) {
        this.$refs.upload.uploadFiles.splice(fileList.length - 1, 1)
        this.$message({
          message: '只能上传.xlsx格式文件!',
          duration: 6000,
          type: 'error'
        })
        return false
      } else {
        this.submitForm.zipName = file.name
      }
    },
    handleRemove2(file, fileList) {
      this.fileNum--
      console.log(file, fileList)
    },
    handlePreview2(file) {
      console.log(file)
    },
    fileSucees2(res) {
      this.tableData = res.data
    },
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    downloadFn() {
      location.href = `monitor/message/download`
    },
    validateData(value) {
      const str1 = value.substring(0, 1)
      const str2 = value.substring(1, 3)
      if ((str1 === 'N' || str1 === 'C' || str1 === 'R' || str1 === 'A' || str1 === 'I') && (str2 === 'BS' || str2 === 'SS' || str2 === 'IS' || str2 === 'US' || str2 === 'PS' || str2 === 'UC' || str2 === 'PC' || str2 === 'ZS' || str2 === 'ZC' || str2 === 'CS')) {
        return true
      } else {
        return false
      }
    },
    validateName(rule, value, callback) {
      if (!this.validateData(value)) {
        callback(new Error('报文格式错误'))
      } else if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialDataName.test(value) || commonPattern.specialEngDataName.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    }
  },
  mounted() {

  }
}
</script>

<style  lang="scss">
</style>
