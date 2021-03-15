<template>
  <div
    class="administrationCollect-dataUpload"
    v-loading="loading"
    element-loading-text="请耐心等待"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <el-card>
      <div slot="header" class="clearfix">
        <span>行政调查数据上传</span>
      </div>
      <el-form :model="form" label-width="120px" ref="validFom" :rules="rules">
        <el-form-item label="分支机构">
          <el-input disabled v-model="form.branchBank" placeholder="请输入调查文号" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item
          label="行政调查文号"
          prop="admNum"
          :rules="[{ required:true, message: '行政调查文号不能为空',trigger: 'blur'}, { validator: this.mynoSpaceAndTs, trigger: 'blur' }]"
        >
          <el-input
            v-model="form.admNum"
            placeholder="请输入调查文号, 最多输入20位"
            maxlength="20"
            style="width:50%"
          ></el-input>
        </el-form-item>
        <el-form-item label="涉及主体、账号" prop="mast" :rules="[{ required:true, message: '',trigger: 'blur'}]">
          <div>
          <el-upload
            class="main-account"
            :action="mainAccountURL"
            accept=".xlsx"
            :on-success="mainAccountUpload"
            :on-error="mainAccountError"
            :show-file-list="true"
            :file-list="mainFileList"
            :limit="1"
          >
           <el-button slot="trigger" type="primary" plain>点击上传文件</el-button>
          
          <el-button plain type="text" icon="el-icon-download" @click="downloadTemplate">模板下载</el-button>
          </el-upload>
          </div>
          <div class="dataList">
          <el-table :data="form.tableData" style="margin-top:10px">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column label="主体名称" min-width="260">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.'+scope.$index+'.name'"
                  :rules="[{validator: delDataValidInput, trigger: 'blur'}]"
                >
                  <el-input
                    maxlength="50"
                    
                    v-model="scope.row.name"
                    placeholder="请输入主体名称,最多输入50字符"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="certificateType" label="证件类型" min-width="260">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.'+scope.$index+'.certificateType'"
                  :rules="[{validator: isValidInput, trigger: 'blur'}]"
                >
                  <el-select clearable v-model="scope.row.certificateType" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in typeId"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="certificateNum" label="证件号码" min-width="260">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.'+scope.$index+'.certificateNum'"
                  :rules="[{validator: onlyNumberValidate1, trigger: 'blur'}]"
                >
                  <el-input
                    
                    maxlength="128"
                    v-model="scope.row.certificateNum"
                    placeholder="请填写证件号码，最大输入128字符"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="accountNum" label="账号" min-width="260">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.'+scope.$index+'.accountNum'"
                  :rules="[{validator: onlyNumberValidate, trigger: 'blur'}]"
                >
                  <el-input
                    
                    maxlength="30"
                    v-model="scope.row.accountNum"
                    placeholder="请填写账号，最大输入30字符"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="openBank" label="开户行" min-width="260">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.'+scope.$index+'.openBank'"
                  :rules="[{validator: isValidInput, trigger: 'blur'}]"
                >
                  <el-input
                    
                    maxlength="50"
                    v-model="scope.row.openBank"
                    placeholder="请填写开户行，最大输入50字符"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <!-- <el-table-column prop="branchBank" label="负责分析的分支行" min-width="260">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.'+scope.$index+'.branchBank'"
                  :rules="[{message: '分支行不能为空', trigger: 'blur'}]"
                >
                  <el-select clearable filterable v-model="scope.row.branchBank" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in organDoListData"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="text" @click="delItem(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="form.tableData.length" background>
          </el-pagination>-->
        </el-form-item>
        <!-- <preliminary-judgment :lableWidth="120" ref="judgment"></preliminary-judgment> -->
        <el-form-item label="初步判断" prop="preJudmentDoList">
          <el-select
            filterable
            v-model="form.preJudmentDoList"
            multiple
            placeholder="请选择"
            style="width:100%;"
          >
            <el-option
              v-for="(item,index) in dialogJudgmentData"
              :key="index"
              :label="item.codeName"
              :value="item.codeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label
          v-if="form.preJudmentDoList.indexOf('1401') !== -1"
          prop="judicialOrAdministrativeInvestigation"
          :rules="[{validator: isValidInput, trigger: 'blur'},{ required:true, message: '请填写补充',trigger: 'blur'}]"
        >
          <el-input
            maxlength="100"
            v-model="form.judicialOrAdministrativeInvestigation"
            placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
          ></el-input>
        </el-form-item>
        <el-form-item
          label
          v-if="form.preJudmentDoList.indexOf('1402') !== -1"
          prop="suspectedOfOtherCrimes"
          :rules="[{ required:true, message: '请填写补充',trigger: 'blur'},{validator: isValidInput, trigger: 'blur'}]"
        >
          <el-input
            maxlength="100"
            v-model="form.suspectedOfOtherCrimes"
            placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <el-upload
            :action="attachURL"
            multiple
            :on-success="upSuccess"
            :on-error="attachError"
            :before-upload="beforeAvatarUpload1"
            :file-list="fileList"
            :on-remove="handleRemove"
          >
            <el-button type="primary" plain>点击上传附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button v-if="isShow" type="primary" @click="submitData" plain   :loading="loadingBox">提 交</el-button>
        <el-button @click="go2Bck">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
// import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
import { postAdmInvestigation } from '@/api/sys-monitoringAnalysis/administration-collect/query.js'
import Cookies from 'js-cookie'
import { branch, delAttach } from '@/api/sys-monitoringAnalysis/analysisSpecial/index.js'
import { dictionary } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
import { commonPattern } from '@/utils/formValidate'
export default {
  // components: {
  //   preliminaryJudgment
  // },
  data() {
    return {
      mainFileList: [],
      organDoListData: [],
      loadingBox: false,
      loading: false,
      dialogJudgmentData: [],
      fileList: [],
      isShow: true,
      submit: 'monitor.AdmDataCollection.submit',
      form: {
        tableData: [],
        branchBank: '',
        admNum: '',
        preJudmentDoList: [],
        judicialOrAdministrativeInvestigation: '', // 1401
        suspectedOfOtherCrimes: '', // 1402
        admId: '',
        mast: 'bitian'
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        preJudmentDoList: [{ required: true, message: '请至少选择一个类型', trigger: 'change' }]
      },
      urldata: '',
      mainData: [],
      accountData: [],
      token: getToken()
    }
  },
  computed: {
    mainAccountURL() {
      return `/monitor/admInvestigation/upFile?token=${this.token}`
    },
    attachURL() {
      return `/monitor/admInvestigation/upAttach?admId=${this.urldata}&token=${this.token}`
    },
    ...mapGetters(['name', 'permissions_routers']),
    paramsObj() {
      this.form.tableData.forEach(el => {
        // const objMain = {}
        const objAttach = {}
        // objMain.name = el.name
        // objMain.certificateNum = el.certificateNum
        // objMain.certificateType = el.certificateType

        objAttach.accountNum = el.accountNum
        objAttach.branchBank = el.branchBank
        objAttach.openBank = el.openBank
        this.accountData.push(objAttach)
      })
      this.mainData = this.form.tableData
      const obj = {}
      obj.accountDoList = this.accountData
      obj.mainDoList = this.mainData
      obj.admNum = this.form.admNum
      obj.branchBank = this.form.branchBank
      obj.admId = this.form.admId
      const objArr = Object.assign({}, this.form)
      for (var i = 0; i < objArr.preJudmentDoList.length; i++) {
        if (objArr.preJudmentDoList[i].indexOf('1401') !== -1) {
          objArr.preJudmentDoList[i] = '1401-' + objArr.judicialOrAdministrativeInvestigation
        }
        if (objArr.preJudmentDoList[i].indexOf('1402') !== -1) {
          objArr.preJudmentDoList[i] = '1402-' + objArr.suspectedOfOtherCrimes
        }
      }
      obj.preliminaryJudgmeStr = objArr.preJudmentDoList.join()
      delete obj.mast
      return obj
    }
  },
  created() {
    Cookies.set('file', 'aaaaa')
    this.form.branchBank = this.name
  },
  mounted() {
    this.getTypeId()
    this.getDictionary('TOSC')
    this.getBranch()
    this.Show()
  },
  methods: {
    mynoSpaceAndTs(rule, value, callback) {
      var my = {
        specialSignEng: /[`~!@#$%^&*_+<>?:"{}()（）,.\/;']/im,
        specialSignChar: /[·！#￥——：；“”‘’、，|《。》？、]/im
      }
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (my.specialSignChar.test(value) || my.specialSignEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 按钮权限
    Show() {
      if (this.permissions_routers.indexOf(this.submit) !== -1) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    // 删除附件
    handleRemove(file, fileList) {
      if (file && file.status === 'success') {
        this.delUrl = 'file-service/upload/delete-attach/' + file.response.data.attachId + '?moduleName=' + '行政调查数据收集'
        delAttach('', this.delUrl).then(res => {
          this.$message({
            message: '删除附件成功',
            type: 'success'
          })
        })
      }
    },
    // 上传附件校验
    // beforeAvatarUpload1(file) {
    //   this.fileList.push(file)
    //   const isName = this.isFileNameSame(this.fileList)
    //   const w = !isName
    //   if (isName) {
    //     this.$message({
    //       message: '上传的文件名称不能重复',
    //       type: 'warning'
    //     })
    //     this.fileList.splice(this.fileList.length - 1, 1)
    //     return w
    //   }
    //   var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    //   const extension = testmsg === 'xls'
    //   const extension2 = testmsg === 'xlsx'
    //   const isLt2M = file.size / 1024 / 1024 < 10
    //   if (!extension && !extension2) {
    //     this.$message({
    //       message: '上传文件只能是 xls、xlsx格式!',
    //       type: 'warning'
    //     })
    //   }
    //   if (!isLt2M) {
    //     this.$message({
    //       message: '上传文件大小不能超过 10MB!',
    //       type: 'warning'
    //     })
    //   }
    //   if (!extension && !extension2 || !isLt2M) {
    //     this.fileList.splice(this.fileList.length - 1, 1)
    //   }
    //   return extension || extension2 && isLt2M && w
    // },
    beforeAvatarUpload1(file) {
      this.loadingBox = true
      const isLt2M = file.size / 1024 / 1024 < 500
      if (!isLt2M) {
        this.loadingBox = false
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'warning'
        })
      }
      return isLt2M
    },
    isFileNameSame(arr) {
      const hash = {}
      for (const i in arr) {
        if (hash[arr[i].name]) {
          return true
        }
        hash[arr[i].name] = true
      }
      return false
    },
    // 删除模板数据列表
    delItem(index) {
      this.$confirm('确定要删除选中的数据 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(() => {})
    },
    // 获取分支机构
    getBranch() {
      branch({ typeId: 'FZJG' }).then(res => {
        if (res.code === 200) {
          this.organDoListData = res.data.list
        }
      })
    },
    isValidInput(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    delDataValidInput(rule, value, callback) {
      if (commonPattern.specialDataName.test(value) || commonPattern.specialEngDataName.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else if (commonPattern.headerAndFooter.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else {
        callback()
      }
    },
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      if (value !== '' && value !== null) {
        if (value.length > 30) {
          callback(new Error('内容应在30字符以内'))
        } else if (commonPattern.headerAndFooter.test(value)) {
          callback(new Error('首尾不能有空格'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 证件
    onlyNumberValidate1(rule, value, callback) {
      if (value !== '' && value !== null) {
        if (
          this.form.tableData[rule.field.substr(rule.field.indexOf('.') + 1, 1)].certificateType ===
            '110003' ||
          this.form.tableData[rule.field.substr(rule.field.indexOf('.') + 1, 1)].certificateType ===
            '110001'
        ) {
          if (value.length !== 15 && value.length !== 18) {
            callback(new Error('身份证件格式标准为15及18位'))
          } else if (!commonPattern.spaceBar.test(value)) {
            callback(new Error('内容不能含有空格'))
          } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
            callback(new Error('内容不能填写特殊字符'))
          } else {
            callback()
          }
        } else {
          if (value.length <= 5 || value.length >= 129) {
            callback(new Error('内容应在6-128位之间'))
          } else if (commonPattern.headerAndFooter.test(value)) {
            callback(new Error('首尾不能有空格'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    // 上传附件
    // 上传文件
    upSuccess(res, file) {
      if (res.code === 200) {
        this.form.admId = res.data.noteId
        if (this.urldata === '') {
          this.urldata = res.data.noteId
        }
        this.loadingBox = false
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.loadingBox = false
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 下载模板
    downloadTemplate() {
      location.href = `/monitor/admInvestigation/download?token=${this.token}`
    },
    // mainAccountUpload
    mainAccountUpload(response, file, fileList) {
      // console.log(res.data)
      // this.form.accountDoList = res.data.accountDoList
      // this.form.mainDoList = res.data.mainDoList
      if (response.code === 200) {
        // const arr = []
        // if (response.data.mainDoList !== null) {
        //   response.data.mainDoList.forEach((item, index) => {
        //     const newObj = Object.assign(item, response.data.accountDoList[index])
        //     arr.push(newObj)
        //   })
        //
        // }
        this.form.tableData = this.form.tableData.concat(response.data.mainDoList)
        if (this.form.tableData.length === 0) {
          this.$message({
            message: '上传模板不能为空！',
            type: 'warning'
          })
          return false
        }
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: response.message,
          type: 'error'
        })
        this.mainFileList.splice(this.mainFileList.length - 1, 1)
      }

      // console.log(arr)
      // if (response.code === 200) {
      //   response.data.mainDoList.forEach(el => {
      //     const object = {}
      //     object.name = el.name
      //     object.certificateNum = el.certificateNum
      //     object.certificateType = el.certificateType
      //     this.tableData.push(object)
      //   })
      //   response.data.accountDoList.forEach(item => {
      //     object.accountNum = item.accountNum
      //     object.branchBank = item.branchBank
      //     object.openBank = item.openBank
      //   })
      // }
    },
    // mainAccountErro
    mainAccountError(errMsg, file, fileList) {
      this.successOrError()
      this.mainFileList.splice(this.mainFileList.length - 1, 1)
    },
    // 成功或失败
    successOrError(msg, type, time) {
      this.$message({
        message: msg || '操作成功',
        type: type || 'info',
        duration: time || 1000
      })
    },
    // 获取字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },
    // 获取证件类型
    getTypeId() {
      branch({ typeId: 'SFZJ' }).then(res => {
        if (res.code === 200) {
          this.typeId = res.data.list
        }
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
    },
    attachUpload(response, file, fileList) {
      if (response.code === 200) {
        this.successOrError('上传成功', 'success')
        this.accountData.push(response.data)
      } else {
        this.successOrError('上传失败')
      }
    },
    attachError() {
      this.loadingBox = false
      this.successOrError('上传失败')
    },
    submitData() {
      this.$refs.validFom.validate(val => {
        if (val) {
          const arr = []
          this.paramsObj.mainDoList.forEach(buz => {
            for (var name in buz) {
              if (buz.hasOwnProperty(name)) {
                if (buz[name] !== '' && buz[name] !== null) {
                  arr.push(buz)
                  return
                }
              }
            }
          })
          if (arr.length > 0) {
            this.loadingBox = true
            this.loading = true
            postAdmInvestigation(this.paramsObj)
              .then(res => {
                if (res.code === 200) {
                  this.loadingBox = false
                  this.loading = false
                  this.successOrError('提交成功', 'success')
                  this.$router.push({ name: 'administrationCollect_query' })
                } else {
                  this.loadingBox = false
                  this.loading = false
                }
              })
              .catch(() => {
                this.loadingBox = false
                this.loading = false
              })
          } else {
            this.$message({
              message: '主体或账户信息必须填一项',
              type: 'warning'
            })
          }
        }
      })
    },

    // go2Bck 返回
    go2Bck() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.administrationCollect-dataUpload{
  .el-form-item__error {
    line-height: 5px !important
  }
}
.main-account {
  display: inline-block;
}
</style>

