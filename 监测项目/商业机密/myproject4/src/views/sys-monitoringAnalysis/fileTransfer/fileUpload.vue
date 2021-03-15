<template>
  <div class="uploader-common" v-loading.fullscreen.lock="uploadLoading"  :element-loading-text="`文件正在上传，请勿离开！已上传： ${fileDataLen-isOver}/${fileDataLen}`">
    <div v-show="dragActive" id="dragAndDropArea" class="drop-active">
    </div>
    <div class="button-group clearfix" :before-upload="handleBefore">
      <el-button type="primary" plain id="i_select_files" class="i_select_files" style="display: inline-block">选择文件</el-button>
      <el-button type="primary" plain @click="startUpload">开始上传</el-button>
      <el-button type="primary" plain @click="stopUpload">停止上传</el-button>
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
          <span v-if="scope.row.percent===100" type="text">成功</span>
          <el-button v-else type="text" @click="cancelOne(scope)">取消</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 30, 50, 100, 300, 500]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="fileData.length">
        </el-pagination>
    <!-- <div v-show="fileData.length<=0" class="drag-block">
      <div style="margin-top:18px">
        <i class="el-icon-upload"></i>
      </div>
      <span>将文件拖拽到这里</span>
      <el-button type="text" class="i_select_files">选择文件</el-button

    </div> -->
    <div>
      <el-row>
        <el-col>
          附件列表
        </el-col>
      </el-row>
      <el-table :data="fileList" tooltip-effect="dark">
      <el-table-column type="index" :index="indexFn" label="序号"></el-table-column>
      <el-table-column label="文件名称" prop="fileName" min-width="250" show-overflow-tooltip></el-table-column>
      <el-table-column label="文件大小" prop="fileSize"></el-table-column>
      <!-- <el-table-column label="状态"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteOne(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="6" style="paddingTop:10px">
          <el-button @click="removeAll" type="" >清空记录</el-button>
        </el-col>
        <el-col :span="18">
          <el-pagination background
          @size-change="handleSizeChangeFile"
          @current-change="handleCurrentChangeFile"
          :current-page="currentPageFile"
          :page-sizes="[10, 30, 50, 100, 300, 500]"
          :page-size="pagesizeFile"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalFile">
        </el-pagination>
        </el-col>
    </el-row>
    
    </div>
  </div>
</template>

<script>
import Uploader from '@/utils/uploader.js'
// import JsZip from 'jszip'
import { getIdApi, searchFile, validateSize, deleteFile, fileSend, deleteAllFile } from '@/api/sys-monitoringAnalysis/fileTransfer/fileSend'
export default {
  data() {
    return {
      fileData: [],
      fileAll: [],
      gongYongId: '',
      fileAllJson: [],
      fileList: [],
      currentPageFile: 1,
      pagesizeFile: 10,
      totalFile: 0,
      temFile: [],
      dragActive: false,
      uploadLoading: false,
      fileDataLen: null,
      // 默认开始页码
      currentPage: 1,
      // 每页显示条数
      pagesize: 10,
      total: ''
    }
  },
  props: {
    // noteFileID: {
    //   type: String,
    //   default: ''
    // },
    fileId: {
      type: Function,
      default: ''
    },
    tokenURL: {
      type: String,
      default: ''
    },
    removeURL: {
      type: String,
      default: 'file-service/fileupload/remove'
    },
    uploadURL: {
      type: String,
      default: '' /** HTML5上传的URI */
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
    }
  },
  watch: {
    isOver(val) {
    //   console.log(val)
      // console.log(this.upload, 1)
      // console.log(this.fileData)
      if (val <= 0) {
        this.uploadLoading = false
        this.onProgress()
      }
      for (var key in this.upload.uploadInfo) {
        if (this.upload.uploadInfo[key].uploadComplete) {
          delete this.upload.uploadInfo[key]
        }
      }
      this.upload.onAddTask()
    }
  },
  mounted() {
    this.getFileLists()
    this.gongYongId = this.fileId()
    console.log(this.gongYongId)
    console.log('gongyong')

    var _this = this
    this.config = {
      customered: true,
      browseFileId: 'i_select_files' /** 选择文件的ID, 默认: i_select_files */,
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
      onRepeatedFile: function(f) {
        _this.$message('文件：' + f.name + ' 大小：' + f.size + ' 已存在于上传队列中。')
        return false
      },
      autoUploading: false /** 选择文件后是否自动上传, 默认: true */,
      autoRemoveCompleted: false /** 是否自动删除容器中已上传完毕的文件, 默认: false */,
      autoRemoveCancel: true /** 服务器端是否自动删除取消上传的文件 , , 默认: true*/,
      maxSize: 10048576000, //, /** 单个文件的最大大小，默认:2G */
      swfURL: 'swf/FlashUploader.swf' /** SWF文件的位置 */,
      tokenURL: this.tokenURL,
      removeURL: this.removeURL,
      uploadURL: `/upload/upload?type=1&extend1=transmit` /** HTML5上传的URI */,
      simLimit: 500 /** 单次最大上传文件个数 */,
      extFilters: ['.zip', '.rar', '.gz', '.7z'] /** 允许的文件扩展名, 默认: [] */,
      // extFilters: ['.zip'] /** 允许的文件扩展名, 默认: [] */,
      postVarsPerFile: {
        noteId: _this.gongYongId,
        // type: '1',
        fileId: _this.gongYongId,
        ownSys: 'international'
      },
      onSelect: function(file) {
        // 选择文件后的响应事件
      },
      onAddTask: function(file, dat) {
        _this.fileData.unshift(file)
        _this.fileAll.unshift(file)
        _this.fileDataLen = _this.fileData.length
      },
      dropFn: function(type) {
        _this.dragActive = type
      },
      onUploadProgress: function(params) {
        console.log(params)
        params.totalPercent = '100'
        var fileIndex = null
        _this.fileData.forEach((file, index) => {
          if (file.percent !== 100) {
            fileIndex = index
          }
        })
        if (params.percent === 99.99) {
          params.percent = 100
        }
        _this.$set(_this.fileData[fileIndex], 'percent', params.percent)
      },
      onUploadError: function() {
        _this.$message({
          message: '文件上传出错',
          type: 'error'
        })
      },
      onComplete: function(file) {
        console.log(file)
        _this.fileData.forEach((item, index) => {
          if (item.id === file.id) {
            _this.fileData.splice(index, 1)
          }
        })
        _this.fileAllJson.push({
          'fileName': file.name,
          'fileSize': file.size,
          'transmitId': _this.config.postVarsPerFile.noteId
        })
        _this.config.postVarsPerFile.noteId += '1'
        _this.config.postVarsPerFile.fileId += '1'

        // syncTran().then(res => {
        //   console.log(res)
        // })
        // _this.onProgress(file)
      },
      // 文件全部上传成功后的逻辑
      onQueueComplete: function(queueData) {
        console.log(_this.config.postVarsPerFile)

        // _this.fileAll.forEach(item => {
        //   _this.fileAllJson.push({
        //     'fileName': item.name,
        //     'fileSize': item.size,
        //     'transmitId': _this.config.postVarsPerFile.noteId
        //   })
        // })
        console.log(_this.fileAllJson)
        // eslint-disable-next-line no-unused-vars
        var formData = new FormData()
        // eslint-disable-next-line comma-spacing
        formData.append('listJson',JSON.stringify(_this.fileAllJson))
        fileSend(formData).then(res => {
          console.log(res)
          if (res.code === 200) {
            const obj = {
              pageNum: _this.currentPage,
              pageSize: _this.pagesize
            }
            searchFile(obj).then(res => {
              _this.fileList = res.data.data.list
            })
          }
        })
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
    // window.addEventListener('dragenter', this.onDragenter, false)
    this.upload = new Uploader(this.config)
  },

  methods: {
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
      })
    },
    // 计算附件大小
    allfileSize() {
      let sum = 0
      this.fileData.forEach(item => {
        const a = item.size
        sum += a
      })
      return sum
    },
    // onDragenter: function onDragenter(e) {
    //   // e.preventDefault()
    //   this.dragActive = true
    // },
    // openFileWindow() {
    //   this.$refs.fileInput.click && this.$refs.fileInput.click()
    // },
    // handlePreview(file) {
    //   console.log(file)
    // },

    // beforeUpload(file) {
    //   console.log(document.getElementsByClassName('cell').value, file)
    // },
    getID() {
      getIdApi().then(res => {
        if (res.code === 200) {
          this.fileId = res.data
        }
      })
    },
    // 开始上传
    startUpload() {
      validateSize({ fileSize: this.allfileSize() }).then(res => {
        if (this.isOver > 0) {
          switch (res.data) {
            case '0':
              this.$message({
                message: res.message,
                type: 'info'
              })
              break
            case '1':
              this.upload.upload()
              break
            case '2':
              this.upload.upload()
              this.$message({
                message: res.message,
                type: 'warning'
              })
              break
            default:
              break
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请选择上传文件！'
          })
        }
      })
      // if (this.isOver > 0) {
      //   this.upload.upload()
      //   // this.uploadLoading = true
      // } else {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择上传文件！'
      //   })
      // }

      //   const len = this.fileData.leng
    },
    stopUpload() {
      this.upload.stop()
    },
    cancelUpload() {
      this.upload.cancel()
    },
    cancelOne(scope) {
      this.upload.cancelOne(scope.row.id)
      // this.fileData.splice(scope.$index, 1)
    },
    // 删除附件
    deleteOne(scope) {
      this.$confirm('确定删除么', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const obj = {
            transmitIds: scope.row.transmitId
          }
          deleteFile(obj).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getFileLists()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 清空记录
    removeAll() {
      this.$confirm('是否清空所有文件接收信息', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteAllFile().then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '清空成功！'
              })
              this.getFileLists()
              this.totalFile = 0
            }
          })
        })
        .catch(() => {})
    },
    // 附件列表接口
    getFileLists() {
      const obj = {
        pageNum: this.currentPageFile,
        pageSize: this.pagesizeFile
      }
      searchFile(obj).then(res => {
        this.fileList = res.data.data.list
        this.totalFile = res.data.data.total
      })
    },
    // handleBefore() {
    //   var new_zip = new JsZip(file)
    //   console.log(new_zip)
    //   new_zip.loadAsync(file)
    //     .then(function(file) {
    //       // you now have every files contained in the loaded zip
    //       new_zip.file('testTXT.txt').async('string') // 此处是压缩包中的testTXT.txt文件，以string形式返回其内容，此时已经可以获取zip中的所有文件了
    //         .then(function(content) {
    //           // use content
    //           alert(content)
    //         })
    //     })
    // }
    handleBefore() {
      console.log(1)
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
    },
    // 附件列表切换分页
    handleSizeChangeFile(size) {
      this.pagesizeFile = size
      this.getFileLists()
      // console.log(`每页 ${size} 条`)
    },
    handleCurrentChangeFile(currentPage) {
      this.currentPageFile = currentPage
      this.getFileLists()
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

