<template>
  <div>
    <el-card>
      <div slot="header">文件接收</div>
      <div>
        <el-form ref="form" :model="form" :rules="rulesSearch" :label-position="labelPosition" label-width="110px">
          <!-- 第一行 -->
          <el-row :gutter="20" class="searchBlock">
            <el-col :span="8">
                <el-form-item label="接收日期 :">
                    <div class="chooseTime">
                      <el-date-picker 
                      v-model="form.date" 
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期" 
                      end-placeholder="结束日期"
                      :unlink-panels="true"
                      value-format="yyyy-MM-dd" 
                      ></el-date-picker>
                    </div>
                </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="文件名称:" prop="fileName">
                <el-input v-model="form.fileName" placeholder="文件名模糊查询"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
                <el-button type="primary" @click='searchData'>查  询</el-button>
                <el-button type="primary" plain @click='clearAll'>清  空</el-button>
            </el-col>
            
          </el-row>
        </el-form>
      </div>

      <el-table :data="list" style="width: 100%" v-loading="listLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)" @selection-change="handleSelectionChange">
        <el-table-column  type="selection" min-width="60">
        </el-table-column>

        <el-table-column prop="num" label="序号" width="60">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
        
        <!-- <el-table-column label="发送人"  >
          <template slot-scope="scope">
            <span>{{ scope.row.createUser }}</span>
          </template>
        </el-table-column> -->
        
        <el-table-column label="文件名称"  >
          <template slot-scope="scope">
            <span>{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="文件大小"  >
          <template slot-scope="scope">
            <span>{{ scope.row.fileSize }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="接收日期"  >
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="fileDownload(scope.row)">下载</el-button>
            <el-button @click='remove(scope.$index,scope.row)' type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
        
      <!-- 分页 -->
      <!-- <p style="textAlign:right"> -->
      <el-row>
        <el-col :span="6" style="paddingTop:10px">
          <el-button @click="batchDownload" type="primary">批量下载</el-button>
          <el-button @click="removeAll" type="" >清空记录</el-button>
        </el-col>
        <el-col :span="18">
          <el-pagination
          v-if="pageInfo.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" background
            :current-page="pageInfo.pageNum"
            :page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
          </el-pagination>
        </el-col>
      </el-row>
        
    </el-card>
  </div>
</template>

<script>
  // import { getList, remove, removeAll, getFileIds } from '@/api/sys-monitoringAnalysis/fileTransfer/fileReceive.js'
  import { ValidQueryInput } from '@/utils/formValidate'
  import { getList, remove, removeAll } from '@/api/sys-monitoringAnalysis/fileTransfer/fileReceive.js'
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        pageInfo: {
          // 默认开始页码
          pageNum: 1,
          // 每页显示条数
          pageSize: 10,
          total: null
        },
        labelPosition: 'right',
        list: [],
        total: 0,
        multipleSelection: [],
        listLoading: true,
        form: {
          date: '',
          fileName: ''
        },
        rulesSearch: {
          fileName: [
            { validator: ValidQueryInput, trigger: 'blur' }
          // { max: 50, message: '字符长度必须50位', trigger: 'blur' }
          ]
        },
        token: getToken(),
        attachIds: [],
        objInfo: {} // 分页中间量
      }
    },
    computed: {
      searchParams() {
        const obj = Object.assign({}, this.form, this.pageInfo)
        delete obj.date
        if (this.form.date) {
          obj.startDate = this.form.date[0]
          obj.endDate = this.form.date[1]
        }
        return obj
      }
    },
    methods: {
      // 切换分页条数
      handleSizeChange(size) {
        this.objInfo.pageSize = size
        this.query()
      },
      // 点击切换分页
      handleCurrentChange(pageNum) {
        this.objInfo.pageNum = pageNum
        this.query()
      },
      searchData() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.form.date === null) {
              this.form.date = []
            }
            // this.pageInfo.pageNum = 1
            this.pageInfo.total = null
            this.objInfo = Object.assign({}, this.pageInfo)
            delete this.objInfo.total
            this.objInfo.pageNum = this.pageInfo.pageNum
            this.objInfo.pageSize = this.pageInfo.pageSize
            this.objInfo.fileName = this.form.fileName
            this.objInfo.startDate = this.form.date[0] || ''
            this.objInfo.endDate = this.form.date[1] || ''
            this.query()
          }
        })
      },
      // 查询
      query() {
        this.listLoading = true
        getList(this.objInfo).then(response => {
          this.list = response.data.data.list
          this.pageInfo.total = response.data.data.total
          this.list.forEach(res => {
            res.fileSize = this.formatBytes(res.fileSize)
          })
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      getList() {
        this.objInfo = Object.assign({}, this.pageInfo)
        delete this.objInfo.total
        this.listLoading = true
        getList(this.objInfo).then(response => {
          this.list = response.data.data.list
          this.pageInfo.total = response.data.data.total
          this.list.forEach(res => {
            res.fileSize = this.formatBytes(res.fileSize)
          })
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      clearAll() {
        this.form.date = ''
        this.form.fileName = ''
      },
      // 文件大小格式化
      formatBytes(size) {
        if (size < 100) {
          return size + ' B'
        } else if (size < 102400) {
          size = Math.round(100 * (size / 1024)) / 100
          size = isNaN(size) ? 0 : parseFloat(size).toFixed(1)
          return size + ' KB'
        } else if (size < 1047527424) {
          size = Math.round(100 * (size / 1048576)) / 100
          size = isNaN(size) ? 0 : parseFloat(size).toFixed(1)
          return size + ' MB'
        }
        size = Math.round(100 * (size / 1073741824)) / 100
        size = isNaN(size) ? 0 : parseFloat(size).toFixed(1)
        return size + ' G'
      },
      // 多选
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 删除
      remove(index, row) {
        this.$confirm('是否删除文件信息', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            remove({ transmitId: row.transmitId }).then(res => {
              if (res.code === 200) {
                this.list.splice(index, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
                this.query()
              }
            })
          })
          .catch(() => {})
      },
      // 文件下载
      fileDownload(row) {
      // location.href = 'http://192.168.1.109:8087/upload/download-file/ac32477a718c4ed3a17d70db01e7e330'
        // location.href = 'file-service/upload/download-file/' + row.transmitId
        // location.href = '/file-service/filesUpload/download-note-zip?type=1&noteIds=' + row.transmitId
        location.href = '/file-service/filesUpload/download-file/' + row.transmitId + '?moduleName=' + encodeURI('跨网单向传输')
      },
      // 批量下载
      batchDownload() {
        const length = this.multipleSelection.length
        if (length === 0) {
          this.$message({
            message: '请至少选择一条数据',
            type: 'warning'
          })
        } else {
          var arr = []
          this.multipleSelection.forEach(res => {
            arr.push(res.transmitId)
          })
          location.href = '/file-service/filesUpload/download-note-zip?type=1&noteIds=' + (arr.join(',')) + '&moduleName=' + encodeURI('跨网单向传输')
          // var arr = []
          // this.multipleSelection.forEach(res => {
          //   arr.push(res.transmitId)
          // })
          // this.attachIds = []
          // for (let index = 0; index < arr.length; index++) {
          //   getFileIds(arr[index]).then(res => {
          //     if (res.code === 200) {
          //       this.attachIds.push(res.data[0].attachId)
          //       if (this.attachIds.length === arr.length) {
          //         console.log(this.attachIds)
          //         location.href = '/file-service/upload/download-file-zip/' + (this.attachIds.join(','))
          //       }
          //     }
          //   })
          // }
  
          // this.multipleSelection.reduce(function(cur, next) {
          //   return cur.then(() => { return insertValue(next) })
          // }, Promise.resolve())
          // this.multipleSelection.forEach(res => {
          //   Promise.all(insertValue(res.transmitId))
          // })
        }
  
        // function insertValue(numb) {
        //   return new Promise(function(resolve, reject) {
        //     location.href = process.env.BASE_API + '/upload/download-file/' + numb
        //   })
        // }
      },
      // 清空记录
      removeAll() {
        this.$confirm('是否清空所有文件接收信息', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            removeAll().then(res => {
              if (res.code === 200) {
                this.list = []
                this.$message({
                  type: 'success',
                  message: '清空成功！'
                })
                this.getList()
              }
            })
          })
          .catch(() => {})
      }
  
    },
    created() {
      this.getList()
    }
  }
</script>

<style scoped>

</style>