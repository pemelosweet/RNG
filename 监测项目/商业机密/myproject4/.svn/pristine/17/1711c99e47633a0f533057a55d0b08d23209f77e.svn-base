<template>
  <div class="uploader-common" v-loading.fullscreen.lock="uploadLoading" :element-loading-text="`文件正在上传，请勿离开！已上传： ${fileDataLen-isOver}/${fileDataLen}`">
    <div v-show="dragActive" id="dragAndDropArea" class="drop-active">
    </div>
    <div class="button-group clearfix" :before-upload="handleBefore">
      <el-button type="primary" plain :id="selectFileButton" :class="selectFileButton" style="display: inline-block">选择文件</el-button>
      <el-button :loading="flag" type="primary" plain @click="startUpload">开始上传</el-button>
      <!-- <el-button :loading="flag2" type="primary" plain @click="stopUpload">停止上传</el-button> -->
      <span style="color: red;font-size:12px;font-weight: 500;margin-left:10px">仅支持上传ZIP文件</span>
      <!-- <el-button type="primary" plain @click="cancelUpload">取消</el-button> -->
    </div>
    <el-table :data="fileData.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark">
      <el-table-column type="index" :index="indexFn" label="序号"></el-table-column>
      <el-table-column label="文件名称" prop="name" min-width="250" show-overflow-tooltip></el-table-column>
      <el-table-column label="文件大小" prop="formatSize"></el-table-column>
      <el-table-column label="进度">
        <template slot-scope="scope">
          <div :id="scope.row.id">
            <el-progress :percentage="scope.row.percent" color="#8e71c7"></el-progress>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="状态"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button v-if="scope.row.percent===100" type="text" style="color: #67c23a;">成功</el-button> -->
          <el-button v-if="scope.row.percent!==100" type="text" @click="deleteOne(scope)">取消</el-button>
          <el-button v-if="scope.row.percent===100" type="text" :loading="scope.row.loading" @click="deleteFn(scope)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50, 100, 300, 500]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="fileData.length">
    </el-pagination>
  </div>
</template>

<script>
import Uploader from '@/utils/myuploader.js'
// import JsZip from 'jszip'
// getfileSizeApi
import { deletefileApi, delAttach } from '@/api/sys-monitoringAnalysis/cueManage/interFileManage/fileTransfer.js'

export default {
  data() {
    return {
      flag: false,
      flag2: false,
      fileIndex: 0,
      fileData: [],
      temFile: [],
      dragActive: false,
      uploadLoading: false,
      fileDataLen: null,
      // 默认开始页码
      currentPage: 1,
      // 每页显示条数
      pagesize: 10
    }
  },
  props: {
    fileTabData: {
      type: Array,
      default: null
    },
    noteFileID: {
      type: String,
      default: ''
    },
    tokenURL: {
      type: String,
      default: ''
    },
    removeURL: {
      type: String,
      default: 'file-service/upload/remove'
    },
    uploadURL: {
      type: String,
      default: '' /** HTML5上传的URI */
    },
    selectFileButton: {
      type: String,
      default: 'i_select_files'
    },
    onProgress: {
      type: Function,
      default() {
        return function() {}
      }
    }
  },
  computed: {
    isOver() {
      return this.fileData.length
    },
    config() {
      var _this = this
      return {
        customered: true,
        browseFileId: this.selectFileButton /** 选择文件的ID, 默认: i_select_files */,
        browseFileBlockDisplay: 'inline-blcok',
        browseFileBtn: '' /** 显示选择文件的样式, 默认: `<div>请选择文件</div>` */,
        dragAndDropArea:
          'dragAndDropArea' /** 拖拽上传区域，Id（字符类型"i_select_files"）或者DOM对象, 默认: `i_select_files` */,
        dragAndDropTips:
          '<h3>把文件拖拽到这里</h3>' /** 拖拽提示, 默认: `<span>把文件拖拽到这里</span>` */,
        filesQueueId: 'i_stream_files_queue' /** 文件上传容器的ID, 默认: i_stream_files_queue */,
        filesQueueHeight: 200 /** 文件上传容器的高度（px）, 默认: 450 */,
        messagerId:
          'i_stream_message_container' /** 消息显示容器的ID, 默认: i_stream_message_container */,
        multipleFiles: true /** 多个文件一起上传, 默认: false */,
        onRepeatedFile: function(f) { // 判断是否重复上传
          let type = false
          _this.fileData.forEach(el => {
            if (el.name === f.name && el.size === f.size) {
              type = true
            }
          })
          if (type) {
            _this.$message.warning('文件：' + f.name + ' 大小：' + f.size + ' 已存在于上传队列中。')
            return false
          } else {
            return true
          }
        },
        autoUploading: false /** 选择文件后是否自动上传, 默认: true */,
        autoRemoveCompleted: false /** 是否自动删除容器中已上传完毕的文件, 默认: false */,
        autoRemoveCancel: true /** 服务器端是否自动删除取消上传的文件 , , 默认: true*/,
        maxSize: 104857600, //, /** 单个文件的最大大小，默认:1G */
        swfURL: 'swf/FlashUploader.swf' /** SWF文件的位置 */,
        tokenURL: this.tokenURL,
        removeURL: this.removeURL,
        uploadURL: this.uploadURL /** HTML5上传的URI */,
        simLimit: 10 /** 单次最大上传文件个数 */,
        extFilters: ['.zip'] /** 允许的文件扩展名, 默认: [] */,
        postVarsPerFile: {
          noteId: this.noteFileID,
          ownSys: 'international',
          extend1: 'mail',
          type: '1'
        },

        onSelect: function(file) {
          // 选择文件后的响应事件
          file.forEach(el => {
            //  file.size / 1024 / 1024 < 500
            if (el.size > 104857600) {
              _this.$message({
                type: 'warning',
                message: '附件大小不能超过100M'
              })
              return false
            } else {
              // if (el.name.slice(el.name.lastIndexOf('.')) !== '.zip' && el.name.slice(el.name.lastIndexOf('.')) !== '.ZIP' && el.name.slice(el.name.lastIndexOf('.')) !== '.rar' && el.name.slice(el.name.lastIndexOf('.')) !== '.RAR' && el.name.slice(el.name.lastIndexOf('.')) !== '.GZ' && el.name.slice(el.name.lastIndexOf('.')) !== '.7Z' && el.name.slice(el.name.lastIndexOf('.')) !== '.gz' && el.name.slice(el.name.lastIndexOf('.')) !== '.7z') {
              if (el.name.slice(el.name.lastIndexOf('.')) !== '.zip' && el.name.slice(el.name.lastIndexOf('.')) !== '.ZIP') {
                _this.$message({
                  type: 'warning',
                  message: '仅支持上传ZIP文件'
                })
              }
            }
          })
          console.log(file)
          // return false
        },

        // 列表增加附件
        onAddTask: function(file, dat) {
          console.log('add')
          _this.fileData.unshift(file)
          _this.fileDataLen = _this.fileData.length
          console.log(_this.config, 222)
          console.log('11')
        },
        dropFn: function(type) {
          _this.dragActive = type
        },
        onUploadProgress: function(params) {
          _this.$emit('uploadIn', false)
          var fileIndex = null
          params.totalPercent = '100'
          // console.log(_this.fileData)
          _this.fileData.forEach((file, index) => {
            if (params.id === file.id) {
              if (file.percent !== 100) {
                fileIndex = index
              }
            }
          })
          if (params.loaded === params.size) {
            params.percent = 100
            _this.$emit('yesNoFileNum', 1)
            _this.$emit('uploadIn', true)
          }
          _this.$set(_this.fileData[fileIndex], 'percent', params.percent)
        },
        // onUploadSuccess: function(file, res) {
        //   console.log(file, 77777777)
        //   console.log(res, 8888888888)
        // },
        onUploadError: function() {
          // _this.$message({
          //   message: '文件上传出错',
          //   type: 'error'
          // })
        },
        onComplete: function(file) {
          // _this.fileData.forEach((item, index) => {
          //   if (item.id === file.id) {
          //     _this.fileData.splice(index, 1)
          //   }
          // })
          // _this.onProgress(file)
        },
        onCancel: function(file) {
          _this.fileData.forEach((item, index) => {
            if (item.id === file.id) {
              _this.fileData.splice(index, 1)
            }
          })
        }
        //		onSelect: function(list) {alert('onSelect')}, /** 选择文件后的响应事件 */
        //		onMaxSizeExceed: function(size, limited, name) {alert('onMaxSizeExceed')}, /** 文件大小超出的响应事件 */
        //		onFileCountExceed: function(selected, limit) {alert('onFileCountExceed')}, /** 文件数量超出的响应事件 */
        //		onExtNameMismatch: function(name, filters) {alert('onExtNameMismatch')}, /** 文件的扩展名不匹配的响应事件 */

        //		onComplete: function(file) {alert('onComplete')}, /** 单个文件上传完毕的响应事件 */
        //		onQueueComplete: function() {alert('onQueueComplete')}, /** 所以文件上传完毕的响应事件 */
        //		onUploadError: function(status, msg) {alert('onUploadError')} /** 文件上传出错的响应事件 */
        //		onDestroy: function() {alert('onDestroy')} /** 文件上传出错的响应事件 */
      }
    }
  },
  watch: {
    // isOver(val) {
    //   for (var key in this.upload.uploadInfo) {
    //     if (this.upload.uploadInfo[key].uploadComplete) {
    //       delete this.upload.uploadInfo[key]
    //     }
    //   }
    //   this.upload.onAddTask()
    // },
    // config: {
    //   handler(newObj) {
    //     console.log(newObj, 23243243543)

    //     this.upload && this.upload.destroy()

    //     this.upload = new Uploader(newObj)
    //   },
    //   immediate: true
    // }
    noteFileID: {
      handler(newObj) {
        console.log(newObj)
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      this.upload = new Uploader(this.config)
      if (this.fileTabData.length > 0) {
        this.fileData = this.fileTabData
      }
    }, 500)
  },

  methods: {
    // 删除已上传的附件
    deleteFn(val) {
      this.$confirm('确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        val.row.loading = true
        let id = ''
        if (val.row.fileId === undefined) {
          id = val.row.attachId
        } else {
          id = val.row.fileId
        }
        delAttach(id).then(res => {
          if (res) {
            val.row.loading = false
            if (res.code === 200) {
              this.fileData.map((item, index) => {
                if (item.attachId === id || item.fileId === id) {
                  this.fileData.splice(index, 1)
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                }
              })
            }
          } else {
            val.row.loading = false
          }
        })
      })
    },
    // 计算附件大小
    allfileSize() {
      console.log(this.fileData)
      let sum = 0
      this.fileData.forEach(item => {
        const a = item.size
        sum += a
      })
      return sum
    },
    // initData() {
    //   this.upload.uploadSuccess(file, response){
    //     console.log(file, 111111111111)
    //     console.log(response, 222222222222)
    //   })
    // },
    // 开始上传
    startUpload() {
      //   getfileSizeApi({ fileSize: this.allfileSize() }).then(res => {
      //     if (this.isOver > 0) {
      //       switch (res.data) {
      //         case '0':
      //           this.$message({
      //             message: res.message,
      //             type: 'info'
      //           })
      //           break
      //         case '1':
      this.flag = true
      setTimeout(() => {
        this.flag = false
      }, 1000)
      this.upload.upload()

    //           break
    //         case '2':
    //           this.upload.upload()
    //           this.$message({
    //             message: res.message,
    //             type: 'warning'
    //           })
    //           break
    //         default:
    //           break
    //       }
    //     } else {
    //     }
    //   })
    },
    stopUpload() {
      this.flag2 = true
      setTimeout(() => {
        this.flag2 = false
      }, 1000)
      this.upload.stop()
    },
    cancelUpload() {
      this.upload.cancel()
    },
    // 取消
    deleteOne(scope) {
      if (scope.row.percent === 100) {
        deletefileApi(scope.row.fileId).then(res => {
          if (res.code === 200) {
            this.upload.cancelOne(scope.row.id)
            // this.fileData.splice(scope.$index, 1)
          }
        })
      } else {
        this.upload.cancelOne(scope.row.id)
        // this.fileData.splice(scope.$index, 1)
      }
    },
    handleBefore() {
      console.log(1)
    },
    uploadSuccess(file, response) {
      console.log(file, 222222222)
      console.log(response, 44444444444)
    },
    indexFn(index) {
      return index + (this.currentPage - 1) * 10 + 1
    },
    handleSizeChange(size) {
      this.pagesize = size
      // console.log(`每页 ${size} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
    }
  }
}
</script>

<style lang="scss">
.uploader-common {
  .drag-block {
    position: relative;
    min-height: 120px;
    text-align: center;
    width: 100%;
    height: 100%;
    border: 1px dashed #d9d9d9;
  }
  .initialize {
    height: 200px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    height: 180px;
    text-align: center;
    width: 90%;
    margin-left: 5%;
    &:hover {
      border-color: #409eff;
    }
  }
  .el-progress-bar {
    width: 85%;
  }
  .el-icon-upload {
    font-size: 48px;
    color: #c0c4cc;
    // margin: 40px 0 16px;
    line-height: 50px;
    &:before {
      content: '\E60D';
    }
  }

  .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: 0.6;
    text-align: center;
    background: #000;
  }

  .drop-active h3 {
    margin: -0.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }
}
</style>