<template>
  <div class="newFile"  v-loading="loading" element-loading-text="请稍侯..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)">
    <el-card shadow="never">
      <a @click="goBack" class="back" :style="backImg"></a>
      <div slot="header">
        <span>{{$route.query.title}}</span>
      </div>
      <el-form :model="dialogForm" :rules="rulesForm" ref="dialogForm" label-position="top" >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="国家名" prop="nationas">
              <el-select :disabled="$route.query.title==='详情'" clearable v-model="dialogForm.nationas" filterable placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.text" :value="item.code" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文件类型" prop="fileType">
              <el-select :disabled="$route.query.title==='详情'" clearable v-model="dialogForm.fileType" placeholder="请选择" class="w100">
                <el-option label="协查请求函" value="0"></el-option>
                <el-option label="价值反馈表" value="1"></el-option>
                <el-option label="协查反馈函" value="2"></el-option>
                <el-option label="通报" value="3"></el-option>
                 <el-option label="其他" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="紧急程度" prop="urgencyDegree">
              <el-select  :disabled="$route.query.title==='详情'" clearable v-model="dialogForm.urgencyDegree" placeholder="请选择" class="w100">
                <el-option
                    v-for="(item,idx) in urgencyDegreeArr"
                    :label="item.codeName"
                    :value="item.codeId"
                    :key="idx"
                  ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="主题" prop="subject">
              <el-input :disabled="$route.query.title==='详情'"  v-model="dialogForm.subject"  maxlength="100" placeholder="请输入主题,最长100字符"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="我方索引号" prop="ourIndex">
              <el-input :disabled="$route.query.title==='详情'"  v-model="dialogForm.ourIndex"  maxlength="50" placeholder="请输入我方索引号,最长50字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="外方索引号" prop="foreignIndex">
              <el-input :disabled="$route.query.title==='详情'"  v-model="dialogForm.foreignIndex"  maxlength="50" placeholder="请输入外方索引号,最长50字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="remark">
              <el-input :disabled="$route.query.title==='详情'"  v-model="dialogForm.remark"  :autosize="{ minRows: 2, maxRows: 22}"  maxlength="2000" placeholder="请输入描述,最长2000字符" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-form-item v-if="$route.query.routeFlag === 'add'">
          <el-upload class="upload-demo" ref="upload" :action="actionUrl" :on-preview="handlePreview" :on-remove="handleRemove" 
          :auto-upload="false" :on-change ='fileChange' :on-success="fileSuceess" :limit="1" >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-else label="附件">
          <div v-for="(item,idx) in filesArr" :key="idx" style="display:inline-block;margin-right:8px;">
            <el-button type="text" @click="downLoad(item.attachId)">{{item.attachName}}</el-button>
          </div>
        </el-form-item> -->
          <template v-if="$route.query.routeFlag === 'add'">
              <el-card shadow="never" style="margin-top: 10px" v-for="(item, index) in casesIndex" :key="index">
          <div slot="header">
            <span v-if="index === 0">附件一</span>
            <span v-if="index === 1">附件二</span>
            <span v-if="index === 2">附件三</span>
            <span v-if="index === 3">附件四</span>
            <span v-if="index === 4">附件五</span>
            <div style="float:right">
              <el-button v-if="index === 0" type="text" @click="addCasesInd" style="font-size: 16px;">添加附件</el-button>
              <el-button v-else type="text" @click="clearCases(index)" style="font-size: 16px;" class="el-icon-close"></el-button>
            </div>
          </div>
          <fileUpload :fileTabData="item.children" @uploadIn="uploadIn" :noteFileID="item.id" @yesNoFileNum="yesNoFileNum" :selectFileButton="'i_select_files_'+index" ref="file" :tokenURL="tokenURL"  :uploadURL="uploadURL">
          </fileUpload>
        </el-card>
          </template>
          <template v-else>
              <el-card shadow="never" v-for="(i, index) in tableDataDetial" :key="index">
          <!-- <div slot="header"> -->
            <div style="margin-bottom:10px;">{{i.caseName}}</div>
            <div v-for="(item,idx) in fileDetial" :key="idx" style="padding-left:30px;">
              <el-button style="margin:5px;" v-if="i.caseId === item.noteId" @click="downLoad(item)" type="text">{{item.attachName}}</el-button>
            </div>
          <!-- </div> -->
        </el-card>
          </template>
          <el-form-item style="textAlign:center;margin-top:35px" >
          <el-button type="primary" @click="handleSubmit" v-if="$route.query.routeFlag === 'add'" >提 交</el-button>
          <el-button type="primary" @click="goBack"  >返 回</el-button>
       
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {
  sendList,
  getList,
  getIndex,
  getIndex1
} from '@/api/sys-monitoringAnalysis/cueManage/interFileManage/newFile.js'
import { noSpaceAndTs } from '@/utils/formValidate.js'
import {
  getCountry
} from '@/api/sys-monitoringAnalysis/cueManage/interFileManage/index.js'
// import { country } from '@/api/common/citys.js'
import { getToken } from '@/utils/auth'
import { getUUIDTo } from '@/utils/index.js'
// import fileUpload from '@/components/FileUpload'
import fileUpload from '@/views/sys-monitoringAnalysis/cueManage/interFileManage/upLoad.vue'
import { MYgetsourceBusinessArr } from '@/api/sys-monitoringAnalysis/cueManage/levelConfiguration.js'
export default {
  components: { fileUpload },
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      tableDataDetial: [],
      fileDetial: [{
        attachId: '95d434f69c404d2984ac8e57bb891bf4',
        attachName: '数组方法.zip',
        attachPath: '/nas/app/opt/files/ownSysattache/2019/08/14/5e1b253e0e7d4f1281752a154fb610581565746595179.zip',
        attachSize: 2795,
        attachType: '1',
        delFlag: 0,
        extend1: 'mail',
        extend2: null,
        extend3: null,
        noteId: '68037af703e84046a2356734649d147b',
        ownSys: 'international',
        uploadDate: '20190814093635',
        uploadUser: null
      }],
      arrDegree: [],
      casesIndex: [{ id: '', children: [] }],
      deleteData: [],
      urgencyDegreeArr: [],
      uploadInType: true,
      writeFileList: [],
      nums: 0,
      loading: false,
      fileNum: 0, // 文件个数
      successNum: 0,
      subCount: 0, // 提交的次数
      UUID: '', // uuid
      dialogForm: {
        nationas: '',
        fileType: '',
        urgencyDegree: '',
        subject: '',
        ourIndex: '',
        foreignIndex: '',
        remark: ''
      },
      filesArr: [],
      countryOption: [], // 国家
      rulesForm: {
        nationas: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        fileType: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        urgencyDegree: [{ required: true, message: '内容不能为空', trigger: 'change' }],
        subject: [{ required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noSpaceAndTs, trigger: 'blur' }
        ],
        ourIndex: [{ required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.validIndex, trigger: 'blur' }

        ],
        foreignIndex: [{ validator: this.validIndex1, trigger: 'blur' }],
        remark: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }

    }
  },
  computed: {
    actionUrl() {
      return `/monitor/international/uploadGjZhu?token=${getToken()}&mailId=${this.UUID}`
    },
    tokenURL() {
      // /file-service
      return '/file-service/upload/token'
    },
    uploadURL() {
      return '/file-service/upload/upload'
    }
  },
  mounted() {
    this.getID()
    if (this.$route.query.routeFlag === 'detial') {
      getList(this.$route.query.mailId).then(res => {
        if (res.code === 200) {
          if (this.arrDegree && this.arrDegree.indexOf(res.data.urgencyDegree) === -1) {
            res.data.urgencyDegree = ' '
          }
          this.dialogForm = res.data
          this.tableDataDetial = res.data.infoCase
          this.fileDetial = res.data.fileList
        }
      })
      // getfileList(this.$route.query.mailId).then(res => {
      //   if (res.code === 200) {
      //     this.filesArr = res.data
      //   }
      // })
    }
    this.UUID = getUUIDTo()
    this.getCountryList()
    this.getRestDictionary()
  },
  methods: {
    // 获取 ID
    getID() {
      this.noteFileID = getUUIDTo()
      this.casesIndex[0].id = this.noteFileID
      console.log(this.casesIndex[0].id, '222')
    },
    // 国家名
    getCountryList() {
      getCountry().then(res => {
        this.countryOption = res.data
      })
    },
    getRestDictionary() {
      const page = {
        pageNum: '1',
        pageSize: '999'
      }
      MYgetsourceBusinessArr(page, '1').then(res => {
        if (res.code === 200) {
          this.urgencyDegreeArr = res.data.list
          this.urgencyDegreeArr.forEach(is => {
            this.arrDegree.push(is.codeId)
          })
        }
      }).catch(() => {
        this.loadingA = false
      })
    },
    // 是否正在上传中
    uploadIn(val) {
      this.uploadInType = val
    },
    // 是否上传附件
    yesNoFileNum(val) {
      this.nums += val
    },
    // 添加附件
    addCasesInd() {
      if (this.casesIndex.length > 4) {
        this.$message({
          message: '最多可添加5条附件',
          type: 'warning',
          duration: 6000
        })
      } else {
        this.casesIndex.push({
          children: [],
          id: getUUIDTo()
        })
        console.log(this.casesIndex, '222222222222222x')
      }
    },
    validIndex(rule, value, callback) {
      if (value !== '') {
        getIndex(value).then(res => {
          if (res.code === 200) {
            if (res.data === -1) {
              callback(new Error('我方索引号已存在，请更换索引号!'))
            } else {
              callback()
            }
          }
        }).catch(() => {
          // callback()
          callback(new Error('查询超时!'))
        })
      } else {
        callback()
      }
    },
    validIndex1(rule, value, callback) {
      // var chinaNull = /[\u4e00-\u9fa5]/
      // if (chinaNull.test(value)) {
      //   callback(new Error('索引号不可以输入中文'))
      // } else {}
      if (value === '') {
        callback()
      } else {
        getIndex1(value).then(res => {
          if (res.code === 200) {
            if (res.data === -1) {
              callback(new Error('我方索引号已存在，请更换索引号!'))
            } else {
              callback()
            }
          }
        }).catch(() => {
          callback(new Error('查询超时!'))
        })
      }
    },
    // 删除附件
    clearCases(index) {
      if (this.deleteData.length < 1) {
        this.deleteData = JSON.parse(JSON.stringify(this.casesIndex))
        console.log(this.deleteData)

        this.deleteData.map((item, index) => {
          item.index = index
        })
      }
      this.deleteData.map((item, num) => {
        if (index === num && item.id === this.casesIndex[index].id) {
          this.deleteData[index] = this.casesIndex[index]
          this.deleteData[index].name = index === 0 ? '附件一' : index === 1 ? '附件二' : index === 2 ? '附件三' : index === 3 ? '附件四' : '附件五'
          this.deleteData[index].index = index
        }
      })
      this.casesIndex.splice(index, 1)
    },
    // 下载
    downLoad(item) {
      location.href = `/file-service/upload/download/${item.attachId}?moduleName=` + encodeURI('线索管理')
    },
    fileSuceess(file, fileList) {
      this.successNum++
      console.log(this.successNum, this.fileNum)

      if (this.successNum === this.fileNum) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 6000
        })
        this.realSumbit()
      }
    },
    fileChange(file, fileList) {
      if (file.status === 'ready') {
        const fileArr = []
        fileList.forEach(el => {
          fileArr.push(el.name)
        })
        fileArr.pop()
        if (fileArr.indexOf(file.name) === -1) {
        // console.log(a);
        } else {
          this.$message({
            message: '上传文件名不能相同',
            type: 'error',
            duration: 6000
          })
          fileList.pop()
        }
      }
      const isLt2k = file.size / 1024 / 1024 > 500
      if (isLt2k) {
        this.$message({
          message: '上传文件大小不能超过500M!',
          type: 'error',
          duration: 6000
        })
        fileList.pop()
      } else {
        this.fileNum = fileList.length
        this.enclosure = file
      }
    },
    handleRemove(file, fileList) {
      this.loading = false
    },
    handlePreview(file) {
      console.log(file)
    },

    // 提交
    handleSubmit() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          if (this.uploadInType) {
            if (this.nums > 0) {
              const objForm = Object.assign({}, this.dialogForm)
              const infoObj = []
              this.casesIndex.forEach((el, index) => {
                infoObj.push({
                  caseName: index === 0 ? '附件一' : index === 1 ? '附件二' : index === 2 ? '附件三' : index === 3 ? '附件四' : '附件五',
                  caseSort: index,
                  caseId: el.id
                })
              })
              objForm.infoCase = infoObj
              objForm.mailState = '1'
              objForm.mailId = this.UUID
              objForm.sender = this.dialogForm.nationas
              this.loading = true
              sendList(objForm).then(res => {
                if (res.code === 200) {
                  this.loading = false
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 6000
                  })
                  this.goBack()
                } else {
                  this.loading = false
                }
              }).catch(() => {
                this.loading = false
              })
            } else {
              this.$message.warning('请至少上传一个附件')
            }
          } else {
            this.$message({
              message: '请等附件上传完毕',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '请完善校验',
            type: 'warning'
          })
        }
      })
    },
    realSumbit() {
      this.dialogForm.mailId = this.UUID
      sendList(this.dialogForm).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.$message({
            message: '提交成功',
            type: 'success',
            duration: 6000
          })
          this.goBack()
        } else {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    //  handleSubmit() {
    //   this.$refs.dialogForm.validate(valid => {
    //     if (valid) {
    //       if (this.uploadInType) {
    //         if (this.nums > 0) {
    //           this.subCount++
    //           if (this.subCount === 1) {
    //             this.loading = true
    //             if (this.fileNum) {
    //               this.$refs.upload.submit()
    //             } else {
    //               this.realSumbit()
    //             }
    //           } else {
    //             return false
    //           }
    //         } else {
    //           this.$message.warning('请至少上传一个附件')
    //         }
    //       } else {
    //         this.$message({
    //           message: '请等附件上传完毕',
    //           type: 'warning'
    //         })
    //       }
    //     }
    //   })
    // },
    // 返回
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.newFile {
  position: relative;
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .w100 {
    width: 100%;
  }
  .el-form-item__label {
    padding: 0px;
  }
}
</style>


