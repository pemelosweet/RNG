<template>
  <div class="uploader-common">
    <div v-show="dragActive" id="dragAndDropArea" class="drop-active">
    </div>
     <el-col :span="2" style="margin-top:7px">手动更新</el-col>
       <el-col :span="6">
              <el-form :model="form2">
                <el-form-item label="更新类型：" label-width="82px">
                  <el-select v-model="form2.value" clearable>
                    <el-option v-for="(item,index) in options" :key='index' :label="item.typeName" :value="item.managerId"></el-option>
                  </el-select>
                </el-form-item>  
              </el-form>
            </el-col>
      <el-button type="primary"  id="i_select_files" class="i_select_files" style="display: inline-block;margin-left:10px">选择文件</el-button>
      <!-- <el-button type="primary" @click="change">更  新</el-button> -->
      <el-button type="primary" @click="start">更  新</el-button>
      <!-- <el-button type="primary" plain @click="stopUpload">停止上传</el-button> -->
      <!-- <el-button type="primary" plain @click="cancelUpload">取消</el-button> -->
       <el-table :data="fileData" tooltip-effect="dark">
      <el-table-column label="文件名称" prop="name" min-width="250" show-overflow-tooltip></el-table-column>
      <el-table-column label="文件大小" prop="formatSize"></el-table-column>
      <el-table-column label="进度">
        <template slot-scope="scope">
          <div :id="scope.row.id">
            <el-progress class="progress" :percentage="scope.row.date" color="#8e71c7"></el-progress>
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
  </div>
  
</template>

<script>
import Uploader from '@/utils/uploader.js'
import { getOptions } from '@/api/sys-monitoringAnalysis/systemManage/storeUpdate.js'
export default {
  data() {
    return {
      fileData: [],
      temFile: [],
      form2: {
        value: ''
      },
      dragActive: false,
      date: 0,
      options: []
    }
  },
  props: {
    tokenURL: {
      type: String,
      default: ''
    },
    removeURL: {
      type: String,
      default: '/file-service/fileupload/remove'
      // default: process.env.BASE_API + '/file-service/fileupload/remove'
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
      console.log(this.upload)
      for (var key in this.upload.uploadInfo) {
        if (this.upload.uploadInfo[key].uploadComplete) {
          delete this.upload.uploadInfo[key]
        }
      }
      // this.upload.uploadInfo = {}
    }
  },

  mounted() {
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
      uploadURL: this.uploadURL /** HTML5上传的URI */,
      simLimit: 10 /** 单次最大上传文件个数 */,
      extFilters: ['.zip'] /** 允许的文件扩展名, 默认: [] */,
      onSelect: function(file) {},
      onAddTask: function(file) {
        file.date = 0
        _this.fileData.unshift(file)
        console.log(file, 2222222)
      },
      dropFn: function(type) {
        _this.dragActive = type
      },
      onUploadProgress: function(params) {
        var fileIndex = null
        _this.fileData.forEach((file, index) => {
          if (file.percent !== 100) {
            fileIndex = index
          }
        })
        // if (params.percent >= 99.99) {
        //   params.percent = 100
        // }
        _this.$set(_this.fileData[fileIndex], 'percent', params.percent)
      },
      onUploadError: function() {
        _this.$message({
          message: '文件上传出错',
          type: 'error'
        })
      },
      onComplete: function(file) {
        _this.fileData.forEach((item, index) => {
          if (item.id === file.id) {
            _this.fileData.splice(index, 1)
          }
        })

        _this.onProgress(file)
      }
      //		onSelect: function(list) {alert('onSelect')}, /** 选择文件后的响应事件 */
      //		onMaxSizeExceed: function(size, limited, name) {alert('onMaxSizeExceed')}, /** 文件大小超出的响应事件 */
      //		onFileCountExceed: function(selected, limit) {alert('onFileCountExceed')}, /** 文件数量超出的响应事件 */
      //		onExtNameMismatch: function(name, filters) {alert('onExtNameMismatch')}, /** 文件的扩展名不匹配的响应事件 */
      //		onCancel : function(file) {console.log(file)}, /** 取消上传文件的响应事件 */
      //		onComplete: function(file) {alert('onComplete')}, /** 单个文件上传完毕的响应事件 */
      //		onQueueComplete: function() {alert('onQueueComplete')}, /** 所以文件上传完毕的响应事件 */
      //		onUploadError: function(status, msg) {alert('onUploadError')} /** 文件上传出错的响应事件 */
      //		onDestroy: function() {alert('onDestroy')} /** 文件上传出错的响应事件 */
    }
    window.addEventListener('dragenter', this.onDragenter, false)
    this.upload = new Uploader(this.config)
    this.getOptions()
  },

  methods: {
    onDragenter: function onDragenter(e) {
      // e.preventDefault()
      this.dragActive = true
    },
    openFileWindow() {
      this.$refs.fileInput.click && this.$refs.fileInput.click()
    },
    startUpload() {
      this.upload.upload()
    },
    stopUpload() {
      this.upload.stop()
    },
    cancelUpload() {
      this.upload.cancel()
    },
    cancelOne(scope) {
      this.upload.cancelOne(scope.row.id)
      this.fileData.splice(scope.$index, 1)
    },
    change() {
      this.$emit('changes')
    },
    getOptions() {
      getOptions().then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    start() {
      console.log(this.fileData.length)
      if (this.fileData.length !== 0) {
        const timers = setInterval(() => {
          this.fileData.forEach(res => {
            if (res.date !== 100) {
              res.date += 10
            }
          })
          if (this.fileData[0].date === 100) {
            clearInterval(timers)
          }
        }, 100)
      }
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
