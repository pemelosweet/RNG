<template>
  <el-row class="file-upload">
    <div @drop="ondrop" @dragleave="ondragleave" @dragenter="ondragenter" @dragover="ondragover">
      <div v-if="files.length <= 0" style="background-color:#f9f9f9f9">
        <el-row>
          <el-col :span="7" :offset="8">
            <div class="file-select" @click='openFileSelect'>
              <el-row class="file-select-row">
                <el-col :span="8">
                  <div>
                    <svg class="icon-upload" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M788.48 532.48zM977.92 747.52l-10.24-20.48-133.12-271.36c-5.12-10.24-20.48-20.48-30.72-20.48h-112.64c-10.24 0-20.48 10.24-20.48 20.48v35.84c0 10.24 10.24 20.48 20.48 20.48h35.84c10.24 0 25.6 10.24 30.72 20.48l97.28 194.56c5.12 10.24 0 20.48-10.24 20.48h-153.6c-10.24 0-20.48 10.24-20.48 20.48v107.52c0 10.24-10.24 20.48-20.48 20.48H378.88c-10.24 0-20.48-10.24-20.48-20.48V768c0-10.24-10.24-20.48-20.48-20.48h-153.6c-10.24 0-15.36-10.24-10.24-20.48l102.4-194.56c0-10.24 15.36-20.48 25.6-20.48h35.84c10.24 0 20.48-5.12 20.48-20.48v-35.84c0-10.24-10.24-20.48-20.48-20.48H225.28c-10.24 0-25.6 10.24-30.72 20.48l-138.24 271.36c0 10.24-5.12 20.48-5.12 20.48V957.44c0 10.24 10.24 20.48 20.48 20.48h885.76c10.24 0 20.48-10.24 20.48-20.48V768v-20.48zM322.56 343.04h112.64V665.6h153.6V343.04h122.88c10.24 0 15.36-5.12 5.12-15.36l-189.44-215.04c-10.24-10.24-20.48-10.24-25.6 0L312.32 327.68c-5.12 10.24-5.12 15.36 10.24 15.36z" />
                    </svg>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="select-info">点击或将文件拖拽到这里上传</div>
                  <div class="select-accept">可支持的扩展名：{{ getAccept() }}</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-row class="file-info-line" style="color:#525252">
              <el-col :span="3">序号</el-col>
              <el-col :span="12">文件包名</el-col>
              <el-col :span="3">文件大小</el-col>
              <el-col :span="3">上传速率</el-col>
              <el-col :span="3">操作</el-col>
            </el-row>
            <el-row v-for="(file,index) in files" :key="index + file.fileName" class="file-info-line">
              <el-col :span="3">
                <div style="margin-top:0.6em">
                  {{ index+1 }}
                </div>
              </el-col>
              <el-col :span="12">
                <div style="text-align:left">
                  {{ file.fileName }}
                </div>
                <div style="text-align:left">
                  <el-progress :percentage="file.percentage"></el-progress>
                </div>
              </el-col>
              <el-col :span="3">
                <div style="margin-top:0.6em">
                  {{ formatBytes( file.fileSize ) }}
                </div>
              </el-col>
              <el-col :span="3">
                <div style="margin-top:0.6em">
                  {{ formatSpeed( file.speed ) }}
                </div>
              </el-col>
              <el-col :span="3">
                <el-row style="margin-top:0.6em">
                  <el-col :span="6" :offset="8">
                    <div v-if="file.start" @click='stopOne(file.fileName)' class='stop-icon'>
                      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M230.4 136.533333h110.933333c17.066667 0 29.866667 12.8 29.866667 29.866667v708.266667c0 17.066667-12.8 29.866667-29.866667 29.866666h-110.933333c-17.066667 0-29.866667-12.8-29.866667-29.866666v-708.266667c0-17.066667 12.8-29.866667 29.866667-29.866667zM657.066667 136.533333h110.933333c17.066667 0 29.866667 12.8 29.866667 29.866667v708.266667c0 17.066667-12.8 29.866667-29.866667 29.866666h-110.933333c-17.066667 0-29.866667-12.8-29.866667-29.866666v-708.266667c0-17.066667 12.8-29.866667 29.866667-29.866667z" />
                      </svg>
                    </div>
                    <div v-else @click='startOne(file.fileName)' class='start-icon'>
                      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M839.164908 557.578058 240.50216 941.694459c-32.559867 21.048385-76.198502 11.69332-76.198502-19.264762L164.303659 102.006232c0-35.897581 40.684228-38.282908 76.198502-19.23304L839.164908 466.842521C863.815318 491.907383 863.815318 532.528546 839.164908 557.578058zM227.422748 865.160365l568.042125-352.942401L227.422748 159.290913C227.422748 215.621872 227.422748 850.38894 227.422748 865.160365z" />
                      </svg>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div @click='removeOne(file.fileName)' class='remove-icon'>
                      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M512 441.69251360348846L254.3219023179334 183.956407350782a49.71412125496538 49.71412125496538 0 1 0-70.30748492361464 70.30748639651151L441.63450503284866 512l-257.7361077256034 257.6780976820668a49.71412125496538 49.71412125496538 0 1 0 70.30748639651151 70.30748492361464L512 582.3654949671514l257.6780976820668 257.7361077256034a49.71412125496538 49.71412125496538 0 1 0 70.30748492361464-70.30748639651151L582.3654949671514 512l257.7361077256034-257.6780976820668a49.71412125496538 49.71412125496538 0 1 0-70.30748639651151-70.30748492361464L512 441.63450503284866z" />
                      </svg>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin-top:0.5em">
          <el-col :span="2" :offset="2">
            <div @click='startAll' class="btn-style svg-start" style="width:95%">
              <svg  class='start-icon' style="vertical-align:middle;margin-top:0.1em" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M839.164908 557.578058 240.50216 941.694459c-32.559867 21.048385-76.198502 11.69332-76.198502-19.264762L164.303659 102.006232c0-35.897581 40.684228-38.282908 76.198502-19.23304L839.164908 466.842521C863.815318 491.907383 863.815318 532.528546 839.164908 557.578058zM227.422748 865.160365l568.042125-352.942401L227.422748 159.290913C227.422748 215.621872 227.422748 850.38894 227.422748 865.160365z" />
              </svg>
              <span style="vertical-align:sub">全部开始</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div @click='stopAll' class="btn-style svg-stop" style="width:95%">
              <svg class='stop-icon' style="vertical-align:middle;margin-top:0.2em" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M230.4 136.533333h110.933333c17.066667 0 29.866667 12.8 29.866667 29.866667v708.266667c0 17.066667-12.8 29.866667-29.866667 29.866666h-110.933333c-17.066667 0-29.866667-12.8-29.866667-29.866666v-708.266667c0-17.066667 12.8-29.866667 29.866667-29.866667zM657.066667 136.533333h110.933333c17.066667 0 29.866667 12.8 29.866667 29.866667v708.266667c0 17.066667-12.8 29.866667-29.866667 29.866666h-110.933333c-17.066667 0-29.866667-12.8-29.866667-29.866666v-708.266667c0-17.066667 12.8-29.866667 29.866667-29.866667z" />
              </svg>
              <span style="vertical-align:sub">全部暂停</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div @click='removeAll' class="btn-style svg-remove" style="width:95%">
              <svg class='remove-icon' style="vertical-align:middle;margin-top:0em" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M878.54 226.544h-40.717v651.469c0 44.976-36.458 81.434-81.434 81.434H267.787c-44.976 0-81.434-36.458-81.434-81.434V226.544h-40.717c-22.488 0-40.717-18.229-40.717-40.717s18.229-40.717 40.717-40.717h244.301c0-44.976 36.458-81.434 81.434-81.434h81.434c44.976 0 81.434 36.458 81.434 81.434H878.54c22.488 0 40.717 18.229 40.717 40.717s-18.229 40.717-40.717 40.717z m-122.151 0H267.787v651.469h488.602V226.544z m-325.734 81.434c22.488 0 40.717 18.229 40.717 40.717v407.168c0 22.488-18.229 40.717-40.717 40.717s-40.717-18.229-40.717-40.717V348.695c0-22.488 18.229-40.717 40.717-40.717z m162.867 0c22.488 0 40.717 18.229 40.717 40.717v407.168c0 22.488-18.229 40.717-40.717 40.717s-40.717-18.229-40.717-40.717V348.695c0-22.488 18.229-40.717 40.717-40.717z" />
              </svg>
              <span style="vertical-align:sub">全部删除</span>
            </div>
          </el-col>
          <el-col :span="2" :offset="12">
            <div class="btn-style open-file-btn">
              <svg style="width:1.5em;height:1.5em;vertical-align:middle;margin-top:0em;fill:#ffff" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M788.48 532.48zM977.92 747.52l-10.24-20.48-133.12-271.36c-5.12-10.24-20.48-20.48-30.72-20.48h-112.64c-10.24 0-20.48 10.24-20.48 20.48v35.84c0 10.24 10.24 20.48 20.48 20.48h35.84c10.24 0 25.6 10.24 30.72 20.48l97.28 194.56c5.12 10.24 0 20.48-10.24 20.48h-153.6c-10.24 0-20.48 10.24-20.48 20.48v107.52c0 10.24-10.24 20.48-20.48 20.48H378.88c-10.24 0-20.48-10.24-20.48-20.48V768c0-10.24-10.24-20.48-20.48-20.48h-153.6c-10.24 0-15.36-10.24-10.24-20.48l102.4-194.56c0-10.24 15.36-20.48 25.6-20.48h35.84c10.24 0 20.48-5.12 20.48-20.48v-35.84c0-10.24-10.24-20.48-20.48-20.48H225.28c-10.24 0-25.6 10.24-30.72 20.48l-138.24 271.36c0 10.24-5.12 20.48-5.12 20.48V957.44c0 10.24 10.24 20.48 20.48 20.48h885.76c10.24 0 20.48-10.24 20.48-20.48V768v-20.48zM322.56 343.04h112.64V665.6h153.6V343.04h122.88c10.24 0 15.36-5.12 5.12-15.36l-189.44-215.04c-10.24-10.24-20.48-10.24-25.6 0L312.32 327.68c-5.12 10.24-5.12 15.36 10.24 15.36z" />
              </svg>
              <span style="vertical-align:sub" @click='openFileSelect'>继续添加文件</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-row>
</template>

<script>
export default {
  props: {
    url: String, // 文件上传服务路径
    onUploaded: Function, // 文件上传完成回调
    autoUpload: Boolean, // 选择文件后默认上传
    fileNum: Number, // 上传最大文件数
    multiple: Boolean, // 是否支持多选
    accepts: Array, // 文件上传类型
    onUploadError: Function, // 上传出错回调
    type: Object
  },
  data() {
    return {
      baseURL: this.url ? this.url : 'http://192.168.1.222:8088/stream',
      onfileUploaded: this.onUploaded ? this.onUploaded : null,
      autoUploading: this.autoUpload ? this.autoUpload : false,
      maxFiles: this.fileNum ? this.fileNum : 10,
      tomultiple: this.multiple ? this.multiple : true,
      accept: this.accepts ? this.accepts : [],
      onerror: this.onUploadError ? this.onUploadError : null,
      tokenURL: '/tk',
      uploadURL: '/upload',
      start: false,
      autoRemoveCompleted: true,
      speed: 0,
      percentage: 0,
      filePiece: 5242880, //
      files: [],
      filesUploaded: []

    }
  },
  methods: {
    startAll() {
      this.start = true
      const files = this.files.slice(0)
      for (let j = 0; j < files.length; j++) {
        if (!files[j].start) {
          this.startOne(files[j].fileName)
        }
      }
    },
    stopAll() {
      this.start = false
      const files = this.files.slice(0)
      for (let j = 0; j < files.length; j++) {
        if (files[j].start) {
          this.stopOne(files[j].fileName)
        }
      }
    },
    removeAll() {
      const files = this.files.slice(0)
      for (let j = 0; j < files.length; j++) {
        this.removeOne(files[j].fileName)
      }
      this.start = false
    },
    startOne(fileName) {
      for (let j = 0; j < this.files.length; j++) {
        if (this.files[j].fileName === fileName) {
          this.start = true
          this.files[j].start = true
          this.startUpload(this.files[j])
          break
        }
      }
    },
    stopOne(fileName) {
      for (let j = 0; j < this.files.length; j++) {
        if (this.files[j].fileName === fileName) {
          this.files[j].start = false
          break
        }
      }
    },
    removeOne(fileName) {
      for (let j = 0; j < this.files.length; j++) {
        if (this.files[j].fileName === fileName) {
          if (this.files[j].start) {
            this.stopOne(fileName)
          }
          this.files[j].type = this.type
          this.filesUploaded.push(this.files[j])// 加入到上传完毕文件池中
          this.files.splice(j, 1)
          break
        }
      }
      if (this.files.length === 0) {
        this.percentage = 0
      }
    },
    // 点击选择文件
    openFileSelect() {
      let accept = ''
      for (let i = 0; i < this.accept.length; i++) {
        if (accept !== '') {
          accept += ','
        }
        accept += '.' + this.accept[i]
      }
      let content = "<input type='file' " + (this.tomultiple ? "multiple='multiple'" : '') + "accept='" + accept + "'>"
      const b = document.createElement('div')
      b.innerHTML = content
      content = b.childNodes
      const fileList = content[0].parentNode.removeChild(content[0])
      fileList.onchange = this.getFileSelected
      fileList.click()
    },
    ondragleave(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation()
      } else {
        window.event.cancelBubble = true
      }
      if (event && event.preventDefault) {
        event.preventDefault()
      } else {
        window.event.returnValue = false
      }
    },
    ondragenter(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation()
      } else {
        window.event.cancelBubble = true
      }
      if (event && event.preventDefault) {
        event.preventDefault()
      } else {
        window.event.returnValue = false
      }
    },
    ondragover(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation()
      } else {
        window.event.cancelBubble = true
      }
      if (event && event.preventDefault) {
        event.preventDefault()
      } else {
        window.event.returnValue = false
      }
    },
    ondrop(event) {
      const e = {
        target: {
          files: event.dataTransfer.files
        }
      }
      this.getFileSelected(e)
      if (event && event.stopPropagation) {
        event.stopPropagation()
      } else {
        window.event.cancelBubble = true
      }
      if (event && event.preventDefault) {
        event.preventDefault()
      } else {
        window.event.returnValue = false
      }
    },
    getFileSelected(event) {
      if (event.type === 'change') {
        if (event && event.stopPropagation) {
          event.stopPropagation()
        } else {
          window.event.cancelBubble = true
        }
        if (event && event.preventDefault) {
          event.preventDefault()
        } else {
          window.event.returnValue = false
        }
      }
      const fileInput = event.target
      // console.log(fileInput)
      for (let i = 0; i < fileInput.files.length; i++) {
        let state = false
        for (let j = 0; j < this.files.length; j++) {
          if (this.files[j].fileName === fileInput.files[i].name) {
            this.$message.error('请不要选择重复文件：' + fileInput.files[i].name)
            state = true
            break
          }
        }
        const index1 = fileInput.files[i].name.lastIndexOf('.')
        const index2 = fileInput.files[i].name.length
        var suffix = fileInput.files[i].name.substring(index1 + 1, index2)
        let lawful = false
        for (let j = 0; j < this.accept.length; j++) {
          if (this.accept[j] === suffix) {
            lawful = true
          }
        }
        if (!lawful && this.accept.length > 0) {
          this.$message.error('加载文件失败：' + fileInput.files[i].name + ',不支持的文件类型：' + suffix)
          continue
        }
        if (!state) {
          const file = {
            fileName: fileInput.files[i].name,
            fileSize: fileInput.files[i].size,
            speed: 0,
            uploadedSize: 0,
            time: 0,
            start: this.autoUploading,
            startTime: (new Date()).getTime(),
            fileObj: fileInput.files[i],
            speedTime: (new Date()).getTime(),
            percentage: 0,
            speeds: []
          }
          if (this.maxFiles <= this.files.length) {
            this.$message.error('加载文件失败：' + fileInput.files[i].name + ',超过最大文件上传数：' + this.maxFiles)
            return
          }
          this.files.push(file)
          this.start = false
          if (this.autoUploading) {
            this.startUpload(file)
          }
        }
      }
    },
    startUpload(file) {
      const xhr = new XMLHttpRequest()
      // xhr.timeout = 1000
      const url = this.baseURL + this.tokenURL + '?name=' + file.fileName + '&type=' + file.fileObj.type + '&size=' + file.fileSize + '&lastModified=' + file.fileObj.lastModified
      xhr.open('GET', url, true)
      const callback = this.getFileState
      const stop = this.stopOne
      const message = this.$message
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
          return false
        }
        if (xhr.readyState === 4 && xhr.status === 0) {
          stop(file.fileName)
          const msg = '创建上传任务失败，状态码:' +
          xhr.status + ',请检查网络...'
          message.error(msg)
          xhr.abort()
        } else if (xhr.readyState === 4 && xhr.status === 200) {
          const result = JSON.parse(xhr.responseText)
          callback(file, result.token)
        }
      }
      const onerror = this.onerror
      window.XMLHttpRequest && (xhr.onerror = function() {
        const msg = '创建上传任务失败，状态码:' +
          xhr.status + ',请检查网络...'
        message.error(msg)
        if (typeof onerror === 'function') {
          onerror(file.fileName)
        }
      })
      xhr.send()
    },
    getFileState(file, token) {
      const xhr = new XMLHttpRequest()
      xhr.timeout = 1000
      const url = this.baseURL + this.uploadURL + '?name=' + file.fileName + '&client=html5&token=' + token + '&size=' + file.fileSize
      xhr.open('GET', url, true)
      const callback = this.streamUpload
      const message = this.$message
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
          return false
        }
        if (xhr.readyState === 4 && xhr.status === 0) {
          stop(file.fileName)
          const msg = '创建上传任务失败，状态码:' +
          xhr.status + ',请检查网络...'
          message.error(msg)
          xhr.abort()
        } else if (xhr.readyState === 4 && xhr.status === 200) {
          const result = JSON.parse(xhr.responseText)
          callback(file.fileName, token, result.start)
        }
      }
      const onerror = this.onerror
      window.XMLHttpRequest && (xhr.onerror = function() {
        const msg = '创建上传任务失败，状态码:' +
          xhr.status + ',请检查网络...'
        message.error(msg)
        if (typeof onerror === 'function') {
          onerror(file.fileName)
        }
      })
      xhr.send()
    },
    streamUpload(fileName, token, start) {
      let file = null
      for (let j = 0; j < this.files.length; j++) {
        if (this.files[j].fileName === fileName) {
          file = this.files[j]
          break
        }
      }
      if (file === null) {
        return
      }
      if (start === file.fileSize) {
        this.fileUploaded(file.fileName)
        return
      }
      if (!file.start) {
        return
      }
      file.startTime = (new Date()).getTime()
      const fd = new FormData()
      fd.append(file.fileName, file)
      const xhr = new XMLHttpRequest()
      xhr.timeout = 1000
      const url = this.baseURL + this.uploadURL + '?name=' + file.fileName + '&client=html5&token=' + token + '&size=' + file.fileSize
      const blob = this.sliceFile(file.fileObj, start, start + this.filePiece)
      const range = 'bytes ' + start + '-' + (start + blob.size) + '/' +
        file.fileSize
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Range', range)
      const callback = this.streamUpload
      const progress = this.uploadProgress
      const message = this.$message
      xhr.upload.addEventListener('progress', function(evt, o) {
        progress(evt, fileName, start)
      }, false)
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
          return false
        }
        if (xhr.readyState === 4 && xhr.status === 0) {
          stop(file.fileName)
          const msg = '创建上传任务失败，状态码:' +
          xhr.status + ',请检查网络...'
          message.error(msg)
          xhr.abort()
        } else if (xhr.readyState === 4 && xhr.status === 200) {
          const result = JSON.parse(xhr.responseText)
          callback(file.fileName, token, result.start)
        }
      }
      const onerror = this.onerror
      window.XMLHttpRequest && (xhr.onerror = function() {
        const msg = '文件上传失败:' + file.fileName + '  状态码' +
          xhr.status + ',请检查网络'
        message.error(msg)
        if (typeof onerror === 'function') {
          onerror(file.fileName)
        }
      })
      xhr.send(blob)
    },
    uploadProgress(evt, fileName, start) {
      let file = null
      for (let j = 0; j < this.files.length; j++) {
        if (this.files[j].fileName === fileName) {
          file = this.files[j]
          break
        }
      }
      if (file === null) {
        return
      }
      file.time = (file.fileSize - file.uploadedSize) / file.speed
      file.uploadedSize = start + evt.loaded
      file.percentage = this.formatPercent(file.uploadedSize, file.fileSize)
      this.percentage = this.getAllPercent()
      const now = (new Date()).getTime()
      const time = (now - file.startTime) / 1000
      file.speeds.push(evt.loaded / time)
      if (file.speed === 0) {
        file.speed = evt.loaded / time
      }
      if (now - file.speedTime > 3000) {
        file.speedTime = now
        let speed = 0
        for (let i = 0; i < file.speeds.length; i++) {
          speed += file.speeds[i]
        }
        speed = speed / file.speeds.length
        if (file.speed === 0 || speed / file.speed < 0.9 || speed / file.speed > 1.1) {
          file.speed = speed
        }
      }
      if (file.speeds.length > 10) {
        file.speeds.splice(9, 1)
      }
    },
    sliceFile(file, startPos, endPos) {
      startPos = startPos || 0
      endPos = endPos || 0
      return file.slice ? file.slice(startPos, endPos) : file.webkitSlice ? file
        .webkitSlice(startPos, endPos) : file.mozSlice ? file.mozSlice(
        startPos, endPos) : file
    },
    formatBytes(size) {
      if (size < 100) {
        return (size + 'B')
      } else if (size < 102400) {
        size = Math.round(100 * (size / 1024)) / 100
        size = isNaN(size) ? 0 : parseFloat(size).toFixed(2)
        return (size + 'K')
      } else if (size < 1047527424) {
        size = Math.round(100 * (size / 1048576)) / 100
        size = isNaN(size) ? 0 : parseFloat(size).toFixed(2)
        return (size + 'M')
      }
      size = Math.round(100 * (size / 1073741824)) / 100
      size = isNaN(size) ? 0 : parseFloat(size).toFixed(2)
      return (size + 'G')
    },
    formatSpeed(a) {
      let b = 0
      Math.round(a / 1024) >= 1024 ? (b = Math.round(100 * (a / 1048576)) /
        100, b = Math.max(0, b), b = isNaN(b) ? 0 : parseFloat(b)
          .toFixed(2), a = b + 'MB/s') : (b = Math.round(100 *
            (a / 1024)) /
            100, b = Math.max(0, b), b = isNaN(b) ? 0 : parseFloat(b)
          .toFixed(2), a = b + 'KB/s')
      return a
    },
    formatTime(_time) {
      const time = parseInt(_time)
      let hh = 0
      let mm = 0
      let ss = 0
      if (time < 60) {
        ss = time
      } else if (time < 3600) {
        mm = parseInt(time / 60)
        ss = parseInt(time % 60)
      } else {
        hh = parseInt(time / 3600)
        mm = parseInt((time - hh * 3600) / 60)
        ss = parseInt(time % 60)
      }
      return (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)
    },
    formatPercent(num1, num2) {
      if (num2 <= 0) {
        return 0
      }
      return parseFloat((num1 * 100 / num2).toFixed(2))
    },
    getAllPercent() {
      let num1 = 0
      let num2 = 0
      for (let i = 0; i < this.files.length; i++) {
        num1 += this.files[i].uploadedSize
        num2 += this.files[i].fileSize
      }
      if (num2 <= 0) {
        return 0
      }
      return parseFloat((num1 * 100 / num2).toFixed(2))
    },
    fileUploaded(fileName) {
      if (this.autoRemoveCompleted) {
        this.removeOne(fileName)
      }
      if (typeof this.onfileUploaded === 'function') {
        this.onfileUploaded(fileName, this.$data)
      }
    },
    getAccept() {
      if (this.accept.length > 0) {
        let result = ''
        for (let i = 0; i < this.accept.length; i++) {
          result += ' .' + this.accept[i]
        }
        return result
      } else {
        return '*'
      }
    },
    bindDragEvent(dom) {
      dom.ondrop = this.ondrop
      dom.ondragleave = this.ondragleave
      dom.ondragover = this.ondragover
      dom.ondragenter = this.ondragenter
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.file-upload {
  text-align: center;
  border: 0.1em solid #eee;
  font-size: 1vw;
  padding: 0.5em;
  border-radius: 0.4em;

  .el-progress-bar__outer {
    height: 0.3em !important;
    min-height: 5px !important;
    background-color: #c3c3c3 !important;
  }

  .el-progress-bar {
    width: 95%;
  }

  .allinfo-style {
    text-align: center;
    border-bottom: 0.1em solid #eee;
    padding-bottom: 0.5em;
    color: #8d8d8d;
    font-size: 0.9em;
  }

  .file-length {
    text-align: left;
    margin-top: 0.5em;
    color: #333333;
    font-size: 0.8em;
    border-bottom: 0.1em solid #eee;
  }

  .file-select {
    text-align: center;
    border: 0.2em dashed rgb(53, 117, 223);
    height: 10em;
    width: 100%;
    float: left;
    margin-top: 1em;
    margin-bottom: 1em;
    color: #8d8d8d;
    cursor: pointer;
    font-size: 0.8em;
    border-radius: 1em;
  }

  .file-list {
    width: 100%;
    height: auto;
    margin-top: 0.5em;
    color: #8d8d8d;
    font-size: 0.8em;
    height: auto;
    float: left;
  }

  .file-progress{
    margin-top: 0.3em;
  }

  .file-info {
    text-align: left;
    color: #8d8d8d;
    margin-left: 1em;
    margin-bottom: 0.5em;
    margin-top: 0.5em;
  }

  .file-info-btn {
    text-align: center;
    color: #8d8d8d;
    margin-left: 1em;
    margin-bottom: 1.5em;
    margin-top: 0.5em;
  }

  .btn-style {
    color: #525252;
    background: #ffffff;
    background-size: 100% 100%;
    cursor: pointer;
    font-size: 0.8em;
    height: 2em;
    padding: 0.2em;
    border-radius: 0.4em;
    border: 1px solid;
  }

  .svg-start:hover{
    color: rgb(45, 140, 226);
    .start-icon {
      fill: rgb(45, 140, 226);
  }
  }
  .svg-start .start-icon {
    width: 1.3em;
    height: 1.3em;
  }

  .svg-stop:hover {
    color: rgb(45, 140, 226);
    .stop-icon {
      fill: rgb(45, 140, 226);
    }
  }

  .stop-icon {
    width: 1.3em;
    height: 1.3em;
  }

  .svg-remove:hover {
    color: red;
    .remove-icon {
      fill: red;
    }
  }
  .svg-remove .remove-icon {
    width: 1.3em;
    height: 1.3em;
  }

  .file-icon {
    width: 1em;
    height: 1em;
    fill: #8d8d8d;
  }
  .start-icon {
    width: 1em;
    height: 1em;
    fill: #8d8d8d;
    cursor: pointer;
  }
  .stop-icon {
    width: 1em;
    height: 1em;
    fill: #8d8d8d;
    cursor: pointer;
  }
  .remove-icon {
    width: 1em;
    height: 1em;
    fill: #8d8d8d;
    cursor: pointer;
  }
  .remove-icon :hover {
    fill: red;
  }
  .stop-icon :hover {
    fill: rgb(45, 140, 226);
  }
  .start-icon :hover {
    fill: rgb(45, 140, 226);
  }
  .icon-upload {
    width: 5em;
    height: 4em;
    fill: rgb(45, 140, 226);
    float: right;
  }

  .file-select-row {
    margin-top: 2em;
  }

  .select-accept {
    color: #8d8d8d;
    margin-top: 1em;
    font-size: 0.9em;
  }

  .select-info {
    margin-top: 0.5em;
    font-size: 1.1em;
    color: #333333;
  }

  .el-icon-circle-close {
    cursor: pointer;
  }





  /*
  2017.12.28
  */
  .open-file-btn {
    background:#4f8ff9;
    width: 12em;
    color:#ffffff;
    float: right;
  }
  .file-info-line {
    color: #979797;
    font-size: 0.8em;
    border-bottom: 0.1em solid;
    padding: 0.5em;
  }
}
</style>
